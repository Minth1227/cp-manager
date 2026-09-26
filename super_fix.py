import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore interactive logic from `restore_interactive.py`
field_func = """
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
  return val ? val.replace(/\\n/g, '<br>') : '&nbsp;';
}
"""
if "export function field(" not in content:
    content = content.replace("function ck(val, target) {\n  return val === target ? '☑' : '☐';\n}", "function ck(val, target) {\n  return val === target ? '☑' : '☐';\n}\n" + field_func)

funcs = re.findall(r'function tmpl_[A-Z0-9_]+\(data\)', content)
for func in funcs:
    content = content.replace(func, func.replace("(data)", "(data, isEditMode = false)"))

content = content.replace("export function generateFormHtml(formId, data) {", "export function generateFormHtml(formId, data, isEditMode = false) {")
content = content.replace("return tmplFn(data);", "return tmplFn(data, isEditMode);")

content = re.sub(r"\$\{v\(data,\s*'([^']+)'\)\}", r"${field(data, '\1', isEditMode)}", content)
content = re.sub(r'\$\{v\(data,\s*"([^"]+)"\)\}', r'${field(data, "\1", isEditMode)}', content)

wrapper_start = """<body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}"""

content = content.replace("<body>${printButton}", wrapper_start)
content = re.sub(r'(?<!</div>)\n</body></html>`;', '</div>\n</body></html>`;', content)
content = content.replace("</div>\n</body></html>`;", "</div></body></html>`;")
content = content.replace("</body></html>`;", "</div></body></html>`;")
content = content.replace("</div></div></body></html>`;", "</div></body></html>`;")

# 2. Fix K-02 and K-04
content = content.replace("let html = tmpl_16(data);", "let html = tmpl_16(data, isEditMode);")
old_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => v(r, c)).join(' / ')).join('<br>');
  };"""
new_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => field(r, c, isEditMode)).join(' / ')).join('<br>');
  };"""
content = content.replace(old_render, new_render)
content = content.replace("v(r, c)", "field(r, c, isEditMode)")

# 3. Add M-01, M-02, M-03
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

# 4. Standardize Signatures
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

# Clean function
def clean_func_body(func_body):
    func_body = re.sub(r'<div class="signature-area".*?</div>', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'<p[^>]*>.*?년.*?월.*?일.*?</p>\s*<p[^>]*>.*?(대표자|기관장|신청인|보고인|신고인|서약인).*?</p>', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'<p[^>]*>20.*?\.&nbsp.*?\.&nbsp.*?</p>\s*<p[^>]*>.*?\(인\).*?</p>', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'<p[^>]*>20\$\{field.*?\. \.*?\. \.*?</p>\s*<p[^>]*>.*?\(서명 또는 인\).*?</p>', '', func_body, flags=re.DOTALL)
    func_body = re.sub(r'\$\{isEditMode \? \'<script>setTimeout.*?;</script>\' : \'\'\}', '', func_body, flags=re.DOTALL)
    return func_body.replace('</div></body></html>`;', standard_sig)

funcs = re.findall(r'(function tmpl_[A-Z0-9_]+\(data, isEditMode = false\).*?</div></body></html>`;\n\})', content, flags=re.DOTALL)
for func in funcs:
    name = re.search(r'function (tmpl_[A-Z0-9_]+)', func).group(1)
    if name == 'tmpl_C_00': continue
    
    new_func = clean_func_body(func)
    if new_func != func:
        content = content.replace(func, new_func)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
