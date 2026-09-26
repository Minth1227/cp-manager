export type CPGrade = 'NONE' | 'A' | 'AA' | 'AAA';
export type ExportRoute = 'GENERAL' | 'CATCH_ALL' | 'INDIVIDUAL' | 'USER_COMPREHENSIVE' | 'ITEM_USER_COMPREHENSIVE' | 'TOP_TIER_COMPREHENSIVE' | 'BLOCKED';

export interface PartyInfo {
  name: string;
  address: string;
  country: string;
}

export interface ExportCaseStateV2 {
  id: string;
  updatedAt: string;
  status: 'DRAFT' | 'STOP_SHIPMENT' | 'READY_FOR_RELEASE' | 'RELEASED' | 'REVOKED';
  
  destination: {
    countryGroup: '가' | '나-1' | '나-2' | '기타';
  };

  classification: {
    itemType: '일반' | '민감' | '초민감-VSL' | '비전략물자';
  };

  screening: {
    isBlacklisted: boolean;
    isWMDKnow: boolean;
    has12RedFlags: boolean;
  };

  transaction: {
    cpGrade: CPGrade;
  };
}

export interface RouteResult {
  route: ExportRoute;
  routeName: string;
  requiredForSubmit: string[];
  requiredForArchive: string[];
  isBlocked: boolean;
  blockReason?: string;
}

export function evaluateRoutingEngine(state: ExportCaseStateV2): RouteResult {
  const { classification, destination, screening, transaction } = state;
  const { countryGroup } = destination;
  const { itemType } = classification;
  const { isBlacklisted, isWMDKnow, has12RedFlags } = screening;
  const { cpGrade } = transaction;

  // 1. 우려거래자(DPL) 일치
  if (isBlacklisted) {
    return {
      route: 'BLOCKED',
      routeName: '수출 원천 차단',
      requiredForSubmit: [],
      requiredForArchive: [],
      isBlocked: true,
      blockReason: '우려거래자 일치로 접수가 불가합니다. (시스템 블록)'
    };
  }

  // [수정] 이 파일 전체의 requiredForSubmit/requiredForArchive는 원래 L-05/L-06/L-08/L-09
  // (processFlow.js상 "상황허가 전용 첨부서류"로 분류된 서식)를 개별/포괄수출허가 케이스에도
  // 그대로 재사용하고 있었고, EUC(최종사용자서약서)를 L-05로, C-01(사내교육 시행 공지문)을
  // "CP 내부심사서"로 잘못 표기하고 있었다. 실제 서식 카탈로그(definitions.js) 기준으로 바로잡음:
  //   - L-03 최종수하인 및 구매자 진술서, L-04 최종사용자 서약서(EUC), L-10 수출자 서약서
  //     → 개별/포괄수출허가 공통 첨부서류 (processFlow.js의 step-export-permit-common)
  //   - L-05~L-09 → 상황허가 전용 첨부서류 (processFlow.js의 step-export-permit-catchall)
  //   - C-01(사내교육 공지문)은 이 맥락과 무관 → 제거, G-01(전략물자 거래심사표) 유지

  // 2. WMD 전용 인지/통보 (비전략물자)
  if (itemType === '비전략물자' && isWMDKnow) {
    return {
      route: 'CATCH_ALL',
      routeName: '상황허가',
      requiredForSubmit: ['L-01', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08', 'L-09', 'L-11'], // 상황신청서(L-01), EUC(L-04), 상황허가 전용 첨부서류(L-05~L-09)
      requiredForArchive: ['F-01', 'G-01'], // 물자 판정서, 전략물자 거래심사표(내부심사)
      isBlocked: false,
    };
  }

  // 3. 12개 위험징후 의심 (비전략물자)
  if (itemType === '비전략물자' && has12RedFlags) {
    if (countryGroup === '가') {
      return {
        route: 'GENERAL',
        routeName: '일반 통관 (내부 Hold)',
        requiredForSubmit: [], // 상업송장(CI), 포장명세서(PL)는 시스템외 서류로 취급
        requiredForArchive: ['G-01', 'F-01'], // 관리자 정밀 검토서(G-01), 물자 판정서
        isBlocked: false, // 단, G-01 결재 전까지 Hold 됨.
      };
    } else { // 나-1 / 나-2
      return {
        route: 'CATCH_ALL',
        routeName: '상황허가',
        requiredForSubmit: ['L-01', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08', 'L-09', 'L-11'],
        requiredForArchive: ['F-01', 'G-01'],
        isBlocked: false,
      };
    }
  }

  // 4. Clear (위험 없음) - 비전략물자
  if (itemType === '비전략물자') {
    return {
      route: 'GENERAL',
      routeName: '일반 통관 (완전 면제)',
      requiredForSubmit: [],
      requiredForArchive: ['F-01', 'G-01'], // 물자 판정서, 스크리닝 로그
      isBlocked: false,
    };
  }

  // [신규] L-11(기타 첨부서류)은 수출계약서·영업증명서(사업자등록증)·기술사양서(카탈로그) 등
  // 법정 서식이 없는 문서들을 파일 그대로 첨부하는 공용함. 개별수출허가 강제 케이스는 이 서류들을
  // 실제로 정부에 제출해야 하므로 requiredForSubmit에, 포괄허가 혜택을 받는 케이스는 CP등급이
  // 높아질수록 제출 면제·사내보관으로 전환되므로 requiredForArchive에 넣는다.

  // 5. Clear - 전략물자 (초민감-VSL) — 포괄허가 원천 배제(별표8), CP등급 무관 개별허가 강제
  if (itemType === '초민감-VSL') {
    return {
      route: 'INDIVIDUAL',
      routeName: '개별수출허가 (강제)',
      requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'], // 개별신청서 + 공통 첨부서류 + 수출계약서/영업증명서/기술사양서
      requiredForArchive: ['F-01', 'G-01'],
      isBlocked: false,
    };
  }

  // 6. Clear - 전략물자 (일반/민감) - 나-2 지역 (우려지역, 전 등급 포괄허가 제한)
  if (countryGroup === '나-2') {
    return {
      route: 'INDIVIDUAL',
      routeName: '개별수출허가 (강제)',
      requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'],
      requiredForArchive: ['F-01', 'G-01'],
      isBlocked: false,
    };
  }

  // 7. Clear - 전략물자 (민감) - 나-1 지역 (민감품목은 나-1도 전 등급 개별허가 강제)
  if (itemType === '민감' && countryGroup === '나-1') {
    return {
      route: 'INDIVIDUAL',
      routeName: '개별수출허가 (강제)',
      requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'],
      requiredForArchive: ['F-01', 'G-01'],
      isBlocked: false,
    };
  }

  // 8. Clear - 전략물자 - 가 / 나-1 지역 - 포괄허가 처리
  if (cpGrade === 'NONE') {
    return {
      route: 'INDIVIDUAL',
      routeName: '개별수출허가',
      requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'],
      requiredForArchive: ['F-01', 'G-01'],
      isBlocked: false,
    };
  }

  if (itemType === '일반' && countryGroup === '나-1') {
    if (cpGrade === 'A') {
      return {
        route: 'INDIVIDUAL',
        routeName: '개별수출허가',
        requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'],
        requiredForArchive: ['F-01', 'G-01'],
        isBlocked: false,
      };
    }
    if (cpGrade === 'AA' || cpGrade === 'AAA') {
      return {
        route: 'USER_COMPREHENSIVE',
        routeName: '사용자 포괄허가',
        // AA등급은 수출자 서약서(L-10)·수출계약서 등(L-11)까지 제출, AAA등급은 정부제출에서 면제되고 사내보관으로 대체
        requiredForSubmit: cpGrade === 'AA' ? ['L-02', 'L-04', 'L-10', 'L-11'] : ['L-02', 'L-04'],
        requiredForArchive: cpGrade === 'AA' ? ['L-03'] : ['L-03', 'L-10', 'L-11'],
        isBlocked: false,
      };
    }
  }

  if ((itemType === '일반' || itemType === '민감') && countryGroup === '가') {
    if (cpGrade === 'A') {
      return {
        route: 'USER_COMPREHENSIVE',
        routeName: '사용자 포괄허가',
        requiredForSubmit: ['L-02', 'L-03', 'L-04', 'L-10', 'L-11'], // 포괄신청서, 최종수하인·구매자진술서, EUC, 수출자서약서, 수출계약서 등
        requiredForArchive: [],
        isBlocked: false,
      };
    }
    if (cpGrade === 'AA') {
      return {
        route: 'ITEM_USER_COMPREHENSIVE',
        routeName: '품목/사용자 포괄허가',
        requiredForSubmit: ['L-02', 'L-04', 'L-10'], // 포괄신청서, EUC, 수출자서약서
        requiredForArchive: ['L-03', 'L-11'], // 최종수하인·구매자진술서, 영업증명서/기술사양서는 사내보관으로 대체
        isBlocked: false,
      };
    }
    if (cpGrade === 'AAA') {
      return {
        route: 'TOP_TIER_COMPREHENSIVE',
        routeName: '최상위 포괄허가',
        requiredForSubmit: ['L-02', 'L-04'], // 포괄신청서, EUC(자율준수 서약 성격 포함)만 제출
        requiredForArchive: ['L-03', 'L-10', 'L-11'], // 최종수하인·구매자진술서, 수출자서약서, 수출계약서/영업/기술사양서는 사내보관
        isBlocked: false,
      };
    }
  }

  // Fallback (안전을 위해 개별수출허가)
  return {
    route: 'INDIVIDUAL',
    routeName: '알 수 없는 상태 (개별수출허가 징구)',
    requiredForSubmit: ['L-01', 'L-03', 'L-04', 'L-10', 'L-11'],
    requiredForArchive: ['F-01', 'G-01'],
    isBlocked: false,
  };
}
