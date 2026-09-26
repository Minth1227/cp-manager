// ============================================
// Flowchart View Component (Mermaid)
// ============================================

export function renderFlowchartView(container, onNavigateToForm) {
  let html = `
    <div class="page-header">
      <div class="breadcrumb">홈 <span>›</span> 업무 플로우차트</div>
      <h2>수출업무 플로우차트</h2>
      <p>CP 수출통제 실무에서 반드시 지켜야 할 주요 프로세스 다이어그램입니다. <strong style="color:var(--primary-color);">각 단계를 클릭</strong>하면 관련된 사내 양식 및 필수 증빙 서류 목록을 확인할 수 있습니다.</p>
    </div>
    
    <div class="flowchart-container">
      <div class="card flowchart-card">
        <h3>1. 자율준수 무역거래 전체 프로세스</h3>
        <div class="mermaid">
          flowchart TD
            A["영업부서: 신규 거래선 발굴 및 계약 추진"] --> B{"계약 전 사전통보"}
            B -->|Yes| C["CP부서: 우려거래자/상황허가 사전 스크리닝"]
            C --> D{"전략물자 판정"}
            D -->|전략물자| E["수출 허가 신청"]
            D -->|비전략물자| F["상황허가 필요 여부 검토"]
            E --> G["허가 획득"]
            F -->|필요| E
            F -->|불필요| H["출하 지시"]
            G --> H
            H --> I["물류부서: 출하 전 교차검증 (서류/현물 확인)"]
            I --> J["최종 출하 및 사후관리 DB화"]

            click A call showDocs()
            click B call showDocs()
            click C call showDocs()
            click D call showDocs()
            click E call showDocs()
            click I call showDocs()
            click J call showDocs()
        </div>
      </div>

      <div class="card flowchart-card">
        <h3>2. 수출거래 심사 및 우려거래자 확인</h3>
        <div class="mermaid">
          flowchart TD
            NodeStart("영업: 거래 정보 수집") --> Step1("CP부서 통보")
            Step1 --> Step2("YesTrade 우려거래자 조회")
            Step2 --> Cond1{"명단 포함 여부?"}
            Cond1 -->|Yes| Stop1["거래 즉시 중단 및 기구장 보고"]
            Cond1 -->|No| Step3("최종 사용자 및 용도 확인")
            Step3 --> Cond2{"대량파괴무기 전용 의심?"}
            Cond2 -->|Yes| Stop1
            Cond2 -->|No| Step4("상황허가/전략물자 대상 여부 확인")
            Step4 --> NodeEnd("거래 승인 및 허가 절차 진행")
        </div>
      </div>

      <div class="card flowchart-card">
        <h3>3. 출하관리 (교차검증) 프로세스</h3>
        <div class="mermaid">
          flowchart LR
            CA["영업: 출하요청"] --> CB("CP부서: 허가서/판정서 송부")
            CB --> CC("물류부서: 교차 검증")
            CC --> CD{"일치 여부 확인"}
            CD -->|불일치| CE["출하 중지 및 CP부서 통보"]
            CD -->|일치| CF["출하 승인 및 선적"]

            click CC call showDocs()
        </div>
      </div>
    </div>

    <!-- 문서 모달 UI -->
    <div id="document-modal" class="flowchart-modal" style="display:none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-title">관련 서류</h3>
          <button id="modal-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p id="modal-desc"></p>
          <div id="modal-document-list" class="modal-document-list"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // 노드별 매핑 데이터
  const nodeData = {
    'A': {
      title: '신규 거래선 발굴', desc: '새로운 거래처를 발굴할 때 영업부서에서 확인하고 수집해야 할 계약서 조항 및 관련 서류입니다.',
      docs: [{ id: 'E-02', title: '계약서 조항 (수출통제 준수)' }]
    },
    'B': {
      title: '계약 전 사전통보', desc: '계약 체결 이전에 CP부서로 거래 내용을 사전 통보하는 단계입니다.',
      docs: [{ id: 'A-08', title: '위임전결표 (사전통보 권한 확인)' }]
    },
    'C': {
      title: '사전 스크리닝', desc: '수출 예정 거래에 대해 우려거래자 여부를 조회하고, 대량파괴무기 등 전용 가능성을 스크리닝합니다.',
      docs: [
        { id: 'G-01', title: '수출거래 사전 심사 신청서' },
        { id: 'K-01', title: '사전거래보고서' }
      ]
    },
    'D': {
      title: '전략물자 판정', desc: '수출 품목이 전략물자에 해당하는지 판정하는 단계입니다.',
      docs: [
        { id: 'F-01', title: '자가판정서' },
        { id: 'F-02', title: '전문판정서' },
        { id: 'F-04', title: '전략물자 판정대장' }
      ]
    },
    'E': {
      title: '수출 허가 신청', desc: '관할 허가기관에 수출 허가를 신청하는 과정입니다.',
      docs: [
        { id: 'L-01', title: '개별수출허가신청서 (별지1호)' },
        { id: 'L-02', title: '포괄수출허가신청서 (별지6호)' }
      ]
    },
    'I': {
      title: '출하 전 교차검증', desc: '출하 단계에서 물류부서와 CP부서가 허가 내용과 실제 출하 물품을 교차 검증합니다.',
      docs: [{ id: 'H-01', title: '출하 전 교차 검증 점검표' }]
    },
    'J': {
      title: '최종 출하 및 사후관리', desc: '최종 출하 완료 후 실적을 기록하고 관련 사후관리를 수행합니다.',
      docs: [
        { id: 'I-01', title: '사후관리 대장' },
        { id: 'K-02', title: '사후거래보고서' }
      ]
    },
    'CC': {
      title: '교차 검증 (물류)', desc: '물류부서에서 허가서 및 판정서를 대조하여 출하 가능 여부를 교차로 확인합니다.',
      docs: [{ id: 'H-01', title: '출하 전 교차 검증 점검표' }]
    }
  };

  // 모달 제어 로직
  const modal = container.querySelector('#document-modal');
  const modalClose = container.querySelector('#modal-close');
  const modalTitle = container.querySelector('#modal-title');
  const modalDesc = container.querySelector('#modal-desc');
  const docList = container.querySelector('#modal-document-list');

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.showDocs = function(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    let docsHtml = '';
    data.docs.forEach(doc => {
      docsHtml += `
        <div class="doc-item" data-form="${doc.id}">
          <span class="material-symbols-rounded">description</span>
          <div>
            <strong>${doc.id}</strong>
            <span>${doc.title}</span>
          </div>
        </div>
      `;
    });
    docList.innerHTML = docsHtml;

    // 문서 클릭 시 이동 이벤트
    docList.querySelectorAll('.doc-item').forEach(item => {
      item.addEventListener('click', () => {
        const formId = item.getAttribute('data-form');
        if (onNavigateToForm) {
          modal.style.display = 'none'; // 모달 닫기
          onNavigateToForm(formId);
        }
      });
    });

    modal.style.display = 'flex';
  };

  // Initialize mermaid if available
  if (window.mermaid) {
    window.mermaid.initialize({ 
      startOnLoad: false, 
      theme: 'dark',
      securityLevel: 'loose' 
    });
    setTimeout(() => {
      window.mermaid.run({ querySelector: '.mermaid' });
    }, 100);
  } else {
    console.warn("Mermaid.js is not loaded.");
  }
}
