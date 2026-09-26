import React from 'react';
import { ExportCaseState, evaluateScreeningStatus, resolveDestination } from '../../utils/complianceRuleEngine';
import { regionLabel } from '../../utils/legalBasis';
import { DESTINATION_COUNTRIES } from '../../utils/countryList';
import { AlertTriangle, ShieldAlert, CheckCircle, Search, FileText, Upload, Lock, Unlock, XCircle } from 'lucide-react';

interface Props {
  state: ExportCaseState;
  onChange: (newState: ExportCaseState) => void;
}

const RED_FLAGS_LIST = [
  "1. 고객이 제품의 최종용도에 대한 정보 제공을 회피하거나 거부함",
  "2. 고객의 비즈니스 분야가 주문한 품목과 전혀 일치하지 않음",
  "3. 비정상적으로 유리한 조건(현찰 박치기, 가격 흥정 포기 등)을 제시함",
  "4. 제품의 성능/스펙에 대해 비정상일 정도로 무지함",
  "5. 화물 배송을 이례적인 우회 경로나 제3국 경유로 요청함",
  "6. 최종 목적지나 최종사용자(End-User)가 불명확함",
  "7. 포장 방법이나 라벨링을 변경해 달라고 요청함 (위장 적재 의심)",
  "8. 군사용 사용 여부를 묻는 질문에 이상하게 민감하게 반응함",
  "9. 고객의 국가와 관련 없는 제3국으로의 배송을 요청함",
  "10. 제품을 분해 또는 역설계하지 않겠다는 확약을 거부함",
  "11. 유사 품목을 취급하는 국내 딜러/대리점을 우회하여 직접 구매를 요청함",
  "12. 납기를 비정상적으로 촉박하게 요구하거나 검품/검수를 거부함",
];

const ROLE_NAMES: Record<string, string> = {
  buyer: '구매자 (Buyer)',
  ultimateConsignee: '최종수하인 (Ultimate Consignee)',
  endUser: '최종사용자 (End User)',
  agent: '대리인 (Agent)'
};

export const Step1Screening: React.FC<Props> = ({ state, onChange }) => {
  const { parties, screening } = state;
  // [#5] destination을 전달하여 제재국 블록도 함께 평가
  const { isBlocked, hasRisk } = evaluateScreeningStatus(screening, state.destination);

  const [isScanning, setIsScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<'NONE' | 'SAFE' | 'HIT'>('NONE');

  const handlePartyChange = (role: keyof ExportCaseState['parties'], field: string, value: string) => {
    onChange({
      ...state,
      parties: { ...parties, [role]: { ...parties[role], [field]: value } }
    });
    setScanResult('NONE'); // Reset scan result if party data changes
  };

  const handleRunCslScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanResult('NONE');
    
    // API Call Simulation
    setTimeout(() => {
      setIsScanning(false);
      // Determine if it's a hit. (Check all party names for suspicious keywords)
      const allNames = Object.values(parties).map(p => p.name.toLowerCase());
      const hasHit = allNames.some(name => name.includes('제재') || name.includes('우려') || name.includes('blacklist') || name.includes('terror'));
      
      if (hasHit) {
        setScanResult('HIT');
        handleScreeningChange('cslApiHit', true);
      } else {
        setScanResult('SAFE');
        handleScreeningChange('cslApiHit', false);
      }
    }, 1500);
  };

  // [별표 6] 수출지역 구분은 legalBasis.ts 단일 원천으로 판단한다.
  // (종전: countryList의 B2 그룹에 나의1·나의2가 섞여 중국·베트남 등 나의1 국가까지 "제재국"으로 차단됨)
  const handleDestinationChange = (name: string) => {
    onChange({
      ...state,
      destination: resolveDestination(name)
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Search className="w-7 h-7 text-indigo-300" />
          1단계: 위험 인물/국가 필터링 (사전 스크리닝)
        </h2>
        <p className="text-indigo-100 font-medium">
          🎯 목적: 거래 상대방이 블랙리스트에 등재된 우려거래자인지, 목적국이 제재국가인지 가장 먼저 걸러내는 단계입니다.
        </p>
      </div>
      
      <div>
        {/* Parties Input Grid */}
        <div className="grid grid-cols-2 gap-4">
          {(['buyer', 'ultimateConsignee', 'endUser', 'agent'] as const).map(role => (
            <div key={role} className="border p-4 rounded-lg bg-slate-50 shadow-sm">
              <h3 className="font-bold text-sm text-slate-700 mb-3">{ROLE_NAMES[role]}</h3>
              <div className="space-y-2">
                <input 
                  type="text" placeholder="상호명(이름)" 
                  className="w-full text-sm border-gray-300 rounded-md p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  value={parties[role].name}
                  onChange={e => handlePartyChange(role, 'name', e.target.value)}
                />
                <input 
                  type="text" placeholder="국가명 (예: 미국, 베트남)" 
                  className="w-full text-sm border-gray-300 rounded-md p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                  value={parties[role].country}
                  onChange={e => handlePartyChange(role, 'country', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Destination Country Smart Dropdown */}
        <div className="mt-6 p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            🌍 수출 목적국 (Destination)
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            최종적으로 물품이 도착하여 사용될 국가를 선택해주세요. 국가 통제 등급에 따라 허가 요건이 자동으로 판별됩니다.
          </p>
          <div className="flex flex-col gap-3">
            <input
              list="country-list"
              placeholder="국가명을 직접 입력하거나 선택하세요 (예: 미국)"
              className="w-full md:w-1/2 p-2.5 border border-gray-300 rounded-lg bg-white shadow-sm font-medium text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
              value={state.destination.countryCode}
              onChange={e => handleDestinationChange(e.target.value)}
            />
            <datalist id="country-list">
              {DESTINATION_COUNTRIES.map(c => (
                <option key={c.name} value={c.name} />
              ))}
            </datalist>

            {/* Smart Feedback Panel */}
            {state.destination.countryCode && (
              <div className={`p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                state.destination.isSanctionedCountry ? 'bg-red-50 border border-red-200' :
                state.destination.isGroupA ? 'bg-blue-50 border border-blue-200' :
                'bg-emerald-50 border border-emerald-200'
              }`}>
                {state.destination.isSanctionedCountry ? (
                  <span className="text-red-600 text-lg mt-0.5">⛔</span>
                ) : state.destination.isGroupA ? (
                  <span className="text-blue-600 text-lg mt-0.5">ℹ️</span>
                ) : (
                  <span className="text-emerald-600 text-lg mt-0.5">✅</span>
                )}
                
                <div>
                  <h4 className={`font-bold text-sm ${
                    state.destination.isSanctionedCountry ? 'text-red-800' :
                    state.destination.isGroupA ? 'text-blue-800' :
                    'text-emerald-800'
                  }`}>
                    해당 목적국은 [별표 6] {regionLabel(state.destination.region || (state.destination.isGroupA ? 'A' : state.destination.isSanctionedCountry ? 'B2' : 'B1'))}입니다.
                  </h4>
                  <p className={`text-xs mt-1 ${
                    state.destination.isSanctionedCountry ? 'text-red-700' :
                    state.destination.isGroupA ? 'text-blue-700' :
                    'text-emerald-700'
                  }`}>
                    {state.destination.isSanctionedCountry && "나의2 지역은 서류면제·허가면제가 제한됩니다([별표 6] 제3호 등). 사내 기준에 따라 거래를 보류(STOP-SHIPMENT)하고 자율수출관리기구가 검토합니다."}
                    {state.destination.isGroupA && "'가' 지역입니다. 물품(기술 제외)을 수출하는 경우 일부 허가 신청서류가 면제됩니다(고시 제21조①). 판정·우려거래자 확인은 그대로 필요합니다."}
                    {!state.destination.isGroupA && !state.destination.isSanctionedCountry && '나의1 지역입니다. 전략물자 해당 여부와 의심징후에 따라 개별허가 또는 상황허가가 필요할 수 있습니다.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hybrid Screening Section */}
      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mt-6">
        <h3 className="font-semibold text-slate-800 mb-4">하이브리드 스크리닝 (Hybrid Screening)</h3>
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleRunCslScan}
              disabled={isScanning}
              className={`w-fit px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm ${
                isScanning ? 'bg-indigo-50 text-indigo-500 border border-indigo-200 cursor-not-allowed' :
                scanResult === 'HIT' || screening.cslApiHit ? 'bg-red-100 text-red-700 border border-red-300' :
                scanResult === 'SAFE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                'bg-white border border-indigo-300 hover:bg-indigo-50 text-indigo-700'
              }`}
            >
              {isScanning ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent" />
              ) : scanResult === 'HIT' || screening.cslApiHit ? (
                <ShieldAlert className="w-4 h-4"/>
              ) : scanResult === 'SAFE' ? (
                <CheckCircle className="w-4 h-4"/>
              ) : (
                <Search className="w-4 h-4"/>
              )}
              
              {isScanning ? '(모의) 키워드 점검 중...' : 
               scanResult === 'HIT' || screening.cslApiHit ? '(모의) 위험 키워드 발견 — 보류' :
               scanResult === 'SAFE' ? '(모의) 위험 키워드 없음 — 실제 조회를 대체하지 않음' :
               '(모의) 상호명 위험 키워드 점검'}
            </button>
            <p className="text-xs text-slate-500">
              * 이 버튼은 실제 미국 CSL API를 조회하지 않는 <strong>모의 기능</strong>입니다 (상호명에 '제재', '우려' 등 키워드가 있으면 보류). 우려거래자 확인은 반드시 아래 YESTRADE 조회로 하십시오.
            </p>
          </div>
          
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer w-fit bg-white p-2 border border-gray-300 rounded hover:bg-gray-50">
            <input 
              type="checkbox" 
              className="rounded text-indigo-600 focus:ring-indigo-500"
              checked={screening.yesTradeManualChecked}
              onChange={e => onChange({
                ...state,
                screening: {
                  ...screening,
                  yesTradeManualChecked: e.target.checked,
                  yesTradeCheckedAt: e.target.checked ? new Date().toISOString() : undefined
                }
              })}
            />
            [필수] YESTRADE 우려거래자 조회 완료 — 구매자·최종수하인·최종사용자·대리인 전원 (조회 화면은 우려거래자 스크리닝 대장에 첨부)
            {screening.yesTradeCheckedAt && <span className="text-xs text-slate-400 ml-2">조회 기록: {new Date(screening.yesTradeCheckedAt).toLocaleString()}</span>}
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

      {/* Blocked Inline Panel (5-Step Pipeline) */}
      {isBlocked && (
        <div className="mt-8 bg-white border-2 border-red-500 rounded-xl shadow-lg overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          <div className="bg-red-600 p-5 text-white flex items-center gap-3">
            <Lock className="w-7 h-7" />
            <div>
              <h3 className="font-bold text-xl leading-tight">1차 스크리닝 보류 (STOP-SHIPMENT 발동)</h3>
              <p className="text-red-100 text-sm mt-1">우려거래자 일치 또는 의심징후가 포착되어 거래가 중단되었습니다. 실무 대응 파이프라인을 선택하세요. (오입력 시 위의 체크박스를 해제하세요)</p>
            </div>
          </div>
          
          <div className="p-6 space-y-4 bg-red-50/30">
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
                  <textarea
                    placeholder="[필수] 소명 검토 의견 — 받은 서류, 확인한 사실, 의심징후가 해소된 근거"
                    className="w-full text-sm p-2 border border-amber-300 rounded-md"
                    rows={3}
                    value={screening.dueDiligenceNote || ''}
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleScreeningChange('dueDiligenceNote', e.target.value)}
                  />
                  <div className="flex justify-end pt-2 border-t border-amber-100">
                    <button 
                      disabled={!(screening.dueDiligenceNote || '').trim()}
                      onClick={(e) => { e.stopPropagation(); handleScreeningChange('isDueDiligenceApproved', true); }}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 shadow-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
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
                <div className="mt-4 ml-7 space-y-2">
                  <input
                    type="text"
                    placeholder="[필수] 상황허가 허가번호"
                    className="w-full md:w-1/2 text-sm p-2 border border-purple-300 rounded-md"
                    value={screening.catchAllLicenseNo || ''}
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleScreeningChange('catchAllLicenseNo', e.target.value)}
                  />
                  <button 
                    disabled={!(screening.catchAllLicenseNo || '').trim()}
                    onClick={(e) => { e.stopPropagation(); handleScreeningChange('isCatchAllApproved', true); }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 shadow-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Unlock className="w-4 h-4"/> 상황허가 취득 확인 (허가번호 기록 후 해제)
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
      )}
    </div>
  );
};
