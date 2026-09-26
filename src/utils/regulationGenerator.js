import { getFormData, getCompanyInfo, getFormInstances } from '../store.js';

/**
 * 자율수출관리규정 전문 생성 및 서식 실시간 동기화 엔진
 * 산업통상자원부 전략물자수출입고시 [별표 7] 표준자율수출관리규정 및 [AA등급 유형2 심사기준] 반영
 */
export function generateSynchronizedRegulation() {
  const compInfo = getCompanyInfo() || {};
  const companyName = compInfo.name || '(주)팝콘사';
  const ceoName = compInfo.ceo || '대표이사';
  
  // 서식 데이터 조회 (동기화 소스)
  const a01 = getFormData('A-01') || {};
  const a06 = getFormData('A-06') || {};
  const a07 = getFormData('A-07') || {};
  const a08 = getFormData('A-08') || {};
  const b01 = getFormData('B-01') || {};
  const c00 = getFormData('C-00') || {};
  const c07 = getFormData('C-07') || {};
  const d01 = getFormData('D-01') || {};
  const d03 = getFormData('D-03') || {};
  const d05 = getFormData('D-05') || {};
  const e02 = getFormData('E-02') || {};
  // E-01/G-04/J-01은 "건별로 계속 새로 쌓이는" 인스턴스 서식이라 규정 본문에 넣을 단일 값이
  // 없다. 그 대신 지금까지 실제로 몇 건이 쌓였는지(누적 건수)를 정직하게 보여준다.
  // G-01/H-01은 거래 건별(트랜잭션 스코프) 서식이라 이 화면에서는 셀 수 있는 단일 소스가 없어
  // 동기화 대상에서 제외하고, 조항 문구도 "연동됨"이 아닌 절차 근거 표기로만 남긴다.
  const e01Count = getFormInstances('E-01').length;
  const g04Count = getFormInstances('G-04').length;
  const j01Count = getFormInstances('J-01').length;

  // 주요 추출 필드 (기본값 및 서식 연동)
  const draftDate = a01.draftDate || '(제정일 미확정)';
  const effectiveDate = a01.effectiveDate || '(시행일 미확정)';
  const cpManagerName = a06.appointeeName ? `${a06.appointeeName} (${a06.appointeePosition || '기구장'})` : '(A-06 미기재)';

  // A-07은 "역할 하나당 담당자 이름 하나"가 아니라 rows[] 표(연번/역할/성명/부서/업무) 구조다.
  // 같은 역할이 여러 명일 수 있으므로(예: 출하관리 담당자가 팀별로 여러 명) 해당 역할의 모든
  // 행을 모아 "이름(부서)" 형태로 나열한다.
  const a07Rows = Array.isArray(a07.rows) ? a07.rows : [];
  const rolesOf = (roleName) => a07Rows.filter(r => r.role === roleName).map(r => `${r.name}(${r.dept || ''})`).join(', ');
  const judgeRole = rolesOf('판정 담당자') || '(A-07 미기재)';
  const tradeRole = rolesOf('거래심사 담당자') || '(A-07 미기재)';
  const clearanceRole = rolesOf('출하관리 담당자') || '(A-07 미기재)';
  // 내부감사는 A-07에 별도 역할행이 없고, 실제로는 C-07(내부감사계획서)의 감사반 구성을 따른다.
  const auditorRole = c07.auditTeam || '(C-07 미기재)';

  const contractClauseHtml = (() => {
    const artTitle = e02.clauseTitle || '전략물자 수출통제 준수 및 사전통보 의무';
    const targetContract = e02.targetContract || '물품/소프트웨어 표준 공급계약서 (본문 말미 부속 특약)';

    // Strip redundant leading numbering if present in user inputs
    const c1 = e02.clause1 ? e02.clause1.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').replace(/^[①1\.\-\s]+/, '').trim() : '';
    const c2 = e02.clause2 ? e02.clause2.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').replace(/^[②2\.\-\s]+/, '').trim() : '';
    const c3 = e02.clause3 ? e02.clause3.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').replace(/^[③3\.\-\s]+/, '').trim() : '';

    return `
      <div data-reg-field="contractClauseHtml" style="background:rgba(99,102,241,0.03); border-left:3px solid var(--primary-color); padding:14px 18px; margin:12px 0; border-radius:0 8px 8px 0; font-size:0.9rem; line-height:1.85;">
        <div style="font-weight:700; color:var(--primary-color); margin-bottom:4px; font-size:0.95rem;">
          [표준 공급계약서 특약 조항안] 제○조 (${artTitle})
        </div>
        <div style="font-size:0.8rem; color:var(--text-tertiary); margin-bottom:8px;">
          ※ 적용 대상: 당사 「${targetContract}」 본문 말미 부속 조항으로 삽입 (실무 체결 시 해당 계약서 조항 번호로 지정)
        </div>
        <div style="margin:4px 0;">① ${c1 || '"을"은 본 계약에 따라 "갑"에게 공급하는 물품 및 소프트웨어가 「대외무역법」 및 「전략물자 수출입고시」에 따른 전략물자 또는 상황허가 대상 품목에 해당하는 경우, 그 사실과 통제번호를 "갑"에게 서면으로 사전 통보한다.'}</div>
        <div style="margin:4px 0;">② ${c2 || '"갑"은 전항에 따라 통보받은 물품 및 기술을 국외로 수출하거나 국내에서 외국인에게 이전하고자 하는 경우 사전에 관계 행정기관의 수출허가를 받아야 하며, 이를 제3자에게 재판매 또는 양도하는 경우에도 그 상대방에게 동일한 전략물자 준수 의무를 통보하여야 한다.'}</div>
        <div style="margin:4px 0;">③ ${c3 || '"갑"이 전항의 의무를 위반하여 발생한 일체의 법적 분쟁 및 행정제재에 대하여 "을"은 면책된다.'}</div>
      </div>
    `;
  })();

  const securityGuidelineHtml = (() => {
    const access = d03.access ? d03.access.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').trim() : '전략기술에 대한 접근 권한은 업무상 필요한 최소 범위로 부여하며, 기구장의 승인을 받아 D-04 관리대장에 기록하고 반기 1회 점검한다.';
    const external = d03.external ? d03.external.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').trim() : '전략기술을 사외로 반출하는 행위(소스코드 전달, 설계문서 송부, 원격 접속 허용 등)는 자율수출관리기구의 사전 승인 없이 할 수 없으며, 외국인/해외법인 반출 시 판정 및 거래심사 절차를 필히 완료하여야 한다.';
    const systems = d03.systems ? d03.systems.replace(/^제\s*\d+\s*조\s*(\([^)]*\))?\s*/, '').trim() : '그룹웨어 및 형상관리 시스템의 부서/직급별 문서 접근권한 통제, 문서보안(DRM) 및 입·퇴사 연동 계정 관리 체계를 상시 가동한다.';

    return `
      <div data-reg-field="securityGuidelineHtml" style="background:rgba(99,102,241,0.03); border-left:3px solid var(--primary-color); padding:12px 16px; margin:10px 0; border-radius:0 6px 6px 0; font-size:0.9rem; line-height:1.8;">
        <div style="font-weight:700; color:var(--primary-color); margin-bottom:6px;">[정보보안관리 지침 세부 수칙]</div>
        <div style="margin:4px 0;"><strong>1. 접근 권한 통제</strong>: ${access.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;')}</div>
        <div style="margin:4px 0;"><strong>2. 외부 반출 통제</strong>: ${external.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;')}</div>
        <div style="margin:4px 0;"><strong>3. IT 보안 시스템 운영</strong>: ${systems.replace(/\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;')}</div>
      </div>
    `;
  })();

  const auditCycleText = c07.auditPeriod || '최대 2년 이내 (체계 정착 단계인 최초 2년은 연 1회)';
  const trainingCycleText = c00.trainingCycle || '연 2회 (상반기 5월 / 하반기 11월) 및 신규입사자 수시 교육';

  // B-01(이행선언문) 실제 연동
  const declarationDateText = b01.declarationDate || '(선언일 미확정)';

  // D-01(문서관리세칙) 실제 연동 — management 조문 텍스트를 그대로 인용
  const docManagementText = d01.management ? d01.management.trim() : '문서는 결재를 거쳐 확정하고 그룹웨어 또는 지정된 공유폴더에 보관하며, 보존연한이 지난 문서의 폐기는 기구장의 승인을 받는다.';

  // D-05(외국인 인력 신원확인 절차서) 실제 연동
  const foreignStaffProcedureText = d05.procedure ? d05.procedure.trim() : '외국인 연구원 등 채용·투입 전 우려거래자 명단 조회 등 신원확인 절차를 거치고 보안서약서를 징구한다.';

  return `
    <div class="regulation-document" style="line-height:1.85; color:var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;">
      
      <div style="text-align:center; margin-bottom: 2.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 1.5rem;">
        <span style="font-size:0.9rem; font-weight:600; color:var(--primary-color); letter-spacing:1px;">전략물자수출입고시 [별표 7] 표준규정 준거</span>
        <h1 style="font-size:2rem; margin:0.5rem 0 0.8rem 0; font-weight:800; color:var(--text-primary);"><span data-reg-field="companyName">${companyName}</span> 자율수출관리규정</h1>
        <p style="color:var(--text-secondary); font-size:0.95rem; margin:0;">
          제정일자: <span data-reg-field="draftDate">${draftDate}</span> ｜ 시행일자: <span data-reg-field="effectiveDate">${effectiveDate}</span> (최신 v1.2 개정)
        </p>
      </div>

      <!-- 제1장 총칙 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 1 장 총 칙
        </h3>
        
        <p><strong>제1조 (목적)</strong><br>
        본 규정은 국제평화 및 안전유지와 국가안보에 대한 위해를 예방하기 위해 「대외무역법」 및 산업통상자원부 「전략물자수출입고시」에 따라 <span data-reg-field="companyName">${companyName}</span>(이하 "당사"라 한다)의 자율준수체제를 구축하고 그 세부 운영에 필요한 사항을 규정함을 목적으로 한다.</p>

        <p><strong>제2조 (기본방침)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(99,102,241,0.1); color:var(--accent-purple); padding:2px 8px; border-radius:4px; font-weight:600;">[별표 7 준거]</span><br>
        ① 당사는 대외무역법 등 관계 법령을 준수하며, 어떠한 경우에도 정부의 적법한 허가 없이 전략물자 및 상황허가 대상 품목을 수출하지 않는다.<br>
        ② 당사는 수출통제 준수를 회사의 최우선 경영 원칙 중 하나로 확립하고, 영업상의 이익보다 법규 준수와 국가안보를 우선하여 업무를 처리한다.<br>
        ③ 당사의 전 임직원은 본 규정을 숙지하고 수출관리 업무에 적극 협조하여야 한다.</p>

        <p><strong>제3조 (정의)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(99,102,241,0.1); color:var(--accent-purple); padding:2px 8px; border-radius:4px; font-weight:600;">[별표 7 표준정의]</span><br>
        본 규정에서 사용하는 용어의 뜻은 다음과 같다.<br>
        1. <strong>"전략물자"</strong>란 대외무역법 제19조제1항에 따라 다자간 국제수출통제체제의 원칙에 따라 지정·고시된 물품, 소프트웨어 및 기술을 말한다.<br>
        2. <strong>"상황허가(Catch-all) 품목"</strong>이란 전략물자에 해당하지 아니하나, 대량파괴무기(WMD) 및 그 운반체의 개발·제조·사용·보관 등의 용도로 전용될 우려가 있는 품목을 말한다.<br>
        3. <strong>"수출 등"</strong>이란 국내에서 국외로의 물품의 이동뿐만 아니라, 무체물인 소프트웨어 및 기술의 전자적 이전(이메일, 클라우드, 구두 설명 등)과 국내에서 외국인에게 기술을 제공하는 간주수출(Deemed Export)을 포함한다.<br>
        4. <strong>"우려거래자(DPL)"</strong>란 전략물자의 불법 수출 또는 대량파괴무기 전용 우려가 있어 한국 정부 및 국제기구에서 지정한 제재 대상자 목록을 말한다.</p>

        <p><strong>제4조 (적용범위)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(99,102,241,0.1); color:var(--accent-purple); padding:2px 8px; border-radius:4px; font-weight:600;">[전사 적용]</span><br>
        본 규정은 당사의 모든 국내외 무역 거래, 제품 개발(R&D), 해외 기술 지원, 연구원 기술교류, 출하 및 영업 활동에 적용되며, 당사의 전 임직원(정규직, 계약직, 외국인 연구원 및 파견인력 포함)에게 적용된다.</p>
      </section>

      <!-- 제2장 최고경영자의 준수의지 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 2 장 최고경영자(대표이사)의 준수의지
        </h3>

        <p><strong>제5조 (최고경영자의 준수의지 및 이행선언)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[B-01 / B-02 연동됨]</span><br>
        ① 당사는 최고경영자(<span data-reg-field="ceoName">${ceoName}</span>)가 자필 서명한 「전략물자 수출관리 이행선언문(B-01)」을 제정(선언일: <span data-reg-field="declarationDateText">${declarationDateText}</span>)하여 대내외에 공표하고, 전사적인 전략물자 수출관리 의지를 천명한다.<br>
        ② 대표이사의 수출관리 이행선언문은 <strong>최소 3년에 1회 이상 정기적으로 갱신</strong>하며, 회사 홈페이지, 사내 인트라넷 및 그룹웨어 게시판 등을 통해 전 임직원 및 고객사 앞 상시 공표한다.<br>
        ③ 대표이사는 연 1회 이상 전 임직원 대상 사내 공지문(B-02)을 발송하여 자율준수의 중요성을 지속적으로 강조한다.</p>
      </section>

      <!-- 제3장 자율수출관리기구의 조직 및 권한 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 3 장 자율수출관리기구의 조직 및 권한
        </h3>

        <p><strong>제6조 (자율수출관리기구의 설치 및 독립성)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[A-07 / A-08 연동됨]</span><br>
        ① 당사는 전략물자 수출통제의 실효적 집행을 위하여 영업 부서로부터 완전히 독립된 <strong>「자율수출관리기구」</strong>를 설치·운영한다.<br>
        ② 자율수출관리기구는 판정, 거래심사, 출하관리, 내부감사, 교육, 정보보안 등 각 기능별 전문 업무분장(A-07)과 위임전결표(A-08)를 명문화하여 운영한다.<br>
        • <strong>판정 담당</strong>: <span data-reg-field="judgeRole">${judgeRole}</span> (기술사양 분석 및 자가/전문판정 전담)<br>
        • <strong>거래심사 담당</strong>: <span data-reg-field="tradeRole">${tradeRole}</span> (우려거래자 스크리닝 및 사전통보 심사)<br>
        • <strong>출하관리 담당</strong>: <span data-reg-field="clearanceRole">${clearanceRole}</span> (영업·심사와 분리된 선적 전 교차검증)<br>
        • <strong>내부감사 담당</strong>: <span data-reg-field="auditorRole">${auditorRole}</span> (기구 외 독립 감사 실시)</p>

        <p><strong>제7조 (자율수출관리기구의 장 및 절차중단권)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[A-06 / G-04 연동됨]</span><br>
        ① 자율수출관리기구의 장(이하 "기구장")은 대표이사 또는 대표이사의 공식 위임을 받은 임원급(<span data-reg-field="cpManagerName">${cpManagerName}</span>)으로 임명한다.<br>
        ② <strong>(절차중단권의 보장)</strong> 기구장은 전략물자 수출관리상 불법 수출의 우려가 있다고 판단되는 경우, 영업 부서의 매출 목표나 계약 체결 여부와 무관하게 <strong>해당 거래의 모든 진행 절차를 즉시 중단(Stop-Shipment)시킬 수 있는 절대적 권한</strong>을 가진다.<br>
        ③ 기구장이 절차 중단을 명령한 경우, 영업 부서는 이에 절대 복종하여야 하며, 기구장은 중단 사실을 대표이사에게 즉시 직접 보고(G-04)한다. (현재까지 시스템에 등록된 절차 보류 지시 <span data-reg-field="g04Count">${g04Count}</span>건)</p>

        <p><strong>제8조 (대표이사 직접보고 체계)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[G-05 연동됨]</span><br>
        기구장은 반기별 1회 이상 자율준수체제 운영 현황, 허가 취득 실적, 거래심사 결과 및 내부감사 조치사항을 최고경영자(대표이사)에게 직접 서면 보고한다.</p>
      </section>

      <!-- 제4장 수출거래심사 절차 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 4 장 수출거래심사 절차
        </h3>

        <p><strong>제9조 (전략물자 판정 등)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[F-01 ~ F-04 연동됨]</span><br>
        ① 연구소 및 기술개발 부서는 신규 품목 및 소프트웨어가 개발·변경되거나 수출이 계획되는 경우, 수출 이행 이전에 자율수출관리기구에 판정을 의뢰하여야 한다.<br>
        ② 판정 담당자는 산업통상자원부 [별표 2] 통제리스트 및 바세나르체제(WA) 기준에 따라 엄격한 자가판정(F-01)을 수행하며, 모호한 품목은 무역안보관리원 앞 전문판정(F-02)을 신청한다.<br>
        ③ 판정 결과 및 기술사양 분석서(F-03/04)는 전산 시스템에 영구 DB화하여 관리한다.</p>

        <p><strong>제10조 (신규 거래처 사전 통보 및 3단계 거래심사)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(156,163,175,0.15); color:var(--text-tertiary); padding:2px 8px; border-radius:4px; font-weight:600;" title="G-01은 거래 건별로 작성되어 규정 화면에 대표값이 없습니다">[절차 근거: G-01 / G-02]</span><br>
        ① 영업 부서는 신규 바이어 발굴 시 <strong>계약 체결 전</strong>에 반드시 자율수출관리기구에 거래상대방 정보를 사전 통보하여 안전성 검토를 득하여야 한다.<br>
        ② 거래심사는 다음 3단계에 걸쳐 전략물자관리시스템(YesTrade) 우려거래자 명단 조회 및 최종용도 의심징후(Red Flags) 점검을 실시하고 DB화(G-02)한다:<br>
        1. <strong>1단계 (계약 전)</strong>: 바이어 신원확인, 제재국가 여부 및 우려거래자 스크리닝<br>
        2. <strong>2단계 (계약 체결 및 허가 신청 시)</strong>: 최종사용자 서약서(EUS) 징구 및 상황허가 용도 확인<br>
        3. <strong>3단계 (출하 직전)</strong>: 최종 목적지 및 수하인 변경 여부 최종 재검증</p>

        <p><strong>제11조 (수출허가의 신청 및 관리)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[G-03 / I-01 연동됨]</span><br>
        ① 전략물자 또는 상황허가 대상 품목으로 판정된 건은 허가 취득 전까지 어떠한 경우에도 출하·선적할 수 없다.<br>
        ② 자율수출관리기구는 산업통상자원부장관 등의 개별수출허가 또는 CP 특례에 따른 포괄수출허가를 취득하고, 그 이력을 수출허가 관리대장(G-03) 및 사후관리대장(I-01)에 기록·관리한다.</p>

        <p><strong>제12조 (전략물자 국내거래 시 사전 통보 절차)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[E-01 / E-02 연동됨]</span><br>
        ① 국내 거래라 하더라도 당사의 전략물자 또는 통제 소프트웨어가 국내 거래처를 거쳐 제3국으로 불법 재수출되는 것을 방지하기 위하여, 당사는 국내 거래처에 해당 품목이 전략물자임을 사전에 명문화하여 통보(E-01)한다. (현재까지 발행된 국내거래 통보서 <span data-reg-field="e01Count">${e01Count}</span>건)<br>
        ② 모든 국내 공급 계약서 및 견적서, 제품 설명서에는 아래의 <strong>「표준 계약서 전략물자 준수 및 사전통보 특약 조항」</strong>을 의무적으로 삽입(E-02)한다:</p>
        ${contractClauseHtml}
      </section>

      <!-- 제5장 출하관리 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 5 장 출하관리
        </h3>

        <p><strong>제13조 (물품 및 소프트웨어 출하 통제)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(156,163,175,0.15); color:var(--text-tertiary); padding:2px 8px; border-radius:4px; font-weight:600;" title="H-01은 거래 건별로 작성되어 규정 화면에 대표값이 없습니다">[절차 근거: H-01]</span><br>
        ① 출하통제의 독립성을 확보하기 위하여, 출하관리 담당자는 자율준수관리자 및 영업 담당자와 분리된 독립된 자(<span data-reg-field="clearanceRole">${clearanceRole}</span>)로 지정한다.<br>
        ② 출하관리 담당자는 최종 선적 전 반드시 「출하 전 전략물자 교차 검증 점검표(H-01)」를 작성하여, ① 선적 품목과 판정서 스펙의 일치 여부, ② 수출허가서 원본 취득 및 허가 수량 잔량 여부, ③ 최종 수하인의 일치 여부를 대조 검증하고 기구장의 출하 승인 결재를 득하여야 한다.<br>
        ③ 교차 검증 결과 불일치 또는 이상 징후 발견 시, 출하담당자는 즉시 선적을 보류하고 기구장에게 보고한다.</p>
      </section>

      <!-- 제6장 정보보안 관리 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 6 장 정보보안 관리
        </h3>

        <p><strong>제14조 (정보보안 관리)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[D-03 / D-05 연동됨]</span><br>
        ① 정보보안 담당자는 무형기술이전을 통제하기 위하여 사내 네트워크, 이메일, 기술 자료 서버에 대한 접근 통제 및 반출 통제 보안 시스템을 운영한다.<br>
        ② 보안 관리에 관한 상세 지침은 별도의 「정보보안관리 지침(D-03)」을 따르며, 핵심 수칙은 아래와 같다:</p>
        ${securityGuidelineHtml}
      </section>

      <!-- 제7장 내부감사 및 교육 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 7 장 내부감사 및 교육
        </h3>

        <p><strong>제15조 (정기 내부감사)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[C-07 / C-06 연동됨]</span><br>
        ① 당사는 수출관리 업무 전반이 법규와 본 규정에 따라 적법하게 수행되는지 점검하기 위하여 <span data-reg-field="auditCycleText">${auditCycleText}</span> 주기로 자율수출관리기구의 주관하에 내부감사를 실시한다.<br>
        ② 감사의 객관성을 담보하기 위해, 감사는 기구 외 독립 감사인(${auditorRole})에 의해 수행된다.<br>
        ③ 감사 결과 지적사항이 발생한 경우 즉시 시정조치 요구서(C-04)를 발행하여 30일 이내 개선(C-05)하도록 조치하며, <strong>감사 결과는 기구장을 거쳐 최고경영자(대표이사)에게 최종 직접 대면 보고(C-06)</strong>한다.</p>

        <p><strong>제16조 (교육훈련)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[C-00 연동됨]</span><br>
        ① 당사는 전 임직원을 대상으로 전략물자 수출관리에 관한 내부 교육을 <span data-reg-field="trainingCycleText">${trainingCycleText}</span> 실시한다.<br>
        ② 자율수출관리기구 구성원은 무역안보관리원이 주관하는 법정 전문교육(CP과정, Pre-Master 등)을 3년에 1회 이상 반드시 이수하여야 한다.</p>
      </section>

      <!-- 제8장 문서관리 및 위반조치 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 8 장 문서관리 및 위반조치
        </h3>

        <p><strong>제17조 (수출관리 관련 서류의 5년 의무 보관)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[D-01 연동됨]</span><br>
        ① 당사는 대외무역법 및 고시 제92조에 따라 판정서, 거래심사표, 우려거래자 스크리닝 증빙, 수출허가서, 선적서류(B/L, Invoice), 출하점검표, 감사보고서 등 수출관리와 관련된 모든 문서를 <strong>최소 5년간 의무적으로 보관</strong>한다.<br>
        ② 문서관리 세칙(D-01)에 따른 관리 원칙은 다음과 같다: <span data-reg-field="docManagementText" style="white-space:pre-wrap;">${docManagementText}</span></p>

        <p><strong>제18조 (위반사항의 신속 보고 및 자진신고)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[J-01 / J-02 연동됨]</span><br>
        ① 임직원은 대외무역법 또는 본 규정의 위반 사실이나 위반 우려를 인지한 즉시 자율수출관리기구의 장에게 보고하여야 한다.<br>
        ② 기구장은 위반 사실 확인 시 즉각적인 거래 중단 및 시정조치를 취함과 동시에, 산업통상자원부장관 앞 공식 「자진신고서(J-01)」 및 「재발방지계획서(J-02)」를 제출하여 법적 리스크를 최소화한다. (현재까지 자진신고 <span data-reg-field="j01Count">${j01Count}</span>건 — 0건은 위반사항이 없었다는 뜻이다)</p>
        
        <p><strong>제19조 (벌칙 및 인사규정 연계)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-purple); padding:2px 8px; border-radius:4px; font-weight:600;">[인사규정 연계]</span><br>
        고의 또는 중대한 과실로 본 규정 및 수출통제 법령을 위반하여 회사에 손해를 끼치거나 불법 수출에 연루된 자는 당사 취업규칙 및 인사규정 징계 기준에 따라 엄중 문책(감봉, 정직, 해고 등) 및 구상권 청구의 대상이 된다.</p>
      </section>

      <!-- 제9장 기타 정보보안 -->
      <section style="margin-bottom:2.2rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          제 9 장 기타 정보보안
        </h3>

        <p><strong>제20조 (정보통신 IT 보안관리 체계)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[D-03 / D-04 연동됨]</span><br>
        ① 당사는 전략기술 및 R&D 산출물의 무단 유출을 방지하기 위하여 정보보안관리 지침(D-03)을 제정하고, 핵심 기술 저장소에 대한 접근권한 관리대장(D-04)을 구축·운영한다.<br>
        ② IT 보안 세부 수칙 및 통제 기준은 다음과 같다:</p>
        ${securityGuidelineHtml}

        <p><strong>제21조 (인적 보안 및 외국인 연구인력 관리)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[D-05 연동됨]</span><br>
        ① 외국인 연구원, 산업연수생, 해외 기술인력을 채용하거나 프로젝트에 투입하는 경우의 신원확인 절차(D-05)는 다음과 같다: <span data-reg-field="foreignStaffProcedureText" style="white-space:pre-wrap;">${foreignStaffProcedureText}</span><br>
        ② 외국인 연구원에 대해서는 「외국인 연구인력 관리대장(D-06)」에 등재하고, 인가받지 않은 국가핵심기술 및 전략기술 서버에의 접근 권한을 시스템적으로 차등 제한한다.</p>

        <p><strong>제22조 (보안 교육)</strong><br>
        당사는 채용 예정자, 재직자 및 퇴직 예정자에 대하여 전략기술 보호 및 기술 유출 방지 관련 정보보안 교육을 정기적으로 실시한다.</p>
      </section>

      <!-- 부 칙 -->
      <section style="margin-bottom:2.2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <h3 style="border-left:4px solid var(--primary-color); padding-left:10px; margin-bottom:1.1rem; color:var(--text-primary); font-size:1.25rem; font-weight:700;">
          부 칙
        </h3>
        <p><strong>제1조 (시행일)</strong><br>
        본 규정은 대표이사의 결재를 득한 날(<span data-reg-field="effectiveDate">${effectiveDate}</span>)로부터 즉시 제정하여 시행한다.</p>
        <p><strong>제2조 (규정의 개정 및 이력 관리)</strong> <span class="sync-badge" style="font-size:0.75rem; background:rgba(34,197,94,0.1); color:var(--accent-green); padding:2px 8px; border-radius:4px; font-weight:600;">[A-04 / A-05 연동됨]</span><br>
        본 규정의 개정은 자율수출관리기구의 정기 검토(연 1회) 또는 대외무역법령 개정에 따라 기구장이 기안하고 대표이사의 결재를 받아 시행하며, 모든 개정 이력은 규정 개정이력 관리대장(A-05)에 기록·보존한다.</p>
      </section>

    </div>
  `;
}
