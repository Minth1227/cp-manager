import re

with open('src/utils/formTemplates.js', 'r') as f:
    content = f.read()

# Find export default { ... } or similar block
matches = re.findall(r"'([A-Z]-[0-9]+)':\s*[a-zA-Z0-9_]+,\s*//\s*(.*)", content)
for m in matches:
    print(f"{m[0]}: {m[1]}")

matches_title = re.findall(r"function tmpl_[a-zA-Z0-9_]+\(.*?\).*?<title>([^<]+)</title>", content, re.DOTALL)
for m in matches_title:
    print(m)

