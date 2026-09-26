import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix tmpl_01 specifically
target_old = """function tmpl_01(data, isEditMode = false) {
  const cClass = isEditMode ? 'interactive-mode' : '';
  const bodyStyle = isEditMode ? 'style="margin:0; max-width:100%;"' : '';
  const pbBtn = !isEditMode ? printButton : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제1호 - 전략물자 개별수출허가신청서</title>${commonStyle}</head><body ${bodyStyle} class="${cClass}">${pbBtn}"""

target_new = """function tmpl_01(data, isEditMode = false) {
  const cClass = isEditMode ? 'interactive-mode' : 'print-wrapper';
  const pbBtn = !isEditMode ? printButton : '';

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>별지 제1호 - 전략물자 개별수출허가신청서</title>${commonStyle}</head><body>
<div class="${cClass}">
${pbBtn}"""

content = content.replace(target_old, target_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
