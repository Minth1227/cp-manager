import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

funcs = re.findall(r'(function tmpl_[A-Z0-9_]+\(.*?\).*?</div></body></html>`;?\n\})', content, flags=re.DOTALL)

for func in funcs:
    name = re.search(r'function (tmpl_[A-Z0-9_]+)', func).group(1)
    if name in ['tmpl_04', 'tmpl_05', 'tmpl_15']:
        print(f"--- {name} ---")
        # print the last 15 lines of the function
        print("\n".join(func.split("\n")[-15:]))
