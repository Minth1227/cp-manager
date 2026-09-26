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

# Fix tmpl_04
old_tmpl04 = """<p style="margin-bottom: 20px; font-weight: bold;">20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.</p>
      <p>기관장 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(인)<br><span class="eng">Sealed by Head of Classification Agency</span></p>"""
content = content.replace(old_tmpl04, standard_sig)

# Fix tmpl_05
old_tmpl05 = """<p style="margin-bottom: 20px; font-weight: bold;">20${field(data, 'signYear', isEditMode)}. &nbsp;&nbsp;&nbsp;${field(data, 'signMonth', isEditMode)}. &nbsp;&nbsp;&nbsp;${field(data, 'signDay', isEditMode)}.</p>
      <p>대표자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${field(data, 'ceoName', isEditMode)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(서명 또는 인)<br><span class="eng">Representative of the Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Signature)</span></p>"""
content = content.replace(old_tmpl05, standard_sig)

# Fix tmpl_15
if '<div class="signature-area">' not in content.split("function tmpl_15(")[1].split("}")[0]:
    content = content.replace("</table>\n</div></body></html>`;\n}\n\n// ─── 별지 제16호", f"</table>\n<div class=\"signature-area\">{standard_sig}</div>\n</div></body></html>`;\n}}\n\n// ─── 별지 제16호")

# Fix tmpl_25
if '<div class="signature-area">' not in content.split("function tmpl_25(")[1].split("}")[0]:
    content = content.replace("</table>\n</div></body></html>`;\n}\n\n// ─── 별지 제1호", f"</table>\n<div class=\"signature-area\">{standard_sig}</div>\n</div></body></html>`;\n}}\n\n// ─── 별지 제1호")


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
