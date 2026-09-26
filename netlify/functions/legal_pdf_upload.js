// 관리자가 별지/별표 공식 서식의 실제 법정 PDF를 업로드한다. 법이 개정되면 같은 formId로
// 다시 업로드해서 그대로 교체한다(버전 구분 없이 최신본 1개만 유지). 실제 파일 바이트는
// Netlify Blobs 사이트 전체 저장소(배포와 무관하게 유지됨)에, 업로드 메타데이터는 Firestore에 둔다.
import { getAdminDb } from './lib/firebaseAdmin.js';
import { getLegalPdfStore } from './lib/legalPdfStore.js';

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { formId, filename, pdfBase64, uploadedBy } = JSON.parse(event.body || '{}');

    if (!formId || !pdfBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: 'formId와 pdfBase64가 필요합니다.' }) };
    }

    const buffer = Buffer.from(pdfBase64, 'base64');
    if (buffer.length < 5 || buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
      return { statusCode: 400, body: JSON.stringify({ error: 'PDF 파일이 아닙니다.' }) };
    }
    if (buffer.length > 20 * 1024 * 1024) {
      return { statusCode: 400, body: JSON.stringify({ error: '파일이 너무 큽니다 (20MB 이하만 가능).' }) };
    }

    const store = getLegalPdfStore();
    await store.set(formId, buffer);

    const meta = {
      filename: filename || `${formId}.pdf`,
      sizeBytes: buffer.length,
      uploadedAt: new Date().toISOString(),
      uploadedBy: uploadedBy || 'unknown',
    };

    const db = getAdminDb();
    await db.collection('system').doc('globalState').set({ legalPdfs: { [formId]: meta } }, { merge: true });

    return { statusCode: 200, body: JSON.stringify({ ok: true, meta }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
