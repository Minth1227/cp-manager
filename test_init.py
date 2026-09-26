import re

filepath = 'src/forms/renderer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure window.initByeoljiTextareas is globally accessible from renderer.js
init_script = """
window.initByeoljiTextareas = function(container = document) {
  const textareas = container.querySelectorAll('.byeolji-textarea');
  textareas.forEach(ta => {
    // Basic auto-resize logic
    const resize = () => {
      ta.style.height = 'auto';
      ta.style.height = (ta.scrollHeight) + 'px';
    };
    ta.addEventListener('input', resize);
    // Initial resize
    setTimeout(resize, 10);
  });
};
"""

if "window.initByeoljiTextareas =" not in content:
    # Append to the end of renderer.js
    with open(filepath, 'a', encoding='utf-8') as f:
        f.write("\n" + init_script)
