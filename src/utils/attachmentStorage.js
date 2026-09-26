// ============================================
// 첨부문서 업로드/삭제 (Firebase Cloud Storage)
// 법정 서식이 따로 없는 문서(수출계약서, 영업증명서=사업자등록증, 기술사양서=카탈로그 등)를
// 별도 양식 설계 없이도 파일 그대로 첨부·관리할 수 있게 하는 공용 유틸.
//
// [저장 구조] 파일 실물은 Storage에, 메타데이터(파일명/다운로드URL/업로더 등)만 Firestore
// 폼 데이터(L-11 등)의 attachments 배열에 저장한다 — Firestore 문서 1MiB 제한을 피하고,
// 나중에 실제 Storage가 연결되면 코드 변경 없이 그대로 동작한다.
// ============================================

import { storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const MAX_FILE_SIZE_MB = 20;

/**
 * 파일을 Storage에 업로드하고, Firestore에 저장할 메타데이터 객체를 반환한다.
 * @param {string} txId - 거래 ID (또는 트랜잭션 무관 서식이면 'global')
 * @param {string} formId - 첨부가 속한 서식 ID (예: 'L-11')
 * @param {File} file - 업로드할 파일
 * @param {string} category - 문서 분류 (예: '수출계약서')
 * @param {{ note?: string, uploadedBy?: string }} extra
 * @returns {Promise<{id:string, category:string, fileName:string, downloadURL:string, storagePath:string, sizeBytes:number, uploadedAt:string, uploadedBy:string, note:string}>}
 */
export async function uploadAttachment(txId, formId, file, category, extra = {}) {
  if (!file) throw new Error('첨부할 파일이 없습니다.');
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`파일이 너무 큽니다. ${MAX_FILE_SIZE_MB}MB 이하만 첨부할 수 있습니다.`);
  }

  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const safeName = file.name.replace(/[^\w.\-가-힣 ]/g, '_');
  const storagePath = `attachments/${txId || 'global'}/${formId}/${id}_${safeName}`;

  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file, { contentType: file.type || 'application/octet-stream' });
    const downloadURL = await getDownloadURL(storageRef);

    return {
      id,
      category,
      fileName: file.name,
      downloadURL,
      storagePath,
      sizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: extra.uploadedBy || '',
      note: extra.note || '',
    };
  } catch (e) {
    console.error('[attachmentStorage] 업로드 실패:', e);
    // Storage 버킷이 아직 Firebase 콘솔에서 프로비저닝되지 않았을 때 흔한 원인 두 가지를 구분해 안내.
    if (e?.code === 'storage/unknown' || e?.code === 'storage/unauthorized' || e?.message?.includes('CORS')) {
      throw new Error('파일 저장소(Storage)가 아직 연결되지 않았습니다. Firebase 콘솔에서 Storage를 활성화한 뒤 다시 시도해주세요.');
    }
    throw new Error('파일 업로드 중 오류가 발생했습니다: ' + (e?.message || e));
  }
}

/** Storage에서 파일 실물을 삭제한다. 메타데이터(Firestore 배열)에서 제거하는 것은 호출 측 책임. */
export async function deleteAttachment(storagePath) {
  if (!storagePath) return;
  try {
    await deleteObject(ref(storage, storagePath));
  } catch (e) {
    // 이미 지워졌거나 Storage 미연결 상태일 수 있음 — 메타데이터 정리는 계속 진행되도록 조용히 무시.
    console.warn('[attachmentStorage] 파일 삭제 실패(무시하고 목록에서만 제거):', e);
  }
}

/**
 * 앱 내 전자서명(btn-electronic-sign) 완료 시 만들어진 PDF를 Storage에 영구 저장한다.
 * Slack 승인 경로(slack_interactions.js)가 서버에서 만드는 서명 PDF와 짝을 이루는 클라이언트 버전 —
 * 서명 경로(앱/Slack)와 무관하게 "서명 문서함"(store.js의 signedDocuments)에 같은 형태로 쌓이도록
 * downloadURL과 SHA-256 해시를 함께 반환한다.
 * @param {string} storagePath
 * @param {Blob} pdfBlob
 * @returns {Promise<{downloadURL: string, sha256: string}>}
 */
export async function uploadSignedPdf(storagePath, pdfBlob) {
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, pdfBlob, { contentType: 'application/pdf' });
  const downloadURL = await getDownloadURL(storageRef);

  const buf = await pdfBlob.arrayBuffer();
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  const sha256 = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

  return { downloadURL, sha256 };
}

export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
