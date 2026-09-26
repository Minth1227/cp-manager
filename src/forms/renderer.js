// ============================================
// Dynamic Form Renderer
// Renders forms based on definitions
// ============================================

import {
  getFormData, setFormData, getFormStatus, setFormStatus, canEdit, getCompanyInfo, getTargetGrade,
  getProducts, getSelectedProductId, setSelectedProductId, addProduct, deleteProduct, updateProduct,
  getCaseFormData, setCaseFormData, isTxForm, getAutoFillValue, getCurrentRegulation, updateRegulation,
  getTransactions, getSelectedTransactionId, getCurrentUser, getDocumentAckLog,
  getFieldSources, getDownstreamFilledForms, propagateFieldForward,
  isInstanceForm, getFormInstances, getSelectedInstanceId, setSelectedInstanceId, createFormInstance, deleteFormInstance, getInstanceStatus,
  getApprovalStatusInfo, generateDocNumber, canViewDocument, getLegalPdfInfo
} from '../store.js';
import { getNextStep, getAutoFillData } from './workflowEngine.js';
import { evaluateBusinessLogic } from '../logic.js';
import { formDefinitions } from './definitions.js';
import { customAlert, customConfirm, customPrompt, customFormDialog, customToast } from '../utils/dialog.js';
import { hasFormTemplate, generateFormHtml } from '../utils/formTemplates.js';
import { uploadAttachment, deleteAttachment } from '../utils/attachmentStorage.js';
import { DESTINATION_COUNTRIES } from '../utils/countryList.ts';
import { renderSearchView } from '../views/searchView.js';
import { getFormPosition } from '../data/processFlow.js';

function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(',')[1],
          mimeType: file.type
        }
      });
    };
    reader.readAsDataURL(file);
  });
}

function openSearchModal(initialTab) {
  let modal = document.getElementById('search-modal-widget');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'search-modal-widget';
    modal.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:9999; display:flex; justify-content:center; align-items:center;";
    modal.innerHTML = `
      <div style="background:var(--bg-primary); width:95%; max-width:1200px; height:85vh; border-radius:12px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border-color); background:var(--bg-secondary);">
          <h3 style="margin:0; font-size:1.1rem; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded" style="color:var(--accent-purple);">search</span> 품목 통합 검색기
          </h3>
          <button class="btn-close-modal" style="background:none; border:none; font-size:28px; cursor:pointer; color:var(--text-secondary); line-height:1;">&times;</button>
        </div>
        <div class="modal-body" style="padding:20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:20px;"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.btn-close-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
  
  modal.style.display = 'flex';
  const modalBody = modal.querySelector('.modal-body');
  renderSearchView(modalBody, null, initialTab);
}

// 다회차(instance) 서식의 회차 목록 화면. "새로 작성"으로 새 회차를 만들거나,
// 기존 회차를 클릭해 열람/수정할 수 있다. 각 회차는 formId_inst_고유ID로 완전히 독립 저장되므로
// 새 교육을 시작해도 지난 교육의 출석부·첨부파일·확인기록이 사라지지 않는다.
function instanceLabel(inst, formDef) {
  const nameKeys = [
    'trainingName', 'title', 'subject', 'name', 'itemName', 'targetProject',
    'auditYear', 'planYear', 'auditScope', 'reportSummary', 'findings',
  ];
  let name = '';
  for (const k of nameKeys) { if (inst[k]) { name = inst[k]; break; } }
  if (!name && formDef) {
    // 위 공통 키 목록에 없는 서식(예: 정의되지 않은 고유 필드명)은 서식 정의(fields/sections)에
    // 실제로 값이 채워진 첫 텍스트/텍스트에어리어 필드를 제목 대용으로 사용한다.
    const allFields = formDef.fields || (formDef.sections ? formDef.sections.flatMap(s => s.fields || []) : []);
    for (const f of allFields) {
      const v = inst[f.key];
      if ((f.type === 'text' || f.type === 'textarea') && typeof v === 'string' && v.trim()) {
        name = v;
        break;
      }
    }
  }
  if (typeof name === 'string' && name.length > 40) name = name.slice(0, 40) + '…';
  const dateKeys = [
    'trainingDate', 'date', 'declarationDate', 'sendDate', 'planDate', 'issueDate',
    'reportDate', 'applicationDate', 'noticeDate', 'auditDate', 'customsDate',
  ];
  let date = '';
  for (const k of dateKeys) { if (inst[k]) { date = inst[k]; break; } }
  if (!date && inst._createdAt) date = new Date(inst._createdAt).toLocaleDateString('ko-KR');
  return { name: name || '(제목 미입력)', date };
}

function renderInstanceListView(formDef, container, instances) {
  const statusLabels = { todo: '미착수', progress: '작성중', review: '검토중', done: '완료', na: '해당없음' };

  let html = `
    <div class="page-header">
      <div class="breadcrumb">홈 <span>›</span> ${formDef.category || ''} <span>›</span> ${formDef.title}</div>
      <h2>${formDef.title} — 회차 목록</h2>
      <p style="color:var(--text-secondary);">${formDef.title}은(는) 발생할 때마다(${formDef.timing || ''}) 새로 작성하는 서식입니다. 지난 회차의 기록은 계속 보존되며, 아래에서 새 회차를 시작하거나 지난 회차를 열람할 수 있습니다.</p>
    </div>
    <div style="margin-bottom:16px; display:flex; gap:8px; flex-wrap:wrap;">
      <button type="button" class="btn btn-primary" id="btn-new-instance" ${!canEdit() ? 'disabled' : ''}>
        <span class="material-symbols-rounded" style="vertical-align:-4px;">add_circle</span> 새 회차 작성
      </button>
      ${getLegalPdfInfo(formDef.id) ? `
        <a class="btn btn-secondary" href="/.netlify/functions/legal_pdf_get?formId=${encodeURIComponent(formDef.id)}" target="_blank" rel="noopener" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; color:var(--accent-purple); border-color:rgba(139,92,246,0.3);">
          <span class="material-symbols-rounded">picture_as_pdf</span> 공식 서식 PDF 다운로드
        </a>
      ` : ''}
    </div>
  `;

  if (instances.length === 0) {
    html += `<div class="card" style="padding:40px; text-align:center; color:var(--text-tertiary);">
      <span class="material-symbols-rounded" style="font-size:2.5rem; display:block; margin-bottom:8px;">inbox</span>
      아직 작성된 회차가 없습니다. "새 회차 작성"으로 시작하세요.
    </div>`;
  } else {
    html += `<div style="display:flex; flex-direction:column; gap:10px;">`;
    instances.forEach(inst => {
      const restricted = !canViewDocument(inst);
      const { name, date } = restricted ? { name: '🔒 비공개 문서', date: '' } : instanceLabel(inst, formDef);
      const status = getInstanceStatus(formDef.id, inst.instanceId);
      // 승인/반려/대기중은 작성상태(status) 드롭다운과 별개로 formData 자체에서 파생 계산한다 —
      // Slack 승인 등은 작성상태를 건드리지 않으므로, 승인 완료됐는데도 "미착수"로 보이는 걸 방지.
      const approvalInfo = getApprovalStatusInfo(inst);
      const badgeLabel = approvalInfo ? approvalInfo.label : (statusLabels[status] || status);
      const badgeColor = approvalInfo?.key === 'approved' ? 'rgba(34,197,94,0.15)' : approvalInfo?.key === 'rejected' ? 'rgba(239,68,68,0.15)' : approvalInfo?.key === 'pending' ? 'rgba(234,179,8,0.15)' : 'var(--bg-secondary)';
      html += `
        <div class="card instance-row" data-instance-id="${inst.instanceId}" data-restricted="${restricted}" style="padding:14px 18px; display:flex; justify-content:space-between; align-items:center; ${restricted ? 'cursor:not-allowed; opacity:0.6;' : 'cursor:pointer;'}">
          <div>
            <div style="font-weight:600; font-size:0.95rem;">
              ${!restricted && inst.docNumber
                ? `<span style="font-family:monospace; font-weight:700; color:var(--accent-purple); margin-right:8px; font-size:0.82rem;">${inst.docNumber}</span>`
                : (!restricted ? `<span style="font-size:0.72rem; color:var(--text-tertiary); margin-right:8px;">(문서번호: 승인 후 발급)</span>` : '')}
              ${name}
            </div>
            <div style="font-size:0.8rem; color:var(--text-tertiary); margin-top:2px;">${restricted ? '이 문서를 열람할 권한이 없습니다' : `${date ? date + ' · ' : ''}작성자: ${inst._createdBy || '알수없음'}${inst.revisedFrom ? ` · 재작성 원본: ${inst.revisedFrom}` : ''}`}</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="status-badge" style="font-size:0.75rem; padding:3px 10px; border-radius:12px; background:${badgeColor};">${badgeLabel}</span>
            ${!restricted ? `
            <button type="button" class="btn btn-ghost btn-delete-instance" data-instance-id="${inst.instanceId}" title="이 회차 삭제" style="color:var(--accent-red); padding:4px 8px;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">delete</span>
            </button>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;

  const newBtn = container.querySelector('#btn-new-instance');
  if (newBtn) {
    newBtn.addEventListener('click', async () => {
      if (!canEdit()) return;
      await createFormInstance(formDef.id, {});
      renderForm(formDef, container);
    });
  }

  container.querySelectorAll('.instance-row').forEach(row => {
    row.addEventListener('click', async (e) => {
      if (e.target.closest('.btn-delete-instance')) return;
      if (row.dataset.restricted === 'true') return;
      const instId = row.dataset.instanceId;
      await setSelectedInstanceId(formDef.id, instId);
      renderForm(formDef, container);
    });
  });

  container.querySelectorAll('.btn-delete-instance').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!canEdit()) return;
      const instId = btn.dataset.instanceId;
      const inst = instances.find(i => i.instanceId === instId);
      const { name } = inst ? instanceLabel(inst, formDef) : { name: '' };
      const confirmed = await customConfirm('회차 삭제', `"${name}" 회차를 삭제할까요? 첨부파일을 포함한 모든 기록이 사라지며 되돌릴 수 없습니다.`, { danger: true, confirmText: '삭제' });
      if (!confirmed) return;
      await deleteFormInstance(formDef.id, instId);
      renderForm(formDef, container);
    });
  });
}

export function renderForm(formDef, container, overrideData = null) {
  // [신규] 다회차(instance) 서식은 특정 회차를 선택하기 전까지 회차 목록부터 보여준다.
  // (거래를 먼저 선택해야 tx 전용 서식을 채울 수 있는 것과 같은 원리 — "어느 회차인지"를
  // 먼저 정해야 그 회차의 데이터를 읽고 쓸 수 있다.)
  if (isInstanceForm(formDef.id) && !overrideData) {
    const selId = getSelectedInstanceId(formDef.id);
    const instances = getFormInstances(formDef.id);
    const stillExists = selId && instances.some(i => i.instanceId === selId);
    if (!stillExists) {
      renderInstanceListView(formDef, container, instances);
      return;
    }
  }

  const isProductSpecific = ['F-01', 'F-02', 'F-03', 'Z-01', 'G-01', 'H-01'].includes(formDef.id);
  const products = isProductSpecific ? getProducts() : [];
  const selectedProdId = isProductSpecific ? getSelectedProductId() : null;
  const selectedProd = isProductSpecific ? (products.find(p => p.id === selectedProdId) || products[0] || {}) : null;

  // ── [Fix #1] 거래 잠금(isLocked) 상태 계산 ──
  // tx 전용 서식(txForm)의 경우 현재 선택된 거래의 잠금 여부를 폼 전체에 적용한다.
  // 잠긴 거래는 저장 버튼, 모든 input/select/textarea를 disabled/readonly 처리한다.
  let txIsLocked = false;
  if (isTxForm(formDef.id)) {
    const currentTxId = getSelectedTransactionId();
    const allTxs = getTransactions();
    const currentTx = allTxs.find(t => t.id === currentTxId);
    txIsLocked = currentTx?.isLocked || false;
  }
  const savedData = overrideData || (isTxForm(formDef.id) ? getCaseFormData(formDef.id) : getFormData(formDef.id));

  // [신규] 공개범위(visibilityScope) 접근 통제 — 승인 완료된 문서에 한해, 비공개/부서공개로
  // 지정된 문서는 기안자/승인자/관리자가 아니면 화면 내용을 볼 수 없다. (초안 단계는 제한 없음)
  if (!overrideData && !canViewDocument(savedData)) {
    container.innerHTML = `
      <div class="fade-in" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 20px; text-align:center;">
        <span class="material-symbols-rounded" style="font-size:3rem; color:var(--text-tertiary); margin-bottom:12px;">lock</span>
        <h3 style="margin:0 0 6px;">열람 권한이 없습니다</h3>
        <p style="color:var(--text-secondary); max-width:400px;">
          이 문서는 공개범위가 "${savedData.visibilityScope === 'private' ? '비공개(기안자·승인자만)' : '부서공개(자율수출관리기구 소속)'}"로 지정되어 있습니다.
        </p>
      </div>
    `;
    return;
  }

  // tx 서식이 아닌 경우(전사 CP 인프라 서식)도 product 잠금 상태를 승계한다
  const isFormLocked = txIsLocked || (isProductSpecific && selectedProd?.isLocked) || !!savedData.signatureInfo;

  // 공지문(A-02, B-02 등 trackAck 서식)은 결재(전자서명) 완료 후 열람하는 순간 자동으로 "확인 기록"을 남긴다.
  // Slack은 읽음 확인을 제공하지 않으므로, Slack 메시지의 링크를 눌러 앱에 들어오는 이 시점이 실제 확인 기록이 된다.
  if (formDef.trackAck && savedData.signatureInfo) {
    import('../store.js').then(({ logDocumentAck }) => logDocumentAck(formDef.id));
  }

  // Auto-fill logic from previous workflow forms
  if (isTxForm(formDef.id) && !overrideData) {
    const txId = getSelectedTransactionId();
    const autoFill = getAutoFillData(formDef.id, txId);
    for (const key in autoFill) {
      if (!savedData[key]) {
        savedData[key] = autoFill[key];
      }
    }
  }

  // Pre-populate product defaults if not explicitly set
  if (isProductSpecific && selectedProd) {
    if (!savedData.itemName) savedData.itemName = selectedProd.name || '';
    if (!savedData.modelNumber) savedData.modelNumber = selectedProd.model || '';
    if (!savedData.controlNo) savedData.controlNo = selectedProd.controlNumber || '';
    if (!savedData.specUsage) savedData.specUsage = selectedProd.specSummary || '';
    if (!savedData.strategic) savedData.strategic = 'yes';
    if (!savedData.companyName) {
      const comp = getCompanyInfo() || {};
      savedData.companyName = comp.name || '(주)팝콘사';
      savedData.ceoName = comp.ceo || '채승엽';
      savedData.regNumber = comp.registrationNumber || '206-87-03697';
    }
  }

  const status = getFormStatus(formDef.id);

  let html = `<div class="form-editor fade-in">`;

  // ── [신규] 전체 흐름 진행 위치 표시 + 이전/다음 서식 이동 ──
  // "처음 쓰는 사람이 지금 어디까지 왔는지 서식 화면에서도 알 수 있으면 좋겠다"는 요청 반영.
  // 사이드바의 phase→step→forms 순서를 그대로 평평하게 펼친 고정 순번 기준이며,
  // G-01 이후처럼 데이터에 따라 갈라지는 "스마트 다음단계"(저장 및 다음단계 이동 버튼)와는 별개로,
  // 항상 존재하는 구조적인 이전/다음 이동 수단을 제공한다.
  const posInfo = getFormPosition(formDef.id);
  if (posInfo) {
    const prevDef = posInfo.prevFormId ? formDefinitions[posInfo.prevFormId] : null;
    const nextDef = posInfo.nextFormId ? formDefinitions[posInfo.nextFormId] : null;
    const stepProgressPct = Math.round((posInfo.indexInStep / posInfo.totalInStep) * 100);

    html += `
      <div class="form-progress-bar" style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; padding:10px 14px; margin-bottom:var(--space-md); display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <button type="button" class="btn btn-ghost" id="btn-prev-form" ${!prevDef ? 'disabled' : ''} style="padding:6px 10px; font-size:0.8rem; white-space:nowrap; ${!prevDef ? 'opacity:0.4; cursor:not-allowed;' : ''}" title="${prevDef ? `이전 서식: [${prevDef.id}] ${prevDef.title}` : '전체 흐름의 첫 서식입니다'}">
          <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">arrow_back</span> 이전
        </button>
        <div style="flex:1; min-width:180px;">
          <div style="font-size:0.72rem; color:var(--text-tertiary); margin-bottom:3px;">
            ${posInfo.phase.number}. ${posInfo.phase.title.split(' (')[0]} <span style="opacity:0.5;">›</span> ${posInfo.step.title}
            <span style="float:right;">이 그룹 ${posInfo.indexInStep}/${posInfo.totalInStep} · 전체 ${posInfo.globalIndex}/${posInfo.globalTotal}</span>
          </div>
          <div style="height:5px; background:var(--bg-secondary); border-radius:3px; overflow:hidden;">
            <div style="height:100%; width:${stepProgressPct}%; background:var(--accent-blue); border-radius:3px;"></div>
          </div>
        </div>
        <button type="button" class="btn btn-ghost" id="btn-next-form" ${!nextDef ? 'disabled' : ''} style="padding:6px 10px; font-size:0.8rem; white-space:nowrap; ${!nextDef ? 'opacity:0.4; cursor:not-allowed;' : ''}" title="${nextDef ? `다음 서식: [${nextDef.id}] ${nextDef.title}` : '전체 흐름의 마지막 서식입니다'}">
          다음 <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">arrow_forward</span>
        </button>
      </div>
    `;
  }

  // [신규] 다회차 서식은 현재 어느 회차를 보고 있는지 + 문서번호 + 목록/재작성 버튼을 보여준다.
  if (isInstanceForm(formDef.id)) {
    const curInst = getFormInstances(formDef.id).find(i => i.instanceId === getSelectedInstanceId(formDef.id));
    const { name, date } = curInst ? instanceLabel(curInst, formDef) : { name: '', date: '' };
    const docNumber = savedData.docNumber || curInst?.docNumber || '';
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-md); padding:10px 14px; background:var(--bg-secondary); border-radius:8px; flex-wrap:wrap; gap:8px;">
      <div style="font-size:0.85rem; color:var(--text-secondary);">
        ${docNumber
          ? `<span style="font-family:monospace; font-weight:700; color:var(--accent-purple); margin-right:10px;">${docNumber}</span>`
          : `<span style="font-size:0.75rem; color:var(--text-tertiary); margin-right:10px;">(문서번호: 승인 후 발급 예정)</span>`}
        현재 회차: <strong style="color:var(--text-primary);">${name}</strong>${date ? ' (' + date + ')' : ''}
        ${savedData.revisedFrom ? `<span style="margin-left:8px; font-size:0.78rem; color:var(--text-tertiary);">(재작성 원본: ${savedData.revisedFrom})</span>` : ''}
      </div>
      <div style="display:flex; gap:8px;">
        ${canEdit() ? `
        <button type="button" class="btn btn-ghost" id="btn-revise-document" style="font-size:0.82rem; padding:6px 12px; color:var(--accent-blue); border:1px solid var(--accent-blue);" title="이 문서 내용을 그대로 복제해 새 문서번호로 재작성합니다. (서명/승인 정보는 새로 시작됩니다)">
          <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">edit_document</span> 재작성
        </button>` : ''}
        <button type="button" class="btn btn-ghost" id="btn-back-to-instances" style="font-size:0.82rem; padding:6px 12px;">
          <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">list</span> 회차 목록으로
        </button>
      </div>
    </div>`;
  }

  // Meta bar
  html += `<div class="form-meta-bar">
    <div class="form-meta-item"><span class="label">대응 지표:</span> <span class="value">${formDef.indicator}</span></div>
    <div class="form-meta-item"><span class="label">사용 시점:</span> <span class="value">${formDef.timing}</span></div>
    <div class="form-meta-item"><span class="label">작성 주체:</span> <span class="value">${formDef.author}</span></div>
    <div class="form-meta-item"><span class="label">보존 연한:</span> <span class="value">${formDef.retention}</span></div>
    <div class="form-meta-item" style="display:flex; gap:8px; align-items:center;">
      <span class="label">상태:</span>
      <select class="status-select ${status}" data-form-id="${formDef.id}" id="status-select-${formDef.id}" ${canEdit() ? '' : 'disabled title="편집 권한이 없습니다"'}>
        <option value="todo" ${status === 'todo' ? 'selected' : ''}>미착수</option>
        <option value="progress" ${status === 'progress' ? 'selected' : ''}>작성중</option>
        <option value="review" ${status === 'review' ? 'selected' : ''}>검토중</option>
        <option value="done" ${status === 'done' ? 'selected' : ''}>완료</option>
      </select>
    </div>
  </div>`;
  
  // Last Modified Badge
  if (savedData._lastModifiedBy) {
    const dDate = new Date(savedData._lastModifiedAt);
    const dateString = isNaN(dDate) ? '' : dDate.toLocaleString();
    html += `<div style="text-align:right; font-size:0.8rem; color:var(--text-tertiary); margin-top:-10px; margin-bottom:var(--space-md);">
      마지막 수정: <strong>${savedData._lastModifiedBy}</strong> (${dateString})
    </div>`;
  }
  
  // Legal basis bar (if available)
  if (formDef.legalBasis) {
    html += `<div class="form-meta-bar" style="background: rgba(96, 165, 250, 0.08); border-color: rgba(96, 165, 250, 0.2); margin-top: -12px;">
      <div class="form-meta-item" style="flex:1"><span class="label">📜 법적 근거:</span> <span class="value" style="color:#60a5fa;font-weight:500">${formDef.legalBasis}</span></div>
    </div>`;
  }

  // ── 데이터 수동 동기화 (Sync) 버튼 ──
  if (['G-05', 'C-06', 'J-02', 'K-02'].includes(formDef.id) && canEdit()) {
    let sourceForm = '';
    if (formDef.id === 'G-05') sourceForm = 'K-03(운영보고), K-04(실적보고)';
    else if (formDef.id === 'C-06') sourceForm = 'C-07(감사계획서)';
    else if (formDef.id === 'J-02') sourceForm = 'J-01(자진신고서)';
    else if (formDef.id === 'K-02') sourceForm = 'K-01(사전거래보고서)';

    html += `
      <div class="sync-action-bar" style="background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.2); border-radius:8px; padding:12px 16px; margin-bottom:var(--space-md); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-weight:600; color:var(--primary-color);">데이터 동기화</span>
          <p style="margin:4px 0 0; font-size:0.8rem; color:var(--text-secondary);">※ <strong>${sourceForm}</strong> 양식에 작성된 정보를 불러와 현재 문서에 덮어쓸 수 있습니다.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sync-data" data-form-id="${formDef.id}" style="display:inline-flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded">sync</span> 맞춤 동기화
        </button>
      </div>
    `;
  }

  // ── N/A (해당없음 / 법적 면제) 사유 안내 카드 ──
  if (status === 'na') {
    const compInfo = getCompanyInfo() || {};
    const isInitial = compInfo.cpAppMode !== 'certified';
    const z01Data = getCaseFormData('Z-01') || {};

    let exemptionReason = '';
    let reasonType = '일반 면제';

    if (formDef.id === 'K-03') {
      reasonType = isInitial ? '🌱 신규 신청 단계 법적 면제' : '정부 정기보고 미해당';
      exemptionReason = `본 서식(별지 제18호)은 「대외무역법」 제25조 제3항 및 「전략물자 수출입고시」 제90조에 따라 이미 CP 자격을 취득한 기존 기업이 차년도에 전년도 운영실적을 산업통상자원부장관에게 정기 보고하는 양식입니다. 현재 <strong>[신규(최초) 지정신청 단계]</strong>에서는 기부여된 CP 지정번호가 없으므로 법적으로 작성이 면제(N/A)됩니다.`;
    } else if (formDef.id === 'K-04') {
      reasonType = isInitial ? '🌱 신규 신청 단계 법적 면제' : '정부 실적보고 미해당';
      exemptionReason = `본 서식(별지 제19호)은 「전략물자 수출입고시」 제90조 제2항에 따라 포괄수출허가를 발급받은 기존 CP 기업이 실제 허가 사용 실적을 반기/연간 정기 보고하는 서식입니다. <strong>신규 신청 단계에서는 포괄수출허가증 발급 전</strong>이므로 법적으로 제출 대상에서 제외(N/A)됩니다.`;
    } else if (['M-01', 'M-02', 'M-03'].includes(formDef.id)) {
      reasonType = '⚡ Z-01 사전 진단표 연동 면제';
      const q0 = z01Data['q0_type'] || '수출';
      exemptionReason = `<strong>Z-01 무역 거래 사전 진단표</strong> 상 거래 유형이 [${q0}]로 진단되어, 외국으로부터 전략물자를 국내로 수입할 때 요구되는 수입목적확인 및 통관증명 서류 제출이 법적으로 면제(N/A)되었습니다. (※ 수입 거래 발생 시 Z-01 진단표에서 '수입'을 선택하시면 자동 활성화됩니다.)`;
    } else if (formDef.id === 'L-02') {
      reasonType = '⚡ Z-01 사전 진단표 연동 면제';
      exemptionReason = `<strong>Z-01 무역 거래 사전 진단표</strong> 진단 결과, 해당 거래 조건(수출 대상국/품목 분류/CP 등급)이 포괄수출허가 특례 요건을 충족하지 않아 <strong>[개별수출허가(L-01)]</strong> 신청 대상으로 분류되어 본 포괄허가 서식은 해당없음(N/A) 처리되었습니다.`;
    } else if (formDef.id === 'L-01') {
      reasonType = '⚡ Z-01 사전 진단표 연동 면제';
      exemptionReason = `<strong>Z-01 무역 거래 사전 진단표</strong> 진단 결과, 본 건은 전략물자 비해당(상황허가 우려 없음) 또는 포괄수출허가(L-02) 특례 적용 거래로 판별되어 개별수출허가 신청이 면제(N/A)되었습니다.`;
    } else if (['K-01', 'K-02'].includes(formDef.id)) {
      reasonType = '⚡ Z-01 사전 진단표 연동 면제';
      exemptionReason = `<strong>Z-01 무역 거래 사전 진단표</strong> 진단 결과, 전략기술 무형이전(ITT) 특례 또는 중개 거래가 아닌 일반 수출 품목으로 판별되어 사전/사후 거래보고 의무가 면제(N/A)되었습니다.`;
    } else if (['L-03', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08', 'L-09'].includes(formDef.id)) {
      reasonType = '⚡ G-01 심사 결과 연동 면제';
      exemptionReason = `<strong>G-01 거래심사표</strong> 심사 결과, 본 거래는 <strong>[상황허가(Catch-all) 신청 필수]</strong> 대상이 아니므로 해당 상황허가 부속서류의 작성이 면제(N/A)되었습니다.`;
    } else {
      reasonType = '심사 기준 미해당(N/A)';
      exemptionReason = `본 서식은 귀사의 현재 수출통제 대상 품목, 거래 형태 또는 심사 유형(유형 2) 기준에 해당하지 않아 작성 대상에서 제외(N/A)되었습니다.`;
    }

    html += `
      <div class="exemption-reason-card" style="background:rgba(245,158,11,0.07); border:1px solid rgba(245,158,11,0.3); border-left:4px solid var(--accent-amber); border-radius:0 8px 8px 0; padding:14px 18px; margin-bottom:var(--space-lg);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded" style="color:var(--accent-amber); font-size:1.25rem;">info</span>
            <strong style="font-size:0.92rem; color:var(--accent-amber);">${reasonType} 안내</strong>
          </div>
          <span style="font-size:0.75rem; background:rgba(245,158,11,0.15); color:var(--accent-amber); font-weight:700; padding:2px 8px; border-radius:4px;">현재 상태: 해당없음(N/A)</span>
        </div>
        <p style="margin:0; font-size:0.85rem; color:var(--text-primary); line-height:1.65;">
          ${exemptionReason}
        </p>
        <div style="margin-top:8px; font-size:0.78rem; color:var(--text-tertiary);">
          💡 <em>과거 수출건을 활용한 모의 시나리오 작성을 원하시는 경우, 우측 상단의 [상태 드롭다운]을 [작성중]으로 변경하시면 언제든지 자유롭게 입력 및 저장이 가능합니다.</em>
        </div>
      </div>
    `;
  }

  // ── 📦 작성 대상 제품 및 수출 거래 표기 (Export Case 연동) ──
  if (isProductSpecific) {
    const txs = getTransactions();
    const tId = getSelectedTransactionId();
    const currentTx = txs.find(t => t.id === tId);
    const txName = currentTx ? currentTx.name : '미지정 거래(신규 등)';

    html += `
      <div class="card product-selector-card" style="background:var(--bg-card); border:1px solid rgba(99,102,241,0.25); border-left:4px solid var(--primary-color); border-radius:8px; padding:14px 18px; margin-bottom:var(--space-lg); box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:280px;">
            <span class="material-symbols-rounded" style="color:var(--primary-color); font-size:1.35rem;">inventory_2</span>
            <strong style="font-size:0.9rem; color:var(--text-primary); white-space:nowrap;">작성 대상 내역:</strong>
            <span style="font-weight:700; font-size:0.9rem; color:var(--text-primary); padding:5px 8px;">
              [${txName}] - ${selectedProd.name} (모델: ${selectedProd.model || '미기재'})
            </span>
          </div>
        </div>

        <div style="margin-top:10px; font-size:0.82rem; color:var(--text-secondary); background:rgba(99,102,241,0.03); border:1px dashed rgba(99,102,241,0.2); padding:8px 12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            선택 모델: <strong style="color:var(--text-primary);">${selectedProd.model || '-'}</strong> | 
            통제번호: <strong style="color:var(--primary-color);">${selectedProd.controlNumber || '-'}</strong> | 
            판정상태: <strong style="color:var(--accent-purple);">${selectedProd.classificationType || '-'}</strong>
          </div>
          <div style="color:var(--text-tertiary); font-size:0.75rem;">
            ※ 해당 서류는 <strong>선택된 거래(Export Case)</strong>에 동기화되어 통합 관리됩니다.
          </div>
        </div>
      </div>
    `;
  }

  // AI Analysis Block
  if (formDef.ai_analyzable) {
    html += `
      <div class="ai-analysis-block" style="background:linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(99, 133, 255, 0.1)); border:1px solid rgba(167, 139, 250, 0.3); border-radius: var(--radius-lg); padding: var(--space-md); margin-bottom: var(--space-lg); display: flex; align-items: center; justify-content: space-between;">
        <div style="flex:1;">
          <h4 style="margin:0 0 var(--space-xs) 0; color: var(--accent-purple); font-size: 1rem; display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded">smart_toy</span> 카달로그 / 사양서 AI 자동 분석
          </h4>
          <p style="margin:0; font-size: 0.85rem; color: var(--text-secondary);">사양서(PDF/이미지)를 업로드하시면 멀티모달 AI(Gemini)가 암호화 알고리즘 등 전략물자 핵심 질의 항목을 분석하여 양식을 자동으로 채워줍니다.</p>
          <div style="background: rgba(167, 139, 250, 0.08); backdrop-filter: blur(4px); padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px dashed rgba(167, 139, 250, 0.4);">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
              ✅ 사전 점검표 (사양서 포함 여부 확인)
            </div>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; margin-bottom: 12px; cursor: pointer; color:var(--text-secondary); line-height: 1.4;">
              <input type="checkbox" class="ai-prereq-check" style="margin-top: 4px;">
              <div>
                <strong style="color: var(--text-primary);">1. 암호화 및 정보보안(Cryptography) 알고리즘 명세 (가장 중요)</strong><br>
                <span style="font-size: 0.75rem;">- 암호화 알고리즘 종류(AES, RSA 등), 키 길이(128, 2048 등), 사용 목적(데이터 보호, 시스템 관리 등) 명시</span>
              </div>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; margin-bottom: 12px; cursor: pointer; color:var(--text-secondary); line-height: 1.4;">
              <input type="checkbox" class="ai-prereq-check" style="margin-top: 4px;">
              <div>
                <strong style="color: var(--text-primary);">2. 핵심 성능 한계치 (Technical Thresholds)</strong><br>
                <span style="font-size: 0.75rem;">- 통신/주파수 대역 및 출력, 반도체 처리속도/동작온도, 기계부품 가공 정밀도/소재 비율 등</span>
              </div>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; margin-bottom: 12px; cursor: pointer; color:var(--text-secondary); line-height: 1.4;">
              <input type="checkbox" class="ai-prereq-check" style="margin-top: 4px;">
              <div>
                <strong style="color: var(--text-primary);">3. 제품의 용도 및 타겟 산업군 (End-use & Applications)</strong><br>
                <span style="font-size: 0.75rem;">- 군용, 우주항공 등 특수 목적 또는 순수 민수용(상업용/일반 범용) 여부 명시</span>
              </div>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; margin-bottom: 12px; cursor: pointer; color:var(--text-secondary); line-height: 1.4;">
              <input type="checkbox" class="ai-prereq-check" style="margin-top: 4px;">
              <div>
                <strong style="color: var(--text-primary);">4. 내장된 주요 부품/소프트웨어 (Components & Dependencies)</strong><br>
                <span style="font-size: 0.75rem;">- 통제 대상 해외(미국산 등) 부품이나 서드파티 암호화 라이브러리(OpenSSL 등) 내장 여부</span>
              </div>
            </label>
            <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; cursor: pointer; color:var(--text-secondary); line-height: 1.4;">
              <input type="checkbox" class="ai-prereq-check" style="margin-top: 4px;">
              <div>
                <strong style="color: var(--text-primary);">5. 기본 식별 정보</strong><br>
                <span style="font-size: 0.75rem;">- 정확한 품명, 모델명/규격, HS Code (AI 교차 검증용)</span>
              </div>
            </label>
          </div>
        </div>
        <div style="display:flex; gap: 8px; align-items: center;">
          <input type="file" id="ai-upload-file" accept=".pdf, .png, .jpg" style="display:none;" />
          <button class="btn-primary" id="btn-ai-analyze" style="background: linear-gradient(135deg, #a78bfa, #6385ff); border:none; box-shadow: 0 4px 15px rgba(167, 139, 250, 0.3); white-space: nowrap;">
            <span class="material-symbols-rounded">upload_file</span> 파일 업로드 및 AI 분석
          </button>
        </div>
      </div>
      <div id="ai-loading-overlay" style="display:none; position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.8); backdrop-filter:blur(4px); z-index:10; flex-direction:column; align-items:center; justify-content:center; border-radius: var(--radius-lg);">
        <span class="material-symbols-rounded" style="font-size:48px; color:var(--accent-purple); animation: spin 2s linear infinite;">settings</span>
        <h3 style="margin-top:16px; color:var(--text-primary);">AI가 사양서를 분석 중입니다...</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:8px;">보안 프로토콜 및 암호화 알고리즘 추출 중</p>
      </div>
      <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .form-editor { position: relative; } /* for loading overlay */
      </style>
    `;
  }

  // Render based on type OR use official HWP template if available and explicitly supported
  if (hasFormTemplate(formDef.id)) {
    // Inject the interactive HWP legal form directly into the web UI
    html += `<div class="interactive-byeolji-container" style="background:#fff; border:1px solid var(--border-color); border-radius:8px; padding:20px; overflow-x:auto; width: 100%; max-width: 1000px; margin: 0 auto;">`;
    html += generateFormHtml(formDef.id, savedData, true); // true = isEditMode
    html += `</div>`;
  } else {
    switch (formDef.type) {
      case 'template':
        html += renderTemplateForm(formDef, savedData);
        break;
      case 'table':
        html += renderTableForm(formDef, savedData);
        if (formDef.id === 'A-05') html += renderRegulationVersionArchive(savedData);
        break;
      case 'checklist':
        html += renderChecklistForm(formDef, savedData);
        break;
      case 'mixed':
        html += renderMixedForm(formDef, savedData);
        break;
      case 'multi-table':
        html += renderMultiTableForm(formDef, savedData);
        break;
      case 'matrix':
        html += renderMatrixForm(formDef, savedData);
        break;
      case 'structured':
        html += renderStructuredForm(formDef, savedData);
        break;
      case 'qa':
        html += renderQAForm(formDef, savedData);
        break;
      case 'file_manager':
        html += renderFileManagerForm(formDef, savedData);
        break;
    }
  }

  // Guide box
  if (formDef.guide) {
    html += `<div class="guide-box">
      <strong>📋 작성 요령</strong>
      <p>${formDef.guide}</p>
    </div>`;
  }

  // ── [전자서명 / 감사증적(Audit Trail)] ──
  if (savedData.signatureInfo) {
    const currentRole = getCurrentUser()?.role;
    const canRevoke = currentRole === 'Master' || currentRole === 'ADMIN';
    html += `
      <div class="audit-signature-box fade-in" style="margin-top: var(--space-xl); padding: var(--space-lg); background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34,197,94,0.3); border-radius: var(--radius-lg);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="color: var(--status-success); font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 0.95rem;">
              <span class="material-symbols-rounded" style="font-size: 1.3rem;">verified</span>
              ✅ 전자서명 완료: ${savedData.signatureInfo.name} (${savedData.signatureInfo.department})
              ${savedData.signatureInfo.signedVia === 'slack' ? `<span style="font-size:0.72rem; background:#4A154B; color:white; padding:2px 8px; border-radius:10px; font-weight:600;">Slack 승인</span>` : ''}
            </div>
            <div style="margin-top: 6px; font-size: 0.8rem; color: var(--text-secondary); margin-left: 32px;">
              서명 일시: ${savedData.signatureInfo.timestamp}<br>
              ${savedData.signatureInfo.signedVia === 'slack' ? `Slack 계정: ${savedData.signatureInfo.slackUserName || ''} (ID: ${savedData.signatureInfo.slackUserId || ''})<br>` : ''}
              <span style="color: var(--status-success);">이 문서는 전자서명이 완료되어 수정이 영구적으로 잠금 처리되었습니다. (위변조 불가능한 감사 증적)</span>
              ${savedData.signedPdfMeta?.downloadURL ? `<br><a href="${savedData.signedPdfMeta.downloadURL}" target="_blank" rel="noopener" style="color:var(--accent-blue); font-weight:600;">📄 서명본 PDF 원문 보기</a> <span style="color:var(--text-tertiary); font-size:0.72rem;">(SHA-256: ${(savedData.signedPdfMeta.sha256 || '').slice(0, 16)}...)</span>` : ''}
            </div>
          </div>
          ${canRevoke ? `
          <button type="button" class="btn btn-ghost" id="btn-revoke-signature" style="font-size:0.78rem; padding:6px 10px; color:var(--accent-amber); border:1px solid var(--accent-amber); white-space:nowrap;" title="과거 데이터 입력 중 실수로 서명/잠금된 경우 등, 사유를 남기고 서명을 취소합니다. (Master 전용)">
            <span class="material-symbols-rounded" style="font-size:14px; vertical-align:-2px;">lock_open</span> 서명 취소 (관리자)
          </button>` : ''}
        </div>
      </div>
    `;

    // [신규] 공지문(trackAck) 서식은 결재 완료 후 누가 읽었는지가 그 자체로 법적 증빙이므로,
    // Slack 링크를 눌러 들어온 사람들의 열람 확인 기록을 서식 화면에서 바로 볼 수 있게 노출한다.
    if (formDef.trackAck) {
      const ackLog = getDocumentAckLog(formDef.id);
      html += `
        <div class="card" style="margin-top: var(--space-md); padding: var(--space-lg);">
          <strong style="font-size:0.9rem; display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--accent-blue);">fact_check</span>
            열람 확인 기록 (${ackLog.length}명)
          </strong>
          <p style="margin:6px 0 10px; font-size:0.78rem; color:var(--text-tertiary);">
            Slack은 메시지를 누가 읽었는지 알려주지 않으므로, 아래 명단은 실제로 이 화면을 열람한 임직원만 자동으로 기록된 것입니다.
          </p>
          ${ackLog.length === 0 ? `<p style="font-size:0.85rem; color:var(--text-tertiary);">아직 열람 기록이 없습니다.</p>` : `
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
            <thead><tr style="border-bottom:1px solid var(--border-color);"><th style="text-align:left; padding:6px;">성명</th><th style="text-align:left; padding:6px;">소속</th><th style="text-align:left; padding:6px;">확인 일시</th></tr></thead>
            <tbody>
              ${ackLog.map(r => `<tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;">${r.name}</td><td style="padding:6px;">${r.department}</td><td style="padding:6px;">${r.ackTime}</td></tr>`).join('')}
            </tbody>
          </table>
          `}
        </div>
      `;
    }
  } else if (canEdit() && !isFormLocked) {
    // 자율수출관리규정 제33조② — 규정 제·개정/보류 해제/수출허가 신청/자진신고 4종은 위임 제외 대표이사 결재.
    // formDef.approverRole이 지정된 서식은 해당 권한(Master=대표이사)이 아니면 전자서명(=결재 확정)을 막고,
    // 대신 담당 결재자에게 Slack으로 결재를 요청하도록 안내한다.
    const requiredRole = formDef.approverRole;
    const currentRole = getCurrentUser()?.role;
    const isAuthorizedApprover = !requiredRole || currentRole === requiredRole || currentRole === 'ADMIN';

    // [신규] Slack에서 반려된 경우, 요청자가 앱을 다시 열었을 때 사유를 바로 볼 수 있게 배너로 노출한다.
    // (반려 DM은 결재자 본인에게만 보이므로, 요청자에게 전달할 방법이 이 화면 표시뿐이다.)
    if (savedData.rejectionInfo) {
      html += `
        <div class="card fade-in" style="margin-bottom: var(--space-md); padding: var(--space-lg); background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius-lg); display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div>
            <strong style="color: var(--accent-red); font-size:0.95rem; display:flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="font-size:1.2rem;">cancel</span> ❌ 반려됨: ${savedData.rejectionInfo.name} (${savedData.rejectionInfo.roleLabel})
            </strong>
            <div style="margin-top:6px; font-size:0.8rem; color:var(--text-secondary); margin-left:28px;">
              반려 일시: ${savedData.rejectionInfo.timestamp}<br>
              반려 사유: ${savedData.rejectionInfo.reason}
            </div>
          </div>
          <button type="button" class="btn btn-ghost" id="btn-ack-rejection" style="font-size:0.78rem; padding:6px 10px; white-space:nowrap;" title="사유를 확인했습니다. 내용을 수정한 뒤 다시 결재를 요청하세요.">
            확인 (배너 닫기)
          </button>
        </div>
      `;
    }

    html += `
      <div class="audit-signature-box fade-in" style="margin-top: var(--space-xl); padding: var(--space-lg); background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="flex:1;">
          <strong style="color: var(--text-primary); font-size: 0.95rem; display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="color: var(--accent-purple); font-size: 1.2rem;">history_edu</span> 전자서명(Audit Trail)
          </strong>
          <p style="margin: 4px 0 0; font-size: 0.8rem; color: var(--text-secondary);">이 문서의 내용을 최종 확정하고 본인의 권한으로 전자서명합니다. 서명 후에는 폼 내용이 잠금 처리됩니다.</p>
          ${!isAuthorizedApprover ? `<p style="margin: 6px 0 0; font-size: 0.8rem; color: var(--accent-orange, #d97706);"><span class="material-symbols-rounded" style="font-size:1rem; vertical-align:-2px;">gpp_maybe</span> 이 서식은 위임이 제외된 <strong>${formDef.approverRoleLabel || '상위 결재자'}</strong> 전결 항목입니다. 담당자는 아래 버튼으로 결재를 요청하고, ${formDef.approverRoleLabel || '해당 권한자'}가 직접 로그인하여 서명해야 합니다.</p>` : ''}
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-secondary" id="btn-slack-request-approval" style="display: flex; align-items: center; gap: 6px; padding: 10px 16px;" title="담당 결재자에게 Slack으로 결재 요청 알림을 보냅니다. (관리자 설정에서 Slack 주소를 등록해야 동작합니다)">
            <span class="material-symbols-rounded">notifications_active</span> Slack으로 결재 요청
          </button>
          ${isAuthorizedApprover ? `
          <button type="button" class="btn" id="btn-electronic-sign" style="background: var(--accent-teal); color: white; display: flex; align-items: center; gap: 6px; padding: 10px 20px; font-weight: 600;">
            <span class="material-symbols-rounded">edit_document</span> 전자서명 및 최종 확정
          </button>` : ''}
        </div>
      </div>
    `;
  }

  // [신규] 참석자 본인 출석 확인 (C-02 등 selfCheckIn 서식) — 공지문(trackAck)과 달리 사전 결재
  // 없이도, 로그인한 참석자가 직접 "출석 확인" 버튼을 눌러 이름·소속·시각을 남길 수 있다.
  if (formDef.selfCheckIn) {
    const ackLog = getDocumentAckLog(formDef.id);
    const currentUser = getCurrentUser();
    const userKey = currentUser?.uid || currentUser?.email || '';
    const today = new Date().toISOString().split('T')[0];
    const alreadyCheckedIn = ackLog.some(r => r.userId === userKey && r.ackDate === today);

    html += `
      <div class="card" style="margin-top: var(--space-xl); padding: var(--space-lg);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <strong style="font-size:0.95rem; display:flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="color:var(--accent-teal);">how_to_reg</span> 본인 출석 확인
            </strong>
            <p style="margin:4px 0 0; font-size:0.8rem; color:var(--text-secondary);">
              오늘 이 교육에 참석했다면 아래 버튼을 눌러 본인 계정으로 출석을 확인하세요. Slack은 읽음 확인을 제공하지 않아, 로그인한 상태로 직접 확인해야 기록됩니다.
            </p>
          </div>
          ${alreadyCheckedIn
            ? `<span style="display:flex; align-items:center; gap:6px; color:var(--status-success); font-weight:600; font-size:0.88rem;"><span class="material-symbols-rounded">check_circle</span> 오늘 출석 확인 완료</span>`
            : `<button type="button" class="btn" id="btn-self-checkin" style="background:var(--accent-teal); color:white; display:flex; align-items:center; gap:6px; padding:10px 20px; font-weight:600;"><span class="material-symbols-rounded">how_to_reg</span> 출석 확인</button>`
          }
        </div>
      </div>
      <div class="card" style="margin-top: var(--space-md); padding: var(--space-lg);">
        <strong style="font-size:0.9rem; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--accent-blue);">fact_check</span>
          온라인 출석 확인 기록 (${ackLog.length}명)
        </strong>
        ${ackLog.length === 0 ? `<p style="margin-top:8px; font-size:0.85rem; color:var(--text-tertiary);">아직 출석 확인한 사람이 없습니다.</p>` : `
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-top:8px;">
          <thead><tr style="border-bottom:1px solid var(--border-color);"><th style="text-align:left; padding:6px;">성명</th><th style="text-align:left; padding:6px;">소속</th><th style="text-align:left; padding:6px;">확인 일시</th></tr></thead>
          <tbody>
            ${ackLog.map(r => `<tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;">${r.name}</td><td style="padding:6px;">${r.department}</td><td style="padding:6px;">${r.ackTime}</td></tr>`).join('')}
          </tbody>
        </table>
        `}
      </div>
    `;
  }

  // [신규] 오프라인 서명본 스캔 등 첨부 (C-02 등 attachmentSection 서식)
  if (formDef.attachmentSection) {
    html += `<div class="card" style="margin-top: var(--space-md); padding: var(--space-lg);">
      <strong style="font-size:0.9rem; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
        <span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--accent-purple);">attach_file</span>
        오프라인 서명본 첨부 (선택)
      </strong>
      ${renderFileManagerForm(formDef, savedData)}
    </div>`;
  }

  // Action buttons — [Fix #1] isFormLocked로 통합 잠금 판정
  html += `<div class="form-actions">
    <div class="left-actions">
      ${!canEdit() 
        ? `<span style="color:var(--text-tertiary); font-size:0.85rem; font-weight:bold; display:inline-flex; align-items:center; gap:4px;"><span class="material-symbols-rounded" style="font-size:1.1rem;">visibility</span> 조회 전용 (권한 없음)</span>`
        : isFormLocked 
        ? `<span style="color:var(--text-tertiary); font-size:0.85rem; font-weight:bold; display:inline-flex; align-items:center; gap:4px;"><span class="material-symbols-rounded" style="font-size:1.1rem;">lock</span> 보관 완료 (읽기 전용)</span>`
        : `
      <button class="btn btn-primary" id="btn-save-form">
        <span class="material-symbols-rounded">save</span> 저장
      </button>
      <button class="btn btn-primary" id="btn-save-and-next" style="margin-left:8px; background:var(--accent-teal); border:none;" title="현재 작성 내용을 저장하고 다음 단계 서식으로 자동 이동합니다.">
        <span class="material-symbols-rounded">arrow_forward</span> 저장 및 다음단계 이동
      </button>
      <button class="btn btn-secondary" id="btn-force-sync" style="margin-left:8px; border:1px solid var(--accent-purple); color:var(--accent-purple); display:inline-flex; align-items:center; gap:4px;" title="이 문서의 내용을 바탕으로 다른 양식들의 공통 항목을 강제 덮어쓰기 합니다.">
        <span class="material-symbols-rounded" style="font-size:1rem;">sync</span> 전체 양식 강제 동기화
      </button>`}
      
      ${formDef.id === 'H-01' && canEdit() ? `
      <button class="btn" id="btn-archive-product" style="margin-left:8px; background:var(--accent-red); color:white; font-weight:700; padding:10px 20px; display:inline-flex; align-items:center; gap:6px; box-shadow: 0 2px 10px rgba(248,113,113,0.4);" title="이 거래의 모든 수출 서류를 확정하고 5년간 보존(수정 불가) 상태로 만듭니다.">
        <span class="material-symbols-rounded" style="font-size:1.1rem;">lock</span> 출하 완료 및 법정의무 5년 보관하기
      </button>
      ` : ''}
      
      ${formDef.id === 'A-01' && canEdit() ? `
      <button class="btn" id="btn-enact-a01" style="margin-left:8px; background:var(--accent-blue); color:white; display:inline-flex; align-items:center; gap:4px;" title="결재가 완료된 기안문을 A-05 개정이력 관리대장에 신규 등재합니다.">
        <span class="material-symbols-rounded" style="font-size:1rem;">post_add</span> 규정 제·개정 및 이력 등재하기
      </button>
      ` : ''}

    </div>
    <div class="right-actions" style="display:flex; align-items:center; gap:8px;">
      <button class="btn btn-secondary" id="btn-preview-form">
        <span class="material-symbols-rounded">visibility</span> 미리보기
      </button>
      <button class="btn btn-success" id="btn-download-form">
        <span class="material-symbols-rounded">picture_as_pdf</span> PDF 다운로드
      </button>
    </div>
  </div>`;

  html += `</div>`;
  container.innerHTML = html;

  // ── [Fix #1] 잠금 거래의 폼 입력 통제 (DOM 레벨 전체 disable/readonly) ──
  // 저장 버튼 가드만으로는 사용자가 input을 직접 수정하는 것을 막지 못하므로,
  // isFormLocked가 true이면 컨테이너 내 모든 입력 요소를 비활성화한다.
  if (isFormLocked) {
    container.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.tagName === 'TEXTAREA' || el.type === 'text' || el.type === 'date' || el.type === 'number') {
        el.setAttribute('readonly', 'readonly');
        el.style.background = 'var(--bg-secondary)';
        el.style.cursor = 'not-allowed';
        el.style.color = 'var(--text-tertiary)';
      } else {
        // select, checkbox, radio
        // [수정] disabled만 걸면 브라우저 기본 스타일(밝은 회색 배경+검정 텍스트)로 되돌아가
        // 다크 테마인 이 앱 화면에서 "검정색으로 칠해져 안 보인다"는 문제가 있었음 —
        // readonly 텍스트 필드와 동일한 색상 체계를 적용해 잠긴 상태도 일관되게 보이도록 함.
        el.disabled = true;
        el.style.cursor = 'not-allowed';
        el.style.background = 'var(--bg-secondary)';
        el.style.color = 'var(--text-tertiary)';
        el.style.opacity = '1'; // 브라우저 기본 disabled opacity(흐림) 무효화 — 색상으로 이미 상태 표시
        el.style.webkitTextFillColor = 'var(--text-tertiary)'; // Safari/Chrome이 disabled 텍스트 색을 강제로 회색 처리하는 것 방지
      }
    });
    // 상태 select(status-select)도 잠금 - 보관 서류의 상태 임의 변경 방지
    const statusSel = container.querySelector('.status-select');
    if (statusSel) {
      statusSel.disabled = true;
      statusSel.title = '보관된 거래의 서류 상태는 변경할 수 없습니다.';
    }
  }

  // ── [버그 수정] 별지 서식(hasFormTemplate) 내 textarea 자동 높이조절 ──
  // formTemplates.js의 각 tmpl_*는 편집모드에서 `<script>setTimeout(() => window.initByeoljiTextareas(...))</script>`를
  // 마크업에 함께 내보내지만, 여기서는 container.innerHTML로 삽입하므로 그 <script>는 절대 실행되지 않는다
  // (innerHTML은 삽입한 <script> 태그를 실행하지 않는 것이 브라우저 표준 동작). 그 결과 isTextarea:true로
  // 지정된 모든 칸이 기본 2줄 높이 + overflow:hidden 상태로 고정되어, 여러 줄을 입력해도 화면에 보이지 않는
  // 문제가 전체 별지 서식에 걸쳐 있었다. innerHTML 대입 직후 직접 호출해 실제로 동작하게 한다.
  if (hasFormTemplate(formDef.id) && window.initByeoljiTextareas) {
    window.initByeoljiTextareas(container);
  }

  // ── K-01(사전거래보고서) 사전보고 기한(D-30) 자동계산 ──
  // formTemplates.js의 tmpl_16이 만드는 마크업(#dh-planned-date/#dh-deadline-display/#dh-deadline-hidden)은
  // container.innerHTML로 삽입되므로 그 안의 <script>는 실행되지 않는다. 계산 로직은 여기서 직접 바인딩한다.
  if (formDef.id === 'K-01') {
    const plannedInput = container.querySelector('#dh-planned-date');
    const deadlineDisplay = container.querySelector('#dh-deadline-display');
    const deadlineHidden = container.querySelector('#dh-deadline-hidden');
    if (plannedInput && deadlineDisplay && deadlineHidden) {
      const calcDeadline = () => {
        if (!plannedInput.value) {
          deadlineDisplay.textContent = '수출 예정일을 입력하세요';
          deadlineDisplay.classList.remove('dh-warn');
          deadlineHidden.value = '';
          return;
        }
        const planned = new Date(`${plannedInput.value}T00:00:00`);
        const deadline = new Date(planned.getTime() - 30 * 24 * 60 * 60 * 1000);
        const y = deadline.getFullYear();
        const m = String(deadline.getMonth() + 1).padStart(2, '0');
        const d = String(deadline.getDate()).padStart(2, '0');
        const deadlineStr = `${y}-${m}-${d}`;
        deadlineDisplay.textContent = deadlineStr;
        deadlineHidden.value = deadlineStr;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        deadlineDisplay.classList.toggle('dh-warn', deadline.getTime() <= today.getTime());
      };
      plannedInput.addEventListener('change', calcDeadline);
      calcDeadline();
    }
  }

  // Bind events
  bindFormEvents(formDef, container);
}

function renderTemplateForm(formDef, savedData) {
  let html = '';
  const fields = formDef.fields || [];

  fields.forEach(field => {
    let value = savedData[field.key];
    let isAutoFilled = false;
    // [신규] 기안일은 사람이 수동으로 입력/수정하지 않고, 이 문서(회차)가 실제로 생성된
    // 시각(_createdAt)을 시스템이 그대로 찍는다 — 소급 작성/오기입을 막기 위함.
    if (field.key === 'draftDate' && isInstanceForm(formDef.id)) {
      value = (savedData._createdAt ? savedData._createdAt : new Date().toISOString()).split('T')[0];
    } else {
      if (!value && field.key) {
        value = getAutoFillValue(field.key, formDef.id);
        if (value) isAutoFilled = true;
      }
      value = value || field.default || '';
    }
    html += renderField(field, value, savedData);
  });

  return html;
}

function renderTableForm(formDef, savedData) {
  const rows = savedData.rows || formDef.defaultRows || [{}];
  let html = `<div class="dynamic-table-wrapper">
    <table class="dynamic-table" id="dynamic-table-${formDef.id}">
      <thead><tr>`;

  formDef.columns.forEach(col => {
    html += `<th style="min-width:${col.width || 'auto'}">${col.label}</th>`;
  });
  html += `<th style="width:40px"></th></tr></thead><tbody>`;

  rows.forEach((row, idx) => {
    html += renderTableRow(formDef, row, idx);
  });

  html += `</tbody></table></div>`;
  if (canEdit()) {
    html += `<div class="table-actions">
      <button class="btn-add-row" data-table-id="${formDef.id}">
        <span class="material-symbols-rounded" style="font-size:16px">add</span> 행 추가
      </button>
    </div>`;
  }
  return html;
}

// A-05(규정 개정이력 관리대장) 전용 부속 패널.
// "규정 제·개정 및 이력 등재하기" 버튼(btn-enact-a01)으로 등재된 각 차수(버전)마다
// 그 시점의 A-01 기안문 원본과 확정된 규정 전문을 스냅샷(store.js의 createSnapshot)으로
// 영구 보관해두고, 이 패널에서 차수별로 두 문서를 각각 읽기 전용으로 열람할 수 있게 한다.
// A-05 표 자체(renderTableForm)는 수기 편집 가능한 일반 표이므로 건드리지 않고, 그 아래에
// 조회 전용 목록만 별도로 덧붙인다.
function renderRegulationVersionArchive(savedData) {
  const rows = savedData.rows || [];
  const withSnapshots = rows.filter(r => r && ((r.snapshotIds && (r.snapshotIds.draft || r.snapshotIds.regulation)) || r.signedPdfs));

  let html = `
    <div class="card" style="margin-top:20px; padding:20px; border:1px solid var(--border-color); border-radius:10px; background:var(--bg-card);">
      <h3 style="margin-top:0; display:flex; align-items:center; gap:8px; font-size:1.05rem;">
        <span class="material-symbols-rounded" style="color:var(--accent-blue);">inventory_2</span>
        규정 버전 보관함 (영구보존)
      </h3>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin:4px 0 14px;">
        [A-01] "규정 제·개정 및 이력 등재하기" 버튼으로 등재된 차수마다, 그 시점에 사용된 기안문 원본과 확정된 규정 전문이
        위변조 불가능한 스냅샷으로 영구 보관됩니다. 아래에서 과거 차수의 원문을 그대로 열람할 수 있습니다.
      </p>
  `;

  if (withSnapshots.length === 0) {
    html += `<p style="font-size:0.82rem; color:var(--text-tertiary);">아직 스냅샷이 연결된 차수가 없습니다. (이 기능 도입 이전 이력이거나, 등재 버튼을 거치지 않고 수기로 추가한 행)</p>`;
  } else {
    html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
    [...withSnapshots].reverse().forEach(row => {
      const hasPdf = !!row.signedPdfs;
      html += `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 14px; border:1px solid var(--border-subtle); border-radius:8px; background:var(--bg-primary); flex-wrap:wrap;">
          <div style="font-size:0.85rem;">
            <strong style="color:var(--accent-blue);">${row.revision || '(차수 미기재)'}</strong>
            <span style="color:var(--text-secondary); margin-left:8px;">${row.effectiveDate || ''} · ${row.type || ''}</span>
            ${hasPdf ? `<span style="font-size:0.7rem; background:#4A154B; color:white; padding:1px 7px; border-radius:9px; margin-left:6px;">Slack 승인 · PDF</span>` : ''}
            <div style="color:var(--text-tertiary); font-size:0.78rem; margin-top:2px;">${row.reason || ''}</div>
          </div>
          <div style="display:flex; gap:6px; flex-shrink:0;">
            ${hasPdf ? `
              ${row.signedPdfs.draftPdfUrl ? `<a class="btn btn-secondary" href="${row.signedPdfs.draftPdfUrl}" target="_blank" rel="noopener" style="font-size:0.78rem; padding:5px 10px; text-decoration:none;">📄 기안문 PDF</a>` : ''}
              ${row.signedPdfs.regulationPdfUrl ? `<a class="btn btn-secondary" href="${row.signedPdfs.regulationPdfUrl}" target="_blank" rel="noopener" style="font-size:0.78rem; padding:5px 10px; text-decoration:none;">📖 규정 전문 PDF</a>` : ''}
            ` : `
              ${row.snapshotIds?.draft ? `<button type="button" class="btn btn-secondary btn-view-a01-snapshot" data-snap-id="${row.snapshotIds.draft}" style="font-size:0.78rem; padding:5px 10px;">기안문 원문 보기</button>` : ''}
              ${row.snapshotIds?.regulation ? `<button type="button" class="btn btn-secondary btn-view-reg-snapshot" data-snap-id="${row.snapshotIds.regulation}" style="font-size:0.78rem; padding:5px 10px;">규정 전문 보기</button>` : ''}
            `}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function renderMultiTableForm(formDef, savedData) {
  let html = '';
  const tables = formDef.tables || [];

  tables.forEach((tbl) => {
    const tableKey = tbl.id || tbl.key;
    const rows = savedData[tableKey] || (tableKey === 'courses' && savedData.rows ? savedData.rows : [{}]);
    
    html += `
      <div class="form-section" style="margin-bottom:var(--space-xl); background:var(--bg-card); padding:var(--space-md); border-radius:8px; border:1px solid rgba(0,0,0,0.06);">
        <h3 class="form-section-title" style="display:flex; align-items:center; gap:8px; margin-bottom:4px; font-size:1.05rem;">
          <span class="material-symbols-rounded" style="color:var(--primary-color)">table_chart</span>
          ${tbl.title}
        </h3>
        ${tbl.desc ? `<p style="font-size:0.82rem; color:var(--text-secondary); margin:0 0 12px 0;">${tbl.desc}</p>` : ''}
        
        <div class="dynamic-table-wrapper">
          <table class="dynamic-table" id="dynamic-table-${formDef.id}-${tableKey}" data-table-key="${tableKey}">
            <thead><tr>`;

    tbl.columns.forEach(col => {
      html += `<th style="min-width:${col.width || 'auto'}">${col.label}</th>`;
    });
    html += `<th style="width:40px"></th></tr></thead><tbody>`;

    rows.forEach((row, idx) => {
      html += renderTableRow({ ...formDef, columns: tbl.columns }, row, idx, tableKey);
    });

    html += `</tbody></table></div>`;
    
    if (canEdit()) {
      const btnTitle = tbl.title.includes(']') ? tbl.title.split(']')[1].trim() : tbl.title;
      html += `
        <div class="table-actions" style="margin-top:8px;">
          <button class="btn-add-row" data-table-id="${formDef.id}" data-table-key="${tableKey}" style="font-size:0.85rem; padding:4px 12px;">
            <span class="material-symbols-rounded" style="font-size:16px">add</span> ${btnTitle} 행 추가
          </button>
        </div>`;
    }
    html += `</div>`;
  });

  return html;
}

function renderTableRow(formDef, row, idx, tableKey = '') {
  let html = `<tr data-row-idx="${idx}" ${tableKey ? `data-table-key="${tableKey}"` : ''}>`;
  formDef.columns.forEach(col => {
    const val = row[col.key] || '';
    if (col.key === 'no') {
      html += `<td><input type="text" value="${idx + 1}" data-col="${col.key}" readonly style="color:var(--text-tertiary);text-align:center" /></td>`;
    } else if (col.inputType === 'select' || col.type === 'select') {
      let optionsHtml = `<option value="" ${!val ? 'selected' : ''}>선택</option>`;
      if (formDef.id === 'A-01' && col.key === 'before') {
        const reg = getCurrentRegulation();
        optionsHtml += reg.filter(r => r.clauseId !== '').map(r => `<option value="${r.clauseId}" ${val === r.clauseId ? 'selected' : ''}>${r.clauseId}</option>`).join('');
      } else {
        optionsHtml += (col.options || []).filter(o => o !== '').map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('');
      }
      
      html += `<td><select data-col="${col.key}" style="width:100%; padding:6px; border:1px solid var(--border-color); border-radius:4px; font-family:inherit;">
        ${optionsHtml}
      </select></td>`;
    } else if (col.type === 'date') {
      html += `<td><input type="date" value="${val}" data-col="${col.key}" /></td>`;
    } else if (col.type === 'textarea') {
      html += `<td><textarea data-col="${col.key}" placeholder="${col.placeholder || ''}" style="width:100%; min-height:80px; padding:6px; border:1px solid var(--border-color); border-radius:4px; resize:vertical; font-family:inherit;">${val}</textarea></td>`;
    } else {
      html += `<td><input type="text" value="${val}" data-col="${col.key}" placeholder="${col.placeholder || ''}" /></td>`;
    }
  });
  if (canEdit()) {
    html += `<td><button class="btn-delete-row material-symbols-rounded" data-row-idx="${idx}" ${tableKey ? `data-table-key="${tableKey}"` : ''}>close</button></td>`;
  } else {
    html += `<td></td>`;
  }
  html += `</tr>`;
  return html;
}

function renderChecklistForm(formDef, savedData) {
  const checked = savedData.checked || [];
  let html = `<div class="checklist" id="checklist-${formDef.id}">`;

  formDef.items.forEach((item, idx) => {
    const isChecked = checked.includes(idx);
    html += `<div class="checklist-item ${isChecked ? 'checked' : ''}">
      <input type="checkbox" data-idx="${idx}" ${isChecked ? 'checked' : ''} />
      <span class="check-label">${idx + 1}. ${item}</span>
    </div>`;
  });

  const total = formDef.items.length;
  const doneCount = checked.length;
  html += `</div>
    <div style="margin-top:var(--space-md);font-size:0.85rem;color:var(--text-secondary)">
      완료: <strong style="color:var(--status-done)">${doneCount}</strong> / ${total} (${total > 0 ? Math.round(doneCount / total * 100) : 0}%)
    </div>`;

  return html;
}

function renderMixedForm(formDef, savedData) {
  let html = '';

  // Render regular fields
  if (formDef.fields) {
    formDef.fields.forEach(field => {
      let value = savedData[field.key];
      let isAutoFilled = false;
      if (!value && field.key) {
        value = getAutoFillValue(field.key, formDef.id);
        if (value) isAutoFilled = true;
      }
      value = value || field.default || '';
      html += renderField(field, value, savedData);
    });
  }

  // Render table section (single column)
  if (formDef.columns) {
    html += `<div class="form-section">
      <h3 class="form-section-title">${formDef.tableTitle || '상세 내역'}</h3>`;
    html += renderTableForm({ ...formDef, id: formDef.id }, { rows: savedData.rows || formDef.defaultRows || [{}] });
    html += `</div>`;
  }

  // Render multi-tables section
  if (formDef.tables) {
    html += renderMultiTableForm({ ...formDef, tables: formDef.tables }, savedData.tables || savedData);
  }

  return html;
}

function renderMatrixForm(formDef, savedData) {
  const matrixData = savedData.matrix || {};

  let html = `<div class="dynamic-table-wrapper">
    <table class="dynamic-table" id="matrix-table-${formDef.id}">
      <thead><tr><th style="min-width:200px">업무</th>`;

  formDef.matrixCols.forEach(col => {
    html += `<th style="min-width:120px">${col}</th>`;
  });
  html += `</tr></thead><tbody>`;

  formDef.matrixRows.forEach((row, rIdx) => {
    html += `<tr><td style="font-size:0.82rem;padding:var(--space-sm) var(--space-md)">${row}</td>`;
    formDef.matrixCols.forEach((col, cIdx) => {
      const key = `${rIdx}_${cIdx}`;
      const val = matrixData[key] || '';
      html += `<td><select data-matrix-key="${key}">
        <option value="">-</option>
        ${formDef.roleOptions.map(r => `<option value="${r}" ${val === r ? 'selected' : ''}>${r}</option>`).join('')}
      </select></td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  return html;
}

function renderStructuredForm(formDef, savedData) {
  let html = '';

  (formDef.sections || []).forEach(section => {
    let sectionAttrs = '';
    if (section.dependsOn) {
      sectionAttrs = ` data-depends-on-field="${section.dependsOn.field}" data-depends-on-value="${section.dependsOn.value}"`;
    }
    html += `<div class="form-section branching-container"${sectionAttrs}>
      <h3 class="form-section-title">${section.title}</h3>`;

    if (section.type === 'table') {
      const tableKey = section.title.replace(/\s/g, '_');
      const tableFormDef = { ...formDef, tables: [{ id: tableKey, title: '', columns: section.columns }] };
      html += renderMultiTableForm(tableFormDef, savedData);
    } else if (section.type === 'checklist') {
      const checkKey = section.title.replace(/\s/g, '_');
      const checked = savedData[checkKey] || [];
      html += `<div class="checklist" data-check-key="${checkKey}">`;
      section.items.forEach((item, idx) => {
        const isChecked = checked.includes(idx);
        html += `<div class="checklist-item ${isChecked ? 'checked' : ''}">
          <input type="checkbox" data-idx="${idx}" data-check-key="${checkKey}" ${isChecked ? 'checked' : ''} />
          <span class="check-label">${item}</span>
        </div>`;
      });
      html += `</div>`;
    } else if (section.fields) {
      section.fields.forEach(field => {
        let value = savedData[field.key];
        let isAutoFilled = false;
        if (!value && field.key) {
          value = getAutoFillValue(field.key, formDef.id);
          if (value) isAutoFilled = true;
        }
        value = value || field.default || '';
        html += renderField(field, value, savedData);
      });
    }

    html += `</div>`;
  });

  return html;
}

function renderQAForm(formDef, savedData) {
  let html = '';

  (formDef.questions || []).forEach(q => {
    let value = savedData[q.key];
    let isAutoFilled = false;
    if (!value && q.key) {
      value = getAutoFillValue(q.key, formDef.id);
      if (value) isAutoFilled = true;
    }
    value = value || q.default || '';
    html += `<div class="form-group" style="margin-bottom:var(--space-lg)">
      <label style="font-size:0.9rem;font-weight:600;color:var(--accent-blue)">
        Q${q.number}. ${q.question}
      </label>`;

    if (q.answer) {
      html += `<div style="font-size:0.78rem;color:var(--text-tertiary);margin-bottom:var(--space-xs)">가이드: ${q.answer}</div>`;
    }

    if (q.type === 'textarea') {
      html += `<textarea class="form-textarea" data-field="${q.key}" placeholder="${q.placeholder || ''}">${value}</textarea>`;
    } else {
      html += `<input class="form-input" type="text" data-field="${q.key}" value="${value}" placeholder="${q.placeholder || ''}" />`;
    }

    html += `</div>`;
  });

  return html;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 법정 서식이 없는 첨부문서(수출계약서·영업증명서·기술사양서 등)를 원본 파일 그대로 업로드해
// 관리하는 공용 폼. bindFileManagerEvents()가 업로드/삭제 직후 Firestore에 즉시 반영한다.
function renderFileManagerForm(formDef, savedData) {
  const attachments = Array.isArray(savedData.attachments) ? savedData.attachments : [];
  const categories = formDef.fileCategories || ['기타'];

  let html = `<div class="file-manager" id="file-manager-${formDef.id}" data-attachments="${escapeAttr(JSON.stringify(attachments))}">
    <div class="form-group" style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; margin-bottom:var(--space-lg); padding:16px; background:var(--bg-secondary); border-radius:8px;">
      <div style="flex:1; min-width:160px;">
        <label class="form-label">분류</label>
        <select class="form-select" id="fm-category-${formDef.id}">
          ${categories.map(c => `<option value="${escapeAttr(c)}">${c}</option>`).join('')}
        </select>
      </div>
      <div style="flex:2; min-width:220px;">
        <label class="form-label">비고 (선택)</label>
        <input class="form-input" type="text" id="fm-note-${formDef.id}" placeholder="예: 2026년 3월 갱신본" />
      </div>
      <div>
        <input type="file" id="fm-file-${formDef.id}" style="display:none" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx" />
        <button type="button" class="btn btn-primary" id="fm-upload-btn-${formDef.id}">
          <span class="material-symbols-rounded" style="font-size:1.1rem; vertical-align:middle;">upload_file</span> 파일 선택 및 업로드
        </button>
      </div>
    </div>
    <div id="fm-list-${formDef.id}">
      ${renderAttachmentList(formDef.id, attachments)}
    </div>
  </div>`;

  return html;
}

function renderAttachmentList(formId, attachments) {
  if (!attachments || attachments.length === 0) {
    return `<div style="color:var(--text-tertiary); font-size:0.88rem; padding:12px;">아직 첨부된 파일이 없습니다.</div>`;
  }
  const byCategory = {};
  attachments.forEach(a => {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  });

  let html = '';
  Object.entries(byCategory).forEach(([category, items]) => {
    html += `<div style="margin-bottom:16px;">
      <div style="font-weight:600; font-size:0.85rem; color:var(--accent-blue); margin-bottom:6px;">${category} (${items.length})</div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        ${items.map(a => `
          <div class="doc-item" style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:6px;">
            <span class="material-symbols-rounded" style="color:var(--text-tertiary);">description</span>
            <div style="flex:1; min-width:0;">
              <div style="font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${a.fileName}</div>
              <div style="font-size:0.75rem; color:var(--text-tertiary);">
                ${new Date(a.uploadedAt).toLocaleString('ko-KR')} · ${a.uploadedBy || ''} ${a.note ? '· ' + a.note : ''}
              </div>
            </div>
            <a href="${a.downloadURL}" target="_blank" class="btn btn-outline" style="padding:4px 10px; font-size:0.78rem;">열기</a>
            <button type="button" class="btn btn-outline fm-delete-btn" data-form-id="${formId}" data-attachment-id="${a.id}" style="padding:4px 10px; font-size:0.78rem; color:var(--accent-red); border-color:var(--accent-red);">삭제</button>
          </div>
        `).join('')}
      </div>
    </div>`;
  });
  return html;
}

function showSyncAlert(title, message) {
  customAlert(title, message, 'error');
}

// file_manager 폼(L-11 등)의 업로드/삭제 버튼을 바인딩한다.
// 업로드/삭제는 "저장" 버튼을 기다리지 않고 즉시 Firestore에 반영한다(파일 업로드 자체가
// 비동기 I/O이므로 저장 시점까지 미루면 새로고침 시 유실될 수 있기 때문).
function bindFileManagerEvents(formDef, container) {
  const root = container.querySelector(`#file-manager-${formDef.id}`);
  if (!root) return;

  const uploadBtn = container.querySelector(`#fm-upload-btn-${formDef.id}`);
  const fileInput = container.querySelector(`#fm-file-${formDef.id}`);
  const listEl = container.querySelector(`#fm-list-${formDef.id}`);
  if (!uploadBtn || !fileInput || !listEl) return;

  const getAttachments = () => {
    try { return JSON.parse(root.dataset.attachments || '[]'); } catch (e) { return []; }
  };
  const setAttachments = (arr) => {
    root.dataset.attachments = JSON.stringify(arr);
    listEl.innerHTML = renderAttachmentList(formDef.id, arr);
    bindDeleteButtons();
  };
  const persist = async (arr) => {
    const txId = isTxForm(formDef.id) ? getSelectedTransactionId() : null;
    const current = isTxForm(formDef.id) ? getCaseFormData(formDef.id, txId) : getFormData(formDef.id);
    const nextData = { ...current, attachments: arr };
    if (isTxForm(formDef.id)) {
      await setCaseFormData(formDef.id, txId, nextData);
    } else {
      await setFormData(formDef.id, nextData);
    }
  };

  uploadBtn.addEventListener('click', () => {
    if (!canEdit()) { customToast('편집 권한이 없습니다.', 'warning'); return; }
    fileInput.click();
  });

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const category = container.querySelector(`#fm-category-${formDef.id}`)?.value || '기타';
    const note = container.querySelector(`#fm-note-${formDef.id}`)?.value || '';
    const txId = isTxForm(formDef.id) ? getSelectedTransactionId() : null;

    const originalHtml = uploadBtn.innerHTML;
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = `<span class="material-symbols-rounded" style="animation:spin 1s linear infinite">sync</span> 업로드 중...`;
    try {
      const meta = await uploadAttachment(txId, formDef.id, file, category, { note, uploadedBy: getCurrentUser()?.name || getCurrentUser()?.email || '' });
      const next = [...getAttachments(), meta];
      setAttachments(next);
      await persist(next);
      customToast('파일이 첨부되었습니다.', 'success');
    } catch (e) {
      customAlert('업로드 실패', e.message || String(e), 'error');
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.innerHTML = originalHtml;
      fileInput.value = '';
    }
  });

  function bindDeleteButtons() {
    container.querySelectorAll(`#fm-list-${formDef.id} .fm-delete-btn`).forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!canEdit()) { customToast('편집 권한이 없습니다.', 'warning'); return; }
        const attId = btn.dataset.attachmentId;
        const target = getAttachments().find(a => a.id === attId);
        const confirmed = await customConfirm('첨부파일 삭제', `"${target ? target.fileName : ''}" 파일을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`, { danger: true, confirmText: '삭제' });
        if (!confirmed) return;
        if (target) await deleteAttachment(target.storagePath);
        const next = getAttachments().filter(a => a.id !== attId);
        setAttachments(next);
        await persist(next);
        customToast('삭제되었습니다.', 'success');
      });
    });
  }

  bindDeleteButtons();
}

function renderField(field, value, savedData = {}) {
  let attrs = '';
  if (field.dependsOn) {
    attrs = ` data-depends-on-field="${field.dependsOn.field}" data-depends-on-value="${field.dependsOn.value}"`;
  }
  let html = `<div class="form-group branching-container"${attrs}>
    <label class="form-label">${field.label}${field.required ? '<span class="required">*</span>' : ''}</label>`;

  if (field.description) {
    html += `<div style="font-size:0.8rem; color:var(--text-tertiary); margin-bottom:var(--space-sm);">${field.description}</div>`;
  }

  if (field.type === 'textarea') {
    html += `<textarea class="form-textarea" data-field="${field.key}" placeholder="${field.placeholder || ''}" ${canEdit() ? '' : 'readonly'}>${value}</textarea>`;
  } else if (field.type === 'select') {
    html += `<select class="form-select" data-field="${field.key}" ${canEdit() ? '' : 'disabled'}>
      <option value="" ${!value ? 'selected' : ''}>선택</option>
      ${(field.options || []).filter(o => o !== '').map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o}</option>`).join('')}
    </select>`;
  } else if (field.type === 'date') {
    // 기안일(draftDate)은 시스템이 자동으로 찍는 값이라 사람이 직접 고칠 수 없다.
    const isSystemStamped = field.key === 'draftDate';
    html += `<input class="form-input" type="date" data-field="${field.key}" value="${value}" ${(canEdit() && !isSystemStamped) ? '' : 'readonly'} ${isSystemStamped ? 'title="기안일은 문서 생성 시점에 시스템이 자동으로 기록하며 수정할 수 없습니다."' : ''} />`;
  } else if (field.type === 'destination_combobox') {
    let datalistOptions = DESTINATION_COUNTRIES.map(c => `<option value="${c.name}"></option>`).join('');
    html += `<input class="form-input dest-combobox" type="text" list="country-list-${field.key}" data-field="${field.key}" placeholder="국가명을 입력하거나 선택하세요" value="${value}" ${canEdit() ? '' : 'readonly'} />
      <datalist id="country-list-${field.key}">${datalistOptions}</datalist>`;
  } else if (field.type === 'party_with_country') {
    let datalistOptions = DESTINATION_COUNTRIES.map(c => `<option value="${c.name}"></option>`).join('');
    const countryValue = savedData[`${field.key}_country`] || '';
    html += `
      <div style="display: flex; gap: 12px; align-items: center;">
        <div style="flex: 2;">
          <input class="form-input" type="text" data-field="${field.key}" value="${value}" placeholder="${field.placeholder || ''}" ${canEdit() ? '' : 'readonly'} />
        </div>
        <div style="flex: 1; min-width: 140px;">
          <input class="form-input dest-combobox" type="text" list="country-list-${field.key}_country" data-field="${field.key}_country" placeholder="소재 국가 선택" value="${countryValue}" ${canEdit() ? '' : 'readonly'} />
          <datalist id="country-list-${field.key}_country">${datalistOptions}</datalist>
        </div>
      </div>
    `;
  } else if (field.type === 'result_panel') {
    html += `
      <div id="dynamic-result-${field.key}" style="padding:16px 20px; background:var(--bg-secondary); border-radius:8px; border-left:5px solid var(--border-color); font-size:0.95rem; line-height:1.6; color:var(--text-primary); transition: all 0.3s ease;">
        위 문항들을 순서대로 응답하시면 최종 수출 통제/허가 진단 결과가 여기에 표시됩니다.
      </div>
    `;
  } else if (field.type === 'csl_api_scan') {
    html += `
      <div style="margin-top:8px; display:flex; align-items:center; gap:12px;">
        <button type="button" class="btn-run-csl-scan" style="background:var(--accent-blue); color:white; padding:8px 16px; border-radius:6px; font-weight:bold; border:none; cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded" style="font-size:18px;">search</span> 미국 CSL 실시간 검색
        </button>
        <span class="csl-scan-result" style="font-size:0.9rem; font-weight:bold;"></span>
      </div>
    `;
  } else if (field.type === 'checkbox_group') {
    html += `<div class="checkbox-group" style="margin-top:8px; display:flex; flex-direction:column; gap:8px;">`;
    // We expect value to be a comma separated string if saved, or an array
    const savedVals = (value || '').split(',').map(v => v.trim());
    (field.options || []).forEach((opt, idx) => {
      const isChecked = savedVals.includes(opt);
      html += `<label style="display:flex; align-items:flex-start; gap:8px; font-size:0.85rem; cursor:pointer;">
        <input type="checkbox" value="${opt}" class="cb-group-${field.key}" ${isChecked ? 'checked' : ''} ${canEdit() ? '' : 'disabled'} style="margin-top:3px;" />
        <span>${opt}</span>
      </label>`;
    });
    // Add a hidden input to store the actual combined value
    html += `<input type="hidden" data-field="${field.key}" value="${value || ''}" id="hidden-${field.key}" />`;
    html += `</div>`;
  } else if (field.type === 'search_widget') {
    html += `<div class="search-widget-container" id="widget-container-${field.key}" style="border:1px solid var(--border-color); border-radius:8px; overflow:hidden;">
      <!-- Widget will be mounted here -->
    </div>`;
  } else if (field.type === 'checkbox') {
    html += `<div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
      <input type="checkbox" data-field="${field.key}" id="cb-${field.key}" ${value ? 'checked' : ''} ${canEdit() ? '' : 'disabled'} style="width:18px; height:18px;" />
      <label for="cb-${field.key}" style="font-size:0.9rem; cursor:pointer;">${field.labelText || field.label}</label>
    </div>`;
  } else if (field.type === 'info') {
    html += `<div style="padding:12px 16px; background:var(--bg-secondary); border-radius:6px; border-left:4px solid var(--accent-blue); font-size:0.85rem; color:var(--text-primary); margin-top:4px;">
      ${field.content}
    </div>`;
  } else if (field.type === 'readonly') {
    // [Fix #4] 스냅샷 보존: 잠긴 거래의 서류는 autoFillFrom 자동 주입을 차단한다.
    // getCaseFormData에 이미 저장된 값(=확정 당시 등급)이 있으면 그 값을 우선 사용한다.
    // → CP 등급이 AA → AAA로 바뀌어도 과거 확정 판정서는 'AA'로 보존됨.
    let readonlyValue = value; // value는 저장된 데이터 (savedData[field.key])
    if (field.autoFillFrom === 'targetGrade') {
      // 저장된 값이 이미 있으면(잠금 포함) 그대로 유지, 없으면 현재 targetGrade 주입
      readonlyValue = (value && value !== '') ? value : (getTargetGrade() || '-');
    }
    html += `<div style="padding:10px 14px; background:var(--bg-secondary); border-radius:6px;
      border:1px solid var(--border-color); color:var(--text-primary); font-weight:600;
      display:flex; align-items:center; gap:8px;">
      <span class="material-symbols-rounded" style="font-size:1rem; color:var(--accent-blue);">lock</span>
      ${readonlyValue || '-'}
    </div>
    <input type="hidden" data-field="${field.key}" value="${readonlyValue}" />`;
  } else if (field.type === 'product_history') {
    const prods = getProducts();
    const currId = getSelectedProductId();
    
    html += `<div style="margin-bottom:var(--space-md); overflow-x:auto;">
      <table class="data-table" style="width:100%; text-align:left; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="background:var(--bg-tertiary); border-bottom:2px solid var(--border-color);">
            <th style="padding:10px;">제품명 (모델명)</th>
            <th style="padding:10px;">최종 통제번호</th>
            <th style="padding:10px;">판정 방식</th>
            <th style="padding:10px;">판정 일자</th>
            <th style="padding:10px;">판정 사양 요약</th>
            <th style="padding:10px; width:120px;">비고 (액션)</th>
          </tr>
        </thead>
        <tbody>`;

    if (prods && prods.length > 0) {
      prods.forEach(p => {
        const isCurrent = p.id === currId;
        const hasHistory = p.controlNumber && p.controlNumber !== '-';
        
        let rowStyle = 'border-bottom:1px solid var(--border-color);';
        if (isCurrent) {
          rowStyle += ' background:rgba(16,185,129,0.05); border-left:4px solid var(--accent-green);';
        }
        
        html += `<tr style="${rowStyle}">
          <td style="padding:10px; font-weight:${isCurrent ? '700' : 'normal'}; color:${isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)'};">
            ${p.name}<br/>
            <span style="font-size:0.75rem; color:var(--text-tertiary);">${p.model || '-'}</span>
          </td>
          <td style="padding:10px; font-weight:600; color:${hasHistory ? 'var(--primary-color)' : 'var(--text-tertiary)'};">
            ${p.controlNumber || '-'}
          </td>
          <td style="padding:10px; color:var(--text-secondary);">${p.classificationType || '-'}</td>
          <td style="padding:10px; color:var(--text-secondary);">${p.classificationDate || '-'}</td>
          <td style="padding:10px; color:var(--text-secondary); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.specSummary || ''}">
            ${p.specSummary || '-'}
          </td>
          <td style="padding:10px;">`;
        
        if (isCurrent && hasHistory) {
          html += `<button type="button" class="btn btn-secondary btn-autofill-history" data-prod-id="${p.id}" style="font-size:0.75rem; padding:4px 8px; border-color:var(--accent-green); color:var(--accent-green); display:flex; align-items:center; gap:4px; font-weight:600; cursor:pointer;">
              <span class="material-symbols-rounded" style="font-size:0.9rem;">download</span> 불러오기
            </button>`;
        } else if (isCurrent) {
          html += `<span style="font-size:0.75rem; color:var(--accent-green); font-weight:600;">현재 대상(이력 없음)</span>`;
        } else {
          html += `<span style="font-size:0.75rem; color:var(--text-tertiary);">타 제품</span>`;
        }
        
        html += `</td></tr>`;
      });
    } else {
      html += `<tr><td colspan="6" style="padding:20px; text-align:center; color:var(--text-tertiary);">등록된 제품 마스터 데이터가 없습니다.</td></tr>`;
    }

    html += `</tbody>
      </table>
    </div>
    <input type="hidden" data-field="${field.key}" value="table_rendered" />`;
  } else if (field.type === 'exemption_history') {
    const txs = getTransactions();
    
    html += `<div style="margin-bottom:var(--space-md); overflow-x:auto;">
      <table class="data-table" style="width:100%; text-align:left; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="background:var(--bg-tertiary); border-bottom:2px solid var(--border-color);">
            <th style="padding:10px;">보고 종류</th>
            <th style="padding:10px;">거래명 (선적일)</th>
            <th style="padding:10px;">통제번호 / 수출국가</th>
            <th style="padding:10px;">수출자 및 수요자</th>
            <th style="padding:10px;">수출신고수리 및 B/L 번호</th>
            <th style="padding:10px;">허가면제 사유</th>
          </tr>
        </thead>
        <tbody>`;

    let hasData = false;
    
    txs.forEach(tx => {
      ['K-01', 'K-02'].forEach(kForm => {
        const data = getCaseFormData(kForm, tx.id);
        // K-01/K-02에 의미있는 데이터(예: destCountry 등)가 저장되어 있는지 확인
        if (data && Object.keys(data).length > 0 && (data.controlNo || data.destCountry || data.exemptionReason)) {
          hasData = true;
          const reportType = kForm === 'K-01' ? '사전거래보고 (K-01)' : '사후거래보고 (K-02)';
          const shipDate = data.shipDate || '-';
          const dest = data.destCountry || '-';
          const controlNo = data.controlNo || '-';
          const exporter = (data.exporter || '').split('\\n')[0] || '-';
          const eu = (data.endUser || '').split('\\n')[0] || '-';
          const declNo = data.exportDeclNo || '-';
          const blNo = data.blNumber || '-';
          const reason = data.exemptionReason || '-';

          html += `<tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:10px; font-weight:600; color:var(--accent-blue);">${reportType}</td>
            <td style="padding:10px; font-weight:700;">${tx.name}<br/><span style="font-weight:normal; font-size:0.75rem; color:var(--text-secondary);">${shipDate}</span></td>
            <td style="padding:10px;">${controlNo}<br/><span style="font-size:0.75rem; color:var(--text-secondary);">${dest}</span></td>
            <td style="padding:10px; font-size:0.8rem; line-height:1.4; color:var(--text-secondary);">[수출] ${exporter}<br/>[수요] ${eu}</td>
            <td style="padding:10px; font-size:0.8rem; color:var(--text-secondary);">신고: ${declNo}<br/>B/L: ${blNo}</td>
            <td style="padding:10px; max-width:250px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${reason}">${reason}</td>
          </tr>`;
        }
      });
    });

    if (!hasData) {
      html += `<tr><td colspan="6" style="padding:30px; text-align:center; color:var(--text-tertiary);">제출/보관된 허가면제 수출 실적이 존재하지 않습니다.</td></tr>`;
    }

    html += `</tbody>
      </table>
    </div>
    <div style="margin-top:10px; font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
      💡 <strong>안내:</strong> 위 표는 시스템에 저장된 모든 수출 거래(Export Case) 파일들을 자동 스캔하여, <strong>K-01(사전보고) 및 K-02(사후보고)</strong> 서식이 작성된 건만 추출하여 집계한 통합 대장입니다. 반기별 정기 보고(K-04) 시 이 데이터를 복사하여 활용하십시오.
    </div>
    <input type="hidden" data-field="${field.key}" value="exemption_history_rendered" />`;
  } else {
    const isReadOnly = field.readonly || !canEdit();
    html += `<input class="form-input" type="text" data-field="${field.key}" value="${value}" placeholder="${field.placeholder || ''}" ${isReadOnly ? 'readonly style="background:var(--bg-secondary); font-weight:600; color:var(--text-primary);"' : ''} />`;
  }

  if (field.externalLink) {
    html += `<div style="margin-top:var(--space-sm);">
      <button class="btn btn-secondary" onclick="window.open('${field.externalLink.url}', '_blank')" style="font-size:0.8rem; padding:var(--space-xs) var(--space-sm);">
        ${field.externalLink.label}
      </button>
    </div>`;
  }

  html += `</div>`;
  return html;
}

// 여러 서식에서 공유되는 필드 키 → 충돌 알림에 쓸 사람이 읽기 좋은 이름.
// (formTemplates.js는 sections/fields 메타데이터가 없어 라벨을 이렇게 따로 관리한다.)
const FIELD_KEY_LABELS = {
  companyName: '상호(회사명)', exporterCompany: '상호(회사명)', exporterName: '상호(회사명)',
  ceoName: '대표자', exporterCeo: '대표자',
  regNumber: '사업자등록번호', exporterRegNum: '사업자등록번호',
  tradeCode: '무역업고유번호', exporterTradeBizNo: '무역업고유번호',
  address: '주소', exporterAddress: '주소',
  hsCode: 'HS 번호', controlNo: '통제번호', classNo: '판정번호',
  itemSpec: '품명 및 규격', itemName: '품명',
  destCountry: '목적지국가', quantity: '수량',
  buyerName: '구매자 상호', consigneeName: '최종수하인 상호', endUserName: '최종사용자 상호',
  buyerCeo: '구매자 대표자', consigneeCeo: '최종수하인 대표자', endUserCeo: '최종사용자 대표자',
  buyerPhone: '구매자 전화번호', consigneePhone: '최종수하인 전화번호', endUserPhone: '최종사용자 전화번호',
  buyerAddress: '구매자 주소', consigneeAddress: '최종수하인 주소', endUserAddress: '최종사용자 주소',
  blNumber: 'B/L 번호', exportDeclNo: '수출신고수리번호', contactPerson: '실무담당자',
};

function fieldLabel(key) {
  return FIELD_KEY_LABELS[key] || key;
}

// ── 서식 간 값 충돌 감지 및 해결 ──
// 사용자가 다른 서식에 이미 저장된 값과 다르게 입력한 필드를 찾아, "이 서식만 다르게" 또는
// "이 시점부터 이후 서식에 적용"(필요 시 이미 채워진 뒤쪽 서식까지 덮어쓸지도 별도로 확인) 중 선택하게 한다.
// 반환값: [{ key, value, scope: 'forward'|'isolated', overwriteFilled }] — scope==='forward'인 항목은
// 저장 이후 propagateFieldForward로 실제 전파를 수행해야 한다. data 객체는 필요 시 _isolatedFields가 채워진다.
async function resolveFieldConflicts(formDef, data) {
  const resolutions = [];
  const prevData = isTxForm(formDef.id)
    ? getCaseFormData(formDef.id, getSelectedTransactionId())
    : getFormData(formDef.id);

  const keysToCheck = Object.keys(data).filter(k => !k.startsWith('_') && typeof data[k] === 'string' && data[k].trim() !== '');

  for (const key of keysToCheck) {
    const newVal = data[key];
    const prevVal = (prevData && prevData[key]) || '';
    if (newVal === prevVal) continue; // 이 서식에서 지난 저장 이후 바뀌지 않음 — 이미 결정된 사안이면 다시 묻지 않음

    const sources = getFieldSources(key, formDef.id);
    if (sources.length === 0) continue; // 다른 서식에 이 키를 쓰는 곳이 아예 없음 — 비교 대상 없음

    const reference = sources.reduce((a, b) => {
      const ta = new Date(a.lastModifiedAt || 0).getTime();
      const tb = new Date(b.lastModifiedAt || 0).getTime();
      return tb > ta ? b : a;
    });
    if (reference.value === newVal) continue; // 이미 다른 서식들과 같은 값 — 충돌 아님

    const label = fieldLabel(key);
    const wantForward = await customConfirm(
      '다른 서식과 값이 다릅니다',
      `'${label}' 항목이 ${reference.formId} 서식에는 '${reference.value}'로 되어 있는데, 이 서식에는 '${newVal}'로 다르게 입력하셨습니다.\n\n이후 이어지는 서식에도 이 값을 적용할까요?`,
      { confirmText: '이 시점부터 이후 서식에 적용', cancelText: '이 서식만 다르게 적용' }
    );

    if (!wantForward) {
      // 이 서식만 다르게 — 다른 서식의 자동입력 소스로 쓰이지 않도록 격리 표시
      data._isolatedFields = Array.from(new Set([...(data._isolatedFields || []), key]));
      resolutions.push({ key, value: newVal, scope: 'isolated' });
      continue;
    }

    const downstreamFilled = getDownstreamFilledForms(key, formDef.id);
    let overwriteFilled = false;
    if (downstreamFilled.length > 0) {
      const downstreamNames = [...new Set(downstreamFilled.map(d => d.formId))].join(', ');
      overwriteFilled = await customConfirm(
        '이미 작성된 뒤쪽 서식도 변경할까요?',
        `'${label}' 항목은 이미 작성 완료된 다음 서식(${downstreamNames})에도 저장되어 있습니다.\n\n그 서식들의 값도 지금 새 값으로 덮어쓸까요?`,
        { confirmText: '예, 덮어쓰기', cancelText: '아니오, 앞으로 채울 서식에만 적용', danger: true }
      );
    }
    resolutions.push({ key, value: newVal, scope: 'forward', overwriteFilled });
  }

  return resolutions;
}

function bindFormEvents(formDef, container) {
  const isProductSpecific = ['F-01', 'F-02', 'F-03', 'Z-01', 'G-01', 'H-01'].includes(formDef.id);
  const selectedProdId = isProductSpecific ? getSelectedProductId() : null;

  // ── 이전/다음 서식 구조적 이동 (전체 흐름 진행 위치 표시 바의 버튼) ──
  const prevFormBtn = container.querySelector('#btn-prev-form');
  if (prevFormBtn && !prevFormBtn.disabled) {
    prevFormBtn.addEventListener('click', () => {
      const pos = getFormPosition(formDef.id);
      if (pos?.prevFormId && window.appRouter) window.appRouter.navigate('form', pos.prevFormId);
    });
  }
  const nextFormBtn = container.querySelector('#btn-next-form');
  if (nextFormBtn && !nextFormBtn.disabled) {
    nextFormBtn.addEventListener('click', () => {
      const pos = getFormPosition(formDef.id);
      if (pos?.nextFormId && window.appRouter) window.appRouter.navigate('form', pos.nextFormId);
    });
  }

  // ── Branching Logic (Skip Logic) Evaluator ──
  function evaluateBranching() {
    function isElementVisible(elem) {
      let curr = elem;
      while (curr && curr !== container) {
        if (curr.style && curr.style.display === 'none') {
          return false;
        }
        curr = curr.parentElement;
      }
      return true;
    }

    // Multiple passes to cleanly resolve nested/cascading dependencies
    for (let pass = 0; pass < 3; pass++) {
      const containers = container.querySelectorAll('.branching-container[data-depends-on-field]');
      containers.forEach(el => {
        const depField = el.dataset.dependsOnField;
        const depValRaw = el.dataset.dependsOnValue;
        
        const depInput = container.querySelector(`[data-field="${depField}"]`);
        if (depInput) {
          const allowedVals = depValRaw.split(',').map(v => v.trim());
          // If the dependency field itself is hidden inside an inactive container/section, it cannot trigger child fields
          const isDepInputVisible = isElementVisible(depInput);
          const inputVal = depInput.type === 'checkbox' ? (depInput.checked ? 'true' : 'false') : depInput.value;

          if (isDepInputVisible && allowedVals.includes(inputVal)) {
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
        }
      });
    }

    // Dynamic Result Evaluator for Z-01
    if (formDef.id === 'Z-01') {
      const resultPanel = container.querySelector('#dynamic-result-q_result');
      if (resultPanel) {
        const getValue = (key) => {
          const el = container.querySelector(`[data-field="${key}"]`);
          return isElementVisible(el) ? el.value : '';
        };

        const type = getValue('q0_type');
        const transferType = getValue('q0_transfer_type');
        const defense = getValue('q_defense');
        const strategic = getValue('q_strategic');
        const usEar = getValue('q_us_ear');
        const exempt = getValue('q_exempt');
        const exclude = getValue('q_exclude');
        const indivFast = getValue('q_indiv_fast');
        const catchall = getValue('q_catchall');
        const denied = getValue('q_denied');
        const redflag = getValue('q_redflag');

        let resultHtml = '위 문항들을 순서대로 응답하시면 최종 수출 통제/허가 진단 결과가 여기에 표시됩니다.';
        let color = 'var(--border-color)';
        let bg = 'var(--bg-secondary)';

        if (type === '수입' || type === '중개' || type === '환적/경유') {
          resultHtml = `<strong>📌 수입/환적/중개 거래</strong><br/>대외무역법 및 수출통제 법령에 따른 관련 요건(수입목적확인서 발급 등)을 별도로 확인 후 진행하시기 바랍니다.
          <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(0,0,0,0.03); border-radius:6px;">
            <strong>📝 준비 서류 안내</strong><br/>
            • <strong>[M-01] 수입목적확인서:</strong> 수출국에서 요구할 경우 YesTrade 신청<br/>
            • <strong>[M-02] 수입내역 신고서:</strong> 수입 통관 후 1개월 이내
          </div>`;
          color = 'var(--accent-blue)';
        } else if (type === '수출') {
          if (defense === '예') {
            resultHtml = `<strong>🛡️ 방위사업청 관할 (방산물자 등)</strong><br/>해당 품목은 대외무역법이 아닌 방위사업법의 통제를 받습니다.<br/>방산수출입지원시스템(D4B)을 통해 수출허가를 신청하십시오. (자율준수무역거래자 특례 적용 가능)
            <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(0,0,0,0.03); border-radius:6px;">
              <strong>📝 준비 서류 안내 (D4B 제출용)</strong><br/>
              • 수출허가신청서 (방사청 서식)<br/>
              • 수출계약서 및 최종사용자 증명서<br/>
              <span style="color:var(--text-secondary);">※ CP(자율준수) 특례: 과거 동일 조건 수출 실적이 있다면 서류 일부 면제 가능</span>
            </div>`;
            color = 'var(--accent-blue)';
            bg = 'rgba(59,130,246,0.05)';
          } else if (strategic === '해당') {
            if (exempt === '예') {
              resultHtml = `<strong>✅ 전략물자 수출허가 면제 대상 (고시 제26조)</strong><br/>선택하신 사유로 인해 사전 수출허가가 면제됩니다.<br/><br/>
              <span style="font-size:0.85rem; color:var(--text-secondary); display:block; margin-top:8px; padding:8px; background:rgba(0,0,0,0.03); border-radius:6px;"><strong>📌 [K-02] 사후거래보고 의무 안내:</strong><br/>• <strong>언제:</strong> 실제 수출(선적)이 완료된 이후 정해진 기한 내에<br/>• <strong>누구에게:</strong> 무역안보관리원(온라인 YesTrade 시스템을 통해)<br/>• <strong>이유:</strong> 사전 허가를 면제받은 대신, 사후에 "우리가 이런 면제 사유로 문제없이 수출했다"는 증빙 서류와 내역을 정부에 신고하여 사후 관리를 받기 위함입니다.</span>
              
              <div style="font-size:0.85rem; padding:10px; background:rgba(16,185,129,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(16,185,129,0.2);">
                <strong>📝 필수 서류 안내 (면제 증빙용)</strong><br/>
                • <strong>[K-02] 사후거래보고서:</strong> YesTrade 제출용<br/>
                • <strong>면제사유 입증 서류:</strong> (예: 1만불 이하 인보이스, 전시회 참가증명서, 무상수리 계약서 등) 내부 보관<br/>
                <span style="color:var(--accent-red); font-weight:600;">※ 면제: [L-01] 개별수출허가 신청 및 [L-04] 최종사용자 서약서 제출 생략</span>
              </div>`;
              color = 'var(--accent-green)';
              bg = 'rgba(16,185,129,0.05)';
            } else {
              if (exclude === '예') {
                if (indivFast === '예') {
                  resultHtml = `<strong>⚠️ 개별수출허가 대상 (처리기간 단축 가능)</strong><br/>포괄허가 원천 배제 품목이나 자율준수무역거래자(AA등급 이상) 혜택으로 <strong>개별수출허가 처리기간이 단축</strong>됩니다 (예: 15일 ➔ 5일).
                  <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(245,158,11,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(245,158,11,0.2);">
                    <strong>📝 필수 서류 안내 (YesTrade 개별허가 제출용)</strong><br/>
                    • <strong>[L-01] 개별수출허가 신청서</strong><br/>
                    • <strong>[L-04] 최종사용자 서약서 (EUC)</strong><br/>
                    • 수출계약서 또는 수입국 발행 수입증명서(IC)<br/>
                    <span style="color:var(--accent-green); font-weight:600;">※ CP 혜택: 기술/카달로그 사양서 제출 면제, 처리기간 5일로 단축</span>
                  </div>`;
                  color = 'var(--accent-orange)';
                  bg = 'rgba(245,158,11,0.05)';
                } else {
                  resultHtml = `<strong>🚨 개별수출허가 대상 (일반)</strong><br/>포괄허가 배제 품목이므로 <strong>[L-01] 전략물자 개별수출허가</strong>를 YesTrade를 통해 반드시 신청 및 발급받은 후 선적해야 합니다.
                  <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(239,68,68,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(239,68,68,0.2);">
                    <strong>📝 필수 서류 안내 (YesTrade 개별허가 제출용)</strong><br/>
                    • <strong>[L-01] 개별수출허가 신청서</strong><br/>
                    • <strong>[L-04] 최종사용자 서약서 (EUC)</strong> (수입자 명판/직인 필수)<br/>
                    • 품목 명세서 (카달로그, 사양서 등)<br/>
                    • 수출계약서 또는 수입국 발행 수입증명서(IC)<br/>
                    <span style="color:var(--accent-red);">※ 법정 처리기간: 15일 내외 소요 (단축 혜택 불가)</span>
                  </div>`;
                  color = 'var(--accent-red)';
                  bg = 'rgba(239,68,68,0.05)';
                }
              } else {
                resultHtml = `<strong>✅ CP 자율수출통제 (포괄수출허가 대상)</strong><br/>자율준수무역거래자 등급 혜택에 따라 정부의 사전 승인 없이 자사 책임하에 <strong>[L-02] 전략물자 포괄수출허가</strong>를 적용받아 수출을 즉시 진행할 수 있습니다.<br/><br/><span style="font-size:0.85rem; color:var(--text-secondary); display:block; margin-top:8px; padding:8px; background:rgba(0,0,0,0.03); border-radius:6px;"><strong>📌 [K-01] 사전거래보고 의무 안내:</strong><br/>• <strong>언제:</strong> 제품이 항구/공항에서 <strong>선적되기 전</strong>에<br/>• <strong>누구에게:</strong> 무역안보관리원(온라인 YesTrade 시스템을 통해)<br/>• <strong>이유:</strong> 매번 15일씩 걸리는 개별허가 심사를 면제해 주는 대신, "포괄허가 권한으로 이런 물건을 내보낸다"는 내역명세서를 정부에 미리 통보하는 최소한의 안전장치입니다. (블랙리스트 변동 시 정부의 긴급 차단 목적)</span>
                
                <div style="font-size:0.85rem; padding:10px; background:rgba(16,185,129,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(16,185,129,0.2);">
                  <strong>📝 필수 서류 안내 (YesTrade 및 내부 보관용)</strong><br/>
                  • <strong>[K-01] 사전거래보고서:</strong> 선적 전 YesTrade 제출<br/>
                  • <strong>[L-02] 포괄수출허가 관리:</strong> 기업 자체적으로 허가증 차감/관리<br/>
                  • <strong>[L-04] 최종사용자 서약서:</strong> YesTrade 제출 면제! (단, 내부적으로 징구하여 5년간 의무 보관해야 함)<br/>
                  <span style="color:var(--accent-green); font-weight:600;">※ CP 최대 혜택: 개별허가(15일) 완벽 면제, 거래 즉시 선적 가능</span>
                </div>`;
                color = 'var(--accent-green)';
                bg = 'rgba(16,185,129,0.05)';
              }
            }
          } else if (strategic === '비해당') {
            if (catchall === '예' || denied === '예' || redflag === '예') {
              resultHtml = `<strong>🚨 상황허가 (Catch-All) 대상</strong><br/>비전략물자이지만 대량파괴무기 등 전용 가능성이 높은 상황(우려국가, 우려거래자, 의심징후, 별표 2의 2 품목 등)이 식별되었습니다.<br/>반드시 <strong>[L-01] 상황허가</strong>를 신청하여 승인받아야 수출할 수 있습니다(상황허가도 별지1호 서식을 사용합니다). 위반 시 대외무역법에 따라 형사처벌을 받을 수 있습니다.
              <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(239,68,68,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(239,68,68,0.2);">
                <strong>📝 필수 서류 안내 (YesTrade 상황허가 제출용)</strong><br/>
                • <strong>[L-01] 상황허가 신청서</strong><br/>
                • <strong>[L-04] 최종사용자 서약서 (EUC)</strong><br/>
                • <strong>[L-05]~[L-09] 상황허가 전용 첨부서류</strong> (사실확인서·회사소개·품목상세·군용전용검토·부분제품설명)<br/>
                • 무기 전용 의도가 없음을 소명하는 서류 (상세 사유서 등)<br/>
                • 수출계약서 및 제품 사양서<br/>
                <span style="color:var(--accent-red);">※ 15일 이상의 엄격한 심사가 진행됩니다.</span>
              </div>`;
              color = 'var(--accent-red)';
              bg = 'rgba(239,68,68,0.05)';
            } else if (catchall === '아니오' && denied === '아니오' && redflag === '아니오') {
              resultHtml = `<strong>✅ 자유 수출 가능 (전략물자 비해당 및 상황허가 대상 아님)</strong><br/>전략물자 및 상황허가 통제에 모두 해당하지 않습니다. 안전하게 일반 수출을 진행하실 수 있습니다.<br/>관련 입증을 위해 <strong>[F-01] 자가판정서</strong> 등을 구비하는 것을 권장합니다.
              <br/><br/><div style="font-size:0.85rem; padding:10px; background:rgba(139,92,246,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(139,92,246,0.2);">
                <strong>📝 필수 서류 안내 (YesTrade 제출 불필요)</strong><br/>
                • <strong>[F-01] 자가판정서:</strong> 세관 통관 시 "전략물자 비해당" 입증을 위해 자사 명의로 발급하여 관세사/세관에 제출<br/>
                • <strong>[F-02] 전문판정서:</strong> (선택사항) 자가판정이 불확실할 경우 전략물자관리원에 판정 신청<br/>
                <span style="color:var(--text-secondary);">※ 별도의 수출허가(L계열) 서류나 거래보고(K계열) 서류가 필요하지 않습니다.</span>
              </div>`;
              color = 'var(--accent-purple)';
              bg = 'rgba(139,92,246,0.05)';
            }
          }
        }

        // Apply ITT (Intangible Technology Transfer) modification
        if (transferType === '무형의 기술 이전 (이메일, 클라우드, 서버 다운로드 등)') {
          resultHtml = resultHtml.replace('세관 통관 시 "전략물자 비해당" 입증을 위해 자사 명의로 발급하여 관세사/세관에 제출', '무형이전이므로 세관 제출 절차는 생략되나, 자체 근거 자료로 보관 필요');
          resultHtml += `
          <div style="font-size:0.85rem; padding:10px; background:rgba(139,92,246,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(139,92,246,0.3);">
            <strong>💻 무형이전(ITT) / 간주수출 안내</strong><br/>
            세관을 통과하는 물리적 화물이 아니더라도 소스코드, S/W 라이선스 이메일 전송, 클라우드 접근 권한 부여 등은 동일하게 '수출'로 간주됩니다.<br/>
            관세사 및 세관 신고 서류(면장 등)는 필요 없으나, <strong>허가 대상일 경우 반드시 전송(클릭) 전에 허가증을 발급받아야 합니다.</strong>
          </div>`;
        }

        // Apply US EAR warning
        if (usEar === '예 (미국산 부품/소프트웨어 포함)') {
          resultHtml += `
          <div style="font-size:0.85rem; padding:10px; background:rgba(239,68,68,0.08); border-radius:6px; margin-top:8px; border:1px solid rgba(239,68,68,0.3);">
            <strong>⚠️ 미국 상무부(BIS) EAR 재수출 통제 주의 (De minimis Rule)</strong><br/>
            수출 품목에 미국산 통제 부품이나 소프트웨어가 포함되어 있습니다. 한국 정부의 허가(또는 면제)와는 <strong>별개로</strong> 미국 수출통제규정(EAR)의 De minimis 기준을 초과하는지 반드시 계산해야 합니다.<br/>
            <span style="color:var(--accent-red); font-weight:600;">※ 계산식: (미국산 부품 가치 ÷ 최종 완성품 가치) × 100</span><br/>
            - 테러지원국 등(이란, 북한 등): <strong>10% 초과 시</strong> 미국 BIS 재수출 허가 필요<br/>
            - 그 외 일반 국가: <strong>25% 초과 시</strong> 미국 BIS 재수출 허가 필요<br/>
            기준을 초과할 경우 한국 허가와 함께 미국 BIS 허가(Re-export License)를 동시에 취득해야 선적이 가능합니다.
          </div>`;
          color = 'var(--accent-red)';
        }

        resultPanel.style.borderLeftColor = color;
        resultPanel.style.background = bg;
        resultPanel.innerHTML = resultHtml;
      }
    }
  }

  // ── Product Switcher Events ──
  // (Removed because product selection is now synchronized with Export Case selection from the dashboard)

  // Status select
  const statusSelect = container.querySelector(`#status-select-${formDef.id}`);
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      setFormStatus(formDef.id, newStatus);
      e.target.className = `status-select ${newStatus}`;
      window.dispatchEvent(new CustomEvent('form-status-changed'));
    });
  }

  // Mount Search Widgets
  const searchWidgets = container.querySelectorAll('.search-widget-container');
  searchWidgets.forEach(widgetEl => {
    // Mount the search view inside the widget container
    // passing true or a specific callback if needed
    renderSearchView(widgetEl, null, 'catchall');
  });

  // Evaluate branching initially
  evaluateBranching();

  // ── [Fix P2] Interactive HWP Form: 동적 행 추가 기능 ──
  container.querySelectorAll('.btn-add-byeolji-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (isFormLocked) { customToast('잠긴 거래의 서류는 편집할 수 없습니다.'); return; }
      const targetTableKey = e.currentTarget.dataset.targetTable;
      const tbody = container.querySelector(`tbody[data-table-key="${targetTableKey}"]`);
      if (!tbody) return;
      
      const rowCount = tbody.querySelectorAll('tr').length;
      // Get the first row as a template for the new row
      const firstRow = tbody.querySelector('tr');
      if (firstRow) {
        const newRow = firstRow.cloneNode(true);
        // Clear all inputs and textareas
        newRow.querySelectorAll('input, textarea').forEach(input => {
          input.value = '';
          // Remove readonly if it was inherited, unless it explicitly is readonly by design? 
          // Usually new items should be editable. But field() might output readonly. We will just clear value.
        });
        // Update row number if first cell is a number
        const firstTd = newRow.querySelector('td');
        if (firstTd && !firstTd.querySelector('input, textarea')) {
          firstTd.innerText = rowCount + 1;
        }
        tbody.appendChild(newRow);
      }
    });
  });

  // Re-evaluate branching on any field change
  container.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('change', (e) => {
      evaluateBranching();
      
      // A-01 'noRevision' checkbox logic
      if (formDef.id === 'A-01' && e.target.dataset.field === 'noRevision') {
        const bodyInputs = container.querySelectorAll('[data-field="body"]');
        const addText = "\n\n※ 검토 결과: 관련 법령 개정 및 사내 규정 변경 사유가 발생하지 않아, 금번 정기 검토에서는 개정 없이 현행 규정을 유지함으로 보고드립니다.";
        
        bodyInputs.forEach(input => {
          let currentVal = input.value || '';
          if (e.target.checked) {
            if (!currentVal.includes("현행 규정을 유지함으로 보고드립니다")) {
              input.value = currentVal + addText;
              // Trigger input event to auto-resize textareas if needed
              input.dispatchEvent(new Event('input'));
            }
          } else {
            if (currentVal.includes(addText)) {
              input.value = currentVal.replace(addText, '');
              input.dispatchEvent(new Event('input'));
            }
          }
        });
      }
      
      // 국가별 그룹 자동 판정 로직 (Z-01, G-01 다중 당사자 적용)
      if (formDef.id === 'Z-01' && e.target.dataset.field === 'q_country') {
        const country = e.target.value;
        const regionInput = container.querySelector(`[data-field="q_region"]`);
        if (regionInput) {
          let region = '그 외 지역';
          if (!country) region = '';
          else {
            const found = DESTINATION_COUNTRIES.find(c => c.name === country);
            if (found) {
              if (found.group === 'A') region = '가 지역';
              else if (found.group === 'B1') region = '나의1 지역';
              else if (found.group === 'B2') region = '나의2 지역';
              else region = '다 지역';
            }
          }
          
          regionInput.value = region;
          regionInput.dispatchEvent(new Event('change'));
        }
      } else if (formDef.id === 'G-01' && ['purchaserCountry', 'consigneeCountry', 'endUserCountry'].includes(e.target.dataset.field)) {
        const fieldName = e.target.dataset.field;
        const country = e.target.value;
        const regionInputName = fieldName.replace('Country', 'Region');
        const regionInput = container.querySelector(`[data-field="${regionInputName}"]`);
        
        const groupA = ['미국', '영국', '독일', '프랑스', '일본', '호주', '캐나다', '뉴질랜드'];
        const groupB1 = ['폴란드', 'UAE', '사우디아라비아', '인도', '베트남'];
        const groupC = ['이란', '북한', '시리아'];
        const groupB2 = ['러시아', '벨라루스'];
        
        let region = '그 외 지역';
        if (!country) region = '';
        else if (groupA.includes(country)) region = '가 지역';
        else if (groupB1.includes(country)) region = '나의1 지역';
        else if (groupB2.includes(country)) region = '나의2 지역';
        else if (groupC.includes(country)) region = '다 지역';
        
        if (regionInput) {
          regionInput.value = region;
          regionInput.dispatchEvent(new Event('change'));
        }

        // Calculate Effective Region
        const purRegion = container.querySelector(`[data-field="purchaserRegion"]`)?.value || '';
        const conRegion = container.querySelector(`[data-field="consigneeRegion"]`)?.value || '';
        const endRegion = container.querySelector(`[data-field="endUserRegion"]`)?.value || '';
        
        const regions = [purRegion, conRegion, endRegion].filter(r => r);
        const effectiveInput = container.querySelector(`[data-field="effectiveRegion"]`);
        
        if (effectiveInput && regions.length > 0) {
          // Rank: 다 > 나의2 > 그 외 지역 > 나의1 > 가
          let worstRegion = '가 지역';
          if (regions.includes('다 지역')) worstRegion = '다 지역';
          else if (regions.includes('나의2 지역')) worstRegion = '나의2 지역';
          else if (regions.includes('그 외 지역')) worstRegion = '그 외 지역';
          else if (regions.includes('나의1 지역')) worstRegion = '나의1 지역';
          else if (regions.includes('가 지역')) worstRegion = '가 지역';
          
          if (effectiveInput.value !== worstRegion) {
            effectiveInput.value = worstRegion;
            effectiveInput.dispatchEvent(new Event('change'));
            
            // Visual alert
            if (worstRegion !== '가 지역') {
              effectiveInput.style.color = 'var(--status-danger)';
              effectiveInput.style.fontWeight = 'bold';
            } else {
              effectiveInput.style.color = 'var(--status-success)';
              effectiveInput.style.fontWeight = 'normal';
            }
          }
        }
      }
    });
  });

  // Checkbox Group Change Event
  container.querySelectorAll('.checkbox-group').forEach(group => {
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    const hiddenInput = group.querySelector('input[type="hidden"]');
    if (checkboxes && hiddenInput) {
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          const selected = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
          hiddenInput.value = selected.join(', ');
          hiddenInput.dispatchEvent(new Event('change'));
          
          // Z-01 의심징후(Red Flags) 하나라도 체크 시 파이프라인 트리거 발동
          if (hiddenInput.dataset.field === 'q0_red_flags') {
            const trigger = container.querySelector('[data-field="q0_pipeline_trigger"]');
            if (trigger) {
              const hasRedFlag = selected.length > 0;
              // CSL 결과도 고려해야 하나, 여기서는 단순히 Red Flag가 있으면 HIT
              // CSL 상태를 알기 어려우므로, Red Flag가 있거나 CSL이 HIT면 HIT로 설정하는 것이 이상적임.
              // 단순화: Red flag 체크 시 HIT, 아니면 (기존 CSL이 HIT일 수도 있으니) CSL결과 체크
              const cslResultSpan = container.querySelector('.csl-scan-result');
              const cslHit = cslResultSpan && cslResultSpan.textContent.includes('일치 주의');
              
              if (hasRedFlag || cslHit) {
                trigger.value = 'HIT';
              } else {
                trigger.value = 'SAFE';
              }
              trigger.dispatchEvent(new Event('change'));
            }
          }
        });
      });
    }
  });

  // CSL API Scan Button Event
  const cslBtn = container.querySelector('.btn-run-csl-scan');
  if (cslBtn) {
    cslBtn.addEventListener('click', async () => {
      const buyer = container.querySelector('[data-field="q0_buyer"]')?.value || '';
      const buyerCountry = container.querySelector('[data-field="q0_buyer_country"]')?.value || '';
      const consignee = container.querySelector('[data-field="q0_consignee"]')?.value || '';
      const consigneeCountry = container.querySelector('[data-field="q0_consignee_country"]')?.value || '';
      const endUser = container.querySelector('[data-field="q0_end_user"]')?.value || '';
      const endUserCountry = container.querySelector('[data-field="q0_end_user_country"]')?.value || '';
      const agent = container.querySelector('[data-field="q0_agent"]')?.value || '';
      const agentCountry = container.querySelector('[data-field="q0_agent_country"]')?.value || '';
      
      const resultSpan = container.querySelector('.csl-scan-result');
      
      if (!buyer && !consignee && !endUser && !agent) {
        customToast('4대 당사자 중 최소 1개 이상의 상호명을 입력해주세요.');
        return;
      }
      
      cslBtn.disabled = true;
      cslBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:18px; animation: spin 1s linear infinite;">sync</span> 4대 당사자 일괄 검색 중...`;
      if (resultSpan) {
        resultSpan.style.color = 'var(--text-secondary)';
        resultSpan.textContent = 'API 서버 연동 중...';
      }
      
      // Simulate API call
      setTimeout(() => {
        cslBtn.disabled = false;
        cslBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size:18px;">search</span> 미국 CSL 실시간 검색`;
        
        const combined = (buyer + ' ' + buyerCountry + ' ' + consignee + ' ' + consigneeCountry + ' ' + endUser + ' ' + endUserCountry + ' ' + agent + ' ' + agentCountry).toLowerCase();
        let hit = false;
        const hitKeywords = ['huawei', 'dj', 'aerospace', 'military', 'iran', 'russia'];
        
        for (const kw of hitKeywords) {
          if (combined.includes(kw)) { hit = true; break; }
        }
        
        if (resultSpan) {
          if (hit) {
            resultSpan.style.color = 'var(--status-danger)';
            resultSpan.textContent = '⚠️ 일치 주의! 우려거래자 명단에 당사자가 존재합니다. (Stop-Shipment 발동)';
          } else {
            resultSpan.style.color = 'var(--status-success)';
            resultSpan.textContent = '✅ 매칭되는 제재/우려거래자 정보가 없습니다.';
          }
        }
        
        // Update Pipeline Trigger
        const trigger = container.querySelector('[data-field="q0_pipeline_trigger"]');
        const redFlagInput = container.querySelector('[data-field="q0_red_flags"]');
        if (trigger) {
          const hasRedFlag = redFlagInput && redFlagInput.value.length > 0;
          if (hit || hasRedFlag) {
            trigger.value = 'HIT';
          } else {
            trigger.value = 'SAFE';
          }
          trigger.dispatchEvent(new Event('change'));
        }
      }, 1500);
    });
  }

  // Internal Navigation Button (Search Catch-All Modal)
  const navSearchBtn = container.querySelector('.btn-nav-search');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', async () => {
      openSearchModal('catchall');
    });
  }

  // Internal Navigation Button (Search Dual-use Modal)
  const navSearchDualBtn = container.querySelector('.btn-nav-search-dual');
  if (navSearchDualBtn) {
    navSearchDualBtn.addEventListener('click', async () => {
      openSearchModal('dual');
    });
  }

  // Autofill History Button
  const btnAutofillHistory = container.querySelector('.btn-autofill-history');
  if (btnAutofillHistory) {
    btnAutofillHistory.addEventListener('click', () => {
      const prods = getProducts();
      const currId = getSelectedProductId();
      const p = prods.find(x => x.id === currId);
      
      if (p) {
        const updateField = (key, val) => {
          if (!val) return;
          const el = container.querySelector(`[data-field="${key}"]`);
          if (el) {
            el.value = val;
            el.dispatchEvent(new Event('change'));
          }
        };
        
        updateField('q_decision_type', p.classificationType);
        updateField('q_control_number', p.controlNumber);
        updateField('q_decision_date', p.classificationDate);
        
        // append specSummary to notes if it exists
        if (p.specSummary) {
          const notesEl = container.querySelector(`[data-field="q_notes"]`);
          if (notesEl) {
            const existing = notesEl.value;
            notesEl.value = existing ? existing + '\n\n[이전 판정 요약]\n' + p.specSummary : '[이전 판정 요약]\n' + p.specSummary;
            notesEl.dispatchEvent(new Event('change'));
          }
        }
        
        customToast('이전 판정 이력을 성공적으로 불러왔습니다.', 'success');
      }
    });
  }

  // ── [Fix #3] Save button — 중복 클릭 방지 + 로딩 스피너 ──
  const saveBtn = container.querySelector('#btn-save-form');
  const saveAndNextBtn = container.querySelector('#btn-save-and-next');

  async function performSave(btnEl) {
    if (btnEl.disabled) return false;

    // 다른 서식과 값이 다른 항목이 있으면 저장 전에 먼저 물어본다(모달 응답 대기 중에는
    // 버튼을 "저장 중" 스피너로 바꾸지 않는다 — 사용자가 질문에 답하는 중이지 저장 중이 아니므로).
    const data = collectFormData(formDef, container);
    const conflictResolutions = await resolveFieldConflicts(formDef, data);

    const originalHtml = btnEl.innerHTML;
    btnEl.disabled = true;
    btnEl.innerHTML = `<span class="material-symbols-rounded" style="animation:spin 1s linear infinite">sync</span> 저장 중...`;

    try {
      if (isTxForm(formDef.id)) {
        await setCaseFormData(formDef.id, null, data);
      } else {
        await setFormData(formDef.id, data);
      }

      // 이 시점부터 이후 서식에 적용하기로 한 항목들을 전파(필요 시 이미 채워진 뒤쪽 서식도 덮어씀)
      for (const res of conflictResolutions) {
        if (res.scope === 'forward') {
          await propagateFieldForward(res.key, res.value, formDef.id, { overwriteFilled: res.overwriteFilled });
        }
      }

      // Z-01 또는 G-01 저장 시 비즈니스 로직 엔진 실행 → 하위 서식 상태 자동 전이
      if (formDef.id === 'Z-01' || formDef.id === 'G-01') {
        try {
          await evaluateBusinessLogic(formDef.id, data);
        } catch (e) {
          console.error('[BusinessLogic] 서식 상태 전이 오류:', e);
        }
      } else if (formDef.id === 'F-04') {
        // [수정] F-04(판정관리대장)에 3단계 민감도(q_sensitivity)가 새로 등록/변경되면
        // 라우팅 결과(개별/포괄허가 분기)가 바뀔 수 있으므로 Z-01 기준으로 재평가한다.
        try {
          const z01Data = getCaseFormData('Z-01');
          if (z01Data && Object.keys(z01Data).length > 0) {
            await evaluateBusinessLogic('Z-01', z01Data);
          }
        } catch (e) {
          console.error('[BusinessLogic] F-04 연동 재평가 오류:', e);
        }
      }

      if (isProductSpecific && selectedProdId) {
        // Synchronize product metadata
        const updateObj = {};
        if (data.itemName) updateObj.name = data.itemName;
        if (data.modelNumber) updateObj.model = data.modelNumber;
        if (data.controlNo) updateObj.controlNumber = data.controlNo;
        if (data.specUsage) updateObj.specSummary = data.specUsage;
        if (formDef.id === 'F-01') updateObj.classificationType = '자가판정 (전략물자)';
        if (formDef.id === 'F-02') updateObj.classificationType = '전문판정 신청';
        updateObj.classificationDate = new Date().toISOString().slice(0, 10);
        
        await updateProduct(selectedProdId, updateObj);
      }
      
      // Auto-set status to progress if it was todo
      if (getFormStatus(formDef.id) === 'todo') {
        await setFormStatus(formDef.id, 'progress');
        if (statusSelect) {
          statusSelect.value = 'progress';
          statusSelect.className = 'status-select progress';
        }
      }

      showToast('저장되었습니다.', 'success');
      window.dispatchEvent(new CustomEvent('form-status-changed'));
      return true;
    } catch (err) {
      console.error('[Save] 저장 오류:', err);
      showToast('저장 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
      return false;
    } finally {
      // 로딩 상태 해제 (성공/실패 무관)
      btnEl.disabled = false;
      btnEl.innerHTML = originalHtml;
    }
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => performSave(saveBtn));
  }

  if (saveAndNextBtn) {
    saveAndNextBtn.addEventListener('click', async () => {
      const saved = await performSave(saveAndNextBtn);
      if (saved) {
        const txId = getSelectedTransactionId();
        const { nextFormId, reason } = getNextStep(formDef.id, txId);
        
        if (nextFormId) {
          await customAlert(`<strong>다음 단계 안내</strong><br><br>${reason}`);
          if (window.appRouter) {
            window.appRouter.navigate('form', nextFormId);
          }
        } else {
          await customAlert(`<strong>프로세스 완료</strong><br><br>${reason}`);
        }
      }
    });
  }

  // Snapshot Logic
  const snapshotBtn = container.querySelector('#btn-create-snapshot');
  if (snapshotBtn) {
    snapshotBtn.addEventListener('click', async () => {
      const { createSnapshot } = await import('../store.js');
      const data = collectFormData(formDef, container);
      const confirmed = await customConfirm('스냅샷 생성', '현재 작성된 데이터로 새 스냅샷 버전(PDF 대체용)을 생성하시겠습니까?');
      if (confirmed) {
        await createSnapshot(formDef.id, data);
        await customAlert('스냅샷 생성 완료', '새 버전 스냅샷이 생성되었습니다.', 'success');
        renderForm(formDef, container); // re-render to load options
      }
    });
  }

  const snapshotSelector = container.querySelector('#snapshot-selector');
  if (snapshotSelector) {
    // Populate snapshot options
    import('../store.js').then(({ getSnapshots }) => {
      const snaps = getSnapshots(formDef.id);
      snaps.forEach(snap => {
        const d = new Date(snap.timestamp);
        const opt = document.createElement('option');
        opt.value = snap.id;
        opt.textContent = `[${snap.version}] ${d.toLocaleDateString()}`;
        snapshotSelector.appendChild(opt);
      });
      
      // If a snapshot is currently viewed, set it
      if (window.currentViewedSnapshotId) {
        snapshotSelector.value = window.currentViewedSnapshotId;
      }
    });

    snapshotSelector.addEventListener('change', async (e) => {
      const snapId = e.target.value;
      if (!snapId) {
        // Return to current
        window.currentViewedSnapshotId = null;
        renderForm(formDef, container);
        return;
      }
      
      const { getSnapshots } = await import('../store.js');
      const snap = getSnapshots(formDef.id).find(s => s.id === snapId);
      if (snap) {
        window.currentViewedSnapshotId = snapId;
        renderForm(formDef, container, snap.data); // render with read-only snapshot data
      }
    });
  }

  // Force Sync Button Logic
  const forceSyncBtn = container.querySelector('#btn-force-sync');
  if (forceSyncBtn) {
    forceSyncBtn.addEventListener('click', async () => {
      // 1. Collect current form data as source of truth
      const sourceData = collectFormData(formDef, container);
      
      // 2. Identify fields to sync
      const sourceKeys = Object.keys(sourceData).filter(k => !k.startsWith('_') && sourceData[k] && sourceData[k].trim() !== '' && typeof sourceData[k] === 'string');
      if (sourceKeys.length === 0) {
        showSyncAlert('동기화 오류', '동기화할 유효한 데이터가 없습니다. 먼저 양식에 내용을 입력해주세요.');
        return;
      }

      // 3. Calculate diffs
      const diffs = [];
      const updates = {}; // { formId: { key: value } }

      for (const [targetFormId, targetDef] of Object.entries(formDefinitions)) {
        if (targetFormId === formDef.id) continue;
        if (targetDef.type === 'search_tool' || targetDef.type === 'checklist') continue;

        // Find overlapping fields in target form definition
        let targetFields = [];
        if (targetDef.fields) targetFields = targetDef.fields;
        if (targetDef.sections) {
          targetDef.sections.forEach(sec => { if (sec.fields) targetFields.push(...sec.fields); });
        }
        if (targetDef.questions) targetFields.push(...targetDef.questions);

        const targetKeys = targetFields.map(f => f.key);
        const overlapKeys = sourceKeys.filter(k => targetKeys.includes(k));

        if (overlapKeys.length > 0) {
          // [수정 #3] txForm은 getCaseFormData로 현재 거래 격리 키 사용
          const targetData = isTxForm(targetFormId)
            ? (getCaseFormData(targetFormId) || {})
            : (await getFormData(targetFormId) || {});
          let hasChangesForThisForm = false;
          
          overlapKeys.forEach(k => {
            const oldVal = targetData[k] || '(빈칸)';
            const newVal = sourceData[k];
            if (oldVal !== newVal) {
              diffs.push({
                formId: targetFormId,
                formTitle: targetDef.title,
                key: k,
                fieldName: targetFields.find(f => f.key === k)?.label || k,
                oldVal,
                newVal
              });
              if (!updates[targetFormId]) updates[targetFormId] = { ...targetData };
              updates[targetFormId][k] = newVal;
              hasChangesForThisForm = true;
            }
          });
        }
      }

      if (diffs.length === 0) {
        showSyncAlert('동기화할 내용 없음', '다른 양식에 동기화(변경)할 사항이 없습니다. 모두 최신 상태이거나 호환되는 필드가 없습니다.');
        return;
      }

      // 4. Show Modal
      const modalHtml = `
        <div id="sync-modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; display:flex; justify-content:center; align-items:center;">
          <div class="card" style="background:var(--bg-primary); border:1px solid var(--border-color); width:90%; max-width:800px; max-height:80vh; overflow-y:auto; border-radius:12px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.2);">
            <h2 style="margin-top:0; color:var(--accent-purple); display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-rounded">sync</span> 데이터 강제 동기화 검토
            </h2>
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:20px;">
              현재 <strong>[${formDef.id}] ${formDef.title}</strong> 서식에 작성된 내용이 다른 서식의 동일한 항목에 강제로 덮어쓰기 됩니다. 변경되는 항목을 확인하고 승인해주세요.
            </p>
            
            <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:20px;">
              <thead>
                <tr style="background:var(--bg-secondary); border-bottom:2px solid var(--border-color);">
                  <th style="padding:10px; width:40px; text-align:center;"><input type="checkbox" id="sync-check-all" checked></th>
                  <th style="padding:10px; text-align:left; color:var(--text-primary);">대상 양식</th>
                  <th style="padding:10px; text-align:left; color:var(--text-primary);">항목명</th>
                  <th style="padding:10px; text-align:left; color:var(--accent-red);">기존 내용</th>
                  <th style="padding:10px; text-align:left; color:var(--accent-green);">변경될 내용</th>
                </tr>
              </thead>
              <tbody>
                ${diffs.map((d, index) => `
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; text-align:center;"><input type="checkbox" class="sync-check-item" data-index="${index}" checked></td>
                    <td style="padding:10px; color:var(--text-primary);"><strong>${d.formId}</strong><br><span style="font-size:0.75rem; color:var(--text-tertiary);">${d.formTitle}</span></td>
                    <td style="padding:10px; font-weight:600; color:var(--text-primary);">${d.fieldName}</td>
                    <td style="padding:10px; color:var(--accent-red);"><del>${d.oldVal}</del></td>
                    <td style="padding:10px; color:var(--accent-green); background:rgba(34,197,94,0.05);">${d.newVal}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button class="btn btn-ghost" id="btn-sync-cancel">취소</button>
              <button class="btn btn-primary" id="btn-sync-approve" style="background:var(--accent-purple); border-color:var(--accent-purple);">승인 및 덮어쓰기</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const overlay = document.getElementById('sync-modal-overlay');

      const checkAll = document.getElementById('sync-check-all');
      const itemChecks = document.querySelectorAll('.sync-check-item');

      checkAll.addEventListener('change', (e) => {
        itemChecks.forEach(chk => chk.checked = e.target.checked);
      });

      document.getElementById('btn-sync-cancel').addEventListener('click', () => {
        overlay.remove();
      });

      document.getElementById('btn-sync-approve').addEventListener('click', async () => {
        // Collect selected diffs
        const selectedUpdates = {};
        itemChecks.forEach(chk => {
          if (chk.checked) {
            const idx = parseInt(chk.getAttribute('data-index'));
            const d = diffs[idx];
            if (!selectedUpdates[d.formId]) selectedUpdates[d.formId] = {};
            selectedUpdates[d.formId][d.key] = d.newVal;
          }
        });

        if (Object.keys(selectedUpdates).length === 0) {
          await customAlert('선택 항목 없음', '동기화할 항목이 선택되지 않았습니다.', 'warning');
          return;
        }

        const approveBtn = document.getElementById('btn-sync-approve');
        approveBtn.disabled = true;
        approveBtn.innerHTML = '동기화 중...';
        
        try {
          // Save the current form first
          if (isTxForm(formDef.id)) {
            await setCaseFormData(formDef.id, null, sourceData);
          } else {
            await setFormData(formDef.id, sourceData);
          }

          // Apply selected updates to other forms
          for (const [tFid, selectedData] of Object.entries(selectedUpdates)) {
            const existingTargetData = isTxForm(tFid) ? (await getCaseFormData(tFid) || {}) : (await getFormData(tFid) || {});
            const finalData = { ...existingTargetData, ...selectedData };
            if (isTxForm(tFid)) {
              await setCaseFormData(tFid, null, finalData);
            } else {
              await setFormData(tFid, finalData);
            }
          }
          
          overlay.remove();
          showToast('동기화가 완료되었습니다.', 'success');
          window.dispatchEvent(new CustomEvent('form-status-changed'));
        } catch (err) {
          showSyncAlert('동기화 오류', '동기화 중 오류가 발생했습니다: ' + err.message);
          approveBtn.disabled = false;
          approveBtn.innerHTML = '승인 및 덮어쓰기';
        }
      });
    });
  }

  // ── Pull Sync Data Event (수동 데이터 불러오기) ──
  const syncDataBtn = container.querySelector('.btn-sync-data');
  if (syncDataBtn) {
    syncDataBtn.addEventListener('click', async () => {
      const formId = syncDataBtn.dataset.formId;
      const { getFormData } = await import('../store.js');
      
      let syncFields = [];
      let sourceTitle = '';

      if (formId === 'G-05') {
        sourceTitle = 'K-03(운영보고) 및 K-04(실적보고)';
        const k03 = getFormData('K-03') || {};
        const k04 = getFormData('K-04') || {};
        
        const prevYearReport = [];
        if (k04.reportYear) prevYearReport.push(`[${k04.reportYear}년 ${k04.reportCycle || ''} 실적 요약]`);
        if (k04.compExportCount) prevYearReport.push(`- 포괄수출허가 실적: ${k04.compExportCount}건 / ${k04.compExportAmount} USD`);
        if (k04.selfClassCount || k04.proClassCount) prevYearReport.push(`- 판정 실적: 자가판정 ${k04.selfClassCount}건, 전문판정 ${k04.proClassCount}건`);
        if (k03.auditStatus) prevYearReport.push(`\\n[감사 실적]\\n${k03.auditStatus}`);
        
        const currentYearPlan = [];
        if (k03.intTraining) currentYearPlan.push(`[올해 내부교육 계획]\\n${k03.intTraining}`);
        if (k03.extTraining) currentYearPlan.push(`\\n[올해 외부교육 계획]\\n${k03.extTraining}`);

        syncFields = [
          { key: 'prevYearReport', label: '전년도 자율준수체제 운영 및 실적 요약', value: prevYearReport.join('\\n') },
          { key: 'currentYearPlan', label: '당해연도 운영 계획 (교육/감사)', value: currentYearPlan.join('\\n') }
        ];
      } else if (formId === 'C-06') {
        sourceTitle = 'C-07(감사계획서)';
        const c07 = getFormData('C-07') || {};
        syncFields = [
          { key: 'auditPeriod', label: '감사 대상 기간', value: c07.auditPeriod || '' },
          { key: 'auditScope', label: '감사 범위 (부서)', value: c07.auditScope || '' }
        ];
      } else if (formId === 'J-02') {
        sourceTitle = 'J-01(자진신고서)';
        const j01 = getFormData('J-01') || {};
        syncFields = [
          { key: 'companyName', label: '업체명', value: j01.companyName || '' },
          { key: 'reporterName', label: '보고자 성명', value: j01.reporterFullName || '' },
          { key: 'reportSummary', label: '신고(위반) 요약', value: j01.reportSummary || '' }
        ];
      } else if (formId === 'K-02') {
        sourceTitle = 'K-01(사전거래보고서)';
        const k01 = getFormData('K-01') || {};
        syncFields = [
          { key: 'regNumber', label: '사업자등록번호', value: k01.regNumber || '' },
          { key: 'exporter', label: '수출자', value: k01.exporter || '' },
          { key: 'buyer', label: '구매자', value: k01.buyer || '' },
          { key: 'consignee', label: '수하인', value: k01.consignee || '' },
          { key: 'endUser', label: '최종사용자', value: k01.endUser || '' },
          { key: 'destCountry', label: '최종목적국', value: k01.destCountry || '' },
          { key: 'hsCode', label: 'HS 코드', value: k01.hsCode || '' },
          { key: 'controlNo', label: '통제번호', value: k01.controlNo || '' },
          { key: 'itemSpec', label: '품명 및 규격', value: k01.itemSpec || '' },
          { key: 'quantity', label: '수량', value: k01.quantity || '' },
          { key: 'exportAmount', label: '수출금액', value: k01.exportAmount || '' }
        ];
      }

      // Build Modal UI
      let modalHtml = `
        <div id="pull-sync-modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; display:flex; justify-content:center; align-items:center;">
          <div class="card" style="background:var(--bg-primary); border:1px solid var(--border-color); width:90%; max-width:800px; max-height:80vh; overflow-y:auto; border-radius:12px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.2);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:16px;">
              <h2 style="margin:0; color:var(--primary-color); display:flex; align-items:center; gap:8px;">
                <span class="material-symbols-rounded">download</span> 
                ${sourceTitle} 동기화
              </h2>
              <button type="button" class="btn btn-ghost" id="btn-close-pull-sync" style="padding:4px;"><span class="material-symbols-rounded">close</span></button>
            </div>
            
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:20px;">
              동기화할 항목을 선택해 주세요. 체크된 항목의 값은 <strong>현재 열려 있는 양식에 덮어쓰기</strong> 되며, 즉시 적용됩니다.
            </p>
            
            <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:20px;">
              <thead>
                <tr style="background:var(--bg-secondary); border-bottom:2px solid var(--border-color);">
                  <th style="padding:10px; width:40px; text-align:center;"><input type="checkbox" id="pull-sync-check-all" checked></th>
                  <th style="padding:10px; text-align:left; color:var(--text-primary); width:160px;">대상 항목명 (Target Field)</th>
                  <th style="padding:10px; text-align:left; color:var(--text-primary);">불러올 데이터 (Source Data)</th>
                </tr>
              </thead>
              <tbody>
                ${syncFields.map((f, i) => `
                  <tr style="border-bottom:1px solid var(--border-color);">
                    <td style="padding:10px; text-align:center;">
                      <input type="checkbox" class="pull-sync-cb" data-key="${f.key}" value="${encodeURIComponent(f.value)}" checked>
                    </td>
                    <td style="padding:10px; font-weight:600; color:var(--text-primary);">${f.label}</td>
                    <td style="padding:10px; color:var(--text-secondary); white-space:pre-wrap;">${f.value || '<span style="color:#9ca3af;font-style:italic;">(데이터 없음)</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-pull-sync">취소</button>
              <button type="button" class="btn btn-primary" id="btn-apply-pull-sync" style="background:var(--primary-color);">선택 항목 동기화 적용</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const overlay = document.getElementById('pull-sync-modal-overlay');

      const checkAll = document.getElementById('pull-sync-check-all');
      const itemCbs = overlay.querySelectorAll('.pull-sync-cb');

      const closeModal = () => overlay.remove();
      document.getElementById('btn-close-pull-sync').onclick = closeModal;
      document.getElementById('btn-cancel-pull-sync').onclick = closeModal;
      overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };

      checkAll.onchange = (e) => {
        itemCbs.forEach(cb => cb.checked = e.target.checked);
      };

      document.getElementById('btn-apply-pull-sync').onclick = () => {
        let count = 0;
        itemCbs.forEach(cb => {
          if (cb.checked) {
            const key = cb.dataset.key;
            const val = decodeURIComponent(cb.value);
            // find the input element in the form container
            const inputEl = container.querySelector(`[data-field="${key}"]`) || container.querySelector(`[data-col="${key}"]`);
            if (inputEl) {
              inputEl.value = val;
              count++;
            }
          }
        });
        
        if (count > 0) {
          saveCurrentData(); // Save the updated form
          showToast(`${count}개 항목이 성공적으로 동기화 되었습니다.`, 'success');
        } else {
          showToast(`선택된 항목이 없거나 동기화할 필드를 폼 내에서 찾지 못했습니다.`, 'warning');
        }
        closeModal();
      };
    });
  }

  // AI Analysis Block
  if (formDef.ai_analyzable) {
    const aiBtn = container.querySelector('#btn-ai-analyze');
    const aiInput = container.querySelector('#ai-upload-file');
    const overlay = container.querySelector('#ai-loading-overlay');
    
    if (aiBtn && aiInput && overlay) {
      aiBtn.addEventListener('click', () => {
        const checks = container.querySelectorAll('.ai-prereq-check');
        let allChecked = true;
        checks.forEach(c => { if(!c.checked) allChecked = false; });
        if (!allChecked) {
          customAlert('사전 점검 필요', '분석 오류를 방지하기 위해, 사양서 내 필수 항목 3가지가 기재되어 있는지 확인하고 점검표에 모두 체크해 주세요.', 'warning');
          return;
        }
        aiInput.click();
      });
      aiInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          overlay.style.display = 'flex';
          
          // 실제 API 호출 로직 (Netlify Backend)
          (async () => {
            try {
              const file = e.target.files[0];
              const imagePart = await fileToGenerativePart(file);
              
              // 동적으로 질문 키 추출
              const fieldKeys = [];
              formDef.sections.forEach(sec => {
                sec.fields.forEach(f => fieldKeys.push(f.key));
              });

              // 특수 폼에 대한 커스텀 페르소나 및 지시문 추가
              let customInstruction = "";
              if (formDef.id === 'Z-01' || formDef.id === 'F-01') {
                customInstruction = `
[특별 지시사항: 전략물자 판정 전문가]
당신은 대한민국 전략물자수출입고시 [별표 2] 이중용도품목 및 바세나르 체제(WA) 통제 기준에 정통한 최고 수준의 '전략물자 판정 전문가'입니다.
첨부된 제품 사양서를 당신의 지식베이스(별표 2 통제 리스트)와 대조하여 제품의 기술적 스펙이 통제 기준을 초과하는지 철저히 분석하세요.
분석 결과에 따라 다음 사항을 반드시 유추하여 작성해야 합니다:
1. 해당 여부 (해당/비해당)
2. 통제번호 (예: 5A002.a 등, 비해당 시 공란)
3. 판정 상세근거 (어떤 스펙이 어느 통제기준에 걸리는지 혹은 미달하는지 구체적으로 서술)`;
              }
        
              const prompt = `첨부된 카달로그/사양서 등 기술 문서를 분석하여, 다음 전략물자 질의 항목에 대한 답변을 작성해주세요.
${customInstruction}
[분석 지침]
1. 선택형(_yn 등) 질문에 대해서는 문서 내용을 바탕으로 가장 적절한 값을 선택하세요.
2. 서술형(_desc, classificationComments 등) 질문에 대해서는 반드시 문서 내의 문구나 스펙을 근거로 구체적으로 서술하세요.
3. 문서에 관련 내용이 전혀 없고 판정할 수 없다면 절대 임의로 유추하지 말고 '문서에 관련 내용 없음'이라고 기재하세요. (단, 전략물자 판정인 경우 통제기준과 대조한 결과를 구체적으로 적으세요.)
4. 반드시 아래 제공된 JSON 키를 모두 포함하는 순수 JSON 객체 포맷으로만 응답하세요. (마크다운 백틱 문법이나 다른 텍스트는 절대 포함하지 마세요)

[필수 JSON 응답 스키마 형식]
{
  ${fieldKeys.map(key => `"${key}": "답변 내용"`).join(',\n  ')}
}`;
        
              const response = await fetch('/api/analyze_catalog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  imagePart: imagePart,
                  prompt: prompt
                })
              });
        
              const result = await response.json();
              if(result.error) throw new Error(result.error.message);
        
              const text = result.candidates[0].content.parts[0].text;
              const parsedData = JSON.parse(text);
        
              Object.keys(parsedData).forEach(key => {
                const el = container.querySelector(`[data-key="${key}"]`);
                if (el) {
                  el.value = parsedData[key] || '';
                  el.dispatchEvent(new Event('change', { bubbles: true }));
                }
              });
        
              await customAlert('AI 분석 완료', 'AI 분석이 완료되었습니다. 추출된 데이터를 확인하고 [저장]을 눌러주세요.', 'success');
            } catch (err) {
              await customAlert('AI 분석 오류', 'AI 분석 중 오류가 발생했습니다: ' + err.message, 'error');
            } finally {
              overlay.style.display = 'none';
              aiInput.value = ''; // 초기화
            }
          })();
        }
      });
    }
  }

  
  // Table add row button
  const previewBtn = container.querySelector('#btn-preview-form');
  if (previewBtn) {
    previewBtn.addEventListener('click', async () => {
      const data = collectFormData(formDef, container);
      if (isTxForm(formDef.id)) {
        await setCaseFormData(formDef.id, null, data);
      } else {
        await setFormData(formDef.id, data);
      }
      
      // Check if this form has an HTML template (별지)
      try {
        const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');
        if (hasFormTemplate(formDef.id)) {
          const html = generateFormHtml(formDef.id, data);
          const win = window.open('', '_blank', 'width=900,height=1200');
          win.document.write(html);
          win.document.close();
          return;
        }
      } catch (e) {
        console.warn('별지 미리보기 불가, 기본 미리보기로 전환합니다.', e);
      }
      
      await openPreview(formDef, data);
    });
  }

  // Download button (PDF)
  const downloadBtn = container.querySelector('#btn-download-form');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      // Show loading state
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<span class="material-symbols-rounded spin">sync</span> PDF 생성 중...';
      downloadBtn.disabled = true;

      try {
        const data = collectFormData(formDef, container);
        if (isTxForm(formDef.id)) {
          await setCaseFormData(formDef.id, null, data);
        } else {
          await setFormData(formDef.id, data);
        }
        
        // 1. Try native PDF templates first
        try {
          const { hasPdfConfig, generatePdf } = await import('../utils/pdfGenerator.js');
          if (hasPdfConfig(formDef.id)) {
            const pdfBlobUrl = await generatePdf(formDef.id, data);
            // [수정] generatePdf가 반환하는 Blob URL을 아무 데도 쓰지 않고 버려서, "다운로드 완료" 토스트만
            // 뜨고 실제 파일은 저장되지 않던 버그 — 임시 <a download> 링크로 실제 다운로드를 발생시킨다.
            const a = document.createElement('a');
            a.href = pdfBlobUrl;
            a.download = `${formDef.id}_${(formDef.title || '').replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(pdfBlobUrl), 10000);
            showToast(`${formDef.id} PDF 양식 다운로드 완료`, 'success');
            return;
          }
        } catch(e) {
          console.warn('Native PDF generation failed, falling back to html2pdf', e);
        }

        // 2. Fallback to HTML templates to PDF
        let docHTML = '';
        try {
          const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');
          if (hasFormTemplate(formDef.id)) {
            docHTML = generateFormHtml(formDef.id, data);
          } else {
            // Standard form fallback
            docHTML = await generateDocumentHTML(formDef, data);
          }
        } catch (e) {
          docHTML = await generateDocumentHTML(formDef, data);
        }

        // [수정] 예전엔 index.html의 CDN <script> 태그(cdnjs.cloudflare.com)가 window.html2pdf를 채워줄 때만
        // 동작했음 — 사내망이 외부 CDN을 차단하는 환경(수출통제 관련 회사에서 흔함)에서는 PDF 다운로드
        // 버튼을 눌러도 "html2pdf library not found" 오류만 뜨고 아무 파일도 받아지지 않았음.
        // npm 패키지로 번들에 직접 포함시켜 인터넷 연결/CDN 접근 여부와 무관하게 항상 동작하도록 함.
        const { default: html2pdf } = await import('html2pdf.js');
        const tempDiv = document.createElement('div');
        // Add a wrapper to ensure proper scaling/styling in PDF
        tempDiv.innerHTML = `<div style="background:white; padding:20px; font-family:Pretendard, sans-serif;">${docHTML}</div>`;
        document.body.appendChild(tempDiv);

        const opt = {
          margin:       10,
          filename:     `${formDef.id}_${formDef.title.replace(/\s+/g, '_')}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(tempDiv).save();
        document.body.removeChild(tempDiv);
        showToast(`${formDef.title} PDF 다운로드 완료`, 'success');
      } catch (err) {
        showToast('PDF 다운로드 중 오류: ' + err.message, 'error');
        console.error(err);
      } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      }
    });
  }

  // Add row buttons
  container.querySelectorAll('.btn-add-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = collectFormData(formDef, container);
      const tableKey = btn.dataset.tableKey;
      
      if (tableKey) {
        if (!data[tableKey]) data[tableKey] = [];
        data[tableKey].push({});
      } else {
        if (!data.rows) data.rows = [];
        data.rows.push({});
      }
      if (isTxForm(formDef.id)) {
        setCaseFormData(formDef.id, null, data);
      } else {
        setFormData(formDef.id, data);
      }
      renderForm(formDef, container);
    });
  });

  // Slack으로 결재 요청 보내기 (아직 서명 전 단계) — Slack 주소가 비어있으면 안내만 하고 아무 것도 전송하지 않음
  const slackRequestBtn = container.querySelector('#btn-slack-request-approval');
  if (slackRequestBtn) {
    slackRequestBtn.addEventListener('click', async () => {
      const { customAlert, customFormDialog } = await import('../utils/dialog.js');
      const { getCurrentUser, getTransactions, getSelectedTransactionId, getSlackApproverIds, getStorageKey } = await import('../store.js');
      const { notifySlackApproval, notifySlackApprovalInteractive } = await import('../utils/slackNotify.js');

      const user = getCurrentUser();
      const link = `${window.location.origin}${window.location.pathname}?view=form&formId=${formDef.id}`;

      // 거래 전용 서식은 "현재 선택된 거래"에 종속되므로, 승인자가 링크를 열기 전 어떤 거래인지 알 수 있도록 이름을 함께 안내
      let txNote = '';
      if (isTxForm(formDef.id)) {
        const tx = getTransactions().find(t => t.id === getSelectedTransactionId());
        txNote = tx ? `\n대상 거래: ${tx.name || tx.buyer || tx.id} (열람 전 대시보드에서 동일 거래를 먼저 선택해주세요)` : '';
      }

      // 위임전결표 기준 추천값: approverRole이 지정된 서식(규정 제개정/보류해제/허가신청/자진신고/임명 등)은
      // 대표이사, 나머지는 기구장 전결 — 다만 실제로 누구에게 보낼지는 요청자가 드롭다운에서 직접 확인/선택하게 함
      // (자리 비움 등으로 다른 결재자에게 보내야 할 수도 있으므로 시스템이 말없이 결정하지 않는다).
      const recommendedLabel = formDef.approverRoleLabel || '기구장';
      const approverIds = getSlackApproverIds();
      const approverOptions = ['기구장', '대표이사'].map(role => ({
        value: role,
        label: `${role}${approverIds[role] ? '' : ' (Slack ID 미등록 — 채널에만 안내됨)'}${role === recommendedLabel ? ' · 위임전결표 기준 추천' : ''}`
      }));

      const pick = await customFormDialog(
        '결재 요청 보낼 대상 선택',
        [
          { key: 'approverRoleLabel', label: '결재자', type: 'select', options: approverOptions, default: recommendedLabel, required: true },
          { key: 'visibilityScope', label: '공개범위', type: 'select', options: [
            { value: 'private', label: '비공개 (기안자·승인자만)' },
            { value: 'department', label: '부서공개 (자율수출관리기구 소속만)' },
            { value: 'public', label: '전체공개 (전 직원 공지)' }
          ], default: 'private', required: true }
        ],
        { message: `[${formDef.id}] ${formDef.title || ''}에 대한 결재를 누구에게 요청할지, 승인 후 공개범위는 어떻게 할지 선택하세요.`, confirmText: '요청 보내기', icon: 'send' }
      );
      if (!pick) return; // 취소

      const targetApproverLabel = pick.approverRoleLabel;
      const visibilityScope = pick.visibilityScope || 'private';
      const detail = `요청자: ${user?.name || user?.email || '알수없음'} (${user?.department || '미지정'})${txNote}`;
      const storageKey = getStorageKey(formDef.id);

      // 요청 시점 정보(대기중 상태 표시용 + 승인 시 공개범위 판단용)를 문서 자체에 남겨둔다.
      // Slack 버튼 클릭이든 앱 내 전자서명이든, 승인이 어느 경로로 완료되든 이 값을 참조할 수 있어야 한다.
      {
        const pendingData = collectFormData(formDef, container);
        pendingData.approvalRequestedAt = new Date().toISOString();
        pendingData.visibilityScope = visibilityScope;
        if (isTxForm(formDef.id)) {
          await setCaseFormData(formDef.id, null, pendingData);
        } else {
          await setFormData(formDef.id, pendingData);
        }
      }

      // [신규] "PDF 다운로드"와 동일한 공식 양식 HTML로 미리보기 PDF를 브라우저에서 직접 만들어
      // Slack에 보낸다 — 서버(pdf-lib)의 단순 레이아웃 대신, 지금 이 시점(아직 미승인)의
      // 실제 서류 그대로(서명란만 비어있는 상태)를 그대로 보여주기 위함.
      let previewPdfBase64 = null;
      try {
        const previewData = collectFormData(formDef, container);
        const docHTML = hasFormTemplate(formDef.id) ? generateFormHtml(formDef.id, previewData) : await generateDocumentHTML(formDef, previewData);
        const { default: html2pdf } = await import('html2pdf.js');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `<div style="background:white; padding:20px; font-family:Pretendard, sans-serif;">${docHTML}</div>`;
        document.body.appendChild(tempDiv);
        const previewBlob = await html2pdf().set({
          margin: 10,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(tempDiv).outputPdf('blob');
        document.body.removeChild(tempDiv);
        previewPdfBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(previewBlob);
        });
      } catch (e) {
        console.error('공식 양식 미리보기 PDF 생성 실패(서버 기본 미리보기로 대체됨):', e);
      }

      // 1순위: Bot Token + 결재자 Slack ID가 모두 등록돼 있으면, 로그인 없이 Slack에서
      // 바로 승인/반려가 끝나는 Block Kit 버튼 메시지로 보낸다(승인 시 서명 PDF 자동 생성).
      let interactiveResult = { unavailable: true };
      if (storageKey) {
        interactiveResult = await notifySlackApprovalInteractive({
          formId: formDef.id, storageKey, approverRoleLabel: targetApproverLabel, visibilityScope,
          title: `[${formDef.id}] ${formDef.title || ''} 결재 요청`,
          detail, link,
          requesterEmail: user?.email, requesterName: user?.name, requesterSlackUserId: user?.slackUserId,
          previewPdfBase64
        });
      }

      if (!interactiveResult.unavailable) {
        if (interactiveResult.ok) {
          await customAlert('전송 완료', 'Slack으로 승인/반려 버튼이 포함된 결재 요청을 보냈습니다. 결재자가 Slack에서 바로 처리할 수 있습니다.', 'success');
          renderForm(formDef, container);
        } else {
          await customAlert('전송 실패', 'Slack 전송에 실패했습니다. 관리자에게 Bot Token/설정을 확인해달라고 요청하세요.', 'error');
        }
        return;
      }

      // 2순위(대체): Bot Token/결재자 ID가 아직 없으면 기존 텍스트 전용 Webhook 알림으로 대체.
      const result = await notifySlackApproval({
        title: `[${formDef.id}] ${formDef.title || ''} 결재 요청`,
        detail,
        link,
        approverRoleLabel: targetApproverLabel
      });

      if (result.skipped) {
        await customAlert(
          'Slack 주소가 설정되지 않았습니다',
          '관리자(Master) 계정으로 "권한 관리" 화면에 들어가 Slack 연동 정보를 먼저 등록해주세요. (Webhook 주소만 등록하면 텍스트 알림만, Bot Token+결재자 Slack ID까지 등록하면 Slack에서 바로 승인/반려 가능) 등록 전까지는 결재는 시스템 내에서 직접 진행해주세요.',
          'warning'
        );
      } else if (result.ok) {
        await customAlert('전송 완료', 'Slack으로 결재 요청 알림을 보냈습니다.\n(Bot Token과 결재자 Slack ID를 등록하면 Slack에서 바로 승인/반려할 수 있는 버튼이 함께 발송됩니다)', 'success');
      } else {
        await customAlert('전송 실패', 'Slack 전송에 실패했습니다. 관리자에게 Webhook 주소를 확인해달라고 요청하세요.', 'error');
      }
    });
  }

  // Slack 반려 배너 닫기 — rejectionInfo를 지우고 다시 작성/요청할 수 있는 상태로 되돌린다.
  const ackRejectionBtn = container.querySelector('#btn-ack-rejection');
  if (ackRejectionBtn) {
    ackRejectionBtn.addEventListener('click', async () => {
      const data = collectFormData(formDef, container);
      delete data.rejectionInfo;
      if (isTxForm(formDef.id)) {
        await setCaseFormData(formDef.id, null, data);
      } else {
        await setFormData(formDef.id, data);
      }
      renderForm(formDef, container);
    });
  }

  // 서명 취소 (관리자 전용) — 잘못 서명되어 영구 잠긴 문서를 되돌리는 구제 절차
  const revokeBtn = container.querySelector('#btn-revoke-signature');
  if (revokeBtn) {
    revokeBtn.addEventListener('click', async () => {
      const { customConfirm, customPrompt, customAlert } = await import('../utils/dialog.js');
      const { revokeSignature } = await import('../store.js');

      const confirmed = await customConfirm(
        '전자서명 취소',
        '이 서식의 전자서명을 취소하고 잠금을 해제하시겠습니까?\n다시 수정 가능한 상태로 돌아가며, 이 조작은 기록으로 남습니다.',
        { danger: true }
      );
      if (!confirmed) return;

      const reason = await customPrompt('취소 사유', '감사 기록에 남습니다. 예: "과거 데이터 입력 중 오서명 수정"', '', '취소 사유를 입력하세요');
      if (reason === null) return;

      const txId = isTxForm(formDef.id) ? getSelectedTransactionId() : null;
      const ok = await revokeSignature(formDef.id, txId, reason);
      if (ok) {
        await customAlert('서명 취소 완료', '전자서명이 취소되어 다시 수정할 수 있습니다.', 'success');
        renderForm(formDef, container);
      } else {
        await customAlert('오류', '서명 취소에 실패했습니다.', 'error');
      }
    });
  }

  // Electronic Signature Button
  const signBtn = container.querySelector('#btn-electronic-sign');
  if (signBtn) {
    signBtn.addEventListener('click', async () => {
      const { customConfirm, customAlert } = await import('../utils/dialog.js');
      const { getCurrentUser, setFormData, setCaseFormData } = await import('../store.js');
      const { notifySlackApproval } = await import('../utils/slackNotify.js');

      const user = getCurrentUser();
      if (!user) {
        await customAlert('오류', '로그인 정보가 없습니다.', 'error');
        return;
      }

      const confirmed = await customConfirm('전자서명', '이 양식을 최종 확정하고 전자서명을 진행하시겠습니까?\\n서명 후에는 폼 데이터가 잠금 처리되며 수정할 수 없습니다.');
      if (confirmed) {
        const data = collectFormData(formDef, container);
        data.signatureInfo = {
          name: user.name || '알수없음',
          department: user.department || '미지정',
          email: user.email || '',
          timestamp: new Date().toLocaleString(),
          // 5년 법정 보관기한 계산은 로케일 문자열(timestamp)이 아니라 이 ISO 값을 기준으로 한다
          // (toLocaleString()은 표시용이며 환경에 따라 형식이 달라 안정적으로 재파싱할 수 없음).
          timestampISO: new Date().toISOString()
        };

        // [신규] 문서번호는 승인(=이 전자서명) 완료 시점에만 발급한다. 기안자의 부서
        // (_createdByDept, 문서 생성 시점에 기록됨) 기준으로 번호를 매긴다.
        if (!isTxForm(formDef.id) && isInstanceForm(formDef.id) && !data.docNumber) {
          data.docNumber = await generateDocNumber(data._createdByDept);
        }

        if (isTxForm(formDef.id)) {
          setCaseFormData(formDef.id, null, data);
        } else {
          setFormData(formDef.id, data);
        }

        const link = `${window.location.origin}${window.location.pathname}?view=form&formId=${formDef.id}`;

        // [신규] 거래에 안 묶이는 회사 차원 서식(A~K 시리즈)은 앱에서 직접 서명해도 Slack 승인과
        // 동일하게 PDF를 만들어 Storage에 영구 저장하고 "서명 문서함"(signedDocuments)에 기록한다.
        // 거래별 서식(H-01 등)은 이미 lockTransaction()이 별도의 5년 보관 절차를 갖고 있으므로 건드리지 않는다.
        if (!isTxForm(formDef.id)) {
          try {
            const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');
            const docHTML = hasFormTemplate(formDef.id) ? generateFormHtml(formDef.id, data) : await generateDocumentHTML(formDef, data);
            const { default: html2pdf } = await import('html2pdf.js');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `<div style="background:white; padding:20px; font-family:Pretendard, sans-serif;">${docHTML}</div>`;
            document.body.appendChild(tempDiv);
            const pdfBlob = await html2pdf().set({
              margin: 10,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(tempDiv).outputPdf('blob');
            document.body.removeChild(tempDiv);

            const { uploadSignedPdf } = await import('../utils/attachmentStorage.js');
            const storagePath = `signed_documents/${formDef.id}/${formDef.id}_${Date.now()}.pdf`;
            const { downloadURL, sha256 } = await uploadSignedPdf(storagePath, pdfBlob);

            data.signedPdfMeta = { storagePath, downloadURL, sha256, generatedAt: new Date().toISOString() };
            await setFormData(formDef.id, data); // signedPdfMeta를 포함해 다시 저장

            const { logSignedDocument, getStorageKey } = await import('../store.js');
            await logSignedDocument({
              formId: formDef.id, storageKey: getStorageKey(formDef.id) || formDef.id, formTitle: formDef.title || formDef.id,
              docNumber: data.docNumber || '',
              drafter: data._createdBy || '', approver: data.signatureInfo.name, approverRoleLabel: formDef.approverRoleLabel || data.signatureInfo.department,
              draftDate: data.draftDate || '', approvedAt: data.signatureInfo.timestampISO, signedVia: 'app',
              visibilityScope: data.visibilityScope || 'public', createdByUid: data._createdByUid || '', approverEmail: data.signatureInfo.email || '',
              pdfUrl: downloadURL, pdfPath: storagePath, sha256
            });

            // [A-02, B-02]는 원래부터 항상 전 직원 공지 대상이고, 그 외 서식은 결재 요청 시
            // 선택한 공개범위(visibilityScope === 'public')에 따라 판단한다.
            if (['A-02', 'B-02'].includes(formDef.id) || data.visibilityScope === 'public') {
              const { sendSlackDocument, broadcastSlackDM } = await import('../utils/slackNotify.js');
              await sendSlackDocument({
                title: `📢 [${formDef.id}] ${formDef.title || ''} — 결재 완료, 전 임직원 공지`,
                pdfBlob,
                filename: `${formDef.id}_${(formDef.title || '').replace(/\s+/g, '_')}.pdf`,
                link
              });
              await broadcastSlackDM({
                title: `📢 [${formDef.id}] ${formDef.title || ''} 공지 (결재 완료)`,
                link
              });
            } else {
              notifySlackApproval({
                title: `[${formDef.id}] ${formDef.title || ''} 전자서명 완료`,
                detail: `서명자: ${data.signatureInfo.name} (${data.signatureInfo.department}) · ${data.signatureInfo.timestamp}`,
                link
              });
            }
          } catch (e) {
            console.error('서명 PDF 생성/저장 실패(전자서명 자체는 유지됨):', e);
            notifySlackApproval({
              title: `[${formDef.id}] ${formDef.title || ''} 전자서명 완료`,
              detail: `서명자: ${data.signatureInfo.name} (${data.signatureInfo.department}) · ${data.signatureInfo.timestamp}\n(PDF 자동 저장 실패 — 수동으로 PDF 다운로드 버튼을 이용해주세요)`,
              link
            });
          }
        } else {
          notifySlackApproval({
            title: `[${formDef.id}] ${formDef.title || ''} 전자서명 완료`,
            detail: `서명자: ${data.signatureInfo.name} (${data.signatureInfo.department}) · ${data.signatureInfo.timestamp}`
          });
        }

        await customAlert('서명 완료', '전자서명이 완료되었으며 문서가 잠금 처리되었습니다.', 'success');
        renderForm(formDef, container);
      }
    });
  }

  // Delete row buttons
  container.querySelectorAll('.btn-delete-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.btn-delete-row') || e.target;
      const rowIdx = parseInt(targetBtn.dataset.rowIdx);
      const tableKey = targetBtn.dataset.tableKey;
      const data = collectFormData(formDef, container);
      
      if (tableKey) {
        if (data[tableKey] && data[tableKey].length > 1) {
          data[tableKey].splice(rowIdx, 1);
          if (isTxForm(formDef.id)) {
            setCaseFormData(formDef.id, null, data);
          } else {
            setFormData(formDef.id, data);
          }
          renderForm(formDef, container);
        }
      } else {
        if (data.rows && data.rows.length > 1) {
          data.rows.splice(rowIdx, 1);
          if (isTxForm(formDef.id)) {
            setCaseFormData(formDef.id, null, data);
          } else {
            setFormData(formDef.id, data);
          }
          renderForm(formDef, container);
        }
      }
    });
  });

  // Archive Product Button (H-01 specific)
  const archiveBtn = container.querySelector('#btn-archive-product');
  if (archiveBtn) {
    archiveBtn.addEventListener('click', async () => {
      const { getProductFormData, getSelectedTransactionId } = await import('../store.js');
      const prodId = getSelectedProductId();
      const txId = getSelectedTransactionId();

      if (!txId) {
        await customAlert('거래 미지정', '이 양식은 거래(Transaction) 지정이 필요합니다.\n우측 상단의 [새 수출 거래 생성]을 통해 거래를 먼저 지정해주세요.', 'warning');
        return;
      }
      
      // 무결성 검증 로직
      // Z-01 is product-scoped, G-01 is transaction-scoped
      const z01Data = getProductFormData('Z-01', prodId);
      const g01Data = getProductFormData('G-01', prodId);
      
      if (!z01Data || Object.keys(z01Data).length === 0 || !g01Data || Object.keys(g01Data).length === 0) {
        await customAlert('보관 불가 (필수 서류 미완료)', '⚠️ 보관 실패: [Z-01. 사전진단표] 또는 [G-01. 거래심사표] 등 필수 선행 서류가 작성되지 않았습니다.\n모든 핵심 서류 작성 완료 후 보관할 수 있습니다.', 'error');
        return;
      }

      const confirmed = await customConfirm(
        '5년 보관함 이관 확정',
        '이 거래 건에 대한 모든 서류(G-01, 허가서 등)를 "출하 완료" 상태로 확정하고 법정의무에 따라 5년간 읽기 전용으로 보관하시겠습니까?\n(이후 수정 불가)',
        { confirmText: '5년 보관 확정', danger: true }
      );
      if (confirmed) {
        const { lockTransaction } = await import('../store.js');
        await lockTransaction(txId);
        await customAlert('보관 완료', '수출 거래 및 연관 서류가 5년 보관함으로 이관되었습니다.', 'success');
        renderForm(formDef, container); // re-render to apply read-only state
      }
    });
  }

  // A-01 Enactment Button
  const enactBtn = container.querySelector('#btn-enact-a01');
  if (enactBtn) {
    enactBtn.addEventListener('click', async () => {
      const { getFormData, setFormData, createSnapshot, getCurrentRegulation: getCurrentRegulationNow } = await import('../store.js');
      const a01Data = collectFormData(formDef, container);

      if (!a01Data.subject) {
        await customAlert('입력 필요', '제목(기안 내용)을 먼저 작성해 주세요.', 'warning');
        return;
      }

      const confirmed = await customConfirm(
        '규정 제·개정 승인',
        '현재 기안된 내용으로 규정을 제·개정하고 "A-05 규정 개정이력 관리대장"에 등재하시겠습니까?\n등재 즉시 이번 차수의 기안문·규정 전문이 영구 스냅샷으로 보존됩니다.'
      );
      if (confirmed) {
        // Save current A-01 just in case
        await setFormData('A-01', a01Data);

        // Load A-05 and append new row
        let a05Data = getFormData('A-05');
        if (!a05Data) a05Data = {};
        if (!a05Data.rows) a05Data.rows = [];

        // Remove empty first row if exists
        if (a05Data.rows.length === 1 && Object.keys(a05Data.rows[0]).length === 0) {
          a05Data.rows = [];
        }

        // 차수(버전) 자동 계산 — 실제 규정 내용이 바뀌는 "제정/개정" 행만 세고,
        // "정기검토(개정 불요)"는 버전을 올리지 않는다(규정 본문이 그대로이므로).
        const priorRevisions = a05Data.rows.filter(r => r && r.type !== '정기검토').length;
        const isNoRevision = !!a01Data.noRevision;
        const revisionLabel = isNoRevision ? `현행 유지 (v${priorRevisions} 재확인)` : `v${priorRevisions + 1}`;

        // 이번 차수에 실제로 사용된 기안문(A-01) 원본을 그대로 영구 스냅샷으로 고정 —
        // 나중에 규정이 또 바뀌어도 "그때 어떤 문서로 결재받았는지"가 위변조 없이 남는다.
        const a01Snap = await createSnapshot('A-01', a01Data, revisionLabel);

        // 동기화: 규정 조항 DB 업데이트 (개정 불필요가 아니며 대비표가 있는 경우)
        let regSnap = null;
        if (!isNoRevision && a01Data.tables && a01Data.tables.revisionTable) {
          const { updateRegulation } = await import('../store.js');
          await updateRegulation(a01Data.tables.revisionTable);

          // 개정이 반영된 "직후"의 규정 전문을 그대로 얼려서(freeze) 별도 스냅샷으로 보존.
          // A-01은 기안문(신청 서류)이고, 이건 그 결과로 확정된 규정 본문 자체라 별개로 남겨야
          // 나중에 "그 시점에 실제로 시행 중이던 규정 전문"을 그대로 재현할 수 있다.
          const { generateSynchronizedRegulation } = await import('../utils/regulationGenerator.js');
          const frozenRegulation = {
            clauses: getCurrentRegulationNow(),
            html: generateSynchronizedRegulation(),
            enactedAt: new Date().toISOString()
          };
          regSnap = await createSnapshot('REGULATION', frozenRegulation, revisionLabel);
        }

        a05Data.rows.push({
          type: isNoRevision ? '정기검토' : (a01Data.subject.includes('개정') ? '개정' : '제정'),
          revision: revisionLabel,
          effectiveDate: a01Data.effectiveDate || new Date().toISOString().split('T')[0],
          reason: a01Data.subject,
          approver: a01Data.approver || '',
          handler: a01Data.drafter || '',
          snapshotIds: { draft: a01Snap?.id || null, regulation: regSnap?.id || null }
        });

        await setFormData('A-05', a05Data);

        // Slack 알림 — ERB(전자결재) 시스템이 따로 없으므로, 새 차수가 등재된 사실을
        // 관리 채널에 알려 현장심사 대응 담당자가 즉시 인지할 수 있게 한다.
        const { notifySlackApproval } = await import('../utils/slackNotify.js');
        notifySlackApproval({
          title: `[A-05] 규정 개정이력 신규 등재 — ${revisionLabel}`,
          detail: `구분: ${isNoRevision ? '정기검토(개정 불요)' : '제·개정'}\n사유: ${a01Data.subject}\n결재자: ${a01Data.approver || '(미기재)'} · 시행일: ${a01Data.effectiveDate || '(미기재)'}`,
          link: `${window.location.origin}${window.location.pathname}?view=form&formId=A-05`
        });

        await customAlert('등재 완료', `A-05 개정이력 관리대장에 ${revisionLabel} 이력이 등재되고, 기안문·규정 전문이 영구 스냅샷으로 보존되었습니다.\nA-05 양식으로 이동합니다.`, 'success');

        // Navigate to A-05
        if (window.appRouter) {
          window.appRouter.navigate('form', 'A-05');
        } else {
          window.dispatchEvent(new CustomEvent('navigate-form', { detail: 'A-05' }));
        }
      }
    });
  }

  // A-05 버전 보관함 — 기안문/규정 전문 스냅샷 열람 버튼
  container.querySelectorAll('.btn-view-a01-snapshot').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { getSnapshots } = await import('../store.js');
      const snap = getSnapshots('A-01').find(s => s.id === btn.dataset.snapId);
      if (!snap) {
        await customAlert('열람 불가', '해당 스냅샷을 찾을 수 없습니다.', 'warning');
        return;
      }
      await openPreview(formDefinitions['A-01'], snap.data);
    });
  });

  container.querySelectorAll('.btn-view-reg-snapshot').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { getSnapshots } = await import('../store.js');
      const snap = getSnapshots('REGULATION').find(s => s.id === btn.dataset.snapId);
      if (!snap) {
        await customAlert('열람 불가', '해당 스냅샷을 찾을 수 없습니다.', 'warning');
        return;
      }
      const win = window.open('', '_blank', 'width=900,height=1200');
      win.document.write(`
        <!DOCTYPE html><html><head><title>규정 전문 (${snap.version})</title>
        <style>body{font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif; padding:40px; line-height:1.8; color:#111827;}</style>
        </head><body>
        <div style="text-align:center; margin-bottom:20px; padding-bottom:12px; border-bottom:2px solid #ddd; color:#6366f1; font-weight:700;">
          [영구보존 스냅샷] ${snap.version} · 확정일: ${new Date(snap.data.enactedAt || snap.timestamp).toLocaleString()}
        </div>
        ${snap.data.html || ''}
        </body></html>
      `);
      win.document.close();
    });
  });

  // file_manager 폼(L-11 등) 업로드/삭제 이벤트, 또는 mixed 폼에 곁들인 첨부 섹션(C-02 등)
  if (formDef.type === 'file_manager' || formDef.attachmentSection) {
    bindFileManagerEvents(formDef, container);
  }

  // [신규] 다회차 서식 — "회차 목록으로" 버튼
  const backToInstancesBtn = container.querySelector('#btn-back-to-instances');
  if (backToInstancesBtn) {
    backToInstancesBtn.addEventListener('click', async () => {
      await setSelectedInstanceId(formDef.id, null);
      renderForm(formDef, container);
    });
  }

  // [신규] "재작성" — 현재 보고 있는 문서 내용을 그대로 복제해 새 문서번호로 새 회차를 만든다.
  // 서명/반려/생성이력 등 "이번 승인 건에만 해당하는" 정보는 초기화하고, 원본 문서번호는
  // revisedFrom으로 남겨 이력을 추적할 수 있게 한다. (완전히 빈 새 문서는 "새 회차 작성" 버튼을 쓴다 —
  // 재작성은 항상 명시적으로 "이 문서를 기반으로" 만드는 별도 동작으로 분리했다.)
  const reviseBtn = container.querySelector('#btn-revise-document');
  if (reviseBtn) {
    reviseBtn.addEventListener('click', async () => {
      if (!canEdit()) return;
      const sourceData = getFormData(formDef.id);
      // 문서번호는 승인 완료 시에만 발급되므로, 아직 승인 전(미착수/작성중/대기중/반려) 문서는
      // docNumber가 없을 수 있다 — 그럴 땐 생성일시로 원본을 식별한다.
      const originalRef = sourceData.docNumber || `작성일 ${sourceData._createdAt ? new Date(sourceData._createdAt).toLocaleString('ko-KR') : '알수없음'}`;

      const confirmed = await customConfirm(
        '문서 재작성',
        `"${originalRef}" 문서 내용을 그대로 복제해 새 문서로 재작성하시겠습니까?\n서명/승인 정보는 초기화되며, 원본 문서는 그대로 보존됩니다.`
      );
      if (!confirmed) return;

      const cloned = { ...sourceData };
      delete cloned.docNumber;
      delete cloned.signatureInfo;
      delete cloned.rejectionInfo;
      delete cloned.signedPdfMeta;
      delete cloned.approvalRequestedAt;
      delete cloned._createdAt;
      delete cloned._createdBy;
      delete cloned._createdByDept;
      delete cloned._createdByUid;
      delete cloned.visibilityScope;
      delete cloned._lastModifiedAt;
      delete cloned._lastModifiedBy;
      cloned.revisedFrom = originalRef;

      await createFormInstance(formDef.id, cloned);
      await customAlert('재작성 완료', '새 문서로 재작성되었습니다. 필요한 부분을 수정한 뒤 다시 결재를 진행하세요. (문서번호는 승인 완료 시 발급됩니다)', 'success');
      renderForm(formDef, container);
    });
  }

  // [신규] 본인 출석 확인 버튼 (C-02 등 selfCheckIn 서식)
  const selfCheckinBtn = container.querySelector('#btn-self-checkin');
  if (selfCheckinBtn) {
    selfCheckinBtn.addEventListener('click', async () => {
      const user = getCurrentUser();
      if (!user) {
        await customAlert('오류', '로그인 정보가 없습니다.', 'error');
        return;
      }
      const { logDocumentAck } = await import('../store.js');
      await logDocumentAck(formDef.id);
      customToast('출석이 확인되었습니다.', 'success');
      renderForm(formDef, container);
    });
  }

  // Checklist events
  container.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const item = e.target.closest('.checklist-item');
      if (e.target.checked) {
        item.classList.add('checked');
      } else {
        item.classList.remove('checked');
      }
    });
  });

  // Disable all inputs if viewing a snapshot
  if (window.currentViewedSnapshotId) {
    container.querySelectorAll('input, select, textarea, button').forEach(el => {
      // Don't disable the snapshot download, or preview buttons
      if (el.id === 'btn-preview-form' || el.id === 'btn-download-form') return;
      el.disabled = true;
    });
    // Add a banner indicating read-only
    const metaBar = container.querySelector('.form-meta-bar');
    if (metaBar) {
      const banner = document.createElement('div');
      banner.innerHTML = `<div style="background:var(--accent-amber); color:white; padding:8px; text-align:center; font-weight:bold; border-radius:4px; margin-bottom:12px;">⚠️ 현재 스냅샷 버전(읽기 전용)을 열람 중입니다. 수정하려면 상단의 드롭다운에서 현행 버전으로 전환하세요.</div>`;
      metaBar.parentNode.insertBefore(banner, metaBar);
    }
  }
}

export function collectFormData(formDef, container) {
  const data = {};

  // file_manager 폼(L-11 등) 또는 첨부 섹션이 곁들여진 폼(C-02 등): 업로드/삭제가 즉시
  // 저장되므로 여기선 "저장" 버튼을 눌러도 최신 첨부파일 목록이 덮어써지지 않도록 유지한다.
  if (formDef.type === 'file_manager' || formDef.attachmentSection) {
    const root = container.querySelector(`#file-manager-${formDef.id}`);
    if (root) {
      try { data.attachments = JSON.parse(root.dataset.attachments || '[]'); } catch (e) { data.attachments = []; }
    }
  }

  // Regular text/select fields
  container.querySelectorAll('input[data-field]:not([type="checkbox"]):not([type="radio"]), textarea[data-field], select[data-field]').forEach(el => {
    data[el.dataset.field] = el.value;
  });

  // Checkbox/Radio fields
  const checkboxGroups = {};
  container.querySelectorAll('input[type="checkbox"][data-field], input[type="radio"][data-field]').forEach(el => {
    const key = el.dataset.field;
    if (el.checked) {
      if (!checkboxGroups[key]) {
        checkboxGroups[key] = [];
      }
      checkboxGroups[key].push(el.value);
    }
  });
  
  // Assign checkbox groups back to data. If only one selected, store as string, else array.
  for (const [key, values] of Object.entries(checkboxGroups)) {
    if (values.length === 1 && values[0] !== 'on') {
      data[key] = values[0];
    } else if (values.length > 1) {
      data[key] = values;
    } else if (values.length === 1 && values[0] === 'on') {
      data[key] = true;
    }
  }
  
  // For checkboxes that were not checked at all, they won't be in checkboxGroups.
  // If we need to explicitly clear them, we might need additional logic, but usually it's fine.


  // Multi-table data
  if (formDef.tables) {
    formDef.tables.forEach(tbl => {
      const tableKey = tbl.id || tbl.key;
      const tEl = container.querySelector(`table[data-table-key="${tableKey}"] tbody`);
      if (tEl) {
        data[tableKey] = [];
        tEl.querySelectorAll('tr').forEach(tr => {
          const row = {};
          tr.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.dataset.col) row[input.dataset.col] = input.value;
          });
          // Always include the row to preserve empty rows in tables
          data[tableKey].push(row);
        });
        if (tableKey === 'courses') {
          data.rows = data[tableKey];
        }
      }
    });
  }
  
  // Structured table data
  if (formDef.sections) {
    formDef.sections.forEach(section => {
      if (section.type === 'table') {
        const tableKey = section.title.replace(/\s/g, '_');
        const tEl = container.querySelector(`table[data-table-key="${tableKey}"] tbody`);
        if (tEl) {
          data[tableKey] = [];
          tEl.querySelectorAll('tr').forEach(tr => {
            const row = {};
            tr.querySelectorAll('input, select, textarea').forEach(input => {
              if (input.dataset.col) row[input.dataset.col] = input.value;
            });
            data[tableKey].push(row);
          });
        }
      }
    });
  }
  
  if (!formDef.tables && !formDef.sections) {
    // Single table data
    const table = container.querySelector('.dynamic-table tbody');
    if (table) {
      data.rows = [];
      table.querySelectorAll('tr').forEach(tr => {
        const row = {};
        tr.querySelectorAll('input, select, textarea').forEach(input => {
          if (input.dataset.col) {
            row[input.dataset.col] = input.value;
          }
        });
        data.rows.push(row);
      });
    }
  }

  // Matrix data
  const matrixSelects = container.querySelectorAll('[data-matrix-key]');
  if (matrixSelects.length > 0) {
    data.matrix = {};
    matrixSelects.forEach(sel => {
      data.matrix[sel.dataset.matrixKey] = sel.value;
    });
  }

  // Checklist data
  const checklist = container.querySelector('.checklist');
  if (checklist) {
    const checkKey = checklist.dataset.checkKey;
    if (checkKey) {
      data[checkKey] = [];
      checklist.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        data[checkKey].push(parseInt(cb.dataset.idx));
      });
    } else {
      data.checked = [];
      checklist.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        data.checked.push(parseInt(cb.dataset.idx));
      });
    }
  }

  // Multiple checklists (structured forms)
  container.querySelectorAll('.checklist[data-check-key]').forEach(cl => {
    const key = cl.dataset.checkKey;
    data[key] = [];
    cl.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      data[key].push(parseInt(cb.dataset.idx));
    });
  });

  return data;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = { success: 'check_circle', info: 'info', warning: 'warning' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-rounded">${icons[type]}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

async function openPreview(formDef, data) {
  const previewHTML = await generateDocumentHTML(formDef, data);
  const win = window.open('', '_blank', 'width=800,height=1000');
  win.document.write(previewHTML);
  win.document.close();
}

async function downloadForm(formDef, data) {
  // Now handled entirely within the btn-download-form listener using html2pdf
}

async function generateDocumentHTML(formDef, data) {
  const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');
  
  if (hasFormTemplate(formDef.id)) {
    return generateFormHtml(formDef.id, data);
  }

  let body = '';

  // Title
  body += `<h1>${formDef.id}. ${formDef.title}</h1>`;

  // Meta info
  body += `<table><tr>
    <th>대응 지표</th><td>${formDef.indicator}</td>
    <th>사용 시점</th><td>${formDef.timing}</td>
  </tr><tr>
    <th>작성 주체</th><td>${formDef.author}</td>
    <th>보존 연한</th><td>${formDef.retention}</td>
  </tr></table>`;

  // Content based on type
  if (formDef.id === 'E-02') {
    const targetContract = data.targetContract || '물품/소프트웨어 표준 공급계약서 (본문 말미 부속 특약)';
    const artNo = data.articleNumber || '제15조';
    const artTitle = data.clauseTitle || '전략물자 수출통제 준수 및 사전통보 의무';
    const c1 = data.clause1 || '';
    const c2 = data.clause2 || '';
    const c3 = data.clause3 || '';
    const note = data.productNote || '';

    body += `
      <div style="margin:20px 0; padding:20px; border:2px solid #222; border-radius:6px; background:#fafafa;">
        <h2 style="text-align:center; margin:0 0 12px 0; font-size:13pt; border-bottom:1px solid #ccc; padding-bottom:8px;">
          [표준 공급계약서 부속 특약] ${artNo} (${artTitle})
        </h2>
        <p style="font-size:9pt; color:#666; margin:0 0 14px 0;">
          ※ 본 특약 조항은 당사 <strong>「${targetContract}」</strong> 본문 조항 뒤에 이어서 삽입하여 체결하는 법적 구속력을 갖는 전략물자 준수 특약입니다.
        </p>
        <div style="font-size:10pt; line-height:1.9; color:#111;">
          ${c1 ? `<div style="margin-bottom:8px;"><strong>① [통보 의무]</strong> ${c1}</div>` : ''}
          ${c2 ? `<div style="margin-bottom:8px;"><strong>② [준수 및 재판매 통보 의무]</strong> ${c2}</div>` : ''}
          ${c3 ? `<div style="margin-bottom:8px;"><strong>③ [면책 및 손해배상]</strong> ${c3}</div>` : ''}
        </div>
      </div>
      ${note ? `
        <div style="margin:16px 0; padding:12px; border:1px dashed #888; border-radius:4px; background:#fff;">
          <strong style="font-size:9.5pt;">[제품설명서 / 견적서 / 거래명세서 삽입 권고 문구]</strong>
          <p style="margin:4px 0 0 0; font-size:9pt; color:#333; line-height:1.6;">${note}</p>
        </div>
      ` : ''}
    `;
  } else {
    switch (formDef.type) {
      case 'template':
        body += generateTemplateDoc(formDef, data);
        break;
      case 'table':
        body += generateTableDoc(formDef, data);
        break;
      case 'checklist':
        body += generateChecklistDoc(formDef, data);
        break;
      case 'mixed':
        body += generateMixedDoc(formDef, data);
        break;
      case 'matrix':
        body += generateMatrixDoc(formDef, data);
        break;
      case 'structured':
        body += generateStructuredDoc(formDef, data);
        break;
      case 'qa':
        body += generateQADoc(formDef, data);
        break;
      case 'file_manager':
        body += generateFileManagerDoc(formDef, data);
        break;
    }
  }

  // Template text if exists
  if (formDef.templateText) {
    let templateText = formDef.templateText;
    Object.keys(data).forEach(key => {
      templateText = templateText.replace(new RegExp(`\\{${key}\\}`, 'g'), data[key] || '______');
    });
    body += `<div style="margin:20px 0;line-height:2;white-space:pre-wrap">${templateText}</div>`;
  }

  // Date & Signature
  const dateField = formDef.fields?.find(f => f.key.includes('Date') || f.key.includes('date'));
  const dateVal = dateField ? (data[dateField.key] || '______년 ___월 ___일') : '';
  if (dateVal) {
    body += `<div class="doc-footer">${dateVal}</div>`;
  }
  // [신규] 승인 완료 여부에 따라 결재란을 실제로 다르게 그린다 — 미승인이면 빈 서명란,
  // 승인 완료면(Slack이든 앱이든 경로 무관) 실제 서명자/일시가 찍힌 전자서명 스탬프.
  // "PDF 다운로드" 버튼과 결재 요청 시점 미리보기 PDF가 이 함수를 공유하므로, 별도 재업로드
  // 없이 항상 최신 승인 상태를 그대로 반영한 공식 양식 PDF가 만들어진다.
  if (data.signatureInfo) {
    const sig = data.signatureInfo;
    body += `
      <div style="margin-top:30px; padding:14px 18px; border:2px solid #16a34a; border-radius:6px; background:#f0fdf4; text-align:right;">
        <div style="font-weight:700; color:#16a34a; font-size:11pt;">✅ 전자서명 완료</div>
        <div style="margin-top:6px; font-size:10.5pt; color:#111;">${data.companyName || '(주)팝콘사'} ${sig.department || sig.name || '대표이사'} <strong>${sig.name || ''}</strong> (전자서명)</div>
        <div style="margin-top:2px; font-size:9pt; color:#555;">서명일시: ${sig.timestamp || ''}${sig.signedVia === 'slack' ? ` · Slack 승인 (${sig.slackUserName || sig.slackUserId || ''})` : ''}</div>
      </div>`;
  } else {
    body += `<div class="stamp-area">${data.companyName || '(주)팝콘사'} ${data.ceoName || data.appointerName || '대표이사'} ______________ (서명 또는 인)</div>`;
  }

  // Guide
  if (formDef.guide) {
    body += `<div style="margin-top:30px;padding:10px;border:1px solid #ccc;font-size:9pt;color:#666">
      <strong>작성 요령:</strong> ${formDef.guide}
    </div>`;
  }

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<title>${formDef.id} ${formDef.title}</title>
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
<style>
  body { font-family: 'Pretendard Variable', sans-serif; max-width: 210mm; margin: 20mm auto; padding: 20px; font-size: 11pt; line-height: 1.8; color: #111; }
  h1 { text-align: center; font-size: 16pt; margin-bottom: 20px; border-bottom: 2px solid #111; padding-bottom: 10px; }
  h2 { font-size: 13pt; margin: 20px 0 10px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  th, td { border: 1px solid #333; padding: 6px 10px; font-size: 10pt; text-align: left; }
  th { background: #f0f0f0; font-weight: 600; }
  .doc-footer { margin-top: 40px; text-align: center; font-size: 11pt; }
  .stamp-area { margin-top: 20px; text-align: right; font-size: 11pt; }
  .field-block { margin: 10px 0; }
  .field-label { font-weight: 600; color: #333; }
  .field-value { margin-top: 4px; white-space: pre-wrap; }
  @media print { body { margin: 10mm; } }
</style></head><body>${body}
<script>
  // Enable print button
  document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.key === 'p') { window.print(); } });
</script>
</body></html>`;
}

export async function generateUnifiedDocumentHTML(allFormDefs, getAllDataCallback) {
  let combinedBody = '';
  const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');

  for (const formDef of Object.values(allFormDefs)) {
    const data = getAllDataCallback(formDef.id) || {};
    
    // Check if it has a custom html template (별지)
    let fullHtml = '';
    if (hasFormTemplate(formDef.id)) {
      fullHtml = generateFormHtml(formDef.id, data);
    } else {
      fullHtml = await generateDocumentHTML(formDef, data);
    }
    
    // Extract everything between <body> and <script> or </body>
    const bodyMatch = fullHtml.match(/<body>([\s\S]*?)(?:<script>|<\/body>)/);
    if (bodyMatch && bodyMatch[1]) {
      combinedBody += `<div class="pdf-page-container">
        ${bodyMatch[1]}
      </div>`;
    }
  }

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<title>CP_Manager_통합서류철</title>
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
<style>
  body { font-family: 'Pretendard Variable', sans-serif; max-width: 210mm; margin: 0 auto; padding: 0; font-size: 11pt; line-height: 1.8; color: #111; }
  .pdf-page-container {
    padding: 20mm;
    page-break-after: always;
  }
  h1 { text-align: center; font-size: 16pt; margin-bottom: 20px; border-bottom: 2px solid #111; padding-bottom: 10px; }
  h2 { font-size: 13pt; margin: 20px 0 10px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  th, td { border: 1px solid #333; padding: 6px 10px; font-size: 10pt; text-align: left; }
  th { background: #f0f0f0; font-weight: 600; }
  .doc-footer { margin-top: 40px; text-align: center; font-size: 11pt; }
  .stamp-area { margin-top: 20px; text-align: right; font-size: 11pt; }
  .field-block { margin: 10px 0; }
  .field-label { font-weight: 600; color: #333; }
  .field-value { margin-top: 4px; white-space: pre-wrap; }
  @media print {
    body { margin: 0; padding: 0; }
    .pdf-page-container { padding: 15mm; }
  }
</style></head><body onload="window.print()">
${combinedBody}
</body></html>`;
}

function generateTemplateDoc(formDef, data) {
  let html = '';
  (formDef.fields || []).forEach(field => {
    let val = data[field.key];
    if (field.type === 'checkbox') {
      if (val) {
        html += `<div class="field-block">
          <div class="field-label">${field.label}</div>
          <div class="field-value" style="font-weight:bold; color:var(--accent-blue);">☑ ${field.labelText || '선택됨'}</div>
        </div>`;
      }
    } else if (val) {
      html += `<div class="field-block">
        <div class="field-label">${field.label}</div>
        <div class="field-value">${val}</div>
      </div>`;
    }
  });
  return html;
}

function generateTableDoc(formDef, data) {
  let html = `<table><thead><tr>`;
  formDef.columns.forEach(col => { html += `<th>${col.label}</th>`; });
  html += `</tr></thead><tbody>`;
  (data.rows || []).forEach((row, idx) => {
    html += `<tr>`;
    formDef.columns.forEach(col => {
      html += `<td>${col.key === 'no' ? (idx + 1) : (row[col.key] || '')}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function generateChecklistDoc(formDef, data) {
  const checked = data.checked || [];
  let html = `<table><thead><tr><th style="width:50px">No</th><th>점검 항목</th><th style="width:60px">확인</th></tr></thead><tbody>`;
  formDef.items.forEach((item, idx) => {
    html += `<tr><td style="text-align:center">${idx + 1}</td><td>${item}</td><td style="text-align:center">${checked.includes(idx) ? '✓' : '□'}</td></tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function generateMixedDoc(formDef, data) {
  let html = generateTemplateDoc(formDef, data);
  if (formDef.columns) {
    html += `<h2>${formDef.tableTitle || '상세 내역'}</h2>`;
    html += generateTableDoc(formDef, data);
  }
  if (formDef.tables) {
    formDef.tables.forEach(tableDef => {
      html += `<h2>${tableDef.title}</h2>`;
      html += `<table><thead><tr>`;
      tableDef.columns.forEach(col => { html += `<th>${col.label}</th>`; });
      html += `</tr></thead><tbody>`;
      const rows = data.tables ? (data.tables[tableDef.id] || []) : [];
      rows.forEach((row, idx) => {
        html += `<tr>`;
        tableDef.columns.forEach(col => {
          let val = row[col.key] || '';
          if (col.type === 'textarea') {
            val = val.replace(/\n/g, '<br>');
          }
          html += `<td>${col.key === 'no' ? (idx + 1) : val}</td>`;
        });
        html += `</tr>`;
      });
      if (rows.length === 0) {
        html += `<tr><td colspan="${tableDef.columns.length}" style="text-align:center;color:#888;">데이터가 없습니다.</td></tr>`;
      }
      html += `</tbody></table>`;
    });
  }
  return html;
}

function generateMatrixDoc(formDef, data) {
  const matrix = data.matrix || {};
  let html = `<table><thead><tr><th>업무</th>`;
  formDef.matrixCols.forEach(col => { html += `<th>${col}</th>`; });
  html += `</tr></thead><tbody>`;
  formDef.matrixRows.forEach((row, rIdx) => {
    html += `<tr><td>${row}</td>`;
    formDef.matrixCols.forEach((_, cIdx) => {
      html += `<td>${matrix[`${rIdx}_${cIdx}`] || ''}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function generateStructuredDoc(formDef, data) {
  let html = '';
  (formDef.sections || []).forEach(section => {
    html += `<h2>${section.title}</h2>`;
    if (section.type === 'table') {
      const tableKey = section.title.replace(/\s/g, '_');
      html += generateTableDoc({ columns: section.columns }, { rows: data[tableKey] || [] });
    } else if (section.type === 'checklist') {
      const checkKey = section.title.replace(/\s/g, '_');
      const checked = data[checkKey] || [];
      html += `<table><tr><th>항목</th><th style="width:60px">확인</th></tr>`;
      section.items.forEach((item, idx) => {
        html += `<tr><td>${item}</td><td style="text-align:center">${checked.includes(idx) ? '✓' : '□'}</td></tr>`;
      });
      html += `</table>`;
    } else if (section.fields) {
      section.fields.forEach(f => {
        const val = data[f.key] || '';
        if (val) html += `<div class="field-block"><div class="field-label">${f.label}</div><div class="field-value">${val}</div></div>`;
      });
    }
  });
  return html;
}

function generateQADoc(formDef, data) {
  let html = `<table><thead><tr><th style="width:50px">No</th><th style="width:200px">질문</th><th>답변</th></tr></thead><tbody>`;
  (formDef.questions || []).forEach(q => {
    html += `<tr><td style="text-align:center">${q.number}</td><td>${q.question}</td><td>${data[q.key] || ''}</td></tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function generateFileManagerDoc(formDef, data) {
  const attachments = Array.isArray(data.attachments) ? data.attachments : [];
  if (attachments.length === 0) return `<p>첨부된 파일이 없습니다.</p>`;
  let html = `<table><thead><tr><th style="width:150px">분류</th><th>파일명</th><th style="width:150px">업로드일</th><th style="width:100px">업로더</th></tr></thead><tbody>`;
  attachments.forEach(a => {
    html += `<tr><td>${a.category || ''}</td><td>${a.fileName || ''}</td><td>${a.uploadedAt ? new Date(a.uploadedAt).toLocaleDateString('ko-KR') : ''}</td><td>${a.uploadedBy || ''}</td></tr>`;
  });
  html += `</tbody></table><p style="font-size:9pt;color:#666;margin-top:8px;">※ 실제 파일은 시스템 내 첨부문서함(L-11)에서 열람하세요. 이 인쇄본에는 목록만 표시됩니다.</p>`;
  return html;
}


window.initByeoljiTextareas = function(container = document) {
  const textareas = container.querySelectorAll('.byeolji-textarea');
  textareas.forEach(ta => {
    // Basic auto-resize logic
    const resize = () => {
      ta.style.height = 'auto';
      ta.style.height = (ta.scrollHeight) + 'px';
    };
    ta.addEventListener('input', resize);
    // Initial resize
    setTimeout(resize, 10);
  });
};
