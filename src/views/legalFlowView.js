// ============================================
// Legal Flowchart View Component (Mermaid) - Mega Comprehensive Tree
// ============================================

export function renderLegalFlowView(container, onNavigateToForm) {
  let html = `
    <div class="page-header">
      <div class="breadcrumb">홈 <span>›</span> 고시 서류 매핑도 (메가 의사결정 트리)</div>
      <h2>고시 서류 매핑도 (종합 무역 거래 트리)</h2>
      <p>수출뿐만 아니라 <strong>수입, 중개, 경유/환적, 특수 기술 및 면제 조항</strong> 등 고시에서 다루는 모든 무역 거래 유형을 포괄하는 초대형 메가(Mega) 의사결정 트리입니다.<br/>
      <strong style="color:var(--primary-color);">다이아몬드(조건) 또는 네모(결과) 노드를 클릭</strong>하여 해당 상황에 필요한 법령 원본(PDF)과 사내 기안 폼을 확인하세요.</p>
    </div>
    
    <div class="flowchart-container">
      <div class="card flowchart-card" style="padding: 10px; overflow-x: auto; overflow-y: auto;">
        <div class="mermaid" style="min-width: 1400px;">
          flowchart TD
            START(["시작: 무역 거래 발생"]) --> Q_TYPE{"[Q0] 거래의 유형은<br/>무엇인가?"}
            
            %% 수입 분기
            Q_TYPE -- "수입 (국외->국내)" --> IMPORT["수입목적확인서 발급<br/>(수출국 요구 시)"]
            IMPORT --> IMPORT_POST["수입 후 통관증명서 및<br/>수입내역신고"]
            
            %% 중개 분기
            Q_TYPE -- "중개 (외국->외국 주선)" --> BROKER{"[중개] CP기업<br/>특례 적용 대상인가?"}
            BROKER -- "Yes" --> BROKER_EXEMPT["중개허가 면제<br/>(사전/사후거래보고)"]
            BROKER -- "No" --> BROKER_LIC["중개허가 신청"]
            
            %% 환적/경유 분기
            Q_TYPE -- "환적/경유 (국내 거침)" --> TRANSIT{"[환적/경유] 대량파괴무기<br/>우려가 있는가?"}
            TRANSIT -- "Yes" --> TRANSIT_LIC["경유/환적허가 신청"]
            TRANSIT -- "No" --> FREE_TRANSIT(["자유 통과"])
            
            %% 수출 분기 (기존 핵심 로직)
            Q_TYPE -- "수출 (국내->국외)" --> Q_TECH{"[특수] 원자력플랜트 또는<br/>군함설계 기술인가?"}
            
            Q_TECH -- "Yes" --> TECH_LIC["특수 기술수출허가 신청<br/>(원자력/군함)"]
            
            Q_TECH -- "No (일반 수출)" --> Q_EXEMPT{"[예외] 수리/전시 등<br/>법정 허가 면제 사유인가?"}
            
            Q_EXEMPT -- "Yes" --> EXPORT_EXEMPT["수출허가 면제<br/>(사전/사후거래보고)"]
            
            Q_EXEMPT -- "No (정상 수출 절차)" --> COND1{"[Q1] 해당 품목이<br/>통제리스트에<br/>해당하는가? (판정)"}
            
            %% 통제리스트 비해당 로직 (상황허가)
            COND1 -- "No (비해당)" --> COND_CATCH1{"[Q2-1] UN제재국, 러시아/벨라루스 등<br/>특수 통제국가 수출인가?"}
            COND_CATCH1 -- "Yes" --> CATCHALL["상황허가 대상<br/>(개별수출허가 진행)"]
            COND_CATCH1 -- "No" --> COND_CATCH2{"[Q2-2] 대량파괴무기 전용 우려나<br/>우려거래자인가?"}
            COND_CATCH2 -- "Yes" --> CATCHALL
            COND_CATCH2 -- "No" --> FREE(["자유 수출 (허가 면제)"])

            %% 전략물자 로직 (포괄허가 특례 필터)
            COND1 -- "Yes (해당)" --> COND_EXCEPT{"[Q3] 별표8에 따른<br/>포괄허가 원천 배제 품목인가?<br/>(초민감, 군용, 원자력 등)"}
            COND_EXCEPT -- "Yes (배제품목)" --> COND_INDIV_EX{"[Q5] 가 지역 수출이거나<br/>기존 동일 수출실적이 있는가?"}
            
            COND_EXCEPT -- "No (포괄대상)" --> COND_REGION{"[Q4] 수출 국가(지역) 및<br/>자사 CP 등급 적용 (별표19)"}
            
            %% 국가별 포괄허가 혜택 (AA등급 등 세부분기 반영)
            COND_REGION -- "가 지역 (A국가)" --> COND_GA_GRADE{"자사 CP 등급 확인"}
            COND_GA_GRADE -- "AA 또는 AAA 등급" --> COMP_BOTH["사용자포괄 또는 품목포괄<br/>선택 대상 (별지 6)"]
            COND_GA_GRADE -- "A 등급" --> COMP_USER["사용자포괄허가 대상<br/>(품목포괄 불가)"]
            
            COND_REGION -- "나의 1 지역" --> COND_NA1{"자사 CP 등급 확인"}
            COND_NA1 -- "AAA 등급" --> COMP_BOTH
            COND_NA1 -- "AA 등급" --> COND_AA_GOV{"수입국의 최종사용자가<br/>국가 또는 정부기관인가?"}
            COND_AA_GOV -- "Yes (국가/정부)" --> COMP_BOTH
            COND_AA_GOV -- "No (일반 기업)" --> COMP_USER
            COND_NA1 -- "A 등급" --> COMP_CONDITIONAL["제한적 특례 대상<br/>(조건부 허용 또는 개별허가)"]
            
            COND_REGION -- "그 외 지역 (나의2 제외)" --> COND_NA2{"자사 CP 등급 확인"}
            COND_NA2 -- "AAA 등급" --> COMP_ITEM["품목포괄허가 대상<br/>(별지 6)"]
            COND_NA2 -- "AA 등급" --> COND_AA_GOV2{"수입국의 최종사용자가<br/>국가 또는 정부기관인가?"}
            COND_AA_GOV2 -- "Yes (국가/정부)" --> COMP_ITEM
            COND_AA_GOV2 -- "No (일반 기업)" --> COMP_CONDITIONAL
            COND_NA2 -- "A 등급" --> COMP_CONDITIONAL
            
            %% 개별수출허가 특례
            COMP_CONDITIONAL -.-> COND_INDIV_EX
            COND_INDIV_EX -- "Yes" --> INDIV_FAST["개별수출허가<br/>(심사 또는 서류 면제 특례)"]
            COND_INDIV_EX -- "No" --> INDIV_NORMAL["일반 개별수출허가<br/>(일반 심사)"]
            
            CATCHALL --> INDIV_NORMAL

            %% 허가 획득 후 서류 준비 및 사후관리 (신규)
            COMP_USER --> COMP_USER_DOCS["[서류 준비] 사용자포괄 신청<br/>(최종수하인 진술서 등)"]
            COMP_ITEM --> COMP_ITEM_DOCS["[서류 준비] 품목포괄 신청<br/>(계약서/프로젝트설명서 등)"]
            COMP_BOTH -- "사용자포괄 선택 시" --> COMP_USER_DOCS
            COMP_BOTH -- "품목포괄 선택 시" --> COMP_ITEM_DOCS
            
            COMP_USER_DOCS --> EXPORT_CUSTOMS["수출 통관 및 화물 선적<br/>(허가번호 사용 및 장부기록)"]
            COMP_ITEM_DOCS --> EXPORT_CUSTOMS
            INDIV_FAST --> EXPORT_CUSTOMS
            INDIV_NORMAL --> EXPORT_CUSTOMS
            FREE --> EXPORT_CUSTOMS
            
            EXPORT_CUSTOMS --> REPORT_DUTY["수출 이행 후 사후 실적보고<br/>(CP 정기 의무)"]

            subgraph "CP기업 정기 의무 및 사후관리"
              CP_DUTY["CP 지정 및 실적/운영보고<br/>(위반 시 자진신고/행정제재)"]
            end
            
            START -.-> CP_DUTY
            REPORT_DUTY -.-> CP_DUTY

            click Q_TYPE call showLegalDocs()
            click IMPORT call showLegalDocs()
            click IMPORT_POST call showLegalDocs()
            click BROKER call showLegalDocs()
            click BROKER_EXEMPT call showLegalDocs()
            click BROKER_LIC call showLegalDocs()
            click TRANSIT call showLegalDocs()
            click TRANSIT_LIC call showLegalDocs()
            click FREE_TRANSIT call showLegalDocs()
            click Q_TECH call showLegalDocs()
            click TECH_LIC call showLegalDocs()
            click Q_EXEMPT call showLegalDocs()
            click EXPORT_EXEMPT call showLegalDocs()
            click COND1 call showLegalDocs()
            click COND_CATCH1 call showLegalDocs()
            click COND_CATCH2 call showLegalDocs()
            click CATCHALL call showLegalDocs()
            click FREE call showLegalDocs()
            click COND_EXCEPT call showLegalDocs()
            click COND_REGION call showLegalDocs()
            click COND_GRADE1 call showLegalDocs()
            click COND_GRADE2 call showLegalDocs()
            click COND_GA_GRADE call showLegalDocs()
            click COND_NA1 call showLegalDocs()
            click COND_AA_GOV call showLegalDocs()
            click COND_NA2 call showLegalDocs()
            click COND_AA_GOV2 call showLegalDocs()
            click COMP_BOTH call showLegalDocs()
            click COMP_USER call showLegalDocs()
            click COMP_ITEM call showLegalDocs()
            click COMP_CONDITIONAL call showLegalDocs()
            click COND_INDIV_EX call showLegalDocs()
            click INDIV_FAST call showLegalDocs()
            click INDIV_NORMAL call showLegalDocs()
            click COMP_USER_DOCS call showLegalDocs()
            click COMP_ITEM_DOCS call showLegalDocs()
            click EXPORT_CUSTOMS call showLegalDocs()
            click REPORT_DUTY call showLegalDocs()
            click CP_DUTY call showLegalDocs()
        </div>
      </div>
    </div>

    <!-- 고시 서류 모달 UI -->
    <div id="legal-modal" class="flowchart-modal" style="display:none;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="legal-modal-title">관련 고시 서류 및 기준</h3>
          <button id="legal-modal-close" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
          <p id="legal-modal-desc"></p>
          <div class="modal-section-title" style="font-weight:bold; margin-bottom:10px; color:var(--primary-color);">관련 별표 (기준 및 지침)</div>
          <div id="legal-modal-table-list" class="modal-document-list"></div>
          
          <div class="modal-section-title" style="font-weight:bold; margin-top:20px; margin-bottom:10px; color:var(--primary-color);">관련 별지 (법정 서식)</div>
          <div id="legal-modal-form-list" class="modal-document-list"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const pdfUrl = (filename) => {
    return `/법령/${encodeURIComponent(filename)}`;
  };

  const nodeData = {
    // ---- 신규 분기 노드 데이터 ----
    'Q_TYPE': {
      title: '[Q0] 거래의 유형 판별',
      desc: '해당 무역 거래가 수출, 수입, 중개, 환적/경유 중 어느 형태인지 판별합니다. 제2조(용어의 정의)에서 법적인 거래 유형을 확인할 수 있습니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제2조 용어의 정의)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ], forms: []
    },
    'IMPORT': {
      title: '수입목적확인서 발급',
      desc: '수출국 정부의 요구에 의해 우리 정부가 발급해 주는 서류입니다. [유효기간] 1년 (발급일로부터 1년 내에 해당 물품이 수입되어야 함).',
      tables: [
        { title: '[별표 18] 수입목적확인서 발급기관의 장인', url: pdfUrl('[별표 18] 전략물자ㆍ기술 수입목적확인서 발급기관의 장인(전략물자수출입고시).pdf') },
        { title: '전략물자수출입고시 본문 (제61조 수입목적확인서 발급)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 7] 수입목적확인(신청)서', formId: null, url: pdfUrl('[별지 7] 수입목적확인(신청)서(전략물자수출입고시).pdf') },
        { title: '[별지 7의2] 정부보증 대상 사용서약서', formId: null, url: pdfUrl('[별지 7의2] 정부보증 대상 물품등에 대한 사용서약서(전략물자수출입고시).pdf') }
      ]
    },
    'IMPORT_POST': {
      title: '수입내역신고 및 통관증명서 발급',
      desc: '수입목적확인서를 발급받아 수입한 경우, [신고기한] 수입 통관 후 1개월 이내에 수입내역을 의무적으로 신고해야 합니다. 또한 수출국 정부 요구 시 통관증명서를 발급받을 수 있습니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제72조 국내 통관증명서 발급)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 8] 수입내역 신고서', formId: null, url: pdfUrl('[별지 8] 수입내역 신고서(전략물자수출입고시).pdf') },
        { title: '[별지 9] 통관증명(신청)서', formId: null, url: pdfUrl('[별지 9] 통관증명(신청)서(전략물자수출입고시).pdf') }
      ]
    },
    'BROKER': {
      title: '[중개허가] CP 특례 검토',
      desc: '외국에서 다른 외국으로 전략물자를 이전하는 중개(Brokering) 거래입니다. CP기업 특례에 해당하는지 확인합니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례 (중개허가 면제)', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'BROKER_EXEMPT': {
      title: '중개허가 면제',
      desc: '중개허가가 면제되지만, 수출 전 사전거래보고서를 제출하거나 수출 후 사후거래보고서를 제출할 의무가 발생합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제59조의2 중개허가의 면제)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 16] 사전거래보고서', formId: 'K-01', url: pdfUrl('[별지 16] 사전거래보고서(전략물자수출입고시).pdf') },
        { title: '[별지 16의2] 사후거래보고서', formId: 'K-02', url: pdfUrl('[별지 16의2] 사후거래보고서(전략물자수출입고시).pdf') }
      ]
    },
    'BROKER_LIC': {
      title: '중개허가 신청',
      desc: '특례를 받지 못하는 경우, 중개(주선) 행위 전 허가를 받아야 합니다. [유효기간] 중개허가의 유효기간은 1년입니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제60조 중개허가의 신청)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 1] 수출(중개)허가 신청서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }
      ]
    },
    'TRANSIT': {
      title: '[환적/경유] 대량파괴무기 우려 검토',
      desc: '국내 항만이나 공항을 거치는 외국 화물에 대해, 대량파괴무기 전용 의도가 있는지 검토합니다.',
      tables: [
        { title: '[별표 2의2] 상황허가 대상품목 (우려물품 목록)', url: pdfUrl('[별표 2의2] 상황허가 대상품목(전략물자수출입고시).pdf') },
        { title: '전략물자수출입고시 본문 (제57조 환적/경유)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ], forms: []
    },
    'TRANSIT_LIC': {
      title: '경유 또는 환적허가 신청',
      desc: '우려가 확인된 경우, 국내를 통과하기 전에 환적허가를 받아야 합니다. [유효기간] 환적허가의 유효기간은 1년입니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제58조 경유/환적허가의 신청)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 1] 수출(환적)허가 신청서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }
      ]
    },
    'FREE_TRANSIT': {
      title: '자유 통과',
      desc: '대량파괴무기 등 전용 우려가 없는 경우, 별도의 허가 없이 경유 및 환적이 가능합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제57조의2 환적허가의 예외)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ], forms: []
    },
    'Q_TECH': {
      title: '[특수 기술수출] 원자력/군함',
      desc: '원자력플랜트 수출이나 군함설계 관련 감리업무 등은 일반 기술수출과 분리되어 별도 장(Chapter)으로 관리됩니다. (별표 2 제10부, 별표 3 참조)',
      tables: [
        { title: '[별표 2] 이중용도품목 (제10부 원자력 참조)', url: pdfUrl('[별표 2] 이중용도품목(전략물자수출입고시).pdf') },
        { title: '[별표 3] 군용물자목록', url: pdfUrl('[별표 3] 군용물자목록(전략물자 수출입고시).pdf') }
      ], forms: []
    },
    'TECH_LIC': {
      title: '특수 기술수출허가 신청',
      desc: '원자력안전위원회 또는 방위사업청에 신청하는 매우 특수한 기술수출허가입니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제41조 원자력플랜트, 제50조 군함설계)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 1호의7] 원자력플랜트기술수출 계획서', formId: null, url: pdfUrl('[별지 1의7] 원자력플랜트기술수출 계획서(전략물자수출입고시).pdf') },
        { title: '[별지 1] (군함설계) 기술수출허가 신청서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }
      ]
    },
    'Q_EXEMPT': {
      title: '[수출허가 면제 사유]',
      desc: '전략물자라 하더라도, 정부 공용 목적, 박람회 출품, 긴급 수리 목적의 재수출 등 허가가 완전히 면제되는 법정 사유가 있는지 확인합니다. 고시 제26조에서 사유를 구분할 수 있습니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제26조 허가면제 조항)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ], forms: []
    },
    'EXPORT_EXEMPT': {
      title: '수출허가 면제',
      desc: '허가는 면제받으나 [보고기한]이 존재합니다. 면제 사유(제26조)에 따라 선적 전 사전거래보고를 하거나, 선적 후 특정 기한 내에 사후거래보고를 이행해야 합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제26조 수출허가의 면제)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 16] 사전거래보고서', formId: 'K-01', url: pdfUrl('[별지 16] 사전거래보고서(전략물자수출입고시).pdf') },
        { title: '[별지 16의2] 사후거래보고서', formId: 'K-02', url: pdfUrl('[별지 16의2] 사후거래보고서(전략물자수출입고시).pdf') }
      ]
    },
    // ---- 기존 코어 수출 로직 노드 데이터 ----
    'COND1': {
      title: '[Q1] 전략물자 통제리스트 판정',
      desc: '해당 품목이 전략물자(이중용도, 군용 등)에 해당하는지 통제리스트를 확인합니다.',
      tables: [
        { title: '[별표 1] 전략물자·기술 색인', url: pdfUrl('[별표 1] 전략물자·기술 색인(전략물자수출입고시).pdf') },
        { title: '[별표 2] 이중용도품목', url: pdfUrl('[별표 2] 이중용도품목(전략물자수출입고시).pdf') },
        { title: '[별표 3] 군용물자목록', url: pdfUrl('[별표 3] 군용물자목록(전략물자 수출입고시).pdf') }
      ],
      forms: [
        { title: '[별지 4] 전문판정(신청)서', formId: 'F-02', url: pdfUrl('[별지 4] 전문판정(신청)서(전략물자수출입고시).pdf') },
        { title: '[별지 5] 자가판정서', formId: 'F-01', url: pdfUrl('[별지 5] 자가판정서(전략물자수출입고시).pdf') }
      ]
    },
    'COND_CATCH1': {
      title: '[Q2-1] 특수 통제국가 수출 여부',
      desc: '비해당 품목이더라도 UN 결의안 제재 국가나 특정 수출통제 공조 국가(러시아/벨라루스 등)로 향하는지 확인합니다.',
      tables: [
        { title: '[별표 21] UN결의 제1737호 이행 지침', url: pdfUrl('[별표 21] 국제연합안전보장이사회결의 제1737호 등 이행을 위한 전략물자 수출허가 지침(전략물자수출입고시).pdf') },
        { title: '[별표 24] 러시아, 벨라루스 허가 지침', url: pdfUrl('[별표 24] 국제사회 수출통제 공조를 위한 러시아¸ 벨라루스 허가 지침(전략물자수출입고시).pdf') }
      ], forms: []
    },
    'COND_CATCH2': {
      title: '[Q2-2] 우려거래자 및 WMD 전용 우려',
      desc: '대량파괴무기 전용 가능성이 있거나 상대방이 우려거래자에 해당하는지 심사합니다.',
      tables: [
        { title: '[별표 2의2] 상황허가 대상품목', url: pdfUrl('[별표 2의2] 상황허가 대상품목(전략물자수출입고시).pdf') },
        { title: '[별표 2의3] 상황허가 면제대상', url: pdfUrl('[별표 2의3] 상황허가 면제대상(제54조 관련)(전략물자수출입고시).pdf') }
      ], forms: []
    },
    'CATCHALL': {
      title: '상황허가 (Catch-all) 대상',
      desc: '비해당 품목이라도 우려용도로 확인된 경우 개별수출허가에 준하는 상황허가를 받아야 합니다. [유효기간] 1년입니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제55조 상황허가의 신청)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') },
        { title: '[별표 9~11] 서약서 양식', url: pdfUrl('[별표 9] 서약서 양식 (최종사용자가 확정된 경우)(전략물자수출입고시).pdf') }
      ], 
      forms: [
        { title: '[별지 1] 전략물자 수출허가(신청)서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') }
      ]
    },
    'COND_EXCEPT': {
      title: '[Q3] 포괄허가 원천 배제 품목 확인',
      desc: '전략물자에 해당하더라도 [별표 8]에 따라 원자력 전용품목, 군용물자, 초민감품목 등은 포괄허가를 받을 수 없고 개별허가만 가능합니다.',
      tables: [
        { title: '[별표 8] 포괄수출허가 대상품목 (예외기준)', url: pdfUrl('[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf') }
      ], forms: []
    },
    'COND_REGION': {
      title: '[Q4] 수출 지역 및 CP 등급 적용',
      desc: '[별표 6]에 따른 지역구분과 [별표 19]에 따른 회사의 CP 등급을 조합하여 포괄허가 혜택 범위를 결정합니다.',
      tables: [
        { title: '[별표 6] 전략물자 수출지역 구분 (가/나/다)', url: pdfUrl('[별표 6] 전략물자 수출지역 구분 (제10조 관련)(전략물자수출입고시).pdf') },
        { title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }
      ], forms: []
    },
    'COND_GA_GRADE': {
      title: 'CP 등급 판별 (가 지역)',
      desc: '가 지역 수출 시, A등급은 사용자포괄허가만 가능하지만, AA등급과 AAA등급은 사용자포괄과 품목포괄 중 유리한 것을 선택할 수 있습니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_NA1': {
      title: 'CP 등급 판별 (나의 1 지역)',
      desc: '나의 1 지역 수출 시, AAA등급은 사용자/품목 포괄 모두 가능, AA등급은 원칙적으로 사용자포괄만 가능하며, A등급은 제한적입니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_AA_GOV': {
      title: 'AA등급 최종사용자 확인 (품목포괄 특례)',
      desc: '제34조제2항제2호에 따라, AA등급이라도 최종사용자가 [국가 또는 정부기관]인 경우에는 AAA등급과 동일하게 품목포괄수출허가를 신청할 수 있습니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_NA2': {
      title: 'CP 등급 판별 (나의 2 제외 전지역)',
      desc: '그 외의 지역은 AAA등급만 품목포괄허가를 받을 수 있습니다. (AA등급은 정부기관 수출 시 예외적용)',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_AA_GOV2': {
      title: 'AA등급 최종사용자 확인 (품목포괄 특례)',
      desc: 'AA등급이더라도 최종사용자가 국가 또는 정부기관인 경우 예외적으로 품목포괄수출허가를 받을 수 있습니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COMP_BOTH': {
      title: '사용자포괄 / 품목포괄허가 선택',
      desc: '두 포괄허가 모두 신청 가능합니다. [유효기간 비교] 사용자포괄은 상황에 따라 2~3년이나, 품목포괄은 3년이 보장됩니다. 또한 신청 시 구비해야 할 서류(계약서 유무 등)에 차이가 있으므로 실무에 맞게 유리한 쪽을 선택합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제32조 및 제38조 유효기간)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 6] 포괄수출허가(신청)서', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }
      ]
    },
    'COND_GRADE1': {
      title: 'CP 등급 판별 (나의 1 지역)',
      desc: '나의 1 지역 수출 시 AA등급과 AAA등급은 사용자포괄허가가 가능하지만, A등급은 제한적입니다. (별표 19 참조)',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_GRADE2': {
      title: 'CP 등급 판별 (나의 2 제외 전지역)',
      desc: '나의 2를 제외한 나머지 지역은 AAA등급만 품목포괄허가를 받을 수 있습니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COMP_USER': {
      title: '사용자포괄허가 대상',
      desc: '특정 최종사용자에 대해 포괄적으로 허가를 받습니다. [유효기간] 가 지역 및 AAA등급은 3년, 나의 1 지역의 AA등급 등은 2년입니다. [신청조건] 가 지역 수출 또는 장기계약/수출실적이 있는 경우 신청 가능합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제28조 신청조건, 제32조 유효기간)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 6] 포괄수출허가(신청)서', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }
      ]
    },
    'COMP_ITEM': {
      title: '품목포괄허가 대상',
      desc: '특정 품목군에 대해 포괄적으로 허가를 받습니다. [유효기간] 원칙적으로 3년입니다. [신청조건] AAA등급이거나, AA등급이면서 최종사용자가 국가/정부기관인 경우에 한해 신청 가능한 강력한 특례입니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제34조 신청조건, 제38조 유효기간)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 6] 포괄수출허가(신청)서', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') }
      ]
    },
    'COMP_CONDITIONAL': {
      title: '제한적 특례 대상',
      desc: '포괄허가 요건에 부합하지 않아 원칙적으로 개별수출허가를 받아야 하나, 일부 조건(계약 체결 전 기술제공 등) 하에 허가면제가 될 수 있습니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'COND_INDIV_EX': {
      title: '[Q5] 개별허가 특례 조건 확인',
      desc: '개별허가를 진행하더라도, 가 지역 수출이거나 기존 동일품목 수출 실적이 있다면 심사면제/서류면제 특례가 적용됩니다.',
      tables: [{ title: '[별표 19] CP 등급별 특례', url: pdfUrl('[별표 19] 자율준수무역거래자 등급별 특례(전략물자 수출입고시).pdf') }], forms: []
    },
    'INDIV_FAST': {
      title: '개별수출허가 (특례 적용)',
      desc: '개별허가를 받되 처리기간이 단축(5~15일)되거나 심사/서류가 면제됩니다. [유효기간] 1년 (1회 연장 가능).',
      tables: [
        { title: '전략물자수출입고시 본문 (제21조 서류의 면제 등, 제25조 유효기간)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 1] 전략물자 수출허가(신청)서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') },
        { title: '[폐지 2026.9.1.] 구 별지 3 수출자 서약서', formId: null, url: pdfUrl('[별지 3] 수출자 서약서(전략물자수출입고시).pdf') }
      ]
    },
    'INDIV_NORMAL': {
      title: '일반 개별수출허가',
      desc: '특례 혜택을 받을 수 없으므로 서약서를 징구하고 전체 심사(15일 소요)를 받습니다. [유효기간] 1년 (필요시 1회 연장 가능).',
      tables: [
        { title: '전략물자수출입고시 본문 (제19조 개별수출허가, 제25조 유효기간)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') },
        { title: '[별표 9~11] 서약서/확인서 양식', url: pdfUrl('[별표 11] 최종사용자 확인서 양식(전략물자수출입고시).pdf') }
      ],
      forms: [
        { title: '[별지 1] 전략물자 수출허가(신청)서', formId: 'L-01', url: pdfUrl('[별지 1] 전략물자(기술)등 수출허가(신청)(거부)서(전략물자수출입고시).pdf') },
        { title: '[별지 2] END-USER STATEMENT', formId: null, url: pdfUrl('[별지 2] STATEMENT BY ULTIMATE CONSIGNEE AND PURCHASER(전략물자수출입고시).pdf') },
        { title: '[폐지 2026.9.1.] 구 별지 3 수출자 서약서', formId: null, url: pdfUrl('[별지 3] 수출자 서약서(전략물자수출입고시).pdf') }
      ]
    },
    'FREE': {
      title: '자유 수출 (허가 면제)',
      desc: '전략물자에 해당하지 않으며 상황허가 요건에도 부합하지 않아 허가 없이 자유롭게 수출 가능합니다.',
      tables: [], forms: []
    },
    'COMP_USER_DOCS': {
      title: '사용자포괄허가 신청 구비서류 (제29조)',
      desc: '포괄수출허가 신청서와 함께 최종수하인 진술서 또는 최종사용자 서약서를 구비해야 합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제29조 신청서류)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 6] 포괄수출허가(신청)서', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') },
        { title: '[별지 2] END-USER STATEMENT', formId: null, url: pdfUrl('[별지 2] STATEMENT BY ULTIMATE CONSIGNEE AND PURCHASER(전략물자수출입고시).pdf') },
        { title: '[별지 2의2] 최종사용자 서약서', formId: null, url: pdfUrl('[별지 2의2] 최종사용자 서약서(전략물자수출입고시).pdf') }
      ]
    },
    'COMP_ITEM_DOCS': {
      title: '품목포괄허가 신청 구비서류 (제35조)',
      desc: '사용자포괄보다 더 방대한 서류가 필요합니다. 계약서, 최종사용자 개요, 프로젝트 설명서, 예상 수출품목 개요 등을 구비해야 합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제35조 신청서류)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 6] 포괄수출허가(신청)서', formId: 'L-02', url: pdfUrl('[별지 6] 포괄수출허가(신청)서 Comprehensive Export License (Application)(전략물자수출입고시).pdf') },
        { title: '[별지 2의2] 최종사용자 서약서', formId: null, url: pdfUrl('[별지 2의2] 최종사용자 서약서(전략물자수출입고시).pdf') }
      ]
    },
    'EXPORT_CUSTOMS': {
      title: '수출 통관 이행 및 장부 기록',
      desc: '발급받은 포괄수출허가번호(또는 개별허가번호)를 수출신고필증에 기재하여 세관에 통관을 진행합니다. 이 때 물품, 수량, 목적지 등을 장부에 철저히 기록해야 합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제70조 통관증명서 제출)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ], forms: []
    },
    'REPORT_DUTY': {
      title: '수출 후 CP기업 정기 실적보고 (제86조)',
      desc: '수출을 이행한 후, [제출기한] 매 반기(또는 연간) 종료 후 1개월 이내에 자율준수무역거래자 실적 보고서(별지 19)를 허가기관에 제출해야 합니다.',
      tables: [
        { title: '전략물자수출입고시 본문 (제86조 보고의무)', url: pdfUrl('전략물자수출입고시(산업통상부고시)(제2025-37호)(20251231).pdf') }
      ],
      forms: [
        { title: '[별지 19] 자율준수무역거래자 실적 보고서', formId: 'K-04', url: pdfUrl('[별지 19] 자율준수무역거래자 실적 보고서(전략물자 수출입고시).pdf') }
      ]
    },
    'CP_DUTY': {
      title: 'CP기업 특례 및 의무 / 사후관리',
      desc: '모든 무역 거래 전반에 걸쳐 적용되는 자율준수체제 지정(별지13~15), 실적보고(별지18~19) 및 위반 제재(별지24 등) 절차입니다.',
      tables: [
        { title: '[별표 7] 표준자율수출관리규정', url: pdfUrl('[별표 7] 표준자율수출관리규정(전략물자수출입고시).pdf') },
        { title: '[별표 22] 위반행위 세부평가 기준표', url: pdfUrl('[별표 22] 위반행위 내용 및 정도 세부평가 기준표(전략물자수출입고시).pdf') }
      ],
      forms: [
        { title: '[별지 13] CP 지정 신청서', formId: 'E-05', url: pdfUrl('[별지 13] 자율준수무역거래자지정 신청서(전략물자수출입고시).pdf') },
        { title: '[별지 18] 체제 운영 보고서', formId: null, url: pdfUrl('[별지 18] 자율준수체제 운영 보고서(전략물자수출입고시).pdf') },
        { title: '[별지 19] 실적 보고서', formId: 'K-04', url: pdfUrl('[별지 19] 자율준수무역거래자 실적 보고서(전략물자 수출입고시).pdf') },
        { title: '[별지 24] 자진신고서', formId: 'J-01', url: pdfUrl('[별지 24] 자진신고서(전략물자수출입고시).pdf') }
      ]
    }
  };

  const modal = container.querySelector('#legal-modal');
  const modalClose = container.querySelector('#legal-modal-close');
  const modalTitle = container.querySelector('#legal-modal-title');
  const modalDesc = container.querySelector('#legal-modal-desc');
  const tableList = container.querySelector('#legal-modal-table-list');
  const formList = container.querySelector('#legal-modal-form-list');

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.showLegalDocs = function(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    let tablesHtml = '';
    data.tables.forEach(tbl => {
      tablesHtml += `
        <div class="doc-item legal-doc-item">
          <span class="material-symbols-rounded" style="color:var(--text-tertiary);">menu_book</span>
          <div style="flex:1;">
            <span>${tbl.title}</span>
          </div>
          <a href="${tbl.url}" target="_blank" class="btn btn-outline" style="padding:4px 8px; font-size:0.8rem;">📄 로컬 열람</a>
        </div>
      `;
    });
    tableList.innerHTML = tablesHtml || '<div style="color:var(--text-tertiary); font-size:0.9rem;">관련된 별표 항목이 없습니다.</div>';

    let formsHtml = '';
    data.forms.forEach(frm => {
      formsHtml += `
        <div class="doc-item legal-doc-item">
          <span class="material-symbols-rounded" style="color:var(--primary-color);">description</span>
          <div style="flex:1;">
            <strong style="color:var(--text-primary);">${frm.title}</strong>
          </div>
          <div style="display:flex; gap:8px;">
            ${frm.formId ? `<button class="btn btn-primary btn-form-link" data-form="${frm.formId}" style="padding:4px 8px; font-size:0.8rem;">사내 작성폼</button>` : ''}
            <a href="${frm.url}" target="_blank" class="btn btn-outline" style="padding:4px 8px; font-size:0.8rem;">📄 로컬 열람</a>
          </div>
        </div>
      `;
    });
    formList.innerHTML = formsHtml || '<div style="color:var(--text-tertiary); font-size:0.9rem;">관련된 법정 서식이 없습니다.</div>';

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
