// ============================================
// Regulation View Component
// ============================================
import { generateSynchronizedRegulation } from '../utils/regulationGenerator.js';
import { getCurrentUser, logRegulationView } from '../store.js';
import { customAlert, customToast } from '../utils/dialog.js';

export function renderRegulationView(container) {
  const user = getCurrentUser();
  const isViewer = user && user.role === 'VIEWER';

  // 규정 열람확인대장(A-03) 자동 기록 — 결재가 아니라 "지금 이 사람이 규정을 열람했다"는 사실만 기록.
  // 화면 렌더를 막지 않도록 기다리지 않고(fire-and-forget) 백그라운드로 처리.
  logRegulationView();
  
  const savedData = JSON.parse(localStorage.getItem('cp_manager_data')) || {};
  const isCustomMode = savedData.regulationUseCustom || false;
  
  const generatedHtml = generateSynchronizedRegulation();
  const contentHtml = (isCustomMode && savedData.regulationHtml) ? savedData.regulationHtml : generatedHtml;

  let html = `
    <div class="fade-in">
      <div class="page-header" style="margin-bottom:1.5rem;">
        <div class="breadcrumb">대시보드 <span style="margin:0 4px;">›</span> 사내 규정 <span style="margin:0 4px;">›</span> <span>자율수출관리규정 전문</span></div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="margin:0 0 4px 0;">자율수출관리규정 (사내 규정)</h2>
            <p style="margin:0; color:var(--text-secondary); font-size:0.88rem;">
              전략물자수출입고시 <strong>[별표 7] 표준규정 22대 조항 전문</strong> 및 <strong>AA등급 심사기준(D-03, E-02, A-07, B-01 등)</strong> 실시간 연동
            </p>
          </div>
          
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${!isViewer ? `
            <button class="btn btn-secondary" id="btn-sync-regulation" style="display:inline-flex; align-items:center; gap:6px; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.3); color:var(--primary-color); font-weight:600;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">sync</span> 서식 데이터 즉시 동기화
            </button>
            ` : ''}
            <button class="btn btn-secondary" id="btn-copy-regulation" style="display:inline-flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">content_copy</span> 전문 복사
            </button>
            <button class="btn btn-secondary" id="btn-print-regulation" style="display:inline-flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">print</span> 규정 인쇄 / PDF
            </button>
            ${!isViewer ? `
            <button class="btn btn-primary" id="btn-save-regulation" style="display:inline-flex; align-items:center; gap:6px;">
              <span class="material-symbols-rounded" style="font-size:1.1rem;">save</span> 규정 저장
            </button>
            ` : ''}
          </div>
        </div>

        <!-- Mode Toggle & Sync Status Banner -->
        <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:var(--bg-card); padding:10px 16px; border-radius:8px; border:1px solid rgba(0,0,0,0.06);">
          <div style="display:flex; align-items:center; gap:10px; font-size:0.85rem;">
            <span style="font-weight:600; color:var(--text-secondary);">규정 모드:</span>
            <label style="display:inline-flex; align-items:center; gap:4px; cursor:${isViewer ? 'not-allowed' : 'pointer'}; opacity:${isViewer ? '0.6' : '1'};">
              <input type="radio" name="reg-mode" value="sync" ${!isCustomMode ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              <strong style="color:var(--accent-green)">🔄 실시간 자동 동기화 모드 (권장)</strong>
            </label>
            <label style="display:inline-flex; align-items:center; gap:4px; cursor:${isViewer ? 'not-allowed' : 'pointer'}; margin-left:10px; opacity:${isViewer ? '0.6' : '1'};">
              <input type="radio" name="reg-mode" value="custom" ${isCustomMode ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              <span style="color:var(--text-secondary)">✏️ 수기 직접 편집 모드</span>
            </label>
          </div>
          <div style="font-size:0.8rem; color:var(--text-tertiary);">
            * D-03(정보보안), E-02(계약서조항), A-07(업무분장), B-01(이행선언), H-01(출하점검) 등 서식 수정 시 자동 반영
          </div>
        </div>
      </div>
      
      <div class="card regulation-card" style="background:var(--bg-surface); padding:2rem; border-radius:10px; box-shadow:var(--shadow-sm); border:1px solid rgba(0,0,0,0.08);">
        <div class="regulation-content" id="reg-content" contenteditable="${isCustomMode && !isViewer}" style="outline: none; transition: all 0.2s; min-height: 600px;">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const contentDiv = document.getElementById('reg-content');
  const modeRadios = container.querySelectorAll('input[name="reg-mode"]');

  // Mode Radio toggle
  modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const isCustom = e.target.value === 'custom';
      const data = JSON.parse(localStorage.getItem('cp_manager_data')) || {};
      data.regulationUseCustom = isCustom;
      localStorage.setItem('cp_manager_data', JSON.stringify(data));
      
      if (!isCustom) {
        contentDiv.innerHTML = generateSynchronizedRegulation();
        contentDiv.setAttribute('contenteditable', 'false');
        contentDiv.style.border = 'none';
      } else {
        contentDiv.setAttribute('contenteditable', isViewer ? 'false' : 'true');
        contentDiv.style.border = '2px dashed var(--primary-color)';
        if (!isViewer) contentDiv.focus();
      }
    });
  });

  // Sync button click
  document.getElementById('btn-sync-regulation')?.addEventListener('click', () => {
    // 1. Generate latest HTML
    const latestHtml = generateSynchronizedRegulation();
    
    // 2. Parse latest HTML to extract latest field values
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = latestHtml;
    const latestFields = Array.from(tempDiv.querySelectorAll('[data-reg-field]'));
    
    // 3. Find current field values in contentDiv
    const currentFields = Array.from(contentDiv.querySelectorAll('[data-reg-field]'));
    
    // 4. Compare and collect differences
    const diffs = [];
    latestFields.forEach(latestEl => {
      const key = latestEl.getAttribute('data-reg-field');
      const currentEl = currentFields.find(el => el.getAttribute('data-reg-field') === key);
      
      const latestText = latestEl.innerHTML.trim();
      const currentText = currentEl ? currentEl.innerHTML.trim() : '';
      
      if (latestText !== currentText) {
        // Skip duplicate keys in diff display if already added (e.g. companyName appears multiple times)
        if (diffs.some(d => d.key === key)) return;

        let label = key;
        if (key === 'companyName') label = '회사명';
        else if (key === 'draftDate') label = '규정 제정일';
        else if (key === 'effectiveDate') label = '규정 시행일';
        else if (key === 'ceoName') label = '최고경영자 (B-01)';
        else if (key === 'judgeRole') label = '판정 담당 (A-07)';
        else if (key === 'tradeRole') label = '거래심사 담당 (A-07)';
        else if (key === 'clearanceRole') label = '출하관리 담당 (A-07)';
        else if (key === 'auditorRole') label = '내부감사 담당 (A-07)';
        else if (key === 'cpManagerName') label = '기구장 (A-06)';
        else if (key === 'contractClauseHtml') label = '계약서 조항 (E-02)';
        else if (key === 'securityGuidelineHtml') label = '보안 지침 (D-03)';
        else if (key === 'auditCycleText') label = '감사 주기 (C-07)';
        else if (key === 'trainingCycleText') label = '교육 주기 (C-00)';
        else if (key === 'declarationDateText') label = '이행선언 날짜 (B-01)';
        else if (key === 'docManagementText') label = '문서관리 원칙 (D-01)';
        else if (key === 'foreignStaffProcedureText') label = '외국인 인력 신원확인 절차 (D-05)';
        else if (key === 'e01Count') label = '국내거래 통보서 누적 건수 (E-01)';
        else if (key === 'g04Count') label = '절차 보류 지시 누적 건수 (G-04)';
        else if (key === 'j01Count') label = '자진신고 누적 건수 (J-01)';
        
        diffs.push({ key, label, current: currentText, latest: latestText });
      }
    });

    if (diffs.length === 0) {
      customAlert('동기화 최신 상태', '모든 항목이 최신 서식 데이터와 일치합니다.\n(변경할 내용이 없습니다)', 'info');
      return;
    }

    // 5. Build and show the modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:9999;';
    
    let rowsHtml = diffs.map((d, i) => `
      <tr style="border-bottom:1px solid var(--border-color);">
        <td style="padding:10px; text-align:center;">
          <input type="checkbox" class="reg-sync-cb" data-key="${d.key}" value="${encodeURIComponent(d.latest)}" checked>
        </td>
        <td style="padding:10px; font-weight:600; color:var(--text-primary);">${d.label}</td>
        <td style="padding:10px; color:var(--text-secondary); max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${d.current.replace(/"/g, '&quot;')}">${d.current || '<span style="color:#9ca3af;font-style:italic;">(없음)</span>'}</td>
        <td style="padding:10px; color:var(--accent-green); max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${d.latest.replace(/"/g, '&quot;')}">${d.latest}</td>
      </tr>
    `).join('');

    modal.innerHTML = `
      <div style="background:white; padding:24px; border-radius:12px; width:900px; max-width:90%; box-shadow:0 10px 25px rgba(0,0,0,0.2); max-height:85vh; display:flex; flex-direction:column;">
        <h3 style="margin-top:0; color:var(--primary-color); display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-rounded">sync</span> 사내 규정 맞춤 동기화
        </h3>
        <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:16px; line-height:1.5;">
          최신 서식 데이터와 현재 규정 전문의 내용이 다른 항목들입니다.<br>
          동기화할 항목을 선택하시면 <strong>선택된 항목만 핀셋 교체</strong>되며, 수기로 편집하신 다른 조항들은 그대로 유지됩니다.
        </p>
        
        <div style="overflow-y:auto; flex:1; border:1px solid var(--border-color); border-radius:6px; margin-bottom:16px;">
          <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
            <thead style="background:var(--bg-surface); position:sticky; top:0; z-index:1;">
              <tr>
                <th style="padding:10px; width:40px; border-bottom:1px solid var(--border-color);"><input type="checkbox" id="reg-sync-all" checked></th>
                <th style="padding:10px; text-align:left; border-bottom:1px solid var(--border-color);">항목명 (출처)</th>
                <th style="padding:10px; text-align:left; border-bottom:1px solid var(--border-color);">현재 규정에 적힌 내용</th>
                <th style="padding:10px; text-align:left; border-bottom:1px solid var(--border-color);">최신 서식 내용 (변경안)</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
        
        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button class="btn btn-secondary" id="btn-reg-sync-cancel">취소</button>
          <button class="btn btn-primary" id="btn-reg-sync-apply">선택 항목 동기화</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Modal logic
    const closeRegModal = () => { if(modal.parentNode) modal.parentNode.removeChild(modal); };
    
    modal.querySelector('#btn-reg-sync-cancel').addEventListener('click', closeRegModal);
    
    const checkAll = modal.querySelector('#reg-sync-all');
    const cbs = modal.querySelectorAll('.reg-sync-cb');
    checkAll.addEventListener('change', (e) => {
      cbs.forEach(cb => cb.checked = e.target.checked);
    });

    modal.querySelector('#btn-reg-sync-apply').addEventListener('click', () => {
      let count = 0;
      cbs.forEach(cb => {
        if (cb.checked) {
          const key = cb.dataset.key;
          const val = decodeURIComponent(cb.value);
          // Find ALL matching data-reg-field in contentDiv and replace their innerHTML
          const targets = contentDiv.querySelectorAll(`[data-reg-field="${key}"]`);
          targets.forEach(t => {
            t.innerHTML = val;
            count++;
          });
        }
      });
      
      if (count > 0) {
        // Ensure we are back in "custom" mode if they manually edited something, but usually partial update means we just save
        const currentHtml = contentDiv.innerHTML;
        const data = JSON.parse(localStorage.getItem('cp_manager_data')) || {};
        data.regulationHtml = currentHtml;
        localStorage.setItem('cp_manager_data', JSON.stringify(data));
        customAlert('동기화 완료', `${count}개 영역이 성공적으로 부분 동기화(교체)되었습니다!`, 'success');
      }
      closeRegModal();
    });
  });

  // Copy button click
  document.getElementById('btn-copy-regulation')?.addEventListener('click', () => {
    navigator.clipboard.writeText(contentDiv.innerText);
    customToast('자율수출관리규정 전문이 클립보드에 복사되었습니다.', 'success');
  });

  // Print button click
  document.getElementById('btn-print-regulation')?.addEventListener('click', () => {
    const printWin = window.open('', '_blank', 'width=900,height=1200');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>자율수출관리규정_${new Date().toISOString().slice(0, 10)}</title>
        <style>
          body { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; line-height: 1.8; color: #111827; padding: 40px; }
          h1 { text-align: center; font-size: 24px; margin-bottom: 20px; }
          h3 { font-size: 16px; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
          p { margin: 8px 0; font-size: 13px; text-align: justify; }
          .sync-badge { display: none; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${contentDiv.innerHTML}
      </body>
      </html>
    `);
    printWin.document.close();
    setTimeout(() => {
      printWin.print();
    }, 250);
  });

  // Save button click
  document.getElementById('btn-save-regulation')?.addEventListener('click', () => {
    const currentHtml = contentDiv.innerHTML;
    const data = JSON.parse(localStorage.getItem('cp_manager_data')) || {};
    data.regulationHtml = currentHtml;
    localStorage.setItem('cp_manager_data', JSON.stringify(data));
    customAlert('저장 완료', '규정 내용이 성공적으로 저장되었습니다.', 'success');
  });
}

