const fs = require('fs');

let content = fs.readFileSync('src/forms/renderer.js', 'utf8');

const regex = /export function generateUnifiedDocumentHTML\([\s\S]*?return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">/g;

const replacement = `export async function generateUnifiedDocumentHTML(allFormDefs, getAllDataCallback) {
  let combinedBody = '';
  const { hasFormTemplate, generateFormHtml } = await import('../utils/formTemplates.js');

  for (const formDef of Object.values(allFormDefs)) {
    const data = getAllDataCallback(formDef.id) || {};
    let fullHtml = '';
    
    if (hasFormTemplate(formDef.id)) {
      fullHtml = generateFormHtml(formDef.id, data);
    } else {
      fullHtml = generateDocumentHTML(formDef, data);
    }
    
    // Extract everything between <body> and <script> or </body>
    const bodyMatch = fullHtml.match(/<body>([\\s\\S]*?)(?:<script>|<\\/body>)/);
    if (bodyMatch && bodyMatch[1]) {
      combinedBody += \`<div class="pdf-page-container">\n        \${bodyMatch[1]}\n      </div>\`;
    }
  }

  return \`<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">\`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/forms/renderer.js', content, 'utf8');
