import { db } from '../firebase.js';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { customAlert } from '../utils/dialog.js';
import {
  getSlackWebhookUrl, setSlackWebhookUrl,
  getSlackBotToken, setSlackBotToken,
  getSlackAnnounceChannelId, setSlackAnnounceChannelId,
  getSlackOrgChannelId, setSlackOrgChannelId,
  getSlackApproverIds, setSlackApproverId,
  getSlackBroadcastDmEnabled, setSlackBroadcastDmEnabled,
  getLegalPdfInfo, uploadLegalPdf, deleteLegalPdf
} from '../store.js';
import { notifySlackApproval } from '../utils/slackNotify.js';
import { formDefinitions } from '../forms/definitions.js';

const LEGAL_PDF_FORMS = Object.values(formDefinitions)
  .filter(def => /별지|별표/.test(def.title || ''))
  .sort((a, b) => a.id.localeCompare(b.id));

export async function renderAdminView(container) {
  const approverIds = getSlackApproverIds();

  container.innerHTML = `
    <div class="fade-in">
      <div class="page-header">
        <h2>CP 마스터 전용 대시보드 (권한 관리)</h2>
        <p>가입한 임직원들의 계정 상태와 CP 권한(General, Reviewer, Master)을 관리할 수 있습니다.</p>
      </div>

      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-top:0;">Slack 결재 요청 알림</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">
          Incoming Webhook 주소를 입력하면 "Slack으로 결재 요청" 버튼과 전자서명 완료 시 텍스트 알림이 전송됩니다.
          <strong>비어있는 동안은 아무 동작도 하지 않습니다.</strong>
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <input type="text" id="slack-webhook-input" class="form-input" placeholder="https://hooks.slack.com/services/..." style="flex:1; min-width:280px; padding:8px;" value="${getSlackWebhookUrl()}" />
          <button class="btn btn-primary" id="btn-save-slack-webhook" style="padding:8px 16px;">저장</button>
          <button class="btn btn-ghost" id="btn-test-slack-webhook" style="padding:8px 16px;">테스트 메시지 보내기</button>
        </div>
        <p id="slack-webhook-status" style="margin-top:8px; font-size:0.85rem; color:var(--text-tertiary);"></p>

        <div style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-color);">
          <strong style="font-size:0.9rem;">결재 요청 대상 지정 (선택)</strong>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:4px 0 10px;">
            기구장/대표이사의 Slack 사용자 ID(프로필 → "..." → "멤버 ID 복사")를 등록하면, 결재 요청 시 채널에 막연히 올리는 대신 그 사람을 직접 <code>@멘션</code>합니다.
          </p>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <label style="font-size:0.85rem; min-width:70px; display:flex; align-items:center;">기구장</label>
            <input type="text" id="slack-approver-기구장" class="form-input" placeholder="U0123ABCD" style="flex:1; min-width:200px; padding:6px;" value="${approverIds['기구장'] || ''}" />
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <label style="font-size:0.85rem; min-width:70px; display:flex; align-items:center;">대표이사</label>
            <input type="text" id="slack-approver-대표이사" class="form-input" placeholder="U0123ABCD" style="flex:1; min-width:200px; padding:6px;" value="${approverIds['대표이사'] || ''}" />
          </div>
          <button class="btn btn-secondary" id="btn-save-slack-approvers" style="padding:6px 14px; font-size:0.85rem;">결재자 ID 저장</button>
          <p id="slack-approver-status" style="margin-top:6px; font-size:0.85rem; color:var(--text-tertiary);"></p>
        </div>
      </div>

      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-top:0;">Slack 사내 공지 (PDF 자동 전송)</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">
          A-02·B-02 같은 사내 공지문 서식은 전자서명(결재)이 완료되는 순간 PDF로 변환되어 아래 채널에 자동 업로드됩니다.
          Bot Token과 채널 ID를 둘 다 입력해야 실제 파일이 올라가며, <strong>비어있으면 텍스트 알림만 전송됩니다.</strong>
          (Slack App을 만들고 <code>files:write</code> 권한의 Bot Token을 발급받아 입력하세요)
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
          <input type="password" id="slack-bot-token-input" class="form-input" placeholder="xoxb-..." style="flex:1; min-width:280px; padding:8px;" value="${getSlackBotToken()}" />
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
          <label style="font-size:0.85rem; min-width:120px;">전사 공지 채널</label>
          <input type="text" id="slack-channel-input" class="form-input" placeholder="공지 채널 ID 예: C0123ABCD" style="flex:1; min-width:280px; padding:8px;" value="${getSlackAnnounceChannelId()}" />
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <label style="font-size:0.85rem; min-width:120px;">기구 전용 채널</label>
          <input type="text" id="slack-org-channel-input" class="form-input" placeholder="공개범위 '부서공개' 시 게시할 채널 ID" style="flex:1; min-width:280px; padding:8px;" value="${getSlackOrgChannelId()}" />
          <button class="btn btn-primary" id="btn-save-slack-doc" style="padding:8px 16px;">저장</button>
        </div>
        <p id="slack-doc-status" style="margin-top:8px; font-size:0.85rem; color:var(--text-tertiary);"></p>

        <div style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border-color);">
          <label style="display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
            <input type="checkbox" id="slack-dm-broadcast-toggle" ${getSlackBroadcastDmEnabled() ? 'checked' : ''} style="margin-top:3px;" />
            <span style="font-size:0.85rem;">
              <strong>워크스페이스 전 멤버에게 개별 DM으로도 발송</strong><br/>
              <span style="color:var(--text-tertiary);">채널 게시에 더해, 결재 완료 시 사람마다 개별 DM도 보냅니다. 기본은 꺼져 있습니다 — 켜면 <code>users:read</code>, <code>im:write</code>, <code>chat:write</code> 권한이 있는 Bot Token이 필요하고, 인원이 많으면 한 번에 최대 150명까지만 발송됩니다.</span>
            </span>
          </label>
        </div>
      </div>

      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-top:0;">별지/별표 법정 서식 PDF 관리</h3>
        <p style="color:var(--text-secondary); font-size:0.9rem;">
          정부가 고시하는 별지/별표 원본 PDF를 서식별로 업로드해두면, 해당 서식 화면에 "공식 서식 PDF 다운로드" 버튼이 나타납니다.
          법정 서식이 개정되면 같은 서식에 새 파일을 다시 업로드해서 그대로 교체하세요 (이전 파일은 자동으로 대체됩니다).
        </p>
        <table style="width:100%; text-align:left; border-collapse:collapse; font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
              <th style="padding:8px; font-weight:600; color:var(--text-secondary);">서식</th>
              <th style="padding:8px; font-weight:600; color:var(--text-secondary);">상태</th>
              <th style="padding:8px; font-weight:600; color:var(--text-secondary);">작업</th>
            </tr>
          </thead>
          <tbody id="legal-pdf-list">
            ${LEGAL_PDF_FORMS.map(def => {
              const info = getLegalPdfInfo(def.id);
              return `
              <tr style="border-bottom:1px solid rgba(0,0,0,0.05);" data-form-id="${def.id}">
                <td style="padding:8px;"><strong>${def.id}</strong> ${def.title}</td>
                <td style="padding:8px;" class="legal-pdf-status">
                  ${info
                    ? `<span class="status-badge done">업로드됨</span> <span style="color:var(--text-tertiary); font-size:0.8rem;">${info.filename} · ${new Date(info.uploadedAt).toLocaleDateString()}</span>`
                    : `<span class="status-badge todo">없음</span>`}
                </td>
                <td style="padding:8px; white-space:nowrap;">
                  <input type="file" accept="application/pdf" class="legal-pdf-file-input" data-form-id="${def.id}" style="display:none;" />
                  <button class="btn btn-ghost legal-pdf-upload-btn" data-form-id="${def.id}" style="padding:4px 10px; font-size:0.8rem;">${info ? '교체' : '업로드'}</button>
                  ${info ? `<button class="btn btn-ghost legal-pdf-delete-btn" data-form-id="${def.id}" style="padding:4px 10px; font-size:0.8rem; color:var(--accent-red);">삭제</button>` : ''}
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <table style="width:100%; text-align:left; border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">사번</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">이름</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">소속 부서 / 이메일</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">가입일</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">현재 권한</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">Slack ID / 기구소속</th>
              <th style="padding:12px; font-weight:600; color:var(--text-secondary);">권한 변경</th>
            </tr>
          </thead>
          <tbody id="admin-users-list">
            <tr><td colspan="7" style="padding:20px; text-align:center;">사용자 목록을 불러오는 중...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    let html = '';
    
    usersSnapshot.forEach(docSnap => {
      const u = docSnap.data();
      const uid = docSnap.id;
      
      const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-';
      
      let roleBadge = '';
      if (u.role === 'Master' || u.role === 'ADMIN') roleBadge = '<span class="status-badge done">Master (최고관리자)</span>';
      else if (u.role === 'Reviewer' || u.role === 'EDITOR') roleBadge = '<span class="status-badge progress">Reviewer (심사자)</span>';
      else if (u.role === 'General' || u.role === 'VIEWER') roleBadge = '<span class="status-badge review">General (일반/영업)</span>';
      else roleBadge = '<span class="status-badge todo">승인 대기(PENDING)</span>';

      const empId = u.empId || '미입력';
      const name = u.name || '미입력';
      const dept = u.department || '미입력';
      const email = u.email || '';

      html += `
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:12px; font-weight:600;">${empId}</td>
          <td style="padding:12px;">${name}</td>
          <td style="padding:12px;">
            <div>${dept}</div>
            <div style="font-size:0.8rem; color:var(--text-tertiary);">${email}</div>
          </td>
          <td style="padding:12px; color:var(--text-secondary); font-size:0.9rem;">${dateStr}</td>
          <td style="padding:12px;">${roleBadge}</td>
          <td style="padding:12px;">
            <input type="text" class="form-input slack-id-input" data-uid="${uid}" placeholder="U0123ABCD" value="${u.slackUserId || ''}" style="width:130px; padding:5px; font-size:0.8rem; margin-bottom:4px;" />
            <label style="display:flex; align-items:center; gap:4px; font-size:0.78rem; color:var(--text-secondary); cursor:pointer;">
              <input type="checkbox" class="cp-org-member-checkbox" data-uid="${uid}" ${u.isCpOrgMember ? 'checked' : ''} /> 기구 소속
            </label>
            <button class="btn btn-secondary btn-save-slack-profile" data-uid="${uid}" style="padding:3px 8px; font-size:0.75rem; margin-top:4px;">저장</button>
          </td>
          <td style="padding:12px;">
            ${(u.role === 'ADMIN' || u.role === 'Master') ? '<span style="color:var(--text-tertiary); font-size:0.8rem;">관리자 변경 불가</span>' : `
              <select class="form-input role-select" data-uid="${uid}" style="width:140px; padding:6px; font-size:0.85rem;">
                <option value="PENDING" ${u.role === 'PENDING' ? 'selected' : ''}>대기 (차단)</option>
                <option value="General" ${(u.role === 'General' || u.role === 'VIEWER') ? 'selected' : ''}>General (일반)</option>
                <option value="Reviewer" ${(u.role === 'Reviewer' || u.role === 'EDITOR') ? 'selected' : ''}>Reviewer (심사자)</option>
                <option value="Master" ${u.role === 'Master' ? 'selected' : ''}>Master (최고관리자)</option>
              </select>
              <button class="btn btn-primary btn-save-role" data-uid="${uid}" style="padding:6px 12px; font-size:0.85rem; margin-left:8px;">저장</button>
            `}
          </td>
        </tr>
      `;
    });

    if (usersSnapshot.empty) {
      html = '<tr><td colspan="7" style="padding:20px; text-align:center;">가입한 사용자가 없습니다.</td></tr>';
    }

    document.getElementById('admin-users-list').innerHTML = html;

    // Bind Slack ID / 기구소속 저장 버튼 — 공개범위(비공개/부서공개) 판정에 쓰인다.
    document.querySelectorAll('.btn-save-slack-profile').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const uid = e.target.dataset.uid;
        const slackIdInput = document.querySelector(`.slack-id-input[data-uid="${uid}"]`);
        const cpOrgCheckbox = document.querySelector(`.cp-org-member-checkbox[data-uid="${uid}"]`);

        try {
          const btnEl = e.target;
          const originalText = btnEl.textContent;
          btnEl.textContent = '저장중...';
          btnEl.disabled = true;

          await updateDoc(doc(db, 'users', uid), {
            slackUserId: slackIdInput.value.trim(),
            isCpOrgMember: !!cpOrgCheckbox.checked
          });

          btnEl.textContent = '저장됨';
          setTimeout(() => { btnEl.textContent = originalText; btnEl.disabled = false; }, 1200);
        } catch (err) {
          console.error(err);
          await customAlert('저장 실패', 'Slack ID/기구소속 저장에 실패했습니다: ' + err.message, 'error');
          e.target.disabled = false;
        }
      });
    });

    // Bind save buttons
    document.querySelectorAll('.btn-save-role').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const uid = e.target.dataset.uid;
        const select = document.querySelector(`.role-select[data-uid="${uid}"]`);
        const newRole = select.value;
        
        try {
          const btnEl = e.target;
          btnEl.textContent = '저장중...';
          btnEl.disabled = true;
          
          await updateDoc(doc(db, 'users', uid), { role: newRole });
          
          await customAlert('권한 변경 완료', '사용자 권한이 성공적으로 변경되었습니다.', 'success');
          renderAdminView(container); // reload
        } catch (err) {
          console.error(err);
          await customAlert('권한 변경 실패', '권한 변경에 실패했습니다: ' + err.message, 'error');
        }
      });
    });

  } catch (err) {
    console.error(err);
    document.getElementById('admin-users-list').innerHTML = `
      <tr><td colspan="7" style="padding:20px; text-align:center; color:var(--accent-red);">
        목록을 불러오지 못했습니다. Firestore 권한을 확인하세요.
      </td></tr>
    `;
  }

  // ── Slack Webhook 설정 ──
  const statusEl = document.getElementById('slack-webhook-status');
  const inputEl = document.getElementById('slack-webhook-input');

  document.getElementById('btn-save-slack-webhook')?.addEventListener('click', async () => {
    await setSlackWebhookUrl(inputEl.value);
    statusEl.textContent = getSlackWebhookUrl()
      ? 'Slack 주소가 저장되었습니다. 이제 결재 요청 시 알림이 전송됩니다.'
      : 'Slack 주소가 비워졌습니다. 알림 전송이 중지됩니다.';
  });

  document.getElementById('btn-test-slack-webhook')?.addEventListener('click', async () => {
    if (!inputEl.value.trim()) {
      statusEl.textContent = '먼저 Slack Webhook 주소를 입력하고 저장하세요.';
      return;
    }
    await setSlackWebhookUrl(inputEl.value); // 테스트 전 최신 값 저장
    statusEl.textContent = '테스트 메시지 전송 중...';
    const result = await notifySlackApproval({
      title: '[CP Manager] 연동 테스트',
      detail: 'Slack 알림 연동이 정상적으로 동작합니다.'
    });
    statusEl.textContent = result.ok
      ? '테스트 메시지를 전송했습니다. Slack 채널을 확인하세요.'
      : '전송에 실패했습니다. 주소가 정확한지 확인하세요.';
  });

  // ── 결재자 Slack ID ──
  const approverStatusEl = document.getElementById('slack-approver-status');
  document.getElementById('btn-save-slack-approvers')?.addEventListener('click', async () => {
    const orgHeadId = document.getElementById('slack-approver-기구장').value;
    const ceoId = document.getElementById('slack-approver-대표이사').value;
    await setSlackApproverId('기구장', orgHeadId);
    await setSlackApproverId('대표이사', ceoId);
    approverStatusEl.textContent = '결재자 Slack ID가 저장되었습니다. 이제 결재 요청 시 해당 인원이 직접 멘션됩니다.';
  });

  // ── 사내 공지 PDF 전송 설정 ──
  const docStatusEl = document.getElementById('slack-doc-status');
  document.getElementById('btn-save-slack-doc')?.addEventListener('click', async () => {
    await setSlackBotToken(document.getElementById('slack-bot-token-input').value);
    await setSlackAnnounceChannelId(document.getElementById('slack-channel-input').value);
    await setSlackOrgChannelId(document.getElementById('slack-org-channel-input').value);
    docStatusEl.textContent = (getSlackBotToken() && getSlackAnnounceChannelId())
      ? '저장되었습니다. A-02/B-02 및 공개범위 "전체공개" 문서는 전사 공지 채널로, "부서공개" 문서는 기구 전용 채널로 자동 업로드됩니다.'
      : 'Bot Token과 채널 ID를 입력해야 PDF가 실제로 업로드됩니다 (비어있으면 텍스트 알림만 전송).';
  });

  document.getElementById('slack-dm-broadcast-toggle')?.addEventListener('change', async (e) => {
    await setSlackBroadcastDmEnabled(e.target.checked);
  });

  // ── 별지/별표 법정 서식 PDF 관리 ──
  function refreshLegalPdfRow(formId) {
    const row = container.querySelector(`tr[data-form-id="${formId}"]`);
    if (!row) return;
    const info = getLegalPdfInfo(formId);
    const statusCell = row.querySelector('.legal-pdf-status');
    statusCell.innerHTML = info
      ? `<span class="status-badge done">업로드됨</span> <span style="color:var(--text-tertiary); font-size:0.8rem;">${info.filename} · ${new Date(info.uploadedAt).toLocaleDateString()}</span>`
      : `<span class="status-badge todo">없음</span>`;
    const uploadBtn = row.querySelector('.legal-pdf-upload-btn');
    uploadBtn.textContent = info ? '교체' : '업로드';
    const actionCell = uploadBtn.parentElement;
    let deleteBtn = row.querySelector('.legal-pdf-delete-btn');
    if (info && !deleteBtn) {
      deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-ghost legal-pdf-delete-btn';
      deleteBtn.dataset.formId = formId;
      deleteBtn.style.cssText = 'padding:4px 10px; font-size:0.8rem; color:var(--accent-red);';
      deleteBtn.textContent = '삭제';
      actionCell.appendChild(deleteBtn);
      bindLegalPdfDelete(deleteBtn);
    } else if (!info && deleteBtn) {
      deleteBtn.remove();
    }
  }

  function bindLegalPdfDelete(btn) {
    btn.addEventListener('click', async () => {
      const formId = btn.dataset.formId;
      if (!confirm(`${formId}에 업로드된 PDF를 삭제할까요?`)) return;
      const res = await deleteLegalPdf(formId);
      if (res.error) { customAlert('삭제 실패', res.error, 'error'); return; }
      refreshLegalPdfRow(formId);
    });
  }

  container.querySelectorAll('.legal-pdf-upload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelector(`.legal-pdf-file-input[data-form-id="${btn.dataset.formId}"]`)?.click();
    });
  });

  container.querySelectorAll('.legal-pdf-file-input').forEach(input => {
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      const formId = input.dataset.formId;
      if (!file) return;
      if (file.type !== 'application/pdf') { customAlert('형식 오류', 'PDF 파일만 업로드할 수 있습니다.', 'error'); return; }
      const row = container.querySelector(`tr[data-form-id="${formId}"]`);
      row.querySelector('.legal-pdf-status').innerHTML = '업로드 중...';
      const res = await uploadLegalPdf(formId, file);
      if (res.error) { customAlert('업로드 실패', res.error, 'error'); refreshLegalPdfRow(formId); return; }
      refreshLegalPdfRow(formId);
    });
  });

  container.querySelectorAll('.legal-pdf-delete-btn').forEach(bindLegalPdfDelete);
}
