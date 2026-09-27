// ============================================================
// Firestore 저장 계층 (스키마 v2). 배치 규칙은 ./layout.js 참고.
// store.js는 화면용 메모리 state를 유지하고, 저장은 모두 이 모듈의 "대상 문서 단위" 함수로 한다.
// ============================================================
import { db } from '../firebase.js';
import {
  doc, getDoc, getDocs, setDoc, deleteDoc, collection, writeBatch,
} from 'firebase/firestore';
import {
  COL, CONFIG, SCHEMA_VERSION, safeId, clean, companyDoc, integrationsDoc, regulationDoc,
  formDataDoc, orderedDoc, auditLogDoc, newId, planMigration, planFreshStart, assembleState, stateToOps,
} from './layout.js';

const ADMIN_ROLES = ['Master', 'ADMIN'];
const isAdmin = (user) => !!user && ADMIN_ROLES.includes(user.role);

async function readCol(name) {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map(d => ({ id: d.id, data: d.data() }));
}
async function readDoc(col, id) {
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? snap.data() : null;
}

// 500건 제한을 넘지 않도록 나눠서 커밋
export async function commitOps(ops, chunk = 400) {
  for (let i = 0; i < ops.length; i += chunk) {
    const batch = writeBatch(db);
    for (const o of ops.slice(i, i + chunk)) {
      if (o.delete) batch.delete(doc(db, o.col, o.id));
      else batch.set(doc(db, o.col, o.id), o.data);
    }
    await batch.commit();
  }
}

// ── 스키마 상태 ──
// 'current'  : v2 사용 중
// 'legacy'   : v2 표시가 없고 v1(globalState) 데이터가 있음 → 관리자 이전 필요
// 'empty'    : 아무 데이터도 없음 (첫 사용)
export async function getSchemaStatus(user) {
  const schema = await readDoc(COL.config, CONFIG.schema).catch(() => null);
  if (schema && schema.version >= SCHEMA_VERSION) return { status: 'current', schema };
  if (!isAdmin(user)) return { status: 'legacy-unknown' };
  const legacy = await readDoc('system', 'globalState').catch(() => null);
  return legacy ? { status: 'legacy', legacy } : { status: 'empty' };
}

export async function migrateLegacy(user, legacy) {
  const { ops, summary } = planMigration(legacy, { uid: user.uid, migratedBy: user.email || user.name || '' });
  await commitOps(ops);
  return summary;
}

export async function startFresh(user) {
  await commitOps(planFreshStart({ migratedBy: user.email || user.name || '' }));
}

export async function loadAll(user, defaults) {
  const admin = isAdmin(user);
  const [company, integrations, regulation, legal, secret, formDocs, products, transactions,
    exportCases, signedDocuments, snapshots, auditLogs, acks, legalPdfs, prefs] = await Promise.all([
    readDoc(COL.config, CONFIG.company),
    readDoc(COL.config, CONFIG.integrations),
    readDoc(COL.config, CONFIG.regulation),
    readDoc(COL.config, CONFIG.legal),
    admin ? readDoc(COL.secrets, 'slack').catch(() => null) : Promise.resolve(null),
    readCol(COL.formData),
    readCol(COL.products).then(r => r.map(x => x.data)),
    readCol(COL.transactions).then(r => r.map(x => x.data)),
    readCol(COL.exportCases),
    readCol(COL.signedDocuments).then(r => r.map(x => ({ id: x.id, ...x.data }))),
    readCol(COL.snapshots).then(r => r.map(x => ({ id: x.id, ...x.data }))),
    readCol(COL.auditLogs).then(r => r.map(x => x.data)),
    readCol(COL.acknowledgements).then(r => r.map(x => x.data)),
    readCol(COL.legalPdfs),
    user?.uid ? readDoc(COL.userPrefs, user.uid) : Promise.resolve(null),
  ]);
  return assembleState({
    company, integrations, regulation, legal, secret, formDocs, products, transactions,
    exportCases, signedDocuments, snapshots, auditLogs, acks, legalPdfs, prefs,
  }, defaults);
}

// ── 대상 문서 단위 저장 ──
export const saveCompany = (state) => setDoc(doc(db, COL.config, CONFIG.company), companyDoc(state));
export const saveIntegrations = (integrations) => setDoc(doc(db, COL.config, CONFIG.integrations), integrationsDoc(integrations));
export const saveBotToken = (token) => setDoc(doc(db, COL.secrets, 'slack'), { botToken: token || '', updatedAt: new Date().toISOString() });
export const saveRegulation = (clauses) => setDoc(doc(db, COL.config, CONFIG.regulation), regulationDoc(clauses));
export const saveLegalConfig = (legal) => setDoc(doc(db, COL.config, CONFIG.legal), clean(legal));

export const saveFormDoc = (key, data, status) =>
  setDoc(doc(db, COL.formData, safeId(key)), formDataDoc(data, status));
export const removeFormDoc = (key) => deleteDoc(doc(db, COL.formData, safeId(key)));

export async function saveFormDocs(keys, formData, formStatuses) {
  await commitOps([...new Set(keys)].map(k => ({
    col: COL.formData, id: safeId(k), data: formDataDoc(formData[k] || {}, formStatuses[k]),
  })));
}

export const saveProduct = (p, order) => setDoc(doc(db, COL.products, safeId(p.id)), orderedDoc(p, order));
export const removeProduct = (id) => deleteDoc(doc(db, COL.products, safeId(id)));
export const saveTransaction = (t, order) => setDoc(doc(db, COL.transactions, safeId(t.id)), orderedDoc(t, order));
export const saveExportCase = (txId, st) => setDoc(doc(db, COL.exportCases, safeId(txId)), clean(st));

// ── 추가 전용 기록 ──
export async function addAuditLog(entry, logType) {
  const data = auditLogDoc(entry, logType);
  await setDoc(doc(db, COL.auditLogs, newId(logType === 'unlock' ? 'unl' : 'del')), data);
  return data;
}
export async function addSnapshot(snap) {
  await setDoc(doc(db, COL.snapshots, safeId(snap.id)), clean(snap));
}
export async function addSignedDocument(entry) {
  await setDoc(doc(db, COL.signedDocuments, safeId(entry.id)), clean(entry));
}
export async function addAcknowledgement(entry) {
  const data = clean({ ...entry, createdAt: new Date().toISOString() });
  await setDoc(doc(db, COL.acknowledgements, newId('ack')), data);
  return data;
}

export const saveUserPrefs = (uid, prefs) =>
  uid ? setDoc(doc(db, COL.userPrefs, uid), clean(prefs), { merge: true }) : Promise.resolve();

// 거래 삭제: 거래 문서 + 소속 서식 + 심사 상태를 한 번에 (감사 기록은 별도 추가)
export async function deleteTransactionCascade(txId, formKeys) {
  const ops = [
    { col: COL.transactions, id: safeId(txId), delete: true },
    { col: COL.exportCases, id: safeId(txId), delete: true },
    ...formKeys.map(k => ({ col: COL.formData, id: safeId(k), delete: true })),
  ];
  await commitOps(ops);
}

// 백업 파일 가져오기 / 전체 저장
export async function saveWholeState(state, user) {
  await commitOps(stateToOps(state, { uid: user?.uid || '', includeSecrets: isAdmin(user) }));
}
