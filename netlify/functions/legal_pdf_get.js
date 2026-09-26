// 별지/별표 공식 서식의 실제 법정 PDF를 다운로드한다. GET /.netlify/functions/legal_pdf_get?formId=F-01
import { getAdminDb } from './lib/firebaseAdmin.js';
import { getLegalPdfStore } from './lib/legalPdfStore.js';

export const handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const formId = event.queryStringParameters?.formId;
  if (!formId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'formId가 필요합니다.' }) };
  }

  try {
    const store = getLegalPdfStore();
    const arrayBuf = await store.get(formId, { type: 'arrayBuffer' });
    if (!arrayBuf) {
      return { statusCode: 404, body: JSON.stringify({ error: '업로드된 PDF가 없습니다.' }) };
    }
    const buffer = Buffer.from(arrayBuf);

    let filename = `${formId}.pdf`;
    try {
      const db = getAdminDb();
      const snap = await db.collection('system').doc('globalState').get();
      const meta = snap.data()?.legalPdfs?.[formId];
      if (meta?.filename) filename = meta.filename;
    } catch (e) { /* 파일명 조회 실패해도 다운로드 자체는 계속 진행 */ }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
