// Slack 채널/DM에 실제 파일(PDF 등)을 업로드해서 그 자리에서 미리보기가 되게 한다.
// files.upload는 폐지되어 최신 3단계 방식(getUploadURLExternal → 업로드 → completeUploadExternal)을 쓴다.
// slack_post_approval.js(결재 요청 시 문서 미리보기 첨부)와 slack_interactions.js(승인 완료 시
// 서명본 첨부) 양쪽에서 공용으로 쓴다.
export async function shareSlackFile(botToken, channelId, filename, bytes, comment) {
  const form = new URLSearchParams({ filename, length: String(bytes.length) });
  const res1 = await fetch('https://slack.com/api/files.getUploadURLExternal', {
    method: 'POST',
    headers: { Authorization: `Bearer ${botToken}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form
  });
  const data1 = await res1.json();
  if (!data1.ok) return { ok: false, error: data1.error };

  const uploadForm = new FormData();
  uploadForm.append('file', new Blob([bytes], { type: 'application/pdf' }), filename);
  const res2 = await fetch(data1.upload_url, { method: 'POST', body: uploadForm });
  if (!res2.ok) return { ok: false, error: 'upload_failed' };

  const res3 = await fetch('https://slack.com/api/files.completeUploadExternal', {
    method: 'POST',
    headers: { Authorization: `Bearer ${botToken}`, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      files: [{ id: data1.file_id, title: filename }],
      channel_id: channelId,
      initial_comment: comment
    })
  });
  return res3.json();
}
