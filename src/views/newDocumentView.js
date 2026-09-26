// "새 문서 만들기" — 드롭다운에서 서식을 고르면 빈 양식으로 바로 새 문서(새 문서번호)를 만든다.
// 대상은 문서번호 체계가 적용된 다회차 서식(instanceForms)뿐이다. 완전히 빈 문서를 원할 때 쓰는
// 진입점이고, "이 문서를 기반으로" 만들고 싶을 때는 해당 문서 페이지의 "재작성" 버튼을 쓴다.
import { instanceForms, createFormInstance, isTxForm } from '../store.js';
import { formDefinitions } from '../forms/definitions.js';
import { SIGNED_DOC_GROUPS, getGroupForFormId } from '../data/signedDocumentGroups.js';

export function renderNewDocumentView(container, onNavigateToForm) {
  const eligibleFormIds = instanceForms.filter(fId => !isTxForm(fId) && formDefinitions[fId]);

  const byGroup = {};
  eligibleFormIds.forEach(fId => {
    const g = getGroupForFormId(fId);
    if (!byGroup[g]) byGroup[g] = [];
    byGroup[g].push(fId);
  });
  const orderedGroups = [...SIGNED_DOC_GROUPS, { key: 'etc', label: '기타' }].filter(g => byGroup[g.key]);

  const optionsHtml = orderedGroups.map(g => `
    <optgroup label="${g.label}">
      ${byGroup[g.key].map(fId => `<option value="${fId}">[${fId}] ${formDefinitions[fId]?.title || fId}</option>`).join('')}
    </optgroup>
  `).join('');

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header" style="margin-bottom:20px;">
        <h2 style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:var(--accent-teal); font-size:2rem;">note_add</span>
          새 문서 만들기
        </h2>
        <p style="color:var(--text-secondary); margin:0;">
          서식을 선택하면 빈 양식으로 새 문서가 만들어지고 문서번호가 자동으로 발급됩니다.
          기존 문서 내용을 기반으로 만들고 싶다면, 그 문서 페이지의 "재작성" 버튼을 이용하세요.
        </p>
      </div>

      <div class="card" style="padding:24px; max-width:560px;">
        <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-secondary); margin-bottom:6px;">서식 선택</label>
        <select id="nd-form-select" style="width:100%; padding:10px 12px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-primary); color:var(--text-primary); font-size:0.9rem; margin-bottom:16px;">
          <option value="">-- 서식을 선택하세요 --</option>
          ${optionsHtml}
        </select>
        <div id="nd-desc" style="font-size:0.82rem; color:var(--text-tertiary); margin-bottom:16px; min-height:20px;"></div>
        <button type="button" id="nd-create-btn" class="btn btn-primary" disabled style="width:100%; padding:12px; font-weight:600; display:flex; align-items:center; justify-content:center; gap:6px;">
          <span class="material-symbols-rounded">add_circle</span> 새 문서 만들기
        </button>
      </div>
    </div>
  `;

  const select = container.querySelector('#nd-form-select');
  const descEl = container.querySelector('#nd-desc');
  const createBtn = container.querySelector('#nd-create-btn');

  select.addEventListener('change', () => {
    const fId = select.value;
    createBtn.disabled = !fId;
    descEl.textContent = fId ? (formDefinitions[fId]?.guide || formDefinitions[fId]?.legalBasis || '') : '';
  });

  createBtn.addEventListener('click', async () => {
    const fId = select.value;
    if (!fId) return;
    createBtn.disabled = true;
    createBtn.innerHTML = '<span class="material-symbols-rounded spin">sync</span> 생성 중...';
    try {
      await createFormInstance(fId, {});
      onNavigateToForm(fId);
    } finally {
      createBtn.disabled = false;
      createBtn.innerHTML = '<span class="material-symbols-rounded">add_circle</span> 새 문서 만들기';
    }
  });
}
