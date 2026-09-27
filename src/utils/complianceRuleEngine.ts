import {
  regionOf, isAnnex23Country, Region, FORM_LABELS, LEGAL_REFERENCE,
} from './legalBasis';

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
    cslApiHit: boolean;              // (참고용) 미국 CSL 조회 결과 — 한국 우려거래자 확인을 대체하지 않음
    yesTradeManualChecked: boolean;  // YESTRADE 우려거래자 조회 완료 여부 (필수)
    yesTradeCheckedAt?: string;      // 조회 일시 (체크 시 자동 기록)
    hasRedFlags: boolean;
    selectedRedFlags: string[];
    stopShipmentChoice?: 'CANCEL' | 'DUE_DILIGENCE' | 'CATCH_ALL' | 'REPORT';
    isCatchAllApproved?: boolean;
    catchAllLicenseNo?: string;      // 상황허가 허가번호 (입력해야 해제 가능)
    isDueDiligenceApproved?: boolean;
    dueDiligenceNote?: string;       // 소명 검토 의견 (입력해야 해제 가능)
    dueDiligenceFiles?: string[];
  };

  classification: {
    classificationType: 'SELF' | 'PRO' | 'NONE';
    trackingId?: string;
    productName?: string;
    classificationDate?: string;
    kostiNumber?: string;
    kostiSubmittedAt?: string;
    kostiStatus?: 'SUBMITTED' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
    hskCode: string;
    q1_cryptoOverLimit: boolean;
    q2_nonCryptoOnly: boolean;
    q3_oamOnly: boolean;
    q4_usCodeCommingled: boolean;     // 미국산 암호 코드 포함 → 미국 EAR 별도 검토 필요 (한국 판정과 별개)
    // 내부 코드값. 'EAR99'는 과거 데이터 호환용 값이며 화면에는 "비해당"으로 표시한다.
    computedEccn?: '5D002' | 'EAR99' | 'ML21' | 'NON_CONTROLLED';
    isUsEarSubject?: boolean;         // 미국 EAR 별도 검토 필요 플래그
    isMilitary?: boolean;
  };

  destination: {
    countryCode: string;
    region?: Region;              // [별표 6] 가 / 나의1 / 나의2
    isGroupA: boolean;            // region === 'A'
    isSanctionedCountry: boolean; // region === 'B2' (나의2 지역). 과거 필드명 유지
  };

  documents: Record<string, DocumentState>;

  transaction: {
    isITT: boolean;
    isComponent: boolean;
    // 실제 지정 등급 기준으로 화면에서 매번 다시 계산된다 (저장값을 신뢰하지 않음)
    isCP_AA: boolean;
    isLicenseExempt: boolean;
    isRussiaBelarus: boolean;
    isPreReportChosen: boolean;
    isPostReportChosen: boolean;
    isImport: boolean;
    // 고시 제20조②: 기술(설계·제조·사용 기술자료, 기술지원 등)을 수출하는 경우
    isTechnologyTransfer?: boolean;
    // 고시 제26조①9호 요건 입력
    cryptoCivilPurpose?: boolean;     // 민간기업 내부시스템 구축·운영 또는 민수용 제품 개발·생산 용도
    endUserHqCountry?: string;        // 최종사용자(민간) 본사 소재국
    hasComprehensiveLicense?: boolean; // 유효한 포괄수출허가 보유 (허가번호로 확인)
    comprehensiveLicenseNo?: string;
    plannedExportDate?: string;
    exportAmountUSD?: string;
    exportQuantity?: string;
    contractNo?: string;
  };

  releaseChecklist?: {
    documentsMatch?: boolean;     // 판정서·허가서·계약서·송장의 품목·수량·목적지 일치
    transferControlled?: boolean; // 승인된 전달 경로·접근기간으로 전달
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
  note?: string;       // 활성 서류에 붙는 확인 필요·근거 안내
  package?: string;
}

// ============================================================
// 목적지 판정 — [별표 6] (legalBasis.ts 단일 원천 사용)
// ============================================================
export function resolveDestination(countryCode: string): ExportCaseState['destination'] {
  const region = regionOf(countryCode);
  return {
    countryCode,
    region,
    isGroupA: region === 'A',
    isSanctionedCountry: region === 'B2',
  };
}

export function isStrategicItem(eccn?: string): boolean {
  return eccn === '5D002' || eccn === 'ML21';
}

export function eccnLabel(eccn?: string): string {
  if (eccn === '5D002') return '5D002 (전략물자 해당)';
  if (eccn === 'ML21') return 'ML21 (군용물자 해당)';
  return '비해당';
}

// 사전·사후거래보고 기한 — 고시 제26조①: 수출 전 사전거래보고서 또는 수출 후 3개월 이내 사후거래보고서
export function getReportDeadlines(plannedExportDate: string) {
  const exportDate = new Date(plannedExportDate);
  const post = new Date(exportDate);
  post.setMonth(post.getMonth() + 3);
  const iso = (d: Date) => d.toISOString().split('T')[0];
  return {
    preReportDeadline: iso(exportDate), // 이 날짜(수출일) 전까지 제출
    postReportDeadline: iso(post),
    isPreReportOverdue: new Date() >= exportDate,
    isPostReportOverdue: new Date() > post,
  };
}

// LocalStorage 조작 우회 방지 - 드래프트 로드 시 Rule Engine 재검증
export function validateAndLoadDraft(raw: string, txId: string, initialState: ExportCaseState): ExportCaseState {
  try {
    const parsed: ExportCaseState = JSON.parse(raw);
    if (parsed.id !== txId) {
      console.warn('[Security] Draft ID mismatch. Resetting to initial state.');
      return { ...initialState, id: txId };
    }
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

// 사내 1차 판단 보조 로직. 최종 판정은 자가판정서(별지 제5호) 또는 전문판정으로 한다.
export function computeEccn(classification: ExportCaseState['classification']) {
  let eccn: '5D002' | 'EAR99' | 'ML21' | 'NON_CONTROLLED' = 'EAR99';
  if (classification.q1_cryptoOverLimit && !classification.q2_nonCryptoOnly && !classification.q3_oamOnly) {
    eccn = '5D002';
  }
  // 한국 판정과 무관하게, 미국산 암호 코드가 포함되면 미국 EAR 재수출 규정 검토가 별도로 필요하다.
  const isUsEarSubject = !!classification.q4_usCodeCommingled;
  return { computedEccn: eccn, isUsEarSubject };
}

/**
 * 스크리닝 상태
 * - isIncomplete: YESTRADE 우려거래자 조회가 끝나지 않음 → 다음 단계·출하 불가 (매 거래 필수, [별표 20] 3.2.4.1)
 * - isBlocked:    위험 신호(우려거래자 일치·의심징후·나의2 지역)가 있고 해소 조치가 없음 → STOP-SHIPMENT
 */
export function evaluateScreeningStatus(
  screening: ExportCaseState['screening'],
  destination?: Pick<ExportCaseState['destination'], 'isSanctionedCountry'>
) {
  const screeningStarted =
    screening.cslApiHit ||
    screening.yesTradeManualChecked ||
    screening.selectedRedFlags.length > 0;

  const hasRisk =
    screening.cslApiHit ||
    screening.hasRedFlags ||
    (destination?.isSanctionedCountry ?? false);

  const catchAllResolved = !!screening.isCatchAllApproved && !!(screening.catchAllLicenseNo || '').trim();
  const dueDiligenceResolved = !!screening.isDueDiligenceApproved && !!(screening.dueDiligenceNote || '').trim();

  const isBlocked = hasRisk && !catchAllResolved && !dueDiligenceResolved;
  const isIncomplete = !screening.yesTradeManualChecked;

  return { isBlocked, isIncomplete, screeningStarted, hasRisk };
}

/**
 * 출하(배포) 승인 가능 여부. 화면의 모든 승인 버튼이 이 함수를 거친다.
 */
export function canRelease(state: ExportCaseState): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const { isBlocked, isIncomplete } = evaluateScreeningStatus(state.screening, state.destination);
  if (isIncomplete) reasons.push('YESTRADE 우려거래자 조회가 완료되지 않았습니다.');
  if (isBlocked) reasons.push('STOP-SHIPMENT 상태입니다. 1단계에서 해소 경로를 처리하십시오.');
  if (state.classification.classificationType === 'NONE') reasons.push('전략물자 판정(자가판정 또는 전문판정)이 등록되지 않았습니다.');
  if (!state.releaseChecklist?.documentsMatch) reasons.push('출하 전 서류 일치 확인이 체크되지 않았습니다.');
  if (!state.releaseChecklist?.transferControlled) reasons.push('전달 경로 통제 확인이 체크되지 않았습니다.');
  if (state.salesManagerId && state.salesManagerId === state.complianceManagerId && !(state.adminOverrideReason || '').trim()) {
    reasons.push('기안자와 승인자가 같습니다. 예외 사유를 기재해야 합니다 (고시 제74조② 영업부문 독립).');
  }
  if (state.status === 'REVOKED') reasons.push('취소(REVOKED)된 거래입니다.');
  return { ok: reasons.length === 0, reasons };
}

/**
 * 거래별 필요 서류.
 * 근거는 LEGAL_REFERENCE.baseNotice 기준 원문 대조 결과이며, 원문으로 확인되지 않은
 * 면제는 적용하지 않는다(서류를 "필요"로 두고 note로 안내).
 */
export function getEnabledDocuments(state: ExportCaseState): DocumentConfig[] {
  const docs: DocumentConfig[] = [];

  const computedEccn = state.classification.computedEccn || computeEccn(state.classification).computedEccn;
  const isUsEarSubject = !!state.classification.q4_usCodeCommingled;
  const strategic = isStrategicItem(computedEccn);

  const { hasRedFlags, cslApiHit } = state.screening;
  const region: Region = state.destination.region || regionOf(state.destination.countryCode);
  const isGroupA = region === 'A';
  const isB2 = region === 'B2';
  const { isBlocked } = evaluateScreeningStatus(state.screening, state.destination);
  const t = state.transaction;
  const isTech = !!t.isTechnologyTransfer;
  const isRevoked = state.status === 'REVOKED';
  // 제20조 호 번호가 제2026-101호에서 당겨졌으나 제21조의 인용 호수는 개정되지 않았다.
  // 이 엔진은 현행 조문 "문언" 그대로 적용하고, 해당 서류에 허가기관 확인 권장 안내를 붙인다.
  const renumberNote = '제2026-101호로 제20조 호 번호가 바뀌었으나 제21조 인용 호수는 그대로임 — 현행 문언 기준 적용, 제출 전 허가기관 확인 권장';

  const add = (id: string, name: string, enabled: boolean, disabledReason?: string, pkg?: string, note?: string) => {
    docs.push({ id, name, enabled, disabledReason: enabled ? undefined : disabledReason, note: enabled ? note : undefined, package: pkg });
  };

  // ── 판정 ──
  add('Z-01', '가상 시뮬레이터', true, undefined, '사전심사');
  add('F-01', FORM_LABELS.selfClassification, true, undefined, '판정',
    '자가판정일이 허가 신청일 기준 최근 2년 이내여야 함 (고시 제20조①2호)');
  add('F-02', FORM_LABELS.proClassification, true, undefined, '판정');
  add('F-03', '기술사양 비교분석서 (사내 서식)', strategic,
    '사내 1차 판단 결과 비해당입니다. 판정 근거로 기술사양을 보관하려면 자가판정서에 첨부하십시오.', '판정');
  add('F-04', '판정관리대장', true, undefined, '판정');

  // ── 사전심사·출하 ──
  add('G-01', '수출거래 사전심사표', true, undefined, '사전심사');
  add('G-04', 'Stop-Shipment Report', isBlocked, '출하 보류 대상이 아닙니다.', '사전심사');
  add('H-01', '출하전 점검표', true, undefined, '출하/사후');
  add('I-01', '사후관리 대장', true, undefined, '출하/사후');

  // ── 미국 EAR (한국 법령과 별개) ──
  add('US-EAR', '미국 EAR 재수출 검토 메모 (사내)', isUsEarSubject,
    '미국산 암호 코드 포함으로 표시되지 않았습니다.', '판정',
    '미국 재수출 규정 적용 여부는 미국 규정·전문가 검토로 판단합니다. 한국 자가판정·허가 절차는 그대로 진행합니다.');

  // ── 허가 ──
  // 고시 제26조①9호: 암호화품목(5D002 등)을 민간기업 내부시스템 구축·운영 또는 민수용 제품 개발·생산 용도로
  // 수출하고, 최종목적지국가가 바세나르체제 회원국이거나 [별표 23] 국가에 본사를 둔 민간 최종사용자인 경우 허가 면제.
  // 여기서는 원문으로 확인된 [별표 23] 요건만 자동 판단한다(바세나르 회원국 목록은 사내 미검증).
  // 제26조①은 "기술이 아닌 것"에 대한 면제이므로 기술 수출에는 적용하지 않는다.
  const annex23Exempt = computedEccn === '5D002' && !isTech && !!t.cryptoCivilPurpose
    && isAnnex23Country(t.endUserHqCountry || '') && !isB2;
  const hasComp = !!t.hasComprehensiveLicense && !!(t.comprehensiveLicenseNo || '').trim();
  const needsLicense = strategic && !annex23Exempt && !hasComp;

  add('L-01', `${FORM_LABELS.licenseApplication} (개별수출허가)`, needsLicense,
    !strategic ? '사내 1차 판단 결과 비해당입니다 (판정 확정 후 재확인).'
      : annex23Exempt ? '고시 제26조①9호 요건 입력값 기준 허가면제 — 사전/사후거래보고 대상입니다.'
      : '유효한 포괄수출허가 번호가 입력되었습니다.',
    '인허가', computedEccn === 'ML21' ? '군용물자는 방위사업청 소관 허가입니다 (고시 제5조). 허가기관 안내를 확인하십시오.'
      : isB2 ? "나의2 지역: [별표 6] 제3호 등에 따라 서류·허가 면제가 제한됩니다." : undefined);

  // 제21조⑧1호: 산업통상부장관 허가 대상 "기술"을 가 지역으로 수출 → 제20조②제1호~제4호 면제
  //   (현행 번호: 1 계약서, 2 기술명세서, 3 최종사용자 서약서, 4 판정서)
  const techGroupAExempt = isTech && isGroupA && computedEccn !== 'ML21';
  if (isTech) {
    add('L-TECH', FORM_LABELS.techSpec, needsLicense && !techGroupAExempt,
      !needsLicense ? '개별수출허가 신청 대상이 아닙니다.' : "고시 제21조⑧1호: '가' 지역 기술 수출 시 제20조②1~4호 제출 면제 (사내 보관은 유지)",
      '인허가', '고시 제20조②2호');
  }

  add('L-02', FORM_LABELS.comprehensiveLicense, strategic && t.isCP_AA && !isB2,
    !strategic ? '비해당 품목입니다.' : isB2 ? '나의2 지역은 포괄수출허가 대상이 아닙니다.'
      : '자율준수무역거래자 지정(AA 이상) 후 신청할 수 있습니다. 지정서 정보가 등록되지 않았습니다.',
    '인허가', '대상 품목은 [별표 8], 등급별 가능 지역은 [별표 19]를 따릅니다.');

  // 상황허가: 고시 제55조① — 별지 제1호 서식 + 제20조 서류. 대상 여부는 제54조(인지·의심·통보)로 판단.
  const catchAllCandidate = !strategic && (hasRedFlags || cslApiHit);
  add('L-03', `${FORM_LABELS.licenseApplication} (상황허가)`, catchAllCandidate,
    strategic ? '전략물자 해당 품목은 개별/포괄수출허가 절차를 따릅니다.' : '의심징후·우려거래자 일치가 없습니다.',
    '상황허가 패키지', '상황허가 대상 여부는 고시 제54조 요건으로 담당자가 판단합니다.');

  // ── 허가 신청 첨부서류 (고시 제20조, 제21조 — 제2026-101호 현행 번호) ──
  // 제20조① 물품: 1 계약서 / 2 판정서 / 3 수입목적확인서 또는 최종수하인 진술서(별지2) /
  //               4 최종사용자 서약서(별지2의2·2의3) / 5 최종사용자 영업증명서 / 6 기타
  // 제20조② 기술: 1 계약서(서면계약 없으면 제외) / 2 기술명세서 / 3 최종사용자 서약서 / 4 판정서 / 5 기타
  // 수출자 서약서(구 별지 제3호)는 제2026-101호로 폐지 — 의무는 제18조의3으로 이관
  const licenseDocsNeeded = needsLicense || catchAllCandidate;
  // 제21조①: 장관 허가 대상 물품을 가 지역으로 → 제20조①1호, 4호~6호 면제 (문언 기준). 군용물자(ML) 제외
  const goodsGroupAExempt = !isTech && isGroupA && computedEccn !== 'ML21';
  const groupAExempt = isTech ? techGroupAExempt : goodsGroupAExempt;
  const notNeeded = '허가 신청 대상이 아닙니다.';

  add('DOC-CONTRACT', '수출계약서·신용장·가계약서 중 1부', licenseDocsNeeded && !groupAExempt,
    !licenseDocsNeeded ? notNeeded
      : isTech ? "고시 제21조⑧1호: '가' 지역 기술 수출 시 제출 면제 (사내 보관은 유지)"
      : "고시 제21조①: '가' 지역 물품 수출 시 제출 면제 (사내 보관은 유지)",
    '인허가', isTech ? '서면계약 없이 기술을 수출하는 경우 제출하지 않음 (제20조② 단서)' : '고시 제20조①1호');

  add('DOC-CONSIGNEE', `${FORM_LABELS.consigneeStatement} 또는 수입국 정부 수입목적확인서`, licenseDocsNeeded && !isTech,
    !licenseDocsNeeded ? notNeeded : '기술 수출 서류 목록(제20조②)에 없는 서류입니다.',
    '인허가', isGroupA ? `'가' 지역이라도 제20조①3호는 제21조① 면제 호수(1, 4~6호)에 없음. ${renumberNote}` : '고시 제20조①3호');

  add('DOC-ENDUSER', `${FORM_LABELS.endUserStatement} (바세나르 품목은 ${FORM_LABELS.endUserStatementWA} 가능)`, licenseDocsNeeded && !groupAExempt,
    !licenseDocsNeeded ? notNeeded
      : isTech ? "고시 제21조⑧1호: '가' 지역 기술 수출 시 제출 면제" : "고시 제21조①: '가' 지역 물품 수출 시 제출 면제",
    '인허가', [
      isTech ? '고시 제20조②3호' : '고시 제20조①4호',
      '구매자·최종수하인·최종사용자가 같은 경우(제21조③), 국제수출통제체제 회원국 수출(제21조④1호), 최근 1년 동일 거래 3건 이상(제21조⑪), [별표 19] 서류면제는 담당자가 요건을 확인한 경우에만 제외',
    ].join(' / '));

  add('DOC-BIZCERT', '최종사용자 영업증명서·납세증명서 등 (수입국 정부 발행)', licenseDocsNeeded && !isTech && !goodsGroupAExempt,
    !licenseDocsNeeded ? notNeeded : isTech ? '기술 수출 서류 목록(제20조②)에 없는 서류입니다.'
      : "고시 제21조①: '가' 지역 물품 수출 시 제출 면제 (문언 기준)",
    '인허가', isGroupA ? renumberNote : '고시 제20조①5호');

  if (isTech && licenseDocsNeeded && techGroupAExempt) {
    docs.push({ id: 'F-01-NOTE', name: '판정서 제출', enabled: true, package: '인허가',
      note: `고시 제21조⑧1호 문언상 '가' 지역 기술 수출은 제20조②4호(판정서)도 제출 면제 범위에 포함됨. ${renumberNote}. 판정서 자체는 사내에서 반드시 작성·보관 (법 제28조).` });
  }

  // 제18조의3(수출자의 의무, 제2026-101호 신설): 허가 신청 전 거래관련자 신원·최종사용용도 확인,
  // 허가 후 사실 변동 가능성 시 지체 없이 수출 중단·허가기관 협의, 재판매·재수출 동의 요청 시 협의
  add('G-01-183', '거래관련자 신원·최종사용용도 확인 기록 (고시 제18조의3)', strategic || catchAllCandidate,
    '전략물자·상황허가 대상이 아닙니다 (거래심사 기록은 그대로 보관).', '사전심사',
    '허가 신청 "전"에 구매자·최종수하인·최종사용자 신원과 최종사용용도를 확인하고 거래심사표에 근거를 남김. 허가 후 사실이 달라질 가능성이 있으면 즉시 수출 중단 후 허가기관과 협의');

  // ── 사고·보고 ──
  add('J-01', FORM_LABELS.voluntaryReport, isRevoked, '사고 발생 시에만 활성화됩니다.', '사후/보고');
  add('J-02', FORM_LABELS.preventionPlan, isRevoked, '사고 발생 시에만 활성화됩니다.', '사후/보고');

  const exemptReport = annex23Exempt || t.isLicenseExempt;
  const k01Enabled = exemptReport && (t.isRussiaBelarus || t.isPreReportChosen);
  add('K-01', FORM_LABELS.preReport, k01Enabled, '사전거래보고 대상이 아닙니다.', '사후/보고', '수출 전 제출 (고시 제26조①)');
  const k02Enabled = exemptReport && !t.isRussiaBelarus && (t.isPostReportChosen || !t.isPreReportChosen);
  let k02Reason = '사후거래보고 대상이 아닙니다.';
  if (exemptReport && t.isRussiaBelarus) k02Reason = '러시아·벨라루스 건은 [별표 24]를 확인하고 사전거래보고로 처리합니다.';
  add('K-02', FORM_LABELS.postReport, k02Enabled, k02Reason, '사후/보고', '수출 후 3개월 이내 제출 (고시 제26조①)');

  const g03Enabled = needsLicense || (strategic && t.isCP_AA && !isB2);
  add('G-03', '수출허가 관리대장', g03Enabled, '수출허가 신청 대상이 아닙니다.', '인허가');

  add('K-03', '자율준수체제 운영 보고서 (고시 별지 제18호)', false, '정기 보고서는 개별 거래가 아닌 연간 보고 메뉴에서 작성합니다.', '사후/보고');
  add('K-04', '자율준수무역거래자 실적 보고서 (고시 별지 제19호)', false, '정기 보고서는 개별 거래가 아닌 연간 보고 메뉴에서 작성합니다.', '사후/보고');

  add('M-01', '별지 7호 수입목적확인서', t.isImport, '수입 거래가 아닙니다.', '수입/통관');
  add('M-02', '별지 8호 수입내역 신고서', t.isImport, '수입 거래가 아닙니다.', '수입/통관');
  add('M-03', '별지 9호 통관증명서', t.isImport, '수입 거래가 아닙니다.', '수입/통관');

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
    
    // 2. Classification ('EAR99'는 내부 호환값 → 서식에는 "비해당"으로 표기)
    eccn: eccnLabel(state.classification.computedEccn),
    eccnCode: isStrategicItem(state.classification.computedEccn) ? state.classification.computedEccn : '비해당',
    controlNo: isStrategicItem(state.classification.computedEccn) ? state.classification.computedEccn : '비해당',
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
    
    // 6. 사전·사후거래보고 기한 (고시 제26조①: 수출 전 / 수출 후 3개월 이내)
    plannedExportDate: state.transaction.plannedExportDate || '',
    preReportDeadline: state.transaction.plannedExportDate
      ? getReportDeadlines(state.transaction.plannedExportDate).preReportDeadline + ' 이전' : '',
    postReportDeadline: state.transaction.plannedExportDate
      ? getReportDeadlines(state.transaction.plannedExportDate).postReportDeadline : '',
  };
}
