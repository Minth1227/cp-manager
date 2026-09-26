export interface PartyInfo {
  name: string;
  address: string;
  country: string;
  businessRegNo?: string;
}


export interface DocumentState {
  isCompleted: boolean;
  formData: any;
  pdfUrl: string | null;
}

export interface ExportCaseState {
  id: string;
  updatedAt: string;
  status: 'DRAFT' | 'STOP_SHIPMENT' | 'CLASSIFIED' | 'READY_FOR_RELEASE' | 'RELEASED' | 'REVOKED';
  salesManagerId: string;
  complianceManagerId?: string;
  adminOverrideReason?: string;

  // [#8] 영업→CP 2-Party 결재 추적 필드
  requestedAt?: string;          // 영업 부서 최초 조회 요청 시각
  requestedBy?: string;          // 영업 담당자 ID
  screeningCompletedAt?: string; // CP 담당자 스크리닝 완료 시각
  screeningCompletedBy?: string; // CP 담당자 ID
  
  parties: {
    buyer: PartyInfo;
    ultimateConsignee: PartyInfo;
    endUser: PartyInfo;
    agent: PartyInfo;
  };
  
  screening: {
    cslApiHit: boolean;
    yesTradeManualChecked: boolean;
    hasRedFlags: boolean;
    selectedRedFlags: string[]; // List of IDs from 12 WMD Red Flags
    stopShipmentChoice?: 'CANCEL' | 'DUE_DILIGENCE' | 'CATCH_ALL' | 'REPORT';
    isCatchAllApproved?: boolean;
    isDueDiligenceApproved?: boolean;
    dueDiligenceFiles?: string[];
  };

  classification: {
    classificationType: 'SELF' | 'PRO' | 'NONE';
    trackingId?: string;
    productName?: string;
    classificationDate?: string;
    kostiNumber?: string;
    // [#8] 전문판정 진행 상태 추적
    kostiSubmittedAt?: string;
    kostiStatus?: 'SUBMITTED' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
    hskCode: string;
    q1_cryptoOverLimit: boolean; // AES >56bit, RSA >512bit, ECC >112bit, PQC
    q2_nonCryptoOnly: boolean;   // Authentication, Digital Signature, SecOC MAC only
    q3_oamOnly: boolean;         // Operations, Admin, Maintenance only
    q4_usCodeCommingled: boolean; // US origin code > 0%
    computedEccn?: '5D002' | 'EAR99' | 'ML21' | 'NON_CONTROLLED';
    isUsEarSubject?: boolean;     // De minimis 0% Rule applied
    // [#9] ML21 군용 판정 시 방위사업청 별도 신고 필요
    isMilitary?: boolean;
  };

  destination: {
    countryCode: string;
    isGroupA: boolean;            // Wassenaar 30 Group A countries
    isSanctionedCountry: boolean; // Russia, Belarus, Iran, Syria, North Korea 등
  };

  documents: Record<string, DocumentState>;

  transaction: {
    isITT: boolean;
    isComponent: boolean;
    isCP_AA: boolean;
    isLicenseExempt: boolean;
    isRussiaBelarus: boolean;
    isPreReportChosen: boolean;
    isPostReportChosen: boolean;
    isImport: boolean;
    plannedExportDate?: string;
    exportAmountUSD?: string;
    exportQuantity?: string;
    contractNo?: string;
  };
  
  g02Register?: any[];
  g04Register?: any[];
  
  attachments?: {
    [formIdOrCategory: string]: Array<{
      filename: string;
      url: string;
      uploadedAt: string;
    }>;
  };
}

export interface DocumentConfig {
  id: string;
  name: string;
  enabled: boolean;
  disabledReason?: string;
  package?: string;
}

// ============================================================
// [별표 23] 암호화품목 허가면제 특례국 (전략물자수출입고시)
// 이 국가들로의 5D002 수출은 개별수출허가(L-01) 면제
// ============================================================
export const ANNEX23_CRYPTO_EXEMPT_COUNTRIES = new Set([
  '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '네덜란드',
  '이탈리아', '스페인', '벨기에', '스웨덴', '덴마크', '노르웨이', '핀란드',
  '오스트리아', '스위스', '뉴질랜드', '싱가포르', '체코', '헝가리', '폴란드',
  '포르투갈', '그리스', '아일랜드', '룩셈부르크', '불가리아', '몰타', '우크라이나',
  'US', 'GB', 'DE', 'FR', 'JP', 'AU', 'CA', 'NL', 'IT', 'ES', 'BE', 'SE',
  'DK', 'NO', 'FI', 'AT', 'CH', 'NZ', 'SG', 'CZ', 'HU', 'PL', 'PT', 'GR',
  'IE', 'LU', 'BG', 'MT', 'UA', 'KR'
]);

// ============================================================
// 별표 6 기반 국가코드 자동 지역 분류 헬퍼
// countryList.ts와 연동하여 더 완전한 리스트로 교체 권장
// ============================================================
const GROUP_A_COUNTRY_CODES = new Set([
  'US', 'GB', 'DE', 'FR', 'JP', 'AU', 'CA', 'NL', 'IT', 'ES', 'AT', 'BE',
  'CZ', 'DK', 'FI', 'GR', 'HU', 'IE', 'LU', 'NO', 'NZ', 'PL', 'PT', 'KR',
  'SE', 'CH', 'TR', 'UA', 'BG', 'MT',
  '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '네덜란드',
  '이탈리아', '스페인', '오스트리아', '벨기에', '체코', '덴마크', '핀란드',
  '그리스', '헝가리', '아일랜드', '룩셈부르크', '노르웨이', '뉴질랜드',
  '폴란드', '포르투갈', '한국', '스웨덴', '스위스', '터키', '우크라이나',
  '불가리아', '몰타'
]);

const SANCTIONED_COUNTRY_CODES = new Set([
  'KP', 'IR', 'SY', 'RU', 'BY', 'CU',
  '북한', '이란', '시리아', '러시아', '벨라루스', '쿠바'
]);

export function resolveDestination(countryCode: string): ExportCaseState['destination'] {
  return {
    countryCode,
    isGroupA: GROUP_A_COUNTRY_CODES.has(countryCode),
    isSanctionedCountry: SANCTIONED_COUNTRY_CODES.has(countryCode),
  };
}

// K-01/K-02 법정 보고 기한 계산 (대외무역법 시행령 제53조)
export function getReportDeadlines(plannedExportDate: string) {
  const exportDate = new Date(plannedExportDate);
  const PRE_REPORT_DAYS = 30;
  const POST_REPORT_DAYS = 30;
  return {
    preReportDeadline: new Date(exportDate.getTime() - PRE_REPORT_DAYS * 86400000).toISOString().split('T')[0],
    postReportDeadline: new Date(exportDate.getTime() + POST_REPORT_DAYS * 86400000).toISOString().split('T')[0],
    isPreReportOverdue: new Date() > new Date(exportDate.getTime() - PRE_REPORT_DAYS * 86400000),
    isPostReportOverdue: new Date() > new Date(exportDate.getTime() + POST_REPORT_DAYS * 86400000),
  };
}

// LocalStorage 조작 우회 방지 - 드래프트 로드 시 Rule Engine 재검증
export function validateAndLoadDraft(raw: string, txId: string, initialState: ExportCaseState): ExportCaseState {
  try {
    const parsed: ExportCaseState = JSON.parse(raw);
    // 1. ID 무결성 체크
    if (parsed.id !== txId) {
      console.warn('[Security] Draft ID mismatch. Resetting to initial state.');
      return { ...initialState, id: txId };
    }
    // 2. status는 Rule Engine으로 항상 재계산 (LocalStorage 조작 무력화)
    const { isBlocked } = evaluateScreeningStatus(parsed.screening, parsed.destination);
    if (isBlocked) {
      parsed.status = 'STOP_SHIPMENT';
    } else if (parsed.status === 'STOP_SHIPMENT') {
      parsed.status = 'DRAFT';
    }
    return parsed;
  } catch (e) {
    console.error('[Security] Draft parse failed. Resetting.', e);
    return { ...initialState, id: txId };
  }
}

export function computeEccn(classification: ExportCaseState['classification']) {
  let eccn: '5D002' | 'EAR99' | 'ML21' | 'NON_CONTROLLED' = 'EAR99';
  
  if (classification.q1_cryptoOverLimit && !classification.q2_nonCryptoOnly && !classification.q3_oamOnly) {
    eccn = '5D002';
  }
  
  const isUsEarSubject = (classification.q4_usCodeCommingled && eccn === '5D002');
  
  return {
    computedEccn: eccn,
    isUsEarSubject: isUsEarSubject
  };
}

export function evaluateScreeningStatus(
  screening: ExportCaseState['screening'],
  destination?: Pick<ExportCaseState['destination'], 'isSanctionedCountry'>
) {
  // [#1] 스크리닝을 아직 시작하지 않은 케이스(초기 상태)는 블록하지 않음
  const screeningStarted =
    screening.cslApiHit ||
    screening.yesTradeManualChecked ||
    screening.selectedRedFlags.length > 0;

  // [#5] 우려거래자 API 일치 | WMD 의심징후 | 제재국 수출
  const hasRisk =
    screening.cslApiHit ||
    screening.hasRedFlags ||
    (destination?.isSanctionedCountry ?? false);

  // YesTrade 수동 조회를 시작했으나 체크하지 않은 경우만 블록
  const yesTradeNotChecked = screeningStarted && !screening.yesTradeManualChecked;

  const isBlocked =
    (hasRisk || yesTradeNotChecked) &&
    !screening.isCatchAllApproved &&
    !screening.isDueDiligenceApproved;

  return { isBlocked, screeningStarted, hasRisk };
}

export function getEnabledDocuments(state: ExportCaseState): DocumentConfig[] {
  const docs: DocumentConfig[] = [];
  
  const computedEccn = state.classification.computedEccn || computeEccn(state.classification).computedEccn;
  const isUsEarSubject = state.classification.isUsEarSubject !== undefined ? state.classification.isUsEarSubject : computeEccn(state.classification).isUsEarSubject;
  
  const { hasRedFlags, cslApiHit } = state.screening;
  const { isGroupA, isSanctionedCountry } = state.destination;
  const { isBlocked } = evaluateScreeningStatus(state.screening, state.destination);
  const { isITT, isComponent, isCP_AA, isLicenseExempt, isRussiaBelarus, isPreReportChosen, isPostReportChosen, isImport } = state.transaction;
  const isRevoked = state.status === 'REVOKED';

  const add = (id: string, name: string, enabled: boolean, disabledReason?: string, pkg?: string) => {
    docs.push({ id, name, enabled, disabledReason, package: pkg });
  };

  // 1. Z-01
  add('Z-01', '가상 시뮬레이터', true, undefined, '사전심사');

  // 2. F-01
  add('F-01', '별지 4의3호 자가판정서', !isUsEarSubject, isUsEarSubject ? "US EAR 통제 대상 (미국 상무부 허가 필요, 자체 판정 불가)" : undefined, '판정');

  // 3. F-02
  add('F-02', '별지 4호 전문판정서', true, undefined, '판정'); // 자가판정 불가 또는 수동 선택 시 활성화

  // 4. F-03
  const f03Enabled = computedEccn === '5D002' || computedEccn === 'ML21';
  add('F-03', '기술사양 비교분석서', f03Enabled, f03Enabled ? undefined : "비전략물자(EAR99)로 분류되어 기술 성능대비표 작성 대상에서 제외됩니다.", '판정');

  // 5. F-04
  add('F-04', '판정대장', true, undefined, '판정');

  // 6. G-01
  add('G-01', '수출거래 사전심사표', true, undefined, '사전심사');

  // 7. G-04
  add('G-04', 'Stop-Shipment Report', isBlocked, isBlocked ? undefined : "출하 보류 대상이 아닙니다.", '사전심사');

  // 8. H-01
  add('H-01', '출하전 점검표', true, undefined, '출하/사후');

  // 9. I-01
  add('I-01', '사후관리 대장', true, undefined, '출하/사후');

  // 10. L-01
  // [별표 23] 암호화 특례국으로의 5D002 수출은 개별허가 면제
  const isCryptoExemptCountry = ANNEX23_CRYPTO_EXEMPT_COUNTRIES.has(state.destination.countryCode);
  const l01Enabled = computedEccn === '5D002' && (!isGroupA || !isCP_AA) && !isCryptoExemptCountry;
  const l01Reason = isUsEarSubject ? "US EAR 통제 대상 (미국 상무부 허가 필요)" :
    isCryptoExemptCountry ? `전략물자수출입고시 별표 23: ${state.destination.countryCode}은 암호화품목 허가면제 특례국입니다.` :
    "비전략물자이거나 포괄허가(L-02) 적용 건입니다.";
  add('L-01', '별지 1호 개별수출허가신청서', l01Enabled, l01Enabled ? undefined : l01Reason, '인허가');

  // 11. L-02
  const l02Enabled = computedEccn === '5D002' && isGroupA && isCP_AA && !isSanctionedCountry;
  const l02Reason = !l02Enabled ? "비전략물자이거나 제재국(나2 지역) 거래 건으로 포괄허가 대상이 아닙니다." : undefined;
  add('L-02', '별지 6호 포괄수출허가신청서', l02Enabled, l02Reason, '인허가');

  // 12. L-03 (Catch-All)
  // [#2 Fix] 전략물자수출입고시 제19조의2: ECCN 무관, 우려거래자/WMD 의심 징후가 있으면 상황허가 발동
  const l03Enabled = hasRedFlags || cslApiHit;
  add('L-03', '별지 2호 상황허가신청서', l03Enabled, l03Enabled ? undefined : "상황허가 대상이 아닙니다. (우려거래자 미일치, 의심징후 없음)", '상황허가 패키지');

  // 13. L-04
  const l04Enabled = l03Enabled && isITT;
  add('L-04', '별지 2의2호 - 상황허가 무형이전 부속서류', l04Enabled, l04Enabled ? undefined : (l03Enabled ? "무형기술이전/SW(ITT) 거래가 아닙니다." : "상황허가 대상이 아닙니다."), '상황허가 패키지');


  // 16. L-10
  const l10Enabled = computedEccn === '5D002' && !isGroupA; // L-01 신청 시 요구 (!isGroupA)
  add('L-10', '수출자 서약서', l10Enabled, l10Enabled ? undefined : "서약서 제출 대상이 아닙니다.", '인허가');

  // 17. DOC-CONTRACT
  const contractEnabled = !isGroupA;
  add('DOC-CONTRACT', '수출계약서', contractEnabled, contractEnabled ? undefined : "전략물자 수출입고시 제21조제1항: '가' 지역 수출 시 계약서 제출이 면제됩니다.", '기타');

  // 18. DOC-ENDUSER 세 종 분기 (전략물자수출입고시 별지 구분)
  // [별지 2의3] 바세나르 통제품목(5D002 등) 수출 시 엄격한 서약 필요
  const isWassenaarItem = computedEccn === '5D002' || computedEccn === 'ML21';
  const endUserBaseEnabled = !isGroupA && !isCP_AA;
  
  add('DOC-ENDUSER-WA', '[별지 2의3] 최종사용자서약서 (바세나르 통제품목용)',
    endUserBaseEnabled && isWassenaarItem,
    (endUserBaseEnabled && isWassenaarItem) ? undefined :
      isGroupA || isCP_AA ? "CP AA 등급 / '가'지역 수출: 서약서 제출 면제" :
      "바세나르 통제품목(5D002/ML21) 대상이 아닙니다. 별지 2의2 서약서를 사용하세요.",
    '기타'
  );
  
  // [별지 2의2] 일반 전략물자 수출 시 표준 서약서
  add('DOC-ENDUSER-GEN', '[별지 2의2] 최종사용자서약서 (일반)',
    endUserBaseEnabled && !isWassenaarItem,
    (endUserBaseEnabled && !isWassenaarItem) ? undefined :
      isGroupA || isCP_AA ? "CP AA 등급 / '가'지역 수출: 서약서 제출 면제" :
      "전략물자 해당 품목이면 '별지 2의3 (바세나르용)'를 사용하세요.",
    '기타'
  );
  
  // [별지 2] 개별수출허가(L-01) 신청 시 최종수하인/구매자 서약서 첨부
  add('DOC-ENDUSER-2', '[별지 2] 최종수하인·구매자 서약서 (개별허가 첨부용)',
    l01Enabled,
    l01Enabled ? undefined : "개별수출허가(L-01) 신청 대상이 아닙니다.",
    '기타'
  );

  // 19. J-01
  add('J-01', '별지 24호 자진신고서', isRevoked, isRevoked ? undefined : "사고 발생 시에만 활성화됩니다.", '사후/보고');

  // 20. J-02
  add('J-02', '별지 25호 재발방지 계획서', isRevoked, isRevoked ? undefined : "사고 발생 시에만 활성화됩니다.", '사후/보고');

  // 21. K-01
  const k01Enabled = isLicenseExempt && (isRussiaBelarus || isPreReportChosen);
  add('K-01', '사전거래보고서', k01Enabled, k01Enabled ? undefined : "사전거래보고 대상이 아닙니다.", '사후/보고');

  // 22. K-02
  const k02Enabled = isLicenseExempt && !isRussiaBelarus && isPostReportChosen;
  let k02Reason = "사후거래보고 대상이 아닙니다.";
  if (isLicenseExempt && isRussiaBelarus) k02Reason = "러시아/벨라루스 특례 건은 사후거래보고가 불인정되며, 사전보고(K-01)가 필수입니다.";
  add('K-02', '사후거래보고서', k02Enabled, k02Enabled ? undefined : k02Reason, '사후/보고');

  // G-03: 수출허가 관리대장 — 허가증 발급 후 이력 추적 (L-01 또는 L-02 활성화 시)
  const g03Enabled = l01Enabled || l02Enabled;
  add('G-03', '수출허가 관리대장', g03Enabled,
    g03Enabled ? undefined : "수출허가 신청 대상이 아닙니다.", '인허가');

  // 23. K-03, K-04: 연간 정기 보고서 — 개별 수출 건 워크플로우에서 분리 (별도 연간 보고 메뉴에서 관리)
  add('K-03', 'CP 연간 운영 보고서', false, '연간 정기 보고서는 개별 수출 건이 아닌 별도 메뉴(연간 CP 보고)에서 작성합니다.', '사후/보고');
  add('K-04', 'CP 연간 실적 보고서', false, '연간 정기 보고서는 개별 수출 건이 아닌 별도 메뉴(연간 CP 보고)에서 작성합니다.', '사후/보고');

  // 25, 26, 27. M-01 ~ M-03
  add('M-01', '별지 7호 수입목적확인서', isImport, isImport ? undefined : "수입 거래가 아닙니다.", '수입/통관');
  add('M-02', '별지 8호 수입내역 신고서', isImport, isImport ? undefined : "수입 거래가 아닙니다.", '수입/통관');
  add('M-03', '별지 9호 통관증명서', isImport, isImport ? undefined : "수입 거래가 아닙니다.", '수입/통관');

  return docs;
}


export function stateToFormData(docId: string, state: ExportCaseState): any {
  // Pre-fill default values from global state (Multi-key support for 27 forms)
  return {
    // 1. Parties
    buyer: state.parties.buyer.name,
    buyerName: state.parties.buyer.name,
    buyerAddress: state.parties.buyer.address,
    consignee: state.parties.ultimateConsignee.name,
    consigneeName: state.parties.ultimateConsignee.name,
    endUser: state.parties.endUser.name,
    endUserName: state.parties.endUser.name,
    euCompany: state.parties.endUser.name,
    agentName: state.parties.agent?.name || 'N/A',
    manufacturer: state.parties.agent?.name || '',
    
    // 2. Classification
    eccn: state.classification.computedEccn || '',
    eccnCode: state.classification.computedEccn || '',
    controlNo: state.classification.computedEccn || '',
    hsCode: state.classification.hskCode,
    hskCode: state.classification.hskCode,
    itemName: state.classification.productName || '',
    itemSpec: state.classification.productName || '',
    brokerageItem: state.classification.productName || '',
    classNo: state.classification.trackingId || '',
    issueNo: state.classification.trackingId || '',
    selfClassRegNo: state.classification.trackingId || '',
    kostiNumber: state.classification.kostiNumber || '',
    
    // 3. Meta & Environment
    destCountry: state.destination.countryCode || '',
    isSanctionedCountry: state.destination.isSanctionedCountry ? 'YES' : 'NO',
    isGroupA: state.destination.isGroupA ? 'YES' : 'NO',
    exportCaseId: state.id,
    salesManager: state.salesManagerId,
    complianceManager: state.complianceManagerId || '',
    
    // 4. Screening data for G-01 Pre-fill
    hasRedFlags: state.screening.hasRedFlags ? 'YES' : 'NO',
    cslApiHit: state.screening.cslApiHit ? 'YES' : 'NO',
    selectedRedFlags: state.screening.selectedRedFlags.join('; '),
    stopShipmentChoice: state.screening.stopShipmentChoice || '',
    
    // 5. Transaction / Contract info (G-01 입력 후 K-01, L-01 자동 매핑)
    exportAmount: state.transaction.exportAmountUSD || '',
    amount: state.transaction.exportAmountUSD || '',
    exportAmountUSD: state.transaction.exportAmountUSD || '',
    quantity: state.transaction.exportQuantity || '',
    exportQuantity: state.transaction.exportQuantity || '',
    exportContractNo: state.transaction.contractNo || '',
    
    // 6. K-01 사전보고 기한 자동 계산
    plannedExportDate: state.transaction.plannedExportDate || '',
    preReportDeadline: (() => {
      if (!state.transaction.plannedExportDate) return '';
      const d = new Date(state.transaction.plannedExportDate);
      d.setDate(d.getDate() - 30);
      return d.toISOString().split('T')[0];
    })(),
  };
}
