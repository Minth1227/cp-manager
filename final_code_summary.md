# 핵심 로직 및 UI 파일 코드 요약

본 문서는 이번 리팩토링 및 신규 요구사항(EAR 0% 룰, '가' 지역 백색국가 예외처리, 의심징후 로직 강화 등)이 모두 반영된 주요 파일 3개의 최종 코드 내역입니다.

## 1. `src/utils/complianceRuleEngine.ts`
법적 예외 처리와 서류 렌더링을 제어하는 핵심 룰 엔진

```typescript
export interface ScreeningData {
  hasRedFlags: boolean;
  isGroupACountry: boolean;
  cslMatch: boolean;
}

export interface ClassificationData {
  eccn: string;
  hasUscntCode: boolean;
  usCodePercentage: number;
}

export interface RequiredDocuments {
  docF01: boolean;
  docF03: boolean;
  docContract: boolean;
  docEndUser: boolean;
  docJ01: boolean;
}

export function evaluateRequiredDocuments(
  screening: ScreeningData,
  classification: ClassificationData
): RequiredDocuments {
  const docs: RequiredDocuments = {
    docF01: true,
    docF03: true,
    docContract: true,
    docEndUser: true,
    docJ01: false,
  };

  // 1. EAR 0% De minimis 룰 (미국산 코드 포함 시 F-01 자가판정 불가)
  if (classification.hasUscntCode && classification.usCodePercentage > 0) {
    docs.docF01 = false;
  }

  // 2. EAR99 등급일 경우 F-03 기술사양서 면제
  if (classification.eccn === 'EAR99') {
    docs.docF03 = false;
  }

  // 3. '가' 지역(백색국가) 수출 시 계약서 및 최종사용자 서약서 면제
  if (screening.isGroupACountry) {
    docs.docContract = false;
    docs.docEndUser = false;
  }

  return docs;
}
```

## 2. `src/components/steps/Step1Screening.tsx`
'가' 지역 체크박스 및 의심징후 로직이 반영된 1단계 스크리닝 UI

```tsx
import React, { useState } from 'react';
import { useCPContext } from '../../context/CPContext';

const Step1Screening: React.FC = () => {
  const { setScreeningData, nextStep } = useCPContext();
  const [isGroupA, setIsGroupA] = useState(false);
  const [hasRedFlags, setHasRedFlags] = useState(false);

  const handleNext = () => {
    if (hasRedFlags) {
      alert("STOP-SHIPMENT: 의심징후(Red Flags)가 발견되어 수출이 보류되었습니다.");
      return;
    }
    setScreeningData({
      hasRedFlags,
      isGroupACountry: isGroupA,
      cslMatch: false,
    });
    nextStep();
  };

  return (
    <div className="step-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">1단계: 스크리닝 및 거래선 확인</h2>
      
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            checked={isGroupA} 
            onChange={(e) => setIsGroupA(e.target.checked)} 
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>수출 목적국이 '가' 지역(백색국가: 미국, 일본 등)에 해당합니까?</span>
        </label>
        <p className="text-sm text-gray-500 mt-1">
          * 체크 시 3단계에서 수출계약서 및 최종사용자서약서 제출이 자동 면제됩니다.
        </p>
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2 text-red-600">
          <input 
            type="checkbox" 
            checked={hasRedFlags} 
            onChange={(e) => setHasRedFlags(e.target.checked)} 
            className="form-checkbox h-5 w-5 text-red-600"
          />
          <span>WMD 전용 의심징후(Red Flags)가 하나라도 존재합니까?</span>
        </label>
      </div>

      <button 
        onClick={handleNext}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        다음 단계로
      </button>
    </div>
  );
};

export default Step1Screening;
```

## 3. `src/components/steps/Step3DocumentList.tsx`
동적 룰 엔진에 의해 서류가 자동 비활성화/활성화 되는 UI

```tsx
import React, { useEffect, useState } from 'react';
import { useCPContext } from '../../context/CPContext';
import { evaluateRequiredDocuments, RequiredDocuments } from '../../utils/complianceRuleEngine';

const Step3DocumentList: React.FC = () => {
  const { screeningData, classificationData, nextStep } = useCPContext();
  const [docs, setDocs] = useState<RequiredDocuments | null>(null);

  useEffect(() => {
    if (screeningData && classificationData) {
      const result = evaluateRequiredDocuments(screeningData, classificationData);
      setDocs(result);
    }
  }, [screeningData, classificationData]);

  if (!docs) return <div>Loading...</div>;

  return (
    <div className="step-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">3단계: 수출 통제 필수 서류</h2>
      
      <ul className="space-y-4">
        <li className={`p-4 rounded border ${docs.docF01 ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
          <div className="font-semibold">F-01 자가판정서</div>
          {!docs.docF01 && <div className="text-sm text-red-500">* 미국 EAR 통제 (De minimis) 대상이므로 자가판정이 불가합니다.</div>}
        </li>
        <li className={`p-4 rounded border ${docs.docF03 ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
          <div className="font-semibold">F-03 기술사양 비교분석서</div>
          {!docs.docF03 && <div className="text-sm text-gray-500">* EAR99 분류로 인해 제출이 면제됩니다.</div>}
        </li>
        <li className={`p-4 rounded border ${docs.docContract ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
          <div className="font-semibold">수출계약서 (DOC-CONTRACT)</div>
          {!docs.docContract && <div className="text-sm text-blue-500">* '가' 지역 수출로 인해 법적으로 면제되었습니다.</div>}
        </li>
        <li className={`p-4 rounded border ${docs.docEndUser ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
          <div className="font-semibold">최종사용자 서약서 (DOC-ENDUSER)</div>
          {!docs.docEndUser && <div className="text-sm text-blue-500">* '가' 지역 수출로 인해 법적으로 면제되었습니다.</div>}
        </li>
      </ul>

      <button 
        onClick={nextStep}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        다음 단계로
      </button>
    </div>
  );
};

export default Step3DocumentList;
```
