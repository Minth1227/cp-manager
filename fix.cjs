const fs = require('fs');

let content = fs.readFileSync('src/forms/renderer.js', 'utf8');

// The original user diff deleted html += ` from the AI block.
// I will just use sed or string replacement to fix the syntax error directly.
// The error is at line 64: <div class="ai-analysis-block"
// That means line 63 is: // AI Analysis Block
// line 64: if (formDef.ai_analyzable) {
// line 65: <div class="ai-analysis-block" ...
// We just need to add html += ` before the <div

content = content.replace('if (formDef.ai_analyzable) {\n      <div class="ai-analysis-block"', 'if (formDef.ai_analyzable) {\n    html += `\n      <div class="ai-analysis-block"');

fs.writeFileSync('src/forms/renderer.js', content, 'utf8');
