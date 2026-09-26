import re
filepath = 'src/utils/formTemplates.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix K-02 (tmpl_16_2)
content = content.replace("let html = tmpl_16(data);", "let html = tmpl_16(data, isEditMode);")

# 2. Fix K-04 (tmpl_19)
old_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => v(r, c)).join(' / ')).join('<br>');
  };"""
new_render = """  const renderTableRows = (rows, cols) => {
    if (rows.length === 0) return '해당없음(N/A)';
    return rows.map(r => cols.map(c => field(r, c, isEditMode)).join(' / ')).join('<br>');
  };"""
content = content.replace(old_render, new_render)

# 3. Define new templates (M-01, M-02, M-03)
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

<div class="signature-area">
  <p style="font-size: 11pt;">위 물품은 당사의 목적에만 사용될 것이며, 대한민국의 법령에 반하여 타 용도로 전용되지 않을 것임을 확인합니다.</p>
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

<div class="signature-area">
  <p style="font-size: 11pt;">수입목적확인서를 발급받은 물품이 통관되었음을 신고합니다.</p>
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

<div class="signature-area">
  <p style="font-size: 11pt;">위 물품이 대한민국에 수입 통관되었음을 증명하여 주시기 바랍니다.</p>
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
</div>
${isEditMode ? '<script>setTimeout(() => { window.initByeoljiText বোর্ڈ(document.body); }, 50);</script>' : ''}
</div></body></html>`;
}
"""

if "function tmpl_07(" not in content:
    content = content.replace("const formTemplateMap = {", new_templates + "\nconst formTemplateMap = {")
    content = content.replace("'J-02': tmpl_25,   // 별지 25호", "'J-02': tmpl_25,   // 별지 25호\n  'M-01': tmpl_07,\n  'M-02': tmpl_08,\n  'M-03': tmpl_09,")

# 4. Standardize the signature area across ALL templates
# We will find every block that looks like a date/signature area (using regex for 년 월 일)
# and replace it with the standard block.
# Since the existing blocks are mostly within <div class="signature-area"> or similar,
# we will use a regex to replace everything from the first "년" in the signature area to the end of the div.

# Alternatively, I can just replace specific variations of the date fields.
# Variation 1: <span ...>${field(..., 'signYear'...)}</span>년 ...
# It's easier and safer to run a script that matches the known structures.

standard_sig = """
  <p style="margin-top:20px; font-weight:600; font-size: 11pt;">
    <span style="display:inline-block; width: 60px;">${field(data, 'signYear', isEditMode, false, false, 'YYYY')}</span>년 
    <span style="display:inline-block; width: 30px;">${field(data, 'signMonth', isEditMode, false, false, 'MM')}</span>월 
    <span style="display:inline-block; width: 30px;">${field(data, 'signDay', isEditMode, false, false, 'DD')}</span>일
  </p>
  <p style="margin-top:15px; font-size: 12pt; font-weight:700;">
    신청(신고/보고)인 <span style="display:inline-block; width: 120px;">${field(data, 'exporterCeo', isEditMode, false, true)}</span> (서명 또는 인)
  </p>
"""

# Let's replace the whole <div class="signature-area"> contents.
# But some templates might have other text in the signature area. (e.g. 위와 같이 ... 신청합니다)
# We just want to replace the date and name lines.
# Regex to match the Date line:
# <p[^>]*>.*?년.*?월.*?일.*?</p>
# followed by name line:
# <p[^>]*>.*?(신청인|보고인|신고인|서약인).*?</p>

def replace_signature(match):
    # keep the prefix (like the statement "위와 같이...")
    return standard_sig

# Find the signature divs and replace the date/name part
def process_func(func_str):
    # If the function is tmpl_01, do not alter its inner logic but it already has this format.
    # We will replace any combination of 2 paragraphs at the end of the signature area.
    
    # We'll use a precise regex that looks for the Year/Month/Day paragraph and the following name paragraph
    pattern = r'<p[^>]*>.*?년\s*<span.*?월\s*<span.*?일\s*</p>\s*<p[^>]*>.*?(신청인|신고인|보고인|서약인|제출인).*?</p>'
    # Or broader:
    pattern2 = r'<p[^>]*>.*?년.*?월.*?일.*?</p>\s*<p[^>]*>.*?(신청인|신고인|보고인|서약인|대표자).*?</p>'
    
    # Actually, many are currently like: 
    # <div style="text-align:right">2026년 03월 01일<br>신청인: (주)팝콘사</div>
    
    # A robust approach: just replace the entire <div class="signature-area">...</div> with a new one that keeps the first paragraph (if it exists) and appends the standard_sig.
    
    # Let's just find <div class="signature-area">...</div>
    sig_match = re.search(r'<div class="signature-area">(.*?)</div>', func_str, flags=re.DOTALL)
    if sig_match:
        inner = sig_match.group(1)
        # extract the first paragraph (the statement)
        stmt_match = re.search(r'(<p[^>]*>.*?</p>)', inner, flags=re.DOTALL)
        stmt = stmt_match.group(1) if stmt_match else ''
        if '년' in stmt and '월' in stmt and '일' in stmt:
            stmt = '' # The first paragraph IS the date!
        
        new_inner = stmt + standard_sig
        return func_str.replace(sig_match.group(0), f'<div class="signature-area">{new_inner}</div>')
    else:
        # What if it uses <div style="text-align:right; margin-top:30px"> ?
        return func_str

# We'll do this in python manually
