import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove backslashes before single quotes inside field() calls
content = re.sub(r"\\\', isEditMode", "', isEditMode", content)
content = re.sub(r"field\(data, \\\'", "field(data, '", content)
content = re.sub(r"\\\'\)", "')", content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
