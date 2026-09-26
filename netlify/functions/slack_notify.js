// Slack Incoming Webhook 릴레이 함수.
// 브라우저에서 hooks.slack.com으로 직접 fetch하면 CORS로 막힐 수 있어 서버(Netlify Function)에서 대신 전송한다.
// webhookUrl은 관리자 설정 화면에서 Firestore(system/globalState.integrations.slackWebhookUrl)에 저장된 값을
// 클라이언트가 그대로 실어 보낸다 — 아직 주소가 비어있으면 클라이언트 쪽(slackNotify.js)에서 이 함수를 호출하지 않는다.
export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { webhookUrl, payload } = JSON.parse(event.body || '{}');

    if (!webhookUrl || !payload) {
      return { statusCode: 400, body: JSON.stringify({ error: 'webhookUrl과 payload가 필요합니다.' }) };
    }

    // 이 함수가 임의 주소로 요청을 대리 전송하는 오픈 프록시로 악용되지 않도록
    // Slack Incoming Webhook 주소(https://hooks.slack.com/...)로만 전송을 허용한다.
    let target;
    try {
      target = new URL(webhookUrl);
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: '유효하지 않은 webhookUrl 입니다.' }) };
    }
    if (target.protocol !== 'https:' || target.hostname !== 'hooks.slack.com') {
      return { statusCode: 400, body: JSON.stringify({ error: 'webhookUrl은 https://hooks.slack.com/ 주소만 허용됩니다.' }) };
    }

    const slackRes = await fetch(target.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const bodyText = await slackRes.text();

    if (!slackRes.ok) {
      return { statusCode: slackRes.status, body: JSON.stringify({ error: 'Slack 전송 실패', detail: bodyText }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, slackResponse: bodyText }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
