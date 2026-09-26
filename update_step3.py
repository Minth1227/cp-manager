import sys

with open('src/components/steps/Step3DocumentList.tsx', 'r') as f:
    content = f.read()

import re

# We need to import stateToFormData
content = content.replace(
    "import { ExportCaseState, getEnabledDocuments, DocumentConfig } from '../../utils/complianceRuleEngine';",
    "import { ExportCaseState, getEnabledDocuments, DocumentConfig, stateToFormData } from '../../utils/complianceRuleEngine';"
)

old_btn = """                      <button className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-md transition-colors">
                        작성하기
                        <ChevronRight className="w-4 h-4" />
                      </button>"""

new_btn = """                      <button 
                        onClick={() => {
                          const formData = stateToFormData(doc.id, state);
                          console.log(`Prefilled data for ${doc.id}:`, formData);
                          alert(`${doc.id} 작성 모달 오픈\\n[Pre-filled Data]\\nECCN: ${formData.eccn}\\n바이어: ${formData.buyerName}`);
                        }}
                        className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-md transition-colors"
                      >
                        작성하기 (Auto-fill)
                        <ChevronRight className="w-4 h-4" />
                      </button>"""

content = content.replace(old_btn, new_btn)

with open('src/components/steps/Step3DocumentList.tsx', 'w') as f:
    f.write(content)
