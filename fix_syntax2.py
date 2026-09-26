filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any escaped single quotes with actual single quotes
content = content.replace("\\'", "'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
