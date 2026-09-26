// ============================================
// Main Application Entrypoint
// ============================================

import { renderDashboard } from './views/dashboard.js';
import { renderFormView } from './views/formView.js';
import { renderSidebar } from './components/sidebar.js';
import { exportAllData, importData, initStore, getCurrentUser, txForms, setSelectedTransactionId, isTxForm, getCompanyInfo } from './store.js';
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { evaluateCpAppModeLogic } from './logic.js';
import { renderRegulationView } from './views/regulationView.js';
import { renderAuditMatrixView } from './views/auditMatrixView.js';
import { renderFlowchartView } from './views/flowchartView.js';
import { renderLegalFlowView } from './views/legalFlowView.js';
import { renderExportCaseFlowView } from './views/exportCaseFlowView.js';
import { renderExportScreeningFlowView } from './views/exportScreeningFlowView.js';
import { renderSearchView } from './views/searchView.js';
import { renderAuthView } from './views/authView.js';
import { renderAdminView } from './views/adminView.js';
import { renderMyPageView } from './views/myPageView.js';
import { renderStepFlowView } from './views/stepFlowView.js';
import { renderSignedDocumentsView } from './views/signedDocumentsView.js';
import { renderNewDocumentView } from './views/newDocumentView.js';
import { customAlert } from './utils/dialog.js';

// Import the React wizard mounter
import './wizardMount.tsx';

// ── App State ──
let currentView = 'dashboard';
let currentFormId = null;

function initApp() {
  const sidebarNav = document.getElementById('sidebar-nav');
  const viewContainer = document.getElementById('view-container');

  // ── Core navigation function ──
  let currentSearchTab = 'catchall';
  // Track 1 전용 뷰 목록 (CP 인프라 — 거래 컨텍스트 불필요)
  const TRACK1_VIEWS = ['regulation', 'matrix', 'stepFlow', 'flowchart', 'legalFlow', 'exportScreeningFlow', 'admin', 'myPage', 'signedDocs', 'newDocument'];

  function navigate(view, formId = null, extra = null, pushHistory = true) {
    // [Fix P1] Track 전환 감지: Track 1 뷰 또는 CP 인프라 서식으로 이동 시
    // selectedTransactionId를 메모리 레벨에서 클리어해 크로스-트랙 자동완성 오염 방지
    const isGoingToTrack1View = TRACK1_VIEWS.includes(view);
    const isGoingToTrack1Form = view === 'form' && formId && !isTxForm(formId);
    if (isGoingToTrack1View || isGoingToTrack1Form) {
      // Firestore까지 null 저장은 과함 — state 메모리만 클리어 (store 내부 state 직접 접근 불가)
      // setSelectedTransactionId(null)은 Firestore도 업데이트하므로 대신 flag 방식 사용:
      // formView의 P0 가드가 txId=null 상태를 잡아주므로 실질적 보호는 충분함.
      // 단, getAutoFillValue 오염 방지를 위해 Firestore 포함 null 설정.
      setSelectedTransactionId(null);
    }

    currentView = view;
    currentFormId = formId;
    if (extra && extra.searchTab) {
      currentSearchTab = extra.searchTab;
    } else {
      currentSearchTab = 'catchall';
    }

    if (pushHistory) {
      const state = { view, formId, extra };
      const url = `?view=${view}${formId ? '&formId=' + formId : ''}`;
      window.history.pushState(state, '', url);
    }

    renderAll();
  }
  window.appRouter = { navigate };

  window.addEventListener('popstate', (event) => {
    if (event.state) {
      navigate(event.state.view, event.state.formId, event.state.extra, false);
    } else {
      navigate('dashboard', null, null, false);
    }
  });

  // ── Render everything ──
  function renderAll() {
    const user = getCurrentUser();

    // Auth Guard
    const sidebarEl = document.getElementById('sidebar');
    if (!user) {
      if (sidebarEl) sidebarEl.style.display = 'none'; // Hide entire sidebar
      renderAuthView(viewContainer, async (userData) => {
        await initStore(userData);
        // 로그인 시점의 CP 신청유형(신규/기존)에 맞춰 K-03/K-04 등 정부보고 서식의 면제(N/A) 상태를
        // 즉시 재동기화 — 지금까지는 관리자가 설정 화면에서 값을 "다시 선택"해야만 반영되던 문제 수정
        await evaluateCpAppModeLogic(getCompanyInfo().cpAppMode);
        // [버그 수정] 항상 대시보드로 이동시켜서, Slack "앱에서 원문 보기"처럼 특정 서식으로 바로
        // 여는 딥링크(?view=form&formId=A-01)로 들어왔다가 로그인만 하면 그 목적지가 사라지고
        // 대시보드로 튕기던 문제. 로그인 전 URL에서 이미 읽어둔 currentView/currentFormId로 이동한다.
        navigate(currentView, currentFormId);
      });
      return;
    }
    
    // Check missing info (for legacy Firebase Auth users)
    if ((!user.empId || !user.name) && currentView !== 'myPage') {
      currentView = 'myPage';
      currentFormId = null;
      window.history.replaceState({ view: 'myPage', formId: null, extra: null }, '', '?view=myPage');
    }

    if (sidebarEl) sidebarEl.style.display = 'flex'; // Show sidebar when authenticated

    // Sidebar
    renderSidebar(sidebarNav, currentView, currentFormId, navigate);

    // Backup / Restore button visibility based on role
    const exportBtn = document.getElementById('btn-export-all');
    const importBtn = document.getElementById('btn-import-all');
    if (exportBtn && importBtn) {
      if (user.role === 'VIEWER') {
        exportBtn.style.display = 'none';
        importBtn.style.display = 'none';
      } else {
        exportBtn.style.display = 'flex';
        importBtn.style.display = 'flex';
      }
    }

    // Main view
    if (currentView === 'form' && currentFormId) {
      renderFormView(viewContainer, currentFormId, () => navigate('dashboard'));
    } else if (currentView === 'regulation') {
      renderRegulationView(viewContainer);
    } else if (currentView === 'matrix') {
      renderAuditMatrixView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'flowchart') {
      renderFlowchartView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'stepFlow') {
      renderStepFlowView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'legalFlow') {
      renderLegalFlowView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'exportCaseFlow') {
      renderExportCaseFlowView(viewContainer);
    } else if (currentView === 'exportScreeningFlow') {
      renderExportScreeningFlowView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'search') {
      renderSearchView(viewContainer, (fId) => navigate('form', fId), currentSearchTab);
    } else if (currentView === 'ongoingArchive') {
      import('./views/archiveView.js').then(module => {
        module.renderOngoingArchiveView(viewContainer, (fId, pId) => navigate('form', fId));
      });
    } else if (currentView === 'legalArchive') {
      import('./views/archiveView.js').then(module => {
        module.renderLegalArchiveView(viewContainer, (fId, pId) => navigate('form', fId));
      });
    } else if (currentView === 'signedDocs') {
      renderSignedDocumentsView(viewContainer);
    } else if (currentView === 'newDocument') {
      renderNewDocumentView(viewContainer, (fId) => navigate('form', fId));
    } else if (currentView === 'myPage') {
      renderMyPageView(viewContainer);
    } else if (currentView === 'admin') {
      if (user.role === 'Master' || user.role === 'ADMIN') {
        renderAdminView(viewContainer);
      } else {
        customAlert('접근 불가', 'CP 마스터(최고관리자) 권한이 없습니다.', 'warning').then(() => {
          navigate('dashboard');
        });
      }
    } else {
      renderDashboard(viewContainer, (fId) => navigate('form', fId));
    }

    // Scroll main content to top on view change
    document.querySelector('.main-content').scrollTop = 0;
  }

  // ── Listen for status changes from form editors ──
  window.addEventListener('form-status-changed', () => {
    // Re-render sidebar to update badges
    renderSidebar(sidebarNav, currentView, currentFormId, navigate);
  });

  // ── Export / Import buttons ──
  const exportBtn = document.getElementById('btn-export-all');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportAllData();
      showToast('전체 데이터가 JSON으로 다운로드되었습니다.', 'success');
    });
  }

  const importBtn = document.getElementById('btn-import-all');
  const importInput = document.getElementById('import-file-input');
  if (importBtn && importInput) {
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        await importData(file);
        showToast('데이터가 복원되었습니다.', 'success');
        renderAll();
      } catch (err) {
        showToast('복원 실패: ' + err.message, 'warning');
      }
      importInput.value = '';   // reset so same file can be re-imported
    });
  }

  // ── Sidebar Resizing ──
  const resizer = document.getElementById('sidebar-resizer');
  if (resizer) {
    let isResizing = false;
    let startX, startWidth;

    resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width'), 10) || 280;
      resizer.classList.add('is-resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // Prevent text selection
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      let newWidth = startWidth + (e.clientX - startX);
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 600) newWidth = 600;
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        resizer.classList.remove('is-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  // ── Initial render (URL 파라미터 복원은 로그인 상태와 무관하게 먼저 세팅) ──
  const params = new URLSearchParams(window.location.search);
  const initView = params.get('view') || 'dashboard';
  const initFormId = params.get('formId') || null;
  currentView = initView;
  currentFormId = initFormId;
  window.history.replaceState({ view: initView, formId: initFormId, extra: null }, '', window.location.search || '?view=dashboard');

  // [수정] 새로고침마다 매번 재로그인을 요구하던 문제 — Firebase Auth는 세션을 브라우저에 유지하고 있는데도
  // 이 앱이 그 세션을 확인하지 않고 매번 로그인 폼부터 보여주고 있었음. 페이지 로드 시 1회 세션을 확인해
  // 이미 로그인된 사용자라면 로그인 폼 없이 바로 대시보드로 복원한다.
  let sessionChecked = false;
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (sessionChecked) return; // 최초 1회만 자동 복구, 이후 로그인/로그아웃은 각 화면에서 직접 처리
    sessionChecked = true;

    if (firebaseUser && !getCurrentUser()) {
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.uid) userData.uid = firebaseUser.uid;
          if (userData.role !== 'PENDING') {
            await initStore(userData);
            await evaluateCpAppModeLogic(getCompanyInfo().cpAppMode);
          }
        }
      } catch (e) {
        console.error('세션 자동 복구 실패 (로그인 화면으로 진행):', e);
      }
    }

    renderAll();
  });
}

// ── Toast helper ──
function showToast(message, type) {
  const box = document.getElementById('toast-container');
  if (!box) return;
  const icons = { success: 'check_circle', info: 'info', warning: 'warning' };
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.innerHTML = '<span class="material-symbols-rounded">' + (icons[type] || 'info') + '</span> ' + message;
  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── Bootstrap ──
document.addEventListener('DOMContentLoaded', initApp);
