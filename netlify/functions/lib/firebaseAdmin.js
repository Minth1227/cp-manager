// Firebase Admin SDK 싱글턴 초기화.
// 클라이언트(src/firebase.js)는 브라우저 SDK + 로그인 세션 기준 보안규칙으로 쓰지만,
// Slack 버튼 클릭은 로그인 세션이 없는 서버(Netlify Function) 요청이므로 서비스 계정
// 자격증명으로 직접 Firestore/Storage에 접근해야 한다. 서비스 계정 키는 절대 코드에
// 커밋하지 않고 Netlify 환경변수(FIREBASE_SERVICE_ACCOUNT_BASE64)로만 주입한다.
import admin from 'firebase-admin';

let appInstance = null;

function initAdminApp() {
  if (appInstance) return appInstance;
  if (admin.apps.length) {
    appInstance = admin.app();
    return appInstance;
  }

  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!b64) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_BASE64 환경변수가 설정되지 않았습니다. ' +
      'Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성으로 받은 JSON 파일을 ' +
      'base64로 인코딩하여 Netlify 환경변수에 등록해야 합니다.'
    );
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
  } catch (e) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 값이 올바른 base64 JSON이 아닙니다: ' + e.message);
  }

  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.VITE_FIREBASE_STORAGE_BUCKET ||
    `${serviceAccount.project_id}.appspot.com`;

  appInstance = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket
  });
  return appInstance;
}

export function getAdminDb() {
  initAdminApp();
  return admin.firestore();
}

export function getAdminBucket() {
  initAdminApp();
  return admin.storage().bucket();
}

export function getAdminFieldValue() {
  return admin.firestore.FieldValue;
}
