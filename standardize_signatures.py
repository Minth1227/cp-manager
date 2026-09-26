import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

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

# Extract all template functions
funcs = re.findall(r'(function tmpl_[A-Z0-9_]+\(.*?\).*?</div></body></html>`;?\n\})', content, flags=re.DOTALL)

for func in funcs:
    new_func = func
    sig_match = re.search(r'<div class="signature-area">(.*?)</div>', func, flags=re.DOTALL)
    
    if sig_match:
        inner = sig_match.group(1)
        # extract the first paragraph (the legal statement)
        stmt_match = re.search(r'(<p[^>]*>.*?</p>)', inner, flags=re.DOTALL)
        stmt = stmt_match.group(1) if stmt_match else ''
        
        # If the first paragraph is already the date, drop it
        if '년' in stmt and '월' in stmt and '일' in stmt:
            stmt = ''
            
        new_inner = stmt + standard_sig
        new_func = func.replace(sig_match.group(0), f'<div class="signature-area">{new_inner}</div>')
    else:
        # Some templates don't have <div class="signature-area"> but have a date block at the end.
        pass
    
    # Also standardize 'interactive-mode' wrapper if it was not handled well
    
    if new_func != func:
        content = content.replace(func, new_func)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
