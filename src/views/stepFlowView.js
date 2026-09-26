// ============================================
// Step Flow View Component (Mermaid) - Step 1 ~ 5
// ============================================
import { getAllFormIds, getStepByFormId } from '../data/processFlow.js';
import { formDefinitions } from '../forms/definitions.js';

export function renderStepFlowView(container, onNavigateToForm) {
  let html = `
    <div class="page-header">
      <div class="breadcrumb">홈 <span>›</span> CP & 수출통제 프로세스 매핑</div>
      <h2>자율준수무역(CP) & 수출통제 프로세스 Flow Chart</h2>
      <p>CP 지정 요건 충족 및 수출통제 실무에서 반드시 지켜야 할 주요 프로세스 다이어그램입니다. <strong style="color:var(--primary-color);">각 단계 노드를 클릭</strong>하면 해당 과정에서 필요한 필수 서류 및 양식 목록을 확인할 수 있습니다.</p>
    </div>
    
    <div class="flowchart-container" style="display: flex; flex-direction: column; gap: 32px;">
      
      <!-- ============================== -->
      <!-- Track 1: CP 인프라 세팅 및 심사 -->
      <!-- ============================== -->
      <div style="border: 2px solid var(--accent-purple); border-radius: 12px; overflow: hidden; background: rgba(139, 92, 246, 0.02);">
        <div style="background: var(--accent-purple); padding: 12px 24px; color: white;">
          <h3 style="margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-rounded">account_balance</span> Track 1: CP 인프라 세팅 및 심사
          </h3>
          <p style="margin: 4px 0 0 0; font-size: 0.85rem; opacity: 0.9;">CP 지정 및 유지를 위해 전사적으로 갖춰야 할 인프라 요건</p>
        </div>
        
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
          <!-- CP Step 1 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-purple);">Step 1. CP 인프라 세팅 (규정/조직/보안)</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">사내규정, 조직 구성, 경영진 의지 선언 및 정보보안 세팅 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                CP1_A["규정 제정 및 조직 세팅"] --> CP1_B["경영진 준수의지 선언"]
                CP1_B --> CP1_C["보안 시스템/물리적 보안 검토"]
                
                click CP1_A call showStepDocs()
                click CP1_B call showStepDocs()
                click CP1_C call showStepDocs()
            </div>
          </div>

          <!-- CP Step 2 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-purple);">Step 2. 사후관리 및 자율점검 (교육/감사)</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">교육, 내부 감사, 법규 위반 자진신고 등 CP 유지관리를 진행하는 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                CP2_A["교육 이수 및 사내 교육"] --> CP2_B["내부 감사 운영 (2년 주기)"]
                CP2_B --> CP2_C["위반 시 자진신고"]
                
                click CP2_A call showStepDocs()
                click CP2_B call showStepDocs()
                click CP2_C call showStepDocs()
            </div>
          </div>

          <!-- CP Step 3 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-purple);">Step 3. CP 지정 및 갱신 신청</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">최초 지정 및 3년 주기 갱신(재지정)을 위한 최종 신청 서류 취합 및 제출 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                CP3_A["지정신청서 및 회사소개서 작성"] --> CP3_B["최종 제출용 서류 취합"]
                
                click CP3_A call showStepDocs()
                click CP3_B call showStepDocs()
            </div>
          </div>
        </div>
      </div>

      <!-- ============================== -->
      <!-- Track 2: 무역 거래 통제 실무 -->
      <!-- ============================== -->
      <div style="border: 2px solid var(--accent-blue); border-radius: 12px; overflow: hidden; background: rgba(59, 130, 246, 0.02);">
        <div style="background: var(--accent-blue); padding: 12px 24px; color: white;">
          <h3 style="margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-rounded">flight_takeoff</span> Track 2: 무역 거래 통제 실무
          </h3>
          <p style="margin: 4px 0 0 0; font-size: 0.85rem; opacity: 0.9;">개별 수출 거래 발생 시 진행하는 통제 절차 및 사후 실적보고</p>
        </div>
        
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
          <!-- Trade Step 1 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-blue);">Step 1. 거래 전 진단 및 판정</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">신규 거래를 시작하기 전 품목 판정 및 상대방 스크리닝 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                T1_A["사전 진단 (거래 유형)"] --> T1_B["우려거래자(DPL) 스크리닝"]
                T1_B --> T1_C{"명단 포함?"}
                T1_C -->|Yes| T1_D["거래 즉시 중단"]
                T1_C -->|No| T1_E["전략물자 사전 판정"]
                
                click T1_A call showStepDocs()
                click T1_B call showStepDocs()
                click T1_E call showStepDocs()
            </div>
          </div>

          <!-- Trade Step 2 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-blue);">Step 2. 수출 거래 심사 및 허가</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">거래 심사 및 수출허가(개별/포괄) 신청을 진행하는 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                T2_A["전략물자 종합 거래심사"] --> T2_B{"정부 허가 필요?"}
                T2_B -->|"Yes"| T2_C["수출허가 신청 (개별/포괄)"]
                T2_C --> T2_D["허가증 발급 완료"]
                T2_B -->|"No"| T2_E["거래 최종 승인 및 출하 대기"]
                T2_D --> T2_E
                
                click T2_A call showStepDocs()
                click T2_C call showStepDocs()
                click T2_D call showStepDocs()
                click T2_E call showStepDocs()
            </div>
          </div>

          <!-- Trade Step 3 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-blue);">Step 3. 물류 출하 통제 및 특수 거래</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">최종 출하 전 교차검증과 수입/환적 등 특수 거래 서류를 관리합니다.</p>
            <div class="mermaid">
              flowchart LR
                T3_A["출하 통제 및 교차검증"] --> T3_B["국내 거래 통보서 발급"]
                T3_B --> T3_C["수입 및 특수거래 (옵션)"]
                
                click T3_A call showStepDocs()
                click T3_B call showStepDocs()
                click T3_C call showStepDocs()
            </div>
          </div>

          <!-- Trade Step 4 -->
          <div class="card flowchart-card" style="padding: 24px;">
            <h3 style="color: var(--accent-blue);">Step 4. 거래 사후관리 및 실적보고</h3>
            <p style="color:var(--text-light); margin-bottom: 16px; font-size: 0.9rem;">수출 후 장부 기록 및 정부 대상 사후 실적보고를 진행하는 단계입니다.</p>
            <div class="mermaid">
              flowchart LR
                T4_A["사후관리 대장 작성"] --> T4_B["연간/반기 실적보고서(정부) 제출"]
                
                click T4_A call showStepDocs()
                click T4_B call showStepDocs()
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 문서 모달 UI -->
    <div id="step-document-modal" class="flowchart-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center;">
      <div class="modal-content" style="background:#1f2937; color:#fff; width:450px; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.3); display:flex; flex-direction:column; max-height:80vh;">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #374151;">
          <h3 id="step-modal-title" style="margin:0; font-size:1.1rem; color:#fff;">관련 서류</h3>
          <button id="step-modal-close" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:#9ca3af;">&times;</button>
        </div>
        <div class="modal-body" style="padding:20px; overflow-y:auto;">
          <p id="step-modal-desc" style="font-size:0.9rem; color:#d1d5db; margin-bottom:16px;"></p>
          <div id="step-modal-document-list" style="display:flex; flex-direction:column; gap:10px;"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // 노드별 매핑 데이터
  const nodeData = {
    // --- Track 1. CP System ---
    // CP Step 1
    'CP1_A': { title: '조직 및 규정', desc: '사내규정 및 기구장 임명', docs: [{id: 'A-01', title: '규정 제정 기안문'}, {id: 'A-06', title: '기구장 임명장'}] },
    'CP1_B': { title: '경영진 의지', desc: '이행선언문 작성', docs: [{id: 'B-01', title: '이행선언문'}, {id: 'B-02', title: '사내 공지문'}] },
    'CP1_C': { title: '보안 검토', desc: '정보 및 물리 보안 관련 서류 점검', docs: [{id: 'D-01', title: '보안서약서'}] },
    
    // CP Step 2
    'CP2_A': { title: '사내 교육', desc: '연간 교육 실시', docs: [{id: 'A-09', title: '교육 이수 점검대장'}, {id: 'C-00', title: '교육 계획서'}, {id: 'C-03', title: '결과보고서'}] },
    'CP2_B': { title: '내부 감사', desc: '2년 주기의 자율 감사', docs: [{id: 'C-04', title: '감사 계획서'}, {id: 'C-07', title: '감사 보고서'}] },
    'CP2_C': { title: '법규 위반 자진신고', desc: '위반 발생 시 자진신고 및 경위서 작성', docs: [{id: 'J-01', title: '자진신고서'}, {id: 'J-02', title: '경위서'}] },
    
    // CP Step 3
    'CP3_A': { title: 'CP 지정 및 갱신 신청', desc: '지정 및 갱신(재지정) 신청서, 회사소개서', docs: [{id: 'E-05', title: '지정(재지정)신청서(별지 13)'}, {id: 'E-03', title: '회사소개서(별지 15)'}] },
    'CP3_B': { title: '심사 구비서류 취합', desc: '공통 질문사항 및 등급별 심사 서류', docs: [{id: 'E-04', title: '업체 공통 질문사항'}] },

    // --- Track 2. Trade Flow ---
    // Trade Step 1
    'T1_A': { title: '사전 진단', desc: '품목 및 우려거래자 검색, 거래 유형 진단', docs: [{id: 'Z-01', title: '사전 진단표'}] },
    'T1_B': { title: '우려거래자 스크리닝', desc: '상대방 제재 대상 확인', isExternal: true, externalUrl: 'https://www.yestrade.go.kr', externalMsg: '우려거래자(DPL) 데이터는 보안 사항이므로, 자체 시스템이 아닌 전략물자관리시스템(Yestrade)에서 직접 조회해야 합니다.', docs: [] },
    'T1_E': { title: '전략물자 판정', desc: '자가/전문판정 진행', docs: [{id: 'F-01', title: '자가판정서'}, {id: 'F-02', title: '전문판정서'}, {id: 'F-03', title: '판정대장'}, {id: 'F-04', title: '전문판정 질의서'}] },

    // Trade Step 2
    'T2_A': { title: '거래 심사', desc: '최종 수출심사', docs: [{id: 'G-01', title: '사전 심사 신청서'}, {id: 'G-02', title: '거래심사 결과서'}, {id: 'G-03', title: '자체 수출허가서'}, {id: 'G-04', title: '자체 상황허가서'}] },
    'T2_C': { title: '수출 허가 신청', desc: '정부에 개별/포괄허가 신청', docs: [{id: 'L-01', title: '개별허가신청'}, {id: 'L-02', title: '포괄허가신청'}, {id: 'L-03', title: '수하인 진술서'}, {id: 'L-04', title: '사용자 서약서'}] },
    'T2_D': { title: '허가증 관리', desc: '발급된 허가내역 관리', docs: [{id: 'L-01', title: '허가증'}] }, // Placeholder, not an actual form for 허가증 관리 maybe?
    'T2_E': { title: '거래 최종 승인 및 출하 대기', desc: '허가 후 대기', docs: [] },

    // Trade Step 3
    'T3_A': { title: '출하 통제', desc: '출하 지시 및 교차 검증', docs: [{id: 'H-01', title: '출하 전 수출통제 검토서'}] },
    'T3_B': { title: '국내 거래 통보서 발급', desc: '국내 인도 시 법정 통보 의무', docs: [{id: 'E-01', title: '국내거래 통보서'}, {id: 'E-02', title: '국내거래 확인서'}] },
    'T3_C': { title: '수입/특수거래 관련 증빙', desc: '수입/환적 관련 서류', docs: [{id: 'M-01', title: '수입목적확인서'}, {id: 'M-02', title: '수입내역신고서'}, {id: 'M-03', title: '환적허가신청서'}] },

    // Trade Step 4
    'T4_A': { title: '사후관리 대장', desc: '실적 기록 대장', docs: [{id: 'I-01', title: '사후관리 대장'}, {id: 'K-01', title: '포괄수출 대장'}] },
    'T4_B': { title: '실적 보고', desc: '정부 실적보고서', docs: [{id: 'K-04', title: '실적보고서(별지 19)'}, {id: 'K-03', title: '자율준수체제 실적보고서'}] },
  };

  // --- 💡 미연동 서류(Unmapped Forms) 추출 로직 ---
  const allFormIds = getAllFormIds();
  const mappedFormIds = new Set();
  Object.values(nodeData).forEach(data => {
    if (Array.isArray(data.docs)) {
      data.docs.forEach(doc => mappedFormIds.add(doc.id));
    }
  });
  
  const unmappedFormIds = allFormIds.filter(id => !mappedFormIds.has(id));
  
  let unmappedHtml = '';
  if (unmappedFormIds.length > 0) {
    unmappedHtml += `
      <div class="card flowchart-card" style="padding: 24px; margin-top: 24px; border: 1px dashed var(--accent-red); background: rgba(239, 68, 68, 0.03);">
        <h3 style="color:var(--accent-red); display:flex; align-items:center; gap:8px; margin-bottom: 8px;">
          <span class="material-symbols-rounded">warning</span> 단계별 매핑 미연동 서류 목록
        </h3>
        <p style="color:var(--text-light); margin-bottom: 20px; font-size: 0.95rem;">
          현재 다이어그램 노드에 매핑되지 않은 서류들을 <strong>Step별로 분류</strong>하여 서류의 목적과 법적 근거를 정리했습니다.<br/>
          <strong style="color:var(--accent-red);">서류 번호 버튼을 클릭</strong>하시면 해당 서류 작성/조회 화면으로 즉시 이동합니다.
        </p>
    `;

    // 그룹화
    const grouped = {};
    
    // 내부 지침 조항 매핑 헬퍼 함수
    const getInternalLegalBasis = (fId, category) => {
      const internalMap = {
        'A-02': '당사 자율수출관리규정 제11조(규정의 사내 공지)',
        'A-03': '당사 자율수출관리규정 제11조 제2항(임직원 열람 확인)',
        'A-04': '당사 자율수출관리규정 제12조(규정의 개정 절차)',
        'A-05': '당사 자율수출관리규정 제12조 제3항(개정이력 관리)',
        'A-07': '당사 자율수출관리규정 제7조(자율수출관리기구의 업무분장)',
        'A-08': '당사 자율수출관리규정 제8조(업무 위임 및 전결권)',
        'B-02': '당사 자율수출관리규정 제6조(최고경영자의 의지 표명)',
        'C-00': '당사 자율수출관리규정 제25조(연간 교육훈련 계획 수립)',
        'C-01': '당사 자율수출관리규정 제26조(교육의 실시 및 이수)',
        'C-02': '당사 자율수출관리규정 제26조 제2항(참석자 서명 및 출석 관리)',
        'C-04': '당사 자율수출관리규정 제30조(내부감사 계획 및 공지)',
        'C-05': '당사 자율수출관리규정 제31조(감사의 실시 및 점검)',
        'C-06': '당사 자율수출관리규정 제31조 제3항(감사 인터뷰 및 실사)',
        'D-01': '당사 자율수출관리규정 제20조(문서 및 정보 보안 관리)',
        'H-01': '당사 자율수출관리규정 제18조(출하 전 교차 검증)'
      };
      if (internalMap[fId]) return internalMap[fId];
      if (category === '조직과 규정') return '당사 자율수출관리규정 제2장(조직 구성 및 권한)';
      if (category === '교육' || category === '교육 및 훈련') return '당사 자율수출관리규정 제5장(임직원 교육)';
      if (category === '감사') return '당사 자율수출관리규정 제6장(내부 감사)';
      return '당사 자율수출관리규정 (관련 사내 지침)';
    };

    unmappedFormIds.forEach(fId => {
      const stepInfo = getStepByFormId(fId);
      const def = formDefinitions[fId];
      if (def && stepInfo) {
        const trackLabel = stepInfo.phase.track === 'CP' ? '[트랙 1: CP 인프라]' : '[트랙 2: 무역 프로세스]';
        const groupName = `${trackLabel} ${stepInfo.phase.number} - ${stepInfo.step.title}`;
        if (!grouped[groupName]) grouped[groupName] = [];
        grouped[groupName].push(def);
      }
    });

    // 렌더링
    Object.keys(grouped).sort().forEach(groupName => {
      unmappedHtml += `
        <div style="margin-bottom: 24px;">
          <h4 style="color:var(--text-primary); border-bottom: 2px solid var(--accent-red); padding-bottom: 8px; margin-bottom: 12px; font-size: 1.05rem;">
            ${groupName}
          </h4>
          <div style="overflow-x:auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; background: white; border: 1px solid #eaeaea;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="width: 12%; padding: 12px; border: 1px solid #ddd; text-align: center; color: #000;">서류 번호</th>
                  <th style="width: 23%; padding: 12px; border: 1px solid #ddd; text-align: left; color: #000;">서류명</th>
                  <th style="width: 35%; padding: 12px; border: 1px solid #ddd; text-align: left; color: #000;">서류 목적 및 작성 가이드</th>
                  <th style="width: 30%; padding: 12px; border: 1px solid #ddd; text-align: left; color: #000;">법적 근거 및 지표</th>
                </tr>
              </thead>
              <tbody>
      `;
      
      grouped[groupName].forEach(def => {
        const guideText = def.guide || '작성 가이드 없음';
        const legalText = def.legalBasis || getInternalLegalBasis(def.id, def.category);
        const indicatorText = def.indicator || '';
        const indicatorHtml = indicatorText ? `<br/><span style="color:#666; font-size:0.75rem;">(지표: ${indicatorText})</span>` : '';
        
        unmappedHtml += `
                <tr>
                  <td style="padding: 12px; border: 1px solid #ddd; text-align: center; vertical-align: top;">
                    <button class="btn btn-outline btn-unmapped-form" data-form="${def.id}" style="width:100%; border-color:#000; color:#000; padding:4px 8px; font-size:0.8rem; background:white; font-weight:bold;">
                      ${def.id} 작성
                    </button>
                  </td>
                  <td style="padding: 12px; border: 1px solid #ddd; font-weight:600; color:#000; vertical-align: top;">
                    ${def.title}
                  </td>
                  <td style="padding: 12px; border: 1px solid #ddd; color:#000; line-height: 1.5; vertical-align: top;">
                    ${guideText}
                  </td>
                  <td style="padding: 12px; border: 1px solid #ddd; color:var(--accent-blue); line-height: 1.5; vertical-align: top; font-weight:500;">
                    ${legalText}
                    ${indicatorHtml}
                  </td>
                </tr>
        `;
      });
      
      unmappedHtml += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    unmappedHtml += `
      </div>
    `;
  }
  // --------------------------------------------------

  // 플로우차트 컨테이너 닫히기 직전에 unmappedHtml 추가
  html = html.replace('</div>\n\n    <!-- 문서 모달 UI -->', unmappedHtml + '\n    </div>\n\n    <!-- 문서 모달 UI -->');

  container.innerHTML = html;

  const modal = container.querySelector('#step-document-modal');
  const modalClose = container.querySelector('#step-modal-close');
  const modalTitle = container.querySelector('#step-modal-title');
  const modalDesc = container.querySelector('#step-modal-desc');
  const docList = container.querySelector('#step-modal-document-list');

  modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  // 미연동 서류 버튼 클릭 이벤트 연결
  container.querySelectorAll('.btn-unmapped-form').forEach(btn => {
    btn.addEventListener('click', () => {
      const formId = btn.getAttribute('data-form');
      if (onNavigateToForm) {
        onNavigateToForm(formId);
      }
    });
  });

  window.showStepDocs = function(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    if (data.isExternal) {
      docList.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--accent-red); padding: 16px; border-radius: 8px; margin-bottom: 12px;">
          <p style="color: #fca5a5; font-size: 0.95rem; margin: 0 0 16px 0; line-height: 1.5; font-weight: 500;">
            <span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 6px; color: var(--accent-red);">security</span>
            ${data.externalMsg}
          </p>
          <a href="${data.externalUrl}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; width: 100%; justify-content: center; background: var(--accent-red); border: none; font-weight: bold;">
            <span class="material-symbols-rounded">open_in_new</span>
            Yestrade 우려거래자 조회 바로가기
          </a>
        </div>
      `;
      modal.style.display = 'flex';
      return;
    }

    let docsHtml = '';
    (data.docs || []).forEach(doc => {
      docsHtml += `
        <div class="doc-item" data-form="${doc.id}" style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid #374151; border-radius:8px; cursor:pointer; transition:all 0.2s; background:#111827;">
          <span class="material-symbols-rounded" style="color:var(--primary-color);">description</span>
          <div style="display:flex; flex-direction:column;">
            <strong style="font-size:0.95rem; color:#fff;">${doc.id}</strong>
            <span style="font-size:0.85rem; color:#9ca3af;">${doc.title}</span>
          </div>
          <span class="material-symbols-rounded" style="margin-left:auto; color:#4b5563; font-size:1.2rem;">chevron_right</span>
        </div>
      `;
    });
    
    docList.innerHTML = docsHtml;

    docList.querySelectorAll('.doc-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.borderColor = 'var(--primary-color)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.borderColor = '#374151';
      });

      item.addEventListener('click', () => {
        const formId = item.getAttribute('data-form');
        if (onNavigateToForm) {
          modal.style.display = 'none';
          onNavigateToForm(formId);
        }
      });
    });

    modal.style.display = 'flex';
  };

  if (window.mermaid) {
    window.mermaid.initialize({ 
      startOnLoad: false, 
      theme: 'dark',
      securityLevel: 'loose' 
    });
    setTimeout(() => {
      window.mermaid.run({ querySelector: '.mermaid' });
    }, 100);
  }
}
