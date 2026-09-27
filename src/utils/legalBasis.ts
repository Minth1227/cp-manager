// ============================================================
// 법령 근거 단일 원천 (Single source of legal truth)
// ------------------------------------------------------------
// 룰 엔진·화면이 참조하는 국가 목록, 서식 번호, 등급 판정을 한 곳에 모은다.
// 여기 값은 모두 아래 "기준본" 원문과 대조한 것이며, 원문 대조가 끝나지 않은
// 사항은 PENDING_LEGAL_CHECKS에 적고 화면에 "확인 필요"로 노출한다.
// (원칙: 원문으로 확인되지 않은 면제·특례는 자동 적용하지 않는다)
// ============================================================

export const LEGAL_REFERENCE = {
  baseNotice: '산업통상부고시 제2026-101호 (2026. 9. 1. 시행)',
  currentNotice: '산업통상부고시 제2026-101호 (2026. 9. 1. 시행)',
  previousNotice: '산업통상부고시 제2025-37호 (2025. 12. 31. 시행)',
  // 2026-09-26: 제2026-101호 전문·개정문 원문 대조 완료
  //  - 제6장(제74조~제91조), 제92조, 제21조, 제26조: 제2025-37호와 문언 동일
  //  - 제18조의3 신설(수출자의 의무), 제20조 호 번호 변경·수출자 서약서 삭제, 별지 제3호 삭제
  //  - [별표 6]: 제2호·제3호의 "목적지국가" → "최종목적지국가" (국가 목록 변경 없음)
  //  - [별표 19]·[별표 20]·[별표 23]: 개정 대상 아님
  currentNoticeVerified: true,
  lastReviewed: '2026-09-26',
};

// 원문 대조는 끝났으나 조문 간 인용 관계 때문에 허가기관 확인을 권장하는 사항
export const PENDING_LEGAL_CHECKS: string[] = [
  '제2026-101호로 제20조제1항·제2항의 호 번호가 바뀌었으나 제21조(서류 면제)의 인용 호수는 개정되지 않았음. 이 시스템은 현행 문언 그대로 적용함 — 가 지역 물품 수출 시 최종수하인 진술서(제20조①3호)는 면제 호수에 없고, 최종사용자 영업증명서(5호)는 면제 호수에 포함됨. 실제 신청 전 허가기관(YESTRADE) 안내로 확인 권장',
];

// ── [별표 6] 전략물자 수출지역 구분 (고시 제10조 관련, 제2026-101호 기준 — 국가 목록은 제2025-37호와 동일) ──
// 가 지역 (미국 4개 자치령 포함)
export const REGION_A_NAMES = [
  '아르헨티나', '호주', '오스트리아', '벨기에', '불가리아', '캐나다', '체코', '덴마크', '핀란드',
  '프랑스', '독일', '그리스', '헝가리', '아일랜드', '이탈리아', '일본', '룩셈부르크', '네덜란드',
  '뉴질랜드', '노르웨이', '폴란드', '포르투갈', '스페인', '스웨덴', '스위스', '터키', '우크라이나',
  '영국', '미국', '괌', '북마리아나제도', '미국령 버진아일랜드', '푸에르토리코',
];
export const REGION_A_CODES = [
  'AR', 'AU', 'AT', 'BE', 'BG', 'CA', 'CZ', 'DK', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'JP',
  'LU', 'NL', 'NZ', 'NO', 'PL', 'PT', 'ES', 'SE', 'CH', 'TR', 'UA', 'GB', 'US', 'GU', 'MP', 'VI', 'PR',
];

// 나의2 지역 (북한은 "제3국을 경유하여 재수출되는 경우에 한함"으로 규정되어 있음)
export const REGION_B2_NAMES = [
  '중앙아프리카공화국', '북한', '콩고민주공화국', '이라크', '레바논', '리비아', '소말리아',
  '남수단', '수단', '시리아', '예멘', '아프가니스탄', '이란',
];
export const REGION_B2_CODES = ['CF', 'KP', 'CD', 'IQ', 'LB', 'LY', 'SO', 'SS', 'SD', 'SY', 'YE', 'AF', 'IR'];

// ── [별표 23] 암호화품목 허가면제 특례국가 (제2026-101호 기준, 개정 없음) ──
// 주의: 별표 23 국가라는 사실만으로 허가가 면제되지 않는다. 고시 제26조제1항제9호의
// 용도 요건(민간기업 내부시스템 구축·운영 또는 민수용 제품 개발·생산)과 함께 판단한다.
export const ANNEX23_NAMES = [
  '호주', '오스트리아', '벨기에', '불가리아', '캐나다', '크로아티아', '체코', '덴마크', '에스토니아',
  '핀란드', '프랑스', '독일', '그리스', '헝가리', '아일랜드', '이탈리아', '일본', '라트비아',
  '리투아니아', '룩셈부르크', '몰타', '네덜란드', '뉴질랜드', '노르웨이', '폴란드', '포르투갈',
  '루마니아', '슬로바키아', '슬로베니아', '스페인', '스웨덴', '스위스', '터키', '영국', '미국', '대한민국', '한국',
];
export const ANNEX23_CODES = [
  'AU', 'AT', 'BE', 'BG', 'CA', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'JP', 'LV', 'LT', 'LU', 'MT', 'NL', 'NZ', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH',
  'TR', 'GB', 'US', 'KR',
];

export type Region = 'A' | 'B1' | 'B2' | 'UNKNOWN';

const norm = (s: string) => (s || '').trim();

export function regionOf(nameOrCode: string): Region {
  const v = norm(nameOrCode);
  if (!v) return 'UNKNOWN';
  const up = v.toUpperCase();
  if (REGION_A_NAMES.includes(v) || REGION_A_CODES.includes(up)) return 'A';
  if (REGION_B2_NAMES.includes(v) || REGION_B2_CODES.includes(up)) return 'B2';
  // [별표 6] 나의1 지역은 "가 지역 및 나의2 지역에 해당하지 않는 국가 및 지역"
  return 'B1';
}

export function regionLabel(r: Region): string {
  return r === 'A' ? "'가' 지역" : r === 'B1' ? "'나의1' 지역" : r === 'B2' ? "'나의2' 지역" : '미입력';
}

export function isAnnex23Country(nameOrCode: string): boolean {
  const v = norm(nameOrCode);
  return ANNEX23_NAMES.includes(v) || ANNEX23_CODES.includes(v.toUpperCase());
}

// ── 자율준수무역거래자 실제 지정 등급 ──
// 목표 등급(targetGrade)이 아니라 "지정서를 받은 등급"만 특례 판단에 쓴다.
// 유효기간: 지정일부터 3년 (고시 제85조①)
export type CpGrade = 'NONE' | 'A' | 'AA' | 'AAA';

export function getDesignatedCpGrade(companyInfo: any, targetGrade?: string, today: Date = new Date()): CpGrade {
  if (!companyInfo || companyInfo.cpAppMode !== 'certified') return 'NONE';
  if (!companyInfo.cpCertifiedNumber || !companyInfo.cpCertifiedDate) return 'NONE';
  const certified = new Date(companyInfo.cpCertifiedDate);
  if (isNaN(certified.getTime())) return 'NONE';
  const expiry = new Date(certified);
  expiry.setFullYear(expiry.getFullYear() + 3);
  if (today >= expiry) return 'NONE';
  const g = (companyInfo.cpCertifiedGrade || targetGrade || '').toUpperCase();
  return g === 'A' || g === 'AA' || g === 'AAA' ? (g as CpGrade) : 'NONE';
}

const GRADE_ORDER: Record<CpGrade, number> = { NONE: 0, A: 1, AA: 2, AAA: 3 };

// 사용자가 서식에서 고른 등급이 실제 지정 등급보다 높으면 실제 등급으로 낮춘다.
export function capCpGrade(requested: string, designated: CpGrade): CpGrade {
  const r = (['NONE', 'A', 'AA', 'AAA'].includes(requested) ? requested : 'NONE') as CpGrade;
  return GRADE_ORDER[r] <= GRADE_ORDER[designated] ? r : designated;
}

// ── 서식 명칭 (고시 별지 번호, 제2026-101호 기준) ──
export const FORM_LABELS = {
  licenseApplication: '별지 제1호 전략물자(기술)등 수출허가(신청)서',   // 개별·상황허가 공통 (제20조, 제55조)
  techSpec: '별지 제1호의3 전략기술 수출허가 기술명세서',               // 기술 수출 시 (제20조②2호)
  consigneeStatement: '별지 제2호 최종수하인 진술서',                     // 제20조①3호 (현행)
  endUserStatement: '별지 제2호의2 최종사용자 서약서',                    // 제20조①4호, ②3호 (현행)
  endUserStatementWA: '별지 제2호의3 최종사용자 서약서(바세나르 통제품목 전용)',
  // exporterPledge(별지 제3호 수출자 서약서)는 제2026-101호로 폐지 → 제18조의3(수출자의 의무)
  proClassification: '별지 제4호 전문판정(신청)서',
  selfClassification: '별지 제5호 자가판정서',                           // 제20조①2호
  comprehensiveLicense: '별지 제6호 포괄수출허가(신청)서',
  preReport: '별지 제16호 사전거래보고서',                               // 제26조①: 수출 전
  postReport: '별지 제16호의2 사후거래보고서',                           // 제26조①: 수출 후 3개월 이내
  voluntaryReport: '별지 제24호 자진신고서',                             // 제98조
  preventionPlan: '별지 제25호 재발 방지 계획서',
};
