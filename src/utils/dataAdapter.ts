import { ExportCaseState } from './complianceRuleEngine';

export function migrateOldTxToNewState(txId: string, oldFormData: Record<string, any>): ExportCaseState {
  const z01 = oldFormData[`Z-01_${txId}`] || {};
  const f04 = oldFormData[`F-04_${txId}`] || {};
  const g01 = oldFormData[`G-01_${txId}`] || {};
  const f01 = oldFormData[`F-01_${txId}`] || {};
  
  return {
    id: txId,
    updatedAt: new Date().toISOString(),
    status: 'DRAFT',
    salesManagerId: 'MIGRATED',
    complianceManagerId: 'MIGRATED',
    parties: {
      buyer: { name: z01.buyerName || g01.buyerName || '', address: '', country: z01.targetCountry || g01.destinationCountry || '' },
      ultimateConsignee: { name: g01.consigneeName || '', address: '', country: g01.destinationCountry || '' },
      endUser: { name: g01.endUserName || '', address: '', country: g01.destinationCountry || '' },
      agent: { name: '', address: '', country: '' }
    },
    screening: {
      cslApiHit: g01.dplScreeningResult === '위험 (우려거래자 일치 - 거래 중단)',
      yesTradeManualChecked: false,
      hasRedFlags: g01.redFlagResult === '의심 징후 발견 (상황허가 대상)',
      selectedRedFlags: []
    },
    classification: {
      hskCode: f04.q_hs_code || f01.hsCode || '',
      // Map old '전략물자 해당' directly to 5D002 crypto logic
      q1_cryptoOverLimit: f04.q_decision_result === '전략물자 해당',
      q2_nonCryptoOnly: false,
      q3_oamOnly: false,
      q4_usCodeCommingled: false
    },
    destination: {
      countryCode: z01.targetCountry || g01.destinationCountry || '',
      isGroupA: g01.effectiveRegion === '가 지역',
      isSanctionedCountry: false
    }
  };
}

export function flattenStateToLegacyForms(state: ExportCaseState, txId: string): Record<string, any> {
  const isStrategic = state.classification.q1_cryptoOverLimit && !state.classification.q2_nonCryptoOnly && !state.classification.q3_oamOnly;
  const cslBlocked = state.screening.cslApiHit;
  const redFlagBlocked = state.screening.hasRedFlags;
  
  return {
    [`Z-01_${txId}`]: {
      targetCountry: state.destination.countryCode,
      buyerName: state.parties.buyer.name
    },
    [`F-04_${txId}`]: {
      q_hs_code: state.classification.hskCode,
      q_decision_result: isStrategic ? '전략물자 해당' : '전략물자 비해당',
      q_sensitivity: isStrategic ? '일반' : '비해당' // Assuming general, we don't have super sensitive in new model
    },
    [`G-01_${txId}`]: {
      buyerName: state.parties.buyer.name,
      consigneeName: state.parties.ultimateConsignee.name,
      endUserName: state.parties.endUser.name,
      destinationCountry: state.destination.countryCode,
      effectiveRegion: state.destination.isGroupA ? '가 지역' : '기타 지역',
      dplScreeningResult: cslBlocked ? '위험 (우려거래자 일치 - 거래 중단)' : '안전',
      redFlagResult: redFlagBlocked ? '의심 징후 발견 (상황허가 대상)' : '의심 징후 없음'
    }
  };
}
