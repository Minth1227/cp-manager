import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add `field` function at the top (if missing)
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
    # Insert after function ck(val, target)
    content = content.replace("function ck(val, target) {\n  return val === target ? '☑' : '☐';\n}", "function ck(val, target) {\n  return val === target ? '☑' : '☐';\n}\n" + field_func)

# 2. Add isEditMode to all function signatures
funcs = re.findall(r'function tmpl_[A-Z0-9_]+\(data\)', content)
for func in funcs:
    content = content.replace(func, func.replace("(data)", "(data, isEditMode = false)"))

content = content.replace("export function generateFormHtml(formId, data) {", "export function generateFormHtml(formId, data, isEditMode = false) {")
content = content.replace("return tmplFn(data);", "return tmplFn(data, isEditMode);")

# 3. Replace all ${v(data,'key')} with ${field(data, 'key', isEditMode)}
content = re.sub(r"\$\{v\(data,\s*'([^']+)'\)\}", r"${field(data, '\1', isEditMode)}", content)
content = re.sub(r'\$\{v\(data,\s*"([^"]+)"\)\}', r'${field(data, "\1", isEditMode)}', content)

# 4. Wrap body with interactive-mode
# Wait, some templates already have it?
# In the original file, they have: <body>${printButton}\n<div class="byeolji-subtitle">...
# So we replace <body>${printButton} with <body>\n<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">\n<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}
wrapper_start = """<body>
<div class="${isEditMode ? 'interactive-mode' : 'print-wrapper'}">
<div class="${isEditMode ? 'interactive-mode' : ''}" style="${isEditMode ? 'margin:0; max-width:100%;' : ''}">${printButton}"""

content = content.replace("<body>${printButton}", wrapper_start)

# And replace </body></html>`; with </div></body></html>`;
# But we need to be careful not to double it.
content = re.sub(r'(?<!</div>)</body></html>`;', '</div>\n</body></html>`;', content)
content = re.sub(r'</body></html>`;', '</div></body></html>`;', content) # Ensure properly closed. Wait, the above regex is better:
content = content.replace("</div>\n</body></html>`;", "</div></body></html>`;")
content = content.replace("</body></html>`;", "</div></body></html>`;")
content = content.replace("</div></div></body></html>`;", "</div></body></html>`;")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
