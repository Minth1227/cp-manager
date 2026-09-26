import { db, auth } from './firebase.js';
import { doc, getDoc, setDoc, collection, getDocs, writeBatch, runTransaction } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { customAlert } from './utils/dialog.js';
import { authFetch } from './utils/authFetch.js';
import { migrateOldTxToNewState, flattenStateToLegacyForms } from './utils/dataAdapter.ts';
import { getFlatFormSequence } from './data/processFlow.js';

const defaultProducts = [];

const defaultData = {
  legalPdfs: {}, // 별지/별표 공식 서식의 실제 법정 PDF 업로드 메타데이터: { [formId]: {filename, sizeBytes, uploadedAt, uploadedBy} }
  companyInfo: {
    name: '(주)팝콘사',
    ceo: '',
    registrationNumber: '',
    establishDate: '',
    address: '',
    businessType: '',
    tradeRegistrationNumber: '',
    employeeCount: '',
    capital: '',
    annualRevenue: '',
    website: '',
    cpAppMode: 'initial', // 'initial' (최초 신규 신청) or 'certified' (기 지정/갱신 관리)
    cpTargetApplyDate: '', // 지정신청 목표일 (대시보드에서 입력)
    cpCertifiedDate: '',
    cpCertifiedNumber: '',
    cpCertifiedGrade: '', // 지정서에 기재된 등급 (A/AA/AAA). 비어 있으면 목표 등급(targetGrade)으로 간주하되, 지정번호·지정일이 없으면 특례 미적용
  },
  targetGrade: 'AA',
  applicationType: '유형2',
  products: defaultProducts,
  selectedProductId: 'prod_1',
  selectedTransactionId: null,
  formStatuses: {},
  formData: {},
  exportCaseStates: {},
  settings: { targetDate: '' },
  integrations: {
    slackWebhookUrl: '', // 결재 요청/완료 등 텍스트 알림용 Incoming Webhook. 비어있으면 조용히 건너뜀.
    slackBotToken: '', // 사내 공지문 등 실제 PDF 파일을 Slack에 업로드하려면 필요 (xoxb-...). 비어있으면 텍스트 알림만 전송.
    slackAnnounceChannelId: '', // 전사 공지문(B-02 등) PDF를 올릴 채널 ID (예: C0123ABCD)
    slackOrgChannelId: '', // 공개범위 "부서공개" 선택 시 게시할 자율수출관리기구 전용 채널 ID
    slackApproverIds: { 기구장: '', 대표이사: '' }, // 결재 요청 시 @멘션할 대상의 Slack 사용자 ID (예: U0123ABCD)
    slackBroadcastDmEnabled: false // 공지문 결재 완료 시 채널 게시 외에 워크스페이스 전 멤버에게 개별 DM도 보낼지 (기본 꺼짐 — 관리자가 명시적으로 켜야 함)
  },
  currentRegulation: [
    { clauseId: '제1조 (목적)', text: '이 규정은 대외무역법 제22조 및 전략물자 수출입고시 제75조에 따라 당사의 전략물자 수출관리에 필요한 사항을 규정함을 목적으로 한다.' },
    { clauseId: '제2조 (적용범위)', text: '이 규정은 당사의 모든 수출 관련 부서 및 임직원에게 적용된다.' },
    { clauseId: '제3조 (자율수출관리기구의 구성)', text: '당사는 자율준수체제 확립을 위해 자율수출관리기구를 둔다. 기구장은 대표이사가 임명하며 영업부서와 독립적으로 운영된다.' },
    { clauseId: '제4조 (수출심사)', text: '모든 수출 건에 대하여 출하 전 전략물자 해당 여부 및 우려거래자 여부를 심사하여야 한다.' }
  ],
  transactions: [
    { id: 'tx_1', prodId: 'prod_1', name: '독일 A사 납품 건', country: '독일', buyer: 'Bosch GmbH', exportDate: '2026-03-10', isLocked: false, lockedDate: null, lockedExpiryDate: null, isDeletable: false }
  ],
  snapshots: [],
  destructionLogs: [],
  unlockLogs: [],
  signedDocuments: [], // "서명 문서함" — 전자서명(앱 직접 서명 또는 Slack 승인)이 완료될 때마다 쌓이는 append-only 목록
  docNumberCounters: {} // 문서번호 발급대장 — "부서-연도" 조합별 마지막 일련번호. 예: {"수출기획팀-2026": 3}
};

// In-memory cache
let state = { ...defaultData };
let currentUser = null; // { email, role, name, department, empId, uid }

export async function initStore(user) {
  currentUser = user;
  if (!user || user.role === 'PENDING') return;

  try {
    const globalDoc = await getDoc(doc(db, 'system', 'globalState'));
    if (globalDoc.exists()) {
      const data = globalDoc.data();
      
      // Migration: Wipe dummy control numbers from cached products
      if (data.products && Array.isArray(data.products)) {
        let needsWipe = false;
        data.products.forEach(p => {
          if (p.controlNumber && p.controlNumber !== '-' && p.controlNumber.includes('5D002')) {
            needsWipe = true;
          }
        });
        if (needsWipe) {
          data.products.forEach(p => {
            p.controlNumber = '-';
            p.classificationType = '';
            p.classificationDate = '';
            p.specSummary = '';
          });
          // Immediately save wiped data back
          await setDoc(doc(db, 'system', 'globalState'), { products: data.products }, { merge: true });
        }
      }
      // Auto-migrate any transactions that don't have an exportCaseState
      if (data.transactions) {
        data.exportCaseStates = data.exportCaseStates || {};
        data.transactions.forEach(tx => {
          if (!data.exportCaseStates[tx.id]) {
            data.exportCaseStates[tx.id] = migrateOldTxToNewState(tx.id, data.formData || {});
          }
        });
      }
      
      state = { ...defaultData, ...data };
    } else {
      // Initialize if empty
      await setDoc(doc(db, 'system', 'globalState'), state);
    }
  } catch (err) {
    console.error("Failed to init store from Firestore", err);
    // Fallback to local storage for graceful degradation or throw
  }
}

export function getCurrentUser() {
  return currentUser;
}

export function canEdit() {
  return currentUser && (currentUser.role === 'Master' || currentUser.role === 'Reviewer' || currentUser.role === 'ADMIN' || currentUser.role === 'EDITOR');
}

export async function logoutUser() {
  if (auth) {
    try {
      await signOut(auth);
      window.location.reload();
    } catch(e) {
      console.error("Logout Error:", e);
    }
  }
}

export const txForms = ['Z-01', 'F-01', 'F-02', 'F-03', 'F-04', 'G-01', 'H-01', 'K-01', 'K-02', 'L-01', 'L-02', 'L-03', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08', 'L-09', 'L-11', 'M-01', 'M-02', 'M-03'];

export function isTxForm(formId) {
  return txForms.includes(formId);
}

// ── 다회차(instance) 서식 ──
// 거래(수출건)에 속하지 않지만 "~할 때마다/연 1회/발생 시"처럼 반복되는 서식들.
// 예전엔 formId 하나에 레코드가 하나뿐이라, 두 번째 발생(예: 두 번째 교육) 때 저장하는 순간
// 첫 번째 기록이 통째로 덮어써져 5년 법정 보관의무를 지킬 수 없었다. 거래가 `formId_거래ID`로
// 격리되는 것과 같은 원리로, 각 회차를 `formId_inst_고유ID`로 독립 저장한다.
export const instanceForms = [
  'C-01', 'C-02', 'C-03',
  // [확장] 아래 서식들도 "발생할 때마다(사건/주기마다) 새로 작성"하는 반복성 서식인데
  // 기존에는 단일 상태 키(formId)만 있어 새로 작성하면 지난 기록이 덮어써지는 데이터 유실
  // 위험이 있었다(5년 보관 의무와 충돌). B-01(연 1회 갱신), B-02(연 1회 이상 공지),
  // C-00(연 1회 교육계획), C-04/C-05(감사 지적사항·시정조치 — 건별), C-06(감사종료 후 보고 — 건별),
  // C-07(연/2년 주기 감사계획), E-01(국내 인도 시마다), G-04/G-06(보류지시/해제 — 사건별),
  // J-01/J-02(위반 자진신고/재발방지계획 — 사건별, 패키지로 항상 같이 생성됨).
  'B-01', 'B-02', 'C-00', 'C-04', 'C-05', 'C-06', 'C-07', 'E-01', 'G-04', 'G-06', 'J-01', 'J-02',
  // [확장 #2] ERB(전자결재) 문서번호 체계 도입 — 지금까지 "슬롯 하나"였던 서식들 중 대장(臺帳/표)류가
  // 아닌 "실제 문서 한 건"에 해당하는 것들을 다회차로 전환한다. 이제 재작성하면 이전 것을 덮어쓰지 않고
  // 새 문서번호로 새 회차가 만들어진다. 대장류(A-05, D-02, D-04, D-06, G-03, K-05 등)는 표 형식을
  // 그대로 유지하므로 여기 포함하지 않는다.
  'A-01', 'A-06', 'A-07', 'A-08', 'A-10', 'D-01', 'D-03', 'D-05', 'E-02', 'E-03', 'E-04', 'E-05',
];

export function isInstanceForm(formId) {
  return instanceForms.includes(formId);
}

// 특정 서식의 모든 회차를 최신순으로 반환한다 (회차 목록 UI에 사용).
export function getFormInstances(formId) {
  // 저장 키 형식은 `${formId}_${instanceId}`이고 instanceId 자체가 이미 'inst_'로
  // 시작한다(예: C-02_inst_172..._ab12cd). 필터링은 'C-02_inst_'로 하되, 잘라낼 접두사는
  // 'C-02_'까지만이어야 instanceId에 'inst_' 부분이 남아 getSelectedInstanceId()가 반환하는
  // 값과 정확히 일치한다 (예전엔 'inst_'까지 잘라버려서 두 값이 영영 매치되지 않았음).
  const filterPrefix = `${formId}_inst_`;
  const stripPrefix = `${formId}_`;
  const results = [];
  for (const [key, data] of Object.entries(state.formData)) {
    if (key.startsWith(filterPrefix) && data) {
      results.push({ instanceId: key.slice(stripPrefix.length), ...data });
    }
  }
  results.sort((a, b) => new Date(b._createdAt || 0) - new Date(a._createdAt || 0));
  return results;
}

// 회차 목록 화면에서 "선택 중이 아닌" 임의의 회차 상태를 조회할 때 사용 (getFormStatus는
// 항상 "현재 선택된 회차" 기준이라 목록의 다른 행에는 쓸 수 없다).
// 결재 상태를 "작성상태"(수동 드롭다운: 미착수/작성중/검토중/완료)와 별개 축으로 파생 계산한다.
// Slack 승인/반려는 formStatus를 건드리지 않으므로, 목록 화면에서 승인 여부를 정확히
// 보여주려면 formData 자체(signatureInfo/rejectionInfo/approvalRequestedAt)에서 직접 판단해야 한다.
// null을 반환하면 "아직 결재 프로세스 진입 전"이라는 뜻이며, 이 경우 호출 측은 기존 작성상태
// 배지를 그대로 보여주면 된다.
export function getApprovalStatusInfo(data) {
  if (!data) return null;
  if (data.signatureInfo) return { key: 'approved', label: '✅ 승인완료' };

  const rejectedAt = data.rejectionInfo?.timestampISO ? new Date(data.rejectionInfo.timestampISO).getTime() : 0;
  const requestedAt = data.approvalRequestedAt ? new Date(data.approvalRequestedAt).getTime() : 0;

  if (requestedAt > 0 && requestedAt >= rejectedAt) return { key: 'pending', label: '⏳ 결재대기중' };
  if (rejectedAt > 0) return { key: 'rejected', label: '❌ 반려됨' };
  return null;
}

// ── 공개범위(visibilityScope) 기반 열람 권한 판정 ──
// "승인된 이후"에만 적용된다 — 아직 미승인(초안) 상태 문서는 지금처럼 canEdit() 권한자면
// 누구나 볼 수 있다(팀 작업 중인 초안까지 막을 이유는 없음). private/department는 아래를 만족해야 열람 가능:
//   - Master/ADMIN은 관리 목적상 항상 전부 열람 가능
//   - private: 기안자 본인 또는 승인자 본인만
//   - department: 자율수출관리기구 소속(isCpOrgMember)으로 등록된 사람만 (+기안자/승인자 본인)
// [주의] 이건 화면(UI) 상의 열람 제한이며, PDF 다운로드 URL 자체는 Firebase Storage 서명URL이라
// 그 링크를 아는 사람은 로그인 여부와 무관하게 열 수 있다 — 진짜 암호학적 접근 통제는 아니다.
export function canViewDocument(data) {
  if (!data || !data.signatureInfo || !data.visibilityScope || data.visibilityScope === 'public') return true;

  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'Master' || user.role === 'ADMIN') return true;

  const isDrafter = data._createdByUid && user.uid && data._createdByUid === user.uid;
  const isApprover =
    (data.signatureInfo.email && user.email && data.signatureInfo.email === user.email) ||
    (data.signatureInfo.slackUserId && user.slackUserId && data.signatureInfo.slackUserId === user.slackUserId);

  if (data.visibilityScope === 'private') return !!(isDrafter || isApprover);
  if (data.visibilityScope === 'department') return !!(isDrafter || isApprover || user.isCpOrgMember);
  return true;
}

// canViewDocument()와 동일한 규칙을, "서명 문서함"의 signedDocuments 항목(formData 전체가 아니라
// 요약된 ledger 레코드) 형태에 맞춰 적용한다. 필드명이 조금 다르다(createdByUid, approverEmail/
// approverSlackUserId가 최상위에 있음 — formData.signatureInfo처럼 중첩돼 있지 않음).
export function canViewLedgerEntry(entry) {
  if (!entry || !entry.visibilityScope || entry.visibilityScope === 'public') return true;

  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'Master' || user.role === 'ADMIN') return true;

  const isDrafter = entry.createdByUid && user.uid && entry.createdByUid === user.uid;
  const isApprover =
    (entry.approverEmail && user.email && entry.approverEmail === user.email) ||
    (entry.approverSlackUserId && user.slackUserId && entry.approverSlackUserId === user.slackUserId);

  if (entry.visibilityScope === 'private') return !!(isDrafter || isApprover);
  if (entry.visibilityScope === 'department') return !!(isDrafter || isApprover || user.isCpOrgMember);
  return true;
}

export function getInstanceStatus(formId, instanceId) {
  return state.formStatuses[`${formId}_${instanceId}`] || 'todo';
}

export function getSelectedInstanceId(formId) {
  return (state.selectedInstanceIds || {})[formId] || null;
}

// 현재 컨텍스트(선택된 거래/회차) 기준으로 이 서식이 실제로 저장되는 Firestore 키를 반환한다.
// Slack 인터랙션(slack_interactions.js)이 로그인 세션 없이도 정확히 같은 문서를 찾아
// 업데이트할 수 있도록, 결재 요청을 보낼 때 이 값을 그대로 실어 보낸다.
export function getStorageKey(formId) {
  if (isTxForm(formId)) {
    const tId = getSelectedTransactionId();
    return tId ? `${formId}_${tId}` : formId;
  }
  if (isInstanceForm(formId)) {
    const instId = getSelectedInstanceId(formId);
    return instId ? `${formId}_${instId}` : null;
  }
  return formId;
}

export async function setSelectedInstanceId(formId, instanceId) {
  state.selectedInstanceIds = { ...(state.selectedInstanceIds || {}), [formId]: instanceId };
  try {
    await setDoc(doc(db, 'system', 'globalState'), { selectedInstanceIds: state.selectedInstanceIds }, { merge: true });
  } catch (e) {
    console.error(e);
  }
}

// ── 문서번호 발급 ──
// 회사 전사 공통 체계 PSR{연도 2자리}-{일련번호} (예: PSR26-124). 서버(slack_interactions)와 같은
// counters/PSR-{연도} 문서를 트랜잭션으로 증가시켜 번호 중복을 막는다.
// department 인자는 과거 호출부 호환을 위해 남겨 두지만 번호에는 쓰지 않는다.
export async function generateDocNumber(department) { // eslint-disable-line no-unused-vars
  const year = new Date().getFullYear();
  const ref = doc(db, 'counters', `PSR-${year}`);
  const next = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const n = (snap.exists() ? Number(snap.data().last || 0) : 0) + 1;
    tx.set(ref, { last: n, updatedAt: new Date().toISOString() }, { merge: true });
    return n;
  });
  return `PSR${String(year).slice(-2)}-${String(next).padStart(3, '0')}`;
}

export async function createFormInstance(formId, initialData = {}) {
  if (!canEdit()) return null;
  const instanceId = `inst_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const key = `${formId}_${instanceId}`;
  const user = getCurrentUser();
  const data = {
    ...initialData,
    _createdAt: new Date().toISOString(),
    _createdBy: user?.name || user?.email || 'Unknown',
    _createdByDept: user?.department || '',
    _createdByUid: user?.uid || '',
  };
  state.formData[key] = data;
  try {
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
  } catch (e) {
    console.error(e);
  }
  await setSelectedInstanceId(formId, instanceId);
  return instanceId;
}

// 회차를 삭제한다.
// [보관기한 강제] 전자서명(승인)이 완료된 회차는 승인 시점(signatureInfo.timestampISO)으로부터
// 5년간 법정 보관 의무가 있으므로, 그 기간 안에는 일반 편집 권한(canEdit)만으로 삭제할 수 없다.
// transactions/products의 5년 잠금(lockTransaction/lockProduct)과 동일한 원칙을 "사건형(다회차)
// 서식"에도 적용한 것 — 삭제 시도 자체는 destructionLogs에 남기고, Master 권한으로만 강행 삭제가
// 가능하며 그 경우에도 기록이 남는다.
export async function deleteFormInstance(formId, instanceId) {
  if (!canEdit()) return;
  const key = `${formId}_${instanceId}`;
  const existing = state.formData[key];

  if (existing && existing.signatureInfo) {
    const signedAt = new Date(existing.signatureInfo.timestampISO || existing.signatureInfo.timestamp || 0);
    const retentionExpiry = new Date(signedAt);
    retentionExpiry.setFullYear(retentionExpiry.getFullYear() + 5);
    const withinRetention = !isNaN(signedAt.getTime()) && new Date() < retentionExpiry;

    if (withinRetention && !canUnlock()) {
      if (!state.destructionLogs) state.destructionLogs = [];
      state.destructionLogs.push({
        type: 'formInstance',
        formId, instanceId,
        signedAt: signedAt.toISOString(),
        retentionExpiry: retentionExpiry.toISOString(),
        attemptedBy: currentUser?.name || currentUser?.email || 'Unknown',
        attemptedAt: new Date().toISOString(),
        blocked: true
      });
      try {
        await setDoc(doc(db, 'system', 'globalState'), { destructionLogs: state.destructionLogs }, { merge: true });
      } catch (e) {
        console.error(e);
      }
      customAlert('삭제 불가 (법정 보관기간)', `전자서명(승인)이 완료된 문서는 승인일(${signedAt.toLocaleDateString()})로부터 5년간 보관 의무가 있어 삭제할 수 없습니다.\n보관 만료일: ${retentionExpiry.toLocaleDateString()}\n부득이한 경우 최고관리자(Master) 권한으로만 강행 삭제할 수 있으며, 그 기록이 남습니다.`, 'warning');
      return;
    }

    if (withinRetention && canUnlock()) {
      // Master가 보관기한 이내에 강행 삭제하는 경우 — 삭제는 허용하되 반드시 기록을 남긴다.
      if (!state.destructionLogs) state.destructionLogs = [];
      state.destructionLogs.push({
        type: 'formInstance',
        formId, instanceId,
        signedAt: signedAt.toISOString(),
        retentionExpiry: retentionExpiry.toISOString(),
        deletedBy: currentUser?.name || currentUser?.email || 'Unknown',
        deletedAt: new Date().toISOString(),
        blocked: false,
        forced: true
      });
    }
  }

  delete state.formData[key];
  delete state.formStatuses[key];
  if (getSelectedInstanceId(formId) === instanceId) {
    await setSelectedInstanceId(formId, null);
  }
  try {
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData, formStatuses: state.formStatuses, destructionLogs: state.destructionLogs || [] }, { merge: true });
  } catch (e) {
    console.error(e);
  }
}

// 다회차 서식의 실제 저장 키(formId_inst_xxx)를 반환한다. 선택된 회차가 없으면 null.
function instanceStorageKey(formId) {
  const instId = getSelectedInstanceId(formId);
  return instId ? `${formId}_${instId}` : null;
}

export function getFormStatus(formId) {
  const tId = getSelectedTransactionId();
  let key = formId;
  if (isTxForm(formId) && tId) {
    key = `${formId}_${tId}`;
  } else if (isInstanceForm(formId)) {
    key = instanceStorageKey(formId);
    if (!key) return 'todo'; // 아직 회차를 선택/생성하지 않음
  }
  return state.formStatuses[key] || 'todo';
}

export async function setFormStatus(formId, status) {
  if (!canEdit()) return;

  const tId = getSelectedTransactionId();
  let key = formId;
  if (isTxForm(formId) && tId) {
    key = `${formId}_${tId}`;
  } else if (isInstanceForm(formId)) {
    key = instanceStorageKey(formId);
    if (!key) return; // 회차 미선택 상태에서는 상태를 기록할 대상이 없음
  }

  const user = getCurrentUser();
  if (!state.formData[key]) state.formData[key] = {};
  state.formData[key]._lastModifiedBy = user?.name || user?.email || 'Unknown';
  state.formData[key]._lastModifiedAt = new Date().toISOString();

  state.formStatuses[key] = status;

  try {
    await setDoc(doc(db, 'system', 'globalState'), {
      formStatuses: state.formStatuses,
      formData: state.formData
    }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

// ─── Slack 연동 설정 (관리자 설정 화면에서 값만 입력하면 바로 동작) ───
export function getSlackWebhookUrl() {
  return state.integrations?.slackWebhookUrl || '';
}

export function getSlackBotToken() {
  return state.integrations?.slackBotToken || '';
}

export function getSlackAnnounceChannelId() {
  return state.integrations?.slackAnnounceChannelId || '';
}

export function getSlackOrgChannelId() {
  return state.integrations?.slackOrgChannelId || '';
}

export function getSlackApproverIds() {
  return state.integrations?.slackApproverIds || { 기구장: '', 대표이사: '' };
}

export function getSlackBroadcastDmEnabled() {
  return !!state.integrations?.slackBroadcastDmEnabled;
}

export async function setSlackBroadcastDmEnabled(enabled) {
  if (!canEdit()) return;
  state.integrations = { ...(state.integrations || {}), slackBroadcastDmEnabled: !!enabled };
  await saveIntegrations();
}

export async function setSlackWebhookUrl(url) {
  if (!canEdit()) return;
  state.integrations = { ...(state.integrations || {}), slackWebhookUrl: (url || '').trim() };
  await saveIntegrations();
}

export async function setSlackBotToken(token) {
  if (!canEdit()) return;
  state.integrations = { ...(state.integrations || {}), slackBotToken: (token || '').trim() };
  await saveIntegrations();
}

export async function setSlackAnnounceChannelId(channelId) {
  if (!canEdit()) return;
  state.integrations = { ...(state.integrations || {}), slackAnnounceChannelId: (channelId || '').trim() };
  await saveIntegrations();
}

export async function setSlackOrgChannelId(channelId) {
  if (!canEdit()) return;
  state.integrations = { ...(state.integrations || {}), slackOrgChannelId: (channelId || '').trim() };
  await saveIntegrations();
}

export async function setSlackApproverId(roleLabel, userId) {
  if (!canEdit()) return;
  const current = getSlackApproverIds();
  state.integrations = { ...(state.integrations || {}), slackApproverIds: { ...current, [roleLabel]: (userId || '').trim() } };
  await saveIntegrations();
}

async function saveIntegrations() {
  try {
    await setDoc(doc(db, 'system', 'globalState'), { integrations: state.integrations }, { merge: true });
  } catch (e) {
    console.error(e);
  }
}

// ─── 규정 열람 자동 기록 (A-03 규정 열람확인대장) ───
// 열람은 "결재"가 아니라 단순 사실 기록이므로 canEdit() 권한과 무관하게 로그인한 누구나(일반 직원 포함)
// 규정 화면을 열람하는 순간 이름/부서/일시가 자동으로 대장에 남는다. 같은 사용자가 같은 날 다시 열람해도
// 중복 기록하지 않는다.
export async function logRegulationView() {
  const user = getCurrentUser();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];
  const key = 'A-03';
  const existing = state.formData[key] || {};
  const rows = existing.rows || [];

  const userKey = user.uid || user.email || '';
  const alreadyLogged = rows.some(r => r._autoUserId === userKey && r.readDate === today);
  if (alreadyLogged) return;

  const newRow = {
    no: rows.length + 1,
    name: user.name || user.email || '',
    department: user.department || '',
    readDate: today,
    signature: '(시스템 자동기록)',
    _autoUserId: userKey
  };

  const updated = { ...existing, rows: [...rows, newRow], _lastModifiedBy: '시스템(자동 열람기록)', _lastModifiedAt: new Date().toISOString() };
  state.formData[key] = updated;

  try {
    await setDoc(doc(db, 'formData', key), updated);
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
  } catch (e) {
    console.error('규정 열람 자동 기록 실패:', e);
  }
}

// ─── 공지문 등 열람 확인 자동 기록 (A-03 규정 열람확인대장과 동일한 방식의 범용 버전) ───
// Slack은 봇이 DM/메시지를 누가 언제 읽었는지 알려주는 API를 제공하지 않는다(공식적으로 read receipt 없음).
// 그래서 "누가 확인했는지"를 문서에 남기려면, Slack은 알림+링크만 보내고, 그 링크를 눌러 앱에
// 들어오는 순간(이미 로그인돼 있으므로) 이름/부서/확인시각을 우리 시스템이 직접 기록하는 방식을 쓴다.
// canEdit() 권한과 무관하게 로그인한 누구나(일반 직원 포함) 기록 대상이며, 서명(결재) 완료 후의
// "최종 확정된" 문서를 열람했을 때만 기록한다(초안 작성 중 여러 번 열어보는 건 열람이 아니므로 제외).
export async function logDocumentAck(formId) {
  const user = getCurrentUser();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];
  const existing = state.formData[formId] || {};
  const ackLog = existing._ackLog || [];

  const userKey = user.uid || user.email || '';
  const alreadyLogged = ackLog.some(r => r.userId === userKey && r.ackDate === today);
  if (alreadyLogged) return;

  const newEntry = {
    name: user.name || user.email || '',
    department: user.department || '',
    ackDate: today,
    ackTime: new Date().toLocaleString(),
    userId: userKey
  };

  const updated = { ...existing, _ackLog: [...ackLog, newEntry] };
  state.formData[formId] = updated;

  try {
    await setDoc(doc(db, 'formData', formId), updated);
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
  } catch (e) {
    console.error('공지문 열람 확인 기록 실패:', e);
  }
}

export function getDocumentAckLog(formId) {
  return (state.formData[formId] || {})._ackLog || [];
}

export function getFormData(formId) {
  if (isInstanceForm(formId)) {
    const key = instanceStorageKey(formId);
    return key ? (state.formData[key] || {}) : {};
  }
  return state.formData[formId] || {};
}

export async function setFormData(formId, formDataObj) {
  if (!canEdit()) {
    customAlert("권한 안내", "편집 권한이 없습니다. (읽기 전용)", "warning");
    return;
  }

  formDataObj._lastModifiedBy = currentUser.email;
  formDataObj._lastModifiedAt = new Date().toISOString();

  // 다회차 서식(C-02 등)은 formId 자체가 아니라 현재 선택된 회차 키에 저장한다.
  // 아직 회차가 없으면(예: 상태만 먼저 바뀐 경우) 새 회차를 만들어 저장한다.
  let storageKey = formId;
  if (isInstanceForm(formId)) {
    storageKey = instanceStorageKey(formId);
    if (!storageKey) {
      const newInstId = await createFormInstance(formId, {});
      storageKey = `${formId}_${newInstId}`;
    }
  }

  state.formData[storageKey] = formDataObj;

  try {
    // Save to the global doc or specific form doc.
    // To satisfy "데이터베이스는 각 양식에 맞게 저장될수있게", let's also save to a separate collection
    // so the admin can see forms individually in the database.
    await setDoc(doc(db, 'formData', storageKey), formDataObj);

    // And keep the monolithic state updated for quick loading
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export function getExportCaseState(txId) {
  // If it doesn't exist yet for some reason, migrate it on the fly
  if (!state.exportCaseStates[txId]) {
    state.exportCaseStates[txId] = migrateOldTxToNewState(txId, state.formData || {});
  }
  return state.exportCaseStates[txId];
}

export async function saveExportCaseState(txId, exportState) {
  if (!canEdit()) {
    customAlert("권한 안내", "편집 권한이 없습니다. (읽기 전용)", "warning");
    return;
  }
  state.exportCaseStates[txId] = exportState;
  
  // Flatten back to legacy so legacy renderer works
  const flattenedForms = flattenStateToLegacyForms(exportState, txId);
  for (const [formId, formDataObj] of Object.entries(flattenedForms)) {
    // merge carefully with existing data
    state.formData[formId] = { ...state.formData[formId], ...formDataObj };
  }
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { 
      exportCaseStates: state.exportCaseStates,
      formData: state.formData 
    }, { merge: true });
  } catch(e) {
    console.error("Failed to save export case state", e);
  }
}

export function getCompanyInfo() {
  return state.companyInfo;
}

/** [수정 #6] CP 단기목표등급을 반환하는 전용 getter — Z-01 q_cp_grade readonly 자동 주입에 사용 */
export function getTargetGrade() {
  return state.targetGrade || '';
}

export async function setCompanyInfo(infoObj) {
  if (!canEdit()) {
    customAlert("권한 안내", "편집 권한이 없습니다. (읽기 전용)", "warning");
    return;
  }
  state.companyInfo = { ...state.companyInfo, ...infoObj };
  try {
    await setDoc(doc(db, 'system', 'globalState'), { companyInfo: state.companyInfo }, { merge: true });
  } catch (e) {
    console.error(e);
  }
}

// ── Product / Item Master State ──
export function getProducts() {
  return state.products && state.products.length > 0 ? state.products : defaultProducts;
}

export function getSelectedProductId() {
  return state.selectedProductId || (getProducts()[0]?.id) || 'prod_1';
}

export async function setSelectedProductId(id) {
  state.selectedProductId = id;
  // Also reset selectedTransactionId when product changes
  state.selectedTransactionId = null;
  try {
    await setDoc(doc(db, 'system', 'globalState'), { 
      selectedProductId: id,
      selectedTransactionId: null
    }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export function getSelectedTransactionId() {
  if (state.selectedTransactionId) return state.selectedTransactionId;
  // Auto-select first transaction for the current product if available
  const prodId = getSelectedProductId();
  if (prodId) {
    const prodTxs = state.transactions.filter(t => t.prodId === prodId);
    if (prodTxs.length > 0) return prodTxs[0].id;
  }
  return null;
}

export async function setSelectedTransactionId(id) {
  state.selectedTransactionId = id;
  try {
    await setDoc(doc(db, 'system', 'globalState'), { selectedTransactionId: id }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export async function addProduct(product) {
  if (!canEdit()) return;
  const currentProds = getProducts();
  const newId = product.id || `prod_${Date.now()}`;
  const newProduct = { ...product, id: newId };
  state.products = [...currentProds, newProduct];
  state.selectedProductId = newId;
  try {
    await setDoc(doc(db, 'system', 'globalState'), { 
      products: state.products,
      selectedProductId: newId
    }, { merge: true });
  } catch(e) {
    console.error(e);
  }
  return newProduct;
}

export async function deleteProduct(prodId) {
  if (!canEdit()) return;
  const currentProds = getProducts();
  
  // 1. Delete all associated transactions and their form data first
  if (state.transactions) {
    const txsToDelete = state.transactions.filter(t => t.prodId === prodId);
    for (const tx of txsToDelete) {
      await deleteTransaction(tx.id);
    }
  }

  // 2. Delete the product itself
  state.products = currentProds.filter(p => p.id !== prodId);
  if (state.products.length === 0) {
    state.products = [...defaultProducts];
  }
  
  // Update selected product ID if the deleted one was selected
  if (state.selectedProductId === prodId) {
    state.selectedProductId = state.products[0].id;
  }
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { 
      products: state.products,
      selectedProductId: state.selectedProductId
    }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export async function updateProduct(prodId, updateFields) {
  if (!canEdit()) return;
  const currentProds = getProducts();
  state.products = currentProds.map(p => {
    if (p.id === prodId) return { ...p, ...updateFields };
    return p;
  });
  try {
    await setDoc(doc(db, 'system', 'globalState'), { products: state.products }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export async function lockProduct(prodId) {
  if (!canEdit()) return;
  const currentProds = getProducts();
  
  // 5 years from now
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 5);
  const formattedExpiry = expiry.toISOString().split('T')[0];

  state.products = currentProds.map(p => {
    if (p.id === prodId) return { ...p, isLocked: true, lockedDate: new Date().toISOString().split('T')[0], lockedExpiryDate: formattedExpiry };
    return p;
  });
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { products: state.products }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

// ── 별지/별표 공식 서식 법정 PDF (Netlify Blobs에 실제 파일, Firestore엔 메타데이터만) ──
export function getLegalPdfInfo(formId) {
  return (state.legalPdfs || {})[formId] || null;
}

export async function uploadLegalPdf(formId, file) {
  if (!canEdit()) return { error: '편집 권한이 없습니다.' };
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const user = getCurrentUser();
  const res = await authFetch('/.netlify/functions/legal_pdf_upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId, filename: file.name, pdfBase64: base64, uploadedBy: user?.name || user?.email || 'unknown' }),
  });
  const data = await res.json();
  if (!res.ok) return { error: data.error || '업로드 실패' };
  state.legalPdfs = { ...(state.legalPdfs || {}), [formId]: data.meta };
  return { ok: true, meta: data.meta };
}

export async function deleteLegalPdf(formId) {
  if (!canEdit()) return { error: '편집 권한이 없습니다.' };
  const res = await authFetch('/.netlify/functions/legal_pdf_delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId }),
  });
  const data = await res.json();
  if (!res.ok) return { error: data.error || '삭제 실패' };
  const next = { ...(state.legalPdfs || {}) };
  delete next[formId];
  state.legalPdfs = next;
  return { ok: true };
}

export function getCurrentRegulation() {
  return state.currentRegulation || defaultData.currentRegulation;
}

export async function updateRegulation(revisions) {
  if (!canEdit() || !revisions || revisions.length === 0) return;
  
  let currentReg = [...getCurrentRegulation()];
  
  revisions.forEach(rev => {
    // rev structure from A-01 revisionTable: { before: 'clauseId', after: 'new text', reason: '...' }
    // if before exists, find and update
    // if before is empty but after has text, it's a new clause (we could try to parse "제X조" from after)
    const targetIdx = currentReg.findIndex(c => c.clauseId === rev.before);
    
    // Parse clause ID from the new text if it looks like "제X조"
    const match = rev.after.match(/^(제\d+조[^\n]*)/);
    const newClauseId = match ? match[1].trim() : rev.before || `신설 조항`;
    
    if (targetIdx !== -1) {
      if (rev.after.trim() === '') {
        // Delete clause
        currentReg.splice(targetIdx, 1);
      } else {
        // Update clause
        currentReg[targetIdx] = { clauseId: newClauseId, text: rev.after };
      }
    } else if (rev.after.trim() !== '') {
      // Add new clause
      currentReg.push({ clauseId: newClauseId, text: rev.after });
    }
  });

  // Sort them loosely by clause number if possible, but for now just keep as is
  state.currentRegulation = currentReg;
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { currentRegulation: state.currentRegulation }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export function getTransactions() {
  return state.transactions || [];
}

export async function addTransaction(prodId, txName, exportDate, country, buyer) {
  if (!canEdit()) return null;
  
  const newTxId = 'tx_' + Date.now();
  const newTx = {
    id: newTxId,
    prodId,
    name: txName,
    country: country || '',
    buyer: buyer || '',
    exportDate,
    isLocked: false,
    lockedDate: null,
    lockedExpiryDate: null,
    isDeletable: true
  };
  
  if (!state.transactions) state.transactions = [];
  state.transactions.push(newTx);
  
  // 템플릿(Product DB)에서 Z-01 기본 스펙 가져와서(Pull) 현재 거래(Case)의 Z-01 초기값으로 세팅
  const product = getProducts().find(p => p.id === prodId);
  if (product) {
    const initialZ01 = {
      productName: product.name,
      modelName: product.model,
      controlNumber: product.controlNumber,
      specSummary: product.specSummary,
      // 거래 맞춤형으로 덮어쓸 값들
      targetCountry: country || '',
      buyerName: buyer || ''
    };
    state.formData[`Z-01_${newTxId}`] = initialZ01;
  }
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { 
      transactions: state.transactions,
      formData: state.formData
    }, { merge: true });
  } catch(e) {
    console.error(e);
  }
  return newTx;
}

export async function lockTransaction(txId) {
  if (!canEdit()) return;
  const txs = getTransactions();
  const tx = txs.find(t => t.id === txId);
  if (!tx) return;

  const now = new Date();
  let baseDate = new Date(tx.exportDate || now);
  // 5 years from baseDate
  baseDate.setFullYear(baseDate.getFullYear() + 5);
  const formattedExpiry = baseDate.toISOString().split('T')[0];

  tx.isLocked = true;
  tx.lockedDate = now.toISOString().split('T')[0];
  tx.lockedExpiryDate = formattedExpiry;
  
  // Create snapshots of critical regulatory documents at the time of export
  const regulatoryDocs = ['A-01', 'A-04', 'B-01', 'D-01', 'D-03'];
  const snapshotRefs = {};
  
  // 1. Global Forms Snapshots
  for (const docId of regulatoryDocs) {
    const docData = getFormData(docId);
    if (docData && Object.keys(docData).length > 0) {
      const snap = await createSnapshot(docId, docData, `출하(${tx.name}) 기준 스냅샷`);
      if (snap) {
        snapshotRefs[docId] = snap.id;
      }
    }
  }

  // 2. Case-specific Forms Snapshots (Z-01, G-01, F-01, L-05, etc.)
  const caseForms = ['Z-01', 'G-01', 'F-01', 'F-02', 'L-01', 'L-02', 'L-03', 'L-04', 'L-05', 'H-01'];
  for (const docId of caseForms) {
    const docData = getCaseFormData(docId, tx.id);
    if (docData && Object.keys(docData).length > 0) {
      const snap = await createSnapshot(docId, docData, `출하(${tx.name}) Export Case 스냅샷`);
      if (snap) {
        snapshotRefs[docId] = snap.id;
      }
    }
  }
  
  tx.snapshotRefs = snapshotRefs;

  try {
    await setDoc(doc(db, 'system', 'globalState'), { transactions: state.transactions }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

// ─── 잠금 해제 (관리자 전용) ───
// 과거 이력 데이터를 백필하는 과정에서 "전자서명"이나 "보관 처리"를 눌러 의도치 않게 문서가
// 영구 잠겨버린 경우를 위한 구제 절차. 아무나 풀 수 있으면 잠금(=불변 감사 증적)의 의미가 없어지므로
// Master 권한으로 제한하고, 누가/언제/왜 풀었는지를 기록으로 남긴다 — "몰래 풀림"이 아니라
// "책임자가 확인하고 푼 기록이 남는" 방식으로 설계했다.
export function canUnlock() {
  const role = getCurrentUser()?.role;
  return role === 'Master' || role === 'ADMIN';
}

export async function unlockTransaction(txId, reason) {
  if (!canUnlock()) {
    customAlert('권한 없음', '거래 잠금 해제는 최고관리자(Master) 권한이 필요합니다.', 'warning');
    return false;
  }
  const tx = (state.transactions || []).find(t => t.id === txId);
  if (!tx || !tx.isLocked) return false;

  if (!state.unlockLogs) state.unlockLogs = [];
  state.unlockLogs.push({
    type: 'transaction',
    txId: tx.id,
    txName: tx.name,
    previousLockedDate: tx.lockedDate || null,
    reason: reason || '(사유 미기재)',
    unlockedBy: currentUser?.name || currentUser?.email || 'Unknown',
    unlockedAt: new Date().toISOString()
  });

  tx.isLocked = false;
  // lockedDate/lockedExpiryDate/snapshotRefs는 "과거에 한 번 잠겼었다"는 이력으로 그대로 남겨둔다
  // (스냅샷 자체는 삭제하지 않으므로 그 시점의 증빙은 계속 보존됨).

  try {
    await setDoc(doc(db, 'system', 'globalState'), {
      transactions: state.transactions,
      unlockLogs: state.unlockLogs
    }, { merge: true });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

export function getUnlockLogs() {
  return state.unlockLogs || [];
}

// 서명(전자서명) 취소 — 서명 즉시 폼이 영구 잠기므로, 잘못 서명한 개별 서식을 되돌리는 용도.
export async function revokeSignature(formId, txId, reason) {
  if (!canUnlock()) {
    customAlert('권한 없음', '전자서명 취소는 최고관리자(Master) 권한이 필요합니다.', 'warning');
    return false;
  }
  const key = (isTxForm(formId) && txId) ? `${formId}_${txId}` : formId;
  const data = state.formData[key];
  if (!data || !data.signatureInfo) return false;

  if (!state.unlockLogs) state.unlockLogs = [];
  state.unlockLogs.push({
    type: 'signature',
    formId,
    txId: txId || null,
    previousSigner: data.signatureInfo.name || null,
    previousSignedAt: data.signatureInfo.timestamp || null,
    reason: reason || '(사유 미기재)',
    unlockedBy: currentUser?.name || currentUser?.email || 'Unknown',
    unlockedAt: new Date().toISOString()
  });

  delete data.signatureInfo;

  try {
    await setDoc(doc(db, 'system', 'globalState'), {
      formData: state.formData,
      unlockLogs: state.unlockLogs
    }, { merge: true });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

export async function deleteTransaction(txId) {
  if (!canEdit()) return;
  if (!state.transactions) return;

  // [Fix #2] 로컬 상태 변경 전 스냅샷 (롤백용)
  const prevTransactions = [...state.transactions];
  const prevFormData = { ...state.formData };
  const prevFormStatuses = { ...state.formStatuses };
  const prevDestructionLogs = state.destructionLogs ? [...state.destructionLogs] : [];

  const txToDel = state.transactions.find(t => t.id === txId);
  if (txToDel && txToDel.isLocked) {
    // [수정] 잠긴(법정 5년 보존) 거래는 로그만 남기고 실제로는 삭제되던 문제 — UI의 비활성화 버튼을
    // 우회해서 이 함수가 직접 호출되면 그대로 삭제가 진행되어 법정 보존 의무가 깨질 수 있었음.
    // 이제는 시도 자체를 차단하고, 그 시도 기록만 destructionLogs에 남긴다(삭제는 일어나지 않음).
    if (!state.destructionLogs) state.destructionLogs = [];
    const prod = state.products.find(p => p.id === txToDel.prodId);
    state.destructionLogs.push({
      txId: txToDel.id,
      txName: txToDel.name,
      prodName: prod ? prod.name : '알수없음',
      attemptedBy: currentUser?.name || currentUser?.email || 'Unknown',
      attemptedAt: new Date().toISOString(),
      blocked: true
    });
    try {
      await setDoc(doc(db, 'system', 'globalState'), { destructionLogs: state.destructionLogs }, { merge: true });
    } catch (e) {
      console.error(e);
    }
    customAlert('삭제 불가', '보관(잠금) 처리된 거래는 법정 5년 보존 의무 대상이라 삭제할 수 없습니다.\n먼저 관리자(Master) 권한으로 "잠금 해제"를 진행한 뒤 다시 시도하세요.', 'warning');
    return;
  }

  // 로컬 상태 업데이트
  state.transactions = state.transactions.filter(t => t.id !== txId);

  // 삭제된 거래에 속한 formData / formStatuses 고아 데이터 정리
  const formDataKeysToDelete = Object.keys(state.formData).filter(k => k.endsWith(`_${txId}`));
  formDataKeysToDelete.forEach(k => delete state.formData[k]);

  const statusKeysToDelete = Object.keys(state.formStatuses).filter(k => k.endsWith(`_${txId}`));
  statusKeysToDelete.forEach(k => delete state.formStatuses[k]);

  // [Fix #2] writeBatch로 Atomic 처리 — 중간 실패 시 전체 롤백
  try {
    const batch = writeBatch(db);

    // 1. 통합 globalState 업데이트 (transactions + formStatuses + destructionLogs)
    batch.set(doc(db, 'system', 'globalState'), {
      transactions: state.transactions,
      formData: state.formData,
      formStatuses: state.formStatuses,
      destructionLogs: state.destructionLogs || []
    }, { merge: true });

    // 2. formData 개별 컬렉션에서 고아 문서 삭제
    formDataKeysToDelete.forEach(k => {
      batch.delete(doc(db, 'formData', k));
    });

    await batch.commit(); // ← 원자적 실행: 모두 성공하거나 모두 실패
  } catch (e) {
    // Firestore 쓰기 실패 시 로컬 상태 원상복구 (Data Consistency 유지)
    console.error('[deleteTransaction] Firestore atomic 삭제 실패, 로컬 상태를 원복합니다.', e);
    state.transactions = prevTransactions;
    state.formData = prevFormData;
    state.formStatuses = prevFormStatuses;
    state.destructionLogs = prevDestructionLogs;
    throw e; // 호출부에서 에러 핸들링 가능하도록 re-throw
  }
}

export async function updateTransaction(txId, updateFields) {
  if (!canEdit()) return;
  if (!state.transactions) return;
  state.transactions = state.transactions.map(t => {
    if (t.id === txId) return { ...t, ...updateFields };
    return t;
  });
  try {
    await setDoc(doc(db, 'system', 'globalState'), { transactions: state.transactions }, { merge: true });
  } catch(e) {
    console.error(e);
  }
}

export function getSnapshots(formId) {
  const snaps = state.snapshots || [];
  return snaps.filter(s => s.formId === formId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export async function createSnapshot(formId, data, versionNote = '') {
  if (!canEdit()) return null;
  if (!state.snapshots) state.snapshots = [];
  
  const existing = state.snapshots.filter(s => s.formId === formId);
  const version = versionNote || `v1.${existing.length}`;
  
  const newSnap = {
    id: 'snap_' + Date.now() + Math.floor(Math.random()*1000),
    formId,
    version,
    data: JSON.parse(JSON.stringify(data)),
    timestamp: new Date().toISOString()
  };
  
  state.snapshots.push(newSnap);
  
  try {
    await setDoc(doc(db, 'system', 'globalState'), { snapshots: state.snapshots }, { merge: true });
    return newSnap;
  } catch(e) {
    console.error(e);
    return null;
  }
}

// ── "서명 문서함" — 회사 차원 서류(거래 건에 안 묶이는 A~K 시리즈)의 전자서명 완료 이력 ──
// 거래별 서류(H-01 확정 시 lockTransaction이 스냅샷을 남기는 것)와는 별개의 목록이다.
// Slack 승인(slack_interactions.js, Admin SDK로 동일한 필드 구조를 직접 씀)과 앱 내 전자서명
// (renderer.js의 btn-electronic-sign) 양쪽에서 모두 이 목록에 항목을 추가해, 서명 경로와
// 무관하게 하나의 목록으로 조회할 수 있게 한다.
export function getSignedDocuments() {
  return state.signedDocuments || [];
}

/**
 * @param {Object} entry
 * @param {string} entry.formId
 * @param {string} entry.storageKey
 * @param {string} entry.formTitle
 * @param {string} [entry.revision]        A-01/규정처럼 버전이 있는 문서의 차수
 * @param {string} [entry.drafter]         기안자
 * @param {string} entry.approver          결재자(서명자) 실명
 * @param {string} [entry.approverRoleLabel]
 * @param {string} [entry.draftDate]       기안일
 * @param {string} entry.approvedAt        승인/서명 일시 (ISO)
 * @param {'slack'|'app'} entry.signedVia
 * @param {string} entry.pdfUrl
 * @param {string} [entry.pdfPath]
 * @param {string} [entry.sha256]
 */
export async function logSignedDocument(entry) {
  const newEntry = {
    id: 'sd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
    ...entry
  };
  state.signedDocuments = [...(state.signedDocuments || []), newEntry];
  try {
    await setDoc(doc(db, 'system', 'globalState'), { signedDocuments: state.signedDocuments }, { merge: true });
  } catch (e) {
    console.error('[logSignedDocument] 저장 실패:', e);
  }
  return newEntry;
}

export function getCaseFormData(formId, txId) {
  const tId = txId || getSelectedTransactionId();
  if (!tId) return {}; // No case selected
  const key = `${formId}_${tId}`;
  return state.formData[key] || {};
}

// Backward compatibility (if logic.js still calls getProductFormData)
export function getProductFormData(formId, prodId) {
  return getCaseFormData(formId, getSelectedTransactionId());
}

export async function setCaseFormData(formId, txId, data) {
  if (!canEdit()) return;
  const tId = txId || getSelectedTransactionId();
  if (!tId) return;

  const tx = (state.transactions || []).find(t => t.id === tId);
  if (tx && tx.isLocked) {
    customAlert('보관 서류 수정 불가', `보관 처리된 거래 서류입니다. (수정 불가)\n만료일: ${tx.lockedExpiryDate || 'N/A'}`, 'warning');
    return;
  }
  
  const key = `${formId}_${tId}`;
  
  data._lastModifiedAt = new Date().toISOString();
  data._lastModifiedBy = currentUser?.name || currentUser?.email || 'Unknown';

  state.formData[key] = data;

  try {
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
    
    // F-04(판정대장) 저장 시 해당 거래의 제품 마스터(Product DB) 양방향 동기화
    if (formId === 'F-04' && tx && tx.prodId) {
      const updateObj = {};
      if (data.q_decision_type) updateObj.classificationType = data.q_decision_type;
      if (data.q_control_number) updateObj.controlNumber = data.q_control_number;
      if (data.q_decision_date) updateObj.classificationDate = data.q_decision_date;
      if (data.q_notes) updateObj.specSummary = data.q_notes;
      
      // Update the product to reflect the new classification decision globally
      if (Object.keys(updateObj).length > 0) {
        await updateProduct(tx.prodId, updateObj);
      }
    }
  } catch(e) {
    console.error(e);
  }
}

// Backward compatibility
export async function setProductFormData(formId, prodId, data) {
  await setCaseFormData(formId, getSelectedTransactionId(), data);
}

// ── Export / Import ──
// Data is now in Firestore, so import/export might just manipulate the DB
export async function exportAllData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CP_Manager_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importData(file) {
  if (!canEdit()) {
    throw new Error("편집 권한이 없습니다.");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        state = { ...defaultData, ...data };
        await setDoc(doc(db, 'system', 'globalState'), state);
        
        // Update individual formData docs
        const batch = writeBatch(db);
        for (const [formId, fData] of Object.entries(state.formData)) {
          batch.set(doc(db, 'formData', formId), fData);
        }
        await batch.commit();

        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
}

export async function loadDummyData() {
  const { cpSampleDummyData } = await import('./data/dummyData.js');
  state = {
    ...state,
    companyInfo: { ...cpSampleDummyData.companyInfo },
    targetGrade: cpSampleDummyData.targetGrade,
    applicationType: cpSampleDummyData.applicationType,
    formData: {
      ...state.formData,
      ...cpSampleDummyData.formData
    }
  };
  return state;
}

export async function saveCurrentStateToDb() {
  if (!canEdit()) {
    throw new Error("편집 권한이 없습니다. (ADMIN 또는 EDITOR 권한 필요)");
  }
  await setDoc(doc(db, 'system', 'globalState'), state);
  
  // Update individual formData docs
  const batch = writeBatch(db);
  for (const [formId, fData] of Object.entries(state.formData)) {
    batch.set(doc(db, 'formData', formId), fData);
  }
  await batch.commit();
  return state;
}

// ── Data Cascading (Auto-fill) ──
export function getAutoFillValue(key, currentFormId) {
  // 1. Company Info Mapping
  const comp = state.companyInfo || {};
  if (key === 'companyName' || key === 'exporterName') return comp.name || '';
  if (key === 'ceoName') return comp.ceo || '';
  if (key === 'regNumber') return comp.registrationNumber || '';
  if (key === 'address') return comp.address || '';
  if (key === 'tradeCode') return comp.tradeRegistrationNumber || '';
  
  // 1.5 Z-01 (사전 진단표) -> F-01/F-02 (판정서) 자동 매핑 (Export Case 기준)
  if (currentFormId === 'F-01' || currentFormId === 'F-02') {
    const tId = getSelectedTransactionId();
    const z01Data = tId ? state.formData[`Z-01_${tId}`] : {};
    
    if (z01Data) {
      if (key === 'munition') {
        if (z01Data.q_defense === '예') return 'yes';
        if (z01Data.q_defense === '아니오') return 'no';
      }
      if (key === 'dualUse') {
        if (z01Data.q_strategic === '해당') return 'yes';
        if (z01Data.q_strategic === '비해당') return 'no';
      }
      if (key === 'catchAll') {
        if (z01Data.q_catchall === '예') return 'yes';
        if (z01Data.q_catchall === '아니오') return 'no';
      }
    }
  }
  
  // 2. Scan other forms for the most recently updated value
  //    (격리 표시된 값 — "이 서식만 다르게 적용"으로 지정된 값 — 은 다른 서식의 자동입력 소스에서 제외)
  const sources = getFieldSources(key, currentFormId);
  let latestValue = '';
  let latestTime = 0;
  for (const s of sources) {
    const t = new Date(s.lastModifiedAt || 0).getTime();
    if (t > latestTime) {
      latestTime = t;
      latestValue = s.value;
    }
  }
  return latestValue;
}

// ── 서식 간 값 연동(자동입력/충돌감지)을 위한 공용 조회 ──
// 현재 서식(currentFormId) 자신의 저장분은 제외하고, 같은 key에 값이 저장된 다른 서식들을 모두 찾는다.
// _isolatedFields로 표시된("이 서식만 다르게 적용") 값은 다른 서식에 퍼지면 안 되므로 제외한다.
export function getFieldSources(key, currentFormId) {
  const currentTxId = getSelectedTransactionId();
  let selfKey = currentFormId;
  if (isTxForm(currentFormId) && currentTxId) {
    selfKey = `${currentFormId}_${currentTxId}`;
  } else if (isInstanceForm(currentFormId)) {
    // 다회차 서식은 "현재 선택된 회차"가 자기 자신이다. 이렇게 안 하면 방금 이 회차에서
    // 저장한 값이 자기 자신과 비교되어 불필요한 충돌 알림이 뜰 수 있다(다른 회차는 정상적으로 비교 대상 유지).
    const instKey = instanceStorageKey(currentFormId);
    if (instKey) selfKey = instKey;
  }
  const sources = [];

  for (const [storageKey, fData] of Object.entries(state.formData)) {
    if (storageKey === selfKey) continue;
    // 다회차 서식(C-01~03 등)의 "같은 서식의 다른 회차"는 서로 독립된 사건(매번 다른 교육/행사)이다.
    // 값이 달라도 진짜 충돌이 아니므로, 같은 formId의 다른 회차 키는 비교 대상에서 완전히 제외한다.
    if (isInstanceForm(currentFormId) && storageKey.startsWith(`${currentFormId}_inst_`)) continue;
    // txId가 포함된 키인데 현재 거래와 다른 txId라면 건너뜀 (크로스-거래 오염 방지)
    if (storageKey.includes('_tx_') && currentTxId && !storageKey.endsWith(`_${currentTxId}`)) continue;
    if (!fData || typeof fData[key] !== 'string' || fData[key].trim() === '') continue;
    if (fData._isolatedFields && fData._isolatedFields.includes(key)) continue;

    const formId = storageKeyToFormId(storageKey);
    sources.push({ storageKey, formId, value: fData[key], lastModifiedAt: fData._lastModifiedAt || null });
  }
  return sources;
}

// 저장 키(예: "L-01_tx_123", "C-02_inst_456_x9", "Z-01")에서 원래 formId만 추출한다.
function storageKeyToFormId(storageKey) {
  if (storageKey.includes('_tx_')) return storageKey.split('_tx_')[0];
  if (storageKey.includes('_inst_')) return storageKey.split('_inst_')[0];
  return storageKey;
}

// 현재 서식보다 프로세스 흐름(processFlow) 순서상 "뒤"에 있는 서식들 중,
// 해당 key에 이미 값이 채워져 저장되어 있는 것만 골라 반환한다.
// "이 시점부터 이후 전체 적용" 선택 시, 이미 작성 완료된 뒤쪽 서식까지 덮어쓸지 물어보는 데 사용.
export function getDownstreamFilledForms(key, currentFormId) {
  const seq = getFlatFormSequence();
  const idx = seq.findIndex(e => e.formId === currentFormId);
  if (idx === -1) return [];
  const downstreamIds = new Set(seq.slice(idx + 1).map(e => e.formId));
  const currentTxId = getSelectedTransactionId();
  const result = [];

  for (const [storageKey, fData] of Object.entries(state.formData)) {
    const formId = storageKeyToFormId(storageKey);
    if (!downstreamIds.has(formId)) continue;
    // 다회차 서식은 회차마다 독립된 사건이므로 "이후 서식 일괄 적용"의 자동 덮어쓰기 대상에서 제외.
    // (다회차 서식에 값을 적용하고 싶다면 사용자가 해당 회차를 직접 열어 입력해야 한다.)
    if (isInstanceForm(formId)) continue;
    if (storageKey.includes('_tx_') && currentTxId && !storageKey.endsWith(`_${currentTxId}`)) continue;
    if (fData && typeof fData[key] === 'string' && fData[key].trim() !== '' && fData[key] !== undefined) {
      result.push({ storageKey, formId, value: fData[key] });
    }
  }
  return result;
}

// "이 시점부터 이후 전체 적용"을 실행한다.
// overwriteFilled=false면 이미 채워진 뒤쪽 서식은 건드리지 않는다(앞으로 채울 빈 서식은
// getAutoFillValue가 자연히 새 값을 따라가므로 별도 처리가 필요 없음).
// overwriteFilled=true면 이미 채워진 뒤쪽 서식들의 저장값도 실제로 새 값으로 덮어쓴다.
export async function propagateFieldForward(key, newValue, currentFormId, { overwriteFilled = false } = {}) {
  if (!overwriteFilled) return;
  const targets = getDownstreamFilledForms(key, currentFormId);
  if (targets.length === 0) return;

  const now = new Date().toISOString();
  targets.forEach(t => {
    state.formData[t.storageKey][key] = newValue;
    state.formData[t.storageKey]._lastModifiedAt = now;
  });

  try {
    await setDoc(doc(db, 'system', 'globalState'), { formData: state.formData }, { merge: true });
  } catch (e) {
    console.error('[propagateFieldForward] 저장 오류:', e);
  }
}

export function getDestructionLogs() {
  return state.destructionLogs || [];
}

export async function applyMockData(mockData) {
  if (!canEdit()) return;
  
  // 현재 메모리의 상태를 로컬 스토리지에 '안전하게 백업'
  localStorage.setItem('cp_backup_state', JSON.stringify(state));
  
  // 목업 데이터로 메모리 상태 덮어쓰기
  state.products = mockData.products || [];
  state.transactions = mockData.transactions || [];
  state.formStatuses = mockData.formsStatus || {};
  state.formData = mockData.formsData || {};
  state.companyInfo = { ...state.companyInfo, ...(mockData.companyInfo || {}) };
  state.selectedProductId = null;
  state.selectedTransactionId = null;
  
  // 중요: DB(Firestore)에 저장하지 않음! (오직 화면 프리뷰용)
}

export async function rollbackMockData() {
  if (!canEdit()) return;
  const backup = localStorage.getItem('cp_backup_state');
  if (!backup) return;
  
  // 로컬 스토리지의 백업본으로 메모리 상태 복구
  const backupState = JSON.parse(backup);
  state = backupState;
  localStorage.removeItem('cp_backup_state');
  
  // 중요: DB에 저장하지 않음. DB는 처음부터 건드리지 않았음.
}
