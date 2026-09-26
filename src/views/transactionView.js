import { getProducts, getTransactions, addTransaction, deleteTransaction, setSelectedTransactionId, setSelectedProductId, getSelectedProductId, getCurrentUser } from '../store.js';
import { formDefinitions } from '../forms/definitions.js';
import { customFormDialog, customConfirm } from '../utils/dialog.js';

export function renderTransactionView(container, onNavigateToForm) {
  const transactions = getTransactions();
  const products = getProducts();
  const currentProdId = getSelectedProductId();
  const user = getCurrentUser();
  const canCreate = user && user.role !== 'VIEWER';

  // Filter transactions by selected product
  const productTransactions = transactions.filter(t => t.prodId === currentProdId);

  let html = '<div class="fade-in">';
  
  html += `
    <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
      <div>
        <h2 style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:2rem;">swap_horiz</span> 
          수출 거래(Transaction) 관리
        </h2>
        <p>선택된 제품(품목)에 대해 발생하는 개별 수출 거래(계약/출하 건)를 생성하고 관련 서류를 묶어서 관리합니다.</p>
      </div>
      <div>
        ${canCreate ? `
        <button class="btn btn-primary" id="btn-create-tx" style="display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-rounded">add</span> 새 수출 거래 생성
        </button>
        ` : ''}
      </div>
    </div>
  `;

  if (productTransactions.length === 0) {
    html += `
      <div style="background:var(--bg-card); padding:40px; text-align:center; border-radius:8px; border:1px solid rgba(0,0,0,0.05); color:var(--text-tertiary); margin-top:20px;">
        <span class="material-symbols-rounded" style="font-size:3rem; margin-bottom:12px; display:block;">inbox</span>
        <p>생성된 수출 거래가 없습니다.<br/>${canCreate ? '우측 상단의 [새 수출 거래 생성] 버튼을 눌러 첫 거래를 등록하세요.' : '수출 거래가 등록되면 이곳에 표시됩니다.'}</p>
      </div>
    `;
  } else {
    html += '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px; margin-top:20px;">';
    
    productTransactions.forEach(tx => {
      // Form indicators for this transaction
      const txForms = ['G-01', 'H-01', 'L-04'];
      
      html += `
        <div class="card" style="border:1px solid rgba(59,130,246,0.3); border-top:4px solid ${tx.isLocked ? 'var(--text-tertiary)' : 'var(--accent-blue)'}; position:relative; opacity: ${tx.isLocked ? '0.7' : '1'};">
          ${tx.isLocked ? `
          <div style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.05); color:var(--text-tertiary); padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;">
            <span class="material-symbols-rounded" style="font-size:1rem;">lock</span> 보관 완료
          </div>
          ` : ''}
          <h3 style="margin:0 0 4px 0; font-size:1.1rem; padding-right:60px;">${tx.name}</h3>
          <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">
            <strong>바이어:</strong> ${tx.buyer || '-'} &nbsp;|&nbsp; 
            <strong>수출대상국:</strong> ${tx.country || '-'}
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">출하/수출 예정일: ${tx.exportDate || '-'}</div>
          
          <div style="font-size:0.85rem; font-weight:600; margin-bottom:8px; color:var(--text-secondary);">거래 건별(Export Case) 통합 워크플로우</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <button class="btn btn-primary btn-nav-tx-v2" data-tx-id="${tx.id}" ${tx.isLocked ? 'disabled' : ''} style="display:flex; justify-content:center; align-items:center; gap:6px; padding:10px 12px; font-size:0.9rem; width:100%; box-shadow:var(--shadow-sm); background:var(--accent-purple); border-color:var(--accent-purple);">
              <span class="material-symbols-rounded" style="font-size:1.2rem;">rocket_launch</span> 새 CP 엔진 (V2) 시작
            </button>
            <button class="btn btn-secondary btn-nav-tx-legacy" data-tx-id="${tx.id}" ${tx.isLocked ? 'disabled' : ''} style="display:flex; justify-content:center; align-items:center; gap:6px; padding:8px 12px; font-size:0.8rem; width:100%;">
              <span class="material-symbols-rounded" style="font-size:1rem;">history</span> 구형(Legacy) 서류 작성
            </button>
          </div>
          
          ${!tx.isLocked ? `
            <div style="margin-top:16px; text-align:right;">
              <button class="btn btn-ghost btn-delete-tx" data-tx-id="${tx.id}" style="color:var(--accent-red); font-size:0.8rem; padding:4px 8px;">삭제</button>
            </div>
          ` : ''}
        </div>
      `;
    });
    
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;

  // Events
  const createBtn = container.querySelector('#btn-create-tx');
  if (createBtn) {
    createBtn.addEventListener('click', async () => {
      const formData = await customFormDialog(
        '새 수출 거래 등록',
        [
          { key: 'name', label: '수출 거래명', placeholder: '예: 독일 A사 계약건', required: true },
          { key: 'buyer', label: '바이어 / 수하인명', placeholder: '예: Bosch GmbH', required: true },
          { key: 'country', label: '수출 대상 국가', placeholder: '예: 독일', required: true },
          { key: 'exportDate', label: '예상 수출/출하일', type: 'date', default: new Date().toISOString().slice(0, 10), required: true }
        ],
        { confirmText: '거래 생성', icon: 'local_shipping' }
      );
      if (!formData || !formData.name) return;
      
      await addTransaction(currentProdId, formData.name.trim(), formData.exportDate, formData.country.trim(), formData.buyer.trim());
      renderTransactionView(container, onNavigateToForm); // Re-render
    });
  }

  container.querySelectorAll('.btn-nav-tx-v2').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.txId;
      await setSelectedTransactionId(txId);
      if (window.mountExportWizardV2) {
        window.mountExportWizardV2(txId);
      }
    });
  });

  container.querySelectorAll('.btn-nav-tx-legacy').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const txId = e.currentTarget.dataset.txId;
      await setSelectedTransactionId(txId);
      onNavigateToForm('Z-01'); // go to first legacy form
    });
  });


  container.querySelectorAll('.btn-delete-tx').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const confirmed = await customConfirm(
        '거래 삭제 확인',
        '이 거래를 삭제하시겠습니까?\n관련된 서류 기록이 모두 함께 삭제됩니다.',
        { confirmText: '거래 삭제', danger: true }
      );
      if (confirmed) {
        const txId = e.currentTarget.dataset.txId;
        await deleteTransaction(txId);
        renderTransactionView(container, onNavigateToForm);
      }
    });
  });
}
