// "서명 문서함" — 거래(Z/F/G/H/L/M 시리즈)에 묶이지 않는 회사 차원 서류(A~K 시리즈)의
// 전자서명 완료 이력을 한 곳에 모아 보여준다. Slack 승인(slack_interactions.js)과 앱 내
// 직접 서명(renderer.js btn-electronic-sign) 양쪽에서 쌓은 signedDocuments를 그대로 읽는다.
// 거래별 서류는 이미 "진행 중인 거래 서류"/"법정 5년 보관함"에서 관리되므로 여기서는 제외한다
// (요구사항: 두 목록을 섞지 않음).
import { getSignedDocuments, isTxForm, canViewLedgerEntry } from '../store.js';
import { SIGNED_DOC_GROUPS, getGroupForFormId } from '../data/signedDocumentGroups.js';
import { formDefinitions } from '../forms/definitions.js';

let filterState = { query: '', sort: 'desc', slackOnly: false, formId: '' };

export function renderSignedDocumentsView(container) {
  const availableFormIds = [...new Set(getSignedDocuments().filter(d => !isTxForm(d.formId) && canViewLedgerEntry(d)).map(d => d.formId))].sort();

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header" style="margin-bottom:20px;">
        <h2 style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:var(--accent-purple); font-size:2rem;">assignment_turned_in</span>
          서명 문서함
        </h2>
        <p style="color:var(--text-secondary); margin:0;">
          거래 건에 묶이지 않는 회사 차원 서류(규정·조직·교육·감사·정보보안 등)의 전자서명 완료 이력입니다.
          Slack 승인과 앱 내 직접 서명이 모두 여기에 모입니다. (수출 거래별 서류는 사이드바의 "수출 거래 서류 보관함"에서 확인하세요)
        </p>
      </div>

      <div class="card" style="padding:14px 16px; margin-bottom:16px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
        <select id="sd-form-filter" style="padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-primary); color:var(--text-primary);">
          <option value="">전체 서식</option>
          ${availableFormIds.map(fId => `<option value="${fId}" ${filterState.formId === fId ? 'selected' : ''}>[${fId}] ${fId === 'REGULATION' ? '자율수출관리규정 전문' : (formDefinitions[fId]?.title || fId)}</option>`).join('')}
        </select>
        <input type="text" id="sd-search" placeholder="서식ID, 제목, 문서번호로 검색 (예: A-01, 수출기획팀-2026)" value="${filterState.query}"
          style="flex:1; min-width:220px; padding:8px 12px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-primary); color:var(--text-primary);" />
        <select id="sd-sort" style="padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-primary); color:var(--text-primary);">
          <option value="desc" ${filterState.sort === 'desc' ? 'selected' : ''}>최신순</option>
          <option value="asc" ${filterState.sort === 'asc' ? 'selected' : ''}>오래된순</option>
        </select>
        <label style="display:flex; align-items:center; gap:6px; font-size:0.85rem; color:var(--text-secondary); cursor:pointer;">
          <input type="checkbox" id="sd-slack-only" ${filterState.slackOnly ? 'checked' : ''} />
          Slack 승인만 보기
        </label>
      </div>

      <div id="sd-groups"></div>
    </div>
  `;

  renderGroups(container);

  container.querySelector('#sd-form-filter').addEventListener('change', (e) => {
    filterState.formId = e.target.value;
    renderGroups(container);
  });
  container.querySelector('#sd-search').addEventListener('input', (e) => {
    filterState.query = e.target.value;
    renderGroups(container);
  });
  container.querySelector('#sd-sort').addEventListener('change', (e) => {
    filterState.sort = e.target.value;
    renderGroups(container);
  });
  container.querySelector('#sd-slack-only').addEventListener('change', (e) => {
    filterState.slackOnly = e.target.checked;
    renderGroups(container);
  });
}

function renderGroups(container) {
  const groupsEl = container.querySelector('#sd-groups');
  const query = filterState.query.trim().toLowerCase();

  let docs = getSignedDocuments().filter(d => !isTxForm(d.formId) && canViewLedgerEntry(d)); // 거래서식 제외 + 공개범위(비공개/부서공개) 접근 통제
  if (filterState.formId) docs = docs.filter(d => d.formId === filterState.formId);
  if (filterState.slackOnly) docs = docs.filter(d => d.signedVia === 'slack');
  if (query) {
    docs = docs.filter(d =>
      d.formId.toLowerCase().includes(query) ||
      (d.formTitle || '').toLowerCase().includes(query) ||
      (d.docNumber || '').toLowerCase().includes(query)
    );
  }
  docs.sort((a, b) => filterState.sort === 'desc'
    ? new Date(b.approvedAt) - new Date(a.approvedAt)
    : new Date(a.approvedAt) - new Date(b.approvedAt));

  if (docs.length === 0) {
    groupsEl.innerHTML = `
      <div style="background:var(--bg-card); padding:40px; text-align:center; border-radius:8px; border:1px solid rgba(0,0,0,0.05); color:var(--text-tertiary);">
        <span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:12px; display:block;">folder_off</span>
        <p>${getSignedDocuments().length === 0 ? '아직 서명 완료된 문서가 없습니다.' : '검색/필터 조건에 맞는 문서가 없습니다.'}</p>
      </div>
    `;
    return;
  }

  // formId별로 묶고, 그 formId를 그룹(SIGNED_DOC_GROUPS)에 배정
  const byForm = {};
  docs.forEach(d => {
    if (!byForm[d.formId]) byForm[d.formId] = [];
    byForm[d.formId].push(d);
  });

  const byGroup = {};
  Object.entries(byForm).forEach(([formId, entries]) => {
    const groupKey = getGroupForFormId(formId);
    if (!byGroup[groupKey]) byGroup[groupKey] = {};
    byGroup[groupKey][formId] = entries;
  });

  const orderedGroups = [...SIGNED_DOC_GROUPS, { key: 'etc', label: '기타' }].filter(g => byGroup[g.key]);

  groupsEl.innerHTML = orderedGroups.map(group => {
    const formEntries = byGroup[group.key];
    const groupCount = Object.values(formEntries).reduce((sum, arr) => sum + arr.length, 0);

    return `
      <div class="accordion-item sd-group" style="border:1px solid var(--border-subtle); border-radius:8px; margin-bottom:10px; overflow:hidden; background:var(--bg-card);">
        <div class="accordion-header sd-group-header" style="padding:12px 16px; display:flex; align-items:center; gap:10px; cursor:pointer; background:var(--bg-secondary);">
          <span class="material-symbols-rounded expand-icon" style="color:var(--text-secondary); transition:transform 0.2s;">chevron_right</span>
          <strong style="flex:1; font-size:0.95rem; color:var(--text-primary);">${group.label}</strong>
          <span style="font-size:0.78rem; color:var(--text-secondary); background:var(--bg-primary); padding:2px 8px; border-radius:12px; border:1px solid var(--border-subtle);">${groupCount}건</span>
        </div>
        <div class="accordion-body" style="display:none; padding:14px 16px; border-top:1px solid var(--border-subtle);">
          ${Object.entries(formEntries).map(([formId, entries]) => renderFormTable(formId, entries)).join('')}
        </div>
      </div>
    `;
  }).join('');

  groupsEl.querySelectorAll('.sd-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.expand-icon');
      const isHidden = body.style.display === 'none';
      body.style.display = isHidden ? 'block' : 'none';
      icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    });
  });
}

function renderFormTable(formId, entries) {
  const title = formId === 'REGULATION' ? '자율수출관리규정 전문' : (formDefinitions[formId]?.title || formId);
  const hasRevision = entries.some(e => e.revision);

  return `
    <div style="margin-bottom:18px;">
      <div style="font-size:0.88rem; font-weight:700; color:var(--text-primary); margin-bottom:6px;">
        <span style="color:var(--accent-purple);">${formId}</span> ${title}
        <span style="font-weight:400; color:var(--text-tertiary); font-size:0.78rem;">(${entries.length}건)</span>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.83rem;">
          <thead>
            <tr style="background:var(--bg-secondary); text-align:left;">
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">문서번호</th>
              ${hasRevision ? '<th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">차수</th>' : ''}
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">기안자</th>
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">결재자</th>
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">기안일</th>
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">승인일시</th>
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">서명경로</th>
              <th style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">PDF</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map(e => `
              <tr>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle); font-family:monospace; color:var(--accent-purple); font-weight:600;">${e.docNumber || '-'}</td>
                ${hasRevision ? `<td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle); color:var(--accent-blue); font-weight:600;">${e.revision || '-'}</td>` : ''}
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">${e.drafter || '-'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle); font-weight:600;">${e.approver || '-'}${e.approverRoleLabel ? ` (${e.approverRoleLabel})` : ''}</td>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">${e.draftDate || '-'}</td>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">${new Date(e.approvedAt).toLocaleString('ko-KR')}</td>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">
                  ${e.signedVia === 'slack'
                    ? `<span style="font-size:0.72rem; background:#4A154B; color:white; padding:2px 8px; border-radius:10px;">Slack</span>`
                    : `<span style="font-size:0.72rem; background:var(--accent-teal); color:white; padding:2px 8px; border-radius:10px;">앱 직접</span>`}
                </td>
                <td style="padding:8px 10px; border-bottom:1px solid var(--border-subtle);">
                  ${e.pdfUrl ? `<a href="${e.pdfUrl}" target="_blank" rel="noopener" style="color:var(--accent-blue); font-weight:600; text-decoration:none;">📄 열기</a>` : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
