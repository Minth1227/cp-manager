import React, { useState } from 'react';
import { ExportCaseState, getEnabledDocuments, DocumentConfig, stateToFormData, computeEccn } from '../../utils/complianceRuleEngine';
import { FileStack, CheckCircle2, Lock, FileText, ChevronRight, Folder } from 'lucide-react';
import { DynamicFormModal } from '../DynamicFormModal';

interface Props {
  state: ExportCaseState;
  onChange: (newState: ExportCaseState) => void;
}

export const Step3DocumentList: React.FC<Props> = ({ state, onChange }) => {
  const docs = getEnabledDocuments(state);
  const enabledDocs = docs.filter(d => d.enabled);
  // [#7] 서류 간 이전/다음 내비게이션 상태
  const [activeDocIndex, setActiveDocIndex] = React.useState<number | null>(null);
  const [modalFormId, setModalFormId] = React.useState<string | null>(null);

  const handleSaveForm = (formId: string, formData: any) => {
    // G-01 저장 시: 계약 정보(transaction)를 state에 자동 동기화 (K-01, L-01 Auto-fill 용)
    const transactionPatch = formId === 'G-01' ? {
      exportAmountUSD: formData.exportAmountUSD || state.transaction.exportAmountUSD,
      exportQuantity: formData.exportQuantity || state.transaction.exportQuantity,
      contractNo: formData.exportContractNo || state.transaction.contractNo,
      plannedExportDate: formData.plannedExportDate || state.transaction.plannedExportDate,
    } : {};

    // Z-01 확정 모드: 4개 단계 데이터 전체 동기화
    const z01Patch: Partial<ExportCaseState> = {};
    if (formId === 'Z-01' && formData.zeroOneMode?.includes('확정')) {
      // 1. Parties 동기화
      if (formData.q0_buyer) {
        z01Patch.parties = {
          ...state.parties,
          buyer: { name: formData.q0_buyer, country: formData.q0_buyer_country || '', address: '' },
          ultimateConsignee: { name: formData.q0_consignee || state.parties.ultimateConsignee.name, country: '', address: '' },
          endUser: { name: formData.q0_end_user || state.parties.endUser.name, country: '', address: '' },
          agent: { name: formData.q0_agent || state.parties.agent?.name || '', country: '', address: '' },
        };
      }
      // 2. Destination 동기화 (Z-01의 q_country → destination)
      if (formData.q_country) {
        const { resolveDestination } = require('../../utils/complianceRuleEngine');
        z01Patch.destination = resolveDestination(formData.q_country);
      }
      // 3. Classification 동기화 (Z-01의 q_strategic, Q1~Q4 결과)
      if (formData.q_strategic !== undefined) {
        z01Patch.classification = {
          ...state.classification,
          classificationType: formData.q_strategic === '해당' ? 'SELF' : state.classification.classificationType,
        };
      }
      // 4. Transaction 동기화
      z01Patch.transaction = {
        ...state.transaction,
        isITT: formData.q0_transfer_type?.includes('무형') ?? state.transaction.isITT,
        isImport: formData.q0_type === '수입',
        isLicenseExempt: formData.q_exempt === '예',
      };
    }

    // 1. Update React Wizard State
    onChange({
      ...state,
      ...z01Patch,
      transaction: { ...state.transaction, ...transactionPatch, ...(z01Patch.transaction || {}) },
      documents: {
        ...state.documents,
        [formId]: {
          ...state.documents[formId],
          isCompleted: true,
          formData
        }
      }
    });

    // 2. Sync with Legacy Vanilla JS System
    import('../../store.js').then((store) => {
      if (store && typeof store.setCaseFormData === 'function') {
        store.setCaseFormData(formId, state.id, formData);
      }
    }).catch(err => console.error("Legacy store sync failed:", err));

    setModalFormId(null);
  };


  // Group docs by package
  const groupedDocs: Record<string, DocumentConfig[]> = {};
  docs.forEach(doc => {
    const pkgName = doc.package || '기타 서류';
    if (!groupedDocs[pkgName]) {
      groupedDocs[pkgName] = [];
    }
    groupedDocs[pkgName].push(doc);
  });

  const { computedEccn } = computeEccn(state.classification);
  const trackName = computedEccn !== 'NON_CONTROLLED' ? '개별수출허가 패키지' : 
                   (state.screening.hasRedFlags && !state.destination.isGroupA) ? '상황허가(Catch-All) 패키지' : 
                   '일반 수출 (서류 면제) 트랙';

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-sm border border-slate-100">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <FileStack className="w-7 h-7 text-indigo-300" />
          3단계: 🎯 현재 진행 트랙 [ {trackName} ]
        </h2>
        <p className="text-indigo-100 font-medium">
          📝 목적: 앞선 검증 결과에 따라 시스템이 자동으로 배정한 필수 서류만을 순서대로 작성하는 단계입니다.
        </p>
      </div>

      {/* Progress Flow UI */}
      {enabledDocs.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-4">서류 작성 및 첨부 진행 순서</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {enabledDocs.map((doc, idx) => (
              <React.Fragment key={doc.id}>
                <div className="flex flex-col items-center justify-center p-3 bg-white border-2 border-indigo-200 rounded-lg min-w-[120px] shadow-sm">
                  <span className="text-xs font-bold text-indigo-500 mb-1">{idx + 1}순위</span>
                  <span className="text-sm font-bold text-slate-700">{doc.id} 작성</span>
                </div>
                {idx < enabledDocs.length - 1 && <ChevronRight className="w-5 h-5 text-slate-300" />}
              </React.Fragment>
            ))}
            
            {/* 항상 마지막엔 증빙 첨부 */}
            {groupedDocs['상황허가 패키지'] && (
              <>
                <ChevronRight className="w-5 h-5 text-slate-300" />
                <div className="flex flex-col items-center justify-center p-3 bg-indigo-50 border-2 border-indigo-500 rounded-lg min-w-[120px] shadow-sm">
                  <span className="text-xs font-bold text-indigo-500 mb-1">마지막</span>
                  <span className="text-sm font-bold text-indigo-700 flex items-center gap-1"><Folder className="w-4 h-4"/> 증빙 트리 업로드</span>
                </div>
              </>
            )}
            
            <ChevronRight className="w-5 h-5 text-slate-300" />
            <div className="flex flex-col items-center justify-center p-3 bg-emerald-50 border-2 border-emerald-500 rounded-lg min-w-[80px] shadow-sm">
              <span className="text-sm font-bold text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> 완료!</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(groupedDocs).map(([pkgName, pkgDocs]) => (
          <div key={pkgName} className="space-y-3">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Folder className="w-5 h-5 text-indigo-400" />
              {pkgName}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {pkgDocs.map((doc) => {
                if (doc.enabled) {
                  return (
                    <div
                      key={doc.id}
                      className={`group flex items-center justify-between p-4 bg-white border-2 rounded-lg shadow-sm hover:shadow-md transition-all ${activeDocIndex === enabledDocs.indexOf(doc) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-emerald-500'}`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-emerald-600 block">{doc.id}</span>
                            {pkgName === '상황허가 패키지' && (
                              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">Catch-All 연동</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-800">{doc.name}</h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* PDF Download Button for specific forms */}
                        {['L-01', 'L-02', 'L-03', 'L-04', 'F-01', 'F-02', 'J-01', 'J-02'].includes(doc.id) && (
                          <button
                            onClick={() => {
                              alert(`[${doc.id}] 원본 PDF에 작성된 데이터를 매핑하여 다운로드를 시작합니다.`);
                            }}
                            className="flex items-center gap-1 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-md transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            PDF 양식 다운로드
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            const idx = enabledDocs.indexOf(doc);
                            setActiveDocIndex(idx);
                            setModalFormId(doc.id);
                          }}
                          className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-md transition-colors"
                        >
                          작성하기 (Auto-fill)
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={doc.id} className="flex flex-col p-4 bg-slate-50 border border-slate-200 rounded-lg opacity-75 relative group cursor-not-allowed">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-200 p-1.5 rounded-full">
                            <Lock className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-400 mb-1 block">{doc.id}</span>
                            <h3 className="font-medium text-slate-500 line-through decoration-slate-300">{doc.name}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-400 px-3 py-1 bg-slate-100 rounded-md">
                          제출 면제 (Disabled)
                        </span>
                      </div>
                      {/* 비활성화 사유 항상 표시 (hover 불필요) */}
                      {doc.disabledReason && (
                        <p className="text-xs text-slate-400 mt-2 ml-9 leading-snug">
                          Ὤ8 {doc.disabledReason}
                        </p>
                      )}
                    </div>
                  );
                }
              })}

              {/* Catch-All Attachment Tree */}
              {pkgName === '상황허가 패키지' && pkgDocs.some(d => d.enabled) && (
                <div className="mt-4 border border-indigo-100 bg-indigo-50/30 rounded-lg p-5">
                  <h4 className="font-bold text-sm text-indigo-800 mb-3 flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    📁 상황허가 부속 증빙서류 관리 (Attachment Tree)
                  </h4>
                  <p className="text-xs text-indigo-600 mb-4 ml-6">
                    기존 서식(L-05~L-09, L-11)을 대체하는 통합 첨부파일 폴더입니다. 해당하는 증빙 파일을 업로드해 주세요.
                  </p>
                  
                  <div className="space-y-3 ml-6 font-mono text-sm text-slate-700 border-l-2 border-indigo-200 pl-4">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-300">├─</span>
                        <span>📄 수입자/최종사용자 회사소개서 (브로셔 등)</span>
                      </div>
                      <button className="text-xs bg-white border border-slate-300 px-2 py-1 rounded shadow-sm hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        + 파일 추가
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-300">├─</span>
                        <span>📄 수출물품 상세정보 및 카탈로그 (사양서, 도면 등)</span>
                      </div>
                      <button className="text-xs bg-white border border-slate-300 px-2 py-1 rounded shadow-sm hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        + 파일 추가
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-300">├─</span>
                        <span>📄 군용전용 불가 입증 서류 (기술검토 요약 이메일 등)</span>
                      </div>
                      <button className="text-xs bg-white border border-slate-300 px-2 py-1 rounded shadow-sm hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        + 파일 추가
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-300">└─</span>
                        <span>📄 기타 필수 증빙 (수출계약서, 영업증명서 스캔본 등)</span>
                      </div>
                      <button className="text-xs bg-white border border-slate-300 px-2 py-1 rounded shadow-sm hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        + 파일 추가
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2">
          <FileText className="w-4 h-4" />
          전체 서류 패키지 생성 (PDF)
        </button>
      </div>

      {/* [#7] 서류 간 이전/다음 내비게이션 바 */}
      {activeDocIndex !== null && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white shadow-2xl rounded-full px-6 py-3 border border-slate-200 z-30">
          <button
            disabled={activeDocIndex === 0}
            onClick={() => setActiveDocIndex(i => Math.max(0, (i ?? 1) - 1))}
            className="px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 disabled:opacity-30 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            ← {activeDocIndex > 0 ? enabledDocs[activeDocIndex - 1]?.id : '처음'}
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400 font-medium">현재 서류</span>
            <span className="text-sm font-bold text-indigo-700">{enabledDocs[activeDocIndex]?.id}</span>
            <span className="text-[10px] text-slate-400">{activeDocIndex + 1} / {enabledDocs.length}</span>
          </div>
          <button
            disabled={activeDocIndex === enabledDocs.length - 1}
            onClick={() => setActiveDocIndex(i => Math.min(enabledDocs.length - 1, (i ?? 0) + 1))}
            className="px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 disabled:opacity-30 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            {activeDocIndex < enabledDocs.length - 1 ? enabledDocs[activeDocIndex + 1]?.id : '마지막'} →
          </button>
        </div>
      )}

      {/* 🚀 Dynamic Form Modal Render */}
      {modalFormId && (
        <DynamicFormModal
          formId={modalFormId}
          state={state}
          onClose={() => setModalFormId(null)}
          onSave={handleSaveForm}
        />
      )}
    </div>
  );
};
