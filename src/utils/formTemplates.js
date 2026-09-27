// ============================================
// 별지 서식 HTML 템플릿
// 각 별지를 HTML 테이블로 충실히 재현
// ============================================
import { getCurrentUser } from '../store.js';

const commonStyle = `
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
  /* [수정] 이 <style> 블록은 별지 서식을 앱 화면 안(.interactive-mode)에 그대로 끼워 넣을 때도 쓰이는데,
     아래 셀렉터들이 body/전체요소에 그대로 걸려 있어서 앱 전체(제목 글자색 등)에 새어나가고 있었음.
     별지 서식을 인쇄 미리보기로 새 창에 띄울 때(.print-wrapper)와 앱 화면에 끼워 넣을 때(.interactive-mode)
     두 컨테이너 안으로만 스코프를 좁힘. */
  .print-wrapper *, .interactive-mode * { margin: 0; padding: 0; box-sizing: border-box; }


  /* ── 폼 입력 스타일 (interactive-mode) ── */
  .byeolji-input, .byeolji-textarea {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    resize: none;
    overflow: hidden;
    line-height: 1.5;
    background: transparent;
  }
  .byeolji-input.editable, .byeolji-textarea.editable {
    background-color: #fffde7;
    border: 1px dashed #93c5fd;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  .byeolji-input.editable:focus, .byeolji-textarea.editable:focus {
    background-color: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  .byeolji-input.readonly, .byeolji-textarea.readonly {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    padding: 4px;
    border-radius: 4px;
  }
  
  @media print {
    .byeolji-input.editable, .byeolji-textarea.editable,
    .byeolji-input.readonly, .byeolji-textarea.readonly {
      background-color: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      color: #000 !important;
    }
  }

  /* ── 화면 표시용 ── */
  @media screen {
    .print-wrapper { max-width: 210mm; margin: 0 auto; padding: 20mm; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .interactive-mode { width: 100%; min-width: 1024px; padding: 10px 20px; margin: 0; overflow-x: auto; box-sizing: border-box; }
  }

  /* ── 공통 타이포그래피 ── */
  /* [수정 #13] 기업 내부망/오프라인 환경 대비 fallback 폰트 스택 강화 */
  /* [수정] 원래 body 전체에 걸려 있던 것을 두 컨테이너 안으로 스코프 — 앱 화면 전체의 글자색이
     이 서식을 열 때마다 검정으로 덮어써지던 문제(제목 등)의 근본 원인이었음 */
  .print-wrapper, .interactive-mode {
    font-family: 'Pretendard Variable', 'Apple SD Gothic Neo', '맑은 고딕', 'Malgun Gothic', 'NanumGothic', Dotum, sans-serif;
    font-size: 10pt; color: #111; line-height: 1.5;
  }
  .byeolji-title { text-align: center; font-size: 16pt; font-weight: 700; margin: 10px 0 20px; }
  .byeolji-subtitle { text-align: left; font-size: 8pt; color: #666; margin-bottom: 5px; }
  .byeolji-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  .byeolji-table th, .byeolji-table td { border: 1px solid #333; padding: 5px 8px; font-size: 9pt; vertical-align: middle; }
  .byeolji-table th { background: #f5f5f5; font-weight: 600; text-align: center; }
  .byeolji-table td.value { min-height: 22px; }
  .byeolji-table .label-cell { background: #f9f9f9; font-weight: 500; width: 120px; }
  .byeolji-table .label-cell-wide { background: #f9f9f9; font-weight: 500; width: 180px; }
  .eng { font-size: 7.5pt; color: #555; display: block; }
  .checkbox { font-size: 12pt; }
  .signature-area { margin-top: 30px; text-align: center; line-height: 2; }
  .note-area { margin-top: 15px; font-size: 8pt; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
  .print-btn { position: fixed; top: 10px; right: 10px; padding: 8px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; z-index: 9999; }
  .print-btn:hover { background: #1d4ed8; }

  /* ── 사전보고 기한 관리 위젯(D-30) — 별지 서식 원문에는 없는 내부 관리용 보조 UI.
     화면(interactive-mode)에서만 보이고 인쇄/PDF 출력 시에는 숨겨 원본 서식과 섞이지 않게 한다. ── */
  .deadline-helper { margin: 10px 0 18px; padding: 10px 14px; background: #fffbeb; border: 1px solid #f59e0b; border-radius: 8px; font-size: 9pt; }
  .deadline-helper strong { color: #b45309; }
  .deadline-helper .dh-row { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }
  .deadline-helper input[type="date"] { font-family: inherit; font-size: inherit; padding: 4px 6px; border: 1px solid #cbd5e1; border-radius: 4px; }
  .deadline-helper .dh-deadline { font-weight: 700; }
  .deadline-helper .dh-deadline.dh-warn { color: #dc2626; }

  /* ── 인쇄 전용 ── */
  /* [수정 #8] page-break-inside 누락 추가 — A4 출력 시 테이블 행/서명영역 잘림 방지 */
  /* [수정 #9] body padding + @page margin 이중 여백 해소 → @page margin이 전담 */
  @media print {
    body { padding: 0; margin: 0; }
    @page { size: A4 portrait; margin: 15mm 20mm; }   /* 관공서 표준 여백 */

    .print-btn { display: none; }
    .deadline-helper { display: none; }

    /* 테이블 행 페이지 경계 분할 방지 */
    .byeolji-table { page-break-inside: auto; }
    .byeolji-table tr { page-break-inside: avoid; page-break-after: auto; }
    /* 멀티페이지 테이블에서 헤더 반복 표시 */
    .byeolji-table thead { display: table-header-group; }
    .byeolji-table tfoot { display: table-footer-group; }

    /* 서명 영역 및 주의사항 분할 방지 */
    .signature-area { page-break-inside: avoid; }
    .note-area { page-break-inside: avoid; }
  }
</style>
`;

const printButton = '<button class="print-btn" onclick="window.print()">🖨️ 인쇄 / PDF 저장</button>';

function ck(data, key, target, isEditMode = false) {
  let val = data ? data[key] : undefined;
  let isChecked = false;
  if (Array.isArray(val)) {
    isChecked = val.includes(target);
  } else {
    isChecked = val === target || val === true; // sometimes it might be just true
  }

  if (isEditMode) {
    // Render an interactive checkbox
    const checkedAttr = isChecked ? 'checked' : '';
    // We use type="checkbox" because some forms allow multiple selections (e.g. grade)
    return `<input type="checkbox" class="byeolji-checkbox" data-field="${key}" value="${target}" ${checkedAttr} style="transform: scale(1.2); margin-right: 4px; cursor: pointer;">`;
  }
  
  return isChecked ? '☑' : '☐';
}

export function field(data, key, isEditMode = false, isTextarea = false, isReadonly = false, placeholder = '', valFallback = null) {
  let val = data ? (data[key] || '') : '';
  if (!val && valFallback) val = valFallback;
  
  if (isEditMode) {
    const editClass = isReadonly ? 'readonly' : 'editable';
    const readAttr = isReadonly ? 'readonly tabindex="-1"' : '';
    if (isTextarea) {
      return `<textarea class="byeolji-textarea ${editClass}" data-field="${key}" placeholder="${placeholder}" ${readAttr}>${val}</textarea>`;
    }
    return `<input type="text" class="byeolji-input ${editClass}" data-field="${key}" value="${val}" placeholder="${placeholder}" ${readAttr} />`;
  }
  return val ? val.replace(/\n/g, '<br>') : '&nbsp;';
}

function v(data, key, fallback) {
  return data[key] || fallback || '';
}

// 법조문 "제_항 제_호"처럼 한두 글자만 들어가는 짧은 칸용 — field()가 기본으로 셀 전체 너비(width:100%)를
// 차지해버리는 문제를 막기 위해 고정폭 인라인 박스로 감싼다.
function mini(data, key, isEditMode = false) {
  const inner = field(data, key, isEditMode, false, false, '_');
  return isEditMode ? `<span style="display:inline-block;width:34px;">${inner}</span>` : inner;
}

// 법정 보관의무 정보 또는 다른 서식으로 자동입력·연동되는 핵심 항목의 라벨에 붙이는 필수 표시.
// (이 앱의 "필수" 표시는 시각적 안내일 뿐 저장을 막지는 않음 — renderer.js의 field.required와 동일한 관례)
function req(label) {
  return `${label}<span style="color:#dc2626;font-weight:700" title="법정 보관 또는 다른 서식 자동연동에 사용되는 필수 항목">&nbsp;*</span>`;
}

// ─── 별지 제4호: 전문판정(신청)서 ───
function tmpl_04(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제4호 - 전문판정(신청)서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div style="display: flex; justify-content: space-between; align-items: flex-end;">
  <div class="byeolji-subtitle" style="margin-bottom: 0;">[별지 제4호 서식] Annexed paper No. 4</div>
  <table style="border-collapse: collapse; text-align: center; font-size: 8pt; line-height: 1.2;">
    <tr>
      <td style="border: 1px solid #333; padding: 4px 8px; background: #f9f9f9;">처리기간<br><span class="eng">Handling Time</span></td>
      <td style="border: 1px solid #333; padding: 4px 15px;">15일<br><span class="eng">15 days</span></td>
    </tr>
  </table>
</div>
<div class="byeolji-title">전략물자 전문판정(신청)서<br><span style="font-size:11pt">Classification (Application) Form</span></div>
<table class="byeolji-table">
  <tr>
    <th rowspan="4" style="width:100px">① 신청인<br><span class="eng">Applicant</span></th>
    <td class="label-cell">${req('상 호')}<span class="eng">Name of Company</span></td>
    <td class="value">${field(data, 'companyName', isEditMode)}</td>
    <td class="label-cell">신청인<span class="eng">Applicant</span></td>
    <td class="value">${field(data, 'applicantName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소<span class="eng">Address</span></td>
    <td class="value">${field(data, 'address', isEditMode)}</td>
    <td class="label-cell">${req('사업자등록번호')}<span class="eng">Business Registration No.</span></td>
    <td class="value">${field(data, 'regNumber', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전 화<span class="eng">Telephone</span></td>
    <td class="value">${field(data, 'telephone', isEditMode)}</td>
    <td class="label-cell">무역업고유번호<span class="eng">Trade Business Code</span></td>
    <td class="value">${field(data, 'tradeCode', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">판정결과 공개<span class="eng">Consent to share</span></td>
    <td colspan="3">${ck(data, 'disclosure', 'public', isEditMode)} 공개 (With all) &nbsp; ${ck(data, 'disclosure', 'partial', isEditMode)} 일부공개 (With Specified Person) &nbsp; ${ck(data, 'disclosure', 'private', isEditMode)} 비공개 (With None)</td>
  </tr>
  <tr>
    <th>${req('② HS번호')}<br><span class="eng">HS Code</span></th>
    <td colspan="4" class="value">${field(data, 'hsCode', isEditMode)}</td>
  </tr>
  <tr>
    <th>${req('③ 물품명(기술명 및 기술내용)')}<br><span class="eng">Item</span></th>
    <td colspan="4" class="value">${field(data, 'itemName', isEditMode)}</td>
  </tr>
  <tr>
    <th rowspan="2">④ 형식 및 규격<br><span class="eng">Type and Specifications</span></th>
    <td class="label-cell">모델번호 및 모델명<span class="eng">Model No. & Name</span></td>
    <td colspan="3" class="value">${field(data, 'modelNumber', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">규격/용도<span class="eng">Specifications/Usage</span></td>
    <td colspan="3" class="value" style="min-height:60px;white-space:pre-wrap">${field(data, 'specUsage', isEditMode, true)}</td>
  </tr>
  <tr>
    <th rowspan="7">⑤ 판정 결과<br><span class="eng">Classification results</span></th>
    <td colspan="4" style="text-align:center; background:#f9f9f9; font-weight:500;">
      전략물자등 해당여부 (해당시 통제번호 기재)<br>
      <span class="eng">Controlled(Control Classification No.) / Uncontrolled</span>
    </td>
  </tr>
  <tr>
    <td class="label-cell">이중용도품목<span class="eng">Dual-Use Item(s)</span></td>
    <td colspan="3">${ck(data, 'dualUse', 'yes', isEditMode)} 해당(Yes) &nbsp; ${ck(data, 'dualUse', 'no', isEditMode)} 비해당(No) &nbsp; ${ck(data, 'dualUse', 'except', isEditMode)} 예외적 비해당</td>
  </tr>
  <tr>
    <td class="label-cell">원자력전용품목<span class="eng">Trigger Item(s)</span></td>
    <td colspan="3">${ck(data, 'triggerItem', 'yes', isEditMode)} 해당(Yes) &nbsp; ${ck(data, 'triggerItem', 'no', isEditMode)} 비해당(No) &nbsp; ${ck(data, 'triggerItem', 'except', isEditMode)} 예외적 비해당</td>
  </tr>
  <tr>
    <td class="label-cell">군용물자품목<span class="eng">Munition(s)</span></td>
    <td colspan="3">${ck(data, 'munition', 'yes', isEditMode)} 해당(Yes) &nbsp; ${ck(data, 'munition', 'no', isEditMode)} 비해당(No) &nbsp; ${ck(data, 'munition', 'except', isEditMode)} 예외적 비해당</td>
  </tr>
  <tr>
    <td class="label-cell">상황허가대상<span class="eng">Catch-all Item(s)</span></td>
    <td colspan="3">${ck(data, 'catchAll', 'yes', isEditMode)} 해당(Yes) &nbsp; ${ck(data, 'catchAll', 'no', isEditMode)} 비해당(No)</td>
  </tr>
  <tr>
    <td class="label-cell">통제번호<span class="eng">Control Classification No.</span></td>
    <td colspan="3">${field(data, 'controlNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">통제체제<span class="eng">Control Regime</span></td>
    <td colspan="3">${ck(data, 'regime_wa_s', 'yes', isEditMode)} [WA] 민감 &nbsp; ${ck(data, 'regime_wa_ss', 'yes', isEditMode)} [WA] 초민감 &nbsp; ${ck(data, 'regime_nsg', 'yes', isEditMode)} [NSG] Part1 민감 &nbsp; ${ck(data, 'regime_mtcr', 'yes', isEditMode)} [MTCR] Cat1</td>
  </tr>
  <tr>
    <th>⑥ 판정 상세근거<br><span class="eng">Classification comments</span></th>
    <td colspan="4" class="value" style="min-height:80px;white-space:pre-wrap">${field(data, 'classificationComments', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑦ 유효기간<br><span class="eng">Validity</span></th>
    <td colspan="2" class="value">${field(data, 'validity', isEditMode)}</td>
    <th class="label-cell">⑧ 발급번호<br><span class="eng">Issue No.</span></th>
    <td class="value">${field(data, 'issueNo', isEditMode)}</td>
  </tr>
  <tr>
    <td colspan="5" style="padding: 20px 40px; text-align: center;">
      <p style="text-align: left; word-break: keep-all; margin-bottom: 5px;">「대외무역법」 제20조 및 동법 시행령 제36조제1항의 규정에 의하여 상기 품목에 대한 전략물자등 해당여부의 판정을 신청합니다.</p>
      <p style="text-align: left; color: #555; font-size: 8pt; margin-bottom: 30px;">I request for classification of the items as stated above as stipulated in Article 20 of the 「Foreign Trade Act」 and Article 36(1) of the Enforcement Decree of the 「Foreign Trade Act」.</p>
      
    </td>
  </tr>
</table>
<div class="note-area">
  <p>* 주의사항:</p>
  <p>1. ⑤ 판정결과가 "해당"인 물품을 수출할 경우 반드시 관계기관으로부터 수출허가를 받아야 하며, 무허가 수출시 관련 법령에 따라 처벌을 받게 됩니다.</p>
  <p>2. 잘못된 정보 등에 따른 판정오류 및 그로 인한 무허가 수출 등에 따른 책임은 신청자에게 있습니다.</p>
<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

function tmpl_05(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제5호 - 자가판정서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제5호 서식] Annexed paper No. 5</div>
<div class="byeolji-title">자가판정서<br><span style="font-size:11pt">Self-classification Form</span></div>
<table class="byeolji-table">
  <tr>
    <th rowspan="4" style="width:100px">① 판정인<br><span class="eng">Company</span></th>
    <td class="label-cell">${req('상 호')}<span class="eng">Name of Company</span></td>
    <td class="value">${field(data, 'companyName', isEditMode)}</td>
    <td class="label-cell">대표자성명<span class="eng">Name of Representative</span></td>
    <td class="value">${field(data, 'ceoName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소<span class="eng">Address</span></td>
    <td colspan="3" class="value">${field(data, 'address', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전 화<span class="eng">Telephone</span></td>
    <td class="value">${field(data, 'telephone', isEditMode)}</td>
    <td class="label-cell">${req('사업자등록번호')}<span class="eng">Business Reg. No.</span></td>
    <td class="value">${field(data, 'regNumber', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">무역업고유번호<span class="eng">Trade Business Code</span></td>
    <td colspan="3" class="value">${field(data, 'tradeCode', isEditMode)}</td>
  </tr>
  <tr>
    <th>${req('② HS번호')}<br><span class="eng">HS Code</span></th>
    <td colspan="4" class="value">${field(data, 'hsCode', isEditMode)}</td>
  </tr>
  <tr>
    <th>${req('③ 물품명')}<br><span class="eng">Item</span></th>
    <td colspan="4" class="value">${field(data, 'itemName', isEditMode)}</td>
  </tr>
  <tr>
    <th rowspan="2">④ 형식 및 규격<br><span class="eng">Type and Specifications</span></th>
    <td class="label-cell">모델번호 및 모델명<span class="eng">Model No. & Name</span></td>
    <td colspan="3" class="value">${field(data, 'modelNumber', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">규격/용도<span class="eng">Specifications/Usage</span></td>
    <td colspan="3" class="value" style="min-height:50px;white-space:pre-wrap">${field(data, 'specUsage', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑤ 관련 통제체제</th>
    <td colspan="4">${ck(data, 'regime_wa', 'yes', isEditMode)} WA &nbsp; ${ck(data, 'regime_nsg', 'yes', isEditMode)} NSG &nbsp; ${ck(data, 'regime_mtcr', 'yes', isEditMode)} MTCR &nbsp; ${ck(data, 'regime_ag', 'yes', isEditMode)} AG &nbsp; ${ck(data, 'regime_cwc', 'yes', isEditMode)} CWC &nbsp; ${ck(data, 'regime_bwc', 'yes', isEditMode)} BWC &nbsp; ${ck(data, 'regime_att', 'yes', isEditMode)} ATT</td>
  </tr>
  <tr>
    <th rowspan="3">⑥ 판정결과<br><span class="eng">Classification results</span></th>
    <td colspan="2">전략물자: ${ck(data, 'strategic', 'yes', isEditMode)} 해당 &nbsp; ${ck(data, 'strategic', 'no', isEditMode)} 비해당</td>
    <td colspan="2">상황허가대상: ${ck(data, 'catchAll', 'yes', isEditMode)} 해당 &nbsp; ${ck(data, 'catchAll', 'no', isEditMode)} 비해당</td>
  </tr>
  <tr>
    <td class="label-cell">통제번호</td>
    <td colspan="3">${field(data, 'controlNo', isEditMode)}</td>
  </tr>
  <tr>
    <td colspan="4">${ck(data, 'regime_wa_s', 'yes', isEditMode)} [WA] 민감 &nbsp; ${ck(data, 'regime_wa_ss', 'yes', isEditMode)} [WA] 초민감 &nbsp; ${ck(data, 'regime_nsg_p1', 'yes', isEditMode)} [NSG] Part1 민감 &nbsp; ${ck(data, 'regime_mtcr_c1', 'yes', isEditMode)} [MTCR] Cat1</td>
  </tr>
  <tr>
    <th>⑦ 판정 상세근거<br><span class="eng">Comments</span></th>
    <td colspan="4" class="value" style="min-height:80px;white-space:pre-wrap">${field(data, 'classificationComments', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑧ 자가판정 등록번호<br><span class="eng">Reg. No.</span></th>
    <td colspan="4" class="value">${field(data, 'selfClassRegNo', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑨ 교육이수번호<br><span class="eng">Education Reg. No.</span></th>
    <td colspan="4" class="value">${field(data, 'educationRegNo', isEditMode)}</td>
  </tr>
  <tr>
    <td colspan="5" style="padding: 20px 40px; text-align: center;">
      <p style="text-align: left; word-break: keep-all; margin-bottom: 5px;">「전략물자 수출입고시」제13조의 규정에 의하여 당사의 책임 하에 ⑥과 같이 전략물자등 해당여부를 확인합니다.</p>
      <p style="text-align: left; color: #555; font-size: 8pt; margin-bottom: 30px;">I hereby confirm and take full responsibility of the result of self-classification as stated in ⑥ above as stipulated in Article 13 of Public Notice on Trade of Strategic Items.</p>
      <p style="margin-bottom: 20px; font-weight: bold;">20${field(data, 'signYear', isEditMode)}. &nbsp;&nbsp;&nbsp;${field(data, 'signMonth', isEditMode)}. &nbsp;&nbsp;&nbsp;${field(data, 'signDay', isEditMode)}.</p>
      <p>대표자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${field(data, 'ceoName', isEditMode)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(서명 또는 인)<br><span class="eng">Representative of the Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Signature)</span></p>
    </td>
  </tr>
</table>
<div class="note-area">
  <p>* 주의사항:</p>
  <p>1. ⑥ 판정결과가 "해당"인 물품을 수출할 경우 반드시 관계기관으로부터 수출허가를 받아야 하며, 무허가 수출시 관련 법령에 따라 처벌을 받게 됩니다.</p>
  <p>2. 잘못된 정보 등에 따른 판정오류 및 그로 인한 무허가 수출 등에 따른 책임은 신청자에게 있습니다.</p>
<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제13호: 자율준수무역거래자 지정신청서 ───
function tmpl_13(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제13호 - 지정신청서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제13호 서식]</div>
<div class="byeolji-title">자율준수무역거래자 지정신청서</div>
<p style="text-align:right;font-size:9pt;margin-bottom:10px">처리기간: 40일</p>
<table class="byeolji-table">
  <tr><td class="label-cell-wide">${req('회사명')}</td><td colspan="3">${field(data, 'companyName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">${req('사업자등록번호')}</td><td>${field(data, 'regNumber', isEditMode)}</td><td class="label-cell">무역업고유(신고)번호</td><td>${field(data, 'tradeCode', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">${req('대표이사')}</td><td colspan="3">${field(data, 'ceoName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">주 소</td><td colspan="3">${field(data, 'address', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">희망등급</td><td colspan="3">${ck(data, 'grade', 'A', isEditMode)} A등급 &nbsp;&nbsp; ${ck(data, 'grade', 'AA', isEditMode)} AA등급 &nbsp;&nbsp; ${ck(data, 'grade', 'AAA', isEditMode)} AAA등급 (* 복수선택가능)</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">자율준수관리기구의 장</th></tr>
  <tr><td class="label-cell-wide">성 명</td><td>${field(data, 'headName', isEditMode)}</td><td class="label-cell">소 속</td><td>${field(data, 'headDept', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">직 위</td><td>${field(data, 'headPosition', isEditMode)}</td><td class="label-cell">전 화</td><td>${field(data, 'headPhone', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">팩 스</td><td>${field(data, 'headFax', isEditMode)}</td><td class="label-cell">휴대전화</td><td>${field(data, 'headMobile', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">전자우편</td><td colspan="3">${field(data, 'headEmail', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">자율준수체제 담당자</th></tr>
  <tr><td class="label-cell-wide">성 명</td><td>${field(data, 'staffName', isEditMode)}</td><td class="label-cell">소 속</td><td>${field(data, 'staffDept', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">직 위</td><td>${field(data, 'staffPosition', isEditMode)}</td><td class="label-cell">전 화</td><td>${field(data, 'staffPhone', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">팩 스</td><td>${field(data, 'staffFax', isEditMode)}</td><td class="label-cell">휴대전화</td><td>${field(data, 'staffMobile', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">전자우편</td><td colspan="3">${field(data, 'staffEmail', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">판정담당자</th></tr>
  <tr><td class="label-cell-wide">성 명</td><td>${field(data, 'classifierName', isEditMode)}</td><td class="label-cell">소 속</td><td>${field(data, 'classifierDept', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">직 위</td><td>${field(data, 'classifierPosition', isEditMode)}</td><td class="label-cell">전 화</td><td>${field(data, 'classifierPhone', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">팩 스</td><td>${field(data, 'classifierFax', isEditMode)}</td><td class="label-cell">휴대전화</td><td>${field(data, 'classifierMobile', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">전자우편</td><td colspan="3">${field(data, 'classifierEmail', isEditMode)}</td></tr>
</table>
<div class="note-area" style="font-size:9pt; margin-top:15px;">
  「전략물자 수출입고시」 제78조의 규정에 의하여 위와 같이 자율준수무역거래자로 지정해 줄 것을 신청합니다. 향후 모든 수출거래에 대해 「대외무역법」 등을 준수할 것이며, 자율준수체제의 중요 사항 변경이나 의심스러운 거래에 대해서는 산업통상부장관에게 우선적으로 보고하겠습니다.
</div>
<div class="signature-area" style="margin-top: 30px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    대표자 <span style="display:inline-block; width: 120px;">${field(data, 'ceoName', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</body></html>`;
}

// ─── 별지 제15호: 회사소개서 ───
function tmpl_15(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제15호 - 회사소개서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제15호 서식] Annexed paper No. 15</div>
<div class="byeolji-title">회 사 소 개 서</div>
<table class="byeolji-table">
  <tr><td class="label-cell-wide">${req('① 회사명(영문)')}</td><td colspan="3">${field(data, 'companyName', isEditMode)}<br><span class="eng">${field(data, 'companyNameEn', isEditMode)}</span></td></tr>
  <tr><td class="label-cell-wide">${req('② 대표자')}</td><td>직책: ${field(data, 'ceoTitle', isEditMode)}</td><td colspan="2">성명: ${field(data, 'ceoName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">③ 주소</td><td colspan="3">${field(data, 'address', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">④ 사업내용</td><td>업태: ${field(data, 'businessType', isEditMode)}</td><td>종목: ${field(data, 'businessItem', isEditMode)}</td><td>외투기업여부: ${v(data,'foreignInvest','해당없음')}</td></tr>
  <tr><td class="label-cell-wide">⑤ 주요취급품목</td><td colspan="3">${field(data, 'mainProducts', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑥ 기업규모</td><td colspan="3">자본금 ${field(data, 'capital', isEditMode)} 백만원 / 임직원수 ${field(data, 'employeeCount', isEditMode)} 명 / 연간매출액 ${field(data, 'revenue', isEditMode)} 백만원 (신청직전년도)</td></tr>
  <tr>
    <td class="label-cell-wide" rowspan="2">⑦ 주요주주</td>
    <td>주주명: ${field(data, 'shareholder1', isEditMode)}</td><td>소유비율: ${field(data, 'shareRatio1', isEditMode)}%</td>
    <td></td>
  </tr>
  <tr>
    <td>주주명: ${field(data, 'shareholder2', isEditMode)}</td><td>소유비율: ${field(data, 'shareRatio2', isEditMode)}%</td>
    <td></td>
  </tr>
  <tr><td class="label-cell-wide">⑧ 자율수출관리기구의 장</td><td>직위: ${field(data, 'headPosition', isEditMode)}</td><td colspan="2">성명: ${field(data, 'headName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑨ 자율준수관리기구의 명칭</td><td colspan="3">${field(data, 'orgName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑩ 수출관리 종사자 총수</td><td colspan="3">${field(data, 'totalStaff', isEditMode)} 명 (전임 ${field(data, 'fullTimeStaff', isEditMode)} 명)</td></tr>
  <tr><td class="label-cell-wide">⑪ 담당자</td><td>소속: ${field(data, 'contactDept', isEditMode)} / 성명: ${field(data, 'contactName', isEditMode)}</td><td>전화: ${field(data, 'contactPhone', isEditMode)}</td><td>전자우편: ${field(data, 'contactEmail', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑫ 담당자 주소</td><td colspan="3">${v(data,'contactAddress','③과 동일')}</td></tr>
  <tr><td class="label-cell-wide">⑬ 수출총액</td><td colspan="3">${field(data, 'exportTotal', isEditMode)} 백만원 / 매출액 대비 ${field(data, 'exportRatio', isEditMode)}% (신청직전년도) / 전략물자 비율 약 ${field(data, 'strategicRatio', isEditMode)}%</td></tr>
  <tr><td class="label-cell-wide">⑭ 나의1 지역 수출상황</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'exportRegion1', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑮ 나의2 지역 수출상황</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'exportRegion2', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑯ 전략물자 목적지국가 및 수입자</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'strategicDestinations', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑰ 상황허가대상품목 목적지국가 및 수입자</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'catchAllDestinations', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑱ 우려거래자 수출상황</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'concernedParties', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑲ 연간 개별수출허가건수</td><td colspan="3">전략물자 ${field(data, 'strategicPermitCount', isEditMode)} 건 / 상황허가대상품목 ${field(data, 'catchAllPermitCount', isEditMode)} 건</td></tr>
  <tr><td class="label-cell-wide">⑳ 비고</td><td colspan="3" style="min-height:60px;white-space:pre-wrap">${field(data, 'remarks', isEditMode, true)}</td></tr>
</table><div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제16호: 사전거래보고서 ───
function tmpl_16(data, isEditMode = false, isPreReport = true) {
  // [수정] ㉖ 허가면제사유: 원문(별지16)은 자유서술이 아니라 5개 법적 근거 중 택1 체크 + 항/호 기재.
  // K-02(사후거래보고서, 별지16의2)는 별표24(러시아·벨라루스) 옵션이 원문에 없음(사전 전용) → isPreReport로 분기.
  const exemptionBlock = `
  <tr><th colspan="4" style="background:#e8e8e8">□ 허가면제 사유</th></tr>
  <tr><td colspan="4">
    ㉖ 허가면제 사유(전략물자 수출입고시)<br>
    ${ck(data, 'exemptionBasis', 'a26', isEditMode)} 제26조(개별수출허가의 면제) 제${mini(data, 'exemption26Para', isEditMode)}항 제${mini(data, 'exemption26Ho', isEditMode)}호<br>
    ${ck(data, 'exemptionBasis', 'a54', isEditMode)} 제54조(상황허가의 면제) 제${mini(data, 'exemption54Para', isEditMode)}항 제${mini(data, 'exemption54Ho', isEditMode)}호<br>
    ${ck(data, 'exemptionBasis', 'a59', isEditMode)} 제59조(중개허가의 면제) 제${mini(data, 'exemption59Para', isEditMode)}항 제${mini(data, 'exemption59Ho', isEditMode)}호<br>
    ${ck(data, 'exemptionBasis', 'b19', isEditMode)} 별표19(자율준수무역거래자 등급별 특례) 제${mini(data, 'exemption19No', isEditMode)}호(1~10 중 택일)${isPreReport ? `<br>
    ${ck(data, 'exemptionBasis', 'b24', isEditMode)} 별표24(러시아, 벨라루스 허가 지침) 제${mini(data, 'exemption24Mok', isEditMode)}목(가,나,다 중 택일) 또는 제26조제1항제${mini(data, 'exemption24_26_1', isEditMode)}호(1,2,5,6,8,14,15,16 중 택일) 또는 제26조제3항제5호` : ''}
  </td></tr>`;

  // [수정] ㉚(별표24 제2호 제다목 해당시 추가증빙)은 K-01(사전거래보고서) 원문에만 있는 컬럼 — K-02엔 없음.
  const tradeDetailBlock = `
  <tr><th colspan="4" style="background:#e8e8e8">□ 거래 내역${isPreReport ? ' (※ 수출 후 작성 필요)' : ''}</th></tr>
  <tr><td class="label-cell-wide">㉗ 선적일</td><td>${field(data, 'shipDate', isEditMode)}</td><td class="label-cell">㉘ B/L 번호</td><td>${field(data, 'blNumber', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">㉙ 수출신고수리번호</td><td colspan="${isPreReport ? 1 : 3}">${field(data, 'exportDeclNo', isEditMode)}</td>${isPreReport ? `<td class="label-cell">㉚ 별표24 제2호 제다목<br>해당시 추가증빙</td><td>${field(data, 'attachment24Note', isEditMode, false, false, '설치확인서·이행점검보고서 사본 첨부 위치')}</td>` : ''}</tr>`;

  // [신규] 사전보고 기한(D-30) 관리 — 대외무역법 시행령 제53조: 수출 예정일 30일 전까지 사전거래보고 제출 의무.
  // 별지16 원문에는 없는 내부 관리용 보조 UI. K-01(isPreReport)에서만, 화면 편집 모드에서만 노출.
  // [주의] 이 HTML은 renderer.js에서 container.innerHTML로 삽입되므로 여기 <script> 태그는 실행되지 않는다.
  // 실제 계산 로직은 renderer.js가 container.innerHTML 대입 직후 formDef.id==='K-01' 분기에서 직접 바인딩한다.
  const deadlineHelper = (isPreReport && isEditMode) ? `
<div class="deadline-helper">
  <strong>⚠ 사전보고 제출기한 관리 (원문 서식 외 내부 관리용, 대외무역법 시행령 제53조)</strong>
  <div class="dh-row">
    <label>수출 예정일 <input type="date" data-field="plannedExportDate" value="${data && data.plannedExportDate ? data.plannedExportDate : ''}" id="dh-planned-date" /></label>
    <span>→ 사전보고 제출 마감일: <span class="dh-deadline" id="dh-deadline-display">${data && data.preReportDeadline ? data.preReportDeadline : '수출 예정일을 입력하세요'}</span></span>
    <input type="hidden" data-field="preReportDeadline" id="dh-deadline-hidden" value="${data && data.preReportDeadline ? data.preReportDeadline : ''}" />
  </div>
</div>` : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제16호 - 사전거래보고서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제16호 서식]</div>
<div class="byeolji-title">사전거래보고서</div>
${deadlineHelper}
<table class="byeolji-table">
  <tr><th colspan="4" style="background:#e8e8e8">□ 무역거래자 정보</th></tr>
  <tr><td class="label-cell-wide">사업자등록번호</td><td colspan="3">${field(data, 'regNumber', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">${req('① 수출자')}</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'exporter', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">② 실무담당자</td><td colspan="3">${field(data, 'contactPerson', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">③ 구매자</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'buyer', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">④ 제조자</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'manufacturer', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑤ 최종수하인</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'consignee', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑥ 최종사용자</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'endUser', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑦ 거래유형</td><td colspan="3">${ck(data, 'tradeType', 'export', isEditMode)} 수출 &nbsp; ${ck(data, 'tradeType', 'broker', isEditMode)} 중개 &nbsp; ${ck(data, 'tradeType', 'transit', isEditMode)} 경유 또는 환적</td></tr>
  <tr><td class="label-cell-wide">${req('⑧ 최종목적지국가')}</td><td>${field(data, 'destCountry', isEditMode)}</td><td class="label-cell">⑨ 최종사용용도</td><td>${field(data, 'endUse', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">${req('⑩ 판정번호')}</td><td>${field(data, 'classNo', isEditMode)}</td><td class="label-cell">${req('⑪ HS 번호')}</td><td>${field(data, 'hsCode', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">${req('⑫ 통제번호')}</td><td colspan="3">${field(data, 'controlNo', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑬ 품명 및 규격</td><td>${field(data, 'itemSpec', isEditMode)}</td><td class="label-cell">⑭ 단위 및 수량</td><td>${field(data, 'quantity', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑮ 수출액(USD)</td><td colspan="3">${field(data, 'exportAmount', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">□ 최종사용자 정보</th></tr>
  <tr><td class="label-cell-wide">⑯ 회사명</td><td>${field(data, 'euCompany', isEditMode)}</td><td class="label-cell">⑰ 주소지</td><td>${field(data, 'euAddress', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑱ 업종/업태</td><td>${field(data, 'euBusiness', isEditMode)}</td><td class="label-cell">⑲ 자본금</td><td>${field(data, 'euCapital', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑳ 고용인원</td><td>${field(data, 'euEmployees', isEditMode)}</td><td class="label-cell">㉑ 주요고객사</td><td>${field(data, 'euClients', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">㉒ 소유주</td><td>${field(data, 'euOwner', isEditMode)}</td><td class="label-cell">㉓ 지분구조</td><td>${field(data, 'euShares', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">㉔ 홈페이지</td><td>${field(data, 'euWebsite', isEditMode)}</td><td class="label-cell">㉕ 주요생산품</td><td>${field(data, 'euProducts', isEditMode)}</td></tr>
  ${exemptionBlock}
  ${tradeDetailBlock}
</table>
<div class="note-area" style="font-size:9pt; margin-top:15px;">위 신고 내용이 사실임을 확인합니다.</div>
<div class="signature-area" style="margin-top: 30px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신고인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제16호의2: 사후거래보고서 (사전거래보고서와 거의 동일 구조) ───
function tmpl_16_2(data, isEditMode = false) {
  let html = tmpl_16(data, isEditMode, false);
  return html.replace('별지 제16호 서식', '별지 제16호의2 서식')
             .replace('사전거래보고서', '사후거래보고서')
             .replace('별지 제16호 - 사전거래보고서', '별지 제16호의2 - 사후거래보고서');
}

// ─── 별지 제18호: 자율준수체제 운영 보고서 ───
function tmpl_18(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제18호 - 운영 보고서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제18호 서식] Annexed paper No. 18</div>
<div class="byeolji-title">자율준수체제 운영 보고서</div>
<p style="text-align:right;font-size:9pt;margin-bottom:10px">${req('보고연도')}: ${field(data, 'reportYear', isEditMode, false, false, 'YYYY')}년도</p>
<table class="byeolji-table">
  <tr>
    <th rowspan="3" style="width:180px">① 자율준수관리규정<br>운영현황</th>
    <td class="label-cell">제정</td><td>${field(data, 'regEstablished', isEditMode)}</td>
  </tr>
  <tr><td class="label-cell">개정</td><td>${field(data, 'regRevised', isEditMode)}</td></tr>
  <tr><td class="label-cell">주요 개정사항</td><td style="white-space:pre-wrap">${field(data, 'regChanges', isEditMode, true)}</td></tr>
  <tr>
    <th>② 자율준수관리조직<br>운영현황</th>
    <td class="label-cell">자율준수관리기구의 장 / 전담기구인원 / 기술부문 / 영업부문</td>
    <td style="white-space:pre-wrap">${field(data, 'orgStatus', isEditMode, true)}</td>
  </tr>
  <tr>
    <th rowspan="2">③ 수출통제교육현황</th>
    <td class="label-cell">외부교육 참가실적</td><td style="white-space:pre-wrap">${field(data, 'extTraining', isEditMode, true)}</td>
  </tr>
  <tr><td class="label-cell">내부교육 추진실적</td><td style="white-space:pre-wrap">${field(data, 'intTraining', isEditMode, true)}</td></tr>
  <tr>
    <th>④ 내부감사 운영현황</th>
    <td class="label-cell">내부감사 운영실적</td><td style="white-space:pre-wrap">${field(data, 'auditStatus', isEditMode, true)}</td>
  </tr>
</table>
<div class="note-area" style="font-size:9pt; margin-top:15px;">
  「대외무역법」 제22조제3항 및 동법 시행령 제45조의 규정에 의하여 ${field(data, 'reportYear', isEditMode, false, false, 'YYYY')}년도 당사의 자율준수체제 운영현황을 보고합니다.<br>
  산업통상부 장관 귀중
</div>
<div class="signature-area" style="margin-top: 30px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    보고자 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제19호: 실적 보고서 ───
function tmpl_19(data, isEditMode = false) {
  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => field(r, c, isEditMode)).join(' / ')).join('<br>');
  };

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제19호 - 실적 보고서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제19호 서식] Annexed paper No. 19</div>
<div class="byeolji-title">자율준수무역거래자 실적 보고서</div>
<p style="text-align:right;font-size:9pt;margin-bottom:10px">${req('보고대상 기간')}: ${field(data, 'reportPeriod', isEditMode, false, false, '예: 2026년 상반기')}</p>
<table class="byeolji-table">
  <tr><th style="width:180px">① 중개실적</th><td colspan="2">중개 건수/금액: ${field(data, 'brokerage_count_amount', isEditMode)}</td></tr>
  <tr><th rowspan="6">② 중개 상세내역</th>
      <td style="width:150px; background:#f5f5f5;">- 품명(모델) 및 통제번호</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageItem', isEditMode, true, false, '품명(모델) 및 통제번호 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 용도</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageUsage', isEditMode, true, false, '용도 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 수출국가명 및 지역</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageExportCountry', isEditMode, true, false, '수출국가명 및 지역 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 수입국가명 및 지역</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageImportCountry', isEditMode, true, false, '수입국가명 및 지역 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 수입자</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageImporter', isEditMode, true, false, '수입자명 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 최종수하인</td>
      <td style="white-space:pre-wrap">${field(data, 'brokerageEndUser', isEditMode, true, false, '최종수하인명 입력')}</td>
  </tr>
  <tr>
      <th rowspan="2">③ 포괄수출허가 및<br>포괄수출실적*</th>
      <td style="background:#f5f5f5;">- 포괄수출허가건수/실적건수/금액</td>
      <td>${field(data, 'comprehensive_count_amount', isEditMode)}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">- 허가 건별 상세실적 및 금액</td>
      <td style="white-space:pre-wrap">${field(data, 'compDetailsAmount', isEditMode, true, false, '허가 건별 상세실적 및 금액 내용 입력')}</td>
  </tr>
  <tr>
      <th rowspan="2">④ 허가면제<br>실적보고</th>
      <td style="background:#f5f5f5;">④ 1. 전략기술의 무형이전<br>(A등급 이상)</td>
      <td style="white-space:pre-wrap">${field(data, 'techTransfer', isEditMode, true, false, '전략기술의 무형이전 내용 입력')}</td>
  </tr>
  <tr>
      <td style="background:#f5f5f5;">④ 2. 그 외 개별수출허가 면제대상<br>(AAA등급에 한함)</td>
      <td style="white-space:pre-wrap">${field(data, 'exemptTarget', isEditMode, true, false, '개별수출허가 면제대상 내용 입력')}</td>
  </tr>
  <tr>
      <th>⑤ 전략물자 판정</th>
      <td colspan="2" style="white-space:pre-wrap">자가판정:<br>${field(data, 'selfClassData', isEditMode, true, false, '판정번호, 판정기준, 판정결과 입력')}<br><br>전문판정:<br>${field(data, 'expertClassData', isEditMode, true, false, '판정번호, 판정기준, 판정결과 입력')}</td>
  </tr>
</table>
<div class="note-area" style="font-size:9pt; margin-top:15px;">
  「대외무역법」 제22조제3항 및 동법 시행령 제45조의 규정에 의하여 ${field(data, 'reportPeriod', isEditMode, false, false, 'YYYY년 상/하반기')} 자율준수무역거래자 포괄수출 실적 및 허가면제 내역을 보고합니다.<br>
  산업통상자원부장관 귀하
</div>
<div class="signature-area" style="margin-top: 30px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    보고자 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}


// ─── 별지 제24호: 자진신고서 ───
function tmpl_24(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제24호 - 자진신고서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제24호 서식]</div>
<div class="byeolji-title">자 진 신 고 서</div>
<table class="byeolji-table">
  <tr><th rowspan="5" style="width:80px">신<br>고<br>자</th>
    <td class="label-cell">${req('상호')}</td><td>${field(data, 'companyName', isEditMode)}</td>
    <td class="label-cell">성 명</td><td>${field(data, 'reporterFullName', isEditMode)}</td></tr>
  <tr><td class="label-cell">대표자</td><td colspan="3">${field(data, 'ceoName', isEditMode)}</td></tr>
  <tr><td class="label-cell">주소</td><td colspan="3">${field(data, 'address', isEditMode)}</td></tr>
  <tr><td class="label-cell">실무담당자</td><td>${field(data, 'contactPerson', isEditMode)}</td><td class="label-cell">전화번호</td><td>${field(data, 'telephone', isEditMode)}</td></tr>
  <tr><td class="label-cell">사업자등록번호</td><td colspan="3">${field(data, 'regNumber', isEditMode)}</td></tr>
</table>
<table class="byeolji-table" style="margin-top:15px">
  <tr><th colspan="4" style="background:#e8e8e8">신고 내용</th></tr>
  <tr><td class="label-cell-wide">① 신고내용</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'reportSummary', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">② 통관일자</td><td>${field(data, 'customsDate', isEditMode)}</td><td class="label-cell">③ B/L 번호</td><td>${field(data, 'blNumber', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">④ 수출신고수리번호</td><td colspan="3">${field(data, 'exportDeclNo', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑤ 최종사용용도</td><td colspan="3">${field(data, 'endUse', isEditMode)}</td></tr>
  <tr><th colspan="4">⑥ 수출품목</th></tr>
  <tr><td class="label-cell">${req('HS 번호')}</td><td>${field(data, 'hsCode', isEditMode)}</td><td class="label-cell">${req('통제번호')}</td><td>${field(data, 'controlNo', isEditMode)}</td></tr>
  <tr><td class="label-cell">품명 및 규격</td><td>${field(data, 'itemSpec', isEditMode)}</td><td class="label-cell">단위 및 수량</td><td>${field(data, 'quantity', isEditMode)}</td></tr>
  <tr><td class="label-cell">단가</td><td>${field(data, 'unitPrice', isEditMode)}</td><td class="label-cell">가액</td><td>${field(data, 'totalPrice', isEditMode)}</td></tr>
  <tr><th colspan="4">⑦ 거래 상대방 정보</th></tr>
  <tr><td class="label-cell">구매자</td><td colspan="3">상호: ${field(data, 'buyerName', isEditMode)} / 대표자: ${field(data, 'buyerCeo', isEditMode)} / 전화: ${field(data, 'buyerPhone', isEditMode)} / 주소: ${field(data, 'buyerAddress', isEditMode)}</td></tr>
  <tr><td class="label-cell">최종수하인</td><td colspan="3">상호: ${field(data, 'consigneeName', isEditMode)} / 대표자: ${field(data, 'consigneeCeo', isEditMode)} / 전화: ${field(data, 'consigneePhone', isEditMode)} / 주소: ${field(data, 'consigneeAddress', isEditMode)}</td></tr>
  <tr><td class="label-cell">최종사용자</td><td colspan="3">상호: ${field(data, 'endUserName', isEditMode)} / 대표자: ${field(data, 'endUserCeo', isEditMode)} / 전화: ${field(data, 'endUserPhone', isEditMode)} / 주소: ${field(data, 'endUserAddress', isEditMode)}</td></tr>
  <tr><th colspan="4">⑧ 위반 경위</th></tr>
  <tr><td colspan="4" style="min-height:100px;white-space:pre-wrap">${field(data, 'violationDetails', isEditMode, true)}</td></tr>
  <tr><th colspan="4">첨부 자료</th></tr>
  <tr><td colspan="4">
    ${ck(data, 'attach1', 'yes', isEditMode)} 고시 제98조 제3항 1호 관련 (자료설명: ${field(data, 'attach1Desc', isEditMode)})<br>
    ${ck(data, 'attach2', 'yes', isEditMode)} 고시 제98조 제3항 2호 관련 (자료설명: ${field(data, 'attach2Desc', isEditMode)})<br>
    ${ck(data, 'attach3', 'yes', isEditMode)} 고시 제98조 제3항 3호 관련 (자료설명: ${field(data, 'attach3Desc', isEditMode)})
  </td></tr>
</table>
</body></html>`;
}

// ─── 별지 제25호: 재발 방지 계획서 ───
function tmpl_25(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제25호 - 재발 방지 계획서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제25호 서식]</div>
<div class="byeolji-title">재발 방지 계획서</div>
<table class="byeolji-table">
  <tr><td class="label-cell-wide">${req('신고자 (상호, 성명)')}</td><td>${field(data, 'companyName', isEditMode)} ${field(data, 'reporterName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">신고일자</td><td>${field(data, 'reportDate', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">신고내용</td><td style="min-height:60px;white-space:pre-wrap">${field(data, 'reportSummary', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">재발 방지 계획</td><td style="min-height:200px;white-space:pre-wrap">${field(data, 'preventionPlan', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">지원 사업 활용 희망 여부</td><td>${ck(data, 'supportTraining', 'yes', isEditMode)} 전략물자 정규 교육 &nbsp;&nbsp; ${ck(data, 'supportConsulting', 'yes', isEditMode)} 자율준수 컨설팅 &nbsp;&nbsp; ${ck(data, 'supportSecurityConsulting', 'yes', isEditMode)} 무역안보 컨설팅 &nbsp;&nbsp; ${ck(data, 'supportOther', 'yes', isEditMode)} 기타<br><span style="font-size:9pt;color:#666">※ 문의처: 무역안보관리원(02-6000-6400)</span></td></tr>
  <tr><th colspan="1" style="background:#e8e8e8">실무 담당자</th><td>
    성명: ${field(data, 'staffName', isEditMode)} / 직위: ${field(data, 'staffPosition', isEditMode)} / 부서: ${field(data, 'staffDept', isEditMode)}<br>
    전화번호: ${field(data, 'staffPhone', isEditMode)} / 휴대폰: ${field(data, 'staffMobile', isEditMode)} / 이메일: ${field(data, 'staffEmail', isEditMode)}
  </td></tr>
</table><div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제1호: 개별수출허가신청서 ───
function tmpl_01(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제1호 - 전략물자(기술)등 수출허가(신청)(거부)서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제1호 서식] Annexed paper No. 1 · 처리기간: 15일</div>
<div class="byeolji-title">전략물자(기술)등 수출허가(신청)(거부)서<br><span style="font-size:11pt">Export License (Application)(Denial)</span></div>
<table class="byeolji-table">
  <tr>
    <td class="label-cell">${req('사업자등록번호')}<span class="eng">Business Reg. No.</span></td>
    <td class="value">${field(data, 'exporterRegNum', isEditMode)}</td>
    <td class="label-cell">무역업고유번호<span class="eng">Trade Business Code</span></td>
    <td class="value">${field(data, 'exporterTradeBizNo', isEditMode)}</td>
  </tr>
  <tr>
    <th rowspan="3" style="width:100px">① 수출자<br><span class="eng">Exporter</span></th>
    <td class="label-cell">${req('상 호')}<span class="eng">Name of Company</span></td>
    <td colspan="3" class="value">${field(data, 'exporterCompany', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">${req('대표자')}<span class="eng">Representative</span></td>
    <td class="value">${field(data, 'exporterCeo', isEditMode)}</td>
    <td class="label-cell">전화번호<span class="eng">Telephone</span></td>
    <td class="value">${field(data, 'exporterPhone', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소<span class="eng">Address</span></td>
    <td colspan="3" class="value">${field(data, 'exporterAddress', isEditMode)}</td>
  </tr>
  <tr>
    <th>② 실무담당자<br><span class="eng">Contact Person</span></th>
    <td colspan="4" class="value">성명: ${field(data, 'contactName', isEditMode)} / 전화번호: ${field(data, 'contactPhone', isEditMode)} / 전자우편: ${field(data, 'contactEmail', isEditMode)}</td>
  </tr>
  <tr>
    <td colspan="4" class="label-cell">※ 본 신청서는 시스템(YesTrade)에 입력한 데이터와 일치해야 합니다.</td>
  </tr>
  <tr>
    <th rowspan="4">③ 구매자<br><span class="eng">Purchaser</span></th>
    <td class="label-cell">${req('상호')}<span class="eng">Name of Company</span></td>
    <td colspan="3" class="value">${field(data, 'buyerName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">대표자</td>
    <td colspan="3" class="value">${field(data, 'buyerCeo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소<span class="eng">Address</span></td>
    <td colspan="3" class="value">${field(data, 'buyerAddress', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전화번호</td>
    <td colspan="3" class="value">${field(data, 'buyerPhone', isEditMode)}</td>
  </tr>
  <tr>
    <th rowspan="4">④ 제조자<br><span class="eng">Manufacturer</span></th>
    <td class="label-cell">상호</td>
    <td colspan="3" class="value">${field(data, 'manufacturerName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">대표자</td>
    <td colspan="3" class="value">${field(data, 'manufacturerCeo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소</td>
    <td colspan="3" class="value">${field(data, 'manufacturerAddress', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전화번호</td>
    <td colspan="3" class="value">${field(data, 'manufacturerPhone', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑤ 위탁자<br><span class="eng">Consignor</span><br><span style="font-size:8pt;font-weight:400">(경유·환적허가 신청시)</span></th>
    <td colspan="4" class="value">${field(data, 'consignorInfo', isEditMode, false, false, '상호, 주소 (경유 또는 환적허가 신청시에만 기재)')}</td>
  </tr>
  <tr>
    <th rowspan="4">⑥ 최종수하인<br><span class="eng">Ultimate Consignee</span></th>
    <td class="label-cell">${req('상호')}</td>
    <td colspan="3" class="value">${field(data, 'consigneeName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">대표자</td>
    <td colspan="3" class="value">${field(data, 'consigneeCeo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소</td>
    <td colspan="3" class="value">${field(data, 'consigneeAddress', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전화번호</td>
    <td colspan="3" class="value">${field(data, 'consigneePhone', isEditMode)}</td>
  </tr>
  <tr>
    <th rowspan="3">⑦ 최종사용자<br><span class="eng">End-User</span></th>
    <td class="label-cell">${req('상호')}</td>
    <td colspan="3" class="value">${field(data, 'endUserName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">대표자</td>
    <td colspan="3" class="value">${field(data, 'endUserCeo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소 / 전화</td>
    <td colspan="3" class="value">${field(data, 'endUserAddress', isEditMode)} / ${field(data, 'endUserPhone', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑧ 허가신청 사유<br><span class="eng">Type of Application</span></th>
    <td colspan="4">
      ${ck(data, 'applicationReason', 'export', isEditMode)} 개별수출허가 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'tech_export', isEditMode)} 개별수출허가(기술) 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'nuclear_plant', isEditMode)} 원자력플랜트기술수출 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'warship_design', isEditMode)} 군함설계기술수출 신청<br>
      ${ck(data, 'applicationReason', 'catchall', isEditMode)} 상황허가 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'brokering', isEditMode)} 중개허가 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'transit', isEditMode)} 경유허가 신청 &nbsp;&nbsp;
      ${ck(data, 'applicationReason', 'transshipment', isEditMode)} 환적허가 신청
    </td>
  </tr>
  <tr>
    <th>${req('⑫ 수출품 내역')}<br><span class="eng">Item Details</span></th>
    <td colspan="4">
      판정번호: ${field(data, 'classNo', isEditMode)} / HS번호: ${field(data, 'hsCode', isEditMode)} / 통제번호: ${field(data, 'controlNo', isEditMode)}<br>
      품명 및 규격: ${field(data, 'itemName', isEditMode)} / 단위 및 수량: ${field(data, 'quantity', isEditMode)} / 가액: ${field(data, 'price', isEditMode)}
    </td>
  </tr>
  <tr>
    <th>${req('⑨ 최종목적지국가')}<br><span class="eng">Destination</span></th>
    <td class="value">${field(data, 'destCountry', isEditMode)}</td>
    <th class="label-cell">⑩ 원선적지<br><span style="font-size:8pt;font-weight:400">(경유·환적시)</span></th>
    <td class="value">${field(data, 'originShipment', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑪ (상황허가 신청시)<br>기관통보 사유</th>
    <td colspan="4" style="white-space:pre-wrap">${field(data, 'catchallReason', isEditMode, true, false, '이상징후, 허가신청 사유 등 기재')}</td>
  </tr>
  <tr>
    <th>⑱ 최종사용용도<br><span class="eng">End-Use</span></th>
    <td colspan="4" style="white-space:pre-wrap">${field(data, 'endUseText', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑲ 허가조건<br><span class="eng">Conditions</span></th>
    <td colspan="4" style="white-space:pre-wrap">${field(data, 'licenseConditions', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑳ 허가(거부)번호</th>
    <td class="value">${field(data, 'licenseNo', isEditMode)}</td>
    <th class="label-cell">㉑ 유효기간</th>
    <td class="value">${field(data, 'licenseValidity', isEditMode)}</td>
  </tr>
  <tr>
    <th>㉒ 기타<br><span class="eng">Additional Info</span></th>
    <td colspan="4" style="white-space:pre-wrap">${field(data, 'additionalInfo', isEditMode, true, false, '전략기술 수출의 경우 수취방법·수취기간·계약기간(있는 경우)을 기재')}</td>
  </tr>
</table>
<div class="note-area" style="font-size:9pt; margin-top:15px;">
  위 신청내용에 거짓이 없음을 확인하며, 「대외무역법」 제19조의2/제19조의3/제19조의4/제19조의5에 따라 허가를 신청합니다.
</div>
<div class="signature-area" style="margin-top: 30px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제6호: 포괄수출허가신청서 ───
function tmpl_06(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제6호 - 포괄수출허가신청서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제6호 서식] Annexed paper No. 6</div>
<div class="byeolji-title">전략물자 포괄수출허가신청서<br><span style="font-size:11pt">Application for Comprehensive Export License of Strategic Items</span></div>
<table class="byeolji-table">
  <tr>
    <th rowspan="4" style="width:100px">① 수출자<br><span class="eng">Exporter</span></th>
    <td class="label-cell">${req('상 호')}<span class="eng">Name of Company</span></td>
    <td class="value">${field(data, 'exporterCompany', isEditMode)}</td>
    <td class="label-cell">${req('대표자')}<span class="eng">Representative</span></td>
    <td class="value">${field(data, 'exporterCeo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주 소<span class="eng">Address</span></td>
    <td colspan="3" class="value">${field(data, 'exporterAddress', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">전화번호</td>
    <td class="value">${field(data, 'exporterPhone', isEditMode)}</td>
    <td class="label-cell">${req('사업자등록번호')}</td>
    <td class="value">${field(data, 'exporterRegNum', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">무역업고유번호</td>
    <td colspan="3" class="value">${field(data, 'exporterTradeBizNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">CP 지정등급<span class="eng">CP Grade</span></td>
    <td colspan="3" class="value" style="font-weight:bold;color:#2563eb">${field(data, 'cpGrade', isEditMode)} 등급</td>
  </tr>
  <tr>
    <th>② 신청 유형<br><span class="eng">Type</span></th>
    <td colspan="4" class="value">${field(data, 'permitType', isEditMode)} — ${field(data, 'itemDescription', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>${req('③~⑥ 품목 명세')}<br><span class="eng">Item Category</span></th>
    <td colspan="4" class="value">HS번호(③): ${field(data, 'hsCode', isEditMode)} / 통제번호(④): ${field(data, 'controlNo', isEditMode)}<br>품명 및 규격(⑤): ${field(data, 'itemSpec', isEditMode)} / 비고(⑥): ${field(data, 'note', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑦ 구매자 또는 최종수하인</th>
    <td colspan="4" class="value" style="white-space:pre-wrap">${field(data, 'buyerOrConsignee', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑧ 최종사용자<br><span class="eng">End Users</span></th>
    <td colspan="4" class="value" style="min-height:80px;white-space:pre-wrap">${field(data, 'endUsers', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>⑨ 최종용도 또는 사업명</th>
    <td colspan="4" class="value" style="white-space:pre-wrap">${field(data, 'endUseOrProject', isEditMode, true)}</td>
  </tr>
  <tr>
    <th>${req('⑩⑪ 목적지국가')}</th>
    <td colspan="4" class="value">목적지국가(⑩): ${field(data, 'destCountry', isEditMode)} / 최종목적지국가(⑪): ${field(data, 'finalDestCountry', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑫ 유효기간<br><span class="eng">Duration</span></th>
    <td colspan="4" class="value">${field(data, 'duration', isEditMode)}</td>
  </tr>
  <tr>
    <th>⑬ 허가번호</th>
    <td colspan="4" class="value">${field(data, 'q_permit_number', isEditMode)}</td>
  </tr>
</table>
</body></html>`;
}

// ─── 부속서류 (L-03 ~ L-09) ───
function tmpl_01_03(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제2호 - 최종수하인 및 구매자 진술서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제2호 서식] Annexed paper No. 2</div>
<div class="byeolji-title">최종수하인 및 구매자 진술서<br><span style="font-size:11pt">Statement by Ultimate Consignee and Purchaser</span></div>
<table class="byeolji-table">
  <tr><td class="label-cell-wide">${req('① 최종수하인 (Ultimate Consignee)')}</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'consigneeCompany', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">${req('② 수출자 (Exporter)')}</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'exporterName', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">③ 수출품 내역 (Description)</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'itemDetails', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">③ 수량 (Quantity)</td><td colspan="3">${field(data, 'quantity', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">④ 최종수하인의 물품 처분 또는 용도</th></tr>
  <tr><td colspan="4">
    ${ck(data, 'dispositionType', 'a', isEditMode)} a. ①에 기재된 국가 내에서 수입된 형태 그대로 제조공정의 자본재로 사용하며, 재수출하거나 완제품에 포함시키지 않음<br>
    ${ck(data, 'dispositionType', 'b', isEditMode)} b. 다음 제품에 가공·포함하여 사용함: ${field(data, 'dispositionB_product', isEditMode, false, false, '제품명')} (①에 기재된 국가에서 제조, ${field(data, 'dispositionB_dest', isEditMode, false, false, '유통 국가')}로 유통)<br>
    ${ck(data, 'dispositionType', 'c', isEditMode)} c. 다음 물품의 정비·수리에 사용함: ${field(data, 'dispositionC_item', isEditMode, false, false, '물품명(컴퓨터, 항공기 등)')} (목적지: ${field(data, 'dispositionC_dest', isEditMode, false, false, '목적지')})<br>
    ${ck(data, 'dispositionType', 'd', isEditMode)} d. ①에 기재된 국가 내에서 수입된 형태 그대로 재판매함 (최종용도: ${field(data, 'dispositionD_use', isEditMode, false, false, '아는 경우 기재')})<br>
    ${ck(data, 'dispositionType', 'e', isEditMode)} e. 다음 국가로 수입된 형태 그대로 재수출함: ${field(data, 'dispositionE_country', isEditMode, false, false, '국가명')}<br>
    ${ck(data, 'dispositionType', 'f', isEditMode)} f. 기타 (상세 기재)
  </td></tr>
  <tr><td class="label-cell-wide">상세 내용</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'dispositionDetail', isEditMode, true)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">⑤ 최종수하인의 사업 성격</th></tr>
  <tr><td class="label-cell-wide">A. 사업의 성격</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'businessNatureA', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">B. 수출자와의 거래관계</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'businessNatureB', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">거래관계 지속기간</td><td colspan="3">${field(data, 'businessRelationYears', isEditMode, false, false, '예: 3년')}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">⑦ 최종수하인 서명 / ⑧ 구매자 서명</th></tr>
  <tr><td class="label-cell-wide">⑦ 최종수하인 성명/직위</td><td>${field(data, 'consigneeSignerName', isEditMode)} / ${field(data, 'consigneeSignerTitle', isEditMode)}</td><td class="label-cell">서명일</td><td>${field(data, 'consigneeSignDate', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑧ 구매자 회사명·주소</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'buyerName', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">⑧ 구매자 성명/직위</td><td>${field(data, 'buyerSignerName', isEditMode)} / ${field(data, 'buyerSignerTitle', isEditMode)}</td><td class="label-cell">서명일</td><td>${field(data, 'buyerSignDate', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">⑨ 대한민국 수출자 인증</th></tr>
  <tr><td class="label-cell-wide">인증자 성명/직위</td><td>${field(data, 'exporterCertifierName', isEditMode)} / ${field(data, 'exporterCertifierTitle', isEditMode)}</td><td class="label-cell">인증일</td><td>${field(data, 'exporterCertifyDate', isEditMode)}</td></tr>
</table>
</body></html>`;
}

function tmpl_01_04(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제2호의2 - 최종사용자 서약서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">[별지 제2호의2 서식] Annexed paper No. 2-2</div>
<div class="byeolji-title">최종사용자 서약서<br><span style="font-size:11pt">End-User Statement</span></div>
<table class="byeolji-table">
  <tr><td class="label-cell-wide">${req('수출자')}</td><td colspan="3">${field(data, 'exporterName', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">품명 및 규격</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'itemDetails', isEditMode, true)}</td></tr>
  <tr><td class="label-cell-wide">수량 및 가액</td><td colspan="3">${field(data, 'quantity', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">구체적 최종용도</td><td colspan="3" style="white-space:pre-wrap">${field(data, 'endUse', isEditMode, true)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">① 최종사용자 / ② 대표자</th></tr>
  <tr><td class="label-cell-wide">${req('① 회사명')}</td><td colspan="3">${field(data, 'endUserCompany', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">① 주소·국가</td><td colspan="3">${field(data, 'endUserAddress', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">② 대표자 성명/직위</td><td colspan="3">${field(data, 'endUserRep', isEditMode)} / ${field(data, 'endUserRepTitle', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">③ 연락담당자 / ④ 사업의 종류 / ⑤ 보관장소</th></tr>
  <tr><td class="label-cell-wide">③ 성명/직위</td><td>${field(data, 'contactName', isEditMode)} / ${field(data, 'contactTitle', isEditMode)}</td><td class="label-cell">전화/이메일</td><td>${field(data, 'contactPhone', isEditMode)} / ${field(data, 'contactEmail', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">④ 사업의 종류</td><td colspan="3">${field(data, 'businessType', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">⑤ 보관장소</td><td colspan="3">${field(data, 'storagePlace', isEditMode)}</td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">⑥ 최종사용자 서약</th></tr>
  <tr><td colspan="4" style="font-size:9pt; line-height:1.6;">
    당사는 상기 물품의 최종사용자로서 다음 사항을 서약합니다.<br>
    1. 상기 목적으로만 사용하며, 핵·생물·화학무기 등 대량살상무기 또는 그 운반수단의 개발·제조를 위하여 사용하거나 사용되도록 하지 않습니다.<br>
    2. 대한민국 허가당국의 사전 동의 없이 제3국 또는 제3자에게 재판매·재수출하지 않으며, 부득이 재판매·재수출이 필요한 경우 수출자로부터 사전 승인을 받습니다. (NSG 지침 Part 1에 명시된 원자력 전용품목의 경우, 수출자 소속국 정부의 서면 허가가 있으면 이 사전승인은 필요하지 않습니다.)
  </td></tr>
  <tr><th colspan="4" style="background:#e8e8e8">⑦ 서명</th></tr>
  <tr><td class="label-cell-wide">서명자 성명/직위</td><td colspan="3">${field(data, 'signerName', isEditMode)} / ${field(data, 'signerTitle', isEditMode)}</td></tr>
  <tr><td class="label-cell-wide">서명일</td><td colspan="3">${field(data, 'signerDate', isEditMode, false, false, 'YYYY-MM-DD')}</td></tr>
</table>
</body></html>`;
}

function tmpl_01_05(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>사실 확인서 (상황허가용)</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-title" style="margin-top:40px;">사 실 확 인 서</div>
<div style="margin: 40px 0; font-size:11pt; line-height: 1.8;">
  <p><strong>수신:</strong> 산업통상부장관 귀하</p>
  <p><strong>제출일자:</strong> ${field(data, 'submitDate', isEditMode)}</p>
  <p><strong>${req('제출업체')}:</strong> ${field(data, 'companyName', isEditMode)}</p>
  <p><strong>대표자:</strong> ${field(data, 'ceoName', isEditMode)}</p>
  <br>
  <p><strong>[확인 대상 제출 서류]</strong></p>
  <div style="background:#f9f9f9; padding: 10px; border: 1px solid #ccc; white-space:pre-wrap; margin-bottom: 20px;">${field(data, 'targetDocs', isEditMode, true)}</div>
  <p style="white-space:pre-wrap;">${field(data, 'confirmStatement', isEditMode, true)}</p>
</div>
</body></html>`;
}

function tmpl_01_06(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>회사 소개자료</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">제20조 제8호 양식무 - 상황허가 부속서류</div>
<div class="byeolji-title">회사 소개자료<br><span style="font-size:11pt">(${field(data, 'targetCompany', isEditMode)})</span></div>
<table class="byeolji-table">
  <tr><th style="width:150px">${req('대상 기업')}</th><td>${field(data, 'targetCompany', isEditMode)}</td></tr>
  <tr><th>회사 이력<br>(설립, 연혁)</th><td style="white-space:pre-wrap">${field(data, 'history', isEditMode, true)}</td></tr>
  <tr><th>사업 내용</th><td style="white-space:pre-wrap">${field(data, 'businessScope', isEditMode, true)}</td></tr>
  <tr><th>매출/임직원</th><td>${field(data, 'revenue', isEditMode)}</td></tr>
  <tr><th>지분구조/소유주</th><td>${field(data, 'shares', isEditMode)}</td></tr>
  <tr><th>주요 고객사</th><td style="white-space:pre-wrap">${field(data, 'mainClients', isEditMode, true)}</td></tr>
  <tr><th>당사 물품 활용<br>영위 사업</th><td style="white-space:pre-wrap">${field(data, 'usageDesc', isEditMode, true)}</td></tr>
</table><div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

function tmpl_01_07(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>수출물품 상세정보</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">제20조 제8호 양식무 - 상황허가 부속서류</div>
<div class="byeolji-title">수출물품 상세정보</div>
<table class="byeolji-table">
  <tr><th style="width:150px">${req('품명 및 모델')}</th><td>${field(data, 'itemName', isEditMode)}</td></tr>
  <tr><th>사양, 기능, 특성</th><td style="white-space:pre-wrap">${field(data, 'specFeatures', isEditMode, true)}</td></tr>
  <tr><th>사용목적/방법</th><td style="white-space:pre-wrap">${field(data, 'purpose', isEditMode, true)}</td></tr>
  <tr><th>설치장소/재고관리</th><td style="white-space:pre-wrap">${field(data, 'installLocation', isEditMode, true)}</td></tr>
  <tr><th>수량의 적정성</th><td style="white-space:pre-wrap">${field(data, 'quantityReason', isEditMode, true)}</td></tr>
  <tr><th>기수입 실적</th><td style="white-space:pre-wrap">${field(data, 'pastImport', isEditMode, true)}</td></tr>
</table><div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

function tmpl_01_08(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>군용전용 가능성 검토 결과서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">제20조 제8호 양식무 - 상황허가 부속서류</div>
<div class="byeolji-title">군용전용 가능성 검토 결과서</div>
<table class="byeolji-table">
  <tr><th style="width:150px">${req('품명')}</th><td>${field(data, 'itemName', isEditMode)}</td></tr>
  <tr><th>사양/소재 근거<br>(민수용 확인)</th><td style="white-space:pre-wrap">${field(data, 'specAnalysis', isEditMode, true)}</td></tr>
  <tr><th>설계 분석</th><td style="white-space:pre-wrap">${field(data, 'designAnalysis', isEditMode, true)}</td></tr>
  <tr><th>조달 환경 등</th><td style="white-space:pre-wrap">${field(data, 'envAnalysis', isEditMode, true)}</td></tr>
  <tr><th>결론</th><td style="white-space:pre-wrap; font-weight:bold;">${field(data, 'conclusion', isEditMode, true)}</td></tr>
</table>
</body></html>`;
}

function tmpl_01_09(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>수출물품 부분제품 설명서</title>${commonStyle}</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
<div class="byeolji-subtitle">제20조 제8호 양식무 - 상황허가 부속서류</div>
<div class="byeolji-title">수출물품 부분제품 설명서</div>
<table class="byeolji-table">
  <tr><th style="width:180px">수출품이 사용되는<br>공정 및 부분</th><td style="white-space:pre-wrap">${field(data, 'partUsage', isEditMode, true)}</td></tr>
  <tr><th>최종제품 생산라인 설명</th><td style="white-space:pre-wrap">${field(data, 'finalProductLine', isEditMode, true)}</td></tr>
  <tr><th>최종사용자의 최종제품<br>최근 2년간 생산 실적</th><td style="white-space:pre-wrap">${field(data, 'pastProduction', isEditMode, true)}</td></tr>
</table><div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── C-07: 연간 자율준수 내부 감사 계획서 (텍스트 기반) ───
function tmpl_C_07(data, isEditMode = false) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>${field(data, 'auditYear', isEditMode)} 연간 자율준수 내부 감사 계획</title>${commonStyle}
  <style>
    .plan-title { text-align: center; font-size: 24pt; font-weight: 800; margin: 40px 0; color: #0f172a; border-bottom: 4px double #0f172a; padding-bottom: 20px; }
    .plan-section { font-size: 15pt; font-weight: 700; margin: 40px 0 15px; color: #0f172a; border-left: 5px solid #0f172a; padding-left: 10px; }
    .plan-info { display: flex; flex-direction: column; gap: 10px; font-size: 11pt; margin-bottom: 30px; }
    .plan-info-item { display: flex; }
    .plan-info-label { width: 160px; font-weight: 700; color: #334155; }
    .plan-info-value { flex: 1; color: #0f172a; white-space: pre-wrap; line-height: 1.6; }
    .content-box { border: 1px solid #cbd5e1; padding: 20px; margin-bottom: 20px; white-space: pre-wrap; line-height: 1.7; font-size: 11pt; color: #1e293b; }
    .highlight-box { background: #f8fafc; border-top: 2px solid #0f172a; padding: 20px; margin-bottom: 20px; white-space: pre-wrap; line-height: 1.7; font-size: 11pt; color: #1e293b; }
  </style>
  </head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
  
  <div class="plan-title">${field(data, 'auditYear', isEditMode)} 자율준수 내부 감사 계획</div>
  
  <div class="plan-info">
    <div class="plan-info-item"><div class="plan-info-label">감사 실시자</div><div class="plan-info-value">${field(data, 'auditor', isEditMode)}</div></div>
    <div class="plan-info-item"><div class="plan-info-label">계획 수립일자</div><div class="plan-info-value">${field(data, 'planDate', isEditMode)}</div></div>
    <div class="plan-info-item"><div class="plan-info-label">감사 예정 기간</div><div class="plan-info-value">${field(data, 'auditPeriod', isEditMode)}</div></div>
  </div>

  <div class="plan-section">Ⅰ. 감사 대상 및 범위</div>
  <div class="content-box">${field(data, 'auditScope', isEditMode, true)}</div>

  <div class="plan-section">Ⅱ. 중점 감사 점검 항목</div>
  <div class="highlight-box">${field(data, 'auditItems', isEditMode, true)}</div>

  <div class="plan-section">Ⅲ. 감사 수행 방법</div>
  <div class="content-box">${field(data, 'auditMethod', isEditMode, true)}</div>

  <div class="plan-section">Ⅳ. 감사 결과 보고 및 사후관리</div>
  <div class="content-box" style="background:#f1f5f9; border:none;">${field(data, 'reportingPlan', isEditMode, true)}</div>
  
  <div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
  return html;
}
// ─── A-01: 자율수출관리규정 제정 기안문 ───
function tmpl_A_01(data, isEditMode = false) {
  let html = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>A-01 자율수출관리규정 제정 기안문</title>${commonStyle}
<style>
  .draft-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
  .draft-title { font-size: 26pt; font-weight: bold; letter-spacing: 5px; font-family: "Gungsuh", serif; text-align: center; width: 100%; margin-bottom: 30px; color: var(--text-primary); }
  .approval-table { border-collapse: collapse; text-align: center; font-size:10pt;}
  .approval-table th, .approval-table td { border: 1px solid #333; padding: 5px; }
  .approval-table th { background: #f0f0f0; width: 80px; font-weight: 500; }
  .approval-table td { height: 60px; vertical-align: middle; }
  .draft-meta { width: 100%; border-collapse: collapse; margin-bottom: 20px; border-top: 2px solid #333; border-bottom: 2px solid #333; font-size: 11pt;}
  .draft-meta th, .draft-meta td { padding: 10px; border-bottom: 1px solid #ccc; text-align: left; }
  .draft-meta th { width: 120px; background: #f9f9f9; font-weight: 600; border-right: 1px solid #ccc; text-align: center;}
  .draft-body { padding: 20px 10px; min-height: 200px; white-space: pre-wrap; font-size: 12pt; line-height: 1.8; }
  .revision-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
  .revision-table th, .revision-table td { border: 1px solid #333; padding: 10px; text-align: left; vertical-align: top; font-size: 10pt; }
  .revision-table th { background: #f0f0f0; text-align: center; font-weight: 600; }
  .top-meta { width:100%; display:flex; justify-content: space-between; align-items:flex-end; margin-bottom:10px; }
</style>
</head><body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}

<div class="top-meta">
  <div>
    <table style="border-collapse:collapse; font-size:10pt; margin-bottom:10px;">
      <tr><td style="width:70px; font-weight:bold;">문서번호</td><td>: ${field(data, 'docNumber', isEditMode)}</td></tr>
      <tr><td style="font-weight:bold;">보존기간</td><td>: ${field(data, 'retentionPeriod', isEditMode)}</td></tr>
      <tr><td style="font-weight:bold;">결재일자</td><td>: ${field(data, 'approveDate', isEditMode)}</td></tr>
      <tr><td style="font-weight:bold;">공개여부</td><td>: ${field(data, 'disclosure', isEditMode)}</td></tr>
    </table>
  </div>
  <table class="approval-table">
    <tr>
      <th rowspan="2" style="width:30px; writing-mode:vertical-rl; text-orientation:upright; letter-spacing:2px; background:#e2e8f0;">결재</th>
      <th>기 안</th>
      <th>검 토</th>
      <th>승 인</th>
    </tr>
    <tr>
      <td>${field(data, 'drafter', isEditMode)}</td>
      <td>${field(data, 'reviewer', isEditMode)}</td>
      <td>${field(data, 'approver', isEditMode)}</td>
    </tr>
  </table>
</div>

<div class="draft-title">기 안 문</div>

<table class="draft-meta">
  <tr>
    <th>${req('기안일자')}</th>
    <td>${field(data, 'draftDate', isEditMode)}</td>
    <th>시행일자</th>
    <td>${field(data, 'effectiveDate', isEditMode)}</td>
  </tr>
  <tr>
    <th>${req('제 목')}</th>
    <td colspan="3" style="font-weight:bold; font-size:13pt;">${field(data, 'subject', isEditMode)}</td>
  </tr>
</table>

<div class="draft-body">${field(data, 'body', isEditMode, true)}</div>
`;

  if (!data.noRevision && data.tables && data.tables.revisionTable && data.tables.revisionTable.length > 0) {
    html += `<h3 style="margin-top:40px; font-size:13pt; margin-bottom:10px;">[붙임] 신·구조문 대비표</h3>
    <table class="revision-table">
      <thead>
        <tr>
          <th style="width:40%">현 행</th>
          <th style="width:40%">개 정 (안)</th>
          <th style="width:20%">비 고</th>
        </tr>
      </thead>
      <tbody>`;
    data.tables.revisionTable.forEach(row => {
      html += `<tr>
        <td style="white-space:pre-wrap;">${row.before || ''}</td>
        <td style="white-space:pre-wrap;">${row.after || ''}</td>
        <td>${row.reason || ''}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }

  html += `<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
  return html;
}

// ============================================
// 통일 기안문 프레임 — CP 핵심 서식(A/B/C/D/E/G/J 계열)을 회사 표준 기안문
// (팝콘사_기안문서식_20260915_정정본) 그대로 재현한 위에서 입력하게 한다.
// 결재란 + 문서정보표는 모든 서식이 동일하게 쓰고, "내용" 칸만 서식별로 채워 넣는다.
// ============================================
const officialFrameStyle = `
<style>
  .off-table { width: 100%; border-collapse: collapse; margin: 0 0 14px; }
  .off-table td { border: 1px solid #333; padding: 0; vertical-align: middle; font-size: 9.5pt; }
  .off-lbl { background: #f3f3f3; font-weight: 700; text-align: center; padding: 8px 6px; color: #1f2937; white-space: nowrap; }
  .off-cell { padding: 8px 10px; }
  .off-approve { text-align: center; padding: 14px 4px 30px; }
  .off-approve.pending { color: #9ca3af; font-size: 8.5pt; background: #fafafa; }
  .off-company { text-align: center; font-size: 8.5pt; color: #6b7280; margin-bottom: 12px; }
  .off-content-item { padding: 10px 0; border-bottom: 1px dashed #e5e7eb; }
  .off-content-item:last-child { border-bottom: none; }
  .off-content-label { font-weight: 700; font-size: 9pt; color: #374151; margin-bottom: 4px; }
</style>
`;

// approverColumns 예: ['담당','기구장'] 또는 ['담당','기구장','대표이사'] — 실제 결재 체계와
// 100% 동일해야 하므로 6_CP시스템_반영_공식문서 docx 생성 때 정한 것과 항상 같은 기준을 쓴다.
function officialFrame(data, { title, approverColumns, docNumber, draftDept, retention, contentHtml, isEditMode }) {
  const drafter = getCurrentUser()?.name || getCurrentUser()?.email || '';
  const draftDate = (data._createdAt ? data._createdAt : new Date().toISOString()).split('T')[0];

  const approveRow = approverColumns.map(col => {
    const isPending = col === '대표이사'; // 대표이사 결재는 항상 "결재 시" 상태로 표시(전결 불가 원칙)
    return `<td class="off-approve${isPending ? ' pending' : ''}">${isPending ? '(결재 시 서명)' : drafter}</td>`;
  }).join('');

  return `
    <div class="off-company">(주)팝콘사</div>
    <table class="off-table">
      <tr>
        <td class="off-lbl" rowspan="2" style="width:${100 / (approverColumns.length + 1)}%">기 안 문</td>
        ${approverColumns.map(c => `<td class="off-lbl" style="width:${100 / (approverColumns.length + 1)}%">${c}</td>`).join('')}
      </tr>
      <tr>${approveRow}</tr>
    </table>
    <table class="off-table">
      <tr>
        <td class="off-lbl" style="width:16%">문서번호</td>
        <td class="off-cell" style="width:34%">${docNumber || '(승인 시 발급)'}</td>
        <td class="off-lbl" style="width:16%">기안일자</td>
        <td class="off-cell" style="width:34%">${draftDate}</td>
      </tr>
      <tr>
        <td class="off-lbl">기안부서</td>
        <td class="off-cell">${draftDept || '자율수출관리기구'}</td>
        <td class="off-lbl">기 안 자</td>
        <td class="off-cell">${drafter}</td>
      </tr>
      <tr>
        <td class="off-lbl">보존기간</td>
        <td class="off-cell" colspan="3">${retention || '5년'}</td>
      </tr>
      <tr>
        <td class="off-lbl">제 목</td>
        <td class="off-cell" colspan="3" style="font-weight:700">${title}</td>
      </tr>
      <tr>
        <td class="off-lbl" style="vertical-align:top; padding-top:10px">내 용</td>
        <td class="off-cell" colspan="3">${contentHtml}</td>
      </tr>
    </table>
    ${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
  `;
}

function officialFrameWrap(bodyHtml, docTitle) {
  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>${docTitle}</title>${commonStyle}${officialFrameStyle}</head><body>
<div class="print-wrapper" style="max-width:100%">${printButton}
${bodyHtml}
</div></body></html>`;
}

function contentItem(label, fieldHtml) {
  return `<div class="off-content-item"><div class="off-content-label">${label}</div>${fieldHtml}</div>`;
}

// ─── B-01: 대표이사 수출관리 이행선언문 ───
function tmpl_official_B01(data, isEditMode = false) {
  const content = `
    ${contentItem('회사명', field(data, 'companyName', isEditMode, false, false, '', '(주)팝콘사'))}
    ${contentItem('대표이사 성명', field(data, 'ceoName', isEditMode))}
    ${contentItem('이행선언문 본문', field(data, 'body', isEditMode, true))}
    ${contentItem('선언 날짜', field(data, 'declarationDate', isEditMode))}
  `;
  const body = officialFrame(data, {
    title: '대표이사 수출관리 이행선언문',
    approverColumns: ['담당', '대표이사'],
    retention: '영구',
    contentHtml: content,
    isEditMode,
  });
  return officialFrameWrap(body, '대표이사 수출관리 이행선언문');
}

// ─── D-03: 정보보안관리 지침 ───
function tmpl_official_D03(data, isEditMode = false) {
  const content = `
    ${contentItem('제1조 (목적)', field(data, 'purpose', isEditMode, true))}
    ${contentItem('제2조 (적용 범위)', field(data, 'scope', isEditMode, true))}
    ${contentItem('제3조 (접근 권한 관리)', field(data, 'access', isEditMode, true))}
    ${contentItem('제4조 (외부 반출 통제)', field(data, 'external', isEditMode, true))}
    ${contentItem('제5조 (보유 시스템 설명)', field(data, 'systems', isEditMode, true))}
  `;
  const body = officialFrame(data, {
    title: '정보보안관리 지침',
    approverColumns: ['담당', '기구장'],
    retention: '영구',
    contentHtml: content,
    isEditMode,
  });
  return officialFrameWrap(body, '정보보안관리 지침');
}

// ─── C-00: 자율수출관리 사내교육 계획서 ───
function tmpl_official_C00(data, isEditMode = false) {
  const content = `
    ${contentItem('계획 연도', field(data, 'planYear', isEditMode, false, false, '', '2026년도'))}
    ${contentItem('계획 수립일자', field(data, 'planDate', isEditMode))}
    ${contentItem('교육 대상 및 인원', field(data, 'targetAudience', isEditMode, true))}
    ${contentItem('교육 체계 및 일정', field(data, 'trainingCycle', isEditMode, true))}
    ${contentItem('이수 관리', field(data, 'resultManagement', isEditMode, true))}
  `;
  const body = officialFrame(data, {
    title: '자율수출관리 사내교육 계획서',
    approverColumns: ['담당', '기구장'],
    retention: '5년',
    contentHtml: content,
    isEditMode,
  });
  return officialFrameWrap(body, '자율수출관리 사내교육 계획서');
}

function tmpl_G_05(data, isEditMode = false) {
  return `
    <div class="hwp-doc">
      <div class="hwp-header">
        <h1>기 안 문</h1>
        <table class="hwp-table" style="width: 100%; margin-top: 20px;">
          <colgroup>
            <col style="width: 15%;">
            <col style="width: 35%;">
            <col style="width: 15%;">
            <col style="width: 35%;">
          </colgroup>
          <tbody>
            <tr>
              <th>문서번호</th>
              <td>${data.documentNo || ''}</td>
              <th>기안일자</th>
              <td>${data.draftDate || ''}</td>
            </tr>
            <tr>
              <th>기안자</th>
              <td>${data.drafter || ''}</td>
              <th>결재자</th>
              <td>대표이사</td>
            </tr>
            <tr>
              <th>제 목</th>
              <td colspan="3" style="font-weight:bold;">${data.subject || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hwp-content" style="margin-top: 30px;">
        <p style="margin-bottom: 20px; line-height:1.6;">
          자율준수무역거래자 등급 유지 및 최고경영자 보고 의무 이행을 위하여, 당사의 전년도 자율준수체제(CP) 운영 및 실적 현황과 당해연도 운영 계획을 아래와 같이 통합 보고하오니 재가하여 주시기 바랍니다.
        </p>
        
        <h3>- 아 래 -</h3>
        
        <div style="margin-top: 20px;">
          <h4>1. 전년도 자율준수체제 운영 및 실적 현황 요약</h4>
          <div style="padding: 15px; border: 1px solid var(--border-color); background: var(--bg-secondary); min-height: 150px; white-space: pre-wrap; color: var(--text-primary);">${data.prevYearReport || '전년도 실적 내용이 없습니다.'}</div>
        </div>

        <div style="margin-top: 20px;">
          <h4>2. 당해연도 자율준수체제 운영 계획 (교육/감사 등)</h4>
          <div style="padding: 15px; border: 1px solid var(--border-color); background: var(--bg-secondary); min-height: 150px; white-space: pre-wrap; color: var(--text-primary);">${data.currentYearPlan || '당해연도 운영 계획이 없습니다.'}</div>
        </div>
      </div>
    </div>
  `;
}


// ─── 별지 제7호: 수입목적확인(신청)서 (M-01) ───
function tmpl_07(data, isEditMode = false) {
  const cClass = isEditMode ? 'interactive-mode' : 'print-wrapper';
  const pbBtn = !isEditMode ? printButton : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제7호 - 수입목적확인(신청)서</title>${commonStyle}</head><body>
<div class="${cClass}">
${pbBtn}
<div style="display: flex; justify-content: space-between; align-items: flex-end;">
  <div class="byeolji-subtitle" style="margin-bottom: 0;">[별지 제7호서식] <개정 2021. 8. 20.></div>
</div>
<div class="byeolji-title">수입목적확인(신청)서<br><span style="font-size:11.5pt">Statement of End-Use for Import</span></div>
<table class="byeolji-table">
  <tr>
    <td class="label-cell">${req('수입자')}<br>(Importer)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'companyName', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">${req('수출자')}<br>(Exporter)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'exporterName', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">③ 업무담당자<br>(Contact Person)</td>
    <td colspan="3">${field(data, 'm01ContactPerson', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">④ 최종사용자<br>(End User)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'm01EndUser', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">${req('⑤ HS Code')}</td>
    <td colspan="3">${field(data, 'm01HsCode', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품명 및 규격<br>(Description of Goods)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'itemSpec', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">수량<br>(Quantity)</td>
    <td>${field(data, 'quantity', isEditMode)}</td>
    <td class="label-cell">금액<br>(Value)</td>
    <td>${field(data, 'amount', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">계약번호<br>(Contract No.)</td>
    <td colspan="3">${field(data, 'm01ContractNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">최종사용목적<br>(End-Use)</td>
    <td colspan="3" style="height:80px;">${field(data, 'endUse', isEditMode)}</td>
  </tr>
  <tr><th colspan="4" style="background:#e8e8e8">발급 결과</th></tr>
  <tr>
    <td class="label-cell">증명서 번호</td>
    <td>${field(data, 'm01CertNo', isEditMode)}</td>
    <td class="label-cell">발급일 / 유효기한(12개월)</td>
    <td>${field(data, 'm01IssueDate', isEditMode)} ~ ${field(data, 'm01ValidUntil', isEditMode)}</td>
  </tr>
</table>
<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제8호: 수입내역 신고서 (M-02) ───
function tmpl_08(data, isEditMode = false) {
  const cClass = isEditMode ? 'interactive-mode' : 'print-wrapper';
  const pbBtn = !isEditMode ? printButton : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제8호 - 수입내역 신고서</title>${commonStyle}</head><body>
<div class="${cClass}">
${pbBtn}
<div class="byeolji-subtitle" style="margin-bottom: 0;">[별지 제8호서식] <개정 2021. 8. 20.></div>
<div class="byeolji-title">수입내역 신고서<br><span style="font-size:11.5pt">Report of Import Details</span></div>
<table class="byeolji-table">
  <tr>
    <td class="label-cell">${req('수입자')}<br>(Importer)</td>
    <td style="white-space:pre-wrap">${field(data, 'companyName', isEditMode, true)}</td>
    <td class="label-cell">전화번호</td>
    <td>${field(data, 'm02ImporterPhone', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">사업자등록번호 / 무역업고유번호</td>
    <td colspan="3">${field(data, 'm02RegNo', isEditMode)} / ${field(data, 'm02TradeBizNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">최종수하인<br>(Ultimate Consignee)</td>
    <td style="white-space:pre-wrap">${field(data, 'm02Consignee', isEditMode, true)}</td>
    <td class="label-cell">전화번호</td>
    <td>${field(data, 'm02ConsigneePhone', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">최종사용자<br>(End User)</td>
    <td style="white-space:pre-wrap">${field(data, 'm02EndUser', isEditMode, true)}</td>
    <td class="label-cell">전화번호</td>
    <td>${field(data, 'm02EndUserPhone', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">실무담당자</td>
    <td colspan="3">${field(data, 'm02ContactPerson', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품명<br>(국문/영문)</td>
    <td colspan="3">${field(data, 'itemNameKr', isEditMode, false, false, '국문')} / ${field(data, 'itemNameEn', isEditMode, false, false, 'English')}</td>
  </tr>
  <tr>
    <td class="label-cell">모델명</td>
    <td colspan="3">${field(data, 'm02ModelName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">주요성능 및 특성</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'm02MainPerformance', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">수입목적 및 용도</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'm02ImportPurpose', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">수입 수량/금액<br>(Quantity/Value)</td>
    <td colspan="3">${field(data, 'quantity', isEditMode)} / ${field(data, 'amount', isEditMode)}</td>
  </tr>
</table>
<p style="font-size:9pt; color:#666; margin-top:8px;">※ 이 서식은 「전략물자수출입고시」 제61조①1호에 따라 별지 제7호(수입목적확인신청서) 신청 시 첨부하는 서류입니다. 통관 이후 제출하는 사후 신고서가 아닙니다.</p>
<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

// ─── 별지 제9호: 통관증명(신청)서 (M-03) ───
function tmpl_09(data, isEditMode = false) {
  const cClass = isEditMode ? 'interactive-mode' : 'print-wrapper';
  const pbBtn = !isEditMode ? printButton : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제9호 - 통관증명(신청)서</title>${commonStyle}</head><body>
<div class="${cClass}">
${pbBtn}
<div class="byeolji-subtitle" style="margin-bottom: 0;">[별지 제9호서식] <개정 2021. 8. 20.></div>
<div class="byeolji-title">통관증명(신청)서<br><span style="font-size:11.5pt">Application for Delivery Verification Certificate</span></div>
<table class="byeolji-table">
  <tr>
    <td class="label-cell">${req('수입자')}<br>(Importer)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'companyName', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">사업자등록번호 / 무역업고유번호</td>
    <td colspan="3">${field(data, 'm03RegNo', isEditMode)} / ${field(data, 'm03TradeBizNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">${req('수출자')}<br>(Exporter)</td>
    <td colspan="3" style="white-space:pre-wrap">${field(data, 'exporterName', isEditMode, true)}</td>
  </tr>
  <tr>
    <td class="label-cell">당해 수입목적확인서 확인서번호</td>
    <td colspan="3">${field(data, 'm03RelatedCertNo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품목분류번호(HS Code) / 품명 및 규격</td>
    <td colspan="3">${field(data, 'm03HsCode', isEditMode)} / ${field(data, 'itemSpec', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수량 / 금액</td>
    <td colspan="3">${field(data, 'quantity', isEditMode)} / ${field(data, 'amount', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">도착항 / 도착일</td>
    <td>${field(data, 'm03ArrivalPort', isEditMode)}</td>
    <td class="label-cell">도착일</td>
    <td>${field(data, 'm03ArrivalDate', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">운송인 (B/L 또는 AWB 번호 등)</td>
    <td colspan="3">${field(data, 'm03CarrierInfo', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수입신고번호<br>(Import Declaration No.)</td>
    <td>${field(data, 'importDeclarationNo', isEditMode)}</td>
    <td class="label-cell">수입신고수리일<br>(Date of Import Permit)</td>
    <td>${field(data, 'importPermitDate', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">증명번호 (세관 발급)</td>
    <td colspan="3">${field(data, 'm03CertNo', isEditMode)}</td>
  </tr>
</table>
<div class="signature-area" style="margin-top: 40px; text-align: center;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

function tmpl_L_10(data, isEditMode = false) {
  // [수정] 이 템플릿이 원문(별지 제3호)과 다른 문구를 쓰고 있었고, 최종수하인/최종사용자 홈페이지/
  // 사용목적/최종사용자 확인방법 항목이 통째로 빠져 있었음. 원문 그대로 복원.
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
${commonStyle}
</head><body><div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="byeolji-subtitle">별지 제3호 서식</div>
<div class="doc-header">
  <h2>수출자 서약서</h2>
  <p style="color:#c00;font-weight:bold;text-align:center;">※ 이 서식(구 별지 제3호)은 산업통상부고시 제2026-101호(2026. 9. 1. 시행)로 폐지되었습니다. 이전 작성분 조회용입니다.</p>
</div>

<table class="byeolji-table" style="margin-top: 20px;">
  <colgroup>
    <col style="width: 25%">
    <col style="width: 75%">
  </colgroup>
  <tr><td class="label-cell">${req('① 수출자')}</td><td>${field(data, 'exporterCompany', isEditMode)}</td></tr>
  <tr><td class="label-cell">② 수출품/수량</td><td>${field(data, 'itemName', isEditMode, false, false, '품명')} / ${field(data, 'quantity', isEditMode, false, false, '수량')}</td></tr>
  <tr><td class="label-cell">③ 구매자</td><td>${field(data, 'buyerName', isEditMode)}</td></tr>
  <tr><td class="label-cell">④ 최종수하인</td><td>${field(data, 'consigneeName', isEditMode)}</td></tr>
  <tr><td class="label-cell">⑤ 최종사용자</td><td>${field(data, 'endUserName', isEditMode)}</td></tr>
  <tr><td class="label-cell">⑥ 최종사용자 홈페이지</td><td>${field(data, 'endUserWebsite', isEditMode)}</td></tr>
  <tr><td class="label-cell">⑦ 사용목적</td><td>${field(data, 'endUsePurpose', isEditMode, true)}</td></tr>
</table>

<div class="note-area" style="font-size: 11pt; line-height: 1.8; margin-top: 20px;">
  <strong>2. 최종사용자 확인 방법</strong> (근거자료 별첨) : ${field(data, 'verificationMethod', isEditMode)}<br>
  ${field(data, 'verificationDetail', isEditMode, true)}
</div>

<div class="note-area" style="font-size: 11pt; line-height: 1.8; margin-top: 20px;">
  <strong>3. 서약 내용</strong><br>
  당사는 본 건을 수출함에 있어 상기 구매자, 최종수하인 및 최종사용자의 신원 등에 대하여 위와 같이 확인 하였으며, 다음 사항을 성실히 이행할 것을 서약합니다.
  <ol>
    <li>구매자, 최종수하인 및 최종사용자의 신원 또는 사용용도에 의문이 생길 경우 수출허가 후의 경우에도 수출을 중단한 후 당해 허가기관의 장과 협의할 것임.</li>
    <li>최종사용자로부터 재판매나 재수출 또는 국외로 재제공을 위해 사전동의를 요구받은 경우 당해 허가기관의 장과 협의할 것임.</li>
  </ol>
</div>

<div class="signature-area" style="margin-top: 60px; text-align: right;">
  <p style="margin-top:20px; font-weight:600; font-size: 11pt; text-align:center;">
    <span style="display:inline-block; width: 150px;">${field(data, 'signDate', isEditMode, false, false, 'YYYY. MM. DD.')}</span>
  </p>
  <p style="margin-top:20px; font-size: 12pt; font-weight:700; text-align:center;">
    서약자 (수출자) : <span style="display:inline-block; width: 200px;">${field(data, 'exporterRep', isEditMode)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiTextareas(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}

const formTemplateMap = {
  'A-01': tmpl_A_01,
  'B-01': tmpl_official_B01,
  'C-00': tmpl_official_C00,
  'C-07': tmpl_C_07,
  'D-03': tmpl_official_D03,
  'G-05': tmpl_G_05,
  'L-01': tmpl_01,   // 별지 1호
  'L-02': tmpl_06,   // 별지 6호
  'L-03': tmpl_01_03, // 별지 2호
  'L-04': tmpl_01_04, // 별지 2호의2
  'L-05': tmpl_01_05, // 사실확인서
  'L-06': tmpl_01_06, // 회사소개
  'L-07': tmpl_01_07, // 품목상세
  'L-08': tmpl_01_08, // 군용불가
  'L-09': tmpl_01_09, // 부분제품
  'L-10': tmpl_L_10,  // 수출자 서약서
  'F-02': tmpl_04,   // 별지 4호
  'F-01': tmpl_05,   // 별지 5호
  'E-05': tmpl_13,   // 별지 13호
  'E-03': tmpl_15,   // 별지 15호
  'K-01': tmpl_16,   // 별지 16호 (사전거래보고서)
  'K-02': tmpl_16_2, // 별지 16의2호 (사후거래보고서)
  'K-03': tmpl_18,   // 별지 18호 (운영보고서)
  'K-04': tmpl_19,   // 별지 19호 (실적보고서)
  'J-01': tmpl_24,   // 별지 24호
  'J-02': tmpl_25,   // 별지 25호
  'M-01': tmpl_07,
  'M-02': tmpl_08,
  'M-03': tmpl_09,
};

export function hasFormTemplate(formId) {
  return !!formTemplateMap[formId];
}

export function generateFormHtml(formId, data, isEditMode = false) {
  const tmplFn = formTemplateMap[formId];
  if (!tmplFn) return null;
  return tmplFn(data, isEditMode);
}
