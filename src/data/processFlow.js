// ============================================
// Process Flow & Step Definitions
// ============================================

export const phases = [
  // ==========================================
  // [Track 1] CP 체계 구축 및 유지관리 (CP System)
  // ==========================================
  {
    id: 'cp_phase1',
    track: 'CP',
    number: 'Step 1',
    title: 'CP 인프라 세팅 (규정/조직/보안)',
    subtitle: 'System Setup',
    icon: 'account_tree',
    desc: '사내규정 제정, 조직 구성, 경영진 의지 선언 및 보안 시스템을 완비합니다.',
    steps: [
      {
        id: 'step-regulation',
        title: '자율수출관리 사내규정 제정',
        desc: '고시 별표 7 기반 사내 규정 제정 및 실무자 서약',
        forms: ['A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-10'],
      },
      {
        id: 'step-organization',
        title: '조직도 및 업무분장 세팅',
        desc: '자율수출관리기구 구성 및 전담 임원 임명',
        forms: ['A-06', 'A-07', 'A-08'],
      },
      {
        id: 'step-compliance',
        title: '경영진 준수의지 확립',
        desc: '대표이사 이행선언문 작성 및 사내 공지문 배포',
        forms: ['B-01', 'B-02'],
      },
      {
        id: 'step-security',
        title: '문서 및 정보보안 규정 증빙',
        desc: '출입통제, 접근권한 관리, 인력 보안 서류',
        forms: ['D-01', 'D-02', 'D-03', 'D-04', 'D-05', 'D-06'],
      },
    ]
  },
  {
    id: 'cp_phase2',
    track: 'CP',
    number: 'Step 2',
    title: '사후관리 및 자율점검 (교육/감사)',
    subtitle: 'Post-Management',
    icon: 'fact_check',
    desc: '교육, 내부감사 운영 및 위반사항 자진신고 등 CP 유지관리를 수행합니다.',
    steps: [
      {
        id: 'step-training',
        title: '교육 이수 및 사내 교육 관리',
        desc: '전담인력 필수교육(A-09) 및 연간 사내 교육 계획, 출석부, 결과보고서 수합',
        forms: ['A-09', 'C-00', 'C-01', 'C-02', 'C-03'],
      },
      {
        id: 'step-audit',
        title: '내부 감사 운영',
        desc: '내부 감사 계획, 지적사항, 시정조치 및 대표이사 보고 (2년 주기)',
        forms: ['C-07', 'C-04', 'C-05', 'C-06'],
      },
      {
        id: 'step-violation-report',
        title: '법규 위반 자진신고',
        desc: '위반 발생 시 자진신고 및 경위서 작성',
        forms: ['J-01', 'J-02'],
      }
    ]
  },
  {
    id: 'cp_phase3',
    track: 'CP',
    number: 'Step 3',
    title: 'CP 지정 및 갱신 신청',
    subtitle: 'Submission & Renewal',
    icon: 'task_alt',
    desc: '자율준수무역거래자 최초 지정 및 3년 주기 갱신(재지정)을 위해 산업부에 제출하는 신청 서류입니다.',
    steps: [
      {
        id: 'step-submission',
        title: '신청서류 최종 취합',
        desc: '지정(재지정)신청서(별지 제13호), 회사소개서(별지 제15호) 및 최종 점검 체크리스트',
        forms: ['E-04', 'E-05', 'E-03'],
      }
    ]
  },

  // ==========================================
  // [Track 2] 무역 거래 프로세스 (Export Flow)
  // ==========================================
  {
    id: 'trade_phase1',
    track: 'TRADE',
    number: 'Step 1',
    title: '거래 전 진단 및 판정',
    subtitle: 'Pre-Check & Classification',
    icon: 'rule',
    desc: '무역 거래의 유형을 진단하고, 취급 품목의 전략물자 해당 여부를 판정합니다.',
    steps: [
      {
        id: 'step-search-diagnosis',
        title: '통합 검색 및 사전 진단',
        desc: '품목 및 우려거래자를 검색하고, 거래 유형(Z-01)을 진단합니다.',
        forms: ['Z-01'],
      },
      {
        id: 'step-classification',
        title: '전략물자 판정 및 질의',
        desc: '취급 품목의 전략물자 해당 여부 판정 (자가/전문판정 및 판정대장 관리)',
        forms: ['F-01', 'F-02', 'F-03', 'F-04'],
      }
    ]
  },
  {
    id: 'trade_phase2',
    track: 'TRADE',
    number: 'Step 2',
    title: '수출 거래 심사 및 허가',
    subtitle: 'Export Review & Permit',
    icon: 'policy',
    desc: '수출 전 거래심사를 완료하고 필요한 경우 수출허가를 신청합니다.',
    steps: [
      {
        id: 'step-export-review',
        title: '전략물자 종합 거래심사 (출하 전)',
        desc: '전략물자 판정 결과 및 우려거래자 여부를 종합하여 최종 출하 승인 여부 검토',
        forms: ['G-01', 'G-02', 'G-03', 'G-04', 'G-05', 'G-06'],
      },
      {
        id: 'step-export-permit-main',
        title: '수출허가 신청서 (메인 양식)',
        desc: '개별/포괄 수출허가 신청서 메인 양식',
        forms: ['L-01', 'L-02'],
      },
      {
        id: 'step-export-permit-common',
        title: '수출허가 공통 첨부서류',
        desc: '최종수하인 진술서·최종사용자 서약서 등 (수출자 서약서는 2026. 9. 1. 폐지)',
        // [수정] L-11(기타 첨부서류)을 신규 추가 — 수출계약서/영업증명서/기술사양서처럼
        // 법정 서식이 없는 첨부문서를 원본 파일 그대로 업로드해 관리하는 공용 첨부함.
        forms: ['L-03', 'L-04', 'L-11'],
      },
      {
        id: 'step-export-permit-catchall',
        title: '상황허가 전용 첨부서류',
        desc: '상황허가 심사 시 필요한 기술 및 기업 소개 자료',
        forms: ['L-05', 'L-06', 'L-07', 'L-08', 'L-09'],
      }
    ]
  },
  {
    id: 'trade_phase3',
    track: 'TRADE',
    number: 'Step 3',
    title: '물류 출하 통제 및 특수 거래',
    subtitle: 'Shipment & Import',
    icon: 'local_shipping',
    desc: '출하 전 교차검증과 국내거래, 수입 등 특수 거래 서류를 작성합니다.',
    steps: [
      {
        id: 'step-shipment-review',
        title: '출하 통제 결재 및 절차 중단',
        desc: '출하점검표 및 절차중단 내부 결재',
        forms: ['H-01'],
      },
      {
        id: 'step-trade-notification',
        title: '국내 거래 통보서',
        desc: '전략물자 국내 인도 시 법정 통보 의무',
        forms: ['E-01', 'E-02'],
      },
      {
        id: 'step-import-transit',
        title: '수입 및 특수 거래 (옵션)',
        desc: '수입목적확인, 통관증명 등 특수 거래 시 선택 제출',
        forms: ['M-01', 'M-02', 'M-03'],
      }
    ]
  },
  {
    id: 'trade_phase4',
    track: 'TRADE',
    number: 'Step 4',
    title: '거래 사후관리 및 실적보고',
    subtitle: 'Post-Export Record',
    icon: 'inventory',
    desc: '수출 거래 이후 사후관리 및 연간 실적보고(별지 19호)를 준비합니다.',
    steps: [
      {
        id: 'step-regular-report',
        title: '정기 실적보고 및 사후관리',
        desc: '연간/반기 실적 보고 및 사후관리 대장',
        forms: ['I-01', 'K-01', 'K-02', 'K-03', 'K-04', 'K-05'],
      }
    ]
  }
];

export function getAllFormIds() {
  const ids = [];
  phases.forEach(p => p.steps.forEach(s => s.forms.forEach(f => { if (!ids.includes(f)) ids.push(f); })));
  return ids;
}

export function getStepByFormId(formId) {
  for (const phase of phases) {
    for (const step of phase.steps) {
      if (step.forms.includes(formId)) return { phase, step };
    }
  }
  return null;
}

// [신규] 처음 쓰는 사람도 "지금 전체 흐름의 어디쯤 와 있는지", "이전/다음 서식이 뭔지"를
// 서식 화면 안에서 바로 알 수 있도록 하기 위한 위치 계산 헬퍼.
// processFlow의 phase→step→forms 순서를 하나의 평평한 목록으로 펼쳐 고정된 순번을 매긴다.
export function getFlatFormSequence() {
  const seq = [];
  phases.forEach(phase => {
    phase.steps.forEach(step => {
      step.forms.forEach(formId => {
        seq.push({ formId, phase, step });
      });
    });
  });
  return seq;
}

export function getFormPosition(formId) {
  const seq = getFlatFormSequence();
  const globalIndex = seq.findIndex(e => e.formId === formId);
  if (globalIndex === -1) return null;

  const entry = seq[globalIndex];
  const stepFormIds = entry.step.forms;
  const indexInStep = stepFormIds.indexOf(formId);

  const prevEntry = globalIndex > 0 ? seq[globalIndex - 1] : null;
  const nextEntry = globalIndex < seq.length - 1 ? seq[globalIndex + 1] : null;

  return {
    phase: entry.phase,
    step: entry.step,
    indexInStep: indexInStep + 1,
    totalInStep: stepFormIds.length,
    globalIndex: globalIndex + 1,
    globalTotal: seq.length,
    prevFormId: prevEntry ? prevEntry.formId : null,
    nextFormId: nextEntry ? nextEntry.formId : null,
  };
}
