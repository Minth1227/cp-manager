// Slack에 실제 PDF 파일을 업로드해서 채널에 공유하는 함수.
// Slack의 files.upload는 2025-11-12부로 완전히 중단(sunset)되었으므로, 최신 방식인
// files.getUploadURLExternal → (파일 바이트 POST) → files.completeUploadExternal 3단계를 그대로 구현한다.
// Bot Token(xoxb-...)이 필요하며, 관리자 설정 화면에서 아직 토큰을 입력하지 않았다면 클라이언트 쪽에서
// 이 함수를 호출하지 않고 텍스트 알림(webhook)만 보낸다.
export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { botToken, channelId, filename, pdfBase64, message } = JSON.parse(event.body || '{}');

    if (!botToken || !channelId || !filename || !pdfBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: 'botToken, channelId, filename, pdfBase64가 모두 필요합니다.' }) };
    }
    if (!botToken.startsWith('xoxb-')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Slack Bot Token 형식이 아닙니다 (xoxb-로 시작해야 함).' }) };
    }

    const fileBuffer = Buffer.from(pdfBase64, 'base64');

    // 1단계: 업로드 URL 발급
    const urlRes = await fetch('https://slack.com/api/files.getUploadURLExternal', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${botToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ filename, length: String(fileBuffer.length) })
    });
    const urlData = await urlRes.json();
    if (!urlData.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Slack 업로드 URL 발급 실패', detail: urlData.error }) };
    }

    // 2단계: 실제 파일 바이트 업로드
    const form = new FormData();
    form.append('file', new Blob([fileBuffer], { type: 'application/pdf' }), filename);
    const uploadRes = await fetch(urlData.upload_url, { method: 'POST', body: form });
    if (!uploadRes.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Slack 파일 업로드 실패', detail: await uploadRes.text() }) };
    }

    // 3단계: 업로드 완료 처리 + 채널 공유
    const completeRes = await fetch('https://slack.com/api/files.completeUploadExternal', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${botToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: [{ id: urlData.file_id, title: filename }],
        channel_id: channelId,
        initial_comment: message || undefined
      })
    });
    const completeData = await completeRes.json();
    if (!completeData.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Slack 파일 공유 완료 처리 실패', detail: completeData.error }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
