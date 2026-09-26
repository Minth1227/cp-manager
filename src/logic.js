import { setFormStatus, getFormStatus, getCaseFormData, getCompanyInfo, getTargetGrade } from './store.js';
import { getDesignatedCpGrade, capCpGrade } from './utils/legalBasis.ts';

import { evaluateRoutingEngine } from './utils/complianceRuleEngineV2.ts';

/**
 * Z-01 진단표 정밀 로직 (고시서류 매핑도 1:1 대응)
 * 특정 폼(triggerFormId)의 저장 데이터(formData)를 기반으로 종속 폼들을 활성화/비활성화 처리합니다.
 */
export async function evaluateBusinessLogic(triggerFormId, formData) {
  // 우리는 Z-01이나 G-01이 저장될 때 로직을 수행합니다.
  // 실제로는 저장된 모든 최신 폼 데이터를 기반으로 state를 구성해야 정확합니다.
  // 이 예제에서는 formData(트리거된 폼)와 store의 다른 폼 데이터를 종합해야 하지만,
  // Z-01 위주의 정보로 state를 먼저 세팅해 봅니다.
  // V2 엔진 연동
  if (triggerFormId === 'Z-01' || triggerFormId === 'G-01') {
    // 1. 필요한 모든 폼 데이터 가져오기
    // 실제 환경에서는 getFormData('Z-01') 등의 함수로 가져와야 함.
    // 여기서는 trigger된 formData 중심으로 파싱하되, 부족한 부분은 기본값 처리.
    
    // Z-01 기반 데이터 파싱 (우선순위) — 현재 선택된 거래(txId) 기준으로 Firestore 동기화된 store에서 조회
    const z01 = triggerFormId === 'Z-01' ? formData : (getCaseFormData('Z-01') || {});
    const g01 = triggerFormId === 'G-01' ? formData : (getCaseFormData('G-01') || {});
    // [수정] F-04(전략물자 판정관리대장)에는 일반/민감/초민감 3단계 민감도(q_sensitivity)가 이미 정확히
    // 수집되고 있는데, 라우팅 엔진은 이를 전혀 참조하지 않고 Z-01의 q_exclude(예/아니오 2択)만으로
    // itemType을 추정해 "민감" 단계가 산출될 수 없는 상태였음(나-1 지역 민감품목 강제개별허가 분기가
    // 데드코드였음). 판정이 완료되어 F-04가 채워져 있으면 그 값을 우선 사용한다.
    const f04 = getCaseFormData('F-04') || {};
    
    // V2 엔진이 관리하는 수출통제 전용 서식 목록 (수출이 아닐 때 일괄 N/A 처리에도 재사용)
    // [수정] C-01(사내교육 시행 공지문)이 이 목록에 섞여 있었음 — C-01은 isTxForm() 목록에 없는
    // "전사 공용" 서식이라(거래별이 아니라 상태 키가 'C-01' 단 하나) 여기서 setFormStatus('C-01', ...)를
    // 부르면 그 거래 하나의 라우팅 결과로 회사 전체의 C-01 상태가 덮어써져 버렸다(사용자가 실제로
    // 겪은 "C-01이 수출통제 기준에 안 맞아 N/A 처리됨" 오안내의 원인). C-01은 특정 수출 거래의
    // 전략물자 판정/허가유형과 무관한 서식이므로 이 라우팅 엔진에서 완전히 제외한다.
    const allForms = ['M-01', 'M-02', 'M-03', 'K-01', 'K-02', 'L-01', 'L-02', 'L-03', 'L-04', 'L-05', 'L-06', 'L-07', 'L-08', 'L-09', 'L-10', 'L-11', 'G-01', 'F-01'];

    // 유형 체크
    const type = z01['q0_type'];
    if (type !== '수출') {
       // 수출이 아니면(수입/중개/미입력 등) 수출통제 전용 서식은 전부 해당없음(N/A) 처리하여
       // 이전에 '수출'로 저장했던 상태가 그대로 남아있는 일이 없도록 함
       await Promise.all(allForms.map(id => setFormStatus(id, 'na')));
       localStorage.removeItem('cp_route_result');
       return true;
    }

    // State 구성
    const regionText = z01['q_region'] || '';
    let countryGroup = '기타';
    if (regionText.includes('가 지역')) countryGroup = '가';
    else if (regionText.includes('나의1')) countryGroup = '나-1';
    else if (regionText.includes('나의2')) countryGroup = '나-2';

    const strategic = z01['q_strategic'];
    const exclude = z01['q_exclude'];
    const sensitivityMap = { '초민감품목': '초민감-VSL', '민감품목': '민감', '일반품목': '일반' };
    let itemType = '비전략물자';
    if (strategic === '해당') {
      if (sensitivityMap[f04['q_sensitivity']]) {
        // F-04 판정관리대장에 3단계 민감도가 등록되어 있으면 이를 그대로 사용 (가장 정확한 출처)
        itemType = sensitivityMap[f04['q_sensitivity']];
      } else {
        // 아직 F-04가 없는 초기 단계 — Z-01의 배제품목 여부(2択)로 최소한만 추정.
        // 주의: 이 경로에서는 '민감'이 나올 수 없으므로, 나-1 지역 민감품목 강제개별허가 판단은
        // F-04(판정관리대장) 등록 이후에만 정확해진다.
        itemType = exclude === '예' ? '초민감-VSL' : '일반';
      }
    }

    const state = {
      id: 'mock',
      updatedAt: new Date().toISOString(),
      status: 'DRAFT',
      destination: { countryGroup },
      classification: { itemType },
      screening: {
        isBlacklisted: z01['q_denied'] === '예',
        isWMDKnow: z01['q_catchall'] === '예', // WMD 전용 인지
        has12RedFlags: z01['q_redflag'] === '예' // 12개 징후
      },
      transaction: {
        // 서식에서 고른 등급이 아니라 실제 지정서 기준 등급을 상한으로 쓴다 (미지정이면 NONE → 특례 미적용)
        cpGrade: capCpGrade(z01['q_cp_grade'] === '등급없음' ? 'NONE' : (z01['q_cp_grade'] || 'NONE'),
                            getDesignatedCpGrade(getCompanyInfo(), getTargetGrade()))
      },
      archivedDocs: {}
    };

    const routeResult = evaluateRoutingEngine(state);

    // V2 엔진 결과(RouteResult)를 기반으로 사이드바 통제 폼 상태 업데이트
    const newStatuses = {};
    allForms.forEach(id => newStatuses[id] = 'na');

    routeResult.requiredForSubmit.forEach(id => {
      newStatuses[id] = 'todo';
    });

    routeResult.requiredForArchive.forEach(id => {
      newStatuses[id] = 'todo'; // Hard Lock (아카이브용)도 우선 todo로 띄움. 나중에 UI에서 구분.
    });

    // 3. Store에 반영
    const promises = Object.keys(newStatuses).map(async id => {
      const current = getFormStatus(id);
      if (newStatuses[id] === 'na') {
        await setFormStatus(id, 'na');
      } else if (newStatuses[id] === 'todo') {
        if (current === 'na' || current === undefined || current === 'todo') {
          await setFormStatus(id, 'todo');
        }
      }
    });

    // 라우팅 결과를 localStorage에 저장하여 UI에서 읽을 수 있게 함.
    localStorage.setItem('cp_route_result', JSON.stringify(routeResult));

    await Promise.all(promises);
    return true;
  }

  return false;
}

/**
 * CP 모드(신규 신청 vs 기존 인증 기업)에 따른 법적 면제 서식 자동 전환 로직
 * - 신규 신청(initial): 법적으로 기부여 CP가 없어 정부 보고가 불가능한 K-03, K-04만 N/A 면제 처리.
 *   (※ 이전 수출건 시나리오 모의 작성을 위해 C-01~06, I-01, G-01~05 등은 모두 활성화 유지)
 * - 기존 인증(certified): K-03, K-04를 포함한 모든 정부 보고 및 사후관리 서식 100% 활성화.
 */
export async function evaluateCpAppModeLogic(cpAppMode) {
  const isInitial = cpAppMode !== 'certified';

  const promises = [];
  if (isInitial) {
    // 신규 신청 시 법적 정부 정기보고 면제 서식
    const statutoryExemptForms = ['K-03', 'K-04'];
    statutoryExemptForms.forEach(id => {
      const current = getFormStatus(id);
      if (current === 'todo' || current === undefined) {
        promises.push(setFormStatus(id, 'na'));
      }
    });
  } else {
    // 기존 기업 유지 시: K-03, K-04 활성화
    const requiredForms = ['K-03', 'K-04'];
    requiredForms.forEach(id => {
      const current = getFormStatus(id);
      if (current === 'na') {
        promises.push(setFormStatus(id, 'todo'));
      }
    });
  }
  await Promise.all(promises);
}
