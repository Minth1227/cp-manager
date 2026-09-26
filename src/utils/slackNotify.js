import { authFetch } from './authFetch.js';
import { getSlackWebhookUrl, getSlackBotToken, getSlackAnnounceChannelId, getSlackApproverIds, getSlackBroadcastDmEnabled } from '../store.js';

/**
 * Slack DM에 Block Kit 승인/반려 버튼을 달아 보낸다. 결재자가 로그인 없이 Slack에서 바로
 * 승인/반려를 완료할 수 있고(slack_interactions.js가 처리), 승인 시 서명 스탬프가 찍힌 PDF가
 * 자동 생성되어 영구 보관된다. Bot Token과 해당 결재자의 Slack 사용자 ID가 모두 등록되어
 * 있어야 동작하며, 하나라도 없으면 `unavailable: true`를 반환해 호출 측이 기존 텍스트 알림
 * (notifySlackApproval)으로 대체할 수 있게 한다.
 *
 * @param {Object} opts
 * @param {string} opts.formId
 * @param {string} opts.storageKey        store.js의 getStorageKey(formId) 결과
 * @param {string} opts.approverRoleLabel "기구장" | "대표이사"
 * @param {string} opts.title
 * @param {string} [opts.detail]
 * @param {string} [opts.link]
 * @param {string} [opts.requesterEmail]
 * @param {string} [opts.requesterName]
 * @param {string} [opts.requesterSlackUserId] 기안자 본인의 Slack ID(마이페이지/관리자 화면에 등록된 값) —
 *   visibilityScope가 'private'이면 결재자와 기안자만 있는 그룹 DM으로 보낸다.
 * @param {'private'|'department'|'public'} [opts.visibilityScope]
 * @param {string} [opts.previewPdfBase64] "PDF 다운로드"와 동일한 공식 양식으로 브라우저에서
 *   미리 만든 미리보기 PDF(base64). 있으면 서버가 자체 생성하는 대신 이 파일을 그대로 Slack에 올린다.
 */
export async function notifySlackApprovalInteractive({ formId, storageKey, approverRoleLabel, title, detail, link, requesterEmail, requesterName, requesterSlackUserId, visibilityScope, previewPdfBase64 }) {
  const botToken = getSlackBotToken();
  const approverSlackUserId = getSlackApproverIds()[approverRoleLabel];
  // Bot Token은 서버 환경변수(SLACK_BOT_TOKEN)에 둘 수 있으므로 클라이언트 저장값이 없어도 호출한다.
  if (!approverSlackUserId) {
    return { unavailable: true };
  }

  try {
    const res = await authFetch('/.netlify/functions/slack_post_approval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken, approverSlackUserId, title, detail, link, formId, storageKey, approverRoleLabel, requesterEmail, requesterName, requesterSlackUserId, visibilityScope, previewPdfBase64 })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error('Slack 인터랙티브 결재 요청 실패:', data);
      return { unavailable: false, ok: false };
    }
    return { unavailable: false, ok: true, ...data };
  } catch (e) {
    console.error('Slack 인터랙티브 결재 요청 중 오류:', e);
    return { unavailable: false, ok: false };
  }
}

/**
 * Slack 결재 요청/완료 알림을 보낸다.
 * 관리자 설정 화면에서 아직 Slack 주소를 입력하지 않았으면 아무 일도 하지 않고 조용히 넘어간다.
 * (나중에 주소만 입력하면 바로 동작하도록 하기 위한 의도적 설계 — 별도 코드 변경 불필요)
 *
 * @param {Object} opts
 * @param {string} opts.title             예: "[G-01] 거래심사표 승인 요청"
 * @param {string} opts.detail            거래명, 요청 내용 등 사람이 읽을 설명
 * @param {string} [opts.link]            확인하러 갈 앱 링크 (없으면 생략)
 * @param {string} [opts.approverRoleLabel] "기구장" | "대표이사" 등 — 지정하면 그 사람을 Slack에서 @멘션한다
 *                                          (관리자 설정에서 해당 역할의 Slack 사용자 ID를 등록해둔 경우에만)
 */
export async function notifySlackApproval({ title, detail, link, approverRoleLabel }) {
  const webhookUrl = getSlackWebhookUrl();
  if (!webhookUrl) return { skipped: true };

  const lines = [];

  // 결재자가 특정되어 있고 그 사람의 Slack 사용자 ID가 등록돼 있으면, 채널에 던지는 알림이 아니라
  // 그 사람을 직접 지목하는 멘션으로 만든다 — "누구한테 결재받을지 정해서 보내는" 요청이 되도록.
  if (approverRoleLabel) {
    const approverId = getSlackApproverIds()[approverRoleLabel];
    if (approverId) {
      lines.push(`<@${approverId}>님, 결재가 필요합니다 (${approverRoleLabel})`);
    } else {
      lines.push(`*[${approverRoleLabel} 결재 필요]* (관리자 설정에서 ${approverRoleLabel}의 Slack 사용자 ID를 등록하면 다음부터는 직접 멘션됩니다)`);
    }
  }

  lines.push(`*${title}*`);
  if (detail) lines.push(detail);
  if (link) lines.push(`<${link}|시스템에서 확인하기>`);

  const payload = { text: lines.join('\n') };

  try {
    const res = await authFetch('/.netlify/functions/slack_notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ webhookUrl, payload })
    });
    if (!res.ok) {
      console.error('Slack 알림 전송 실패:', await res.text());
      return { skipped: false, ok: false };
    }
    return { skipped: false, ok: true };
  } catch (e) {
    // Slack 전송 실패가 실제 결재/저장 흐름을 막아서는 안 되므로 여기서 에러를 삼킨다.
    console.error('Slack 알림 전송 중 오류(무시하고 계속 진행):', e);
    return { skipped: false, ok: false };
  }
}

/**
 * 사내 공지문 등을 실제 PDF 파일로 만들어 Slack 채널에 올린다.
 * Bot Token과 채널 ID가 모두 설정돼 있어야 실제 파일이 올라가고, 둘 중 하나라도 비어있으면
 * (아직 Slack 앱을 못 만들었을 수 있으니) 텍스트 알림(webhook)만 대신 보낸다 — 완전히 실패시키지 않는다.
 *
 * @param {Object} opts
 * @param {string} opts.title    Slack에 함께 표시할 안내문 (initial_comment)
 * @param {Blob}   opts.pdfBlob  html2pdf 등으로 만든 PDF Blob
 * @param {string} opts.filename 저장될 파일명 (예: "B-02_임직원_공지문.pdf")
 * @param {string} [opts.link]   Bot Token이 없을 때 텍스트 알림에 대신 넣을 앱 링크
 */
export async function sendSlackDocument({ title, pdfBlob, filename, link }) {
  const botToken = getSlackBotToken();
  const channelId = getSlackAnnounceChannelId();

  if (!channelId) {
    // 아직 파일 업로드용 설정이 안 되어 있으면, 최소한 텍스트 알림(+링크)이라도 보낸다.
    return notifySlackApproval({ title, detail: '(Slack Bot Token/채널을 등록하면 PDF 파일이 직접 첨부됩니다)', link });
  }

  try {
    const pdfBase64 = await blobToBase64(pdfBlob);
    const res = await authFetch('/.netlify/functions/slack_upload_pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken, channelId, filename, pdfBase64, message: title })
    });
    if (!res.ok) {
      console.error('Slack PDF 업로드 실패:', await res.text());
      // 토큰 미설정(400) 등으로 파일 업로드가 안 되면 텍스트 알림으로 대체
      if (res.status === 400) {
        return notifySlackApproval({ title, detail: '(Slack Bot Token이 서버에 설정되면 PDF 파일이 직접 첨부됩니다)', link });
      }
      return { skipped: false, ok: false };
    }
    return { skipped: false, ok: true };
  } catch (e) {
    console.error('Slack PDF 업로드 중 오류(무시하고 계속 진행):', e);
    return { skipped: false, ok: false };
  }
}

/**
 * 워크스페이스 전 멤버에게 개별 DM으로 공지 메시지를 보낸다.
 * 관리자 설정에서 "전 멤버 DM 발송"을 켜두고 Bot Token이 등록돼 있어야 동작하며,
 * 둘 중 하나라도 없으면 아무 것도 하지 않는다(채널 게시만으로 충분한 경우가 많아 기본은 꺼져 있음).
 *
 * @param {Object} opts
 * @param {string} opts.title 공지 제목
 * @param {string} [opts.link] 앱에서 원문을 확인할 링크
 */
export async function broadcastSlackDM({ title, link }) {
  if (!getSlackBroadcastDmEnabled()) return { skipped: true, reason: 'disabled' };

  const botToken = getSlackBotToken();
  // Bot Token은 서버 환경변수에 있을 수 있으므로 여기서 건너뛰지 않는다.

  const message = link ? `${title}\n${link}` : title;

  try {
    const res = await authFetch('/.netlify/functions/slack_broadcast_dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botToken, message })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error('Slack 전 멤버 DM 발송 실패:', data);
      return { skipped: false, ok: false };
    }
    return { skipped: false, ok: true, ...data };
  } catch (e) {
    console.error('Slack 전 멤버 DM 발송 중 오류(무시하고 계속 진행):', e);
    return { skipped: false, ok: false };
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
