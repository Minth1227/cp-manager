// A-01(규정 기안문)과 그 외 일반 서식의 데이터를 PDF에 넣을 { formTitle, subtitle, fields } 형태로
// 뽑아내는 공용 로직. 결재 "요청" 시점(slack_post_approval.js — 아직 미승인 상태의 문서 미리보기)과
// "승인" 시점(slack_interactions.js — 서명 스탬프가 찍힌 최종본) 양쪽에서 똑같이 재사용한다.
import { formDefinitions } from '../../../src/forms/definitions.js';

export function buildPdfFieldsForForm(formId, formData) {
  const docNumberField = formData.docNumber ? [{ label: '문서번호', value: formData.docNumber }] : [];

  if (formId === 'A-01') {
    const revisionTable = (formData.tables && formData.tables.revisionTable) || [];
    const revisionText = revisionTable.map((r, i) =>
      `${i + 1}. [개정전] ${r.before || '(신설)'}\n   [개정후] ${r.after || ''}\n   [사유] ${r.reason || ''}`
    ).join('\n\n');

    return {
      formTitle: '자율수출관리규정 제정 기안문',
      subtitle: `문서번호: ${formData.docNumber || ''}`,
      fields: [
        ...docNumberField,
        { label: '제목', value: formData.subject },
        { label: '기안자', value: formData.drafter },
        { label: '검토자', value: formData.reviewer },
        { label: '결재자', value: formData.approver },
        { label: '기안일', value: formData.draftDate },
        { label: '시행일', value: formData.effectiveDate },
        { label: '기안 내용', value: formData.body },
        { label: '신·구조문 대비표', value: revisionText || (formData.noRevision ? '(정기검토 결과 개정 불요)' : '') },
      ]
    };
  }

  const def = formDefinitions[formId] || {};
  const labelFields = (def.fields || def.columns || []).map(f => ({ label: f.label, value: formData[f.key] }));
  return { formTitle: def.title || formId, subtitle: undefined, fields: [...docNumberField, ...labelFields] };
}
