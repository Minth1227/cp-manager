import re

filepath = 'src/utils/formTemplates.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update v() with fallback to field()
content = re.sub(
    r'\$\{v\(data,\s*\'([^\']+)\',\s*\'([^\']+)\'\)\}', 
    r'${field(data, \'\1\', isEditMode, false, false, \'\', \'\2\')}', 
    content
)

# 2. Update v() without fallback to field()
content = re.sub(
    r'\$\{v\(data,\s*\'([^\']+)\'\)\}', 
    r'${field(data, \'\1\', isEditMode)}', 
    content
)

# 3. Update body wrapping
# Replace <body> or <body ...> except tmpl_01 which already has body manipulation
def body_replacer(match):
    body_tag = match.group(0)
    # Avoid double replacing or if already handled (tmpl_01 has cClass)
    if 'interactive-mode' in body_tag or 'cClass' in body_tag:
        return body_tag
    return f'<body>\n<div class="${{isEditMode ? \'interactive-mode\' : \'print-wrapper\'}}">'

content = re.sub(r'<body[^>]*>', body_replacer, content)

# 4. Replace </body> with </div></body>
content = content.replace('</body>', '</div></body>')
content = content.replace('</div></div></body>', '</div></body>') # clean up just in case

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
