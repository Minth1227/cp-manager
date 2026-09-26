// ============================================
// CP AA등급 전 서식 종합 샘플 더미 데이터
// (주)팝콘사 맞춤형 실무 데이터
// ============================================

export const cpSampleDummyData = {
  companyInfo: {
    name: '(주)팝콘사',
    ceo: '대표이사',
    registrationNumber: '123-86-00000',
    establishDate: '2018-05-15',
    address: '서울특별시 영등포구 선유로 123 팝콘타워 5층',
    businessType: '소프트웨어 개발 및 공급업',
    tradeRegistrationNumber: '30123456',
    employeeCount: '45명',
    capital: '500,000,000원',
    annualRevenue: '6,500,000,000원',
    website: 'https://www.popcornsar.com'
  },
  targetGrade: 'AA',
  applicationType: '유형2',
  formData: {
    'Z-01': {
      q0_type: '수출',
      q1_tech: '아니오',
      q2_exempt: '아니오',
      q3_strategic: '해당',
      q4_catchall_nation: '아니오',
      q5_catchall_user: '아니오',
      q6_exclude: '아니오',
      q7_region: '가 지역',
      q8_cp_grade: 'AA',
      q9_gov: '아니오',
      q10_indiv_fast: '예'
    },
    'B-01': {
      companyName: '(주)팝콘사',
      ceoName: '대표이사',
      declarationDate: '2026-01-15',
      commitmentText: '(주)팝콘사는 자동차용 소프트웨어(AUTOSAR) 및 무역 솔루션 선도기업으로서 대외무역법 및 전략물자 수출입고시를 철저히 준수합니다. 본인은 대표이사로서 자율준수관리기구의 독립성을 보장하고 매출 이익보다 무역안보 규범 준수를 최우선으로 할 것을 선언합니다.'
    },
    'B-02': {
      companyName: '(주)팝콘사',
      noticeDate: '2026-01-16',
      noticeTitle: '[공지] 최고경영자 자율준수(CP) 이행선언문 게시 및 전사 준수 지침',
      channel: '사내 인트라넷 팝업 및 공지사항 게시판 (1개월 게재)',
      target: '전 임직원'
    },
    'A-01': {
      drafter: '이무역 대리',
      reviewer: '박전략 이사 (자율준수관리자)',
      approver: '대표이사',
      draftDate: '2026-01-10',
      effectiveDate: '2026-01-15',
      subject: '자율수출관리규정 제정의 건',
      body: '대외무역법 제22조 및 전략물자 수출입고시 제75조에 의거, 당사의 전략물자 수출관리 및 AA등급 CP 지정을 위해 표준자율수출관리규정(별표7)을 자사 직제에 맞게 테일러링하여 제정하고자 합니다.'
    },
    'A-02': {
      noticeDate: '2026-01-16',
      title: '[시행공지] (주)팝콘사 자율수출관리규정 제정 및 시행 안내',
      content: '2026년 1월 15일부로 당사 사내 자율수출관리규정이 제정되었습니다. 연구소, 영업본부, 물류팀 등 관련 부서는 규정을 숙지하고 수출 거래 시 사전 심사 절차를 필히 준수하시기 바랍니다.'
    },
    'A-03': {
      tableTitle: '규정 열람확인대장',
      rows: [
        { no: 1, name: '대표이사', department: '경영진', readDate: '2026-01-16', signature: '대표이사 (서명)' },
        { no: 2, name: '박전략', department: '자율수출관리기구', readDate: '2026-01-16', signature: '박전략 (서명)' },
        { no: 3, name: '이무역', department: '해외영업팀', readDate: '2026-01-16', signature: '이무역 (서명)' },
        { no: 4, name: '최엔진', department: 'AUTOSAR 연구소', readDate: '2026-01-17', signature: '최엔진 (서명)' },
        { no: 5, name: '정물류', department: '경영지원/물류', readDate: '2026-01-17', signature: '정물류 (서명)' }
      ]
    },
    'A-04': {
      scope: '당사의 자율수출관리규정 및 그 하위 세칙(출하통제 지침, 정보보안 지침 등)의 제정, 개정, 폐지에 적용한다.',
      cycle: '연 1회 (매년 1월 정기검토)',
      trigger: '1. 전략물자 수출입고시 또는 관련 법령의 개정\n2. 회사 조직 개편에 따른 업무분장 변경\n3. 내부감사 결과 개선 필요사항 도출 시'
    },
    'A-05': {
      tableTitle: '규정 개정이력 관리대장',
      rows: [
        { no: 1, type: '제정', revision: 'v1.0', effectiveDate: '2025-01-10', reason: 'CP 도입을 위한 최초 자율수출관리규정 제정', approver: '대표이사', handler: '박전략' },
        { no: 2, type: '개정', revision: 'v2.0', effectiveDate: '2026-01-15', reason: '2026년 전략물자 수출입고시 개정사항 반영 및 AA등급 지정신청 기준 테일러링', approver: '대표이사', handler: '박전략' }
      ]
    },
    'A-06': {
      appointeeName: '박전략',
      appointeePosition: '상무이사',
      appointeeDept: '전략기획실 / 자율수출관리기구',
      appointDate: '2026-01-15',
      appointerName: '대표이사',
      companyName: '(주)팝콘사'
    },
    'A-07': {
      managerName: '박전략 상무',
      staffName: '이무역 대리',
      judgeName: '최엔진 수석연구원',
      clearanceName: '정물류 과장',
      auditName: '강감사 감사실장',
      effectiveDate: '2026-01-15'
    },
    'A-08': {
      matrix: {
        '0_0': '총괄', '0_1': '승인', '0_2': '협조', '0_3': '보고',
        '1_0': '기안', '1_1': '검토', '1_2': '실행', '1_3': '보관',
        '2_0': '판정', '2_1': '검토', '2_2': '기술확인', '2_3': 'DB등록',
        '3_0': '검증', '3_1': '출하승인', '3_2': '포장/선적', '3_3': '필증확인'
      }
    },
    'A-09': {
      courses: [
        { no: 1, name: '박전략', dept: '자율수출관리기구', role: '자율준수관리자(기구장)', courseName: '자율준수무역거래자', courseDate: '2025-04-10', courseNumber: 'KOSTI-CP-2025-0104', institution: '한국무역안보관리원' },
        { no: 2, name: '이무역', dept: '해외영업팀', role: 'CP 실무간사 / 거래심사', courseName: '전략물자 Basic', courseDate: '2025-05-15', courseNumber: 'KOSTI-BS-2025-0312', institution: '한국무역안보관리원' },
        { no: 3, name: '이무역', dept: '해외영업팀', role: 'CP 실무간사 / 거래심사', courseName: '전략물자 Pre-Master', courseDate: '2025-09-18', courseNumber: 'KOSTI-PM-2025-0645', institution: '한국무역안보관리원' },
        { no: 4, name: '최엔진', dept: 'AUTOSAR 연구소', role: '전략물자 판정담당자', courseName: '판정 Basic', courseDate: '2025-06-25', courseNumber: 'KOSTI-JD-2025-0499', institution: '한국무역안보관리원' },
        { no: 5, name: '최엔진', dept: 'AUTOSAR 연구소', role: '전략물자 판정담당자', courseName: '전략물자 Pre-Master', courseDate: '2025-10-12', courseNumber: 'KOSTI-PM-2025-0720', institution: '한국무역안보관리원' },
        { no: 6, name: '정물류', dept: '물류/출하팀', role: '출하관리 담당자', courseName: '전략물자 Basic', courseDate: '2025-07-08', courseNumber: 'KOSTI-BS-2025-0518', institution: '한국무역안보관리원' },
        { no: 7, name: '강감사', dept: '감사실', role: '내부감사 담당자', courseName: '자율준수무역거래자', courseDate: '2025-08-22', courseNumber: 'KOSTI-CP-2025-0290', institution: '한국무역안보관리원' }
      ],
      workshops: [
        { no: 1, name: '박전략', dept: '전략기획실 / 상무', roleType: '대표이사 / 임원급(기구장)', workshopTitle: '2024년 상반기 무역안보의 날 부대 워크숍', attendDate: '2024-07-03', institution: '산업통상자원부 / KOSTI', evidence: '참석확인증 사본 (보관)' },
        { no: 2, name: '이무역', dept: '해외영업팀 / 대리', roleType: '실무 담당자', workshopTitle: '2024년 하반기 자율준수무역거래자 정례 워크숍', attendDate: '2024-11-15', institution: '산업통상자원부 / KOSTI', evidence: '수료증 및 참석사진' },
        { no: 3, name: '박전략', dept: '전략기획실 / 상무', roleType: '대표이사 / 임원급(기구장)', workshopTitle: '2025년 상반기 무역안보의 날 부대 워크숍', attendDate: '2025-07-09', institution: '산업통상자원부 / KOSTI', evidence: '참석확인증 사본 (보관)' }
      ]
    },
    'C-00': {
      planYear: '2026년도',
      drafter: '이무역 대리 (자율수출관리기구)',
      planDate: '2026-01-10',
      targetAudience: '해외영업, AUTOSAR 연구소, 물류/출하팀, 감사실 등 전 임직원 (총 48명)',
      trainingCycle: '연 2회 정기 집체교육 (상반기 2월, 하반기 10월) 및 신규입사자 수시 교육',
      trainingGoals: '1. 임직원 전략물자 수출통제 인식 강화 및 법규 위반 리스크 원천 차단\n2. 품목 판정, 거래심사, 출하통제 등 사내 자율수출관리 프로세스 준수율 100% 달성\n3. 외국인 연구원 협업 시 무형기술이전(ITT) 보안 관리 절차 정착',
      trainingMethods: '• 사내 대회의실 집체교육 및 Zoom 실시간 화상회의 병행\n• 한국무역안보관리원(KOSTI) 전문 강사 초빙 및 사내 자율준수관리자 직강\n• 교육 이수 후 온라인 객관식 평가(80점 이상 수료) 및 불참자 녹화강의 이수 의무화',
      curriculum: '1. 대외무역법 및 전략물자 수출통제 제도 개요 (최신 통제기준 안내)\n2. 당사 소프트웨어(AUTOSAR) 품목 판정 기준 및 수출허가 프로세스\n3. 거래상대방 우려거래자(DPL) 스크리닝 및 최종용도 의심징후(Red Flags)\n4. 출하 전 필수 확인 서류 및 교차검증 절차\n5. 소스코드 및 연구개발 기술자료 무형기술이전(ITT) 보안 수칙',
      resultManagement: '• 교육 종료 후 7일 이내 출석부(C-02) 및 결과보고서(C-03) 작성\n• 자율수출관리기구장 검토 후 대표이사 최종 결재 및 사내 5년간 보관'
    },
    'C-01': {
      title: '2026년 상반기 전사 전략물자 CP 사내교육 시행 공지',
      date: '2026-02-10',
      speaker: '박전략 자율준수관리자',
      location: '본사 5층 대회의실 및 화상회의(Zoom)',
      content: '무형기술이전(ITT) 통제, 해외 바이어 우려거래자 스크리닝 절차 및 위반 시 행정처분 안내'
    },
    'C-02': {
      tableTitle: '사내교육 출석부',
      rows: [
        { no: 1, name: '대표이사', dept: '대표이사', attend: '참석' },
        { no: 2, name: '최엔진', dept: 'AUTOSAR 연구소', attend: '참석' },
        { no: 3, name: '이무역', dept: '해외영업팀', attend: '참석' },
        { no: 4, name: '정물류', dept: '물류팀', attend: '참석' },
        { no: 5, name: 'John Doe', dept: 'SW 개발팀 (외국인)', attend: '참석' }
      ]
    },
    'C-03': {
      title: '2026년도 상반기 전사 CP 교육 결과보고서',
      date: '2026-02-12',
      trainer: '박전략 상무',
      participants: '전 임직원 45명 중 43명 이수 (이수율 95.5%)',
      summary: '전략물자 관리 기본 개념 및 당사 AUTOSAR 기술의 ITT 통제 준수의식 고취. 미이수자 2명은 온라인 녹화강의 수강 후 평가 완료함.'
    },
    'C-07': {
      auditYear: '2026년도 정기 자율준수 내부감사',
      auditor: '강감사 실장 (감사실) / 독립 감사팀',
      planDate: '2026-09-20',
      auditPeriod: '2026년 10월 15일 ~ 2026년 10월 20일 (5일간)',
      auditScope: '• 대상 부서: 해외영업팀, AUTOSAR 연구개발소, 물류/출하관리팀, 자율수출관리기구\n• 업무 범위: 2025~2026년도 수출 거래 판정, 허가 신청, 스크리닝, 출하 승인 및 IT 기술보안 통제 전반',
      auditItems: '1. 품목 판정 절차 준수 (자가판정서 및 기술사양 분석 근거 보관 실태)\n2. 바이어 및 최종사용자 우려거래자(DPL) 스크리닝 누락 여부\n3. 출하 전 필수 서류 교차검증 점검표(H-01) 작성 및 출하승인자 결재 실태\n4. 기술자료 IT 접근권한(D-04) 및 외국인 연구원 신원확인(D-06) 관리 실태\n5. 전략물자 관련 법정 문서 5년 의무 보관 실태',
      auditMethod: '• ERP 무역 거래 데이터 및 선적 서류 전수/샘플링 대조 실사\n• 판정/스크리닝/출하 담당자 심층 인터뷰\n• IT 보안 시스템 로그 및 접근 통제 기록 현장 확인',
      reportingPlan: '• 감사 종료 후 7일 이내 대표이사 대면 보고 (C-06)\n• 지적사항 발견 시 해당 부서에 시정조치 요구서(C-04) 발행 및 30일 이내 개선 결과(C-05) 확인'
    },
    'D-01': {
      tableTitle: '문서관리 세칙 및 보존연한표',
      rows: [
        { no: 1, docType: 'CP 지정신청서 및 인증서류', period: '5년 이상', location: 'CP 전용 아카이브' },
        { no: 2, docType: '전략물자 판정서 및 기술사양서', period: '5년 이상', location: 'CP Manager 클라우드' },
        { no: 3, docType: '우려거래자(YesTrade) 스크리닝 증빙', period: '5년 이상', location: 'ERP/CP 시스템' },
        { no: 4, docType: '출하/선적 교차검증 점검표', period: '5년 이상', location: '물류팀 캐비닛/서버' }
      ]
    },
    'D-04': {
      tableTitle: '전략기술 접근권한 관리대장',
      rows: [
        { no: 1, system: 'GitLab 소스코드 저장소', user: '최엔진 수석', role: '연구소장', authLevel: 'Master (Full Access)', authDate: '2025-01-01' },
        { no: 2, system: 'GitLab 소스코드 저장소', user: 'John Doe', role: '외국인 연구원', authLevel: 'Developer (Restricted/비암호화 모듈만)', authDate: '2025-03-01' }
      ]
    },
    'D-05': {
      scope: '당사에 입사하거나 공동 프로젝트를 수행하는 모든 외국 국적 연구인력 및 협력업체 직원',
      procedure: '1. 입사 시 여권 사본 및 외국인등록증 징구\n2. YesTrade 및 미국 DPL 우려거래자 명단 교차조회\n3. 국가핵심기술 및 전략기술 비인가 접촉 차단 서약서 징구\n4. 소스코드 저장소 접근 권한 차등 부여'
    },
    'D-06': {
      tableTitle: '외국인 연구인력 관리대장',
      rows: [
        { no: 1, name: 'John Doe', nationality: '미국', passport: 'USA-998811***', dept: 'R&D 센터', screening: '적격 (우려거래자 비해당)', nda: '징구완료 (2025-03-01)' }
      ]
    },
    'F-01': {
      companyName: '(주)팝콘사',
      itemName: 'POP-SAR Classic Platform AUTOSAR R20-11',
      modelNumber: 'POPCORN-AUTOSAR-v4.4',
      specUsage: '차량용 전장제어기(ECU) 표준 미들웨어 및 BSW 스택',
      regime_wa: 'yes',
      strategic: '비해당',
      catchAll: '비해당',
      controlNo: '5D002.c.1 비해당 (일반 상용 대중소매 예외)',
      classificationComments: '당사의 AUTOSAR BSW는 표준 차량 제어용 OS/통신 스택으로서 독자적인 군용 암호 알고리즘을 구현하지 않으며, 표준 공개 스펙을 따르므로 통제번호 5D002 비해당으로 자가판정함.'
    },
    'F-03': {
      q1_yn: '아니오', q1_desc: '암호분석 기능 없음',
      q2_yn: '아니오', q2_desc: '미가공 데이터 추출 기능 없음',
      q3_yn: '해당없음', q3_desc: '인증 회피 목적 없음',
      q4_yn: '아니오', q4_desc: '차량용 표준 전장 제어 미들웨어임',
      q5_yn: '아니오', q5_desc: '루팅/탈옥 기능 포함하지 않음',
      q6_yn: '예', q6_desc: '표준 TLS/AES-128 통신 라이브러리 인터페이스 지원',
      q7_yn: '예', q7_desc: '차량 진단 및 펌웨어 무결성 인증 목적으로만 사용',
      q8_eccn: '5D992.c',
      q9_yn: '예', q9_desc: '완성차 및 1차 벤더에 상용 공급되는 일반 소프트웨어',
      q10_yn: '예', q10_desc: '공식 웹사이트에 카탈로그 및 기능 명세서 공개',
      q11_yn: '아니오', q11_desc: '사용자가 임의로 암호화 알고리즘을 변경할 수 없음',
      q12_yn: '예', q12_desc: '사용자 매뉴얼에 따라 고객사 엔지니어가 직접 빌드 및 탑재 가능'
    },
    'G-01': {
      buyerName: 'Global AutoTech Inc. (미국 디트로이트)',
      destCountry: '미국 (가 지역)',
      productName: 'POP-SAR AUTOSAR License & Tool Suite',
      endUse: '북미 전기차 전장 ECU 소프트웨어 개발',
      screeningDate: '2026-02-01',
      screeningResult: '적격 (YesTrade 및 BIS 우려거래자 명단 대조 결과 미등재 확인)',
      examiner: '이무역 대리',
      approver: '박전략 상무'
    },
    'G-05': {
      reportYear: '2026년',
      lastYearSummary: '2025년 전략물자 자가판정 12건, 해외 수출 심사 8건 완료 (위반사항 0건)',
      thisYearPlan: '2026년 상반기 CP AA등급 지정신청 완료, 전사 사내교육 2회, 정기 내부감사(9월) 추진',
      approver: '대표이사'
    },
    'H-01': {
      items: [
        '자율수출관리기구의 최종 수출 승인이 완료되었는가: 확인(V)',
        '전략물자 판정서 원본(또는 자가판정서)이 구비되어 있는가: 확인(V)',
        '수출허가서에 기재된 품목명과 모델명이 실제 선적 물품과 일치하는가: 확인(V)',
        '최종 수하인 및 목적지 국가가 심사 승인된 내역과 일치하는가: 확인(V)'
      ],
      inspector: '정물류 과장',
      clearanceDate: '2026-02-25'
    },
    'E-01': {
      sender: '(주)팝콘사',
      receiver: '(주)한국전장 (국내 바이어)',
      item: 'POP-SAR AUTOSAR v4.4',
      noticeContent: '본 소프트웨어 및 기술은 대외무역법상 전략물자 관련 판정 대상이므로, 국외로 재수출하거나 외국인에게 이전할 경우 사전 허가를 받아야 함을 통보합니다.'
    },
    'E-02': {
      clause1: '제15조 (전략물자 통보 및 준수) ① "을"(팝콘사)은 "갑"에게 공급하는 소프트웨어가 대외무역법에 따른 전략물자 또는 상황허가 대상에 해당하는 경우 관련 통제번호를 서면 통보한다.',
      clause2: '② "갑"은 본 제품을 국외로 수출하거나 외국인에게 이전 시 관계 행정기관의 수출허가를 득해야 한다.',
      clause3: '③ "갑"이 이를 위반하여 발생한 일체의 법적 분쟁에 대해 "을"은 면책된다.'
    },
    'E-03': {
      companyName: '(주)팝콘사',
      regNumber: '123-86-00000',
      ceoName: '대표이사',
      businessOverview: '차량용 전장 소프트웨어(AUTOSAR) 솔루션 개발 및 글로벌 완성차/부품사 공급',
      strategicItems: 'AUTOSAR Classic/Adaptive 플랫폼 (통제번호 5D002/5D992 검토 품목)',
      exportPlan: '미국, 독일, 일본 완성차 OEM 대상 연간 300만 달러 규모 수출 추진'
    },
    'E-04': {
      q1_1: '유형2 (일반 기업)',
      q1_2: 'AA 등급',
      q2: '서울특별시 영등포구 선유로 123 팝콘타워 5층 (우: 07214) 자율수출관리기구 이무역 대리',
      q3: '해당 없음 (대한민국 법인)',
      q4: '2018년 설립된 자동차 임베디드 SW 전문 기업으로 독자적인 AUTOSAR 툴체인을 보유함.',
      q5: '차량용 통신 및 제어 소프트웨어로서 국제 표준 준수 및 보안 인증 체계 구비.',
      q6: '글로벌 Tier-1 고객사 납품 시 포괄수출허가 혜택을 활용하여 통관 리드타임을 단축하고 기술 경쟁력을 제고하기 위함.',
      q7: '최근 6년간 대외무역법 및 수출통제 관련 행정처분 또는 사법처분 내역 일체 없음.',
      q8: '신청일로부터 30일 이내 상시 현장심사 수검 가능 (희망일: 2026년 4월 둘째 주)'
    },
    'E-05': {
      companyName: '(주)팝콘사',
      ceoName: '대표이사',
      hopeGrade: 'AA',
      headName: '박전략 (상무이사)',
      staffName: '이무역 (대리)',
      judgeName: '최엔진 (수석연구원)'
    },
    'L-02': {
      companyName: '(주)팝콘사',
      permitType: '사용자포괄수출허가',
      hsCode: '8523.49',
      controlNo: '5D002',
      endUsers: 'Global AutoTech Inc. (미국), EuroCar Tech GmbH (독일)',
      duration: '3년'
    },
    'K-04': {
      reportYear: '2026년',
      reportHalf: '상반기',
      compExportCount: '6건',
      compExportAmount: '1,250,000 USD',
      selfClassCount: '8건',
      proClassCount: '2건'
    }
  }
};
