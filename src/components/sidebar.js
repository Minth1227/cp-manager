// ============================================
// Sidebar Navigation Component
// ============================================

import { phases } from '../data/processFlow.js';
import { formDefinitions } from '../forms/definitions.js';
import { getFormStatus, getCurrentUser } from '../store.js';
import { customAlert, customConfirm } from '../utils/dialog.js';

const STATUS_LABELS = { todo: '미착수', progress: '작성중', review: '검토중', done: '완료', na: '해당없음' };

export function renderSidebar(container, currentView, activeFormId, onNavigate) {
  // ── Capture currently open folders ──
  const openFolders = new Set();
  const existingFolders = container.querySelectorAll('.tree-folder');
  if (existingFolders.length > 0) {
    existingFolders.forEach(folder => {
      if (folder.classList.contains('open')) {
        const titleEl = folder.querySelector('.folder-title');
        if (titleEl) openFolders.add(titleEl.textContent.trim());
      }
    });
  }

  let routeResult = null;
  try {
    routeResult = JSON.parse(localStorage.getItem('cp_route_result'));
  } catch(e) {}

  let html = '';

  // ── Dashboard link ──
  html += `
    <div class="nav-section">
      <div class="nav-item${currentView === 'dashboard' ? ' active' : ''}" data-nav="dashboard">
        <span class="material-symbols-rounded">dashboard</span>
        <span>통합 대시보드</span>
      </div>
      <div class="nav-item${currentView === 'myPage' ? ' active' : ''}" data-nav="myPage">
        <span class="material-symbols-rounded">person</span>
        <span>마이페이지</span>
      </div>
      <div class="nav-item${currentView === 'newDocument' ? ' active' : ''}" data-nav="newDocument" style="background:rgba(20,184,166,0.08); font-weight:600;">
        <span class="material-symbols-rounded" style="color:var(--accent-teal);">note_add</span>
        <span style="color:var(--accent-teal);">새 문서 만들기</span>
      </div>
      ${(getCurrentUser()?.role === 'ADMIN' || getCurrentUser()?.role === 'Master') ? `
      <div class="nav-item${currentView === 'admin' ? ' active' : ''}" data-nav="admin">
        <span class="material-symbols-rounded">manage_accounts</span>
        <span style="color:var(--accent-purple); font-weight:600;">CP 마스터 대시보드</span>
      </div>
      ` : ''}
    </div>
    

    <div class="nav-section">
      <div class="nav-section-title">
        <span class="material-symbols-rounded" style="font-size:14px">menu_book</span>
        사내 규정 및 프로세스
      </div>
      <div class="nav-item${currentView === 'regulation' ? ' active' : ''}" data-nav="regulation">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--text-tertiary)">REG</span>
        <span style="flex:1;font-size:0.82rem">자율수출관리규정 (사내 규정)</span>
      </div>
      <div class="nav-item${currentView === 'legalFlow' ? ' active' : ''}" data-nav="legalFlow">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--text-tertiary)">MAP</span>
        <span style="flex:1;font-size:0.82rem">고시 서류 매핑도</span>
      </div>
      <div class="nav-item${currentView === 'matrix' ? ' active' : ''}" data-nav="matrix">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-purple)">STD</span>
        <span style="flex:1;font-size:0.82rem">[별표 20] AA 심사기준 매트릭스</span>
      </div>
      <div class="nav-item${currentView === 'stepFlow' ? ' active' : ''}" data-nav="stepFlow">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-blue)">CP</span>
        <span style="flex:1;font-size:0.82rem">CP 5단계 매핑도 (New)</span>
      </div>
      <div class="nav-item${currentView === 'exportCaseFlow' ? ' active' : ''}" data-nav="exportCaseFlow">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-red)">EXP</span>
        <span style="flex:1;font-size:0.82rem;font-weight:600;">수출 거래(Export Case) 프로세스</span>
      </div>
      <div class="nav-item${currentView === 'exportScreeningFlow' ? ' active' : ''}" data-nav="exportScreeningFlow">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-teal)">SCR</span>
        <span style="flex:1;font-size:0.82rem;font-weight:600;">수출 판정·필터링 플로우 (New)</span>
      </div>
      <div class="nav-item${currentView === 'flowchart' ? ' active' : ''}" data-nav="flowchart">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--text-tertiary)">REF</span>
        <span style="flex:1;font-size:0.82rem">업무 플로우차트 (기존)</span>
      </div>
    </div>`;

  // ── Phase / Form links ──
  const syncMap = {
    'A-01': '🔗 A-02 연동',
    'A-06': '🔗 A-07 연동',
    'Z-01': '🔗 F-01 등 파생',
    'F-01': '🔗 Z-01 연동',
    'G-01': '🔗 Z-01 연동'
  };

  const renderTreePhase = (phase) => {
    let stepsHtml = '';
    const phaseTitle = `${phase.number}. ${phase.title.split(' (')[0]}`;
    // Phase is open if it was explicitly open before, or if no existing folders were found (default open)
    const isPhaseOpen = (existingFolders.length === 0) || openFolders.has(phaseTitle);

    phase.steps.forEach(step => {
      let formsHtml = '';
      let containsActiveForm = false;
      const allGlobal = step.forms.every(fId => /^[A-E]-/.test(fId));

      step.forms.forEach(formId => {
        if (formId === activeFormId) containsActiveForm = true;
        const def = formDefinitions[formId];
        if (!def) return;
        const st = getFormStatus(formId);
        const isActive = activeFormId === formId;
        const isNaClass = st === 'na' ? ' is-na' : '';
        const syncBadge = syncMap[formId] ? `<span class="nav-sync-badge">${syncMap[formId]}</span>` : '';
        const isGlobal = /^[A-E]-/.test(formId);
        const globalTag = (!allGlobal && isGlobal) ? `<span style="font-size:0.65rem; background:var(--bg-tertiary); border-radius:4px; padding:2px 4px; margin-left:6px; color:var(--text-tertiary); border: 1px solid var(--border-color);">공통</span>` : '';

        const isArchiveRequired = routeResult && routeResult.requiredForArchive && routeResult.requiredForArchive.includes(formId);
        const lockTag = isArchiveRequired ? `<span style="font-size:0.65rem; background:rgba(239,68,68,0.1); border-radius:4px; padding:2px 4px; margin-left:6px; color:var(--accent-red); border: 1px solid var(--accent-red); font-weight:bold;">🔒 내부보관</span>` : '';

        // [수정] "해당없음" 배지가 왜 그런지 설명이 없어 "판정 전 미정"인지 "명백히 비해당"인지 헷갈린다는
        // UX 점검 결과 반영 — Z-01 사전진단 라우팅 결과(routeResult.routeName)를 툴팁으로 노출해 근거를 밝힘.
        const naTooltip = st === 'na'
          ? (routeResult?.routeName ? `Z-01 사전진단 결과 "${routeResult.routeName}" 경로로 판정되어 본 서식은 해당하지 않습니다.` : '현재 거래 설정상 해당하지 않는 서식입니다. (Z-01 사전진단표를 먼저 작성하면 판정 근거가 표시됩니다)')
          : '';

        formsHtml += `
          <div class="tree-file nav-item${isActive ? ' active' : ''}${isNaClass}" data-nav="form" data-form-id="${formId}" title="${def.title}">
            <span class="material-symbols-rounded file-icon">description</span>
            <span class="file-code" style="color:${isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)'}">${def.id}</span>
            <span class="file-title">${def.title} ${globalTag} ${lockTag}</span>
            ${syncBadge}
            <span class="nav-badge ${st}" style="margin-left:auto" ${naTooltip ? `title="${naTooltip}"` : ''}>${STATUS_LABELS[st]}</span>
          </div>`;
      });

      // [수정] 문서그룹(step)이 기본적으로 접혀있어 로그인 직후 실제 서식이 하나도 안 보이던 문제 —
      // phase(대분류)와 동일하게 "처음 렌더"일 때는 기본적으로 펼쳐두고, 이후 사용자가 접은 상태는 그대로 유지.
      const isStepOpen = (existingFolders.length === 0) || openFolders.has(step.title) || containsActiveForm;
      const stepGlobalTag = allGlobal ? `<span style="font-size:0.65rem; background:var(--bg-tertiary); border-radius:4px; padding:2px 4px; margin-left:6px; color:var(--text-tertiary); border: 1px solid var(--border-color); font-weight:normal; letter-spacing:0;">공통</span>` : '';
      // [수정] 그룹명에 서식 코드(A/F/G...)가 안 보여 "A-01~05가 어디 있는지" 찾기 어렵다는 문제 —
      // 해당 문서그룹에 속한 서식들의 코드 접두어를 라벨 앞에 표시.
      const stepCodePrefix = [...new Set(step.forms.map(f => f.split('-')[0]))].join('·');

      stepsHtml += `
        <div class="tree-folder step-folder${isStepOpen ? ' open' : ''}">
          <div class="tree-folder-header" onclick="this.parentElement.classList.toggle('open')">
            <span class="material-symbols-rounded arrow-icon">arrow_right</span>
            <span style="color:var(--text-tertiary); font-weight:700; margin-right:4px;">[${stepCodePrefix}]</span><span class="folder-title">${step.title} ${stepGlobalTag}</span>
          </div>
          <div class="tree-folder-content">
            ${formsHtml}
          </div>
        </div>
      `;
    });

    return `
      <div class="tree-folder phase-folder${isPhaseOpen ? ' open' : ''}">
        <div class="tree-folder-header" onclick="this.parentElement.classList.toggle('open')">
          <span class="material-symbols-rounded arrow-icon">arrow_right</span>
          <span class="material-symbols-rounded folder-icon-main">folder_open</span>
          <span class="folder-title">${phaseTitle}</span>
        </div>
        <div class="tree-folder-content">
          ${stepsHtml}
        </div>
      </div>
    `;
  };

  const cpPhases = phases.filter(p => p.track === 'CP');
  if (cpPhases.length > 0) {
    html += `<div style="margin-top:16px; padding:8px 16px; font-size:0.75rem; font-weight:800; color:var(--accent-purple); border-bottom:1px solid var(--border-color); background:rgba(139,92,246,0.05);">🏛️ CP 인프라 세팅 및 심사</div>`;
    html += `<div class="tree-container">`;
    cpPhases.forEach(phase => { html += renderTreePhase(phase); });
    html += `</div>`;
  }

  const tradePhases = phases.filter(p => p.track === 'TRADE');
  if (tradePhases.length > 0) {
    html += `<div style="margin-top:16px; padding:8px 16px; font-size:0.75rem; font-weight:800; color:var(--accent-blue); border-bottom:1px solid var(--border-color); background:rgba(59,130,246,0.05);">🚢 무역 거래 통제 실무</div>`;
    html += `<div class="tree-container">`;
    tradePhases.forEach(phase => { html += renderTreePhase(phase); });
    html += `</div>`;
  }

  html += `
    <div class="nav-section">
      <div class="nav-section-title" style="color:var(--accent-red);">
        <span class="material-symbols-rounded" style="font-size:14px">folder_open</span>
        수출 거래 서류 보관함
      </div>
      <div class="nav-item${currentView === 'ongoingArchive' ? ' active' : ''}" data-nav="ongoingArchive" style="background:rgba(59,130,246,0.05);">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-blue)">ON</span>
        <span style="flex:1;font-size:0.82rem; font-weight:600; color:var(--text-primary);">진행 중인 거래 서류</span>
      </div>
      <div class="nav-item${currentView === 'legalArchive' ? ' active' : ''}" data-nav="legalArchive" style="background:rgba(239,68,68,0.05);">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-red)">ARC</span>
        <span style="flex:1;font-size:0.82rem; font-weight:600; color:var(--text-primary);">수출 서류 보관함 (법정 5년)</span>
      </div>
    </div>`;

  html += `
    <div class="nav-section">
      <div class="nav-section-title" style="color:var(--accent-purple);">
        <span class="material-symbols-rounded" style="font-size:14px">assignment_turned_in</span>
        회사 서류 서명 보관함
      </div>
      <div class="nav-item${currentView === 'signedDocs' ? ' active' : ''}" data-nav="signedDocs" style="background:rgba(139,92,246,0.05);">
        <span style="font-weight:700;font-size:0.72rem;min-width:34px;color:var(--accent-purple)">SIGN</span>
        <span style="flex:1;font-size:0.82rem; font-weight:600; color:var(--text-primary);">서명 문서함</span>
      </div>
    </div>`;

  html += `
    <div class="sidebar-footer" style="padding:16px; margin-top:auto;">
      <button id="btn-export-pdf" class="btn-ghost" style="width:100%; text-align:left; color:var(--accent-purple); font-weight:600; padding:8px 0; margin-bottom: 8px;">
        <span class="material-symbols-rounded" style="vertical-align:middle; margin-right:8px;">picture_as_pdf</span> 전체 서류 일괄 인쇄(PDF)
      </button>
      <button id="btn-logout" class="btn-ghost" style="width:100%; text-align:left; color:#9ca3af; font-weight:600; padding:8px 0;">
        <span class="material-symbols-rounded" style="vertical-align:middle; margin-right:8px;">logout</span> 시스템 로그아웃
      </button>
    </div>`;

  container.innerHTML = html;

  // ── Click bindings ──
  container.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const navType = item.dataset.nav;
      if (navType === 'dashboard') {
        if (onNavigate) onNavigate('dashboard');
      } else if (navType === 'myPage') {
        if (onNavigate) onNavigate('myPage');
      } else if (navType === 'newDocument') {
        if (onNavigate) onNavigate('newDocument');
      } else if (navType === 'admin') {
        if (onNavigate) onNavigate('admin');
      } else if (navType === 'regulation') {
        if (onNavigate) onNavigate('regulation');
      } else if (navType === 'matrix') {
        if (onNavigate) onNavigate('matrix');
      } else if (navType === 'flowchart') {
        if (onNavigate) onNavigate('flowchart');
      } else if (navType === 'stepFlow') {
        if (onNavigate) onNavigate('stepFlow');
      } else if (navType === 'legalFlow') {
        if (onNavigate) onNavigate('legalFlow');
      } else if (navType === 'exportCaseFlow') {
        if (onNavigate) onNavigate('exportCaseFlow');
      } else if (navType === 'exportScreeningFlow') {
        if (onNavigate) onNavigate('exportScreeningFlow');
      } else if (navType === 'ongoingArchive') {
        if (onNavigate) onNavigate('ongoingArchive');
      } else if (navType === 'legalArchive') {
        if (onNavigate) onNavigate('legalArchive');
      } else if (navType === 'signedDocs') {
        if (onNavigate) onNavigate('signedDocs');
      } else if (navType === 'search') {
        if (onNavigate) onNavigate('search');
      } else if (navType === 'form') {
        const clickedFormId = item.dataset.formId;

        // [Fix P2] Track 2 서식 클릭 시 txId 미선택 상태 시각적 경고
        import('../store.js').then(({ isTxForm: checkFn, getSelectedTransactionId: getTxId }) => {
          if (checkFn(clickedFormId) && !getTxId()) {
            item.style.outline = '2px solid var(--accent-amber)';
            item.style.outlineOffset = '-2px';
            item.title = '⚠️ 수출 거래를 먼저 선택해야 합니다 (대시보드)';
            setTimeout(() => {
              item.style.outline = '';
              item.style.outlineOffset = '';
            }, 2500);
          }
        });

        if (onNavigate) onNavigate('form', clickedFormId);
      }
    });
  });

  // --- Import / Export bindings ---
  const exportBtn = document.getElementById('btn-export-all');
  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      const { exportAllData } = await import('../store.js');
      exportAllData();
    });
  }

  const importBtn = document.getElementById('btn-import-all');
  const importInput = document.getElementById('import-file-input');
  
  if (importBtn && importInput) {
    importBtn.addEventListener('click', () => {
      importInput.click();
    });
    importInput.addEventListener('change', async (e) => {
      if (e.target.files.length > 0) {
        const confirmed = await customConfirm(
          '데이터 복원 경고',
          '현재 데이터베이스를 선택한 백업 파일로 덮어씁니다.\n기존 변경 사항이 교체되니 계속하시겠습니까?',
          { confirmText: '덮어쓰기 복원', danger: true }
        );
        if (!confirmed) return;
        
        const { importData } = await import('../store.js');
        try {
          await importData(e.target.files[0]);
          await customAlert('복원 완료', '백업 데이터가 성공적으로 복원되었습니다.', 'success');
          window.location.reload();
        } catch (err) {
          await customAlert('복원 실패', '복원 중 오류가 발생했습니다: ' + err.message, 'error');
        }
      }
    });
  }

  // --- Export All PDF binding ---
  const exportPdfBtn = document.getElementById('btn-export-pdf');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', async () => {
      const { generateUnifiedDocumentHTML } = await import('../forms/renderer.js');
      const { getFormData } = await import('../store.js');
      
      const html = await generateUnifiedDocumentHTML(formDefinitions, getFormData);
      
      const win = window.open('', '_blank', 'width=900,height=1200');
      win.document.write(html);
      win.document.close();
    });
  }

  // --- Logout binding ---
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { logoutUser } = await import('../store.js');
      if (logoutUser) {
        logoutUser();
      }
    });
  }
}
