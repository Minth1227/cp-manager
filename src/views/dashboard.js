// ============================================
// Dashboard View (Consolidated with Tabs)
// ============================================

import { phases } from '../data/processFlow.js';
import { getFormStatus, getFormData, getCompanyInfo, setCompanyInfo, loadDummyData, saveCurrentStateToDb, canEdit, getProducts, getTransactions, getSelectedTransactionId, setSelectedTransactionId, addProduct, updateProduct, deleteProduct, addTransaction, updateTransaction, deleteTransaction, getSelectedProductId, setSelectedProductId, applyMockData, rollbackMockData, canUnlock, unlockTransaction } from '../store.js';
import { popcornMockData } from '../data/mockPopcornData.js';
import { formDefinitions } from '../forms/definitions.js';
import { evaluateCpAppModeLogic } from '../logic.js';
import { customAlert, customFormDialog, customConfirm, customPrompt } from '../utils/dialog.js';

const practicalChecklists = {
  cp_phase1: [
    { id: "rm_1_1", text: "규모 및 등급 목표 설정 (대기업/중소기업 기준 파악)" },
    { id: "rm_1_2", text: "수출관리기구 구성 및 기구장 임명" },
    { id: "rm_1_4", text: "자율준수 규정 제정 및 세부지침 마련" },
    { id: "rm_2_1", text: "CEO 이행선언문 작성 (3년에 1회 갱신) 및 사내 전파" }
  ],
  cp_phase2: [
    { id: "rm_3_1", text: "CP 담당자 외부 교육 이수 (Basic + PreMaster) 및 워크숍 참석" },
    { id: "rm_3_3", text: "연간 사내 교육 실시 (교육 계획서 및 결과보고서 작성)" },
    { id: "rm_5_1", text: "내부 감사 실시 (최대 2년 주기, 독립적 감사)" },
    { id: "rm_5_3", text: "위반 시정조치 명문화 (인사규정 연계 등) 및 규정 개정 검토" },
    { id: "rm_5_5", text: "CEO 내부 보고 (등급별 연/반기/분기 1회)" }
  ],
  trade_phase1: [
    { id: "rm_1_1_2", text: "계약 전 통합 검색기를 통한 품목 및 우려거래자 조회 (필수)" },
    { id: "rm_4_3", text: "전략물자 사전 판정 및 검증 (사양서, 카달로그 준비)" }
  ],
  trade_phase2: [
    { id: "rm_4_1", text: "영업부서 사전 통보 체계 확립 (계약 전 통보)" },
    { id: "rm_4_2", text: "우려거래자(Denied Party) 스크리닝 (계약전/진행중/출하전 3회)" }
  ],
  trade_phase3: [
    { id: "rm_4_4", text: "출하 관리 및 교차 검증 시스템 완비" }
  ]
};

// Global state for dashboard tabs
let currentTab = localStorage.getItem('cp_dashboard_tab') || 'cp';

export function renderDashboard(container, onSelectForm) {
  const allFormIds = Object.keys(formDefinitions);
  const totalForms = allFormIds.length;
  const doneForms = allFormIds.filter(id => getFormStatus(id) === 'done').length;
  const naForms = allFormIds.filter(id => getFormStatus(id) === 'na').length;
  const requiredForms = totalForms - naForms;
  const progressPercent = totalForms > 0 ? Math.round(((doneForms + naForms) / totalForms) * 100) : 0;

  let savedStatus = JSON.parse(localStorage.getItem('cp_roadmap_status')) || {};
  const compInfo = getCompanyInfo() || {};
  const isInitialApp = compInfo.cpAppMode !== 'certified';
  const certDateStr = compInfo.cpCertifiedDate || '';

  const isWithin3Years = (dateStr) => {
    if (!dateStr) return false;
    if (!certDateStr) return true;
    const d = new Date(dateStr);
    const c = new Date(certDateStr);
    if (isNaN(d.getTime()) || isNaN(c.getTime())) return true;
    const windowStart = new Date(c);
    windowStart.setMonth(windowStart.getMonth() - 1);
    const windowEnd = new Date(c);
    windowEnd.setFullYear(windowEnd.getFullYear() + 3);
    return d >= windowStart && d <= windowEnd;
  };

  const a09Data = getFormData('A-09') || {};
  const a09Courses = a09Data.courses || a09Data.rows || [];
  const a09Workshops = a09Data.workshops || [];
  
  const coreCourses = ['전략물자 Basic', '전략물자 Pre-Master', '자율준수무역거래자', '판정 Basic'];
  const corePassed = coreCourses.filter(c => a09Courses.some(r => r.courseName === c));
  const isCorePassed = corePassed.length === 4;

  const validWorkshops = a09Workshops.filter(r => isWithin3Years(r.attendDate));
  const fallbackWorkshopCount = a09Courses.filter(r => r.courseName === '전략물자 워크숍' && isWithin3Years(r.courseDate)).length;
  const workshopCount = a09Workshops.length > 0 ? validWorkshops.length : fallbackWorkshopCount;
  const isWorkshopPassed = isInitialApp ? true : (workshopCount >= 3);

  const hasCeoOrExec = validWorkshops.some(r => (
    (r.roleType && r.roleType.includes('임원')) ||
    (r.dept && (r.dept.includes('대표') || r.dept.includes('상무') || r.dept.includes('임원'))) ||
    (r.name && (r.name.includes('대표') || r.name.includes('박전략')))
  )) || a09Courses.some(r => (r.courseName === 'CEO 전략물자 교육' || (r.courseName === '자율준수무역거래자' && r.name === '대표이사')) && isWithin3Years(r.courseDate));
  const isCeoPassed = isInitialApp ? true : hasCeoOrExec;

  const isEducationFullyPassed = isCorePassed && isWorkshopPassed && isCeoPassed;

  // Render Dashboard Phase Helper
  const statusLabels = { todo: '미착수', progress: '작성중', review: '검토중', done: '완료', na: '해당없음' };
  
  const renderDashboardPhase = (phase, checkMarkCompleted = false) => {
    let phaseHtml = `
      <div class="card" style="margin-bottom:var(--space-md)">
        <div class="card-header">
          <div class="card-title">
            <span class="material-symbols-rounded">${phase.icon}</span>
            ${phase.number}. ${phase.title}
          </div>
        </div>
        <div style="padding: var(--space-md)">`;

    phase.steps.forEach(step => {
      phaseHtml += `
        <div style="margin-bottom:var(--space-md)">
          <h4 style="font-size:0.9rem;font-weight:600;margin-bottom:var(--space-sm);color:var(--text-primary)">${step.title}</h4>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:var(--space-sm)">${step.desc}</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-xs)">`;

      step.forms.forEach(formId => {
        const def = formDefinitions[formId];
        if (!def) return;
        const st = getFormStatus(formId);
        const isNa = st === 'na';
        const isDone = st === 'done';
        
        const naStyle = isNa ? 'opacity: 0.5; filter: grayscale(1); cursor: not-allowed; pointer-events: none;' : '';
        let naReason = null;
        if (isNa) {
          try {
            const rr = JSON.parse(localStorage.getItem('cp_route_result'));
            naReason = rr?.routeName ? `Z-01 사전진단 결과 "${rr.routeName}" 경로로 판정되어 해당하지 않습니다.` : 'Z-01 사전진단표를 먼저 작성하면 판정 근거가 표시됩니다.';
          } catch (e) { /* localStorage 파싱 실패 시 안내 생략 */ }
        }

        const formData = getFormData(formId);
        let modifierHtml = '';
        if (formData && formData._lastModifiedBy) {
          const dDate = new Date(formData._lastModifiedAt);
          const dateStr = isNaN(dDate) ? '' : `${dDate.getMonth()+1}/${dDate.getDate()}`;
          modifierHtml = `<span style="font-size:0.75rem; color:var(--text-tertiary); margin-left:auto; margin-right:8px;">
            ${formData._lastModifiedBy.split('@')[0]} (${dateStr})
          </span>`;
        }

        const checkMark = (checkMarkCompleted && isDone) ? `<span class="material-symbols-rounded" style="color:var(--accent-green); font-size:1.2rem; margin-right:4px;">check_circle</span>` : '';

        phaseHtml += `
            <div class="form-list-item" data-form-id="${formId}" style="${naStyle}" ${naReason ? `title="${naReason}"` : ''}>
              ${checkMark}
              <span class="form-id">${def.id}</span>
              <span class="form-name">${def.title}</span>
              ${modifierHtml}
              <span class="status-badge ${st}">${statusLabels[st] || '알수없음'}</span>
            </div>`;
      });

      phaseHtml += '</div></div>';
    });
    
    const pChecklist = practicalChecklists[phase.id];
    if (pChecklist && pChecklist.length > 0) {
      phaseHtml += `<h4 style="font-size:0.9rem;font-weight:600;margin-top:var(--space-lg);margin-bottom:var(--space-sm);color:${phase.track === 'TRADE' ? 'var(--accent-blue)' : 'var(--accent-purple)'}; display:flex; align-items:center; gap:4px;">
        <span class="material-symbols-rounded" style="font-size:16px;">checklist</span> 실무(오프라인) 진행 점검표
      </h4>
      <div class="checklist">`;
      pChecklist.forEach(item => {
        const isChecked = savedStatus[item.id] ? 'checked' : '';
        phaseHtml += `
          <div class="checklist-item ${isChecked}" data-id="${item.id}" style="padding:8px; background:var(--bg-card); border-radius:4px; margin-bottom:4px; border:1px solid rgba(0,0,0,0.05);">
            <input type="checkbox" class="roadmap-checkbox" id="${item.id}" ${isChecked}>
            <div class="check-label flex-1" style="flex:1">
              <label for="${item.id}" style="font-size:0.85rem; cursor:pointer;">${item.text}</label>
            </div>
          </div>
        `;
      });
      phaseHtml += `</div>`;
    }

    phaseHtml += '</div></div>';
    return phaseHtml;
  };

  // Build the Header and Tabs
  let html = '<div class="fade-in" style="display:flex; flex-direction:column; height:100%;">';

  html += `
    <div class="page-header" style="margin-bottom:var(--space-md);">
      <h2 style="margin-bottom:12px;">자율준수무역거래자(CP) 통합 관리 시스템</h2>
      
      <!-- 탭 UI -->
      <div style="display:flex; border-bottom:2px solid var(--border-color); gap:24px;">
        <button class="dashboard-tab ${currentTab === 'cp' ? 'active' : ''}" data-tab="cp" style="background:none; border:none; padding:12px 4px; font-size:1rem; font-weight:700; cursor:pointer; color:${currentTab === 'cp' ? 'var(--accent-purple)' : 'var(--text-secondary)'}; border-bottom:${currentTab === 'cp' ? '3px solid var(--accent-purple)' : '3px solid transparent'}; margin-bottom:-2px; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded">account_balance</span> 🏢 CP 지정신청 및 유지 관리
        </button>
        <button class="dashboard-tab ${currentTab === 'export' ? 'active' : ''}" data-tab="export" style="background:none; border:none; padding:12px 4px; font-size:1rem; font-weight:700; cursor:pointer; color:${currentTab === 'export' ? 'var(--accent-blue)' : 'var(--text-secondary)'}; border-bottom:${currentTab === 'export' ? '3px solid var(--accent-blue)' : '3px solid transparent'}; margin-bottom:-2px; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded">flight_takeoff</span> 🚢 수출 거래(Export) 실무 관리
        </button>
      </div>
    </div>
  `;

  // ============================================
  // TAB 1: CP Dashboard
  // ============================================
  if (currentTab === 'cp') {
    html += `
    <!-- ── 🔔 맞춤형 To-Do 리스트 (업무 알람) ── -->
    ${(() => {
      let alarms = [];
      const today = new Date();
      if (compInfo.cpAppMode === 'initial' && compInfo.cpTargetApplyDate) {
        const tLine = new Date(compInfo.cpTargetApplyDate);
        const diffDays = Math.ceil((tLine - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30 && diffDays >= 0) {
          alarms.push({ type: 'warning', icon: 'flag', text: `[신규 지정신청] 목표일(${compInfo.cpTargetApplyDate})이 ${diffDays}일 남았습니다. 미완료된 필수 서류 작성을 서둘러주세요.`, legalText: '서류 심사 및 현장 점검 대비 사전 준비 필수' });
        }
      }
      if (!isEducationFullyPassed) {
        if (compInfo.cpAppMode === 'certified') {
          alarms.push({ type: 'danger', icon: 'school', text: '핵심 교육(Basic 등) 또는 워크숍 갱신 주기가 도래했습니다. (A-09 대장 확인 필요)', legalText: '[고시 제78조] 3년 주기 미갱신 시 CP 지정(AA등급) 정지 및 취소 처분' });
        } else if (compInfo.cpAppMode === 'initial') {
          alarms.push({ type: 'warning', icon: 'school', text: '신규 신청 시 요구되는 필수 교육(4과목) 이수가 미완료 상태입니다.', legalText: '[고시 제78조] 신청 접수 시점 기준 필수 교육 이수증 제출 필수 (미제출 시 반려)' });
        }
      }
      const c04Data = getFormData('C-04') || {};
      if (c04Data.deadline) {
        const dLine = new Date(c04Data.deadline);
        const diffDays = Math.ceil((dLine - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30 && diffDays >= 0) {
          alarms.push({ type: 'warning', icon: 'gavel', text: `감사 시정조치(C-04) 요구 기한이 ${diffDays}일 남았습니다. (목표일: ${c04Data.deadline})`, legalText: '[고시 별표20] 기한 내 미시정 시 고의적 은폐로 간주되어 실사 시 가중 처벌 리스크' });
        } else if (diffDays < 0) {
          alarms.push({ type: 'danger', icon: 'error', text: `감사 시정조치(C-04) 요구 기한이 경과되었습니다! 즉각 조치가 필요합니다.`, legalText: '[고시 별표20] 기한 내 미시정 시 고의적 은폐로 간주되어 실사 시 가중 처벌 리스크' });
        }
      }
      const g03Data = getFormData('G-03') || {};
      if (g03Data.expireDate) {
        const eLine = new Date(g03Data.expireDate);
        const diffDays = Math.ceil((eLine - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30 && diffDays >= 0) {
          alarms.push({ type: 'warning', icon: 'assignment_late', text: `[경고] 수출허가(G-03) 만료일이 ${diffDays}일 남았습니다. 연장 신청(L-01)을 준비하세요.`, legalText: '[대외무역법 제19조] 만료일 경과 후 선적 시 무허가 밀수출(7년 이하 징역 등 형사처벌)' });
        } else if (diffDays < 0) {
          alarms.push({ type: 'danger', icon: 'block', text: `[위반] 수출허가(G-03) 유효기간이 지났습니다! 해당 허가로 선적 시 밀수출(형벌)에 해당합니다.`, legalText: '[대외무역법 제19조] 만료일 경과 후 선적 시 무허가 밀수출(7년 이하 징역 등 형사처벌)' });
        }
      }
      if (compInfo.cpAppMode === 'certified' && (today.getMonth() === 0 || today.getMonth() === 1)) {
        alarms.push({ type: 'warning', icon: 'campaign', text: `[법정의무] 전년도 자율준수체제 실적보고서(K-03) 제출 기한이 도래했습니다. (1월 31일까지)`, legalText: '[고시 제83조] 실적보고서 지연 및 미제출 시 CP 자격 즉시 정지/박탈' });
      }

      if (alarms.length === 0) {
        return `<div class="card" style="margin-bottom:var(--space-lg); padding:16px; border-radius:8px; background:rgba(34,197,94,0.05); border:1px solid rgba(34,197,94,0.2);"><div style="display:flex; align-items:center; gap:8px; color:var(--accent-green); font-weight:600;"><span class="material-symbols-rounded">task_alt</span>현재 임박한 법정 기한이나 누락된 To-Do 알람이 없습니다. 완벽합니다!</div></div>`;
      } else {
        return `<div class="card" style="margin-bottom:var(--space-lg); padding:0; border-radius:8px; overflow:hidden; border:1px solid rgba(239,68,68,0.2);"><div style="background:rgba(239,68,68,0.1); padding:12px 16px; border-bottom:1px solid rgba(239,68,68,0.15); display:flex; align-items:center; gap:8px;"><span class="material-symbols-rounded" style="color:var(--accent-red);">notifications_active</span><strong style="color:var(--accent-red);">맞춤형 To-Do 리스트 (업무 알람)</strong></div><div style="padding:16px; display:flex; flex-direction:column; gap:12px;">` + alarms.map(a => `<div style="display:flex; align-items:flex-start; gap:10px; background:${a.type === 'danger' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)'}; padding:10px 14px; border-radius:6px; border-left:4px solid ${a.type === 'danger' ? 'var(--accent-red)' : 'var(--accent-amber)'};"><span class="material-symbols-rounded" style="color:${a.type === 'danger' ? 'var(--accent-red)' : 'var(--accent-amber)'}; font-size:1.2rem; margin-top:2px;">${a.icon}</span><div style="display:flex; flex-direction:column; gap:4px;"><span style="font-size:0.85rem; font-weight:700; color:var(--text-primary); line-height:1.4;">${a.text}</span><span style="font-size:0.75rem; font-weight:600; color:${a.type === 'danger' ? 'var(--accent-red)' : '#d97706'}; opacity:0.9;">${a.legalText}</span></div></div>`).join('') + `</div></div>`;
      }
    })()}

    <!-- ── 기본정보 & CP 인증(지정) 현황 관리 ── -->
    <div class="card" style="margin-bottom:var(--space-lg); padding:var(--space-md); border:1px solid rgba(0,0,0,0.08); background:var(--bg-card); border-radius:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="color:var(--primary-color);">badge</span>
            <strong style="font-size:0.95rem;">기업 기본정보 및 CP 인증(지정) 현황 관리</strong>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">구분:</label>
            <select id="comp-app-mode" class="form-input" style="padding:4px 10px; font-size:0.85rem; font-weight:600; border-color:var(--primary-color); border-radius:4px;">
              <option value="initial" ${compInfo.cpAppMode !== 'certified' ? 'selected' : ''}>🌱 신규 (최초) 지정 신청</option>
              <option value="certified" ${compInfo.cpAppMode === 'certified' ? 'selected' : ''}>🎖️ 기존 지정 기업 (갱신 / 사후관리)</option>
            </select>
          </div>
        </div>
        ${canEdit() ? `<button id="btn-save-company-info" class="btn btn-secondary" style="padding:4px 12px; font-size:0.82rem;"><span class="material-symbols-rounded" style="font-size:0.9rem">save</span> 기본정보 저장</button>` : ''}
      </div>

      <div id="mode-notice-banner" style="margin-bottom:12px; padding:10px 14px; border-radius:6px; font-size:0.83rem; line-height:1.5; background:${compInfo.cpAppMode === 'certified' ? 'rgba(34,197,94,0.08)' : 'rgba(59,130,246,0.08)'}; color:${compInfo.cpAppMode === 'certified' ? 'var(--accent-green)' : 'var(--accent-blue)'}; border:1px solid ${compInfo.cpAppMode === 'certified' ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'};">
        ${compInfo.cpAppMode === 'certified' 
          ? '🎖️ <strong>기존 CP 인증 기업 상태</strong>: 기 부여된 CP 지정번호와 인증일자를 바탕으로 정부 정기보고(K-03, K-04), 3년 내 워크숍 3회 참석, 2년 주기 감사 등 <strong>모든 법정 사후관리 서식이 100% 필수 활성화</strong>됩니다.'
          : '🌱 <strong>최초(신규) 지정신청 상태</strong>: 신규 신청 단계로, 정부 정기보고(K-03, K-04) 및 워크숍 3회 요건이 <strong>법적 면제(N/A)</strong> 처리됩니다. 그 외 사내 교육/감사/출하통제 서류(C-00~06, G-01~05, H-01, I-01 등)는 <strong>과거 수출건 시나리오 모의 작성을 위해 모두 활성화</strong>되어 있습니다.'
        }
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:12px;">
        <div><label style="display:block; font-size:0.75rem; color:var(--text-secondary); margin-bottom:4px;">회사명 (상호)</label><input type="text" id="comp-name" class="form-input" style="padding:6px 10px; font-size:0.85rem;" value="${compInfo.name || ''}" placeholder="(주)팝콘사" /></div>
        <div><label style="display:block; font-size:0.75rem; color:var(--text-secondary); margin-bottom:4px;">대표자</label><input type="text" id="comp-ceo" class="form-input" style="padding:6px 10px; font-size:0.85rem;" value="${compInfo.ceo || ''}" placeholder="대표이사" /></div>
        <div><label style="display:block; font-size:0.75rem; color:var(--text-secondary); margin-bottom:4px;">사업자등록번호</label><input type="text" id="comp-reg-num" class="form-input" style="padding:6px 10px; font-size:0.85rem;" value="${compInfo.registrationNumber || ''}" placeholder="123-86-00000" /></div>
        <div id="field-target-date-box" style="${compInfo.cpAppMode === 'certified' ? 'display:none;' : ''}"><label style="display:block; font-size:0.75rem; color:var(--accent-blue); font-weight:600; margin-bottom:4px;">📅 지정신청 접수(목표)일자</label><input type="date" id="comp-target-date" class="form-input" style="padding:6px 10px; font-size:0.85rem; border-color:var(--accent-blue);" value="${compInfo.cpTargetApplyDate || '2026-03-31'}" /></div>
        <div id="field-certified-date-box" style="${compInfo.cpAppMode === 'certified' ? '' : 'display:none;'}"><label style="display:block; font-size:0.75rem; color:var(--accent-green); font-weight:600; margin-bottom:4px;">📅 CP 최초 인증(지정)일자</label><input type="date" id="comp-cp-date" class="form-input" style="padding:6px 10px; font-size:0.85rem; border-color:var(--accent-green);" value="${compInfo.cpCertifiedDate || ''}" /></div>
        <div id="field-certified-num-box" style="${compInfo.cpAppMode === 'certified' ? '' : 'display:none;'}"><label style="display:block; font-size:0.75rem; color:var(--accent-green); font-weight:600; margin-bottom:4px;">🎖️ CP 지정(인증)번호</label><input type="text" id="comp-cp-num" class="form-input" style="padding:6px 10px; font-size:0.85rem; border-color:var(--accent-green);" value="${compInfo.cpCertifiedNumber || ''}" placeholder="CP-2025-AA-0192" /></div>
        <div id="field-initial-status-box" style="${compInfo.cpAppMode === 'certified' ? 'display:none;' : ''}"><label style="display:block; font-size:0.75rem; color:var(--text-tertiary); margin-bottom:4px;">CP 지정번호 상태</label><input type="text" class="form-input" style="padding:6px 10px; font-size:0.85rem; background:rgba(0,0,0,0.03); color:var(--text-tertiary);" value="신규 심사 진행중 (미발급)" readonly /></div>
      </div>
    </div>

    <!-- ── CP 교육이수 현황 위젯 ── -->
    <div class="card" style="margin-bottom:var(--space-xl); padding:var(--space-md); border-left:4px solid ${isEducationFullyPassed ? 'var(--accent-green)' : 'var(--accent-amber)'}; background:var(--bg-card); border-radius:6px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:${isEducationFullyPassed ? 'var(--accent-green)' : 'var(--accent-amber)'}">${isEducationFullyPassed ? 'school' : 'warning'}</span>
          <strong style="font-size:0.92rem;">CP 유지/지정을 위한 팀 내 교육이수 충족 현황 (A-09 대장 연동)</strong>
        </div>
        <button class="btn btn-secondary" id="btn-goto-a09" style="padding:4px 10px; font-size:0.8rem;">A-09 대장 열기 ↗</button>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
        ${coreCourses.map(c => {
          const isPassed = a09Courses.some(r => r.courseName === c);
          return `<span style="display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:4px; font-size:0.8rem; background:${isPassed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; color:${isPassed ? 'var(--accent-green)' : 'var(--accent-red)'}; border:1px solid ${isPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};">${isPassed ? '✓' : '✕'} ${c}</span>`;
        }).join('')}
        ${isInitialApp ? `<span style="display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:4px; font-size:0.8rem; background:rgba(0,0,0,0.03); color:var(--text-tertiary); border:1px dashed rgba(0,0,0,0.15);">⚪ 워크숍 (최초 면제)</span>` : `<span style="display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:4px; font-size:0.8rem; background:${isWorkshopPassed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; color:${isWorkshopPassed ? 'var(--accent-green)' : 'var(--accent-red)'}; border:1px solid ${isWorkshopPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};">${isWorkshopPassed ? '✓' : '✕'} 워크숍 3년내 (${workshopCount}/3회)</span>`}
        ${isInitialApp ? '' : `<span style="display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:4px; font-size:0.8rem; background:${isCeoPassed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; color:${isCeoPassed ? 'var(--accent-green)' : 'var(--accent-red)'}; border:1px solid ${isCeoPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};">${isCeoPassed ? '✓' : '✕'} CEO/임원 교육·워크숍</span>`}
        <span style="margin-left:auto; font-size:0.85rem; font-weight:600; color:${isEducationFullyPassed ? 'var(--accent-green)' : 'var(--accent-amber)'};">${isEducationFullyPassed ? `🌟 ${isInitialApp ? '신규신청 (4/4)' : '3년 갱신'} 요건 100% 충족 (AA등급 적격)` : `⚠️ 보완 필요 (필수과정 ${corePassed.length}/4${isInitialApp ? '' : `, 워크숍 ${workshopCount}/3회`})`}</span>
      </div>
    </div>

    <!-- ── Stats Grid ── -->
    <div class="grid-4" style="margin-bottom:var(--space-xl)">
      <div class="stat-card">
        <div class="stat-value">${progressPercent}%</div>
        <div class="stat-label">시스템 서식 완성률 (면제/N/A 반영)</div>
        <div class="progress-bar" style="margin-top:var(--space-sm)"><div class="progress-fill" style="width:${progressPercent}%"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${doneForms} <span style="font-size:0.95rem;opacity:.7">/ ${requiredForms}종</span></div>
        <div class="stat-label">필수 작성 서식 (면제: ${naForms}종 / 총 ${totalForms}종)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="font-size:1.6rem;background:linear-gradient(135deg,#a78bfa,#6385ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AA 등급</div>
        <div class="stat-label">목표 지정 등급</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="font-size:1.6rem;color:var(--accent-cyan)">유형 2</div>
        <div class="stat-label">적용 심사 유형</div>
      </div>
    </div>

    <div class="roadmap-callout" style="background: rgba(167, 139, 250, 0.08); border-left: 4px solid var(--accent-purple); padding: var(--space-md); border-radius: 4px; margin-bottom: var(--space-xl);">
      <div style="display:flex; gap:12px; align-items:center;">
        <span class="material-symbols-rounded" style="color:var(--accent-purple);">tips_and_updates</span>
        <div>
          <h4 style="margin:0 0 4px 0; color:var(--accent-purple);">CP 인프라 점검 (Track 1)</h4>
          <p style="margin:0; font-size:0.9rem; color:var(--text-secondary);">아래 단계별 서식을 작성하고, 서식 작성이 완료되면 실무 진행 점검표에 체크하여 진도를 관리하세요.</p>
          <p style="margin:6px 0 0; font-size:0.78rem; color:var(--text-tertiary);">💡 아래 목록은 "지금 무엇부터 해야 하는지" 순서대로 안내하는 작업 화면입니다. 특정 서식을 바로 찾아서 열고 싶을 때는 왼쪽 사이드바의 목차를 이용하세요 — 같은 서식을 두 곳에서 열 수 있을 뿐, 서로 다른 서식이 아닙니다.</p>
        </div>
      </div>
    </div>
    `;

    const cpPhases = phases.filter(p => p.track === 'CP');
    if (cpPhases.length > 0) {
      cpPhases.forEach(phase => { html += renderDashboardPhase(phase, false); });
    }
  }

  // ============================================
  // TAB 2: Export Management Dashboard (Split View)
  // ============================================
  if (currentTab === 'export') {
    const products = getProducts();
    const txs = getTransactions();
    const activeTxId = getSelectedTransactionId();
    let validTxId = activeTxId;
    if (validTxId && !txs.find(t => t.id === validTxId)) {
      validTxId = null;
    }

    html += `
    <div style="display:flex; gap:24px; margin-top:24px; min-height:600px; height:calc(100vh - 160px);">
      <!-- Left: Notion style Tree Explorer -->
      <div style="width:300px; flex-shrink:0; background:var(--bg-card); border-right:1px solid var(--border-color); padding:16px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); overflow-y:auto; display:flex; flex-direction:column;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <strong style="font-size:0.95rem; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="font-size:18px;">account_tree</span> 탐색기 (Explorer)
          </strong>
          <div style="display:flex; gap:4px;">
            ${import.meta.env.PROD ? '' : `
            <button id="btn-load-mock" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem; background:var(--accent-purple); color:white; border:none;" title="PopcornSAR 데이터 임포트">
              <span class="material-symbols-rounded" style="font-size:14px;">download</span> 목업 로드
            </button>
            <button id="btn-rollback-mock" class="btn btn-ghost" style="padding:4px 8px; font-size:0.75rem; color:var(--accent-red);" title="이전 데이터로 롤백" style="display:${localStorage.getItem('cp_backup_state') ? 'inline-block' : 'none'};">
              <span class="material-symbols-rounded" style="font-size:14px;">undo</span> 롤백
            </button>
            `}
            <button id="btn-add-product" class="btn btn-ghost" style="padding:4px; font-size:0.8rem; color:var(--accent-blue);" title="새 제품 추가">
              <span class="material-symbols-rounded" style="font-size:18px;">add</span>
            </button>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${products.length === 0 ? '<div style="color:var(--text-tertiary); font-size:0.85rem; padding:8px;">등록된 제품이 없습니다.</div>' : ''}
          ${products.map(p => {
            const pTxs = txs.filter(t => t.prodId === p.id);
            const isProductActive = pTxs.some(t => t.id === validTxId);
            return `
            <div>
              <div class="tree-item-prod" style="display:flex; justify-content:space-between; align-items:center; padding:6px 8px; border-radius:4px; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; background:${isProductActive ? 'rgba(0,0,0,0.03)' : 'transparent'};">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span class="material-symbols-rounded" style="font-size:16px; color:#d97706;">folder_open</span>
                  ${p.name}
                </div>
                <div style="display:flex; gap:2px;">
                  <button class="btn-edit-product-sm btn btn-ghost" data-id="${p.id}" style="padding:2px; color:var(--text-tertiary);" title="제품 수정"><span class="material-symbols-rounded" style="font-size:14px;">edit</span></button>
                  <button class="btn-add-tx-sm btn btn-ghost" data-prod-id="${p.id}" style="padding:2px; color:var(--accent-blue);" title="새 거래 추가"><span class="material-symbols-rounded" style="font-size:14px;">add</span></button>
                </div>
              </div>
              <div style="padding-left:22px; margin-top:4px; display:flex; flex-direction:column; gap:2px;">
                ${pTxs.length === 0 ? '<div style="font-size:0.8rem; color:var(--text-tertiary); padding:4px;">거래 내역 없음</div>' : ''}
                ${pTxs.map(t => {
                  const isActive = t.id === validTxId;
                  const txDoneForms = Object.keys(formDefinitions).filter(id => id.startsWith(t.id + '_') && getFormStatus(id) === 'done').length;
                  // Just a rough estimate for progress since forms are generated dynamically
                  return `
                  <div class="tree-item-tx" data-tx-id="${t.id}" style="display:flex; justify-content:space-between; align-items:center; padding:4px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer; background:${isActive ? 'rgba(59,130,246,0.1)' : 'transparent'}; color:${isActive ? 'var(--accent-blue)' : 'var(--text-secondary)'}; font-weight:${isActive ? '600' : '400'}; border-left:2px solid ${isActive ? 'var(--accent-blue)' : 'transparent'};">
                    <div style="display:flex; align-items:center; gap:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                      <span class="material-symbols-rounded" style="font-size:14px;">article</span>
                      ${t.name}
                    </div>
                  </div>
                  `;
                }).join('')}
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Right: Document Workspace -->
      <div style="flex:1; background:var(--bg-card); border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); display:flex; flex-direction:column; overflow:hidden; border:1px solid var(--border-color);">
        ${validTxId ? (() => {
          const activeTx = txs.find(t => t.id === validTxId);
          const parentProd = products.find(p => p.id === activeTx.prodId);
          return `
            <div style="padding:20px; border-bottom:1px solid var(--border-color); background:rgba(59,130,246,0.03);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <div style="font-size:0.8rem; color:var(--text-tertiary); margin-bottom:4px; display:flex; align-items:center; gap:4px;">
                    <span class="material-symbols-rounded" style="font-size:14px;">category</span> ${parentProd?.name || ''}
                  </div>
                  <h3 style="margin:0; font-size:1.4rem; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                    ${activeTx.name}
                    ${activeTx.isLocked ? '<span class="status-badge done" style="font-size:0.75rem;">보관완료 (수정불가)</span>' : ''}
                  </h3>
                  <div style="display:flex; gap:16px; margin-top:12px; font-size:0.85rem; color:var(--text-secondary);">
                    <div><strong style="color:var(--text-primary);">바이어:</strong> ${activeTx.buyer}</div>
                    <div><strong style="color:var(--text-primary);">국가:</strong> ${activeTx.country}</div>
                    <div><strong style="color:var(--text-primary);">수출예정일:</strong> ${activeTx.exportDate}</div>
                  </div>
                </div>
                <div style="display:flex; gap:8px;">

                  <button id="btn-request-screening" data-id="${validTxId}" class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem; background:var(--accent-purple); color:white; border:none;" title="영업부서에서 CP담당자에게 스크리닝 심사를 요청합니다.">
                    <span class="material-symbols-rounded" style="font-size:14px; vertical-align: middle;">send</span> 스크리닝 심사 요청하기
                  </button>
                  <button id="btn-edit-tx" data-id="${validTxId}" class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;">정보 수정</button>
                  ${activeTx.isLocked && canUnlock() ? `
                  <button id="btn-unlock-tx" data-id="${validTxId}" class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem; color:var(--accent-amber); border-color:var(--accent-amber);" title="과거 데이터 입력 중 실수로 보관(잠금) 처리된 경우 등, 사유를 남기고 잠금을 해제합니다.">
                    <span class="material-symbols-rounded" style="font-size:14px; vertical-align:-2px;">lock_open</span> 잠금 해제 (관리자)
                  </button>` : ''}
                  <button id="btn-delete-tx" data-id="${validTxId}" class="btn btn-ghost" style="padding:6px 12px; font-size:0.8rem; color:${activeTx.isLocked ? 'var(--text-tertiary)' : 'var(--accent-red)'};" ${activeTx.isLocked ? 'disabled title="보관 완료된 거래는 삭제할 수 없습니다. 먼저 잠금을 해제하세요."' : ''}>${activeTx.isLocked ? '🔒 삭제불가' : '거래 삭제'}</button>
                </div>
              </div>
            </div>
            
            <div style="flex:1; overflow-y:auto; padding:20px;">
              <h4 style="margin-top:0; margin-bottom:16px; font-size:1rem; color:var(--text-primary); border-bottom:2px solid var(--border-default); padding-bottom:8px;">무역 거래 통제 실무 (Track 2) 서류 작성</h4>
              ${(() => {
                let tradeHtml = '';
                const tradePhases = phases.filter(p => p.track === 'TRADE');
                tradePhases.forEach(phase => { tradeHtml += renderDashboardPhase(phase, true); });
                return tradeHtml;
              })()}
            </div>
          `;
        })() : `
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-tertiary);">
            <span class="material-symbols-rounded" style="font-size:4rem; margin-bottom:16px; color:var(--border-color);">arrow_back</span>
            <h3 style="margin:0 0 8px 0; color:var(--text-secondary);">수출 거래를 선택해주세요</h3>
            <p style="margin:0; font-size:0.9rem;">좌측 탐색기에서 제품 하위의 거래를 클릭하면 해당 건의 서류 워크스페이스가 열립니다.</p>
          </div>
        `}
      </div>
    </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;

  // ============================================
  // Event Bindings
  // ============================================

  // Tab switching
  container.querySelectorAll('.dashboard-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      currentTab = tab;
      localStorage.setItem('cp_dashboard_tab', tab);
      renderDashboard(container, onSelectForm);
    });
  });

  // Tree Item clicking (Export Tx)
  container.querySelectorAll('.tree-item-tx').forEach(el => {
    el.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.txId;
      await setSelectedTransactionId(txId);
      window.dispatchEvent(new CustomEvent('form-status-changed')); // Sync sidebar
      renderDashboard(container, onSelectForm);
    });
  });

  // Form list clicking
  container.querySelectorAll('.form-list-item').forEach(el => {
    el.addEventListener('click', () => {
      const formId = el.dataset.formId;

      if (onSelectForm) onSelectForm(formId);
    });
  });

  // Checklist events
  container.querySelectorAll('.roadmap-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.id;
      let saved = JSON.parse(localStorage.getItem('cp_roadmap_status')) || {};
      saved[id] = e.target.checked;
      localStorage.setItem('cp_roadmap_status', JSON.stringify(saved));
      
      const itemDiv = e.target.closest('.checklist-item');
      if (e.target.checked) itemDiv.classList.add('checked');
      else itemDiv.classList.remove('checked');
    });
  });

  // Company Info Save
  const selectMode = container.querySelector('#comp-app-mode');
  if (selectMode) {
    selectMode.addEventListener('change', async (e) => {
      const newMode = e.target.value;
      const name = container.querySelector('#comp-name')?.value || '';
      const ceo = container.querySelector('#comp-ceo')?.value || '';
      const registrationNumber = container.querySelector('#comp-reg-num')?.value || '';
      const cpTargetApplyDate = container.querySelector('#comp-target-date')?.value || '';
      const cpCertifiedDate = container.querySelector('#comp-cp-date')?.value || '';
      const cpCertifiedNumber = container.querySelector('#comp-cp-num')?.value || '';

      await setCompanyInfo({ cpAppMode: newMode, name, ceo, registrationNumber, cpTargetApplyDate, cpCertifiedDate, cpCertifiedNumber });
      await evaluateCpAppModeLogic(newMode);
      window.dispatchEvent(new CustomEvent('form-status-changed'));
      renderDashboard(container, onSelectForm);
    });
  }

  // Product actions
  const btnAddProduct = container.querySelector('#btn-add-product');
  if (btnAddProduct) {
    btnAddProduct.addEventListener('click', async () => {
      const formData = await customFormDialog(
        '새 제품 등록',
        [{ key: 'name', label: '제품명(모델명)', placeholder: '예: 반도체 검사장비', required: true }, { key: 'hsCode', label: '통제번호', required: false }],
        { confirmText: '제품 추가', icon: 'category' }
      );
      if (formData && formData.name) {
        await addProduct({ name: formData.name.trim(), hsCode: formData.hsCode?.trim() || '' });
        renderDashboard(container, onSelectForm);
      }
    });
  }

  container.querySelectorAll('.btn-edit-product-sm').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const pId = e.currentTarget.dataset.id;
      const prod = getProducts().find(p => p.id === pId);
      if (!prod) return;
      const formData = await customFormDialog(
        '제품 수정',
        [{ key: 'name', label: '제품명(모델명)', default: prod.name, required: true }, { key: 'hsCode', label: '통제번호', default: prod.hsCode, required: false }],
        { confirmText: '수정 완료', icon: 'edit' }
      );
      if (formData && formData.name) {
        await updateProduct(pId, { name: formData.name.trim(), hsCode: formData.hsCode?.trim() || '' });
        renderDashboard(container, onSelectForm);
      }
    });
  });

  // Transaction actions
  container.querySelectorAll('.btn-add-tx-sm').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const prodId = e.currentTarget.dataset.prodId;
      const formData = await customFormDialog(
        '새 수출 거래 생성',
        [{ key: 'name', label: '수출 거래명', required: true }, { key: 'buyer', label: '바이어', required: true }, { key: 'country', label: '수출국가', required: true }, { key: 'exportDate', label: '수출일', type: 'date', default: new Date().toISOString().slice(0, 10), required: true }],
        { confirmText: '거래 추가', icon: 'local_shipping' }
      );
      if (formData && formData.name) {
        const newTx = await addTransaction(prodId, formData.name.trim(), formData.exportDate, formData.country.trim(), formData.buyer.trim());
        await setSelectedTransactionId(newTx.id);
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
      }
    });
  });

  const btnRequestScreening = container.querySelector('#btn-request-screening');
  if (btnRequestScreening) {
    btnRequestScreening.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.id;
      const tx = getTransactions().find(t => t.id === txId);
      if (!tx) return;
      const confirmed = await customConfirm('스크리닝 심사 요청', `[${tx.name}] 건에 대해 CP 관리자에게 사전 스크리닝 심사를 요청하시겠습니까?\n요청 후에는 정보가 CP 부서로 이관됩니다.`, { danger: false });
      if (confirmed) {
        // 영업사원이 CP 부서로 상태를 이관함을 나타내는 데이터 추가
        // 실제로는 상태를 변경하여 컴플라이언스 룰 엔진에 반영하거나 백엔드에 전송해야 함.
        alert(`요청 완료: ${tx.name}\\nCP 부서의 통합 진단 워크플로우에 결재 대기 건으로 등록되었습니다.`);
      }
    });
  }



  const btnEditTx = container.querySelector('#btn-edit-tx');
  if (btnEditTx) {
    btnEditTx.addEventListener('click', async (e) => {
      const txId = e.target.dataset.id;
      const tx = getTransactions().find(t => t.id === txId);
      if (!tx) return;
      const formData = await customFormDialog(
        '거래 수정',
        [{ key: 'name', label: '거래명', default: tx.name, required: true }, { key: 'buyer', label: '바이어', default: tx.buyer, required: true }, { key: 'country', label: '국가', default: tx.country, required: true }, { key: 'exportDate', label: '수출일', type: 'date', default: tx.exportDate, required: true }],
        { confirmText: '수정 완료', icon: 'edit' }
      );
      if (formData && formData.name) {
        await updateTransaction(txId, { name: formData.name.trim(), buyer: formData.buyer.trim(), country: formData.country.trim(), exportDate: formData.exportDate });
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
      }
    });
  }

  const btnUnlockTx = container.querySelector('#btn-unlock-tx');
  if (btnUnlockTx) {
    btnUnlockTx.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.id;
      const tx = getTransactions().find(t => t.id === txId);
      if (!tx) return;
      const confirmed = await customConfirm(
        '잠금 해제',
        `[${tx.name}] 거래의 잠금을 해제하시겠습니까?\n해제하면 서류 수정이 다시 가능해집니다. 이 조작은 기록으로 남습니다.`,
        { danger: true }
      );
      if (!confirmed) return;
      const reason = await customPrompt('해제 사유', '감사 기록에 남습니다. 예: "과거 데이터 입력 중 오기재 수정"', '', '해제 사유를 입력하세요');
      if (reason === null) return; // 취소
      const ok = await unlockTransaction(txId, reason);
      if (ok) {
        await customAlert('잠금 해제 완료', '거래 잠금이 해제되었습니다. 서류를 다시 수정할 수 있습니다.', 'success');
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
      }
    });
  }

  const btnDeleteTx = container.querySelector('#btn-delete-tx');
  if (btnDeleteTx) {
    btnDeleteTx.addEventListener('click', async (e) => {
      const txId = e.target.dataset.id;
      const tx = getTransactions().find(t => t.id === txId);
      if (!tx) return;
      const confirmed = await customConfirm('거래 삭제 확인', `[${tx.name}] 거래를 삭제하시겠습니까?`, { danger: true });
      if (confirmed) {
        await deleteTransaction(txId);
        await setSelectedTransactionId(null);
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
      }
    });
  }

  const btnSaveCompany = container.querySelector('#btn-save-company-info');
  if (btnSaveCompany) {
    btnSaveCompany.addEventListener('click', async () => {
      const cpAppMode = container.querySelector('#comp-app-mode')?.value || 'initial';
      const name = container.querySelector('#comp-name')?.value || '';
      const ceo = container.querySelector('#comp-ceo')?.value || '';
      const registrationNumber = container.querySelector('#comp-reg-num')?.value || '';
      const cpTargetApplyDate = container.querySelector('#comp-target-date')?.value || '';
      const cpCertifiedDate = container.querySelector('#comp-cp-date')?.value || '';
      const cpCertifiedNumber = container.querySelector('#comp-cp-num')?.value || '';
      await setCompanyInfo({ cpAppMode, name, ceo, registrationNumber, cpTargetApplyDate, cpCertifiedDate, cpCertifiedNumber });
      customAlert('저장 완료', '기본정보가 저장되었습니다.', 'success');
    });
  }

  // Mock Data Load / Rollback Logic
  const btnLoadMock = container.querySelector('#btn-load-mock');
  if (btnLoadMock) {
    btnLoadMock.addEventListener('click', async () => {
      const confirmed = await customConfirm('PopcornSAR 목업 데이터 임포트', 'PopcornSAR의 데이터를 가상으로 불러옵니다.\\n기존 데이터는 안전하게 백업되며, 언제든 [롤백] 버튼으로 되돌릴 수 있습니다.', { confirmText: '임포트' });
      if (confirmed) {
        await applyMockData(popcornMockData);
        
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
        customAlert('임포트 완료', '목업 데이터가 임포트되었습니다.', 'success');
      }
    });
  }

  const btnRollbackMock = container.querySelector('#btn-rollback-mock');
  if (btnRollbackMock) {
    btnRollbackMock.addEventListener('click', async () => {
      const backupStr = localStorage.getItem('cp_backup_state');
      if (!backupStr) return;
      const confirmed = await customConfirm('데이터 롤백', '목업 데이터를 지우고 임포트 이전 상태의 데이터로 완전히 되돌리시겠습니까?\\n이전 데이터는 100% 손상 없이 복구됩니다.', { danger: true, confirmText: '롤백' });
      if (confirmed) {
        await rollbackMockData();
        
        window.dispatchEvent(new CustomEvent('form-status-changed'));
        renderDashboard(container, onSelectForm);
        customAlert('롤백 완료', '이전 데이터로 롤백되었습니다.', 'success');
      }
    });
  }
}
