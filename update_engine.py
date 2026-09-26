import sys

with open('src/utils/complianceRuleEngine.ts', 'r') as f:
    content = f.read()

# Add DocumentState interface
new_interface = """
export interface DocumentState {
  isCompleted: boolean;
  formData: any;
  pdfUrl: string | null;
}
"""

content = content.replace("export interface ExportCaseState {", new_interface + "\nexport interface ExportCaseState {")

# Add documents field
content = content.replace("  transaction: {", "  documents: Record<string, DocumentState>;\n\n  transaction: {")

# Expand classification field
new_classification = """  classification: {
    classificationType: 'SELF' | 'PRO' | 'NONE';
    trackingId?: string;
    productName?: string;
    classificationDate?: string;
    kostiNumber?: string;
    hskCode: string;
    q1_cryptoOverLimit: boolean; // AES >56bit, RSA >512bit, ECC >112bit, PQC
    q2_nonCryptoOnly: boolean;   // Authentication, Digital Signature, SecOC MAC only
    q3_oamOnly: boolean;         // Operations, Admin, Maintenance only
    q4_usCodeCommingled: boolean; // US origin code > 0%
    computedEccn?: '5D002' | 'EAR99' | 'ML21' | 'NON_CONTROLLED';
    isUsEarSubject?: boolean;      // De minimis 0% Rule applied
  };"""

import re
content = re.sub(r"  classification: \{.*?  \};", new_classification, content, flags=re.DOTALL)

# Add stateToFormData
state_to_form = """

export function stateToFormData(docId: string, state: ExportCaseState): any {
  // Pre-fill default values from global state
  return {
    buyerName: state.parties.buyer.name,
    buyerAddress: state.parties.buyer.address,
    buyerCountry: state.parties.buyer.country,
    consigneeName: state.parties.ultimateConsignee.name,
    consigneeCountry: state.parties.ultimateConsignee.country,
    endUserName: state.parties.endUser.name,
    endUserCountry: state.parties.endUser.country,
    
    // Classification / F-04 Data
    eccn: state.classification.computedEccn || '',
    hskCode: state.classification.hskCode,
    productName: state.classification.productName || '',
    classificationId: state.classification.trackingId || '',
    classificationDate: state.classification.classificationDate || '',
    isUsEarSubject: state.classification.isUsEarSubject ? 'YES' : 'NO',
    kostiNumber: state.classification.kostiNumber || '',
    
    // Meta
    exportCaseId: state.id,
    salesManager: state.salesManagerId,
  };
}
"""
content += state_to_form

with open('src/utils/complianceRuleEngine.ts', 'w') as f:
    f.write(content)

