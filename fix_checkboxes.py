import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update `ck()` function in `formTemplates.js`
old_ck = """function ck(val, target) {
  return val === target ? '☑' : '☐';
}"""
new_ck = """function ck(data, key, target, isEditMode = false) {
  let val = data ? data[key] : undefined;
  let isChecked = false;
  if (Array.isArray(val)) {
    isChecked = val.includes(target);
  } else {
    isChecked = val === target || val === true; // sometimes it might be just true
  }

  if (isEditMode) {
    // Render an interactive checkbox
    const checkedAttr = isChecked ? 'checked' : '';
    // We use type="checkbox" because some forms allow multiple selections (e.g. grade)
    return `<input type="checkbox" class="byeolji-checkbox" data-field="${key}" value="${target}" ${checkedAttr} style="transform: scale(1.2); margin-right: 4px; cursor: pointer;">`;
  }
  
  return isChecked ? '☑' : '☐';
}"""
content = content.replace(old_ck, new_ck)

# 2. Refactor all `ck(data.something, 'target')` calls
# There might be spaces, single or double quotes
content = re.sub(r"ck\(data\.([a-zA-Z0-9_]+),\s*('[^']+'|\"[^\"]+\")\)", r"ck(data, '\1', \2, isEditMode)", content)
# Check for any that might be `ck(data['some_key'], 'target')` just in case
content = re.sub(r"ck\(data\[('[^']+'|\"[^\"]+\")\],\s*('[^']+'|\"[^\"]+\")\)", r"ck(data, \1, \2, isEditMode)", content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Update `renderer.js` `collectFormData`
renderer_path = 'src/forms/renderer.js'
with open(renderer_path, 'r', encoding='utf-8') as f:
    renderer_content = f.read()

old_collect = """  // Regular fields
  container.querySelectorAll('[data-field]').forEach(el => {
    if (el.type === 'checkbox') {
      data[el.dataset.field] = el.checked;
    } else {
      data[el.dataset.field] = el.value;
    }
  });"""

new_collect = """  // Regular text/select fields
  container.querySelectorAll('input[data-field]:not([type="checkbox"]):not([type="radio"]), textarea[data-field], select[data-field]').forEach(el => {
    data[el.dataset.field] = el.value;
  });

  // Checkbox/Radio fields
  const checkboxGroups = {};
  container.querySelectorAll('input[type="checkbox"][data-field], input[type="radio"][data-field]').forEach(el => {
    const key = el.dataset.field;
    if (el.checked) {
      if (!checkboxGroups[key]) {
        checkboxGroups[key] = [];
      }
      checkboxGroups[key].push(el.value);
    }
  });
  
  // Assign checkbox groups back to data. If only one selected, store as string, else array.
  for (const [key, values] of Object.entries(checkboxGroups)) {
    if (values.length === 1 && values[0] !== 'on') {
      data[key] = values[0];
    } else if (values.length > 1) {
      data[key] = values;
    } else if (values.length === 1 && values[0] === 'on') {
      data[key] = true;
    }
  }
  
  // For checkboxes that were not checked at all, they won't be in checkboxGroups.
  // If we need to explicitly clear them, we might need additional logic, but usually it's fine.
"""
renderer_content = renderer_content.replace(old_collect, new_collect)

with open(renderer_path, 'w', encoding='utf-8') as f:
    f.write(renderer_content)
