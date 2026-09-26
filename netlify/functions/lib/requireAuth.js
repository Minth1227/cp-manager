// 서버 함수 호출자 인증.
// 브라우저는 Firebase 로그인 ID 토큰을 Authorization: Bearer <token> 헤더로 보낸다.
// 여기서 토큰을 검증하고 users/{uid} 문서의 역할(role)을 확인한다.
// (종전에는 이 확인이 없어 주소만 알면 누구나 법령 PDF를 지우거나 Gemini API를 호출할 수 있었음)
import admin from 'firebase-admin';
import { getAdminDb } from './firebaseAdmin.js';

export const ROLES = {
  APPROVED: ['Master', 'ADMIN', 'EDITOR', 'Reviewer', 'VIEWER', 'General'],
  EDITORS: ['Master', 'ADMIN', 'EDITOR', 'Reviewer'],
  ADMINS: ['Master', 'ADMIN'],
};

const deny = (statusCode, error) => ({
  ok: false,
  response: { statusCode, body: JSON.stringify({ error }) },
});

export async function requireAuth(event, allowedRoles = ROLES.APPROVED) {
  const header = event.headers?.authorization || event.headers?.Authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return deny(401, '로그인이 필요합니다.');

  let decoded;
  try {
    getAdminDb(); // Admin 앱 초기화
    decoded = await admin.auth().verifyIdToken(match[1]);
  } catch (e) {
    return deny(401, '로그인 정보가 유효하지 않습니다. 다시 로그인하세요.');
  }

  let role = null;
  try {
    const snap = await getAdminDb().collection('users').doc(decoded.uid).get();
    role = snap.exists ? snap.data().role : null;
  } catch (e) {
    return deny(500, '권한 확인 중 오류가 발생했습니다.');
  }
  if (!role || role === 'PENDING' || !allowedRoles.includes(role)) {
    return deny(403, '이 작업을 할 권한이 없습니다.');
  }
  return { ok: true, uid: decoded.uid, email: decoded.email || '', role };
}

// Slack Bot Token은 서버 환경변수(SLACK_BOT_TOKEN)를 우선 사용한다.
// 환경변수가 아직 없을 때만 과거 방식(클라이언트/Firestore 저장값)을 임시로 허용한다.
export function resolveBotToken(fallbackToken) {
  const envToken = process.env.SLACK_BOT_TOKEN || '';
  if (envToken) return envToken;
  if (fallbackToken) {
    console.warn('[security] SLACK_BOT_TOKEN 환경변수가 없어 저장된 토큰을 사용합니다. 환경변수로 이전하십시오.');
  }
  return fallbackToken || '';
}
