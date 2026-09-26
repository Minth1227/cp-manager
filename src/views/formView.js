import { formDefinitions } from '../forms/definitions.js';
import { renderForm } from '../forms/renderer.js';
import { getStepByFormId } from '../data/processFlow.js';
import { getFormData, getCompanyInfo, getLegalPdfInfo } from '../store.js';

function getLiveA09Data(container) {
  const saved = getFormData('A-09') || {};
  
  // Extract courses from Table 1
  let courses = [];
  const coursesTable = container.querySelector('table[data-table-key="courses"] tbody') || container.querySelector('#dynamic-table-A-09 tbody');
  if (coursesTable) {
    coursesTable.querySelectorAll('tr').forEach(tr => {
      const rowObj = {};
      tr.querySelectorAll('input, select').forEach(input => {
        const col = input.dataset.col;
        if (col) rowObj[col] = input.value;
      });
      if (Object.keys(rowObj).length > 0) courses.push(rowObj);
    });
  } else {
    courses = saved.courses || saved.rows || [];
  }

  // Extract workshops from Table 2
  let workshops = [];
  const workshopsTable = container.querySelector('table[data-table-key="workshops"] tbody');
  if (workshopsTable) {
    workshopsTable.querySelectorAll('tr').forEach(tr => {
      const rowObj = {};
      tr.querySelectorAll('input, select').forEach(input => {
        const col = input.dataset.col;
        if (col) rowObj[col] = input.value;
      });
      if (Object.keys(rowObj).length > 0) workshops.push(rowObj);
    });
  } else {
    workshops = saved.workshops || [];
  }

  return { courses, workshops };
}

function renderA09ComplianceCard(courseRows = [], workshopRows = []) {
  const compInfo = getCompanyInfo() || {};
  const isInitialApp = compInfo.cpAppMode !== 'certified';
  const certDateStr = compInfo.cpCertifiedDate || '';

  // 3-Year Date Window Helper
  const isWithin3Years = (dateStr) => {
    if (!dateStr) return false;
    if (!certDateStr) return true; // If cert date not set, allow all
    const d = new Date(dateStr);
    const c = new Date(certDateStr);
    if (isNaN(d.getTime()) || isNaN(c.getTime())) return true;
    const windowStart = new Date(c);
    windowStart.setMonth(windowStart.getMonth() - 1); // 1 month transition buffer
    const windowEnd = new Date(c);
    windowEnd.setFullYear(windowEnd.getFullYear() + 3);
    return d >= windowStart && d <= windowEnd;
  };

  // Compute validity string for UI
  let validityText = '';
  if (!isInitialApp && certDateStr) {
    const c = new Date(certDateStr);
    if (!isNaN(c.getTime())) {
      const exp = new Date(c);
      exp.setFullYear(exp.getFullYear() + 3);
      exp.setDate(exp.getDate() - 1);
      validityText = ` (3년 유효기간: ${certDateStr} ~ ${exp.toISOString().slice(0, 10)})`;
    }
  }

  // 1. 4대 필수 과정
  const coreCourses = [
    { key: '전략물자 Basic', label: '① 전략물자 Basic' },
    { key: '전략물자 Pre-Master', label: '② 전략물자 Pre-Master' },
    { key: '자율준수무역거래자', label: '③ 자율준수무역거래자' },
    { key: '판정 Basic', label: '④ 판정 Basic' }
  ];

  const coreCompletedMap = {};
  coreCourses.forEach(c => coreCompletedMap[c.key] = []);

  // Check 4 core courses from Table 1
  courseRows.forEach(r => {
    if (r.courseName && coreCompletedMap[r.courseName]) {
      const label = r.name ? `${r.name}(${r.dept || r.role || ''})` : '이수자';
      coreCompletedMap[r.courseName].push(label);
    }
  });

  // 2. 워크숍 카운트 및 CEO/임원급 교육 체크 (Table 2 & Table 1) - 유효기간 3년 필터 적용
  let workshopList = [];
  let ceoExecTrainingList = [];

  // From Table 2 (Workshops)
  workshopRows.forEach(r => {
    if (r.name || r.workshopTitle) {
      const inWindow = isInitialApp || isWithin3Years(r.attendDate);
      const title = r.workshopTitle ? `[${r.workshopTitle}]` : '';
      const label = `${r.name || '참석자'}${title}(${r.attendDate || '참석'})${inWindow ? '' : ' ⚠️[3년 유효기간 외]'}`;
      
      if (inWindow) {
        workshopList.push(label);

        const isCeoOrExec = (
          (r.roleType && r.roleType.includes('임원')) ||
          (r.dept && (r.dept.includes('대표') || r.dept.includes('상무') || r.dept.includes('임원') || r.dept.includes('이사'))) ||
          (r.name && (r.name.includes('대표') || r.name.includes('박전략')))
        );
        if (isCeoOrExec) {
          ceoExecTrainingList.push(`${r.name || '임원'}(${r.workshopTitle || '워크숍'})`);
        }
      }
    }
  });

  // From Table 1 (Courses - CEO Course)
  courseRows.forEach(r => {
    const inWindow = isInitialApp || isWithin3Years(r.courseDate);
    if (inWindow) {
      if (r.courseName === 'CEO 전략물자 교육' || (r.courseName === '자율준수무역거래자' && (r.name === '대표이사' || r.dept?.includes('대표')))) {
        ceoExecTrainingList.push(`${r.name || '대표이사'}(${r.courseName})`);
      }
    }
  });

  const corePassedCount = coreCourses.filter(c => coreCompletedMap[c.key].length > 0).length;
  const isCoreAllPassed = corePassedCount === 4;

  const workshopCount = workshopList.length;
  const isWorkshopPassed = isInitialApp ? true : (workshopCount >= 3);

  const isCeoExecPassed = isInitialApp ? true : (ceoExecTrainingList.length >= 1);

  // Overall satisfaction
  const isOverallPassed = isCoreAllPassed && isWorkshopPassed && isCeoExecPassed;

  return `
    <div class="card" id="a09-compliance-card" style="background:linear-gradient(135deg, rgba(30,41,59,0.03), rgba(99,102,241,0.05)); border:1px solid ${isOverallPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}; margin-bottom:var(--space-lg); border-radius:8px; padding:var(--space-md);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:${isOverallPassed ? 'var(--accent-green)' : 'var(--accent-amber)'}; font-size:1.5rem;">
            ${isOverallPassed ? 'verified' : 'pending_actions'}
          </span>
          <h4 style="margin:0; font-size:1.05rem;">
            CP 심사기준(별표 20 지표 1.1.4) 담당자 인적요건 및 교육·워크숍 이수 종합 판정
            <span style="font-size:0.8rem; font-weight:normal; margin-left:6px; color:var(--text-secondary);">
              [${isInitialApp ? '🌱 신규(최초) 지정신청 기준' : `🎖️ 기존 지정기업 3년 갱신/유지 기준${validityText}`}]
            </span>
          </h4>
        </div>
        <div>
          ${isOverallPassed ? `
            <span class="status-badge done" style="font-size:0.9rem; padding:4px 12px; background:rgba(34,197,94,0.15); color:var(--accent-green); border:1px solid rgba(34,197,94,0.3);">
              🌟 CP AA등급 ${isInitialApp ? '신규신청' : '3년 갱신'} 교육·워크숍 기준 100% 충족 (적격)
            </span>
          ` : `
            <span class="status-badge progress" style="font-size:0.9rem; padding:4px 12px; background:rgba(239,68,68,0.1); color:var(--accent-red); border:1px solid rgba(239,68,68,0.3);">
              ⚠️ 심사 요건 미달 항목 존재 (보완 필요)
            </span>
          `}
        </div>
      </div>

      <p style="margin:0 0 12px 0; font-size:0.85rem; color:var(--text-secondary);">
        * <strong>법정 심사기준 세부 안내 (지표 1.1.4)</strong>: ${isInitialApp 
          ? '최초(신규) 지정 신청 기업은 지정 전이므로 <strong>연례 워크숍 참석이 공식 면제</strong>되며, <strong>[표 1] 4대 필수 법정 전문과정(4/4)</strong>만 이수하면 인적요건 만점으로 인정됩니다.' 
          : '기존 지정 기업은 ① <strong>[표 1] 4대 필수과정</strong> + ② <strong>[표 2] 유효기간(3년) 내 워크숍 3회 이상 참석</strong>(7월 무역안보의날/11월 연말) + ③ <strong>CEO/임원급 교육 또는 워크숍 1회 이상</strong> 참석이 필수입니다.'}
      </p>

      <!-- 4대 필수 과정 그리드 -->
      <div style="margin-bottom:10px;">
        <div style="font-size:0.82rem; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">
          [1그룹] [표 1] 4대 필수 외부 법정 교육 (${corePassedCount}/4 이수)
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:8px;">
          ${coreCourses.map(c => {
            const attendees = coreCompletedMap[c.key];
            const passed = attendees.length > 0;
            return `
              <div style="padding:10px; background:var(--bg-card); border-radius:6px; border:1px solid ${passed ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <strong style="font-size:0.88rem; color:${passed ? 'var(--text-primary)' : 'var(--accent-red)'};">${c.label}</strong>
                  <span style="font-size:0.75rem; font-weight:600; color:${passed ? 'var(--accent-green)' : 'var(--accent-red)'};">
                    ${passed ? '✓ 이수' : '✕ 미이수'}
                  </span>
                </div>
                <div style="font-size:0.8rem; color:var(--text-secondary);">
                  ${passed ? `이수자: <strong style="color:var(--text-primary)">${attendees.join(', ')}</strong>` : '<span style="color:var(--accent-red)">기록 없음</span>'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 2그룹: 갱신/유지 특화 요건 (워크숍 3회 + CEO/임원 1회) -->
      <div>
        <div style="font-size:0.82rem; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">
          [2그룹] [표 2] CP 3년 유효기간 내 사후관리 & 임원급 참석 요건
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:8px;">
          
          <!-- ③ 워크숍 3회 요건 -->
          <div style="padding:10px; background:${isInitialApp ? 'rgba(0,0,0,0.02)' : 'var(--bg-card)'}; border-radius:6px; border:1px ${isInitialApp ? 'dashed rgba(0,0,0,0.15)' : (isWorkshopPassed ? 'solid rgba(34,197,94,0.25)' : 'solid rgba(239,68,68,0.25)')};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong style="font-size:0.88rem; color:${isInitialApp ? 'var(--text-secondary)' : (isWorkshopPassed ? 'var(--text-primary)' : 'var(--accent-red)')};">
                ③ 전략물자 워크숍 참석 실적
              </strong>
              <span style="font-size:0.75rem; font-weight:600; padding:2px 6px; border-radius:3px; ${isInitialApp ? 'color:var(--accent-blue); background:rgba(59,130,246,0.1);' : (isWorkshopPassed ? 'color:var(--accent-green); background:rgba(34,197,94,0.1);' : 'color:var(--accent-red); background:rgba(239,68,68,0.1);')}">
                ${isInitialApp ? '면제 (최초 신청)' : (isWorkshopPassed ? `✓ 충족 (${workshopCount}회 참석)` : `⚠️ 부족 (${workshopCount}/3회)`)}
              </span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-tertiary); margin-bottom:4px;">
              ${isInitialApp ? '최초 지정 신청 시 면제 대상' : '기준: 3년 유효기간 내 3회 이상 (7월 무역안보의날 + 11월 연말)'}
            </div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">
              ${workshopList.length > 0 ? `참석 기록: <strong>${workshopList.join(', ')}</strong>` : '<span style="color:var(--text-tertiary)">[표 2]에 등록된 워크숍 참석 기록 없음</span>'}
            </div>
          </div>

          <!-- ④ CEO/임원급 1회 요건 -->
          <div style="padding:10px; background:${isInitialApp ? 'rgba(0,0,0,0.02)' : 'var(--bg-card)'}; border-radius:6px; border:1px ${isInitialApp ? 'dashed rgba(0,0,0,0.15)' : (isCeoExecPassed ? 'solid rgba(34,197,94,0.25)' : 'solid rgba(239,68,68,0.25)')};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong style="font-size:0.88rem; color:${isInitialApp ? 'var(--text-secondary)' : (isCeoExecPassed ? 'var(--text-primary)' : 'var(--accent-red)')};">
                ④ CEO / 임원(기구장) 교육·워크숍
              </strong>
              <span style="font-size:0.75rem; font-weight:600; padding:2px 6px; border-radius:3px; ${isInitialApp ? 'color:var(--accent-blue); background:rgba(59,130,246,0.1);' : (isCeoExecPassed ? 'color:var(--accent-green); background:rgba(34,197,94,0.1);' : 'color:var(--accent-red); background:rgba(239,68,68,0.1);')}">
                ${isInitialApp ? '면제 (최초 신청)' : (isCeoExecPassed ? `✓ 충족 (${ceoExecTrainingList.length}건)` : '⚠️ 미이수 (1회 이상 필수)')}
              </span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-tertiary); margin-bottom:4px;">
              ${isInitialApp ? '기구장 CP과정 이수 시 충족' : '기준: CEO 교육 이수 또는 워크숍 참석 (3년 내 1회 이상)'}
            </div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">
              ${ceoExecTrainingList.length > 0 ? `이수/참석자: <strong>${ceoExecTrainingList.join(', ')}</strong>` : '<span style="color:var(--text-tertiary)">임원급 교육/워크숍 기록 없음</span>'}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

export async function renderFormView(container, formId, onBack) {
  const formDef = formDefinitions[formId];
  if (!formDef) {
    container.innerHTML = '<div class="card"><p>양식을 찾을 수 없습니다: ' + formId + '</p></div>';
    return;
  }

  const ctx = getStepByFormId(formId);
  const phaseName = ctx ? ctx.phase.title : '';
  const stepName  = ctx ? ctx.step.title  : '';

  // [Fix P1] store.js의 권위 isTxForm()을 사용 (로컬 4개 리스트 → 22개 정합)
  const { 
    getSelectedTransactionId, getTransactions, getSelectedProductId, getProducts,
    isTxForm: checkIsTxForm, getFormData
  } = await import('../store.js');

  const tId = getSelectedTransactionId();
  const tx = getTransactions().find(t => t.id === tId);
  const pId = getSelectedProductId();
  const product = getProducts().find(p => p.id === pId);

  const isTxFormResult = checkIsTxForm(formId);

  // [Fix P0] Track 2 진입 가드: txForm인데 거래가 선택되지 않은 경우 차단
  if (isTxFormResult && !tId) {
    container.innerHTML = `
      <div class="fade-in">
        <div class="page-header">
          <div class="breadcrumb">
            <span id="breadcrumb-guard-home" style="cursor:pointer">대시보드</span> &gt;
            <span style="color:var(--accent-blue); font-weight:600;">🚢 무역 거래</span> &gt;
            <span>${formDef.id} ${formDef.title}</span>
          </div>
        </div>
        <div class="card" style="border: 2px solid var(--accent-amber); padding: 40px 32px; text-align:center; max-width:600px; margin: 40px auto;">
          <span class="material-symbols-rounded" style="font-size:3.5rem; color:var(--accent-amber); display:block; margin-bottom:16px;">swap_horiz</span>
          <h3 style="margin:0 0 12px; font-size:1.3rem;">수출 거래를 먼저 선택해주세요</h3>
          <p style="color:var(--text-secondary); margin-bottom:8px; line-height:1.7;">
            <strong style="color:var(--accent-blue);">${formDef.id}. ${formDef.title}</strong> 서식은<br/>
            개별 수출 거래(Export Case)에 종속된 <strong>Track 2</strong> 서류입니다.
          </p>
          <p style="color:var(--text-tertiary); font-size:0.85rem; margin-bottom:28px;">
            대시보드의 '제품 및 수출 거래(Export Case) 통합 관리'에서<br/>
            작업할 거래를 먼저 선택한 뒤 이 서식을 열어주세요.
          </p>
          <button class="btn btn-primary" id="btn-guard-go-dashboard" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px;">
            <span class="material-symbols-rounded">dashboard</span> 대시보드로 이동하기
          </button>
        </div>
      </div>`;
    container.querySelector('#btn-guard-go-dashboard')?.addEventListener('click', () => onBack());
    container.querySelector('#breadcrumb-guard-home')?.addEventListener('click', () => onBack());
    return; // 폼 렌더링 완전 중단
  }

  // [Guard] 초민감품목 포괄수출허가(L-02) 차단 로직
  if (formId === 'L-02' && tId) {
    const f04Data = getFormData('F-04_' + tId) || {};
    const f01Data = getFormData('F-01_' + tId) || {};
    
    // 판정대장(F-04)의 민감도 분류가 초민감품목이거나, 자가판정서(F-01)의 WA 초민감이 체크된 경우
    const isVerySensitive = (f04Data.q_sensitivity === '초민감품목') || (f01Data.regime_wa_ss === 'yes');
    
    if (isVerySensitive) {
      container.innerHTML = `
        <div class="fade-in">
          <div class="page-header">
            <div class="breadcrumb">
              <span id="breadcrumb-guard-home" style="cursor:pointer">대시보드</span> &gt;
              <span style="color:var(--accent-blue); font-weight:600;">🚢 무역 거래</span> &gt;
              <span>${formDef.id} ${formDef.title}</span>
            </div>
          </div>
          <div class="card" style="border: 2px solid var(--accent-amber); padding: 40px 32px; text-align:center; max-width:650px; margin: 40px auto;">
            <span class="material-symbols-rounded" style="font-size:3.5rem; color:var(--accent-amber); display:block; margin-bottom:16px;">block</span>
            <h3 style="margin:0 0 12px; font-size:1.3rem;">⚠️ 초민감품목 포괄수출허가 신청 불가</h3>
            <p style="color:var(--text-secondary); margin-bottom:8px; line-height:1.7;">
              해당 거래의 품목은 판정관리대장(F-04)에서 <strong>초민감품목</strong>으로 지정되었습니다.<br/>
              <strong style="color:var(--accent-amber);">전략물자수출입고시 제22조 및 [별표 8]에 따라 초민감품목은 포괄수출허가를 받을 수 없습니다.</strong>
            </p>
            <p style="color:var(--text-tertiary); font-size:0.9rem; margin-bottom:28px;">
              반드시 <strong>개별수출허가(L-01)</strong> 트랙으로 진행해 주십시오.
            </p>
            <button class="btn btn-primary" id="btn-guard-go-l01" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px;">
              <span class="material-symbols-rounded">description</span> 개별수출허가(L-01) 작성으로 이동
            </button>
          </div>
        </div>`;
      
      container.querySelector('#btn-guard-go-l01')?.addEventListener('click', () => {
        // Render L-01 instead
        renderFormView(container, 'L-01', onBack);
      });
      container.querySelector('#breadcrumb-guard-home')?.addEventListener('click', () => onBack());
      return; // L-02 렌더링 중단
    }
  }

  // [Fix P1] 브레드크럼 Track 라벨 계산
  const trackLabel = ctx?.phase?.track === 'CP'
    ? '<span style="color:var(--accent-purple); font-weight:600;">🏛️ CP 인프라</span>'
    : ctx?.phase?.track === 'TRADE'
    ? '<span style="color:var(--accent-blue); font-weight:600;">🚢 무역 거래</span>'
    : '';

  let html = '<div class="fade-in">';

  // ── Breadcrumb + Header ──
  html += `
    <div class="page-header">
      <div class="breadcrumb">
        <span id="breadcrumb-home" style="cursor:pointer">대시보드</span> &gt;
        ${trackLabel ? trackLabel + ' &gt;' : ''}
        ${phaseName} &gt; ${stepName} &gt;
        <span>${formDef.id} ${formDef.title}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between; flex-wrap: wrap; gap: 8px;">
        <div style="display:flex; align-items:center; gap: 12px;">
          <h2 style="margin:0;">${formDef.id}. ${formDef.title}</h2>
          ${isTxFormResult && tx ? `
            <span style="background:var(--accent-blue); color:white; padding:4px 10px; border-radius:12px; font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:4px;">
              <span class="material-symbols-rounded" style="font-size:1rem;">swap_horiz</span> 거래: ${tx.name}
            </span>
          ` : ''}
          ${['F-01', 'F-02', 'F-03', 'Z-01', 'G-01', 'H-01'].includes(formId) && product ? `
            <span style="background:var(--text-tertiary); color:white; padding:4px 10px; border-radius:12px; font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:4px;">
              <span class="material-symbols-rounded" style="font-size:1rem;">inventory_2</span> 품목: ${product.name}
            </span>
          ` : ''}
        </div>
        <div style="display:flex; gap: 8px;">
          ${getLegalPdfInfo(formDef.id) ? `
            <a class="btn btn-secondary" href="/.netlify/functions/legal_pdf_get?formId=${encodeURIComponent(formDef.id)}" target="_blank" rel="noopener" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; color:var(--accent-purple); border-color:rgba(139,92,246,0.3);">
              <span class="material-symbols-rounded">picture_as_pdf</span> 공식 서식 PDF 다운로드
            </a>
          ` : ''}
          ${isTxFormResult ? `
            <button class="btn btn-secondary" id="btn-back-tx">
              <span class="material-symbols-rounded">swap_horiz</span> 거래 대시보드
            </button>
          ` : ''}
          <button class="btn btn-secondary" id="btn-back-dashboard">
            <span class="material-symbols-rounded">arrow_back</span> 홈으로
          </button>
        </div>
      </div>
    </div>`;

  // [Fix P2] Track 2 서식: 활성 거래 컨텍스트 배너 (상단 고정)
  if (isTxFormResult && tx) {
    const lockedBadge = tx.isLocked
      ? `<span style="background:rgba(245,158,11,0.15); color:var(--accent-amber); border:1px solid rgba(245,158,11,0.3); border-radius:6px; font-size:0.75rem; font-weight:700; padding:2px 8px; display:inline-flex; align-items:center; gap:3px;"><span class="material-symbols-rounded" style="font-size:0.9rem;">lock</span> 5년 보관 완료 (읽기 전용)</span>`
      : '';
    html += `
      <div style="background:linear-gradient(135deg, rgba(59,130,246,0.07), rgba(99,102,241,0.05));
        border:1px solid rgba(59,130,246,0.2); border-radius:8px;
        padding:12px 18px; margin-bottom:16px;
        display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
        <span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:1.5rem; flex-shrink:0;">inventory_2</span>
        <div style="flex:1; min-width:200px;">
          <div style="font-size:0.72rem; color:var(--text-tertiary); font-weight:700; letter-spacing:0.5px; margin-bottom:3px;">
            🚢 현재 작업 중인 수출 거래 (Export Case)
          </div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            ${tx.name}
            <span style="font-weight:400; color:var(--text-secondary); font-size:0.85rem;">
              ${tx.country ? `· ${tx.country}` : ''} ${tx.buyer ? `· ${tx.buyer}` : ''} ${tx.exportDate ? `· ${tx.exportDate}` : ''}
            </span>
            ${lockedBadge}
          </div>
        </div>
      </div>`;
  }

  // If A-09, insert compliance audit container
  if (formId === 'A-09') {
    const a09Saved = getFormData('A-09') || {};
    html += `<div id="a09-audit-wrapper">${renderA09ComplianceCard(a09Saved.courses || a09Saved.rows || [], a09Saved.workshops || [])}</div>`;
  }

  html += `<div id="form-render-target"></div>`;
  html += '</div>';
  container.innerHTML = html;

  // ── Render the actual form ──
  const target = document.getElementById('form-render-target');
  renderForm(formDef, target);

  // ── Live Sync for A-09 Table ──
  if (formId === 'A-09') {
    const updateComplianceLive = () => {
      const { courses, workshops } = getLiveA09Data(container);
      const auditWrapper = container.querySelector('#a09-audit-wrapper');
      if (auditWrapper) {
        auditWrapper.innerHTML = renderA09ComplianceCard(courses, workshops);
      }
    };

    // Immediately trigger live update once rendered
    setTimeout(updateComplianceLive, 50);

    // Bind change, input, and click events on table
    container.addEventListener('change', (e) => {
      if (e.target.closest('table[data-table-key]')) updateComplianceLive();
    });
    container.addEventListener('input', (e) => {
      if (e.target.closest('table[data-table-key]')) updateComplianceLive();
    });
    container.addEventListener('click', (e) => {
      if (e.target.closest('.btn-add-row') || e.target.closest('.btn-delete-row')) {
        setTimeout(updateComplianceLive, 100);
      }
    });
  }

  // ── Events ──
  const backBtn = container.querySelector('#btn-back-dashboard');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      onBack();
    });
  }

  const backTxBtn = container.querySelector('#btn-back-tx');
  if (backTxBtn) {
    backTxBtn.addEventListener('click', () => {
      if (window.appRouter) {
        window.appRouter.navigate('dashboard');
      } else {
        window.dispatchEvent(new CustomEvent('navigate-view', { detail: 'dashboard' }));
      }
    });
  }

  const homeBtn = container.querySelector('#breadcrumb-home');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      onBack();
    });
  }
}

