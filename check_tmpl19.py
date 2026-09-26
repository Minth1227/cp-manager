import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

tmpl19 = content.split("function tmpl_19(")[1].split("}")[0]
print("--- tmpl_19 START ---")
print(tmpl19[:1000])
