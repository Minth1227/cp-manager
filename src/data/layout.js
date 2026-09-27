// ============================================================
// Firestore 데이터 배치 규칙 (스키마 v2) — Firebase에 의존하지 않는 순수 함수만 둔다.
// ------------------------------------------------------------
// 종전(v1): 앱 전체 데이터를 system/globalState 문서 "한 개"에 저장
//   → 동시 저장 시 덮어쓰기, 문서 1MB 한도, 역할별 쓰기 규칙 불가, 기록 변조 방지 불가
// 현재(v2): 성격별 컬렉션으로 분리
//
//   config/company            회사 정보·목표 등급·신청 유형           (편집자 쓰기)
//   config/integrations       Slack 채널·결재자 ID (토큰 제외)         (편집자 쓰기)
//   config/regulation         현행 자율수출관리규정 조문               (편집자 쓰기)
//   config/legal              법령 기준 스위치(현행 고시 대조 결과)     (관리자 쓰기)
//   config/schema             스키마 버전·이전 기록                    (관리자 쓰기)
//   secrets/slack             Slack Bot Token (환경변수 미사용 시)     (관리자만 읽기·쓰기)
//   formData/{저장키}          서식 1건 = 문서 1개 (작성상태 _formStatus 포함)
//   products/{id}             품목 마스터
//   transactions/{id}         수출 거래
//   exportCases/{거래ID}       수출 심사 마법사 상태
//   signedDocuments/{id}      서명 문서함 — 추가만 가능
//   snapshots/{id}            출하 시점 스냅샷 — 추가만 가능
//   auditLogs/{id}            삭제 시도·잠금 해제 기록 — 추가만 가능
//   acknowledgements/{id}     규정·공지 열람 기록 — 추가만 가능 (일반 직원 포함)
//   legalPdfs/{formId}        법정 서식 PDF 메타데이터 (서버만 쓰기)
//   userPrefs/{uid}           사용자별 화면 선택 상태 (선택 품목·거래·회차)
//   counters/PSR-{연도}        문서번호 채번
//   users/{uid}               사용자·역할
//   system/globalState        v1 데이터 — 이전 후 백업으로만 보존 (관리자 읽기 전용)
// ============================================================

export const SCHEMA_VERSION = 2;

export const COL = {
  config: 'config',
  secrets: 'secrets',
  formData: 'formData',
  products: 'products',
  transactions: 'transactions',
  exportCases: 'exportCases',
  signedDocuments: 'signedDocuments',
  snapshots: 'snapshots',
  auditLogs: 'auditLogs',
  acknowledgements: 'acknowledgements',
  legalPdfs: 'legalPdfs',
  userPrefs: 'userPrefs',
  counters: 'counters',
};

export const CONFIG = {
  company: 'company',
  integrations: 'integrations',
  regulation: 'regulation',
  legal: 'legal',
  schema: 'schema',
};

// Firestore 문서 ID에는 '/'를 쓸 수 없고 '.', '..'은 금지된다.
export function safeId(id) {
  const s = String(id ?? '').replace(/\//g, '∕').trim();
  if (!s || s === '.' || s === '..') return '_';
  return s.slice(0, 1400);
}

// Firestore는 undefined 값을 거부한다 → JSON 왕복으로 undefined 제거 (값은 모두 JSON 호환)
export function clean(value) {
  if (value === undefined) return null;
  return JSON.parse(JSON.stringify(value));
}

const PUBLIC_INTEGRATION_KEYS = [
  'slackWebhookUrl', 'slackAnnounceChannelId', 'slackOrgChannelId',
  'slackApproverIds', 'slackBroadcastDmEnabled',
];

export function companyDoc(state) {
  return clean({
    companyInfo: state.companyInfo || {},
    targetGrade: state.targetGrade || '',
    applicationType: state.applicationType || '',
    settings: state.settings || {},
  });
}

// Bot Token은 공용 설정 문서에 절대 넣지 않는다 (secrets/slack 또는 서버 환경변수)
export function integrationsDoc(integrations = {}) {
  const out = {};
  for (const k of PUBLIC_INTEGRATION_KEYS) if (integrations[k] !== undefined) out[k] = integrations[k];
  return clean(out);
}

export function regulationDoc(clauses) {
  return clean({ clauses: Array.isArray(clauses) ? clauses : [] });
}

export function formDataDoc(data, status) {
  const d = clean(data || {});
  if (status !== undefined && status !== null) d._formStatus = status;
  return d;
}

export function orderedDoc(item, order) {
  return clean({ ...item, _order: typeof item._order === 'number' ? item._order : order });
}

export function auditLogDoc(entry, logType) {
  return clean({ ...entry, logType, loggedAt: entry.loggedAt || entry.attemptedAt || entry.deletedAt || entry.unlockedAt || new Date().toISOString() });
}

export function newId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * v1 globalState → v2 문서 목록.
 * @returns {{ops: Array<{col:string,id:string,data:object}>, summary: object}}
 */
export function planMigration(g = {}, { uid = '', migratedBy = '' } = {}) {
  const ops = [];
  const put = (col, id, data) => ops.push({ col, id: safeId(id), data: clean(data) });

  put(COL.config, CONFIG.company, companyDoc(g));
  put(COL.config, CONFIG.integrations, integrationsDoc(g.integrations || {}));
  if (Array.isArray(g.currentRegulation) && g.currentRegulation.length) {
    put(COL.config, CONFIG.regulation, regulationDoc(g.currentRegulation));
  }
  if (g.integrations?.slackBotToken) {
    put(COL.secrets, 'slack', { botToken: g.integrations.slackBotToken });
  }

  const formData = g.formData || {};
  const statuses = g.formStatuses || {};
  const keys = new Set([...Object.keys(formData), ...Object.keys(statuses)]);
  for (const key of keys) {
    put(COL.formData, key, formDataDoc(formData[key] || {}, statuses[key]));
  }

  (g.products || []).forEach((p, i) => p && p.id && put(COL.products, p.id, orderedDoc(p, i)));
  (g.transactions || []).forEach((t, i) => t && t.id && put(COL.transactions, t.id, orderedDoc(t, i)));
  for (const [txId, st] of Object.entries(g.exportCaseStates || {})) put(COL.exportCases, txId, st);

  (g.signedDocuments || []).forEach(e => e && put(COL.signedDocuments, e.id || newId('sd'), e));
  (g.snapshots || []).forEach(s => s && put(COL.snapshots, s.id || newId('snap'), s));
  (g.destructionLogs || []).forEach(e => e && put(COL.auditLogs, newId('del'), auditLogDoc(e, 'destruction')));
  (g.unlockLogs || []).forEach(e => e && put(COL.auditLogs, newId('unl'), auditLogDoc(e, 'unlock')));
  for (const [formId, meta] of Object.entries(g.legalPdfs || {})) put(COL.legalPdfs, formId, meta || {});

  if (uid) {
    put(COL.userPrefs, uid, {
      selectedProductId: g.selectedProductId ?? null,
      selectedTransactionId: g.selectedTransactionId ?? null,
      selectedInstanceIds: g.selectedInstanceIds || {},
    });
  }

  const summary = {
    formData: keys.size,
    products: (g.products || []).length,
    transactions: (g.transactions || []).length,
    exportCases: Object.keys(g.exportCaseStates || {}).length,
    signedDocuments: (g.signedDocuments || []).length,
    snapshots: (g.snapshots || []).length,
    auditLogs: (g.destructionLogs || []).length + (g.unlockLogs || []).length,
    legalPdfs: Object.keys(g.legalPdfs || {}).length,
  };
  put(COL.config, CONFIG.schema, {
    version: SCHEMA_VERSION, migratedAt: new Date().toISOString(), migratedBy, source: 'system/globalState', summary,
  });
  return { ops, summary };
}

// 새로 시작(이전 없음) 시 스키마 표시만 기록
export function planFreshStart({ migratedBy = '' } = {}) {
  return [{ col: COL.config, id: CONFIG.schema, data: clean({ version: SCHEMA_VERSION, migratedAt: new Date().toISOString(), migratedBy, source: 'fresh' }) }];
}

// 열람 기록(acknowledgements)을 서식 데이터에 합쳐 화면이 기존 방식대로 읽게 한다.
export function mergeAcknowledgements(formData, acks = []) {
  const fd = { ...formData };
  const sorted = [...acks].sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
  for (const a of sorted) {
    if (a.kind === 'regulationView') {
      const cur = fd['A-03'] ? { ...fd['A-03'] } : {};
      const rows = [...(cur.rows || [])];
      if (!rows.some(r => r._autoUserId === a.userId && r.readDate === a.date)) {
        rows.push({ no: rows.length + 1, name: a.name || '', department: a.department || '', readDate: a.date, signature: '(시스템 자동기록)', _autoUserId: a.userId });
      }
      fd['A-03'] = { ...cur, rows };
    } else if (a.kind === 'documentAck' && a.formId) {
      const cur = fd[a.formId] ? { ...fd[a.formId] } : {};
      const log = [...(cur._ackLog || [])];
      if (!log.some(r => r.userId === a.userId && r.ackDate === a.date)) {
        log.push({ name: a.name || '', department: a.department || '', ackDate: a.date, ackTime: a.time || '', userId: a.userId });
      }
      fd[a.formId] = { ...cur, _ackLog: log };
    }
  }
  return fd;
}

const byOrder = (a, b) => (a._order ?? 0) - (b._order ?? 0);

/**
 * v2 컬렉션에서 읽은 문서들 → 기존 화면이 쓰는 state 형태로 조립.
 * parts: { company, integrations, secret, regulation, legal, formDocs[{id,data}], products[], transactions[],
 *          exportCases[{id,data}], signedDocuments[], snapshots[], auditLogs[], acks[], legalPdfs[{id,data}], prefs }
 */
export function assembleState(parts = {}, defaults = {}) {
  const formData = {};
  const formStatuses = {};
  for (const { id, data } of parts.formDocs || []) {
    const { _formStatus, ...rest } = data || {};
    formData[id] = rest;
    if (_formStatus) formStatuses[id] = _formStatus;
  }
  const exportCaseStates = {};
  for (const { id, data } of parts.exportCases || []) exportCaseStates[id] = data;
  const legalPdfs = {};
  for (const { id, data } of parts.legalPdfs || []) legalPdfs[id] = data;
  const logs = parts.auditLogs || [];
  const sortTime = key => (a, b) => String(a[key] || '').localeCompare(String(b[key] || ''));
  const company = parts.company || {};
  const prefs = parts.prefs || {};

  return {
    ...defaults,
    companyInfo: { ...(defaults.companyInfo || {}), ...(company.companyInfo || {}) },
    targetGrade: company.targetGrade ?? defaults.targetGrade,
    applicationType: company.applicationType ?? defaults.applicationType,
    settings: { ...(defaults.settings || {}), ...(company.settings || {}) },
    integrations: {
      ...(defaults.integrations || {}),
      ...(parts.integrations || {}),
      slackBotToken: parts.secret?.botToken || '',
    },
    currentRegulation: parts.regulation?.clauses?.length ? parts.regulation.clauses : defaults.currentRegulation,
    legalConfig: { ...(defaults.legalConfig || {}), ...(parts.legal || {}) },
    formData: mergeAcknowledgements(formData, parts.acks || []),
    formStatuses,
    products: [...(parts.products || [])].sort(byOrder),
    transactions: [...(parts.transactions || [])].sort(byOrder),
    exportCaseStates,
    signedDocuments: [...(parts.signedDocuments || [])].sort(sortTime('approvedAt')),
    snapshots: [...(parts.snapshots || [])].sort(sortTime('timestamp')),
    destructionLogs: logs.filter(l => l.logType === 'destruction').sort(sortTime('loggedAt')),
    unlockLogs: logs.filter(l => l.logType === 'unlock').sort(sortTime('loggedAt')),
    legalPdfs,
    selectedProductId: prefs.selectedProductId ?? defaults.selectedProductId ?? null,
    selectedTransactionId: prefs.selectedTransactionId ?? null,
    selectedInstanceIds: prefs.selectedInstanceIds || {},
  };
}

/**
 * 전체 state → v2 문서 목록 (백업 가져오기·전체 저장용).
 * 추가 전용 기록(서명 문서함·스냅샷·감사로그)과 서버 전용 문서(legalPdfs), 비밀값(secrets)은
 * 덮어쓰면 안 되므로 기본적으로 제외한다.
 */
export function stateToOps(state, { uid = '', includeSecrets = false } = {}) {
  const { ops } = planMigration({ ...state }, { uid });
  const excluded = new Set([COL.signedDocuments, COL.snapshots, COL.auditLogs, COL.legalPdfs]);
  if (!includeSecrets) excluded.add(COL.secrets);
  return ops.filter(o => !(o.col === COL.config && o.id === CONFIG.schema) && !excluded.has(o.col));
}
