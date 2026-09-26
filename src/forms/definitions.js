// ============================================
// CP 양식 필드 정의
// 전략물자수출입고시(산업통상부고시 제2025-37호) 기반
// 각 양식의 메타데이터, 필드 구조, 법적 근거, 작성 요령 포함
// ============================================

export const formDefinitions = {
  // ==========================================
  // ==========================================
  // Z. 무역 거래 사전 진단 (Smart Logic Master)
  // ==========================================
  'Z-01': {
    id: 'Z-01',
    title: '무역 거래 사전 진단표 (Master)',
    category: '거래 진단',
    indicator: '3.1.1, 3.2.4 (별표 20: 무역 거래 사전 진단표)',
    timing: '거래 개시 전',
    author: '영업부서, 자율수출관리기구',
    retention: '5년',
    type: 'structured',
    ai_analyzable: false,
    sections: [
      {
        title: '[모드 선택] 시뮬레이션 vs 확정',
        fields: [
          {
            key: 'zeroOneMode',
            label: '🔧 작업 모드 선택',
            type: 'select',
            options: [
              '시뮬레이션 (가상 테스트)',
              '확정 (실제 거래 데이터 입력)'
            ],
            default: '시뮬레이션 (가상 테스트)',
            // [수정] 카드처럼 보이지만 실제로는 클릭해도 반응이 없던 UI(에뮬레이터 UX 점검에서 발견) —
            // 카드 클릭 시 실제로 아래 select의 값을 바꾸고 change 이벤트를 발생시켜 분기 로직이 재평가되도록 함.
            description: '<div style="display:flex; gap:12px; margin-top:8px; flex-wrap:wrap;">' +
              '<div onclick="var s=document.querySelector(\'select[data-field=zeroOneMode]\'); if(s){ s.value=\'시뮬레이션 (가상 테스트)\'; s.dispatchEvent(new Event(\'change\',{bubbles:true})); }" style="flex:1; min-width:200px; cursor:pointer; background:rgba(99,102,241,0.06); padding:10px 14px; border-radius:8px; border-left:3px solid #6366f1;" title="클릭하면 시뮬레이션 모드로 전환됩니다">' +
              '<strong style="color:#4f46e5;">🔬 시뮬레이션 모드</strong><br/>' +
              '<span style="font-size:0.8rem; color:#6b7280; line-height:1.6;">계약 체결 전 가상 시나리오를 입력하여<br/>필요 서류와 허가 트랙을 미리 파악합니다.<br/><em>실제 워크플로우 데이터에 영향을 주지 않음</em></span>' +
              '</div>' +
              '<div onclick="var s=document.querySelector(\'select[data-field=zeroOneMode]\'); if(s){ s.value=\'확정 (실제 거래 데이터 입력)\'; s.dispatchEvent(new Event(\'change\',{bubbles:true})); }" style="flex:1; min-width:200px; cursor:pointer; background:rgba(16,185,129,0.06); padding:10px 14px; border-radius:8px; border-left:3px solid #10b981;" title="클릭하면 확정 모드로 전환됩니다">' +
              '<strong style="color:#059669;">✅ 확정 모드</strong><br/>' +
              '<span style="font-size:0.8rem; color:#6b7280; line-height:1.6;">계약이 확정된 후 실제 거래 정보를 입력합니다.<br/>저장 시 4개 단계(스크리닝·판정·서류·승인)의<br/>모든 데이터가 자동으로 동기화됩니다.</span>' +
              '</div>' +
              '</div>'
          },
          {
            key: 'isConfirmed',
            label: '확정 동기화 플래그 (내부)',
            type: 'hidden',
            default: false
          }
        ]
      },
      {
        title: '[섹션 0] 4대 거래 당사자 확인 및 하이브리드 스크리닝',
        fields: [
          { key: 'q0_buyer', label: '구매자 (Buyer / Purchaser)', type: 'party_with_country', placeholder: '영문 상호명 입력' },
          { key: 'q0_consignee', label: '최종수하인 (Ultimate Consignee)', type: 'party_with_country', placeholder: '영문 상호명 입력' },
          { key: 'q0_end_user', label: '최종사용자 (End-User)', type: 'party_with_country', placeholder: '영문 상호명 입력' },
          { key: 'q0_agent', label: '중개인 / 대리점 (Intermediate Consignee / Agent)', type: 'party_with_country', placeholder: '영문 상호명 입력' },
          { 
            key: 'q0_csl_scan', 
            label: 'US CSL API 실시간 4대 당사자 스크리닝', 
            type: 'csl_api_scan', 
            description: '위 입력된 4개 상호명을 미국 상무부(BIS) 우려거래자 리스트와 실시간으로 대조합니다.' 
          },
          { 
            key: 'q0_red_flags', 
            label: '의심징후 (WMD Red Flags) 체크', 
            type: 'checkbox_group', 
            options: [
              "[RF-01] 구매자/최종사용자가 설치 장소나 사용 목적 밝히기를 거부함",
              "[RF-02] 주문 품목이 구매자의 통상적인 사업/기술 수준과 현저히 불일치함",
              "[RF-03] 현금 전액 선결제, 3국 우회 송금 등 비정상적 결제 방식 요구",
              "[RF-04] 우회 경로 이용, 군사지역 인근 배송, 비정상적 포장/라벨링 요청",
              "[RF-05] 고도 기술 품목임에도 설치, 시험운전, 유지보수 지원을 일체 거부함",
              "[RF-06] 최종 목적지가 수출통제 우려국가(우크라이나 상황 관련국 등) 인접국임",
              "[RF-07] 설비 규모에 비해 과도하게 많은 양의 예비부품/소모품을 주문함",
              "[RF-08] 최종사용자가 군사/방산기관 또는 WMD 의혹 연구소와 연관됨",
              "[RF-09] 상용 목적과 무관한 극한 환경 사양(고온/고압/내방사선 등) 고집",
              "[RF-10] 웹사이트/사업자등록증 제공 기피, 연락처가 사서함/임대 사무실임",
              "[RF-11] 국내 거래 후 우려국가로의 미인가 재수출(우회수출)이 의심됨",
              "[RF-12] 무역안보관리원/국가정보원 등으로부터 주의 통보받은 기업임"
            ],
            description: '발견된 의심 징후가 있다면 체크해 주세요. 1개라도 체크 시 거래 보류(Stop-Shipment) 대상이 될 수 있습니다.'
          },
          {
            key: 'q0_pipeline_trigger',
            label: '스크리닝 트리거 상태',
            type: 'hidden',
            default: 'SAFE'
          }
        ]
      },
      {
        title: '🚨 긴급 조치: 실무 대응 파이프라인 (5단계)',
        dependsOn: { field: 'q0_pipeline_trigger', value: 'HIT' },
        fields: [
          {
            key: 'q0_pipeline_action',
            label: '현재까지 취한 실무 대응 조치를 선택하세요',
            type: 'select',
            options: [
              '', 
              '[보류] 거래 및 출하 즉시 보류 (G-04 작성 대기)',
              '[보고] 자율수출관리관 및 대표이사(CEO) 대면 보고 완료',
              '[소명] 동명이인 정밀 대조 및 영업팀 소명자료(최종사용자 서약서 등) 징구',
              '[정부 심사] 무역안보관리원 질의 및 상황허가(Catch-all) 정식 신청 대기',
              '[결과] 정부 허가 거부로 계약 파기 / 허가 승인으로 예외적 출하'
            ]
          },
          {
            key: 'q0_pipeline_info_1',
            label: '💡 G-04 절차중단 및 내부보고서 작성 안내',
            type: 'info',
            content: '즉시 영업팀에 보류 통보를 하시고, <strong>[G-04] 절차중단 및 내부보고서</strong> 양식을 새 서류로 추가하여 작성하십시오.',
            dependsOn: { field: 'q0_pipeline_action', value: '[보류] 거래 및 출하 즉시 보류 (G-04 작성 대기)' }
          },
          {
            key: 'q0_pipeline_info_2',
            label: '💡 내부 보고 가이드',
            type: 'info',
            content: '우려거래자 스크리닝 결과와 의심 정황을 정리하여 <strong>자율수출관리관(기구의 장) 및 대표이사(CEO)에게 즉시 서면/대면 보고</strong>를 진행해야 합니다.',
            dependsOn: { field: 'q0_pipeline_action', value: '[보고] 자율수출관리관 및 대표이사(CEO) 대면 보고 완료' }
          },
          {
            key: 'q0_pipeline_info_3',
            label: '💡 Due Diligence (소명자료 징구)',
            type: 'info',
            content: '영문 스펠링 동명이인 여부를 정밀 대조(사업자등록증, 주소지 등)하고, 바이어에게 <strong>최종사용자 서약서(End-User Statement)</strong>, <strong>제품의 최종 사용 목적 소명서</strong> 제출을 공식 요구하십시오.',
            dependsOn: { field: 'q0_pipeline_action', value: '[소명] 동명이인 정밀 대조 및 영업팀 소명자료(최종사용자 서약서 등) 징구' }
          },
          {
            key: 'q0_pipeline_info_4',
            label: '💡 상황허가(Catch-all) 법적 경고',
            type: 'info',
            content: '<strong style="color:var(--accent-red);">법적 경고:</strong> 의심 정황이 해소되지 않은 상태에서 비전략물자를 임의로 수출하면 대외무역법 위반(형사처벌)이 됩니다.<br/>예스트레이드(YesTrade)를 통해 상황허가를 정식 신청하거나, 무역안보관리원에 공식 문의하십시오.',
            dependsOn: { field: 'q0_pipeline_action', value: '[정부 심사] 무역안보관리원 질의 및 상황허가(Catch-all) 정식 신청 대기' }
          },
          {
            key: 'q0_pipeline_result',
            label: '정부 심사 최종 결과',
            type: 'select',
            options: ['', '정부 허가 거부 (계약 파기)', '정부 상황허가 승인 (출하 허용)'],
            dependsOn: { field: 'q0_pipeline_action', value: '[결과] 정부 허가 거부로 계약 파기 / 허가 승인으로 예외적 출하' }
          },
          {
            key: 'q0_pipeline_result_reject',
            label: '💡 계약 파기 및 이력 보존',
            type: 'info',
            content: '수출 계약을 최종 거절/파기합니다. 해당 이력을 <strong>[G-02] 우려거래자 대장</strong>과 <strong>[G-04] 절차중단 대장</strong>에 기록하여 5년간 의무 보존하십시오.',
            dependsOn: { field: 'q0_pipeline_result', value: '정부 허가 거부 (계약 파기)' }
          },
          {
            key: 'q0_pipeline_already_shipped',
            label: '💡 긴급 질문: 이미 제품(S/W, 라이선스 키 등)이 고객에게 인도되었습니까?',
            type: 'select',
            options: ['', '예 (사후 통제 위반 인지)', '아니오 (사전 차단 성공)']
            // 항상 보이거나, 특정 조건일 때 보이도록 할 수 있지만, 안전을 위해 HIT 시 항상 표시
          },
          {
            key: 'q0_pipeline_emergency',
            label: '🚨 사후 통제 위반 비상사태 지침',
            type: 'info',
            content: '<strong style="color:red;">즉시 서버 접근 권한을 차단하고 발급된 라이선스 키를 무효화(Revoke)하십시오!</strong><br/><br/>대외무역법 위반 소지가 있습니다. 행정처분 및 과태료 감경을 받기 위해, 무역안보관리원/산업통상자원부에 제출할 <strong>자진신고서(J-01)</strong>와 <strong>재발방지 계획서(J-02)</strong> 양식을 즉시 작성하여 CP 책임자에게 긴급 보고해야 합니다.',
            dependsOn: { field: 'q0_pipeline_already_shipped', value: '예 (사후 통제 위반 인지)' }
          }
        ]
      },

      {
        title: '[섹션 2] 무역 거래의 기본 유형 및 목적국',
        fields: [
          { key: 'q0_type', label: 'Q0. 본 무역 거래의 기본 유형은 무엇입니까?', type: 'select', options: ['', '수출', '수입', '중개', '환적/경유'] },
          { 
            key: 'q_country', 
            label: 'Q0-1. 수출 대상 국가 (스마트 콤보박스)', 
            type: 'destination_combobox', 
            dependsOn: { field: 'q0_type', value: '수출' } 
          },
          { 
            key: 'q_region', 
            label: 'Q0-2. 수출 대상 국가(지역) 그룹 판정결과', 
            type: 'text', 
            readonly: true, 
            description: '선택한 국가에 따라 전략물자 수출통제 기준 그룹이 자동 판정됩니다.', 
            dependsOn: { field: 'q0_type', value: '수출' } 
          },
          {
            key: 'q0_transfer_type',
            label: 'Q0-3. 수출 형태 (물리적 화물 vs 무형의 기술이전)',
            type: 'select',
            options: ['', '물리적 화물 수출 (세관 통관)', '무형의 기술 이전 (이메일, 클라우드, 서버 다운로드 등)'],
            description: '💡 소스코드 전송, S/W 라이선스 키 발급, 암호화 알고리즘 도면 제공 등 물리적 형태가 없는 전송도 무형이전(ITT) 수출로 간주됩니다.',
            dependsOn: { field: 'q0_type', value: '수출' }
          }
        ]
      },
      {
        title: '[섹션 2] 수출 통제 검토 (관할 부처 및 전략물자 판정)',
        dependsOn: { field: 'q0_type', value: '수출' },
        fields: [
          {
            key: 'q_defense',
            label: 'Q1. 수출 품목이 「방위사업법」 제57조제2항에 따른 방위산업물자 또는 국방과학기술에 해당합니까?',
            type: 'select',
            options: ['', '예', '아니오', '모름'],
            description: '💡 방산물자 여부 판정 기준은 방위사업청 소관입니다.',
          },
          {
            key: 'q_defense_yes',
            label: '🛡️ [방위사업청 관할 안내]',
            type: 'info',
            content: '본 품목은 방위사업청 관할입니다. 본 시스템의 산업부용 서식(L-01 등) 작성은 면제되오니, 해당 수출 건은 방산용 트랙으로 별도 관리하시고 <a href="https://www.d4b.go.kr" target="_blank" style="color:var(--accent-blue); text-decoration:underline; font-weight:bold;">방산수출입지원시스템(D4B)</a>에 접속하여 수출허가를 진행하시기 바랍니다.<br/><br/><div style="background:rgba(59,130,246,0.05); padding:10px; border-radius:6px; border-left:3px solid var(--accent-blue); font-size:0.8rem; line-height:1.5;"><strong>💡 자율준수무역거래자(AA등급) 방위사업청 수출 특례 혜택</strong><br/>방위사업청 관할(D4B) 수출허가 진행 시에도 CP기업은 다음 혜택을 적용받을 수 있습니다.<br/>1. <strong>심사 기간 단축:</strong> 개별수출허가 처리 기간 대폭 단축 (예: 15일 ➔ 5일)<br/>2. <strong>서류 제출 면제:</strong> 과거 수출실적이 있는 품목을 동일 최종사용자에게 재수출 시 계약서 등 일부 서류 면제<br/>3. <strong>중개허가 특례:</strong> 상황허가 대상이 아닌 비민감 품목의 경우 중개허가<span style="color:#666; font-size:0.75rem;">(국내를 거치지 않고 제3국에서 다른 제3국으로 수출되는 것을 알선·중개하는 행위에 대한 허가)</span> 의무 면제</div><br/><span style="font-size:0.75rem; color:var(--text-secondary);"><strong>⚖️ 법적 근거:</strong> 「대외무역법」 제19조의2 단서조항 (「방위사업법」 제57조제2항에 따라 허가를 받은 방위산업물자 및 국방과학기술은 대외무역법상 수출허가 면제)</span>',
            dependsOn: { field: 'q_defense', value: '예' }
          },
          {
            key: 'q_defense_unsure',
            label: '⚠️ [방산물자 여부 미확인 시 주의사항]',
            type: 'info',
            content: '방산물자 여부가 불확실한 경우 먼저 <strong>방위사업청 방산수출입 콜센터(☎ 1577-1118)</strong>에 문의하시기 바랍니다.<br/>만약 방사청 소관이 아닌 일반 품목이라면 대외무역법에 따라 산업통상자원부장관 등 관계 행정기관의 허가를 받아야 하므로, <strong>아래의 Q2 문항을 계속해서 검토</strong>하시기 바랍니다.<br/><br/><span style="font-size:0.75rem; color:var(--text-secondary);"><strong>⚖️ 법적 근거:</strong> 「대외무역법」 제19조의2 (전략물자를 수출하려는 자는 산업통상자원부장관이나 관계 행정기관의 장의 허가를 받아야 함)</span>',
            dependsOn: { field: 'q_defense', value: '모름' }
          },
          { 
            key: 'q_strategic', 
            label: 'Q2. 취급 품목이 통제리스트에 기재된 전략물자에 해당합니까?', 
            type: 'select', 
            options: ['', '해당', '비해당'], 
            description: `<div style="margin-top:6px; line-height:1.6; color:var(--text-secondary); background:rgba(59,130,246,0.04); padding:10px 14px; border-radius:6px; border-left:3px solid var(--accent-blue);">
  <strong style="color:var(--accent-blue); font-size:0.88rem;">📖 '통제리스트(Control List)'의 법적 정의 및 위치</strong><br/>
  • <strong>법적 근거:</strong> 「대외무역법」 제19조 및 <strong>「전략물자수출입고시」 제3조 및 [별표 2](이중용도품목) / [별표 3](군용물자)</strong><br/>
  • <strong>국제 체제:</strong> 4대 국제수출통제체제(바세나르, MTCR, NSG, AG)가 합의한 통제목록으로, 무기뿐만 아니라 민간용/군용 겸용 가능한 제품·SW·기술을 <strong>카테고리 0~9</strong>로 분류합니다.<br/>
  • <strong>소프트웨어/IT 기준:</strong> 차량용 암호화 통신/보안 SW 등의 경우 <strong>카테고리 5 (통신 및 정보보안) - 통제번호 5D002</strong>에 해당합니다.
</div>
<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
  <button type="button" class="btn btn-secondary btn-nav-search-dual" style="font-size:0.8rem; padding:6px 12px; display:inline-flex; align-items:center; gap:4px;">
    <span class="material-symbols-rounded" style="font-size:1rem;">search</span>시스템 내장 [별표 2] 통제목록 검색기 열기
  </button>
  <button type="button" class="btn btn-secondary" onclick="window.open('https://www.yestrade.go.kr', '_blank')" style="font-size:0.8rem; padding:6px 12px; display:inline-flex; align-items:center; gap:4px;">
    <span class="material-symbols-rounded" style="font-size:1rem;">open_in_new</span>YesTrade 공식 통제번호 조회
  </button>
  <button type="button" class="btn btn-secondary" onclick="window.open('https://www.law.go.kr/행정규칙/전략물자수출입고시', '_blank')" style="font-size:0.8rem; padding:6px 12px; display:inline-flex; align-items:center; gap:4px;">
    <span class="material-symbols-rounded" style="font-size:1rem;">gavel</span>고시 [별표 2] 법령 원문 보기
  </button>
  <button type="button" class="btn btn-secondary" onclick="window.open('/docs/전략물자 판정기준 해석 세부지침(250923).hwp', '_blank')" style="font-size:0.8rem; padding:6px 12px; display:inline-flex; align-items:center; gap:4px; border: 1px solid var(--accent-purple); color: var(--accent-purple);">
    <span class="material-symbols-rounded" style="font-size:1rem;">download</span>판정기준 해석 세부지침 다운로드
  </button>
</div>
<div style="font-size:0.78rem; color:var(--text-tertiary); margin-top:6px;">
  💡 통제번호 검색기를 통해 HS Code 및 통제번호, 통제 사유를 면밀히 검토하십시오.
</div>`, 
            dependsOn: { field: 'q_defense', value: '아니오,모름' } 
          },
          {
            key: 'q_us_ear',
            label: 'Q2-1. 미국산 통제 품목/부품이 포함되어 있습니까? (US EAR 재수출 통제 검토)',
            type: 'select',
            options: ['', '아니오 (순수 국산/기타 국가)', '예 (미국산 부품/소프트웨어 포함)'],
            description: '💡 미국산 부품이 일정 비율 이상 포함된 외국산 제품을 제3국으로 수출할 때, 미국 상무부(BIS)의 허가를 별도로 받아야 하는 <strong>De minimis(최소 허용 비율)</strong> 규칙이 적용될 수 있습니다.<br/><span style="color:var(--text-secondary); font-size:0.85rem;">※ 비율 계산법: (미국산 원산지 통제 품목 가치 / 완성품 총 가치) × 100<br/>(테러지원국 등 수출 금지국은 >10%, 그 외 국가는 >25% 초과 시 BIS 통제 대상)</span>',
            dependsOn: { field: 'q_defense', value: '아니오,모름' }
          },
          { 
            key: 'q_exempt', 
            label: 'Q3. 허가면제요건(고시 제26조)에 해당합니까?', 
            type: 'select', 
            options: ['', '예', '아니오'], 
            dependsOn: { field: 'q_strategic', value: '해당' },
            description: '💡 고시 제26조(허가의 면제 등)에 따라 특정 요건(소액, 공공용, 수리용, 전시용 등)을 충족할 경우 사전 허가가 면제될 수 있습니다.',
            externalLink: { label: '전략물자수출입고시 제26조 전문 확인', url: 'https://www.law.go.kr/행정규칙/전략물자수출입고시' }
          },
          { 
            key: 'q_exempt_reason', 
            label: 'Q3-A. 허가면제 사유 선택 (고시 제26조제1항)', 
            type: 'select', 
            options: [
              '',
              '1. 미화 1만불 이하 무상수출 (소액 면제)',
              '2. 재외공관, 해외파견 근무자 등 공용/사용 목적',
              '3. 고장난 물품을 수리 목적으로 원수출자에게 반환',
              '4. 수입한 물품을 국내에서 수리 후 원래 수출국으로 재수출',
              '5. 박람회, 전시회 출품용으로 반출 후 다시 반입',
              '6. 기타 (고시 제26조 참조)'
            ],
            dependsOn: { field: 'q_exempt', value: '예' }
          },
          { key: 'q_exclude', label: 'Q3-1. 포괄허가 원천 배제 품목(별표8: 초민감/군용 등)입니까?', type: 'select', options: ['', '예', '아니오'], dependsOn: { field: 'q_exempt', value: '아니오' } },
          { 
            key: 'q_cp_grade',
            label: 'Q3-2. 귀사의 CP 등급은?',
            type: 'readonly',
            description: 'ℹ️ CP 등급은 대시보드 설정(회사정보)에 입력한 단기 목표 등급을 자동으로 참조합니다. 수정 필요 시 대시보드 화면 상단의 [회사정보 저장] 버튼을 이용하세요.',
            autoFillFrom: 'targetGrade',
            dependsOn: { field: 'q_exclude', value: '아니오' }
          },
          { key: 'q_gov', label: 'Q3-3. 수입국의 최종사용자가 국가 또는 정부기관입니까?', type: 'select', options: ['', '예', '아니오'], dependsOn: { field: 'q_exclude', value: '아니오' } },
          { key: 'q_indiv_fast', label: 'Q3-4. 가 지역 수출이거나 기존 동일 품목 수출실적이 있습니까?', type: 'select', options: ['', '예', '아니오'], dependsOn: { field: 'q_exclude', value: '예' } }
        ]
      },
      {
        title: '[섹션 2-B] 상황허가(Catch-All) 정밀 검토 (※ 전략물자 \'비해당\' 시 하위 분기)',
        dependsOn: { field: 'q_strategic', value: '비해당' },
        fields: [
          { 
            key: 'q_catchall', 
            label: 'Q4. 상황허가 대상품목(별표 2의 2)에 해당합니까?', 
            type: 'select', 
            options: ['', '예', '아니오'],
            description: '💡 어떤 품목이 상황허가 대상인지 확인이 필요하신가요?<br/><button type="button" class="btn btn-secondary btn-nav-search" style="margin-top:6px; font-size:0.8rem; padding:6px 12px; display:inline-flex; align-items:center; gap:4px;"><span class="material-symbols-rounded" style="font-size:1rem;">search</span>시스템 내장 [별표 2의 2] 품목 검색기 열기</button>',
            dependsOn: { field: 'q_region', value: ['나의1 지역', '그 외 지역'] }
          },
          { key: 'q_denied', label: 'Q5. 수입자/최종사용자가 우려거래대상자(DPL) 명단에 포함되어 있습니까?', type: 'select', options: ['', '예', '아니오'], description: '🔗 우려거래대상자 여부는 YesTrade 시스템에서 확인해야 합니다.', externalLink: { url: 'https://www.yestrade.go.kr', label: 'YesTrade 우려거래자 조회하기' } },
          { key: 'q_redflag', label: 'Q6. 대량파괴무기 전용 의심징후(Red Flags)가 있습니까?', type: 'select', options: ['', '예', '아니오'] }
        ]
      },
      {
        title: '[섹션 3] 기타 거래 검토 (수입/환적 등)',
        dependsOn: { field: 'q0_type', value: ['수입', '중개', '환적/경유'] },
        fields: [
          { key: 'q_import_req', label: 'Q_Import. 수출국 정부에서 수입목적확인서나 통관증명을 요구합니까?', type: 'select', options: ['', '예', '아니오'], dependsOn: { field: 'q0_type', value: '수입' } },
          { key: 'q_transit_req', label: 'Q_Transit. 허가 대상 환적/중개 거래입니까?', type: 'select', options: ['', '예', '아니오'], dependsOn: { field: 'q0_type', value: '환적/경유,중개' } }
        ]
      },
      {
        title: '[섹션 4] 최종 진단 결과',
        fields: [
          {
            key: 'q_result',
            label: '자동 판정 결과 안내',
            type: 'result_panel',
            description: '입력된 정보를 기반으로 시스템이 추론한 허가/통제 사항입니다.'
          },
          {
            key: 'confirmActionInfo',
            label: '💡 확정 모드 안내',
            type: 'info',
            text: '<div style="background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.3); padding:12px 16px; border-radius:8px; line-height:1.7; font-size:0.85rem;">' +
              '<strong style="color:#059669;">✅ 확정 모드가 활성화되어 있습니다.</strong><br/>' +
              '이 양식을 저장하면 위에 입력한 <strong>당사자 정보, 수출 목적국, 거래 유형</strong>이<br/>' +
              'Step 1(스크리닝), Step 2(판정), Step 4(승인) 데이터에 자동으로 반영됩니다.<br/>' +
              '<span style="color:#6b7280; font-size:0.8rem;">시뮬레이션 모드일 때는 저장해도 실제 데이터에 영향을 주지 않습니다.</span>' +
              '</div>',
            dependsOn: { field: 'zeroOneMode', value: '확정 (실제 거래 데이터 입력)' }
          }
        ]
      }
    ],
    guide: '스마트 분기(Skip Logic)가 적용되어 답변에 따라 필요한 후속 질문만 나타납니다. 모든 질문에 답하시면 좌측 메뉴의 필수 서류들이 자동으로 활성화됩니다. 항목별 가이드 및 AI 분석 기능을 적극 활용해 보세요.'
  },

  // ==========================================
  // M. 수입 관련 서식
  // ==========================================
  'M-01': {
    id: 'M-01',
    title: '수입목적확인(신청)서 (별지 제7호)',
    category: '수입',
    indicator: '대외무역법 제27조 (수입목적확인서)', // [수정] 제23조는 고시 위임 일반조항 — 수입목적확인서의 실제 근거는 제27조
    legalBasis: '전략물자수출입고시 제61조①(수입목적확인서의 발급)',
    timing: '수출국이 수입목적확인서 제출을 요구할 때, 통관 전 신청',
    author: '수입담당자',
    retention: '5년',
    // [정리] 이 서식은 formTemplates.js의 hasFormTemplate('M-01')=true → tmpl_07()로 실제 화면이 렌더링됩니다.
    // renderer.js는 hasFormTemplate가 true면 switch(formDef.type)에 도달하지 않으므로
    // 여기에 type/sections를 둬도 화면에 반영되지 않습니다. 필드를 고치려면 formTemplates.js의 tmpl_07을 수정하세요.
    guide: '수출국으로부터 수입목적확인서 제출을 요구받으면 별지 제7호 서식으로 발급기관(제8조)에 신청합니다. 신청 시 별지 제8호(M-02 수입내역 신고서)와 수입계약서를 첨부해야 합니다(제61조①). 발급 후에는 원본 PDF를 첨부해 보관하세요(유효기간 발급일로부터 12개월).'
  },
  'M-02': {
    id: 'M-02',
    title: '수입내역 신고서 (별지 제8호)',
    category: '수입',
    indicator: '대외무역법 제27조 (수입목적확인서 첨부서류)',
    legalBasis: '전략물자수출입고시 제61조①1호(별지 제7호 신청 시 첨부서류)', // [수정] "제66조"는 오류(제66조는 미사용 수입목적확인서 반환 조항). 별지8 원문도 "제61조의 규정에 의하여 신고합니다"라고 명시.
    // [수정] 이전엔 "통관 후 1개월 이내 사후신고"로 되어 있었으나, 원문(제61조①1호)상 별지8은
    // M-01(수입목적확인신청서) 신청 시 함께 제출하는 첨부서류다. 통관 이후 서류가 아니라 신청 전 서류.
    timing: 'M-01(수입목적확인신청서) 신청과 동시에 첨부 제출',
    author: '수입담당자',
    retention: '5년',
    // [정리] hasFormTemplate('M-02')=true → tmpl_08()로 렌더링됩니다. type/sections는 사용되지 않습니다.
    // 필드를 고치려면 formTemplates.js의 tmpl_08을 수정하세요.
    guide: '이 서식은 별지 제7호(M-01) 수입목적확인 신청 시 반드시 함께 제출해야 하는 첨부서류입니다(제61조①1호). "수입내역 신고서"라는 이름과 달리 통관 이후에 제출하는 사후 보고서가 아니라, 신청 시점의 첨부서류입니다.'
  },
  'M-03': {
    id: 'M-03',
    title: '통관증명(신청)서 (별지 제9호)',
    category: '수입',
    indicator: '대외무역법 제27조 (수입목적확인서 사후관리)',
    legalBasis: '전략물자수출입고시 제72조',
    timing: '수출국이 통관증명을 요구할 때, 수입통관 완료 후 신청',
    author: '수입담당자',
    retention: '5년',
    // [정리] hasFormTemplate('M-03')=true → tmpl_09()로 렌더링됩니다. type/sections는 사용되지 않습니다.
    // 필드를 고치려면 formTemplates.js의 tmpl_09를 수정하세요.
    guide: '수출국이 통관 사실 증명을 요구할 때 관세청(세관장)에 신청하여 발급받는 별지 제9호 서식입니다. M-01(수입목적확인서)과 연동되므로 확인서번호를 함께 기재하세요.'
  },
  'L-01': {
    id: 'L-01',
    title: '전략물자 개별수출허가신청서 (별지 제1호)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4 (별표 20: 사내 수출허가심사 절차 이행)', // [수정] 3.1.2는 "판정 시점"(계약체결/이행 이전 여부)을 심사하는 지표로 허가신청서 자체와 무관
    legalBasis: '전략물자수출입고시 제19조 (개별수출허가)',
    timing: '수출 계약 후 선적 전',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    approverRole: 'Master', // 자율수출관리규정 제33조② — 수출허가·상황허가 신청은 위임 제외, 대표이사 결재
    approverRoleLabel: '대표이사',
    type: 'structured',
    sections: [
      {
        title: '① 수출자',
        fields: [
          { key: 'exporterCompany', label: '상호', type: 'text' },
          { key: 'exporterCeo', label: '대표자', type: 'text' },
          { key: 'exporterRegNum', label: '사업자등록번호', type: 'text' },
          { key: 'exporterAddress', label: '주소', type: 'text' },
          { key: 'exporterPhone', label: '전화번호', type: 'text' },
        ]
      },
      {
        // [수정] 원문 ④ 제조자(Manufacturer), ⑥ 최종수하인(Ultimate Consignee — 구매자·최종사용자와 별개
        // 당사자)이 통째로 빠져 있었음. 중개허가의 경우 제조자란에 수출국·수출자를 기재해야 함도 반영.
        title: '② 구매자·제조자·최종수하인·최종사용자',
        fields: [
          { key: 'buyerName', label: '③ 구매자 상호', type: 'text' },
          { key: 'buyerPhone', label: '③ 구매자 전화번호', type: 'text' },
          { key: 'buyerAddress', label: '③ 구매자 주소 (중개허가 시 수입국·수입자)', type: 'text' },
          { key: 'manufacturerName', label: '④ 제조자 상호', type: 'text' },
          { key: 'manufacturerPhone', label: '④ 제조자 전화번호', type: 'text' },
          { key: 'manufacturerAddress', label: '④ 제조자 주소 (중개허가 시 수출국·수출자)', type: 'text' },
          { key: 'consigneeName', label: '⑥ 최종수하인 상호 (③과 같으면 "③과 동")', type: 'text' },
          { key: 'consigneePhone', label: '⑥ 최종수하인 전화번호', type: 'text' },
          { key: 'consigneeAddress', label: '⑥ 최종수하인 주소', type: 'text' },
          { key: 'endUserName', label: '⑦ 최종사용자 상호 (⑥과 같으면 "⑥과 동")', type: 'text' },
          { key: 'endUserPhone', label: '⑦ 최종사용자 전화번호', type: 'text' },
          { key: 'endUserAddress', label: '⑦ 최종사용자 주소', type: 'text' },
          { key: 'destCountry', label: '⑨ 최종목적지국가', type: 'text', autoFillFrom: 'destinationCountry' },
          { key: 'destinationRegion', label: '수출통제 지역(그룹)', type: 'text', readonly: true, autoFillFrom: 'destinationRegion' },
        ]
      },
      {
        // [수정] 원문 ⑧ 허가신청 사유(8종 체크) 항목이 빠져 있어, 어떤 종류의 허가를 신청하는지
        // 구분할 방법이 없었음.
        title: '⑧ 허가신청 사유',
        fields: [
          { key: 'applicationReason', label: '허가신청 사유 (해당란에 체크)', type: 'select', options: ['', '개별수출허가 신청', '개별수출허가(기술) 신청', '원자력플랜트기술수출 신청', '군함설계기술수출 신청', '상황허가 신청', '중개허가 신청', '경유허가 신청', '환적허가 신청'] },
        ]
      },
      {
        title: '③ 수출 거래 정보',
        fields: [
          { key: 'paymentMethod', label: '결제방법', type: 'text' },
          { key: 'expectedShipmentDate', label: '선적예정일', type: 'date' },
          { key: 'exportPurpose', label: '수출목적', type: 'text' },
        ]
      },
      {
        title: '④ 수출물품 내역',
        fields: [
          { key: 'classNo', label: '⑫ 판정번호', type: 'text' }, // [수정] 누락돼 있던 판정번호 필드 추가
          { key: 'hsCode', label: '⑬ HS 번호', type: 'text' },
          { key: 'controlNo', label: '⑭ 통제번호', type: 'text' },
          { key: 'itemName', label: '⑮ 품명 및 규격', type: 'text' },
          { key: 'quantity', label: '⑯ 수량', type: 'text' },
          { key: 'unitPrice', label: '단가(USD)', type: 'text' },
          { key: 'amount', label: '⑰ 가액(USD)', type: 'text' },
          { key: 'endUseText', label: '⑱ 최종사용용도', type: 'textarea' },
        ]
      },
      {
        title: '⑤ 기타 정보',
        fields: [
          { key: 'permitCondition', label: '허가조건', type: 'text' },
          { key: 'receiptNo', label: '접수번호', type: 'text' },
          { key: 'receiptDate', label: '접수일자', type: 'date' },
          { key: 'signYear', label: '서명 연도', type: 'text' },
          { key: 'signMonth', label: '서명 월', type: 'text' },
          { key: 'signDay', label: '서명 일', type: 'text' },
        ]
      },
      {
        title: '⑥ 정부 허가 발급 내역 (결과 수령 후)',
        fields: [
          { key: 'q_permit_number', label: '정부 허가증 번호', type: 'text', placeholder: '발급받은 개별수출허가증 번호를 기입하세요' },
          { key: 'q_permit_date', label: '허가 발급일자', type: 'date' },
          { key: 'q_permit_attachment', label: '허가증 사본 첨부', type: 'file' }
        ]
      },
      {
        title: '⑦ 법정 구비서류 (첨부물)',
        fields: [
          {
            key: 'cpExemptionNotice',
            label: '🌟 [자율준수무역거래자 특례 안내]',
            type: 'info',
            text: '<div style="color:var(--accent-teal); font-weight:bold; margin-bottom:4px;">[서류 제출 면제 대상]</div><div style="font-size:0.85rem; line-height:1.5;">수출 목적지가 "가 지역"이므로 고시 제21조에 따라 <strong>수출신용장(계약서), 수출자서약서, 최종사용자서약서(EUS) 등 증빙서류 제출이 전면 면제</strong>됩니다.</div>',
            dependsOn: { field: 'destinationRegion', value: ['가 지역'] }
          },
          { key: 'attachEUS', label: '최종사용자서약서 (EUS)', type: 'select', options: ['', '구비 완료', '해당 없음'], dependsOn: { field: 'destinationRegion', value: ['나의1 지역', '나의2 지역', '다 지역', '그 외 지역'] } },
          { key: 'attachContract', label: '수출계약서 (또는 P.O)', type: 'select', options: ['', '구비 완료', '해당 없음'], dependsOn: { field: 'destinationRegion', value: ['나의1 지역', '나의2 지역', '다 지역', '그 외 지역'] } },
          { key: 'attachCompanyCert', label: '영업증명서 (사업자등록증)', type: 'select', options: ['', '구비 완료', '해당 없음'] },
        ]
      }
    ],
    guide: '개별수출허가는 별지 제1호 서식을 사용합니다. 템플릿 엔진을 통해 관공서 제출용 HTML 폼으로 자동 변환됩니다.'
  },
  'L-02': {
    id: 'L-02',
    title: '전략물자 포괄수출허가신청서 (별지 제6호)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4, 3.2.6 (별표 20: 사내 수출허가심사 절차·포괄수출 사후관리)', // [수정] 3.1.2는 판정 시점 지표로 허가신청서와 무관
    legalBasis: '전략물자수출입고시 제28조(사용자포괄수출허가)·제34조(품목포괄수출허가), 신청서류는 제29조·제35조', // [수정] 제23조는 개별수출허가 처리기한 조항 — 포괄수출허가 근거가 아님
    timing: '수출 계약 전/후',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    approverRole: 'Master', // 자율수출관리규정 제33조② — 수출허가·상황허가 신청은 위임 제외, 대표이사 결재
    approverRoleLabel: '대표이사',
    type: 'structured',
    sections: [
      {
        title: '① 신청인(수출자)',
        fields: [
          { key: 'exporterCompany', label: '상호', type: 'text' },
          { key: 'exporterCeo', label: '대표자', type: 'text' },
          { key: 'cpGrade', label: 'CP 지정등급', type: 'text', default: 'AA' },
          { key: 'exporterAddress', label: '주소', type: 'text' },
          { key: 'exporterPhone', label: '전화번호', type: 'text' }, // [수정] 누락
          { key: 'exporterRegNum', label: '사업자등록번호', type: 'text' }, // [수정] 누락
          { key: 'exporterTradeBizNo', label: '무역업고유번호', type: 'text' }, // [수정] 누락
        ]
      },
      {
        // [수정] 품명·규격(⑤), 비고(⑥) 및 신청유형별 기입요령이 빠져 있었음(품목포괄은 ③~⑤·⑫~⑬ 생략,
        // 사용자포괄은 ⑧~⑬ 생략 — 원문 각주 반영).
        title: '② 포괄수출허가 대상물품 (② 품목 명세)',
        fields: [
          { key: 'permitType', label: '신청 유형', type: 'select', options: ['', '사용자포괄', '품목포괄'] },
          { key: 'itemDescription', label: '② 대상물품/수출 예상 품목 명세', type: 'textarea' },
          { key: 'hsCode', label: '③ HS 번호 (품목포괄 시에만 기입)', type: 'text' },
          { key: 'controlNo', label: '④ 통제번호', type: 'text' },
          { key: 'itemSpec', label: '⑤ 품명 및 규격 (품목포괄 시에만 기입)', type: 'text' },
          { key: 'note', label: '⑥ 비고', type: 'text' },
        ]
      },
      {
        title: '⑦~⑪ 거래상대방 및 목적지',
        fields: [
          { key: 'buyerOrConsignee', label: '⑦ 구매자 또는 최종수하인 (상호, 주소)', type: 'textarea' },
          { key: 'endUsers', label: '⑧ 최종사용자 (상호, 주소) — 사용자포괄 시에만 기입', type: 'textarea' },
          { key: 'endUseOrProject', label: '⑨ 최종용도 또는 사업명 — 사용자포괄 시에만 기입', type: 'text' },
          { key: 'destCountry', label: '⑩ 목적지국가 (품목포괄 시 최종수하인 소재국)', type: 'text' },
          { key: 'finalDestCountry', label: '⑪ 최종목적지국가 (품목포괄 시 최종사용자 소재국)', type: 'text' },
          { key: 'duration', label: '⑫ 유효기간 (사용자포괄 시에만 기입)', type: 'text', default: '3년' },
        ]
      },
      {
        title: '⑬ 정부 허가 발급 내역 (결과 수령 후)',
        fields: [
          { key: 'q_permit_number', label: '⑬ 허가번호 (사용자포괄 시에만 기입)', type: 'text', placeholder: '발급받은 포괄허가증 번호를 기입하세요' },
          { key: 'q_permit_date', label: '허가 발급일자', type: 'date' },
          { key: 'q_permit_attachment', label: '허가증 사본 첨부', type: 'file' }
        ]
      }
    ],
    guide: '포괄수출허가는 별지 제6호 서식을 사용합니다(제29조·제35조). 품목포괄수출허가는 ③~⑤항·⑫~⑬항을 생략하고, 사용자포괄수출허가는 ⑧~⑬항을 생략합니다. CP AA등급 혜택의 핵심입니다.'
  },
  'L-03': {
    id: 'L-03',
    title: '최종수하인 및 구매자 진술서 (별지 제2호)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4 (별표 20: 사내 수출허가심사 절차 이행)', // [수정] 제20조 부속서류로 일반 개별허가에도 적용됨(상황허가 전용 아님), 3.1.2는 판정시점 지표라 부적합
    legalBasis: '전략물자수출입고시 제20조 제4호, 별지 제2호',
    timing: '상황허가(또는 개별수출허가) 신청 시',
    author: '영업부서 / 구매자 작성 후 접수',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '① 최종수하인 / ② 수출자 / ③ 상품',
        fields: [
          { key: 'consigneeCompany', label: '① 최종수하인(Ultimate Consignee) 회사명·주소·국가', type: 'textarea' },
          { key: 'exporterName', label: '② 수출자(Exporter) 회사명·주소·국가', type: 'textarea' },
          { key: 'itemDetails', label: '③ 수출품 내역(Model No./Type)', type: 'textarea' },
          { key: 'quantity', label: '③ 수량(Quantity)', type: 'text' },
        ]
      },
      {
        // [수정] 원문 ④ "최종수하인의 물품 처분·용도" 체크박스(a~f)가 빠져 있었음.
        title: '④ 최종수하인의 물품 처분 또는 용도',
        fields: [
          { key: 'dispositionType', label: '해당 항목 선택', type: 'select', options: [
            '',
            'a. 수령한 형태 그대로 자사 제조공정에서 자본재로 사용하며 재수출하거나 완제품에 포함하지 않음',
            'b. 아래 제품으로 가공·포함하여 자국에서 제조, 아래 국가로 유통',
            'c. 아래 물품의 서비스(유지보수 등)에 사용, 아래 목적지로 제공',
            'd. 수령한 형태 그대로 자국에서 재판매하여 그곳에서 사용·소비',
            'e. 수령한 형태 그대로 아래 국가로 재수출',
            'f. 기타(구체적으로 기재)'
          ] },
          { key: 'dispositionDetail', label: '상세 내용 (제품명/국가/목적지 등)', type: 'textarea' },
        ]
      },
      {
        title: '⑤ 최종수하인의 사업 성격',
        fields: [
          { key: 'businessNatureA', label: 'A. 사업의 성격 (유통업/제조업/도매업 등)', type: 'text' },
          { key: 'businessNatureB', label: 'B. 한국 수출자와의 거래관계 및 기간 (계약/총판/도매/단골거래 등, 몇 년)', type: 'text' },
        ]
      },
      {
        // [수정] 최종수하인·구매자가 하나로 뭉쳐 있어 구매자 정보(성명/주소)와 각자의 서명란(⑦⑧)이
        // 실질적으로 분리돼 있지 않았음. 최종수하인이 곧 구매자인 경우가 아니라면 원문상 둘은 별개 서명자임.
        title: '⑦ 최종수하인 서명 / ⑧ 구매자 서명',
        fields: [
          { key: 'consigneeSignerName', label: '⑦ 최종수하인 서명자 성명', type: 'text' },
          { key: 'consigneeSignerTitle', label: '⑦ 최종수하인 서명자 직위', type: 'text' },
          { key: 'consigneeSignDate', label: '⑦ 최종수하인 서명일', type: 'date' },
          { key: 'buyerName', label: '⑧ 구매자 회사명·주소 (최종수하인과 동일하지 않은 경우)', type: 'textarea' },
          { key: 'buyerSignerName', label: '⑧ 구매자 서명자 성명', type: 'text' },
          { key: 'buyerSignerTitle', label: '⑧ 구매자 서명자 직위', type: 'text' },
          { key: 'buyerSignDate', label: '⑧ 구매자 서명일 (최종수하인 미상 시 구매자가 서명)', type: 'date' },
        ]
      },
      {
        // [수정] 원문 ⑨ "수출자 인증"(최종수하인·구매자 서명 후 정정이 없었음을 수출자가 확인) 항목 없었음.
        title: '⑨ 대한민국 수출자 인증',
        fields: [
          { key: 'exporterCertifierName', label: '인증자 성명', type: 'text' },
          { key: 'exporterCertifierTitle', label: '인증자 직위', type: 'text' },
          { key: 'exporterCertifyDate', label: '인증일', type: 'date' },
        ]
      }
    ],
    guide: '별지 제2호 서식입니다. 최종수하인과 구매자가 다를 경우 각각 서명해야 하며(⑦⑧), 최종수하인이 불분명한 경우 구매자가 서명합니다. 서명 완료 후 수출자가 정정 여부를 인증(⑨)해야 완성됩니다. 서명본 원본을 보관하세요.'
  },
  'L-04': {
    id: 'L-04',
    title: '최종사용자 서약서 (별지 제2호의2)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4 (별표 20: 사내 수출허가심사 절차 이행)', // [수정] 제20조 부속서류로 일반 개별허가에도 적용됨(상황허가 전용 아님), 3.1.2는 판정시점 지표라 부적합
    legalBasis: '전략물자수출입고시 제20조 제6호, 별지 제2호의2',
    timing: '상황허가(또는 개별수출허가) 신청 시',
    author: '영업부서 / 최종사용자 작성 후 접수',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '수출자 및 서약자 정보',
        fields: [
          { key: 'exporterName', label: '수출자', type: 'text' },
          { key: 'itemDetails', label: '품명 및 규격', type: 'textarea' },
          { key: 'quantity', label: '수량 및 가액', type: 'text' },
          { key: 'endUse', label: '구체적 최종용도', type: 'textarea' },
        ]
      },
      {
        title: '① 최종사용자 / ② 대표자',
        fields: [
          { key: 'endUserCompany', label: '① 회사명', type: 'text' },
          { key: 'endUserAddress', label: '① 주소·국가', type: 'textarea' },
          { key: 'endUserRep', label: '② 대표자 성명', type: 'text' },
          { key: 'endUserRepTitle', label: '② 대표자 직위', type: 'text' }, // [수정] 누락
        ]
      },
      {
        // [수정] 원문 ③ 연락담당자(Contact Person), ④ 사업의 종류(Type/Nature of Business),
        // ⑤ 보관장소(Place of Storage)가 통째로 빠져 있었음.
        title: '③ 연락담당자 / ④ 사업의 종류 / ⑤ 보관장소',
        fields: [
          { key: 'contactName', label: '③ 연락담당자 성명', type: 'text' },
          { key: 'contactTitle', label: '③ 연락담당자 직위', type: 'text' },
          { key: 'contactPhone', label: '③ 연락담당자 전화번호', type: 'text' },
          { key: 'contactEmail', label: '③ 연락담당자 이메일', type: 'text' },
          { key: 'businessType', label: '④ 사업의 종류', type: 'text' },
          { key: 'storagePlace', label: '⑤ 보관장소 (실제 소재지가 주소와 다를 경우 증빙 첨부)', type: 'text' },
        ]
      },
      {
        title: '⑦ 서명',
        fields: [
          { key: 'signerName', label: '서명자 성명', type: 'text' },
          { key: 'signerTitle', label: '서명자 직위', type: 'text' }, // [수정] 누락
          { key: 'signYear', label: '서명 연도', type: 'text', placeholder: '26' },
          { key: 'signMonth', label: '서명 월', type: 'text' },
          { key: 'signDay', label: '서명 일', type: 'text' },
        ]
      }
    ],
    guide: '별지 제2호의2 서식(EUS)입니다. 반드시 대표자 서명이 원칙이며, 이미지 서명은 불인정됩니다. 품목포괄수출허가의 경우 수량(quantity)은 공란으로 둡니다. 주소가 실제 보관장소와 다를 경우 임대차계약서 등 증빙을 첨부하세요.'
  },
  // =========================================================
  // DOC-ENDUSER 3종: 전략물자수출입고시 별지 구분
  // =========================================================
  'DOC-ENDUSER-WA': {
    id: 'DOC-ENDUSER-WA',
    title: '[별지 2의3] 최종사용자서약서 (바세나르 통제품목용)',
    category: '기타 구비서류',
    indicator: '전략물자수출입고시 별표 9 (별지 2의3)',
    legalBasis: '전략물자수출입고시 제21조제2항, 별표 9: 바세나르 체제 통제품목(5D002/ML21 등) 수출 시 최종사용자가 민간 목적 사용을 서약하는 양식',
    timing: '수출허가 신청 전 (허가 신청 첨부)',
    author: '최종사용자(해외)',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '수출자 정보',
        fields: [
          { key: 'exporterName', label: '수출자 (Exporter)', type: 'text', autoFillFrom: 'exporterCompany' },
          { key: 'exporterCountry', label: '수출국', type: 'text', default: '대한민국 (Republic of Korea)' },
        ]
      },
      {
        title: '구매자 및 최종사용자 정보',
        fields: [
          { key: 'buyerName', label: '구매자 (Purchaser)', type: 'text' },
          { key: 'buyerAddress', label: '구매자 주소', type: 'textarea' },
          { key: 'endUserName', label: '최종사용자 (End-User)', type: 'text' },
          { key: 'endUserAddress', label: '최종사용자 주소', type: 'textarea' },
          { key: 'endUserCountry', label: '최종사용국', type: 'text' },
        ]
      },
      {
        title: '물품 정보',
        fields: [
          { key: 'itemName', label: '물품명 (Item Description)', type: 'text' },
          { key: 'controlNo', label: '통제번호 (Control No.)', type: 'text', placeholder: '예: 5D002' },
          { key: 'quantity', label: '수량 (Quantity)', type: 'text' },
          { key: 'endUse', label: '최종 용도 (End-Use)', type: 'textarea', placeholder: '구체적인 민간 목적 사용 용도를 기재 (예: 차량용 보안 소프트웨어 통신 보호 모듈)' },
        ]
      },
      {
        title: '서약 사항 (Statement)',
        fields: [
          {
            key: 'statementInfo',
            label: '서약 내용 안내',
            type: 'info',
            text: '<div style="font-size:0.85rem; line-height:1.7; color:var(--text-secondary); background: rgba(99,102,241,0.04); padding:12px; border-radius:6px; border-left:3px solid var(--accent-blue);">본 서약서를 통해 최종사용자는 다음 사항을 확약합니다:<br/>1. 수출된 물품을 군사·핵·생화학·미사일 무기 개발에 전용하지 않음<br/>2. 제3국으로의 재수출 시 수출국 법령에 따른 허가를 취득함<br/>3. 위반 시 관련 법적 제재를 감수함</div>'
          },
          { key: 'noMilitaryUse', label: '군사 목적 미전용 서약', type: 'select', options: ['', '서약 확인', '해당 없음'], required: true },
          { key: 'noReexportWithoutAuth', label: '무허가 재수출 금지 서약', type: 'select', options: ['', '서약 확인'], required: true },
          { key: 'signDate', label: '서약 일자 (Date)', type: 'date' },
          { key: 'signerName', label: '서명자 (Authorized Signatory)', type: 'text' },
          { key: 'signerTitle', label: '직위 (Title)', type: 'text' },
          { key: 'signatureFile', label: '서명 / 직인 (스캔본 첨부)', type: 'file', accept: '.pdf,.jpg,.png' },
        ]
      }
    ],
    guide: '[바세나르 체제 통제품목] 5D002 등 암호화 소프트웨어 및 이중용도 품목 수출 시 반드시 이 양식(별지 2의3)을 사용하세요. 해외 최종사용자가 직접 작성·서명 후 스캔본을 첨부합니다.'
  },

  'DOC-ENDUSER-GEN': {
    id: 'DOC-ENDUSER-GEN',
    title: '[별지 2의2] 최종사용자서약서 (일반)',
    category: '기타 구비서류',
    indicator: '전략물자수출입고시 별표 9 (별지 2의2)',
    legalBasis: '전략물자수출입고시 제21조제2항, 별표 9: 바세나르 체제 비해당 전략물자 수출 시 최종사용자 민간목적 서약 양식',
    timing: '수출허가 신청 전 (허가 신청 첨부)',
    author: '최종사용자(해외)',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '당사자 정보',
        fields: [
          { key: 'exporterName', label: '수출자', type: 'text' },
          { key: 'endUserName', label: '최종사용자 (End-User)', type: 'text' },
          { key: 'endUserAddress', label: '최종사용자 주소', type: 'textarea' },
          { key: 'endUserCountry', label: '최종사용국', type: 'text' },
        ]
      },
      {
        title: '물품 및 서약',
        fields: [
          { key: 'itemName', label: '물품명', type: 'text' },
          { key: 'quantity', label: '수량', type: 'text' },
          { key: 'endUse', label: '최종 용도', type: 'textarea' },
          { key: 'noWmdUse', label: '대량파괴무기(WMD) 전용 금지 서약', type: 'select', options: ['', '서약 확인'], required: true },
          { key: 'signDate', label: '서약 일자', type: 'date' },
          { key: 'signerName', label: '서명자', type: 'text' },
          { key: 'signatureFile', label: '서명 스캔본 첨부', type: 'file', accept: '.pdf,.jpg,.png' },
        ]
      }
    ],
    guide: '바세나르 체제 비해당 전략물자(군용물자 제외) 수출 시 사용하는 일반 최종사용자서약서입니다. 5D002/ML21 해당 품목은 [별지 2의3]을 사용해야 합니다.'
  },

  'DOC-ENDUSER-2': {
    id: 'DOC-ENDUSER-2',
    title: '[별지 2] 최종수하인·구매자 서약서 (개별허가 첨부용)',
    category: '기타 구비서류',
    indicator: '전략물자수출입고시 별표 9 (별지 2)',
    legalBasis: '전략물자수출입고시 제19조제3항: 개별수출허가(L-01) 신청 시 최종수하인 및 구매자가 물품의 최종 용도 및 재수출 제한을 서약하는 양식',
    timing: '개별수출허가(L-01) 신청 시 첨부',
    author: '최종수하인 및 구매자 (해외)',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '수출자 정보',
        fields: [
          { key: 'exporterName', label: '수출자 상호', type: 'text' },
          { key: 'exporterCountry', label: '수출국', type: 'text', default: '대한민국' },
        ]
      },
      {
        title: '최종수하인 서약',
        fields: [
          { key: 'consigneeName', label: '최종수하인 (Ultimate Consignee)', type: 'text' },
          { key: 'consigneeAddress', label: '최종수하인 주소', type: 'textarea' },
          { key: 'consigneeCountry', label: '수하인 소재 국가', type: 'text' },
          { key: 'itemName', label: '물품명', type: 'text' },
          { key: 'quantity', label: '수량', type: 'text' },
          { key: 'endUse', label: '최종 용도', type: 'textarea' },
          { key: 'noReexport', label: '무단 재수출 금지 서약', type: 'select', options: ['', '서약 확인'], required: true },
          { key: 'consigneeSignDate', label: '최종수하인 서약 일자', type: 'date' },
          { key: 'consigneeSignerName', label: '최종수하인 서명자', type: 'text' },
        ]
      },
      {
        title: '구매자 서약',
        fields: [
          { key: 'buyerName', label: '구매자 (Purchaser)', type: 'text' },
          { key: 'buyerAddress', label: '구매자 주소', type: 'textarea' },
          { key: 'noDiversion', label: '불법 전용 금지 서약', type: 'select', options: ['', '서약 확인'], required: true },
          { key: 'buyerSignDate', label: '구매자 서약 일자', type: 'date' },
          { key: 'buyerSignerName', label: '구매자 서명자', type: 'text' },
          { key: 'combinedSignatureFile', label: '서명 스캔본 통합 첨부 (PDF)', type: 'file', accept: '.pdf,.jpg,.png' },
        ]
      }
    ],
    guide: '개별수출허가(L-01) 신청 시 허가신청서에 반드시 첨부해야 하는 [별지 2] 서식입니다. 최종수하인과 구매자가 각각 서명하여 합본 스캔 후 첨부합니다. \'가\' 지역 수출이거나 CP AA 등급인 경우 제출이 면제됩니다.'
  },

  // [신규] L-05~L-09: 상황허가(Catch-all) 부속서류 5종
  // processFlow.js의 "상황허가 전용 첨부서류" 단계와 formTemplates.js의 출력 서식(tmpl_01_05~09)은
  // 이미 있었으나 정작 이 definitions.js에 항목이 빠져 있어 사이드바에 아예 나타나지 않고
  // 데이터 입력도 불가능했던 부분을 보완함. 필드 key는 기존 출력 서식(formTemplates.js)과 정확히 맞춤.
  'L-05': {
    id: 'L-05',
    title: '사실 확인서 (상황허가용)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4.2 (별표 20: 용도 등 확인 절차 — 상황허가 부속서류)', // [수정] 3.2.1은 수출프로세스 중단(Stop-Shipment) 권한 지표로 상황허가 부속서류와 무관
    legalBasis: '전략물자수출입고시 상황허가(Catch-all) 부속서류',
    timing: 'G-01 심사 결과 상황허가 신청 필요 시',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'submitDate', label: '제출일자', type: 'date' },
      { key: 'companyName', label: '제출업체', type: 'text', default: '' },
      { key: 'ceoName', label: '대표자', type: 'text', default: '' },
      { key: 'targetDocs', label: '확인 대상 제출 서류', type: 'textarea' },
      { key: 'confirmStatement', label: '확인 진술 내용', type: 'textarea' }
    ],
    guide: '상황허가 신청 시 제출한 다른 서류(사전진단, 판정서 등)의 내용이 사실임을 확인하는 진술서입니다.'
  },

  'L-06': {
    id: 'L-06',
    title: '회사 소개자료 (상황허가용)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4.2 (별표 20: 용도 등 확인 절차 — 상황허가 부속서류)', // [수정] 3.2.1은 수출프로세스 중단(Stop-Shipment) 권한 지표로 상황허가 부속서류와 무관
    legalBasis: '전략물자수출입고시 상황허가(Catch-all) 부속서류',
    timing: 'G-01 심사 결과 상황허가 신청 필요 시',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'targetCompany', label: '대상 기업 (구매자/최종사용자)', type: 'text' },
      { key: 'history', label: '회사 이력 (설립, 연혁)', type: 'textarea' },
      { key: 'businessScope', label: '사업 내용', type: 'textarea' },
      { key: 'revenue', label: '매출/임직원', type: 'text' },
      { key: 'shares', label: '지분구조/소유주', type: 'text' },
      { key: 'mainClients', label: '주요 고객사', type: 'textarea' },
      { key: 'usageDesc', label: '당사 물품 활용 영위 사업', type: 'textarea' },
      { key: 'signYear', label: '서명 연도', type: 'text', placeholder: 'YYYY' },
      { key: 'signMonth', label: '서명 월', type: 'text', placeholder: 'MM' },
      { key: 'signDay', label: '서명 일', type: 'text', placeholder: 'DD' },
      { key: 'exporterCeo', label: '신청(신고/보고)인', type: 'text' }
    ],
    guide: '거래상대방(구매자/최종사용자)에 대한 소개자료로, 상대방이 실체가 있는 정상 기업임을 입증하기 위해 제출합니다.'
  },

  'L-07': {
    id: 'L-07',
    title: '수출물품 상세정보 (상황허가용)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4.2 (별표 20: 용도 등 확인 절차 — 상황허가 부속서류)', // [수정] 3.2.1은 수출프로세스 중단(Stop-Shipment) 권한 지표로 상황허가 부속서류와 무관
    legalBasis: '전략물자수출입고시 상황허가(Catch-all) 부속서류',
    timing: 'G-01 심사 결과 상황허가 신청 필요 시',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'itemName', label: '품명 및 모델', type: 'text' },
      { key: 'specFeatures', label: '사양, 기능, 특성', type: 'textarea' },
      { key: 'purpose', label: '사용목적/방법', type: 'textarea' },
      { key: 'installLocation', label: '설치장소/재고관리', type: 'textarea' },
      { key: 'quantityReason', label: '수량의 적정성', type: 'textarea' },
      { key: 'pastImport', label: '기수입 실적', type: 'textarea' },
      { key: 'signYear', label: '서명 연도', type: 'text', placeholder: 'YYYY' },
      { key: 'signMonth', label: '서명 월', type: 'text', placeholder: 'MM' },
      { key: 'signDay', label: '서명 일', type: 'text', placeholder: 'DD' },
      { key: 'exporterCeo', label: '신청(신고/보고)인', type: 'text' }
    ],
    guide: '수출 물품의 사양, 용도, 수량의 적정성 등을 상세히 설명하는 서류입니다.'
  },

  'L-08': {
    id: 'L-08',
    title: '군용전용 가능성 검토 결과서',
    category: '수출 심사 및 출하',
    indicator: '3.2.4.2 (별표 20: 용도 등 확인 절차 — 상황허가 부속서류)', // [수정] 3.2.1은 수출프로세스 중단(Stop-Shipment) 권한 지표로 상황허가 부속서류와 무관
    legalBasis: '전략물자수출입고시 상황허가(Catch-all) 부속서류',
    timing: 'G-01 심사 결과 상황허가 신청 필요 시',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'itemName', label: '품명', type: 'text' },
      { key: 'specAnalysis', label: '사양/소재 근거 (민수용 확인)', type: 'textarea' },
      { key: 'designAnalysis', label: '설계 분석', type: 'textarea' },
      { key: 'envAnalysis', label: '조달 환경 등', type: 'textarea' },
      { key: 'conclusion', label: '결론', type: 'textarea' }
    ],
    guide: '수출 품목이 군사적 목적으로 전용될 가능성이 낮음을 자체 검토하여 결론짓는 서류입니다.'
  },

  'L-09': {
    id: 'L-09',
    title: '수출물품 부분제품 설명서',
    category: '수출 심사 및 출하',
    indicator: '3.2.4.2 (별표 20: 용도 등 확인 절차 — 상황허가 부속서류)', // [수정] 3.2.1은 수출프로세스 중단(Stop-Shipment) 권한 지표로 상황허가 부속서류와 무관
    legalBasis: '전략물자수출입고시 상황허가(Catch-all) 부속서류',
    timing: 'G-01 심사 결과 상황허가 신청 필요 시',
    author: '영업부서 / 자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'partUsage', label: '수출품이 사용되는 공정 및 부분', type: 'textarea' },
      { key: 'finalProductLine', label: '최종제품 생산라인 설명', type: 'textarea' },
      { key: 'pastProduction', label: '최종사용자의 최종제품 최근 2년간 생산 실적', type: 'textarea' },
      { key: 'signYear', label: '서명 연도', type: 'text', placeholder: 'YYYY' },
      { key: 'signMonth', label: '서명 월', type: 'text', placeholder: 'MM' },
      { key: 'signDay', label: '서명 일', type: 'text', placeholder: 'DD' },
      { key: 'exporterCeo', label: '신청(신고/보고)인', type: 'text' }
    ],
    guide: '수출 물품이 최종제품의 일부(부분제품)로 사용되는 경우, 그 최종제품과 생산라인을 설명하는 서류입니다.'
  },

  'L-10': {

    id: 'L-10',
    title: '수출자 서약서 (별지 제3호)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4 (별표 20: 사내 수출허가심사 절차 이행)', // [수정] 3.1.2는 판정시점 지표로 서약서와 무관
    // [수정] 법적 근거 인용이 아예 없던 것을 원문 확인 후 채움 — 제20조(개별수출허가 신청서류) 제5호가
    // "별지 제3호 서식에 따른 수출자 서약서 1부"를 개별수출허가 신청 첨부서류로 명시함.
    legalBasis: '전략물자수출입고시 제20조(개별수출허가 신청서류) 제5호, 별지 제3호',
    timing: '개별수출허가 신청 시 (별지 제1호 첨부서류)',
    author: '수출자(대표이사) / 자율수출관리기구',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'exporterCompany', label: '① 수출자', type: 'text' },
      { key: 'itemName', label: '② 수출품/수량 — 품명', type: 'text' },
      { key: 'quantity', label: '② 수출품/수량 — 수량', type: 'text' },
      { key: 'buyerName', label: '③ 구매자', type: 'text' },
      // [수정] 아래 3개 필드(최종수하인/최종사용자 홈페이지/사용목적)가 원문 필수항목인데 통째로 빠져 있었음.
      { key: 'consigneeName', label: '④ 최종수하인', type: 'text' },
      { key: 'endUserName', label: '⑤ 최종사용자', type: 'text' },
      { key: 'endUserWebsite', label: '⑥ 최종사용자 홈페이지', type: 'text' },
      { key: 'endUsePurpose', label: '⑦ 사용목적', type: 'textarea' },
      // [수정] "최종사용자 확인 방법" 체크 항목이 원문 2번에 있는데 빠져 있었음.
      { key: 'verificationMethod', label: '최종사용자 확인 방법', type: 'select', options: ['', '정부발행 공식 문서(사업자등록증, 납세증명서 등)', '기타 방법'] },
      { key: 'verificationDetail', label: '확인 방법 상세내역 (근거자료 별첨)', type: 'textarea' },
      { key: 'exporterRep', label: '서약자(수출자) 대표자명', type: 'text' },
      { key: 'signDate', label: '작성일자', type: 'date' }
    ],
    guide: '개별수출허가(L-01) 신청 시 별지 제1호 서식에 첨부해야 하는 [별지 제3호] 법정 서식입니다. 서약 문언(신원·용도 의문 시 수출 중단 및 허가기관 협의, 재판매·재수출 사전동의 요구 시 허가기관 협의)은 법정 고정 문구이며 임의로 수정할 수 없습니다.'
  },

  'L-11': {
    id: 'L-11',
    title: '기타 첨부서류 (수출계약서·영업증명서·기술사양서 등)',
    category: '수출 심사 및 출하',
    indicator: '3.2.4 (별표 20: 사내 수출허가심사 절차 이행 — 첨부서류 구비)',
    // [신규] 이 문서들은 전략물자수출입고시에 별지/별표로 고정된 법정 양식이 없다.
    // 수출계약서: 당사자 간 사적 계약서로 정부가 서식을 정하지 않음(각 조항에서 "수출계약서"를
    //   첨부서류로만 요구, 예: 제20조 등). 영업증명서: 실무상 사업자등록증을 의미하며 이 역시
    //   국세청 서식일 뿐 전략물자수출입고시 소관 서식이 아님. 기술사양서: 제품 카탈로그/사양서로
    //   회사마다 형식이 다름. "자율준수서약서"는 고시 전문을 검색해도 별도 법정 명칭·서식이 없어,
    //   별지3(L-10, 수출자서약서)과 개념이 겹치는 것으로 판단 — 별도 법정 서식을 새로 만들지 않고
    //   여기 첨부문서함에서 원본 파일(사내 확인서 등)을 그대로 보관하도록 함.
    legalBasis: '법정 서식 없음 — 사내 관리 목적 (전략물자수출입고시상 첨부서류로만 언급됨: 제20조 등)',
    timing: '개별/포괄수출허가 신청 시 또는 수시',
    author: '자율수출관리기구, 영업부서',
    retention: '5년',
    approverRole: null,
    type: 'file_manager',
    fileCategories: ['수출계약서', '영업증명서 (사업자등록증)', '기술사양서 (카탈로그 등)', 'CP 자율준수 확인서', '기타'],
    guide: '법정 서식이 정해져 있지 않은 첨부서류(수출계약서, 사업자등록증 등 영업증명서, 제품 카탈로그 등 기술사양서, 그 밖에 CP 자율준수를 확인하는 사내 문서 등)를 원본 파일 그대로 업로드해서 관리하는 곳입니다. 분류를 선택하고 파일을 첨부하면 이 거래 건의 첨부서류함에 보관됩니다.'
  },


  // ==========================================
  // A. 조직과 규정 (A-01 ~ A-09)
  // ==========================================
  'A-01': {
    id: 'A-01',
    title: '자율수출관리규정 제정 기안문',
    category: '조직과 규정',
    indicator: '1.2.1 (별표 20: 규정 제정 및 사내규정화)',
    legalBasis: '전략물자수출입고시 제75조(자율수출관리규정), 별표 7(표준자율수출관리규정)',
    timing: '최초 1회 (법령 개정 시 수시 개정)',
    author: '자율수출관리기구',
    retention: '영구',
    approverRole: 'Master', // 자율수출관리규정 제33조② — 규정·지침 제·개정은 위임 제외, 대표이사 결재
    approverRoleLabel: '대표이사',
    type: 'mixed',
    fields: [
      { key: 'drafter', label: '기안자', type: 'text', placeholder: '홍길동' },
      { key: 'reviewer', label: '검토자', type: 'text', placeholder: '기구장' },
      { key: 'approver', label: '결재자', type: 'text', placeholder: '대표이사' },
      { key: 'draftDate', label: '기안일', type: 'date' },
      { key: 'effectiveDate', label: '시행일', type: 'date' },
      { key: 'docNumber', label: '문서번호', type: 'text', default: '수출기획팀-001' },
      { key: 'retentionPeriod', label: '보존기간', type: 'text', default: '영구' },
      { key: 'disclosure', label: '공개여부', type: 'select', options: ['', '대내 공개', '대외 공개', '비공개'], default: '대내 공개' },
      { key: 'subject', label: '제목', type: 'text', default: '자율수출관리규정 제정 및 개정의 건' },
      { key: 'body', label: '기안 내용', type: 'textarea', default: '대외무역법 제22조 및 전략물자 수출입고시 제75조에 따라 당사의 전략물자 수출관리를 위한 자율수출관리규정을 별첨과 같이 제정/개정하고자 합니다.\n\n1. 목적: 전략물자 수출통제 관련 법령 준수 및 자율준수체제 구축\n2. 근거: 전략물자 수출입고시 제75조, 별표 7(표준자율수출관리규정)\n3. 주요 내용:\n   - 자율수출관리기구의 조직 및 책임\n   - 전략물자 해당 여부 판정 및 수출심사 절차\n   - 위반사항 보고 및 시정조치 등\n4. 시행일: 결재일로부터 즉시\n\n붙임: 자율수출관리규정 1부. 끝.' },
      { key: 'noRevision', label: '개정 불필요 (현행 유지)', type: 'checkbox', labelText: '✅ 정기 검토 결과, 관련 법령 개정 및 사내 규정 변경 사유가 발생하지 않아 개정 없이 현행 규정을 유지함' }
    ],
    tables: [
      {
        id: 'revisionTable',
        title: '신·구조문 대비표',
        columns: [
          { key: 'before', label: '개정 전 (현행 구조문)', type: 'textarea' },
          { key: 'after', label: '개정 후 (신조문)', type: 'textarea' },
          { key: 'reason', label: '개정 사유', type: 'textarea' }
        ]
      }
    ],
    guide: '전략물자수출입고시 제75조 제2항에 따라 9개 필수항목이 포함되어야 합니다. 정기 검토 시 개정 사유가 없으면 체크박스에 체크하고 상신하여 증빙으로 남깁니다.',
  },

  'A-02': {
    id: 'A-02',
    title: '규정 시행 사내 공지문',
    category: '조직과 규정',
    indicator: '1.2.1 (별표 20: 규정 배포 및 사내게시)',
    timing: '규정 제·개정 시',
    author: '자율수출관리기구',
    retention: '5년',
    trackAck: true, // 결재(전자서명) 완료 후 이 서식을 열람하면 이름/부서/시각이 자동 기록됨 (Slack은 읽음 확인을 제공하지 않으므로 앱에서 대신 기록)
    type: 'template',
    fields: [
      { key: 'sender', label: '발신', type: 'text', default: '자율수출관리기구' },
      { key: 'receiver', label: '수신', type: 'text', default: '전 임직원' },
      { key: 'medium', label: '게시 매체', type: 'text', default: '사내 이메일, 그룹웨어 공지사항' },
      { key: 'noticeDate', label: '공지일', type: 'date' },
      { key: 'subject', label: '제목', type: 'text', default: '자율수출관리규정 제정·시행 안내' },
      { key: 'body', label: '공지 내용', type: 'textarea', default: '당사는 전략물자 수출관리를 위한 자율수출관리규정을 제정하여 시행합니다.\n\n임직원 여러분께서는 규정의 내용을 숙지하시고 업무에 반영하여 주시기 바랍니다.\n\n규정 원문은 그룹웨어 규정집에서 열람하실 수 있습니다.' },
    ],
    guide: '발송 후 메일 발송 이력 화면과 게시판 게재 화면을 캡처하여 보관한다.',
  },

  'A-03': {
    id: 'A-03',
    title: '규정 열람확인대장',
    category: '조직과 규정',
    indicator: '1.2.1 (별표 20: 규정 열람실적 관리)',
    timing: '규정 제·개정 시',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'table',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'name', label: '성명', width: '100px' },
      { key: 'department', label: '소속', width: '120px' },
      { key: 'readDate', label: '열람일', type: 'date', width: '130px' },
      { key: 'signature', label: '확인서명', width: '100px' },
    ],
    guide: '사이드바의 "자율수출관리규정 (사내 규정)" 화면을 열람하면 이름/소속/열람일이 자동으로 이 대장에 기록됩니다(같은 사람이 같은 날 다시 열람해도 중복 기록되지 않음). 시스템 밖에서(인쇄물 등) 열람한 경우에만 아래 표에 수동으로 행을 추가하세요.',
  },

  'A-04': {
    id: 'A-04',
    title: '자율수출관리규정 개정 절차서',
    category: '조직과 규정',
    indicator: '1.2.3 (별표 20: 규정 개정체계 확립)',
    timing: '상시',
    author: '자율수출관리기구',
    retention: '영구',
    type: 'template',
    fields: [
      { key: 'scope', label: '적용 범위', type: 'textarea', default: '당사의 자율수출관리규정 및 그 하위 세칙의 제정, 개정, 폐지에 적용한다.' },
      { key: 'cycle', label: '정기 검토 주기', type: 'text', default: '연 1회 (매년 1월)' },
      { key: 'trigger', label: '수시 개정 사유', type: 'textarea', default: '1. 전략물자 수출입고시 또는 관련 법령의 개정\n2. 조직 변경으로 인한 업무분장 변경\n3. 내부감사 또는 현장심사 결과 개선 필요사항 발견\n4. 기타 자율수출관리기구장이 필요하다고 판단하는 경우' },
      { key: 'process', label: '개정 절차', type: 'textarea', default: '1. 개정 필요사항 파악 및 개정안 작성 (기구 담당자)\n2. 개정안 검토 (기구장)\n3. 개정안 결재 (대표이사)\n4. 개정 사실 사내 공지 (A-02 서식 활용)\n5. 개정이력 관리대장 기록 (A-05 서식 활용)\n6. 임직원 열람 확인 (A-03 서식 활용)' },
    ],
    guide: '법령 개정 시 규정 개정이 이루어졌다는 이력이 A-05에 남아야 한다.',
  },

  'A-05': {
    id: 'A-05',
    title: '규정 개정이력 관리대장',
    category: '조직과 규정',
    indicator: '1.2.3 (별표 20: 규정 개정이력 관리)',
    timing: '개정 또는 정기 검토 시',
    author: '자율수출관리기구',
    retention: '영구',
    type: 'table',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'type', label: '구분', width: '100px', inputType: 'select', options: ['제정', '개정', '정기검토', '경미정정'] },
      { key: 'revision', label: '차수', width: '70px' },
      { key: 'effectiveDate', label: '시행일', type: 'date', width: '130px' },
      { key: 'reason', label: '사유 및 주요 내용', width: '300px' },
      { key: 'approver', label: '결재', width: '100px' },
      { key: 'handler', label: '담당자', width: '100px' },
    ],
    guide: '정기 검토 결과 개정이 불요한 경우에도 그 사실을 기록한다.',
  },

  'A-06': {
    id: 'A-06',
    title: '자율수출관리기구장 임명장',
    category: '조직과 규정',
    indicator: '1.1.3, 2.1.1 (별표 20: 기구 독립성, 기구장 임원급 지정/임명)', // [수정] guide에 서술된 독립성(1.1.3) 내용이 indicator 태그에 빠져있어 지표별 증빙 검색 시 누락되던 문제
    legalBasis: '전략물자수출입고시 제74조(자율준수체제), 제75조 제2항 제2호(자율수출관리기구의 조직)',
    timing: '기구 구성 시',
    author: '대표이사',
    retention: '영구',
    approverRole: 'Master', // 임명장은 정의상 대표이사 고유 행위 — 규정 제·개정(A-01)과 동급으로 취급
    approverRoleLabel: '대표이사',
    type: 'template',
    fields: [
      { key: 'appointeeName', label: '피임명자 성명', type: 'text' },
      { key: 'appointeePosition', label: '직위', type: 'text' },
      { key: 'appointeeDept', label: '소속', type: 'text' },
      { key: 'body', label: '임명 본문 내용', type: 'textarea', default: '위 사람을 자율수출관리규정 제○조에 따라 자율수출관리기구의 장으로 임명합니다.\n\n제74조 제2항에 따라 자율수출관리기구는 영업부문과 독립적으로 구성·운영되어야 하며, 수출관리업무와 관련된 의사결정에 있어서 최고책임자로부터 실무담당자에 이르기까지 그 책임소재가 명확해야 합니다.\n\n자율수출관리기구의 장은 전략물자 수출관리상 우려가 있다고 판단하는 경우, 매출 기회에 우선하여 해당 거래를 중지시킬 권한을 가집니다.' },
      { key: 'appointDate', label: '임명일', type: 'date' },
      { key: 'appointerName', label: '임명자(대표이사)', type: 'text' },
      { key: 'companyName', label: '회사명', type: 'text', default: '(주)팝콘사' },
    ],
    guide: '제74조 제2항에 따라 자율수출관리기구는 영업부문과 독립적으로 구성·운영해야 합니다. 임명장은 인쇄 후 대표이사 자필 서명을 받아 스캔하여 보관합니다.',
  },

  'A-07': {
    id: 'A-07',
    title: '기구 구성원 임명 및 업무분장 통보서',
    guide: '실무 꿀팁: 임명장뿐만 아니라 전체 CP 조직도(조직 구성도 그림)를 반드시 함께 첨부하여야 AA등급 심사에서 유리합니다.',
    category: '조직과 규정',
    indicator: '1.1.1, 1.1.2 (별표 20: 기구 조직도 및 업무분장)',
    timing: '기구 구성 시',
    author: '자율수출관리기구장',
    retention: '영구',
    type: 'mixed',
    fields: [
      { key: 'orgHead', label: '기구장', type: 'text' },
      { key: 'orgHeadDept', label: '기구장 소속', type: 'text' },
      { key: 'noticeDate', label: '통보일', type: 'date' },
    ],
    tableTitle: '기구 구성원 및 업무분장',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'role', label: '담당 역할', width: '150px', inputType: 'select', options: ['판정 담당자', '거래심사 담당자', '허가 담당자', '출하관리 담당자', '교육 담당자', '정보보안 담당자', '기타'] },
      { key: 'name', label: '성명', width: '100px' },
      { key: 'dept', label: '소속', width: '120px' },
      { key: 'duties', label: '주요 업무', width: '250px' },
    ],
    guide: '기구 구성원이 1인인 경우에도 담당 역할별로 분장 내역을 기재한다.',
  },

  'A-08': {
    id: 'A-08',
    title: '전략물자 업무 위임전결표',
    category: '조직과 규정',
    indicator: '1.1.2, 3.2.1 (별표 20: 업무분장 및 절차중단 전결권)',
    timing: '기구 구성 시',
    author: '자율수출관리기구',
    retention: '영구',
    type: 'matrix',
    matrixRows: [
      '전략물자 판정 신청', '판정 결과 확정 및 등재', '신규 거래상대방 사전보고 접수',
      '우려거래자 확인 결과 확정', '사내 수출거래 심사 승인', '절차 중단 명령',
      '수출허가 및 상황허가 신청', '출하 및 전자적 전송 승인', '국내거래 통보',
      '교육계획 수립 및 결과 보고', '감사계획 수립', '감사결과 및 시정조치 보고',
      '규정 제정 및 개정', '위반사항 사내 보고', '위반사항 산업통상부 보고',
      '운영보고서 및 실적보고서 제출'
    ],
    matrixCols: ['기안', '검토', '결재', '기록 관리'],
    roleOptions: ['대표이사', '기구장', '판정 담당자', '거래심사 담당자', '허가 담당자', '출하관리 담당자', '교육 담당자', '정보보안 담당자', '영업부서', '인지자', '기구 담당자', '-'],
    guide: '절차 중단 명령은 기구장의 고유 권한이며, 이 권한이 결재체계에서 확인되지 않으면 지표 3.2.1의 증빙이 성립하지 않는다.',
  },

  'A-09': {
    id: 'A-09',
    title: '자율수출관리기구 교육·워크숍 이수 점검대장',
    category: '교육',
    indicator: '1.1.4 (별표 20: 담당자 인적요건 및 필수교육·워크숍 이수)',
    timing: '교육 및 워크숍 이수 시마다',
    author: '교육 담당자 / 자율준수관리자',
    retention: '5년',
    type: 'multi-table',
    tables: [
      {
        id: 'courses',
        title: '[표 1] 자율수출관리기구 외부 법정 필수 교육과정 이수대장',
        desc: '전략물자수출입고시 [별표 20] 지표 1.1.4에 따른 4대 필수 법정 전문 교육과정(Basic, Pre-Master, CP과정, 판정Basic) 이수 현황을 관리합니다.',
        columns: [
          { key: 'no', label: '연번', width: '50px' },
          { key: 'name', label: '성명', width: '90px' },
          { key: 'dept', label: '소속 부서', width: '110px' },
          { key: 'role', label: '기구 내 직무', width: '120px' },
          { 
            key: 'courseName', 
            label: '교육과정명 (필수과정)', 
            width: '180px', 
            inputType: 'select', 
            options: [
              '전략물자 Basic',
              '전략물자 Pre-Master',
              '자율준수무역거래자',
              '판정 Basic',
              'CEO 전략물자 교육'
            ] 
          },
          { key: 'courseDate', label: '이수일자', type: 'date', width: '125px' },
          { key: 'courseNumber', label: '수료증 이수번호', width: '140px', placeholder: 'KOSTI-2026-0000' },
          { key: 'institution', label: '교육기관', width: '130px', placeholder: '무역안보관리원' }, // [수정] 대외무역법 제25조 공식 명칭은 "무역안보관리원" — "한국무역안보관리원"은 존재하지 않는 기관명
        ]
      },
      {
        id: 'workshops',
        title: '[표 2] 자율준수무역거래자 워크숍 참석 실적 관리표 (기 지정 기업 갱신 요건)',
        desc: '전략물자수출입고시 [별표 20] 지표 1.1.4에 따라 유효기간(3년) 내 워크숍 3회 이상(7월 무역안보의날/11월 연말) 및 CEO·임원급 1회 이상 참석 실적을 관리합니다. (신규 최초 신청 기업은 면제)',
        columns: [
          { key: 'no', label: '연번', width: '50px' },
          { key: 'name', label: '참석자 성명', width: '90px' },
          { key: 'dept', label: '소속 / 직책', width: '110px', placeholder: '전략기획실 / 상무' },
          { 
            key: 'roleType', 
            label: '참석자 구분', 
            width: '130px', 
            inputType: 'select', 
            options: ['대표이사 / 임원급(기구장)', '실무 담당자'] 
          },
          { key: 'workshopTitle', label: '워크숍 회차 / 행사명', width: '220px', placeholder: '2025 무역안보의 날 부대 워크숍' },
          { key: 'attendDate', label: '참석일자', type: 'date', width: '125px' },
          { key: 'institution', label: '주관기관', width: '140px', placeholder: '산업통상자원부 / KOSTI' },
          { key: 'evidence', label: '증빙자료', width: '140px', placeholder: '참석확인증 / 명찰 사본' },
        ]
      }
    ],
    guide: '산업통상자원부 CP 심사기준(별표 20 지표 1.1.4)에 따라 자율수출관리기구 인원은 직무별 4대 필수 외부교육을 이수해야 하며, 기 지정 기업은 3년 유효기간 내 워크숍 3회 및 임원급 1회 이상 참석이 필수입니다. 사내 교육 실적은 [5.1.1] C-00~C-03 양식으로 별도 관리합니다.',
  },

  // [신규] A-10: 자율수출관리 세부지침
  // 별표20 지표 1.2.2("규정 외 세칙·운영매뉴얼 등을 작성하여 업무 내용을 구체화하였는가?")에 대응하는
  // 전용 서식이 A-01~A-09 어디에도 없던 것을 보완. 새 문서체계 폴더의 "팝콘사_자율수출관리세부지침" 초안
  // 구조(총칙/업무흐름/절차별 판단기준)를 참고해 핵심 관리 필드만 구조화하고, 나머지 상세 절차는 본문에 담음.
  'A-10': {
    id: 'A-10',
    title: '자율수출관리 세부지침',
    category: '조직과 규정',
    indicator: '1.2.2 (별표 20: 규정 외 세칙·운영매뉴얼 작성)',
    legalBasis: '자율수출관리규정 제44조(기구장이 정하는 세부 서식·절차)',
    timing: '규정 제정 직후 1회, 이후 업무 흐름 변경 시 개정',
    author: '자율수출관리기구 (기구장 전결)',
    retention: '영구',
    type: 'mixed',
    fields: [
      { key: 'documentNo', label: '문서번호', type: 'text', placeholder: 'PSR26-____' },
      { key: 'enactDate', label: '제정일', type: 'date' },
      { key: 'effectiveDate', label: '시행일', type: 'date' },
      { key: 'revisionNo', label: '개정 차수', type: 'text', default: '제정(초안)' },
      { key: 'scope', label: '적용 대상', type: 'textarea', default: '회사가 수출하거나 국외로 전자적으로 이전하는 모든 소프트웨어, 소스코드, 기술문서 및 물품\n국내 거래 중 전략물자에 해당하는 물품등의 공급\n외국인에게 국내에서 전략기술을 제공하는 행위' },
      { key: 'workflowSteps', label: '업무 전체 흐름 (단계 요약)', type: 'textarea', default: '① 문의·견적 접수 → ② 사전 진단 → ③ 전략물자 판정 → ④ 거래심사 → ⑤ 계약 체결 → ⑥ 수출허가(해당 시) → ⑦ 출하 전 교차검증 → ⑧ 전달·납품 → ⑨ 사후관리\n(②~④ 중 어느 단계에서든 위험이 확인되면 절차를 보류하며, 보류는 ⑤~⑨ 진행 중에도 발동할 수 있다)' },
      { key: 'blockingRules', label: '진행 차단 규칙', type: 'textarea', default: '계약 체결(⑤): ②③④ 완료 및 기구장 승인 전 불가\n출하·전달(⑧): ⑦ 교차검증 및 담당자 확인 서명 전 불가\n전략물자 출하: ⑥ 수출허가 취득 전 불가\n보류 중인 거래: 보류 해제에 대한 대표이사 결재 전 재개 불가' },
      { key: 'approvalStructure', label: '결재 구조 (병렬 확인 구조)', type: 'textarea', default: '[기안: Sales / PM / 개발팀] → [담당자 확인] → [기구장 승인] → [대표이사 결재]\n판정·거래심사는 기구장 전결. 규정 제·개정, 보류 해제, 허가 신청, 자진신고는 대표이사 결재.' },
      { key: 'detailBody', label: '단계별 세부 절차 (실시 시점 / 확인 항목 / 판단기준)', type: 'textarea', placeholder: '제3장 이하 — 절차별(사전진단/판정/거래심사/출하 등) 실시 시점, 확인 항목, 표준 처리기한 등 세부 내용을 기재' }
    ],
    guide: '규정(A-01)이 정한 절차를 실무에 어떻게 적용하는지 구체화한 운영매뉴얼입니다. 규정과 다를 때에는 규정이 우선합니다. 업무 흐름이 바뀌면 개정하고 A-05(개정이력 관리대장)에도 등재하세요.'
  },

  // ==========================================
  // B. 경영진 준수의지 (B-01 ~ B-02)
  // ==========================================
  'B-01': {
    id: 'B-01',
    title: '대표이사 수출관리 이행선언문',
    category: '경영진 준수의지',
    indicator: '2.2.1 (별표 20: 대표이사 수출관리 이행선언)',
    timing: '최초 1회 + 연 1회 갱신',
    author: '대표이사',
    retention: '영구',
    type: 'template',
    fields: [
      { key: 'companyName', label: '회사명', type: 'text', default: '' },
      { key: 'body', label: '이행선언문 본문', type: 'textarea', default: '당사는 해당 산업 분야의 기술과 서비스를 제공하는 기업으로서, 당사의 소프트웨어와 기술이 의도하지 않은 용도로 전용되지 않도록 관리할 책임이 있음을 분명히 인식합니다.\n\n이에 본인은 당사의 대표이사로서 다음을 선언합니다.\n\n1. 당사는 대외무역법과 전략물자 수출입고시 등 관계 법령을 준수하며, 어떠한 경우에도 허가 없이 전략물자와 상황허가 대상품목을 수출하지 않는다.\n\n2. 당사는 자율수출관리규정을 제정하여 시행하고, 자율수출관리기구를 설치하여 독립성과 책임성의 원칙에 따라 운영한다.\n\n3. 자율수출관리기구의 장은 전략물자 수출관리상 우려가 있다고 판단하는 경우 매출 기회에 우선하여 해당 거래를 중지시킬 권한을 가진다. 본인은 이 판단을 존중하며 어떠한 불이익도 가하지 않는다.\n\n4. 당사는 임직원에 대한 교육을 지속적으로 시행하고, 정기적인 내부 감사를 통해 자율준수체제의 실효성을 점검한다.\n\n5. 규정 위반 사실이 확인된 경우 이를 은폐하지 아니하고 관계 행정기관에 보고하며, 재발 방지 대책을 수립한다.' },
      { key: 'declarationDate', label: '선언 날짜', type: 'date' },
      { key: 'ceoName', label: '대표이사 성명', type: 'text', default: '' },
    ],
    guide: '서명은 인쇄본에 자필로 하고 스캔하여 보관한다. 전자결재 서명 이미지도 인정된다. 연 1회 갱신하면 지표 2.2.2의 증빙으로도 활용할 수 있다.',
  },

  'B-02': {
    id: 'B-02',
    title: '대표이사 이행의지 사내 공지문',
    category: '경영진 준수의지',
    indicator: '2.2.2 (별표 20: 최고경영자 이행의지 사내 강조)',
    timing: '연 1회 이상',
    author: '대표이사 명의, 기구 대행',
    retention: '5년',
    trackAck: true, // 결재(전자서명) 완료 후 이 서식을 열람하면 이름/부서/시각이 자동 기록됨 (Slack은 읽음 확인을 제공하지 않으므로 앱에서 대신 기록)
    type: 'template',
    fields: [
      { key: 'sender', label: '발신', type: 'text', default: '대표이사' },
      { key: 'receiver', label: '수신', type: 'text', default: '전 임직원' },
      { key: 'medium', label: '매체', type: 'text', default: '전사 이메일, 그룹웨어 공지사항' },
      { key: 'sendDate', label: '발송일', type: 'date' },
      { key: 'subject', label: '제목', type: 'text', default: '전략물자 수출관리에 대한 임직원 여러분의 협조를 당부드립니다' },
      { key: 'body', label: '본문', type: 'textarea', default: '임직원 여러분,\n\n당사의 소프트웨어는 차량의 안전과 직결되는 영역에서 동작합니다. 동시에 그 안에 포함된 암호와 보안 기술은 국제적으로 통제 대상이 될 수 있는 기술이기도 합니다.\n\n당사는 자율수출관리규정을 제정하고 자율수출관리기구를 설치하였습니다. 이는 규제에 대응하기 위한 형식이 아니라, 해외 고객이 당사를 신뢰할 수 있는 공급자로 판단하는 근거가 됩니다.\n\n특히 다음을 당부드립니다.\n- 해외 고객과의 신규 접촉이 시작된 시점에 자율수출관리기구에 알려 주십시오.\n- 소스코드나 기술 문서를 전달하는 일, 외국인에게 설계를 설명하는 일도 법률상 수출입니다.\n- 자율수출관리기구가 절차를 중단시키는 경우, 그것은 매출을 막는 결정이 아니라 회사를 지키는 결정입니다.\n\n여러분의 협조를 부탁드립니다.' },
      { key: 'companyName', label: '회사명', type: 'text', default: '(주)팝콘사' },
    ],
    guide: '발송 후 메일 발송 이력 화면과 게시판 게재 화면을 캡처하여 보관한다. 메일 저장파일(.eml)은 증빙으로 인정되지 않으므로 반드시 캡처하거나 인쇄본을 만든다.',
  },

  // ==========================================
  // C. 교육 및 훈련 (C-00 ~ C-06)
  // ==========================================
  'C-00': {
    id: 'C-00',
    title: '자율준수체제(CP) 운영 및 교육 평가 계획서',
    category: '교육 및 훈련',
    indicator: '5.1.1 (별표 20: 내부 교육계획 수립)',
    timing: '매년 초 (연 1회 이상)',
    author: '자율수출관리부서 / 교육담당자',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'planYear', label: '계획 연도', type: 'text', default: '2026년도' },
      { key: 'drafter', label: '작성자 / 부서', type: 'text', default: '박하현 (자율수출관리기구 담당자)' },
      { key: 'planDate', label: '계획 수립일자', type: 'date' },
      { key: 'targetAudience', label: '교육 대상 및 인원', type: 'text', default: '전 임직원 26명 (신규 입사자는 근무 개시 3개월 이내)' },
      { key: 'trainingCycle', label: '교육 체계 및 일정', type: 'textarea', default: '① 기본과정(전 임직원, 연 1회) ② 직무과정A(영업·PM) ③ 직무과정B(개발) ④ 전문과정(담당자·부담당자, 전략물자관리원) ⑤ 경영진 과정(대표이사·기구장) ⑥ 신규자 과정(수시)' },
      { key: 'resultManagement', label: '이수 관리', type: 'text', default: '출석부(C-02)·결과보고서(C-03) 작성, 전략물자관리원 교육은 수료증으로 갈음' }
    ],
    guide: '영등포구 경영평가 계획서 양식을 기반으로 디자인된 공문 스타일 템플릿입니다.',
  },
  'C-01': {
    id: 'C-01',
    title: '사내교육 시행 공지문',
    category: '교육',
    indicator: '5.1.1, 5.1.2 (별표 20: 사내교육 시행 공지)',
    timing: '교육 시행 시마다',
    author: '교육 담당자',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'sender', label: '발신', type: 'text', default: '자율수출관리기구' },
      { key: 'receiver', label: '수신', type: 'text', default: '전략물자 관련 부서 임직원' },
      { key: 'noticeDate', label: '공지일', type: 'date' },
      { key: 'trainingName', label: '교육명', type: 'text', placeholder: '2026년 상반기 전략물자 수출관리 사내교육' },
      { key: 'trainingDate', label: '교육일시', type: 'text', placeholder: '2026년 O월 O일 14:00~16:00' },
      { key: 'trainingPlace', label: '교육장소', type: 'text', placeholder: '본사 대회의실 / 온라인' },
      { key: 'trainingTarget', label: '교육대상', type: 'text', default: '전략물자 관련 업무 담당자 전원' },
      { key: 'trainingContent', label: '교육내용', type: 'textarea', default: '1. 전략물자 수출통제 제도 개요\n2. 당사 자율수출관리규정 주요 내용\n3. 판정 및 수출허가 절차\n4. 간주수출(Deemed Export) 관리\n5. 위반 시 제재 사례' },
    ],
    guide: '공지 발송 이력을 캡처하여 보관한다.',
  },

  'C-02': {
    id: 'C-02',
    title: '사내교육 출석부',
    category: '교육',
    indicator: '5.1.1, 5.1.2 (별표 20: 사내교육 출석부)',
    timing: '교육 시행 시마다',
    author: '교육 담당자',
    retention: '5년',
    type: 'mixed',
    fields: [
      { key: 'trainingName', label: '교육명', type: 'text' },
      { key: 'trainingDate', label: '교육일시', type: 'text' },
      { key: 'trainingPlace', label: '교육장소', type: 'text' },
      { key: 'instructor', label: '강사', type: 'text' },
    ],
    tableTitle: '참석자 명단 (사전 등록·관리용)',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'name', label: '성명', width: '100px' },
      { key: 'dept', label: '소속', width: '120px' },
      { key: 'position', label: '직위', width: '100px' },
      { key: 'signature', label: '서명 (오프라인 서명 시 기재)', width: '140px' },
    ],
    // [신규] 참석자가 직접 로그인해 "출석 확인" 버튼을 누르면 로그인 계정 기준으로 이름·소속·
    // 확인시각이 자동 기록된다(Slack은 읽음 확인 API가 없어 링크를 눌러 앱에 들어오는 시점을
    // 실제 확인 기록으로 삼는 기존 방식과 동일한 원리 — logDocumentAck 재사용).
    // 위 "참석자 명단" 표는 사전에 예상 참석자를 등록해두거나, 오프라인 친필 서명을 받은 경우
    // 수기로 기록하는 용도로 계속 사용할 수 있다(둘 중 하나만 써도 되고 병행해도 된다).
    selfCheckIn: true,
    // 오프라인 친필 서명을 받은 경우, 스캔본을 파일 그대로 첨부해 함께 보관할 수 있다.
    attachmentSection: true,
    fileCategories: ['오프라인 서명본 스캔'],
    guide: '온라인 교육인 경우 접속 로그 화면을 캡처하여 출석부를 대체할 수 있다. 참석자가 직접 로그인해서 "출석 확인" 버튼을 누르면 이름·소속·확인시각이 자동으로 기록되며, 오프라인 서명을 받은 경우에는 위 표에 수기로 기록하거나 스캔본을 첨부해 두 방식을 함께 사용할 수도 있다.',
  },

  'C-03': {
    id: 'C-03',
    title: '사내교육 결과보고서',
    category: '교육',
    indicator: '5.1.1, 5.1.2 (별표 20: 사내교육 결과보고서)',
    timing: '교육 종료 후',
    author: '교육 담당자',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'trainingName', label: '교육명', type: 'text' },
      { key: 'trainingDate', label: '교육일시', type: 'text' },
      { key: 'trainingPlace', label: '교육장소', type: 'text' },
      { key: 'targetCount', label: '대상 인원', type: 'text' },
      { key: 'attendCount', label: '참석 인원', type: 'text' },
      { key: 'instructor', label: '강사', type: 'text' },
      { key: 'summary', label: '교육 주요 내용', type: 'textarea' },
      { key: 'feedback', label: '참석자 의견 및 건의사항', type: 'textarea' },
      { key: 'improvement', label: '향후 개선사항', type: 'textarea' },
      { key: 'reportDate', label: '보고일', type: 'date' },
      { key: 'reporter', label: '보고자', type: 'text' },
    ],
    guide: '교육 자료(PPT, 유인물 등)를 함께 보관한다.',
  },

  'C-04': {
    id: 'C-04',
    title: '감사 시정조치 요구서',
    category: '감사',
    indicator: '6.1.3 (별표 20: 감사 시정조치 요구)',
    timing: '감사 결과 지적사항 발견 시',
    author: '기구장',
    retention: '5년',
    type: 'mixed',
    fields: [
      { key: 'auditDate', label: '감사 실시일', type: 'text' },
      { key: 'auditScope', label: '감사 범위', type: 'text' },
      { key: 'issueDate', label: '시정요구일', type: 'date' },
      { key: 'deadline', label: '시정 기한', type: 'date' },
      { key: 'issuer', label: '요구자 (기구장)', type: 'text' },
      { key: 'target', label: '시정 대상 부서/담당자', type: 'text' },
    ],
    tableTitle: '지적사항 및 시정요구 내용',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'area', label: '영역', width: '120px' },
      { key: 'finding', label: '지적사항', width: '250px' },
      { key: 'action', label: '시정요구 내용', width: '250px' },
      { key: 'priority', label: '우선순위', width: '80px', inputType: 'select', options: ['상', '중', '하'] },
    ],
    guide: '감사 실적이 없는 초기 신청 시에도 감사 계획과 이 서식의 보유를 증빙으로 제출한다.',
  },

  'C-05': {
    id: 'C-05',
    title: '감사 시정조치 결과보고서',
    category: '감사',
    indicator: '6.1.3 (별표 20: 감사 시정조치 결과보고)',
    timing: '시정조치 완료 시',
    author: '시정 대상 부서',
    retention: '5년',
    type: 'mixed',
    fields: [
      { key: 'auditDate', label: '감사 실시일', type: 'text' },
      { key: 'completionDate', label: '시정조치 완료일', type: 'date' },
      { key: 'reporter', label: '보고자', type: 'text' },
    ],
    tableTitle: '시정조치 결과',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'finding', label: '지적사항', width: '200px' },
      { key: 'action', label: '조치 내용', width: '250px' },
      { key: 'result', label: '결과', width: '100px', inputType: 'select', options: ['완료', '진행중', '미착수'] },
      { key: 'evidence', label: '증빙', width: '150px' },
    ],
    guide: '시정조치 전후 비교 화면을 캡처하여 첨부하면 증빙이 강화된다.',
  },

  'C-07': {
    id: 'C-07',
    title: '연간 자율준수 내부 감사 계획서',
    category: '내부 감사',
    indicator: '6.1.1 (별표 20: 주기적 내부감사계획 수립)',
    timing: '정기 감사 전 (연 1회 또는 2년 주기)',
    author: '감사담당자 / 자율준수관리자',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'auditYear', label: '감사 차수', type: 'text', default: '2026년 제1차 (최초)' },
      { key: 'auditTeam', label: '감사반 구성', type: 'text', default: '감사반장 최윤기(기구장) / 감사원 박하현·김홍렬 — 자신이 수행한 업무는 상호 교차 감사' },
      { key: 'planDate', label: '계획 수립일자', type: 'date' },
      { key: 'auditPeriod', label: '감사 대상·기간', type: 'text' },
      { key: 'auditScope', label: '감사 범위', type: 'text', default: '판정, 거래심사, 우려거래자 확인, 허가 취득, 출하 확인, 교육, 문서 보존, 정보보안 관리 (전 부서 대상)' },
      { key: 'reportingPlan', label: '결과 처리', type: 'text', default: '감사결과보고서(C-06)와 시정조치 결과를 기구장을 거쳐 대표이사에게 직접 보고' }
    ],
    guide: '행정안전부 연간 감사·감찰 계획서 스타일을 적용한 서식입니다.',
  },
  'C-06': {
    id: 'C-06',
    title: '감사결과 대표이사 보고서',
    category: '감사',
    indicator: '2.2.3, 6.1.3 (별표 20: 감사결과 대표이사 직접보고)',
    timing: '감사 종료 후',
    author: '기구장',
    retention: '5년',
    approverRole: 'Master', // 서식 목적 자체가 "대표이사 직접보고"이며 guide에도 결재 이력을 증빙으로 명시 — 기구장 단독 서명으로 확정되던 불일치 해소
    approverRoleLabel: '대표이사',
    type: 'template',
    fields: [
      { key: 'reportTo', label: '보고 대상', type: 'text', default: '대표이사' },
      { key: 'reportFrom', label: '보고자', type: 'text' },
      { key: 'reportDate', label: '보고일', type: 'date' },
      { key: 'auditPeriod', label: '감사 기간', type: 'text' },
      { key: 'auditScope', label: '감사 범위', type: 'textarea' },
      { key: 'auditResult', label: '감사 결과 요약', type: 'textarea' },
      { key: 'findings', label: '주요 지적사항', type: 'textarea' },
      { key: 'corrective', label: '시정조치 현황', type: 'textarea' },
      { key: 'recommendation', label: '권고사항', type: 'textarea' },
    ],
    guide: 'AA 등급은 기구장이 반기별로 CEO에게 직접 보고하는 체계를 갖춰야 한다. 이 보고서의 결재 이력이 그 증빙이 된다.',
  },

  // ==========================================
  // D. 문서·정보보안·인력 (D-01 ~ D-06)
  // ==========================================
  'D-01': {
    id: 'D-01',
    title: '문서관리 세칙 및 보존연한표',
    category: '문서관리',
    indicator: '7.1.1 (별표 20: 문서관리 세칙 및 보존연한)',
    legalBasis: '전략물자수출입고시 제92조(서류의 보관) - 5년 의무보관, 제75조 제2항 제7호(문서관리)',
    timing: '상시',
    author: '자율수출관리기구',
    retention: '영구',
    type: 'mixed',
    fields: [
      { key: 'scope', label: '적용 범위', type: 'textarea', default: '자율수출관리규정에 의해 생성되는 모든 문서에 적용한다.' },
      { key: 'management', label: '관리 원칙', type: 'textarea', default: '1. 문서는 전자 또는 서면으로 생성하고 결재를 거쳐 확정한다.\n2. 확정된 문서는 그룹웨어 또는 지정된 공유폴더에 보관한다.\n3. 보존연한이 경과한 문서의 폐기는 기구장의 승인을 받아야 한다.\n4. 전략물자수출입고시 제92조에 따라 다음 서류는 5년간 의무 보관한다:\n   - 판정 관련: 자가판정서(별지 제5호) 및 전문판정서(별지 제4호) 등의 판정자료\n   - 허가 관련: 허가 신청자료 및 통보자료, 허가 신청 여부 검토자료\n   - 수입 관련: 수입목적확인서, 수입계약서 등 전략물자 수입에 관련된 서류' },
    ],
    tableTitle: '문서별 보존연한표',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'docType', label: '문서 종류', width: '200px' },
      { key: 'retention', label: '보존연한', width: '100px', inputType: 'select', options: ['영구', '5년', '3년', '1년'] },
      { key: 'location', label: '보관 장소', width: '150px' },
      { key: 'manager', label: '관리 책임자', width: '100px' },
    ],
    defaultRows: [
      { docType: '자율수출관리규정 (사내 규정)', retention: '영구', location: '사내 그룹웨어', manager: '자율수출관리기구장' },
      { docType: '기구 구성원 임명장 및 조직도', retention: '영구', location: '자율수출관리기구', manager: '기구장' },
      { docType: '대표이사 수출관리 이행선언문', retention: '영구', location: '자율수출관리기구', manager: '기구장' },
      { docType: '전략물자 판정 서류 (자가/전문판정서)', retention: '5년', location: '자율수출관리기구', manager: '판정 담당자' },
      { docType: '수출거래 심사 서류 (수출자용 체크리스트 등)', retention: '5년', location: '자율수출관리기구', manager: '거래심사 담당자' },
      { docType: '수출허가증 및 신청 관련 검토 자료', retention: '5년', location: '자율수출관리기구', manager: '허가 담당자' },
      { docType: '수입목적확인서 및 수입 관련 서류', retention: '5년', location: '자율수출관리기구', manager: '허가 담당자' },
      { docType: '전략물자 국내거래 통보서', retention: '5년', location: '영업부서', manager: '영업 담당자' },
      { docType: '임직원 CP 교육/워크숍 이수대장', retention: '5년', location: '자율수출관리기구', manager: '교육 담당자' },
      { docType: '내부 감사 결과 및 시정조치 보고서', retention: '5년', location: '자율수출관리기구', manager: '기구장' },
      { docType: '전략물자 수출입 실적보고서', retention: '5년', location: '자율수출관리기구', manager: '기구 담당자' },
    ],
    guide: '전략물자수출입고시 제92조에 따라 판정·허가·수입 관련 서류는 최소 5년간 보관하여야 하며, 허가기관의 장이 요청한 경우 이를 제출하여야 합니다.',
  },

  'D-02': {
    id: 'D-02',
    title: '문서 보관현황 점검표',
    category: '문서관리',
    indicator: '7.1.1 (별표 20: 문서 보관현황 점검)',
    timing: '반기 1회',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'checklist',
    items: [
      '자율수출관리규정 원본이 지정된 위치에 보관되어 있는가',
      '규정 개정이력 관리대장이 최신 상태로 유지되고 있는가',
      '대표이사 이행선언문 원본(서명본)이 보관되어 있는가',
      '전략물자 판정 관련 서류가 5년간 보관되고 있는가',
      '수출허가 관련 서류가 5년간 보관되고 있는가',
      '교육 관련 서류(공지문, 출석부, 결과보고서)가 보관되어 있는가',
      '감사 관련 서류가 보관되어 있는가',
      '외국인 인력 관리 관련 서류가 보관되어 있는가',
      '보존연한이 경과한 문서의 폐기가 승인 절차를 거쳤는가',
    ],
    guide: '점검 결과를 기록하고 미비사항이 있으면 즉시 보완한다.',
  },

  'D-03': {
    id: 'D-03',
    title: '정보보안관리 지침',
    category: '정보보안',
    indicator: '9.1.1 (별표 20: 정보보안관리 체계)',
    timing: '상시',
    author: '정보보안 담당자',
    retention: '영구',
    type: 'template',
    fields: [
      { key: 'purpose', label: '제1조 (목적)', type: 'textarea', default: '이 지침은 당사가 보유한 전략기술의 비인가 유출을 방지하기 위한 정보통신 보안 관리 방안을 정한다.' },
      { key: 'scope', label: '제2조 (적용 범위)', type: 'textarea', default: '전략물자 수출입고시 [별표 2] 및 [별표 3]에 해당하거나 해당 가능성이 있는 기술 정보에 적용한다. 판정 결과가 비대상인 경우에도 상황허가 대상이 될 수 있으므로 일률적으로 적용한다.' },
      { key: 'access', label: '제3조 (접근 권한 관리)', type: 'textarea', default: '전략기술에 대한 접근 권한은 업무상 필요한 최소 범위로 부여한다.\n접근 권한의 부여와 회수는 기구장의 승인을 받아 D-04 관리대장에 기록한다.\n반기 1회 권한 부여 현황을 점검하고 불필요한 권한을 정리한다.' },
      { key: 'external', label: '제4조 (외부 반출 통제)', type: 'textarea', default: '전략기술을 사외로 반출하는 행위(소스코드 전달, 설계문서 송부, 원격 접속 허용, 외부 저장매체 복사)는 자율수출관리기구의 사전 승인 없이 할 수 없다.\n외국인 또는 외국 법인에 대한 반출은 수출에 해당하므로, 반출 전에 판정과 거래심사 절차를 완료하여야 한다.' },
      { key: 'systems', label: '제5조 (보유 시스템 설명)', type: 'textarea', default: '그룹웨어 권한관리: 부서와 직급별 문서 접근권한 부여 및 이력 관리\n형상관리 시스템: 저장소별 접근권한, 변경 이력, 복제와 내려받기 기록\n문서보안: 문서 열람, 인쇄, 반출 통제\n계정 관리: 입사와 퇴사에 연동한 계정 생성 및 회수' },
    ],
    guide: '보유 시스템 표는 회사의 실제 현황에 맞추어 수정한다. 실제로 작동하는 통제를 기재하는 것이 중요하다.',
  },

  'D-04': {
    id: 'D-04',
    title: '전략기술 접근권한 관리대장',
    category: '정보보안',
    indicator: '9.1.1 (별표 20: 전략기술 접근권한 관리)',
    timing: '권한 부여 및 회수 시마다',
    author: '정보보안 담당자',
    retention: '5년',
    type: 'table',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'name', label: '성명', width: '100px' },
      { key: 'dept', label: '소속', width: '120px' },
      { key: 'target', label: '대상 저장소 또는 문서', width: '200px' },
      { key: 'grantDate', label: '부여일', type: 'date', width: '130px' },
      { key: 'revokeDate', label: '회수일', type: 'date', width: '130px' },
      { key: 'approver', label: '승인자', width: '100px' },
      { key: 'reason', label: '사유', width: '150px' },
    ],
    guide: '부여와 회수를 모두 기록한다. 회수 기록이 없으면 통제가 작동하지 않는 것으로 읽힌다.',
  },

  'D-05': {
    id: 'D-05',
    title: '외국인 인력 신원확인 절차서',
    category: '정보보안',
    indicator: '9.1.2 (별표 20: 외국인 인력 신원확인 절차)',
    timing: '상시',
    author: '정보보안 담당자, 인사부서',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'scope', label: '제1조 (적용 대상)', type: 'textarea', default: '외국인 연구원, 산업연수생, 해외 법인 파견 인력, 외국 국적의 협력사 엔지니어에게 적용한다. 국내에서 이루어지는 기술 설명도 자율수출관리규정상 수출에 해당할 수 있다.' },
      { key: 'procedure', label: '제2조 (절차)', type: 'textarea', default: '1. 대상자 정보 수집: 성명, 국적, 소속 이력, 담당 예정 업무 (인사부서)\n2. 우려거래자 명단 조회: 예스트레이드 우려거래자와 정부 공표 명단 (정보보안 담당자)\n3. 조회 결과 해당 시 기구의 장에게 즉시 보고하고 절차 중단\n4. 보안서약서 징구 (인사부서)\n5. 접근권한 부여 범위 결정: 전략기술 저장소는 별도 승인 (기구장)\n6. 관리대장 등재 및 연 1회 재확인 (정보보안 담당자)\n7. 퇴직 또는 협력 종료 시 권한 회수 및 반납 확인' },
      { key: 'records', label: '제3조 (기록)', type: 'textarea', default: '조회 결과가 해당 없음인 경우에도 반드시 기록한다. 일부 대상에만 기록이 있으면 절차가 상시 작동하지 않는 것으로 평가된다.' },
    ],
    guide: '해당 인력이 없는 경우 그 사실을 증빙 자료에 명시하고 절차서와 빈 관리대장을 제출한다.',
  },

  'D-06': {
    id: 'D-06',
    title: '외국인 인력 관리대장',
    category: '정보보안',
    indicator: '9.1.2 (별표 20: 외국인 인력 관리대장)',
    timing: '채용 및 협력 개시 시, 연 1회',
    author: '정보보안 담당자',
    retention: '5년',
    type: 'table',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'name', label: '성명', width: '100px' },
      { key: 'nationality', label: '국적', width: '100px' },
      { key: 'type', label: '구분', width: '100px', inputType: 'select', options: ['연구원', '산업연수생', '파견인력', '협력사'] },
      { key: 'checkDate', label: '조회일', type: 'date', width: '130px' },
      { key: 'checkResult', label: '조회 결과', width: '100px', inputType: 'select', options: ['해당없음', '해당'] },
      { key: 'oath', label: '보안서약', width: '100px', inputType: 'select', options: ['징구 완료', '미징구'] },
      { key: 'reconfirmDate', label: '재확인일', type: 'date', width: '130px' },
    ],
    guide: '해당 인력이 없는 경우 "해당 없음"을 명시한 상태로 대장을 보유한다. 빈 서식의 존재 자체가 절차 보유의 증빙이 된다.',
  },

  // ==========================================
  // E. 제출·거래 (E-01 ~ E-04)
  // ==========================================
  'E-01': {
    id: 'E-01',
    title: '전략물자 국내거래 통보서',
    category: '거래 통보',
    indicator: '3.3.1 (별표 20: 전략물자 국내거래 통보서)',
    // [수정] 제19조의4는 실제로는 "경유 또는 환적허가" 조문이며 국내거래 통보와 무관 — 잘못된 인용이었음.
    // 국내 인도 시 수출허가 필요성은 제19조(수출허가 등), 관련 서류 5년 보관 근거는 제28조(서류의 보존)로 정정.
    legalBasis: '대외무역법 제19조의2(수출허가), 제28조(서류 보관), 전략물자수출입고시 제75조 제2항 제3호(수출심사 절차)', // [재수정] 제19조는 "전략물자" 지정조항일 뿐 — 수출허가 의무 자체는 제19조의2
    timing: '전략물자를 국내 인도 시마다',
    author: '거래심사 담당자',
    retention: '5년 (제92조)',
    type: 'template',
    fields: [
      { key: 'receiver', label: '수신 (거래 상대방)', type: 'text' },
      { key: 'itemName', label: '품목', type: 'text' },
      { key: 'controlNumber', label: '통제번호', type: 'text', placeholder: '예: 5D002' },
      { key: 'classificationBasis', label: '판정 근거', type: 'text', placeholder: '전문판정서 제____호 (별지 제4호) 또는 자가판정서 (별지 제5호)' },
      { key: 'body', label: '통보 내용 (본문)', type: 'textarea', default: '당사가 귀사에 인도하는 위 품목은 대외무역법과 전략물자 수출입고시에 따른 전략물자에 해당합니다. 이에 다음 사항을 통보드립니다.\n\n1. 위 품목을 국외로 수출하거나 국내에서 외국인에게 이전하고자 하는 경우에는 사전에 관계 행정기관(산업통상부장관 등)의 수출허가(제19조)를 받아야 합니다.\n\n2. 귀사가 위 품목을 제3자에게 재판매하는 경우, 그 상대방에게도 본 통보와 동일한 내용을 통보하여야 합니다.\n\n3. 허가 없이 수출하는 경우 대외무역법 제53조에 따라 5년 이하의 징역 또는 3배 이하의 벌금에 처해집니다.' },
      { key: 'noticeDate', label: '통보일', type: 'date' },
      { key: 'companyName', label: '회사명', type: 'text', default: '(주)팝콘사' },
    ],
    guide: '국내거래 실적이 없더라도 이 서식과 E-02의 계약 조항을 갖추고 있으면 지표를 충족할 수 있습니다.',
  },

  'E-02': {
    id: 'E-02',
    title: '계약서 전략물자 조항안',
    category: '거래 통보',
    indicator: '3.3.1 (별표 20: 계약서 전략물자 명시 조항)',
    legalBasis: '전략물자수출입고시 [별표 7] 제10조(전략물자 거래 시 통보), 제75조', // [수정] 별표7 제13조는 "포괄수출허가의 관리" — 국내거래 통보 근거는 제10조
    timing: '표준계약서 반영 및 체결 시',
    author: '자율수출관리기구, 법무팀',
    retention: '5년',
    type: 'template',
    fields: [
      { key: 'targetContract', label: '적용 대상 계약서', type: 'text', default: '물품/소프트웨어 표준 공급계약서 (본문 말미 부속 특약)' },
      { key: 'articleNumber', label: '특약 조항 번호 설정 (유동적 변경 가능)', type: 'text', default: '제15조', placeholder: '예: 제15조, 제○조, 제18조' },
      { key: 'clauseTitle', label: '특약 조항 제목', type: 'text', default: '전략물자 수출통제 준수 및 사전통보 의무' },
      { key: 'clause1', label: '① 통보 의무 ("을"의 사전 서면 통보)', type: 'textarea', default: '"을"(공급자)은 본 계약에 따라 "갑"(구매자)에게 공급하는 물품 및 소프트웨어가 대외무역법 및 전략물자 수출입고시에 따른 전략물자 또는 상황허가 대상 품목에 해당하는 경우, 그 사실과 관련 통제번호를 "갑"에게 서면으로 사전 통보한다.' },
      { key: 'clause2', label: '② "갑"의 준수 의무 (수출허가 취득 및 제3자 재판매 시 통보)', type: 'textarea', default: '"갑"은 전항에 따라 통보받은 물품 및 기술을 국외로 수출하거나 국내에서 외국인에게 이전하고자 하는 경우 사전에 관계 행정기관의 수출허가를 득해야 하며, 이를 국내외 제3자에게 재판매 또는 양도하는 경우에도 그 상대방에게 동일한 전략물자 준수 및 통보 의무를 계약서에 명시하여 통보하여야 한다.' },
      { key: 'clause3', label: '③ 면책 조항 ("갑"의 위반 시 "을"의 면책)', type: 'textarea', default: '"갑"이 전항의 의무를 위반하여 발생한 일체의 법적 분쟁, 과태료 및 행정처분에 대하여 "을"은 면책되며, "을"에게 발생한 손해에 대하여 "갑"이 전액 배상한다.' },
      { key: 'productNote', label: '제품설명서 / 견적서 / 거래명세서 삽입 문구', type: 'textarea', default: '본 제품은 대외무역법 및 전략물자 수출입고시에 따른 전략물자에 해당할 수 있습니다. 국외 수출 또는 외국인에 대한 이전 시에는 사전에 관계 행정기관의 허가가 필요하며, 재판매 시에도 이를 통보하여야 합니다.' },
    ],
    guide: '본 특약 조항은 당사 표준 공급계약서 본문 조항(비밀유지, 손해배상 등) 뒤에 이어서 삽입하여 체결하는 특약 조항입니다. 귀사 계약서 체계에 맞추어 조항 번호(예: 제15조, 제○조)를 설정하신 후 [미리보기/인쇄]를 통해 PDF로 저장하여 증빙으로 편철할 수 있습니다.',
  },

  'E-03': {
    id: 'E-03',
    title: '회사소개서 (별지 제15호 서식)',
    category: '제출서류',
    indicator: '지정신청 구비서류 ② (회사소개서)',
    legalBasis: '전략물자수출입고시 제78조 제1항 제1호(별지 제15호 서식에 따른 회사소개서)',
    timing: '지정신청 시',
    author: '자율수출관리기구, 관리부서',
    retention: '5년',
    // [정리] hasFormTemplate('E-03')=true → tmpl_15()로 렌더링됩니다. type/sections는 사용되지 않습니다.
    // 필드를 고치려면 formTemplates.js의 tmpl_15를 수정하세요.
    guide: '수출 실적이 없다면 그 사실과 향후 계획을 명시한다. 공통 질문사항의 4번과 5번 답변이 이 문서와 모순되지 않게 한다. tmpl_15는 별지 제15호 법정 서식의 ①~⑳ 번호 항목을 반영하므로, 정부 제출용 최종본에는 이 항목들이 반드시 채워져 있어야 합니다.',
  },

  'E-04': {
    id: 'E-04',
    title: '업체 공통 질문사항 작성안',
    category: '제출서류',
    indicator: '지정신청 구비서류 ⑤ (업체 공통 질문사항 작성안)',
    legalBasis: '전략물자수출입고시 제78조 제1항(지정신청 첨부 서류), 별표 20(등급심사기준)',
    timing: '지정신청 시',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'qa',
    questions: [
      { key: 'q1_1', number: '1-1', question: '신청유형', answer: '유형2에 O 표시', type: 'text', default: '유형2' },
      { key: 'q1_2', number: '1-2', question: '신청등급 (제76조: A/AA/AAA)', type: 'text', default: 'AA' },
      { key: 'q2', number: '2', question: 'CP 인증서(별지 제17호 지정서) 수신처 주소', type: 'textarea', placeholder: '우편번호, 주소, 부서, 담당자 성명과 전화번호' },
      { key: 'q3', number: '3', question: '본사 소재 국가명', type: 'text', default: '해당 없음 (국내 법인)' },
      { key: 'q4', number: '4', question: '신청업체 관련 설명', type: 'textarea', placeholder: '설립 연도, 소재지, 주요 사업, 특징을 한두 줄로 기재' },
      { key: 'q5', number: '5', question: '취급 전략물자 및 업계 특성', type: 'textarea', placeholder: '판정 결과를 근거로 품목, 주 용도, 거래처, 업계 특성을 기재' },
      { key: 'q6', number: '6', question: 'CP 신청 동기 및 활용 계획', type: 'textarea', placeholder: 'AA등급 지정 시 기술의 자가판정(제13조)이 가능해지는 점, 별표 19의 등급별 특례(제84조) 활용 계획 등 기재' },
      { key: 'q7', number: '7', question: '최근 6년간 행정 및 사법처분 내역 (제89조)', type: 'textarea', placeholder: '대표이사 확인 후 작성. 해당 없으면 "해당 없음" 기재. 무허가수출등(제89조 제2항 제2호~5호)에 의한 수출제한 여부도 확인' },
      { key: 'q8', number: '8', question: '현장심사 불가 및 희망 일자', type: 'textarea', placeholder: '제79조의3에 따른 현장심사 대비. 제출일로부터 2개월 내에서 출장 일정 등을 확인하여 기재' },
    ],
    guide: '지정신청서는 별지 제13호 서식을 사용합니다. 제78조에 따른 첨부서류: ①별지 제15호 회사소개서, ②자율수출관리기구 조직도, ③자율수출관리규정, ④별표 20 등급별 구비서류. 심의위원회(제80조)의 심의를 거쳐 40일 이내에 지정 여부가 결정됩니다.',
  },

  'E-05': {
    id: 'E-05',
    title: '자율준수무역거래자지정 신청서 (별지 제13호)',
    category: '제출서류',
    indicator: '지정신청 구비서류 ① (자율준수무역거래자지정 신청서)',
    legalBasis: '전략물자수출입고시 제78조 제1항(지정신청 첨부 서류)',
    timing: '지정신청 시',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '회사 정보',
        fields: [
          { key: 'companyName', label: '회사명', type: 'text' },
          { key: 'regNumber', label: '사업자등록번호', type: 'text' },
          { key: 'tradeCode', label: '무역업고유(신고)번호', type: 'text' },
          { key: 'ceoName', label: '대표이사', type: 'text' },
          { key: 'address', label: '주소', type: 'text' },
          { key: 'grade', label: '희망등급', type: 'select', options: ['A', 'AA', 'AAA'] },
        ],
      },
      {
        title: '자율준수관리기구의 장',
        fields: [
          { key: 'headName', label: '성명', type: 'text' },
          { key: 'headDept', label: '소속', type: 'text' },
          { key: 'headPosition', label: '직위', type: 'text' },
          { key: 'headPhone', label: '전화', type: 'text' },
          { key: 'headFax', label: '팩스', type: 'text' },
          { key: 'headMobile', label: '휴대전화', type: 'text' },
          { key: 'headEmail', label: '전자우편', type: 'text' },
        ],
      },
      {
        title: '자율준수체제 담당자',
        fields: [
          { key: 'staffName', label: '성명', type: 'text' },
          { key: 'staffDept', label: '소속', type: 'text' },
          { key: 'staffPosition', label: '직위', type: 'text' },
          { key: 'staffPhone', label: '전화', type: 'text' },
          { key: 'staffFax', label: '팩스', type: 'text' },
          { key: 'staffMobile', label: '휴대전화', type: 'text' },
          { key: 'staffEmail', label: '전자우편', type: 'text' },
        ],
      },
      {
        title: '판정담당자',
        fields: [
          { key: 'classifierName', label: '성명', type: 'text' },
          { key: 'classifierDept', label: '소속', type: 'text' },
          { key: 'classifierPosition', label: '직위', type: 'text' },
          { key: 'classifierPhone', label: '전화', type: 'text' },
          { key: 'classifierFax', label: '팩스', type: 'text' },
          { key: 'classifierMobile', label: '휴대전화', type: 'text' },
          { key: 'classifierEmail', label: '전자우편', type: 'text' },
        ],
      },
    ],
    guide: '지정신청서는 별지 제13호 서식을 사용합니다. 처리기간: 40일',
  },



  'F-01': {
    id: 'F-01',
    title: '자가판정서 (별지 제5호)',
    category: '전략물자 판정',
    indicator: '3.1.1, 3.1.5 (별표 20: 자가판정서 및 판정결과 DB화)',
    legalBasis: '전략물자수출입고시 제13조(자가판정)',
    timing: '판정 착수 시',
    author: '자율수출관리기구',
    retention: '5년 (제92조 제1호)',
    type: 'structured',
    ai_analyzable: true,
    sections: [
      {
        title: '① 판정인 (Company)',
        fields: [
          { key: 'companyName', label: '상호 (Name of Company)', type: 'text' },
          { key: 'ceoName', label: '대표자성명 (Name of Representative)', type: 'text' },
          { key: 'address', label: '주소 (Address)', type: 'text' },
          { key: 'telephone', label: '전화 (Telephone)', type: 'text' },
          { key: 'regNumber', label: '사업자등록번호 (Business Reg. No.)', type: 'text' },
          { key: 'tradeCode', label: '무역업고유번호 (Trade Business Code)', type: 'text' },
        ],
      },
      {
        title: '②③④ 물품 정보',
        fields: [
          { key: 'hsCode', label: '② HS번호 (HS Code)', type: 'text' },
          { key: 'itemName', label: '③ 물품명 (Item)', type: 'text' },
          { key: 'modelNumber', label: '④ 모델번호 및 모델명 (Model No. & Name)', type: 'text' },
          { key: 'specUsage', label: '④ 규격/용도 (Specifications/Usage)', type: 'textarea' },
        ],
      },
      {
        title: '⑤ 관련 통제체제',
        fields: [
          { key: 'regime_wa', label: 'WA', type: 'select', options: ['', 'yes'] },
          { key: 'regime_nsg', label: 'NSG', type: 'select', options: ['', 'yes'] },
          { key: 'regime_mtcr', label: 'MTCR', type: 'select', options: ['', 'yes'] },
          { key: 'regime_ag', label: 'AG', type: 'select', options: ['', 'yes'] },
          { key: 'regime_cwc', label: 'CWC', type: 'select', options: ['', 'yes'] },
          { key: 'regime_bwc', label: 'BWC', type: 'select', options: ['', 'yes'] },
          { key: 'regime_att', label: 'ATT', type: 'select', options: ['', 'yes'] },
        ],
      },
      {
        title: '⑥ 판정결과 (Classification results)',
        fields: [
          { key: 'strategic', label: '전략물자 해당여부', type: 'select', options: ['', 'yes', 'no'] },
          { key: 'catchAll', label: '상황허가 대상품목 해당여부', type: 'select', options: ['', 'yes', 'no'] },
          { key: 'controlNo', label: '통제번호 (Control No.)', type: 'text' },
          { 
            key: 'regime_wa_s', 
            label: '[WA] 민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 WA 민감 품목은 시스템 검색기의 이중용도 탭에서 "[민감]"으로 검색 가능합니다.<br/><button type="button" class="btn btn-secondary btn-nav-search" style="margin-top:4px; font-size:0.75rem; padding:4px 8px;">🔍 시스템 검색기 열기</button>'
          },
          { 
            key: 'regime_wa_ss', 
            label: '[WA] 초민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 WA 초민감 품목은 시스템 검색기의 이중용도 탭에서 "[초민감]"으로 검색 가능합니다.<br/><button type="button" class="btn btn-secondary btn-nav-search" style="margin-top:4px; font-size:0.75rem; padding:4px 8px;">🔍 시스템 검색기 열기</button>'
          },
          { 
            key: 'regime_nsg_p1', 
            label: '[NSG] Part1 민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 NSG Part1 품목은 대외무역법 통제 리스트 및 고시 [별표 8]을 참고하세요.',
            externalLink: { url: '/pdf/[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf', label: '📄 [별표 8] PDF 확인하기' }
          },
          { 
            key: 'regime_mtcr_c1', 
            label: '[MTCR] Cat1', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 MTCR Cat1 품목은 미사일 기술 통제 체제 리스트 및 고시 [별표 8]을 참고하세요.',
            externalLink: { url: '/pdf/[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf', label: '📄 [별표 8] PDF 확인하기' }
          },
        ],
      },
      {
        title: '⑦⑧⑨ 추가 정보',
        fields: [
          { key: 'classificationComments', label: '⑦ 판정 상세근거', type: 'textarea' },
          { key: 'selfClassRegNo', label: '⑧ 자가판정 등록번호', type: 'text' },
          { key: 'educationRegNo', label: '⑨ 교육이수번호', type: 'text' },
        ],
      },
    ],
    guide: '실제 법적 자가판정은 정부의 <a href="https://www.yestrade.go.kr" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">YesTrade 시스템</a>에서 진행해야 합니다. 본 양식은 YesTrade 입력 전 사내 검토(Draft) 및 품의용으로 활용하며, 발급된 원본 판정서는 [F-04. 판정관리대장]에 첨부하여 보관합니다.',
  },

  'F-02': {
    id: 'F-02',
    title: '전문판정신청서 (별지 제4호)',
    category: '전략물자 판정',
    indicator: '3.1.1, 3.1.5 (별표 20: 전문판정신청서 및 DB화)',
    legalBasis: '전략물자수출입고시 제14조(전문판정 신청)',
    timing: '판정 신청 전',
    author: '자율수출관리기구',
    retention: '5년 (제92조 제1호)',
    type: 'structured',
    sections: [
      {
        title: '① 신청인 (Applicant)',
        fields: [
          { key: 'companyName', label: '상호 (Name of Company)', type: 'text' },
          { key: 'applicantName', label: '신청인 (Applicant)', type: 'text' },
          { key: 'address', label: '주소 (Address)', type: 'text' },
          { key: 'regNumber', label: '사업자등록번호 (Business Reg. No.)', type: 'text' },
          { key: 'telephone', label: '전화 (Telephone)', type: 'text' },
          { key: 'tradeCode', label: '무역업고유번호 (Trade Business Code)', type: 'text' },
          { key: 'disclosure', label: '판정결과 공개여부', type: 'select', options: ['', 'public', 'partial', 'private'] },
        ],
      },
      {
        title: '②③④ 물품 정보',
        fields: [
          { key: 'hsCode', label: '② HS번호 (HS Code)', type: 'text' },
          { key: 'itemName', label: '③ 물품명(기술명 및 기술내용) (Item)', type: 'text' },
          { key: 'modelNumber', label: '④ 모델번호 및 모델명', type: 'text' },
          { key: 'specUsage', label: '④ 규격/용도 (Specifications/Usage)', type: 'textarea' },
        ],
      },
      {
        title: '⑤ 판정 결과 (Classification results)',
        fields: [
          { key: 'dualUse', label: '이중용도품목 (Dual-Use)', type: 'select', options: ['', 'yes', 'no', 'except'] },
          { key: 'triggerItem', label: '원자력전용품목 (Trigger)', type: 'select', options: ['', 'yes', 'no', 'except'] },
          { key: 'munition', label: '군용물자품목 (Munition)', type: 'select', options: ['', 'yes', 'no', 'except'] },
          { key: 'catchAll', label: '상황허가대상 (Catch-all)', type: 'select', options: ['', 'yes', 'no'] },
          { key: 'controlNo', label: '통제번호 (Classification No.)', type: 'text' },
          { 
            key: 'regime_wa_s', 
            label: '[WA] 민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 WA 민감 품목은 시스템 검색기의 이중용도 탭에서 "[민감]"으로 검색 가능합니다.<br/><button type="button" class="btn btn-secondary btn-nav-search" style="margin-top:4px; font-size:0.75rem; padding:4px 8px;">🔍 시스템 검색기 열기</button>'
          },
          { 
            key: 'regime_wa_ss', 
            label: '[WA] 초민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 WA 초민감 품목은 시스템 검색기의 이중용도 탭에서 "[초민감]"으로 검색 가능합니다.<br/><button type="button" class="btn btn-secondary btn-nav-search" style="margin-top:4px; font-size:0.75rem; padding:4px 8px;">🔍 시스템 검색기 열기</button>'
          },
          { 
            key: 'regime_nsg', 
            label: '[NSG] Part1 민감', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 NSG Part1 품목은 대외무역법 통제 리스트 및 고시 [별표 8]을 참고하세요.',
            externalLink: { url: '/pdf/[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf', label: '📄 [별표 8] PDF 확인하기' }
          },
          { 
            key: 'regime_mtcr', 
            label: '[MTCR] Cat1', 
            type: 'select', 
            options: ['', 'yes'],
            description: '💡 MTCR Cat1 품목은 미사일 기술 통제 체제 리스트 및 고시 [별표 8]을 참고하세요.',
            externalLink: { url: '/pdf/[별표 8] 사용자 및 품목 포괄수출허가 대상품목(전략물자수출입고시).pdf', label: '📄 [별표 8] PDF 확인하기' }
          },
        ],
      },
      {
        title: '⑥⑦⑧ 추가 정보',
        fields: [
          { key: 'classificationComments', label: '⑥ 판정 상세근거', type: 'textarea' },
          { key: 'validity', label: '⑦ 유효기간', type: 'text' },
          { key: 'issueNo', label: '⑧ 발급번호', type: 'text' },
        ],
      },
    ],
    guide: '전문판정 신청은 정부 <a href="https://www.yestrade.go.kr" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">YesTrade 시스템</a>을 통해 진행됩니다. 본 양식은 전문판정을 의뢰하기 위한 사내 결재 및 검토용이며, 결과 수령 후 [F-04. 판정관리대장]에 등록해야 합니다.',
  },

  'F-03': {
    id: 'F-03',
    title: '전략물자(소프트웨어/보안장비) 기술질의서 - 전문판정 첨부용',
    category: '전략물자 판정',
    indicator: '3.1.1 (별표 20: 판정 기술분석 질의서)',
    legalBasis: '전문판정 신청 시 필수 제출 서류 (카테고리 5)',
    timing: '판정 신청 전',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'structured',
    ai_analyzable: true,
    sections: [
      {
        title: 'Q1. 암호분석 기능 수행 여부',
        fields: [
          { key: 'q1_yn', label: '‘암호분석 기능’을 수행하기 위해 설계되거나 개조되었습니까?', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q1_desc', label: '상세내용 (선택 이유 서술)', type: 'textarea' }
        ]
      },
      {
        title: 'Q2. 미가공 데이터 추출 기능 여부',
        fields: [
          { key: 'q2_yn', label: '컴퓨터 또는 통신 장비에서 ‘미가공 데이터를 추출’하는 기능이 있습니까?', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q2_desc', label: '상세내용', type: 'textarea' }
        ]
      },
      {
        title: 'Q3. 인증 회피 기능 유무',
        fields: [
          { key: 'q3_yn', label: '인증이나 장치의 승인 제어를 회피하기 위해 설계되었습니까? (Q2 기능 수행 관련)', type: 'select', options: ['', '예', '아니오', '해당없음'] },
          { key: 'q3_desc', label: '상세내용', type: 'textarea' }
        ]
      },
      {
        title: 'Q4. 개발/생산 전용 설계 시스템 여부',
        fields: [
          { key: 'q4_yn', label: '컴퓨팅 또는 통신장치의 “개발”이나 “생산”을 위해 전용 설계된 시스템 또는 장비입니까?', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q4_desc', label: '상세내용', type: 'textarea' }
        ]
      },
      {
        title: 'Q5. 디버거, 탈옥 등 포함 여부',
        fields: [
          { key: 'q5_yn', label: '디버거, 논리적 데이터 추출, JTAG 데이터 추출, 탈옥(rooting) 등을 포함하고 있습니까?', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q5_desc', label: '해당하는 항목 서술', type: 'textarea' }
        ]
      },
      {
        title: 'Q6. 보안 프로토콜 또는 암호 알고리즘 사용/지원',
        fields: [
          { key: 'q6_yn', label: '사용/지원 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q6_desc', label: '상세내용 (사용 프로토콜/알고리즘 명시)', type: 'textarea' }
        ]
      },
      {
        title: 'Q7. 암호화 기능 사용 목적 (인증, 무결성, OAM 등)',
        fields: [
          { key: 'q7_yn', label: '지정 목적(인증, 서명 등)으로만 사용 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q7_desc', label: '세부 목적 서술', type: 'textarea' }
        ]
      },
      {
        title: 'Q8. ECCN (옵션)',
        fields: [
          { key: 'q8_eccn', label: 'ECCN 번호 기재', type: 'text' }
        ]
      },
      {
        title: 'Q9. 대중 소매 판매처 구입 가능 여부',
        fields: [
          { key: 'q9_yn', label: '규제 없이 구입 가능 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q9_desc', label: '구입 방법(일반판매, 전자상거래 등) 상세 기재', type: 'textarea' }
        ]
      },
      {
        title: 'Q10. 가격 및 기능 정보 접근성',
        fields: [
          { key: 'q10_yn', label: '공개된 카탈로그/URL 존재 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q10_desc', label: 'URL 또는 제공 방법 기술', type: 'textarea' }
        ]
      },
      {
        title: 'Q11. 암호화 기능 임의 변경 가능성',
        fields: [
          { key: 'q11_yn', label: '사용자 임의 변경 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q11_desc', label: '상세내용', type: 'textarea' }
        ]
      },
      {
        title: 'Q12. 사용자 자가 설치 설계',
        fields: [
          { key: 'q12_yn', label: '공급자 도움 없이 설치 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q12_desc', label: '관련 매뉴얼 명칭', type: 'textarea' }
        ]
      },
      {
        title: 'Q13. 세부정보 정부기관 제출 가능성',
        fields: [
          { key: 'q13_yn', label: '요청 시 정보 제출 동의 여부', type: 'select', options: ['', '예', '아니오'] }
        ]
      },
      {
        title: 'Q14. 상용 암호화의 OAM 목적 사용',
        fields: [
          { key: 'q14_yn', label: 'OAM 목적으로만 사용 여부', type: 'select', options: ['', '예', '아니오'] },
          { key: 'q14_desc', label: 'OAM 세부 기능 서술', type: 'textarea' }
        ]
      },
    ],
    guide: '사양서나 카탈로그를 업로드하면 멀티모달 AI가 내용을 분석하여 9가지 필수 질문을 자동으로 채워줍니다.',
  },

  'F-04': {
    id: 'F-04',
    title: '전략물자 판정관리대장',
    category: '전략물자 판정',
    indicator: '3.1.5 (별표 20: 판정결과를 DB화 하였는가)', // [수정] 3.1.2는 판정 "시점"을 묻는 별개 지표 — 판정결과 대장·DB화는 3.1.5
    timing: '판정 완료 직후 (자가판정 완료 또는 전문판정서 수령 후)',
    author: '자율수출관리부서',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '과거 판정 이력 연동',
        fields: [
          { key: 'product_history', type: 'product_history', label: '' }
        ]
      },
      {
        title: '최종 판정 결과 등록',
        fields: [
          { key: 'q_decision_type', label: '판정 방식', type: 'select', options: ['', '자가판정', '전문판정(전략물자관리원)', '기타'] },
          { key: 'q_decision_result', label: '판정 결과 (해당 여부)', type: 'select', options: ['', '전략물자 해당', '전략물자 비해당', '상황허가 대상'] },
          { 
            key: 'q_sensitivity', 
            label: '민감도 분류 (별표 2)', 
            type: 'select', 
            options: ['', '일반품목', '민감품목', '초민감품목'],
            description: '<strong style="color:var(--accent-amber);">⚖️ 법적 근거: 전략물자수출입고시 제28조(사용자포괄수출허가)·제34조(품목포괄수출허가) 및 [별표 8] 포괄수출허가 원천 배제 품목</strong><br/>이 분류에 따라 수출허가 신청 트랙이 강제됩니다. 초민감품목은 어떠한 경우에도 포괄수출허가(L-02)를 받을 수 없으며 반드시 개별수출허가(L-01)를 진행해야 합니다. <br/><br/><a href="https://www.law.go.kr/행정규칙/전략물자수출입고시" target="_blank" style="display:inline-flex; align-items:center; gap:4px; color:var(--accent-blue); text-decoration:none; font-weight:bold; background:rgba(59,130,246,0.1); padding:4px 8px; border-radius:4px;"><span class="material-symbols-rounded" style="font-size:16px;">picture_as_pdf</span> [별표 8] 초민감품목 확인하기</a>' 
          },
          { key: 'q_hs_code', label: '관세청 HS Code', type: 'text', placeholder: '예: 8523.51-1000' },
          { key: 'q_control_number', label: '최종 확정 통제번호', type: 'text', placeholder: '예: 5D002.c (비해당인 경우 N/A 기입)' },
          { key: 'q_decision_date', label: '판정(발급) 일자', type: 'date' },
          { key: 'q_decision_maker', label: '판정 책임자 / 부서', type: 'text' },
          { key: 'q_notes', label: '비고 및 특이사항', type: 'textarea', placeholder: '판정 근거 및 첨부서류(판정서 스캔본 등) 위치 메모' }
        ]
      }
    ],
    guide: '진행된 [F-01] 자가판정서나 [F-02] 전문판정 신청 결과를 바탕으로, 이 수출 거래(Export Case)에 속한 제품의 최종 통제번호를 이 판정대장에 등록하십시오. 이 대장에 기입된 통제번호는 이후 수출허가 및 출하 통제 서류 작성 시 기준이 됩니다.',
  },

  // ==========================================
  // G. 수출심사 및 통보 (G-01)
  // ==========================================
  'G-01': {
    id: 'G-01',
    title: '전략물자 거래심사표 (우려거래자 & 상황허가 검토서)',
    category: '수출심사 및 통보',
    indicator: '3.2.4.1, 3.2.4.2 (별표 20: 전략물자 거래심사표 - 우려거래자/용도확인)',
    legalBasis: '전략물자수출입고시 제22조(개별수출허가의 심사기준), 제54~56조(상황허가의 대상·신청·심사), 제94조의2(우려거래자 지정 및 등록), 별표 2의2(상황허가 대상품목)', // [수정] 제18조는 "수출허가의 지침"(원자력 국한), 제21조는 "신청서류 일부면제" — 심사기준·상황허가 근거 아님
    timing: '계약 체결 전 (영업부서 신규 거래 발굴 및 수출 전 심사 시)',
    author: '영업부서 / 거래심사 담당자 / 자율수출관리기구',
    retention: '5년 (제92조)',
    type: 'structured',
    sections: [
      {
        title: '① 기본 거래 정보',
        fields: [
          { key: 'exportContractNo', label: '계약/P.O 번호', type: 'text', placeholder: '예: PO-2026-0812' },
          { key: 'exportAmountUSD', label: '수출 금액 (USD) — 계약서 기준', type: 'text', placeholder: '예: 50,000', description: '💡 이 값은 K-01(사전거래보고서), L-01(개별수출허가신청서) 등에 자동 매핑됩니다.' },
          { key: 'exportQuantity', label: '수출 수량 및 단위', type: 'text', placeholder: '예: 1 Set / 5 개 / 100 EA' },
          { key: 'buyerName', label: '구매자 (Buyer)', type: 'text', placeholder: '상호명 및 대표자' },
          { key: 'consigneeName', label: '최종수하인 (Consignee)', type: 'text', placeholder: '수하인 상호 및 주소' },
          { key: 'endUserName', label: '최종사용자 (End-User)', type: 'text', placeholder: '실제 최종 사용 기업/기관명' },
          { key: 'agentName', label: '중개인 / 대리점 (Agent)', type: 'text', placeholder: '해당 없을 시 N/A — 고시 제20조 4자 확인 의무' },
          { key: 'agentCountry', label: '중개인 소재 국가', type: 'select', options: ['', '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '뉴질랜드', '폴란드', 'UAE', '사우디아라비아', '인도', '베트남', '중국', '러시아', '이란', '북한', '없음', '기타'] },
          { key: 'purchaserCountry', label: '구매자 소재 국가', type: 'select', options: ['', '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '뉴질랜드', '폴란드', 'UAE', '사우디아라비아', '인도', '베트남', '중국', '러시아', '이란', '북한', '기타'] },
          { key: 'purchaserRegion', label: '구매자 통제지역', type: 'text', readonly: true },
          { key: 'consigneeCountry', label: '수하인 소재 국가', type: 'select', options: ['', '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '뉴질랜드', '폴란드', 'UAE', '사우디아라비아', '인도', '베트남', '중국', '러시아', '이란', '북한', '기타'] },
          { key: 'consigneeRegion', label: '수하인 통제지역', type: 'text', readonly: true },
          { key: 'endUserCountry', label: '최종사용자 소재 국가', type: 'select', options: ['', '미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '뉴질랜드', '폴란드', 'UAE', '사우디아라비아', '인도', '베트남', '중국', '러시아', '이란', '북한', '기타'] },
          { key: 'endUserRegion', label: '최종사용자 통제지역', type: 'text', readonly: true },
          { key: 'effectiveRegion', label: '🚨 최종 통제 적용 지역 (Worst-case)', type: 'text', readonly: true, description: '세 당사자 중 가장 제재 수준이 높은 지역이 본 거래의 최종 규제 기준으로 자동 판별됩니다.' },
          { key: 'endUsePurpose', label: '최종 용도 (End-Use)', type: 'textarea', placeholder: '물품 또는 소프트웨어의 구체적인 사용 목적 및 설치 환경 기술' },
        ],
      },
      {
        title: '② 포괄수출허가 요건 검토 (자율준수무역거래자 특례)',
        fields: [
          { key: 'isRepeatBuyer', label: '사용자포괄 조건: 본 수출은 과거 수출실적이 있는 동일 바이어/사용자에 대한 수출입니까?', type: 'select', options: ['', '예', '아니오'], description: '⚠️ 안전성이 확보된 기존 바이어인 경우 포괄허가 대상이 될 수 있습니다.' },
          { key: 'isRepeatItem', label: '품목포괄 조건: 본 수출 품목은 과거 타사 등에 수출 실적이 있는 동일 품목입니까?', type: 'select', options: ['', '예', '아니오'] },
          { key: 'comprehensiveEligibility', label: '포괄수출허가(L-02) 대상 가능성', type: 'info', text: '<div style="color:var(--accent-teal); font-weight:bold; margin-bottom:4px;">[포괄수출허가 적용 검토]</div><div style="font-size:0.85rem; line-height:1.5;">바이어가 우려거래자가 아니고, "최종 통제 적용 지역"이 "가 지역"이며, 위 조건 중 하나 이상을 충족할 경우 포괄수출허가(L-02) 혜택을 받을 수 있습니다.</div>', dependsOn: { field: 'effectiveRegion', value: ['가 지역'] } }
        ]
      },
      {
        title: '③ [별표 2의2] 상황허가(Catch-all) 대상품목 검토',
        fields: [
          { 
            key: 'catchAllItemCheck', 
            label: '[별표 2의2] 상황허가 대상 품목 해당 여부', 
            type: 'select', 
            options: ['', '해당 없음 (일반 비통제)', '해당 (상황허가 대상)', '검토 요망'],
            description: '<a href="https://www.law.go.kr/행정규칙/전략물자수출입고시" target="_blank" style="color:var(--accent-blue); text-decoration:underline; font-weight:bold;">👉 [별표 2의2] 상황허가 대상품목 리스트 원문 보기 (고시)</a>'
          },
          { key: 'catchAllItemName', label: '상황허가 해당 품목명 및 번호', type: 'text', placeholder: '예: [별표 2의2] 공작기계 번호 1', dependsOn: { field: 'catchAllItemCheck', value: ['해당 (상황허가 대상)', '검토 요망'] } },
          { key: 'catchAllTargetCountry', label: '해당 통제 국가/지역', type: 'text', placeholder: '예: 이란, 시리아, 파키스탄, 러시아 등', dependsOn: { field: 'catchAllItemCheck', value: ['해당 (상황허가 대상)', '검토 요망'] } },
          { key: 'catchAllRationale', label: '【체크 사유 및 법정 통제 이유】', type: 'textarea', placeholder: 'WMD 전용 우려, 화학/생물무기 시설 전용 위험 또는 대러시아 군사 통제 사유를 구체적으로 기술합니다.', dependsOn: { field: 'catchAllItemCheck', value: ['해당 (상황허가 대상)', '검토 요망'] } },
        ],
      },
      {
        title: '④ 우려거래자(DPL) 스크리닝 (1단계)',
        fields: [
          { 
            key: 'dplScreeningResult', 
            label: 'YesTrade 우려거래자 스크리닝 결과', 
            type: 'select', 
            options: ['', '정상 (우려거래자 미해당)', '주의 (유사 명칭 발견 - 소명 완료)', '위험 (우려거래자 일치 - 거래 중단)'],
            description: 'YesTrade 포털에서 구매자 및 최종사용자가 제재 대상(Entity List 등)인지 먼저 조회하세요.',
            externalLink: {
              label: 'YesTrade 우려거래자 조회하기',
              url: 'https://www.yestrade.go.kr'
            }
          },
          { key: 'dplScreeningDate', label: '스크리닝 조회 일자', type: 'date' },
          {
            key: 'dplLegalWarning',
            label: '⚠️ 법적 조치 안내 (우려거래자 일치)',
            type: 'info',
            text: '<div style="color:var(--accent-red); font-weight:bold; margin-bottom:4px;">[거래 보류 및 개별/상황허가 신청 요망]</div><div style="font-size:0.85rem; line-height:1.5;">대외무역법 제19조 및 고시 제22조에 따라, 제재대상 우려거래자에게는 포괄수출허가를 적용할 수 없으며 무허가 수출이 엄격히 금지됩니다.<br>👉 즉시 선적을 보류하고 자율수출관리기구장에게 보고한 후, 정부(전략물자관리원)에 <strong>개별수출허가 또는 상황허가</strong>를 신청하여 승인을 받아야만 수출이 가능합니다.</div>',
            dependsOn: { field: 'dplScreeningResult', value: ['위험 (우려거래자 일치 - 거래 중단)'] }
          }
        ],
      },
      {
        title: '⑤ 12대 의심징후(Red Flags) 검토 (2단계)',
        dependsOn: { field: 'dplScreeningResult', value: ['정상 (우려거래자 미해당)', '주의 (유사 명칭 발견 - 소명 완료)'] },
        fields: [
          {
            key: 'redFlagResult',
            label: '고시 제21조 12대 의심징후 스크리닝 결과',
            type: 'select',
            options: ['', '이상 없음 (안전)', '의심 징후 발견 (상황허가 대상)'],
            description: '<div style="background:rgba(99,102,241,0.05); padding:10px; border-radius:6px; font-size:0.8rem; line-height:1.6; margin-top:8px; color:var(--text-secondary);"><strong>[검토 항목]</strong><br>1. 최종 용도 정보제공 기피<br>2. 사업분야와 무관한 물품 요구<br>3. 통상적인 성능 이상의 조건 요구<br>4. 비정상적 지불 조건 제시<br>5. 비정상적 납기 조건 제시<br>6. 비정상적 운송 경로 요구<br>7. 수입자/최종사용자 정보 제공 기피<br>8. 설치/유지보수 접근 기피<br>9. 군사/정부 연구기관 관련성<br>10. 정부 통제 회피 정황<br>11. 무기전용 가능성 인지<br>12. 최종사용자 정보 미제공</div>'
          },
          {
            key: 'redFlagLegalWarning',
            label: '⚠️ 법적 조치 안내 (상황허가)',
            type: 'info',
            text: '<div style="color:var(--accent-red); font-weight:bold; margin-bottom:4px;">[출하 보류 및 상황허가 신청 요망]</div><div style="font-size:0.85rem; line-height:1.5;">대외무역법 제19조 제3항 및 고시 제21조에 따라, 1개 이상의 의심 징후가 발견되어 대량살상무기(WMD) 전용 우려가 인지된 경우 자의적인 수출이 금지됩니다.<br>👉 즉시 출하를 보류하고 정부(전략물자관리원)에 <strong>상황허가(Catch-All)</strong>를 신청하여 공식 승인을 받아야 합니다.</div>',
            dependsOn: { field: 'redFlagResult', value: ['의심 징후 발견 (상황허가 대상)'] }
          }
        ]
      },
      {
        title: '⑥ 자율수출관리기구 종합 심사 결론',
        fields: [
          { key: 'screeningDecision', label: '최종 심사 판정', type: 'select', options: ['', '거래 승인 (수출 진행 가능)', '상황허가 신청 필수 (L-01)', '개별수출허가 신청 필수 (L-01)', '추가 서류 보완 요구', '거래 거절 (수출 불가)'] },
          { key: 'decisionReason', label: '판정 사유 및 조치 사항', type: 'textarea', placeholder: '판정의 종합적인 근거와 향후 필요한 수출통제 조치사항을 명시합니다.' },
          { key: 'screenerName', label: '거래심사 담당자 성명', type: 'text' },
          { key: 'approverName', label: '자율수출관리기구의 장 결재', type: 'text' },
        ],
      },
    ],
    guide: '※ 계약 체결 전 F-01 통합 검색기를 이용하여 품목 및 우려거래자 해당 여부를 먼저 조회하신 후 그 결과를 근거로 작성하세요.\\n모든 거래에 대해 출하 전 반드시 작성되어야 하며, 자율수출관리기구장의 최종 승인이 있어야만 수출이 가능합니다.\\n심사 중 의심징후가 발견되거나 서류 미비 시 기구장은 "절차 중단(출하 보류)"을 명할 수 있습니다.',
  },

  // ==========================================
  // H. 출하관리 (H-01)
  // ==========================================
  'H-01': {
    id: 'H-01',
    title: '출하 전 수출통제 검토서',
    category: '출하관리',
    indicator: '4.1.2 (별표 20: 출하 전 전략물자 교차 검증 점검표)',
    legalBasis: '전략물자수출입고시 제75조 제2항 제4호(출하관리 또는 기술이전관리), 제25조(개별수출허가의 유효기간 - 1년)',
    timing: '수출 물품 최종 출하 전',
    author: '출하관리 담당자',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '① 수출(제공) 형태 선택',
        fields: [
          { key: 'exportMethod', label: '수출(제공) 형태', type: 'select', options: ['', '물리적 화물 선적 (Hardware)', '무형 기술이전 (Software/ITT, 이메일/클라우드 등)'], description: '소프트웨어나 설계도면을 온라인으로 전송하는 경우 무형 기술이전을 선택하세요.' }
        ]
      },
      {
        title: '② 공통 점검 항목',
        type: 'checklist',
        dependsOn: { field: 'exportMethod', value: ['물리적 화물 선적 (Hardware)', '무형 기술이전 (Software/ITT, 이메일/클라우드 등)'] },
        items: [
          '자율수출관리기구의 최종 수출 승인이 완료되었는가',
          '전략물자 판정서 원본(또는 자가판정서)이 구비되어 있는가',
          '전략물자 해당 시 정부 수출허가서 원본이 구비되어 있는가',
          '수출허가서에 기재된 최종 목적지 및 수하인이 실제 정보와 일치하는가',
          '수출허가서의 유효기간(일반적으로 1년) 내에 출하가 이루어지는가'
        ]
      },
      {
        title: '③ 물리적 화물 선적 점검',
        type: 'checklist',
        dependsOn: { field: 'exportMethod', value: ['물리적 화물 선적 (Hardware)'] },
        items: [
          '수출허가서에 기재된 품목명과 모델명이 실제 선적되는 현품과 일치하는가',
          '수출허가서에 기재된 수량이 실제 선적되는 물품의 수량과 일치하는가',
          '포장 외관상 이상이 없으며 보안 씰(Seal)이 제대로 부착되었는가'
        ]
      },
      {
        title: '③ 무형 기술이전(ITT) 점검',
        type: 'checklist',
        dependsOn: { field: 'exportMethod', value: ['무형 기술이전 (Software/ITT, 이메일/클라우드 등)'] },
        items: [
          '전송하려는 소프트웨어/도면의 버전과 파일명이 허가받은 내역과 일치하는가',
          '수신자의 이메일 주소 도메인이나 클라우드 계정이 허가받은 수하인 소속과 일치하는가',
          '파일 전송 시 적절한 암호화 조치(Password 설정 등)가 적용되었는가',
          '전송 후 시스템 로그 또는 발송 완료 메일 등 증빙자료를 백업하였는가'
        ]
      }
    ],
    guide: '출하관리 담당자는 자율수출관리기구와 분리된 별도 인력(물류팀 등)이어야 하며, 이 점검표를 통해 서류와 현물의 일치 여부를 교차 검증한 후 최종 출하해야 합니다. 수출 형태(무형 ITT 등)에 따라 점검 항목이 다릅니다.',
  },

  // ==========================================
  // I. 포괄수출허가 사후관리 (I-01)
  // ==========================================
  'I-01': {
    id: 'I-01',
    title: '포괄수출허가 이행 및 사후관리 대장',
    category: '수출심사 및 통보',
    indicator: '3.2.6 (별표 20: 포괄수출허가 이행 및 사후관리 대장 DB)',
    legalBasis: '전략물자수출입고시 제28조(사용자포괄수출허가)·제34조(품목포괄수출허가), 제96조 제3항(최종사용자 서약서 제출 의무), 제86조(자율준수무역거래자 보고의무 - 별지 제19호 수출허가 실적보고)', // [수정] 제22조는 개별수출허가 심사기준 — 포괄수출허가 근거 아님
    timing: '포괄수출허가로 선적 시마다',
    author: '자율수출관리기구',
    retention: '5년 (제92조)',
    type: 'table',
    columns: [
      { key: 'no', label: '연번', width: '60px' },
      { key: 'exportDate', label: '수출일자', type: 'date', width: '130px' },
      { key: 'productName', label: '물품명', width: '150px' },
      { key: 'quantity', label: '수출 수량', width: '100px' },
      { key: 'endUser', label: '최종 사용자', width: '150px' },
      { key: 'endUse', label: '최종 용도', width: '200px' },
      { key: 'eucCheck', label: '서약서 징구', width: '100px', inputType: 'select', options: ['완료', '해당없음'] },
    ],
    guide: '포괄수출허가를 통해 수출된 물품의 최종사용자와 용도를 추적 관리하기 위한 DB입니다.',
  },

  // ==========================================
  // J. 사고 및 위반사항 관리 (J-01)
  // ==========================================
  'J-01': {
    id: 'J-01',
    title: '자진신고서 (별지 제24호)',
    category: '감사 및 사고 관리',
    indicator: '8.1.1 (별표 20: 위반사항 자진신고서)',
    legalBasis: '전략물자수출입고시 제98조(자진신고)',
    timing: '위반사항 인지 후',
    author: '자율수출관리기구',
    retention: '5년',
    approverRole: 'Master', // 자율수출관리규정 제33조② — 위반사항 자진신고는 위임 제외, 대표이사 결재
    approverRoleLabel: '대표이사',
    // [정리] hasFormTemplate('J-01')=true → tmpl_24()로 렌더링됩니다. type/sections는 사용되지 않습니다.
    // 필드를 고치려면 formTemplates.js의 tmpl_24를 수정하세요.
    guide: '자진신고서는 별지 제24호 서식을 사용합니다. 미리보기/다운로드 시 원본 별지 양식으로 출력됩니다.',
  },

  'J-02': {
    id: 'J-02',
    title: '재발방지계획서 (별지 제25호)',
    category: '감사 및 사고 관리',
    indicator: '8.1.1 (별표 20: 위반사항 시정조치 및 재발방지계획서)',
    legalBasis: '전략물자수출입고시 제98조 제4항(재발방지계획서 제출)', // [수정] 정확히는 제98조 제4항
    timing: '자진신고와 동시 제출',
    author: '자율수출관리기구',
    retention: '5년',
    approverRole: 'Master', // J-01(자진신고서)과 동시 제출되는 동일 패키지 첨부서류 — J-01만 대표이사 전결이면 신고 패키지의 일체성이 깨짐
    approverRoleLabel: '대표이사',
    type: 'structured',
    sections: [
      {
        title: '신고자 정보',
        fields: [
          { key: 'companyName', label: '상호', type: 'text' },
          { key: 'reporterName', label: '성명', type: 'text' },
          { key: 'reportDate', label: '신고일자', type: 'date' },
        ],
      },
      {
        title: '신고내용 및 방지계획',
        fields: [
          { key: 'reportSummary', label: '신고내용 요약', type: 'textarea' },
          { key: 'preventionPlan', label: '재발 방지 계획', type: 'textarea' },
        ],
      },
      {
        // [수정] 원문 4개 항목(전략물자 정규교육/자율준수 컨설팅/무역안보 컨설팅/기타) 중 2개만 있었음.
        title: '지원 사업 활용 희망 여부',
        type: 'checklist',
        items: ['전략물자 정규 교육', '자율준수 컨설팅', '무역안보 컨설팅', '기타'],
      },
      {
        title: '실무 담당자', // [수정] 원문에 있는 담당자 블록 전체가 빠져 있었음
        fields: [
          { key: 'staffName', label: '성명', type: 'text' },
          { key: 'staffPosition', label: '직위', type: 'text' },
          { key: 'staffDept', label: '부서', type: 'text' },
          { key: 'staffPhone', label: '전화번호', type: 'text' },
          { key: 'staffMobile', label: '휴대폰', type: 'text' },
          { key: 'staffEmail', label: '이메일', type: 'text' },
        ],
      },
    ],
    guide: '재발방지계획서는 별지 제25호 서식을 사용합니다. 지원사업 문의처: 무역안보관리원(02-6000-6400). 미리보기/다운로드 시 원본 별지 양식으로 출력됩니다.',
  },

  // ==========================================
  // K. 거래보고 및 실적보고 (K-01 ~ K-04)
  // ==========================================
  'K-01': {
    id: 'K-01',
    title: '사전거래보고서 (별지 제16호)',
    category: '거래보고',
    indicator: '3.2.6, 7.1.1 (별표 20: 사전거래보고서)',
    legalBasis: '전략물자수출입고시 제86조(보고)',
    timing: '수출 전',
    author: '자율수출관리기구',
    retention: '5년',
    // [정리] hasFormTemplate('K-01')=true → tmpl_16()으로 렌더링됩니다. type/sections는 사용되지 않습니다.
    // 필드를 고치려면 formTemplates.js의 tmpl_16을 수정하세요.
    // [참고] 여기 있던 필드 중 plannedExportDate/preReportDeadline(사전보고 D-30 마감일 자동계산)은
    // tmpl_16에는 아예 없는 기능입니다 — 화면에 한 번도 노출된 적 없는 미구현 기능이니, 필요하면 별도로 요청해 주세요.
    guide: '사전거래보고서는 별지 제16호 서식을 사용합니다. 최종사용자가 2인 이상인 경우 별지를 추가해 모든 최종사용자의 상호·주소·성명·전화번호를 기재하세요.',
  },

  'K-02': {
    id: 'K-02',
    title: '사후거래보고서 (별지 제16호의2)',
    category: '거래보고',
    indicator: '3.2.6, 7.1.1 (별표 20: 사후거래보고서)',
    legalBasis: '전략물자수출입고시 제86조(보고)',
    timing: '수출 후',
    author: '자율수출관리기구',
    retention: '5년',
    // [정리] hasFormTemplate('K-02')=true → tmpl_16_2()로 렌더링됩니다(tmpl_16을 제목만 바꿔 재사용).
    // type/sections는 사용되지 않습니다. 필드를 고치려면 formTemplates.js의 tmpl_16(tmpl_16_2가 상속)을 수정하세요.
    guide: '사후거래보고서는 별지 제16호의2 서식을 사용합니다. K-01(사전거래보고서)의 맞춤 동기화 기능으로 데이터를 불러와 채울 수 있습니다.',
  },

  'K-03': {
    id: 'K-03',
    title: '자율준수체제 운영 보고서 (별지 제18호)',
    category: '거래보고',
    indicator: '2.2.3, 8.1.1 (별표 20: 자율준수체제 운영/실적 보고서)',
    legalBasis: '대외무역법 제22조 제3항', // 2024.2.20 개정으로 자율준수무역거래자 보고의무 조항이 제25조→제22조로 이동 (구 조번호로 남아있던 것 수정)
    timing: '연도별 보고',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '운영 현황',
        fields: [
          { key: 'reportYear', label: '보고 년도', type: 'text' },
          { key: 'regEstablished', label: '① 규정 제정일', type: 'text' },
          { key: 'regRevised', label: '① 규정 개정일', type: 'text' },
          { key: 'regChanges', label: '① 주요 개정사항', type: 'textarea' },
          { key: 'orgStatus', label: '② 조직 운영현황', type: 'textarea' },
          { key: 'extTraining', label: '③ 외부교육 참가실적', type: 'textarea' },
          { key: 'intTraining', label: '③ 내부교육 추진실적', type: 'textarea' },
          { key: 'auditStatus', label: '④ 내부감사 운영실적', type: 'textarea' },
        ],
      },
    ],
    guide: '운영보고서는 별지 제18호 서식을 사용합니다. 산업통상부장관에게 제출합니다.',
  },

  'K-04': {
    id: 'K-04',
    title: '자율준수무역거래자 실적 보고서 (별지 제19호)',
    category: '거래보고',
    indicator: '2.2.3, 8.1.1 (별표 20: 자율준수체제 실적 보고서)',
    legalBasis: '대외무역법 제22조 제3항 및 동법 시행령 제45조', // 2024.2.20 개정으로 제25조→제22조 이동 (구 조번호로 남아있던 것 수정, 시행령 제45조는 원래도 정확)
    timing: '매년 상/하반기 또는 연 1회 (등급별 상이)',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '① 중개실적',
        fields: [
          { key: 'brokerage_count_amount', label: '총 중개 건수/금액', type: 'text', default: '' }
        ]
      },
      {
        title: '② 중개 상세내역',
        type: 'table',
        columns: [
          { key: 'item', label: '품명(모델) 및 통제번호', width: '200px' },
          { key: 'usage', label: '용도', width: '100px' },
          { key: 'export_country', label: '수출국가', width: '100px' },
          { key: 'import_country', label: '수입국가', width: '100px' },
          { key: 'importer', label: '수입자', width: '120px' },
          { key: 'end_user', label: '최종수하인', width: '150px' }
        ]
      },
      {
        title: '③ 포괄수출허가 건수 및 금액',
        fields: [
          { key: 'comprehensive_count_amount', label: '포괄수출허가건수/실적건수/금액', type: 'text', default: '' }
        ]
      },
      {
        title: '③-2 포괄수출 허가 건별 상세실적',
        type: 'table',
        columns: [
          { key: 'details', label: '허가 건별 상세실적(최종사용자 및 용도 포함)', width: '300px' },
          { key: 'amount', label: '금액', width: '150px' }
        ]
      },
      {
        title: '④ 1. 전략기술 무형이전 (A등급 이상)',
        type: 'table',
        columns: [
          { key: 'tech', label: '이전기술(기술명/내용/통제번호)', width: '250px' },
          { key: 'target', label: '이전대상자', width: '150px' },
          { key: 'period', label: '이전기간', width: '120px' }
        ]
      },
      {
        title: '④ 2. 개별수출허가 면제대상 (AAA등급 한함)',
        type: 'table',
        columns: [
          { key: 'type', label: '거래유형', width: '100px' },
          { key: 'history', label: '거래내역', width: '200px' },
          { key: 'consumer', label: '수요자', width: '150px' }
        ]
      },
      {
        title: '⑤ 1. 자가판정 건수',
        type: 'table',
        columns: [
          { key: 'classNo', label: '판정번호', width: '150px' },
          { key: 'criteria', label: '판정기준', width: '150px' },
          { key: 'result', label: '판정결과', width: '100px' }
        ]
      },
      {
        title: '⑤ 2. 전문판정 건수',
        type: 'table',
        columns: [
          { key: 'classNo', label: '판정번호', width: '150px' },
          { key: 'criteria', label: '판정기준', width: '150px' },
          { key: 'result', label: '판정결과', width: '100px' }
        ]
      }
    ],
    guide: '실적보고서는 별지 제19호 서식을 사용합니다. 산업통상부장관에게 제출합니다.',
  },

  'K-05': {
    id: 'K-05',
    title: '허가면제 실적 통합 관리대장',
    category: '거래보고',
    indicator: '3.2.6 (별표 20: 사후/사전거래보고 실적 관리대장)',
    legalBasis: '대외무역법 제19조의6 제3항 (허가 면제)', // [수정] 제25조="무역안보관리원의 설립", 제26조="전략물자 수출입통제 협의회" — 허가면제와 무관. 실제 근거는 제19조의6③
    timing: '수시조회 (연간보고 작성 시 참조)',
    author: '자율수출관리기구',
    retention: '영구',
    type: 'structured',
    sections: [
      {
        title: '전사 허가면제 수출 실적 내역 (K-01 / K-02 통합 데이터)',
        fields: [
          { key: 'exemption_history_table', label: '허가면제 실적', type: 'exemption_history' }
        ]
      }
    ],
    guide: '시스템 내에 제출(저장)된 모든 사전거래보고서(K-01) 및 사후거래보고서(K-02) 내역을 스캔하여 하나의 관리대장으로 모아 보여줍니다. 연말/반기 실적보고(K-04) 작성 시 이 표를 참고하십시오.',
  },

  'G-02': {
    id: 'G-02',
    title: '우려거래자 스크리닝 관리대장',
    category: '수출심사 및 통보',
    indicator: '3.2.4 (우려거래자 및 용도 확인 대장)',
    legalBasis: '전략물자수출입고시 제94조의2(우려거래자 지정 및 등록)',
    timing: '수시 (신규 거래처 등록 및 거래 심사 시)',
    author: '거래심사 담당자 / 자율수출관리기구',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '스크리닝 내역',
        fields: [
          { key: 'companyName', label: '업체명', type: 'text', default: '' },
          { key: 'country', label: '국가', type: 'text', default: '' },
          { key: 'screenDate', label: '조회 일자', type: 'date', default: '' },
          { key: 'result', label: '조회 결과 (DPL 등재 여부)', type: 'select', options: ['해당없음(Clean)', '등재(우려거래자)', '조건부 통과'], default: '해당없음(Clean)' },
          { key: 'reviewer', label: '심사자', type: 'text', default: '' },
          { key: 'memo', label: '비고 / 특이사항', type: 'textarea', default: '' }
        ]
      }
    ]
  },

  'G-03': {
    id: 'G-03',
    title: '수출허가 관리대장',
    category: '수출심사 및 통보',
    indicator: '4.1.2 (수출허가 이력 관리)',
    legalBasis: '대외무역법 제19조(수출허가 등), 전략물자수출입고시 제21조, 제23조, 제25조',
    timing: 'YesTrade에서 수출허가(개별/포괄/상황) 발급 완료 후 즉시 등록',
    author: '자율수출관리기구',
    retention: '5년',
    type: 'structured',
    sections: [
      {
        title: '① 허가 신청 정보 (YesTrade 제출 내역)',
        fields: [
          {
            key: 'yesTradeInfo',
            label: '💡 YesTrade 신청 안내',
            type: 'info',
            text: '<div style="font-size:0.85rem; line-height:1.6; color:var(--text-secondary);">개별수출허가(L-01) 또는 포괄수출허가(L-02) 신청은 <strong><a href="https://www.yestrade.go.kr" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">YesTrade(예스트레이드)</a></strong>에서 진행합니다. 허가 신청 후 아래 정보를 본 관리대장에 기록하고, 허가증 PDF를 첨부하세요.</div>'
          },
          { key: 'licenseType', label: '허가 종류', type: 'select', options: ['', '개별수출허가 (L-01)', '포괄수출허가 (L-02)', '상황허가 (L-03)', '기타'], default: '' },
          { key: 'yesTradeApplyNo', label: 'YesTrade 신청 접수번호', type: 'text', placeholder: '예: 2026-개-00XXXX' },
          { key: 'yesTradeApplyDate', label: 'YesTrade 신청 일자', type: 'date' },
          { key: 'yesTradePortalLink', label: 'YesTrade 처리현황 URL (선택)', type: 'text', placeholder: 'https://www.yestrade.go.kr/...' },
        ]
      },
      {
        title: '② 허가증 발급 결과 (YesTrade 발급 후 입력)',
        fields: [
          { key: 'licenseNo', label: '정부 발급 허가증 번호', type: 'text', placeholder: '예: 2026-개-00XXXX', default: '' },
          { key: 'issueDate', label: '발급 일자', type: 'date', default: '' },
          { key: 'expireDate', label: '유효기간 만료 일자', type: 'date', default: '', description: '💡 개별수출허가 유효기간은 발급일로부터 1년 (고시 제25조). 기간 내 수출 완료 필요.' },
          { key: 'issuingAuthority', label: '발급 기관', type: 'select', options: ['', '산업통상자원부', '방위사업청', '원자력안전위원회', '기타'] },
          { key: 'licenseConditions', label: '허가 조건 (특이사항)', type: 'textarea', placeholder: '허가증에 명시된 특별 조건이 있을 경우 기재 (없으면 "해당 없음")' },
        ]
      },
      {
        title: '③ 허가증 PDF 원본 첨부',
        fields: [
          {
            key: 'licenseFilePdf',
            label: '허가증 사본 (PDF)',
            type: 'file',
            accept: '.pdf,.jpg,.png',
            description: 'YesTrade에서 발급된 허가증 PDF 원본을 첨부하세요. 5년 보관 의무'
          },
          { key: 'fileAttachDate', label: '첨부 일자', type: 'date' },
          { key: 'attachedBy', label: '첨부자 (성명)', type: 'text' },
        ]
      },
      {
        title: '④ 허가 품목 및 잔량 관리',
        fields: [
          { key: 'itemName', label: '품목명 (허가증 상)', type: 'text', default: '' },
          { key: 'controlNo', label: '통제번호 (ECCN)', type: 'text', placeholder: '예: 5D002', default: '' },
          { key: 'totalQty', label: '총 허가 수량', type: 'text', placeholder: '예: 100 EA 또는 1 Set', default: '' },
          { key: 'usedQty', label: '기 사용 수량 (출하 완료 건 합산)', type: 'text', default: '0' },
          { key: 'remainQty', label: '잔여 수량 (총허가-기사용)', type: 'text', readonly: true, description: '⚠️ 포괄허가의 경우 잔량 초과 출하 시 법 위반' },
          { key: 'destination', label: '최종 목적국 (허가증 상)', type: 'text', default: '' },
          { key: 'endUserOnLicense', label: '허가증 상 최종사용자', type: 'text', default: '' },
        ]
      },
      {
        title: '⑤ 갱신 / 변경 이력',
        fields: [
          { key: 'renewalHistory', label: '갱신 또는 조건 변경 이력', type: 'textarea', placeholder: '허가 연장, 수량 변경, 조건 수정 등 이력이 있을 경우 날짜와 내용을 기재하세요.' },
        ]
      }
    ],
    guide: 'YesTrade(예스트레이드)에서 수출허가 신청 및 발급을 완료한 후 본 대장에 즉시 등록하세요. 허가증 PDF 원본 첨부 필수. 포괄수출허가의 경우 잔여 수량을 거래 건별로 계속 업데이트하여 초과 출하를 방지합니다.'
  },


  'G-04': {
    id: 'G-04',
    title: '절차 보류 지시서 (Stop Shipment)',
    category: '수출심사 및 통보',
    indicator: '3.2.1 (절차 중단 권한 행사)',
    // [수정] 신규 문서체계(팝콘사_별지27_28_보류지시서_해제신청서_20260915_초안)에서 실제 인용된 조항으로 정정.
    // 표준규정 기준 제7조는 "기구의 장" 정의 조항이며, 절차중단권(보류)의 실제 근거는 제22조①⑥임.
    legalBasis: '자율수출관리규정 제22조①⑥ (절차 보류 지시)',
    timing: '우려 징후 발견 즉시 (사전 결재 불필요, 지시 후 1영업일 이내 작성)',
    author: '자율수출관리 담당자 (단독 판단으로 즉시 지시)',
    retention: '5년',
    approverRole: null, // 보류 "지시"는 규정상 사전 결재 대상이 아님 — 대표이사 결재가 필요한 것은 G-06(해제신청서) 쪽
    type: 'structured',
    sections: [
      {
        title: '절차 중단 개요',
        fields: [
          { key: 'documentNo', label: '문서번호', type: 'text', placeholder: 'PSR26-____' },
          { key: 'reportDate', label: '보류 지시 일시', type: 'date', default: '' },
          { key: 'targetProject', label: '대상 거래/프로젝트명 (거래상대방·최종사용자 포함)', type: 'text', default: '' },
          { key: 'stopStage', label: '진행 단계', type: 'select', options: ['', '② 사전진단', '③ 판정', '④ 거래심사', '⑤ 계약', '⑥ 허가', '⑦ 출하검증', '⑧ 전달', '⑨ 사후관리'] },
          { key: 'relatedRecords', label: '관련 문서 (사전진단/판정/거래심사 문서번호)', type: 'text', placeholder: '예: 사전진단 PSR26-____, 판정 PSR26-____' },
          { key: 'stopReason', label: '구체적 사유', type: 'textarea', default: '' }
        ]
      },
      {
        title: '보류 사유 (해당 사항 체크)',
        type: 'checklist',
        items: [
          '전략물자에 해당할 가능성이 확인됨',
          '최종사용자 또는 최종용도가 불명확함',
          '우려거래자에 해당하거나 해당 여부가 불분명함',
          '의심징후가 해소되지 아니함',
          '판정서·허가서·계약서·인보이스 사이에 불일치가 있음',
          '그 밖에 관계 법령 위반의 우려가 있음 (상세는 위 "구체적 사유"에 기재)'
        ]
      },
      {
        title: '보류 범위 (정지 대상)',
        type: 'checklist',
        items: [
          '계약 체결 및 계약 변경',
          '출하 및 전자적 전달',
          '기술 제공 및 기술지원',
          '저장소·개발환경 원격 접속 허용 (기존 계정 차단 포함)',
          '대금 청구 및 수령'
        ]
      },
      {
        title: '통지 및 보고',
        fields: [
          { key: 'slackNotifiedAt', label: 'Slack 채널 게시 일시 (#수출통제-보류, 전 임직원)', type: 'text', placeholder: 'YYYY-MM-DD HH:mm', description: '※ 기구장과 대표이사에게 동시에 보고한다. 기구장을 경유하느라 대표이사 보고가 늦어지지 아니하도록 한다 (세부지침 제7장 2항②).' },
          { key: 'orgHeadReportedAt', label: '기구장 보고 일시', type: 'text', placeholder: 'YYYY-MM-DD HH:mm' },
          { key: 'ceoReportedAt', label: '대표이사 보고 일시', type: 'text', placeholder: 'YYYY-MM-DD HH:mm' },
          { key: 'deptNotifiedAt', label: '관련 부서 통지 일시', type: 'text', placeholder: 'YYYY-MM-DD HH:mm' },
          { key: 'ceoReport', label: '대표이사 직보 여부 (요약)', type: 'select', options: ['완료', '대기', 'N/A'], default: '완료' }
        ]
      },
      {
        title: '해소를 위한 조치 계획',
        fields: [
          { key: 'actionsTaken', label: '현장 조치 내역 (선적 보류 등)', type: 'textarea', default: '' },
          { key: 'resolutionPlan', label: '해소를 위한 조치 계획', type: 'textarea', default: '' },
          { key: 'orgHeadConfirmName', label: '기구장 확인자 성명', type: 'text' }
        ]
      }
    ],
    guide: '보류는 자율수출관리 담당자가 단독 판단으로 즉시 지시하며 사전 결재를 받지 아니한다(규정 제22조①). 이 문서는 지시 후 1영업일 이내에 작성하여 문서번호를 부여한다. 보류를 해제하려면 별도 서식인 G-06(절차 보류 해제 신청서, 별지 제28호)으로 대표이사 결재를 받아야 한다.'
  },

  'G-05': {
    id: 'G-05',
    title: '정기보고 통합 기안문',
    category: '사후 관리',
    indicator: '2.2.3, 8.1.1 (별표 20: 반기별 현황보고 및 정기보고 통합 기안문)',
    timing: '매년 1월',
    author: '자율수출관리기구장',
    retention: '3년',
    type: 'template',
    fields: [
      { key: 'documentNo', label: '문서번호', type: 'text', default: 'CP-2026-001' },
      { key: 'draftDate', label: '기안일자', type: 'date' },
      { key: 'drafter', label: '기안자', type: 'text' },
      { key: 'subject', label: '제목', type: 'text', default: '전년도 자율준수체제 운영실적 및 당해연도 운영계획 보고' },
      { key: 'prevYearReport', label: '전년도 자율준수체제 운영 및 실적 요약', type: 'textarea' },
      { key: 'currentYearPlan', label: '당해연도 운영 계획 (교육/감사)', type: 'textarea' }
    ],
    guide: '실무 꿀팁: 1월에 "전년도 실적 보고"와 "올해 교육/감사 운영계획"을 통합하여 한 번에 대표이사 결재를 득하는 기안문 양식입니다.'
  },

  'G-06': {
    id: 'G-06',
    title: '절차 보류 해제 신청서',
    category: '수출심사 및 통보',
    indicator: '3.2.1 (절차 중단 해제 및 재개 조건 확인)',
    legalBasis: '자율수출관리규정 제22조⑤, 제33조②2호 (보류 해제는 위임 제외, 대표이사 결재로만 효력 발생)',
    timing: 'G-04 보류 사유가 해소되었다고 판단될 때',
    author: '자율수출관리 담당자(신청) → 자율수출관리기구장(검토) → 대표이사(결재)',
    retention: '5년',
    approverRole: 'Master', // 규정 제33조②2호 — 보류 해제는 위임 제외 4종 중 하나, 대표이사만 전자서명(=결재) 가능
    approverRoleLabel: '대표이사',
    type: 'structured',
    sections: [
      {
        title: '보류 경위',
        fields: [
          { key: 'documentNo', label: '문서번호', type: 'text', placeholder: 'PSR26-____' },
          { key: 'applicationDate', label: '신청일', type: 'date' },
          { key: 'relatedStopOrderNo', label: '관련 보류(G-04) 문서번호', type: 'text', placeholder: 'PSR26-____' },
          { key: 'stopOrderDate', label: '보류 지시일', type: 'date' },
          { key: 'targetProject', label: '대상 거래/프로젝트명', type: 'text' },
          { key: 'stopReasonSummary', label: '보류 사유 (요약)', type: 'textarea' },
          { key: 'suspendedScope', label: '정지된 범위', type: 'textarea', placeholder: '예: 출하 및 전자적 전달, 대금 청구 및 수령' }
        ]
      },
      {
        title: '조사 내용 및 해소 근거',
        fields: [
          { key: 'investigationDetail', label: '조사 내용', type: 'textarea' },
          { key: 'resolutionBasis', label: '해소 근거', type: 'textarea' }
        ]
      },
      {
        title: '추가 취득 서류 (해당 사항 체크)',
        type: 'checklist',
        items: ['전문판정 결과', '수출허가서', '최종사용자 서약서', '최종용도 확인서', '기타 (조사 내용에 기재)']
      },
      {
        title: '재개 조건 확인',
        type: 'checklist',
        items: [
          '보류 사유가 완전히 해소되었는가',
          '허가가 필요한 경우 허가를 취득하였는가',
          '거래심사표(별지 제7호, G-01)가 갱신되었는가',
          '우려거래자 확인을 다시 실시하였는가',
          '재개 후 준수할 조건이 계약서에 반영되었는가'
        ]
      },
      {
        title: '기구장 검토',
        fields: [
          { key: 'orgHeadReviewer', label: '검토자 (자율수출관리기구장) 성명', type: 'text' },
          { key: 'orgHeadReviewDate', label: '검토일', type: 'date' },
          { key: 'orgHeadReviewComment', label: '검토 의견', type: 'textarea' }
        ]
      },
      {
        title: '재개 후 관리 사항',
        fields: [
          { key: 'postResumeManagement', label: '재개 후 관리 사항', type: 'textarea' }
        ]
      }
    ],
    guide: '해제는 담당자가 위험의 해소를 확인하고 기구장이 검토한 후 대표이사의 결재를 받아야 효력이 있다 (규정 제22조⑤, 제33조②2호). 결재 전에는 어떠한 부서도 거래를 재개할 수 없다 — 하단의 "전자서명 및 최종 확정"은 대표이사(Master 권한) 계정으로만 진행할 수 있으며, 그 서명 시점이 곧 결재 시점입니다.'
  },

};

export function getFormDef(formId) {
  return formDefinitions[formId] || null;
}

export function getAllFormDefs() {
  return Object.values(formDefinitions);
}

export function getFormsByCategory() {
  const categories = {};
  Object.values(formDefinitions).forEach(f => {
    if (!categories[f.category]) categories[f.category] = [];
    categories[f.category].push(f);
  });
  return categories;
}
