import React, { useState } from 'react';
import { ExportCaseState, computeEccn, evaluateScreeningStatus } from '../../utils/complianceRuleEngine';
import { Send, AlertTriangle, ShieldCheck, PenTool, XCircle, RefreshCw, FolderOpen, Save } from 'lucide-react';

interface Props {
  state: ExportCaseState;
  onChange: (newState: ExportCaseState) => void;
}

export const Step4ReleaseApproval: React.FC<Props> = ({ state, onChange }) => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const isConflictOfInterest = state.salesManagerId === state.complianceManagerId;
  const { isUsEarSubject } = computeEccn(state.classification);

  const handleOverrideChange = (val: string) => {
    onChange({
      ...state,
      adminOverrideReason: val
    });
  };

  const handleStatusChange = (status: ExportCaseState['status']) => {
    onChange({
      ...state,
      status,
      updatedAt: new Date().toISOString()
    });
  };

  const handleResync = () => {
    // 2차 검토 후 역동기화(Re-sync): 실제로는 바뀐 국가/바이어를 상태에 반영하고 룰 엔진 재구동
    const { isBlocked } = evaluateScreeningStatus(state.screening);
    if (isBlocked) {
      alert("⚠️ [역동기화 결과] 신규 위험이 감지되었습니다. STOP-SHIPMENT가 다시 가동되며 1단계로 강제 회귀합니다.");
      handleStatusChange('STOP_SHIPMENT');
    } else {
      alert("✅ [역동기화 결과] 변경사항이 안전하게 반영되었습니다. 최종 승인을 진행할 수 있습니다.");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Send className="w-6 h-6 text-indigo-500" />
          4단계: 출하 승인 및 H-01 최종 검증
        </h2>

        {/* 2차 출하전 재검토 및 역동기화 패널 */}
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-lg mb-6">
          <h3 className="font-semibold text-sm text-indigo-800 mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            2차 출하전 재검토 및 역동기화 (Re-Sync)
          </h3>
          <p className="text-xs text-indigo-700 mb-4">
            초기 1단계 스크리닝 이후, 바이어의 제재국 지정이나 위험 리스트(CSL) 등재 등 환경 변화가 있었는지 출하 직전에 최종 점검합니다. 
            변경 사항이 있을 경우 아래 버튼을 눌러 상위 스크리닝 데이터로 덮어씌우고(Override) 룰 엔진을 재구동하세요.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleResync}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
            >
              상위 스크리닝 데이터 역동기화 및 재평가
            </button>
          </div>
        </div>

        {/* Stop-Shipment 해제 경로 안내 (STOP_SHIPMENT 상태 시) */}
        {state.status === 'STOP_SHIPMENT' && (
          <div className="mb-6 p-5 bg-red-50 border-2 border-red-300 rounded-xl">
            <h3 className="font-bold text-red-800 text-sm mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              🚨 STOP-SHIPMENT 해제 경로 안내 — 1단계에서 아래 3가지 경로 중 하나를 선택해 처리하십시오.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white border border-amber-300 rounded-lg p-3">
                <p className="font-bold text-amber-800 mb-2">🔍 경로 A: 소명 완료 (Due Diligence)</p>
                <ol className="text-slate-600 space-y-1 list-decimal list-inside">
                  <li>최종사용자 서약서(EUC) 징구</li>
                  <li>1단계 소명 파일 업로드</li>
                  <li>CP 관리자 승인 클릭</li>
                  <li className="text-emerald-700 font-medium">→ 자동 STOP-SHIPMENT 해제</li>
                </ol>
              </div>
              <div className="bg-white border border-purple-300 rounded-lg p-3">
                <p className="font-bold text-purple-800 mb-2">🏛️ 경로 B: 상황허가 취득 (Catch-All)</p>
                <ol className="text-slate-600 space-y-1 list-decimal list-inside">
                  <li>1단계 → [상황허가] 선택</li>
                  <li>3단계에서 L-03 서류 작성</li>
                  <li>정부 심사 승인 후 입력</li>
                  <li className="text-emerald-700 font-medium">→ 자동 STOP-SHIPMENT 해제</li>
                </ol>
              </div>
              <div className="bg-white border border-red-300 rounded-lg p-3">
                <p className="font-bold text-red-800 mb-2">❌ 경로 C: 거래 파기 (Kill)</p>
                <ol className="text-slate-600 space-y-1 list-decimal list-inside">
                  <li>1단계 → [거절] 선택</li>
                  <li>G-02 대장 자동 기록</li>
                  <li>5년간 이력 보존</li>
                  <li className="text-red-700 font-medium">→ 상태: REVOKED (최종 종료)</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* H-01 Checklist Mock */}
        {isUsEarSubject && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-800">미국 상무부(DOC) 수출허가증(License) 확인 필수</h4>
                <p className="text-xs text-red-700 mt-1">
                  이 품목은 US EAR 0% De minimis 규정의 통제를 받는 품목(5D002)입니다. 
                  Must obtain US Dept of Commerce license. H-01 검증 전 미국 정부에서 발급한 라이선스를 확인하십시오.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg mb-6">
          <h3 className="font-semibold text-sm text-slate-700 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            H-01 Cross-Verification Checklist
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded text-indigo-600" />
              수출허가증 원본 상의 품목, 수량, 목적지가 상업송장과 100% 일치합니까?
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded text-indigo-600" />
              배포 방식(무형이전, USB 등)이 보안 규정에 따라 암호화 처리되었습니까?
            </label>
          </div>
        </div>

        {/* G-02 / G-04 대장 (Register) 관리 */}
        <div className="bg-white border-2 border-slate-200 p-5 rounded-lg mb-6 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-600" />
            법정 대장 (Register) 통합 기록 및 파일 첨부
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            대외무역법 규정에 따라 우려거래자 거절/중단 이력과 전략물자 판정 결과를 공식 대장에 기록하고 5년간 보관해야 합니다.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <button 
              onClick={() => {
                const newEntry = { date: new Date().toISOString(), buyer: state.parties.buyer.name, reason: state.screening.stopShipmentChoice || 'Cancel/Report' };
                onChange({ ...state, g02Register: [...(state.g02Register || []), newEntry] });
                alert('G-02 우려거래자 대장에 기록이 추가되었습니다.');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-lg text-sm font-bold transition-colors"
            >
              <PenTool className="w-4 h-4" />
              G-02 우려거래자 거절대장 기록
            </button>
            <button 
              onClick={() => {
                const newEntry = { date: new Date().toISOString(), product: state.classification.productName, eccn: state.classification.computedEccn };
                onChange({ ...state, g04Register: [...(state.g04Register || []), newEntry] });
                alert('G-04 판정대장에 결과가 안전하게 보관되었습니다.');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-bold transition-colors"
            >
              <Save className="w-4 h-4" />
              G-04 판정대장 기록 및 파일 첨부
            </button>
          </div>
          <div className="mt-4 flex gap-4 text-xs font-medium">
            <div className="bg-slate-100 px-3 py-1.5 rounded-md text-slate-600">
              G-02 기록 건수: {state.g02Register?.length || 0}건
            </div>
            <div className="bg-slate-100 px-3 py-1.5 rounded-md text-slate-600">
              G-04 기록 건수: {state.g04Register?.length || 0}건
            </div>
          </div>
        </div>

        {/* Admin Override for Conflict of Interest */}
        {isConflictOfInterest && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-yellow-800">이해상충 주의: 영업 담당자와 자율준수관리자(승인자)가 동일합니다.</h4>
                <p className="text-xs text-yellow-700 mt-1 mb-3">
                  CP 규정 상 기안자와 승인자는 분리되어야 하나, 인력 부족 등 불가피한 사유가 있는 경우 관리자 오버라이드(Admin Override)를 통해 예외 승인이 가능합니다.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-yellow-900 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded text-yellow-600 focus:ring-yellow-500"
                      checked={!!state.adminOverrideReason}
                      onChange={e => handleOverrideChange(e.target.checked ? '예외 승인 진행' : '')}
                    />
                    Admin Override 예외 승인 적용
                  </label>
                  <textarea 
                    placeholder="오버라이드 사유 기재 (예: 야간 당직, 대체 인력 부재 등)"
                    className="w-full text-sm p-2 border border-yellow-300 bg-white rounded-md placeholder-yellow-400 focus:ring-yellow-500 focus:border-yellow-500"
                    rows={2}
                    value={state.adminOverrideReason || ''}
                    onChange={e => handleOverrideChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex-1 flex gap-4 w-full">
            <div className="flex-1 border-b-2 border-slate-300 pb-2 relative">
              <span className="absolute bottom-2 left-0 text-slate-400 text-xs italic">Compliance Manager Signature</span>
              <PenTool className="w-4 h-4 text-slate-300 absolute bottom-2 right-2" />
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => handleStatusChange('DRAFT')}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              임시 저장 (Draft)
            </button>
            <button 
              onClick={() => handleStatusChange('RELEASED')}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              최종 승인 및 배포 완료
            </button>
          </div>
        </div>
      </div>

      {/* Emergency API Trigger */}
      <div className="pt-12 pb-4 flex justify-center">
        <button 
          onClick={() => setIsEmergencyModalOpen(true)}
          className="text-lg font-bold px-10 py-5 bg-red-600 text-white hover:bg-red-700 shadow-xl rounded-xl flex items-center gap-3 transition-colors transform hover:scale-105"
        >
          <AlertTriangle className="w-8 h-8" />
          [비상 조치: 라이선스 무효화 & 자진신고]
        </button>
      </div>

      {/* Emergency Modal Mock */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold">라이선스 취소 및 자진신고 가동</h3>
              </div>
              <button onClick={() => setIsEmergencyModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              승인 전 소프트웨어가 무단으로 다운로드되었거나 유출된 정황이 포착되었습니다. 
              즉시 다운로드 링크(라이선스)를 무효화(Revoke)하고 정부에 제출할 <strong>'J-01 자진신고서'</strong> 및 <strong>'J-02 재발방지계획'</strong> 모달을 생성하시겠습니까?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsEmergencyModalOpen(false)} className="px-4 py-2 border rounded-md font-medium text-sm">취소</button>
              <button 
                onClick={() => {
                  handleStatusChange('REVOKED');
                  setIsEmergencyModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md font-bold text-sm"
              >
                즉시 실행 (Revoke & J-01 가동)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
