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

def replace_end(content, func_name):
    # Find the function and append the signature if missing
    try:
        parts = content.split(f"function {func_name}(")
        if len(parts) < 2: return content
        body_parts = parts[1].split("</div></body></html>`;\n}")
        if len(body_parts) < 2: return content
        
        func_body = body_parts[0]
        
        # If it already has a signature-area, replace it
        if '<div class="signature-area"' in func_body:
            sig_match = re.search(r'<div class="signature-area".*?>(.*?)</div>', func_body, flags=re.DOTALL)
            if sig_match:
                func_body = func_body.replace(sig_match.group(0), f'<div class="signature-area" style="margin-top: 40px; text-align: center;">{standard_sig}</div>')
        else:
            func_body += f'\n<div class="signature-area" style="margin-top: 40px; text-align: center;">{standard_sig}</div>'
            
        return parts[0] + f"function {func_name}(" + func_body + "</div></body></html>`;\n}" + body_parts[1]
    except Exception as e:
        print(e)
        return content

for name in ['tmpl_01_05', 'tmpl_01_06', 'tmpl_01_07', 'tmpl_01_09', 'tmpl_C_00', 'tmpl_C_07', 'tmpl_G_05']:
    if f"function {name}(" in content:
        content = replace_end(content, name)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
