import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

funcs = re.findall(r'function tmpl_[A-Z0-9_]+\(data, isEditMode = false\) \{.*?\}</div></body></html>`;\n\}', content, flags=re.DOTALL)

for func in funcs:
    name = re.search(r'function (tmpl_[A-Z0-9_]+)', func).group(1)
    sig = re.search(r'<div class="signature-area">.*?</div>\s*</div></body></html>', func, flags=re.DOTALL)
    if sig:
        print(f"[{name}] HAS SIGNATURE AREA")
    else:
        print(f"[{name}] DOES NOT HAVE <div class=\"signature-area\">")
