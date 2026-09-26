import { getEnabledDocuments, canRelease, evaluateScreeningStatus, resolveDestination, getReportDeadlines } from '../src/utils/complianceRuleEngine';
import { regionOf, getDesignatedCpGrade, capCpGrade } from '../src/utils/legalBasis';
let fails = 0;
const eq = (name: string, a: any, b: any) => { const ok = JSON.stringify(a) === JSON.stringify(b); if (!ok) fails++; console.log(ok ? 'PASS' : 'FAIL', name, ok ? '' : `got ${JSON.stringify(a)} want ${JSON.stringify(b)}`); };
const base = (over: any = {}) => ({
  id: 't', updatedAt: '', status: 'DRAFT', salesManagerId: 'S', complianceManagerId: 'C',
  parties: { buyer: {name:'',address:'',country:''}, ultimateConsignee: {name:'',address:'',country:''}, endUser: {name:'',address:'',country:''}, agent: {name:'',address:'',country:''} },
  screening: { cslApiHit: false, yesTradeManualChecked: true, hasRedFlags: false, selectedRedFlags: [] },
  classification: { classificationType: 'SELF', hskCode: '', q1_cryptoOverLimit: true, q2_nonCryptoOnly: false, q3_oamOnly: false, q4_usCodeCommingled: false, computedEccn: '5D002' },
  destination: resolveDestination('독일'),
  documents: {},
  transaction: { isITT: false, isComponent: false, isCP_AA: false, isLicenseExempt: false, isRussiaBelarus: false, isPreReportChosen: false, isPostReportChosen: false, isImport: false },
  ...over,
}) as any;
const en = (s: any) => Object.fromEntries(getEnabledDocuments(s).map(d => [d.id, d.enabled]));

eq('region 중국', regionOf('중국'), 'B1');
eq('region 이란', regionOf('이란'), 'B2');
eq('region 몰타 (나의1)', regionOf('몰타'), 'B1');
eq('region 아르헨티나 (가)', regionOf('아르헨티나'), 'A');
eq('region 싱가포르', regionOf('싱가포르'), 'B1');
eq('region 빈값', regionOf(''), 'UNKNOWN');

// 1. 스크리닝 미완료
const s0 = base({ screening: { cslApiHit: false, yesTradeManualChecked: false, hasRedFlags: false, selectedRedFlags: [] } });
eq('미조회 → incomplete', evaluateScreeningStatus(s0.screening, s0.destination).isIncomplete, true);
eq('미조회 → 출하불가', canRelease(s0).ok, false);
// 나의1 국가는 더 이상 자동 차단 아님
eq('중국 목적지 차단 안 됨', evaluateScreeningStatus(base().screening, resolveDestination('중국')).isBlocked, false);
eq('이란 목적지 차단', evaluateScreeningStatus(base().screening, resolveDestination('이란')).isBlocked, true);

// 2. 5D002 물품, 독일(가), 미지정
let d = en(base());
eq('가·물품 L-01', d['L-01'], true);
eq('가·물품 계약서 면제(21①)', d['DOC-CONTRACT'], false);
eq('가·물품 최종사용자서약서 면제(21①)', d['DOC-ENDUSER'], false);
eq('가·물품 수출자서약서 면제(21①)', d['L-10'], false);
eq('미지정 → 포괄 불가', d['L-02'], false);
// 3. 같은 조건 + 기술
d = en(base({ transaction: { ...base().transaction, isTechnologyTransfer: true } }));
eq('가·기술 계약서 필요', d['DOC-CONTRACT'], true);
eq('가·기술 최종사용자서약서 필요', d['DOC-ENDUSER'], true);
eq('가·기술 수출자서약서 필요', d['L-10'], true);
eq('가·기술 기술명세서', d['L-TECH'], true);
eq('기술 → 최종수하인진술서 없음', d['DOC-CONSIGNEE'], false);
// 4. 중국(나의1), 미지정 / AA
d = en(base({ destination: resolveDestination('중국') }));
eq('나의1 계약서', d['DOC-CONTRACT'], true);
eq('나의1 최종사용자서약서 (AA 여부 무관)', d['DOC-ENDUSER'], true);
d = en(base({ destination: resolveDestination('중국'), transaction: { ...base().transaction, isCP_AA: true } }));
eq('AA여도 나의1 서약서 자동면제 안 함', d['DOC-ENDUSER'], true);
eq('AA 나의1 포괄 가능', d['L-02'], true);
// 5. 26조①9호
d = en(base({ destination: resolveDestination('베트남'), transaction: { ...base().transaction, cryptoCivilPurpose: true, endUserHqCountry: '독일' } }));
eq('26조9호 → L-01 불필요', d['L-01'], false);
eq('26조9호 → 사후거래보고', d['K-02'], true);
d = en(base({ destination: resolveDestination('베트남'), transaction: { ...base().transaction, cryptoCivilPurpose: true, endUserHqCountry: '싱가포르' } }));
eq('싱가포르 본사 → 별표23 아님 → L-01', d['L-01'], true);
// 6. US 코드 → 자가판정 비활성화 안 함
d = en(base({ classification: { ...base().classification, q4_usCodeCommingled: true } }));
eq('US 코드여도 자가판정서 가능', d['F-01'], true);
eq('US EAR 메모', d['US-EAR'], true);
// 7. 비해당
d = en(base({ classification: { ...base().classification, q1_cryptoOverLimit: false, computedEccn: 'EAR99' } }));
eq('비해당 → 허가 불필요', d['L-01'], false);
eq('비해당 → 계약서 제출 없음', d['DOC-CONTRACT'], false);
// 8. 출하 게이트
const ok = base({ releaseChecklist: { documentsMatch: true, transferControlled: true } });
eq('조건 충족 시 출하 가능', canRelease(ok).ok, true);
eq('이해상충+사유없음 → 불가', canRelease({ ...ok, complianceManagerId: 'S' }).ok, false);
eq('이해상충+사유 → 가능', canRelease({ ...ok, complianceManagerId: 'S', adminOverrideReason: '부재' }).ok, true);
// 9. 상황허가 해제에는 허가번호 필요
const rf = { cslApiHit: false, yesTradeManualChecked: true, hasRedFlags: true, selectedRedFlags: ['x'], isCatchAllApproved: true };
eq('허가번호 없이 해제 불가', evaluateScreeningStatus(rf as any).isBlocked, true);
eq('허가번호 있으면 해제', evaluateScreeningStatus({ ...rf, catchAllLicenseNo: 'L-1' } as any).isBlocked, false);
// 10. 보고기한
eq('사후보고 3개월', getReportDeadlines('2026-11-20').postReportDeadline, '2027-02-20');
// 11. 등급
eq('신규 → NONE', getDesignatedCpGrade({ cpAppMode: 'initial' }, 'AA'), 'NONE');
eq('지정번호 없음 → NONE', getDesignatedCpGrade({ cpAppMode: 'certified', cpCertifiedDate: '2026-12-20' }, 'AA'), 'NONE');
eq('유효 지정 → AA', getDesignatedCpGrade({ cpAppMode: 'certified', cpCertifiedDate: '2026-12-20', cpCertifiedNumber: 'X' }, 'AA', new Date('2027-06-01')), 'AA');
eq('3년 경과 → NONE', getDesignatedCpGrade({ cpAppMode: 'certified', cpCertifiedDate: '2023-01-01', cpCertifiedNumber: 'X' }, 'AA', new Date('2026-09-26')), 'NONE');
eq('서식 AA 선택, 미지정 → NONE', capCpGrade('AA', 'NONE'), 'NONE');
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED');
