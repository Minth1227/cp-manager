// ============================================
// Dual-use & Catch-all [별표 2의2] Search View
// ============================================

import { catchAllItems, redFlagsList } from '../data/catchAllData.js';
import { getFormData, setFormData } from '../store.js';
import { customAlert, customToast } from '../utils/dialog.js';

let cachedDualUseText = null;

export async function renderSearchView(container, onSelectForm, initialTab = 'catchall') {
  let activeTab = initialTab;

  function buildHtml() {
    return `
      <div class="view-header">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h2>전략물자 및 상황허가(Catch-all) 법정 품목 검색</h2>
            <p>전략물자수출입고시 [별표 2] 이중용도품목 및 [별표 2의2] 상황허가 대상품목을 검색하고 통제 사유를 정밀 검토합니다.</p>
          </div>
          <div style="display:flex; gap:6px;">
            <button id="tab-btn-catchall" class="btn ${activeTab === 'catchall' ? 'btn-primary' : 'btn-secondary'}" style="font-weight:600; font-size:0.85rem; padding:8px 16px;">
              🛡️ [별표 2의2] 상황허가 대상품목 (${catchAllItems.length.toLocaleString()}건)
            </button>
            <button id="tab-btn-dual" class="btn ${activeTab === 'dual' ? 'btn-primary' : 'btn-secondary'}" style="font-weight:600; font-size:0.85rem; padding:8px 16px;">
              🔍 [별표 2] 이중용도 전략물자 검색
            </button>
          </div>
        </div>
      </div>
      
      <div class="view-content" style="max-width: 1050px; margin: 0 auto; padding-top: 15px;">
        ${activeTab === 'catchall' ? renderCatchAllTab() : renderDualUseTab()}
      </div>
    `;
  }

  function renderCatchAllTab() {
    return `
      <!-- Search Filter Bar -->
      <div class="card" style="margin-bottom: 20px; padding: 18px; border-top: 4px solid var(--accent-purple);">
        <div style="margin-bottom: 12px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
          💡 <strong>상황허가(Catch-all)란?</strong> 전략물자에 해당하지 않는 일반 품목이라도 <strong>대량살상무기(WMD) 전용 우려가 있거나 고시 [별표 2의2]에 명시된 국가(이란, 시리아, 파키스탄, 러시아 등)로 수출</strong>될 경우 산업통상부장관의 상황허가를 받아야 합니다.
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <input type="text" id="catchall-search-input" placeholder="품목명, 모델, 규격, 또는 HS코드로 검색 (예: 공작기계, 펌프, 밸브, 소프트웨어, 8471...)" style="flex: 2; min-width: 260px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.95rem;">
          
          <select id="catchall-country-filter" class="form-input" style="flex: 1; min-width: 140px; padding: 10px; border-radius: 6px; font-size: 0.88rem;">
            <option value="">🌐 전체 통제 국가</option>
            <option value="이란">이란</option>
            <option value="파키스탄">파키스탄</option>
            <option value="시리아">시리아</option>
            <option value="러시아">러시아 / 벨라루스</option>
          </select>

          <select id="catchall-cat-filter" class="form-input" style="flex: 1; min-width: 140px; padding: 10px; border-radius: 6px; font-size: 0.88rem;">
            <option value="">📂 전체 품목 분류</option>
            <option value="기계/공작">기계/공작 장비</option>
            <option value="소재/금속/화학">소재/금속/화학</option>
            <option value="전기전자/반도체">전기전자/반도체</option>
            <option value="자동차/항공/수송">자동차/항공/수송</option>
            <option value="소프트웨어/통신/광학">소프트웨어/통신/광학</option>
          </select>

          <button id="catchall-search-btn" class="btn btn-primary" style="padding: 10px 22px; border-radius: 6px; font-weight: 600;">
            검색
          </button>
        </div>
      </div>
      
      <!-- Results Container -->
      <div id="catchall-results-card" class="card" style="min-height: 400px;">
        <div id="catchall-status-bar" style="margin-bottom: 16px; font-weight: 600; font-size: 0.92rem; color: var(--text-primary); display:flex; justify-content:space-between; align-items:center;">
          <span>검색어를 입력하시거나 필터를 선택하여 상황허가 대상 품목을 확인하세요. (등록: ${catchAllItems.length.toLocaleString()}건)</span>
        </div>
        <div id="catchall-list" style="display: flex; flex-direction: column; gap: 14px; max-height: 400px; overflow-y: auto; padding-right: 6px;"></div>
      </div>
    `;
  }

  function renderDualUseTab() {
    return `
      <div class="card" style="margin-bottom: 20px; padding: 18px; border-top: 4px solid var(--accent-blue);">
        <div style="display: flex; gap: 10px; align-items: center;">
          <span class="material-symbols-rounded" style="color: var(--text-tertiary);">search</span>
          <input type="text" id="dual-search-input" placeholder="전략물자 통제번호 또는 키워드 입력 (예: 5D002, 암호, 1A001, 밸브...)" style="flex: 1; padding: 11px 14px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.95rem;">
          <button id="dual-search-btn" class="btn btn-primary" style="padding: 11px 24px; border-radius: 6px; font-weight:600;">검색</button>
        </div>
      </div>
      
      <div id="dual-search-results" class="card" style="min-height: 400px; display: none;">
        <div id="dual-search-status" style="margin-bottom: 16px; font-weight: 600;"></div>
        <div id="dual-search-list" style="display: flex; flex-direction: column; gap: 14px; max-height: 400px; overflow-y: auto; padding-right: 6px;"></div>
      </div>
    `;
  }

  container.innerHTML = buildHtml();
  bindEvents();

  function bindEvents() {
    const tabCatchAll = container.querySelector('#tab-btn-catchall');
    const tabDual = container.querySelector('#tab-btn-dual');

    if (tabCatchAll && tabDual) {
      tabCatchAll.addEventListener('click', () => {
        activeTab = 'catchall';
        container.innerHTML = buildHtml();
        bindEvents();
        performCatchAllSearch();
      });

      tabDual.addEventListener('click', () => {
        activeTab = 'dual';
        container.innerHTML = buildHtml();
        bindEvents();
      });
    }

    if (activeTab === 'catchall') {
      const searchInput = container.querySelector('#catchall-search-input');
      const countryFilter = container.querySelector('#catchall-country-filter');
      const catFilter = container.querySelector('#catchall-cat-filter');
      const searchBtn = container.querySelector('#catchall-search-btn');

      if (searchBtn) searchBtn.addEventListener('click', performCatchAllSearch);
      if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') performCatchAllSearch();
        });
      }
      if (countryFilter) countryFilter.addEventListener('change', performCatchAllSearch);
      if (catFilter) catFilter.addEventListener('change', performCatchAllSearch);

      // Perform initial preview search
      performCatchAllSearch();
    } else {
      const dualInput = container.querySelector('#dual-search-input');
      const dualBtn = container.querySelector('#dual-search-btn');
      if (dualBtn) dualBtn.addEventListener('click', performDualSearch);
      if (dualInput) {
        dualInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') performDualSearch();
        });
      }
    }
  }

  function performCatchAllSearch() {
    const input = container.querySelector('#catchall-search-input');
    const countryEl = container.querySelector('#catchall-country-filter');
    const catEl = container.querySelector('#catchall-cat-filter');
    const statusBar = container.querySelector('#catchall-status-bar');
    const listEl = container.querySelector('#catchall-list');

    if (!listEl) return;

    const query = input ? input.value.trim().toLowerCase() : '';
    const selectedCountry = countryEl ? countryEl.value : '';
    const selectedCat = catEl ? catEl.value : '';

    let filtered = catchAllItems.filter(item => {
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        item.spec.toLowerCase().includes(query) || 
        item.no.toLowerCase().includes(query) ||
        (item.relatedAnnex2 && item.relatedAnnex2.toLowerCase().includes(query));
      
      const matchCountry = !selectedCountry || item.country.includes(selectedCountry);
      const matchCat = !selectedCat || item.category === selectedCat;

      return matchQuery && matchCountry && matchCat;
    });

    const displayLimit = 50;
    const count = filtered.length;
    statusBar.innerHTML = `
      <span>검색 결과: <strong style="color:var(--accent-purple);">${count}건</strong> ${count > displayLimit ? `<span style="font-size:0.8rem; font-weight:normal; color:var(--text-tertiary);">(상위 ${displayLimit}건 표시 중)</span>` : ''}</span>
      <span style="font-size:0.8rem; color:var(--text-tertiary);">💡 각 품목의 상황허가 지정 이유를 확인하세요.</span>
    `;

    if (count === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-tertiary);">
          <span class="material-symbols-rounded" style="font-size:3rem; opacity:0.5;">search_off</span>
          <p style="margin-top:10px;">조건에 일치하는 상황허가 대상 품목이 없습니다.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.slice(0, displayLimit).map(item => `
      <div class="card" style="padding:16px 18px; border:1px solid var(--border-color); border-left:4px solid var(--accent-purple); background:var(--bg-secondary); border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <div>
            <span style="display:inline-block; font-size:0.75rem; font-weight:700; background:rgba(167,139,250,0.18); color:var(--accent-purple); padding:2px 8px; border-radius:4px; margin-right:6px;">
              [별표 2의2] 번호 ${item.no}
            </span>
            <span style="display:inline-block; font-size:0.75rem; font-weight:600; background:rgba(99,102,241,0.1); color:var(--primary-color); padding:2px 8px; border-radius:4px; margin-right:6px;">
              ${item.category}
            </span>
            <strong style="font-size:1.02rem; color:var(--text-primary);">${item.name}</strong>
          </div>
          
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span style="font-size:0.78rem; font-weight:700; background:rgba(239,68,68,0.12); color:var(--accent-red); padding:3px 10px; border-radius:12px;">
              🚫 통제국가: ${item.country}
            </span>
            ${item.relatedAnnex2 ? `<span style="font-size:0.75rem; background:rgba(59,130,246,0.1); color:var(--accent-blue); padding:2px 8px; border-radius:4px;">관련: ${item.relatedAnnex2}</span>` : ''}
          </div>
        </div>

        <!-- Spec -->
        <div style="font-size:0.86rem; color:var(--text-secondary); line-height:1.6; margin-bottom:10px; background:var(--bg-card); padding:10px 14px; border-radius:6px; border:1px solid rgba(0,0,0,0.04);">
          <strong style="color:var(--text-primary);">📋 상세 통제 사양:</strong> ${item.spec}
        </div>

        <!-- Control & Check Reason (Why is this item controlled/checked?) -->
        <div style="font-size:0.83rem; line-height:1.55; background:rgba(245,158,11,0.08); border-left:3px solid var(--accent-amber); padding:8px 12px; border-radius:0 6px 6px 0; color:var(--text-primary); margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:6px; font-weight:700; color:var(--accent-amber); margin-bottom:2px;">
            <span class="material-symbols-rounded" style="font-size:1.05rem;">policy</span>
            【상황허가 지정 사유 및 통제 이유】
          </div>
          ${item.reason}
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
          <button class="btn btn-ghost btn-apply-g01" data-name="${item.name}" data-country="${item.country}" data-reason="${item.reason}" style="font-size:0.78rem; padding:4px 10px; color:var(--primary-color); display:inline-flex; align-items:center; gap:4px;">
            <span class="material-symbols-rounded" style="font-size:0.95rem;">assignment</span> G-01 거래심사표에 이 사유로 검토 반영 ↗
          </button>
        </div>
      </div>
    `).join('');

    // Bind G-01 apply buttons
    listEl.querySelectorAll('.btn-apply-g01').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const name = btn.dataset.name;
        const country = btn.dataset.country;
        const reason = btn.dataset.reason;

        try {
          const currentG01 = getFormData('G-01') || {};
          const searchMsg = `[F-01 검색기 연동 결과]\n- 별표 2의2 상황허가 대상 품목: ${name}\n- 통제 국가: ${country}\n- 통제 사유: ${reason}`;
          
          await setFormData('G-01', {
            ...currentG01,
            searchResult: searchMsg,
            catchAllItemCheck: '해당 (상황허가 대상)',
            catchAllItemName: name,
            catchAllTargetCountry: country,
            catchAllRationale: reason,
            screeningDecision: '상황허가 신청 필수 (L-01)'
          });
          
          await customAlert(
            'G-01 거래심사표 반영 완료',
            `✨ [${name}] 상황허가 검토 사유가 G-01 거래심사표에 성공적으로 반영되었습니다.\nG-01 작성 화면으로 이동합니다.`,
            'success'
          );
          if (onSelectForm) {
            onSelectForm('G-01');
          }
        } catch(err) {
          console.error(err);
          if (onSelectForm) onSelectForm('G-01');
        }
      });
    });
  }

  async function performDualSearch() {
    const input = container.querySelector('#dual-search-input');
    const resultsContainer = container.querySelector('#dual-search-results');
    const statusEl = container.querySelector('#dual-search-status');
    const listEl = container.querySelector('#dual-search-list');

    const query = input.value.trim();
    if (!query) return;

    if (query.length < 2) {
      customToast("검색어는 2글자 이상 입력해주세요.", "warning");
      return;
    }

    resultsContainer.style.display = 'block';
    statusEl.innerHTML = '<span class="material-symbols-rounded" style="animation: spin 1s linear infinite;">sync</span> 문서 로딩 중...';
    listEl.innerHTML = '';

    try {
      if (!cachedDualUseText) {
        const response = await fetch('/data/dual_use_items.txt');
        if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
        cachedDualUseText = await response.text();
      }

      statusEl.textContent = '검색 중...';

      const results = [];
      const lowerText = cachedDualUseText.toLowerCase();
      const lowerQuery = query.toLowerCase();
      
      let startIndex = 0;
      let index;
      while ((index = lowerText.indexOf(lowerQuery, startIndex)) > -1) {
        const contextStart = Math.max(0, index - 150);
        const contextEnd = Math.min(cachedDualUseText.length, index + query.length + 150);
        
        let snippet = cachedDualUseText.substring(contextStart, contextEnd);
        const lines = snippet.split('\n');
        snippet = lines.slice(1, -1).join('<br/>');
        if (snippet.length < query.length) {
          snippet = cachedDualUseText.substring(contextStart, contextEnd).replace(/\n/g, '<br/>');
        }

        results.push(snippet);
        startIndex = index + query.length;
        if (results.length >= 100) break;
      }

      if (results.length === 0) {
        statusEl.innerHTML = `"<span style="color:var(--accent-blue)">${query}</span>"에 대한 검색 결과가 없습니다.`;
      } else {
        statusEl.innerHTML = `"<span style="color:var(--accent-blue)">${query}</span>" 검색 결과 (${results.length}${results.length === 100 ? '+' : ''}건)`;
        
        const highlightRegex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        
        results.forEach((res) => {
          const item = document.createElement('div');
          item.style.cssText = 'padding: 15px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-secondary); font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary);';
          item.innerHTML = res.replace(highlightRegex, '<mark style="background: rgba(99, 133, 255, 0.2); color: var(--primary-color); font-weight: bold; padding: 0 2px; border-radius: 2px;">$1</mark>');
          listEl.appendChild(item);
        });
      }
    } catch (err) {
      statusEl.innerHTML = `<span style="color:var(--accent-red)">오류 발생: ${err.message}</span>`;
      console.error(err);
    }
  }
}
