// "서명 문서함"에서 회사 차원 서류(거래 건에 묶이지 않는 A~K 시리즈)를 묶어서 보여줄 때 쓰는
// 그룹 분류표. formDefinitions의 category 필드는 서식이 늘어나며 표현이 제각각(예: "감사" /
// "감사 및 사고 관리" / "내부 감사"가 섞여 있음)이라 그대로 쓰면 그룹이 쓸데없이 잘게 쪼개진다.
// 대신 AA등급 심사기준의 9대 평가지표 구조를 그대로 따르는 고정 그룹으로 다시 묶는다 —
// 현장심사관이 "5번 지표(교육) 증빙 보여주세요" 할 때 그 그룹만 펼쳐서 대응하기 위함.
export const SIGNED_DOC_GROUPS = [
  { key: 'org', label: '1. 조직 및 규정', formIds: ['A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06', 'A-07', 'A-08', 'A-10', 'REGULATION'] },
  { key: 'ceo', label: '2. 최고경영자 의지표명', formIds: ['B-01', 'B-02'] },
  { key: 'trade', label: '3. 수출거래심사', formIds: ['E-01', 'E-02', 'G-02', 'G-03', 'G-04', 'G-06', 'I-01', 'L-10'] },
  { key: 'edu', label: '5. 교육', formIds: ['A-09', 'C-00', 'C-01', 'C-02', 'C-03'] },
  { key: 'audit', label: '6. 감사', formIds: ['C-04', 'C-05', 'C-06', 'C-07'] },
  { key: 'doc', label: '7. 문서관리', formIds: ['D-01', 'D-02'] },
  { key: 'report', label: '8. 보고 및 위반조치', formIds: ['J-01', 'J-02', 'K-03', 'K-04', 'K-05', 'G-05'] },
  { key: 'security', label: '9. 정보보안', formIds: ['D-03', 'D-04', 'D-05', 'D-06'] },
  { key: 'apply', label: '지정신청 제출서류', formIds: ['E-03', 'E-04', 'E-05'] },
];

const FORM_ID_TO_GROUP = {};
SIGNED_DOC_GROUPS.forEach(g => g.formIds.forEach(fId => { FORM_ID_TO_GROUP[fId] = g.key; }));

export function getGroupForFormId(formId) {
  return FORM_ID_TO_GROUP[formId] || 'etc';
}

export function getGroupLabel(groupKey) {
  return SIGNED_DOC_GROUPS.find(g => g.key === groupKey)?.label || '기타';
}

export const SIGNED_DOC_GROUP_ORDER = [...SIGNED_DOC_GROUPS.map(g => g.key), 'etc'];
