// Block Kit 승인/반려 버튼이 달린 결재 요청 DM을 담당 결재자에게 보낸다.
// (기존 slack_notify.js의 텍스트 전용 Incoming Webhook과 달리, chat.postMessage로 보내야
//  나중에 버튼 클릭 결과를 같은 메시지에 chat.update로 반영할 수 있다 — Webhook 메시지는 나중에
//  수정할 수 없다.)
// [요청 시점에 문서 자체를 PDF로 첨부] 승인 이후뿐 아니라, 결재 요청 시점에도 담당자가 문서
// 내용을 바로 확인할 수 있도록 "결재 대기 중" 미리보기 PDF를 만들어 같은 DM에 파일로 함께 올린다.
import { getAdminDb } from './lib/firebaseAdmin.js';
import { generateSignedDocumentPdf } from './lib/signedPdf.js';
import { buildPdfFieldsForForm } from './lib/formPdfFields.js';
import { shareSlackFile } from './lib/slackFileShare.js';
import { requireAuth, ROLES, resolveBotToken } from './lib/requireAuth.js';

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authz = await requireAuth(event, ROLES.APPROVED);
  if (!authz.ok) return authz.response;

  try {
    const {
      botToken: bodyBotToken, approverSlackUserId,
      title, detail, link,
      formId, storageKey, approverRoleLabel,
      requesterEmail, requesterName, requesterSlackUserId, visibilityScope, previewPdfBase64
    } = JSON.parse(event.body || '{}');
    const botToken = resolveBotToken(bodyBotToken);

    if (!botToken || !botToken.startsWith('xoxb-')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Slack Bot Token(xoxb-...)이 필요합니다.' }) };
    }
    if (!approverSlackUserId) {
      return { statusCode: 400, body: JSON.stringify({ error: '결재자의 Slack 사용자 ID가 필요합니다.' }) };
    }
    if (!formId || !storageKey) {
      return { statusCode: 400, body: JSON.stringify({ error: 'formId/storageKey가 필요합니다.' }) };
    }

    const authHeader = { Authorization: `Bearer ${botToken}`, 'Content-Type': 'application/json' };

    // 1. 결재자와 DM 채널 열기 — 공개범위가 '비공개'이고 기안자 본인 Slack ID가 등록돼 있으면
    //    결재자+기안자만 있는 그룹 DM을 연다(그 외에는 지금처럼 결재자와의 1:1 DM).
    const dmUserIds = (visibilityScope === 'private' && requesterSlackUserId)
      ? [approverSlackUserId, requesterSlackUserId].join(',')
      : approverSlackUserId;
    const openRes = await fetch('https://slack.com/api/conversations.open', {
      method: 'POST', headers: authHeader,
      body: JSON.stringify({ users: dmUserIds })
    });
    const openData = await openRes.json();
    if (!openData.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'DM 채널 개설 실패', detail: openData.error }) };
    }
    const channelId = openData.channel.id;

    // formData를 먼저 읽어서 (a) 메시지 본문에 바로 보일 핵심 내용 요약과 (b) 미리보기 PDF에 공통으로 쓴다.
    // 요약 텍스트는 Firestore 읽기 + 순수 필드 매핑이라 실패 가능성이 낮으므로 try/catch 밖에서 구한다.
    const db = getAdminDb();
    const formSnap = await db.collection('formData').doc(storageKey).get();
    const formData = formSnap.exists ? formSnap.data() : {};
    const { formTitle, subtitle, fields } = buildPdfFieldsForForm(formId, formData);

    // 메시지 본문에 바로 노출할 핵심 내용 요약 (최대 5개, 너무 긴 값은 잘라서) —
    // "승인/반려 처리해주세요"만 있고 정작 무슨 내용인지 안 보이던 문제를 해결하기 위함.
    const summaryFields = fields.filter(f => f.value && String(f.value).trim()).slice(0, 5);
    const summaryText = summaryFields.map(f => {
      const v = String(f.value).trim();
      const short = v.length > 120 ? v.slice(0, 120) + '…' : v;
      return `*${f.label}*: ${short.replace(/\n/g, ' ')}`;
    }).join('\n');

    // 문서 원문을 "결재 대기 중" 미리보기 PDF로 만들어 버튼 메시지보다 먼저 올린다.
    // 클라이언트가 "PDF 다운로드"와 동일한 공식 양식으로 미리 만들어 보낸 게 있으면(previewPdfBase64)
    // 그걸 그대로 쓰고, 없으면(구버전 클라이언트 등) 서버가 자체 생성하는 단순 레이아웃으로 대체한다.
    // (실패해도 결재 요청 자체는 막지 않는다 — 미리보기는 보조 기능이고, 승인 시점엔 별도로
    //  최종 서명본 PDF가 다시 생성되므로 여기서 실패해도 무해하다. 위에서 본문 요약은 이미 확보했다.)
    try {
      const previewBytes = previewPdfBase64
        ? Buffer.from(previewPdfBase64, 'base64')
        : await generateSignedDocumentPdf({ formId, formTitle, subtitle, fields }); // stamp 생략 = 대기중 미리보기
      await shareSlackFile(botToken, channelId, `${formId}_결재요청_원문.pdf`, previewBytes, `📄 [${formId}] ${formTitle} — 결재 요청 원문 (아래 버튼으로 승인/반려)`);
    } catch (e) {
      console.error('[slack_post_approval] 미리보기 PDF 생성/전송 실패(요청 자체는 계속 진행):', e);
    }

    // action button value에 실을 라우팅 정보 — Slack이 버튼 클릭 시 이 값을 그대로
    // slack_interactions.js로 돌려주므로, 여기에 필요한 모든 컨텍스트를 담아둔다.
    const actionValue = JSON.stringify({ formId, storageKey, approverRoleLabel, requesterEmail, requesterName, link, visibilityScope });

    const blocks = [
      { type: 'section', text: { type: 'mrkdwn', text: `*${title}*` } },
      ...(detail ? [{ type: 'context', elements: [{ type: 'mrkdwn', text: detail.replace(/\n/g, '  \n') }] }] : []),
      ...(summaryText ? [{ type: 'divider' }, { type: 'section', text: { type: 'mrkdwn', text: summaryText } }] : []),
      ...(visibilityScope === 'public' ? [{ type: 'context', elements: [{ type: 'mrkdwn', text: '📢 승인 완료 시 전 직원 공지 채널에도 자동 게시됩니다.' }] }] : []),
      {
        type: 'actions',
        block_id: 'approval_actions',
        elements: [
          {
            type: 'button', style: 'primary', action_id: 'approve_doc',
            text: { type: 'plain_text', text: '✅ 승인', emoji: true },
            value: actionValue,
            confirm: {
              title: { type: 'plain_text', text: '승인 확인' },
              text: { type: 'plain_text', text: '이 문서를 승인하고 전자서명 처리하시겠습니까? 서명된 PDF가 자동 생성되어 영구 보관됩니다.' },
              confirm: { type: 'plain_text', text: '승인' },
              deny: { type: 'plain_text', text: '취소' }
            }
          },
          {
            type: 'button', style: 'danger', action_id: 'reject_doc',
            text: { type: 'plain_text', text: '❌ 반려', emoji: true },
            value: actionValue
          },
          ...(link ? [{
            type: 'button', action_id: 'open_in_app',
            text: { type: 'plain_text', text: '📄 앱에서 원문 보기', emoji: true },
            url: link
          }] : [])
        ]
      }
    ];

    const msgRes = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST', headers: authHeader,
      body: JSON.stringify({ channel: channelId, text: title, blocks })
    });
    const msgData = await msgRes.json();
    if (!msgData.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Slack 메시지 전송 실패', detail: msgData.error }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, channel: channelId, ts: msgData.ts }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
