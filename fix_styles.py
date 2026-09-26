import re

with open('src/views/archiveView.js', 'r') as f:
    content = f.read()

# 1. Fix Ongoing Archive
content = content.replace(
    '<div style="border:1px solid rgba(59,130,246,0.3); border-radius:8px; background:white; overflow:hidden;">',
    '<div style="border:1px solid var(--border-accent); border-radius:8px; background:var(--bg-card); overflow:hidden;">'
)

content = content.replace(
    '<div style="background:rgba(59,130,246,0.05); padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(59,130,246,0.2);">',
    '<div style="background:var(--accent-blue-dim); padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-accent);">'
)

content = content.replace(
    '<span style="font-size:0.8rem; color:var(--accent-blue); background:white; padding:2px 8px; border-radius:12px; border:1px solid rgba(59,130,246,0.3);">',
    '<span style="font-size:0.8rem; color:var(--accent-blue); background:var(--bg-primary); padding:2px 8px; border-radius:12px; border:1px solid var(--border-accent);">'
)

content = content.replace(
    '<span class="material-symbols-rounded" style="color:#3b82f6; font-size:1.2rem;">folder_shared</span>',
    '<span class="material-symbols-rounded" style="color:var(--accent-blue); font-size:1.2rem;">folder_shared</span>'
)

content = content.replace(
    '<strong style="font-size:0.95rem; color:#1e3a8a;">',
    '<strong style="font-size:0.95rem; color:var(--text-primary);">'
)

content = content.replace(
    '<span style="font-size:0.7rem; background:#eff6ff; color:#2563eb; padding:2px 6px; border-radius:4px; border:1px solid #bfdbfe;">작업 중</span>',
    '<span style="font-size:0.7rem; background:var(--accent-blue-dim); color:var(--accent-blue); padding:2px 6px; border-radius:4px; border:1px solid var(--border-accent);">작업 중</span>'
)

content = content.replace(
    'border:1px solid var(--border-color);',
    'border:1px solid var(--border-default);'
)

content = content.replace(
    '<span class="material-symbols-rounded" style="font-size:1.1rem; color:#64748b;">description</span>',
    '<span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--text-secondary);">description</span>'
)

content = content.replace(
    '<div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="Z-01" style="display:flex; align-items:center; gap:6px; background:rgba(59,130,246,0.05); padding:6px 10px; border-radius:6px; border:1px dashed rgba(59,130,246,0.4); cursor:pointer; font-size:0.85rem; color:var(--accent-blue); transition:all 0.2s;">',
    '<div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="Z-01" style="display:flex; align-items:center; gap:6px; background:var(--accent-blue-dim); padding:6px 10px; border-radius:6px; border:1px dashed var(--border-accent); cursor:pointer; font-size:0.85rem; color:var(--accent-blue); transition:all 0.2s;">'
)

# 2. Fix Legal Archive
content = content.replace(
    '<div style="border:1px solid #cbd5e1; border-radius:8px; background:white; overflow:hidden;">',
    '<div style="border:1px solid var(--border-subtle); border-radius:8px; background:var(--bg-card); overflow:hidden;">'
)

content = content.replace(
    '<div style="background:#f8fafc; padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid #cbd5e1;">',
    '<div style="background:var(--bg-secondary); padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-subtle);">'
)

content = content.replace(
    '<span class="material-symbols-rounded" style="color:#64748b; font-size:1.5rem;">inventory</span>',
    '<span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:1.5rem;">inventory</span>'
)

content = content.replace(
    '<span style="font-size:0.8rem; color:#475569; background:white; padding:2px 8px; border-radius:12px; border:1px solid #cbd5e1;">',
    '<span style="font-size:0.8rem; color:var(--text-secondary); background:var(--bg-primary); padding:2px 8px; border-radius:12px; border:1px solid var(--border-subtle);">'
)

content = content.replace(
    '<div class="accordion-item" style="border:1px solid #e2e8f0; border-radius:6px; overflow:hidden; background:#fff;">',
    '<div class="accordion-item" style="border:1px solid var(--border-subtle); border-radius:6px; overflow:hidden; background:var(--bg-primary);">'
)

content = content.replace(
    '<div class="accordion-header" style="padding:12px 16px; display:flex; align-items:center; gap:12px; cursor:pointer; background:#f8fafc; transition:background 0.2s;">',
    '<div class="accordion-header" style="padding:12px 16px; display:flex; align-items:center; gap:12px; cursor:pointer; background:var(--bg-secondary); transition:background 0.2s;">'
)

content = content.replace(
    '<span class="material-symbols-rounded expand-icon" style="color:#94a3b8; transition:transform 0.2s;">chevron_right</span>',
    '<span class="material-symbols-rounded expand-icon" style="color:var(--text-secondary); transition:transform 0.2s;">chevron_right</span>'
)

content = content.replace(
    '<span class="material-symbols-rounded" style="color:#94a3b8; font-size:1.2rem;">lock</span>',
    '<span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:1.2rem;">lock</span>'
)

content = content.replace(
    '<strong style="font-size:0.95rem; color:#334155;">${tx.name}</strong>',
    '<strong style="font-size:0.95rem; color:var(--text-primary);">${tx.name}</strong>'
)

content = content.replace(
    '<span style="font-size:0.8rem; color:#64748b; margin-left:8px;">(${tx.country || \'-\'} / ${tx.buyer || \'-\'})</span>',
    '<span style="font-size:0.8rem; color:var(--text-secondary); margin-left:8px;">(${tx.country || \'-\'} / ${tx.buyer || \'-\'})</span>'
)

content = content.replace(
    '<span style="font-size:0.75rem; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px; border:1px solid #e2e8f0;">',
    '<span style="font-size:0.75rem; color:var(--text-secondary); background:var(--bg-tertiary); padding:2px 6px; border-radius:4px; border:1px solid var(--border-subtle);">'
)

content = content.replace(
    '<div class="accordion-body" style="display:none; padding:16px; border-top:1px solid #e2e8f0; background:#fff;">',
    '<div class="accordion-body" style="display:none; padding:16px; border-top:1px solid var(--border-subtle); background:var(--bg-primary);">'
)

content = content.replace(
    '<div style="font-size:0.85rem; font-weight:600; color:#475569; margin-bottom:12px;">종결 서류 목록 (읽기 전용)</div>',
    '<div style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); margin-bottom:12px;">종결 서류 목록 (읽기 전용)</div>'
)

content = content.replace(
    '<div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="${fId}" style="display:flex; align-items:center; gap:6px; background:#f8fafc; padding:8px 12px; border-radius:6px; border:1px solid #cbd5e1; cursor:pointer; font-size:0.85rem; color:#334155; transition:all 0.2s;">',
    '<div class="doc-file-link" data-tx-id="${tx.id}" data-form-id="${fId}" style="display:flex; align-items:center; gap:6px; background:var(--bg-secondary); padding:8px 12px; border-radius:6px; border:1px solid var(--border-subtle); cursor:pointer; font-size:0.85rem; color:var(--text-primary); transition:all 0.2s;">'
)

content = content.replace(
    '<span class="material-symbols-rounded" style="font-size:1.1rem; color:#94a3b8;">description</span>',
    '<span class="material-symbols-rounded" style="font-size:1.1rem; color:var(--text-secondary);">description</span>'
)

content = content.replace(
    '<div style="margin-top:20px; padding-top:16px; border-top:1px dashed #cbd5e1; display:flex; justify-content:flex-end;">',
    '<div style="margin-top:20px; padding-top:16px; border-top:1px dashed var(--border-subtle); display:flex; justify-content:flex-end;">'
)

content = content.replace(
    '<tr style="background:#f1f5f9; color:#475569;">',
    '<tr style="background:var(--bg-secondary); color:var(--text-secondary);">'
)

content = content.replace(
    'border-bottom:1px solid #cbd5e1;',
    'border-bottom:1px solid var(--border-subtle);'
)

content = content.replace(
    'border-bottom:1px solid #e2e8f0; color:#64748b;',
    'border-bottom:1px solid var(--border-default); color:var(--text-secondary);'
)

content = content.replace(
    'border-bottom:1px solid #e2e8f0;',
    'border-bottom:1px solid var(--border-default);'
)


# 3. Fix event listeners in bindEvents
content = content.replace(
    'container.querySelectorAll(\'.accordion-header\').forEach(h => h.style.background = \'#f8fafc\');',
    'container.querySelectorAll(\'.accordion-header\').forEach(h => h.style.background = \'var(--bg-secondary)\');'
)

content = content.replace(
    'header.style.background = \'#f1f5f9\';',
    'header.style.background = \'var(--bg-tertiary)\';'
)

content = content.replace(
    "el.style.background = 'white';",
    "el.style.background = 'var(--bg-glass-strong)';"
)

content = content.replace(
    "el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';",
    "el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';"
)

content = content.replace(
    "el.style.borderColor = 'rgba(59,130,246,0.4)';",
    "el.style.borderColor = 'var(--border-accent)';"
)

content = content.replace(
    "el.style.background = 'rgba(59,130,246,0.05)';",
    "el.style.background = 'var(--accent-blue-dim)';"
)

content = content.replace(
    "el.style.borderColor = el.closest('.accordion-item') ? '#cbd5e1' : 'var(--border-color)';",
    "el.style.borderColor = el.closest('.accordion-item') ? 'var(--border-subtle)' : 'var(--border-default)';"
)

content = content.replace(
    "el.style.background = el.closest('.accordion-item') ? '#f8fafc' : 'var(--bg-secondary)';",
    "el.style.background = el.closest('.accordion-item') ? 'var(--bg-secondary)' : 'var(--bg-secondary)';"
)


with open('src/views/archiveView.js', 'w') as f:
    f.write(content)
