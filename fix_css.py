import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_css = """  /* ── 화면 표시용 ── */
  @media screen {
    body { padding: 20mm; max-width: 210mm; margin: 0 auto; }
  }"""

new_css = """  /* ── 화면 표시용 ── */
  @media screen {
    body { margin: 0; padding: 0; }
    .print-wrapper { max-width: 210mm; margin: 0 auto; padding: 20mm; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .interactive-mode { width: 100%; max-width: 100%; padding: 10px 20px; margin: 0; }
  }"""

content = content.replace(old_css, new_css)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
