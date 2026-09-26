import { getCaseFormData } from '../store.js';

/**
 * Calculates the next step in the CP Export Workflow based on accumulated data.
 * @param {string} currentFormId 
 * @param {string} txId 
 * @returns { nextFormId: string|null, reason: string }
 */
export function getNextStep(currentFormId, txId) {
  if (!txId) {
    return { nextFormId: null, reason: '거래(Transaction)가 지정되지 않았습니다.' };
  }

  // Z-01: 사전 시뮬레이션용 도구 (종료)
  if (currentFormId === 'Z-01') {
    return { 
      nextFormId: null, 
      reason: '이 화면은 가상 시뮬레이터입니다. 입력하신 내용을 바탕으로 실제 수출 시 [F-04 판정대장], [G-01 거래심사], 그리고 [허가증]이 필요할 수 있습니다. 좌측 메뉴를 통해 본 프로세스를 시작해주세요.' 
    };
  }

  // F-04 -> G-01
  if (currentFormId === 'F-04') {
    return { 
      nextFormId: 'G-01', 
      reason: '품목 판정이 대장에 등록되었습니다. 전략물자수출입고시 제22조에 따라 구매자와 최종 용도의 안전성을 심사하기 위해 [G-01 거래심사표]를 작성해야 합니다.' 
    };
  }

  // G-01 -> L-01 / L-02 / H-01
  if (currentFormId === 'G-01') {
    const f04Data = getCaseFormData('F-04', txId);
    const g01Data = getCaseFormData('G-01', txId);

    const isStrategic = f04Data.q_decision_result === '전략물자 해당';
    const isSuperSensitive = f04Data.q_sensitivity === '초민감품목';
    const isDenied = g01Data.dplScreeningResult === '위험 (우려거래자 일치 - 거래 중단)';
    const hasRedFlag = g01Data.redFlagResult === '의심 징후 발견 (상황허가 대상)';
    const isRisky = isDenied || hasRedFlag;

    if (isSuperSensitive) {
      return {
        nextFormId: 'L-01',
        reason: '⚠️ [법정 강제] 해당 품목은 "초민감품목"으로 지정되어 있습니다. 고시 제22조 [별표 8] 포괄수출허가 원천 배제 원칙에 따라 무조건 [L-01 개별수출허가]를 정부에 신청해야 합니다.'
      };
    }

    if (isStrategic) {
      if (isRisky) {
        return {
          nextFormId: 'L-01',
          reason: '⚠️ [법정 경고] 우려거래자/의심징후가 발견되어 포괄수출허가를 적용할 수 없습니다. 대외무역법 제19조에 따라 [L-01 개별수출허가]를 정부에 신청해야 합니다.'
        };
      } else {
        const isGaRegion = g01Data.effectiveRegion === '가 지역';
        const isRepeatBuyer = g01Data.isRepeatBuyer === '예';
        const isRepeatItem = g01Data.isRepeatItem === '예';
        const isComprehensiveEligible = isGaRegion && (isRepeatBuyer || isRepeatItem);

        if (isComprehensiveEligible) {
          return {
            nextFormId: 'L-02',
            reason: '✅ 우려거래자가 아니며, "가 지역" 수출 및 포괄허가 적용 조건(과거 실적)을 충족합니다. 자율준수무역거래자 특례를 적용하여 [L-02 포괄수출허가] 절차를 진행합니다.'
          };
        } else {
          return {
            nextFormId: 'L-01',
            reason: '⚠️ [개별허가 분기] "가 지역" 외의 우려 국가이거나 과거 수출 실적이 없는 완전 신규 건이므로 포괄수출허가를 적용할 수 없습니다. [L-01 개별수출허가(CP 특례 적용)] 절차를 진행합니다.'
          };
        }
      }
    } else {
      if (isRisky) {
        return {
          nextFormId: 'L-01',
          reason: '⚠️ [법정 경고] 전략물자 비해당 품목이지만 우려 의심징후가 발견되었습니다. 대외무역법 제19조 3항 상황허가 규정에 따라 [L-01 개별(상황)수출허가]를 정부에 신청해야 합니다.'
        };
      } else {
        return {
          nextFormId: 'H-01',
          reason: '✅ 전략물자 비해당 품목이며, 우려 의심징후가 없어 정부의 수출 허가가 면제됩니다. 바로 선적 준비를 위해 [H-01 출하전 점검표]로 이동합니다.'
        };
      }
    }
  }

  // L-01, L-02 -> H-01
  if (currentFormId === 'L-01' || currentFormId === 'L-02') {
    return {
      nextFormId: 'H-01',
      reason: '정부 허가가 등록되었습니다. 최종적으로 물품이 출하되기 전 교차 검증을 위해 [H-01 출하전 점검표] 작성이 필요합니다.'
    };
  }

  // H-01 -> I-01
  if (currentFormId === 'H-01') {
    return {
      nextFormId: 'I-01',
      reason: '선적 점검이 완료되었습니다. 대외무역법령 및 CP 운영규정에 따라 사후관리를 위해 [I-01 사후관리 대장]으로 이동합니다.'
    };
  }

  // I-01 -> End
  if (currentFormId === 'I-01') {
    return {
      nextFormId: null,
      reason: '🎉 모든 CP 수출통제 절차와 사후관리가 완료되었습니다! 안전하게 선적을 진행하실 수 있습니다.'
    };
  }

  return { nextFormId: null, reason: '알 수 없는 서식입니다.' };
}

/**
 * Returns prepopulated data for a form by extracting info from previously completed forms.
 */
export function getAutoFillData(targetFormId, txId) {
  if (!txId) return {};

  const autoFill = {};
  
  if (targetFormId === 'F-04') {
    const f01 = getCaseFormData('F-01', txId);
    if (f01.itemName) autoFill.q_control_number = f01.controlNo;
    if (f01.hsCode) autoFill.q_hs_code = f01.hsCode;
  }

  if (targetFormId === 'G-01') {
    const z01 = getCaseFormData('Z-01', txId);
    const f04 = getCaseFormData('F-04', txId);
    if (z01.q_country) autoFill.destinationCountry = z01.q_country;
    // For item name in G-01, we might not have it in F-04 directly, fallback to F-01
    const f01 = getCaseFormData('F-01', txId);
    if (f01.itemName) autoFill.catchAllItemName = f01.itemName;
  }

  if (targetFormId === 'L-01' || targetFormId === 'L-02') {
    const f04 = getCaseFormData('F-04', txId);
    const f01 = getCaseFormData('F-01', txId);
    const g01 = getCaseFormData('G-01', txId);
    if (f01.itemName) autoFill.itemName = f01.itemName;
    if (f04.q_hs_code) autoFill.hsCode = f04.q_hs_code;
    if (g01.buyerName) autoFill.buyerName = g01.buyerName;
    if (g01.destinationCountry) autoFill.destCountry = g01.destinationCountry;
    if (g01.endUserName) autoFill.endUserName = g01.endUserName;
  }

  if (targetFormId === 'H-01') {
    const g01 = getCaseFormData('G-01', txId);
    if (g01.destinationCountry) autoFill.destCountry = g01.destinationCountry;
    if (g01.consigneeName) autoFill.consignee = g01.consigneeName;
  }

  return autoFill;
}
