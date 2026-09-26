import { getProducts, getTransactions, getFormData, setSelectedTransactionId, deleteTransaction, getDestructionLogs } from '../store.js';
import { formDefinitions } from '../forms/definitions.js';
import { customConfirm } from '../utils/dialog.js';

function getTxForms(tx) {
  const txForms = [];
  const targetPrefixes = ['Z', 'F', 'G', 'L', 'S', 'H']; 
  Object.keys(formDefinitions).forEach(fId => {
    const key = `${fId}_${tx.id}`; 
    const data = getFormData(key);
    if (data && Object.keys(data).length > 0 && targetPrefixes.includes(fId.charAt(0))) {
      txForms.push(fId);
    }
  });
  return txForms;
}

// ── 1. 진행 중인 거래 서류 (Ongoing Archive) ──
export function renderOngoingArchiveView(container, onNavigateToForm) {
  const products = getProducts();
  const allTransactions = getTransactions();
  // Filter for ongoing only
  const transactions = allTransactions.filter(t => !t.isLocked);

  let html = '<div class="fade-in">';
  html += `
    <div class="page-header" style="margin-bottom: 24px;">
      <h2 style="display:flex; align-items:center; gap:8px;">
        <span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:2rem;">folder_open</span> 
        진행 중인 거래 서류
      </h2>
      <p style="color:var(--text-secondary);">현재 작업 중이거나 아직 확정(출하 완료)되지 않은 수출 거래의 서류철입니다.<br/>문서를 클릭하면 해당 서류를 열람 및 수정할 수 있습니다.</p>
    </div>
  `;

  if (transactions.length === 0) {
    html += `
      <div style="background:var(--bg-card); padding:40px; text-align:center; border-radius:8px; border:1px solid rgba(0,0,0,0.05); color:var(--text-tertiary);">
        <span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:12px; display:block;">folder_off</span>
        <p>진행 중인 수출 거래가 없습니다.</p>
      </div>
    `;
  } else {
    html += '<div style="display:flex; flex-direction:column; gap:16px;">';
    
    // Group ongoing transactions by product
    products.forEach(prod => {
      const prodTxs = transactions.filter(t => t.prodId === prod.id);
      if (prodTxs.length === 0) return; // Hide empty product folders
      
      html += `
        <div style="border:1px solid var(--border-accent); border-radius:8px; background:var(--bg-card); overflow:hidden;">
          <div style="background:var(--accent-blue-dim); padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-accent);">
            <span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:1.5rem;">folder</span>
            <strong style="font-size:1.1rem; color:var(--text-primary);">${prod.name}</strong>
            <span style="font-size:0.8rem; color:var(--accent-blue); background:var(--bg-primary); padding:2px 8px; border-radius:12px; border:1px solid var(--border-accent);">
              진행 중 ${prodTxs.length}건
            </span>
          </div>

          <div style="padding:16px; display:flex; flex-direction:column; gap:16px;">
            ${prodTxs.map(tx => {
              const txForms = getTxForms(tx);
              return `
                <div style="margin-left:24px; border-left:2px solid var(--accent-blue); padding-left:16px; position:relative;">
                  <div style="position:absolute; left:-2px; top:12px; width:16px; height:2px; background:var(--accent-blue);"></div>
                  
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                    <span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:1.2rem;">folder_shared</span>
                    <strong style="font-size:0.95rem; color:var(--text-primary);">
                      ${tx.name} 
                      <span style="font-size:0.8rem; font-weight:normal; color:var(--text-secondary); margin-left:8px;">(${tx.country || '-'} / ${tx.buyer || '-'})</span>
                    </strong>
                    <span style="font-size:0.7rem; background:var(--accent-blue-dim); color:var(--accent-blue); padding:2px 6px; border-radius:4px; border:1px solid var(--border-accent);">작업 중</span>
                  </div>
                  
                  <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:8px; margin-left:8px;">
                    ${txForms.length === 0 ? `<div style="font-size:0.8rem; color:var(--text-tertiary);">저장된 서류가 없습니다.</div>` : ''}
                    ${txForms.map(fId => `
                      <div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="${fId}" style="display:flex; align-items:center; gap:6px; background:var(--bg-secondary); padding:6px 10px; border-radius:6px; border:1px solid var(--border-default); cursor:pointer; font-size:0.85rem; color:var(--text-primary); transition:all 0.2s;">
                        <span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--text-secondary);">description</span>
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1;">
                          <strong>${fId}</strong> ${formDefinitions[fId]?.title || ''}
                        </div>
                      </div>
                    `).join('')}
                    ${!txForms.includes('Z-01') ? `
                      <div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="Z-01" style="display:flex; align-items:center; gap:6px; background:var(--accent-blue-dim); padding:6px 10px; border-radius:6px; border:1px dashed var(--border-accent); cursor:pointer; font-size:0.85rem; color:var(--accent-blue); transition:all 0.2s;">
                        <span class="material-symbols-rounded" style="font-size:1.1rem;">add_circle</span>
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1;">
                          <strong>Z-01</strong> 진단 시작하기
                        </div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
  bindEvents(container, onNavigateToForm, renderOngoingArchiveView);
}

// ── 2. 수출 서류 보관함 (법정 5년) (Legal Archive) ──
export function renderLegalArchiveView(container, onNavigateToForm) {
  const products = getProducts();
  const allTransactions = getTransactions();
  // Filter for locked only globally
  const transactions = allTransactions.filter(t => t.isLocked);
  const destructionLogs = getDestructionLogs();

  let html = '<div class="fade-in">';
  html += `
    <div class="page-header" style="margin-bottom: 24px; background:rgba(239,68,68,0.05); padding:20px; border-radius:8px; border:1px solid rgba(239,68,68,0.2);">
      <h2 style="display:flex; align-items:center; gap:8px; color:var(--accent-red); margin-top:0;">
        <span class="material-symbols-rounded" style="font-size:2rem;">lock</span> 
        수출 서류 보관함 (법정 5년)
      </h2>
      <p style="color:var(--text-primary); font-weight:600; margin-bottom:8px;">고시 제92조에 따라 5년간 보존해야 하는 종결된(출하 완료) 거래 단위 수출 서류 묶음입니다. (읽기 전용)</p>
      <p style="color:var(--text-secondary); font-size:0.85rem; margin:0;">
        H-01(출하 전 수출통제 검토서)에서 승인/확정된 거래 내역이 이곳에 안전하게 보관됩니다. 보존 기한이 만료된 내역은 영구 파기할 수 있습니다.
      </p>
    </div>
  `;

  if (transactions.length === 0 && destructionLogs.length === 0) {
    html += `
      <div style="background:var(--bg-card); padding:40px; text-align:center; border-radius:8px; border:1px solid rgba(0,0,0,0.05); color:var(--text-tertiary);">
        <span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:12px; display:block;">inventory_2</span>
        <p>보관함에 이관된 서류 묶음이 없습니다.</p>
        <p style="font-size:0.8rem; margin-top:8px;">[출하 전 수출통제 검토서(H-01)]에서 확정 버튼을 누르면 이곳으로 이동됩니다.</p>
      </div>
    `;
  } else {
    html += '<div style="display:flex; flex-direction:column; gap:16px;">';
    
    // Group locked transactions by product
    products.forEach(prod => {
      const prodTxs = transactions.filter(t => t.prodId === prod.id);
      if (prodTxs.length === 0) return;
      
      html += `
        <div style="border:1px solid var(--border-subtle); border-radius:8px; background:var(--bg-card); overflow:hidden;">
          <div style="background:var(--bg-secondary); padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-subtle);">
            <span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:1.5rem;">inventory</span>
            <strong style="font-size:1.1rem; color:var(--text-primary);">${prod.name}</strong>
            <span style="font-size:0.8rem; color:var(--text-secondary); background:var(--bg-primary); padding:2px 8px; border-radius:12px; border:1px solid var(--border-subtle);">
              보관 완료 ${prodTxs.length}건
            </span>
          </div>

          <div style="padding:16px; display:flex; flex-direction:column; gap:12px;">
            ${prodTxs.map(tx => {
              const txForms = getTxForms(tx);
              const isExpired = new Date() >= new Date(tx.lockedExpiryDate);
              
              return `
                <div class="accordion-item" style="border:1px solid var(--border-subtle); border-radius:6px; overflow:hidden; background:var(--bg-primary);">
                  
                  <!-- Accordion Header -->
                  <div class="accordion-header" style="padding:12px 16px; display:flex; align-items:center; gap:12px; cursor:pointer; background:var(--bg-secondary); transition:background 0.2s;">
                    <span class="material-symbols-rounded expand-icon" style="color:var(--text-secondary); transition:transform 0.2s;">chevron_right</span>
                    <span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:1.2rem;">lock</span>
                    
                    <div style="flex:1;">
                      <strong style="font-size:0.95rem; color:var(--text-primary);">${tx.name}</strong>
                      <span style="font-size:0.8rem; color:var(--text-secondary); margin-left:8px;">(${tx.country || '-'} / ${tx.buyer || '-'})</span>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                      <span style="font-size:0.75rem; color:var(--text-secondary); background:var(--bg-tertiary); padding:2px 6px; border-radius:4px; border:1px solid var(--border-subtle);">
                        보관일: ${tx.lockedDate || '-'} ~ 만료일: ${tx.lockedExpiryDate || '-'}
                      </span>
                      ${isExpired ? `
                        <span style="font-size:0.75rem; color:white; background:var(--accent-red); padding:2px 6px; border-radius:4px; font-weight:bold; animation: pulse 2s infinite;">
                          보존 기한 만료 (폐기 대상)
                        </span>
                      ` : ''}
                    </div>
                  </div>
                  
                  <!-- Accordion Body (hidden by default) -->
                  <div class="accordion-body" style="display:none; padding:16px; border-top:1px solid var(--border-subtle); background:var(--bg-primary);">
                    <div style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); margin-bottom:12px;">종결 서류 목록 (읽기 전용)</div>
                    
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:8px;">
                      ${txForms.length === 0 ? `<div style="font-size:0.8rem; color:var(--text-tertiary);">보관된 서류가 없습니다.</div>` : ''}
                      ${txForms.map(fId => `
                        <div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="${fId}" style="display:flex; align-items:center; gap:6px; background:var(--bg-secondary); padding:8px 12px; border-radius:6px; border:1px solid var(--border-subtle); cursor:pointer; font-size:0.85rem; color:var(--text-primary); transition:all 0.2s;">
                          <span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--text-secondary);">description</span>
                          <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1;">
                            <strong>${fId}</strong> ${formDefinitions[fId]?.title || ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                    
                    ${isExpired ? `
                      <div style="margin-top:20px; padding-top:16px; border-top:1px dashed var(--border-subtle); display:flex; justify-content:flex-end;">
                        <button class="btn btn-primary btn-destroy-archive" data-tx-id="${tx.id}" style="background:var(--accent-red); border:none; display:flex; align-items:center; gap:4px;">
                          <span class="material-symbols-rounded" style="font-size:16px;">delete_forever</span> 영구 파기 수행
                        </button>
                      </div>
                    ` : ''}
                  </div>
                  
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    html += '</div>';

    // Destruction Log Section
    if (destructionLogs && destructionLogs.length > 0) {
      html += `
        <div style="margin-top:32px; border:1px solid rgba(0,0,0,0.1); border-radius:8px; background:var(--bg-card); overflow:hidden;">
          <div style="background:rgba(0,0,0,0.02); padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.1); display:flex; align-items:center; gap:8px;">
            <span class="material-symbols-rounded" style="color:var(--text-tertiary);">history</span>
            <strong style="font-size:1.1rem;">영구 파기 대장 (Destruction Log)</strong>
          </div>
          <div style="padding:0;">
            <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
              <thead>
                <tr style="background:var(--bg-secondary); color:var(--text-secondary);">
                  <th style="padding:10px 16px; border-bottom:1px solid var(--border-subtle);">파기 일시</th>
                  <th style="padding:10px 16px; border-bottom:1px solid var(--border-subtle);">제품명</th>
                  <th style="padding:10px 16px; border-bottom:1px solid var(--border-subtle);">거래명</th>
                  <th style="padding:10px 16px; border-bottom:1px solid var(--border-subtle);">파기 담당자</th>
                </tr>
              </thead>
              <tbody>
                ${[...destructionLogs].reverse().map(log => `
                  <tr>
                    <td style="padding:10px 16px; border-bottom:1px solid var(--border-default); color:var(--text-secondary);">${new Date(log.destroyedAt).toLocaleString()}</td>
                    <td style="padding:10px 16px; border-bottom:1px solid var(--border-default);">${log.prodName}</td>
                    <td style="padding:10px 16px; border-bottom:1px solid var(--border-default);">${log.txName}</td>
                    <td style="padding:10px 16px; border-bottom:1px solid var(--border-default); font-weight:600;">${log.destroyedBy}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  }

  html += '</div>';
  container.innerHTML = html;
  
  // Bind Accordion Events
  container.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.expand-icon');
      const isHidden = body.style.display === 'none';
      
      // Close all other accordions
      container.querySelectorAll('.accordion-body').forEach(b => b.style.display = 'none');
      container.querySelectorAll('.expand-icon').forEach(i => i.style.transform = 'rotate(0deg)');
      container.querySelectorAll('.accordion-header').forEach(h => h.style.background = 'var(--bg-secondary)');
      
      if (isHidden) {
        body.style.display = 'block';
        icon.style.transform = 'rotate(90deg)';
        header.style.background = 'var(--bg-tertiary)';
      }
    });
  });

  bindEvents(container, onNavigateToForm, renderLegalArchiveView);
}

// ── Common Event Binders ──
function bindEvents(container, onNavigateToForm, reRenderFn) {
  // Hover effect for documents
  container.querySelectorAll('.doc-file-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.borderColor = 'var(--accent-blue)';
      el.style.background = 'var(--bg-glass-strong)';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    });
    el.addEventListener('mouseleave', () => {
      if (el.dataset.formId === 'Z-01' && !el.style.border.includes('solid')) {
        el.style.borderColor = 'var(--border-accent)';
        el.style.background = 'var(--accent-blue-dim)';
        el.style.boxShadow = 'none';
      } else {
        el.style.borderColor = el.closest('.accordion-item') ? 'var(--border-subtle)' : 'var(--border-default)';
        el.style.background = el.closest('.accordion-item') ? 'var(--bg-secondary)' : 'var(--bg-secondary)';
        el.style.boxShadow = 'none';
      }
    });

    el.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.txId;
      const fId = e.currentTarget.dataset.formId;
      await setSelectedTransactionId(txId);
      window.dispatchEvent(new CustomEvent('form-status-changed')); 
      onNavigateToForm(fId);
    });
  });

  // Delete archive
  container.querySelectorAll('.btn-destroy-archive').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation(); // Prevent accordion toggle
      const txId = e.currentTarget.dataset.txId;
      const confirmed = await customConfirm(
        '영구 파기 확인',
        '보존 기한이 만료된 서류를 영구 파기하시겠습니까?\n파기된 데이터는 복구할 수 없으며 파기 대장에 기록됩니다.',
        { confirmText: '영구 파기', danger: true }
      );
      if (confirmed) {
        await deleteTransaction(txId);
        reRenderFn(container, onNavigateToForm);
      }
    });
  });
}
