const fs = require('fs');

const deletedCode = `
      <div class="ai-analysis-block" style="background:linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(99, 133, 255, 0.1)); border:1px solid rgba(167, 139, 250, 0.3); border-radius: var(--radius-lg); padding: var(--space-md); margin-bottom: var(--space-lg); display: flex; align-items: center; justify-content: space-between;">
        <div style="flex:1;">
          <h4 style="margin:0 0 var(--space-xs) 0; color: var(--accent-purple); font-size: 1rem; display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded">smart_toy</span> 카달로그 / 사양서 AI 자동 분석
          </h4>
          <p style="margin:0; font-size: 0.85rem; color: var(--text-secondary);">사양서(PDF/이미지)를 업로드하시면 멀티모달 AI(Gemini)가 암호화 알고리즘 등 전략물자 핵심 질의 9개 항목을 분석하여 양식을 자동으로 채워줍니다.</p>
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
    \`;
  }

  // Render based on type
  switch (formDef.type) {
    case 'template':
      html += renderTemplateForm(formDef, savedData);
      break;
    case 'table':
      html += renderTableForm(formDef, savedData);
      break;
    case 'checklist':
      html += renderChecklistForm(formDef, savedData);
      break;
    case 'mixed':
      html += renderMixedForm(formDef, savedData);
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
  }

  // Guide box
  if (formDef.guide) {
    html += \`<div class="guide-box">
      <strong>📋 작성 요령</strong>
      <p>\${formDef.guide}</p>
    </div>\`;
  }

  // Action buttons
  html += \`<div class="form-actions">
    <div class="left-actions">
      \${canEdit() ? \`
      <button class="btn btn-primary" id="btn-save-form">
        <span class="material-symbols-rounded">save</span> 저장
      </button>\` : \`<span style="color:var(--text-tertiary); font-size:0.85rem;">🔒 읽기 전용 (저장 불가)</span>\`}
    </div>
    <div class="right-actions">
      <button class="btn btn-secondary" id="btn-preview-form">
        <span class="material-symbols-rounded">visibility</span> 미리보기
      </button>
      <button class="btn btn-success" id="btn-download-form">
        <span class="material-symbols-rounded">download</span> 서류 다운로드
      </button>
    </div>
  </div>\`;

  html += \`</div>\`;
  container.innerHTML = html;

  // Bind events
  bindFormEvents(formDef, container);
}

function renderTemplateForm(formDef, savedData) {
  let html = '';
  const fields = formDef.fields || [];

  fields.forEach(field => {
    const value = savedData[field.key] || field.default || '';
    html += renderField(field, value);
  });

  return html;
}

function renderTableForm(formDef, savedData) {
  const rows = savedData.rows || [{}];
  let html = \`<div class="dynamic-table-wrapper">
    <table class="dynamic-table" id="dynamic-table-\${formDef.id}">
      <thead><tr>\`;

  formDef.columns.forEach(col => {
    html += \`<th style="min-width:\${col.width || 'auto'}">\${col.label}</th>\`;
  });
  html += \`<th style="width:40px"></th></tr></thead><tbody>\`;

  rows.forEach((row, idx) => {
    html += renderTableRow(formDef, row, idx);
  });

  html += \`</tbody></table></div>\`;
  if (canEdit()) {
    html += \`<div class="table-actions">
      <button class="btn-add-row" data-table-id="\${formDef.id}">
        <span class="material-symbols-rounded" style="font-size:16px">add</span> 행 추가
      </button>
    </div>\`;
  }
  return html;
}

function renderTableRow(formDef, row, idx) {
  let html = \`<tr data-row-idx="\${idx}">\`;
  formDef.columns.forEach(col => {
    const val = row[col.key] || '';
    if (col.key === 'no') {
      html += \`<td><input type="text" value="\${idx + 1}" data-col="\${col.key}" readonly style="color:var(--text-tertiary);text-align:center" /></td>\`;
    } else if (col.inputType === 'select') {
      html += \`<td><select data-col="\${col.key}">
        <option value="">선택</option>
        \${(col.options || []).map(o => \`<option value="\${o}" \${val === o ? 'selected' : ''}>\${o}</option>\`).join('')}
      </select></td>\`;
    } else if (col.type === 'date') {
      html += \`<td><input type="date" value="\${val}" data-col="\${col.key}" /></td>\`;
    } else {
      html += \`<td><input type="text" value="\${val}" data-col="\${col.key}" placeholder="\${col.placeholder || ''}" /></td>\`;
    }
  });
  if (canEdit()) {
    html += \`<td><button class="btn-delete-row material-symbols-rounded" data-row-idx="\${idx}">close</button></td>\`;
  } else {
    html += \`<td></td>\`;
  }
  html += \`</tr>\`;
  return html;
}

function renderChecklistForm(formDef, savedData) {
  const checked = savedData.checked || [];
  let html = \`<div class="checklist" id="checklist-\${formDef.id}">\`;

  formDef.items.forEach((item, idx) => {
    const isChecked = checked.includes(idx);
    html += \`<div class="checklist-item \${isChecked ? 'checked' : ''}">
      <input type="checkbox" data-idx="\${idx}" \${isChecked ? 'checked' : ''} />
      <span class="check-label">\${idx + 1}. \${item}</span>
    </div>\`;
  });

  const total = formDef.items.length;
  const doneCount = checked.length;
  html += \`</div>
    <div style="margin-top:var(--space-md);font-size:0.85rem;color:var(--text-secondary)">
      완료: <strong style="color:var(--status-done)">\${doneCount}</strong> / \${total} (\${total > 0 ? Math.round(doneCount / total * 100) : 0}%)
    </div>\`;

  return html;
}

function renderMixedForm(formDef, savedData) {
  let html = '';

  // Render regular fields
  if (formDef.fields) {
    formDef.fields.forEach(field => {
      const value = savedData[field.key] || field.default || '';
      html += renderField(field, value);
    });
  }

  // Render table section
  if (formDef.columns) {
    html += \`<div class="form-section">
      <h3 class="form-section-title">\${formDef.tableTitle || '상세 내역'}</h3>\`;
    html += renderTableForm({ ...formDef, id: formDef.id }, { rows: savedData.rows || [{}] });
    html += \`</div>\`;
  }

  return html;
}

function renderMatrixForm(formDef, savedData) {
  const matrixData = savedData.matrix || {};

  let html = \`<div class="dynamic-table-wrapper">
    <table class="dynamic-table" id="matrix-table-\${formDef.id}">
      <thead><tr><th style="min-width:200px">업무</th>\`;

  formDef.matrixCols.forEach(col => {
    html += \`<th style="min-width:120px">\${col}</th>\`;
  });
  html += \`</tr></thead><tbody>\`;

  formDef.matrixRows.forEach((row, rIdx) => {
    html += \`<tr><td style="font-size:0.82rem;padding:var(--space-sm) var(--space-md)">\${row}</td>\`;
    formDef.matrixCols.forEach((col, cIdx) => {
      const key = \`\${rIdx}_\${cIdx}\`;
      const val = matrixData[key] || '';
      html += \`<td><select data-matrix-key="\${key}">
        <option value="">-</option>
        \${formDef.roleOptions.map(r => \`<option value="\${r}" \${val === r ? 'selected' : ''}>\${r}</option>\`).join('')}
      </select></td>\`;
    });
    html += \`</tr>\`;
  });

  html += \`</tbody></table></div>\`;
  return html;
}

function renderStructuredForm(formDef, savedData) {
  let html = '';

  (formDef.sections || []).forEach(section => {
    html += \`<div class="form-section">
      <h3 class="form-section-title">\${section.title}</h3>\`;

    if (section.type === 'table') {
      const tableFormDef = { ...formDef, columns: section.columns };
      const tableKey = section.title.replace(/\s/g, '_');
      html += renderTableForm(tableFormDef, { rows: savedData[tableKey] || [{}] });
    } else if (section.type === 'checklist') {
      const checkKey = section.title.replace(/\s/g, '_');
      const checked = savedData[checkKey] || [];
      html += \`<div class="checklist" data-check-key="\${checkKey}">\`;
      section.items.forEach((item, idx) => {
        const isChecked = checked.includes(idx);
        html += \`<div class="checklist-item \${isChecked ? 'checked' : ''}">
          <input type="checkbox" data-idx="\${idx}" data-check-key="\${checkKey}" \${isChecked ? 'checked' : ''} />
          <span class="check-label">\${item}</span>
        </div>\`;
      });
      html += \`</div>\`;
    } else if (section.fields) {
      section.fields.forEach(field => {
        const value = savedData[field.key] || field.default || '';
        html += renderField(field, value);
      });
    }

    html += \`</div>\`;
  });

  return html;
}

function renderQAForm(formDef, savedData) {
  let html = '';

  (formDef.questions || []).forEach(q => {
    const value = savedData[q.key] || q.default || '';
    html += \`<div class="form-group" style="margin-bottom:var(--space-lg)">
      <label style="font-size:0.9rem;font-weight:600;color:var(--accent-blue)">
        Q\${q.number}. \${q.question}
      </label>\`;

    if (q.answer) {
      html += \`<div style="font-size:0.78rem;color:var(--text-tertiary);margin-bottom:var(--space-xs)">가이드: \${q.answer}</div>\`;
    }

    if (q.type === 'textarea') {
      html += \`<textarea class="form-textarea" data-field="\${q.key}" placeholder="\${q.placeholder || ''}">\${value}</textarea>\`;
    } else {
      html += \`<input class="form-input" type="text" data-field="\${q.key}" value="\${value}" placeholder="\${q.placeholder || ''}" />\`;
    }

    html += \`</div>\`;
  });

  return html;
}

function renderField(field, value) {
  let html = \`<div class="form-group">
    <label>\${field.label}\${field.required ? '<span class="required">*</span>' : ''}</label>\`;

  if (field.type === 'textarea') {
    html += \`<textarea class="form-textarea" data-field="\${field.key}" placeholder="\${field.placeholder || ''}" \${canEdit() ? '' : 'readonly'}>\${value}</textarea>\`;
  } else if (field.type === 'select') {
    html += \`<select class="form-select" data-field="\${field.key}" \${canEdit() ? '' : 'disabled'}>
      <option value="">선택</option>
      \${(field.options || []).map(o => \`<option value="\${o}" \${value === o ? 'selected' : ''}>\${o}</option>\`).join('')}
    </select>\`;
  } else if (field.type === 'date') {
    html += \`<input class="form-input" type="date" data-field="\${field.key}" value="\${value}" \${canEdit() ? '' : 'readonly'} />\`;
  } else {
    html += \`<input class="form-input" type="text" data-field="\${field.key}" value="\${value}" placeholder="\${field.placeholder || ''}" \${canEdit() ? '' : 'readonly'} />\`;
  }

  html += \`</div>\`;
  return html;
}

function bindFormEvents(formDef, container) {
  // Status select
  const statusSelect = container.querySelector(\`#status-select-\${formDef.id}\`);
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      setFormStatus(formDef.id, newStatus);
      e.target.className = \`status-select \${newStatus}\`;
      window.dispatchEvent(new CustomEvent('form-status-changed'));
    });
  }

  // Save button
  const saveBtn = container.querySelector('#btn-save-form');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const data = collectFormData(formDef, container);
      setFormData(formDef.id, data);
      // Auto-set status to progress if it was todo
      if (getFormStatus(formDef.id) === 'todo') {
        setFormStatus(formDef.id, 'progress');
        if (statusSelect) {
          statusSelect.value = 'progress';
          statusSelect.className = 'status-select progress';
        }
      }

      // Run business logic engine
      evaluateBusinessLogic(formDef.id, data);

      window.dispatchEvent(new CustomEvent('form-status-changed'));
      alert('저장되었습니다.');
    });
  }
`;

let content = fs.readFileSync('src/forms/renderer.js', 'utf8');

// The user diff removed everything right before the AI block.
// The user diff was:
// -  // AI Analysis Block (if applicable)
// +  // AI Analysis Block
// So I need to inject deletedCode right before "// AI Analysis Block"

content = content.replace('// AI Analysis Block', deletedCode + '\n  // AI Analysis Block');

// Also, the user diff deleted: previewBtn, downloadBtn, add row btn, delete row btn!
// Let's restore them too if they are missing. They were in bindFormEvents which I just restored. Wait, the user deleted them inside bindFormEvents!
const deletedButtons = `
  // Table add row button
  const previewBtn = container.querySelector('#btn-preview-form');
  if (previewBtn) {
    previewBtn.addEventListener('click', async () => {
      const data = collectFormData(formDef, container);
      setFormData(formDef.id, data);
      
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
      
      openPreview(formDef, data);
    });
  }

  // Download button
  const downloadBtn = container.querySelector('#btn-download-form');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      const data = collectFormData(formDef, container);
      setFormData(formDef.id, data);
      
      // Check if this form has an HTML template (별지)
      try {
        const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');
        if (hasFormTemplate(formDef.id)) {
          const html = generateFormHtml(formDef.id, data);
          const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = \`\${formDef.id}_\${formDef.title.replace(/\\s+/g, '_')}.html\`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showToast(\`\${formDef.title} 다운로드 완료 (브라우저에서 열어 Ctrl+P로 PDF 인쇄 가능)\`, 'success');
          return;
        }
      } catch (e) {
        showToast('다운로드 중 오류: ' + e.message, 'error');
        console.warn(e);
      }
      
      downloadForm(formDef, data);
    });
  }

  // Add row buttons
  container.querySelectorAll('.btn-add-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = collectFormData(formDef, container);
      setFormData(formDef.id, data);
      // Re-render with new empty row
      const currentData = getFormData(formDef.id);
      if (!currentData.rows) currentData.rows = [];
      currentData.rows.push({});
      setFormData(formDef.id, currentData);
      renderForm(formDef, container);
    });
  });

  // Delete row buttons
  container.querySelectorAll('.btn-delete-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rowIdx = parseInt(e.target.dataset.rowIdx);
      const data = collectFormData(formDef, container);
      if (data.rows && data.rows.length > 1) {
        data.rows.splice(rowIdx, 1);
        setFormData(formDef.id, data);
        renderForm(formDef, container);
      }
    });
  });
`;

content = content.replace('// Checklist events', deletedButtons + '\n  // Checklist events');

fs.writeFileSync('src/forms/renderer.js', content, 'utf8');
