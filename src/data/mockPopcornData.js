export const popcornMockData = {
  companyInfo: {
    cpAppMode: 'initial',
    name: '(주)팝콘사 (PopcornSAR)',
    ceo: '홍길동',
    registrationNumber: '123-45-67890',
    cpTargetApplyDate: '2026-12-31',
    cpCertifiedDate: '',
    cpCertifiedNumber: ''
  },
  products: [
    { id: 'p_autosar_io', name: 'AutoSAR.io', hsCode: '8523.49' },
    { id: 'p_prte', name: 'PRTE (vECU)', hsCode: '8523.49' },
    { id: 'p_parvis', name: 'PARVIS (AI-VModel)', hsCode: '8523.49' },
    { id: 'p_pave', name: 'PAVE (A-SPICE)', hsCode: '8523.49' },
    { id: 'p_paio', name: 'PAIO (AUTOSAR CP)', hsCode: '8523.49' },
    { id: 'p_para', name: 'PARA (C++/Rust)', hsCode: '8523.49' },
    { id: 'p_f01', name: '엔지니어링 서비스 (F-01)', hsCode: '해당없음(용역)' }
  ],
  transactions: [
    { id: 'tx_denso', prodId: 'p_autosar_io', name: 'Adaptive AUTOSAR Full-Set 납품', country: '일본', buyer: 'Denso', exportDate: '2018-03-15' },
    { id: 'tx_avl', prodId: 'p_autosar_io', name: 'AUTOSAR 모델링 도구 라이선스', country: '독일', buyer: 'AVL', exportDate: '2026-10-01' },
    { id: 'tx_huawei', prodId: 'p_autosar_io', name: 'AUTOSAR 모델링 도구 납품', country: '중국', buyer: 'Huawei', exportDate: '2026-11-15' },
    { id: 'tx_aubass', prodId: 'p_autosar_io', name: 'White Label 공급 계약', country: '일본', buyer: 'AUBASS', exportDate: '2026-12-01' },
    { id: 'tx_sdverse', prodId: 'p_autosar_io', name: 'SDVerse 마켓플레이스 판매', country: '미국', buyer: 'SDVerse', exportDate: '2026-12-20' }
  ],
  formsData: {
    // 공통 양식
    'B-01': {
      compName: '(주)팝콘사',
      ceoName: '대표이사',
      signDate: '2026-09-11'
    },
    // 시나리오 1: 안전 수출 건 (일본 Denso)
    'Z-01_tx_denso': {
      q0_type: '수출',
      q_country: '일본',
      q_region: '가 지역',
      q_defense: '아니오',
      q_strategic: '비해당',
      q_catchall: '아니오',
      q_denied: '아니오',
      q_redflag: '아니오'
    },
    'F-01_tx_denso': {
      companyName: '(주)팝콘사',
      ceoName: '홍길동',
      hsCode: '8523.49',
      itemName: 'AutoSAR.io (Adaptive AUTOSAR Full-Set)',
      modelNumber: 'v2.0',
      specUsage: '자동차 전자제어기(ECU) 개발용 민수용 소프트웨어 도구 모음',
      strategic: 'no',
      catchAll: 'no',
      controlNo: '-'
    },
    'G-01_tx_denso': {
      exportContractNo: 'PO-2018-0301',
      buyerName: 'Denso Corporation',
      destinationCountry: '일본',
      catchAllItemCheck: '해당 없음 (일반 비통제)',
      dplScreeningResult: '정상 (우려거래자 미해당)',
      dplScreeningDate: '2018-03-05',
      screeningDecision: '거래 승인 (수출 진행 가능)',
      decisionReason: 'Yestrade 및 통합검색기 조회 결과 제재/우려거래자 리스트 매칭 없음. 안전 등급.',
      screenerName: '수출통제담당자'
    },
    'H-01_tx_denso': {
      shipmentDate: '2018-03-15',
      checker: '최고경영자/수출통제기구장',
      destCountry: '일본',
      consignee: 'Denso Corporation'
    },

    // 시나리오 2: 캐치올/우려거래자 리스크 수출 건 (중국 Huawei)
    'Z-01_tx_huawei': {
      q0_type: '수출',
      q_country: '중국',
      q_region: '나의1 지역',
      q_defense: '아니오',
      q_strategic: '비해당',
      q_catchall: '예',
      q_denied: '예',
      q_redflag: '예'
    },
    'F-01_tx_huawei': {
      companyName: '(주)팝콘사',
      ceoName: '홍길동',
      hsCode: '8523.49',
      itemName: 'AUTOSAR 모델링 도구',
      modelNumber: 'v2.0',
      specUsage: '소프트웨어 자체는 군용이나 이중용도 통제물품에 해당하지 않음.',
      strategic: 'no',
      catchAll: 'yes',
      controlNo: '-'
    },
    'G-01_tx_huawei': {
      exportContractNo: 'PO-2026-1101',
      buyerName: 'Huawei Technologies Co., Ltd.',
      destinationCountry: '중국',
      catchAllItemCheck: '검토 요망',
      dplScreeningResult: '위험 (우려거래자 일치 - 거래 중단)',
      dplScreeningDate: '2026-11-05',
      screeningDecision: '상황허가 신청 필수 (L-01)',
      decisionReason: '미국 상무부 Entity List (거부거래자 리스트) 등재 기업으로 매칭됨. 우려거래자 수출 리스크 매우 높음.',
      screenerName: '수출통제담당자'
    },
    'L-01_tx_huawei': {
      exporterCompany: '(주)팝콘사',
      buyerName: 'Huawei Technologies Co., Ltd.',
      endUserName: 'Huawei Technologies Co., Ltd.',
      destCountry: '중국',
      hsCode: '8523.49',
      itemName: 'AUTOSAR 모델링 도구',
      exportPurpose: '통신장비 연구개발용',
      permitCondition: '상황허가 심사 대상'
    }
  },
  formsStatus: {
    'B-01': 'done',
    'B-02': 'progress',
    
    // Denso
    'Z-01_tx_denso': 'done',
    'F-01_tx_denso': 'done',
    'G-01_tx_denso': 'done',
    'H-01_tx_denso': 'done',

    // Huawei
    'Z-01_tx_huawei': 'done',
    'F-01_tx_huawei': 'done',
    'G-01_tx_huawei': 'done',
    'L-01_tx_huawei': 'review'
  }
};
