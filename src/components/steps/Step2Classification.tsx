import React from 'react';
import { ExportCaseState, computeEccn, isStrategicItem, eccnLabel } from '../../utils/complianceRuleEngine';
import { isAnnex23Country } from '../../utils/legalBasis';
import { Shield, FileText, AlertOctagon, UploadCloud, CheckCircle } from 'lucide-react';

interface Props {
  state: ExportCaseState;
  onChange: (newState: ExportCaseState) => void;
}

export const Step2Classification: React.FC<Props> = ({ state, onChange }) => {
  const { classification } = state;
  const { isUsEarSubject } = computeEccn(classification);
  // 전문판정은 입력값, 자가판정(사내 1차 판단)은 문항으로 계산된 값
  const computedEccn = classification.classificationType === 'PRO'
    ? (classification.computedEccn || 'EAR99')
    : computeEccn(classification).computedEccn;
  const strategic = isStrategicItem(computedEccn);
  const tx = state.transaction;
  const updateTransaction = (field: keyof ExportCaseState['transaction'], value: any) =>
    onChange({ ...state, transaction: { ...tx, [field]: value } });

  const updateClassification = (field: keyof ExportCaseState['classification'], value: any) => {
    const updatedClass = { ...classification, [field]: value };
    const { computedEccn: newEccn, isUsEarSubject: newUsEar } = computeEccn(updatedClass);
    // 전문판정(PRO)은 판정서에 기재된 값을 직접 입력하므로 문항 계산값으로 덮어쓰지 않는다
    const keepManual = updatedClass.classificationType === 'PRO' && field !== 'classificationType';
    onChange({
      ...state,
      classification: { 
        ...updatedClass,
        computedEccn: keepManual ? (field === 'computedEccn' ? value : classification.computedEccn) : newEccn,
        isUsEarSubject: newUsEar
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Shield className="w-7 h-7 text-indigo-300" />
          2단계: 무기류/전략물자 판독 (Classification)
        </h2>
        <p className="text-indigo-100 font-medium">
          📦 목적: 수출하려는 물품이 통제 대상인 전략물자인지(또는 군용 전용 가능성이 있는지) 판독하여 허가 트랙을 결정하는 단계입니다.
        </p>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          F-04 전략물자 판정관리대장 등록
        </h2>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          대외무역법 제20조(전문판정)·제20조의2(자가판정)
        </span>
      </div>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => updateClassification('classificationType', 'SELF')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold border-2 transition-all flex items-center justify-center gap-2 ${classification.classificationType === 'SELF' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          {classification.classificationType === 'SELF' && <CheckCircle className="w-5 h-5"/>}
          [자가판정] F-01 등록
        </button>
        <button 
          onClick={() => updateClassification('classificationType', 'PRO')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold border-2 transition-all flex items-center justify-center gap-2 ${classification.classificationType === 'PRO' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          {classification.classificationType === 'PRO' && <CheckCircle className="w-5 h-5"/>}
          [전문판정] F-02 등록
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">판정 관리번호 (Tracking ID)</label>
          <input type="text" className="w-full text-sm border-slate-300 rounded-md" value={classification.trackingId || ''} onChange={e => updateClassification('trackingId', e.target.value)} placeholder="예: CLS-2026-001" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">품목명 / 모델명 / SW버전</label>
          <input type="text" className="w-full text-sm border-slate-300 rounded-md" value={classification.productName || ''} onChange={e => updateClassification('productName', e.target.value)} placeholder="AUTOSAR Crypto Stack v2.0" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">HSK 코드 (10자리)</label>
          <input type="text" className="w-full text-sm border-slate-300 rounded-md" value={classification.hskCode || ''} onChange={e => updateClassification('hskCode', e.target.value)} placeholder="8523.49.1000" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">판정 일자</label>
          <input type="date" className="w-full text-sm border-slate-300 rounded-md" value={classification.classificationDate || ''} onChange={e => updateClassification('classificationDate', e.target.value)} />
        </div>
      </div>

      {classification.classificationType === 'PRO' && (
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 space-y-3">
          <h3 className="font-bold text-emerald-800 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4"/> 전문기관 판정 정보 (KOSTI 등)
          </h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
              <label className="text-xs font-semibold text-emerald-700">발급 번호</label>
              <input type="text" className="w-full text-sm border-emerald-300 rounded-md" value={classification.kostiNumber || ''} onChange={e => updateClassification('kostiNumber', e.target.value)} placeholder="KOS-2026-XXXX" />
            </div>
             <div className="space-y-1">
              <label className="text-xs font-semibold text-emerald-700">전문판정서의 판정 결과</label>
              <select className="w-full text-sm border-emerald-300 rounded-md" value={classification.computedEccn || 'EAR99'} onChange={e => updateClassification('computedEccn', e.target.value)}>
                <option value="EAR99">비해당</option>
                <option value="5D002">5D002 (전략물자 해당)</option>
                <option value="ML21">ML21 (군용물자 해당)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {classification.classificationType === 'SELF' && (
        <>
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-sm font-semibold text-slate-600">사내 1차 판단 결과 (자가판정서로 확정 필요):</span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
              computedEccn === '5D002' 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}>
              {eccnLabel(computedEccn)}
            </span>
          </div>

          {isUsEarSubject && (
            <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-800 font-bold text-sm">미국 EAR 별도 검토 필요 (한국 법령과 별개)</h4>
                <p className="text-amber-700 text-xs mt-1">
                  미국산 암호 코드가 포함되어 있습니다. 미국 재수출 규정(EAR) 적용 여부는 미국 규정에 따라 별도로 검토하십시오.
                  이 표시는 한국 자가판정·수출허가 절차를 대체하거나 면제하지 않습니다.
                </p>
              </div>
            </div>
          )}

          {computedEccn === 'ML21' && (
            <div className="bg-rose-50 border border-rose-300 p-4 rounded-lg flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-rose-800 font-bold text-sm">ML 군용 물자 (Military List) 감지</h4>
                <p className="text-rose-700 text-xs mt-1">
                  군용물자(ML21)로 판정되었습니다. 군용물자의 허가기관은 <strong>방위사업청</strong>입니다(고시 제5조). 허가 절차와 서류는 방위사업청 안내에 따르십시오.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:border-indigo-300 transition-colors bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Q1. 암호화 강도 기준 초과 여부 <span className="text-xs text-slate-400 font-normal">(Crypto Over Limit)</span></p>
                  <p className="text-xs text-slate-500 mt-1">
                    수출하는 SW/장비가 아래 중 <strong>하나라도 해당하면 '예'</strong>:<br/>
                    · 대칭키 암호화(AES, DES 등) — <strong>56비트 초과</strong><br/>
                    · 비대칭키(RSA, DH 등) — <strong>512비트 초과</strong><br/>
                    · 타원곡선 암호화(ECC, ECDH 등) — <strong>112비트 초과</strong><br/>
                    · 양자내성암호(PQC) 알고리즘 포함 시 '예'
                  </p>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={classification.q1_cryptoOverLimit} onChange={() => updateClassification('q1_cryptoOverLimit', true)} /> Yes</label>
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={!classification.q1_cryptoOverLimit} onChange={() => updateClassification('q1_cryptoOverLimit', false)} /> No</label>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:border-indigo-300 transition-colors bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Q2. 암호화 기능이 인증 전용인지 여부 <span className="text-xs text-slate-400 font-normal">(Non-Crypto / Auth Only)</span></p>
                  <p className="text-xs text-slate-500 mt-1">
                    암호화 기능이 아래 용도로만 쓰이면 '예' (해당 시 통제 완화):<br/>
                    · 사용자 인증(Authentication)만을 위한 암호화<br/>
                    · 전자서명(Digital Signature) 전용<br/>
                    · 차량 보안통신(SecOC) MAC 생성 전용
                  </p>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={classification.q2_nonCryptoOnly} onChange={() => updateClassification('q2_nonCryptoOnly', true)} /> Yes</label>
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={!classification.q2_nonCryptoOnly} onChange={() => updateClassification('q2_nonCryptoOnly', false)} /> No</label>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:border-indigo-300 transition-colors bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Q3. 운영·관리 목적 전용 암호화 여부 <span className="text-xs text-slate-400 font-normal">(OAM Only)</span></p>
                  <p className="text-xs text-slate-500 mt-1">
                    암호화가 시스템 운영 및 관리 목적에만 제한되면 '예':<br/>
                    · 장비 운영(Operations) 전용 암호화<br/>
                    · 관리자 인증(Administration) 전용<br/>
                    · 유지보수(Maintenance) 접근 제어 전용
                  </p>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={classification.q3_oamOnly} onChange={() => updateClassification('q3_oamOnly', true)} /> Yes</label>
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={!classification.q3_oamOnly} onChange={() => updateClassification('q3_oamOnly', false)} /> No</label>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:border-indigo-300 transition-colors bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Q4. 미국산 암호화 소스코드 포함 여부 <span className="text-xs text-slate-400 font-normal">(US Code Commingled)</span></p>
                  <p className="text-xs text-slate-500 mt-1">
                    SW에 미국산 암호화 소스코드·라이브러리가 포함되어 있으면 '예':<br/>
                    · 미국산 OpenSSL, BoringSSL, mbedTLS 등 라이브러리 내장 여부<br/>
                    · 미국 기업이 개발한 암호화 모듈 포함 여부<br/>
                    <span className="text-amber-600 font-medium">→ '예' 선택 시 미국 EAR 재수출 규정 검토 메모가 추가됩니다 (한국 판정 결과에는 영향 없음)</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={classification.q4_usCodeCommingled} onChange={() => updateClassification('q4_usCodeCommingled', true)} /> Yes</label>
                  <label className="flex items-center gap-1 text-sm"><input type="radio" checked={!classification.q4_usCodeCommingled} onChange={() => updateClassification('q4_usCodeCommingled', false)} /> No</label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {classification.classificationType !== 'NONE' && (
        <div className="p-4 border rounded-lg bg-white space-y-3">
          <p className="font-semibold text-slate-800 text-sm">제공 범위 및 허가면제 요건</p>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input type="checkbox" className="mt-1" checked={!!tx.isTechnologyTransfer} onChange={e => updateTransaction('isTechnologyTransfer', e.target.checked)} />
            <span>기술(설계·제조·사용 관련 기술자료, 기술지원·교육 등)을 함께 제공한다
              <span className="block text-xs text-slate-500">기술 수출은 고시 제20조②의 서류를 따르며, '가' 지역 서류면제(제21조①)와 제26조① 허가면제가 적용되지 않습니다.</span></span>
          </label>
          {computedEccn === '5D002' && !tx.isTechnologyTransfer && (
            <div className="pl-6 space-y-2 border-l-2 border-indigo-100">
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input type="checkbox" className="mt-1" checked={!!tx.cryptoCivilPurpose} onChange={e => updateTransaction('cryptoCivilPurpose', e.target.checked)} />
                <span>민간기업의 내부시스템 구축·운영 또는 민수용 제품 개발·생산 용도다 (고시 제26조제1항제9호)</span>
              </label>
              <input type="text" className="w-full md:w-1/2 text-sm border-slate-300 rounded-md p-2" placeholder="민간 최종사용자의 본사 소재국 (예: 독일)"
                value={tx.endUserHqCountry || ''} onChange={e => updateTransaction('endUserHqCountry', e.target.value)} />
              {tx.cryptoCivilPurpose && tx.endUserHqCountry && (
                <p className={`text-xs ${isAnnex23Country(tx.endUserHqCountry) ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {isAnnex23Country(tx.endUserHqCountry)
                    ? '[별표 23] 국가 본사 — 입력값 기준 허가면제 요건 충족. 사전 또는 사후거래보고(별지 제16호·제16호의2)가 필요합니다.'
                    : '[별표 23] 국가가 아닙니다. 바세나르체제 회원국 요건 해당 여부는 담당자가 별도로 확인합니다.'}
                </p>
              )}
            </div>
          )}
          {strategic && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!tx.hasComprehensiveLicense} onChange={e => updateTransaction('hasComprehensiveLicense', e.target.checked)} />
                유효한 포괄수출허가 보유
              </label>
              {tx.hasComprehensiveLicense && (
                <input type="text" className="text-sm border-slate-300 rounded-md p-1.5" placeholder="[필수] 포괄수출허가 번호"
                  value={tx.comprehensiveLicenseNo || ''} onChange={e => updateTransaction('comprehensiveLicenseNo', e.target.value)} />
              )}
            </div>
          )}
        </div>
      )}

      {classification.classificationType !== 'NONE' && (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer mt-4 bg-white">
          <UploadCloud className="w-10 h-10 text-indigo-400 mb-2" />
          <p className="text-sm font-bold text-slate-700">
            {classification.classificationType === 'PRO' ? "전문판정서 (F-02) PDF 업로드" : "자가판정 증빙 (F-01) PDF 업로드"}
          </p>
          <p className="text-xs text-slate-500 mt-1">여기를 클릭하거나 파일을 드래그하여 첨부하세요.</p>
        </div>
      )}

      {/* 🚀 결과 브리핑 요약 (Next Step Guide) */}
      <div className="mt-10 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700 text-white animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <AlertOctagon className="w-8 h-8 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">분석 결과 요약 및 다음 단계 안내</h3>
            <div className="space-y-2 mb-4 text-sm text-slate-300">
              <p>• 👤 <b>사전 스크리닝:</b> {state.screening.hasRedFlags ? <span className="text-amber-400 font-bold">의심징후 {state.screening.selectedRedFlags.length}건 발견됨</span> : '안전함 (블랙리스트 아님)'}</p>
              <p>• 📦 <b>품목 판정결과:</b> {!strategic ? '전략물자 비해당 (판정 확정 필요)' : <span className="text-red-400 font-bold">{eccnLabel(computedEccn)}</span>}</p>
              <p>• 🌍 <b>목적지 지역:</b> {state.destination.isSanctionedCountry ? <span className="text-red-500 font-bold">나의2 지역</span> : state.destination.isGroupA ? "'가' 지역" : "'나의1' 지역"}</p>
            </div>
            
            <div className="bg-indigo-900/60 p-4 rounded-lg border border-indigo-500/50">
              <p className="text-indigo-100 font-medium text-sm leading-relaxed">
                👉 앞선 검증 결과에 따라, 귀하의 이번 수출 건은 다음 단계(Step 3)에서 <br/>
                <strong className="text-white text-lg mt-1 block">
                  {strategic ? '🎯 [ 수출허가 검토 트랙 ]' : 
                   (state.screening.hasRedFlags || state.screening.cslApiHit) ? '🚨 [ 상황허가 검토 트랙 ]' : 
                   '✅ [ 비해당 일반 수출 트랙 (판정·거래심사 기록은 보관) ]'}
                </strong> 
                으로 자동 배정됩니다. 하단의 '다음 단계로 이동'을 눌러 필수 서류만 작성하십시오.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
