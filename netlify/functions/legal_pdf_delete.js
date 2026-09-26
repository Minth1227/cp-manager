// 관리자가 업로드했던 별지/별표 공식 PDF를 삭제한다.
import { getAdminDb, getAdminFieldValue } from './lib/firebaseAdmin.js';
import { getLegalPdfStore } from './lib/legalPdfStore.js';

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { formId } = JSON.parse(event.body || '{}');
    if (!formId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'formId가 필요합니다.' }) };
    }

    const store = getLegalPdfStore();
    await store.delete(formId);

    const db = getAdminDb();
    await db.collection('system').doc('globalState').update({
      [`legalPdfs.${formId}`]: getAdminFieldValue().delete(),
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
