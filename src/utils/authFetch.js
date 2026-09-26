// 서버 함수(/.netlify/functions/*) 호출 시 Firebase 로그인 ID 토큰을 함께 보낸다.
// 서버는 이 토큰으로 호출자와 역할(role)을 확인한다 (netlify/functions/lib/requireAuth.js).
import { auth } from '../firebase.js';

export async function authFetch(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}
