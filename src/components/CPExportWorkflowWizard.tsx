import React, { useState, useEffect } from 'react';
import { ExportCaseState, evaluateScreeningStatus } from '../utils/complianceRuleEngine';
///import { ExportCaseState, evaluateScreeningStatus, validateAndLoadDraft } from '../utils/complianceRuleEngine';///
import { Step1Screening } from './steps/Step1Screening';
import { Step2Classification } from './steps/Step2Classification';
import { Step3DocumentList } from './steps/Step3DocumentList';
import { Step4ReleaseApproval } from './steps/Step4ReleaseApproval';
import { Save, FolderOpen, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const INITIAL_STATE: ExportCaseState = {
  id: 'POP-2026-EX-0042',
  updatedAt: new Date().toISOString(),
  status: 'DRAFT',
  salesManagerId: 'SALES_001',
  complianceManagerId: 'COMP_001', // set equal to SALES_001 to test conflict of interest warning
  parties: {
    buyer: { name: '', address: '', country: '' },
    ultimateConsignee: { name: '', address: '', country: '' },
    endUser: { name: '', address: '', country: '' },
    agent: { name: '', address: '', country: '' }
  },
  screening: {
    cslApiHit: false,
    yesTradeManualChecked: false,
    hasRedFlags: false,
    selectedRedFlags: []
  },
  documents: {},
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
  },
  destination: {
    countryCode: '',
    isGroupA: false,
    isSanctionedCountry: false
  },
  transaction: {
    isITT: false,
    isComponent: false,
    isCP_AA: true,
    isLicenseExempt: false,
    isRussiaBelarus: false,
    isPreReportChosen: false,
    isPostReportChosen: false,
    isImport: false
  }
};

interface WizardProps {
  txId?: string;
  onClose?: () => void;
}

export const CPExportWorkflowWizard: React.FC<WizardProps> = ({ txId, onClose }) => {
  const [state, setState] = useState<ExportCaseState>(() => {
    const activeId = txId || 'POP-2026-EX-0042';
    const saved = localStorage.getItem(`draft_${activeId}`);
    if (saved) {
      return JSON.parse(saved);
    }

    // We cannot use require in Vite. We will use static import at the top of the file.
    // Or we can just get data from localStorage directly since store.js saves to localStorage.
    // store.js uses `localStorage.getItem('cp_transactions')`.
    let initial = { ...INITIAL_STATE, id: activeId };
    try {
      const rawTxs = localStorage.getItem('cp_transactions');
      if (rawTxs) {
        const allTxs = JSON.parse(rawTxs);
        const tx = allTxs.find((t: any) => t.id === activeId);
        if (tx) {
          initial.parties.buyer.name = tx.buyer || '';
          initial.parties.buyer.country = tx.country || '';
          initial.destination.countryCode = tx.country || '';
          initial.classification.productName = tx.name || '';
        }
      }

      // Sync form data
      const rawState = localStorage.getItem('cp_state');
      if (rawState) {
        const globalState = JSON.parse(rawState);
        const caseForms = globalState.caseFormData?.[activeId];
        if (caseForms) {
          Object.keys(caseForms).forEach(formId => {
            initial.documents[formId] = {
              id: formId,
              isCompleted: true, // Since it exists in store, assume it has data
              formData: caseForms[formId]
            };
          });
        }
      }
    } catch (e) {
      // safe fallback
    }
    return initial;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Re-evaluate on every render to enforce strict logic blocking
  const { isBlocked } = evaluateScreeningStatus(state.screening, state.destination);

  // [#6] isBlocked ↔ status: STOP_SHIPMENT 자동 동기화
  React.useEffect(() => {
    if (isBlocked && state.status === 'DRAFT') {
      setState(prev => ({ ...prev, status: 'STOP_SHIPMENT', updatedAt: new Date().toISOString() }));
    } else if (!isBlocked && state.status === 'STOP_SHIPMENT') {
      setState(prev => ({ ...prev, status: 'DRAFT', updatedAt: new Date().toISOString() }));
    }
  }, [isBlocked]);

  const saveDraft = () => {
    const newState = { ...state, updatedAt: new Date().toISOString() };
    setState(newState);
    localStorage.setItem(`draft_${state.id}`, JSON.stringify(newState));
    showToast("💾 임시 저장이 완료되었습니다. (Draft Saved)");
  };

  const loadDraft = () => {
    const saved = localStorage.getItem(`draft_${state.id}`);
    if (saved) {
      setState(JSON.parse(saved));
      showToast("📂 임시 저장된 데이터를 불러왔습니다.");
    } else {
      showToast("❌ 저장된 내역이 없습니다.");
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleStepClick = (step: number) => {
    if (isBlocked && step > 1) {
      showToast("⛔ 출하 보류(STOP-SHIPMENT) 상태에서는 다음 단계로 이동할 수 없습니다.");
      return;
    }
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 4) handleStepClick(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitFinal = () => {
    if (isBlocked) {
      showToast("⛔ 출하 보류(STOP-SHIPMENT) 상태입니다. 승인이 불가합니다.");
      return;
    }
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <CheckCircle className="w-24 h-24 text-emerald-500 mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Export Approved & License Dispatched</h1>
        <p className="text-slate-600 mb-8 font-medium">성공적으로 허가 및 출하 승인이 완료되었습니다. 연계 서류가 정부 포털로 전송됩니다.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-bold transition-colors"
        >
          새로운 수출 건 작성 (New Export Case)
        </button>
      </div>
    );
  }

  const stepInfo = [
    { num: 1, title: "1. 위험 인물/국가 필터링", short: "스크리닝", desc: "우려거래자 및 제재국가 차단" },
    { num: 2, title: "2. 무기류(전략물자) 판독", short: "품목판정", desc: "품목 및 상황허가 대상 식별" },
    { num: 3, title: "3. 결과 맞춤 필수 서류 작성", short: "서류작성", desc: "분기된 트랙에 따른 자동 렌더링" },
    { num: 4, title: "4. 최종 출하 승인", short: "최종승인", desc: "출하 허가 및 법정 대장 기록" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pb-24 relative">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            CP 수출 심사 마법사
          </h1>
          <div className="flex items-center gap-3 mt-1.5 text-xs">
            <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded shadow-sm">거래 ID: {state.id}</span>
            <span className={`px-2 py-0.5 rounded font-bold shadow-sm border ${isBlocked ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
              {isBlocked ? 'STOP-SHIPMENT' : (state.status === 'DRAFT' ? '작성 중 (초안)' : state.status)}
            </span>
            <span className="text-slate-500 font-medium">최종 저장: {new Date(state.updatedAt).toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={loadDraft} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium shadow-sm transition-all">
            <FolderOpen className="w-4 h-4" /> 불러오기
          </button>
          <button onClick={saveDraft} className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-medium shadow-sm transition-all">
            <Save className="w-4 h-4" /> 임시 저장
          </button>
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-4 flex items-center gap-3 font-medium">
          {toastMsg}
        </div>
      )}

      {/* DECISION TREE STEPPER (Journey Map) */}
      <div className="max-w-6xl mx-auto w-full pt-8 px-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            통제 프로세스 진행 현황
          </h2>
          <div className="flex justify-between items-start relative px-4">
            <div className="absolute left-10 right-10 top-6 h-1 bg-slate-100 -z-10 rounded-full">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
            </div>
            {stepInfo.map((step, index) => {
              const stepNum = step.num;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              const isDisabled = isBlocked && stepNum > 1;

              return (
                <div
                  key={stepNum}
                  onClick={() => handleStepClick(stepNum)}
                  className={`flex flex-col items-center cursor-pointer transition-all w-48 group ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-300 relative bg-white z-10 ${isActive ? 'border-indigo-500 text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-110' :
                    isCompleted ? 'border-indigo-500 bg-indigo-50 text-indigo-600' :
                      'border-slate-200 text-slate-300 group-hover:border-slate-300'
                    }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : stepNum}
                  </div>
                  <div className={`mt-4 flex flex-col items-center text-center transition-all duration-300 ${isActive ? 'translate-y-1' : ''}`}>
                    <span className={`text-sm font-bold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
                      {isActive ? step.title : step.short}
                    </span>
                    <span className={`text-xs mt-1 max-w-[120px] ${isActive ? 'text-indigo-500 font-medium' : 'text-slate-400 hidden group-hover:block'}`}>
                      {step.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {currentStep === 1 && <Step1Screening state={state} onChange={setState} />}
          {currentStep === 2 && <Step2Classification state={state} onChange={setState} />}
          {currentStep === 3 && <Step3DocumentList state={state} onChange={setState} />}
          {currentStep === 4 && <Step4ReleaseApproval state={state} onChange={setState} />}
        </main>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 px-8 flex justify-between items-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-40">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 이전
        </button>

        <div className="flex gap-4">
          <button onClick={saveDraft} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
            <Save className="w-4 h-4 text-slate-500" /> 임시 저장 (Draft)
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={isBlocked}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold transition-all shadow-sm ${isBlocked
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
                }`}
            >
              다음 단계 <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submitFinal}
              className="flex items-center gap-2 px-10 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-5 h-5" /> 최종 승인 및 제출
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
