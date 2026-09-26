import sys

with open('src/utils/complianceRuleEngine.ts', 'r') as f:
    content = f.read()

old_bridge = """export function stateToFormData(docId: string, state: ExportCaseState): any {
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
}"""

new_bridge = """export function stateToFormData(docId: string, state: ExportCaseState): any {
  // Pre-fill default values from global state (Multi-key support for 27 forms)
  return {
    // 1. Parties
    buyer: state.parties.buyer.name,
    buyerName: state.parties.buyer.name,
    buyerAddress: state.parties.buyer.address,
    consignee: state.parties.ultimateConsignee.name,
    consigneeName: state.parties.ultimateConsignee.name,
    endUser: state.parties.endUser.name,
    endUserName: state.parties.endUser.name,
    euCompany: state.parties.endUser.name,
    
    // 2. Classification
    controlNo: state.classification.computedEccn || '',
    hsCode: state.classification.hskCode,
    itemName: state.classification.productName || '',
    itemSpec: state.classification.productName || '',
    brokerageItem: state.classification.productName || '',
    classNo: state.classification.trackingId || '',
    issueNo: state.classification.trackingId || '',
    selfClassRegNo: state.classification.trackingId || '',
    kostiNumber: state.classification.kostiNumber || '',
    
    // 3. Meta & Environment
    destCountry: state.destination.countryCode || '',
    exportCaseId: state.id,
    salesManager: state.salesManagerId,
  };
}"""

content = content.replace(old_bridge, new_bridge)

with open('src/utils/complianceRuleEngine.ts', 'w') as f:
    f.write(content)

