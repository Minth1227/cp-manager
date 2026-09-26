import sys

with open('src/components/steps/Step1Screening.tsx', 'r') as f:
    content = f.read()

# I want to replace the whole bottom section starting from "{isBlocked && ("
# Wait, I can just rewrite the whole file using a python script.

new_content = """import React from 'react';
import { ExportCaseState, evaluateScreeningStatus } from '../../utils/complianceRuleEngine';
import { AlertTriangle, ShieldAlert, CheckCircle, Search, FileText, Upload, Lock, Unlock, XCircle } from 'lucide-react';

interface Props {
  state: ExportCaseState;
  onChange: (newState: ExportCaseState) => void;
}

const RED_FLAGS_LIST = [
  "1. 고객이 제품의 최종용도에 대한 정보 제공을 회피하거나 거부함",
  "2. 고객의 비즈니스 분야가 주문한 품목과 전혀 일치하지 않음",
  "3. 비정상적으로 유리한 조건(현찰 박치기 등)을 제시함",
  "4. 제품의 성능/스펙에 대해 비정상적일 정도로 무지함",
  "5. 화물 배송을 이례적인 우회 경로로 요청함",
  "6. 최종 목적지나 최종사용자가 불명확함"
];

export const Step1Screening: React.FC<Props> = ({ state, onChange }) => {
  const { parties, screening } = state;
  const { isBlocked } = evaluateScreeningStatus(screening);

  const handlePartyChange = (role: keyof ExportCaseState['parties'], field: string, value: string) => {
    onChange({
      ...state,
      parties: { ...parties, [role]: { ...parties[role], [field]: value } }
    });
  };

  const handleScreeningChange = (field: keyof ExportCaseState['screening'], value: any) => {
    onChange({
      ...state,
      screening: { ...screening, [field]: value }
    });
  };

  const handleRedFlagToggle = (flag: string) => {
    const newFlags = screening.selectedRedFlags.includes(flag)
      ? screening.selectedRedFlags.filter(f => f !== flag)
      : [...screening.selectedRedFlags, flag];
    
    onChange({
      ...state,
      screening: {
        ...screening,
        selectedRedFlags: newFlags,
        hasRedFlags: newFlags.length > 0
      }
    });
  };

  const handleSaveToRegister = (type: 'CANCEL' | 'REPORT') => {
    // Mock save logic
    const record = { date: new Date().toISOString(), buyer: parties.buyer.name, reason: screening.selectedRedFlags.join(', ') };
    if (type === 'CANCEL') {
      onChange({
        ...state,
        g02Register: [...(state.g02Register || []), record],
        g04Register: [...(state.g04Register || []), record],
        status: 'REVOKED'
      });
      alert('G-02 및 G-04 대장에 이력이 5년간 영구 보존 등록되었으며 거래가 최종 중단/거절되었습니다.');
    } else {
      onChange({
        ...state,
        g04Register: [...(state.g04Register || []), record]
      });
      alert('G-04 절차중단 내부보고서가 발행되어 대표이사(CEO)에게 자동 보고되었습니다.');
    }
  };

  return (
    <div className="p-6 space-y-8 bg-white rounded-xl shadow-sm relative">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-indigo-500" />
          1단계: 1차 사전 스크리닝 대시보드
        </h2>
        <p className="text-sm text-slate-500 mb-6">영업/마케팅 접수 직후 가장 빠르게 우려거래자를 필터링하는 전용 워크스페이스입니다.</p>
        
        {/* Parties Input Grid */}
        <div className="grid grid-cols-2 gap-4">
          {(['buyer', 'ultimateConsignee', 'endUser', 'agent'] as const).map(role => (
            <div key={role} className="border p-4 rounded-lg bg-slate-50">
              <h3 className="font-semibold text-sm capitalize mb-3 text-slate-700">{role.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <div className="space-y-2">
                <input 
                  type="text" placeholder="Name" 
                  className="w-full text-sm border-gray-300 rounded-md"
                  value={parties[role].name}
                  onChange={e => handlePartyChange(role, 'name', e.target.value)}
                />
                <input 
                  type="text" placeholder="Country Code" 
                  className="w-full text-sm border-gray-300 rounded-md"
                  value={parties[role].country}
                  onChange={e => handlePartyChange(role, 'country', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Destination Group A Option */}
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 mt-4">
          <label className="flex items-center gap-2 text-sm text-blue-900 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              className="rounded text-blue-600 focus:ring-blue-500"
              checked={state.destination.isGroupA}
              onChange={e => onChange({
                ...state,
                destination: { ...state.destination, isGroupA: e.target.checked }
              })}
            />
            목적국이 '가' 지역 (Group A, 예: 미국, 일본, 영국 등) 입니까?
          </label>
        </div>
      </div>

      {/* Hybrid Screening Section */}
      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">하이브리드 스크리닝 (Hybrid Screening)</h3>
        
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => handleScreeningChange('cslApiHit', !screening.cslApiHit)}
            className={`px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors ${screening.cslApiHit ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
          >
            {screening.cslApiHit ? <ShieldAlert className="w-4 h-4"/> : <Search className="w-4 h-4"/>}
            US CSL API 일괄 검색 (Toggle)
          </button>
          
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded text-indigo-600 focus:ring-indigo-500"
              checked={screening.yesTradeManualChecked}
              onChange={e => handleScreeningChange('yesTradeManualChecked', e.target.checked)}
            />
            Verified against ROK YesTrade DPL Database
          </label>
        </div>

        {/* WMD Red Flags */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">WMD Red Flags (의심 징후 체크박스)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {RED_FLAGS_LIST.map(flag => (
              <label key={flag} className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer bg-white p-2 border rounded hover:bg-slate-50">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded text-amber-500 focus:ring-amber-500"
                  checked={screening.selectedRedFlags.includes(flag)}
                  onChange={() => handleRedFlagToggle(flag)}
                />
                <span className="leading-tight">{flag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Blocked Modal (5-Step Pipeline) */}
      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-red-600 p-5 text-white flex items-center gap-3">
              <Lock className="w-7 h-7" />
              <div>
                <h3 className="font-bold text-xl leading-tight">1차 스크리닝 보류 (STOP-SHIPMENT 발동)</h3>
                <p className="text-red-100 text-sm mt-1">우려거래자 일치 또는 의심징후가 포착되어 거래가 중단되었습니다. 실무 대응 파이프라인을 선택하세요.</p>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Option 1: Report */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${screening.stopShipmentChoice === 'REPORT' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => handleScreeningChange('stopShipmentChoice', 'REPORT')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500"/> [보고] G-04 절차중단 및 내부보고서 발행</h4>
                  <input type="radio" checked={screening.stopShipmentChoice === 'REPORT'} readOnly className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-slate-600 ml-7">대표이사(CEO) 및 CP관리자에게 즉각 보고 모듈을 가동합니다.</p>
                {screening.stopShipmentChoice === 'REPORT' && (
                  <div className="mt-4 ml-7">
                    <button onClick={() => handleSaveToRegister('REPORT')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">보고서 발행 및 대장 저장</button>
                  </div>
                )}
              </div>

              {/* Option 2: Due Diligence */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${screening.stopShipmentChoice === 'DUE_DILIGENCE' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                onClick={() => handleScreeningChange('stopShipmentChoice', 'DUE_DILIGENCE')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Search className="w-5 h-5 text-amber-500"/> [소명] 소명자료 요구 (Due Diligence)</h4>
                  <input type="radio" checked={screening.stopShipmentChoice === 'DUE_DILIGENCE'} readOnly className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm text-slate-600 ml-7">최종사용자서약서(EUC), 회사소개서 등 추가 증빙을 요구합니다.</p>
                {screening.stopShipmentChoice === 'DUE_DILIGENCE' && (
                  <div className="mt-4 ml-7 bg-white p-4 rounded border border-amber-200 space-y-3">
                    <div className="border-2 border-dashed border-amber-300 p-4 text-center rounded-md bg-amber-50/50">
                      <Upload className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <p className="text-xs text-amber-700">여기를 클릭하여 수령한 EUC 파일을 업로드하세요.</p>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-amber-100">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleScreeningChange('isDueDiligenceApproved', true); }}
                        className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 shadow-sm flex items-center gap-2"
                      >
                        <Unlock className="w-4 h-4"/> [관리자] 소명 승인 및 Un-lock
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Catch-All */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${screening.stopShipmentChoice === 'CATCH_ALL' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                onClick={() => handleScreeningChange('stopShipmentChoice', 'CATCH_ALL')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-purple-500"/> [상황허가] 정부 상황허가 신청 진행</h4>
                  <input type="radio" checked={screening.stopShipmentChoice === 'CATCH_ALL'} readOnly className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm text-slate-600 ml-7">3단계 상황허가 패키지(L-03)를 가동하기 위해 대기합니다.</p>
                {screening.stopShipmentChoice === 'CATCH_ALL' && (
                  <div className="mt-4 ml-7">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleScreeningChange('isCatchAllApproved', true); }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 shadow-sm flex items-center gap-2"
                    >
                      <Unlock className="w-4 h-4"/> 정부 승인 완료 (강제 Un-lock)
                    </button>
                  </div>
                )}
              </div>

              {/* Option 4: Cancel */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${screening.stopShipmentChoice === 'CANCEL' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                onClick={() => handleScreeningChange('stopShipmentChoice', 'CANCEL')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500"/> [거절] 계약 파기 및 거래 거절</h4>
                  <input type="radio" checked={screening.stopShipmentChoice === 'CANCEL'} readOnly className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm text-slate-600 ml-7">G-02 우려거래자 대장에 저장 후 5년간 보존하며 거래를 즉시 킬(Kill)합니다.</p>
                {screening.stopShipmentChoice === 'CANCEL' && (
                  <div className="mt-4 ml-7">
                    <button onClick={() => handleSaveToRegister('CANCEL')} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 shadow-sm">G-02 대장 저장 및 최종 종료</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
"""

with open('src/components/steps/Step1Screening.tsx', 'w') as f:
    f.write(new_content)

