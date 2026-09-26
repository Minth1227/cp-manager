// Netlify Blobs 사이트 전체 저장소("legal-pdfs") 접근 헬퍼.
// 이 배포 환경에서는 @netlify/blobs의 자동 컨텍스트 주입이 되지 않아서(에러: "The environment
// has not been configured to use Netlify Blobs"), siteID/token을 직접 넘겨 수동으로 설정한다.
import { getStore } from '@netlify/blobs';

export function getLegalPdfStore() {
  const siteID = process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (siteID && token) {
    return getStore({ name: 'legal-pdfs', consistency: 'strong', siteID, token });
  }
  // 자동 컨텍스트가 정상 작동하는 환경(예: 향후 Netlify 쪽 수정)이면 이 경로로도 동작한다.
  return getStore({ name: 'legal-pdfs', consistency: 'strong' });
}
