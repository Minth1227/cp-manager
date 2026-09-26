/**
 * Custom Modal & Dialog Utility
 * Replaces native alert, confirm, and prompt with modern, accessible, styled dialogs.
 */

// ── Toast Notifications ──
let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'custom-toast-container';
    toastContainer.className = 'custom-toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function customToast(message, type = 'info', duration = 3200) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type} fade-in`;

  const iconMap = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error'
  };
  const icon = iconMap[type] || 'info';

  toast.innerHTML = `
    <span class="material-symbols-rounded toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// ── Custom Alert ──
export function customAlert(titleOrMsg, maybeMsg = '', type = 'info') {
  return new Promise((resolve) => {
    let title = '알림';
    let message = '';

    if (!maybeMsg) {
      message = titleOrMsg;
      if (message.includes('오류') || message.includes('실패') || message.includes('불가')) {
        type = 'error';
      } else if (message.includes('완료') || message.includes('성공') || message.includes('등록') || message.includes('저장')) {
        type = 'success';
      } else if (message.includes('주의') || message.includes('경고') || message.includes('⚠️')) {
        type = 'warning';
      }
    } else {
      title = titleOrMsg;
      message = maybeMsg;
    }

    const iconMap = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error'
    };
    const icon = iconMap[type] || 'info';

    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay fade-in';
    overlay.innerHTML = `
      <div class="custom-modal-card custom-modal-alert">
        <div class="modal-icon-wrapper modal-icon-${type}">
          <span class="material-symbols-rounded">${icon}</span>
        </div>
        <h3 class="modal-title">${title}</h3>
        <div class="modal-message">${message.replace(/\n/g, '<br/>')}</div>
        <div class="modal-actions">
          <button class="btn btn-primary modal-btn-confirm" style="min-width: 100px;">확인</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnConfirm = overlay.querySelector('.modal-btn-confirm');
    btnConfirm.focus();

    function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 200);
      resolve();
    }

    function handleKeyDown(e) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        cleanup();
      }
    }

    btnConfirm.addEventListener('click', cleanup);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup();
    });
    document.addEventListener('keydown', handleKeyDown);
  });
}

// ── Custom Confirm ──
export function customConfirm(titleOrMsg, maybeMsg = '', options = {}) {
  return new Promise((resolve) => {
    let title = '확인 요청';
    let message = '';
    let opts = options;

    if (typeof maybeMsg === 'object' && maybeMsg !== null) {
      opts = maybeMsg;
      message = titleOrMsg;
    } else if (!maybeMsg) {
      message = titleOrMsg;
    } else {
      title = titleOrMsg;
      message = maybeMsg;
    }

    const {
      confirmText = '확인',
      cancelText = '취소',
      danger = false,
      type = danger ? 'warning' : 'info'
    } = opts;

    const iconMap = {
      info: 'help_outline',
      warning: 'warning',
      error: 'dangerous',
      success: 'check_circle'
    };
    const icon = iconMap[type] || (danger ? 'warning' : 'help_outline');

    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay fade-in';
    overlay.innerHTML = `
      <div class="custom-modal-card custom-modal-confirm">
        <div class="modal-icon-wrapper modal-icon-${danger ? 'danger' : type}">
          <span class="material-symbols-rounded">${icon}</span>
        </div>
        <h3 class="modal-title">${title}</h3>
        <div class="modal-message">${message.replace(/\n/g, '<br/>')}</div>
        <div class="modal-actions">
          <button class="btn btn-secondary modal-btn-cancel">${cancelText}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} modal-btn-confirm">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnConfirm = overlay.querySelector('.modal-btn-confirm');
    const btnCancel = overlay.querySelector('.modal-btn-cancel');
    btnConfirm.focus();

    function close(result) {
      document.removeEventListener('keydown', handleKeyDown);
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 200);
      resolve(result);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        close(true);
      }
    }

    btnConfirm.addEventListener('click', () => close(true));
    btnCancel.addEventListener('click', () => close(false));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(false);
    });
    document.addEventListener('keydown', handleKeyDown);
  });
}

// ── Custom Prompt ──
export function customPrompt(title, message = '', defaultValue = '', placeholder = '') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay fade-in';
    overlay.innerHTML = `
      <div class="custom-modal-card custom-modal-prompt">
        <div class="modal-icon-wrapper modal-icon-info">
          <span class="material-symbols-rounded">edit_note</span>
        </div>
        <h3 class="modal-title">${title}</h3>
        ${message ? `<div class="modal-message">${message.replace(/\n/g, '<br/>')}</div>` : ''}
        <div class="modal-input-wrapper">
          <input type="text" class="form-input modal-input" value="${defaultValue}" placeholder="${placeholder}" />
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary modal-btn-cancel">취소</button>
          <button class="btn btn-primary modal-btn-confirm">확인</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector('.modal-input');
    const btnConfirm = overlay.querySelector('.modal-btn-confirm');
    const btnCancel = overlay.querySelector('.modal-btn-cancel');

    input.focus();
    input.select();

    function close(result) {
      document.removeEventListener('keydown', handleKeyDown);
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 200);
      resolve(result);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(null);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        close(input.value);
      }
    }

    btnConfirm.addEventListener('click', () => close(input.value));
    btnCancel.addEventListener('click', () => close(null));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(null);
    });
    document.addEventListener('keydown', handleKeyDown);
  });
}

// ── Custom Multi-Field Form Dialog ──
/**
 * @param {string} title
 * @param {Array<{key: string, label: string, type?: string, default?: string, placeholder?: string, required?: boolean, description?: string}>} fields
 * @param {Object} options
 */
export function customFormDialog(title, fields, options = {}) {
  return new Promise((resolve) => {
    const {
      message = '',
      confirmText = '등록',
      cancelText = '취소',
      icon = 'app_registration'
    } = options;

    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay fade-in';

    let fieldsHtml = '';
    fields.forEach((f) => {
      fieldsHtml += `
        <div class="form-group" style="text-align: left; margin-bottom: 12px;">
          <label class="form-label" style="font-size: 0.85rem; margin-bottom: 4px; display: block;">
            ${f.label} ${f.required ? '<span class="required">*</span>' : ''}
          </label>
          ${f.description ? `<div style="font-size:0.75rem; color:var(--text-tertiary); margin-bottom:4px;">${f.description}</div>` : ''}
          ${f.type === 'select' ? `
          <select class="form-input modal-form-field" data-key="${f.key}" ${f.required ? 'required' : ''}>
            ${(f.options || []).map(o => {
              const val = typeof o === 'object' ? o.value : o;
              const label = typeof o === 'object' ? o.label : o;
              return `<option value="${val}" ${val === f.default ? 'selected' : ''}>${label}</option>`;
            }).join('')}
          </select>
          ` : `
          <input
            type="${f.type || 'text'}"
            class="form-input modal-form-field"
            data-key="${f.key}"
            value="${f.default || ''}"
            placeholder="${f.placeholder || ''}"
            ${f.required ? 'required' : ''}
          />
          `}
        </div>
      `;
    });

    overlay.innerHTML = `
      <div class="custom-modal-card custom-modal-form" style="max-width: 480px; width: 92%;">
        <div class="modal-icon-wrapper modal-icon-info">
          <span class="material-symbols-rounded">${icon}</span>
        </div>
        <h3 class="modal-title">${title}</h3>
        ${message ? `<div class="modal-message" style="margin-bottom: 16px;">${message.replace(/\n/g, '<br/>')}</div>` : ''}
        <form class="modal-form-body" onsubmit="return false;">
          ${fieldsHtml}
          <div class="modal-actions" style="margin-top: 20px;">
            <button type="button" class="btn btn-secondary modal-btn-cancel">${cancelText}</button>
            <button type="submit" class="btn btn-primary modal-btn-confirm">${confirmText}</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);

    const firstInput = overlay.querySelector('.modal-form-field');
    if (firstInput) {
      firstInput.focus();
      if (typeof firstInput.select === 'function') firstInput.select(); // <select>는 .select()가 없으므로 가드
    }

    const form = overlay.querySelector('.modal-form-body');
    const btnCancel = overlay.querySelector('.modal-btn-cancel');

    function close(result) {
      document.removeEventListener('keydown', handleKeyDown);
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 200);
      resolve(result);
    }

    function submit() {
      const inputs = overlay.querySelectorAll('.modal-form-field');
      const data = {};
      let hasError = false;

      inputs.forEach(input => {
        const key = input.dataset.key;
        const val = input.value.trim();
        if (input.hasAttribute('required') && !val) {
          input.style.borderColor = 'var(--accent-red)';
          input.focus();
          hasError = true;
          return;
        } else {
          input.style.borderColor = '';
        }
        data[key] = val;
      });

      if (hasError) return;
      close(data);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(null);
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submit();
    });

    btnCancel.addEventListener('click', () => close(null));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(null);
    });
    document.addEventListener('keydown', handleKeyDown);
  });
}
