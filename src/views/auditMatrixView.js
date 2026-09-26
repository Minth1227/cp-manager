// ============================================
// [별표 20] AA등급 심사기준 매트릭스 뷰 (유형2 일반기업)
// ============================================

import { getFormStatus, getFormData } from '../store.js';

export const auditMatrixData = [
  // 1. 조직
  {
    category: '1. 조직',
    subCategory: '1.1 조직의 구성',
    indicatorNo: '1.1.1',
    indicatorTitle: '자율수출관리기구가 영업부문과 독립되어 있는가?',
    aaCriteria: '자율수출관리기구가 영업부문과 완전히 분리·독립되어 설치·운영되어야 함. (상충 이해관계 배제)',
    forms: [
      { id: 'A-01', title: '자율수출관리규정 제정 기안문' },
      { id: 'A-06', title: '기구장 임명장' },
      { id: 'A-07', title: '기구 조직도 및 업무분장표' }
    ]
  },
  {
    category: '1. 조직',
    subCategory: '1.1 조직의 구성',
    indicatorNo: '1.1.2',
    indicatorTitle: '조직의 업무분장이 구체화되어 있는가?',
    aaCriteria: '판정, 심사, 출하, 감사 등 각 역할별 책임소재가 성명이 아닌 직책/부서 단위로 명문화되어 있고 위임전결 기준이 확립되어 있어야 함.',
    forms: [
      { id: 'A-07', title: '기구 조직도 및 업무분장표' },
      { id: 'A-08', title: '업무 위임전결표' }
    ]
  },
  {
    category: '1. 조직',
    subCategory: '1.1 조직의 구성',
    indicatorNo: '1.1.3',
    indicatorTitle: '자율수출관리기구의 장이 지정되어 있는가?',
    aaCriteria: '기구의 총괄 책임을 질 수 있는 대표이사 또는 공식 위임을 받은 임원급으로 지정되어야 함.',
    forms: [
      { id: 'A-06', title: '기구장 임명장' }
    ]
  },
  {
    category: '1. 조직',
    subCategory: '1.1 조직의 구성',
    indicatorNo: '1.1.4',
    indicatorTitle: '인적 요건 및 법정 필수교육을 이수하였는가?',
    aaCriteria: '기구 구성원이 전략물자 Basic, Pre-Master, CP과정, 판정Basic 등 법정 필수 교육을 이수하고, 3년 내 워크숍 참석 실적을 보유해야 함.',
    forms: [
      { id: 'A-09', title: '교육·워크숍 이수 점검대장' }
    ]
  },
  {
    category: '1. 조직',
    subCategory: '1.2 사내규정 운영',
    indicatorNo: '1.2.1',
    indicatorTitle: '자율수출관리규정이 전 임직원에게 공표·전파되었는가?',
    aaCriteria: '사내 규정 제·개정 시 사내 공지문 배포, 게시판 게재 및 임직원 열람 확인 기록을 관리해야 함.',
    forms: [
      { id: 'A-02', title: '규정 시행 사내 공지문' },
      { id: 'A-03', title: '규정 열람확인대장' }
    ]
  },
  {
    category: '1. 조직',
    subCategory: '1.2 사내규정 운영',
    indicatorNo: '1.2.2',
    indicatorTitle: '사내규정의 정기적 검토 및 개정 절차가 있는가?',
    aaCriteria: '연 1회 이상 정기 검토를 실시하고 법령 개정 시 수시 개정 절차 및 개정이력 대장을 영구 관리해야 함.',
    forms: [
      { id: 'A-04', title: '규정 개정 절차서' },
      { id: 'A-05', title: '규정 개정이력 관리대장' }
    ]
  },

  // 2. 최고경영자의 준수의지
  {
    category: '2. 최고경영자의 준수의지',
    subCategory: '2.1 총괄책임자',
    indicatorNo: '2.1.1',
    indicatorTitle: '자율수출관리기구의 장을 임원급으로 위임/지정하였는가?',
    aaCriteria: '대표이사가 권한을 위임한 경우 공식 임명장 및 위임전결표에 의거 임원급으로 지정되어야 함.',
    forms: [
      { id: 'A-06', title: '기구장 임명장' },
      { id: 'A-08', title: '업무 위임전결표' }
    ]
  },
  {
    category: '2. 최고경영자의 준수의지',
    subCategory: '2.2 준수의지 표명',
    indicatorNo: '2.2.1',
    indicatorTitle: '대표자의 전략물자 수출관리 이행선언이 있는가?',
    aaCriteria: '대표이사의 자필 서명(직인)이 포함된 이행선언문을 작성하고 최소 3년에 1회 이상 갱신하여 공표해야 함.',
    forms: [
      { id: 'B-01', title: '대표이사 이행선언문' }
    ]
  },
  {
    category: '2. 최고경영자의 준수의지',
    subCategory: '2.2 준수의지 표명',
    indicatorNo: '2.2.2',
    indicatorTitle: '제도이행 의지 및 중요성을 사내외에 전파하는가?',
    aaCriteria: '홈페이지, 사내 인트라넷, 신년사 또는 전사 공지문을 통해 지속적으로 수출통제 준수 메시지를 공표해야 함.',
    forms: [
      { id: 'B-02', title: 'CEO 준수의지 사내 공지문' }
    ]
  },
  {
    category: '2. 최고경영자의 준수의지',
    subCategory: '2.2 준수의지 표명',
    indicatorNo: '2.2.3',
    indicatorTitle: '대표자에게 정기적으로 보고하는 체계가 있는가?',
    aaCriteria: '기구장이 반기 1회 이상 자율준수 운영실태, 감사결과, 허가실적을 대표이사에게 직접 대면 서면보고해야 함.',
    forms: [
      { id: 'G-05', title: '정기보고 통합 기안문' },
      { id: 'C-06', title: '감사결과 대표이사 보고서' }
    ]
  },

  // 3. 전략물자 판정 및 수출거래심사
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.1 품목 판정',
    indicatorNo: '3.1.1',
    indicatorTitle: '사내 규정에 따른 전략물자 판정 절차를 이행하는가?',
    aaCriteria: '거래 개시 전 사전 진단(Z-01)을 거치고 통제리스트 기준 자가판정서 및 기술사양 분석서를 구비해야 함.',
    forms: [
      { id: 'Z-01', title: '무역 거래 사전 진단표' },
      { id: 'F-01', title: '전략물자 자가판정서' },
      { id: 'F-02', title: '전문판정 신청서' },
      { id: 'F-03', title: '기술사양 비교분석서' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.1 품목 판정',
    indicatorNo: '3.1.2',
    indicatorTitle: '전략물자의 판정 시점은 언제인가?',
    aaCriteria: '신제품 개발 완료 시 또는 수출 계약 체결 전(사전 판정)에 판정이 완료되어야 함.',
    forms: [
      { id: 'F-01', title: '전략물자 자가판정서' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.1 품목 판정',
    indicatorNo: '3.1.3',
    indicatorTitle: '판정 결과를 DB화하여 관리하는가?',
    aaCriteria: '모든 품목의 판정 이력 및 근거 서류를 판정관리대장에 전산 DB화하여 영구 관리해야 함.',
    forms: [
      { id: 'F-04', title: '전략물자 판정관리대장' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.1',
    indicatorTitle: '수출심사 중 문제 발견 시 잔여 절차가 중단되는가?',
    aaCriteria: '기구장이 매출에 우선하여 절차중단(Stop-Shipment) 명령을 발동할 수 있고 대표이사에게 즉시 보고하는 체계가 확립되어야 함.',
    forms: [
      { id: 'G-04', title: '절차중단 및 내부보고서' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.2',
    indicatorTitle: '수출허가 결과를 DB화하여 관리하는가?',
    aaCriteria: '개별/포괄 수출허가 취득 내역 및 허가 수량 잔량을 전산 대장으로 DB화하여 보관해야 함.',
    forms: [
      { id: 'L-01', title: '개별수출허가신청서' },
      { id: 'L-02', title: '포괄수출허가신청서' },
      { id: 'G-03', title: '수출허가 관리대장' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.3',
    indicatorTitle: '영업부서의 사전 통보 절차가 마련되어 있는가?',
    aaCriteria: '신규 바이어 발굴 시 계약 체결 전에 기구에 거래상대방 정보를 사전 통보하여 안전성 검토를 받아야 함.',
    forms: [
      { id: 'G-01', title: '전략물자 거래심사표' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.4.1',
    indicatorTitle: '거래상대방에 대해 우려거래자(DPL) 확인 절차 및 DB화가 되어 있는가?',
    aaCriteria: '매 거래 시마다(계약전/진행중/출하전 3단계) YesTrade 우려거래자 스크리닝을 실시하고 DB화해야 함.',
    forms: [
      { id: 'G-02', title: '우려거래자(DPL) 스크리닝 대장' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.4.2',
    indicatorTitle: '용도 등에 대해 확인(상황허가 의심징후 점검)하는 절차가 있는가?',
    aaCriteria: '비전략물자라 하더라도 WMD 전용 우려 및 Red Flags 체크리스트를 확인해야 함.',
    forms: [
      { id: 'G-01', title: '전략물자 거래심사표' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.2 거래심사',
    indicatorNo: '3.2.6',
    indicatorTitle: '수출허가 물품에 대한 사후관리를 하고 있는가?',
    aaCriteria: '포괄허가 수출 이후 최종사용자 및 용도를 확인하여 사후관리 대장에 DB화 관리해야 함.',
    forms: [
      { id: 'I-01', title: '포괄허가 사후관리대장' }
    ]
  },
  {
    category: '3. 전략물자 판정 및 거래심사',
    subCategory: '3.3 국내거래 통보',
    indicatorNo: '3.3.1',
    indicatorTitle: '전략물자 국내 거래 시 통보 절차가 마련되어 있는가?',
    aaCriteria: '사내 규정에 국내거래 통보 절차를 명문화하고, 공급계약서에 전략물자 준수 특약 조항을 삽입해야 함.',
    forms: [
      { id: 'E-01', title: '전략물자 국내거래 통보서' },
      { id: 'E-02', title: '계약서 전략물자 조항안' }
    ]
  },

  // 4. 출하 관리
  {
    category: '4. 출하 관리',
    subCategory: '4.1 출하 통제',
    indicatorNo: '4.1.1',
    indicatorTitle: '출하관리 담당자가 지정되어 있는가?',
    aaCriteria: '수출통제의 독립성을 위해 출하관리 담당자는 자율준수관리자 및 영업담당자와 별도로 분리 지정되어야 함.',
    forms: [
      { id: 'A-07', title: '기구 조직도 및 업무분장표' }
    ]
  },
  {
    category: '4. 출하 관리',
    subCategory: '4.1 출하 통제',
    indicatorNo: '4.1.2',
    indicatorTitle: '출하 시 서류-물품 일치 여부 등을 교차 확인·관리하는가?',
    aaCriteria: '선적 전 판정서, 수출허가서 원본, 인보이스, B/L과 실제 출하 물품의 일치 여부를 교차검증 점검표로 확인해야 함.',
    forms: [
      { id: 'H-01', title: '출하 전 교차검증 점검표' }
    ]
  },

  // 5. 교육
  {
    category: '5. 교육',
    subCategory: '5.1 교육 계획 및 실적',
    indicatorNo: '5.1.1',
    indicatorTitle: '내부 교육 계획과 실적이 있는가?',
    aaCriteria: '연간 사내교육 계획서를 수립하고 계획에 따른 교육 이행 실적(연 1회 이상 필수)을 보유해야 함. (신규 신청 시 계획서 필수)',
    forms: [
      { id: 'C-00', title: '연간 사내교육 계획서' },
      { id: 'C-01', title: '사내교육 안내문' }
    ]
  },
  {
    category: '5. 교육',
    subCategory: '5.1 교육 계획 및 실적',
    indicatorNo: '5.1.2',
    indicatorTitle: '내부 교육 시행방법 및 증빙이 완비되어 있는가?',
    aaCriteria: '무역안보관리원 교육 수료증 또는 자체 교육 출석부, 결과보고서 및 교육 교재를 편철 보관해야 함.',
    forms: [
      { id: 'C-02', title: '사내교육 출석부' },
      { id: 'C-03', title: '사내교육 결과보고서' }
    ]
  },

  // 6. 감사
  {
    category: '6. 감사',
    subCategory: '6.1 내부 감사',
    indicatorNo: '6.1.1',
    indicatorTitle: '자율수출관리규정에 따른 정기적 감사 실적/계획이 있는가?',
    aaCriteria: '최대 2년 주기로 정기 내부감사 계획서를 수립하고 계획에 따라 감사를 실시해야 함.',
    forms: [
      { id: 'C-07', title: '내부감사 계획서' },
      { id: 'C-04', title: '감사 시정조치 요구서' }
    ]
  },
  {
    category: '6. 감사',
    subCategory: '6.1 내부 감사',
    indicatorNo: '6.1.2',
    indicatorTitle: '감사 시행방법이 독립적으로 이루어지는가?',
    aaCriteria: '영업부서와 분리된 사내 독립 감사부서 또는 기구 외 독립 인력에 의해 감사가 수행되어야 함.',
    forms: [
      { id: 'C-05', title: '시정조치 결과보고서' }
    ]
  },
  {
    category: '6. 감사',
    subCategory: '6.1 내부 감사',
    indicatorNo: '6.1.3',
    indicatorTitle: '감사 결과가 대표이사에게 직접 보고되고 시정조치가 있는가?',
    aaCriteria: '감사 결과 보고서가 기구장을 거쳐 최고경영자(대표이사)에게 최종 직접 보고되고 시정조치 결과가 관리되어야 함.',
    forms: [
      { id: 'C-06', title: '감사결과 대표이사 보고서' },
      { id: 'C-05', title: '시정조치 결과보고서' }
    ]
  },

  // 7. 문서관리
  {
    category: '7. 문서관리',
    subCategory: '7.1 보존 및 관리',
    indicatorNo: '7.1.1',
    indicatorTitle: '문서관리 사항이 구체화되어 있으며 관련 서류를 5년 이상 보관하는가?',
    aaCriteria: '판정서, 거래심사표, 허가서 등 수출관리 관련 모든 서류를 5년 이상 법정 보관하고 보관위치가 명시된 전산 DB로 관리해야 함.',
    forms: [
      { id: 'D-01', title: '문서관리 세칙 및 보존연한표' },
      { id: 'D-02', title: '문서 보관 점검표' }
    ]
  },

  // 8. 위반사항 보고 및 시정조치
  {
    category: '8. 위반사항 보고 및 시정조치',
    subCategory: '8.1 보고 및 벌칙',
    indicatorNo: '8.1.1',
    indicatorTitle: '위반사항에 대한 내·외부 보고 절차가 구체적으로 명문화되어 있는가?',
    aaCriteria: '사내 규정에 위반 시 기구장 보고 ➡️ 산업통상부 자진신고 절차가 구체화되어 있고 인사규정 징계 기준과 연계되어 있어야 함.',
    forms: [
      { id: 'J-01', title: '자진신고서' },
      { id: 'J-02', title: '재발방지 계획서' },
      { id: 'K-03', title: '운영 보고서 (별지 제18호)' },
      { id: 'K-04', title: '실적 보고서 (별지 제19호)' }
    ]
  },

  // 9. 정보보안관리
  {
    category: '9. 정보보안관리',
    subCategory: '9.1 IT 및 인적 보안',
    indicatorNo: '9.1.1',
    indicatorTitle: '정보보안관리를 위한 IT 보안 관리 시스템이 있는가?',
    aaCriteria: '전략기술 및 소프트웨어 저장소에 대한 접근 권한 차등화, 외부 반출 통제 및 2차 인증 시스템을 보유해야 함.',
    forms: [
      { id: 'D-03', title: '정보보안관리 지침' },
      { id: 'D-04', title: '전략기술 접근권한 관리대장' }
    ]
  },
  {
    category: '9. 정보보안관리',
    subCategory: '9.1 IT 및 인적 보안',
    indicatorNo: '9.1.2',
    indicatorTitle: '외국인 연구원에 대한 신원확인 및 접근권한 관리 체계가 있는가?',
    aaCriteria: '외국인 연구원 채용 시 우려거래자 명단 조회 등 신원확인 절차를 거치고 내부 기술자료 접근을 차등 제한해야 함.',
    forms: [
      { id: 'D-05', title: '외국인 인력 신원확인 절차서' },
      { id: 'D-06', title: '외국인 연구인력 관리대장' }
    ]
  },

  // 10. 지정신청 구비서류
  {
    category: '10. 지정신청 구비서류',
    subCategory: '10.1 필수 신청 서류',
    indicatorNo: '구비서류',
    indicatorTitle: '자율준수무역거래자 지정신청서 및 등급별 첨부서류 완비',
    aaCriteria: '별지 제13호 지정신청서, 별지 제15호 회사소개서 및 별표 20 등급별 구비서류 편철 완료.',
    forms: [
      { id: 'E-04', title: '자율준수무역거래자 지정신청서' },
      { id: 'E-03', title: '회사소개서' },
      { id: 'E-05', title: '구비서류 편철 점검표' },
      { id: 'M-01', title: '수입목적확인서 (선택)' }
    ]
  }
];

export function renderAuditMatrixView(container, onSelectForm) {
  let searchKeyword = '';

  function renderTable() {
    const statusBadges = {
      todo: { label: '미착수', style: 'background:rgba(107,114,128,0.1); color:var(--text-tertiary);' },
      progress: { label: '작성중', style: 'background:rgba(234,179,8,0.15); color:var(--accent-amber); font-weight:600;' },
      review: { label: '검토중', style: 'background:rgba(59,130,246,0.15); color:var(--accent-blue); font-weight:600;' },
      done: { label: '완료', style: 'background:rgba(34,197,94,0.15); color:var(--accent-green); font-weight:600;' },
      na: { label: '면제(N/A)', style: 'background:rgba(156,163,175,0.15); color:#9ca3af;' }
    };

    const filteredData = auditMatrixData.filter(item => {
      if (!searchKeyword) return true;
      const kw = searchKeyword.toLowerCase();
      return (
        item.category.toLowerCase().includes(kw) ||
        item.indicatorNo.toLowerCase().includes(kw) ||
        item.indicatorTitle.toLowerCase().includes(kw) ||
        item.aaCriteria.toLowerCase().includes(kw) ||
        item.forms.some(f => f.id.toLowerCase().includes(kw) || f.title.toLowerCase().includes(kw))
      );
    });

    let rowsHtml = '';
    let lastCategory = '';

    filteredData.forEach((row, idx) => {
      const isNewCategory = row.category !== lastCategory;
      lastCategory = row.category;

      const formsHtml = row.forms.map(f => {
        const st = getFormStatus(f.id);
        const badge = statusBadges[st] || statusBadges.todo;
        return `
          <button type="button" class="matrix-form-tag btn-ghost" data-form-id="${f.id}" style="display:inline-flex; align-items:center; gap:6px; margin:3px 4px 3px 0; background:var(--bg-card); border:1px solid rgba(99,102,241,0.3); border-radius:6px; padding:4px 8px; cursor:pointer; text-align:left; transition:all 0.15s ease;">
            <strong style="color:var(--primary-color); font-size:0.82rem; font-family:monospace;">${f.id}</strong>
            <span style="font-size:0.8rem; color:var(--text-primary); font-weight:500;">${f.title}</span>
            <span style="font-size:0.7rem; padding:1px 5px; border-radius:3px; ${badge.style}">${badge.label}</span>
          </button>
        `;
      }).join('');

      rowsHtml += `
        <tr style="border-bottom:1px solid rgba(0,0,0,0.06); transition:background 0.15s;" onmouseover="this.style.background='rgba(99,102,241,0.02)'" onmouseout="this.style.background='transparent'">
          <td style="padding:12px 14px; font-weight:700; color:var(--text-primary); vertical-align:top; width:160px; font-size:0.88rem;">
            ${row.category}
            <div style="font-size:0.75rem; font-weight:normal; color:var(--text-tertiary); margin-top:2px;">${row.subCategory}</div>
          </td>
          <td style="padding:12px 14px; vertical-align:top; width:220px;">
            <div style="display:inline-block; font-weight:700; color:var(--accent-purple); font-size:0.85rem; background:rgba(99,102,241,0.08); padding:2px 6px; border-radius:4px; margin-bottom:4px;">
              ${row.indicatorNo}
            </div>
            <div style="font-size:0.84rem; font-weight:600; color:var(--text-primary); line-height:1.4;">
              ${row.indicatorTitle}
            </div>
          </td>
          <td style="padding:12px 14px; vertical-align:top; font-size:0.84rem; color:var(--text-secondary); line-height:1.6;">
            ${row.aaCriteria}
          </td>
          <td style="padding:12px 14px; vertical-align:top; width:300px;">
            ${formsHtml}
          </td>
        </tr>
      `;
    });

    const targetTbody = container.querySelector('#matrix-tbody');
    if (targetTbody) {
      targetTbody.innerHTML = rowsHtml;
      
      // Direct Event Delegation on Tbody
      targetTbody.onclick = (e) => {
        const btn = e.target.closest('.matrix-form-tag');
        if (btn && btn.dataset.formId) {
          e.preventDefault();
          if (onSelectForm) onSelectForm(btn.dataset.formId);
        }
      };
    }
  }

  const html = `
    <div class="fade-in">
      <div class="page-header" style="margin-bottom:1.5rem;">
        <div class="breadcrumb">대시보드 <span style="margin:0 4px;">›</span> 사내 규정 및 프로세스 <span style="margin:0 4px;">›</span> <span>[별표 20] AA등급 심사기준 매트릭스</span></div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="margin:0 0 4px 0;">[별표 20] AA등급 심사기준 대응 매트릭스</h2>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem;">
              유형2 (일반기업) · AA등급 9대 평가지표 및 세부평가지표별 <strong>법정 심사기준과 제출서류(50종 서식)</strong> 1:1 매핑 표입니다.
            </p>
          </div>

          <div style="display:flex; gap:8px; align-items:center;">
            <input type="text" id="matrix-search" placeholder="지표 번호, 심사기준, 서식명 검색..." class="form-input" style="width:260px; padding:6px 12px; font-size:0.85rem;" />
            <button class="btn btn-secondary" onclick="window.print()" style="display:inline-flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">print</span> 매트릭스 인쇄
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Summary Banner -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:1.5rem;">
        <div class="card" style="padding:12px 16px; background:var(--bg-card); border-left:4px solid var(--primary-color);">
          <div style="font-size:0.75rem; color:var(--text-tertiary); font-weight:600;">적용 법령 및 기준</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-top:2px;">고시 [별표 20] 유형 2</div>
        </div>
        <div class="card" style="padding:12px 16px; background:var(--bg-card); border-left:4px solid var(--accent-purple);">
          <div style="font-size:0.75rem; color:var(--text-tertiary); font-weight:600;">목표 취득 등급</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--accent-purple); margin-top:2px;">AA 등급 (포괄수출허가 특례)</div>
        </div>
        <div class="card" style="padding:12px 16px; background:var(--bg-card); border-left:4px solid var(--accent-green);">
          <div style="font-size:0.75rem; color:var(--text-tertiary); font-weight:600;">대응 세부평가지표</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--accent-green); margin-top:2px;">총 26개 세부 지표 완비</div>
        </div>
        <div class="card" style="padding:12px 16px; background:var(--bg-card); border-left:4px solid var(--accent-cyan);">
          <div style="font-size:0.75rem; color:var(--text-tertiary); font-weight:600;">연계 구비서류</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--accent-cyan); margin-top:2px;">총 50종 실무 서식 매핑</div>
        </div>
      </div>

      <!-- Main Matrix Table Card -->
      <div class="card" style="padding:0; overflow:hidden; border-radius:10px; border:1px solid rgba(0,0,0,0.08); box-shadow:var(--shadow-sm);">
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:var(--bg-card); border-bottom:2px solid var(--border-color);">
                <th style="padding:14px 16px; font-size:0.85rem; font-weight:700; color:var(--text-secondary); width:160px;">평가지표</th>
                <th style="padding:14px 16px; font-size:0.85rem; font-weight:700; color:var(--text-secondary); width:220px;">세부평가지표</th>
                <th style="padding:14px 16px; font-size:0.85rem; font-weight:700; color:var(--text-secondary);">AA 등급 심사기준</th>
                <th style="padding:14px 16px; font-size:0.85rem; font-weight:700; color:var(--text-secondary); width:300px;">제출서류 및 연계 양식 (클릭 시 이동)</th>
              </tr>
            </thead>
            <tbody id="matrix-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-top:1rem; font-size:0.8rem; color:var(--text-tertiary); text-align:right;">
        * 제출서류 태그를 클릭하시면 해당 서식의 실시간 작성 및 편집 화면으로 즉시 이동합니다.
      </div>
    </div>
  `;

  container.innerHTML = html;
  renderTable();

  const searchInput = container.querySelector('#matrix-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      renderTable();
    });
  }
}
