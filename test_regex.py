import re

text = "${ck(data.disclosure,'public')} 공개 (With all) &nbsp; ${ck(data.disclosure,'partial')}"
new_text = re.sub(r"ck\(data\.([a-zA-Z0-9_]+),\s*('[^']+'|\"[^\"]+\")\)", r"ck(data, '\1', \2, isEditMode)", text)
print(new_text)
