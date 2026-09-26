// Slack Request URL로 들어오는 요청이 진짜 Slack이 보낸 것인지 검증한다.
// (Slack Signing Secret + HMAC SHA256, Slack 공식 검증 알고리즘)
// https://api.slack.com/authentication/verifying-requests-from-slack
import crypto from 'crypto';

const MAX_TIMESTAMP_SKEW_SECONDS = 60 * 5; // 5분 — 재전송(replay) 공격 방지

/**
 * @param {Object} opts
 * @param {string} opts.signingSecret   Slack 앱의 Signing Secret (Netlify 환경변수 SLACK_SIGNING_SECRET)
 * @param {string} opts.timestamp       요청 헤더 x-slack-request-timestamp
 * @param {string} opts.signature       요청 헤더 x-slack-signature (예: "v0=...")
 * @param {string} opts.rawBody         가공하지 않은 원본 요청 바디 문자열
 * @returns {{ ok: boolean, reason?: string }}
 */
export function verifySlackSignature({ signingSecret, timestamp, signature, rawBody }) {
  if (!signingSecret) return { ok: false, reason: 'SLACK_SIGNING_SECRET 미설정' };
  if (!timestamp || !signature) return { ok: false, reason: '서명 헤더 누락' };

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > MAX_TIMESTAMP_SKEW_SECONDS) {
    return { ok: false, reason: '요청 시각이 오래되어 재전송 공격으로 의심됨' };
  }

  const baseString = `v0:${timestamp}:${rawBody}`;
  const hmac = crypto.createHmac('sha256', signingSecret).update(baseString, 'utf8').digest('hex');
  const expectedSignature = `v0=${hmac}`;

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  const isValid = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

  return isValid ? { ok: true } : { ok: false, reason: '서명 불일치' };
}
