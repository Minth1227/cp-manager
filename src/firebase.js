import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// [신규] 첨부문서(L-11 등) 업로드용 Cloud Storage 핸들.
// storageBucket이 .env에 설정되어 있어도, 실제 Firebase 콘솔에서 Storage를 한 번도
// "시작하기" 하지 않았다면 getStorage() 자체는 성공하지만 업로드 시점에 403/설정오류가 날 수 있다.
// 이 경우는 storage.js의 uploadAttachment()가 잡아서 사용자에게 안내 메시지를 보여준다.
export const storage = getStorage(app);

// TEMPORARY (session-local UX testing only): when VITE_USE_EMULATOR=true,
// redirect the SDK to the local Firebase emulators instead of the real
// backend. When this flag is absent/false, behavior is unchanged (real
// Firebase project), so production builds are unaffected.
if (import.meta.env.VITE_USE_EMULATOR === 'true') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  // eslint-disable-next-line no-console
  console.warn("[cp_manager] Firebase EMULATOR mode ON — auth:9099, firestore:8080, storage:9199 (no writes reach production).");
}
