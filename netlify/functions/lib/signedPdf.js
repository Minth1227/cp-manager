// Slack 승인/반려 버튼 클릭 시점에 서버(Netlify Function)에서 직접 PDF를 생성하는 모듈.
// 브라우저 전용 렌더러(html2pdf.js — DOM/canvas 필요)는 서버에서 쓸 수 없으므로,
// 순수 Node 환경에서도 동작하는 pdf-lib로 처음부터 그린다. 클라이언트의 화려한 HTML
// 템플릿과는 별개의, 감사증적(Audit Trail) 전용 심플 레이아웃이다.
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

let cachedFontBytes = null;

async function loadKoreanFont() {
  if (cachedFontBytes) return cachedFontBytes;
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!base) throw new Error('사이트 배포 URL(process.env.URL)을 확인할 수 없어 한글 폰트를 불러올 수 없습니다.');
  const res = await fetch(`${base}/fonts/NanumGothic.ttf`);
  if (!res.ok) throw new Error(`한글 폰트를 불러오지 못했습니다 (${res.status})`);
  cachedFontBytes = await res.arrayBuffer();
  return cachedFontBytes;
}

// 임베드된 폰트 기준 실측 너비로 줄바꿈한다 (공백 기준 우선, 공백 없이 긴 값은 글자 단위로 강제 절단).
function wrapText(font, text, size, maxWidth) {
  const rawLines = String(text ?? '').split('\n');
  const out = [];
  rawLines.forEach(rawLine => {
    if (rawLine === '') { out.push(''); return; }
    const words = rawLine.split(' ');
    let current = '';
    words.forEach(word => {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) out.push(current);
        // 단어 자체가 한 줄보다 긴 경우 글자 단위로 강제 절단
        if (font.widthOfTextAtSize(word, size) > maxWidth) {
          let chunk = '';
          for (const ch of word) {
            const cand2 = chunk + ch;
            if (font.widthOfTextAtSize(cand2, size) > maxWidth) {
              out.push(chunk);
              chunk = ch;
            } else {
              chunk = cand2;
            }
          }
          current = chunk;
        } else {
          current = word;
        }
      }
    });
    out.push(current);
  });
  return out;
}

/**
 * @param {Object} opts
 * @param {string} opts.formId
 * @param {string} opts.formTitle
 * @param {string} [opts.subtitle]           문서 성격 부제 (예: "규정 제·개정 기안문")
 * @param {Array<{label:string, value:string}>} opts.fields   본문에 표시할 항목들
 * @param {Object} [opts.stamp]              서명/반려 스탬프 정보 — 생략하면 스탬프 없이 "결재 대기 중" 미리보기 문서로 생성됨
 * @param {'승인'|'반려'} opts.stamp.verb
 * @param {string} opts.stamp.approverName   실제 성명 (Slack 프로필 real_name)
 * @param {string} opts.stamp.roleLabel      역할 (예: "대표이사", "기구장")
 * @param {string} opts.stamp.slackUserId    Slack 사용자 ID (U0123...)
 * @param {string} opts.stamp.slackUserName  Slack 표시 이름 (@handle)
 * @param {string} opts.stamp.timestamp      승인/반려 일시 (사람이 읽는 형식)
 * @param {string} [opts.stamp.reason]       반려 사유 (반려일 때만)
 * @returns {Promise<Uint8Array>}
 */
export async function generateSignedDocumentPdf({ formId, formTitle, subtitle, fields = [], stamp }) {
  const fontBytes = await loadKoreanFont();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  // 주의: { subset: true }를 주면 이 NanumGothic.ttf에서 다수 한글 글리프가 깨져서 렌더링되는
  // 문제를 실제 PDF 렌더링 테스트로 확인했다(텍스트 추출은 정상이라 눈으로 보기 전엔 알기 어려움).
  // 파일 용량이 커지더라도(수백 KB 수준) 정확한 렌더링이 우선이므로 서브셋을 쓰지 않는다.
  const font = await pdfDoc.embedFont(fontBytes);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const ensureSpace = (needed) => {
    if (y - needed < MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  };

  const drawLine = (text, { size = 10, color = rgb(0.1, 0.1, 0.1), gap = 6, bold = false } = {}) => {
    const lines = wrapText(font, text, size, CONTENT_WIDTH);
    lines.forEach(line => {
      ensureSpace(size + gap);
      page.drawText(line, { x: MARGIN, y, size, font, color });
      y -= size + gap;
    });
  };

  // ── 헤더 ──
  drawLine(`[${formId}] ${formTitle}`, { size: 16, color: rgb(0.1, 0.15, 0.5) });
  if (subtitle) drawLine(subtitle, { size: 10, color: rgb(0.4, 0.4, 0.4) });
  ensureSpace(10);
  page.drawLine({
    start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1, color: rgb(0.8, 0.8, 0.8)
  });
  y -= 20;

  // ── 본문 필드 ──
  fields.forEach(({ label, value }) => {
    if (value === undefined || value === null || String(value).trim() === '') return;
    ensureSpace(24);
    drawLine(`${label}`, { size: 9, color: rgb(0.45, 0.45, 0.45), gap: 2 });
    drawLine(String(value), { size: 11, color: rgb(0.1, 0.1, 0.1), gap: 14 });
  });

  // ── 전자서명/반려 스탬프 박스 (stamp가 없으면 "결재 대기 중" 안내만 표시) ──
  if (stamp) {
    const isApproved = stamp.verb === '승인';
    const stampLines = [
      `${isApproved ? '전자서명 완료 (Slack 승인)' : 'Slack 반려 처리'}`,
      `${stamp.roleLabel || ''} ${stamp.approverName || ''}`.trim(),
      `Slack 계정: ${stamp.slackUserName || ''} (ID: ${stamp.slackUserId || ''})`,
      `${isApproved ? '승인' : '반려'} 일시: ${stamp.timestamp}`,
    ];
    if (!isApproved && stamp.reason) {
      stampLines.push(`반려 사유: ${stamp.reason}`);
    }

    const stampBoxHeight = 24 + stampLines.length * 16;
    ensureSpace(stampBoxHeight + 20);
    y -= 10;
    const boxTop = y;
    const boxColor = isApproved ? rgb(0.90, 0.97, 0.92) : rgb(0.99, 0.92, 0.92);
    const borderColor = isApproved ? rgb(0.16, 0.60, 0.30) : rgb(0.75, 0.20, 0.20);
    page.drawRectangle({
      x: MARGIN, y: boxTop - stampBoxHeight, width: CONTENT_WIDTH, height: stampBoxHeight,
      color: boxColor, borderColor, borderWidth: 1.5
    });
    let stampY = boxTop - 20;
    stampLines.forEach((line, idx) => {
      page.drawText(line, {
        x: MARGIN + 16, y: stampY, size: idx === 0 ? 12 : 10, font,
        color: idx === 0 ? borderColor : rgb(0.2, 0.2, 0.2)
      });
      stampY -= 16;
    });
  } else {
    ensureSpace(40);
    y -= 10;
    drawLine('⏳ 결재 대기 중 — 아래 Slack 메시지의 승인/반려 버튼으로 처리해주세요.', { size: 10, color: rgb(0.55, 0.4, 0.05) });
  }

  // ── 하단 안내 ──
  const footerY = MARGIN - 10 > 20 ? MARGIN - 10 : 20;
  page.drawText(
    stamp
      ? '이 문서는 Slack Interactivity(전자결재)를 통해 시스템이 자동 생성한 감사증적(Audit Trail)입니다.'
      : '이 문서는 결재 요청 시점의 미리보기입니다. 승인 완료 시 서명 스탬프가 찍힌 최종본이 별도 생성됩니다.',
    { x: MARGIN, y: footerY, size: 7.5, font, color: rgb(0.55, 0.55, 0.55) }
  );

  return pdfDoc.save();
}
