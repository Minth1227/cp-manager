// ============================================
// Export Screening & Classification Flow View
// 수출 거래 발생 시 "우려거래자 필터링(1차/2차) → 위험징후 판단 → 전략물자 판정 →
// 품목민감도·CP등급·지역에 따른 허가유형 분기 → 정부제출/내부보관(면제) 서류"까지
// 한 화면에서 보기 위한 전용 플로우차트 + 상세 매트릭스.
//
// [출처] "CP 모든 로직 검토.pdf" (사내 작성 CP 시스템 설계 매트릭스)의 6대 조건
// (우려거래자·위험징후·품목민감도·수출목적지·CP등급·최종허가결과) 교차검증 로직을 그대로 반영.
// 단, 그 문서가 인용한 고시 조문번호(제39조/제50조/제25·26조 등)는 현행 고시
// (전략물자수출입고시 제2025-37호, 2025.12.31)와 대부분 어긋나 있어(구버전 조번호로 추정),
// 법적 근거는 현행 조문으로 다시 검증하여 표기했다.
// ============================================

export function renderExportScreeningFlowView(container, onNavigateToForm) {
  const pdfUrl = (filename) => `/법령/${encodeURIComponent(filename)}`;
  const LAW = '전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf';

  let html = `
    <div class="page-header">
      <div class="breadcrumb">홈 <span>›</span> 수출 판정·필터링 플로우</div>
      <h2>수출 거래 판정·필터링 프로세스 (한눈에 보기)</h2>
      <p>신규 수출 거래가 발생했을 때 <strong>우려거래자 필터링(1차·2차) → 위험징후 판단 → 전략물자 판정 → 품목민감도·CP등급·지역에 따른 허가유형 분기 → 필요서류</strong>가
      어떻게 정해지는지 한 화면에서 보는 전용 페이지입니다. <strong style="color:var(--primary-color);">다이아몬드(조건)/네모(결과) 노드를 클릭</strong>하면
      근거 법령과 사내 작성폼을 바로 확인할 수 있고, 아래 매트릭스에서는 케이스별로 <strong>정부에 제출해야 하는 서류</strong>와
      <strong>허가면제로 사내에만 5년 보관하면 되는 서류</strong>를 나누어 확인할 수 있습니다.</p>
    </div>

    <div class="flowchart-container">
      <div class="card flowchart-card" style="padding: 10px; overflow-x: auto; overflow-y: auto;">
        <div class="mermaid" style="min-width: 1500px;">
          flowchart TD
            START(["신규 수출 거래 발생<br/>(바이어/최종수하인/최종사용자 파악)"]) --> SCREEN1["① 우려거래자 필터링<br/>(1차, 영업단계 — Z-01 통합검색)"]

            SCREEN1 --> SCREEN1_Q{"우려거래자 명단에<br/>일치하는가?"}
            SCREEN1_Q -- "일치" --> SCREEN1_EXC{"인도적 목적 등<br/>무기전용 우려가 없음이<br/>객관적으로 입증되는가?"}
            SCREEN1_EXC -- "입증됨" --> SCREEN1_APPROVE["예외적 개별/상황허가<br/>(산업통상부장관 승인 필요)"]
            SCREEN1_EXC -- "미입증" --> STOP1["수출 원천 차단<br/>(접수 불가)"]
            SCREEN1_Q -- "불일치" --> RISK_Q{"② 위험징후 판단<br/>WMD 전용 인지/통보 여부,<br/>12개 위험징후 의심 여부"}

            RISK_Q -- "WMD 전용 인지 또는<br/>정부 통보 (지역 무관)" --> CATCHALL_FORCE["상황허가 강제"]
            RISK_Q -- "12개 위험징후 의심<br/>+ 나-1/나-2 지역" --> CATCHALL_FORCE
            RISK_Q -- "12개 위험징후 의심<br/>+ 가 지역" --> HOLD["일반통관<br/>(내부 정밀 Hold, 허가 면제)"]
            RISK_Q -- "Clear (위험 없음)" --> CLASSIFY["③ 전략물자 판정<br/>(F-01 자가판정 / F-02 전문판정)"]

            CLASSIFY --> CLASSIFY_Q{"판정 결과는?"}
            CLASSIFY_Q -- "비전략물자" --> FREE(["일반통관<br/>(완전 면제)"])
            CLASSIFY_Q -- "전략물자" --> SENS_Q{"④ 품목 민감도<br/>(초민감-VSL / 민감 / 일반)"}

            SENS_Q -- "초민감(VSL)<br/>— 전 지역·전 등급(AAA 포함)" --> INDIV_FORCE["개별수출허가 강제<br/>(CP등급 무관)"]
            SENS_Q -- "민감/일반<br/>+ 나-2 지역 (전 등급)" --> INDIV_FORCE
            SENS_Q -- "민감<br/>+ 나-1 지역 (전 등급)" --> INDIV_FORCE
            SENS_Q -- "일반/민감<br/>+ 가·나-1 지역" --> GRADE_Q{"⑤ 기업 CP 등급 및<br/>수출지역(별표6/별표19)"}

            GRADE_Q -- "비인증기업" --> INDIV["개별수출허가"]
            GRADE_Q -- "A등급 + 나-1 지역" --> INDIV
            GRADE_Q -- "A등급 + 가 지역" --> COMP_USER["사용자포괄허가"]
            GRADE_Q -- "AA/AAA등급 + 나-1 지역" --> COMP_USER
            GRADE_Q -- "AA등급 + 가 지역" --> COMP_BOTH["품목/사용자포괄허가"]
            GRADE_Q -- "AAA등급 + 가 지역" --> COMP_TOP["최상위포괄허가"]

            INDIV_FORCE --> DOCS["⑥ 서류 준비<br/>(정부제출 / 내부보관 구분 — 아래 매트릭스 참조)"]
            INDIV --> DOCS
            COMP_USER --> DOCS
            COMP_BOTH --> DOCS
            COMP_TOP --> DOCS
            SCREEN1_APPROVE --> DOCS
            CATCHALL_FORCE --> DOCS
            HOLD --> SHIP
            FREE --> SHIP

            DOCS --> SCREEN2{"⑦ 우려거래자 재스크리닝<br/>(2차, 출고 직전)"}
            SCREEN2 -- "신규 제재 감지" --> STOP2["출고 즉시 중단<br/>(기존 허가 무효화 → 재신청)"]
            SCREEN2 -- "이상 없음" --> SHIP["출하 전 교차검증(H-01)<br/>및 통관·선적"]

            SHIP --> POST["사후관리 및 거래보고<br/>(K-01/K-02, I-01)"]
            POST --> REPORT["CP 정기 의무<br/>(K-03 운영보고서 / K-04 실적보고서)"]

            STOP1 -.->|위반 확정 시| SELFREPORT["자진신고 및 재발방지계획<br/>(J-01, J-02)"]
            STOP2 -.->|위반 확정 시| SELFREPORT

            click SCREEN1 call showScreeningDocs()
            click SCREEN1_Q call showScreeningDocs()
            click SCREEN1_EXC call showScreeningDocs()
            click SCREEN1_APPROVE call showScreeningDocs()
            click STOP1 call showScreeningDocs()
            click RISK_Q call showScreeningDocs()
            click CATCHALL_FORCE call showScreeningDocs()
            click HOLD call showScreeningDocs()
            click CLASSIFY call showScreeningDocs()
            click CLASSIFY_Q call showScreeningDocs()
            click FREE call showScreeningDocs()
            click SENS_Q call showScreeningDocs()
            click INDIV_FORCE call showScreeningDocs()
            click GRADE_Q call showScreeningDocs()
            click INDIV call showScreeningDocs()
            click COMP_USER call showScreeningDocs()
            click COMP_BOTH call showScreeningDocs()
            click COMP_TOP call showScreeningDocs()
            click DOCS call showScreeningDocs()
            click SCREEN2 call showScreeningDocs()
            click STOP2 call showScreeningDocs()
            click SHIP call showScreeningDocs()
            click POST call showScreeningDocs()
            click REPORT call showScreeningDocs()
            click SELFREPORT call showScreeningDocs()
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 24px; padding: 20px;">
      <h3 style="margin-bottom: 4px; display:flex; align-items:center; gap:8px;">
        <span class="material-symbols-rounded" style="color:var(--primary-color);">fact_check</span>
        케이스별 상세 매트릭스 (정부제출 vs 내부보관·면제서류)
      </h3>
      <p style="color:var(--text-tertiary); font-size:0.82rem; margin-bottom:14px;">
        우려/위험 조건 · 대상 품목(민감도) · 수출 목적지 · 기업 CP 등급 4가지를 교차 검증해 나오는 케이스별 결과입니다.
        "정부 제출 필수 서류"는 Yestrade 등 정부 시스템에 실제 제출해야 하는 서류이고, "내부보관(면제 서류)"는 제출은 면제되지만
        <strong style="color:var(--text-primary);">사내 시스템에 5년간 자체 보관해야 하는 법적 의무</strong>가 있는 서류입니다.
      </p>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.82rem;">
          <thead>
            <tr style="background:var(--bg-secondary); text-align:left;">
              <th style="padding:8px; border-bottom:2px solid var(--border-color);">우려·위험 조건</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color);">대상 품목(민감도)</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color);">수출 목적지</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color);">기업 CP 등급</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color);">최종 허가 결과</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color); color:#f87171;">정부 제출 필수 서류</th>
              <th style="padding:8px; border-bottom:2px solid var(--border-color); color:#60a5fa;">내부보관 (면제 서류)</th>
            </tr>
          </thead>
          <tbody id="screening-table-body"></tbody>
        </table>
      </div>
      <p style="color:var(--text-tertiary); font-size:0.78rem; margin-top:14px; line-height:1.6;">
        ※ "상업송장(CI)·포장명세서(PL)"만 요구되는 케이스: 전략물자가 아니고 위험 조건도 없는 완전한 일반 품목은 산업통상부·무역안보관리원의
        별도 수출허가(라이선스)가 필요 없이 관세청 일반 수출신고(관세법 제241조)만 거칩니다. 이때 기본으로 요구되는 무역서류가
        상업송장과 포장명세서이며, 이 두 서류만 있으면 전략물자 관련 서류 요구 없이 통관·출고가 승인됩니다.
      </p>
    </div>

    <!-- 관련 서류 모달 UI -->
    <div id="screening-modal" class="flowchart-modal" style="display:none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="screening-modal-title">관련 서류 및 기준</h3>
          <button id="screening-modal-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
          <p id="screening-modal-desc"></p>
          <div class="modal-section-title" style="font-weight:bold; margin-bottom:10px; color:var(--primary-color);">관련 별표 (기준 및 지침)</div>
          <div id="screening-modal-table-list" class="modal-document-list"></div>

          <div class="modal-section-title" style="font-weight:bold; margin-top:20px; margin-bottom:10px; color:var(--primary-color);">관련 별지 (법정 서식) / 사내 작성폼</div>
          <div id="screening-modal-form-list" class="modal-document-list"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const nodeData = {
    'SCREEN1': {
      title: '① 우려거래자 필터링 (1차, 영업단계)',
      desc: '계약 체결 전 영업 단계에서 구매자·최종수하인·최종사용자를 대상으로 우려거래자 명단을 조회합니다. 여기서 걸러지지 않으면 이후 전략물자 판정·허가 절차가 모두 진행되므로, 가장 앞단의 관문입니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제2조 제14호 우려거래자의 정의, 제94조의2 우려거래자 지정 및 등록)', url: pdfUrl(LAW) }],
      forms: [{ title: 'Z-01 통합 검색 (우려거래자/품목 사전 진단표)', formId: 'Z-01', url: null }]
    },
    'SCREEN1_Q': {
      title: '우려거래자 명단 일치 여부',
      desc: '국제연합 안보리 제재대상자, 국제수출통제체제 주의거래자, 그 밖에 국가안보상 주의가 필요하다고 지정된 자(제94조의2 제2항)에 해당하는지 확인합니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제94조의2 제2항 우려거래자 지정 기준)', url: pdfUrl(LAW) }], forms: []
    },
    'SCREEN1_EXC': {
      title: '예외 인정 여부 검토',
      desc: '우려거래자 명단에 일치하더라도, 인도적 목적 등 대량살상무기 전용 우려가 없음이 객관적으로 입증되면 예외적으로 허가 절차를 밟을 수 있습니다. 자율수출관리기구가 관련 증빙(최종용도확인서, 사업자 신원자료 등)을 갖추어 검토합니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제94조의2 관련, 대외무역법 제30조 우려거래자 관련 규정)', url: pdfUrl(LAW) }], forms: []
    },
    'SCREEN1_APPROVE': {
      title: '예외적 개별/상황허가',
      desc: '우려거래자 예외 승인이 인정되면 일반 개별수출허가 또는 상황허가 절차로 진행하되, 산업통상부장관의 사전 승인을 거칩니다. 특별사유서를 반드시 첨부해야 합니다.',
      tables: [], forms: [{ title: 'L-01 전략물자(기술)등 수출허가(신청)서 (별지1)', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }]
    },
    'STOP1': {
      title: '수출 원천 차단 (1차)',
      desc: '예외가 입증되지 않으면 접수 자체가 불가합니다. 시스템/영업 단계에서 거래를 차단하고 자율수출관리기구에 즉시 보고합니다. 정부에 제출할 서류가 없고(접수 불가), 시스템 내부적으로도 차단 로그만 남습니다.',
      tables: [{ title: '[별표 7] 표준자율수출관리규정 (우려거래자 대응절차)', url: pdfUrl('[별표 7] 표준자율수출관리규정(전략물자수출입고시).pdf') }], forms: []
    },
    'RISK_Q': {
      title: '② 위험징후 판단',
      desc: '우려거래자 명단은 통과했지만, 최종용도·최종사용자에 대량살상무기(WMD) 전용 가능성을 기업이 인지했거나 정부로부터 통보받은 경우, 또는 12개 위험징후(Red Flag) 중 의심되는 사정이 있는 경우를 판단합니다.',
      tables: [
        { title: '[별표 2의2] 상황허가 대상품목', url: pdfUrl('[별표 2의2] 상황허가 대상품목(전략물자수출입고시).pdf') },
        { title: '전략물자수출입고시 본문 (제54조 상황허가의 대상)', url: pdfUrl(LAW) }
      ], forms: []
    },
    'CATCHALL_FORCE': {
      title: '상황허가 강제',
      desc: 'WMD 전용을 인지·통보받았거나, 나-1/나-2 지역으로 향하는 12개 위험징후 의심 거래는 지역과 무관하게 상황허가가 강제됩니다. 상황허가도 별지1호 서식(L-01)을 사용합니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제54조 상황허가의 대상, 제55조 상황허가의 신청)', url: pdfUrl(LAW) }],
      forms: [{ title: 'L-01 (상황허가) 수출허가 신청서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }]
    },
    'HOLD': {
      title: '일반통관 (내부 정밀 Hold)',
      desc: '12개 위험징후가 의심되더라도 목적지가 가 지역(바세나르 가입 우대국)이면 법적으로는 상황허가가 면제됩니다. 다만 CP 내부통제 목적상 관리자가 정밀 검토(Hold)를 거친 뒤 일반통관으로 넘깁니다. 정부제출은 상업송장(CI)·포장명세서(PL)만으로 충분하고, 관리자 정밀검토서·물자판정서는 사내 보관합니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제54조의2 상황허가의 면제)', url: pdfUrl(LAW) }], forms: []
    },
    'CLASSIFY': {
      title: '③ 전략물자 판정',
      desc: '위험징후가 Clear인 거래에 대해 품목이 통제리스트(별표1~4)에 해당하는지 판정합니다. 자체 기술인력이 판정하면 자가판정(F-01, 별지5), 전문판정기관에 의뢰하면 전문판정(F-02, 별지4)입니다.',
      tables: [
        { title: '[별표 1] 전략물자·기술 색인', url: pdfUrl('[별표 1] 전략물자·기술 색인(전략물자 수출입고시).pdf') },
        { title: '전략물자수출입고시 본문 (제13조 자가판정, 제14조 전문판정의 신청)', url: pdfUrl(LAW) }
      ],
      forms: [
        { title: 'F-01 자가판정서 (별지5)', formId: 'F-01', url: pdfUrl('[별지 5] 자가판정서(전략물자수출입고시).pdf') },
        { title: 'F-02 전문판정(신청)서 (별지4)', formId: 'F-02', url: pdfUrl('[별지 4] 전문판정(신청)서(전략물자수출입고시).pdf') }
      ]
    },
    'CLASSIFY_Q': { title: '판정 결과 분기', desc: '판정 결과가 "전략물자 해당"인지 "비해당"인지에 따라 이후 절차가 완전히 달라집니다.', tables: [], forms: [] },
    'FREE': {
      title: '일반통관 (완전 면제)',
      desc: '전략물자가 아니고 위험징후도 없는 완전한 일반 품목입니다. 별도 수출허가 없이 관세청 일반 수출신고(관세법 제241조)만 거치며, 정부제출은 상업송장·포장명세서만으로 충분합니다. 물자판정서와 스크리닝 로그는 사후 입증을 위해 사내 보관합니다.',
      tables: [{ title: '관세법 제241조 (수출입의 신고)', url: null }], forms: []
    },
    'SENS_Q': {
      title: '④ 품목 민감도 확인',
      desc: '전략물자로 판정된 품목을 초민감(Very Sensitive List)·민감(Sensitive)·일반으로 다시 나눕니다. 이 등급에 따라 CP등급이 아무리 높아도(AAA 포함) 개별수출허가가 강제되는 구간이 있습니다.',
      tables: [
        { title: '[별표 1] 전략물자·기술 색인', url: pdfUrl('[별표 1] 전략물자·기술 색인(전략물자 수출입고시).pdf') },
        { title: '[별표 8] 사용자 및 품목 포괄수출허가 대상품목 (포괄허가 배제기준)', url: pdfUrl('[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf') },
        { title: '[별표 6] 전략물자 수출지역 구분', url: pdfUrl('[별표 6] 전략물자 수출지역 구분 (제10조 관련)(전략물자수출입고시).pdf') }
      ], forms: []
    },
    'INDIV_FORCE': {
      title: '개별수출허가 강제 (CP등급 무관)',
      desc: '초민감(VSL) 품목은 전 지역·전 등급(AAA 포함)에서, 민감/일반 품목이라도 나-2 지역으로 가면 전 등급에서, 민감 품목이 나-1 지역으로 가면 전 등급에서 포괄허가 혜택이 배제되고 매 건마다 개별수출허가를 받아야 합니다.',
      tables: [{ title: '[별표 8] 사용자 및 품목 포괄수출허가 대상품목 (포괄허가 배제기준)', url: pdfUrl('[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf') }],
      forms: [{ title: 'L-01 전략물자(기술)등 수출허가(신청)서 (별지1)', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }]
    },
    'GRADE_Q': {
      title: '⑤ 기업 CP 등급 및 수출지역',
      desc: '포괄허가 배제 대상이 아닌 일반/민감 품목이 가 지역 또는 나-1 지역으로 수출될 때, 수출지역(별표6)과 자사 CP 등급(A/AA/AAA, 별표19)의 조합에 따라 개별허가로 갈지, 어떤 종류의 포괄허가를 받을지가 결정됩니다.',
      tables: [
        { title: '[별표 6] 전략물자 수출지역 구분', url: pdfUrl('[별표 6] 전략물자 수출지역 구분 (제10조 관련)(전략물자수출입고시).pdf') },
        { title: '[별표 19] 자율준수무역거래자 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') },
        { title: '전략물자수출입고시 본문 (제28조 사용자포괄수출허가의 정의와 신청조건, 제34조 품목포괄수출허가의 정의와 신청조건)', url: pdfUrl(LAW) }
      ], forms: []
    },
    'INDIV': {
      title: '개별수출허가',
      desc: '비인증기업이거나, A등급 기업이 나-1 지역으로 수출하는 경우 개별수출허가로 진행합니다. 처리기간은 15일입니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제19조 개별수출허가, 제20조 신청서류, 제22조 심사기준)', url: pdfUrl(LAW) }],
      forms: [{ title: 'L-01 전략물자(기술)등 수출허가(신청)서 (별지1)', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }]
    },
    'COMP_USER': {
      title: '사용자포괄허가',
      desc: 'A등급이 가 지역으로 수출하거나, AA/AAA등급이 나-1 지역으로 수출할 때 적용됩니다. 특정 최종사용자를 지정해 일정기간 반복 수출을 포괄하는 허가입니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제28조 사용자포괄수출허가의 정의와 신청조건, 제29조 신청서류)', url: pdfUrl(LAW) }],
      forms: [{ title: 'L-02 포괄수출허가(신청)서 (별지6)', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }]
    },
    'COMP_BOTH': {
      title: '품목/사용자포괄허가',
      desc: 'AA등급이 가 지역으로 수출할 때 적용됩니다. 특정 품목을 여러 최종사용자에게, 또는 특정 최종사용자에게 여러 품목을 수출하는 것을 모두 포괄할 수 있습니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제28·34조, 별표19 AA등급 특례)', url: pdfUrl(LAW) }],
      forms: [{ title: 'L-02 포괄수출허가(신청)서 (별지6)', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }]
    },
    'COMP_TOP': {
      title: '최상위포괄허가',
      desc: 'AAA등급이 가 지역으로 수출할 때 적용되는 가장 넓은 범위의 포괄허가입니다. 정부 제출서류가 포괄신청서와 자율준수 서약서 정도로 최소화되고, 수출계약서·EUC·영업/기술사양서는 모두 사내 보관으로 대체됩니다.',
      tables: [{ title: '[별표 19] 자율준수무역거래자 등급별 특례 (AAA등급)', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }],
      forms: [{ title: 'L-02 포괄수출허가(신청)서 (별지6)', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }]
    },
    'DOCS': {
      title: '⑥ 서류 준비 (정부제출 / 내부보관 구분)',
      desc: '허가유형이 정해지면, 케이스별로 정부에 실제 제출할 서류와 제출은 면제되지만 사내에 5년간 보관해야 하는 서류가 나뉩니다. 아래 매트릭스에서 케이스별 정확한 서류 구성을 확인하세요.',
      tables: [],
      forms: [
        { title: 'L-03 최종수하인 및 구매자 진술서 (별지2)', formId: 'L-03', url: pdfUrl('[별지 2] STATEMENT BY ULTIMATE CONSIGNEE AND PURCHASER(전략물자수출입고시).pdf') },
        { title: 'L-04 최종사용자 서약서 (별지2의2)', formId: 'L-04', url: pdfUrl('[별지 2의2] END-USER STATEMENT(전략물자수출입고시).pdf') },
        { title: '[폐지 2026.9.1.] L-10 수출자 서약서 (구 별지3)', formId: 'L-10', url: pdfUrl('[별지 3] 수출자 서약서(전략물자수출입고시).pdf') }
      ]
    },
    'SCREEN2': {
      title: '⑦ 우려거래자 재스크리닝 (2차, 출고 직전)',
      desc: '허가를 받았더라도 출고 직전 다시 우려거래자 명단을 조회합니다. 허가 취득 후 시차를 두고 신규 제재가 지정될 수 있기 때문입니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제94조의2), 대외무역법 (허가의 취소 관련 조항)', url: pdfUrl(LAW) }], forms: []
    },
    'STOP2': {
      title: '출고 즉시 중단 (2차)',
      desc: '2차 스크리닝에서 신규 제재가 감지되면 기 발급된 개별/포괄허가가 사실상 무효화된 것으로 보고, 시스템상 출고(DO)를 즉시 차단해야 합니다. 산업통상부에 보고하고 신규 허가를 재신청합니다.',
      tables: [], forms: []
    },
    'SHIP': {
      title: '출하 전 교차검증 및 통관·선적',
      desc: '허가서·판정서 내용과 실제 출하 물품·수량·목적지가 일치하는지 물류부서와 CP부서가 교차로 확인한 뒤 통관·선적합니다.',
      tables: [], forms: [{ title: 'H-01 출하 전 교차 검증 점검표', formId: 'H-01', url: null }]
    },
    'POST': {
      title: '사후관리 및 거래보고',
      desc: '허가면제 거래는 사전/사후거래보고(K-01/K-02)를, 모든 거래는 사후관리대장(I-01) 기록을 남깁니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제86조 자율준수무역거래자 보고의무)', url: pdfUrl(LAW) },
        { title: '[별표 7] 표준자율수출관리규정 (사후관리 조항)', url: pdfUrl('[별표 7] 표준자율수출관리규정(전략물자수출입고시).pdf') }
      ],
      forms: [
        { title: 'K-01 사전거래보고서', formId: 'K-01', url: pdfUrl('[별지 16] 사전거래보고서(전략물자수출입고시).pdf') },
        { title: 'K-02 사후거래보고서', formId: 'K-02', url: pdfUrl('[별지 16의2] 사후거래보고서(전략물자수출입고시).pdf') },
        { title: 'I-01 사후관리 대장', formId: 'I-01', url: null }
      ]
    },
    'REPORT': {
      title: 'CP 정기 의무',
      desc: '자율준수무역거래자는 연 1회 이상 운영보고서(별지18)와 실적보고서(별지19)를 제출해야 합니다.',
      tables: [{ title: '대외무역법 제22조 제3항 및 동법 시행령 제45조', url: null }],
      forms: [
        { title: 'K-03 자율준수체제 운영 보고서 (별지18)', formId: 'K-03', url: pdfUrl('[별지 18] 자율준수체제 운영 보고서(전략물자수출입고시).pdf') },
        { title: 'K-04 자율준수무역거래자 실적 보고서 (별지19)', formId: 'K-04', url: pdfUrl('[별지 19] 자율준수무역거래자 실적 보고서(전략물자 수출입고시).pdf') }
      ]
    },
    'SELFREPORT': {
      title: '위반 시 자진신고',
      desc: '거래 중단(1차·2차 스크리닝) 이후 위반 사실이 확정되면 자진신고서와 재발방지계획서를 제출합니다. 자진신고는 제재 감경의 근거가 될 수 있습니다.',
      tables: [{ title: '전략물자수출입고시 본문 (제98조 자진신고)', url: pdfUrl(LAW) }],
      forms: [
        { title: 'J-01 자진신고서 (별지24)', formId: 'J-01', url: pdfUrl('[별지 24] 자진신고서(전략물자수출입고시).pdf') },
        { title: 'J-02 재발방지계획서 (별지25)', formId: 'J-02', url: pdfUrl('[별지 25] 재발 방지 계획서(전략물자수출입고시).pdf') }
      ]
    }
  };

  // ── 케이스별 상세 매트릭스 ("CP 모든 로직 검토.pdf" 반영, 14개 케이스) ──
  const tableRows = [
    ['우려거래자(DPL) 일치', '전 품목 공통', '전 지역', '무관', '수출 원천 차단', '(접수 불가)', '(시스템 차단 로그)'],
    ['WMD 전용 인지/통보', '비전략물자', '전 지역', '무관', '상황허가', '상황신청서(L-01), 수출계약서, 최종사용자서약서(EUC), 용도설명서', 'CP 내부심사서, 물자판정서'],
    ['12개 위험징후 의심', '비전략물자', '나-1 / 나-2', '무관', '상황허가', '상황신청서(L-01), 수출계약서, EUC, 용도설명서', 'CP 내부심사서, 물자판정서'],
    ['12개 위험징후 의심', '비전략물자', '가 지역', '무관', '일반 통관 (내부 Hold)', '상업송장(CI), 포장명세서(PL)', '관리자 정밀 검토서, 물자판정서'],
    ['Clear (위험 없음)', '비전략물자', '전 지역', '무관', '일반 통관 (완전 면제)', '상업송장(CI), 포장명세서(PL)', '물자판정서(F-01/F-02), 스크리닝 로그(Z-01)'],
    ['Clear', '전략물자 (초민감·VSL)', '전 지역', '전체 (AAA 포함)', '개별수출허가 (강제)', '개별신청서(L-01), 수출계약서, EUC, 영업증명서, 기술사양서', 'CP 내부심사서, 스크리닝 로그'],
    ['Clear', '전략물자 (일반/민감)', '나-2 지역', '전체 (AAA 포함)', '개별수출허가 (강제)', '개별신청서(L-01), 수출계약서, EUC, 영업증명서, 기술사양서', 'CP 내부심사서, 스크리닝 로그'],
    ['Clear', '전략물자 (민감)', '나-1 지역', '전체 (AAA 포함)', '개별수출허가 (강제)', '개별신청서(L-01), 수출계약서, EUC, 영업증명서, 기술사양서', 'CP 내부심사서, 스크리닝 로그'],
    ['Clear', '전략물자 (일반/민감)', '가 / 나-1', '비인증 기업', '개별수출허가', '개별신청서(L-01), 수출계약서, EUC, 영업증명서, 기술사양서', '물자판정서, 스크리닝 로그'],
    ['Clear', '전략물자 (일반)', '나-1 지역', 'A 등급', '개별수출허가', '개별신청서(L-01), 수출계약서, EUC, 영업증명서, 기술사양서', 'CP 내부심사서, 스크리닝 로그'],
    ['Clear', '전략물자 (일반)', '나-1 지역', 'AA / AAA 등급', '사용자 포괄허가', '포괄신청서(L-02), 자율준수 서약서, [AA한정] 수출계약서', 'EUC, 기술사양서, [AAA한정] 수출계약서'],
    ['Clear', '전략물자 (일반/민감)', '가 지역', 'A 등급', '사용자 포괄허가', '포괄신청서(L-02), 수출계약서, EUC, 자율준수 서약서', '영업증명서, 기술사양서'],
    ['Clear', '전략물자 (일반/민감)', '가 지역', 'AA 등급', '품목/사용자 포괄허가', '포괄신청서(L-02), 수출계약서(계획서), 자율준수 서약서', 'EUC, 영업증명서, 기술사양서'],
    ['Clear', '전략물자 (일반/민감)', '가 지역', 'AAA 등급', '최상위 포괄허가', '포괄신청서(L-02), 자율준수 서약서', '수출계약서, EUC, 영업/기술사양서'],
  ];
  const tbody = container.querySelector('#screening-table-body');
  tbody.innerHTML = tableRows.map((r, i) => `
    <tr style="background:${i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)'};">
      <td style="padding:8px; border-bottom:1px solid var(--border-color); font-weight:600;">${r[0]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color);">${r[1]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color);">${r[2]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color);">${r[3]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color); font-weight:600; color:var(--primary-color);">${r[4]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color); color:var(--text-secondary);">${r[5]}</td>
      <td style="padding:8px; border-bottom:1px solid var(--border-color); color:var(--text-tertiary);">${r[6]}</td>
    </tr>
  `).join('');

  // ── 모달 제어 ──
  const modal = container.querySelector('#screening-modal');
  const modalClose = container.querySelector('#screening-modal-close');
  const modalTitle = container.querySelector('#screening-modal-title');
  const modalDesc = container.querySelector('#screening-modal-desc');
  const tableList = container.querySelector('#screening-modal-table-list');
  const formList = container.querySelector('#screening-modal-form-list');

  modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  window.showScreeningDocs = function(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    tableList.innerHTML = (data.tables || []).map(tbl => `
      <div class="doc-item legal-doc-item">
        <span class="material-symbols-rounded" style="color:var(--text-tertiary);">menu_book</span>
        <div style="flex:1;"><span>${tbl.title}</span></div>
        ${tbl.url ? `<a href="${tbl.url}" target="_blank" class="btn btn-outline" style="padding:4px 8px; font-size:0.8rem;">📄 로컬 열람</a>` : ''}
      </div>
    `).join('') || '<div style="color:var(--text-tertiary); font-size:0.9rem;">관련된 별표 항목이 없습니다.</div>';

    formList.innerHTML = (data.forms || []).map(frm => `
      <div class="doc-item legal-doc-item">
        <span class="material-symbols-rounded" style="color:var(--primary-color);">description</span>
        <div style="flex:1;"><strong style="color:var(--text-primary);">${frm.title}</strong></div>
        <div style="display:flex; gap:8px;">
          ${frm.formId ? `<button class="btn btn-primary btn-form-link" data-form="${frm.formId}" style="padding:4px 8px; font-size:0.8rem;">사내 작성폼</button>` : ''}
          ${frm.url ? `<a href="${frm.url}" target="_blank" class="btn btn-outline" style="padding:4px 8px; font-size:0.8rem;">📄 로컬 열람</a>` : ''}
        </div>
      </div>
    `).join('') || '<div style="color:var(--text-tertiary); font-size:0.9rem;">관련된 법정 서식이 없습니다.</div>';

    formList.querySelectorAll('.btn-form-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const formId = btn.getAttribute('data-form');
        if (onNavigateToForm) {
          modal.style.display = 'none';
          onNavigateToForm(formId);
        }
      });
    });

    modal.style.display = 'flex';
  };

  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
    setTimeout(() => { window.mermaid.run({ querySelector: '.mermaid' }); }, 100);
  }
}
