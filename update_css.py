import re

filepath = 'src/utils/formTemplates.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update .interactive-mode to strictly enforce 1024px min-width
old_interactive_mode = ".interactive-mode { width: 100%; max-width: 100%; padding: 10px 20px; margin: 0; }"
new_interactive_mode = ".interactive-mode { width: 100%; min-width: 1024px; padding: 10px 20px; margin: 0; overflow-x: auto; box-sizing: border-box; }"
content = content.replace(old_interactive_mode, new_interactive_mode)

# 2. Inject form styling
form_styles = """
  /* ── 폼 입력 스타일 (interactive-mode) ── */
  .byeolji-input, .byeolji-textarea {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    resize: none;
    overflow: hidden;
    line-height: 1.5;
    background: transparent;
  }
  .byeolji-input.editable, .byeolji-textarea.editable {
    background-color: #fffde7;
    border: 1px dashed #93c5fd;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  .byeolji-input.editable:focus, .byeolji-textarea.editable:focus {
    background-color: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  .byeolji-input.readonly, .byeolji-textarea.readonly {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    padding: 4px;
    border-radius: 4px;
  }
  
  @media print {
    .byeolji-input.editable, .byeolji-textarea.editable,
    .byeolji-input.readonly, .byeolji-textarea.readonly {
      background-color: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      color: #000 !important;
    }
  }
"""

if "/* ── 폼 입력 스타일" not in content:
    content = content.replace("  /* ── 화면 표시용 ── */", form_styles + "\n  /* ── 화면 표시용 ── */")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
