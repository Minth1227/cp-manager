import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update generateFormHtml to accept isEditMode
content = content.replace("export function generateFormHtml(formId, data) {", "export function generateFormHtml(formId, data, isEditMode = false) {")
content = content.replace("return tmplFn(data);", "return tmplFn(data, isEditMode);")

# 2. Fix K-02 (tmpl_16_2)
content = content.replace("let html = tmpl_16(data);", "let html = tmpl_16(data, isEditMode);")

# 3. Fix K-04 (tmpl_19)
old_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => v(r, c)).join(' / ')).join('<br>');
  };"""
new_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => field(r, c, isEditMode)).join(' / ')).join('<br>');
  };"""
content = content.replace(old_render, new_render)
# Fallback replacement if exact string match fails
content = content.replace("v(r, c)", "field(r, c, isEditMode)")

# 4. Add M-01, M-02, M-03 Templates
new_templates = """
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
    <td class="label-cell">수입자<br>(Importer)</td>
    <td colspan="3">${field(data, 'companyName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수출자<br>(Exporter)</td>
    <td colspan="3">${field(data, 'exporterName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품명 및 규격<br>(Description of Goods)</td>
    <td colspan="3">${field(data, 'itemSpec', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수량<br>(Quantity)</td>
    <td>${field(data, 'quantity', isEditMode)}</td>
    <td class="label-cell">금액<br>(Value)</td>
    <td>${field(data, 'amount', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">최종사용목적<br>(End-Use)</td>
    <td colspan="3" style="height:80px;">${field(data, 'endUse', isEditMode)}</td>
  </tr>
</table>
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
    <td class="label-cell">수입자<br>(Importer)</td>
    <td colspan="3">${field(data, 'companyName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수입목적확인서 번호<br>(End-Use Cert No.)</td>
    <td colspan="3">${field(data, 'eucNumber', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품명 및 규격<br>(Description of Goods)</td>
    <td colspan="3">${field(data, 'itemSpec', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수입 통관일<br>(Import Clearance Date)</td>
    <td>${field(data, 'clearanceDate', isEditMode)}</td>
    <td class="label-cell">수입 수량/금액<br>(Quantity/Value)</td>
    <td>${field(data, 'quantity', isEditMode)} / ${field(data, 'amount', isEditMode)}</td>
  </tr>
</table>
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
    <td class="label-cell">수입자<br>(Importer)</td>
    <td colspan="3">${field(data, 'companyName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">수출자<br>(Exporter)</td>
    <td colspan="3">${field(data, 'exporterName', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">품명 및 규격<br>(Description of Goods)</td>
    <td colspan="3">${field(data, 'itemSpec', isEditMode)}</td>
  </tr>
  <tr>
    <td class="label-cell">통관 세관<br>(Customs Office)</td>
    <td>${field(data, 'customsOffice', isEditMode)}</td>
    <td class="label-cell">수입신고수리번호<br>(Import Decl No.)</td>
    <td>${field(data, 'importDeclNo', isEditMode)}</td>
  </tr>
</table>
</div></body></html>`;
}
"""
if "function tmpl_07(" not in content:
    content = content.replace("const formTemplateMap = {", new_templates + "\nconst formTemplateMap = {")
    content = content.replace("'J-02': tmpl_25,   // 별지 25호", "'J-02': tmpl_25,   // 별지 25호\n  'M-01': tmpl_07,\n  'M-02': tmpl_08,\n  'M-03': tmpl_09,")

# 5. Standardize Signature Area for ALL templates
standard_sig = """<div class="signature-area" style="margin-top: 40px; text-align: center;">
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
</div></body></html>`;"""

# We will use regex to find the end of each function.
# Specifically, we find `</table>` or similar ending tag, up to `</div></body></html>`;`
# Since it's too complex, let's just strip out any existing `<div class="signature-area">...</div>`
# and any standalone `<p>20...년...월...일</p>` blocks,
# and insert our standard_sig right before `</div></body></html>`;`

# Helper to clean up existing signatures
def clean_and_append_sig(func_body):
    # If the function is tmpl_C_00 (교육계획서), it has no signature and doesn't need one.
    # We skip it by checking if it's the specific content.
    
    # Strip existing signature areas
    func_body = re.sub(r'<div class="signature-area".*?</div>', '', func_body, flags=re.DOTALL)
    
    # Strip hardcoded date/signature like in tmpl_04, tmpl_05
    func_body = re.sub(r'<p[^>]*>.*?년.*?월.*?일.*?</p>\s*<p[^>]*>.*?(대표자|기관장|신청인|보고인|신고인|서약인).*?</p>', '', func_body, flags=re.DOTALL)
    
    # In tmpl_04, tmpl_05, the signature is INSIDE the table cell `<td>`!
    # "20&nbsp;... 대표자 (인)"
    func_body = re.sub(r'<p[^>]*>20.*?\.&nbsp.*?\.&nbsp.*?</p>\s*<p[^>]*>.*?\(인\).*?</p>', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'<p[^>]*>20\$\{field.*?\. \.*?\. \.*?</p>\s*<p[^>]*>.*?\(서명 또는 인\).*?</p>', '', func_body, flags=re.DOTALL)

    # Some scripts are attached before the end, strip them to re-add uniformly
    func_body = re.sub(r'\$\{isEditMode \? \'<script>setTimeout.*?;</script>\' : \'\'\}', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'\$\{isEditMode \? \'<script>setTimeout.*?;</script>\' : \'\'\}', '', func_body, flags=re.DOTALL)
    
    # Also strip any stray `<div class="note-area">` if it was broken, but it's fine to keep notes before the signature.

    # Now we want to insert our standard_sig before `</div></body></html>`;`
    func_body = func_body.replace('</div></body></html>`;', standard_sig)
    
    return func_body

funcs = re.findall(r'(function tmpl_[A-Z0-9_]+\(.*?\).*?</div></body></html>`;\n\})', content, flags=re.DOTALL)

for func in funcs:
    name = re.search(r'function (tmpl_[A-Z0-9_]+)', func).group(1)
    
    if name == 'tmpl_C_00':
        continue # skip education plan
        
    new_func = clean_and_append_sig(func)
    
    if new_func != func:
        content = content.replace(func, new_func)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
