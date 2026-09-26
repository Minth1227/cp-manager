// 워크스페이스의 활성 멤버 전원에게 개별 DM으로 공지 메시지를 보낸다.
// Bot Token에 users:read, im:write, chat:write 세 스코프가 모두 있어야 동작한다.
// 대상: is_bot=false, deleted=false, id!=='USLACKBOT'인 사람만 (봇/탈퇴계정/슬랙봇 제외).
import { requireAuth, ROLES, resolveBotToken } from './lib/requireAuth.js';

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authz = await requireAuth(event, ROLES.EDITORS);
  if (!authz.ok) return authz.response;

  try {
    const { botToken: bodyBotToken, message } = JSON.parse(event.body || '{}');
    const botToken = resolveBotToken(bodyBotToken);
    if (!botToken || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'botToken과 message가 필요합니다.' }) };
    }
    if (!botToken.startsWith('xoxb-')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Slack Bot Token 형식이 아닙니다 (xoxb-로 시작해야 함).' }) };
    }

    const authHeader = { 'Authorization': `Bearer ${botToken}`, 'Content-Type': 'application/json' };

    // 1. 멤버 목록 수집 (페이지네이션)
    let members = [];
    let cursor = '';
    do {
      const url = new URL('https://slack.com/api/users.list');
      url.searchParams.set('limit', '200');
      if (cursor) url.searchParams.set('cursor', cursor);
      const res = await fetch(url.toString(), { headers: authHeader });
      const data = await res.json();
      if (!data.ok) {
        return { statusCode: 502, body: JSON.stringify({ error: 'Slack 멤버 목록 조회 실패', detail: data.error }) };
      }
      members = members.concat(data.members || []);
      cursor = data.response_metadata?.next_cursor || '';
    } while (cursor);

    const targets = members.filter(m =>
      !m.is_bot && !m.deleted && m.id !== 'USLACKBOT'
    );

    // 2. Netlify Function 실행시간 제한(무료/스타터 플랜 기준 최대 약 10~26초)을 고려해
    //    한 번에 너무 많은 인원을 처리하지 않도록 상한을 둔다. 더 큰 조직이라면
    //    여러 번 나눠 호출하거나 채널 게시(전 직원 채널)로 대체하는 것을 권장.
    const MAX_TARGETS = 150;
    const limited = targets.slice(0, MAX_TARGETS);

    let sent = 0;
    const failed = [];

    for (const member of limited) {
      try {
        const openRes = await fetch('https://slack.com/api/conversations.open', {
          method: 'POST',
          headers: authHeader,
          body: JSON.stringify({ users: member.id })
        });
        const openData = await openRes.json();
        if (!openData.ok) { failed.push({ id: member.id, error: openData.error }); continue; }

        const msgRes = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: authHeader,
          body: JSON.stringify({ channel: openData.channel.id, text: message })
        });
        const msgData = await msgRes.json();
        if (!msgData.ok) { failed.push({ id: member.id, error: msgData.error }); continue; }

        sent++;
      } catch (e) {
        failed.push({ id: member.id, error: e.message });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        totalMembers: targets.length,
        sent,
        failedCount: failed.length,
        truncated: targets.length > MAX_TARGETS
      })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
