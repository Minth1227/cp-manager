import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("v(r, c)", "field(r, c, isEditMode)")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
