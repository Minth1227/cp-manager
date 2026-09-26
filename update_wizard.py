import sys

with open('src/components/CPExportWorkflowWizard.tsx', 'r') as f:
    content = f.read()

old_state = """  classification: {
    hskCode: '',
    q1_cryptoOverLimit: false,
    q2_nonCryptoOnly: false,
    q3_oamOnly: false,
    q4_usCodeCommingled: false
  },"""

new_state = """  documents: {},
  classification: {
    classificationType: 'NONE',
    trackingId: '',
    productName: '',
    classificationDate: '',
    kostiNumber: '',
    hskCode: '',
    q1_cryptoOverLimit: false,
    q2_nonCryptoOnly: false,
    q3_oamOnly: false,
    q4_usCodeCommingled: false
  },"""

content = content.replace(old_state, new_state)

with open('src/components/CPExportWorkflowWizard.tsx', 'w') as f:
    f.write(content)

