// [별표 2의2] 상황허가(Catch-all) 대상품목 데이터베이스
// 전략물자 수출입고시 제21조 및 별표 2의2 근거

export const catchAllItems = [
  {
    "id": "CA-0001",
    "no": "1",
    "name": "공작기계(Machine Tools)",
    "spec": "공작기계(Machine tools)와 이를 위한 “구성품(Components)” 및 “수치제어(Numerical controls)” 장치로서 다음 중 하나의 것a.ISO 230/2(1988)이나 국내 동등 규격에 따라 15 ㎛ 이하(같거나 더 우수한)인 것 주: 본 규정은 별표 2의 2B201.b, 2B001.c에서 통제하고 있는 연삭가공 공작기계에 대해서는 적용되지 않는다.b.되는 공작기계를 위해 전용 설계된 “구성품(Components)” 및 “수치제어(Numerical controls)” 장치",
    "relatedAnnex2": "2B201.b2B001.c",
    "country": "이란, 파키스탄",
    "category": "기계/공작",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0002",
    "no": "2",
    "name": "유동성형기 또는 회전성형기",
    "spec": "별표 2의 2B009, 2B109, 또는 2B209에서 통제하지 않는 회전성형기 또는 유동성형기로서 한 개의 롤러의 힘이 60 kN을 초과하는 것과 이를 위해 전용 설계된 부품기술해설:회전성형과 유동성형기능을 겸하고 있는 기계는 본 항에서는 유동성형기로 간주한다.",
    "relatedAnnex2": "",
    "country": "이란, 파키스탄",
    "category": "기계/공작",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0003",
    "no": "3",
    "name": "치수(Dimension)/변위(Displacement) 측정기",
    "spec": "컴퓨터로 제어되거나 “수치제어(Numerical controls)” 되는 3차원 측정기(CMM) 또는 치수검사기로서 장비의 작동범위 내의 어느 점에서 3차원 최대 허용오차(MPPE)가 ISO 10360-2 (2001)에 따라 3+L/1,000㎛ 이하인(같거나 우수한) 것(L은 측정길이(mm))과 이를 위해 설계된 측정용 탐침",
    "relatedAnnex2": "2B006.a2B206.a",
    "country": "이란, 파키스탄",
    "category": "기계/공작",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0004",
    "no": "3의2",
    "name": "진동시험시스템",
    "spec": "별표 2의 2B116에서 통제하지 않는 진동시험시스템, 장비와 그 부품으로서 다음 중 하나의 것a. 피드백 또는 폐쇄회로 기법을 사용하고 디지털 제어기를 가진 진동시험시스템으로서, 'Bare table' 측정에서 주파수 범위 0.1 Hz ∼ 2 kHz 사이의 전 영역에서 0.1g rms 이상의 가속도로 진동시킬 수 있고, 50 kN 이상의 힘을 전달할 수 있는 것b. 디지털 제어기로서 전용 설계된 진동시험 “소프트웨어”를 장착하고 실시간 대역폭(Bandwidth)이 5 kHz 초과이며 a항에 제시된 진동시험시스템과 함께 사용하기 위해 설계된 것c. 가진기(Vibration thruster)로서 증폭기 장착여부에 관계없이 피진동체에 미치는 힘이 'Bare table' 측정에서 50 kN 이상으로 a.항의 진동시험시스템에 사용할 수 있는 것d. 시험체 지지구조물(Test piece support structures) 및 전자장치로서 다수의 가진기를 결합하여 'Bare table' 측정에서 유효결합력 50 kN 이상을 가할 수 있는 완전한 가진 장치를 구성할 수 있도록 설계된 것으로서 a항의 진동시험시스템에 사용가능한 것기술해설:'Bare table'이란 고정구(Fixture)나 피팅(Fitting)이 없는 평평한 테이블, 또는 표면을 말한다.",
    "relatedAnnex2": "2B116",
    "country": "이란, 파키스탄",
    "category": "일반 품목",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0005",
    "no": "3의3",
    "name": "밸런싱 머신 (균형시험기)",
    "spec": "밸런싱 머신과 관련 장비로서 다음 중 하나의 것a. 치과 또는 기타 의료장비용으로 설계되거나 개조된 밸런싱 머신으로서 다음의 특성을 모두 갖는 것 1. 3 kg을 초과하는 로터/조립체를 밸런스 할 수 없는 것 2. 12,500 rpm을 초과하는 속도로 회전하는 로터/조립체를 밸런스 할 수 있는 것 3. 2개 평면 이상의 불균형을 교정할 수 있는 것 4. 로터 질량 1 kg 당 0.2 g mm까지의 잔여비불균형을 밸런싱 할 수 있는 것b. a항에서 통제하는 밸런싱 머신에 사용하기 위해 설계되거나 개조된 지시계 헤드(Indicator heads) 기술해설:지시계 헤드는 때로는 밸런싱 계측장비로 알려져 있다.",
    "relatedAnnex2": "2B119",
    "country": "이란, 파키스탄",
    "category": "일반 품목",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0006",
    "no": "4",
    "name": "스테인리스 강판",
    "spec": "판(Sheet) 또는 플레이트 형태의 철강 합금으로 다음 중 하나 이상의 특성을 가지는 것a. 293 K (20 °C)에서 '견딜 수 있는' 최대인장강도가 1,200 MPa 이상인 것; 또는b. 질소 안정화 처리된 듀플렉스 스테인리스강주: 합금은 열처리 이전과 이후의 합금을 포함한다.기술해설:'질소 안정화 처리된 듀플렉스 스테인리스강'은 질소 첨가에 의해 미세구조가 안정화 되며, 페라이트강과 오스테나이트강의 결정립들로 구성된 2상(相)의 미세구조를 가진다.",
    "relatedAnnex2": "1C1161C216",
    "country": "이란",
    "category": "소재/금속/화학",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0007",
    "no": "4의2",
    "name": "스테인리스 강판",
    "spec": "폭 600 mm 이상, 두께 10 mm 초과하는 오스테나이트계, 듀플렉스계 및 석출경화 마르텐사이트계 강판",
    "relatedAnnex2": "1C1161C216",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0008",
    "no": "5",
    "name": "특수강",
    "spec": "1C116 또는 1C216에서 명시한 품목을 제외한 마레이징강(Maraging steel)으로 293 K (20 °C)에서 '견딜 수 있는' 최대인장강도가 2,050 MPa 이상인 것 기술해설:마레이징강은 열처리 이전과 이후의 마레이징강을 포함한다.",
    "relatedAnnex2": "1C216",
    "country": "이란",
    "category": "일반 품목",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0009",
    "no": "6",
    "name": "알루미늄 및 알루미늄 합금",
    "spec": "1C002.b.4 또는 1C202.a에 명시된 품목을 제외하며 미가공 또는 반가공 형태의 알루미늄과 알루미늄 합금이며 다음 중 하나의 특성을 가지는 것a. 293 K (20 °C)에서 가능한 최대인장강도가 460 MPa 이상인 것; 또는b. 293 K (20 °C)에서 갖는 인장강도 값이 415 MPa 이상인 것",
    "relatedAnnex2": "1C002.b 1C202.a",
    "country": "이란",
    "category": "소재/금속/화학",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0010",
    "no": "7",
    "name": "퓸 후드(Fume hood)",
    "spec": "- 폭 2.5미터 이상",
    "relatedAnnex2": "2B352.f.2",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0011",
    "no": "8",
    "name": "공기 정화․공급 호흡기",
    "spec": "- 전면마스크용",
    "relatedAnnex2": "1A004.a",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0012",
    "no": "9",
    "name": "화학작용제 생산에 이용가능한 화학물질",
    "spec": "- Acetylene (CAS 74-86-2)",
    "relatedAnnex2": "",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0013",
    "no": "10",
    "name": "화학무기 오염제거용 화학물질",
    "spec": "- Diethylenetriamine (CAS 111-40-0)",
    "relatedAnnex2": "",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0014",
    "no": "11",
    "name": "신경작용제 예방용 화학물질",
    "spec": "- Butyrylcholineesterase (BCHE)- Pyridostigmine bromide (CAS 101-26-8)- Obidoxime chloride (CAS 114-90-9)",
    "relatedAnnex2": "",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0015",
    "no": "12",
    "name": "생물안전 캐비넷과 글로브 박스",
    "spec": "- II등급(Class II)",
    "relatedAnnex2": "2B352.f.2",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0016",
    "no": "13",
    "name": "배치형 원심분리기",
    "spec": "- 4L 이상의 로터 용량을 가진 것으로서, 생물학적 용도로 활용 가능한 것",
    "relatedAnnex2": "2B122",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0017",
    "no": "14",
    "name": "발효조",
    "spec": "- 10L 이상, 20L 이하의 내부 용량을 가진 것으로서, 생물학적 용도로 활용 가능한 것",
    "relatedAnnex2": "2B352.b",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0018",
    "no": "15",
    "name": "반응용기, 반응기, 교반기, 열교환기, 응축기, 펌프, 밸브, 저조, 증류탑, 흡수탑",
    "spec": "- 접액부 재질을 제외한 나머지 기준이 별표2 2B350에서 통제하는 반응용기․반응기(2B350.a), 교반기(2B350.b), 열교환기․응축기(2B350.d), 펌프(2B350.i), 밸브(2B350.g), 저조(2B350.c), 증류탑․흡수탑(2B350.e)에 해당하는 품목",
    "relatedAnnex2": "2B350",
    "country": "시리아",
    "category": "기계/공작",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0019",
    "no": "16",
    "name": "클린에어룸과 독립 팬-HEPA 필터 유닛",
    "spec": "- 별표2 2B352.a.의 생물학적 완전차단시설에 사용가능한 것",
    "relatedAnnex2": "2B352.a",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0020",
    "no": "17",
    "name": "진공펌프, 진공펌프 부분품",
    "spec": "- 제조자 규정 최대유량(상온, 상압에서)이 1 m3/h을 초과하는 진공펌프와 이러한 펌프를 위해서 설계된 케이싱(펌프 몸체), 미리 제작된 케이싱 라이너, 임펠러, 회전자(Rotor) 또는 제트펌프 분사기로서, 처리 중인 화학물질과 직접적으로 접촉하는 모든 표면이 별표2 2B350.i에서 통제하는 접액부 소재인 것",
    "relatedAnnex2": "2B231",
    "country": "시리아",
    "category": "기계/공작",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0021",
    "no": "18",
    "name": "실험장비 및 부분품, 부대용품",
    "spec": "- 화학물질의 분석 및 검출을 위한 실험장비와 이의 부분품 및 부대용품(파괴/비파괴 여부 불문)",
    "relatedAnnex2": "2B351",
    "country": "시리아",
    "category": "일반 품목",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0022",
    "no": "19",
    "name": "독가스(염소) 생산 관련 설비",
    "spec": "- 염소-알카리 전해셀 전체-수은 셀, 다이어프램 셀 그리고 멤브레인(막) 셀",
    "relatedAnnex2": "2B233",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0023",
    "no": "20",
    "name": "화학무기 생산 관련 알코올류",
    "spec": "- Methanol (CAS 67-56-1)",
    "relatedAnnex2": "",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0024",
    "no": "21",
    "name": "화학무기 전구체 염",
    "spec": "- Diethylamine hydrochloride (CAS 660-68-4)",
    "relatedAnnex2": "1C350.64",
    "country": "시리아",
    "category": "소재/금속/화학",
    "reason": "화학무기 및 생물무기 제조 시설 또는 재래식 무기로의 전용 위험에 따른 통제(별표 2의2 제1호)"
  },
  {
    "id": "CA-0025",
    "no": "22",
    "name": "무인항공기",
    "spec": "- 항공기용 왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관(8407.10)",
    "relatedAnnex2": "",
    "country": "이란",
    "category": "자동차/항공/수송",
    "reason": "핵무기 및 미사일 운반체계 개발·제조 관련 이중용도 전용 위험에 따른 상황허가 필수 대상(별표 2의2 제1호)"
  },
  {
    "id": "CA-0026",
    "no": "1",
    "name": "전자 장치",
    "spec": "별표 2 3A001에 의해 통제되지 않는 전자 장치 및 \"구성품\"으로서 다음의 것",
    "relatedAnnex2": "Electronic devices, and \"components\" not controlled by 3A001.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0027",
    "no": "마이크로",
    "name": "a. \"마이크로프로세서 마이크로회로\", \"마이크로컴퓨터 마이크로회로\" 마이크로 컨트롤러 마이크로회로로 다음의 것:",
    "spec": "a. \"Microprocessor microcircuits\", \"microcomputer microcircuits\", and microcontroller microcircuits having any of the following:",
    "relatedAnnex2": "3A001.a.3",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0028",
    "no": "저장",
    "name": "b. 저장 집적 회로로 다음의 것:",
    "spec": "b. Storage integrated circuits, as follows:",
    "relatedAnnex2": "3A001.a.2",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0029",
    "no": "아날로그-",
    "name": "c. 아날로그-디지털 변환기로 다음 중 하나의 것:",
    "spec": "c. Analog-to-digital converters having any of the following:",
    "relatedAnnex2": "3A001.a.5.a",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0030",
    "no": "필드프로",
    "name": "d. 단일 디지털 입/출력단자의 최대수가 200에서 700 사이인 필드프로그래머블 로직 디바이스;",
    "spec": "d. Field programmable logic devices having a maximum number of single-ended digital input/outputs between 200 and 700;",
    "relatedAnnex2": "3A001.a.7",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0031",
    "no": "고속 푸리에 변환 프로세서",
    "name": "e. 1,024 포인트 복소 FFT에 대해 1ms 미만의 정격 실행 시간을 갖는 FFT(Fast Fourier Transform) 프로세서",
    "spec": "e. Fast Fourier Transform (FFT) processors having a rated execution time for a 1,024 point complex FFT of less than 1 ms;",
    "relatedAnnex2": "3A001.a.12",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0032",
    "no": "주문형 집적회로",
    "name": "f. 주문형 집적회로로서 그 기능이 알려져 있지 않거나, 이를 사용한 장비의 통제여부를 제조업자가 알 수 없는 것으로 다음 중 하나의 특성을 갖는 것:",
    "spec": "f. Custom integrated circuits for which either the function is unknown, or the control status of the equipment in which the integrated circuits will be used is unknown to the manufacturer, having any of the following:",
    "relatedAnnex2": "3A001.a.10",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0033",
    "no": "진행파 진공 전자 장치",
    "name": "g. 진행파 진공 전자 소자, 펄스 또는 지속파로서 다음 중 하나의 것",
    "spec": "g. Traveling-wave vacuum electronic devices, pulsed or continuous wave, as follows:",
    "relatedAnnex2": "3A001.b.1.a",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0034",
    "no": "유연한 도파관",
    "name": "h. 40 GHz를 초과하는 주파수에서 사용하도록 설계된 유연한 도파관;",
    "spec": "h. Flexible waveguides designed for use at frequencies exceeding 40 GHz;",
    "relatedAnnex2": "3A001.b.1.a.4",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0035",
    "no": "표면탄성파 장치",
    "name": "i. 표면탄성파 및 표면 스키밍(얕은 벌크) 탄성파 장치(예 : 재료에 탄성파를 사용하는 “신호 처리” 장치)로서 다음 중 하나의 특성을 갖는 것:",
    "spec": "i. Surface acoustic wave and surface skimming (shallow bulk) acoustic wave devices (i.e., \"signal processing\" devices employing elastic waves in materials), having either of the following:",
    "relatedAnnex2": "3A001.c.1",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0036",
    "no": "셀",
    "name": "j. ‘셀(Cell)’로서 다음의 것:",
    "spec": "j. ‘Cells’ as follows:",
    "relatedAnnex2": "3A001.e.1",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0037",
    "no": "초전도 전자석과 솔레노이드",
    "name": "k. \"초전도\" 전자석과 솔레노이드로서 1분 이내에 완전히 충전하거나 또는 방전시키도록 전용 설계된 것으로서 다음의 특성을 모두 갖는 것:",
    "spec": "k. \"Superconductive\" electromagnets or solenoids specially designed to be fully charged or discharged in less than one minute, having all of the following:",
    "relatedAnnex2": "3A001.e.3",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0038",
    "no": "초전도성 재료로 제조된 전자기 에너지",
    "name": "l. 전자기 에너지 저장을 위하여 “임계 온도” 미만에서 작동하도록 전용 설계된 “초전도” 성 재료로 제조된 \"구성품\"을 포함하는 회로 또는 시스템으로 다음의 특성을 모두 가지는 것:",
    "spec": "l. Circuits or systems for electromagnetic energy storage, containing \"components\" manufactured from \"superconductive\" materials specially designed for operation at temperatures below the \"critical temperature\" of at least one of their \"superconductive\" constituents, having all of the following:",
    "relatedAnnex2": "3A001.e.3",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0039",
    "no": "사이러트론",
    "name": "m. 세라믹 금속 구조의 수소/수소 동위원소 사이러트론(Thyratron)으로 최대정격전류가 500 A 이상인 것",
    "spec": "m. Hydrogen/hydrogen-isotope thyratrons of ceramic-metal construction and rate for a peak current of 500 A or more;",
    "relatedAnnex2": "3A001.b.1",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0040",
    "no": "화합물 반도체를 기반으로 하는 디지털 집적회로",
    "name": "n. 화합물 반도체를 기반으로 하는 디지털 집적 회로로 등가 게이트 수가 300 (2개의 입력 게이트) 개를 초과하는 것",
    "spec": "n. Digital integrated circuits based on any compound semiconductor having an equivalent gate count of more than 300 (2 input gates);",
    "relatedAnnex2": "3A001.a.11",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0041",
    "no": "우주용 태양 전지",
    "name": "o. 태양 전지, CIC(Cell-Interconnect-Coverglass) 조립품, 태양 패널 및 태양 어레이로 \"우주용\"이며 별표 2 3A001.e.4에 의해 통제되지 않는 것",
    "spec": "o. Solar cells, cell-interconnect-coverglass (CIC) assemblies, solar panels, and solar arrays, which are \"space qualified\" and not controlled by 3A001.e.4.",
    "relatedAnnex2": "3A001.e.4",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0042",
    "no": "2",
    "name": "범용 전자 장비",
    "spec": "별표 2 3A002에 의해 통제되지 않는 범용 전자 장비로서 다음의 것",
    "relatedAnnex2": "General purpose electronic equipment not controlled by 3A002.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0043",
    "no": "전자 시험 장비",
    "name": "a. 별표 2에 명시되지 않은 전자 시험 장비",
    "spec": "a. Electronic test equipment,",
    "relatedAnnex2": "3A002",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0044",
    "no": "디지털데이터 기록계",
    "name": "b. 디지털 계측 자기 테이프 데이터 레코더로 다음의 특성을 갖는 것",
    "spec": "b. Digital instrumentation magnetic tape data recorders having any of the following characteristics;",
    "relatedAnnex2": "3A002.a.6",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0045",
    "no": "디지털데이터 기록계 변환 장치",
    "name": "c. 최대 디지털 인터페이스 전송 속도가 60 Mbit/s를 초과하는 장비로 디지털 계측 데이터 레코더로 사용하기 위해 디지털 비디오 자기 테이프 레코더를 변환하도록 설계된 것",
    "spec": "c. Equipment, with a maximum digital interface transfer rate exceeding 60 Mbit/s, designed to convert digital video magnetic tape recorders for use as digital instrumentation data recorders;",
    "relatedAnnex2": "3A002.a.6",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0046",
    "no": "오실로스코프",
    "name": "d. 대역폭이 1 GHz 이상인 비모듈식 아날로그 오실로스코프",
    "spec": "d. Non-modular analog oscilloscopes having a bandwidth of 1 GHz or greater;",
    "relatedAnnex2": "3A002.a.7",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0047",
    "no": "3",
    "name": "특수 처리 장비",
    "spec": "별표 2에 명시되지 않은 특수 처리 장비로 다음의 것",
    "relatedAnnex2": "Specific processing equipment, as follows",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0048",
    "no": "주파수 변환기",
    "name": "a. 별표 2에 명시되지 않은 300 ∼ 600Hz의 주파수 범위에서 작동할 수 있는 주파수 변환기",
    "spec": "a. Frequency changers capable of operating in the frequency range from 300 up to 600 Hz;",
    "relatedAnnex2": "3A225",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0049",
    "no": "질량 분석기",
    "name": "b. 별표 2에 명시되지 않은 질량 분석기",
    "spec": "b. Mass spectrometers;",
    "relatedAnnex2": "3A233",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0050",
    "no": "섬광 X선 발생기",
    "name": "c. 모든 플래시 X-ray 기계, 및 Marx 발생기, 고전력 펄스 형성 네트워크, 고전압 커패시터 및 트리거를 포함하여 설계된 펄스 전력 시스템의 \"부품\" 또는 \"구성품\";",
    "spec": "c. All flash X-ray machines, and \"parts\" or \"components\" of pulsed power systems designed thereof, including Marx generators, high power pulse shaping networks, high voltage capacitors, and triggers;",
    "relatedAnnex2": "3A201.c",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0051",
    "no": "펄스 증폭기",
    "name": "d. 별표 2에 명시되지 않은 펄스 증폭기",
    "spec": "d. Pulse amplifiers,;",
    "relatedAnnex2": "3A001.b.4",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0052",
    "no": "시간 지연 생성기",
    "name": "e. 시간 지연 생성 또는 시간 간격 측정을 위한 전자 장비로 다음의 것:",
    "spec": "e. Electronic equipment for time delay generation or time interval measurement, as follows:",
    "relatedAnnex2": "3A001.b.4",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0053",
    "no": "크로마토 그래피 및 분광 분석 기기",
    "name": "f. 크로마토 그래피 및 분광 분석 기기",
    "spec": "f. Chromatography and spectrometry analytical instruments.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0054",
    "no": "4",
    "name": "전자 제조 장비",
    "spec": "전자 \"부품\", \"구성품\" 및 재료의 제조를 위해 별표 2 3B001에 의해 통제되지 않는 장비 및 이를 위하여 전용 설계된 \"부품\", \"구성품\" 및 \"부속품\"으로서 다음의 것",
    "relatedAnnex2": "Equipment not controlled by 3B001 for the manufacture of electronic \"parts,\" \"components\" and materials, and specially designed \"parts,\" \"components\" and \"accessories\" therefor.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0055",
    "no": "전자 튜브 및 광학 요소 제조 장비",
    "name": "a. 별표 2 3A001 또는 별표 2의2 1에 의해 통제되는 전자 튜브, 광학 요소 및 전용 설계된 \"부품\" 및 \"구성품\"의 제조를 위해 전용 설계된 장비;",
    "spec": "a. Equipment specially designed for the manufacture of electron tubes, optical elements and specially designed \"parts\" and \"components\" therefor controlled by 3A001 or paragraph 1;",
    "relatedAnnex2": "3A0013B001",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0056",
    "no": "반도체 장치, 집적 회로 및 전자 조립품 제조 장비",
    "name": "b. 반도체 장치, 집적 회로 및 \"전자 조립품\"의 제조를 위해 전용 설계된 장비 및 이러한 장비의 특성을 가지거나 통합한 시스템으로 다음의 것:",
    "spec": "b. Equipment specially designed for the manufacture of semiconductor devices, integrated circuits and \"electronic assemblies\", as follows, and systems incorporating or having the characteristics of such equipment:",
    "relatedAnnex2": "3B001",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0057",
    "no": "반도체 장치, 집적 회로 및 전자 조립품 재료 가공용 장비",
    "name": "b.1. b의 제목에 명시된 장치, \"부품\" 및 \"구성품\"의 제조를 위한 재료 가공용 장비로 다음의 것:",
    "spec": "b.1. Equipment for the processing of materials for the manufacture of devices, \"parts\" and \"components\" as specified in the heading of paragraph b, as follows:",
    "relatedAnnex2": "3B0013C001~5",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0058",
    "no": "다결정 실리콘 생산 장비",
    "name": "b.1.a. 별표 2 3C001에 의해 통제되는 다결정 실리콘 및 재료를 생산하는 장비;",
    "spec": "b.1.a. Equipment for producing polycrystalline silicon and materials controlled by 3C001;",
    "relatedAnnex2": "3B0013C001",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0059",
    "no": "반도체 재료를 정제 또는 처리 장비",
    "name": "b.1.b. 수정 풀러를 제외하고 별표 2 3C001, 별표 2 3C002, 별표 2 3C003, 별표 2 3C004 또는 별표 2 3C005에 의해 통제되는 III / V 및 II / VI 반도체 재료를 정제 또는 처리하기 위해 전용 설계된 장비(아래 4.b.1.c 참조)",
    "spec": "b.1.b. Equipment specially designed for purifying or processing III/V and II/VI semiconductor materials controlled by 3C001, 3C002, 3C003, 3C004, or 3C005 except crystal pullers, for which see paragraph 4.b.1.c below;",
    "relatedAnnex2": "3C001∼53B001",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0060",
    "no": "수정 풀러 및 용광로",
    "name": "b.1.c. 수정 풀러 및 용광로로 다음의 것:",
    "spec": "b.1.c. Crystal pullers and furnaces, as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0061",
    "no": "에피택셜 성장 장비",
    "name": "b.1.d. 에피텍셜 성장을 위한 \"저장 프로그램 제어\" 장비로 다음의 것:",
    "spec": "b.1.d. \"Stored program controlled\" equipment for epitaxial growth having any of the following characteristics:",
    "relatedAnnex2": "3B001.a.1",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0062",
    "no": "분자 빔 에피택셜 성장 장비",
    "name": "b.1.e. 분자 빔 에피텍셜 성장 장비;",
    "spec": "b.1.e. Molecular beam epitaxial growth equipment;",
    "relatedAnnex2": "3B001.a.2",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0063",
    "no": "스퍼터링 장비",
    "name": "b.1.f. 격리된 진공 환경에서 웨이퍼를 전송할 수 있도록 전용 설계된 일체형 로드 잠금 장치와 함께 자기적으로 강화된 '스퍼터링' 장비",
    "spec": "b.1.f. Magnetically enhanced 'sputtering' equipment with specially designed integral load locks capable of transferring wafers in an isolated vacuum environment;",
    "relatedAnnex2": "3B001.a",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0064",
    "no": "이온주입 장비",
    "name": "b.1.g. 이온 주입, 이온 강화 또는 광 강화 확산을 위해 전용 설계된 장비로 다음의 것:",
    "spec": "b.1.g. Equipment specially designed for ion implantation, ion-enhanced or photo-enhanced diffusion, having any of the following characteristics:",
    "relatedAnnex2": "3B001.b",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0065",
    "no": "식각 장비 (에칭 장비)",
    "name": "b.1.h. 다음과 같이 이방성 건식 방법(예: 플라즈마)에 의한 선택적 제거(에칭)를 위한 \"저장 프로그램 제어\" 장비:",
    "spec": "b.1.h. \"Stored program controlled\" equipment for the selective removal (etching) by means of anisotropic dry methods (e.g., plasma), as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0066",
    "no": "프라즈마 개선 화학기상증착장비",
    "name": "b.1.i. 산화물, 질화물, 금속 또는 폴리 실리콘 증착을 위해 다음 기능 중 하나를 보유하고 반도체 장치 제조를 위한 화학 기상 증착(CVD) 장비, 예를 들어 플라즈마 강화 CVD(PECVD) 또는 광 강화 CVD,",
    "spec": "b.1.i. Chemical vapor deposition (CVD) equipment, e.g., plasma-enhanced CVD (PECVD) or photo-enhanced CVD, for semiconductor device manufacturing, having either of the following capabilities, for deposition of oxides, nitrides, metals or polysilicon:",
    "relatedAnnex2": "3B001.a",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0067",
    "no": "마스크 제조 장비",
    "name": "b.1.j. 전자빔 시스템으로 마스크 제작 또는 반도체 장치 처리를 위해 전용 설계되거나 개조된 것으로 다음의 특성을 가진 것:",
    "spec": "b.1.j. Electron beam systems specially designed or modified for mask making or semiconductor device processing having any of the following characteristics:",
    "relatedAnnex2": "3B001.f.3",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0068",
    "no": "반도체 웨이퍼 가공을 위한 표면 처리 장비",
    "name": "b.1.k. 반도체 웨이퍼 가공을 위한 표면 처리 장비로 다음의 것",
    "spec": "b.1.k. Surface finishing equipment for the processing of semiconductor wafers as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0069",
    "no": "반도체 장비 상호 연결 장비",
    "name": "b.1.l. 별표 2의2 4에 의해 통제되는 장비를 완전한 시스템에 통합할 수 있도록 전용 설계된 공통 단일 또는 다중 진공 챔버를 포함하는 상호 연결 장비;",
    "spec": "b.1.l. Interconnection equipment which includes common single or multiple vacuum chambers specially designed to permit the integration of any equipment controlled by paragraph 4 into a complete system;",
    "relatedAnnex2": "3B001.e",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0070",
    "no": "모놀리식 집적 회로 개발 장비",
    "name": "b.1.m. 다음 특성 중 하나를 갖는 \"단일칩(Monolithic) 집적 회로\"의 수리 또는 트리밍을 위해 \"레이저\"를 사용하는 \"저장 프로그램 제어\" 장비:",
    "spec": "b.1.m. \"Stored program controlled\" equipment using \"lasers\" for the repair or trimming of \"monolithic integrated circuits\" with either of the following characteristics:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0071",
    "no": "마스크",
    "name": "b.2. 마스크, 마스크 \"기판\", 마스크 제조 장비 및 장치 제조용 이미지 전송 장비, 별표 2의2 25에 명시된 \"부품\" 및 \"구성품\"으로 다음의 것",
    "spec": "b.2. Masks, mask \"substrates,\" mask-making equipment and image transfer equipment for the manufacture of devices, \"parts\" and \"components\" as specified in the heading of 25, as follows:",
    "relatedAnnex2": "3B001.g",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0072",
    "no": "마스크, 망선(reticles) 및 디자인",
    "name": "b.2.a. 다음을 제외한 완성된 마스크, 망선(reticles) 및 디자인",
    "spec": "b.2.a. Finished masks, reticles and designs therefor, except:",
    "relatedAnnex2": "3B001.g",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0073",
    "no": "마스크 기판",
    "name": "b.2.b. 마스크 \"기판\"으로 다음의 것",
    "spec": "b.2.b. Mask \"substrates\" as follows:",
    "relatedAnnex2": "3B001.j",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0074",
    "no": "반도체 CAD 장비 (반도체 설계 툴)",
    "name": "b.2.c. 범용 컴퓨터가 아닌 반도체 장치 또는 집적 회로의 CAD(Computer Aided Design)를 위해 전용 설계된 장비",
    "spec": "b.2.c. Equipment, other than general purpose computers, specially designed for computer aided design (CAD) of semiconductor devices or integrated circuits;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0075",
    "no": "마스크, 망선(reticles) 또는 펠리클 제작 장비",
    "name": "b.2.d. 마스크 또는 망선(reticles) 제작을 위한 다음과 같은 장비 또는 기계:",
    "spec": "b.2.d. Equipment or machines, as follows, for mask or reticle fabrication:",
    "relatedAnnex2": "3B001.g",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0076",
    "no": "마스크, 망선",
    "name": "b.2.e. 마스크, 망선(reticles) 또는 펠리클 검사를 위한 \"저장 프로그램 제어\" 장비:",
    "spec": "b.2.e. \"Stored program controlled\" equipment for the inspection of masks, reticles or pellicles with:",
    "relatedAnnex2": "3B001.g",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0077",
    "no": "리소그래피 장비",
    "name": "b.2.f. 정렬(Align)과 노출 스텝-반복(Step & repeat)(웨이퍼에 직접 스텝) 또는 스텝-스캔(스캐너) 장비로서 사진광학(Photo-optical) 또는 X선(X-ray) 방법을 사용하여 웨이퍼를 가공하기 위한 것으로서 다음 중 하나의 특성을 갖는 것:",
    "spec": "b.2.f. Align and expose equipment for wafer production using photo-optical or X-ray methods, e.g., lithography equipment, including both projection image transfer equipment and step and repeat (direct step on wafer) or step and scan (scanner) equipment, capable of performing any of the following functions:",
    "relatedAnnex2": "3B001.f",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0078",
    "no": "패턴 생성 장비",
    "name": "b.2.g. 2.5 마이크로미터 미만의 패턴을 생성할 수 있는 투영 이미지 전송용 전자빔, 이온빔 또는 X선 장비",
    "spec": "b.2.g. Electron beam, ion beam or X-ray equipment for projection image transfer capable of producing patterns less than 2.5 micrometer;",
    "relatedAnnex2": "3B001.f",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0079",
    "no": "웨이퍼 직접 기록 장비",
    "name": "b.2.h. 2.5마이크로미터 미만의 패턴을 생성할 수 있는 웨이퍼에 직접 기록하기 위해 \"레이저\"를 사용하는 장비",
    "spec": "b.2.h. Equipment using \"lasers\" for direct write on wafers capable of producing patterns less than 2.5 micrometer.",
    "relatedAnnex2": "3B001.f.4",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0080",
    "no": "집적회로 조립용 장비",
    "name": "b.3. 다음과 같은 집적 회로 조립용 장비:",
    "spec": "b.3. Equipment for the assembly of integrated circuits, as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0081",
    "no": "클린룸용 필터",
    "name": "b.4. 0.02832 m3 당 0.3 마이크로미터 이하의 입자 10개 이하의 공기 환경을 제공할 수 있는 클린룸용 필터 및 그에 적합한 필터 재료",
    "spec": "b.4. Filters for clean rooms capable of providing an air environment of 10 or less particles of 0.3 micrometer or smaller per 0.02832 m3 and filter materials therefor.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0082",
    "no": "5",
    "name": "전자 시험 및 검사 장비",
    "spec": "전자 \"구성품\" 및 재료의 검사 또는 시험을 위해 별표2 3B002에서 통제하지 않는 장비 및 이를 위해 전용 설계된 \"부품\", \"구성품\" 및 \"부속품\"으로서 다음의 것",
    "relatedAnnex2": "Equipment not controlled by 3B002 for the inspection or testing of electronic \"components\" and materials, and specially designed \"parts,\" \"components\" and \"accessories\" therefor.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0083",
    "no": "전자 튜브 및 광학 요소 검사 장비",
    "name": "a. 별표2 3A001 또는 별표 2의2 1에 의해 통제되는 전자 튜브, 광학 요소 및 전용 설계된 \"부품\" 및 \"구성품\"의 검사 또는 시험을 위해 전용 설계된 장비;",
    "spec": "a. Equipment specially designed for the inspection or testing of electron tubes, optical elements and specially designed \"parts\" and \"components\" therefor controlled by 3A001 or paragraph 1;",
    "relatedAnnex2": "3A0013B002",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0084",
    "no": "집적회로 검사 장비",
    "name": "b. 반도체 장치, 집적 회로 및 \"전자 조립품\"의 검사 또는 시험을 위해 전용 설계된 장비 및 이러한 장비의 특성을 통합하거나 갖는 시스템으로 다음의 것:",
    "spec": "b. Equipment specially designed for the inspection or testing of semiconductor devices, integrated circuits and \"electronic assemblies\", as follows, and systems incorporating or having the characteristics of such equipment:",
    "relatedAnnex2": "3B002",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0085",
    "no": "웨이퍼 오류 및 오염물질 검사 장비",
    "name": "b.1. 패턴 비교를 위한 광학 이미지 획득 기술을 사용하여 웨이퍼, \"기판\" 등에서 0.6 마이크로미터 이하의 결함, 오류 또는 오염물질을 자동으로 감지하기 위한 \"저장 프로그램 제어\" 검사 장비",
    "spec": "b.1. \"Stored program controlled\" inspection equipment for the automatic detection of defects, errors or contaminants of 0.6 micrometer or less in or on processed wafers, \"substrates\", other than printed circuit boards or chips, using optical image acquisition techniques for pattern comparison;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0086",
    "no": "집적회로 측정 및 분석 장비",
    "name": "b.2. 전용 설계된 \"저장 프로그램 제어\" 측정 및 분석 장비로 다음의 것:",
    "spec": "b.2. Specially designed \"stored program controlled\" measuring and analysis equipment, as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0087",
    "no": "웨이퍼 프로빙 장비",
    "name": "b.3. 다음과 같은 특성을 가진 \"저장 프로그램 제어\" 웨이퍼 프로빙 장비:",
    "spec": "b.3. \"Stored program controlled\" wafer probing equipment having any of the following characteristics:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0088",
    "no": "반도체 시험 장비",
    "name": "b.4. 시험 장비로 다음의 것;",
    "spec": "b.4. Test equipment as follows:",
    "relatedAnnex2": "3B002",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0089",
    "no": "비접촉식 반도체 검사 장비",
    "name": "b.5. 3 keV 이하에서 작동하도록 설계된 전자 빔 시험 시스템 또는 다음 중 하나가 있는 전원이 공급되는 반도체 장치의 비접촉식 프로빙 용 \"레이저\"빔 시스템:",
    "spec": "b.5. Electron beam test systems designed for operation at 3 keV or below, or \"laser\" beam systems, for non-contactive probing of powered-up semiconductor devices having any of the following:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0090",
    "no": "레이아웃 분석 장비",
    "name": "b.6. 마스크 또는 반도체 장치의 제조, 수리, 물리적 레이아웃 분석 및 시험을 위해 전용 설계된 \"저장 프로그램 제어\" 다기능 집속 이온 빔 시스템으로 다음 특성 중 하나를 갖는 것:",
    "spec": "b.6. \"Stored program controlled\" multifunctional focused ion beam systems specially designed for manufacturing, repairing, physical layout analysis and testing of masks or semiconductor devices and having either of the following characteristics:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0091",
    "no": "입자 측정 장비",
    "name": "b.7. 공기 중 입자 크기 및 농도를 측정하도록 설계된 \"레이저\"를 사용하는 입자 측정 시스템으로 다음의 특성을 모두 갖는 것:",
    "spec": "b.7. Particle measuring systems employing \"lasers\" designed for measuring particle size and concentration in air having both of the following characteristics:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0092",
    "no": "6",
    "name": "레지스트",
    "spec": "193 ∼ 370 nm 파장에서 사용하기 위해 특별히 조정(최적화)된 반도체 리소그래피용으로 설계된 양성 레지스트",
    "relatedAnnex2": "Positive resists designed for semiconductor lithography specially adjusted (optimized) for use at wavelengths between 370 and 193 nm.",
    "country": "3C002.a",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0093",
    "no": "7",
    "name": "전자소자 및 전자장비 개발, 생산 또는 사용을 위한 소프트웨어",
    "spec": "별표 2의2 1에 의해 통제되는 전자 소자, \"부품\" 또는 \"구성품\", 별표 2의2 2에 의해 통제되는 범용 전자 장비, 별표 2의2 4 및 별표 2의2 5에 의해 통제되는 장비의 “생산” 및 시험 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계된 \"소프트웨어\"; 또는 3B001.g 및 .h에 의해 통제되는 장비의 \"사용\"을 위해 전용 설계된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed for the \"development\", \"production\", or \"use\" of electronic devices, \"parts\" or \"components\" controlled by paragraph 1, general purpose electronic equipment controlled by paragraph 2, or manufacturing and test equipment controlled by paragraph 4 and 5; or \"software\" specially designed for the \"use\" of equipment controlled by 3B001.g and .h.",
    "country": "3D001",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0094",
    "no": "8",
    "name": "전자소자 및 전자장비 \"개발\", \"생산\" 또는 \"사용\"을 위한 기술",
    "spec": "별표 2의2 1에서 통제하는 전자 장치, \"부품\" 또는 \"구성품\", 별표 2의2 2에서 통제하는 범용 전자 장비 또는 별표 2의2 4 및 별표 2의2 5에서 통제하는 제조 및 시험 장비, 또는 별표 2의2 6에 의해 통제되는 재료의 \"개발\", \"생산\" 또는 \"사용\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"development,\" \"production\" or \"use\" of electronic devices, \"parts\" or \"components\" controlled by paragraph 1, general purpose electronic equipment controlled by paragraph 2, or manufacturing and test equipment controlled by paragraph 4 or 5, or materials controlled by paragraph 6.",
    "country": "3E001",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0095",
    "no": "9",
    "name": "컴퓨터, 전자 조립품 및 관련 장비",
    "spec": "별표2 4A001 또는 별표2 4A003에 의하여 통제되지 않는 컴퓨터, “전자 조립품” 및 관련 장비 및 이를 위하여 전용 설계된 “부품” 및 “구성품”",
    "relatedAnnex2": "Computers, \"electronic assemblies\" and related equipment, not controlled by 4A001 or 4A003, and specially designed \"parts\" and \"components\" therefor.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0096",
    "no": "극한 온도에서 작동하는 컴퓨터",
    "name": "a. 343 K(70 °C)을 초과하는 주변 온도에서 작동하는 전자 컴퓨터 및 관련 장비, \"전자 조립품\" 및 전용 설계된 \"부품\" 및 \"구성품\"",
    "spec": "a. Electronic computers and related equipment, and \"electronic assemblies\" and specially designed \"parts\" and \"components\" therefor, rated for operation at an ambient temperature above 343 K (70°C);",
    "relatedAnnex2": "4A001.a.1",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0097",
    "no": "신호 처리 또는 이미지 향상 장비",
    "name": "b. 0.0128 Weighted TeraFLOPS(WT) 이상인 \"최적수행성능\"( \"APP\")을 갖는 \"신호 처리\" 또는 이미지 향상 장비를 포함하는 \"디지털 컴퓨터\"",
    "spec": "b. \"Digital computers\", including equipment of \"signal processing\" or image enhancement\", having an \"Adjusted Peak Performance\" (\"APP\") equal to or greater than 0.0128 Weighted TeraFLOPS (WT);",
    "relatedAnnex2": "4A003.b",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0098",
    "no": "고성능 컴퓨터 (병렬처리 컴퓨터)",
    "name": "c. 프로세서의 통합에 의하여 성능을 향상시키기 위해 전용 설계되거나 개조된 \"전자 조립품\"으로 다음의 것:",
    "spec": "c. \"Electronic assemblies\" that are specially designed or modified to enhance performance by aggregation of processors, as follows:",
    "relatedAnnex2": "4A003.c4A003.g",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0099",
    "no": "신호 처리 또는 이미지 향상 장비",
    "name": "f. 0.0128 Weighted TeraFLOPS WT 이상인 \"최적수행성능\" (\"APP\")을 갖는 \"신호 처리\" 또는 \"이미지 향상\"을 위한 장비;",
    "spec": "f. Equipment for \"signal processing\" or \"image enhancement\" having an \"Adjusted Peak Performance\" (\"APP\") equal to or greater than 0.0128 Weighted TeraFLOPS WT;",
    "relatedAnnex2": "4A003.b",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0100",
    "no": "터미널 인터페이스 장비를 포함하는 컴퓨터",
    "name": "i. 별표 2의2 14번 항목에 규정된 제한을 초과하는 터미널 인터페이스 장비를 포함하는 장비;",
    "spec": "i. Equipment containing terminal interface equipment exceeding the limits in paragraph 14;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0101",
    "no": "컴퓨터 성능 통합을 위한 외부 연결 장치",
    "name": "j. 80 Mbyte/s를 초과하는 데이터 속도로 통신할 수 있는 \"디지털 컴퓨터\" 또는 관련 장비의 외부 상호 연결을 제공하기 위해 전용 설계된 장비",
    "spec": "j. Equipment specially designed to provide external interconnection of \"digital computers\" or associated equipment that allows communications at data rates exceeding 80 Mbyte/s.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0102",
    "no": "하이브리드 컴퓨터",
    "name": "k. \"하이브리드 컴퓨터\" 및 \"전자 조립품\" 및 전용 설계된 \"부품\" 및 \"구성품\"으로 다음과 같은 특성을 모두 가진 아날로그-디지털 변환기를 포함하는 것;",
    "spec": "k. \"Hybrid computers\" and \"electronic assemblies\" and specially designed \"parts\" and \"components\" therefor containing analog-to-digital converters having all of the following characteristics:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0103",
    "no": "10",
    "name": "프로그램 증명 소프트웨어 등",
    "spec": "“프로그램” 증명 및 검증 “소프트웨어”, “소스 코드”의 자동 생성을 허용하는 “소프트웨어” 및 “실시간 처리” 장비를 위해 전용 설계된 운영 체제 “소프트웨어”",
    "relatedAnnex2": "\"Program\" proof and validation \"software,\" \"software\" allowing the automatic generation of \"source codes,\" and operating system \"software\" that are specially designed for \"real-time processing\" equipment",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0104",
    "no": "프로그램 증명 및 검증 소프트웨어",
    "name": "a. 500,000개를 초과하는 \"소스 코드\" 명령어를 포함하는 \"프로그램\"을 위하여 설계 또는 개조되고 수학 및 분석 기술을 사용하는 \"프로그램\" 증명 및 검증 \"소프트웨어\"",
    "spec": "a. \"Program\" proof and validation \"software\" using mathematical and analytical techniques and designed or modified for \"programs\" having more than 500,000 \"source code\" instructions;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0105",
    "no": "소스코드 자동생성 프로그램",
    "name": "b. 별표2, 별표2의2에 의해 통제되는 외부 센서로부터 수집된 데이터로 \"소스 코드\"를 자동 생성을 허용하는 \"소프트웨어\" 또는",
    "spec": "b. \"Software\" allowing the automatic generation of \"source codes\" from data acquired on line from external sensors described in the Appendix 2 and Appendix 2-2; or",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0106",
    "no": "실시간 운영체제 (RTOS)",
    "name": "c. 20 마이크로 초 미만의 전역 인터럽트 지연 시간을 보장하는 \"실시간 처리\" 장비를 위해 전용 설계된 운영 체제 \"소프트웨어\"",
    "spec": "c. Operating system \"software\" specially designed for \"real-time processing\" equipment that guarantees a global interrupt latency time of less than 20 microseconds.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0107",
    "no": "11",
    "name": "컴퓨터의 개발, 생산 또는 사용을 위한 소프트웨어",
    "spec": "별표2 4D001에서 통제되는 것 이외의 “소프트웨어”로 별표2 4A101, 별표 2의2의 9에 의해 통제되는 장비의 “개발”, “생산” 또는 “사용”을 위해 전용 설계되거나 개조된 것",
    "relatedAnnex2": "“Software” other than that controlled in 4D001 specially designed or modified for the \"development\", \"production\", or \"use\" of equipment controlled by 4A101, 9.",
    "country": "4D001",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0108",
    "no": "12",
    "name": "컴퓨터의 개발, 생산 또는 사용을 위한 기술",
    "spec": "별표 2의2의 9에 의해 통제되는 장비의 \"개발\", \"생산\" 또는 \"사용\" 또는 별표 2의2의 10 또는 11에 의해 통제되는 \"소프트웨어\"를 위한 “기술”로 별표2 4E001에서 통제되는 것 이외의 \"기술\"",
    "relatedAnnex2": "\"Technology\" other than that controlled in 4E001 for the \"development,\" \"production,\" or \"use\" of equipment controlled by paragraph 9, or \"software\" controlled by paragraph 10 or 11.",
    "country": "4E001",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0109",
    "no": "13",
    "name": "다중 데이터 스트림 처리 장비 개발 기술",
    "spec": "\"다중 데이터 스트림 처리\"를 위하여 설계된 장비의 \"개발\" 또는 \"생산\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"development\" or \"production\" of equipment designed for \"multi-data-stream processing.\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0110",
    "no": "14",
    "name": "통신 장비",
    "spec": "별표2 5A001에 의해 통제되지 않는 통신 장비로서 다음의 것",
    "relatedAnnex2": "Telecommunication equipment, not controlled by 5A001;",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0111",
    "no": "통신 장비",
    "name": "a. 별표2 5A001.a에 의해 통제되지 않고, 219 K(-54˚C) ∼ 397 K (124˚C)의 온도범위 밖에서 작동하도록 전용 설계된 모든 통신 장비",
    "spec": "a. Any type of telecommunications equipment, not controlled by 5A001.a, specially designed to operate outside the temperature range from 219 K (-54˚C) to 397 K (124˚C).",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0112",
    "no": "통신 전송 장비",
    "name": "b. 다음과 같은 특성, 기능 또는 특징을 갖는 통신 전송 장비 및 시스템, 그리고 전용 설계된 \"부품\", \"구성품\" 및 \"부속품\":",
    "spec": "b. Telecommunication transmission equipment and systems, and specially designed \"parts,\" \"components\" and \"accessories\" therefor, having any of the following characteristics, functions or features:",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0113",
    "no": "저장 프로그램 통제 스위칭 장비 및 관련 신호 시스템",
    "name": "c. 다음과 같은 특성, 기능 또는 특징 및 이를 위해 전용 설계된 \"부품\", \"구성품\" 및 \"부속품\"을 포함하는 \"저장 프로그램 제어\" 스위칭 장비 및 관련 신호 시스템",
    "spec": "c. \"Stored program controlled\" switching equipment and related signaling systems, having any of the following characteristics, functions or features, and specially designed \"parts,\" \"components\" and \"accessories\" therefor:",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0114",
    "no": "광섬유 및 케이블",
    "name": "d. 단일 모드 작동을 위해 설계된 50 m를 초과하는 광섬유 및 광섬유 케이블",
    "spec": "d. Optical fibers and optical fiber cables of more than 50 m in length designed for single mode operation;",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0115",
    "no": "중앙집중식 네트워크 통제",
    "name": "e. 다음과 같은 특성을 모두 갖는 중앙집중식 네트워크 통제:",
    "spec": "e. Centralized network control having all of the following characteristics:",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0116",
    "no": "위상 배열 안테나",
    "name": "f. 10.5 GHz를 초과하는 주파수에서 작동하고, 능동소자와 이산 \"부품\" 또는 \"구성품\"을 포함하며 빔 성형 및 지향의 전자적 제어가 가능하도록 설계된 위상 배열 안테나. 단, 국제민간항공기구(ICAO : International Civil Aviation Organization) 표준(마이크로파 착륙 시스템(MLS))을 충족하는 계기착륙시스템은 제외",
    "spec": "f. Phased array antennas, operating above 10.5 GHz, containing active elements and distributed \"parts\" or \"components,\" and designed to permit electronic control of beam shaping and pointing, except for landing systems with instruments meeting International Civil Aviation Organization (ICAO) standards (microwave landing systems (MLS)).",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0117",
    "no": "이동 통신 장비",
    "name": "g. 별표2에 명시되지 않은 이동 통신 장비, \"부품\", “전자 조립품” 및 \"구성품\"",
    "spec": "g. Mobile communications equipment, and \"parts,\" “electronic assemblies” and \"components\" therefor; or",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0118",
    "no": "무선 중계 통신 장비",
    "name": "h. 19.7 GHz이상의 주파수에서 사용하도록 설계된 무선 중계 통신 장비, \"부품\" 및 \"구성품\"",
    "spec": "h. Radio relay communications equipment designed for use at frequencies equal to or exceeding 19.7 GHz and \"parts\" and \"components\" therefor,",
    "relatedAnnex2": "5A001",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0119",
    "no": "15",
    "name": "통신 시험 장비",
    "spec": "별표2에 명시되지 않은 통신 시험 장비",
    "relatedAnnex2": "Telecommunications test equipment,",
    "country": "5B001",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0120",
    "no": "16",
    "name": "광섬유 제조용 소재",
    "spec": "별표 2의2 14에 의해 통제되는 광섬유 제조에 최적화된 유리 또는 기타 재료의 프리폼",
    "relatedAnnex2": "Preforms of glass or of any other material optimized for the manufacture of optical fibers controlled by 14.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0121",
    "no": "17",
    "name": "통신 장비의 개발, 생산, 사용 소프트웨어",
    "spec": "다음과 같이 별표 2의2 14 및 15에 의해 통제되는 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계되거나 수정된 \"소프트웨어\" 및 다음과 같은 “동적 적응 라우팅” “소프트웨어”",
    "relatedAnnex2": "\"Software\" specially designed or modified for the \"development,\" \"production\" or \"use\" of equipment controlled by paragraph 14 and 15, and “dynamic adaptive routing” “software” as described as follows:",
    "country": "5A001",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0122",
    "no": "18",
    "name": "통신 장비, 소프트웨어의 개발, 생산, 사용 기술",
    "spec": "별표 2의2 14 또는 별표 2의2 15에 의해 통제되는 장비, 별표 2의2 17에 의해 통제되는 \"소프트웨어\"의 \"개발\", \"생산\" 또는 \"사용\" \"기술\"과 다음과 같은 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"development\", \"production\" or \"use\" of equipment controlled by paragraph 14 or 15, or \"software\" controlled by 17, and other \"technologies\" as follows:",
    "country": "5A001",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0123",
    "no": "19",
    "name": "정보 암호화 정보보안 장비",
    "spec": "별표2 5A002에 의해 통제되지 않는 장비로 별표2의 5부 2장 주3: 암호화 기술해설에 따라 대중적으로 소매판매처에서 구입 가능한 품목",
    "relatedAnnex2": "Commodities classified as mass market encryption commodities in accordance with Cryptography Note – Note 3 to Category 5, Part 2.",
    "country": "5A002",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0124",
    "no": "20",
    "name": "정보 암호화 정보보안 소프트웨어",
    "spec": "별표2 5D002에 의해 통제되지 않는 “정보보안” \"소프트웨어\"로 별표2의 5부 2장 주3: 암호화 기술해설에 따라 대중적으로 소매판매처에서 구입 가능한 품목",
    "relatedAnnex2": "\"Software\" classified as mass market encryption software in accordance with Cryptography Note – Note 3 to Category 5, Part 2.",
    "country": "5D002",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0125",
    "no": "21",
    "name": "정보 암호화 정보보안 품목 및 소프트웨어의 사용 기술",
    "spec": "별표2 5E002에 의해 통제되지 않는 일반 기술해설에 따른 “정보보안” “기술”로 별표2-2에 명시된 대중 시장 품목 또는 대중 시장 \"소프트웨어\"의 \"사용\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\", for the \"use\" of mass market commodities controlled by 19 or mass market \"software\" controlled by 20.",
    "country": "5E002",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0126",
    "no": "22",
    "name": "해양 또는 지상 음향장비",
    "spec": "별표 2에 명시되지 않은 해양 또는 지상 음향장비로서 해저 물체 또는 특징들, 수면/수중 선박과 수중 운반 장치의 위치를 감지 및 특정할 수 있는 것들과, 전용 설계된 “부품”과 “구성품”",
    "relatedAnnex2": "Marine or terrestrial acoustic equipment, , capable of detecting or locating underwater objects or features or positioning surface vessels or underwater vehicles; and specially designed \"parts\" and \"components,\"",
    "country": "6A001.a1",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0127",
    "no": "23",
    "name": "광센서",
    "spec": "별표 2 6A002 에 의해 통제되지 않는 광센서로서 다음의 것",
    "relatedAnnex2": "Optical Sensors, not controlled by 6A002, as follows:",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0128",
    "no": "영상증배관",
    "name": "a. 영상증배관(Image intensifier tubes)과 이것의 전용 설계된 “구성품”으로서 다음의 것:",
    "spec": "a. Image intensifier tubes and specially designed \"components\" therefor, as follows:",
    "relatedAnnex2": "6A002.a.2",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0129",
    "no": "직시영상장비",
    "name": "b. 가시광선 및 적외선 대역에서 동작하는 직시영상장비로서 별표 2의2 23의 a.1.에 나온 특징들을 지닌 영상증배관을 포함하는 것",
    "spec": "b. Direct view imaging equipment operating in the visible or infrared spectrum, incorporating image intensifier tubes having the characteristics listed in 23.a.1.",
    "relatedAnnex2": "6A002.c",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0130",
    "no": "24",
    "name": "카메라",
    "spec": "별표 2 6A003 또는 별표 2 6A203에서 통제되지 않는 카메라 중 다음의 것",
    "relatedAnnex2": "Cameras, not controlled by 6A003 or 6A203, as follows:",
    "country": "6A0036A203",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0131",
    "no": "25",
    "name": "광학필터 및 광섬유",
    "spec": "별표 2 6A004에서 통제되지 않는 광학계들로서 다음의 것",
    "relatedAnnex2": "Optics, not controlled by 6A004, as follows :",
    "country": "6A004",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0132",
    "no": "26",
    "name": "레이저",
    "spec": "“레이저”로서 다음의 것",
    "relatedAnnex2": "\"Lasers\" as follows:",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0133",
    "no": "이산화탄소 레이저",
    "name": "a. 이산화탄소 “레이저”로서 다음의 하나의 것:",
    "spec": "a. Carbon dioxide (CO2) \"lasers\" having any of the following:",
    "relatedAnnex2": "6A005.d.3",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0134",
    "no": "반도체 레이저",
    "name": "b. 반도체 “레이저”로서 다음의 것",
    "spec": "b. Semiconductor “lasers”, as follows:",
    "relatedAnnex2": "6A005.d.1.d",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0135",
    "no": "루비 레이저",
    "name": "c. 루비 “레이저”로서 펄스당 출력 에너지가 20 J을 초과하는 것;",
    "spec": "c. Ruby \"lasers\" having an output energy exceeding 20 J per pulse;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0136",
    "no": "비-파장 가변 펄스 레이저",
    "name": "d. 비-“파장가변” “펄스 레이저”로서 출력 파장이 975 nm를 초과하고 1,150 nm이하인 것으로 다음 중 하나인 것:",
    "spec": "d. Non-“tunable” pulsed “lasers\" having an output wavelength exceeding 975 nm but not exceeding 1,150 nm and having any of the following:",
    "relatedAnnex2": "6A005.b",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0137",
    "no": "비-파장 가변 연속파형 레이저",
    "name": "e. 비-“파장가변” “연속파형 레이저”로서 출력 파장이 975 nm 를 초과하고 1,150 nm 이하이며 다음 중 하나인 것:",
    "spec": "e. Non-“tunable” “continuous wave (CW) “lasers\", having an output wavelength exceeding 975 nm but not exceeding 1,150nm and having any of the following:",
    "relatedAnnex2": "6A005.a",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0138",
    "no": "비-파장 가변 레이저",
    "name": "f. 비-“파장가변” “레이저”로서 동작 파장이 1,400 nm를 초과하고 1,555 nm 이하인 것으로 다음 중 하나인 것:",
    "spec": "f. Non-“tunable” \"lasers\", having a wavelength exceeding 1,400 nm, but not exceeding 1,555 nm and having any of the following:",
    "relatedAnnex2": "6A005.a",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0139",
    "no": "자유전자 레이저",
    "name": "g. 자유전자 “레이저”",
    "spec": "g. Free electron \"lasers.\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0140",
    "no": "27",
    "name": "자기계 등",
    "spec": "별표 2 6A006에서 통제하지 않는 “자기계”, “초전도” 성 전자기 센서, 그리고 이를 위해 전용 설계된 “구성품”으로서 다음의 것:",
    "relatedAnnex2": "“Magnetometers” not controlled by 6A006, \"Superconductive\" electromagnetic sensors, and specially designed \"components\" therefor, as follows",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0141",
    "no": "자기계",
    "name": "a. 별표 2에 명시되지 않은 “자기계”(다른 조항에서 특정되지 않은 것)로서 1.0 nT(rms) / √Hz. 보다 낮은(우수한) 감도를 갖는 것",
    "spec": "a. “Magnetometers”, having a 'sensitivity' lower (better) than 1.0 nT (rms) per square root Hz.",
    "relatedAnnex2": "6A006.a",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0142",
    "no": "전자기센서",
    "name": "b. “초전도” 성 전자기 센서, 구성품으로서 “초전도” 성 물질로 만들어진 것:",
    "spec": "b. \"Superconductive\" electromagnetic sensors, \"components\" manufactured from \"superconductive\" materials:",
    "relatedAnnex2": "6A006.b",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0143",
    "no": "28",
    "name": "중력계",
    "spec": "별표 2에 명시되지 않은 지상용 중력계로서 다음의 것",
    "relatedAnnex2": "Gravity meters (gravimeters) for ground use, , as follows:",
    "country": "6A007",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0144",
    "no": "29",
    "name": "레이더 시스템",
    "spec": "별표 2에 명시되지 않은 레이더 시스템, 장비와 주요 “구성품”, 그리고 이의 전용 설계된 “구성품”으로서 다음의 것",
    "relatedAnnex2": "Radar systems, equipment and major \"components\", and specially designed \"components\" therefor, as follows:",
    "country": "6A008",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0145",
    "no": "30",
    "name": "지진관측 장비",
    "spec": "특정한 처리 장비로서 다음의 것",
    "relatedAnnex2": "Specific processing equipment, as follows:",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0146",
    "no": "31",
    "name": "자유전자 레이저",
    "spec": "다음 중 어느 하나를 위해 전용 설계되거나 변형된 것으로 장비, 압형, 압천대, 고정대 또는 궤간, 그리고 그 외 전용 설계된 “부품”, “구성품”, 그리고 “부속품”",
    "relatedAnnex2": "Equipment, including tools, dies, fixtures or gauges, and other specially designed \"parts,\" \"components\" and \"accessories\" therefor, specially designed or modified for any of the following:",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0147",
    "no": "32",
    "name": "광검출섬유",
    "spec": "500 mm보다 낮은 비트 길이(Beat length)를 갖도록 구조적으로 수정된 별표 2 6A002.d.3 에 의해 통제되지 않는 광검출섬유(Optical sensing fibers) 또는 몰분율(Mole fraction) 6 % 이상의 아연을 갖고 6C002.b에 명시되어 있지 않은 광센서 물질",
    "relatedAnnex2": "Optical sensing fibers not controlled by 6A002.d.3 that are modified structurally to have a beat length of less than 500 mm (high birefringence) or optical sensor materials not described in 6.C.2.b and having a zinc content of equal to or more than 6% by 'mole fraction.'",
    "country": "6A002.d.3",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0148",
    "no": "33",
    "name": "광소재",
    "spec": "광소재로서 다음의 것",
    "relatedAnnex2": "Optical materials, as follows:",
    "country": "6C004",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0149",
    "no": "34",
    "name": "광센서, 카메라, 음향장비, 자기계, 중력계, 레이더 관련 소프트웨어",
    "spec": "별표 2 6A002, 별표 2 6A003, 별표 2의2 22, 별표 2의2 27, 별표 2의2 28 또는 별표 2의2 29에 의해 통제되는 품목들의 “개발”, “생산”, “사용”을 위해 전용 설계된 것으로서 별표 2에 명시되지 않은 “소프트웨어”",
    "relatedAnnex2": "\"Software,\" specially designed for the \"development\", \"production\", or \"use\" of commodities controlled by 6A002, 6A003, paragraph 22, 27, 28 or 29.",
    "country": "6A0026A003",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0150",
    "no": "35",
    "name": "영상증배관, 광학필터 및 광섬유, 레이저 관련 소프트웨어",
    "spec": "별표 2의2 23, 별표 2의2 25 또는 별표 2의2 26에 의해 통제되는 장비의 “개발” 또는 “생산”을 위해 전용 설계된 “소프트웨어”",
    "relatedAnnex2": "\"Software\" specially designed for the \"development\" or \"production\" of equipment controlled by paragraph 23, 25 or 26.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0151",
    "no": "36",
    "name": "항공교통 관제, 지진 침범 감시 관련 소프트웨어",
    "spec": "별표 2 6D003에 의해 통제되지 않는 다른 “소프트웨어”로서 다음의 것",
    "relatedAnnex2": "Other \"software,\" not controlled by 6D003:",
    "country": "6D003",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0152",
    "no": "37",
    "name": "음향 장비, 자기계, 중력계, 레이더, 지진관측 장비 관련 기술",
    "spec": "별표 2의2 22, 별표 2의2 27, 별표 2의2 28, 별표 2의2 29 또는 별표 2의2 30.c에 의해 통제되는 장비의 “개발”, “생산” 또는 “사용”을 위한 “기술”",
    "relatedAnnex2": "\"Technology\" for the \"development\", \"production\" or \"use\" of equipment controlled by 22, 27, 28, 29 or 30.c.",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0153",
    "no": "38",
    "name": "영상증배관, 광학필터 및 광섬유, 레이저, 광검출섬유, 광소재, 항공교통관제 및 지진 침범 감시 관련 기술",
    "spec": "별표 2의2 23, 별표 2의2 25, 별표 2의2 26, 별표 2의2 31, 별표 2의2 32, 별표 2의2 33 또는 별표 2의2 36에 의해 통제되는 장비, 소재, “소프트웨어”의 “개발” 또는 “생산”을 위한 “기술”",
    "relatedAnnex2": "\"Technology\" for the \"development\" or \"production\" of equipment, materials or \"software\" controlled by prargraph 23, 25, 26, 31, 32, 33 or 36.",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0154",
    "no": "39",
    "name": "광학 제조 기술",
    "spec": "별표 2 6E003에서 통제하지 않는 다른 “기술”로서 다음의 것",
    "relatedAnnex2": "Other \"technology\", not controlled by 6E003:",
    "country": "6E003",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0155",
    "no": "40",
    "name": "항법 및 항공전자 장비",
    "spec": "별표 2 7A003 또는 7A103에 의해 통제되지 않는 기타 항법 방향 탐지 장비, 항공기 탑재 통신 장비, 모든 항공기용 관성항법 시스템 그리고 별표 2에 명시되지 않은 기타 항공전자 장비, \"부품\" 및 \"구성품\"",
    "relatedAnnex2": "Other navigation direction finding equipment, airborne communication equipment, all aircraft inertial navigation systems not controlled under 7A003 or 7A103, and other avionic equipment, including \"parts\" and \"components,\"",
    "country": "7A0037A103",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0156",
    "no": "41",
    "name": "항법 및 항공전자 시험, 검사, 생산 장비",
    "spec": "항법 및 항공전자 장비의 시험, 검사 또는 \"생산\"을 위한 기타 장비",
    "relatedAnnex2": "Other equipment for the test, inspection, or \"production\" of navigation and avionics equipment.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0157",
    "no": "42",
    "name": "항법, 항공기 통신 및 항공전자 장비 관련 소프트웨어",
    "spec": "항법, 항공기 탑재 통신 및 기타 항공전자 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위한 것으로서 별표 2에 명시되지 않은 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\", for the \"development\", \"production\", or \"use\" of navigation, airborne communication and other avionics.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0158",
    "no": "43",
    "name": "항법, 항공기 통신 및 항공전자 장비 관련 기술",
    "spec": "항법, 항공기 탑재 통신 및 기타 항공전자 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위한 것으로서 별표 2에 명시되지 않은 \"기술\"",
    "relatedAnnex2": "\"Technology,\" for the \"development,\" \"production\" or \"use\" of navigation, airborne communication, and other avionics equipment.",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0159",
    "no": "44",
    "name": "선박, 해양 시스템 또는 장비",
    "spec": "별표 2 8A001 또는 8A002에 의해 통제되지 않은 선박, 해양 시스템 또는 장비와 이를 위해 전용 설계된 \"부품\" 및 \"구성품\"과 해양 보일러 및 \"부품\", \"구성품\", \"부속품\" 및 \"부착물\"로서 다음의 것",
    "relatedAnnex2": "Vessels, marine systems or equipment, and specially designed \"parts\" and \"components\" therefor, and marine boilers and \"parts,\" \"components,\" \"accessories,\" and \"attachments\" therefor",
    "country": "8A0018A002",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0160",
    "no": "45",
    "name": "선박, 해양 시스템 또는 장비의 개발, 생산 또는 사용을 위한 소프트웨어",
    "spec": "별표 2의2 44에서 통제되는 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계되거나 개조된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed or modified for the \"development\", \"production\" or \"use\" of equipment controlled by paragraph 44.",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0161",
    "no": "46",
    "name": "석유 및 가스 산업에서 사용되는 무인 잠수정의 운영을 위한 소프트웨어",
    "spec": "석유 및 가스 산업에서 사용되는 무인 잠수정의 운영을 위해 전용 설계된 “소프트웨어”",
    "relatedAnnex2": "\"Software\" specially designed for the operation of unmanned submersible vehicles used in the oil and gas industry.",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0162",
    "no": "47",
    "name": "선박, 해양 시스템 또는 장비의 개발, 생산 또는 사용을 위한 기술",
    "spec": "별표 2의2 44에서 통제되는 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"development\", \"production\" or \"use\" of equipment controlled by paragraph 44.",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0163",
    "no": "48",
    "name": "디젤 엔진 및 트랙터",
    "spec": "별표 2에 명시되지 않은 디젤 엔진 및 트랙터 그리고 이를 위해 전용 설계된 \"부품\" 및 \"구성품\" 으로서 다음의 것",
    "relatedAnnex2": "Diesel engines and tractors and specially designed \"parts\" and \"components\" therefor,",
    "country": "9A0019A002ML9.b.",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0164",
    "no": "49",
    "name": "항공기",
    "spec": "별표 2에 명시되지 않은 \"항공기\", 그리고 별표 2 9A001 또는 9A101에서 통제되지 않는 가스터빈엔진 그리고 별표 2에 명시되지 않은 \"부품\" 및 \"구성품\"으로서 다음의 것",
    "relatedAnnex2": "\"Aircraft\", n.e.s., and gas turbine engines and \"parts\" and \"components,\"",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0165",
    "no": "군용 항공기",
    "name": "a. 다음과 같은 비무장 군용 항공기(군사 작전을 위해 특별히 장착되거나 개조되지 않음):",
    "spec": "a. Military aircraft, demilitarized (not specifically equipped or modified for military operation), as follows:",
    "relatedAnnex2": "9A001ML10",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0166",
    "no": "항공기",
    "name": "b. 별표 2에 명시되지 않은 항공기;",
    "spec": "b. Aircraft ;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0167",
    "no": "가스터빈엔진",
    "name": "c. 항공가스터빈엔진과 이를 위해 전용 설계된 \"부품\" 및 \"구성품\"",
    "spec": "c. Aero gas turbine engines, and \"parts\" and \"components\" specially designed therefor.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0168",
    "no": "항공기를 위해 전용 설계된 부품 및 구성품",
    "name": "d. 별표 2에 명시되지 않은 \"항공기\"용으로 전용 설계된 \"부품\" 및 \"구성품\"",
    "spec": "d. \"Parts\" and \"components,\" specially designed for \"aircraft,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0169",
    "no": "가압 항공기 호흡장비",
    "name": "e. 별표 2에 명시되지 않은 가압 항공기 호흡장비; 그리고 이를 위해 전용 설계된 \"부품\" 및 \"구성품\"",
    "spec": "e. Pressurized aircraft breathing equipment, ; and \"parts\" and \"components\" specially designed therefor.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0170",
    "no": "50",
    "name": "캐노피, 하니스 및 전자 릴리스 메커니즘",
    "spec": "일반적인 스포츠 용도를 제외한 완성된 캐노피, 하니스 및 플랫폼과 이를 위한 전자 릴리스 메커니즘",
    "relatedAnnex2": "Complete canopies, harnesses, and platforms and electronic release mechanisms therefor, except such types as are in normal sporting use.",
    "country": "ML10",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0171",
    "no": "51",
    "name": "진동시험장비",
    "spec": "별표 2에 명시되지 않은 진동시험 장비와 전용 설계된 \"부품\" 및 \"구성품\"",
    "relatedAnnex2": "Vibration test equipment and specially designed \"parts\" and \"components,\"",
    "country": "2B116",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0172",
    "no": "52",
    "name": "가스터빈 블레이드, 베인 또는 슈라우드 캐스팅 관련 장비와 공구 또는 고정장치",
    "spec": "별표 2 9B001에 의해 통제되지 않고, 가스터빈 블레이드, 베인 또는 팁 슈라우드 캐스팅을 제조하거나 측정하기 위해 전용 설계된 장비, 공구 또는 고정장치로 다음의 것",
    "relatedAnnex2": "Specially designed equipment, tooling or fixtures for manufacturing or measuring gas turbine blades, vanes or tip shroud castings, as follows:",
    "country": "9B001",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0173",
    "no": "53",
    "name": "진동시험장비 관련 소프트웨어",
    "spec": "별표 2의2 48 또는 별표 2의2 51에 의해 통제되는 장비의 \"개발\" 또는 \"생산\"을 위한 것으로서 별표 2에 명시되지 않은 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\", for the \"development\" or \"production\" of equipment controlled by paragraph 48 or 51.",
    "country": "2D101",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0174",
    "no": "54",
    "name": "가스터빈 블레이드 관련 소프트웨어",
    "spec": "별표 2의2 49 또는 별표 2의2 52에 의해 통제되는 장비의 \"개발\" 또는 \"생산\"을 위한 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\", for the \"development\" or \"production\" of equipment controlled by paragraph 49 or 52.",
    "country": "9D001",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0175",
    "no": "55",
    "name": "진동시험장비 관련 기술",
    "spec": "별표 2의2 48 또는 별표 2의2 51에 의해 통제되는 장비의 \"개발\" 또는 \"생산\" 또는 \"사용\"을 위한 것으로서 별표 2에 명시되지 않은 \"기술\"",
    "relatedAnnex2": "\"Technology\", for the \"development\" or \"production\" or \"use\" of equipment controlled by paragraph 48 or 51.",
    "country": "2E001",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0176",
    "no": "56",
    "name": "가스터빈 블레이드 관련 기술",
    "spec": "별표 2의2 49 또는 별표 2의2 52에 의해 통제되는 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\", for the \"development\", \"production\" or \"use\" of equipment controlled by paragraph 49 or 52.",
    "country": "9E001",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0177",
    "no": "57",
    "name": "회전자 블레이드 팁 간극제어시스템 및 가스베어링 기술",
    "spec": "별표 2 9E003에 명시되지 않은 기타 \"기술\"로 다음의 것",
    "relatedAnnex2": "Other \"technology\", not described by 9E003, as follows:",
    "country": "9E001",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0178",
    "no": "58",
    "name": "폭동 통제용 물대포시스템, 부품 및 구성품",
    "spec": "폭동이나 집단 통제를 위한 물대포 체계, 그리고 이를 위해 전용 설계된 \"부품\" 및 \"구성품\"",
    "relatedAnnex2": "Water cannon systems for riot or crowd control, and \"parts\" and \"components\" specially designed therefor.",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0179",
    "no": "59",
    "name": "집행봉, 경찰봉, 경비봉, 톤파, 샘복, 채찍 등 타격 무기",
    "spec": "집행봉, 경찰봉, 경비봉, 톤파, 샘복, 채찍 등 법 집행을 위한 타격 무기",
    "relatedAnnex2": "Law enforcement striking weapons, including saps, police batons, side handle batons, tonfas, sjamboks, and whips.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0180",
    "no": "60",
    "name": "경찰용 헬멧 및 방패",
    "spec": "경찰용 헬멧 및 방패, 그리고 이를 위해 전용 설계된 \"구성품\"",
    "relatedAnnex2": "Police helmets and shields; and specially designed \"components,\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0181",
    "no": "61",
    "name": "처형하는 목적으로 설계된 장비",
    "spec": "인간을 대상으로 처형하는 목적으로 설계된 장비로 다음의 것:",
    "relatedAnnex2": "Equipment designed for the execution of human beings as follows.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0182",
    "no": "62",
    "name": "족쇄, 수갑 등 법 집행을 위한 구속 장치",
    "spec": "철각, 족쇄, 수갑, 구속복, 충격벨트, 충격슬리브, 구속의자와 같은 다지점 구속장치, 전용 설계된 \"부품\", \"구성품\", “부속품” 등 법 집행을 위한 구속 장치",
    "relatedAnnex2": "Law enforcement restraint devices, including leg irons, shackles, and handcuffs; straight jackets; stun cuffs; shock belts; shock sleeves; multipoint restraint devices such as restraint chairs; and specially designed \"parts,\" \"components\" and \"accessories,\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0183",
    "no": "63",
    "name": "고문 집행을 위해 특수 제작된 장치",
    "spec": "고문 집행을 위해 특수 제작된 손가락 죄거나 자르는 형틀, 가시봉, 별도로 기재되지 않은 경우 전용 설계된 \"부품\", \"구성품\", “부속품”",
    "relatedAnnex2": "Specially designed implements of torture, including thumbscrews, thumbcuffs, fingercuffs, spiked batons, and specially designed \"parts,\" \"components\" and “accessories”.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0184",
    "no": "64",
    "name": "특수 절차 장비 (링 자석)",
    "spec": "특수 절차 장비로 다음의 것:",
    "relatedAnnex2": "Specific processing equipment, as follows",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0185",
    "no": "65",
    "name": "오일 및 가스 개발 장비, 소프트웨어, 데이터",
    "spec": "오일 및 가스 시추 장비, 소프트웨어, 데이터로 아래의 것:",
    "relatedAnnex2": "Oil and gas exploration equipment, software, and data, as follows.",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0186",
    "no": "66",
    "name": "특수 절차 장비 (핫 셀, 글러브 박스)",
    "spec": "특수 절차 장비로 다음의 것:",
    "relatedAnnex2": "Specific processing equipment, as follows.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0187",
    "no": "67",
    "name": "폭동 또는 군중 통제를 위한 물대포 시스템 소프트웨어",
    "spec": "58에 의해 통제되는 상품의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed for the \"development,\" \"production\" or \"use\" of commodities controlled by paragraph 58.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0188",
    "no": "68",
    "name": "중성자, 방사선 수송, 유체역학 계산/모델링용 소프트웨어",
    "spec": "다음과 같은 특수 소프트웨어",
    "relatedAnnex2": "Specific software, as follows.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0189",
    "no": "69",
    "name": "폭동 또는 군중 통제를 위한 물대포 시스템 기술",
    "spec": "58에 의해 통제되는 상품의 \"개발\" 또는 \"생산\"을 위해 \"필요한\" \"기술\"",
    "relatedAnnex2": "\"Technology\" ''required'' for the ''development'' or ''production'' of commodities controlled by paragraph 58.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0190",
    "no": "70",
    "name": "법 집행 기관의 구속 장치, 비살상 수류탄 및 발사체를 위한 기술",
    "spec": "다음에 의해 통제되는 장비의 \"개발\" 또는 \"생산\"만을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\" exclusively for the \"development\" or \"production\" of equipment, as follow",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0191",
    "no": "71",
    "name": "최루 가스 제제를 포함한 화학 작용제",
    "spec": "순 중량이 20g 이하로 개별 포장된 경우를 제외한 1 % 이하의 orthochlorobenzalmalononitrile (CS) 또는 1 % 이하의 chloroacetophenone (CN)을 함유하는 최루 가스 제제를 포함한 화학 작용제;",
    "relatedAnnex2": "Chemical agents, including tear gas formulation containing 1 percent or less of orthochlorobenzalmalononitrile (CS), or 1 percent or less of chloroacetophenone (CN), except in individual containers with a net weight of 20 grams or less;",
    "country": "1A004",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0192",
    "no": "72",
    "name": "지문용 분말, 염료 및 잉크",
    "spec": "지문용 분말, 염료 및 잉크",
    "relatedAnnex2": "Fingerprinting powders, dyes, and inks.",
    "country": "1A005",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0193",
    "no": "73",
    "name": "보호 및 탐지 장비",
    "spec": "다음과 같이 군용으로 전용 설계되지 않고 별표2 1A004 또는 2B351에 의해 통제되지 않는 보호 및 탐지 장비, 그리고 별표2 1A004 또는 2B351에 의해 통제되지 않고 군용으로 전용 설계되지 않은 \"구성품\" 및 \"부품\".",
    "relatedAnnex2": "Protective and detection equipment not specially designed for military use and not controlled by 1A004 or 2B351, as follows, and \"parts\" and \"components\" not specially designed for military use and not controlled by 1A004 or 2B351 therefor.",
    "country": "1A005",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0194",
    "no": "74",
    "name": "특정 처리 장비(방사선 탐지, X-ray 변환기 등)",
    "spec": "다음과 같이 특별히 언급되지 않은 특정 처리 장비",
    "relatedAnnex2": "Specific processing equipment,, as follows",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0195",
    "no": "75",
    "name": "특정 처리 장비(전해조, 입자 가속기 등)",
    "spec": "특별히 언급되지 않은 다음과 같은 특정 처리 장비",
    "relatedAnnex2": "Specific processing equipment,, as follows",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0196",
    "no": "76",
    "name": "복합재료용 섬유",
    "spec": "별표2 1C010 또는 1C210에 의해 통제되지 않는 \"복합재료\" 구조물에 사용될 수 있는 비탄성률이 3.18 x 106 m 이상이고 비인장강도가 7.62 x 104 m 이상인 섬유상 및 필라멘트 소재",
    "relatedAnnex2": "Fibrous and filamentary materials, not controlled by 1C010 or 1C210, for use in \"composite\" structures and with a specific modulus of 3.18 x 106 m or greater and a specific tensile strength of 7.62 x 104 m or greater.",
    "country": "1C0101C210",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0197",
    "no": "77",
    "name": "백신, 면역 독소, 의료 제품, 진단 및 식품 검사 키트",
    "spec": "다음과 같은 백신, 면역 독소, 의료 제품, 진단 및 식품 검사 키트",
    "relatedAnnex2": "Vaccines, immunotoxins, medical products, diagnostic and food testing kits, as follows",
    "country": "1C3511C3531C354",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0198",
    "no": "78",
    "name": "에너지 물질을 포함하는 상업용 장약 및 장치, 그리고 기체 상태의 삼불화 질소",
    "spec": "에너지 물질을 포함하는 상업용 장약 및 장치, 그리고 기체 상태의 삼불화 질소",
    "relatedAnnex2": "Commercial charges and devices containing energetic materials, and nitrogen trifluoride in a gaseous state",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0199",
    "no": "79",
    "name": "화학 혼합물 및 의료, 분석, 진단 및 식품 테스트 키트",
    "spec": "별표2의 1C350에 의해 통제되는 화학물질이 포함된 혼합물 중 1C350에서 통제되지 않는 혼합물, 그리고 1C350에 의해 통제되는 화학물질이 포함된 1C350에 의해 통지되지 않는 의료, 분석, 진단 및 식품 테스트 키트로 다음의 것 (통제품목 리스트 참조).",
    "relatedAnnex2": "Mixtures not controlled by 1C350 that contain chemicals controlled by 1C350 and medical, analytical, diagnostic, and food testing kits not controlled by 1C350 that contain chemicals controlled by 1C350.d, as follows",
    "country": "1C350",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0200",
    "no": "80",
    "name": "합성 탄화수소유가 포함된 유압(작동)유",
    "spec": "다음의 특성을 모두 만족하는 1C006에 의해 통제되지 않는 합성 탄화수소유가 포함된 유압(작동)유",
    "relatedAnnex2": "Hydraulic fluids containing synthetic hydrocarbon oils, not controlled by 1C006, having all the following characteristics",
    "country": "1C006",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0201",
    "no": "81",
    "name": "질산암모늄을 함유하는 비료 혼합물",
    "spec": "질산암모늄을 포함하는 비료 및 중량기준 15%를 초과하는 질산암모늄을 함유하는 비료 혼합물. 단, 액체 비료(질산암모늄 함유) 또는 중량기준 15% 미만의 질산암모늄을 함유한 건조 비료는 제외",
    "relatedAnnex2": "Ammonium nitrate, including fertilizers and fertilizer blends containing more than 15% by weight ammonium nitrate, except liquid fertilizers (containing any amount of ammonium nitrate) or dry fertilizers containing less than 15% by weight ammonium nitrate.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0202",
    "no": "82",
    "name": "불소화되지 않은 고분자 물질",
    "spec": "별표2의 1C008에 의해 통제되지 않는 불소화되지 않은 고분자 물질로 다음의 것",
    "relatedAnnex2": "Non-fluorinated polymeric substances, not controlled by 1C008, as follows",
    "country": "1C008",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0203",
    "no": "83",
    "name": "특수 소재",
    "spec": "다음과 같은 특수 소재",
    "relatedAnnex2": "Specific materials,, as follows",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0204",
    "no": "84",
    "name": "특정 소프트웨어",
    "spec": "특정 “소프트웨어”로서 다음의 것",
    "relatedAnnex2": "Specific “software”, as follows",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0205",
    "no": "85",
    "name": "섬유 및 필라멘트 소재의 개발, 생산 또는 사용에 대한 기술",
    "spec": "76에서 통제하는 섬유 및 필라멘트 소재의 \"개발\", \"생산\" 또는 \"사용\"에 대한 \"기술\".",
    "relatedAnnex2": "\"Technology\" for the \"development\", \"production\", or \"use\" of fibrous and filamentary materials controlled by 76.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0206",
    "no": "86",
    "name": "폭발물 또는 기폭 장치 탐지 장비",
    "spec": "다양한 유형의 폭발물, 폭발성 잔류물 또는 기폭 장치의 존재를 감지하기 위한 자동화된 의사 결정을 위한 자동화 장치 또는 장치 조합으로 구성된 벌크 및 추적 기반의 폭발물 또는 기폭 장치 탐지 장비 및 \"부품\" 및 \"구성품\".",
    "relatedAnnex2": "Explosives or detonator detection equipment, both bulk and trace based, consisting of an automated device, or combination of devices for automated decision making to detect the presence of different types of explosives, explosive residue, or detonators; and \"parts\" and \"components,\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0207",
    "no": "87",
    "name": "공간 분해능을 갖는 은폐된 물체 감지 장비",
    "spec": "30 GHz ~ 3,000 GHz의 주파수 범위에서 작동하고 100 미터의 스탠드오프 거리에서 0.1 밀리라디안에서 1 밀리라디안까지의 공간 분해능을 갖는 은폐된 물체 감지 장비 및 \"부품\" 및 \"구성품\".",
    "relatedAnnex2": "Concealed object detection equipment operating in the frequency range from 30 GHz to 3,000 GHz and having a spatial resolution of 0.1 milliradian up to and including 1 milliradian at a standoff distance of 100 meters; and \"parts\" and \"components,\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0208",
    "no": "88",
    "name": "베어링 및 베어링 시스템",
    "spec": "별표2 2A001에 의해 통제되지 않는 베어링 및 베어링 시스템.",
    "relatedAnnex2": "Bearings and bearing systems not controlled by 2A001",
    "country": "2A001",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0209",
    "no": "89",
    "name": "라이닝된 배관, 피팅 및 밸브",
    "spec": "10 % 이상의 니켈 및/또는 크롬을 포함하는 스테인리스, 구리-니켈 합금 또는 기타 합금강으로 만들어지거나 라이닝된 배관, 피팅 및 밸브.",
    "relatedAnnex2": "Piping, fittings and valves made of, or lined with stainless, copper-nickel alloy or other alloy steel containing 10% or more nickel and/or chromium.",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0210",
    "no": "90",
    "name": "펌프",
    "spec": "전자기력에 의해 용융 금속을 이송하도록 설계된 펌프.",
    "relatedAnnex2": "Pumps designed to move molten metals by electromagnetic forces.",
    "country": "2B350.i",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0211",
    "no": "91",
    "name": "휴대용 발전기",
    "spec": "휴대용 발전기 및 전용 설계된 \"부품\" 및 \"구성품.\"",
    "relatedAnnex2": "Portable electric generators and specially designed \"parts\" and \"components.\"",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0212",
    "no": "92",
    "name": "벨로우즈 밀봉 밸브",
    "spec": "특수 처리 장비로 다음의 것",
    "relatedAnnex2": "Specific processing equipment, as follows",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0213",
    "no": "93",
    "name": "수치제어 유닛과 수치제어 공작기계",
    "spec": "공작기계를 위한 “수치제어” 유닛과 \"수치제어\" 공작기계,",
    "relatedAnnex2": "“Numerical control” units for machine tools and \"numerically controlled\" machine tools,",
    "country": "2B001",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0214",
    "no": "94",
    "name": "광학 품질 표면을 생성하기 위한 비 수치제어 공작기계",
    "spec": "광학 품질 표면을 생성하기 위한 비 \"수치제어\" 공작기계와 \"전용 설계된\" \"부품\"과 \"구성품\"으로서 다음의 것",
    "relatedAnnex2": "Non-\"numerically controlled\" machine tools for generating optical quality surfaces, (see List of Items Controlled) and specially designed \"parts\" and \"components\" therefor.",
    "country": "2B002",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0215",
    "no": "95",
    "name": "기어 제작 및/또는 마감 기계",
    "spec": "별표2 2B003에 의해 통제되지 않는 것으로서 AGMA 11보다 우수한 품질 수준의 기어를 생산할 수 있는 기어 제작 및/또는 마감 기계",
    "relatedAnnex2": "Gearmaking and/or finishing machinery not controlled by 2B003 capable of producing gears to a quality level of better than AGMA 11.",
    "country": "2B003",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0216",
    "no": "96",
    "name": "치수검사, 치수측정 시스템 또는 장치",
    "spec": "별표2 2B006 또는 2B206에 의해 통제되지 않는 치수검사, 치수측정 시스템 또는 장치로서 다음의 것",
    "relatedAnnex2": "Dimensional inspection or measuring systems or equipment not controlled by 2B006 or 2B206, as follows",
    "country": "2B006",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0217",
    "no": "97",
    "name": "실시간으로 처리된 피드백 정보를 활용할 수 있는 로봇",
    "spec": "별표2의 2B007 또는 2B207에 의해 통제되지 않는 \"로봇\"으로 \"프로그램\"을 생성 또는 수정하거나 수치화된 프로그램 데이터를 생성 또는 수정하기 위해 하나 또는 그 이상의 센서로부터 실시간으로 처리된 피드백 정보를 활용할 수 있는 로봇",
    "relatedAnnex2": "\"Robots\" not controlled by 2B007 or 2B207 that are capable of employing feedback information in real-time processing from one or more sensors to generate or modify \"programs\" or to generate or modify numerical program data.",
    "country": "2B007",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0218",
    "no": "98",
    "name": "93, 95~97 통제품목을 위한 어셈블리, 회로 기판 또는 인서트",
    "spec": "93으로 통제되는 공작기계 또는 95, 96 또는 97로 통제되는 장치를 위해 전용 설계된 어셈블리, 회로 기판 또는 인서트",
    "relatedAnnex2": "Assemblies, circuit boards or inserts specially designed for machine tools controlled by 93, or for equipment controlled by 95, 96 or 97.",
    "country": "2B008",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0219",
    "no": "99",
    "name": "특수 처리 장비 및 부품",
    "spec": "특정 처리 장비로서 다음의 것.",
    "relatedAnnex2": "Specific processing equipment as follows",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0220",
    "no": "100",
    "name": "폭발물 또는 기폭 장치 탐지 장비 소프트웨어",
    "spec": "86에 기술된 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계되거나 개조된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed or modified for the \"development\", \"production\" or \"use\" of equipment controlled by 86.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0221",
    "no": "101",
    "name": "공간 분해능을 갖는 은폐된 물체 감지 장비 소프트웨어",
    "spec": "87에 기술된 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 \"필요한\" \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" \"required\" for the \"development\", \"production\" or \"use\" of concealed object detection equipment controlled by 87.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0222",
    "no": "102",
    "name": "수치제어 공작기계 및 치수검사, 치수측정 장비의 개발 생산 사용을 위한 소프트웨어",
    "spec": "93, 95, 96, 97 또는 98에 기술된 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed for the \"development\", \"production\", or \"use\" of equipment controlled by 93, 95, 96, 97 or 98.",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0223",
    "no": "103",
    "name": "소프트웨어",
    "spec": "다음과 같은 특정 \"소프트웨어\".",
    "relatedAnnex2": "Specific \"software\", as follows",
    "country": "2D002",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0224",
    "no": "104",
    "name": "소프트웨어",
    "spec": "89 또는 90에 기술된 물품의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계되거나 개조된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software” specially designed or modified for the \"development,\" \"production,\" or \"use\" of items controlled by 89 or 90.",
    "country": "2D003",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0225",
    "no": "105",
    "name": "소프트웨어",
    "spec": "91에 기술된 휴대용 발전기의 \"개발\" 또는 \"생산\"을 위해 전용 설계된 \"소프트웨어\"",
    "relatedAnnex2": "\"Software\" specially designed for the \"development\" or \"production\" of portable electric generators controlled by 91.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0226",
    "no": "106",
    "name": "소프트웨어의 개발을 위해 필요한 기술",
    "spec": "91에 기술된 장비의 \"개발\", \"생산\" 또는 \"사용\"을 위해 \"필요한\" 또는 101에 기술된 \"소프트웨어\"의 개발\"을 위해 \"필요한\" \"기술\"",
    "relatedAnnex2": "\"Technology\" \"required\" for the \"development, \"production\" or \"use\" of equipment controlled by 91 or \"required\" for the \"development\" of \"software\" controlled by 101.",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0227",
    "no": "107",
    "name": "장비의 사용을 위해 필요한 기술",
    "spec": "93, 95, 96 또는 97에 기술된 장비의 \"사용\"을 위한 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"use\" of equipment controlled by 93, 95, 96 or 97.",
    "country": "2E001",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0228",
    "no": "108",
    "name": "장비의 사용에 대한 일반기술해설에 따른 기술",
    "spec": "89 또는 90에 기술된 장비의 \"사용\"에 대한 일반기술해설에 따른 \"기술\"",
    "relatedAnnex2": "\"Technology\" according to the General Technology Note for the \"use\" of equipment controlled by 89 or 90.",
    "country": "2E003",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0229",
    "no": "109",
    "name": "휴대용 발전기의 사용에 대한 기술",
    "spec": "91에 기술된 휴대용 발전기의 \"사용\"에 대한 \"기술\"",
    "relatedAnnex2": "\"Technology\" for the \"use\" of portable electric generators controlled by 91.",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0230",
    "no": "110",
    "name": "에틸렌 디클로라이드(CAS 107-06-2)",
    "spec": "Ethylene dichloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0231",
    "no": "111",
    "name": "나이트로메테인(CAS 75-52-5)",
    "spec": "Nitromethane",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0232",
    "no": "112",
    "name": "피크르산(CAS 88-89-1)",
    "spec": "Picric acid",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0233",
    "no": "113",
    "name": "알루미늄 클로라이드(CAS 7446-70-0)",
    "spec": "Aluminum chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0234",
    "no": "114",
    "name": "비소(CAS 7440-38-2)",
    "spec": "Arsenic",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0235",
    "no": "115",
    "name": "아르세닉 트리옥사이드(CAS 1327-53-3)",
    "spec": "Arsenic trioxide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0236",
    "no": "116",
    "name": "비스(2-클로로에틸)에틸아민 염산염(CAS 3590-07-6)",
    "spec": "Bis(2-chloroethyl)ethylamine hydrochloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0237",
    "no": "117",
    "name": "비스(2-클로로에틸)메틸아민 염산염(CAS 55-86-7)",
    "spec": "Bis(2-chloroethyl)methylamine hydrochloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0238",
    "no": "118",
    "name": "트리스(2-클로로에틸)아민 염산염(CAS 817-09-4)",
    "spec": "Tris(2-chloroethyl)amine hydrochloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0239",
    "no": "119",
    "name": "트리부틸 포스파이트(아인산염)(CAS 102-85-2)",
    "spec": "Tributylphosphite",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0240",
    "no": "120",
    "name": "메틸 이소시아네이트(CAS 624-83-9)",
    "spec": "Isocyanatomethane",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0241",
    "no": "121",
    "name": "퀴날딘(CAS 91-63-4)",
    "spec": "Quinaldine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0242",
    "no": "122",
    "name": "2-브로모-클로로에탄(CAS 107-04-0)",
    "spec": "2-bromo-chloroethane",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0243",
    "no": "123",
    "name": "벤질(CAS 134-81-6)",
    "spec": "Benzil",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0244",
    "no": "124",
    "name": "디에틸 에테르(CAS 60-29-7)",
    "spec": "Diethyl ether",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0245",
    "no": "125",
    "name": "디메틸 에테르(CAS 115-10-6)",
    "spec": "Dimethyl ether",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0246",
    "no": "126",
    "name": "디메틸아미노에탄올(CAS 108-01-0)",
    "spec": "Dimethylaminoethanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0247",
    "no": "127",
    "name": "2-메톡시에탄올(CAS 109-86-4)",
    "spec": "2-methoxyethanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0248",
    "no": "128",
    "name": "부티릴콜린에스테라아제 (BCHE)",
    "spec": "Butyrylcholinesterase (BCHE);",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0249",
    "no": "129",
    "name": "디에틸렌트리아민(CAS 111-40-0)",
    "spec": "Diethylenetriamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0250",
    "no": "130",
    "name": "디클로로메테인(CAS 75-09-2)",
    "spec": "Dichloromethane",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0251",
    "no": "131",
    "name": "디메틸아닐린(CAS 121-69-7)",
    "spec": "Dimethylaniline",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0252",
    "no": "132",
    "name": "에틸 브로마이드(CAS 74-96-4)",
    "spec": "Ethyl bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0253",
    "no": "133",
    "name": "염화에틸(CAS 75-00-3)",
    "spec": "Ethyl chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0254",
    "no": "134",
    "name": "에틸아민(CAS 75-04-7)",
    "spec": "Ethylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0255",
    "no": "135",
    "name": "핵사민(CAS 100-97-0)",
    "spec": "Hexamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0256",
    "no": "136",
    "name": "이소프로판올(CAS 67-63-0)",
    "spec": "Isopropanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0257",
    "no": "137",
    "name": "이소프로필 브로마이드(CAS 75-26-3)",
    "spec": "Isopropyl bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0258",
    "no": "138",
    "name": "이소프로필 에테르(CAS 108-20-3)",
    "spec": "Isopropyl ether",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0259",
    "no": "139",
    "name": "메틸아민(CAS 74-89-5)",
    "spec": "Methylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0260",
    "no": "140",
    "name": "메틸 브로마이드(CAS 74-83-9)",
    "spec": "Methyl bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0261",
    "no": "141",
    "name": "모노이소프로필아민(CAS 75-31-0)",
    "spec": "Monoisopropylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0262",
    "no": "142",
    "name": "오비독심 클로라이드(CAS 114-90-9)",
    "spec": "Obidoxime chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0263",
    "no": "143",
    "name": "브롬화 칼륨(CAS 7758-02-3)",
    "spec": "Potassium bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0264",
    "no": "144",
    "name": "피리딘(CAS 110-86-1)",
    "spec": "Pyridine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0265",
    "no": "145",
    "name": "브롬화 피리도스티그민(CAS 101-26-8)",
    "spec": "Pyridostigmine bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0266",
    "no": "146",
    "name": "브롬화 나트륨(CAS 7647-15-6)",
    "spec": "Sodium bromide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0267",
    "no": "147",
    "name": "금속 나트륨(CAS 7440-23-5)",
    "spec": "Sodium metal",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0268",
    "no": "148",
    "name": "트리부틸아민(CAS 102-82-9)",
    "spec": "Tributylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0269",
    "no": "149",
    "name": "트리에틸아민(CAS 121-44-8)",
    "spec": "Triethylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0270",
    "no": "150",
    "name": "트리메틸아민(CAS 75-50-3)",
    "spec": "Trimethylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0271",
    "no": "151",
    "name": "아세톤(CAS 67-64-1)",
    "spec": "Acetone",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0272",
    "no": "152",
    "name": "아세틸렌(CAS 74-86-2)",
    "spec": "Acetylene",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0273",
    "no": "153",
    "name": "암모니아(CAS 7664-41-7)",
    "spec": "Ammonia",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0274",
    "no": "154",
    "name": "안티모니(CAS 7440-36-0)",
    "spec": "Antimony",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0275",
    "no": "155",
    "name": "벤즈알데하이드(CAS 100-52-7)",
    "spec": "Benzaldehyde",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0276",
    "no": "156",
    "name": "벤조인(CAS 119-53-9)",
    "spec": "Benzoin",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0277",
    "no": "157",
    "name": "1-부탄올(CAS 71-36-3)",
    "spec": "1-Butanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0278",
    "no": "158",
    "name": "2-부탄올(CAS 78-92-2)",
    "spec": "2-Butanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0279",
    "no": "159",
    "name": "이소-부탄올(CAS 78-83-1)",
    "spec": "Iso-Butanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0280",
    "no": "160",
    "name": "Tert-부탄올(삼차-부탄올)(CAS 75-65-0)",
    "spec": "Tert-Butanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0281",
    "no": "161",
    "name": "칼슘 카바이드(CAS 75-20-7)",
    "spec": "Calcium carbide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0282",
    "no": "162",
    "name": "일산화탄소(CAS 630-08-0)",
    "spec": "Carbon monoxide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0283",
    "no": "163",
    "name": "염소(CAS 7782-50-5)",
    "spec": "Chlorine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0284",
    "no": "164",
    "name": "사이클로헥산올(CAS 108-93-0)",
    "spec": "Cyclohexanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0285",
    "no": "165",
    "name": "다이사이클로헥실아민(CAS 101-83-7)",
    "spec": "Dicyclohexylamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0286",
    "no": "166",
    "name": "에탄올(CAS 64-17-5)",
    "spec": "Ethanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0287",
    "no": "167",
    "name": "에틸렌(CAS 74-85-1)",
    "spec": "Ethylene",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0288",
    "no": "168",
    "name": "에틸렌 옥사이드(CAS 75-21-8)",
    "spec": "Ethylene oxide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0289",
    "no": "169",
    "name": "플루오라파타이트(CAS 1306-05-4)",
    "spec": "Fluoroapatite",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0290",
    "no": "170",
    "name": "염화수소(CAS 7647-01-0)",
    "spec": "Hydrogen chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0291",
    "no": "171",
    "name": "황화수소(CAS 7783-06-4)",
    "spec": "Hydrogen sulfide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0292",
    "no": "172",
    "name": "만델산(CAS 90-64-2)",
    "spec": "Mandelic acid",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0293",
    "no": "173",
    "name": "메탄올(CAS 67-56-1)",
    "spec": "Methanol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0294",
    "no": "174",
    "name": "염화메틸(CAS 74-87-3)",
    "spec": "Methyl chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0295",
    "no": "175",
    "name": "아이오딘화메틸(CAS 74-88-4)",
    "spec": "Methyl iodide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0296",
    "no": "176",
    "name": "메테인싸이올(CAS 74-93-1)",
    "spec": "Methyl mercaptan",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0297",
    "no": "177",
    "name": "모노에틸렌글리콜(CAS 107-21-1)",
    "spec": "Monoethyleneglycol",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0298",
    "no": "178",
    "name": "염화옥살릴(CAS 79-37-8)",
    "spec": "Oxalyl chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0299",
    "no": "179",
    "name": "황화칼륨(CAS 1312-73-8)",
    "spec": "Potassium sulfide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0300",
    "no": "180",
    "name": "싸이오사이안산 칼륨(CAS 333-20-0)",
    "spec": "Potassium thiocyanate",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0301",
    "no": "181",
    "name": "차아염소산나트륨(CAS 7681-52-9)",
    "spec": "Sodium hypochlorite",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0302",
    "no": "182",
    "name": "황(CAS 7704-34-9)",
    "spec": "Sulphur",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0303",
    "no": "183",
    "name": "아황산가스(이산화 황)(CAS 7446-09-5)",
    "spec": "Sulphur dioxide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0304",
    "no": "184",
    "name": "삼산화 황(CAS 7446-11-9)",
    "spec": "Sulphur trioxide",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0305",
    "no": "185",
    "name": "티오포스포릴 클로라이드(CAS 3982-91-0)",
    "spec": "Thiophosphoryl chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0306",
    "no": "186",
    "name": "트리-이소부틸 포스파이트(CAS 1606-96-8)",
    "spec": "Tri-isobutyl phosphite",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0307",
    "no": "187",
    "name": "백린(CAS 12185-10-3)",
    "spec": "White phosphorus",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0308",
    "no": "188",
    "name": "황인(CAS 7723-14-0)",
    "spec": "Yellow phosphorus",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0309",
    "no": "189",
    "name": "펜타닐 및 그 유도체인 알펜타닐, 수펜타닐, 레미펜타닐, 카르펜타닐, 티아펜타닐 및 이들의 염주: 189는 개인용 소매용으로 포장된 소비재 또는 개별용으로 포장된 소비재로 식별된 제품을 통제하지 않는다.",
    "spec": "Fentanyl and its derivatives Alfentanil, Sufentanil, Remifentanil, Carfentanil, thiafentanil, and salts thereof.Note: 189 does not control products identified as consumer goods packaged for retail sale for personal use or packaged for individual use",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0310",
    "no": "190",
    "name": "4-아닐리노-N-페네틸피페리딘(CAS 21409-26-7)",
    "spec": "4-anilino-N-phenethylpiperidine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0311",
    "no": "191",
    "name": "N-페네틸-4-피페리돈(CAS 39742-60-4)",
    "spec": "N-phenethyl-4-piperidone",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0312",
    "no": "192",
    "name": "Tert-부틸 4-(페닐아미노)-피페리딘-1-카르복실레이트(CAS 125541-22-2)",
    "spec": "Tert-butyl 4-(phenylamino) piperidine-1-carboxylate",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0313",
    "no": "193",
    "name": "노르펜타닐(CAS 1609-66-1)",
    "spec": "Norfentanyl",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0314",
    "no": "194",
    "name": "N-페닐-4-피페리딘아민(CAS 504-24-5)",
    "spec": "N-phenyl-4-piperidinamine",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0315",
    "no": "195",
    "name": "부티릴콜린에스테라아제 (BCHE)",
    "spec": "Butyrylcholinesterase (BCHE)",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0316",
    "no": "196",
    "name": "세포주, 벡터, 플라스미드 및 세포배양매체를 포함하는 세포배양물질",
    "spec": "Cell culture materials, including cell lines, vectors, plasmids, and cell culture media,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0317",
    "no": "197",
    "name": "뉴클레오티드 또는 펩타이드 분리, 추출, 정제를 위한 검사 키트 및 시약",
    "spec": "Assay kits and reagents for nucleotide or peptide isolation, extraction, purification,,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0318",
    "no": "198",
    "name": "반응 용기, 교반기, 열 교환기, 응축기, 펌프(단일 밀봉 펌프 포함), 밸브, 저장 탱크, 용기, 리시버 및 증류 또는 흡수탑",
    "spec": "Reaction vessels, agitators, heat exchangers, condensers, pumps (including single seal pumps), valves, storage tanks, containers, receivers, and distillation or absorption columns,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0319",
    "no": "199",
    "name": "제조자가 규정한 최대유량이 1 m3/h (표준 온도 및 압력 조건 하)을 초과하는 진공펌프, 그리고 이러한 펌프를 위해서 설계된 케이싱(펌프 몸체), 사전 성형된 케이싱 라이너, 임펠러, 로터 그리고 제트펌프 노즐",
    "spec": "Vacuum pumps with a manufacturer's specified maximum flow-rate greater than 1 m3/h (under standard temperature and pressure conditions), casings (pump bodies), preformed casing-liners, impellers, rotors, and jet pump nozzles designed for such pumps;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0320",
    "no": "200",
    "name": "화학물질의 파괴적 또는 비파괴적 분석 또는 검출을 위한 \"구성품\", \"부품\", \"부속품\" 및 해당 장비의 소모성 재료를 포함한 실험실 장비",
    "spec": "Laboratory equipment, including \"components,\" \"parts,\" \"accessories,\" and consumable materials for such equipment, for the analysis or detection, destructive or non-destructive, of chemical substances,,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0321",
    "no": "201",
    "name": "모든 클로르-알칼리 전해질 셀(수은, 다이어프램, 막)과 이를 위해 전용 설계된 아래의 “구성품”",
    "spec": "Whole chlor-alkali electrolysis cells (mercury, diaphragm, and membrane) and \"components\" specially designed therefor as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0322",
    "no": "202",
    "name": "제조 재료에 관계없이 습하거나 건조한 염소를 압축하기 위해 전용 설계된 압축기",
    "spec": "Compressors specially designed to compress wet or dry chlorine, regardless of material of construction;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0323",
    "no": "203",
    "name": "클래스 II 생물안전작업대 및 글로브 박스",
    "spec": "Class II biosafety cabinets and glove boxes",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0324",
    "no": "204",
    "name": "최소 공칭 폭이 2.5m인 바닥 장착형 흄 후드(워크인 스타일)",
    "spec": "Floor-mounted fume hoods (walk-in style) with a minimum nominal width of 2.5 meters,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0325",
    "no": "205",
    "name": "전면 마스크 공기 정화 및 공기 공급 인공호흡기",
    "spec": "Full face-mask air-purifying and air-supplying respirators;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0326",
    "no": "206",
    "name": "P3 또는 P4(BSL 3, BSL 4, L3, L4) 격납 시설에 사용할 수 있는 일반적인 또는 난류 공기순환 청정 공기실 및 자급식 팬-HEPA 필터 장치",
    "spec": "Conventional or turbulent air-flow clean-air rooms and self-contained fan-HEPA filter units that may be used for P3 or P4 (BSL 3, BSL 4, L3, L4) containment facilities;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0327",
    "no": "207",
    "name": "마이크로파 반응기",
    "spec": "Microwave reactors;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0328",
    "no": "208",
    "name": "웰 플레이트 및 마이크로어레이",
    "spec": "Well plates and microarrays;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0329",
    "no": "209",
    "name": "발효기 및 그 구성품",
    "spec": "Fermenters and components therefor,;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0330",
    "no": "210",
    "name": "생물학적 샘플을 분리할 수 있는 원심분리기 및 초원심분리기(최대 용량 5L), 원심분리기 튜브 및 농축기를 포함하는 \"구성품\" 및 \"부속품\"",
    "spec": "Centrifuges and ultracentrifuges capable of separating biological samples, with a maximum capacity of 5L, \"components\" and \"accessories\" therefor, n.e.s., including centrifuge tubes and concentrators;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0331",
    "no": "211",
    "name": "생물학적 물질을 취급하는 데 사용할 수 있는 여과 장비, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Filtration equipment, \"components,\" \"parts,\" and \"accessories,\" capable of use in handling biological materials,",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0332",
    "no": "212",
    "name": "핵산 합성키 및 조립기, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Nucleic acid synthesizers and assemblers, \"components,\" \"parts,\" and \"accessories,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0333",
    "no": "213",
    "name": "중합효소연쇄반응(PCR) 및 정량적 PCR(qPCR) 기기 \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Polymerase chain reaction (PCR) and quantitative PCR (qPCR) instruments \"components,\" \"parts,\" and \"accessories;\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0334",
    "no": "214",
    "name": "로봇식 액체 취급장비, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Robotic liquid handling instruments, \"components,\" \"parts,\" and \"accessories,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0335",
    "no": "215",
    "name": "크로마토그래피 및 분광법 \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Chromatography and spectrometry \"components,\" \"parts,\" and \"accessories,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0336",
    "no": "216",
    "name": "핵산 서열 분석기, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Nucleic acid sequencers, \"components,\" \"parts,\" and \"accessories;\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0337",
    "no": "217",
    "name": "에어로졸 흡입 시험장비, \"구성품\", “부품” 및 “부속품”",
    "spec": "Aerosol inhalation testing equipment, \"components\", \"parts\" and \"accessories,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0338",
    "no": "218",
    "name": "유세포 분석장비, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Flow cytometry equipment, \"components\", \"parts\" and \"accessories,\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0339",
    "no": "219",
    "name": "프로브 초음파 분쇄기, 세포 파쇄기 및 조직 분쇄기",
    "spec": "Probe sonicators, cell disruptors and tissue homogenizers;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0340",
    "no": "220",
    "name": "'연속 흐름 반응기' 및 그 '모듈형 구성 요소'",
    "spec": "'Continuous flow reactors' and their 'modular components'.for purposes of paragraph 'modular components' are fluidic modules, liquid pumps, valves, packed-bed modules, mixer modules, pressure gauges, liquid-liquid separators, etc.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0341",
    "no": "221",
    "name": "양자 컴퓨팅 및 첨단 제조업: 이 단락은 러시아에서 제조되지 않았거나 또는 첨단 생산 및 개발 능력을 개발하는데 있어 러시아에 중요하다고 여겨지는 추가 장비 및 기타 품목을 식별하게 한다.",
    "spec": "Quantum computing and advanced manufacturing: This paragraph identifies additional equipment and other items that are believed to not be manufactured in Russia or are otherwise important to Russia in developing advanced production and development capabilities.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0342",
    "no": "222",
    "name": "아래의 48시간 이상 1.1k 미만의 온도를 유지하도록 설계된 ‘저온용 냉동/냉장 시스템’ 및 전용 설계된 저온용 냉동/냉장 장비와 \"구성품\"으로 다음의 것:",
    "spec": "'Cryogenic refrigeration systems' designed to maintain temperatures below 1.1k for 48hrs or more and specially designed cryogenic refrigeration equipment and \"components\" as follows:Note: 'Cryogenic refrigeration systems' include but are not limited to Dilution Refrigeration, Adiabatic Demagnisation Refrigerators and Laser Cooling Systems.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0343",
    "no": "223",
    "name": "UHV(초고진공) 장비로 다음의 것:UHV는 100나노파스칼(nPa) 이하를 의미한다.",
    "spec": "Ultra-High Vacuum (UHV) equipment as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0344",
    "no": "224",
    "name": "높은 양자 효율(QE) 광검출기 및 광원(300 nm를 초과하고 1,700 nm를 초과하지 않는 파장 범위에서 QE가 80% 초과인 것)",
    "spec": "High Quantum Efficiency (QE) photodetectors and sources with a QE greater than 80% in the wavelength range exceeding 300 nm but not exceeding 1,700 nm;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0345",
    "no": "225",
    "name": "제조 장비로 다음의 것:",
    "spec": "Manufacturing equipment as follows:Note 1: This entry identified under paragraph only applies to the following systems: Powder-fed systems using laser cladding, direct energy deposition or laser metal deposition.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0346",
    "no": "226",
    "name": "별표2 3A에 명시된 적층 제조 장비를 위해 전용 설계된 금속 분말 및 금속 합금 분말",
    "spec": "Metal powders and metal alloy powders specially designed for the additive manufacturing equipment specified in 3A.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0347",
    "no": "227",
    "name": "현미경, 관련 장비 및 감지기(탐지기)로서 다음의 것:",
    "spec": "Microscopes, related equipment and detectors, as follows:",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0348",
    "no": "228",
    "name": "반도체 소자용 '피막제거' 장비.",
    "spec": "'Decapsulation' equipment for semiconductor devices.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0349",
    "no": "229",
    "name": "221부터 228까지에 명시된 품목의 \"개발\", \"생산\" 또는 \"사용\"을 위해 전용 설계되거나 수정된 \"소프트웨어\"",
    "spec": "\"Software\" specially designed or modified for the \"development\", \"production\" or \"use\" of the items specified in paragraphs 221 through 228 of this supplement.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0350",
    "no": "230",
    "name": "적층 제조 제품의 디지털 트윈(DT) 또는 적층 제조 제품의 신뢰성 결정을 위한 \"소프트웨어\".",
    "spec": "\"Software\" for Digital Twins (DT) of additive manufacture products or for the determination of the reliability of additive manufacture products.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0351",
    "no": "231",
    "name": "221부터 230까지에 명시된 품목의 \"개발\", \"생산\" 또는 \"사용\"을 위한 \"기술\"",
    "spec": "\"Technology\" for the \"development\", \"production\" or \"use\" of the items specified in paragraphs 221 through 230 of this supplement.",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0352",
    "no": "232",
    "name": "염화 리튬(CAS 7447-41-8)",
    "spec": "Lithium chloride",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0353",
    "no": "233",
    "name": "리튬클로라이드 하이드레이트(CAS 85144-11-2)",
    "spec": "Lithium chloride hydrate",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0354",
    "no": "234",
    "name": "리튬클로라이드 모노하이드레이트(CAS 16712-20-2)",
    "spec": "Lithium chloride monohydrate",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0355",
    "no": "235",
    "name": "탄산리튬(CAS 554-13-2)",
    "spec": "Lithium carbonate",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0356",
    "no": "236",
    "name": "분리 또는 정제된 뉴클레오타이드 및 올리고뉴클레오타이드",
    "spec": "Isolated or purified nucleotides and oligonucleotides;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0357",
    "no": "237",
    "name": "분리 또는 정제된 아미노산, 펩타이드 및 단백질",
    "spec": "Isolated or purified amino acids, peptides and proteins;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0358",
    "no": "238",
    "name": "올리고뉴클레오티드 합성용 시약 및 재료",
    "spec": "Reagents and materials for oligonucleotide synthesis;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0359",
    "no": "239",
    "name": "펩타이드 합성을 위한 수지, 시약, 재료",
    "spec": "Resins, reagents, and materials for peptide synthesis;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0360",
    "no": "240",
    "name": "마이크로리액터",
    "spec": "Microreactors;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0361",
    "no": "241",
    "name": "고체 및 액체 에어로졸 생성 장비",
    "spec": "Solid and liquid aerosol generating equipment;",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0362",
    "no": "242",
    "name": "실험실 밀링 장비, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Laboratory milling equipment, \"components,\" \"parts,\" and \"accessories,\";",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0363",
    "no": "243",
    "name": "펩타이드 합성기, \"구성품\", \"부품\" 및 \"부속품\"",
    "spec": "Peptide synthesizers, \"components,\" \"parts,\" and \"accessories.\"",
    "relatedAnnex2": "-",
    "country": "-",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0364",
    "no": "244",
    "name": "내화점토(하소한 것과 상관없음)",
    "spec": "Fire Clay, Whether or Not Calcined",
    "relatedAnnex2": "-",
    "country": "2508.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0365",
    "no": "245",
    "name": "멀라이트",
    "spec": "Mullite",
    "relatedAnnex2": "-",
    "country": "2508.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0366",
    "no": "246",
    "name": "샤모트 또는 다이나스 어스",
    "spec": "Chamotte or Dinas Earth",
    "relatedAnnex2": "-",
    "country": "2508.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0367",
    "no": "247",
    "name": "석회석 융제, 석회나 시멘트 제조용 석회석과 그 밖의 석회질의 암석(또는 토양 개량용)",
    "spec": "Limestone Flux; Limestone and Other Calcareous Stone, of A Kind Used for The Manufacture of Lime or Cement (Or for Soil Improvement)",
    "relatedAnnex2": "-",
    "country": "2521.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0368",
    "no": "248",
    "name": "산화알루미늄[인조 커런덤은 제외]",
    "spec": "Aluminum Oxide, Except Artificial Corundum, Nesoi",
    "relatedAnnex2": "-",
    "country": "2818.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0369",
    "no": "249",
    "name": "히드라진, 히드록실아민과 이들의 무기염",
    "spec": "Hydrazine and Hydroxylamine and Their Inorganic Salts",
    "relatedAnnex2": "-",
    "country": "2825.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0370",
    "no": "250",
    "name": "염소산나트륨",
    "spec": "Sodium Chlorate",
    "relatedAnnex2": "-",
    "country": "2829.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0371",
    "no": "251",
    "name": "폴리인산염",
    "spec": "Polyphosphates, Nesoi",
    "relatedAnnex2": "-",
    "country": "2835.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0372",
    "no": "252",
    "name": "과산화수소(요소로 고체화한 것인지에 상관없음)",
    "spec": "Hydrogen Peroxide, Whether or Not Solidified with Urea",
    "relatedAnnex2": "-",
    "country": "2847.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0373",
    "no": "253",
    "name": "모든 재료의 착색에 사용되거나 착색조제품 제조에 사용되는 착색제(페인트 또는 에나멜 제외)",
    "spec": "Coloring Matter of A Kind Used for Coloring Any Material or Used In The Manufacture of Coloring Preparations (Other Than Paints or Enamels), Nesoi",
    "relatedAnnex2": "-",
    "country": "3206.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0374",
    "no": "254",
    "name": "유리 프리트와 그 밖의 유리[가루, 알갱이, 플레이크 모양인 것]",
    "spec": "Glass Frit and Other Glass, In The Form of Powder, Granules or Flakes",
    "relatedAnnex2": "-",
    "country": "3207.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0375",
    "no": "255",
    "name": "폴리에스테르를 기본 재료로 한 페인트와 바니시(에나멜, 래커 포함)(합성 중합체를 기본 재료로 하여 비수성 매질에 분산 또는 용해된 것)",
    "spec": "Paints and Varnishes (Including Enamels and Lacquers) Based on Synthetic and Other Polymers, In A Nonaqueous Medium, Based on Polyesters",
    "relatedAnnex2": "-",
    "country": "3208.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0376",
    "no": "256",
    "name": "아크릴이나 비닐중합체를 기본 재료로 한 페인트와 바니시(에나멜, 래커 포함)(합성 중합체를 기본 재료로 하여 비수성 매질에 분산 또는 용해된 것)",
    "spec": "Paints and Varnishes (Including Enamels and Lacquers) Based on Synthetic and Other Polymers In A Nonaqueous Medium, Based on Acrylic or Vinyl Polymers",
    "relatedAnnex2": "-",
    "country": "3208.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0377",
    "no": "257",
    "name": "그 밖에 합성 중합체를 기본 재료로 하여 비수성 매질에 분산 또는 용해된 페인트와 바니시(에나멜, 래커 포함)",
    "spec": "Paints and Varnishes (Including Enamels and Lacquers) Based on Synthetic and Other Polymers In A Nonaqueous Medium, Nesoi",
    "relatedAnnex2": "-",
    "country": "3208.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0378",
    "no": "258",
    "name": "아크릴이나 비닐중합체를 기본 재료로 한 페인트와 바니시(애나멜, 래커 포함)(합성 중합체를 기본 재료로 하여 수성 매질에 분산 또는 용해된 것)",
    "spec": "Paints and Varnishes (Including Enamels and Lacquers) Based on Synthetic and Other Polymers In An Aqueous Medium, Based on Acrylic or Vinyl Polymers",
    "relatedAnnex2": "-",
    "country": "3209.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0379",
    "no": "259",
    "name": "그 밖에 페인트와 바니시(애나멜 및 래커 포함)(합성 중합체를 기본 재료로 하여 수성 매질에 분산 또는 용해된 것)",
    "spec": "Paints and Varnishes (Including Enamels and Lacquers) Based on Synthetic and Other Polymers In An Aqueous Medium, Nesoi",
    "relatedAnnex2": "-",
    "country": "3209.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0380",
    "no": "260",
    "name": "그 밖에 페인트와 바니시(에나멜, 래커, 디스템퍼 포함)(가죽의 완성가공용으로 사용하는 수성안료로 조제된 것)",
    "spec": "Paints and Varnishes (Including Enamels, Lacquers and Distempers); Prepared Water Pigments of A Kind Used for Finishing Leather",
    "relatedAnnex2": "-",
    "country": "3210.00",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0381",
    "no": "261",
    "name": "흑색 인쇄용 잉크",
    "spec": "Printing Ink, Black",
    "relatedAnnex2": "-",
    "country": "3215.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0382",
    "no": "262",
    "name": "흑색 외 인쇄용 잉크",
    "spec": "Printing Ink, Other Than Black",
    "relatedAnnex2": "-",
    "country": "3215.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0383",
    "no": "263",
    "name": "방직용 재료, 가죽, 모피나 그 밖의 재료의 처리용 조제 윤활유(석유나 역청유를 함유한 것으로 석유나 역청유의 함량이 전 중량의 100분의 70 이상인 것을 기본 재료로 한 조제품은 제외)",
    "spec": "Lubricating Preparations for The Treatment of Textile Materials, Leather, Furskins or Other Materials, Containing Petroleum or Bituminous Mineral Oils",
    "relatedAnnex2": "-",
    "country": "3403.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0384",
    "no": "264",
    "name": "그 밖에 석유나 역청유를 함유한 조제 윤활유(석유나 역청유의 함량이 전 중량의 100분의 70 이상인 것을 기본 재료로 한 조제품은 제외)",
    "spec": "Lubricating Preparations Containing Petroleum Oils or Oils Obtained From Bituminous Minerals, Nesoi",
    "relatedAnnex2": "-",
    "country": "3403.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0385",
    "no": "265",
    "name": "방직용 재료, 가죽, 모피나 그 밖의 재료의 처리용 조제 윤활유(석유나 역청유를 함유하지 않은 것)",
    "spec": "Lubricatng Prepartions for The Treatment of Textile Materials, Leather, Fur or Other Materials, Not Containing Petroleum or Bituminous Mineral Oils",
    "relatedAnnex2": "-",
    "country": "3403.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0386",
    "no": "266",
    "name": "그 밖에 석유나 역청유를 함유하지 않은 조제 윤활유",
    "spec": "Lubricating Preparations Not Containing Petroleum Oils or Oils Obtained From Bituminous Minerals, Nesoi",
    "relatedAnnex2": "-",
    "country": "3403.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0387",
    "no": "267",
    "name": "인스턴트 프린트필름",
    "spec": "Instant Print Film In The Flat",
    "relatedAnnex2": "-",
    "country": "3701.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0388",
    "no": "268",
    "name": "구멍이 없는 것으로 폭이 105밀리미터(4.1 In.)를 초과 610밀리미터(24 In.) 이하인 롤 모양 필름 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Over 105 mm (4.1 In.) But Not Over 610 mm (24 In.) In Width, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.44",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0389",
    "no": "269",
    "name": "폭이 35밀리미터(1.4 In.) 이하이고 길이가 30미터(98 Ft.) 이하인 단색용 롤 모양 필름 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Film of A Width Not Exceeding 35 mm (1.4 In.) and of A Length Not Exceeding 30 M (98 Ft.), Monochrome, Sensitized, Unexposed, Nesoi",
    "relatedAnnex2": "-",
    "country": "3702.96",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0390",
    "no": "270",
    "name": "폭이 35밀리미터(1.4 In.) 이하이고 길이가 30미터 (98 Ft.) 초과하는 단색용 롤 모양 필름 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Film of A Width Not Exceeding 35 mm (1.4 In.) and of A Length Exceeding 30 M (98 Ft.), Monochrome, Sensitized, Unexposed, Nesoi",
    "relatedAnnex2": "-",
    "country": "3702.97",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0391",
    "no": "271",
    "name": "종이, 판지로 만들지 않은 폭이 35밀리미터(1.4 In.) 초과하는 단색용(흑백) 롤 모양 필름 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Film of A Width Exceeding 35 mm (1.4 In.), Monochrome (Black and White), Sensitized, Unexposed, Not of Paper, Paperboard Etc, Nesoi",
    "relatedAnnex2": "-",
    "country": "3702.98",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0392",
    "no": "272",
    "name": "폭이 35밀리미터(1.4 In.) 미만인 영화 필름으로 노광 및 현상한 것",
    "spec": "Motion-Picture Film, Exposed and Developed, Less Than 35 mm (1.4 In.) In Width",
    "relatedAnnex2": "-",
    "country": "3706.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0393",
    "no": "273",
    "name": "콜로이드흑연이나 반콜로이드흑연",
    "spec": "Colloidal or Semi-Colloidal Graphite",
    "relatedAnnex2": "-",
    "country": "3801.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0394",
    "no": "274",
    "name": "금속표면처리용 침지 조제품, 납땜용ㆍ땜질용ㆍ용접용 가루와 페이스트로서 금속과 그 밖의 재료로 조성한 것",
    "spec": "Pickling Preparation for Metal Surfaces; Soldering, Brazing or Welding Powders and Pastes Consisting of Metal and Other Materials",
    "relatedAnnex2": "-",
    "country": "3810.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0395",
    "no": "275",
    "name": "납땜용ㆍ땜질용ㆍ용접용 융제와 그 밖의 보조 조제품, ;용접용 전극ㆍ용접봉의 코어나 피복에 사용하는 조제품",
    "spec": "Fluxes and Other Auxiliary Preparations for Soldering, Brazing or Welding, Nesoi; Prepared Cores or Coatings for Welding Electrodes or Rods",
    "relatedAnnex2": "-",
    "country": "3810.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0396",
    "no": "276",
    "name": "석유나 역청유를 함유한 윤활유 첨가제",
    "spec": "Additives for Lubricating Oils Containing Petroleum Oils or Oils Obtained From Bituminous Minerals",
    "relatedAnnex2": "-",
    "country": "3811.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0397",
    "no": "277",
    "name": "윤활유 첨가제",
    "spec": "Additives for Lubricating Oils, Nesoi",
    "relatedAnnex2": "-",
    "country": "3811.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0398",
    "no": "278",
    "name": "기타 광물유(가솔린을 포함)용이나 광물유와 동일한 목적에 사용하는 그 밖의 액체용 조제 첨가제",
    "spec": "Antiknock preparations, oxidation inhibitors, gum inhibitors, viscosity improvers, anti-corrosive preparations and other prepared additives, for mineral oils (including gasoline) or for other liquids used for the same purposes as mineral oils, Nesoi",
    "relatedAnnex2": "-",
    "country": "3811.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0399",
    "no": "279",
    "name": "유기혼합용제와 시너, 조제한 페인트ㆍ바니시 제거제",
    "spec": "Organic Composite Solvents and Thinners, Nesoi; Prepared Paint or Varnish Removers",
    "relatedAnnex2": "-",
    "country": "3814.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0400",
    "no": "280",
    "name": "활성물질로서 니켈이나 니켈화합물의 서포트된 촉매",
    "spec": "Supported Catalysts with Nickel or Nickel Compounds As The Active Substance",
    "relatedAnnex2": "-",
    "country": "3815.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0401",
    "no": "281",
    "name": "활성물질로서 귀금속이나 귀금속화합물의 서포트된 촉매",
    "spec": "Supported Catalysts with Precious Metal or Precious Metal Compounds As The Active Substance",
    "relatedAnnex2": "-",
    "country": "3815.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0402",
    "no": "282",
    "name": "서포트된 촉매",
    "spec": "Supported Catalysts, Nesoi.",
    "relatedAnnex2": "-",
    "country": "3815.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0403",
    "no": "283",
    "name": "내화시멘트ㆍ내화모르타르ㆍ내화콘크리트와 이와 유사한 혼합물",
    "spec": "Refractory Cements, Mortars, Concretes, and Similar Compositions (Except of Graphite or Other Carbon Preparations), Nesoi",
    "relatedAnnex2": "-",
    "country": "3816.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0404",
    "no": "284",
    "name": "전자공업에 사용하기 위하여 도프처리된 화학원소(디스크ㆍ웨이퍼 모양이나 이와 유사한 모양으로 한정), 전자공업에 사용하기 위하여 도프처리된 화학화합물",
    "spec": "Chemical Elements Doped for Use In Electronics, In The Form of Discs, Wafers or Similar Forms; Chemical Compounds Doped for Use In Electronics",
    "relatedAnnex2": "-",
    "country": "3818.00",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0405",
    "no": "285",
    "name": "유압제동액과 그 밖의 조제 유압전동액[석유나 역청 함유량이 전 중량의 100분의 70 미만인 것]",
    "spec": "Hydraulic Brake Fluids and Prepared Liquids for Hydraulic Transmission, with Less Than 70% (If Any) By Weight of Petroleum or Bituminous Mineral Oils",
    "relatedAnnex2": "-",
    "country": "3819.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0406",
    "no": "286",
    "name": "앨드린(ISO), 캄페클로(ISO)(톡사핀), 클로단(ISO), 클로르데콘(ISO), 디디티(ISO)[클로페노탄(INN), 1,1,1-트리클로로-2,2-비스(파라-클로로페닐)에탄], 디엘드린(ISO, INN), 엔도설판(ISO), 엔드린(ISO), 헵타클로르(ISO) 또는 미렉스(ISO)를 함유한 것",
    "spec": "Containing aldrin (ISO), camphechlor (ISO) (toxaphene), chlordane (ISO), chlordecone (ISO), DDT (ISO) (clofenatone (INN)), 1,1,1-trichloro-2,2-bis(p-chlorophenyl)ethane), dieldrin (ISO INN), endosulfan (ISO), endrin (ISO), heptachlor (ISO) or mirex (ISO)",
    "relatedAnnex2": "-",
    "country": "3824.84",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0407",
    "no": "287",
    "name": "멜라민수지 [일차제품으로 한정]",
    "spec": "Melamine Resins, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3909.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0408",
    "no": "288",
    "name": "아미노 수지",
    "spec": "Amino-Resins, Nesoi",
    "relatedAnnex2": "-",
    "country": "3909.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0409",
    "no": "289",
    "name": "페놀수지 [일차제품으로 한정]",
    "spec": "Phenolic Resins, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3909.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0410",
    "no": "290",
    "name": "폴리우레탄 [일차제품으로 한정]",
    "spec": "Polyurethanes, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3909.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0411",
    "no": "291",
    "name": "그 밖의 셀룰로오스와 그 화학적 유도체 [일차제품으로 한정]",
    "spec": "Cellulose and Its Chemical Derivatives Nesoi, In Primary Forms, Other",
    "relatedAnnex2": "-",
    "country": "3912.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0412",
    "no": "292",
    "name": "그 밖의 플라스틱의 판, 시트, 필름, 박, 스트립(셀룰러인 것)",
    "spec": "Other plates, sheets, film, foil and strip, of plastics: Of other plastics",
    "relatedAnnex2": "-",
    "country": "3921.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0413",
    "no": "293",
    "name": "플라스틱으로 만든 그 밖의 제품과 제3901호부터 제3914호까지의 그 밖의 재료로 만든 기타 제품",
    "spec": "Other articles of plastics and articles of other materials of headings 3901 to 3914:, Other",
    "relatedAnnex2": "-",
    "country": "3926.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0414",
    "no": "294",
    "name": "스티렌-부타디엔 고무(SBR)ㆍ카르복시화한 스티렌-부타디엔 고무(XSBR)의 라텍스",
    "spec": "Latex of Styrene-Butadiene Rubber (SBR) or Carboxylated Styrene-Butadiene Rubber (XSBR)",
    "relatedAnnex2": "-",
    "country": "4002.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0415",
    "no": "295",
    "name": "기타 스티렌-부타디엔 고무(SBR)ㆍ카르복시화한 스티렌-부타디엔 고무(XSBR)의 일차제품(라텍스 제외) 또는 판, 시트, 스트립",
    "spec": "Styrene-Butadiene Rubber (SBR) or Carboxylated Styrene-Butadiene Rubber (XSBR) In Primary Forms (Except Latex) or In Plates, Sheets or Strip, Other",
    "relatedAnnex2": "-",
    "country": "4002.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0416",
    "no": "296",
    "name": "개스킷(gasket)ㆍ와셔(washer)ㆍ그 밖의 실(seal) [경질고무로 만든 것 제외]",
    "spec": "Gaskets, Washers and Other Seals, of Vulcanized Rubber Other Than Hard Rubber",
    "relatedAnnex2": "-",
    "country": "4016.93",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0417",
    "no": "297",
    "name": "설계도와 도안[건축용ㆍ공학용ㆍ공업용ㆍ상업용ㆍ지형학용이나 이와 유사한 용도에 사용하는 것으로서 수제(手製) 원도(原圖)로 한정한다], 손으로 쓴 책자와 이들을 감광지에 사진복사ㆍ카본복사한 것",
    "spec": "Plans and drawings for architectural, engineering, industrial, commercial, topographical or similar purposes, being originals drawn by hand; hand-written texts; photographic reproductions on sensitised paper and carbon copies of the foregoing.",
    "relatedAnnex2": "-",
    "country": "4906.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0418",
    "no": "298",
    "name": "그 밖의 폴리프로필렌의 복합사(연합사)나 케이블사(소매용은 제외하며 67데시텍스 미만인 합성모노필라멘트를 포함)",
    "spec": "Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex Other yarn, multiple (folded) or cabled : Of polypropylene",
    "relatedAnnex2": "-",
    "country": "5402.63",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0419",
    "no": "299",
    "name": "재생ㆍ반(半)합성 필라멘트 단사로서, 강력사(비스코스레이온(viscose rayon)의 것으로 한정하며, 재봉사와 소매용은 제외한다)",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, High Tenacity Yarn of Viscose Rayon",
    "relatedAnnex2": "-",
    "country": "5403.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0420",
    "no": "300",
    "name": "재생ㆍ반(半)합성 필라멘트 단사로서, 비스코스레이온(viscose rayon)의 것(꼬임이 없거나, 꼬임이 미터당 120회 이하인 것으로 한정한다)으로 한정하며, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Single Yarn Nesoi, Not Over 120 Turns Per Meter If Twisted, of Viscose Rayon",
    "relatedAnnex2": "-",
    "country": "5403.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0421",
    "no": "301",
    "name": "합성모노필라멘트(67데시텍스 이상인 것으로서 횡단면의 치수가 1밀리미터 이하인 것으로 한정한다), 방직용 합성섬유재료의 스트립(strip)이나 이와 유사한 것[예: 인조스트로(straw)](시폭이 5밀리미터 이하인 것으로 한정한다); 기타",
    "spec": "Synthetic monofilament of 67 decitex or more and of which no cross-sectional dimension exceeds 1 mm; strip and the like (for example, artificial straw) of synthetic textile materials of an apparent width not exceeding 5 mm; Other",
    "relatedAnnex2": "-",
    "country": "5403.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0422",
    "no": "302",
    "name": "재생ㆍ반(半)합성 필라멘트 단사로서, 초산셀룰로오스의 것으로 한정하며, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Single Yarn Nesoi, of Cellulose Acetate",
    "relatedAnnex2": "-",
    "country": "5403.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0423",
    "no": "303",
    "name": "그 밖의 재생ㆍ반(半)합성 필라멘트 단사로서, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Single Yarn Nesoi, of Yarns Nesoi",
    "relatedAnnex2": "-",
    "country": "5403.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0424",
    "no": "304",
    "name": "재생ㆍ반(半)합성 필라멘트 복합사(연합사)나 케이블사로서, 비스코스레이온(viscose rayon)의 것으로 한정하며, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Yarn Nesoi, Multiple or Cabled, of Viscose Rayon",
    "relatedAnnex2": "-",
    "country": "5403.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0425",
    "no": "305",
    "name": "재생ㆍ반(半)합성 필라멘트 복합사(연합사)나 케이블사로서, 초산셀룰로오스의 것으로 한정하며, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Yarn Nesoi, Multiple or Cabled, of Cellulose Acetate",
    "relatedAnnex2": "-",
    "country": "5403.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0426",
    "no": "306",
    "name": "그 밖의 재생ㆍ반(半)합성 필라멘트 복합사(연합사)나 케이블사로서, 재봉사와 소매용은 제외한다.",
    "spec": "Artificial Filament Yarn Except Sewing Thread, Not for Retail Sale, Yarn Nesoi, Multiple of Cabled, of Yarns Nesoi",
    "relatedAnnex2": "-",
    "country": "5403.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0427",
    "no": "307",
    "name": "합성모노필라멘트(67데시텍스 이상인 것으로서 횡단면의 치수가 1밀리미터 이하인 것으로 한정한다)로서 탄성사",
    "spec": "Synthetic Elastomeric Monofilament of 67 Decitex or More and of Which No Cross-Sectional Dimension Exceeds 1 mm, Nesoi",
    "relatedAnnex2": "-",
    "country": "5404.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0428",
    "no": "308",
    "name": "합성모노필라멘트(67데시텍스 이상인 것으로서 횡단면의 치수가 1밀리미터 이하인 것으로 한정한다)로서 폴리프로필렌의 것",
    "spec": "Polypropylene Monofilament of 67 Decitex or More and of Which No Cross-Sectional Dimension Exceeds 1 mm, Nesoi",
    "relatedAnnex2": "-",
    "country": "5404.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0429",
    "no": "309",
    "name": "그 밖의 합성모노필라멘트(67데시텍스 이상인 것으로서 횡단면의 치수가 1밀리미터 이하인 것으로 한정한다)",
    "spec": "Synthetic Monofilament of 67 Decitex and of Which No Cross-Sectional Dimension Exceeds 1 mm, Nesoi",
    "relatedAnnex2": "-",
    "country": "5404.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0430",
    "no": "310",
    "name": "방직용 합성섬유재료의 스트립(strip)이나 이와 유사한 것[예: 인조스트로(straw)](시폭이 5밀리미터 이하인 것으로 한정한다)",
    "spec": "Synthetic Strip and The Like (For Example, Artificial Straw) of Synthetic Textile Materials of An Apparent Width Not Over 5 mm",
    "relatedAnnex2": "-",
    "country": "5404.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0431",
    "no": "311",
    "name": "합성 필라멘트를 평형하게 병렬한 층을 상호 예각이나 직각으로 겹쳐 만든 직물",
    "spec": "Woven Fabrics of Synthetic Filament Yarn Specifically Bonded In Layers",
    "relatedAnnex2": "-",
    "country": "5407.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0432",
    "no": "312",
    "name": "나일론이나 기타 폴리아미드의 합성필라멘트 토우; 아라미드의 것",
    "spec": "Synthetic Filament Tow of Nylon or Other Polyamides; Of aramids",
    "relatedAnnex2": "-",
    "country": "5501.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0433",
    "no": "313",
    "name": "나일론이나 기타 폴리아미드의 합성필라멘트 토우; 아라미드를 제외한 기타",
    "spec": "Synthetic Filament Tow of Nylon or Other Polyamides; Of aramids; Other",
    "relatedAnnex2": "-",
    "country": "5501.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0434",
    "no": "314",
    "name": "폴리에스테르의 합성필라멘트 토우",
    "spec": "Synthetic Filament Tow of Polyesters",
    "relatedAnnex2": "-",
    "country": "5501.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0435",
    "no": "315",
    "name": "아크릴이나 모다크릴의 합성필라멘트 토우",
    "spec": "Synthetic Filament Tow, Acrylic or Modacrylic",
    "relatedAnnex2": "-",
    "country": "5501.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0436",
    "no": "316",
    "name": "폴리프로필렌의 합성필라멘트 토우",
    "spec": "Synthetic Filament Tow, of Polypropylene",
    "relatedAnnex2": "-",
    "country": "5501.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0437",
    "no": "317",
    "name": "그 밖의 합성필라멘트 토우",
    "spec": "Synthetic Filament Tow, Nesoi",
    "relatedAnnex2": "-",
    "country": "5501.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0438",
    "no": "318",
    "name": "초산셀룰로오스의 재생ㆍ반(半)합성 필라멘트 토우(tow)",
    "spec": "Artificial Filament Tow of Cellulose Acetate",
    "relatedAnnex2": "-",
    "country": "5502.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0439",
    "no": "319",
    "name": "초산셀룰로오스를 제외한 재생ㆍ반(半)합성 필라멘트 토우(tow)",
    "spec": "Artificial Filament Tow; Other",
    "relatedAnnex2": "-",
    "country": "5502.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0440",
    "no": "320",
    "name": "아라미드의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Staple Fibers, of Aramids, Not Carded, Combed or Otherwise Processed for Spinning",
    "relatedAnnex2": "-",
    "country": "5503.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0441",
    "no": "321",
    "name": "아라미드를 제외하고 나일론 또는 기타 폴리아미드의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Staple Fibers, of Nylons or Other Polyamides, Excluding Aramids, Not Carded, Combed or Otherwise Processed for Spinning",
    "relatedAnnex2": "-",
    "country": "5503.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0442",
    "no": "322",
    "name": "아크릴이나 모다크릴의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Synthetic Staple Fibers, Not Carded, Combed or Otherwise Processed for Spinning, Acrylic or Modacrylic",
    "relatedAnnex2": "-",
    "country": "5503.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0443",
    "no": "323",
    "name": "폴리프로필렌의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Synthetic Staple Fibers, Not Carded, Combed or Otherwise Processed for Spinning, Polypropylene",
    "relatedAnnex2": "-",
    "country": "5503.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0444",
    "no": "324",
    "name": "그 밖의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Synthetic Staple Fibers, Not Carded, Combed or Otherwise Processed for Spinning, Nesoi",
    "relatedAnnex2": "-",
    "country": "5503.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0445",
    "no": "325",
    "name": "비스코스레이온을 제외한 재생ㆍ반(半)합성 스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것은 제외한다]",
    "spec": "Artificial Staple Fibers, Not Carded, Combed or Otherwised Processed for Spinning, Other Than Viscose Rayon",
    "relatedAnnex2": "-",
    "country": "5504.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0446",
    "no": "326",
    "name": "나일론이나 그 밖의 폴리아미드의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Synthetic Staple Fibers, Carded, Combed or Otherwise Processed for Spinning, of Nylon or Other Polyamides",
    "relatedAnnex2": "-",
    "country": "5506.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0447",
    "no": "327",
    "name": "폴리에스테르의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Synthetic Staple Fibers, Carded, Combed or Otherwise Processed for Spinning, of Polyesters",
    "relatedAnnex2": "-",
    "country": "5506.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0448",
    "no": "328",
    "name": "아크릴이나 모다크릴의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Synthetic Staple Fibers, Carded, Combed or Otherwise Processed for Spinning, Acrylic or Modacrylic",
    "relatedAnnex2": "-",
    "country": "5506.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0449",
    "no": "329",
    "name": "폴리프로필렌의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Synthetic Staple Fibers, Carded, Combed or Otherwise Processed for Spinning of Polypropylene",
    "relatedAnnex2": "-",
    "country": "5506.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0450",
    "no": "330",
    "name": "그 밖의의 합성스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Synthetic Staple Fibers, Carded, Combed or Otherwise Processed for Spinning, Nesoi",
    "relatedAnnex2": "-",
    "country": "5506.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0451",
    "no": "331",
    "name": "재생ㆍ반(半)합성 스테이플섬유[카드(card)ㆍ코움(comb)이나 그 밖의 방적준비 처리를 한 것으로 한정한다]",
    "spec": "Artifical Staple Fibers, Carded, Combed or Otherwise Processed for Spinning",
    "relatedAnnex2": "-",
    "country": "5507.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0452",
    "no": "332",
    "name": "표백하지 않은 것이나 표백한 합성스테이플섬유의 직물(아크릴이나 모다크릴 스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것)",
    "spec": "Woven Fabrics of Synthetic Staple Fibers, Containing 85% or More By Weight of Acrylic or Modacrylic Staple Fibers, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5512.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0453",
    "no": "333",
    "name": "합성스테이플섬유의 직물(합성스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것); 기타",
    "spec": "Woven Fabrics of Synthetic Staple Fibers, Containing 85% or More By Weight of Synthetic Staple Fibers Nesoi",
    "relatedAnnex2": "-",
    "country": "5512.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0454",
    "no": "334",
    "name": "표백하지 않은 것이나 표백한 재생ㆍ반(半)합성스테이플섬유의 직물(재생ㆍ반(半)합성스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것)",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing 85% or More By Weight of Such Fibers, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5516.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0455",
    "no": "335",
    "name": "염색한 재생ㆍ반(半)합성스테이플섬유의 직물(재생ㆍ반(半)합성스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것)",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing 85% or More By Weight of Such Fibers, Dyed",
    "relatedAnnex2": "-",
    "country": "5516.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0456",
    "no": "336",
    "name": "서로 다른 색실로 된 재생ㆍ반(半)합성스테이플섬유의 직물(재생ㆍ반(半)합성스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것)",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing 85% or More By Weight of Such Fibers, of Different Colored Yarns",
    "relatedAnnex2": "-",
    "country": "5516.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0457",
    "no": "337",
    "name": "날염한 재생ㆍ반(半)합성스테이플섬유의 직물(재생ㆍ반(半)합성스테이플섬유의 함유량이 전 중량의 100분의 85 이상인 것)",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing 85% or More By Weight of Such Fibers, Printed",
    "relatedAnnex2": "-",
    "country": "5516.14",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0458",
    "no": "338",
    "name": "표백하지 않은 것이나 표백한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 인조필라멘트와 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Manmade Filaments, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5516.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0459",
    "no": "339",
    "name": "염색한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 인조필라멘트와 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Manmade Filaments, Dyed",
    "relatedAnnex2": "-",
    "country": "5516.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0460",
    "no": "340",
    "name": "서로 다른 색실로 된 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 인조필라멘트와 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Manmade Filaments, of Different Colored Yarns",
    "relatedAnnex2": "-",
    "country": "5516.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0461",
    "no": "341",
    "name": "날염한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 인조필라멘트와 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Manmade Filaments, Printed",
    "relatedAnnex2": "-",
    "country": "5516.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0462",
    "no": "342",
    "name": "표백하지 않은 것이나 표백한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 양모나 동물의 부드러운 털과 혼방한 것으로 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Wool or Fine Animal Hair, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5516.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0463",
    "no": "343",
    "name": "염색한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 양모나 동물의 부드러운 털과 혼방한 것으로 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Wool or Fine Animal Hair, Dyed",
    "relatedAnnex2": "-",
    "country": "5516.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0464",
    "no": "344",
    "name": "서로 다른 색실로 된 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 양모나 동물의 부드러운 털과 혼방한 것으로 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Wool or Fine Animal Hair, of Different Colored Yarns",
    "relatedAnnex2": "-",
    "country": "5516.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0465",
    "no": "345",
    "name": "날염한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 양모나 동물의 부드러운 털과 혼방한 것으로 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Wool or Fine Animal Hair, Printed",
    "relatedAnnex2": "-",
    "country": "5516.34",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0466",
    "no": "346",
    "name": "표백하지 않은 것이나 표백한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 면과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Cotton, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5516.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0467",
    "no": "347",
    "name": "염색한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 면과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Cotton, Dyed",
    "relatedAnnex2": "-",
    "country": "5516.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0468",
    "no": "348",
    "name": "서로 다른 색실로 된 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 면과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Cotton, of Different Colored Yarns",
    "relatedAnnex2": "-",
    "country": "5516.43",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0469",
    "no": "349",
    "name": "날염한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 면과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Cotton, Printed",
    "relatedAnnex2": "-",
    "country": "5516.44",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0470",
    "no": "350",
    "name": "표백하지 않은 것이나 표백한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 다른 직물과 혼방한 것으로 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Other Fibers Nesoi, Unbleached or Bleached",
    "relatedAnnex2": "-",
    "country": "5516.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0471",
    "no": "351",
    "name": "염색한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 다른 직물과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Other Fibers Nesoi, Dyed",
    "relatedAnnex2": "-",
    "country": "5516.92",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0472",
    "no": "352",
    "name": "서로 다른 색실로 된 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로 다른 직물과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Other Fibers Nesoi, of Different Colored Yarns",
    "relatedAnnex2": "-",
    "country": "5516.93",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0473",
    "no": "353",
    "name": "날염한 재생ㆍ반(半)합성스테이플섬유의 직물로서 주로다른 직물과 혼방한 것으로서 재생ㆍ반(半)합성 스테이플섬유의 함유량이 전 중량의 100분의 85 미만인 것",
    "spec": "Woven Fabrics of Artificial Staple Fibers, Containing Under 85% (Wt.) of Such Fibers, Mixed with Other Fibers Nesoi, Printed",
    "relatedAnnex2": "-",
    "country": "5516.94",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0474",
    "no": "354",
    "name": "워딩(wadding)과 워딩(wadding)의 그 밖의 제품(면 또는 인조섬유로 만든 것은 제외한다)",
    "spec": "Wadding and Articles of Wadding Nesoi, of Textile Materials Other Than Cotton or Manmade Fibers",
    "relatedAnnex2": "-",
    "country": "5601.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0475",
    "no": "355",
    "name": "방직용섬유로서 길이가 5밀리미터 이하인 것 플록(flock), 더스트(dust), 밀네프(mill nep)",
    "spec": "Textile Flock (Textile Fibers Not Exceeding 5 mm In Length) and Dust and Mill Neps",
    "relatedAnnex2": "-",
    "country": "5601.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0476",
    "no": "356",
    "name": "1제곱미터당 중량이 150그램을 초과하는 부직포(침투ㆍ도포ㆍ피복ㆍ적층한 것인지에 상관없다)",
    "spec": "Nonwovens, whether or not impregnated, coated, covered or laminated, Weighing more than 150 g/㎡.",
    "relatedAnnex2": "-",
    "country": "5603.94",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0477",
    "no": "357",
    "name": "고무실과 고무끈(방직용 섬유로 피복한 것으로 한정한다)",
    "spec": "Rubber Thread and Cord, Textile Covered",
    "relatedAnnex2": "-",
    "country": "5604.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0478",
    "no": "358",
    "name": "고무실과 고무끈(방직용 섬유로 피복한 것으로 한정한다), 방직용 섬유사ㆍ제5404호나 제5405호의 스트립(strip)과 이와 유사한 물품[고무나 플라스틱을 침투ㆍ도포ㆍ피복하거나 시드한(sheathed) 것으로 한정한다]; 기타",
    "spec": "Rubber thread and cord, textile covered; textile yarn, and strip and the like of heading 5404 or 5405, impregnated, coated, covered or sheathed with rubber or plastics; Other",
    "relatedAnnex2": "-",
    "country": "5604.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0479",
    "no": "359",
    "name": "금속드리사(metallised yarn)[짐프한(gimped) 것인지에 상관없으며 방직용 섬유사, 제5404호나 제5405호의 스트립(strip)이나 이와 유사한 것으로서 실ㆍ스트립(strip)ㆍ가루 모양의 금속과 결합한 것이나 금속을 피복한 것으로 한정한다]",
    "spec": "Metalized yarn, whether or not gimped, being textile yarn, or strip or the like of heading 5404 or 5405, combined with metal in the form of thread, strip or powder or covered with metal",
    "relatedAnnex2": "-",
    "country": "5605.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0480",
    "no": "360",
    "name": "포장용 끈(폴리에틸렌이나 폴리프로필렌으로 만든 것으로 한정하며, 엮거나 짠 것인지, 고무나 플라스틱을 도포한 것인지 등에 상관없다)",
    "spec": "Binder or Baler Twine, Whether or Not Plaited or Braided or Coated Etc. with Rubber or Plastics, of Polyethylene or Polypropylene",
    "relatedAnnex2": "-",
    "country": "5607.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0481",
    "no": "361",
    "name": "접착제로 접착한 경사(經絲)만으로 이루어진 세폭(細幅)직물(볼덕)",
    "spec": "Narrow Fabrics Consisting of Warp Without Weft Assembled By Means of An Adhesive (Bolducs)",
    "relatedAnnex2": "-",
    "country": "5806.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0482",
    "no": "362",
    "name": "서적 장정용이나 이와 유사한 용도로 사용하는 방직용 섬유의 직물류로서 검(gum)이나 전분질의 물품을 도포한 것",
    "spec": "Textile Fabrics Coated with Gum or Amylaceous Substances, of A Kind Used for The Outer Covers of Books or The Like",
    "relatedAnnex2": "-",
    "country": "5901.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0483",
    "no": "363",
    "name": "투사포(tracing cloth), 회화용 캔버스, 모자 제조에 사용되는 버크럼(buckram)과 이와 유사한 경화가공된 방직용 섬유의 직물",
    "spec": "Tracing Cloth; Prepared Painting Canvas; Buckram and Similar Stiffened Textile Fabrics of A Kind Used for Hat Foundations",
    "relatedAnnex2": "-",
    "country": "5901.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0484",
    "no": "364",
    "name": "램프용ㆍ스토브용ㆍ라이터용ㆍ양초용이나 이와 유사한 용도로 사용하는 방직용 섬유의 심지, 가스 맨틀(mantle)과 가스 맨틀(mantle)용 관 모양의 편물(침투시켰는지에 상관없다)",
    "spec": "Textile Wicks for Lamps, Stoves, Lighters, Candles Etc; Gasmantles and Tubular Knitted Gas Mantle Fabric, Whether or Not Impregnated",
    "relatedAnnex2": "-",
    "country": "5908.00",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0485",
    "no": "365",
    "name": "전동(transmission)용ㆍ컨베이어용 벨트와 벨팅(belting)(방직용 섬유로 만든 것으로 한정하며, 플라스틱을 침투ㆍ도포ㆍ피복ㆍ적층한 것인지 또는 금속이나 그 밖의 물품으로 보강한 것인지에 상관없다)",
    "spec": "Transmission or conveyor belts or belting, of textile material, whether or not impregnated, coated, covered or laminated with plastics, or reinforced with metal or other material",
    "relatedAnnex2": "-",
    "country": "5910.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0486",
    "no": "366",
    "name": "침포(針布)로 사용하는 방직용 섬유의 직물류, 펠트(felt), 펠트(felt)로 안을 붙인 직물로서 고무ㆍ가죽 그 밖의 물품을 도포ㆍ피복하거나 적층한 물품으로 그 밖의 기술적 용도로 사용하는 이와 유사한 직물[위빙스핀들(weaving spindle)(위빙빔)을 피복하기 위한 고무를 침투시킨 벨벳으로 된 세폭(細幅)직물을 포함한다]",
    "spec": "Textile fabrics, felt and felt-lined woven fabrics, coated, covered or laminated with rubber, leather or other material, of a kind used for card clothing, and similar fabrics of a kind used for other technical purposes, including narrow fabrics made of velvet impregnated with rubber, for covering weaving spindles (weaving beams)",
    "relatedAnnex2": "-",
    "country": "5911.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0487",
    "no": "367",
    "name": "제지용 기계나 이와 유사한 기계에 사용하는 것으로 엔드리스(endless)나 연결구를 갖춘 방직용 섬유의 직물류와 펠트(felt)류로서 1제곱미터당 중량이 650그램 미만인 것",
    "spec": "Textile Fabrics and Felts, Endless or Fitted with Linking Devices, of A Kind Used In Papermaking or Similar Machines, Weighing Less Than 650 g/m2",
    "relatedAnnex2": "-",
    "country": "5911.31",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0488",
    "no": "368",
    "name": "제지용 기계나 이와 유사한 기계에 사용하는 것으로 엔드리스(endless)나 연결구를 갖춘 방직용 섬유의 직물류와 펠트(felt)류로서 1제곱미터당 중량이 650그램 이상인 것",
    "spec": "Textile Fabrics and Felts, Endless or Fitted with Linking Devices, of A Kind Used In Papermaking or Similar Machines, Weighing 650 g/m2 or More",
    "relatedAnnex2": "-",
    "country": "5911.32",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0489",
    "no": "369",
    "name": "착유기나 이와 유사한 용도로 사용하는 여과포(사람 머리카락으로 만든 것을 포함한다)",
    "spec": "Textile Straining Cloth of A Kind Used In Oil Presses or The Like, Including Human Hair",
    "relatedAnnex2": "-",
    "country": "5911.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0490",
    "no": "370",
    "name": "가공한 석비용ㆍ건축용 석재(그 밖의 석회질 암석으로 만든 것으로 한정한다)",
    "spec": "Worked Monumental or Building Stone Nesoi, of Calcareous Stone Nesoi",
    "relatedAnnex2": "-",
    "country": "6802.92",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0491",
    "no": "371",
    "name": "천연석으로 만든 밀스톤(millstone)ㆍ그라인드스톤(grindstone)ㆍ그라인딩휠(grinding wheel)과 이와 유사한 것",
    "spec": "Millstones, Grindstones, Grinding Wheels and The Like Nesoi, of Natural Stone",
    "relatedAnnex2": "-",
    "country": "6804.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0492",
    "no": "372",
    "name": "슬래그 울(slag wool)ㆍ암면(rock wool)과 이와 유사한 광물성 울[이들의 혼합물을 포함하며 벌크 모양ㆍ시트(sheet) 모양ㆍ롤 모양으로 한정한다]",
    "spec": "Slag Wool, Rock Wool and Similar Mineral Wools (Including Intermixtures Thereof), In Bulk, Sheets or Rolls",
    "relatedAnnex2": "-",
    "country": "6806.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0493",
    "no": "373",
    "name": "박리한 버미큘라이트(vermiculite)ㆍ팽창점토ㆍ다포슬래그(slag)와 이와 유사하게 팽창하는 광물성 재료(이들의 혼합물을 포함한다)",
    "spec": "Exfoliated Vermiculite, Expanded Clays, Foamed Slag and Similar Expanded Mineral Materials (Including Intermixtures Thereof)",
    "relatedAnnex2": "-",
    "country": "6806.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0494",
    "no": "374",
    "name": "단열용ㆍ방음용ㆍ흡음용 광물성 재료의 혼합물과 그 제품",
    "spec": "Mixtures and Articles of Heat-Insulating, Sound-Insulating or Sound-Absorbing Mineral Materials Nesoi",
    "relatedAnnex2": "-",
    "country": "6806.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0495",
    "no": "375",
    "name": "아스팔트 제품이나 이와 유사한 재료[예: 석유역청이나 콜타르 피치(coal tar pitch)]의 제품으로 롤 모양인 것",
    "spec": "Articles of Asphalt or of Similar Material (Petroleum Bitumen or Coal Tar Pitch Etc.), In Rolls",
    "relatedAnnex2": "-",
    "country": "6807.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0496",
    "no": "376",
    "name": "아스팔트 제품이나 이와 유사한 재료[예: 석유역청이나 콜타르 피치(coal tar pitch)]의 제품으로 그 밖의 모양인 것",
    "spec": "Articles of Asphalt or of Similar Material (Petroleum Bitumen or Coal Tar Pitch Etc.) Nesoi",
    "relatedAnnex2": "-",
    "country": "6807.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0497",
    "no": "377",
    "name": "플라스터(plaster) 제품이나 플라스터(plaster)를 기본 재료로 조합한 제품으로, 패널ㆍ시트(sheet)타일과 이와 유사한 제품(장식한 것은 제외한다)",
    "spec": "Panels, Sheets, Tiles and Similar Articles, Not Ornamented, of Plaster or Compositions Based on Plaster, Nesoi",
    "relatedAnnex2": "-",
    "country": "6809.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0498",
    "no": "378",
    "name": "건축용 또는 토목용 시멘트ㆍ콘크리트ㆍ인조석으로 보강여부와 관계 없이 시멘트로 제작된 조립식 건축자재, 타일ㆍ판석ㆍ벽돌과 이와 유사한 제품",
    "spec": "Prefabricated Structural Components for Building or Civil Engineering Made of Cement, Concrete or Artificial Stone, Whether or Not Reinforced, Tiles, flagstones, bricks and similar articles:",
    "relatedAnnex2": "-",
    "country": "6810.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0499",
    "no": "379",
    "name": "석면을 포함한 셀룰로오스파이버시멘트(CRC) 등의 석면시멘트 제품",
    "spec": "Articles of Asbestos-Cement, of Cellulose Fiber-Cement or The Like, Containing Asbestos",
    "relatedAnnex2": "-",
    "country": "6811.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0500",
    "no": "380",
    "name": "석면을 포함하지 않은 셀룰로오스파이버시멘트(CRC) 등의 물결모양의 시트(골판지 형상) 제품",
    "spec": "Corrugated Sheets, of Cellulose Fiber-Cement or The Like, Not Containing Asbestos",
    "relatedAnnex2": "-",
    "country": "6811.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0501",
    "no": "381",
    "name": "석면을 포함하지 않은 셀룰로오스파이버시멘트(CRC) 등의 물결모양 이외의 시트ㆍ판넬 및 타일 등의 제품",
    "spec": "Sheets, Panels, Tiles and Similar Articles, of Cellulose Fiber-Cement or The Like, Not Containing Asbestos, Excluding Corrugated Sheets",
    "relatedAnnex2": "-",
    "country": "6811.82",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0502",
    "no": "382",
    "name": "석면을 포함하지 않은 셀룰로오스파이버시멘트(CRC) 등의 제품으로 그 밖의 것",
    "spec": "Articles of Cellulose Fiber-Cement or The Like, Not Containing Asbestos, Nesoi",
    "relatedAnnex2": "-",
    "country": "6811.89",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0503",
    "no": "383",
    "name": "석면이 주성분인 연마용 소재 및 제품으로 장착되지 않은 것",
    "spec": "Friction Material and Articles Thereof, Unmounted, with A Basis of Asbestos",
    "relatedAnnex2": "-",
    "country": "6813.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0504",
    "no": "384",
    "name": "석면 외 광물성 재료 또는 셀룰로오스가 주성분인 브레이크 라이닝(brake lining)과 패드",
    "spec": "Brake Linings and Pads Not of Asbestos, Other Mineral Substances or Cellulose",
    "relatedAnnex2": "-",
    "country": "6813.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0505",
    "no": "385",
    "name": "그 밖의 광물성 재료 또는 셀룰로오스가 주성분인 연마용 소재와 그 제품으로 장착되지 않은 것(브레이크 라이닝(brake lining)과 패드는 제외)",
    "spec": "Friction Material and Articles Thereof (Except Brake Linings or Pads), Unmounted, Not Containing Asbestos, Other Mineralsubstances or of Cellulose,Nes",
    "relatedAnnex2": "-",
    "country": "6813.89",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0506",
    "no": "386",
    "name": "그 밖의 가공된 운모 및 그 제품",
    "spec": "Worked Mica and Articles of Mica, Nesoi",
    "relatedAnnex2": "-",
    "country": "6814.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0507",
    "no": "387",
    "name": "그 밖의 비(非)전기용 흑연 또는 탄소제품",
    "spec": "Nonelectrical Articles of Graphite or Carbon, Nesoi",
    "relatedAnnex2": "-",
    "country": "6815.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0508",
    "no": "388",
    "name": "세라믹 배관·연결구·홈통과 배관 피팅류",
    "spec": "Ceramic Pipes, Conduits, Guttering and Pipe Fittings",
    "relatedAnnex2": "-",
    "country": "6906.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0509",
    "no": "389",
    "name": "피니싱 세라믹",
    "spec": "Finishing Ceramics",
    "relatedAnnex2": "-",
    "country": "6907.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0510",
    "no": "390",
    "name": "농업용 세라믹 통과 튜브 등으로 물품의 수송 또는 포장용으로 사용하는 세라믹 팟·단지(저장용기) 및 이와 유사한 제품",
    "spec": "Ceramic Troughs, Tubs Etc. Used In Agriculture; Ceramic Pots, Jars and Similar Articles for The Conveyance or Packing of Goods",
    "relatedAnnex2": "-",
    "country": "6909.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0511",
    "no": "391",
    "name": "석영유리와 용융실리카로 제작된 튜브(미가공)",
    "spec": "Tubes of Fused Quartz or Other Fused Silica, Unworked",
    "relatedAnnex2": "-",
    "country": "7002.31",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0512",
    "no": "392",
    "name": "강화 안전유리로 차량·항공기·우주선·선박에 사용하기 적합한 크기와 모양인 것",
    "spec": "Toughened (Tempered) Safety Glass, of Size and Shape Suitable for Incorporation In Vehicles, Aircraft, Spacecraft or Vessels",
    "relatedAnnex2": "-",
    "country": "7007.11",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0513",
    "no": "393",
    "name": "유리섬유 로빙",
    "spec": "Glass Fiber Rovings",
    "relatedAnnex2": "-",
    "country": "7019.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0514",
    "no": "394",
    "name": "그 밖의 유리섬유[글라스 울(glass wool) 포함]와 이들의 제품(그 밖의 실[슬리버(sliver)로 한정한다])",
    "spec": "Glass Fibers (Including Glass Wool) and Articles Thereof (Other yarn, slivers)",
    "relatedAnnex2": "-",
    "country": "7019.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0515",
    "no": "395",
    "name": "선별하지 않은 다이아몬드(가공한 것인지에 상관없으며 장착되거나 세트로 된 것은 제외한다)",
    "spec": "Diamonds, Unsorted",
    "relatedAnnex2": "-",
    "country": "7102.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0516",
    "no": "396",
    "name": "그 밖의 다른 방법으로 가공한 루비ㆍ사파이어ㆍ에메랄드",
    "spec": "Rubies, Sapphires and Emeralds, Otherwise Worked",
    "relatedAnnex2": "-",
    "country": "7103.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0517",
    "no": "397",
    "name": "철이나 비합금강의 반가공품으로 탄소가 0.25 wt% 미만인 것으로서 직사각형 또는 정사각형인 횡단면의 폭이 두께의 2배 미만인 것",
    "spec": "Semifinished Products of Iron or Nonalloy Steel, Under 0.25% (Wt.) Carbon, Rectangular or Square Cross Section, Width Less Than Twice The Thickness",
    "relatedAnnex2": "-",
    "country": "7207.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0518",
    "no": "398",
    "name": "철이나 비합금강의 반가공품으로 탄소가 0.25 wt% 미만인 것으로서 그 밖의 횡단면이 직사각형(정사각형은 제외한다)인 것",
    "spec": "Semifinished Products of Iron or Nonalloy Steel, Under 0.25% (Wt.) Carbon, Other, of rectangular (other than square) cross section",
    "relatedAnnex2": "-",
    "country": "7207.12",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0519",
    "no": "399",
    "name": "그 밖의 철이나 비합금강의 반가공품으로 탄소가 0.25 wt% 미만인 것으로서 그 외의 것",
    "spec": "Semifinished Products of Iron or Nonalloy Steel, Under 0.25% (Wt.) Carbon, Nesoi",
    "relatedAnnex2": "-",
    "country": "7207.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0520",
    "no": "400",
    "name": "철이나 비합금강의 반가공품으로 탄소를 0.25 wt% 이상 함유한 것",
    "spec": "Semifinished Products of Iron or Nonalloy Steel, Containing 0.25% (Wt.) or More of Carbon",
    "relatedAnnex2": "-",
    "country": "7207.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0521",
    "no": "401",
    "name": "철이나 비합금강의 평판압연 코일로 폭이 600mm 이상이며 열간압연보다 가공되지 않은 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, of A Width of 600 mm or More, In Coils, Not Further Worked Than Hot-Rolled, with Patterns In Relief.",
    "relatedAnnex2": "-",
    "country": "7208.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0522",
    "no": "402",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께 4.75mm 이상의 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, of A Width of 600mm or More, Coils, Hot-Rolled Worked Only, Pickled, Thickness 4.75 mm or More, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7208.25",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0523",
    "no": "403",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께가 3mm부터 4.75mm 미만으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, of A Width of 600 mm or More, Coils, Hot-Rolled Worked Only, Pickled, 3 mm But <4.75mm Thick, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7208.26",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0524",
    "no": "404",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께 3mm 미만으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width of 600 mm or More, In Coils, Hot-Rolled Worked Only, Pickled, Less Than 3 mm Thick, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7208.27",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0525",
    "no": "405",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께 10mm 초과한 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width of 600 mm or More In Coils, Hot-Rolled Worked Only, of A Thickness Exceeding 10 mm, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7208.36",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0526",
    "no": "406",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께가 4.75mm부터 10mm 미만으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Irn or Nonalloy Steel, Width of 600 mm or More, In Coils, Hot-Rolled Worked Only, of A Thickness 4.75 mm But Not Over 10 mm Nesoi.",
    "relatedAnnex2": "-",
    "country": "7208.37",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0527",
    "no": "407",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께가 3mm부터 4.75mm 미만으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils,Hot-Rolled Worked Only, of A Thickness 3 mm or More But Under 4.75 mm, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7208.38",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0528",
    "no": "408",
    "name": "그 밖의 철이나 비합금강의 평판압연 코일로 폭이 600mm 이상, 두께가 3mm 미만으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils,Hot-Rolled Worked Only, of A Thickness of Less Than 3 mm, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7208.39",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0529",
    "no": "409",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양이 아닌 것으로서 열간(熱間)압연보다 더 가공하지 않은 부조(浮彫)된 무늬가 있는 것으로 클래드(Clad)ㆍ도금ㆍ도포하지 않은 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel, 600 mm or More Wide, Hot-Rolled, Not Clad, Plated or coated, Not in coils, not further worked than hot-rolled, with patterns in relief",
    "relatedAnnex2": "-",
    "country": "7208.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0530",
    "no": "410",
    "name": "철이나 비합금강의 평판압연된 폭이 600mm 이상, 두께가 10mm 초과하는 코일이 아닌 것으로 열간압연 처리만 된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, Not In Coils, Hot-Rolled Worked Only, of A Thickness Exceeding 10 mm, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7208.51",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0531",
    "no": "411",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양이 아닌 것으로서 열간(熱間)압연보다 더 가공하지 않은 것으로 두께 4.75mm 이상 10mm 이하이고, 클래드(Clad)ㆍ도금ㆍ도포하지 않은 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel, 600 mm or More Wide, Hot-Rolled, Not Clad, Plated, Coated or Coils, 4.75 mm to 10 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7208.52",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0532",
    "no": "412",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양이 아닌 것으로 열간(熱間)압연보다 더 가공하지 않은 것으로 두께 3mm 이상 4.75mm 미만이고, 클래드(Clad)ㆍ도금ㆍ도포하지 않은 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel, 600 mm or More Wide, Hot-Rolled, Not Clad, Plated, Coated or Coils, 3 mm to Under 4.75 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7208.53",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0533",
    "no": "413",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양이 아닌 것으로 열간(熱間)압연보다 더 가공하지 않은 것으로 두께 3mm 미만이고, 클래드(Clad)ㆍ도금ㆍ도포하지 않은 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel, 600 mm or More Wide, Hot-Rolled, Not Clad, Plated, Coated or Coils, Less Than 3 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7208.54",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0534",
    "no": "414",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 열간(熱間)압연한 것으로 클래드(Clad)ㆍ도금ㆍ도포하지 않은 그 밖의 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Hot-Rolled, Not Clad, Plated or Coated, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7208.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0535",
    "no": "415",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 3mm 이상인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils, Cold-Rolled Worked Only, of A Thickness of 3 mm or More.",
    "relatedAnnex2": "-",
    "country": "7209.15",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0536",
    "no": "416",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 1mm 초과 3mm 미만인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils, Cold-Rolled Worked Only, of A Thickness Over One mm But Less Than 3 mm.",
    "relatedAnnex2": "-",
    "country": "7209.16",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0537",
    "no": "417",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 0.5mm 이상 1mm 이하인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils, Cold-Rolled Worked Only, of A Thickness 0.5 mm or More But Not Over 1 mm.",
    "relatedAnnex2": "-",
    "country": "7209.17",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0538",
    "no": "418",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 0.5mm 미만인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, In Coils, Cold-Rolled Worked Only, of A Thickness of Less Than 0.5 mm.",
    "relatedAnnex2": "-",
    "country": "7209.18",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0539",
    "no": "419",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 아닌 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 3mm 이상인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, Not In Coils, Cold-Rolled Worked Only, of A Thickness of 3 mm or More.",
    "relatedAnnex2": "-",
    "country": "7209.25",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0540",
    "no": "420",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 아닌 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 1mm 초과 3mm 미만인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, Not In Coils, Cold-Rolled Worked Only, of A Thickness Over 1 mm But Less Than 3 mm.",
    "relatedAnnex2": "-",
    "country": "7209.26",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0541",
    "no": "421",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 아닌 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 0.5mm 이상 1mm 이하인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, Not In Coils, Cold-Rolled Worked Only, of A Thickness 0.5 mm or More But N/O 1 mm.",
    "relatedAnnex2": "-",
    "country": "7209.27",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0542",
    "no": "422",
    "name": "철이나 비합금강의 평판압연 제품으로 폭이 600mm 이상이고, 코일 모양인 아닌 것으로 냉간압연(냉간환원)보다 더 가공하지 않은 것으로 두께 0.5mm 미만인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width 600 mm or More, Not In Coils, Cold-Rolled Worked Only, of A Thickness of Less Than 0.5 mm.",
    "relatedAnnex2": "-",
    "country": "7209.28",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0543",
    "no": "423",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상인 것으로서 냉간압연(냉간환원)한 것으로 클래드(Clad)ㆍ도금ㆍ도포하지 않은 그 밖의 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Cold-Rolled, Not Clad, Plated or Coated, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7209.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0544",
    "no": "424",
    "name": "철이나 비합금강의 평판압연제품[폭이 600밀리미터 이상인 것으로서 주석을 도금·도포한 것으로 한정한다](두께가 0.5밀리미터 이상인 것)",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Plated or Coated with Tin, 0.5 mm or More Thick.",
    "relatedAnnex2": "-",
    "country": "7210.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0545",
    "no": "425",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 두께 0.5mm 미만인 주석으로 도금하거나 도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Plated or Coated with Tin, Under 0.5 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7210.12",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0546",
    "no": "426",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 납을 도금하거나 도포한 것(함석판을 포함)",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Plated or Coated with Lead, Including Terne-Plate.",
    "relatedAnnex2": "-",
    "country": "7210.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0547",
    "no": "427",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 아연을 전해도금하거나 도포한 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width of 600 mm or More, Electrolytically Plated or Coated with Zinc.",
    "relatedAnnex2": "-",
    "country": "7210.30",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0548",
    "no": "428",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 전해도금 이외의 방법으로 아연을 도금하거나 도포한 물결 모양(골지구조)의 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Corrugated, 600 mm or More Wide, Plated or Coated with Zinc Other Than Electrolytically.",
    "relatedAnnex2": "-",
    "country": "7210.41",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0549",
    "no": "429",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 전해도금 이외의 방법으로 아연을 도금하거나 도포한 물결 모양(골지구조)이 아닌 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Not Corrugated, 600 mm or More Wide, Plated or Coated with Zinc Other Than Electrolytically.",
    "relatedAnnex2": "-",
    "country": "7210.49",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0550",
    "no": "430",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 산화크로뮴이나 크로뮴과 산화크로뮴으로 도금하거나 도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Plated or Coated with Chromium Oxides or with Chromium and Chromium Oxides.",
    "relatedAnnex2": "-",
    "country": "7210.50",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0551",
    "no": "431",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 알루미늄-아연 합금을 도금하거나 도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel 600 mm or More, Plated or Coated with Aluminum-Zinc Alloys.",
    "relatedAnnex2": "-",
    "country": "7210.61",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0552",
    "no": "432",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 기타 알루미늄으로 도금하거나 도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel 600 mm or More, Plated or Coated with Other Aluminum.",
    "relatedAnnex2": "-",
    "country": "7210.69",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0553",
    "no": "433",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상이고, 페인팅한 것ㆍ바니시한 것ㆍ플라스틱을 도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Painted, Varnished or Coated with Plastics.",
    "relatedAnnex2": "-",
    "country": "7210.70",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0554",
    "no": "434",
    "name": "철이나 비합금강의 평판압연제품으로 폭이 600mm 이상인 그 밖의 것으로 클래드(Clad)ㆍ도금ㆍ도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, 600 mm or More Wide, Clad, Plated or Coated, Nesoi",
    "relatedAnnex2": "-",
    "country": "7210.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0555",
    "no": "435",
    "name": "철이나 비합금강의 평판압연제품[폭이 600밀리미터 미만인 것으로서 열간압연보다 더 가공하지 않은 것](클래드(clad)·도금·도포한 것은 제외)으로 4면을 압연한 것이나 크로스드 박스 패스(closed box pass)로 한 것(폭이 150밀리미터를 초과하고, 두께가 4밀리미터 이상인 것으로, 코일 모양인 것과 부조(浮彫)된 무늬가 있는 것은 제외)",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Not Further Worked Than Hot-Rolled, Rolled on Four Faces or In A Closed Box Pass, of A Width Exceeding 150 ㎜ and A Thickness of Not Less Than 4 ㎜, Not In Coils and Without Patterns In Relief",
    "relatedAnnex2": "-",
    "country": "7211.13",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0556",
    "no": "436",
    "name": "고강도 철이나 비합금강의 평판압연제품[폭이 600밀리미터 미만인 것으로서 열간압연보다 더 가공하지 않은 것](클래드(clad)·도금·도포한 것은 제외)으로 두께가 4.75밀리미터 이상인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Not Further Worked Than Hot-Rolled, Other, of a thickness of 4.75 mm or more, of High-Strength Steel",
    "relatedAnnex2": "-",
    "country": "7211.14",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0557",
    "no": "437",
    "name": "철이나 비합금강의 그 밖의 평판압연제품[폭이 600밀리미터 미만인 것으로서 열간압연보다 더 가공하지 않은 것](클래드(clad)·도금·도포한 것은 제외)",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Not Further Worked Than Hot-Rolled, Other",
    "relatedAnnex2": "-",
    "country": "7211.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0558",
    "no": "438",
    "name": "철이나 비합금강의 평판압연제품[폭이 600밀리미터 미만인 것으로서 냉간압연보다 더 가공하지 않은 것](클래드(clad)ㆍ도금ㆍ도포한 것은 제외)으로 탄소의 함유량이 전 중량의 100분의 0.25 미만인 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Not Further Worked Than Cold-Rolled, Containing by weight less than 0.25 percent of carbon",
    "relatedAnnex2": "-",
    "country": "7211.23",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0559",
    "no": "439",
    "name": "철이나 비합금강의 그 밖의 평판압연제품[폭이 600밀리미터 미만인 것으로서 냉간압연보다 더 가공하지 않은 것](클래드(clad)ㆍ도금ㆍ도포한 것은 제외)",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Not Further Worked Than Cold-Rolled, Other",
    "relatedAnnex2": "-",
    "country": "7211.29",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0560",
    "no": "440",
    "name": "그 밖에 철이나 비합금강의 평판압연제품[폭이 600밀리미터 미만인 것으로서 클래드(clad)ㆍ도금ㆍ도포한 것은 제외]",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel Under 600mm Wide, Not Clad, Plated or Coated, Other",
    "relatedAnnex2": "-",
    "country": "7211.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0561",
    "no": "441",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 주석으로 도금 또는 코팅된 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Under 600 mm Wide, Plated or Coated with Tin",
    "relatedAnnex2": "-",
    "country": "7212.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0562",
    "no": "442",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 아연으로 전해도금 또는 코팅된 것",
    "spec": "Flat-Rolled Products of Iron or Nonalloy Steel, Width of Less Than 600 mm, Electrolytically Plated or Coated with Zinc.",
    "relatedAnnex2": "-",
    "country": "7212.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0563",
    "no": "443",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 아연으로 전기적 방법 외 도금 또는 코팅된 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Under 600 mm Wide, Plated or Coated with Zinc Other Than Electrolytically.",
    "relatedAnnex2": "-",
    "country": "7212.30",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0564",
    "no": "444",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 플라스틱으로 페인팅·바니시·도포한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Under 600 mm Wide, Painted, Varnished or Coated with Plastics.",
    "relatedAnnex2": "-",
    "country": "7212.40",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0565",
    "no": "445",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 플라스틱으로 도금하거나 도포한 것과 그 밖의 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Under 600 mm Wide, Plated or Coated, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7212.50",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0566",
    "no": "446",
    "name": "철이나 비합금강의 평판압연제품으로 폭 600 mm 미만으로 플라스틱으로 클래드(clad)한 것",
    "spec": "Flat-Rolled Iron or Nonalloy Steel Products, Under 600 mm Wide, Clad",
    "relatedAnnex2": "-",
    "country": "7212.60",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0567",
    "no": "447",
    "name": "철이나 비합금강의 봉[열간(熱間)압연한 것으로서 불규칙적으로 감은 코일 모양인 것으로서 콘크리트로 보강한 것]",
    "spec": "Bars and Rods of Iron or Nonalloy Steel, Hot-Rolled, Inirregullarly Wound Coils, Concrete Reinforcing",
    "relatedAnnex2": "-",
    "country": "7213.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0568",
    "no": "448",
    "name": "쾌삭강의 봉[열간(熱間)압연한 것으로서 불규칙적으로 감은 코일 모양인 것]",
    "spec": "Bars and Rods of Free-Cutting Nonalloy Steel, Hot-Rolled, In Irregularly Wound Coils",
    "relatedAnnex2": "-",
    "country": "7213.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0569",
    "no": "449",
    "name": "철이나 비합금강의 봉[열간(熱間)압연한 것으로서 불규칙적으로 감은 코일 모양인 것으로서 횡단면이 원형인 것으로 지름이 14밀리미터 미만인 것]과 그 밖의 것",
    "spec": "Bars and Rods, Hot-Rolled, In Irregularly Wound Coils, of Iron or Nonalloy Steel, of Circular Cross-Section Measuring Less Than 14mm In Diameter, Nesoi",
    "relatedAnnex2": "-",
    "country": "7213.91",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0570",
    "no": "450",
    "name": "그 밖의 철이나 비합금강의 봉[열간(熱間)압연한 것으로서 불규칙적으로 감은 코일 모양인 것]",
    "spec": "Bars and Rods, Hot-Rolled, In Irregularly Wound Coils, of Iron or Nonalloy Steel, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7213.99",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0571",
    "no": "451",
    "name": "철이나 비합금강의 그 밖의 봉[냉간(冷間)성형이나 냉간(冷間)처리보다 더 가공하지 않은 것]",
    "spec": "Bars and Rods of Iron or Nonalloy Steel, Not Further Worked Than Cold-Formed or Cold-Finished, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "7215.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0572",
    "no": "452",
    "name": "철이나 비합금강의 유(U)형강·아이(I)형강·에이치(H)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 미만인 것]",
    "spec": "U, I or H Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, Less Than 80 mm High",
    "relatedAnnex2": "-",
    "country": "7216.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0573",
    "no": "453",
    "name": "철이나 비합금강의 엘(L)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 미만인 것]",
    "spec": "L Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, Less Than 80 mm High",
    "relatedAnnex2": "-",
    "country": "7216.21",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0574",
    "no": "454",
    "name": "철이나 비합금강의 티(T)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 미만인 것]",
    "spec": "T Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, Less Than 80 mm High",
    "relatedAnnex2": "-",
    "country": "7216.22",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0575",
    "no": "455",
    "name": "철이나 비합금강의 유(U)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 이상인 것]",
    "spec": "U Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, 80 mm or More High",
    "relatedAnnex2": "-",
    "country": "7216.31",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0576",
    "no": "456",
    "name": "철이나 비합금강의 아이(I)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 이상인 것]",
    "spec": "I Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, 80 mm or More High (Standard Beams)",
    "relatedAnnex2": "-",
    "country": "7216.32",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0577",
    "no": "457",
    "name": "철이나 비합금강의 에이치(H)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 이상인 것]",
    "spec": "H Sections of Iron or Nonalloy Steel, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, 80 mm or More High",
    "relatedAnnex2": "-",
    "country": "7216.33",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0578",
    "no": "458",
    "name": "엘(L)형강이나 티(T)형강[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것으로서 높이가 80밀리미터 이상인 것]",
    "spec": "L or T Sections, Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded, of A Height of 80 ㎜ or More",
    "relatedAnnex2": "-",
    "country": "7216.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0579",
    "no": "459",
    "name": "그 밖의 형강(Other Angles, Shapes, Sections)[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것]",
    "spec": "Other Angles, Shapes and Sections Not Further Worked Than Hot-Rolled, Hot-Drawn or Extruded",
    "relatedAnnex2": "-",
    "country": "7216.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0580",
    "no": "460",
    "name": "철이나 비합금강의 형강(Angles, Shapes, Sections)[냉간(冷間)성형이나 냉간(冷間)처리보다 더 가공하지 않은 것](평판압연제품으로부터 만든 것)",
    "spec": "Angles, Shapes and Sections, Iron or Nonalloy Steel, Not Further Worked Than Cold-Formed or Cold-Finished, Obtained From Flat-Rolled Products",
    "relatedAnnex2": "-",
    "country": "7216.61",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0581",
    "no": "461",
    "name": "철이나 비합금강의 형강(Angles, Shapes, Sections)[냉간(冷間)성형이나 냉간(冷間)처리보다 더 가공하지 않은 것](평판압연제품으로부터 만든 것이 아닌 것)",
    "spec": "Angles, Shapes and Sections, Iron or Nonalloy Steel, Not Further Worked Than Cold-Formed or Cold-Finished, Not Obtained From Flat-Rolled Products",
    "relatedAnnex2": "-",
    "country": "7216.69",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0582",
    "no": "462",
    "name": "철이나 비합금강의 형강(Angles, Shapes, Sections)으로 기타 냉간(冷間)성형이나 냉간(冷間)처리한 평판압연제품으로부터 만든 것",
    "spec": "Angles, Shapes and Sections, Iron or Nonalloy Steel, Other Cold-Formed or Cold-Finished From Flat-Rolled Products",
    "relatedAnnex2": "-",
    "country": "7216.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0583",
    "no": "463",
    "name": "그 밖에 철이나 비합금강의 형강(Angles, Shapes, Sections)",
    "spec": "Angles, Shapes and Sections Iron or Nonalloy Steel, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7216.99",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0584",
    "no": "464",
    "name": "스테인리스강과 스테인리스강의 반제품[잉곳(ingot)과 기타 일차제품 형태(primary form)인 것]",
    "spec": "Stainless Steel in Ingots and Other Primary Forms; Semi-finished Products of Stainless Steel",
    "relatedAnnex2": "-",
    "country": "7218.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0585",
    "no": "465",
    "name": "스테인리스강과 스테인리스강의 반제품[횡단면이 직사각형인 것으로 정사각형인 것은 제외]",
    "spec": "Stainless Steel; Semifinished Products of Stainless Steel, Rectangular (Other Than Square) Cross-Section",
    "relatedAnnex2": "-",
    "country": "7218.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0586",
    "no": "466",
    "name": "그 밖의 스테인리스강과 스테인리스강의 반제품",
    "spec": "Other Stainless Steel; Semifinished Products of Stainless Steel",
    "relatedAnnex2": "-",
    "country": "7218.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0587",
    "no": "467",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 코일 모양인 것으로서 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 10밀리미터를 초과하는 것)",
    "spec": "Flat-Rolled Stainless Steel In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Over 10 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0588",
    "no": "468",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 코일 모양인 것으로서 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 4.75밀리미터 이상 10밀리미터 이하인 것)",
    "spec": "Flat-Rolled Stainless Steel In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, 4.75 mm But Not Over 10 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.12",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0589",
    "no": "469",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 코일 모양인 것으로서 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 3밀리미터 이상 4.75밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, 3 mm But Under 4.75 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.13",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0590",
    "no": "470",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 코일 모양인 것으로서 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 3밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Under 3 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.14",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0591",
    "no": "471",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 열간(熱間)압연보다 더 가공하지 않은 것으로서 코일 모양인 것은 제외한다)(두께가 10밀리미터를 초과하는 것)",
    "spec": "Flat-Rolled Stainless Steel Not In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Over 10 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.21",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0592",
    "no": "472",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 열간(熱間)압연보다 더 가공하지 않은 것으로서 코일 모양인 것은 제외한다)(두께가 4.75밀리미터 이상 10밀리미터 이하인 것)",
    "spec": "Flat-Rolled Stainless Steel Not In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, 4.75 mm But Not Over 10 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.22",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0593",
    "no": "473",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 열간(熱間)압연보다 더 가공하지 않은 것으로서 코일 모양인 것은 제외한다)(두께가 3밀리미터 이상 4.75밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Not In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, 3 mm But Under 4.75 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.23",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0594",
    "no": "474",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 열간(熱間)압연보다 더 가공하지 않은 것으로서 코일 모양인 것은 제외한다)(두께가 3밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Not In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Under 3 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.24",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0595",
    "no": "475",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)(두께가 4.75밀리미터 이상인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), 4.75 mm or More Thick.",
    "relatedAnnex2": "-",
    "country": "7219.31",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0596",
    "no": "476",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)(두께가 3밀리미터 이상 4.75밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), 3 mm But Under 4.75 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.32",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0597",
    "no": "477",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)(두께가 1밀리미터를 초과 3밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), Over 1 mm But Under 3 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.33",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0598",
    "no": "478",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)(두께가 0.5밀리미터 이상 1밀리미터 이하인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), 0.5 mm But Not Over 1 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.34",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0599",
    "no": "479",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)(두께가 0.5밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), Under 0.5 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7219.35",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0600",
    "no": "480",
    "name": "그 밖에 스테인리스강의 평판압연제품(폭이 600밀리미터 이상인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, 600 mm or More Wide, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7219.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0601",
    "no": "481",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 미만이며 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 4.75밀리미터 이상인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, Under 600 mm Wide, Not further worked than Hot-Rolled, 4.75 mm or More Thick.",
    "relatedAnnex2": "-",
    "country": "7220.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0602",
    "no": "482",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 미만이며 열간(熱間)압연보다 더 가공하지 않은 것)(두께가 4.75밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, Under 600 mm Wide, Not further worked than Hot-Rolled, Under 4.75 mm Thick.",
    "relatedAnnex2": "-",
    "country": "7220.12",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0603",
    "no": "483",
    "name": "스테인리스강의 평판압연제품(폭이 600밀리미터 미만이며 냉간압연(냉간환원)보다 더 가공하지 않은 것)",
    "spec": "Flat-Rolled Stainless Steel Products, Under 600 mm Wide, Not further worked than Cold-Rolled(Cold-Reduced).",
    "relatedAnnex2": "-",
    "country": "7220.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0604",
    "no": "484",
    "name": "그 밖에 스테인리스강의 평판압연제품(폭이 600밀리미터 미만인 것)",
    "spec": "Flat-Rolled Stainless Steel Products, Under 600 mm Wide, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7220.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0605",
    "no": "485",
    "name": "스테인리스강의 그 밖의 봉과 형강(形鋼)",
    "spec": "Other Bars and Rods of Stainless Steel; Angles, Shapes and Sections of Stainless Steel, Nesoi",
    "relatedAnnex2": "-",
    "country": "7222.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0606",
    "no": "486",
    "name": "잉곳(ingot)과 기타 일차제품 형태(primary form)인 그 밖의 합금강(스테인리스는 제외한다)",
    "spec": "Ingots and Other Primary Forms of Other Alloy Steel (Other Than Stainless), Nesoi",
    "relatedAnnex2": "-",
    "country": "7224.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0607",
    "no": "487",
    "name": "그 밖에 합금강(스테인리스는 제외한다)의 반제품",
    "spec": "Semifinished Products of Other Alloy Steel (Other Than Stainless), Nesoi",
    "relatedAnnex2": "-",
    "country": "7224.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0608",
    "no": "488",
    "name": "규소전기강의 평판압연제품(폭이 600밀리미터 이상인 것으로서 방향성의 것)",
    "spec": "Flat-Rolled Silicon Electrical Steel 600 mm or More Wide, Grain-Oriented.",
    "relatedAnnex2": "-",
    "country": "7225.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0609",
    "no": "489",
    "name": "규소전기강의 평판압연제품(폭이 600밀리미터 이상인 것으로서 방향성이 아닌 것)",
    "spec": "Flat-Rolled Silicon Electrical Steel 600mm or More Wide, Not Grain-Oriented",
    "relatedAnnex2": "-",
    "country": "7225.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0610",
    "no": "490",
    "name": "그 밖의 합금강(스테인리스강은 제외한다)의 평판압연제품[폭이 600밀리미터 이상이며 코일 모양인 것으로서 열간(熱間)압연보다 더 가공하지 않은 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Nesoi",
    "relatedAnnex2": "-",
    "country": "7225.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0611",
    "no": "491",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 평판압연제품[폭이 600밀리미터 이상이며 코일 모양이 아닌 것으로서 열간(熱間)압연보다 더 가공하지 않은 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) Not In Coils, 600 mm or More Wide, Not further worked than Hot-Rolled, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7225.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0612",
    "no": "492",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 평판압연제품[폭이 600밀리미터 이상이며 냉간압연(냉간환원)보다 더 가공하지 않은 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) Products, 600 mm or More Wide, Not further worked than Cold-Rolled(Cold-Reduced), Nesoi.",
    "relatedAnnex2": "-",
    "country": "7225.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0613",
    "no": "493",
    "name": "합금강의 평판압연제품[폭이 600밀리미터 이상이며 아연을 전해도금하거나 도포한 것]",
    "spec": "Flat-Rolled Alloy Steel Nesoi, 600 mm or More Wide, Electrolytically Plated or Coated with Zinc.",
    "relatedAnnex2": "-",
    "country": "7225.91",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0614",
    "no": "494",
    "name": "합금강의 평판압연제품[폭이 600밀리미터 이상이며 그 밖의 방법으로 아연을 도금하거나 도포한 것]",
    "spec": "Flat-Rolled Alloy Steel Nesoi 600 mm or More Wide, Plated or Coated with Zinc, Not Electrolytically.",
    "relatedAnnex2": "-",
    "country": "7225.92",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0615",
    "no": "495",
    "name": "그 밖의 합금강의 평판압연제품[폭이 600밀리미터 이상인 것]",
    "spec": "Flat-Rolled Alloy Steel Not Stainless, 600 mm or More Wide, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7225.99",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0616",
    "no": "496",
    "name": "규소전기강의 평판압연제품(폭이 600밀리미터 미만인 것으로서 방향성의 것)",
    "spec": "Flat-Rolled Silicon Electrical Steel Under 600 mm Wide, Grain-Oriented.",
    "relatedAnnex2": "-",
    "country": "7226.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0617",
    "no": "497",
    "name": "규소전기강의 평판압연제품(폭이 600밀리미터 미만인 것으로서 방향성이 아닌 것)",
    "spec": "Flat-Rolled Silicon Electrical Steel Under 600 mm Wide, Not Grain-Oriented.",
    "relatedAnnex2": "-",
    "country": "7226.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0618",
    "no": "498",
    "name": "고속도강의 평판압연제품(폭이 600밀리미터 미만인 것)",
    "spec": "Flat-Rolled High-Speed Steel Products, Under 600 mm Wide.",
    "relatedAnnex2": "-",
    "country": "7226.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0619",
    "no": "499",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 평판압연제품[폭이 600밀리미터 미만이며 열간(熱間)압연보다 더 가공하지 않은 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) Products, Under 600 mm Wide, Not further worked than Hot-Rolled, Nesoi",
    "relatedAnnex2": "-",
    "country": "7226.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0620",
    "no": "500",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 평판압연제품[폭이 600밀리미터 미만이며 냉간압연(냉간환원)보다 더 가공하지 않은 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) Products, Under 600 mm Wide, Not further worked than Cold-Rolled(Cold-Reduced), Nesoi.",
    "relatedAnnex2": "-",
    "country": "7226.92",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0621",
    "no": "501",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 평판압연제품[폭이 600밀리미터 미만인 것]",
    "spec": "Flat-Rolled Alloy Steel (Other Than Stainless) Products, Under 600 mm Wide, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7226.99",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0622",
    "no": "502",
    "name": "고속도강의 봉",
    "spec": "Bars and Rods of High-Speed Steel Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0623",
    "no": "503",
    "name": "실리코망간강의 봉",
    "spec": "Bars and Rods of Silico-Manganese Steel Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0624",
    "no": "504",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 기타 봉[열간(熱間)압연, 열간인발(熱間引拔)ㆍ압출보다 더 가공하지 않은 것]",
    "spec": "Bars and Rods of Alloy Steel (Other Than Stainless), Not further worked than Hot-Rolled, Hot-Drawn or Extruded, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7228.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0625",
    "no": "505",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 기타 봉[단조보다 더 가공하지 않은 것]",
    "spec": "Bars and Rods of Alloy Steel (Other Than Stainless), Not further worked than Forged, Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0626",
    "no": "506",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 기타 봉[냉간(冷間)성형이나 냉간(冷間)처리보다 더 가공하지 않은 것]",
    "spec": "Bars and Rods of Alloy Steel (Other Than Stainless), Not further worked than Cold-Formed or Cold-Finished, Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0627",
    "no": "507",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 기타 봉",
    "spec": "Bars and Rods of Alloy Steel (Other Than Stainless), Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.60",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0628",
    "no": "508",
    "name": "그 밖의 합금강(스테인리스는 제외한다)의 형강",
    "spec": "Angles, Shapes and Sections of Alloy Steel (Other Than Stainless), Nesoi",
    "relatedAnnex2": "-",
    "country": "7228.70",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0629",
    "no": "509",
    "name": "합금강이나 비합금강의 중공(中空)드릴봉",
    "spec": "Hollow Drill Bars and Rods of Alloy or Nonalloy Steel",
    "relatedAnnex2": "-",
    "country": "7228.80",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0630",
    "no": "510",
    "name": "그 밖의 합금강의 선(線)(실리콘망간강 제외)",
    "spec": "Wire of Other Alloy Steel Nesoi, Other Than Silico-Manganese Steel",
    "relatedAnnex2": "-",
    "country": "7229.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0631",
    "no": "511",
    "name": "철강으로 만든 용접된 형강",
    "spec": "Welded Angles, Shapes and Sections of Iron or Steel",
    "relatedAnnex2": "-",
    "country": "7301.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0632",
    "no": "512",
    "name": "스테인리스강으로 만든 오일이나 가스 배관용 파이프라인(무계목으로 한정)",
    "spec": "Line Pipe for Oil and Gas Pipelines, of Stainless Steel, Seamless",
    "relatedAnnex2": "-",
    "country": "7304.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0633",
    "no": "513",
    "name": "그 밖의 철강(주철 제외)으로 만든 오일이나 가스 배관용 파이프라인(무계목으로 한정)",
    "spec": "Line Pipe for Oil and Gas Pipelines, of Seamless Iron (Other Than Cast Iron) or Steel, Nesoi",
    "relatedAnnex2": "-",
    "country": "7304.19",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0634",
    "no": "514",
    "name": "스테인리스강으로 만든 유정용이나 가스정용 드릴파이프(무계목으로 한정)",
    "spec": "Drill Pipe of A Kind Used In Drilling for Oil or Gas, of Stainless Steel, Seamless",
    "relatedAnnex2": "-",
    "country": "7304.22",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0635",
    "no": "515",
    "name": "그 밖의 철강(주철 제외)으로 만든 유정용이나 가스정용 드릴파이프(무계목으로 한정)",
    "spec": "Drill Pipe of A Kind Used In Drilling for Oil or Gas, of Iron (Except Cast Iron) or Steel, Seamless, Nesoi",
    "relatedAnnex2": "-",
    "country": "7304.23",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0636",
    "no": "516",
    "name": "스테인리스강으로 만든 유정용이나 가스정용 케이싱ㆍ튜빙(무계목으로 한정)",
    "spec": "Casing & Tubing Used In Drilling for Oil or Gas, Other of Stainless Steel, Seamless",
    "relatedAnnex2": "-",
    "country": "7304.24",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0637",
    "no": "517",
    "name": "철강(주철 제외)으로 만든 유정용이나 가스정용 케이싱ㆍ튜빙(무계목으로 한정)",
    "spec": "Casing and Tubing of A Kind Used In Drilling for Oil or Gas, of Iron (Except Cast Iron) or Steel, Seamless",
    "relatedAnnex2": "-",
    "country": "7304.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0638",
    "no": "518",
    "name": "철강으로 만든 오일이나 가스 배관용 파이프라인으로 세로 방향으로 서브머지드아크 용접한 것(바깥지름이 406.4밀리미터를 초과, 횡단면이 원형)",
    "spec": "Line Pipe for Oil or Gas Pipelines, External Diameter Over 406.4 mm (16 In.), of Iron or Steel, Longitudinally Submerged Arc Welded, Circular Cross-Section",
    "relatedAnnex2": "-",
    "country": "7305.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0639",
    "no": "519",
    "name": "철강으로 만든 오일이나 가스 배관용 파이프라인으로 세로 방향으로 용접한 것(바깥지름이 406.4밀리미터를 초과, 횡단면이 원형)",
    "spec": "Line Pipe for Oil or Gas Pipelines, External Diameter Over 406.4 mm",
    "relatedAnnex2": "-",
    "country": "7305.12",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0640",
    "no": "520",
    "name": "그 밖의 철강으로 만든 오일이나 가스 배관용 파이프라인으로 리벳이나 이와 유사한 방법으로 봉합한 것(바깥지름이 406.4밀리미터를 초과, 횡단면이 원형)",
    "spec": "Line Pipe for Oil or Gas Pipelines, External Diameter Over 406.4 mm (16 In.), of Iron or Steel, Riveted or Similarly Closed, Circular Cross-Section Nesoi",
    "relatedAnnex2": "-",
    "country": "7305.19",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0641",
    "no": "521",
    "name": "철강으로 만든 유정용이나 가스정용 케이싱(바깥지름이 406.4밀리미터 초과, 횡단면이 원형)",
    "spec": "Casing for Oil or Gas Drilling, External Diameter Over 406.4 mm (16 In.), of Iron or Steel, Circular Cross-Section",
    "relatedAnnex2": "-",
    "country": "7305.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0642",
    "no": "522",
    "name": "철강으로 만든 그 밖의 관(용접한 것으로 한정하며 바깥지름이 406.4밀리미터 초과, 횡단면이 원형)",
    "spec": "Pipes and Tubes Nesoi, External Diameter Over 406.4 mm (16 In.), of Iron or Steel, Welded, Circular Cross-Section Nesoi",
    "relatedAnnex2": "-",
    "country": "7305.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0643",
    "no": "523",
    "name": "그 밖의 철강으로 만든 오일이나 가스 배관용 파이프라인",
    "spec": "Line Pipe for Oil or Gas Pipelines, Welded, of Stainless Steel, Nesoi",
    "relatedAnnex2": "-",
    "country": "7306.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0644",
    "no": "524",
    "name": "그 밖의 합금강(스테인리스 강은 제외한다)으로 만든 그 밖의 관과 중공 프로파일(용접한 것으로 한정하며, 횡단면이 원형인 것으로 한정한다)",
    "spec": "Line Pipe for Oil or Gas Pipelines, of Iron or Steel, Nesoi",
    "relatedAnnex2": "-",
    "country": "7306.19",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0645",
    "no": "525",
    "name": "합금강(스테인리스 강은 제외한다)으로 만든 그 밖의 관과 중공 프로파일(용접한 것으로 한정하며, 횡단면이 원형인 것으로 한정한다)",
    "spec": "Pipes, Tubes and Hollow Profiles Nesoi, Welded, of Circular Cross Section, of Alloy Steel (Other Than Stainless) Nesoi",
    "relatedAnnex2": "-",
    "country": "7306.50",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0646",
    "no": "526",
    "name": "스테인리스강으로 만든 그 밖의 관 연결구류로서 나선가공한 엘보, 밴드,슬리브",
    "spec": "Pipe or Tube Fittings, Nesoi, Stainless Steel Threaded Elbows, Bends and Sleeves",
    "relatedAnnex2": "-",
    "country": "7307.22",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0647",
    "no": "527",
    "name": "철강으로 만든 다리와 교량",
    "spec": "Bridges and Bridge Sections of Iron or Steel.",
    "relatedAnnex2": "-",
    "country": "7308.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0648",
    "no": "528",
    "name": "철강으로 만든 탑과 격자주",
    "spec": "Towers and Lattice Masts of Iron or Steel.",
    "relatedAnnex2": "-",
    "country": "7308.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0649",
    "no": "529",
    "name": "철강으로 만든 문·창과 이들의 틀과 문지방",
    "spec": "Doors, Windows and Frames and Thresholds for Doors, of Iron or Steel.",
    "relatedAnnex2": "-",
    "country": "7308.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0650",
    "no": "530",
    "name": "철강으로 만든 비계, 차단기, 지주, 굉도 받침에 사용되는 기구",
    "spec": "Equipment for Scaffolding, Shuttering Propping or Pit-Propping, of Iron or Steel.",
    "relatedAnnex2": "-",
    "country": "7308.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0651",
    "no": "531",
    "name": "철강으로 만든 그 밖의 구조물, 이들의 부분품",
    "spec": "Structures and Parts of Structures Nesoi, of Iron or Steel.",
    "relatedAnnex2": "-",
    "country": "7308.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0652",
    "no": "532",
    "name": "철강으로 만든 각종 재료용 저장조ㆍ탱크ㆍ통과 이와 유사한 용기(압축용이나 액화가스용은 제외하고, 기계장치나 가열ㆍ냉각 장치를 갖추지 않은 것으로서 용적이 300리터를 초과하는 것으로 한정하며, 내장한 것인지 또는 열절연한 것인지에 상관없다)",
    "spec": "Reservoirs, Tanks, Vats and Similar Containers for Any Material (Other Than Compressed or Liquefied Gas), of Iron or Steel, of A Capacity Exceeding 300 ℓ, Whether or Not Lined or Heat-Insulated, But Not Fitted with Mechanical or Thermal Equipment.",
    "relatedAnnex2": "-",
    "country": "7309.00",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0653",
    "no": "533",
    "name": "철강으로 만든 탱크, 통, 드럼, 캔, 상자, 이와 유사한 용기(용적이 50리터 이상 300리터 이하인 것, 기계장치나 가열ㆍ냉각장치를 갖추지 않은 것으로 한정, 압축용이나 액화가스용 제외)",
    "spec": "Tanks, Casks, Drums, Cans, Boxes and Similar Plain, Unfitted Containers, A Capacity of 50 Liters (13.21 Gal.) or More, But Not Over 300 Liters (79.25 Gal.), of Iron or Steel, for Any sMaterial Other Than Compressed or Liquefied Gas.",
    "relatedAnnex2": "-",
    "country": "7310.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0654",
    "no": "534",
    "name": "철강으로 만든 캔, 용기(용적이 50리터 미만이고 기계장치나 가열·냉각장치를 갖추지 않은 것으로 납땜이나 크림핑(crimping)으로 봉합된 것, 압축용이나 액화가스용 제외)",
    "spec": "Cans, Plain, Unfitted, of A Capacity of Less Than 50 Liters (13.21 Gal.), Which Will be Closed By Soldering or Crimping, of Iron or Steel, for Any Material Other Than Compressed or Liquefied Gas.",
    "relatedAnnex2": "-",
    "country": "7310.21",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0655",
    "no": "535",
    "name": "철강으로 만든 탱크, 드럼, 통, 캔, 박스와 그 밖의 이와 유사한 용기(용적이 50리터 미만이고 기계장치나 가열·냉각장치를 갖추지 않은 것, 압축용이나 액화가스용 제외)",
    "spec": "Tanks, Casks, Drums, Cans, Boxes and Similar Plain, Unfitted Containers Nesoi, of A Capacity of Less Than 50 Liters (13.21 Gal.), of Iron or Steel, for Any Material Other Than Compressed or Liquefied Gas.",
    "relatedAnnex2": "-",
    "country": "7310.29",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0656",
    "no": "536",
    "name": "철강으로 만든 압축용이나 액화가스용 용기",
    "spec": "Containers for Compressed or Liquefied Gas, of Iron or Steel",
    "relatedAnnex2": "-",
    "country": "7311.00",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0657",
    "no": "537",
    "name": "스테인리스강으로 만든 기계용 엔드리스 밴드",
    "spec": "Endless Bands of Stainless Steel, for Machinery",
    "relatedAnnex2": "-",
    "country": "7314.12",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0658",
    "no": "538",
    "name": "철강으로 만든 코터(cotter)와 코터핀(cotter-pin)",
    "spec": "Cotters and Cotter Pins, of Iron or Steel",
    "relatedAnnex2": "-",
    "country": "7318.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0659",
    "no": "539",
    "name": "철강으로 만든 나선용 스프링",
    "spec": "Helical Springs of Iron or Steel",
    "relatedAnnex2": "-",
    "country": "7320.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0660",
    "no": "540",
    "name": "동력구동식 송풍기를 갖춘 철강으로 만든 공기가열기와 온풍배분기(전기가열식은 제외), 이들의 부분품",
    "spec": "Air Heaters and Hot Air Distributors, Not Electrically Heated, Incorporating A Motor-Driven Fan or Blower, and Parts Thereof, of Iron or Steel",
    "relatedAnnex2": "-",
    "country": "7322.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0661",
    "no": "541",
    "name": "철강으로 만든(주철로 만든 것은 제외한다) 목욕통",
    "spec": "Baths of Iron or Steel, Other Than Cast Iron",
    "relatedAnnex2": "-",
    "country": "7324.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0662",
    "no": "542",
    "name": "철강으로 만든 그 밖의 제품",
    "spec": "Other articles of iron or steel.",
    "relatedAnnex2": "-",
    "country": "7326.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0663",
    "no": "543",
    "name": "구리-아연 합금(황동)으로 만든 봉과 프로파일",
    "spec": "Bars, Rods and Profiles of Copper-Zinc Base Alloys (Brass)",
    "relatedAnnex2": "-",
    "country": "7407.21",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0664",
    "no": "544",
    "name": "기타 구리 합금으로 만든 봉과 프로파일",
    "spec": "Bars, Rods and Profiles of Copper Alloys, Nesoi",
    "relatedAnnex2": "-",
    "country": "7407.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0665",
    "no": "545",
    "name": "구리-아연 합금(황동)으로 만든 선",
    "spec": "Wire of Copper-Zinc Base Alloys (Brass)",
    "relatedAnnex2": "-",
    "country": "7408.21",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0666",
    "no": "546",
    "name": "구리-니켈 합금(백동)이나 구리-니켈-아연 합금(양백)으로 만든 선",
    "spec": "Wire of Copper-Nickel Base Alloys (Cupro-Nickel) or Copper-Nickel-Zinc Base Alloys (Nickel-Silver)",
    "relatedAnnex2": "-",
    "country": "7408.22",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0667",
    "no": "547",
    "name": "기타 구리 합금으로 만든 선",
    "spec": "Wire of Copper Alloys, Nesoi",
    "relatedAnnex2": "-",
    "country": "7408.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0668",
    "no": "548",
    "name": "구리-아연 합금(황동)으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하고 코일모양인 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper-Zinc Base Alloys (Brass), Over 0.15 mm Thick, In Coils",
    "relatedAnnex2": "-",
    "country": "7409.21",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0669",
    "no": "549",
    "name": "구리-아연 합금(황동)으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하고 코일모양이 아닌 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper-Zinc Base Alloys (Brass), Over 0.15 mm Thick, Not In Coils",
    "relatedAnnex2": "-",
    "country": "7409.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0670",
    "no": "550",
    "name": "구리-주석 합금(청동)으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하고 코일모양인 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper-Tin Base Alloys (Bronze), Over 0.15 mm Thick, In Coils",
    "relatedAnnex2": "-",
    "country": "7409.31",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0671",
    "no": "551",
    "name": "구리-주석 합금(청동)으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하고 코일모양이 아닌 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper-Tin Base Alloys (Bronze), Over 0.15 mm Thick, Not In Coils",
    "relatedAnnex2": "-",
    "country": "7409.39",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0672",
    "no": "552",
    "name": "구리-니켈 합금(백동)이나 구리-니켈-아연 합금(양백)으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하는 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper-Nickel Base Alloys (Cupro-Nickel) or Copper-Nickel-Zinc Base Alloys (Nickel Silver), Over 0.15 mm Thick",
    "relatedAnnex2": "-",
    "country": "7409.40",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0673",
    "no": "553",
    "name": "기타 구리합금으로 만든 판, 시트, 스트립(두께가 0.15밀리미터를 초과하는 것으로 한정한다)",
    "spec": "Plates, Sheets and Strip of Copper Alloys Nesoi, Over 0.15 mm Thick",
    "relatedAnnex2": "-",
    "country": "7409.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0674",
    "no": "554",
    "name": "기타 구리합금으로 만든 관",
    "spec": "Tubes and Pipes of Copper Alloys Nesoi",
    "relatedAnnex2": "-",
    "country": "7411.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0675",
    "no": "555",
    "name": "합금하지 않은 니켈로 만든 봉·프로파일",
    "spec": "Nickel Bars, Rods and Profiles, Not Alloyed",
    "relatedAnnex2": "-",
    "country": "7505.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0676",
    "no": "556",
    "name": "니켈 합금으로 만든 봉·프로파일",
    "spec": "Nickle Bars, Rods and Profiles, of Nickle Alloys",
    "relatedAnnex2": "-",
    "country": "7505.12",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0677",
    "no": "557",
    "name": "합금하지 않은 니켈로 만든 선",
    "spec": "Nickle Wire, Not Alloyed",
    "relatedAnnex2": "-",
    "country": "7505.21",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0678",
    "no": "558",
    "name": "니켈 합금으로 만든 선",
    "spec": "Nickle Wire, of Nickle Alloys",
    "relatedAnnex2": "-",
    "country": "7505.22",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0679",
    "no": "559",
    "name": "합금하지 않은 니켈로 만든 판·시트(sheet)·스트립·박(箔)",
    "spec": "Nickel Plates, Sheets, Strip and Foil, Not Alloyed",
    "relatedAnnex2": "-",
    "country": "7506.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0680",
    "no": "560",
    "name": "니켈 합금으로 만든 판·시트(sheet)·스트립·박(箔)",
    "spec": "Nickel Plates, Sheets, Strip and Foil, of Nickle Alloys",
    "relatedAnnex2": "-",
    "country": "7506.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0681",
    "no": "561",
    "name": "합금하지 않은 니켈로 만든 관이나 튜브",
    "spec": "Nickle Tubes and Pipes, Not Alloyed",
    "relatedAnnex2": "-",
    "country": "7507.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0682",
    "no": "562",
    "name": "니켈 합금으로 만든 관이나 튜브",
    "spec": "Nickle Tubes and Pipes, of Nickle Alloys",
    "relatedAnnex2": "-",
    "country": "7507.12",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0683",
    "no": "563",
    "name": "니켈로 만든 관(管) 연결구류",
    "spec": "Nickle Tube or Pipe Fittings",
    "relatedAnnex2": "-",
    "country": "7507.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0684",
    "no": "564",
    "name": "니켈선으로 만든 클로스(cloth)·그릴·망",
    "spec": "Cloth, Grill and Netting of Nickel Wire",
    "relatedAnnex2": "-",
    "country": "7508.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0685",
    "no": "565",
    "name": "니켈로 만든 그 밖의 제품",
    "spec": "Other Articles of Nickel, Nesoi",
    "relatedAnnex2": "-",
    "country": "7508.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0686",
    "no": "566",
    "name": "합금하지 않은 알루미늄으로 만든 선(횡단면의 최대치수가 7밀리미터를 초과하는 것)",
    "spec": "Aluminum Wire of Nonalloyed Aluminum, with A Maximum Cross Sectional Dimension of Over 7 mm",
    "relatedAnnex2": "-",
    "country": "7605.11",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0687",
    "no": "567",
    "name": "합금하지 않은 알루미늄으로 만든 선(횡단면의 최대치수가 7밀리미터 이하인 것)",
    "spec": "Aluminum Wire of Nonalloyed Aluminum, with A Maximum Cross Sectional Dimension of 7 mm or Less",
    "relatedAnnex2": "-",
    "country": "7605.19",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0688",
    "no": "568",
    "name": "알루미늄 합금으로 만든 선(횡단면의 최대치수가 7밀리미터를 초과하는 것)",
    "spec": "Aluminum Alloy Wire, with A Maximum Cross Sectional Dimension of Over 7 mm",
    "relatedAnnex2": "-",
    "country": "7605.21",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0689",
    "no": "569",
    "name": "알루미늄 합금으로 만든 선(횡단면의 최대치수가 7밀리미터 이하인 것)",
    "spec": "Aluminum Alloy Wire, with A Maximum Cross Sectional Dimension of 7 mm or Less",
    "relatedAnnex2": "-",
    "country": "7605.29",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0690",
    "no": "570",
    "name": "알루미늄 합금으로 만든 판, 시트, 스트립(두께가 0.2밀리미터를 초과하는 것)(직사각형, 정사각형 모양의 것은 제외한다)",
    "spec": "Aluminum Alloy Plates, Sheets or Strip, Over 0.2 mm Thick, Nesoi (Other Than Rectangular Square Shapes)",
    "relatedAnnex2": "-",
    "country": "7606.92",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0691",
    "no": "571",
    "name": "뒷면을 붙인 알루미늄의 박(두께가 0.2밀리미터 이하인 것)",
    "spec": "Aluminum Foil, Not Over 0.2 mm Thick, Backed",
    "relatedAnnex2": "-",
    "country": "7607.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0692",
    "no": "572",
    "name": "알루미늄으로 만든 기타 구조물과 이들의 부분품",
    "spec": "Aluminum Structures and Parts of Structures, Nesoi.",
    "relatedAnnex2": "-",
    "country": "7610.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0693",
    "no": "573",
    "name": "알루미늄으로 만든 각종 재료용 저장조ㆍ탱크ㆍ통과 이와 유사한 용기(압축용이나 액화가스용은 제외하고, 기계장치나 가열ㆍ냉각 장치를 갖추지 않은 것으로서 용적이 300리터를 초과하는 것으로 한정하며, 내장한 것인지 또는 열절연한 것인지에 상관없다)",
    "spec": "Aluminium Reservoirs, Tanks, Vats and Similar Containers, for Any Material (Other Than Compressed or Liquefied Gas), of A Capacity Exceeding 300 ℓ, Whether or Not Lined or Heat-Insulated, But Not Fitted with Mechanical or Thermal Equipment.",
    "relatedAnnex2": "-",
    "country": "7611.00",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0694",
    "no": "574",
    "name": "알루미늄으로 만든 연질의 튜브형 용기(용적이 300리터 이하인 것으로 한정한다)",
    "spec": "Aluminum Collapsible Tubular Containers, of A Capacity Not Over 300 Liters (79.30 Gal.).",
    "relatedAnnex2": "-",
    "country": "7612.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0695",
    "no": "575",
    "name": "알루미늄으로 만든 각종 재료용 통·드럼·캔과 이와 유사한 용기(컨테이너용은 제외하고, 용적이 300리터 이하인 것으로 한정한다)",
    "spec": "Aluminum Casks, Drums, Cans, Boxes and Similar Plain, Unfitted Containers, of A Capacity Not Over 300 Liters (79.30 Gal.)",
    "relatedAnnex2": "-",
    "country": "7612.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0696",
    "no": "576",
    "name": "알루미늄으로 만든 압축용이나 액화가스용 용기",
    "spec": "Aluminum Containers for Compressed or Liquefid Gas",
    "relatedAnnex2": "-",
    "country": "7613.00",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0697",
    "no": "577",
    "name": "텅스텐(볼프람) 가루",
    "spec": "Tungsten (Wolfram) Powders",
    "relatedAnnex2": "-",
    "country": "8101.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0698",
    "no": "578",
    "name": "몰리브데늄 가루",
    "spec": "Molybdenum Powders",
    "relatedAnnex2": "-",
    "country": "8102.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0699",
    "no": "579",
    "name": "몰리브데늄 괴(塊)[단순히 소결(燒結)로 얻어지는 봉을 포함한다]",
    "spec": "Molybdenum, Unwrought, Including Bars and Rods Obtained Simply By Sintering",
    "relatedAnnex2": "-",
    "country": "8102.94",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0700",
    "no": "580",
    "name": "봉[단순히 소결(燒結)로 얻어지는 것은 제외한다], 프로파일(profile)·판·시트(sheet)·스트립·박(箔)",
    "spec": "Molybdenum Bars and Rods, Other Than Those Obtained Simply By Sintering; Molybdenum Profiles, Plates, Sheets, Strip and Foil",
    "relatedAnnex2": "-",
    "country": "8102.95",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0701",
    "no": "581",
    "name": "몰리브데늄 선",
    "spec": "Molybdenum Wire",
    "relatedAnnex2": "-",
    "country": "8102.96",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0702",
    "no": "582",
    "name": "몰리브데늄 웨이스트와 스크랩",
    "spec": "Molybdenum Waste and Scrap",
    "relatedAnnex2": "-",
    "country": "8102.97",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0703",
    "no": "583",
    "name": "기타 몰리브데늄과 그 제품",
    "spec": "Molybdenum and Articles Thereof, Nesoi",
    "relatedAnnex2": "-",
    "country": "8102.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0704",
    "no": "584",
    "name": "기타 코발트와 그 제품",
    "spec": "Cobalt and Articles Thereof, Nesoi",
    "relatedAnnex2": "-",
    "country": "8105.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0705",
    "no": "585",
    "name": "지르코늄의 괴(塊), 가루; 하프늄 함유량이 중량비로 지르코늄 함유량의 500분의 1 미만인 것",
    "spec": "Unwrought Zirconium; Powders; Containing less than 1 part hafnium to 500 parts zirconium by weight",
    "relatedAnnex2": "-",
    "country": "8109.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0706",
    "no": "586",
    "name": "지르코늄의 괴(塊), 가루; 기타",
    "spec": "Unwrought Zirconium; Powders; other",
    "relatedAnnex2": "-",
    "country": "8109.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0707",
    "no": "587",
    "name": "지르코늄의 웨이스트와 스크랩; 하프늄 함유량이 중량비로 지르코늄 함유량의 500분의 1 미만인 것",
    "spec": "Zirconium Waste and Scrap; Containing less than 1 part hafnium to 500 parts zirconium by weight",
    "relatedAnnex2": "-",
    "country": "8109.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0708",
    "no": "588",
    "name": "지르코늄의 웨이스트와 스크랩; 기타",
    "spec": "Zirconium Waste and Scrap; other",
    "relatedAnnex2": "-",
    "country": "8109.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0709",
    "no": "589",
    "name": "기타 지르코늄과 그 제품; 하프늄 함유량이 중량비로 지르코늄 함유량의 500분의 1 미만인 것",
    "spec": "Zirconium and Articles Thereof; other; ; Containing less than 1 part hafnium to 500 parts zirconium by weight",
    "relatedAnnex2": "-",
    "country": "8109.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0710",
    "no": "590",
    "name": "기타 지르코늄과 그 제품; 기타",
    "spec": "Zirconium and Articles Thereof, Nesoi",
    "relatedAnnex2": "-",
    "country": "8109.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0711",
    "no": "591",
    "name": "착암용이나 굴착용 공구로 작용하는 부분을 서멧으로 만든 것",
    "spec": "Rock Drilling or Earth Boring Tools with Working Part of Cermets, and Parts Thereof",
    "relatedAnnex2": "-",
    "country": "8207.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0712",
    "no": "592",
    "name": "수공구용(동력작동식인지에 상관없다)이나 기계용 호환성 공구[착암용이나 굴착용 공구를 포함] ; 기본 금속 부분품",
    "spec": "Interchangeable Tools for Handtools, Whether or Not Power- Operated, or for Machine-Tools, Including Rock Drilling or Earth Boring Tools; Base Metl Parts",
    "relatedAnnex2": "-",
    "country": "8207.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0713",
    "no": "593",
    "name": "비금속으로 만든 보링(boring)용이나 브로칭(broaching)용 공구, 이들의 부분품",
    "spec": "Tools for Boring or Broaching, and Parts Thereof, of Base Metal.",
    "relatedAnnex2": "-",
    "country": "8207.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0714",
    "no": "594",
    "name": "원자로",
    "spec": "Nuclear Reactors",
    "relatedAnnex2": "-",
    "country": "8401.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0715",
    "no": "595",
    "name": "동위원소 분리용 기기와 그 부분품",
    "spec": "Isotopic Separation Machinery and Apparatus, and Parts Thereof",
    "relatedAnnex2": "-",
    "country": "8401.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0716",
    "no": "596",
    "name": "원자로용 방사선을 조사(照射)하지 않은 연료요소(카트리지)와 그 부분품",
    "spec": "Fuel Elements (Cartridges), Non-Irradiated, for Nuclear Reactors, and Parts Thereof",
    "relatedAnnex2": "-",
    "country": "8401.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0717",
    "no": "597",
    "name": "원자로의 부분품",
    "spec": "Parts of Nuclear Reactors",
    "relatedAnnex2": "-",
    "country": "8401.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0718",
    "no": "598",
    "name": "증기발생량이 시간당 45톤을 초과하는 수관(水管)보일러",
    "spec": "Watertube Boilers with A Steam Production Exceeding 45 T Per Hour",
    "relatedAnnex2": "-",
    "country": "8402.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0719",
    "no": "599",
    "name": "증기발생량이 시간당 45톤 이하인 수관(水管)보일러",
    "spec": "Watertube Boilers with A Steam Production Not Exceeding 45 T Per Hour.",
    "relatedAnnex2": "-",
    "country": "8402.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0720",
    "no": "600",
    "name": "그 밖의 증기발생보일러(복합보일러를 포함한다)",
    "spec": "Vapor Generating Boilers, Nesoi, Including Hybrid Boilers.",
    "relatedAnnex2": "-",
    "country": "8402.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0721",
    "no": "601",
    "name": "과열수보일러(super-heated water boiler)",
    "spec": "Super-Heated Water Boilers.",
    "relatedAnnex2": "-",
    "country": "8402.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0722",
    "no": "602",
    "name": "증기발생보일러와 과열수보일러의 부분품(중앙난방용 보일러의 것은 제외)",
    "spec": "Parts for Super-Heated Water Boilers and Steam or Other Vapor Generation Boilers (Other Than Central Heating Hot Water Boilers).",
    "relatedAnnex2": "-",
    "country": "8402.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0723",
    "no": "603",
    "name": "발생로가스(producer gas)나 수성(水性)가스 발생기, 아세틸렌가스 발생기와 이와 유사한 습식가스 발생기의 부분품",
    "spec": "Parts for Producer Gas and Water Gas Generators, Acetylene Gas and Similar Process Gas Generators.",
    "relatedAnnex2": "-",
    "country": "8405.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0724",
    "no": "604",
    "name": "선박추진용 증기터빈",
    "spec": "Turbines, Steam and Other Vapor Types, for Marine Propulsion",
    "relatedAnnex2": "-",
    "country": "8406.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0725",
    "no": "605",
    "name": "선박추진용을 제외한 그 밖의 증기터빈(출력이 40메가와트를 초과하는 것)",
    "spec": "Turbines, Steam and Other Vapor Types, of An Output Exceeding 40 MW, Except for Marine Propulsion.",
    "relatedAnnex2": "-",
    "country": "8406.81",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0726",
    "no": "606",
    "name": "선박추진용을 제외한 그 밖의 증기터빈(출력이 40메가와트 이하인 것)",
    "spec": "Turbines, Steam and Other Vapor Types, of An Output Not Exceeding 40 MW, Except for Marine Propulsion.",
    "relatedAnnex2": "-",
    "country": "8406.82",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0727",
    "no": "607",
    "name": "증기터빈용 부분품",
    "spec": "Parts for Steam and Other Vapor Turbines.",
    "relatedAnnex2": "-",
    "country": "8406.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0728",
    "no": "608",
    "name": "항공기용 왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관",
    "spec": "Aircraft Spark-Ignition Reciprocating or Rotary Internal Combustion Piston Engines",
    "relatedAnnex2": "-",
    "country": "8407.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0729",
    "no": "609",
    "name": "선박추진용 엔진으로 사용되는 아웃보드(outboard) 모터",
    "spec": "Outboard Engines for Marine Propulsion.",
    "relatedAnnex2": "-",
    "country": "8407.21",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0730",
    "no": "610",
    "name": "그 밖의 선박추진용 엔진",
    "spec": "Inboard Engines for Marine Propulsion.",
    "relatedAnnex2": "-",
    "country": "8407.29",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0731",
    "no": "611",
    "name": "왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관으로서 87류의 차량 추진용 엔진(실린더용량이 50 cc 이하인 것)",
    "spec": "Spark-Ignition Reciprocating Piston Engines for Propulsion of Vehicles Except Railway or Tramway Stock, Not Over 50 cc Cylinder Capacity",
    "relatedAnnex2": "-",
    "country": "8407.31",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0732",
    "no": "612",
    "name": "왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관으로서 87류의 차량 추진용 엔진(실린더용량이 50cc를 초과하고 250cc 이하인 것)",
    "spec": "Spark-Ignition Reciprocating Piston Engines for Propulsion of Vehicles Except Railway or Tramway Stock, Over 50 But Not Over 250 cc Cylinder Capacity",
    "relatedAnnex2": "-",
    "country": "8407.32",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0733",
    "no": "613",
    "name": "왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관으로서 87류의 차량 추진용 엔진(실린더용량이 250cc를 초과하고 1,000cc 이하인 것)",
    "spec": "Spark-Ignition Reciprocating Piston Engines for Propulsion of Vehicles Except Rail or Tramway Stock, Over 250 But Not Over 1,000 cc Cylinder Capacity",
    "relatedAnnex2": "-",
    "country": "8407.33",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0734",
    "no": "614",
    "name": "왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관으로서 87류의 차량 추진용 엔진(실린더용량이 1,000cc를 초과하는 것)",
    "spec": "Spark-Ignition Reciprocating Piston Engines for Propulsion of Vehicles Except Railway or Tramway Stock, Over 1,000 cc Cylinder Capacity",
    "relatedAnnex2": "-",
    "country": "8407.34",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0735",
    "no": "615",
    "name": "그 밖의 왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관",
    "spec": "Spark-Ignition Reciprocating or Rotary Internal Combustion Piston Engines, Nesoi",
    "relatedAnnex2": "-",
    "country": "8407.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0736",
    "no": "616",
    "name": "압축점화식 피스톤 내연기관(디젤엔진이나 세미디젤엔진)로서 선박추진용 엔진",
    "spec": "Marine Compression-Ignition Internal Combustion Piston Engines (Diesel or Semi-Diesel Engines).",
    "relatedAnnex2": "-",
    "country": "8408.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0737",
    "no": "617",
    "name": "압축점화식 피스톤 내연기관(디젤엔진이나 세미디젤엔진)로서 제87류의 차량 추진용 엔진",
    "spec": "Compression-Ignition Internal Combustion Piston Engines (Diesel or Semi-Diesel), for The Propulsion of Vehicles Except Railway or Tramway Stock.",
    "relatedAnnex2": "-",
    "country": "8408.20",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0738",
    "no": "618",
    "name": "그 밖의 압축점화식 피스톤 내연기관(디젤엔진이나 세미디젤엔진)",
    "spec": "Compression-Ignition Internal Combustion Piston Engines (Diesel or Semi-Diesel Engines), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8408.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0739",
    "no": "619",
    "name": "항공기용 불꽃점화식 또는 왕복 피스톤 내연기관 또는 압축점화식 피스톤 내연기관용 부품",
    "spec": "Parts for Spark-Ignition or Rotary Internal Combustion Piston Engines or Compression-Ignition Internal Combustion Piston Engines, for Aircraft",
    "relatedAnnex2": "-",
    "country": "8409.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0740",
    "no": "620",
    "name": "그 밖의 왕복이나 로터리 방식으로 움직이는 불꽃점화식 피스톤 내연기관에 전용되거나 주로 사용되는 부분품",
    "spec": "Parts for Use with Spark-Ignition Internal Combustion Piston Engines (Including Rotary Engines), Nesoi",
    "relatedAnnex2": "-",
    "country": "8409.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0741",
    "no": "621",
    "name": "그 밖의 압축점화식 피스톤 내연기관용의 부분품",
    "spec": "Parts for Use with Compression-Ignition Internal Combustion Piston Engines, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8409.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0742",
    "no": "622",
    "name": "수력터빈ㆍ수차(동력이 1,000킬로와트 이하인 것)",
    "spec": "Hydraulic Turbines and Water Wheels, of A Power Not Exceeding 1,000 KW",
    "relatedAnnex2": "-",
    "country": "8410.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0743",
    "no": "623",
    "name": "수력터빈ㆍ수차(동력이 1,000킬로와트를 초과하고 10,000킬로와트 이하인 것)",
    "spec": "Hydraulic Turbines and Water Wheels, of A Power Exceeding 1,000 KW But Not Exceeding 10,000 KW",
    "relatedAnnex2": "-",
    "country": "8410.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0744",
    "no": "624",
    "name": "수력터빈ㆍ수차(동력이 10,000킬로와트 초과하는 것)",
    "spec": "Hydraulic Turbines and Water Wheels, of A Power Exceeding 10,000 KW",
    "relatedAnnex2": "-",
    "country": "8410.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0745",
    "no": "625",
    "name": "수력터빈ㆍ수차의 부분품(조정기를 포함한다)",
    "spec": "Parts, Including Regulators, for Hydraulic Turbines and Water Wheels.",
    "relatedAnnex2": "-",
    "country": "8410.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0746",
    "no": "626",
    "name": "추진력이 25킬로뉴턴 이하인 터보제트",
    "spec": "Turbojets of A Thrust Not Exceeding 25 KN.",
    "relatedAnnex2": "-",
    "country": "8411.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0747",
    "no": "627",
    "name": "추진력이 25킬로뉴턴을 초과하는 터보제트",
    "spec": "Turbojets of A Thrust Exceeding 25 KN.",
    "relatedAnnex2": "-",
    "country": "8411.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0748",
    "no": "628",
    "name": "출력이 1,100킬로와트 이하인 터보프로펠러",
    "spec": "Turbopropellers of A Power Not Exceeding 1,100 KW.",
    "relatedAnnex2": "-",
    "country": "8411.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0749",
    "no": "629",
    "name": "출력이 1,100킬로와트를 초과하는 터보프로펠러",
    "spec": "Turbopropellers of A Power Exceeding 1,100 KW.",
    "relatedAnnex2": "-",
    "country": "8411.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0750",
    "no": "630",
    "name": "출력이 5,000킬로와트 이하인 그 밖의 가스터빈 (터보제트와 터보프로펠러는 제외)",
    "spec": "Gas Turbines, Except Turbojets and Turbopropellers, of A Power Not Exceeding 5,000 KW",
    "relatedAnnex2": "-",
    "country": "8411.81",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0751",
    "no": "631",
    "name": "출력이 5,000킬로와트 초과하는 그 밖의 가스터빈 (터보제트와 터보프로펠러는 제외)",
    "spec": "Gas Turbines, Except Turbojets and Turbopropellers, of A Power Exceeding 5,000 KW",
    "relatedAnnex2": "-",
    "country": "8411.82",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0752",
    "no": "632",
    "name": "터보제트나 터보프로펠러의 부분품",
    "spec": "Parts of Turbojets or Turbopropellers.",
    "relatedAnnex2": "-",
    "country": "8411.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0753",
    "no": "633",
    "name": "그 밖의 가스터빈의 부분품(터보제트와 터보프로펠러의 것은 제외)",
    "spec": "Parts of Gas Turbines, Nesoi (Other Than Parts for Turbojets or Turbopropellers)",
    "relatedAnnex2": "-",
    "country": "8411.99",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0754",
    "no": "634",
    "name": "터보제트 외의 반동 엔진",
    "spec": "Reaction Engines Other Than Turbojets.",
    "relatedAnnex2": "-",
    "country": "8412.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0755",
    "no": "635",
    "name": "리니어 액팅식(실린더)의 수력엔진과 수력모터",
    "spec": "Hydraulic Power Engines and Motors, Linear Acting (Cylinders).",
    "relatedAnnex2": "-",
    "country": "8412.21",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0756",
    "no": "636",
    "name": "수력엔진과 수력모터(리니어 액팅식(실린더)은 제외한다.)",
    "spec": "Hydraulic Power Engines and Motors, Except Linear Acting (Cylinders).",
    "relatedAnnex2": "-",
    "country": "8412.29",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0757",
    "no": "637",
    "name": "리니어 액팅식(실린더)의 압축공기식 엔진과 모터",
    "spec": "Pneumatic Power Engines and Motors, Linear Acting (Cylinders)",
    "relatedAnnex2": "-",
    "country": "8412.31",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0758",
    "no": "638",
    "name": "압축공기식 엔진과 모터(리니어 액팅식(실린더)은 제외한다.)",
    "spec": "Pneumatic Power Engines and Motors, Except Linear Acting (Cylinders).",
    "relatedAnnex2": "-",
    "country": "8412.39",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0759",
    "no": "639",
    "name": "그 밖의 엔진과 모터",
    "spec": "Engines and Motors, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8412.80",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0760",
    "no": "640",
    "name": "그 밖의 엔진과 모터의 부분품",
    "spec": "Parts for Engines and Motors, Nesoi",
    "relatedAnnex2": "-",
    "country": "8412.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0761",
    "no": "641",
    "name": "그 밖의 펌프(계기를 갖춘 것이나 갖출 수 있도록 설계된 것으로 한정한다)",
    "spec": "Pumps Fitted or Designed to be Fitted with A Measuring Devise, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8413.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0762",
    "no": "642",
    "name": "수지식 펌프(계기를 갖춘 것이나 갖출 수 있도록 설계된 것은 제외한다)",
    "spec": "Hand Pumps, Other Than Pumps Fitted or Designed to be Fitted with A Measuring Device",
    "relatedAnnex2": "-",
    "country": "8413.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0763",
    "no": "643",
    "name": "용적형 왕복펌프",
    "spec": "Reciprocating Positive Displacement Pumps, Nesoi",
    "relatedAnnex2": "-",
    "country": "8413.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0764",
    "no": "644",
    "name": "용적형 회전펌프",
    "spec": "Rotary Positive Displacement Pumps, Nesoi",
    "relatedAnnex2": "-",
    "country": "8413.60",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0765",
    "no": "645",
    "name": "그 밖의 원심펌프",
    "spec": "Centrifugal Pumps, Nesoi",
    "relatedAnnex2": "-",
    "country": "8413.70",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0766",
    "no": "646",
    "name": "그 밖의 액체용 펌프",
    "spec": "Pumps for Liquids, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8413.81",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0767",
    "no": "647",
    "name": "액체엘리베이터",
    "spec": "Liquid Elevators",
    "relatedAnnex2": "-",
    "country": "8413.82",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0768",
    "no": "648",
    "name": "액체용 펌프의 부분품",
    "spec": "Parts of Pumps for Liquids",
    "relatedAnnex2": "-",
    "country": "8413.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0769",
    "no": "649",
    "name": "액체엘리베이터의 부분품",
    "spec": "Parts of Liquid Elevators",
    "relatedAnnex2": "-",
    "country": "8413.92",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0770",
    "no": "650",
    "name": "진공펌프",
    "spec": "Vacuum Pumps.",
    "relatedAnnex2": "-",
    "country": "8414.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0771",
    "no": "651",
    "name": "그 밖의 기체펌프와 공기 또는 기체 압축기 : 팬이 결합된 그 밖의 환기용이나 순환용 후드(hood)",
    "spec": "Air Pumps and Air or Other Gas Compressors, Nesoi; Ventilating or Recycling Hoods Incorporating A Fan, Nesoi",
    "relatedAnnex2": "-",
    "country": "8414.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0772",
    "no": "652",
    "name": "그 밖의 기체펌프와 공기 또는 기체 압축기의 부분품 : 팬이 결합된 그 밖의 환기용이나 순환용 후드(hood)의 부분품",
    "spec": "Parts for Air or Vacuum Pumps, Air or Other Gas Compressors and Fans; Parts of Ventilating or Recycling Hoods Incorporating A Fan, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8414.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0773",
    "no": "653",
    "name": "자동차용의 공기조절기",
    "spec": "Automotive Air Conditioners.",
    "relatedAnnex2": "-",
    "country": "8415.20",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0774",
    "no": "654",
    "name": "그 밖의 공기조절기(냉각유닛을 결합하지 않은 것으로 한정한다)",
    "spec": "Air Conditioning Machines Nesoi, Not Incorporating A Refrigerating Unit.",
    "relatedAnnex2": "-",
    "country": "8415.83",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0775",
    "no": "655",
    "name": "배소(焙燒)용ㆍ용해용이나 그 밖의 열처리용 노(爐)와 오븐(광석ㆍ황철광이나 금속의 처리용으로 한정한다)",
    "spec": "Furnaces and Ovens for The Roasting, Melting or Other Heat Treatment of Ores, Pyrites or of Metals",
    "relatedAnnex2": "-",
    "country": "8417.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0776",
    "no": "656",
    "name": "그 밖의 비전기식 공업용이나 실험실용 노(爐)와 오븐(소각로를 포함한다)",
    "spec": "Industrial or Laboratory Furnaces and Ovens, Including Incinerators, Nonelectric, Nesoi",
    "relatedAnnex2": "-",
    "country": "8417.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0777",
    "no": "657",
    "name": "그 밖의 비전기식 공업용이나 실험실용 노(爐)와 오븐(소각로를 포함한다)의 부분품",
    "spec": "Parts of Industrial or Laboratory Furnaces and Ovens, Including Parts of Incinerators, Nonelectric",
    "relatedAnnex2": "-",
    "country": "8417.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0778",
    "no": "658",
    "name": "열교환 콘덴서를 장착한 압축식 열펌프 기계(온도와 습도를 변화시키는 반전가능 열펌프 제외)",
    "spec": "Compression Type Heat Pump Units Whose Condensers Are Heat Exchangers (Excluding Reversible Heat Pumps Capable of Changing Temperature and Humidity).",
    "relatedAnnex2": "-",
    "country": "8418.61",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0779",
    "no": "659",
    "name": "그 밖의 냉장기구나 냉동기구",
    "spec": "Refrigerating or Freezing Equipment, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8418.69",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0780",
    "no": "660",
    "name": "즉시식이나 저장식 물 가열기(비전기식으로 한정하며, 가스식인 즉시식 물가열기는 제외한다)",
    "spec": "Instantaneous or Storage Water Heaters, Except Instantaneous Gas Water Heaters, Nonelectric.",
    "relatedAnnex2": "-",
    "country": "8419.19",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0781",
    "no": "661",
    "name": "동결건조 장치ㆍ유닛과 분무건조기",
    "spec": "Lyophilisation Apparatus, Freeze Drying Units and Spray Dryers",
    "relatedAnnex2": "-",
    "country": "8419.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0782",
    "no": "662",
    "name": "증류기나 정류기",
    "spec": "Distilling or Rectifying Plant.",
    "relatedAnnex2": "-",
    "country": "8419.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0783",
    "no": "663",
    "name": "산업용 열교환기",
    "spec": "Heat Exchange Units, Industrial Type.",
    "relatedAnnex2": "-",
    "country": "8419.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0784",
    "no": "664",
    "name": "기체 액화용 기기",
    "spec": "Machinery for Liquefying Air or Other Gases.",
    "relatedAnnex2": "-",
    "country": "8419.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0785",
    "no": "665",
    "name": "그 밖의 온도의 변화에 따른 방법으로 재료를 처리하는 기계, 설비, 실험실 장비(가정용으로 사용하는 것은 제외한다)",
    "spec": "Machinery, Plant or Laboratory Equipment for The Treatment of Material Involving Temperature Change (Except Domestic Machinery), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8419.89",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0786",
    "no": "666",
    "name": "그 밖의 온도의 변화에 따른 방법으로 재료를 처리하는 기계, 설비, 실험실 장비(가정용으로 사용하는 것은 제외한다)의 부분품",
    "spec": "Parts for Machinery, Plant or Laboratory Equipment for The Treatment of Material Involving Temperature Change (Except Domestic Machinery), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8419.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0787",
    "no": "667",
    "name": "그 밖의 원심분리기(원심탈수기를 포함하며, 의류탈수기는 제외한다)",
    "spec": "Centrifuges, Including Centrifugal Dryers (Other Than Clothes Dryers), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8421.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0788",
    "no": "668",
    "name": "물의 여과기나 청정기",
    "spec": "Water Filtering or Purifying Machinery and Apparatus",
    "relatedAnnex2": "-",
    "country": "8421.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0789",
    "no": "669",
    "name": "물 외의 음료의 여과용이나 청정용",
    "spec": "Beverage Filtering or Purifying Machinery and Apparatus, Other Than Water",
    "relatedAnnex2": "-",
    "country": "8421.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0790",
    "no": "670",
    "name": "내연기관용 유류 여과기",
    "spec": "Oil or Fuel Filters for Internal Combustion Engines.",
    "relatedAnnex2": "-",
    "country": "8421.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0791",
    "no": "671",
    "name": "그 밖의 액체용 여과기나 청정기",
    "spec": "Filtering or Purifying Machinery and Apparatus for Liquids, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8421.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0792",
    "no": "672",
    "name": "내연기관용 공기 여과기",
    "spec": "Intake Air Filters for Internal Combustion Engines.",
    "relatedAnnex2": "-",
    "country": "8421.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0793",
    "no": "673",
    "name": "촉매 변환기나 분진 여과기(두 가지가 결합된 것인지에 상관없으며, 내연기관에서 배출되는 배기가스의 청정용이나 여과용으로 한정한다)",
    "spec": "Catalytic Converters or Particulate Filters, Whether or Not Combined, for Purifying or Filtering Exhaust Gases From Internal Combustion Engines",
    "relatedAnnex2": "-",
    "country": "8421.32",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0794",
    "no": "674",
    "name": "그 밖의 기체용 여과기나 청정기",
    "spec": "Filtering or Purifying Machinery and Apparatus for Gases, Nesoi",
    "relatedAnnex2": "-",
    "country": "8421.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0795",
    "no": "675",
    "name": "원심분리기(원심탈수기를 포함한다)의 부분품",
    "spec": "Parts of Centrifuges, Including Centrifugal Dryers.",
    "relatedAnnex2": "-",
    "country": "8421.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0796",
    "no": "676",
    "name": "액체 또는 기체의 여과기와 청정기의 부분품",
    "spec": "Parts for Filtering or Purifying Machinery and Apparatus for Liquids or Gases.",
    "relatedAnnex2": "-",
    "country": "8421.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0797",
    "no": "677",
    "name": "분사용ㆍ살포용ㆍ분무용 기기, 소화기, 스프레이건, 증기나 모래의 분사기의 부분품",
    "spec": "Parts for Mechanical Appliances for Projecting, Dispersing or Spraying, Fire Extinguishers, Spray Guns, and Steam or Sand Blasting Machines.",
    "relatedAnnex2": "-",
    "country": "8424.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0798",
    "no": "678",
    "name": "전동식 풀리 태클(Pulley tackle)과 호이스트(hoist)[스킵호이스트(skip hoist)나 차량을 들어 올리는 데에 사용하는 호이스트(hoist)는 제외한다]",
    "spec": "Pulley Tackle and Hoists, Other Than Skip Hoists or Hoists of A Kind Used for Raising Vehicles, Powered By Electric Motor.",
    "relatedAnnex2": "-",
    "country": "8425.11",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0799",
    "no": "679",
    "name": "전동식 윈치(winch)와 캡스턴(capstan)",
    "spec": "Winches and Capstans Powered By Electric Motors.",
    "relatedAnnex2": "-",
    "country": "8425.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0800",
    "no": "680",
    "name": "고정식 천장주행 크레인",
    "spec": "Overhead Traveling Cranes on Fixed Support.",
    "relatedAnnex2": "-",
    "country": "8426.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0801",
    "no": "681",
    "name": "타이어가 달린 이동식 양하대와 스트래들 캐리어(straddle carrier)",
    "spec": "Mobile Lifting Frames on Tires and Straddle Carriers.",
    "relatedAnnex2": "-",
    "country": "8426.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0802",
    "no": "682",
    "name": "그 밖의 천장주행 크레인ㆍ트랜스포터 크레인ㆍ갠트리 크레인(gantry crane)ㆍ교각(橋脚)형 크레인ㆍ이동식 양하대ㆍ스트래들 캐리어(straddle carrier)",
    "spec": "Overhead Traveling Cranes, Transporter Cranes, Gantry and Bridge Cranes, Mobile Lifting Frames and Straddle Carries, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8426.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0803",
    "no": "683",
    "name": "타워크레인(tower crane)",
    "spec": "Tower Cranes.",
    "relatedAnnex2": "-",
    "country": "8426.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0804",
    "no": "684",
    "name": "문형이나 정치형 지브 크레인(jib crane)",
    "spec": "Portal or Pedestal Jib Cranes.",
    "relatedAnnex2": "-",
    "country": "8426.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0805",
    "no": "685",
    "name": "타이어가 달린 그 밖의 데릭, 크레인 및 크레인이 결합된 작업트럭[자주식(自走式)으로 한정한다]",
    "spec": "Derricks, Cranes, Nesoi and Works Trucks Fitted with A Crane, Self-Propelled, on Tires.",
    "relatedAnnex2": "-",
    "country": "8426.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0806",
    "no": "686",
    "name": "타이어가 달리지 않은 그 밖의 데릭, 크레인, 크레인이 결합된 작업트럭[자주식(自走式)으로 한정한다]",
    "spec": "Derricks, Cranes, Nesoi and Works Trucks Fitted with A Crane, Self-Propelled, Not on Tires.",
    "relatedAnnex2": "-",
    "country": "8426.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0807",
    "no": "687",
    "name": "도로주행 차량에 장착하도록 제작된 권양용이나 취급용 장비",
    "spec": "Lifting or Handling Machinery Designed for Mounting on Road Vehicles.",
    "relatedAnnex2": "-",
    "country": "8426.91",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0808",
    "no": "688",
    "name": "그 밖의 권양용 취급용 장비",
    "spec": "Lifting or Handling Machinery, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8426.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0809",
    "no": "689",
    "name": "전동기로 구동되는 자주식(自走式) 권양용, 취급용 트럭",
    "spec": "Self-Propelled Lifting or Handling Trucks Powered By An Electric Motor.",
    "relatedAnnex2": "-",
    "country": "8427.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0810",
    "no": "690",
    "name": "전동기로 구동되지 않는 자주식(自走式) 권양용, 취급용 트럭",
    "spec": "Self-Propelled Lifting or Handling Trucks Powered By Other Than An Electric Motor.",
    "relatedAnnex2": "-",
    "country": "8427.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0811",
    "no": "691",
    "name": "전동기로 구동되지 않는 포크리프트트럭(fork-lift truck), 그 밖의 작업트럭[권양(捲揚)용이나 취급용 장비가 결합된 것으로 한정하며, 자주식은 제외한다.]",
    "spec": "Fork-Lift and Other Works Trucks Fitted with Lifting or Handling Equipment, Other Than Self-Propelled, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8427.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0812",
    "no": "692",
    "name": "압축공기식 엘리베이터와 컨베이어",
    "spec": "Pneumatic Elevators and Conveyors.",
    "relatedAnnex2": "-",
    "country": "8428.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0813",
    "no": "693",
    "name": "연속작동(continuous-action)식 물품용이나 재료용 엘리베이터와 컨베이어로서 지하 작업용으로 특수 설계된 것",
    "spec": "Continuous-Action Elevators and Conveyors, for Goods or Materials, Specially Designed for Underground Use.",
    "relatedAnnex2": "-",
    "country": "8428.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0814",
    "no": "694",
    "name": "버켓형 연속작동(continuous-action)식 물품용이나 재료용 엘리베이터와 컨베이어(지하 작업용 제외)",
    "spec": "Continuous-Action Elevators and Conveyors, for Goods or Materials, Other Than for Underground Use, Bucket Type.",
    "relatedAnnex2": "-",
    "country": "8428.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0815",
    "no": "695",
    "name": "벨트형 연속작동(continuous-action)식 물품용이나 재료용 엘리베이터와 컨베이어(지하 작업용 제외)",
    "spec": "Continuous-Action Elevators and Conveyors, for Goods or Materials, Other Than for Underground Use, Belt Type.",
    "relatedAnnex2": "-",
    "country": "8428.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0816",
    "no": "696",
    "name": "그 밖의 연속작동(continuous-action)식 물품용이나 재료용 엘리베이터와 컨베이어(지하 작업용 제외)",
    "spec": "Continuous-Action Elevators and Conveyors, for Goods or Materials, Other Than for Underground Use, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8428.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0817",
    "no": "697",
    "name": "권양(捲揚)용ㆍ취급용ㆍ적하용ㆍ양하용의 산업용 로봇",
    "spec": "Industrial Robots",
    "relatedAnnex2": "-",
    "country": "8428.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0818",
    "no": "698",
    "name": "그 밖의 권양(捲揚)용ㆍ취급용ㆍ적하용ㆍ양하용 기계류",
    "spec": "Lifting, Handling, Loading or Unloading Machinery Nesoi.",
    "relatedAnnex2": "-",
    "country": "8428.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0819",
    "no": "699",
    "name": "자주식 무한 궤도식 불도저(bulldozer)ㆍ앵글도저(angledozer)",
    "spec": "Bulldozers and Angledozers, Self-Propelled, Track Laying.",
    "relatedAnnex2": "-",
    "country": "8429.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0820",
    "no": "700",
    "name": "무한 궤도식을 제외한 자주식 불도저(bulldozer)ㆍ앵글도저(angledozer)",
    "spec": "Bulldozers and Angledozers, Self-Propelled, Other Than Tracklaying.",
    "relatedAnnex2": "-",
    "country": "8429.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0821",
    "no": "701",
    "name": "자주식 그레이더(grader)와 레벨러(leveller)",
    "spec": "Graders and Levelers, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0822",
    "no": "702",
    "name": "자주식 스크래퍼(scraper)",
    "spec": "Scrapers, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0823",
    "no": "703",
    "name": "자주식 탬핑머신(tamping machine)과 로드롤러(road roller)",
    "spec": "Tamping Machines and Road Rollers, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0824",
    "no": "704",
    "name": "자주식 메커니컬 프론트엔드 셔블로더(front-end shovel loader)",
    "spec": "Mechanical Front-End Shovel Loaders, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.51",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0825",
    "no": "705",
    "name": "자주식의 360도 회전의 상부구조를 가진 메커니컬셔블(mechanical shovel)과 엑스커베이터(excavator)ㆍ셔블로더(shovel loader)",
    "spec": "Mechanical Shovels, Excavators and Shovel Loaders with 360 Degree Revolving Superstructure, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.52",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0826",
    "no": "706",
    "name": "그 밖의 자주식 메커니컬셔블(mechanical shovel)과 엑스커베이터(excavator)ㆍ셔블로더(shovel loader)",
    "spec": "Mechanical Shovels, Excavators and Shovel Loaders Nesoi, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8429.59",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0827",
    "no": "707",
    "name": "항타기(杭打機)와 항발기(抗拔機)",
    "spec": "Pile-Drivers and Pile-Extractors.",
    "relatedAnnex2": "-",
    "country": "8430.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0828",
    "no": "708",
    "name": "자주식(自走式)을 제외한 석탄이나 암석 절단기와 터널 뚫는 기계",
    "spec": "Coal or Rock Cutters and Tunneling Machinery, Other Than Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8430.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0829",
    "no": "709",
    "name": "그 밖의 자주식 천공용이나 시굴용 기계(자주식 한정)",
    "spec": "Boring or Sinking Machinery, Nesoi, Self-Propelled",
    "relatedAnnex2": "-",
    "country": "8430.41",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0830",
    "no": "710",
    "name": "그 밖의 천공용 또는 시굴용 기계 (자주식 제외)",
    "spec": "Boring or Sinking Machinery, Nesoi, Other Than Self-Propelled",
    "relatedAnnex2": "-",
    "country": "8430.49",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0831",
    "no": "711",
    "name": "그 밖의 이동용ㆍ정지(整地)용ㆍ지균(地均)용ㆍ스크래핑(scraping)용ㆍ굴착용ㆍ탬핑(tamping)용ㆍ콤팩팅(compacting)용ㆍ채굴용 기계(토양용ㆍ광석용ㆍ광물용으로 한정하며, 자주식으로 한정한다)",
    "spec": "Moving, Grading, Leveling, Scraping, Excavating, Tamping, Compacting or Extracting Machinery for Earth, Minerals or Ores, Nesoi, Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8430.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0832",
    "no": "712",
    "name": "그 밖의 이동용ㆍ정지(整地)용ㆍ지균(地均)용ㆍ스크래핑(scraping)용ㆍ굴착용ㆍ탬핑(tamping)용ㆍ콤팩팅(compacting)용ㆍ채굴용 기계(토양용ㆍ광석용ㆍ광물용으로 한정하며, 자주식을 제외한다)",
    "spec": "Moving, Grading, Leveling, Excavating, Extracting Machinery for Earth, Minerals or Ores, Nesoi, Not Self-Propelled.",
    "relatedAnnex2": "-",
    "country": "8430.69",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0833",
    "no": "713",
    "name": "그 밖의 권양용, 취급용, 적하용, 양하용 기계의 부분품",
    "spec": "Parts for Lifting, Handling, Loading or Unloading Machinery, Nesoi",
    "relatedAnnex2": "-",
    "country": "8431.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0834",
    "no": "714",
    "name": "데릭(derrick), 크레인, 불도저, 앵들도저, 그레이더, 스크래퍼, 보어러, 채굴용 등 기타 기계의 버켓(bucket)ㆍ셔블(shovel)ㆍ그랩(grab)과 그립(grip)",
    "spec": "Buckets, Shovels, Grabs and Grips for Derricks, Cranes, Bulldozers, Angledozers, Graders, Scrapers, Borers, Extracting, Etc. Machinery.",
    "relatedAnnex2": "-",
    "country": "8431.41",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0835",
    "no": "715",
    "name": "그 밖의 천공용 또는 시굴용 기계의 부분품",
    "spec": "Parts for Boring or Sinking Machinery, Nesoi",
    "relatedAnnex2": "-",
    "country": "8431.43",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0836",
    "no": "716",
    "name": "섬유소 펄프의 제조용 기계",
    "spec": "Machinery for Making Pulp of Fibrous Cellulosic Material.",
    "relatedAnnex2": "-",
    "country": "8439.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0837",
    "no": "717",
    "name": "종이ㆍ판지의 완성가공용 기계",
    "spec": "Machinery for Finishing Paper or Paperboard.",
    "relatedAnnex2": "-",
    "country": "8439.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0838",
    "no": "718",
    "name": "카톤(carton)ㆍ박스ㆍ케이스ㆍ튜브ㆍ드럼ㆍ그 밖에 이와 유사한 용기의 제조기계[몰딩(moulding)으로 하는 것은 제외한다]",
    "spec": "Machines for Making Paper Cartons, Boxes, Cases, Drums and Similar Containers, Other Than By Molding.",
    "relatedAnnex2": "-",
    "country": "8441.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0839",
    "no": "719",
    "name": "인조섬유의 방사(紡絲)용ㆍ늘림(drawing)용ㆍ텍스처(texture)용ㆍ절단용 기계",
    "spec": "Machines for Extruding, Drawing, Texturing or Cutting Manmade Textile Materials.",
    "relatedAnnex2": "-",
    "country": "8444.00",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0840",
    "no": "720",
    "name": "폭이 30센티미터를 초과하는 직조기(셔틀형으로 한정한다)",
    "spec": "Power Looms for Weaving Fabrics of A Width Exceeding 30 cm, Shuttle Type.",
    "relatedAnnex2": "-",
    "country": "8446.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0841",
    "no": "721",
    "name": "폭이 30센티미터를 초과하는 그 밖의 직조기(셔틀형으로 한정한다)",
    "spec": "Weaving Machines (Looms) for Weaving Fabrics of A Width Exceeding 30 cm, Shuttle Type, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8446.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0842",
    "no": "722",
    "name": "제8444호ㆍ제8445호ㆍ제8446호ㆍ제8447호의 기계의 보조기계, 도비(dobby)기ㆍ자카드기와 이들을 사용하기 위한 카드의 축소용ㆍ복사용ㆍ천공용ㆍ조립용 기계",
    "spec": "Auxiliary Machinery for Textile Machines (Headings 8444 to 8447), Dobbies and Jacquards, Card Reducing, Copying, Punching or Assembling Machines.",
    "relatedAnnex2": "-",
    "country": "8448.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0843",
    "no": "723",
    "name": "그 밖의 제8444호ㆍ제8445호ㆍ제8446호ㆍ제8447호의 기계의 보조기계",
    "spec": "Auxiliary Machinery for Textile Machines (Headings 8444 to 8447), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8448.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0844",
    "no": "724",
    "name": "인조섬유의 방사(紡絲)용ㆍ늘림(drawing)용ㆍ텍스처(texture)용ㆍ절단용 기계 또는 그 보조기계의 부분품과 부속품",
    "spec": "Parts and Accessories for Machines for Extruding, Drawing, Texturing or Cutting Manmade Textile Materials, or of Their Auxiliary Machinery.",
    "relatedAnnex2": "-",
    "country": "8448.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0845",
    "no": "725",
    "name": "방적준비기계, 방직사 제조기계 등에 사용되는 스핀들ㆍ스핀들 플라이어ㆍ스피닝 링ㆍ링트래블러",
    "spec": "Spindles, Spindle Flyers, Spinning Rings and Ring Travellers, for Machinery Used for Preparing or Producing Textile Yarns, Etc.",
    "relatedAnnex2": "-",
    "country": "8448.33",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0846",
    "no": "726",
    "name": "방적기ㆍ합사기(合絲機)ㆍ연사기(撚絲機)의 그 밖의 부분품과 부속품, 권사기(捲絲機)와 방직사 제조기계의 그 밖의 부분품",
    "spec": "Parts and Accessories for Textile Spinning, Doubling or Twisting, Winding or Reeling and Yarn Producing Machines, Etc., Nesoi.",
    "relatedAnnex2": "-",
    "country": "8448.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0847",
    "no": "727",
    "name": "직조기용 바디ㆍ종광(heald)과 종광 프레임",
    "spec": "Reeds for Looms, Healds and Heald-Frames.",
    "relatedAnnex2": "-",
    "country": "8448.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0848",
    "no": "728",
    "name": "직기(직조기)나 그 보조기계의 그 밖의 부분품과 부속품",
    "spec": "Parts and Accessories of Weaving Machines (Looms) or of Their Auxiliary Machinery, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8448.49",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0849",
    "no": "729",
    "name": "드라이클리닝기(방적용 실ㆍ직물류나 이들 제품에 사용하는 것으로 한정한다)",
    "spec": "Dry-Cleaning Machines for Textiles Yarns, Fabrics or Made Up Textile Articles.",
    "relatedAnnex2": "-",
    "country": "8451.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0850",
    "no": "730",
    "name": "방적용 실ㆍ직물류나 이들 제품에 사용하는 건조기 (1회의 건조 능력이 건조한 섬유제품의 중량으로 10킬로그램 초과하는 것으로, 원심탈수형은 제외한다)",
    "spec": "Drying Machines (Except Centrifugal Type) for Textile Yarns, Fabrics or Made Up Textile Articles, with A Dry Linen Capacity Exceeding 10 Kg.",
    "relatedAnnex2": "-",
    "country": "8451.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0851",
    "no": "731",
    "name": "다림질기와 프레스[퓨징프레스(fusing press)를 포함한다](방적용 실ㆍ직물류나 이들 제품에 사용하는 것으로 한정한다)",
    "spec": "Ironing Machines and Presses (Including Fusing Presses) for Textile Yarns, Fabrics or Made Up Textile Articles.",
    "relatedAnnex2": "-",
    "country": "8451.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0852",
    "no": "732",
    "name": "세탁용ㆍ클리닝용ㆍ쥐어짜기용 등의 기계류(방적용 실ㆍ직물류나 이들 제품에 사용하는 것으로 한정한다)의 부분품과 지지물에 페이스트를 입히는 기계 등의 부분품과 직물류의 감기용 등의 기계의 부분품",
    "spec": "Parts for Machinery for Washing, Cleaning, Wringing Etc. Textile Yarns and Fabrics, Applying Paste to Base Fabric Etc. and Reeling Etc. Textile Fabric.",
    "relatedAnnex2": "-",
    "country": "8451.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0853",
    "no": "733",
    "name": "전로(야금용이나 금속 주조용으로 한정한다)",
    "spec": "Converters Used In Metallurgy or Metal Foundries.",
    "relatedAnnex2": "-",
    "country": "8454.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0854",
    "no": "734",
    "name": "잉곳(ingot)용 주형과 레이들(ladle)(야금용이나 금속 주조용으로 한정한다)",
    "spec": "Ingot Molds and Ladles Used In Metallurgy or Metal Foundries.",
    "relatedAnnex2": "-",
    "country": "8454.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0855",
    "no": "735",
    "name": "주조기(야금용이나 금속 주조용으로 한정한다)",
    "spec": "Casting Machines Used In Metallurgy or Metal Foundries",
    "relatedAnnex2": "-",
    "country": "8454.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0856",
    "no": "736",
    "name": "전로ㆍ레이들(ladle)ㆍ잉곳(ingot)용 주형과 주조기(야금용이나 금속 주조용으로 한정한다)의 부분품",
    "spec": "Parts for Converters, Ladles, Ingot Molds and Casting Machines Used In Metallurgy or Metal Foundries.",
    "relatedAnnex2": "-",
    "country": "8454.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0857",
    "no": "737",
    "name": "금속관 압연기",
    "spec": "Metal-Rolling Tube Mills",
    "relatedAnnex2": "-",
    "country": "8455.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0858",
    "no": "738",
    "name": "금속 열간(熱間)이나 열ㆍ냉간(熱冷間) 겸용 압연기(금속 관 압연기는 제외한다)",
    "spec": "Metal-Rolling Hot or Combination Hot and Cold Rolling Mills, Except Tube Mills",
    "relatedAnnex2": "-",
    "country": "8455.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0859",
    "no": "739",
    "name": "금속 냉간(冷間) 압연기(금속 관 압연기는 제외한다)",
    "spec": "Cold Metal-Rolling Mills, Except Tube Mills.",
    "relatedAnnex2": "-",
    "country": "8455.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0860",
    "no": "740",
    "name": "압연기용 롤",
    "spec": "Rolls for Metal-Rolling Mills.",
    "relatedAnnex2": "-",
    "country": "8455.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0861",
    "no": "741",
    "name": "금속 압연기의 부분품(압연기용 롤의 것은 제외한다)",
    "spec": "Parts for Metal-Rolling Mills, Except Rolls for Rolling Mills",
    "relatedAnnex2": "-",
    "country": "8455.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0862",
    "no": "742",
    "name": "각종 재료의 가공 공작기계 (레이저 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material Operated By Laser",
    "relatedAnnex2": "-",
    "country": "8456.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0863",
    "no": "743",
    "name": "각종 재료의 가공 공작기계(그 밖의 광선ㆍ광자빔 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material Operated By Other Light or Photon Beam Processes",
    "relatedAnnex2": "-",
    "country": "8456.12",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0864",
    "no": "744",
    "name": "각종 재료의 가공 공작기계(초음파 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material, By Ultrasonic Processes.",
    "relatedAnnex2": "-",
    "country": "8456.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0865",
    "no": "745",
    "name": "각종 재료의 가공 공작기계(방전 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material, By Electro-Discharge Processes",
    "relatedAnnex2": "-",
    "country": "8456.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0866",
    "no": "746",
    "name": "각종 재료의 가공 공작기계(플라즈마아크 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material Operated By Plasma Arc Processes.",
    "relatedAnnex2": "-",
    "country": "8456.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0867",
    "no": "747",
    "name": "워터제트 절단기(재료의 일부를 제거하여 가공한 것으로 한정한다)",
    "spec": "Machine Tools for Working Any Material By Removal of Material, Water-Jet Cutting Machines",
    "relatedAnnex2": "-",
    "country": "8456.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0868",
    "no": "748",
    "name": "그 밖의 각종 재료의 가공 공작기계(전기화학, 전자빔, 이온빔, 플라즈마아크 방식으로 재료의 일부를 제거하여 가공하는 것으로 한정한다)",
    "spec": "Machine Tools for Removal of Material By Electro-Chemical, Electron-Beam, Ionic-Beam or Plasma Arc Processes, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8456.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0869",
    "no": "749",
    "name": "금속 가공용 머시닝센터(machining centre)",
    "spec": "Machining Centers for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8457.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0870",
    "no": "750",
    "name": "금속 절삭가공용 수치제어식 수평 선반",
    "spec": "Horizontal Lathes for Removing Metal, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8458.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0871",
    "no": "751",
    "name": "금속 절삭가공용 수치제어식 그 밖의 선반",
    "spec": "Other Lathes, Excluding Horizontal, for Removing Metal, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8458.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0872",
    "no": "752",
    "name": "금속 절삭가공용 공작기계(웨이타입(way-type) 유닛헤드머신(unit head machine))",
    "spec": "Way-Type Unit Head Machines for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8459.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0873",
    "no": "753",
    "name": "그 밖의 수치제어식 드릴링 머신",
    "spec": "Drilling Machines for Removing Metal Nesoi, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8459.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0874",
    "no": "754",
    "name": "그 밖의 수치제어식 보링밀링머신(boring-milling machine)",
    "spec": "Boring-Milling Machines for Removing Metal Nesoi, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8459.31",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0875",
    "no": "755",
    "name": "그 밖의 수치제어식이 아닌 보링밀링머신(boring-milling machine)",
    "spec": "Boring-Milling Machines for Removing Metal Nesoi, Not Numerically Controlled",
    "relatedAnnex2": "-",
    "country": "8459.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0876",
    "no": "756",
    "name": "그 밖의 수치제어식 보링머신(boring machine)",
    "spec": "Numerically Controlled Boring Machines, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8459.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0877",
    "no": "757",
    "name": "그 밖의 보링머신(boring machine)",
    "spec": "Other Boring Machines, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8459.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0878",
    "no": "758",
    "name": "수치제어식 무릎형 밀링머신(milling machine)",
    "spec": "Milling Machines, Knee Type, for Removing Metal, Numerically Controlled",
    "relatedAnnex2": "-",
    "country": "8459.51",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0879",
    "no": "759",
    "name": "수치제어식이 아닌 무릎형 밀링머신(milling machine)",
    "spec": "Milling Machines, Knee Type, for Removing Metal, Not Numerically Controlled",
    "relatedAnnex2": "-",
    "country": "8459.59",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0880",
    "no": "760",
    "name": "그 밖의 수치제어식 밀링머신(무릎형 밀링머신은 제외한다)",
    "spec": "Milling Machines, Not Knee Type, for Removing Metal, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8459.61",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0881",
    "no": "761",
    "name": "수치제어식이 아닌 그 밖의 밀링머신(무릎형 밀링머신은 제외한다)",
    "spec": "Milling Machines, Not Knee Type, for Removing Metal, Not Numerically Controlled",
    "relatedAnnex2": "-",
    "country": "8459.69",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0882",
    "no": "762",
    "name": "그 밖의 나사 절삭용 기계나 태핑머신(tapping machine)",
    "spec": "Threading or Tapping Machines, for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8459.70",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0883",
    "no": "763",
    "name": "수치 제어식 평면 연삭기",
    "spec": "Flat-Surface Grinding Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0884",
    "no": "764",
    "name": "수치 제어식이 아닌 평면 연삭기(축 고정정밀도가 0.01밀리미터 이상 것으로 한정한다)",
    "spec": "Flat-Surface Grinding Machines for Removing Metal, Axis Accuracy of 0.01 mm or More, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0885",
    "no": "765",
    "name": "수치 제어식 무심 연삭기",
    "spec": "Centerless Grinding Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0886",
    "no": "766",
    "name": "그 밖의 수치 제어식 원통연삭기",
    "spec": "Other Cylindrical Grinding Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0887",
    "no": "767",
    "name": "그 밖의 수치 제어식 연삭기",
    "spec": "Other Grinding Machines, Nesoi, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0888",
    "no": "768",
    "name": "수치 제어식 연삭기(평연 연삭기를 제외하며, 축 고정정밀도가 0.01밀리미터 이상인 것으로 수치제어식은 제외한다.)",
    "spec": "Grinding Machines for Removing Metal, Except Flat-Surface, Axis Accuracy of 0.01 mm or More, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0889",
    "no": "769",
    "name": "수치 제어식 샤프닝머신(sharpening machine)(공구나 커터를 연삭하는 것으로 한정한다)",
    "spec": "Sharpening (Tool or Cutter Grinding) Machines for Removing Metal, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0890",
    "no": "770",
    "name": "수치 제어식이 아닌 샤프닝머신(sharpening machine)(공구나 커터를 연삭하는 것으로 수치제어식은 제외한다.)",
    "spec": "Sharpening (Tool or Cutter Grinding) Machines for Removing Metal, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8460.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0891",
    "no": "771",
    "name": "호닝머신(honing machine)이나 래핑머신(lapping machine)",
    "spec": "Honing or Lapping Machines for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8460.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0892",
    "no": "772",
    "name": "디버링(deburring), 폴리싱(polishing)이나 그 밖의 완성가공용 공작기계로서 연마재ㆍ광택재로 금속이나 소결금속탄화물을 가공하는 것 (기어절삭기ㆍ기어연삭기 ㆍ기어완성가공기는 제외한다)",
    "spec": "Machine Tools for Deburring, Polishing Metal, Sintered Metal Carbides, Abrasives or Polishing Products, Other Than Gear Cutting, Etc., Nesoi.",
    "relatedAnnex2": "-",
    "country": "8460.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0893",
    "no": "773",
    "name": "금속 절삭가공용 쉐이핑머신(shaping machine)이나 슬로팅머신(slotting machine)",
    "spec": "Shaping or Slotting Machines for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8461.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0894",
    "no": "774",
    "name": "금속 절삭가공용 브로칭머신(broaching machine)",
    "spec": "Broaching Machines for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8461.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0895",
    "no": "775",
    "name": "기어절삭기ㆍ기어연삭기ㆍ기어완성가공기",
    "spec": "Gear Cutting, Gear Grinding or Gear Finishing Machines.",
    "relatedAnnex2": "-",
    "country": "8461.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0896",
    "no": "776",
    "name": "금속 절삭가공용 톱기계나 절단기",
    "spec": "Sawing or Cutting-Off Machines for Removing Metal.",
    "relatedAnnex2": "-",
    "country": "8461.50",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0897",
    "no": "777",
    "name": "금속ㆍ소결금속탄화물ㆍ서멧을 절삭하는 방식으로 가공하는 그 밖의 공작기계",
    "spec": "Machine Tools Working By Removing Metal, Sintered Metal Carbides or Cermets, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8461.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0898",
    "no": "778",
    "name": "밀폐식 형 단조기",
    "spec": "Closed Die Forging Machines",
    "relatedAnnex2": "-",
    "country": "8462.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0899",
    "no": "779",
    "name": "금속 단조기(鍛造機)ㆍ다이스탬핑기(die-stamping machine)(프레스를 포함한다)와 해머",
    "spec": "Forging or Die-Stamping Machines (Including Presses) and Hammers for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8462.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0900",
    "no": "780",
    "name": "슬리팅(slitting) 설비와 일정한 길이로 절단하는 설비(cut-to-length line)",
    "spec": "Slitting Lines and Cut-To-Length Lines",
    "relatedAnnex2": "-",
    "country": "8462.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0901",
    "no": "781",
    "name": "액압식 금속가공용 프레스",
    "spec": "Hydraulic Presses for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8462.61",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0902",
    "no": "782",
    "name": "기계식 금속가공용 프레스",
    "spec": "Mechanical Presses for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8462.62",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0903",
    "no": "783",
    "name": "금속가공용 서보프레스",
    "spec": "Servo-Presses for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8462.63",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0904",
    "no": "784",
    "name": "그 밖의 금속가공용 프레스",
    "spec": "Other Presses for Working Metal.",
    "relatedAnnex2": "-",
    "country": "8462.69",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0905",
    "no": "785",
    "name": "그 밖의 단조(鍛造)용ㆍ해머링(hammering)용ㆍ다이스탬핑(die-stamping)용 금속가공 공작기계(프레스를 포함한다), 굽힘용ㆍ접음용ㆍ펼침용 그 밖의 금속가공 공작기계(프레스를 포함한다)",
    "spec": "Machine Tools (Including Presses) for Working Metal By Forging, Hammering, Die-Casting, Bending, Folding, Flattening, Working Metal Carbides, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8462.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0906",
    "no": "786",
    "name": "그 밖의 금속이나 소결금속탄화물, 서멧(cermet)의 가공용 공작기계(재료를 절삭하지 않는 방식으로 한정한다)",
    "spec": "Machine Tools for Working Metal, Sintered Metal Carbides or Cermets, Without Removing Material, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8463.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0907",
    "no": "787",
    "name": "코르크ㆍ뼈ㆍ경질 고무ㆍ경질 플라스틱이나 이와 유사한 경질물의 가공용 머시닝센터",
    "spec": "Machining Centers for Working Cork, Bone, Hard Rubber, Hard Plastics or Similiar Hard Materals.",
    "relatedAnnex2": "-",
    "country": "8465.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0908",
    "no": "788",
    "name": "목재ㆍ코르크ㆍ뼈ㆍ경질 고무ㆍ경질 플라스틱이나 이와 유사한 경질물의 연삭기ㆍ샌딩머신(sanding machine)ㆍ광택기",
    "spec": "Grinding, Sanding or Polishing Machines for Working Wood, Cork, Bone, Hard Rubber, Hard Plastics or Similar Hard Materials.",
    "relatedAnnex2": "-",
    "country": "8465.93",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0909",
    "no": "789",
    "name": "목재ㆍ코르크ㆍ뼈ㆍ경질 고무ㆍ경질 플라스틱이나 이와 유사한 경질물의 굽힘기나 조립기",
    "spec": "Bending or Assembling Machines for Working Wood, Cork, Bone, Hard Rubber, Hard Plastics or Similar Hard Materials.",
    "relatedAnnex2": "-",
    "country": "8465.94",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0910",
    "no": "790",
    "name": "공작기계용 가공용 홀더",
    "spec": "Work Holders for Machine Tools.",
    "relatedAnnex2": "-",
    "country": "8466.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0911",
    "no": "791",
    "name": "공작기계용 분할대와 그 밖의 공작기계용 특수 부착물",
    "spec": "Dividing Heads and Other Special Attachments for Machine Tools",
    "relatedAnnex2": "-",
    "country": "8466.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0912",
    "no": "792",
    "name": "레이저 가공공작기계, 금속가공용 머시닝센터, 금속 절삭가공용 선반, 드릴링 기계 등의 부분품과 부속품",
    "spec": "Parts and Accessories for Machine Tools, for Laser Operation, Metalworking Machining Centers, Lathes and Drilling Machines, Etc., Nesoi.",
    "relatedAnnex2": "-",
    "country": "8466.93",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0913",
    "no": "793",
    "name": "휴대용 자동자료처리기계(중량이 10킬로그램 이하인 것으로서 적어도 중앙처리장치, 키보드, 디스플레이를 갖추고 있는 것으로 한정한다)",
    "spec": "Portable Digtl Automatic Data Processing Machines, Weight Not More Than 10 Kg, Consisting of At Least A Central Processing Unit, Keyboard & A Display",
    "relatedAnnex2": "-",
    "country": "8471.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0914",
    "no": "794",
    "name": "적어도 동일 하우징 속에 중앙처리장치와 입출력장치를 내장한 그 밖의 자동자료처리기계(이들이 상호 결합한 것인지에 상관없다)",
    "spec": "Digital Adp Machines Comprising In Same Housing At Least A Central Processing Unit and An Input and Output Unit, Whether or Not Combined, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.41",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0915",
    "no": "795",
    "name": "그 밖의 자동자료처리장치와 그 단위기기(시스템 형태로 제시된 것으로 한정한다)",
    "spec": "Digital Automatic Data Processing Machines and Units Thereof Presented In The Form of Systems, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0916",
    "no": "796",
    "name": "디지털 처리장치(소호 제8471.41호나 제8471.49호 외의 것으로서 기억장치·입력장치·출력장치 중 한 가지나 두 가지 장치를 동일 하우징 속에 내장한 것인지에 상관없다)",
    "spec": "Digital Processing Units Other Than Those of 8471.41 and 8471.49, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0917",
    "no": "797",
    "name": "자동자료처리장치의 입력장치나 출력장치(동일 하우징 속에 기억장치를 내장하였는지에 상관없다)",
    "spec": "Automatic Data Processing Input or Output Units, Whether or Not Containing Storage Units In The Same Housing, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0918",
    "no": "798",
    "name": "자동자료처리 기억장치",
    "spec": "Automatic Data Processing Storage Units, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0919",
    "no": "799",
    "name": "그 밖의 자동자료처리기계의 단위 기기",
    "spec": "Automatic Data Processing Units, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8471.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0920",
    "no": "800",
    "name": "그 밖의 자동자료처리기계의 단위기기: 자기식이나 광학식 판독기, 자료를 자료매체에 부호 형태로 전사하는 기계와 이러한 자료의 처리기계",
    "spec": "Automatic Data Processing Unts Thereof; Magnetic/Optical Readers, Mach for Transcribing Data to Data Media In Coded Form & Mach for Proc Data, Nesoi",
    "relatedAnnex2": "-",
    "country": "8471.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0921",
    "no": "801",
    "name": "등사기",
    "spec": "Duplicating Machines.",
    "relatedAnnex2": "-",
    "country": "8472.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0922",
    "no": "802",
    "name": "우편물의 분류기ㆍ접음기, 우편물을 봉투나 밴드에 삽입하는 기계, 우편물의 개봉기ㆍ봉함기ㆍ실링기, 우표의 첨부기나 소인기",
    "spec": "Machines for Sorting or Folding Mail, for Inserting Mail In Envelopes, or for Opening or Sealing Mail and Machines for Affixing or Cancelling Postage.",
    "relatedAnnex2": "-",
    "country": "8472.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0923",
    "no": "803",
    "name": "전자계산기의 부분품과 부속품",
    "spec": "Parts and Accessories for Electronic Calculators and Calculating Machines.",
    "relatedAnnex2": "-",
    "country": "8473.21",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0924",
    "no": "804",
    "name": "고체 모양의 토양ㆍ돌ㆍ광석이나 그 밖의 광물성 물질의 선별기ㆍ기계식 체ㆍ분리기ㆍ세척기",
    "spec": "Machines for Sorting, Screening, Separating or Washing Earth, Stone, Ore or Other Mineral Substances, In Solid Form.",
    "relatedAnnex2": "-",
    "country": "8474.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0925",
    "no": "805",
    "name": "고체 모양의 토양ㆍ돌ㆍ광석이나 그 밖의 광물성 물질의 혼합기ㆍ반죽기",
    "spec": "Machines for Mixing or Kneading Earth, Stone, Ore or Other Mineral Substances In Solid Form, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8474.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0926",
    "no": "806",
    "name": "그 밖의 기계",
    "spec": "Other Machinery",
    "relatedAnnex2": "-",
    "country": "8474.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0927",
    "no": "807",
    "name": "광섬유와 광섬유 예비성형품 제조용 기계",
    "spec": "Machines for Making Optical Fibers and Preforms Thereof.",
    "relatedAnnex2": "-",
    "country": "8475.21",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0928",
    "no": "808",
    "name": "그 밖의 유리나 유리제품의 제조용이나 열간(熱間)가공용 기계",
    "spec": "Machines for Manufacturing or Hot Working Glass or Glassware, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8475.29",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0929",
    "no": "809",
    "name": "사출 성형기",
    "spec": "Injection-Molding Machines for Working Rubber or Plastics",
    "relatedAnnex2": "-",
    "country": "8477.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0930",
    "no": "810",
    "name": "고무 또는 플라스틱 공업용 압출기",
    "spec": "Extruders for Working Rubber or Plastics",
    "relatedAnnex2": "-",
    "country": "8477.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0931",
    "no": "811",
    "name": "고무 또는 플라스틱 공업용 취입 성형기",
    "spec": "Blow-Molding Machines for Working Rubber or Plastic.",
    "relatedAnnex2": "-",
    "country": "8477.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0932",
    "no": "812",
    "name": "고무 또는 플라스틱의 진공성형기와 그 밖의 열성형기",
    "spec": "Vacuum-Molding Machines and Other Thermoforming Machines, for Molding or Forming Rubber or Plastics.",
    "relatedAnnex2": "-",
    "country": "8477.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0933",
    "no": "813",
    "name": "공기를 넣는 타이어 성형기나 재생기와 그 밖의 이너튜브(inner tube) 성형기",
    "spec": "Machinery for Molding or Retreading Pneumatic Tires or for Molding or Otherwise Forming Inner Tubes.",
    "relatedAnnex2": "-",
    "country": "8477.51",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0934",
    "no": "814",
    "name": "고무나 플라스틱의 그 밖의 성형기",
    "spec": "Machinery for Molding or Otherwise Forming Rubber or Plastics, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8477.59",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0935",
    "no": "815",
    "name": "고무나 플라스틱을 가공하거나 이들 재료로 제품을 제조하는 기계(이 류에 따로 분류되지 않은 것으로 한정한다)",
    "spec": "Machinery for Working Rubber or Plastics or for The Manufacture of Products From These Materials, Nesoi",
    "relatedAnnex2": "-",
    "country": "8477.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0936",
    "no": "816",
    "name": "고무나 플라스틱을 가공하거나 이들 재료로 제품을 제조하는 기계(이 류에 따로 분류되지 않은 것으로 한정한다)의 부분품",
    "spec": "Parts of Machinery for Working Rubber or Plastics or Parts of Machinery Used In The Manufacture of Products From Rubber or Plastics Materials, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8477.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0937",
    "no": "817",
    "name": "토목공사ㆍ건축이나 이와 유사한 용도에 사용하는 기계류",
    "spec": "Machinery for Public Works, Building or The Like.",
    "relatedAnnex2": "-",
    "country": "8479.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0938",
    "no": "818",
    "name": "파티클보드(particle board)나 건축용 섬유판(목재나 그 밖의 목질 물질로 제조된 것으로 한정한다)의 제조용 프레스, 목재나 코르크 처리용 그 밖의 기계",
    "spec": "Presses for Manufacturing Particle Board or Fiber Building Board of Wood or Other Ligneous Materials and Other Machinery for Treating Wood or Cork.",
    "relatedAnnex2": "-",
    "country": "8479.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0939",
    "no": "819",
    "name": "다용도의 산업용 로봇",
    "spec": "Industrial Robots for Multiple Uses.",
    "relatedAnnex2": "-",
    "country": "8479.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0940",
    "no": "820",
    "name": "금속 처리용(전선권선기를 포함한다) 기기",
    "spec": "Machines and Mechanical Appliances for Treating Metal, Including Electric Wire Coil-Winders.",
    "relatedAnnex2": "-",
    "country": "8479.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0941",
    "no": "821",
    "name": "혼합기ㆍ반죽기ㆍ파쇄기ㆍ분쇄기ㆍ기계식 체ㆍ시프팅기(sifting machine)ㆍ균질기ㆍ유화기ㆍ교반기",
    "spec": "Machines and Mechanical Appliances for Mixing, Kneading, Crushing, Grinding, Screening, Sifting, Homogenizing, Emulsifying or Stirring, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8479.82",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0942",
    "no": "822",
    "name": "고유의 기능을 가진 기계류",
    "spec": "Machines and Mechanical Appliances Having Individual Functions, Nesoi",
    "relatedAnnex2": "-",
    "country": "8479.89",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0943",
    "no": "823",
    "name": "고유 기능을 가지고 있는 그 밖의 기계류의 부분품",
    "spec": "Parts of Machines and Mechanical Appliances Having Individual Functions, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8479.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0944",
    "no": "824",
    "name": "주형 베이스",
    "spec": "Mold Bases.",
    "relatedAnnex2": "-",
    "country": "8480.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0945",
    "no": "825",
    "name": "주형 제조용 모형",
    "spec": "Molding Patterns.",
    "relatedAnnex2": "-",
    "country": "8480.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0946",
    "no": "826",
    "name": "광물성 물질 성형용 주형",
    "spec": "Molds for Mineral Materials.",
    "relatedAnnex2": "-",
    "country": "8480.60",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0947",
    "no": "827",
    "name": "감압밸브",
    "spec": "Pressure-Reducing Valves.",
    "relatedAnnex2": "-",
    "country": "8481.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0948",
    "no": "828",
    "name": "유압 전송용 또는 공기압 전송용 밸브",
    "spec": "Valves for Oleohydraulic or Pneumatic Transmissions.",
    "relatedAnnex2": "-",
    "country": "8481.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0949",
    "no": "829",
    "name": "체크(논리턴)밸브",
    "spec": "Check Valves.",
    "relatedAnnex2": "-",
    "country": "8481.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0950",
    "no": "830",
    "name": "안전밸브",
    "spec": "Safety or Relief Valves.",
    "relatedAnnex2": "-",
    "country": "8481.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0951",
    "no": "831",
    "name": "파이프ㆍ통이나 이와 유사한 물품에 사용하는 탭ㆍ코크ㆍ밸브와 이와 유사한 장치(온도제어식 밸브를 포함한다)",
    "spec": "Taps, Cocks, Valves and Similar Appliances for Pipes, Vats or The Like, Including Thermostatically Controlled Valves, Nesoi",
    "relatedAnnex2": "-",
    "country": "8481.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0952",
    "no": "832",
    "name": "파이프ㆍ통이나 이와 유사한 물품에 사용하는 탭ㆍ코크ㆍ밸브와 이와 유사한 장치(감압밸브와 온도제어식 밸브를 포함한다)의 부분품",
    "spec": "Parts for Taps, Cocks, Valves and Similar Appliances for Pipes, Vats or The Like, Including Pressure Reducing and Thermostatically Controlled Valves",
    "relatedAnnex2": "-",
    "country": "8481.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0953",
    "no": "833",
    "name": "볼베어링(ball bearing)",
    "spec": "Ball Bearings.",
    "relatedAnnex2": "-",
    "country": "8482.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0954",
    "no": "834",
    "name": "원추형 롤러베어링(roller bearing)[콘과 결합된 원추형 롤러베어링(roller bearing)을 포함한다]",
    "spec": "Tapered Roller Bearings, Including Cone and Tapered Roller Assemblies.",
    "relatedAnnex2": "-",
    "country": "8482.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0955",
    "no": "835",
    "name": "구형 롤러베어링(roller bearing)",
    "spec": "Spherical Roller Bearings.",
    "relatedAnnex2": "-",
    "country": "8482.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0956",
    "no": "836",
    "name": "니들 롤러베어링(roller bearing)",
    "spec": "Needle Roller Bearings.",
    "relatedAnnex2": "-",
    "country": "8482.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0957",
    "no": "837",
    "name": "그 밖의 원통형 롤러베어링(roller bearing)",
    "spec": "Cylindrical Roller Bearings Nesoi.",
    "relatedAnnex2": "-",
    "country": "8482.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0958",
    "no": "838",
    "name": "그 밖의 볼베어링이나 롤러베어링[볼베어링(ball bearing)과 롤러베어링(roller bearing)이 결합된 것을 포함한다]",
    "spec": "Ball or Roller Bearings Nesoi, Including Combined Ball/Roller Bearings.",
    "relatedAnnex2": "-",
    "country": "8482.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0959",
    "no": "839",
    "name": "볼베어링이나 롤러베어링의 볼ㆍ니들ㆍ롤러",
    "spec": "Balls, Needles and Rollers for Ball or Roller Bearings.",
    "relatedAnnex2": "-",
    "country": "8482.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0960",
    "no": "840",
    "name": "볼베어링이나 롤러베어링의 그 밖의 부분품",
    "spec": "Parts of Ball or Roller Bearings, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8482.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0961",
    "no": "841",
    "name": "전동축[캠샤프트(cam shaft)와 크랭크샤프트(crank shaft)를 포함한다], 크랭크(crank)",
    "spec": "Transmission Shafts (Including Camshafts and Crankshafts) and Cranks.",
    "relatedAnnex2": "-",
    "country": "8483.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0962",
    "no": "842",
    "name": "베어링하우징(bearing housing)[볼베어링(ball bearing)이나 롤러베어링(roller bearing)을 갖춘 것으로 한정한다]",
    "spec": "Housed Bearings, Incorporating Ball or Roller Bearings.",
    "relatedAnnex2": "-",
    "country": "8483.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0963",
    "no": "843",
    "name": "베어링하우징(bearing housing) ; [ 플레인 샤프트베어링(plain shaft bearing)",
    "spec": "Bearing Housings; Plain Shaft Bearings.",
    "relatedAnnex2": "-",
    "country": "8483.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0964",
    "no": "844",
    "name": "기어(gear)와 기어링(gearing)[날이 붙은 휠ㆍ체인스프로켓(chain sprocket)은 제외한다], 볼이나 롤러스크루(roller screw), 기어박스와 그 밖의 변속기[토크컨버터(torque converter)를 포함한다]",
    "spec": "Gears and Gearing (Except Toothed Wheels, Chain Sprockets, Etc.); Ball or Roller Screws; Gear Boxes and Other Speed Changers, Incltorque Converters.",
    "relatedAnnex2": "-",
    "country": "8483.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0965",
    "no": "845",
    "name": "플라이휠(flywheel)과 풀리(pulley)[풀리블록(pulley block)을 포함한다]",
    "spec": "Flywheels and Pulleys, Including Pulley Blocks.",
    "relatedAnnex2": "-",
    "country": "8483.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0966",
    "no": "846",
    "name": "클러치(clutch)와 샤프트커플링(shaft coupling)[유니버설조인트(universal joint)를 포함한다]",
    "spec": "Clutches and Shaft Couplings (Including Universal Joints).",
    "relatedAnnex2": "-",
    "country": "8483.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0967",
    "no": "847",
    "name": "날이 붙은 휠, 체인스프로켓(chain sprocket), 분리되어 제시된 그 밖의 전동(transmission)용 엘리먼트와 부분품",
    "spec": "Toothed Wheels, Chain Sprockets and Other Transmission Elements Presented Separately; Parts.",
    "relatedAnnex2": "-",
    "country": "8483.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0968",
    "no": "848",
    "name": "개스킷(gasket)과 이와 유사한 조인트(금속 외의 재료와 결합한 금속판으로 만든 것이나 금속을 두 개 이상 적층한 것으로 한정한다)",
    "spec": "Gaskets and Similar Joints of Metal Sheeting Combined with Other Material or of Two or More Layers of Metal.",
    "relatedAnnex2": "-",
    "country": "8484.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0969",
    "no": "849",
    "name": "메커니컬 실(mechanical seal)",
    "spec": "Mechanical Seals.",
    "relatedAnnex2": "-",
    "country": "8484.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0970",
    "no": "850",
    "name": "금속용 적층가공기계",
    "spec": "Machines for additive manufacturing By metal deposit",
    "relatedAnnex2": "-",
    "country": "8485.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0971",
    "no": "851",
    "name": "보울(boule)이나 웨이퍼(wafer) 제조용 기계와 기기",
    "spec": "Machines and Apparatus for The Manufacture of Boules or Wafers.",
    "relatedAnnex2": "-",
    "country": "8486.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0972",
    "no": "852",
    "name": "반도체디바이스나 전자집적회로 제조용 기계와 기기",
    "spec": "Machines and Apparatus for The Manufacture of Semiconductor Devices or of Electronic Integrates Circuits.",
    "relatedAnnex2": "-",
    "country": "8486.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0973",
    "no": "853",
    "name": "평판디스플레이 제조용 기계와 기기",
    "spec": "Machines and Apparatus for The Manufacture of Flat Panel Displays.",
    "relatedAnnex2": "-",
    "country": "8486.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0974",
    "no": "854",
    "name": "84류의 주 제11호다목에서 특정한 기계와 기기",
    "spec": "Machines and Apparatus Specified In Note 11(C) to Chapter 84.",
    "relatedAnnex2": "-",
    "country": "8486.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0975",
    "no": "855",
    "name": "반도체 보울, 웨이퍼등 반도체의 제조에 전용되거나 주로사용되는 기기의 부분품",
    "spec": "Machines and Apparatus of A Kind Used for The Manufacture of Semiconductor Boules or Wafers, Etc, Parts and Accessorites.",
    "relatedAnnex2": "-",
    "country": "8486.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0976",
    "no": "856",
    "name": "선박이나 보트의 추진기와 그 블레이드(blade)",
    "spec": "Ships' or Boats' Propellers and Blades Thereof.",
    "relatedAnnex2": "-",
    "country": "8487.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0977",
    "no": "857",
    "name": "그 밖의 기계류의 부분품(전기용품은 제외한다)",
    "spec": "Machinery Parts, Non Electric, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8487.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0978",
    "no": "858",
    "name": "교류·직류 겸용 전동기(출력이 37.5와트를 초과하는 것으로 한정한다)",
    "spec": "Universal Ac/Dc Motors of An Output Exceeding 37.5 W.",
    "relatedAnnex2": "-",
    "country": "8501.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0979",
    "no": "859",
    "name": "그 밖의 직류 전동기와 직류 발전기(출력이 750와트 이하인 것)",
    "spec": "Dc Motors Nesoi and Generators of An Output Not Exceeding 750 W.",
    "relatedAnnex2": "-",
    "country": "8501.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0980",
    "no": "860",
    "name": "그 밖의 직류 전동기와 직류 발전기(출력이 75킬로와트 초과 375킬로와트 이하인 것)",
    "spec": "Dc Motors Nesoi and Generators of An Output Exceeding 75 KW But Not Exceeding 375 KW.",
    "relatedAnnex2": "-",
    "country": "8501.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0981",
    "no": "861",
    "name": "그 밖의 다상(多相) 교류 전동기(출력이 75킬로와트 초과인 것)",
    "spec": "Ac Motors Nesoi, Multi-Phase, of An Output Exceeding 75 KW.",
    "relatedAnnex2": "-",
    "country": "8501.53",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0982",
    "no": "862",
    "name": "교류 발전기(출력이 75킬로볼트암페어 이하인 것)",
    "spec": "Ac Generators (Alternators), of An Output Not Exceeding 75 KVA.",
    "relatedAnnex2": "-",
    "country": "8501.61",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0983",
    "no": "863",
    "name": "교류 발전기(출력이 75킬로볼트암페어 초과 375킬로볼트암페어 이하인 것)",
    "spec": "Ac Generators (Alternators), of An Output Exceeding 75 KVA But Not Exceeding 375 KVA.",
    "relatedAnnex2": "-",
    "country": "8501.62",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0984",
    "no": "864",
    "name": "교류 발전기(출력이 375킬로볼트암페어 초과 750킬로볼트암페어 이하인 것)",
    "spec": "Ac Generators (Alternators), of An Output Exceeding 375 KVA But Not Exceeding 750 KVA.",
    "relatedAnnex2": "-",
    "country": "8501.63",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0985",
    "no": "865",
    "name": "교류 발전기(출력이 750킬로볼트암페어 초과인 것)",
    "spec": "Ac Generators (Alternators), of An Output Exceeding 750 KVA.",
    "relatedAnnex2": "-",
    "country": "8501.64",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0986",
    "no": "866",
    "name": "압축점화식 피스톤 내연기관을 갖춘 발전세트(디젤엔진이나 세미디젤엔진의 것으로 한정한다)(출력이 75킬로볼트암페어 이하인 것)",
    "spec": "Generating Sets with Compression-Ignition Internal Combustion Piston (Diesel or Semi-Diesel) Engines, of An Output Not Exceeding 75 KVA.",
    "relatedAnnex2": "-",
    "country": "8502.11",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0987",
    "no": "867",
    "name": "압축점화식 피스톤 내연기관을 갖춘 발전세트(디젤엔진이나 세미디젤엔진의 것으로 한정한다)(출력이 75킬로볼트암페어 초과 375킬로볼트암페어 이하인 것)",
    "spec": "Generating Sets with Compression-Ignition Internal Combustion Piston (Diesel Etc.) Engines, of An Output Exceeding 75 KVA Not Exceeding 375 KVA.",
    "relatedAnnex2": "-",
    "country": "8502.12",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0988",
    "no": "868",
    "name": "압축점화식 피스톤 내연기관을 갖춘 발전세트(디젤엔진이나 세미디젤엔진의 것으로 한정한다)(출력이 375킬로볼트암페어 초과인 것)",
    "spec": "Generating Sets with Compression-Ignition Internal Combustion Piston (Diesel or Semi-Diesel) Engines, of An Output Exceeding 375 KVA.",
    "relatedAnnex2": "-",
    "country": "8502.13",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0989",
    "no": "869",
    "name": "불꽃점화식 피스톤 내연기관을 갖춘 발전세트",
    "spec": "Generating Sets with Spark-Ignition Internal Combustion Piston Engines.",
    "relatedAnnex2": "-",
    "country": "8502.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0990",
    "no": "870",
    "name": "풍력 발전세트",
    "spec": "Generating Sets, Electric, Wind-Powered.",
    "relatedAnnex2": "-",
    "country": "8502.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0991",
    "no": "871",
    "name": "그 밖의 발전세트",
    "spec": "Generating Sets, Electric, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8502.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0992",
    "no": "872",
    "name": "회전변환기",
    "spec": "Electric Rotary Converters.",
    "relatedAnnex2": "-",
    "country": "8502.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0993",
    "no": "873",
    "name": "부분품(전동기,발전기,발전세트,회전변환기의 것)",
    "spec": "Parts of Electric Motors, Generators, Generating Sets and Rotary Converters.",
    "relatedAnnex2": "-",
    "country": "8503.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0994",
    "no": "874",
    "name": "그 밖의 변압기(용량이 1킬로볼트암페어 초과 16킬로볼트암페어 이하인 것)",
    "spec": "Electrical Transformers Nesoi, Having A Power Handing Capacity Exceeding 1 KVA But Not Exceeding 16 KVA.",
    "relatedAnnex2": "-",
    "country": "8504.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0995",
    "no": "875",
    "name": "그 밖의 변압기(용량이 16킬로볼트암페어 초과 500킬로볼트암페어 이하인 것)",
    "spec": "Electrical Transformers Nesoi, Having A Power Handing Capacity Exceeding 16 KVA But Not Exceeding 500 KVA.",
    "relatedAnnex2": "-",
    "country": "8504.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0996",
    "no": "876",
    "name": "그 밖의 변압기(용량이 500킬로볼트암페어를 초과하는 것)",
    "spec": "Electrical Transformers Nesoi, Having A Power Handling Capacity Exceeding 500 KVA.",
    "relatedAnnex2": "-",
    "country": "8504.34",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0997",
    "no": "877",
    "name": "자동자료처리기계와 그 단위기기(제8471호)의 정지형 변환기, 전원장치",
    "spec": "Electrical Static Converters; Power Supplies for Adp Machines or Units of 8471",
    "relatedAnnex2": "-",
    "country": "8504.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0998",
    "no": "878",
    "name": "전자석 커플링(coupling)·클러치·브레이크",
    "spec": "Electromagnetic Couplings, Clutches and Brakes.",
    "relatedAnnex2": "-",
    "country": "8505.20",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-0999",
    "no": "879",
    "name": "에어징크로 만든 일차전지",
    "spec": "Primary Cells and Primary Batteries, Air-Zinc.",
    "relatedAnnex2": "-",
    "country": "8506.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1000",
    "no": "880",
    "name": "일차전지의 부분품",
    "spec": "Parts of Primary Cells and Primary Batteries.",
    "relatedAnnex2": "-",
    "country": "8506.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1001",
    "no": "881",
    "name": "피스톤식 엔진 시동용 연산(鉛酸)축전지",
    "spec": "Lead-Acid Storage Batteries of A Kind Used for Starting Piston Engines.",
    "relatedAnnex2": "-",
    "country": "8507.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1002",
    "no": "882",
    "name": "그 밖의 연산(鉛酸)축전지",
    "spec": "Lead-Acid Storage Batteries Nesoi.",
    "relatedAnnex2": "-",
    "country": "8507.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1003",
    "no": "883",
    "name": "니켈-카드뮴 축전지",
    "spec": "Nickel-Cadmium Storage Batteries.",
    "relatedAnnex2": "-",
    "country": "8507.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1004",
    "no": "884",
    "name": "니켈-수소합금 축전지",
    "spec": "Nickel-Metal Hydride Batteries",
    "relatedAnnex2": "-",
    "country": "8507.50",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1005",
    "no": "885",
    "name": "리튬이온 축전지",
    "spec": "Lithium Ion Batteries",
    "relatedAnnex2": "-",
    "country": "8507.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1006",
    "no": "886",
    "name": "그 밖의 축전지",
    "spec": "Storage Batteries Nesoi",
    "relatedAnnex2": "-",
    "country": "8507.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1007",
    "no": "887",
    "name": "부분품(축전지, 격리판의 것)",
    "spec": "Parts of Electric Storage Batteries, Including Separators Therefor",
    "relatedAnnex2": "-",
    "country": "8507.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1008",
    "no": "888",
    "name": "내연기관의 점화플러그",
    "spec": "Internal Combustion Engine Spark Plugs.",
    "relatedAnnex2": "-",
    "country": "8511.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1009",
    "no": "889",
    "name": "내연기관 점화용 자석발전기, 직류 자석발전기와 마그네틱 플라이휠",
    "spec": "Internal Combustion Engine Ignition Magnetos, Magneto-Dynamos and Magnetic Flywheels.",
    "relatedAnnex2": "-",
    "country": "8511.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1010",
    "no": "890",
    "name": "내연기관 배전기와 점화코일",
    "spec": "Internal Combustion Engine Distributors and Ignition Coils.",
    "relatedAnnex2": "-",
    "country": "8511.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1011",
    "no": "891",
    "name": "내연기관 시동전동기와 겸용 시동발전기",
    "spec": "Internal Combustion Engine Starter Motors and Dual Purpose Starter-Generators.",
    "relatedAnnex2": "-",
    "country": "8511.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1012",
    "no": "892",
    "name": "그 밖의 내연기관용 발전기",
    "spec": "Internal Combustion Engine Generators, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8511.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1013",
    "no": "893",
    "name": "내연기관 점화용ㆍ시동용의 그 밖의 전기기기와 이러한 내연기관에 부속되는 기기",
    "spec": "Electrical Ignition or Starting Equipment Used for Internal Combustion Engines, Nesoi, and Equipment Used In Conjunction with Such Engines, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8511.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1014",
    "no": "894",
    "name": "내연기관 점화용ㆍ시동용의 그 밖의 전기기기의 부분품, 내연기관에 부속되는 발전기의 부분품",
    "spec": "Parts for Electrical Ignition or Starting Equipment Used for Internal Combustion Engines; Parts for Generators and Cut-Outs Used with Such Equipment.",
    "relatedAnnex2": "-",
    "country": "8511.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1015",
    "no": "895",
    "name": "열간 등압성형기",
    "spec": "Hot isostatic presses",
    "relatedAnnex2": "-",
    "country": "8514.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1016",
    "no": "896",
    "name": "그 밖의 공업용이나 실험실용 전기식 노(爐)와 오븐(저항식의 것)",
    "spec": "Industrial or Laboratory Electric Furnaces and Ovens, Resistance Type, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8514.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1017",
    "no": "897",
    "name": "공업용이나 실험실용 전자유도식이나 유전손실(dielectric loss)식 노(爐)와 오븐",
    "spec": "Industrial or Laboratory Electric Furnaces and Ovens, Induction or Dielectric Type.",
    "relatedAnnex2": "-",
    "country": "8514.20",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1018",
    "no": "898",
    "name": "전자 빔 노(爐)",
    "spec": "Electron Beam Furnaces",
    "relatedAnnex2": "-",
    "country": "8514.31",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1019",
    "no": "899",
    "name": "플라즈마ㆍ진공 아크식 노(爐)",
    "spec": "Plasma and Vacuum Arc Furnaces",
    "relatedAnnex2": "-",
    "country": "8514.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1020",
    "no": "900",
    "name": "그 밖의 공업용이나 실험실용 전기식 노와 오븐",
    "spec": "Industrial or Laboratory Electric Furnaces and Ovens, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8514.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1021",
    "no": "901",
    "name": "그 밖의 전자유도식이나 유전손실(dielectric loss)식 가열기",
    "spec": "Industrial or Laboratory Induction or Dielection Heating Equipment, Nesoi",
    "relatedAnnex2": "-",
    "country": "8514.40",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1022",
    "no": "902",
    "name": "부분품(공업용이나 실험실용 전기식 노와 오븐, 전자유도식이나 유전손실식 가열기의 것)",
    "spec": "Parts for Industrial or Laboratory Electric Furnaces and Ovens; Parts for Industrial or Laboratory Induction or Dielectric Heating Equipment, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8514.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1023",
    "no": "903",
    "name": "전기식 납땜용 인두와 건(gun)",
    "spec": "Electric Soldering Irons and Guns.",
    "relatedAnnex2": "-",
    "country": "8515.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1024",
    "no": "904",
    "name": "그 밖의 전기식 땜질용이나 납땜용기기",
    "spec": "Electric Brazing or Soldering Machines or Appartaus, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8515.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1025",
    "no": "905",
    "name": "전기식 금속의 저항용접용 기기(전자동식이나 반자동식의 것)",
    "spec": "Electric Machines and Apparatus for Resistance Welding of Metal, Fully or Party Automatic.",
    "relatedAnnex2": "-",
    "country": "8515.21",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1026",
    "no": "906",
    "name": "전기식 금속의 저항용접용 기기(전자동식이나 반자동식은 제외한다)",
    "spec": "Electric Machines and Apparatus for Resistance Welding of Metal, Other Than Fully or Partly Automatic.",
    "relatedAnnex2": "-",
    "country": "8515.29",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1027",
    "no": "907",
    "name": "전기식 금속의 아크[플라즈마 아크(plasma arc)를 포함한다] 용접기기(자동식이나 반자동식의 것)",
    "spec": "Electric Machines and Apparatus for Arc (Including Plazma Arc) Welding of Metals, Fully or Party Automatic",
    "relatedAnnex2": "-",
    "country": "8515.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1028",
    "no": "908",
    "name": "전기식 금속의 아크[플라즈마 아크(plasma arc)를 포함한다] 용접기기(자동식이나 반자동식은 제외한다)",
    "spec": "Electric Machines and Apparatus for Arc (Including Plazma Arc) Welding of Metals, Other Than Fully or Partly Automatic",
    "relatedAnnex2": "-",
    "country": "8515.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1029",
    "no": "909",
    "name": "기타 전기식 레이저ㆍ초음파식 등의 땜질용이나 용접용 기기, 금속이나 소결된 금속탄화물의 가열분사용 기타 전기식 기기",
    "spec": "Electric, Laser, Ultrasonic Etc. Brazing or Welding Machines Nesoi; Electric Machines for Hot Spraying of Metals or Sintered Metal Carbides, Nesoi",
    "relatedAnnex2": "-",
    "country": "8515.80",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1030",
    "no": "910",
    "name": "부분품(기타 전기식 레이저ㆍ초음파식 등의 땜질용이나 용접용 기기, 금속이나 소결된 금속탄화물의 가열분사용 기타 전기식 기기)",
    "spec": "Parts for Electric Laser, Ultrasonic Etc. Welding Etc. Machines; Parts for Electric Machines for Hot Spraying of Metals or Sintered Metal Carbides",
    "relatedAnnex2": "-",
    "country": "8515.90",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1031",
    "no": "911",
    "name": "저장식 가열 라디에이터(전기식의 것)",
    "spec": "Electric Storage Heating Radiators.",
    "relatedAnnex2": "-",
    "country": "8516.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1032",
    "no": "912",
    "name": "스마트폰",
    "spec": "Smartphones",
    "relatedAnnex2": "-",
    "country": "8517.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1033",
    "no": "913",
    "name": "그 밖의 전화기(셀룰러 통신망용이나 그 밖의 무선통신망용으로 한정한다)",
    "spec": "Telephones for Cellular Networks or for Other Wireless Networks",
    "relatedAnnex2": "-",
    "country": "8517.14",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1034",
    "no": "914",
    "name": "기지국",
    "spec": "Base Stations",
    "relatedAnnex2": "-",
    "country": "8517.61",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1035",
    "no": "915",
    "name": "음성·영상이나 그 밖의 자료의 수신용·변환용·송신용·재생용 기기[교환기와 라우팅(routing)기기를 포함한다]",
    "spec": "Machines for The Reception, Conversion and Transmission or Regeneration of Voice, Images or Other Data, Including Switching and Routing Apparatus",
    "relatedAnnex2": "-",
    "country": "8517.62",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1036",
    "no": "916",
    "name": "음성·영상이나 그 밖의 자료의 수신용·송신용·재생용 기기[교환기와 라우팅(routing)기기를 포함한다]",
    "spec": "Apparatus for The Transmission or Reception of Voice, Images or Other Data, Including Switching and Routing Apparatus, Nesoi",
    "relatedAnnex2": "-",
    "country": "8517.69",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1037",
    "no": "917",
    "name": "각종 안테나와 반사식 안테나, 그 부분품",
    "spec": "Aerials and Aerial Reflectors of All Kinds; Parts Suitable for Use Therewith",
    "relatedAnnex2": "-",
    "country": "8517.71",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1038",
    "no": "918",
    "name": "부분품(전화기와 음성·영상이나 그 밖의 자료의 수신용·송신용 기기의 것)",
    "spec": "Parts of Telephone Sets and Other Apparatus for The Transmission or Reception of Voice, Images or Other Data.",
    "relatedAnnex2": "-",
    "country": "8517.79",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1039",
    "no": "919",
    "name": "가청주파증폭기",
    "spec": "Audio-Frequency Electric Amplifiers",
    "relatedAnnex2": "-",
    "country": "8518.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1040",
    "no": "920",
    "name": "음향증폭세트",
    "spec": "Electric Sound Amplifier Sets",
    "relatedAnnex2": "-",
    "country": "8518.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1041",
    "no": "921",
    "name": "부분품(마이크로폰, 확성기, 헤드폰과 이어폰, 가청주파증폭기, 음향증폭 세트의 것)",
    "spec": "Parts of Microphones, Loudspeakers, Headphones, Earphones, Audio-Frequency Electric Amplifiers, and Electric Sound Amplifier Sets",
    "relatedAnnex2": "-",
    "country": "8518.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1042",
    "no": "922",
    "name": "음성이나 그 밖의 현상 기록용 기타 자기식 매체",
    "spec": "Magnetic Media for The Recording of Sound or Other Phenomena, Nesoi",
    "relatedAnnex2": "-",
    "country": "8523.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1043",
    "no": "923",
    "name": "음성이나 그 밖의 현상 기록용 광학식 매체(기록되지 않은 것으로 한정한다)",
    "spec": "Optical Media for The Recording of Sound or of Other Phenomena, Unrecorded",
    "relatedAnnex2": "-",
    "country": "8523.41",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1044",
    "no": "924",
    "name": "음성이나 그 밖의 현상 기록용 광학식 매체(기록된 것으로 한정한다)",
    "spec": "Optical Media for The Recording of Sound or of Other Phenomena, Recorded",
    "relatedAnnex2": "-",
    "country": "8523.49",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1045",
    "no": "925",
    "name": "솔리드 스테이트(solid-state)의 비휘발성 기억장치",
    "spec": "Solid-State Non-Volatile Semiconductor Storage Devices.",
    "relatedAnnex2": "-",
    "country": "8523.51",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1046",
    "no": "926",
    "name": "음성이나 그 밖의 현상 기록용 기타 반도체 매체",
    "spec": "Semiconductor Media, for The Recording of Sound or Other Phenomena, Nesoi",
    "relatedAnnex2": "-",
    "country": "8523.59",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1047",
    "no": "927",
    "name": "음성이나 그 밖의 현상 기록용 기타 매체",
    "spec": "Media for The Recording of Sound or of Other Phenomena, Nesoi",
    "relatedAnnex2": "-",
    "country": "8523.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1048",
    "no": "928",
    "name": "그 밖의 구동장치나 제어회로가 없는 평판 디스플레이 모듈(터치감응식 스크린을 장착한 것인지 상관없다)",
    "spec": "Other Flat panel display modules, Without drivers or control circuits whether or not incorporating touch-sensitive screens.",
    "relatedAnnex2": "-",
    "country": "8524.19",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1049",
    "no": "929",
    "name": "라디오 방송용이나 텔레비전용 송신기기",
    "spec": "Transmission Apparatus for Radio-Broadcasting or Television.",
    "relatedAnnex2": "-",
    "country": "8525.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1050",
    "no": "930",
    "name": "라디오 방송용이나 텔레비전용 송신기기(수신기기를 갖춘 것)",
    "spec": "Transmission Apparatus Incorporating Reception Apparatus, for Radio-Broadcasting or Television",
    "relatedAnnex2": "-",
    "country": "8525.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1051",
    "no": "931",
    "name": "이 류의 소호주 제1호에 규정된 고속 카메라",
    "spec": "High-Speed Goods As Specified In Subheading Note 1 to This Chapter",
    "relatedAnnex2": "-",
    "country": "8525.81",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1052",
    "no": "932",
    "name": "기타[이 류의 소호주 제2호에 규정된 방사선 강화ㆍ내(耐)방사선 카메라로 한정한다]",
    "spec": "Other, Radiation-Hardened or Radiation-Tolerant Goods As Specified In Subheading Note 2 to This Chapter",
    "relatedAnnex2": "-",
    "country": "8525.82",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1053",
    "no": "933",
    "name": "기타(이 류의 소호주 제3호에 규정된 야간투시 카메라로 한정한다)",
    "spec": "Other, Night Vision Goods As Specified In Subheading Note 3 to This Chapter",
    "relatedAnnex2": "-",
    "country": "8525.83",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1054",
    "no": "934",
    "name": "텔레비전 카메라·디지털 카메라·비디오카메라레코더",
    "spec": "Television Cameras, Digital Cameras and Video Camera Recorders.",
    "relatedAnnex2": "-",
    "country": "8525.89",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1055",
    "no": "935",
    "name": "레이더 기기",
    "spec": "Radar Apparatus.",
    "relatedAnnex2": "-",
    "country": "8526.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1056",
    "no": "936",
    "name": "항행용 무선기기",
    "spec": "Radio Navigational Aid Apparatus",
    "relatedAnnex2": "-",
    "country": "8526.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1057",
    "no": "937",
    "name": "무선원격조절기기",
    "spec": "Radio Remote Control Apparatus.",
    "relatedAnnex2": "-",
    "country": "8526.92",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1058",
    "no": "938",
    "name": "텔레비전 수신용 기기를 갖추지 않은 기타 음극선관 모니터",
    "spec": "Cathode-Ray Tube Monitors, Not Incorporating Television Reception Apparatus, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8528.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1059",
    "no": "939",
    "name": "그 밖의 모니터(텔레비전 수신용 기기를 갖추지 않은 것으로 한정한다)",
    "spec": "Monitors, Not Incorporating Television Reception Apparatus, Nesoi",
    "relatedAnnex2": "-",
    "country": "8528.59",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1060",
    "no": "940",
    "name": "각종 안테나와 반사식 안테나, 그 부분품",
    "spec": "Antennas and Antenna Reflectors and Parts Thereof.",
    "relatedAnnex2": "-",
    "country": "8529.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1061",
    "no": "941",
    "name": "부분품(라디오 송신용, 레이더용, 항행용 무선기기용, 텔레비전 수신용의 것으로 한정하며, 안테나와 반사식 안테나는 제외한다)",
    "spec": "Parts (Except Antennas and Reflectors) for Use with Radio Transmission, Radar, Radio Navigational Aid, Reception and Television Apparatus, Nesoi",
    "relatedAnnex2": "-",
    "country": "8529.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1062",
    "no": "942",
    "name": "철도·전차 노선·지하철에서 사용되는 전기식 신호기기·안전기기·교통관제기기",
    "spec": "Electrical Signaling, Safety or Traffic Control Equipment for Railways, Streetcar Lines or Subways.",
    "relatedAnnex2": "-",
    "country": "8530.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1063",
    "no": "943",
    "name": "철도·궤도·도로·내륙수로·주차장·항만·비행장에서 사용되는 전기식 신호기기·안전기기·교통관제기기",
    "spec": "Electrical Signaling, Safety or Traffic Control Equipment for Roads, Inland Waterways, Parking Facilities, Port Installations or Airfields.",
    "relatedAnnex2": "-",
    "country": "8530.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1064",
    "no": "944",
    "name": "부분품(철도·궤도·도로·내륙수로·주차장·항만·비행장에서 사용되는 전기식 신호기기·안전기기·교통관제기기의 것)",
    "spec": "Parts for Electrical Signaling, Safety or Traffic Control Equipment for Rail Lines, Roads, Waterways, Parking Areas, Port Installations or Airfields.",
    "relatedAnnex2": "-",
    "country": "8530.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1065",
    "no": "945",
    "name": "고정식 축전기로 50/60헤르츠 회로에서 사용하고, 무효(無效)전력 용량이 0.5킬로바르 이상인 것(전력용 축전기)",
    "spec": "Fixed Capacitors, Designed for Use In 50/60 HZ Circuits, with Reactive Power Capacity Not Less Than 0.5 KVAR (Power Capacitors).",
    "relatedAnnex2": "-",
    "country": "8532.10",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1066",
    "no": "946",
    "name": "탄탈륨 축전기",
    "spec": "Tantalum Capacitors.",
    "relatedAnnex2": "-",
    "country": "8532.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1067",
    "no": "947",
    "name": "알루미늄 전해의 고정식 축전기",
    "spec": "Fixed Capacitors Nesoi, Aluminum Electrolytic",
    "relatedAnnex2": "-",
    "country": "8532.22",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1068",
    "no": "948",
    "name": "세라믹 유전체(단층)의 고정식 축전기",
    "spec": "Fixed Capacitors Nesoi, Single Layer Ceramic Dielectric",
    "relatedAnnex2": "-",
    "country": "8532.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1069",
    "no": "949",
    "name": "세라믹 유전체의 것(다층)",
    "spec": "Fixed Capacitors Nesoi, Multilayer Ceramic Dielectric.",
    "relatedAnnex2": "-",
    "country": "8532.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1070",
    "no": "950",
    "name": "종이나 플라스틱 유전체의 고정식 축전기",
    "spec": "Fixed Capacitors Nesoi, Dielectric of Paper or Plastics",
    "relatedAnnex2": "-",
    "country": "8532.25",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1071",
    "no": "951",
    "name": "그 밖의 고정식 축전기",
    "spec": "Fixed Capacitors, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8532.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1072",
    "no": "952",
    "name": "가변식·조정식(프리세트) 축전기",
    "spec": "Variable or Adjustable (Pre-Set) Capacitors.",
    "relatedAnnex2": "-",
    "country": "8532.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1073",
    "no": "953",
    "name": "축전기의 부분품",
    "spec": "Parts for Electrical Capacitors.",
    "relatedAnnex2": "-",
    "country": "8532.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1074",
    "no": "954",
    "name": "그 밖의 고정식 저항기(용량이 20와트 초과인 것으로 한정한다)",
    "spec": "Fixed Resistors, Nesoi, for A Power Handling Capacity Exceeding 20 W.",
    "relatedAnnex2": "-",
    "country": "8533.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1075",
    "no": "955",
    "name": "부분품[전기저항기(가감저항기와 전위차계를 포함한다)의 것]",
    "spec": "Parts for Electrical Resistors, Including Parts for Rheostats and Potentiometers.",
    "relatedAnnex2": "-",
    "country": "8533.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1076",
    "no": "956",
    "name": "인쇄회로",
    "spec": "Printed Circuits.",
    "relatedAnnex2": "-",
    "country": "8534.00",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1077",
    "no": "957",
    "name": "퓨즈(전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Fuses for Electrical Apparatus for A Voltage Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8535.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1078",
    "no": "958",
    "name": "자동차단기(전압이 72.5킬로볼트 이상인 것으로 한정한다)",
    "spec": "Automatic Circuit Breakers for A Voltage of 72.5 KV or More.",
    "relatedAnnex2": "-",
    "country": "8535.29",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1079",
    "no": "959",
    "name": "격리용 개폐기와 회로단속용 개폐기(전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Isolating Switches and Make-And-Break Switches for A Voltage Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8535.30",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1080",
    "no": "960",
    "name": "피뢰기·전압제한기와 서지(surge)억제기(전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Lightning Arresters, Voltage Limiters, and Surge Suppressors for A Voltage Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8535.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1081",
    "no": "961",
    "name": "기타 전기회로의 개폐용·보호용·접속용 기기(전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Electrical Apparatus for Switching, Protecting or Making Connections to or In Electrical Circuits, for A Voltage Exceeding 1,000 V, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8535.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1082",
    "no": "962",
    "name": "계전기(전압이 60볼트 이하인 것으로 한정한다)",
    "spec": "Relays for A Voltage Not Exceeding 60 V",
    "relatedAnnex2": "-",
    "country": "8536.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1083",
    "no": "963",
    "name": "그 밖의 개폐기(전압이 1,000볼트 이하인 것으로 한정한다)",
    "spec": "Electrical Switches for A Voltage Not Exceeding 1,000 V, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8536.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1084",
    "no": "964",
    "name": "플러그와 소켓(전압이 1,000볼트 이하인 것으로 한정한다)",
    "spec": "Electrical Plugs and Sockets for A Voltage Not Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8536.69",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1085",
    "no": "965",
    "name": "기타 전기회로의 개폐용·보호용·접속용 기기(전압이 1,000볼트 이하인 것으로 한정한다)",
    "spec": "Electrical Apparatus for Switching, Protecting or Making Connections to or In Electrical Circuits, for A Voltage Not Exceeding 1,000 V, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8536.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1086",
    "no": "966",
    "name": "전기제어용이나 배전용 보드·패널·콘솔 등(전기 기기를 장착한 것으로서 전압이 1,000볼트 이하인 것으로 한정한다)",
    "spec": "Boards, Panels, Consoles, Etc. with Electrical Apparatus, for Electric Control or Distribution of Electricity, for A Voltage Not Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8537.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1087",
    "no": "967",
    "name": "전기제어용이나 배전용 보드·패널·콘솔 등(전기 기기를 장착한 것으로서 전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Boards, Panels, Consoles, Etc. with Electrical Apparatus, for Electric Control or Distribution of Electricity, for A Voltage Exceeding 1,000 V",
    "relatedAnnex2": "-",
    "country": "8537.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1088",
    "no": "968",
    "name": "전기 제어 등을 위한 보드·패널·콘솔·책상·캐비닛과 그 밖의 기반(基盤)(이들 기기를 장착하여 조립한 것은 제외한다)",
    "spec": "Boards, Panels, Consoles, Desks, Cabinets, and Other Bases for Electric Control Etc. Equipment, Not Equipped with Electrical Apparatus.",
    "relatedAnnex2": "-",
    "country": "8538.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1089",
    "no": "969",
    "name": "전기 제어 또는 배전을 위한 전기 회로, 보드, 패널 등의 전기 기기용 부품",
    "spec": "Parts for Electrical Apparatus for Electrical Circuits, Boards, Panels Etc. for Electric Control or Distribution of Electricity, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8538.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1090",
    "no": "970",
    "name": "방전램프(자외선램프는 제외한다), 형광램프(열음극형으로 한정한다)",
    "spec": "Electric Discharge Lamps (Other Than Ultraviolet Lamps), Fluorescent, Hot Cathode",
    "relatedAnnex2": "-",
    "country": "8539.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1091",
    "no": "971",
    "name": "수은램프나 나트륨증기 램프, 메탈 할라이드(metal halide) 램프",
    "spec": "Mercury or Sodium Vapor Discharge Lamps; Metal Halide Discharge Lamps",
    "relatedAnnex2": "-",
    "country": "8539.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1092",
    "no": "972",
    "name": "그 밖의 방전램프(자외선램프와 열음극형 램프는 제외한다)",
    "spec": "Electric Discharge Lamps (Other Than Ultraviolet or Fluorescent, Hot Cathode Lamps), Nesoi.",
    "relatedAnnex2": "-",
    "country": "8539.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1093",
    "no": "973",
    "name": "아크 램프",
    "spec": "Arc Lamps.",
    "relatedAnnex2": "-",
    "country": "8539.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1094",
    "no": "974",
    "name": "자외선 램프나 적외선 램프",
    "spec": "Ultraviolet or Infrared Lamps",
    "relatedAnnex2": "-",
    "country": "8539.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1095",
    "no": "975",
    "name": "그 밖의 전기램프와 조명장치",
    "spec": "Electric Lamps and Lighting Fittings, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8539.51",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1096",
    "no": "976",
    "name": "발광다이오드 램프",
    "spec": "Light-Emitting Diode (Led) Lamps.",
    "relatedAnnex2": "-",
    "country": "8539.52",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1097",
    "no": "977",
    "name": "필라멘트램프나 방전램프, 아크램프의 부분품",
    "spec": "Parts for Electric Filament, Discharge or Arc Lamps",
    "relatedAnnex2": "-",
    "country": "8539.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1098",
    "no": "978",
    "name": "텔레비전용 천연색 음극선관(영상 모니터용 음극선관을 포함한다)",
    "spec": "Cathode-Ray Television Picture Tubes, Color, Including Video Monitor Cathode-Ray Tubes",
    "relatedAnnex2": "-",
    "country": "8540.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1099",
    "no": "979",
    "name": "텔레비전용 단색 음극선관(영상 모니터용 음극선관을 포함한다)",
    "spec": "Cathode-Ray Television Picture Tubes, Including Video Monitor Cathode-Ray Tubes, Monochrome",
    "relatedAnnex2": "-",
    "country": "8540.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1100",
    "no": "980",
    "name": "텔레비전용 촬상관(camera tube), 영상변환관, 영상증강관(image intensifier), 그 밖의 광전관(photocathode tube)",
    "spec": "Television Camera Tubes; Image Converters and Intensifiers; Other Photocathode Tubes.",
    "relatedAnnex2": "-",
    "country": "8540.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1101",
    "no": "981",
    "name": "그 밖의 음극선관",
    "spec": "Cathode-Ray Tubes, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "8540.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1102",
    "no": "982",
    "name": "자전관",
    "spec": "Magnetron Microwave Tubes.",
    "relatedAnnex2": "-",
    "country": "8540.71",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1103",
    "no": "983",
    "name": "그 밖의 마이크로웨이브관",
    "spec": "Microwave Tubes, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8540.79",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1104",
    "no": "984",
    "name": "수신관이나 증폭관",
    "spec": "Receiver or Amplifier Tubes.",
    "relatedAnnex2": "-",
    "country": "8540.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1105",
    "no": "985",
    "name": "열전자관과 그 밖의 음극관",
    "spec": "Thermionic and Other Cathode Tubes, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8540.89",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1106",
    "no": "986",
    "name": "음극선관의 부분품",
    "spec": "Parts of Cathode-Ray Tubes.",
    "relatedAnnex2": "-",
    "country": "8540.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1107",
    "no": "987",
    "name": "기타 음극관의 부분품",
    "spec": "Parts of Cathode Tubes, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8540.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1108",
    "no": "988",
    "name": "다이오드(감광성 다이오드나 발광다이오드는 제외한다)",
    "spec": "Diodes, Other Than Photosensitive or Light-Emitting Diodes.",
    "relatedAnnex2": "-",
    "country": "8541.10",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1109",
    "no": "989",
    "name": "트랜지스터(감광성 트랜지스터는 제외하고, 전력 낭비율이 1와트 미만인 것)",
    "spec": "Transistors, Other Than Photosensitive, with A Dissipation Rate of Less Than 1 W.",
    "relatedAnnex2": "-",
    "country": "8541.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1110",
    "no": "990",
    "name": "그 밖의 트랜지스터(감광성 트랜지스터는 제외한다)",
    "spec": "Transistors, Other Than Photosensitive, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8541.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1111",
    "no": "991",
    "name": "사이리스터(thyristor), 다이액(diac), 트라이액(triac)(감광성 디바이스는 제외한다)",
    "spec": "Thyristors, Diacs and Triacs, Other Than Photosensitive Devices.",
    "relatedAnnex2": "-",
    "country": "8541.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1112",
    "no": "992",
    "name": "발광다이오드(엘이디)",
    "spec": "Light-Emitting Diodes (Led)",
    "relatedAnnex2": "-",
    "country": "8541.41",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1113",
    "no": "993",
    "name": "광전지(모듈에 조립되었거나 패널로 구성된 것은 제외한다)",
    "spec": "Photovoltaic Cells Not Assembled In Modules or Made Up Into Panels",
    "relatedAnnex2": "-",
    "country": "8541.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1114",
    "no": "994",
    "name": "광전지(모듈에 조립되었거나 패널로 구성된 것으로 한정한다)",
    "spec": "Photovoltaic Cells Assembled In Modules or Made Up Into Panels",
    "relatedAnnex2": "-",
    "country": "8541.43",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1115",
    "no": "995",
    "name": "감광성 반도체 디바이스(광전지와 발광다이오드를 포함한다)",
    "spec": "Photosensitive Semiconductor Devices, Including Photovoltaic Cells; Light-Emitting Diodes.",
    "relatedAnnex2": "-",
    "country": "8541.49",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1116",
    "no": "996",
    "name": "반도체 기반 트랜스듀서(감광성 반도체 디바이스와 광전지는 제외한다)",
    "spec": "Semiconductor-Based Transducers, Except Photosensitive and Photovoltaic Cells, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8541.51",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1117",
    "no": "997",
    "name": "그 밖의 반도체 디바이스(감광성 반도체 디바이스와 광전지는 제외한다)",
    "spec": "Semiconductor Devices, Except Photosensitive and Photovoltaic Cells, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8541.59",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1118",
    "no": "998",
    "name": "장착된 압전기 결정소자",
    "spec": "Mounted Piezoelectric Crystals.",
    "relatedAnnex2": "-",
    "country": "8541.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1119",
    "no": "999",
    "name": "다이오드, 트랜지스터와 이와 유사한 반도체 디바이스의 부분품, 감광성 반도체 디바이스와 장착된 압전기 결정소자의 부분품",
    "spec": "Parts for Diodes, Transistors and Similar Semiconductor Devices; Parts for Photosensitive Semiconductor Devices and Mounted Piezoelectric Crystals.",
    "relatedAnnex2": "-",
    "country": "8541.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1120",
    "no": "1000",
    "name": "프로세서와 컨트롤러[메모리·변환기·논리회로를 갖춘 것인지는 상관없다]",
    "spec": "Processors and Controllers, Electronic Integrated Circuits.",
    "relatedAnnex2": "-",
    "country": "8542.31",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1121",
    "no": "1001",
    "name": "메모리",
    "spec": "Memories, Electronic Integrated Circuits.",
    "relatedAnnex2": "-",
    "country": "8542.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1122",
    "no": "1002",
    "name": "증폭기",
    "spec": "Amplifiers, Electronic Integrated Circuits.",
    "relatedAnnex2": "-",
    "country": "8542.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1123",
    "no": "1003",
    "name": "기타 전자집적회로",
    "spec": "Electronic Integrated Circuits, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8542.39",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1124",
    "no": "1004",
    "name": "전자집적회로의 부분품",
    "spec": "Parts for Electronic Integrated Circuits and Microassemblies.",
    "relatedAnnex2": "-",
    "country": "8542.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1125",
    "no": "1005",
    "name": "입자가속기",
    "spec": "Particle Accelerators.",
    "relatedAnnex2": "-",
    "country": "8543.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1126",
    "no": "1006",
    "name": "신호발생기",
    "spec": "Electrical Signal Generators.",
    "relatedAnnex2": "-",
    "country": "8543.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1127",
    "no": "1007",
    "name": "전기도금용·전기분해용·전기영동(泳動)용 기기",
    "spec": "Electrical Machines and Apparatus for Electroplating, Electrolysis or Electrophoresis.",
    "relatedAnnex2": "-",
    "country": "8543.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1128",
    "no": "1008",
    "name": "그 밖의 전기기기(고유의 기능을 가진 것으로 한정한다)",
    "spec": "Electrical Machines and Apparatus, Having Individual Functions, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8543.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1129",
    "no": "1009",
    "name": "부분품(고유의 기능을 가진 기타 전기기기의 것)",
    "spec": "Parts for Electrical Machines and Apparatus Having Individual Functions, Nesoi",
    "relatedAnnex2": "-",
    "country": "8543.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1130",
    "no": "1010",
    "name": "구리로 만든 절연 권선용 전선",
    "spec": "Insulated Winding Wire of Copper.",
    "relatedAnnex2": "-",
    "country": "8544.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1131",
    "no": "1011",
    "name": "점화용 와이어링 세트와 그 밖의 와이어링 세트(자동차용·항공기용·선박용으로 한정한다)",
    "spec": "Insulated Ignition Wiring Sets and Other Wiring Sets for Vehicles, Aircraft and Ships.",
    "relatedAnnex2": "-",
    "country": "8544.30",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1132",
    "no": "1012",
    "name": "전기절연도체(전압이 80볼트 이하인 것으로서 접속자가 부착되어 있지 않은 것으로 한정한다)",
    "spec": "Insulated Electric Conductors, for A Voltage Not Exceeding 80 V, Not Fitted with Connectors.",
    "relatedAnnex2": "-",
    "country": "8544.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1133",
    "no": "1013",
    "name": "전기절연도체(전압이 1,000볼트 초과인 것으로 한정한다)",
    "spec": "Insulated Electric Conductors, for A Voltage Exceeding 1,000 V.",
    "relatedAnnex2": "-",
    "country": "8544.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1134",
    "no": "1014",
    "name": "절연 광섬유 케이블(섬유를 개별 피복하여 만든 것으로 한정한다)",
    "spec": "Insulated Optical Fiber Cables, Made Up of Individually Sheathed Fibers.",
    "relatedAnnex2": "-",
    "country": "8544.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1135",
    "no": "1015",
    "name": "노용 탄소 전극",
    "spec": "Carbon Electrodes of A Kind Used for Furnaces",
    "relatedAnnex2": "-",
    "country": "8545.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1136",
    "no": "1016",
    "name": "그 밖의 탄소 전극",
    "spec": "Carbon Electrodes Nesoi",
    "relatedAnnex2": "-",
    "country": "8545.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1137",
    "no": "1017",
    "name": "전기용 탄소 또는 흑연 브러시",
    "spec": "Electrical Carbon or Graphite Brushes.",
    "relatedAnnex2": "-",
    "country": "8545.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1138",
    "no": "1018",
    "name": "전기용 탄소와 그 밖의 흑연제품",
    "spec": "Electrical Carbon or Graphite Articles, Nesoi",
    "relatedAnnex2": "-",
    "country": "8545.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1139",
    "no": "1019",
    "name": "전기기기용으로서 도자제의 절연용 물품",
    "spec": "Insulating Fittings of Ceramics, for Electrical Machines or Appliances.",
    "relatedAnnex2": "-",
    "country": "8547.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1140",
    "no": "1020",
    "name": "전기기기용으로서 플라스틱으로 만든 절연용 물품",
    "spec": "Insulating Fittings of Plastics, for Electrical Machines or Appliances.",
    "relatedAnnex2": "-",
    "country": "8547.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1141",
    "no": "1021",
    "name": "전기기기용의 기타 절연용 물품, 비금속으로 만든 전기용 도관과 그 연결구류(절연재료로 만든 것으로 한정한다)",
    "spec": "Insulating Fittings Nesoi, for Electrical Machines or Appliances; Electrical Conduit Tubing and Joints, of Base Metal Lined with Insulating Material.",
    "relatedAnnex2": "-",
    "country": "8547.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1142",
    "no": "1022",
    "name": "기기의 전기식 부분품",
    "spec": "Electrical Parts of Machinery or Apparatus, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8548.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1143",
    "no": "1023",
    "name": "철도용 기관차(외부 전원으로 주행하는 것으로 한정한다)",
    "spec": "Rail Locomotives Powered From An External Source of Electricity.",
    "relatedAnnex2": "-",
    "country": "8601.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1144",
    "no": "1024",
    "name": "그 밖의 철도용 기관차와 탄수차(炭水車)",
    "spec": "Rail Locomotives, Nesoi; Locomotive Tenders.",
    "relatedAnnex2": "-",
    "country": "8602.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1145",
    "no": "1025",
    "name": "철도나 궤도의 유지용이나 보수용 차량[자주식(自走式)의 것인지에 상관없다][예: 공작차(workshop)·기중기차(crane)·밸러스트 템퍼(ballast tamper)·트랙라이너(trackliner) 등]",
    "spec": "Railway or Tramway Maintenance or Service Vehicles, Whether or Not Self-Propelled (For Example, Workshops, Cranes, Ballast Tampers, Trackliners, Etc.).",
    "relatedAnnex2": "-",
    "country": "8604.00",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1146",
    "no": "1026",
    "name": "철도용이나 궤도용 탱크차와 이와 유사한 차[자주식(自走式)은 제외한다]",
    "spec": "Railway or Tramway Tank Cars and The Like, Not Self-Propelled",
    "relatedAnnex2": "-",
    "country": "8606.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1147",
    "no": "1027",
    "name": "철도용이나 궤도용 자기양하식 화차[자주식(自走式)과 탱크차, 절연이나 냉장용의 화차를 제외한다]",
    "spec": "Railway or Tramway Self-Discharging Cars (Other Than Tank Cars and The Like or Insulated or Refrigerated Cars), Not Self-Propelled",
    "relatedAnnex2": "-",
    "country": "8606.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1148",
    "no": "1028",
    "name": "그 밖의 철도용이나 궤도용 화차[자주식(自走式)은 제외하며, 덮개가 있는 것으로서 밀폐되어 있는 것]",
    "spec": "Railway or Tramway Freight Cars, Covered and Closed, Not Self-Propelled, Nesoi",
    "relatedAnnex2": "-",
    "country": "8606.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1149",
    "no": "1029",
    "name": "그 밖의 철도용이나 궤도용 화차[자주식(自走式)은 제외하며, 덮개가 없는 것으로서 고정된 측면의 높이가 60센티미터를 초과하는 것]",
    "spec": "Railway or Tramway Freight Cars, Open, with Non-Removable Sides of A Height Exceeding 60 cm, Not Self-Propelled, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8606.92",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1150",
    "no": "1030",
    "name": "그 밖의 철도용이나 궤도용 화차[자주식(自走式)은 제외한다]",
    "spec": "Railway or Tramway Freight Cars, Not Self-Propelled, Nesoi",
    "relatedAnnex2": "-",
    "country": "8606.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1151",
    "no": "1031",
    "name": "압축점화식 피스톤 내연기관[디젤이나 세미디젤(semi-diesel)]만을 갖춘 세미트레일러(semi-trailer) 견인용 도로주행식 트랙터",
    "spec": "Road Tractors for Semi-Trailers With only compression-ignition internal combustion piston engine (diesel or semi-diesel)",
    "relatedAnnex2": "-",
    "country": "8701.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1152",
    "no": "1032",
    "name": "압축점화식 피스톤 내연기관[디젤이나 세미디젤(semi-diesel)]과 추진용 모터로서의 전동기를 둘 다 갖춘 세미트레일러(semi-trailer) 견인용 도로주행식 트랙터",
    "spec": "Road Tractors for Semi-Trailers With both compression-ignition internal combustion piston engine (diesel or semi-diesel) and electric motor as motors for propulsion",
    "relatedAnnex2": "-",
    "country": "8701.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1153",
    "no": "1033",
    "name": "불꽃점화식 피스톤 내연기관과 추진용 모터로서의 전동기를 둘 다 갖춘 세미트레일러(semi-trailer) 견인용 도로주행식 트랙터",
    "spec": "Road Tractors for Semi-Trailers With both spark-ignition internal combustion piston engine and electric motor as motors for propulsion",
    "relatedAnnex2": "-",
    "country": "8701.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1154",
    "no": "1034",
    "name": "추진용 전동기만 갖춘 세미트레일러(semi-trailer) 견인용 도로주행식 트랙터",
    "spec": "Road Tractors for Semi-Trailers With only electric motor for propulsion",
    "relatedAnnex2": "-",
    "country": "8701.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1155",
    "no": "1035",
    "name": "무한궤도식 트랙터",
    "spec": "Track-Laying Tractors",
    "relatedAnnex2": "-",
    "country": "8701.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1156",
    "no": "1036",
    "name": "설상(雪上) 주행용 차량, 골프용 차와 이와 유사한 차량",
    "spec": "Passenger Motor Vehicles Specially Designeed for Traveling on Snow; Golf Carts and Similar Vehicles.",
    "relatedAnnex2": "-",
    "country": "8703.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1157",
    "no": "1037",
    "name": "승용자동차 신차(불꽃점화식 왕복 피스톤 내연기관을 갖춘 것으로서 실린더용량이 2,000cc 초과 3,000cc 이하인 것)",
    "spec": "Passenger Motor Vehicles with Spark-Ignition Internal Combustion Reciprocating Piston Engine, Cylinder Capacity Over 2,000 cc But Not Over 3,000 cc",
    "relatedAnnex2": "-",
    "country": "8703.23.9010",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1158",
    "no": "1038",
    "name": "승용자동차 중고차(불꽃점화식 왕복 피스톤 내연기관을 갖춘 것으로서 실린더용량이 2,000cc 초과 3,000cc 이하인 것)",
    "spec": "Passenger Motor Vehicles with Spark-Ignition Internal Combustion Reciprocating Piston Engine, Cylinder Capacity Over 2,000 cc But Not Over 3,000 cc",
    "relatedAnnex2": "-",
    "country": "8703.23.9020",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1159",
    "no": "1039",
    "name": "승용자동차(불꽃점화식 왕복 피스톤 내연기관을 갖춘 것으로서 실린더용량이 3,000cc 초과인 것)",
    "spec": "Passenger Motor Vehicles with Spark-Ignition Internal Combustion Reciprocating Piston Engine, Cyclinder Capacity Over 3,000 cc",
    "relatedAnnex2": "-",
    "country": "8703.24",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1160",
    "no": "1040",
    "name": "승용자동차 신차[압축점화식 피스톤 내연기관(디젤)을 갖춘 것으로서 실린더용량이 2,000cc 초과 2,500cc이하인 것]",
    "spec": "Passenger Motor Vehicles with Compression-Ignition Internal Combustion Piston Engine (Diesel), Cylinder Capacity Over 2,000 cc But Not Over 2,500cc",
    "relatedAnnex2": "-",
    "country": "8703.32.9010",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1161",
    "no": "1041",
    "name": "승용자동차 중고차[압축점화식 피스톤 내연기관(디젤)을 갖춘 것으로서 실린더용량이 2,000cc 초과 2,500cc 이하인 것]",
    "spec": "Passenger Motor Vehicles with Compression-Ignition Internal Combustion Piston Engine (Diesel), Cylinder Capacity Over 2,000 cc But Not Over 2,500cc",
    "relatedAnnex2": "-",
    "country": "8703.32.9020",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1162",
    "no": "1042",
    "name": "승용자동차[압축점화식 피스톤 내연기관(디젤)을 갖춘 것으로서 실린더용량이 2,500cc 초과하는 것]",
    "spec": "Passenger Motor Vehicles with Compression-Ignition Internal Combustion Piston Engine (Diesel), Cylinder Capacity Over 2,500 cc",
    "relatedAnnex2": "-",
    "country": "8703.33",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1163",
    "no": "1043",
    "name": "승용자동차(불꽃점화식 내연기관과 전동기를 둘 다 갖춘 것으로서, 외부 전원에 플러그를 꽂아 충전할 수 있는 방식의 것은 제외한다)",
    "spec": "Passenger Motor Vehicles, with Both Aprk-Ig Intrnl Combust and Electric Motor, Other Than Those Charges By Pluggin to External Electric Power",
    "relatedAnnex2": "-",
    "country": "8703.40",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1164",
    "no": "1044",
    "name": "그 밖의 승용 차량[압축점화식 피스톤 내연기관(디젤이나 세미디젤)과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로서, 외부 전원에 플러그를 꽂아 충전할 수 있는 방식의 것은 제외한다]",
    "spec": "Motor Vehicles, with Both Compres-Ig Internal Combus Piston Engine (Diesel/Semi-Diesel) and Electric Motor,Not Charged By Plug",
    "relatedAnnex2": "-",
    "country": "8703.50",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1165",
    "no": "1045",
    "name": "그 밖의 승용 차량(불꽃점화식 내연기관과 전동기를 둘 다 갖춘 것으로서, 외부 전원에 플러그를 꽂아 충전할 수 있는 방식의 것으로 한정한다.)",
    "spec": "Motor Vehicles with Both Spark-Ig and Electric Motor, Capable of Charge By Plugging to Extnl Pwr",
    "relatedAnnex2": "-",
    "country": "8703.60",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1166",
    "no": "1046",
    "name": "그 밖의 승용 차량[압축점화식 피스톤 내연기관(디젤이나 세미디젤)과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로서, 외부 전원에 플러그를 꽂아 충전할 수 있는 방식의 것으로 한정한다]",
    "spec": "Motor Vehicles, with Both Compression-Ignition Internal Combustion (Diesel/Semi-Diesel and Electric Motor, Capable of Charged By Plugging",
    "relatedAnnex2": "-",
    "country": "8703.70",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1167",
    "no": "1047",
    "name": "그 밖의 추진용 전동기만을 갖춘 차량",
    "spec": "Motor Vehicles with Only Electric Motor,Nesoi",
    "relatedAnnex2": "-",
    "country": "8703.80",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1168",
    "no": "1048",
    "name": "그 밖의 승용자동차",
    "spec": "Passenger Motor Vehicles, Nesoi",
    "relatedAnnex2": "-",
    "country": "8703.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1169",
    "no": "1049",
    "name": "덤프차(비고속도로용으로 설계된 것으로 한정한다)",
    "spec": "Dumpers (Dump Trucks) Designed for Off-Highway Use.",
    "relatedAnnex2": "-",
    "country": "8704.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1170",
    "no": "1050",
    "name": "압축점화식 피스톤 내연기관(디젤)을 갖춘 그 밖의 화물자동차(총중량이 5톤 이하인 것)",
    "spec": "Motor Vehicles for Goods Transport Nesoi, with Compression-Ignition Internal Combustion Piston Engine (Diesel), Gvw Not Over 5 Metric Tons.",
    "relatedAnnex2": "-",
    "country": "8704.21",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1171",
    "no": "1051",
    "name": "압축점화식 피스톤 내연기관(디젤)을 갖춘 그 밖의 화물자동차(총중량이 5톤 초과 20톤 이하인 것)",
    "spec": "Motor Vehicles for Goods Transport Nesoi, with Compression-Ignition Internal Combustion Piston Engine (Diesel), Gvw Over 5 But Not Over 20 Metric Tons.",
    "relatedAnnex2": "-",
    "country": "8704.22",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1172",
    "no": "1052",
    "name": "압축점화식 피스톤 내연기관(디젤)을 갖춘 그 밖의 화물자동차(총중량이 20톤 초과인 것)",
    "spec": "Motor Vehicles for Goods Transport Nesoi, with Compression-Ignition Internal Combustion Piston Engine (Diesel), Gvw Over 20 Metric Tons.",
    "relatedAnnex2": "-",
    "country": "8704.23",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1173",
    "no": "1053",
    "name": "불꽃점화식 피스톤 내연기관을 갖춘 그 밖의 화물자동차(총중량이 5톤 이하인 것",
    "spec": "Motor Vehicles for Goods Transport Nesoi, with Spark-Ignition Internal Combustion Piston Engine, Gvw Not Over 5 Metric Tons",
    "relatedAnnex2": "-",
    "country": "8704.31",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1174",
    "no": "1054",
    "name": "불꽃점화식 피스톤 내연기관을 갖춘 그 밖의 화물자동차(총중량이 5톤 초과인 것",
    "spec": "Motor Vehicles for Goods Transport Nesoi, with Spark-Ignition Internal Combustion Piston Engine, Gvw Over 5 Metric Tons.",
    "relatedAnnex2": "-",
    "country": "8704.32",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1175",
    "no": "1055",
    "name": "총중량이 5톤 이하인 그 밖의 화물자동차[압축점화식 피스톤 내연기관(디젤이나 세미디젤(semi-diesel))과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로 한정한다]",
    "spec": "Other Motor vehicles for the transport of goods, with both compression-ignition internal combustion piston engine (diesel or semi-diesel) and electric motor as motors for propulsion, G.V.W. not exceeding 5 tonnes",
    "relatedAnnex2": "-",
    "country": "8704.41",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1176",
    "no": "1056",
    "name": "총중량이 5톤 초과 20톤 이하인 그 밖의 화물자동차[압축점화식 피스톤 내연기관(디젤이나 세미디젤(semi-diesel))과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로 한정한다]",
    "spec": "Other Motor vehicles for the transport of goods, with both compression-ignition internal combustion piston engine (diesel or semi-diesel) and electric motor as motors for propulsion, G.V.W. Exceeding 5 Tonnes But Not Exceeding 20 Tonnes",
    "relatedAnnex2": "-",
    "country": "8704.42",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1177",
    "no": "1057",
    "name": "총중량이 20톤을 초과하는 그 밖의 화물자동차[압축점화식 피스톤 내연기관(디젤이나 세미디젤(semi-diesel))과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로 한정한다]",
    "spec": "Other Motor vehicles for the transport of goods, with both compression-ignition internal combustion piston engine (diesel or semi-diesel) and electric motor as motors for propulsion, G.V.W. Exceeding 20 Tonnes",
    "relatedAnnex2": "-",
    "country": "8704.43",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1178",
    "no": "1058",
    "name": "총중량이 5톤 이하인 그 밖의 화물자동차(불꽃점화식 피스톤 내연기관과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로 한정한다)",
    "spec": "Other Motor vehicles for the transport of goods, with both spark-ignition internal combustion piston engine and electric motor as motors for propulsion, G.V.W. Not Exceeding 5 Tonnes",
    "relatedAnnex2": "-",
    "country": "8704.51",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1179",
    "no": "1059",
    "name": "총중량이 5톤을 초과하는 그 밖의 화물자동차(불꽃점화식 피스톤 내연기관과 추진용 모터로서의 전동기를 둘 다 갖춘 것으로 한정한다)",
    "spec": "Other Motor vehicles for the transport of goods, with both spark-ignition internal combustion piston engine and electric motor as motors for propulsion, G.V.W. Exceeding 5 Tonnes",
    "relatedAnnex2": "-",
    "country": "8704.52",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1180",
    "no": "1060",
    "name": "기타(추진용 전동기만을 갖춘 것으로 한정한다)",
    "spec": "Other with Only Electric Motor for Propulsion",
    "relatedAnnex2": "-",
    "country": "8704.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1181",
    "no": "1061",
    "name": "그 밖의 화물자동차",
    "spec": "Motor Vehicles for The Transport of Goods, Nesoi",
    "relatedAnnex2": "-",
    "country": "8704.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1182",
    "no": "1062",
    "name": "기중기차",
    "spec": "Mobile Cranes.",
    "relatedAnnex2": "-",
    "country": "8705.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1183",
    "no": "1063",
    "name": "이동식 시추용 데릭차",
    "spec": "Mobile Drilling Derricks",
    "relatedAnnex2": "-",
    "country": "8705.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1184",
    "no": "1064",
    "name": "그 밖의 특수용도차량(주로 사람이나 화물 수송용으로 설계된 것은 제외한다)",
    "spec": "Special Purpose Vehicles, Other Than Those Principally Designed for The Transport of Persons or Goods, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8705.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1185",
    "no": "1065",
    "name": "엔진을 갖춘 섀시(제8701호부터 제8705호까지의 자동차용으로 한정한다.)",
    "spec": "Chassis fitted with engines, for the motor vehicles of headings 8701 to 8705",
    "relatedAnnex2": "-",
    "country": "8706.00",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1186",
    "no": "1066",
    "name": "차체(운전실을 포함하며, 제8703호의 차량용으로 한정한다.)",
    "spec": "Bodies (including cabs), for the motor vehicles of headings 8703.",
    "relatedAnnex2": "-",
    "country": "8707.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1187",
    "no": "1067",
    "name": "그 밖의 자동차의 부분품",
    "spec": "Parts and Accessories for Motor Vehicles, Nesoi",
    "relatedAnnex2": "-",
    "country": "8708.99",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1188",
    "no": "1068",
    "name": "공장 등에서 화물의 권양(捲揚)용이나 취급용 장비가 결합되지 않은 자주식(自走式) 작업차와 철도역의 플랫폼에서 사용하는 형의 트랙터(전기식의 것)",
    "spec": "Works Trucks (Not Lifting or Handling) Used In Factories Etc. and Tractors Used on Railway Station Platforms, Electrical.",
    "relatedAnnex2": "-",
    "country": "8709.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1189",
    "no": "1069",
    "name": "부분품[공장 등에서 화물의 권양(捲揚)용이나 취급용 장비가 결합되지 않은 자주식(自走式) 작업차, 철도역의 플랫폼에서 사용하는 형의 트랙터의 것]",
    "spec": "Parts for Works Trucks (Not Lifting or Handling) Used In Factories Etc. and Parts of Tractors of The Type Used on Railway Station Platforms.",
    "relatedAnnex2": "-",
    "country": "8709.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1190",
    "no": "1070",
    "name": "농업용 자동적재식이나 자동양하식 트레일러와 세미트레일러",
    "spec": "Self-Loading or Self-Unloading Trailers and Semi-Trailers for Agricultural Purposes.",
    "relatedAnnex2": "-",
    "country": "8716.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1191",
    "no": "1071",
    "name": "화물수송용 그 밖의 트레일러와 세미트레일러",
    "spec": "Trailers and Semi-Trailers for The Transport of Goods, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8716.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1192",
    "no": "1072",
    "name": "비행기ㆍ헬리콥터ㆍ무인기의 그 밖의 부분품",
    "spec": "Other Parts of Aeroplanes, Helicopters or Unmanned Aircraft",
    "relatedAnnex2": "-",
    "country": "8807.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1193",
    "no": "1073",
    "name": "순항선, 유람선과 이와 유사한 선박(주로 사람 수송용으로 설계된 것), 각종 페리보트",
    "spec": "Cruise Ships, Excursion Boats and Similar Vessels Principally Designed for The Transport of Persons; Ferry Boats of All Kinds",
    "relatedAnnex2": "-",
    "country": "8901.10",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1194",
    "no": "1074",
    "name": "공기주입식 요트와 유람용 또는 운동용 선박 (노를 젓는 보트와 카누 포함) 로서 모터가 결합되었거나 결합되도록 설계된 것[짐을 싣지 않은 순중량(모터를 제외한다)이 100 킬로그램 이하인 것으로 한정한다]",
    "spec": "Inflatable Yachts and Vessels for Pleasure or Sports, Including Inflatable Row Boats and Canoes Fitted or designed to be fitted with a motor, unladen (net) weight (excluding the motor) not exceeding 100 kg",
    "relatedAnnex2": "-",
    "country": "8903.11",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1195",
    "no": "1075",
    "name": "공기주입식 요트와 유람용 또는 운동용 선박 (노를 젓는 보트와 카누 포함) 로서 모터를 사용하도록 설계되지 않은 것[짐을 싣지 않은 순중량이 100 킬로그램 이하인 것으로 한정한다]",
    "spec": "Inflatable Yachts and Vessels for Pleasure or Sports, Including Inflatable Row Boats and Canoes Not designed for use with a motor and unladen (net) weight not exceeding 100 kg",
    "relatedAnnex2": "-",
    "country": "8903.12",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1196",
    "no": "1076",
    "name": "그 밖의 공기주입식 요트와 유람용 또는 운동용 선박 (노를 젓는 보트와 카누 포함)",
    "spec": "Other Inflatable Yachts and Vessels for Pleasure or Sports, Including Inflatable Row Boats and Canoes",
    "relatedAnnex2": "-",
    "country": "8903.19",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1197",
    "no": "1077",
    "name": "7.5미터 이하인 범선(공기주입식을 제외하며, 보조모터를 부착하였는지에 상관없다.)",
    "spec": "Sailboats Of a length not exceeding 7.5 m, other than inflatable, with or without auxiliary motor",
    "relatedAnnex2": "-",
    "country": "8903.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1198",
    "no": "1078",
    "name": "길이가 7.5미터를 초과하고 24미터 이하인 범선(공기주입식을 제외하며, 보조모터를 부착하였는지에 상관없다.)",
    "spec": "Sailboats Of a length exceeding 7.5 m but not exceeding 24 m, other than inflatable, with or without auxiliary motor",
    "relatedAnnex2": "-",
    "country": "8903.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1199",
    "no": "1079",
    "name": "길이가 24미터를 초과하는 범선(공기주입식을 제외하며, 보조모터를 부착하였는지에 상관없다.)",
    "spec": "Sailboats Of a length exceeding 24 m, other than inflatable, with or without auxiliary motor",
    "relatedAnnex2": "-",
    "country": "8903.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1200",
    "no": "1080",
    "name": "길이가 7.5미터 이하인 모터보트[공기주입식을 제외하며, 아웃보드 모터보트(outboard motorboat)를 제외한다]",
    "spec": "Motorboats of A Length Not Exceeding 7.5 M, other than inflatable, not including outboard motorboats",
    "relatedAnnex2": "-",
    "country": "8903.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1201",
    "no": "1081",
    "name": "길이가 7.5미터를 초과하고 24미터 이하인 모터보트[공기주입식을 제외하며, 아웃보드 모터보트(outboard motorboat)를 제외한다]",
    "spec": "Motorboats of A Length Exceeding 7.5 M But Not Exceeding 24 M, other than inflatable, not including outboard motorboats",
    "relatedAnnex2": "-",
    "country": "8903.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1202",
    "no": "1082",
    "name": "길이가 24미터를 초과하는 모터보트[공기주입식을 제외하며, 아웃보드 모터보트(outboard motorboat)를 제외한다]",
    "spec": "Motorboats of A Length Exceeding 24 M, other than inflatable, not including outboard motorboats",
    "relatedAnnex2": "-",
    "country": "8903.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1203",
    "no": "1083",
    "name": "길이가 7.5 미터 이하인 기타 요트, 유람용이나 운동용 그 밖의 선박, 노를 젓는 보트와 카누",
    "spec": "Other Yachts and other vessels for pleasure or sports; rowing boats and canoes of A Length Not Exceeding 7.5 M",
    "relatedAnnex2": "-",
    "country": "8903.93",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1204",
    "no": "1084",
    "name": "그 밖의 요트, 유람용이나 운동용 그 밖의 선박, 노를 젓는 보트와 카누 (모터 또는 돛과 함께 사용되도록 제작되지 않은 것)",
    "spec": "Yachts and Other Vessels for Pleasure or Sports Nesoi; Row Boats and Canoes (Not Designed to be Principally Used with Motors or Sails) Nesoi",
    "relatedAnnex2": "-",
    "country": "8903.99",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1205",
    "no": "1085",
    "name": "물에 뜨거나 잠길 수 있는 시추대나 작업대",
    "spec": "Floating or Submersible Drilling or Production Platforms",
    "relatedAnnex2": "-",
    "country": "8905.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1206",
    "no": "1086",
    "name": "주기능이 아닌 항해 기능을 갖춘 조명선, 소방선, 기중기선 및 기타 선박 ; 부선거",
    "spec": "Light Vessels, Fire Floats, Floating Cranes and Other Vessels with Navigabiliity Not The Main Function, Nesoi; Floating Docks",
    "relatedAnnex2": "-",
    "country": "8905.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1207",
    "no": "1087",
    "name": "광섬유, 광섬유 다발과 광섬유 케이블",
    "spec": "Optical Fibers, Optical Fiber Bundles and Cables, Other Than Optical Fiber Cables Made Up of Individually Sheathed Fibers.",
    "relatedAnnex2": "-",
    "country": "9001.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1208",
    "no": "1088",
    "name": "장착되지 않은 렌즈(콘택트 및 안경용 제외), 프리즘, 반사경과 기타 광학소자(광학적으로 가공하지 않은 유리로 만든 것은 제외)",
    "spec": "Lenses (Except Contact and Spectacle), Prisms, Mirrors and Other Optical Elements, Unmounted, Other Than Elements of Glass Not Optically Worked",
    "relatedAnnex2": "-",
    "country": "9001.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1209",
    "no": "1089",
    "name": "카메라용, 영사기용, 사진 확대기용, 사진 축소기용 대물 렌즈와 부분품과 부속품",
    "spec": "Objective Lenses and Parts and Accessories Thereof for Cameras, Projectors or Photographic Enlargers or Reducers",
    "relatedAnnex2": "-",
    "country": "9002.11",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1210",
    "no": "1090",
    "name": "광학 필터 및 부분품과 부속품",
    "spec": "Optical Filters and Parts and Accessories Thereof for Instruments or Apparatus",
    "relatedAnnex2": "-",
    "country": "9002.20",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1211",
    "no": "1091",
    "name": "프리즘, 반사경과 기타 광학소자의 장착구와 부분품과 부속품",
    "spec": "Prisms, Mirrors and Other Optical Elements, Mounted, and Parts and Accessories Thereof, Nesoi",
    "relatedAnnex2": "-",
    "country": "9002.90",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1212",
    "no": "1092",
    "name": "수중촬영용, 공중측량용, 장기의 내과나 외과 검사용으로 특별히 설계된 사진기와 법정비교용 사진기",
    "spec": "Cameras Designed for Underwater Use, for Aerial Survey, or Medical/Surgical Examination of Internal Organs; Cameras for Forensic or Criminological Use.",
    "relatedAnnex2": "-",
    "country": "9006.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1213",
    "no": "1093",
    "name": "즉석인화 사진기",
    "spec": "Instant Print Cameras.",
    "relatedAnnex2": "-",
    "country": "9006.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1214",
    "no": "1094",
    "name": "폭이 35밀리미터인 롤필름용 카메라(1.4인치)",
    "spec": "Cameras (Still) Nesoi, for Roll Film of A Width of 35 mm (1.4 Inch).",
    "relatedAnnex2": "-",
    "country": "9006.53",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1215",
    "no": "1095",
    "name": "사진기(영화용 제외)",
    "spec": "Photographic Cameras (Other Than Cinematographic), Nesoi.",
    "relatedAnnex2": "-",
    "country": "9006.59",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1216",
    "no": "1096",
    "name": "사진용 섬광기구(전자식 방전램프)",
    "spec": "Photographic Discharge Lamp (Electronic) Flashlight Apparatus.",
    "relatedAnnex2": "-",
    "country": "9006.61",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1217",
    "no": "1097",
    "name": "사진용 섬광기구",
    "spec": "Photographic Flashlight Apparatus, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9006.69",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1218",
    "no": "1098",
    "name": "사진기용 부분품과 부속품(영화용 제외)",
    "spec": "Parts and Accessories for Photographic (Other Than Cinematographic) Cameras.",
    "relatedAnnex2": "-",
    "country": "9006.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1219",
    "no": "1099",
    "name": "사진용 섬광기구의 부분품과 부속품, 섬광전구",
    "spec": "Parts and Accessories for Photographic Flashlight Apparatus and Flashbulbs, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9006.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1220",
    "no": "1100",
    "name": "롤 모양인 사진용 필름이나 감광지를 자동현상하는 기기 또는 현상된 필름을 사진용 감광지에 자동노출시키는 기기",
    "spec": "Photographic Equipment for The Automatic Development of Film or Paper In Rolls or Automatically Exposing Developed Film to Rolls of Photographic Paper.",
    "relatedAnnex2": "-",
    "country": "9010.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1221",
    "no": "1101",
    "name": "사진(영화용을 포함) 현상실용의 기기와 네가토스코프",
    "spec": "Apparatus and Equipment for Photographic (Including Cimetographic) Laboratories, N.E.S.O.I.; Negatoscopes",
    "relatedAnnex2": "-",
    "country": "9010.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1222",
    "no": "1102",
    "name": "부분품과 부속품[사진(영화용을 포함한다) 현상실용 기기(이 류에 따로 분류되지 않은 것으로 한정한다), 네가토스코프(negatoscope), 영사용 스크린의 것]",
    "spec": "Parts and Accessories of Apparatus and Equipment for Photographic (Including Cinematographic) Laboratories Nesoi, Negatoscopes and Projection Screens",
    "relatedAnnex2": "-",
    "country": "9010.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1223",
    "no": "1103",
    "name": "입체현미경",
    "spec": "Stereoscopic Microscopes",
    "relatedAnnex2": "-",
    "country": "9011.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1224",
    "no": "1104",
    "name": "그 밖의 현미경",
    "spec": "Other Microscopes",
    "relatedAnnex2": "-",
    "country": "9011.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1225",
    "no": "1105",
    "name": "광학현미경의 부분품과 부속품",
    "spec": "Parts and Accessories for Compound Optical Microscopes",
    "relatedAnnex2": "-",
    "country": "9011.90",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1226",
    "no": "1106",
    "name": "광학현미경 외의 현미경과 회절기기",
    "spec": "Microscopes Other Than Optical Microscopes; Diffraction Apparatus",
    "relatedAnnex2": "-",
    "country": "9012.10",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1227",
    "no": "1107",
    "name": "광학현미경 외의 현미경과 회절기기의 부분품과 부속품",
    "spec": "Parts and Accessories for Microscopes Other Than Optical Microscopes; Parts and Accessories for Diffraction Apparatus",
    "relatedAnnex2": "-",
    "country": "9012.90",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1228",
    "no": "1108",
    "name": "무기용 망원조준기, 잠망경, 광학, 사진, 정밀, 의료 및 전기 기계, 기구 등을 위한 망원경",
    "spec": "Telescopic Sights for Fitting to Arms; Periscopes; Telescopes for Optical, Photographic, Precision, Medical and Electrical Machines, Appliances, Etc.",
    "relatedAnnex2": "-",
    "country": "9013.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1229",
    "no": "1109",
    "name": "레이저기기[레이저 다이오드 제외]",
    "spec": "Lasers, Other Than Laser Diodes",
    "relatedAnnex2": "-",
    "country": "9013.20",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1230",
    "no": "1110",
    "name": "그 밖의 기기",
    "spec": "Optical Devices, Appliances and Instruments, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9013.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1231",
    "no": "1111",
    "name": "부분품과 부속품[LCD, 레이저기기(레이저 다이오드는 제외한다), 그 밖의 광학기기의 것]",
    "spec": "Parts and Accessories for Liquid Crystal Devices, Lasers (Other Than Laser Diodes) and Other Optical Appliances and Instruments, Nesoi",
    "relatedAnnex2": "-",
    "country": "9013.90",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1232",
    "no": "1112",
    "name": "방향탐지용 컴퍼스",
    "spec": "Direction Finding Compasses.",
    "relatedAnnex2": "-",
    "country": "9014.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1233",
    "no": "1113",
    "name": "항공용이나 우주항행용 기기[컴퍼스 제외]",
    "spec": "Instruments and Appliances for Aeronautical or Space Navigation (Other Than Compasses).",
    "relatedAnnex2": "-",
    "country": "9014.20",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1234",
    "no": "1114",
    "name": "항행용 기기",
    "spec": "Navigational Instruments and Appliances, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9014.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1235",
    "no": "1115",
    "name": "방향탐지용 컴퍼스(compass)와 그 밖의 항행용 기기의 부분품과 부속품",
    "spec": "Parts and Accessories for Direction Finding Compasses and Other Navigational Instruments and Appliances.",
    "relatedAnnex2": "-",
    "country": "9014.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1236",
    "no": "1116",
    "name": "거리측정기",
    "spec": "Rangefinders.",
    "relatedAnnex2": "-",
    "country": "9015.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1237",
    "no": "1117",
    "name": "수준기",
    "spec": "Levels (Surveying)",
    "relatedAnnex2": "-",
    "country": "9015.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1238",
    "no": "1118",
    "name": "사진측량기기",
    "spec": "Photogrammetrical Surveying Instruments and Appliances.",
    "relatedAnnex2": "-",
    "country": "9015.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1239",
    "no": "1119",
    "name": "그 밖의 거리측정기와 토지측량기기·수로측량기·해양측량기기·수리계측기기·기상관측기기·지구물리학용 기기",
    "spec": "Surveying Instruments and Appliances, Nesoi, Hydrographic, Oceanographic, Hydrological, Meteorological or Geophysical Instruments and Appliances Nesoi.",
    "relatedAnnex2": "-",
    "country": "9015.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1240",
    "no": "1120",
    "name": "부분품과 부속품(거리측정기와 토지측량기기·수로측량기·해양측량기기·수리계측기기·기상관측기기·지구물리학용 기기의 것)",
    "spec": "Parts Etc. for Rangefinders and Surveying, Hydrographic, Ocean Ographic, Hydrological, Meteorological or Geophysical Instruments and Appliances Nesoi.",
    "relatedAnnex2": "-",
    "country": "9015.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1241",
    "no": "1121",
    "name": "신티그래픽식 진단기기",
    "spec": "Scintigraphic Apparatus",
    "relatedAnnex2": "-",
    "country": "9018.14",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1242",
    "no": "1122",
    "name": "자외선이나 적외선 응용기기 및 그 부분품과 부속품",
    "spec": "Ultraviolet or Infrared Ray Apparatus, and Parts and Accessories Thereof",
    "relatedAnnex2": "-",
    "country": "9018.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1243",
    "no": "1123",
    "name": "그 밖의 호흡용 기기와 가스마스크(기계적인 부분품과 교환용 필터 중 어느 하나 이상을 갖춘 것으로 한정한다.), 이들의 부분품과 부속품",
    "spec": "Breathing Appliances Nesoi and Gas Masks Having Mechanical Parts And/Or Replaceable Filters; Parts and Accessories Thereof",
    "relatedAnnex2": "-",
    "country": "9020.00",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1244",
    "no": "1124",
    "name": "그 밖의 엑스선 발생기·고압 발생기·조절반·스크린·검사용이나 치료용 테이블·의자와 이와 유사한 물품과 해당 기기의 부분품과 부속품",
    "spec": "X-Ray Generators, High Tension Generators, Control Panels and Desks, Screens, Examination or Treatment Tables, Chairs Etc.; Parts and Accessories",
    "relatedAnnex2": "-",
    "country": "9022.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1245",
    "no": "1125",
    "name": "금속재료 시험기기",
    "spec": "Machines and Appliances for Testing Metals",
    "relatedAnnex2": "-",
    "country": "9024.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1246",
    "no": "1126",
    "name": "그 밖의 액체의 유량이나 액면의 측정용·검사용 기기",
    "spec": "Instruments and Apparatus for Measuring or Checking The Flow or Level of Liquids, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9026.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1247",
    "no": "1127",
    "name": "그 밖의 액체나 기체의 압력 측정용·검사용 기기",
    "spec": "Instruments and Apparatus for Measuring or Checking Pressure of Liquids or Gases, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9026.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1248",
    "no": "1128",
    "name": "그 밖의 액체나 기체의 변량 측정용이나 검사용 기기",
    "spec": "Instruments and Apparatus for Measuring or Checking Other Variables of Liquids or Gases, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9026.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1249",
    "no": "1129",
    "name": "액체나 기체의 유량·액면·압력이나 그 밖의 변량(變量)의 측정용이나 검사용 기기의 부분품과 부속품",
    "spec": "Parts and Accessories for Instruments and Apparatus for Measuring or Checking The Flow, Level, Pressure or Other Variables of Liquids or Gases, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9026.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1250",
    "no": "1130",
    "name": "가스나 매연 분석용 기기",
    "spec": "Gas or Smoke Analysis Apparatus.",
    "relatedAnnex2": "-",
    "country": "9027.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1251",
    "no": "1131",
    "name": "크로마토그래프와 전기영동 장치",
    "spec": "Chromatographs and Electrophoresis Instruments",
    "relatedAnnex2": "-",
    "country": "9027.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1252",
    "no": "1132",
    "name": "분광계·분광광도계·분광사진기(자외선·가시광선·적외선을 사용하는 것으로 한정한다)",
    "spec": "Spectrometers, Spectrophotometers and Spectrographs Using Optical Radiations (Ultraviolet, Visible, Infrared)",
    "relatedAnnex2": "-",
    "country": "9027.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1253",
    "no": "1133",
    "name": "그 밖의 기기(자외선·가시광선·적외선을 사용하는 것으로 한정한다)",
    "spec": "Instruments and Apparatus for Physical or Chemical Analysis Using Optical Radiations (Ultraviolet, Visible, Infrared), Nesoi",
    "relatedAnnex2": "-",
    "country": "9027.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1254",
    "no": "1134",
    "name": "질량분석기",
    "spec": "Mass spectrometers",
    "relatedAnnex2": "-",
    "country": "9027.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1255",
    "no": "1135",
    "name": "그 밖의 물리나 화학 분석용 기기",
    "spec": "Instruments and Apparatus for Physical or Chemical Analysis, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9027.89",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1256",
    "no": "1136",
    "name": "마이크로톰과 물리나 화학 분석용 기기의 부분품과 부속품",
    "spec": "Microtomes; Parts and Accessories for Instruments and Apparatus for Physical or Chemical Analysis",
    "relatedAnnex2": "-",
    "country": "9027.90",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1257",
    "no": "1137",
    "name": "적산(積算)회전계·생산량계·택시미터·주행거리계·보수계와 이와 유사한 계기",
    "spec": "Revolution Counters, Production Counters, Taximeters, Odometers, Pedometers and The Like.",
    "relatedAnnex2": "-",
    "country": "9029.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1258",
    "no": "1138",
    "name": "속도계와 회전속도계, 스트로보스코프",
    "spec": "Speedometers and Tachometers; Stroboscopes.",
    "relatedAnnex2": "-",
    "country": "9029.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1259",
    "no": "1139",
    "name": "적산(積算)회전계·생산량계·택시미터·주행거리계·보수계와 이와 유사한 계기, 속도계와 회전속도계, 스트로보스코프(stroboscope)의 부분품과 부속품",
    "spec": "Parts and Accessories for Revolution Counters, Production Counters, Taximeters, Odometers, Pedometers Etc., Speedometers, Tachometers and Strobosopes.",
    "relatedAnnex2": "-",
    "country": "9029.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1260",
    "no": "1140",
    "name": "전리선의 검사용이나 검출용 기기",
    "spec": "Instruments and Apparatus for Measuring or Detecting Ionizing Radiations",
    "relatedAnnex2": "-",
    "country": "9030.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1261",
    "no": "1141",
    "name": "음극선관 오실로스코프와 음극선관 오실로그래프",
    "spec": "Cathode-Ray Oscilloscopes and Cathode-Ray Oscillographs",
    "relatedAnnex2": "-",
    "country": "9030.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1262",
    "no": "1142",
    "name": "기록장치를 갖춘 멀티미터",
    "spec": "Multimeters with A Recording Device.",
    "relatedAnnex2": "-",
    "country": "9030.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1263",
    "no": "1143",
    "name": "그 밖의 전압·전류·저항·전력의 측정용이나 검사용 기기(기록장치가 없는 것으로서 멀티미터를 제외한 것)",
    "spec": "Instruments and Apparatus for Measuring or Checking Voltage, Current, Resistance or Power, Without A Recording Device (Excluding Multimeters), Nesoi.",
    "relatedAnnex2": "-",
    "country": "9030.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1264",
    "no": "1144",
    "name": "전기통신용으로 특별히 설계된 그 밖의 기기[예: 누화계(cross-talk meter)·게인측정계(gain measuring instrument) 등]",
    "spec": "Instruments and Apparatus Nesoi, Specially Designed for Telecommunications (For Example, Cross-Talk Meters, Gain Measuring Instruments Etc.).",
    "relatedAnnex2": "-",
    "country": "9030.40",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1265",
    "no": "1145",
    "name": "반도체 웨이퍼나 소자의 측정용이나 검사용 기기[예: 프로브 테스터(PROBE TESTERS), 저항 검사기(RESISTIVITY CHECKERS), 로직 애널라이저(LOGIC ANALYZERS)]",
    "spec": "Inst & App W/A Recording Device Designed to Check or Measure Semiconductor Wafers & Devices (Such As Probe Testers, Resistivity Checkers, Logic Analyzers.",
    "relatedAnnex2": "-",
    "country": "9030.82",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1266",
    "no": "1146",
    "name": "그 밖의 기기(기록장치를 갖춘 것으로 한정한다)",
    "spec": "Instruments and Apparatus, with A Recording Device, Nesoi",
    "relatedAnnex2": "-",
    "country": "9030.84",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1267",
    "no": "1147",
    "name": "그 밖의 기기(전기적 양의 기록장치를 갖추지 않은 것으로 한정한다)",
    "spec": "Instruments and Apparatus Nesoi, Without A Recording Device for Measuring or Checking Electrical Quantities.",
    "relatedAnnex2": "-",
    "country": "9030.89",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1268",
    "no": "1148",
    "name": "부분품과 부속품(그 밖의 전기적 양의 측정용이나 검사용 기기나 그 밖의 전리선의 검사용이나 검출용 기기의 것)",
    "spec": "Parts and Accessories of Instruments and Apparatus for Measuring, Checking or Detecting Electrical Quantities, or Ionizing Radiations, Nesoi",
    "relatedAnnex2": "-",
    "country": "9030.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1269",
    "no": "1149",
    "name": "균형시험기",
    "spec": "Machines for Balancing Mechanical Parts",
    "relatedAnnex2": "-",
    "country": "9031.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1270",
    "no": "1150",
    "name": "테스트벤치",
    "spec": "Test Benches.",
    "relatedAnnex2": "-",
    "country": "9031.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1271",
    "no": "1151",
    "name": "반도체 웨이퍼와 소자(집적회로를 포함한다) 검사용이나 반도체 소자(집적회로를 포함한다) 제조에 사용되는 포토마스크(photomask)나 레티클(reticle) 검사용 광학식 기기",
    "spec": "Optical Instruments for Inspecting Semiconductor Wafers or Devices or for Inspecting Photomasks or Reticles Used In Manufg Semiconductor Devices",
    "relatedAnnex2": "-",
    "country": "9031.41",
    "category": "전기전자/반도체",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1272",
    "no": "1152",
    "name": "그 밖의 광학식 기기",
    "spec": "Other optical instruments and appliances",
    "relatedAnnex2": "-",
    "country": "9031.49",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1273",
    "no": "1153",
    "name": "그 밖의 측정용이나 검사용 기기",
    "spec": "Measuring or Checking Instruments, Appliances and Machines, Nesoi.",
    "relatedAnnex2": "-",
    "country": "9031.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1274",
    "no": "1154",
    "name": "그 밖의 측정용이나 검사용 기기의 부분품과 부속품, 윤곽 투영기의 부분품과 부속품",
    "spec": "Parts and Accessories for Measuring or Checking Instruments, Appliances and Machines, Nesoi; Parts and Accessories for Profile Projectors",
    "relatedAnnex2": "-",
    "country": "9031.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1275",
    "no": "1155",
    "name": "온도 자동조절용 기기",
    "spec": "Thermostats",
    "relatedAnnex2": "-",
    "country": "9032.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1276",
    "no": "1156",
    "name": "매노우스타트",
    "spec": "Manostats",
    "relatedAnnex2": "-",
    "country": "9032.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1277",
    "no": "1157",
    "name": "액압식이나 공기식의 자동조절용이나 자동제어용 기기",
    "spec": "Hydraulic or Pneumatic Automatic Regulating or Controlling Instruments and Apparatus.",
    "relatedAnnex2": "-",
    "country": "9032.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1278",
    "no": "1158",
    "name": "그 밖의 자동조절용이나 자동제어용 기기(온도 자동조절용 기기, 매노우스타트와 액압식 기기를 제외한다)",
    "spec": "Automatic Regulating or Controlling Instruments and Apparatus (Excluding Thermostats, Manostats and Hydraulic Types), Nesoi.",
    "relatedAnnex2": "-",
    "country": "9032.89",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1279",
    "no": "1159",
    "name": "자동조절용이나 자동제어용 기기의 부분품과 부속품",
    "spec": "Parts and Accessories of Automatic Regulating or Controlling Instruments and Apparatus",
    "relatedAnnex2": "-",
    "country": "9032.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1280",
    "no": "1160",
    "name": "벤토나이트 (하소한 것과 상관없음)",
    "spec": "Bentonite, Whether Or Not Calcined",
    "relatedAnnex2": "-",
    "country": "2508.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1281",
    "no": "1161",
    "name": "점토 (팽창된 것 제외)",
    "spec": "Clays (Excluding Expanded Clays), Nesoi, Including Common Blue Clay And Other Ball Clays, Whether Or Not Calcined",
    "relatedAnnex2": "-",
    "country": "2508.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1282",
    "no": "1162",
    "name": "홍주석, 남정석, 규선석 (하소한 것과 상관없음)",
    "spec": "Andalusite, Kyanite And Sillimanite, Whether Or Not Calcined",
    "relatedAnnex2": "-",
    "country": "2508.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1283",
    "no": "1163",
    "name": "초크",
    "spec": "Chalk",
    "relatedAnnex2": "-",
    "country": "2509.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1284",
    "no": "1164",
    "name": "규조토 [키절구어, 트리폴리트, 다이어토마이트 포함]와 이와 유사한 규산질의 흙 [겉보기 비중이 1 이하인 것]",
    "spec": "Siliceous Fossil Meals (Including Kieselguhr, Tripolite And Diatomite) And Similar Siliceous Earths, Of An Apparent Specific Gravity Of 1 Or Less",
    "relatedAnnex2": "-",
    "country": "2512.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1285",
    "no": "1165",
    "name": "가공하지 않은 것이나 거칠게 다듬은 대리석과 트래버틴",
    "spec": "Marble And Travertine, Crude Or Roughly Trimmed",
    "relatedAnnex2": "-",
    "country": "2515.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1286",
    "no": "1166",
    "name": "석비용, 건축용 석회질의 암석과 설화 석고 (대리석과 트래버틴 제외)",
    "spec": "Calcareous Monumental Or Building Stone, Except Marble And Travertine; Alabaster",
    "relatedAnnex2": "-",
    "country": "2515.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1287",
    "no": "1167",
    "name": "하소한 백운석",
    "spec": "Calcined Dolomite",
    "relatedAnnex2": "-",
    "country": "2518.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1288",
    "no": "1168",
    "name": "천연 탄산마그네슘 (마그네사이트)",
    "spec": "Natural Magnesium Carbonate (Magnesite)",
    "relatedAnnex2": "-",
    "country": "2519.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1289",
    "no": "1169",
    "name": "석고와 무수석고",
    "spec": "Gypsum; Anhydrite",
    "relatedAnnex2": "-",
    "country": "2520.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1290",
    "no": "1170",
    "name": "생석회",
    "spec": "Quicklime",
    "relatedAnnex2": "-",
    "country": "2522.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1291",
    "no": "1171",
    "name": "소석회",
    "spec": "Slaked Lime",
    "relatedAnnex2": "-",
    "country": "2522.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1292",
    "no": "1172",
    "name": "수경성 석회",
    "spec": "Hydraulic Lime",
    "relatedAnnex2": "-",
    "country": "2522.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1293",
    "no": "1173",
    "name": "가공하지 않은 운모와 시트 모양의 운모나 쪼갠 운모",
    "spec": "Crude Mica And Mica Rifted Into Sheets Or Splittings",
    "relatedAnnex2": "-",
    "country": "2525.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1294",
    "no": "1174",
    "name": "운모 가루",
    "spec": "Mica Powder",
    "relatedAnnex2": "-",
    "country": "2525.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1295",
    "no": "1175",
    "name": "운모 웨이스트",
    "spec": "Mica Waste",
    "relatedAnnex2": "-",
    "country": "2525.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1296",
    "no": "1176",
    "name": "부수지 않은 것으로 가루도 아닌 천연 동석과 활성",
    "spec": "Natural Steatite And Talc, Not Crushed, Not Powdered",
    "relatedAnnex2": "-",
    "country": "2526.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1297",
    "no": "1177",
    "name": "부수거나 가루인 천연 동석과 활성",
    "spec": "Natural Steatite And Talc, Crushed Or Powdered",
    "relatedAnnex2": "-",
    "country": "2526.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1298",
    "no": "1178",
    "name": "퀘브라쵸 추출물",
    "spec": "Quebracho Extract",
    "relatedAnnex2": "-",
    "country": "3201.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1299",
    "no": "1179",
    "name": "왓틀 추출물",
    "spec": "Wattle Extract",
    "relatedAnnex2": "-",
    "country": "3201.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1300",
    "no": "1180",
    "name": "식물성 유연용 추출물, 탄닌과 그 염, 에테르, 에스테르 그 밖의 유도체",
    "spec": "Tanning Extracts Of Vegetable Origin, Nesoi; Tannins And Their Salts, Ethers, Esters And Other Derivatives",
    "relatedAnnex2": "-",
    "country": "3201.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1301",
    "no": "1181",
    "name": "합성 유기유연제",
    "spec": "Synthetic Organic Tanning Substances",
    "relatedAnnex2": "-",
    "country": "3202.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1302",
    "no": "1182",
    "name": "무기유연제, 조제 유연제, 유연전 처리용 효소계 조제품",
    "spec": "Inorganic Tanning Substances; Tanning Preparations; Enzymatic Preparations For Pre-Tanning",
    "relatedAnnex2": "-",
    "country": "3202.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1303",
    "no": "1183",
    "name": "식물성, 동물성 착색제 및 이것을 기본 재료로 한 조제품",
    "spec": "Coloring Matter Of Vegetable Or Animal Origin And Preparations Based Thereon",
    "relatedAnnex2": "-",
    "country": "3203.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1304",
    "no": "1184",
    "name": "그 밖의 합성 유기착색제, 이것을 기본 재료로 한 조제품, 형광증백제(螢光增白劑)나 루미노퍼(luminophore)로 사용되는 종류의 합성유기생산품",
    "spec": "Synthetic Organic Coloring Matter; Preparations Based On Synthetic Organic Coloring Matter; Synthetic Organic Products Of A Kind Used As Fluorescent Brightening Agents Or As Luminophores; Nesoi",
    "relatedAnnex2": "-",
    "country": "3204.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1305",
    "no": "1185",
    "name": "레이크 안료와 이들을 기본 재료로 한 조제품",
    "spec": "Color Lakes; Preparations Based On Color Lakes",
    "relatedAnnex2": "-",
    "country": "3205.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1306",
    "no": "1186",
    "name": "군청과 이것을 기본 재료로 한 조제품",
    "spec": "Ultramarine And Preparations Based Thereon",
    "relatedAnnex2": "-",
    "country": "3206.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1307",
    "no": "1187",
    "name": "조제 안료, 조제 유백제, 조제 그림물감과 이와 유사한 조제품",
    "spec": "Prepared Pigments, Prepared Opacifiers, Prepared Colors And Similar Preparations",
    "relatedAnnex2": "-",
    "country": "3207.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1308",
    "no": "1188",
    "name": "법랑과 유약, 유약용 슬립과 이와 유사한 조제품",
    "spec": "Vitrifiable Enamels And Glazes, Engobes (Slips) And Similar Preparations",
    "relatedAnnex2": "-",
    "country": "3207.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1309",
    "no": "1189",
    "name": "액체 상태 러스터와 이와 유사한 조제품",
    "spec": "Liquid Lustres And Similar Preparations",
    "relatedAnnex2": "-",
    "country": "3207.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1310",
    "no": "1190",
    "name": "페인트 제조에 사용되는 비수성 매질에 분산시킨 안료 [금속 가루, 금속플레이크 포함]; 소매용 모양이나 포장을 한 염료와 그 밖의 착색제",
    "spec": "Pigments (Including Metallic Powders And Flakes) In Nonaqueous Media For Paint Manufacture; Dyes And Colors Packaged For Retail Sales",
    "relatedAnnex2": "-",
    "country": "3212.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1311",
    "no": "1191",
    "name": "건물의 외면, 실내벽, 마루, 천장과 이와 유사한 장소에 사용되는 비내화성 표면처리제",
    "spec": "Nonrefractory Surfacing Preparations For Facades, Indoor Walls, Floors, Ceilings Or The Like",
    "relatedAnnex2": "-",
    "country": "3214.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1312",
    "no": "1192",
    "name": "덱스트린과 그 밖의 변성전분",
    "spec": "Dextrins And Other Modified Starches",
    "relatedAnnex2": "-",
    "country": "3505.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1313",
    "no": "1193",
    "name": "천연색 사진용 (폴리크롬) 평면 모양 사진플레이트, 평면 모양 사진필름 (감광성이 있고 노광하지 않은 것으로, 종이, 판지, 직물로 만든 것은 제외)",
    "spec": "Photographic Plates And Flat Film (Of Material Other Than Paper, Paperboard Or Textiles) For Color Photography (Polychrome), Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3701.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1314",
    "no": "1194",
    "name": "엑스선용 롤 모양 필름 (감광성이 있고 노광하지 않은 것)",
    "spec": "X-Ray Film In Rolls, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1315",
    "no": "1195",
    "name": "천연색 사진용 (폴리크롬) 롤 모양 사진용 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 105밀리미터 이하인 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Not Over 105 Mm In Width, For Color Photography (Polychrome), Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1316",
    "no": "1196",
    "name": "할로겐화은 에멀전으로 된 롤 모양 사진용 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 105밀리미터 이하인 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Not Over 105 Mm (4.1 In.)In Width, With Silver Halide Emulsion, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1317",
    "no": "1197",
    "name": "그 밖의 롤 모양 사진용 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 105밀리미터 이하인 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Not Over 105 Mm (4.1 In.) In Width, Nesoi, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1318",
    "no": "1198",
    "name": "천연색 사진용 (폴리크롬) 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 610밀리미터를 초과하고, 길이가 200미터를 초과하는 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Over 610 Mm In Width And Over 200 M In Length, For Color Photography (Polychrome), Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1319",
    "no": "1199",
    "name": "그 밖의 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 610밀리미터를 초과하고, 길이가 200미터를 초과하는 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Over 610 Mm In Width And Over 200 M In Length, Nesoi, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1320",
    "no": "1200",
    "name": "그 밖의 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 구멍이 없는 것으로서 폭이 610밀리미터를 초과하고, 길이가 200미터 이하인 것)",
    "spec": "Photographic Film In Rolls, Nesoi, Without Sprocket Holes, Over 610 Mm (24 In.)In Width And Not Over 200 M (656 Ft.) In Length, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.43",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1321",
    "no": "1201",
    "name": "그 밖의 천연색 사진용 (폴리크롬) 롤 모양 필름 (감광성이 있고 노광하지 않은 것으로서 폭이 16밀리미터 이하인 것)",
    "spec": "Photographic Film In Rolls With Perforations, For Color Photography (Polychrome), Not Over 16 Mm (0.6 In.) Wide, Sensitized, Unexposed, Etc",
    "relatedAnnex2": "-",
    "country": "3702.52",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1322",
    "no": "1202",
    "name": "그 밖의 천연색 사진용 (폴리크롬) (슬라이드용인 것) 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 폭이 16밀리미터 초과 35밀리미터 이하로서 길이가 30미터 이하인 것)",
    "spec": "Photographic Film Rolls, Nesoi, Film Nesoi, For Color Photography (Polychrome); For Color Slides, Over 16 Mm, Not Over 35 Mm Wide And Not Over 30 M Long, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.53",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1323",
    "no": "1203",
    "name": "그 밖의 천연색 사진용 (폴리크롬) (슬라이드용이 아닌 것) 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 폭이 16밀리미터 초과 35밀리미터 이하로서 길이가 30미터 이하인 것)",
    "spec": "Photographic Film Rolls, Nesoi, Film Nesoi, For Color Photography (Polychrome); Other Than For Slides, Nesoi, Over 16 Mm, Not Over 35 Mm Wide And Not Over 30 M Long, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.54",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1324",
    "no": "1204",
    "name": "그 밖의 천연색 사진용 (폴리크롬) 롤 모양 필름 (감광성이 있고 노광하지 않은 것, 폭이 16밀리미터 초과 35밀리미터 이하로서 길이가 30미터를 초과하는 것)",
    "spec": "Photographic Film Rolls, Nesoi, Film Nesoi, For Color Photography (Polychrome), Over 16 Mm, But Not Over 35 Mm Wide And Over 30 M Long, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.55",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1325",
    "no": "1205",
    "name": "그 밖의 천연색 사진용 (폴리크롬) 롤 모양 필름 (감광성이 있고 노광하지 않은 것으로서 폭이 35밀리미터를 초과하는 것)",
    "spec": "Photographic Film Rolls, Nesoi, Film Nesoi, For Color Photography (Polychrome), Over 35 Mm Wide, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3702.56",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1326",
    "no": "1206",
    "name": "롤 모양 사진 인화지, 판지, 직물 (감광성이 있고 노광하지 않은 것으로서 폭이 610밀리미터를 초과하는 것)",
    "spec": "Photographic Paper, Paperboard And Textiles In Rolls, Over 610Mm (24 In.) Wide, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3703.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1327",
    "no": "1207",
    "name": "그 밖의 천연색 사진용 (폴리크롬) 사진 인화지, 판지, 직물 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Paper, Paperboard And Textiles, Nesoi, For Color Photography (Polychrome), Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3703.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1328",
    "no": "1208",
    "name": "그 밖의 사진 인화지, 판지, 직물 (감광성이 있고 노광하지 않은 것)",
    "spec": "Photographic Paper, Paperboard And Textiles, Nesoi, Sensitized, Unexposed",
    "relatedAnnex2": "-",
    "country": "3703.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1329",
    "no": "1209",
    "name": "사진플레이트와 필름 (노광하여 현상한 것으로서 영화용 필름은 제외)",
    "spec": "Photographic Plates And Film, Exposed And Developed, Other Than Cinematographic Film",
    "relatedAnnex2": "-",
    "country": "3705.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1330",
    "no": "1210",
    "name": "영화용 필름 (노광하여 현상한 것으로서 폭이 35밀리미터 이상인 것)",
    "spec": "Cinematographic Film, Exposed And Developed, 35 Mm (1.4 In.) Or Over In Width",
    "relatedAnnex2": "-",
    "country": "3706.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1331",
    "no": "1211",
    "name": "로진염, 수지산염, 로진ㆍ수지산 유도체의 염 [로진 부가물의 염은 제외]",
    "spec": "Salts Of Rosin Or Of Resin Acids Or Of Derivatives Of Rosin Or Resin Acids, Except Salts Of Rosin Adducts",
    "relatedAnnex2": "-",
    "country": "3806.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1332",
    "no": "1212",
    "name": "목타르, 목타르유, 목크레오소트, 목나프타, 식물성 피치, 브루어 피치와 이와 유사한 조제품 [로진, 수지산이나 식물성 피치를 기본 재료로 한 것]",
    "spec": "Wood Tar; Wood Tar Oils; Wood Cresote; Wood Naphtha; Vegetable Pitch; Brewers' Pitch And Like Products Based On Rosin, Resin Acids Or Vegetable Pitch",
    "relatedAnnex2": "-",
    "country": "3807.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1333",
    "no": "1213",
    "name": "섬유산업, 제지산업과 그 밖에 유사한 산업에 사용하는 전분질을 기본 재료로 한 완성가공제, 염색 캐리어, 드레싱",
    "spec": "Finishing Agents, Dye Carriers And Dressings Used In The Textile, Paper Etc. Industries, With A Basis Of Amylaceous Substances",
    "relatedAnnex2": "-",
    "country": "3809.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1334",
    "no": "1214",
    "name": "그 밖의 섬유산업이나 이와 유사한 산업에 사용하는 완성가공제, 염색 캐리어 및 조제품",
    "spec": "Finishing Agents, Dye Carriers And Preparations Nesoi, Of A Kind Used In The Textile Or Like Industries",
    "relatedAnnex2": "-",
    "country": "3809.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1335",
    "no": "1215",
    "name": "그 밖의 제지산업이나 이와 유사한 산업에 사용하는 완성가공제, 염색 캐리어 및 조제품",
    "spec": "Finishing Agents, Dye Carriers And Preparations Nesoi, Of A Kind Used In The Paper Or Like Industries",
    "relatedAnnex2": "-",
    "country": "3809.92",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1336",
    "no": "1216",
    "name": "그 밖의 가죽산업이나 이와 유사한 산업에 사용하는 완성가공제, 염색 캐리어 및 조제품",
    "spec": "Finishing Agents, Dye Carriers And Preparation Nesoi, Of A Kind Used In The Leather Or Like Industries",
    "relatedAnnex2": "-",
    "country": "3809.93",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1337",
    "no": "1217",
    "name": "납화합물을 기본 재료로 한 안티녹제",
    "spec": "Antiknock Preparations, Based On Lead Compounds",
    "relatedAnnex2": "-",
    "country": "3811.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1338",
    "no": "1218",
    "name": "그 밖의 안티녹제",
    "spec": "Antiknock Preparations, Nesoi",
    "relatedAnnex2": "-",
    "country": "3811.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1339",
    "no": "1219",
    "name": "고무용, 플라스틱용 복합가소제",
    "spec": "Compound Plasticizers For Rubber Or Plastics",
    "relatedAnnex2": "-",
    "country": "3812.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1340",
    "no": "1220",
    "name": "소화기용 조제품과 장전물, 장전된 소화탄",
    "spec": "Preparations And Charges For Fire-Extinguishers; Charged Fire-Extinguishng Grenades",
    "relatedAnnex2": "-",
    "country": "3813.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1341",
    "no": "1221",
    "name": "그 밖의 반응시작제ㆍ반응촉진제ㆍ촉매 조제품",
    "spec": "Reaction Initiators, Reaction Accelerators And Catalytic Preparations, Nesoi",
    "relatedAnnex2": "-",
    "country": "3815.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1342",
    "no": "1222",
    "name": "혼합알킬벤젠과 혼합알킬나프탈렌(제2707호ㆍ제2902호의 물품은 제외)",
    "spec": "Mixed Alkylbenzenes And Mixed Alklnaphthalenes, Other Than Those Of Heading 2707 Or 2902",
    "relatedAnnex2": "-",
    "country": "3817.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1343",
    "no": "1223",
    "name": "부동 조제품과 조제 제빙액",
    "spec": "Antifreezing Preparations And Prepared Deicing Fluids",
    "relatedAnnex2": "-",
    "country": "3820.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1344",
    "no": "1224",
    "name": "톨유 지방산",
    "spec": "Tall Oil Fatty Acids",
    "relatedAnnex2": "-",
    "country": "3823.13",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1345",
    "no": "1225",
    "name": "옥시란(산화에틸렌)을 함유한 혼합물과 조제품",
    "spec": "Mixtures And Preparations Containing Oxirane (Ethylene Oxide)",
    "relatedAnnex2": "-",
    "country": "3824.81",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1346",
    "no": "1226",
    "name": "제38류에 분류되는 폐기물",
    "spec": "Waste As Specified In Chapter 38 Notes, Nesoi",
    "relatedAnnex2": "-",
    "country": "3825.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1347",
    "no": "1227",
    "name": "바이오디젤과 그 혼합물[석유나 역청유를 함유하지 않거나 중량기준으로 70 퍼센트 미만을 함유한 것]",
    "spec": "Biodiesel And Mixtures Thereof, Not Containing Or Containing Less Than 70% By Weight Of Petroleum Oils Or Oils Obtained From Bituminous Materials",
    "relatedAnnex2": "-",
    "country": "3826.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1348",
    "no": "1228",
    "name": "비환식 퍼할로겐화 유도체",
    "spec": "Acyclic Perhalogenated Derivatives, Nesoi",
    "relatedAnnex2": "-",
    "country": "3827.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1349",
    "no": "1229",
    "name": "프로필렌의 중합체나 그 밖의 올레핀의 중합체 [일차제품]",
    "spec": "Polymers Of Propylene Or Other Olefins Nesoi, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3902.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1350",
    "no": "1230",
    "name": "폴리스티렌 [일차제품]",
    "spec": "Polystyrene Nesoi, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3903.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1351",
    "no": "1231",
    "name": "염화비닐리덴 중합체 [일차제품]",
    "spec": "Vinylidene Chloride Polymers, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3904.50",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1352",
    "no": "1232",
    "name": "물에 분산된 초산비밀 중합체",
    "spec": "Polymers Of Vinyl Acetate, In Aqueous Dispersion",
    "relatedAnnex2": "-",
    "country": "3905.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1353",
    "no": "1233",
    "name": "물에 분산되지 않은 초산비밀 중합체 [일차제품]",
    "spec": "Polymers Of Vinyl Acetate, Not In Aqueous Dispersion, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3905.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1354",
    "no": "1234",
    "name": "물에 분산된 초산비닐 공중합체",
    "spec": "Vinyl Acetate Copolymers, In Aqueous Dispersion",
    "relatedAnnex2": "-",
    "country": "3905.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1355",
    "no": "1235",
    "name": "초산비닐 공중합체",
    "spec": "Vinyl Acetate Copolymers, Nesoi",
    "relatedAnnex2": "-",
    "country": "3905.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1356",
    "no": "1236",
    "name": "폴리(비닐알코올) [가수분해되지 않은 초산기를 함유하였는지에 상관없음]",
    "spec": "Poly(Vinyl Alcohol), Whether Or Not Containing Unhydrolyzed Acetate Groups",
    "relatedAnnex2": "-",
    "country": "3905.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1357",
    "no": "1237",
    "name": "비닐에스테르의 공중합체 [일차제품]",
    "spec": "Copolymers Of Vinyl Esters, In Primary Forms, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "3905.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1358",
    "no": "1238",
    "name": "비닐중합체 [일차제품]",
    "spec": "Vinyl Polymers In Primary Forms, N.E.S.O.I.",
    "relatedAnnex2": "-",
    "country": "3905.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1359",
    "no": "1239",
    "name": "폴리(메틸 메타크리레이트) [일차제품]",
    "spec": "Poly(Methyl Methacrylate), In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3906.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1360",
    "no": "1240",
    "name": "폴리에테르 [일차제품]",
    "spec": "Polyethers Nesoi, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3907.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1361",
    "no": "1241",
    "name": "폴리(락트산) [일차제품]",
    "spec": "Poly(Lactic Acid), In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3907.70",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1362",
    "no": "1242",
    "name": "불포화 폴리에스테르 [일차제품]",
    "spec": "Polyesters Nesoi, Unsaturated, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3907.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1363",
    "no": "1243",
    "name": "폴리아미드-6, -11, -12, -6,6, -6,9, -6,10 또는 -6,12 (나일론 타입) [일차제품]",
    "spec": "Polyamide-6,-11,-12,-6,6,-6,9,-6,10 Or -6,12 (Nylon Type), In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3908.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1364",
    "no": "1244",
    "name": "폴리아미드 [일차제품]",
    "spec": "Polyamides Nesoi, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3908.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1365",
    "no": "1245",
    "name": "가소화하지 않은 초산 셀룰로오스 [일차제품]",
    "spec": "Cellulose Acetates, Nonplasticized, In Primary Forms",
    "relatedAnnex2": "-",
    "country": "3912.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1366",
    "no": "1246",
    "name": "스티렌의 중합체로 만든 웨이스트, 페어링, 스크랩",
    "spec": "Waste, Parings And Scrap, Of Polymers Of Styrene",
    "relatedAnnex2": "-",
    "country": "3915.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1367",
    "no": "1247",
    "name": "경화 단백질이나 셀룰로오스 플라스틱 물질의 인조 거트 [소시지케이싱]",
    "spec": "Artificial Guts (Sausage Casing), Of Hardened Protein Or Of Cellulosic Plastic Materials",
    "relatedAnnex2": "-",
    "country": "3917.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1368",
    "no": "1248",
    "name": "염화비닐의 중합체로 만든 경질의 관, 파이프, 호스",
    "spec": "Tubes, Pipes And Hoses, Rigid, Of Polymers Of Vinyl Chloride",
    "relatedAnnex2": "-",
    "country": "3917.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1369",
    "no": "1249",
    "name": "플라스틱으로 만든 연질의 관, 파이프, 호스[파열압이 27.6메가파스칼 이상인 것]",
    "spec": "Flexible Tubes, Pipes And Hoses, Having A Minimum Burst Pressure Of 27.6 Mpa, Of Plastics",
    "relatedAnnex2": "-",
    "country": "3917.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1370",
    "no": "1250",
    "name": "그 밖의 재료로 보강되거나 결합되지 않은 연결구류 없는 관, 파이프, 호스",
    "spec": "Tubes, Pipes And Hoses Nesoi, Not Reinforced Or Otherwise Combined With Other Materials, Of Plastics, Without Fittings",
    "relatedAnnex2": "-",
    "country": "3917.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1371",
    "no": "1251",
    "name": "그 밖의 재료로 보강되거나 결합되지 않은 연결구류 있는 관, 파이프, 호스",
    "spec": "Tubes, Pipes And Hoses Nesoi, Not Reinforced Or Otherwise Combined With Other Materials, Of Plastics, With Fittings",
    "relatedAnnex2": "-",
    "country": "3917.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1372",
    "no": "1252",
    "name": "에틸렌 중합체의 판, 시트, 필름, 박, 스트립(셀룰러가 아닌 것으로서 그 밖의 재료로 보강ㆍ적층ㆍ지지하거나 이와 유사하게 결합하지 않은 것)",
    "spec": "Plates, Sheets, Film, Foil And Strip Of Plastics, Not Self-Adhesive, Non-Cellular, Not Reinforced Or Laminated Etc., Of Polymers Of Ethylene",
    "relatedAnnex2": "-",
    "country": "3920.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1373",
    "no": "1253",
    "name": "폴리카보네이트의 판, 시트, 필름, 박, 스트립(셀룰러가 아닌 것으로서 그 밖의 재료로 보강ㆍ적층ㆍ지지하거나 이와 유사하게 결합하지 않은 것)",
    "spec": "Plates, Sheets, Film, Foil And Strip Of Plastics, Not Self-Adhesive, Non-Cellular, Not Reinforced Etc., Of Polycarbonates",
    "relatedAnnex2": "-",
    "country": "3920.61",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1374",
    "no": "1254",
    "name": "폴리에스테르의 판, 시트, 필름, 박, 스트립(셀룰러가 아닌 것으로서 그 밖의 재료로 보강ㆍ적층ㆍ지지하거나 이와 유사하게 결합하지 않은 것)",
    "spec": "Plates, Sheets, Film, Foil And Strip Of Plastics, Not Self-Adhesive, Non-Cellular, Not Reinforced Or Laminated Etc., Of Polyesters Nesoi",
    "relatedAnnex2": "-",
    "country": "3920.69",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1375",
    "no": "1255",
    "name": "초산셀룰로오스의 판, 시트, 필름, 박, 스트립(셀룰러가 아닌 것으로서 그 밖의 재료로 보강ㆍ적층ㆍ지지하거나 이와 유사하게 결합하지 않은 것)",
    "spec": "Plates, Sheets, Film, Foil And Strip Of Plastics, Not Self-Adhesive, Non-Cellular, Not Reinforced Or Laminated Etc., Of Cellulose Acetate",
    "relatedAnnex2": "-",
    "country": "3920.73",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1376",
    "no": "1256",
    "name": "폴리(비닐 부티랄)의 판, 시트, 필름, 박, 스트립(셀룰러가 아닌 것으로서 그 밖의 재료로 보강ㆍ적층ㆍ지지하거나 이와 유사하게 결합하지 않은 것)",
    "spec": "Plates, Sheets, Film, Foil And Strip Of Plastics, Not Self-Adhesive, Non-Cellular, Not Reinforced Or Laminated Etc., Of Poly(Vinyl Butyral)",
    "relatedAnnex2": "-",
    "country": "3920.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1377",
    "no": "1257",
    "name": "플라스틱의 비데, 화장실용 팬, 수세용 물탱크와 이와 유사한 위생용품",
    "spec": "Bidets, Lavatory Pans, Flushing Cisterns And Similar Sanitary Ware, Of Plastics",
    "relatedAnnex2": "-",
    "country": "3922.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1378",
    "no": "1258",
    "name": "플라스틱의 문, 창과 이들의 틀과 문지방",
    "spec": "Doors, Windows And Their Frames And Thresholds For Doors, Of Plastics",
    "relatedAnnex2": "-",
    "country": "3925.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1379",
    "no": "1259",
    "name": "부타디엔 고무(BR)의 일차제품 또는 판, 시트, 스트립",
    "spec": "Butadiene Rubber (Br) In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1380",
    "no": "1260",
    "name": "이소부텐-이소프렌(부틸) 고무(IIR)의 일차제품 또는 판, 시트, 스트립",
    "spec": "Isobutene-Isoprene (Butyl) Rubber (Iir) In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1381",
    "no": "1261",
    "name": "할로-이소부텐-이소프렌고무(CIIR이나 BIIR)의 일차제품 또는 판, 시트, 스트립",
    "spec": "Halo-Isobutene-Isoprene Rubber (Ciir Or Biir) In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1382",
    "no": "1262",
    "name": "클로로프렌(클로로부타디엔) 고무(CR)의 라텍스",
    "spec": "Latex Of Chloroprene (Chlorobutadiene) Rubber (Cr)",
    "relatedAnnex2": "-",
    "country": "4002.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1383",
    "no": "1263",
    "name": "클로로프렌(클로로부타디엔) 고무(CR)의 일차제품(라텍스 제외) 또는 판, 시트, 스트립",
    "spec": "Chloroprene (Chlorobutadiene) Rubber (Cr) In Primary Forms (Except Latex) Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1384",
    "no": "1264",
    "name": "아크릴로니트릴-부타디엔 고무(NBR)의 라텍스",
    "spec": "Latex Of Acrylonitrile-Butadiene Rubber (Nbr)",
    "relatedAnnex2": "-",
    "country": "4002.51",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1385",
    "no": "1265",
    "name": "아크릴로니트릴-부타디엔 고무(NBR)의 일차제품(라텍스 제외) 또는 판, 시트, 스트립",
    "spec": "Acrylonitrile-Butadiene Rubber (Nbr) In Primary Forms (Except Latex) Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.59",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1386",
    "no": "1266",
    "name": "이소프렌 고무(IR)의 일차제품 또는 판, 시트, 스트립",
    "spec": "Isoprene Rubber (Ir) In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.60",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1387",
    "no": "1267",
    "name": "천연고무 또는 합성고무와 기름에서 제조한 팩티스와 혼합된 천연검의 혼합물의 일차제품 또는 판, 시트, 스트립",
    "spec": "Mixtures Of Natural Rubber Or Similar Natural Gums With Synthetic Rubber And Factice Derived From Oils, In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4002.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1388",
    "no": "1268",
    "name": "합성고무와 기름에서 제조한 팩티스로 만든 라텍스 (일차제품 또는 판, 시트, 스트립)",
    "spec": "Latex Of Synthetic Rubber And Factice Derived From Oils, In Primary Forms Or In Plates, Sheets Or Strip, Nesoi",
    "relatedAnnex2": "-",
    "country": "4002.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1389",
    "no": "1269",
    "name": "합성고무와 기름에서 제조한 팩티스로 만든 기타 제품 (일차제품 또는 판, 시트, 스트립)",
    "spec": "Other, Synthetic Rubber And Factice Derived From Oils, In Primary Forms Or In Plates, Sheets Or Strip, Nesoi",
    "relatedAnnex2": "-",
    "country": "4002.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1390",
    "no": "1270",
    "name": "가황하지 않은 카본블랙이나 실리카와 배합한 고무의 일차제품 또는 판, 시트, 스트립",
    "spec": "Compounded Rubber, Unvulcanized, Compounded With Carbon Black Or Silica, In Primary Forms Or In Plates, Sheets Or Strip",
    "relatedAnnex2": "-",
    "country": "4005.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1391",
    "no": "1271",
    "name": "가황하지 않은 카본블랙이나 실리카와 배합한 고무의 용액과 분산액",
    "spec": "Compounded Rubber, Unvulcanized, In Solution; Dispersions Other Than Those Compounded With Carbon Black Or Silica",
    "relatedAnnex2": "-",
    "country": "4005.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1392",
    "no": "1272",
    "name": "가황하지 않은 배합고무의 판, 시트, 스트립",
    "spec": "Compounded Rubber, Unvulcanized, In Plates, Sheets, And Strip, Nesoi",
    "relatedAnnex2": "-",
    "country": "4005.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1393",
    "no": "1273",
    "name": "가황하지 않은 배합고무의 일차제품",
    "spec": "Compounded Rubber, Unvulcanized, In Primary Forms, Nesoi",
    "relatedAnnex2": "-",
    "country": "4005.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1394",
    "no": "1274",
    "name": "가황하지 않은 고무재질의 고무타이어 재생용 캐멀-백 스트립",
    "spec": "Camel-Back Strips For Retreading Rubber Tires, Of Unvulcanized Rubber",
    "relatedAnnex2": "-",
    "country": "4006.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1395",
    "no": "1275",
    "name": "논셀룰러 가황고무의 판, 시트, 스트립 (경질고무 제외)",
    "spec": "Plates, Sheets And Strip Of Vulcanized Rubber, Except Hard Rubber, Of Noncellular Rubber",
    "relatedAnnex2": "-",
    "country": "4008.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1396",
    "no": "1276",
    "name": "연결구류를 부착한 가황고무 재질 관, 파이프, 호스 (경질고무의 것은 제외하며 그 밖의 재료로 보강되거나 결합되지 않은 것)",
    "spec": "Tubes, Pipe, And Hoses, Of Vulcanized Rubber, Exc Hard Rubber, Not Reinforced Or Otherwise Combined With Other Materials, With Fittings",
    "relatedAnnex2": "-",
    "country": "4009.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1397",
    "no": "1277",
    "name": "연결구류를 부착하지 않은 가황고무 재질 관, 파이프, 호스 (경질고무의 것은 제외하며 그 밖의 재료로 보강되거나 결합된 것)",
    "spec": "Tubes, Pipes And Hoses, Of Vulcanized Rubber, Except Hard Rubber, Reinforced Or Otherwise Combined With Other Materials, Nesoi, Without Fittings",
    "relatedAnnex2": "-",
    "country": "4009.41",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1398",
    "no": "1278",
    "name": "금속으로 보강된 컨베이어용 벨트나 벨팅 (가황고무 재질)",
    "spec": "Conveyor Belts Or Belting Reinforced Only With Metal, Of Vulcanized Rubber",
    "relatedAnnex2": "-",
    "country": "4010.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1399",
    "no": "1279",
    "name": "방직용 섬유 재료로만 보강된 컨베이어용 벨트나 벨팅 (가황고무 재질)",
    "spec": "Conveyor Belts Or Belting Reinforced Only With Textile Materials",
    "relatedAnnex2": "-",
    "country": "4010.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1400",
    "no": "1280",
    "name": "가황고무 재질의 기타 컨베이어용 벨트나 벨팅",
    "spec": "Other Conveyor Belts Or Belting Of Vulcanized Rubber, Nesoi",
    "relatedAnnex2": "-",
    "country": "4010.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1401",
    "no": "1281",
    "name": "횡단면이 사다리꼴형의 전동(transmission)용 엔드리스(endless) 벨트(브이벨트)로서 바깥둘레가 60센티미터 초과 180센티미터 이하인 것 (브이홈이 파인 것은 제외, 가황고무 재질)",
    "spec": "Endless Transmission Belts Of Trapezoidal Cross Section (V-Belts), Of Circumference Exceeding 60Cm But Not Exceeding 180 Cm, Other Than V-Ribbed, Of Vulcanized Rubber, Nesoi",
    "relatedAnnex2": "-",
    "country": "4010.32",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1402",
    "no": "1282",
    "name": "횡단면이 사다리꼴형의 전동(transmission)용 엔드리스(endless) 벨트(브이벨트)로서 바깥둘레가 180센티미터 초과 240센티미터 이하인 것 (브이홈이 파인 것, 가황고무 재질)",
    "spec": "Endless Transmission Belts Of Trapezoidal Cross Section (V-Belts), V-Ribbed, Of Circumference Exceeding 180Cm But Not Exceeding 240 Cm, Of Vulcanized Rubber",
    "relatedAnnex2": "-",
    "country": "4010.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1403",
    "no": "1283",
    "name": "횡단면이 사다리꼴형의 전동(transmission)용 엔드리스(endless) 벨트(브이벨트)로서 바깥둘레가 180센티미터 초과 240센티미터 이하인 것 (브이홈이 파인 것은 제외, 가황고무 재질)",
    "spec": "Endless Transmission Belts Of Trapezoidal Cross Section (V-Belts), Of Circumference Exceeding 180Cm But Not Exceeding 240 Cm, Other Than V-Ribbed, Of Vulcanized Rubber, Nesoi",
    "relatedAnnex2": "-",
    "country": "4010.34",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1404",
    "no": "1284",
    "name": "엔드리스 싱크러너스(endless synchronous) 벨트로서 바깥둘레가 60센티미터 초과 150센티미터 이하인 것 (가황고무 재질)",
    "spec": "Endless Synchronous Belts Of A Circumference Exceeding 60 Cm But Not Exceeding 150 Cm, Of Vulcanized Rubber",
    "relatedAnnex2": "-",
    "country": "4010.35",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1405",
    "no": "1285",
    "name": "엔드리스 싱크러너스(endless synchronous) 벨트로서 바깥둘레가 150센티미터 초과 198센티미터 이하인 것 (가황고무 재질)",
    "spec": "Endless Synchronous Belts Of A Circumference Exceeding 150 Cm But Not Exceeding 198 Cm, Of Vulcanized Rubber",
    "relatedAnnex2": "-",
    "country": "4010.36",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1406",
    "no": "1286",
    "name": "고무로 만든 기타 컨베이어용ㆍ전동(transmission)용 벨트와 벨팅(belting)(가황한 것)",
    "spec": "Other Transmission Belts Or Belting, Of Vulcanized Rubber, Nesoi",
    "relatedAnnex2": "-",
    "country": "4010.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1407",
    "no": "1287",
    "name": "고무로 만든 항공기용 공기타이어(신품)",
    "spec": "New Pneumatic Tires, Of Rubber, Of A Kind Used On Aircraft",
    "relatedAnnex2": "-",
    "country": "4011.30",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1408",
    "no": "1288",
    "name": "고무로 만든 승용 자동차용 [스테이션 왜건과 경주 자동차용을 포함] 공기타이어(재생품)",
    "spec": "Retreaded Tires Of Rubber, Of A Kind Used On Motor Cars (Including Station Wagons And Racing Cars)",
    "relatedAnnex2": "-",
    "country": "4012.11",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1409",
    "no": "1289",
    "name": "고무로 만든 버스용ㆍ화물 자동차용 공기타이어(재생품)",
    "spec": "Retreaded Tires Of Rubber, Of A Kind Used On Buses Or Trucks",
    "relatedAnnex2": "-",
    "country": "4012.12",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1410",
    "no": "1290",
    "name": "고무로 만든 항공기용 공기타이어(재생품)",
    "spec": "Retreaded Tires Of Rubber, Of A Kind Used On Aircraft",
    "relatedAnnex2": "-",
    "country": "4012.13",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1411",
    "no": "1291",
    "name": "고무로 만든 기타 공기타이어(재생품)",
    "spec": "Retreaded Tires Of Rubber, Other, Nesoi",
    "relatedAnnex2": "-",
    "country": "4012.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1412",
    "no": "1292",
    "name": "고무로 만든 공기타이어(중고품)",
    "spec": "Used Pneumatic Tires, Of Rubber",
    "relatedAnnex2": "-",
    "country": "4012.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1413",
    "no": "1293",
    "name": "그 밖의 고무로 만든 공기타이어(중고품, 재생품); 고무로 만든 솔리드나 쿠션타이어, 타이어트레드, 타이어플랩",
    "spec": "Other Retreaded Or Used Pneumatic Tires Of Rubber; Other; Solid Or Cushion Tires, Interchangeable Tire Treads And Tire Flaps, Of Rubber",
    "relatedAnnex2": "-",
    "country": "4012.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1414",
    "no": "1294",
    "name": "거즈 [제5806호에 해당하는 세폭(細幅) 직물은 제외]",
    "spec": "Gauze, Other Than Narrow Fabrics Of Heading 5806",
    "relatedAnnex2": "-",
    "country": "5803.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1415",
    "no": "1295",
    "name": "그 밖의 신발류[바깥 바닥과 갑피(甲皮)를 고무나 플라스틱으로 만든 것]: 스포츠용 신발류로서 스키 부츠ㆍ크로스컨트리 스키화ㆍ스노보드 부츠",
    "spec": "Other Footwear With Outer Soles And Uppers Of Rubber Or Plastics: Sports Footwear: Ski-Boots And Cross-Country Ski Footwear And Snowboard Boots",
    "relatedAnnex2": "-",
    "country": "6402.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1416",
    "no": "1296",
    "name": "그 밖의 스포츠용 신발류 [바깥 바닥과 갑피(甲皮)를 고무나 플라스틱으로 만든 것](스키 부츠ㆍ크로스컨트리 스키화ㆍ스노보드 부츠를 제외)",
    "spec": "Other Sports Footwear, Other Than Ski-Boots And Cross-Country Ski Footwear, With Outer Soles And Uppers Of Rubber Or Plastics Nesoi",
    "relatedAnnex2": "-",
    "country": "6402.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1417",
    "no": "1297",
    "name": "그 밖의 기타 신발류[바깥 바닥과 갑피(甲皮)를 고무나 플라스틱으로 만든 것](발목을 덮지 않는 것)",
    "spec": "Other Footwear, With Outer Soles And Uppers Of Rubber Or Plastics Nesoi, Not Covering The Ankle",
    "relatedAnnex2": "-",
    "country": "6402.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1418",
    "no": "1298",
    "name": "그 밖의 재료로 만든 모자 (안을 댄 것인지 또는 장식한 것인지에 상관없음)",
    "spec": "Headgear Nesoi, Whether Or Not Lined Or Trimmed, Of Materials Nesoi",
    "relatedAnnex2": "-",
    "country": "6506.99",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1419",
    "no": "1299",
    "name": "벽돌·블록·타일과 그 밖의 도자제품 [규조토(예: 키절구어(kieselguhr)·트리폴리트(tripolite)·다이어토마이트(diatomite))나 이와 유사한 규산질의 흙으로 제조한 것]",
    "spec": "Bricks, Blocks, Tiles And Other Ceramic Goods Of Siliceous Fossil Meals (Including Kieselguhr, Tripolite Or Diatomite) Or Similar Siliceous Earths",
    "relatedAnnex2": "-",
    "country": "6901.00",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1420",
    "no": "1300",
    "name": "도자제의 건축용 벽돌",
    "spec": "Ceramic Building Bricks",
    "relatedAnnex2": "-",
    "country": "6904.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1421",
    "no": "1301",
    "name": "도자제의 기와(지붕타일)",
    "spec": "Ceramic Roofing Tiles",
    "relatedAnnex2": "-",
    "country": "6905.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1422",
    "no": "1302",
    "name": "굴뚝통·굴뚝갓·굴뚝용 내장재·건축용 장식품과 그 밖의 도자제의 건설용품",
    "spec": "Ceramic Chimney Pots, Cowls, Chimney Liners, Architectural Ornaments And Other Ceramic Constructional Goods Nesoi",
    "relatedAnnex2": "-",
    "country": "6905.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1423",
    "no": "1303",
    "name": "도자제의 판석과 포장(鋪裝)용·노(爐)용·벽용 타일(수분흡수계수가 중량기준으로 100분의 0.5 초과 100분의 10 이하인 것)",
    "spec": "Ceramic Flags And Paving, Hearth Or Wall Tiles, Of A Water Absorption Coefficient By Weight Exceeding 0.5 But Not Exceeding 10%",
    "relatedAnnex2": "-",
    "country": "6907.22",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1424",
    "no": "1304",
    "name": "유리로 만든 구(球) [지름이 1밀리미터 이하인 마이크로스피어(microsphere)는 제외](가공하지 않은 것)",
    "spec": "Glass Balls (Except Microsheres Not Over 1 Mm In Diameter), Unworked",
    "relatedAnnex2": "-",
    "country": "7002.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1425",
    "no": "1305",
    "name": "유리로 만든 막대 (가공하지 않은 것)",
    "spec": "Glass Rods, Unworked",
    "relatedAnnex2": "-",
    "country": "7002.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1426",
    "no": "1306",
    "name": "유리로 만든 기타 관 (선팽창계수가 섭씨 0도에서 300도의 범위 내에서 1켈빈 온도당 1백만분의 5 이하인 그 밖의 유리로 만든 것)(가공하지 않은 것)",
    "spec": "Glass Nesoi, Having A Linear Coefficient Of Expansion Not Over 5 × 10-6 Per Kelvin Within A Temperature Range Of 0 To 300 Degrees C, Unworked",
    "relatedAnnex2": "-",
    "country": "7002.32",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1427",
    "no": "1307",
    "name": "유리로 만든 기타 관 (가공하지 않은 것)",
    "spec": "Tubes Of Glass Nesoi, Unworked",
    "relatedAnnex2": "-",
    "country": "7002.39",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1428",
    "no": "1308",
    "name": "주입법과 롤(roll) 법으로 제조한 망입(網入)하지 않은 시트(sheet) 유리 (전 부분을 착색한 것, 불투명한 것, 다른 착색유리로 입힌 것, 흡수층·반사층·무반사층을 갖는 것)",
    "spec": "Cast And Rolled Glass, Nonwired Sheets, Colored Throughout The Mass, Opacified, Flashed, With An Absorbent, Reflecting Or Nonreflecting Layer",
    "relatedAnnex2": "-",
    "country": "7003.12",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1429",
    "no": "1309",
    "name": "주입법과 롤(roll) 법으로 제조한 망입(網入)하지 않은 시트(sheet) 유리 (전 부분을 착색한 것, 불투명한 것, 다른 착색유리로 입힌 것, 흡수층·반사층·무반사층을 갖지 않은 것)(그 밖의 방법으로 가공하지 않은 것)",
    "spec": "Cast Glass And Rolled Glass, In Nonwired Sheets Nesoi (Not Bodytinted, Opacified Or Flashed And Without An Absorbent Or Reflecting Layer), Unworked",
    "relatedAnnex2": "-",
    "country": "7003.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1430",
    "no": "1310",
    "name": "주입법과 롤(roll) 법으로 제조한 망입시트유리 [흡수층·반사층·무반사층인지에 상관없으며 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Cast Glass And Rolled Glass, In Wired Sheets, Whether Or Not Having An Absorbent Or Reflecting Layer, But Not Otherwise Worked",
    "relatedAnnex2": "-",
    "country": "7003.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1431",
    "no": "1311",
    "name": "주입법과 롤(roll) 법으로 제조한 프로파일 [흡수층·반사층·무반사층인지에 상관없으며 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Cast Glass And Rolled Glass, In Profiles, Whether Or Not Having An Absorbent Or Reflecting Layer, But Not Otherwise Worked",
    "relatedAnnex2": "-",
    "country": "7003.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1432",
    "no": "1312",
    "name": "인상법(引上法)과 취입법(吹入法)으로 제조한 전 부분을 착색한 시트 유리 [불투명한 것, 다른 착색유리로 입힌 것, 흡수층·반사층·무반사층을 갖는 것으로서 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Glass, Colored Throughout The Mass, Opacified, Flashed Or An Absorbent, Reflecting Or Nonreflecting Layer, Drawn Or Blown, Sheets Not Otherwise Worked",
    "relatedAnnex2": "-",
    "country": "7004.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1433",
    "no": "1313",
    "name": "인상법(引上法)과 취입법(吹入法)으로 제조한 그 밖의 유리 [시트(sheet) 모양으로, 흡수층·반사층·무반사층인지에 상관없으며 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Drawn Glass And Blown Glass, In Sheets, Whether Or Not Having An Absorbent Or Reflecting Layer, But Not Otherwise Worked, Nesoi",
    "relatedAnnex2": "-",
    "country": "7004.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1434",
    "no": "1314",
    "name": "플로트유리(float glass)와 표면을 연마한 유리 [시트(sheet) 모양으로 망입(網入)하지 않은 유리로서 (흡수층·반사층·무반사층을 갖고 있는 것) 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Float Glass And Surface Ground Or Polished Glass, In Sheets, Nonwired, With An Absorbent, Reflecting Or Nonreflecting Layer, But Not Otherwise Worked",
    "relatedAnnex2": "-",
    "country": "7005.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1435",
    "no": "1315",
    "name": "플로트유리(float glass)와 표면을 연마한 유리 [망입(網入)하지 않은 유리로서 전 부분을 착색한 것, 불투명한 것, 단순히 표면을 연마한 것으로 흡수층·반사층을 가지고 있지 않은 것]",
    "spec": "Float And Other Glass, In Nonwired Sheets, Colored Throughout The Mass, Opacified, Flashed Or Surface Ground, Without An Absorbent Or Reflecting Layer",
    "relatedAnnex2": "-",
    "country": "7005.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1436",
    "no": "1316",
    "name": "플로트유리(float glass)와 표면을 연마한 유리 [그 밖의 망입(網入)하지 않은 유리]",
    "spec": "Float Glass And Surface Ground Or Polished Glass, In Nonwired Sheets, Nesoi",
    "relatedAnnex2": "-",
    "country": "7005.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1437",
    "no": "1317",
    "name": "플로트유리(float glass)와 표면을 연마한 유리 [망입(網入)시트 유리로서 흡수층·반사층·무반사층인지에 상관없으며 그 밖의 방법으로 가공하지 않은 것]",
    "spec": "Float Glass And Surface Ground Or Polished Glass, In Wired Sheets, Whether Or Not Having An Absorbent Or Reflecting Layer, But Not Otherwise Worke",
    "relatedAnnex2": "-",
    "country": "7005.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1438",
    "no": "1318",
    "name": "접합 안전유리 (차량·항공기·우주선·선박에 사용하기 적합하지 않은 크기와 모양인 것)",
    "spec": "Laminated Safety Glass, Not Suitable For Incorporation In Vehicles, Aircraft, Spacecraft Or Vessels",
    "relatedAnnex2": "-",
    "country": "7007.29",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1439",
    "no": "1319",
    "name": "전등용으로 밀폐되지 않은 유리로 만든 외피와 이들의 부분품(전기 램프 등이나 이와 유사한 용도의 것으로서 부착물이 없는 것)",
    "spec": "Glass Envelopes, Open, And Glass Parts Thereof, Without Fittings, For Electric Lighting",
    "relatedAnnex2": "-",
    "country": "7011.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1440",
    "no": "1320",
    "name": "가공하지 않은 은 (금이나 백금을 도금한 은을 포함하며, 가공하지 않은 것ㆍ반가공한 모양이나 가루 모양인 것)",
    "spec": "Silver, Unwrought Nesoi (Other Than Powder)",
    "relatedAnnex2": "-",
    "country": "7106.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1441",
    "no": "1321",
    "name": "페로바나듐",
    "spec": "Ferrovanadium",
    "relatedAnnex2": "-",
    "country": "7202.92",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1442",
    "no": "1322",
    "name": "정제한 구리나 구리합금으로 만든 봉과 프로파일",
    "spec": "Bars, Rods And Profiles Of Refined Copper: Of Copper Alloys:",
    "relatedAnnex2": "-",
    "country": "7407.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1443",
    "no": "1323",
    "name": "정제한 구리로 만든 선 (횡단면의 최대치수가 6밀리미터를 초과하는 것)",
    "spec": "Copper Wire Of Refined Copper, With A Maximum Cross Sectional Dimension Over 6 Mm (23 In.)",
    "relatedAnnex2": "-",
    "country": "7408.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1444",
    "no": "1324",
    "name": "정제한 구리로 만든 선 (기타)",
    "spec": "Copper Wire Of Refined Copper, Others",
    "relatedAnnex2": "-",
    "country": "7408.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1445",
    "no": "1325",
    "name": "정제한 구리로 만든 코일 모양의 판, 시트, 스트립(두께가 0.15밀리미터를 초과하는 것)",
    "spec": "Copper Plates, Sheets And Strip Of Refined Copper, Over 0.15 Mm Thick, In Coils",
    "relatedAnnex2": "-",
    "country": "7409.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1446",
    "no": "1326",
    "name": "정제한 구리로 만든 기타 판, 시트, 스트립 (두께가 0.15밀리미터를 초과하고 코일모양이 아닌 것)",
    "spec": "Plates, Sheets And Strip Of Refined Copper, Over 0.15 Mm Thick, Not In Coils",
    "relatedAnnex2": "-",
    "country": "7409.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1447",
    "no": "1327",
    "name": "구리로 만든 와셔 (washer) [스프링와셔(spring washer)를 포함]",
    "spec": "Washers, Including Spring Washers, Of Copper",
    "relatedAnnex2": "-",
    "country": "7415.21",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1448",
    "no": "1328",
    "name": "납 가루와 플레이크",
    "spec": "Lead Powders And Flakes",
    "relatedAnnex2": "-",
    "country": "7804.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1449",
    "no": "1329",
    "name": "주석 합금으로 된 괴",
    "spec": "Tin Alloys, Unwrought",
    "relatedAnnex2": "-",
    "country": "8001.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1450",
    "no": "1330",
    "name": "띠톱의 날",
    "spec": "Bandsaw Blades",
    "relatedAnnex2": "-",
    "country": "8202.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1451",
    "no": "1331",
    "name": "금속 가공용 칼과 절단용 칼날",
    "spec": "Knives And Cutting Blades For Metal Working, For Machines Of For Mechanical Appliances.",
    "relatedAnnex2": "-",
    "country": "8208.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1452",
    "no": "1332",
    "name": "목재 가공용 칼과 절단용 칼날",
    "spec": "Knives And Cutting Blades For Wood Working, For Machines Of For Mechanical Appliances.",
    "relatedAnnex2": "-",
    "country": "8208.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1453",
    "no": "1333",
    "name": "주방기구용이나 식품공업에 사용되는 기계용 칼과 절단용 칼날",
    "spec": "Knives And Cutting Blades For Kitchen Appliances Or For Machines Used By The Food Industry",
    "relatedAnnex2": "-",
    "country": "8208.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1454",
    "no": "1334",
    "name": "기타 칼과 절단용 칼날",
    "spec": "Knives And Cutting Blades For Machines Or Mechanical Appliances Nesoi.",
    "relatedAnnex2": "-",
    "country": "8208.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1455",
    "no": "1335",
    "name": "비금속으로 만든 플렉시블 튜빙(철강으로 만든 것은 제외)",
    "spec": "Flexible Tubing, Of Base Metal, Other Than Iron Or Steel",
    "relatedAnnex2": "-",
    "country": "8307.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1456",
    "no": "1336",
    "name": "증기발생보일러나 과열수보일러, 중앙난방용 보일러의 부속기기",
    "spec": "Auxiliary Plant For Use With Steam Or Other Vapor Generating Boilers, Super-Heated Water Boilers And Central Heating Boilers.",
    "relatedAnnex2": "-",
    "country": "8404.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1457",
    "no": "1337",
    "name": "증기원동기용 응축기",
    "spec": "Condensers For Steam Or Other Vapor Power Units.",
    "relatedAnnex2": "-",
    "country": "8404.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1458",
    "no": "1338",
    "name": "증기발생보일러나 과열수보일러, 중앙난방용 보일러, 원동기용 응축기의 부속기기의 부분품",
    "spec": "Parts For Auxiliary Plant For Use With Steam Or Other Vapor Generating Boilers And Condenser Power Units, Super-Heated And Central Heating Boilers.",
    "relatedAnnex2": "-",
    "country": "8404.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1459",
    "no": "1339",
    "name": "발생로가스(producer gas)나 수성(水性)가스 발생기, 아세틸렌가스 발생기와 이와 유사한 습식가스 발생기 (청정기를 갖춘 것인지에 상관없음)",
    "spec": "Producer Gas And Water Gas Generators, Actylene Gas And Similar Water Process Gas Generators, With Or Without Their Purifiers.",
    "relatedAnnex2": "-",
    "country": "8405.10",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1460",
    "no": "1340",
    "name": "연료나 윤활유 급유용 펌프(주유소나 정비소에서 사용하는 형태)",
    "spec": "Pumps For Dispensing Fuel Or Lubricants, Of A Type Used In Filling- Stations Or Garages.",
    "relatedAnnex2": "-",
    "country": "8413.11",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1461",
    "no": "1341",
    "name": "연료ㆍ윤활유 급유용이나 냉각 냉매용 펌프 (피스톤 내연기관용)",
    "spec": "Fuel, Lubricating Or Cooling Medium Pumps For Internal Combustion Piston Engines.",
    "relatedAnnex2": "-",
    "country": "8413.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1462",
    "no": "1342",
    "name": "잘게 부순 고체연료 또는 기체연료를 사용하는 그 밖의 노(爐)용 버너 [콤비네이션 버너(combination burner)를 포함]",
    "spec": "Furnace Burners For Pulverized Solid Fuel Or For Gas, Including Combination Burners.",
    "relatedAnnex2": "-",
    "country": "8416.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1463",
    "no": "1343",
    "name": "기계식 스토커(stoker) [이들의 기계식 불판ㆍ기계식 회(灰)배출기와 이와 유사한 기기를 포함]",
    "spec": "Mechanical Stokers Including Their Mechanical Grates, Mechanical Ash Dischargers And Similar Appliances.",
    "relatedAnnex2": "-",
    "country": "8416.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1464",
    "no": "1344",
    "name": "액체연료ㆍ잘게 부순 고체연료ㆍ기체연료를 사용하는 노(爐)용 버너, 기계식 스토커(stoker) [이들의 기계식 불판ㆍ기계식 회(灰) 배출기와 이와 유사한 기기를 포함]의 부분품",
    "spec": "Parts Of Furnace Burners For Liquid Fuel, Pulverized Solid Fuel Or Gas; Parts Of Mechanical Stokers, Grates, Ash Dischargers And Similar Appliances.",
    "relatedAnnex2": "-",
    "country": "8416.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1465",
    "no": "1345",
    "name": "캘린더기(calendering machine)나 그 밖의 로울기(rolling machine) (금속이나 유리 가공용은 제외)의 부분품(실린더 제외)",
    "spec": "Parts, Except Cylinders, For Calendering Or Other Rolling Machines, Other Than For Metals Or Glass.",
    "relatedAnnex2": "-",
    "country": "8420.99",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1466",
    "no": "1346",
    "name": "그 밖의 액체나 가루의 분사용ㆍ살포용ㆍ분무용 기기",
    "spec": "Mechanical Appliances For Projecting, Dispersing Or Spraying Liquids Or Powders, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8424.89",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1467",
    "no": "1347",
    "name": "포크리프트트럭(fork-lift truck), 그 밖의 작업 트럭 [권양(捲揚)용이나 취급용 장비가 결합된 것]의 부분품",
    "spec": "Parts For Fork-Lift Trucks And Other Works Trucks Fitted With Lifting Or Handling Equipment.",
    "relatedAnnex2": "-",
    "country": "8431.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1468",
    "no": "1348",
    "name": "금속 가공용 유닛 컨스트럭션 머신(unit construction machine) (싱글스테이션)",
    "spec": "Unit Construction Machines (Single Station) For Working Metal",
    "relatedAnnex2": "-",
    "country": "8457.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1469",
    "no": "1349",
    "name": "금속 가공용 멀티스테이션(multi-station)의 트랜스퍼머신(transfer machine)",
    "spec": "Multi-Station Transfer Machines For Working Metal.",
    "relatedAnnex2": "-",
    "country": "8457.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1470",
    "no": "1350",
    "name": "금속 절삭가공용 수치제어식이 아닌 그 밖의 수평 선반",
    "spec": "Other Horizontal Lathes For Removing Metal, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8458.19",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1471",
    "no": "1351",
    "name": "금속 절삭가공용 수치제어식이 아닌 그 밖의 선반",
    "spec": "Other Lathes, Excluding Horizontal, For Removing Metal, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8458.99",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1472",
    "no": "1352",
    "name": "수치제어식이 아닌 그 밖의 드릴링 머신",
    "spec": "Drilling Machines For Removing Metal Nesoi, Not Numerically Controlled",
    "relatedAnnex2": "-",
    "country": "8459.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1473",
    "no": "1353",
    "name": "프로파일 성형기",
    "spec": "Profile Forming Machines",
    "relatedAnnex2": "-",
    "country": "8462.22",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1474",
    "no": "1354",
    "name": "수치제어식 프레스 브레이크(press brake)",
    "spec": "Numerically Controlled Press Brakes",
    "relatedAnnex2": "-",
    "country": "8462.23",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1475",
    "no": "1355",
    "name": "수치제어식 패널 굽힘기",
    "spec": "Numerically Controlled Panel Benders",
    "relatedAnnex2": "-",
    "country": "8462.24",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1476",
    "no": "1356",
    "name": "수치제어식 롤 성형기",
    "spec": "Numerically Controlled Roll Forming Machines",
    "relatedAnnex2": "-",
    "country": "8462.25",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1477",
    "no": "1357",
    "name": "그 밖의 수치제어식 굽힘기ㆍ접음기ㆍ교정기ㆍ펼침기",
    "spec": "Other Numerically Controlled Bending, Folding, Straightening Or Flattening Machines",
    "relatedAnnex2": "-",
    "country": "8462.26",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1478",
    "no": "1358",
    "name": "수치제어식 금속 전단기(프레스를 포함하며, 펀칭기와 전단기가 결합된 것은 제외)",
    "spec": "Shearing Machines (Including Presses) For Working Metal, Other Than Combined Punching And Shearing Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.33",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1479",
    "no": "1359",
    "name": "수치제어식이 아닌 금속 전단기(프레스를 포함하며, 펀칭기와 전단기가 결합된 것은 제외)",
    "spec": "Shearing Machines (Including Presses) For Working Metal, Other Than Combined Punching And Shearing Machines, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.39",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1480",
    "no": "1360",
    "name": "수치제어식 금속 펀칭기나 낫칭기(notching machine)(프레스를 포함하며, 펀칭기와 전단기가 결합된 것을 포함)",
    "spec": "Punching Or Notching Machines (Including Presses) For Working Metal, Including Combined Punching And Shearing Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.42",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1481",
    "no": "1361",
    "name": "수치제어식이 아닌 금속 펀칭기나 낫칭기(notching machine)(프레스를 포함하며, 펀칭기와 전단기가 결합된 것을 포함)",
    "spec": "Punching Or Notching Machines (Including Presses) For Working Metal, Including Combined Punching And Shearing Machines, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.49",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1482",
    "no": "1362",
    "name": "수치제어식 관ㆍ파이프ㆍ중공(中空)이 있는 형강ㆍ봉(bar) 가공용의 기계(프레스를 제외하며, 펀칭기와 전단기가 결합된 것을 포함)",
    "spec": "Machines For Working Tube, Pipe, Hollow Section And Bar (Excluding Presses) For Working Metal, Including Combined Punching And Shearing Machines, Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.51",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1483",
    "no": "1363",
    "name": "수치제어식이 아닌 관ㆍ파이프ㆍ중공(中空)이 있는 형강ㆍ봉(bar) 가공용의 기계(프레스를 제외하며, 펀칭기와 전단기가 결합된 것을 포함)",
    "spec": "Machines For Working Tube, Pipe, Hollow Section And Bar (Excluding Presses) For Working Metal, Including Combined Punching And Shearing Machines, Not Numerically Controlled.",
    "relatedAnnex2": "-",
    "country": "8462.59",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1484",
    "no": "1364",
    "name": "금속이나 서멧(cermet)의 가공용 드로우벤치(draw-bench)[봉ㆍ관ㆍ프로파일(profile)ㆍ선이나 이와 유사한 것을 인발(引拔)하는 것](재료를 절삭하지 않는 방식의 것)",
    "spec": "Draw-Benches For Bars, Tubes, Profiles, Wire Or The Like For Working Metal Or Cermet Without Removing Material.",
    "relatedAnnex2": "-",
    "country": "8463.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1485",
    "no": "1365",
    "name": "그 밖의 금속이나 서멧(cermet)의 가공용 나사 전조기(재료를 절삭하지 않는 방식의 것)",
    "spec": "Thread Rolling Machines For Working Metal Or Cermet, Without Removing Material.",
    "relatedAnnex2": "-",
    "country": "8463.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1486",
    "no": "1366",
    "name": "그 밖의 금속이나 서멧(cermet)의 가공용 선 가공기(재료를 절삭하지 않는 방식의 것)",
    "spec": "Machines For Working Wire For Working Metal Or Cermet, Without Removing Material.",
    "relatedAnnex2": "-",
    "country": "8463.30",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1487",
    "no": "1367",
    "name": "톱기계(돌ㆍ도자기ㆍ콘크리트ㆍ석면시멘트나 이와 유사한 광물성 물질의 가공용 공작기계와 유리의 냉간(冷間) 가공기계)",
    "spec": "Sawing Machines For Working Stone, Ceramics, Concrete, Asbestos-Cement Or Like Mineral Materials Or For Cold Working Glass.",
    "relatedAnnex2": "-",
    "country": "8464.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1488",
    "no": "1368",
    "name": "연마기나 광택기(돌ㆍ도자기ㆍ콘크리트ㆍ석면시멘트나 이와 유사한 광물성 물질의 가공용 공작기계와 유리의 냉간(冷間) 가공기계)",
    "spec": "Grinding Or Polishing Machines For Working Stone, Ceramics, Concrete, Asbestos-Cement Or Like Mineral Materials Or For Cold Working Glass.",
    "relatedAnnex2": "-",
    "country": "8464.20",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1489",
    "no": "1369",
    "name": "그 밖의 기계(돌ㆍ도자기ㆍ콘크리트ㆍ석면시멘트나 이와 유사한 광물성 물질의 가공용 공작기계와 유리의 냉간(冷間) 가공기계)",
    "spec": "Machine Tools For Working Stone, Ceramics, Concrete, Asbestos-Cement Or Like Mineral Materials Or For Cold Working Glass, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8464.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1490",
    "no": "1370",
    "name": "목재ㆍ코르크ㆍ뼈ㆍ경질 고무ㆍ경질 플라스틱이나 이와 유사한 경질물의 스플리팅(splitting)기ㆍ슬라이싱(slicing)기ㆍ박피기",
    "spec": "Splitting, Slicing Or Paring Machines For Working Wood, Cork, Bone, Hard Rubber, Hard Plastics Or Similar Hard Materials.",
    "relatedAnnex2": "-",
    "country": "8465.96",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1491",
    "no": "1371",
    "name": "돌ㆍ도자기ㆍ콘크리트ㆍ석면시멘트나 이와 유사한 광물성 물질의 가공용 공작기계와 유리의 냉간(冷間) 가공기계의 부분품과 부속품",
    "spec": "Parts And Accessories For Machine Tools For Working Stone, Ceramics, Concrete, Asbestos-Cement Or Like Materials Or For Cold Working Glass, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8466.91",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1492",
    "no": "1372",
    "name": "목재ㆍ코르크ㆍ뼈ㆍ경질 고무ㆍ경질 플라스틱이나 이와 유사한 경질물의 가공용 공작기계(네일용ㆍ스테이플용ㆍ접착용과 그 밖의 조립용 기계를 포함)의 부분품과 부속품",
    "spec": "Parts And Accessories For Machine Tools For Working Wood, Cork, Bone, Hard Rubber, Hard Plastics Or Similar Hard Materials, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8466.92",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1493",
    "no": "1373",
    "name": "단조(鍛造)용ㆍ형(型)단조용 등의 금속가공 공작기계, 굽힘용ㆍ전단용 등의 프레스 및 그 밖에 금속이나 서멧(cermet)용 공작기계(금속을 제거하지 않는 것)의 부분품과 부속품",
    "spec": "Parts And Accessories For Machines Tools, For Forging, Die-Forging, Shearing, Etc, And Other Machine Tools For Working Metal Or Cermets, Without Removing Material",
    "relatedAnnex2": "-",
    "country": "8466.94",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1494",
    "no": "1374",
    "name": "수지식 취관(吹管)",
    "spec": "Hand-Held Blow Pipes",
    "relatedAnnex2": "-",
    "country": "8468.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1495",
    "no": "1375",
    "name": "그 밖의가스를 사용하는 납땜용ㆍ땜질용이나 용접용 기기 (수지식 취관은 제외)",
    "spec": "Other Gas Operated Machinery And Apparatus For Soldering, Brazing Or Welding, Other Than Hand-Held Blow Pipes.",
    "relatedAnnex2": "-",
    "country": "8468.20",
    "category": "소재/금속/화학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1496",
    "no": "1376",
    "name": "그 밖의 납땜용ㆍ땜질용이나 용접용 기기",
    "spec": "Machinery And Apparatus For Soldering, Brazing Or Welding, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8468.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1497",
    "no": "1377",
    "name": "그 밖의 납땜용ㆍ땜질용이나 용접용 기기의 부분품",
    "spec": "Parts Of Machinery And Apparatus For Soldering, Brazing Or Welding, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8468.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1498",
    "no": "1378",
    "name": "콘크리트 혼합기나 모르타르 혼합기",
    "spec": "Concrete Or Mortar Mixers.",
    "relatedAnnex2": "-",
    "country": "8474.31",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1499",
    "no": "1379",
    "name": "전기램프나 전자램프ㆍ튜브ㆍ밸브ㆍ플래시벌브(flashbulb)(외피를 유리로 만든 것)의 조립기계",
    "spec": "Machines For Assembling Electric Or Electronic Lamps, Tubes Or Valves Or Flashbulbs, In Glass Envelopes",
    "relatedAnnex2": "-",
    "country": "8475.10",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1500",
    "no": "1380",
    "name": "전기램프나 전자램프ㆍ튜브ㆍ밸브ㆍ플래시벌브(flashbulb)의 조립기계, 유리나 유리제조품의 제조용이나 열간 가공용 기계의 부분품",
    "spec": "Parts Of Machines For Assembling Electric Or Electronic Lamps, Tubes Or Valves Or Flashbulbs, In Glass Envelopes And For Manufacturing Or Hot Working Glass Or Glassware.",
    "relatedAnnex2": "-",
    "country": "8475.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1501",
    "no": "1381",
    "name": "재질이 다른 것을 세트로 하거나 소포장한 개스킷(gasket)과 이와 유사한 조인트 (작은 주머니와 봉투에 넣은 것이나 이와 유사한 포장한 것)",
    "spec": "Sets Or Assortments Of Gaskets And Similar Joints, Dissimilar In Composition, Put Up In Pouches, Envelopes Or Similar Packings.",
    "relatedAnnex2": "-",
    "country": "8484.90",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1502",
    "no": "1382",
    "name": "금속으로 만든 영구자석과 자화(磁化)한 후 영구자석으로 사용되는 물품",
    "spec": "Permanent Magnets And Articles Intended To Become Permanent Magnets After Magnetization, Made Of Metal.",
    "relatedAnnex2": "-",
    "country": "8505.11",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1503",
    "no": "1383",
    "name": "금속을 제외한 기타 재질로 만든 영구자석과 자화(磁化)한 후 영구자석으로 사용되는 물품",
    "spec": "Permanent Magnets And Articles Intended To Become Permanent Magnets After Magnetization, Made Of Materials Other Than Metal",
    "relatedAnnex2": "-",
    "country": "8505.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1504",
    "no": "1384",
    "name": "전기식 조명용이나 신호용 기구 (자전거나 자동차용으로, 이륜식의 자전거용은 제외)",
    "spec": "Electrical Lighting Or Visual Signaling Equipment, For Use On Cycles Or Motor Vehicles, Except For Use On Bicycles.",
    "relatedAnnex2": "-",
    "country": "8512.20",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1505",
    "no": "1385",
    "name": "부분품 (전기식 조명용이나 시각 신호용 기구, 윈드스크린와이퍼, 제상기, 제무기의 것)(자전거나 자동차용)",
    "spec": "Parts Of Electrical Lighting Or Signaling Equipment, Windshield Wipers, Defrosters And Demisters, Used For Cycles Or Motor Vehicles.",
    "relatedAnnex2": "-",
    "country": "8512.90",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1506",
    "no": "1386",
    "name": "전열용 저항체",
    "spec": "Electric Heating Resistors.",
    "relatedAnnex2": "-",
    "country": "8516.80",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1507",
    "no": "1387",
    "name": "음성기록기기나 재생기기와 결합된 라디오방송 수신용 기기 (자동차용으로서 외부 전원 없이는 작동할 수 없는 것)",
    "spec": "Radiobroadcast Receivers For Motor Vehicles, Combined With Sound Recording Or Reproducing Apparatus, Not Capable Of Operating Without Outside Power.",
    "relatedAnnex2": "-",
    "country": "8527.21",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1508",
    "no": "1388",
    "name": "자동차단기(전압이 1,000 V 초과 72.5 kV 미만인 것)",
    "spec": "Automatic Circuit Breakers For A voltage exceeding 1,000 V but less than 72.5 kV.",
    "relatedAnnex2": "-",
    "country": "8535.21",
    "category": "자동차/항공/수송",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1509",
    "no": "1389",
    "name": "그 밖의 필라멘트 램프",
    "spec": "Electric Filament Lamps, Nesoi.",
    "relatedAnnex2": "-",
    "country": "8539.29",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1510",
    "no": "1390",
    "name": "데이터/그래픽 직시관(display tube)(단색), 데이터/그래픽 직시관(display tube) (천연색으로서 인광물질 도트화면 간격이 0.4밀리미터 미만인 것)",
    "spec": "Data/Graphic Display Tubes, Monochrome; Data/Graphic Display Tubes, Color, With A Phosphor Dot Screen Pitch Smaller Than 0.4 Mm",
    "relatedAnnex2": "-",
    "country": "8540.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1511",
    "no": "1391",
    "name": "디젤 전기기관차",
    "spec": "Diesel-Electric Locomotives",
    "relatedAnnex2": "-",
    "country": "8602.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1512",
    "no": "1392",
    "name": "소방차",
    "spec": "Fire Fighting Vehicles",
    "relatedAnnex2": "-",
    "country": "8705.30",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1513",
    "no": "1393",
    "name": "콘크리트믹서 운반차",
    "spec": "Concrete Mixer Lorries, Special Purpose Vehicles.",
    "relatedAnnex2": "-",
    "country": "8705.40",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1514",
    "no": "1394",
    "name": "부분품 (트레일러와 세미트레일러, 기계구동식이 아닌 그 밖의 차량의 것)",
    "spec": "Parts Of Trailers, Semi-Trailers And Other Vehicles, Not Mechanically Propelled.",
    "relatedAnnex2": "-",
    "country": "8716.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1515",
    "no": "1395",
    "name": "대물 렌즈와 부분품과 부속품",
    "spec": "Objective Lenses And Parts And Accessories Thereof For Instruments Or Apparatus, Nesoi",
    "relatedAnnex2": "-",
    "country": "9002.19",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1516",
    "no": "1396",
    "name": "단안경, 기타 광학식 망원경 및 장착구, 기타 천체관측용 기기와 장착구 (전파관측용 기기는 제외)",
    "spec": "Monoculars, Other Optical Telescopes And Mountings; Other Astronomical Instruments And Mountings, Excluding Instruments For Radio-Astronomy.",
    "relatedAnnex2": "-",
    "country": "9005.80",
    "category": "소프트웨어/통신/광학",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1517",
    "no": "1397",
    "name": "영화용 촬영기",
    "spec": "Cinematographic Cameras",
    "relatedAnnex2": "-",
    "country": "9007.10",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1518",
    "no": "1398",
    "name": "영화용 촬영기의 부분품과 부속품",
    "spec": "Parts And Accessories For Cinematographic Cameras",
    "relatedAnnex2": "-",
    "country": "9007.91",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1519",
    "no": "1399",
    "name": "경위의(經緯儀)와 시거의(視距儀)",
    "spec": "Theodolites And Tachyometers.",
    "relatedAnnex2": "-",
    "country": "9015.20",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1520",
    "no": "1400",
    "name": "재료의 경도ㆍ항장력ㆍ압축성ㆍ탄성이나 그 밖의 기계적 성질의 시험용 기타 기기",
    "spec": "Other Machines And Appliances For Testing The Hardness, Strength, Compressibility, Elasticity Or Other Mechanical Properties Of Materials",
    "relatedAnnex2": "-",
    "country": "9024.80",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1521",
    "no": "1401",
    "name": "재료의 경도·항장력·압축성·탄성이나 그 밖의 기계적 성질의 시험용 기기의 부분품과 부속품",
    "spec": "Parts And Accessories Of Machines Or Appliances For Testing Hardness, Strength, Compressibility, Elasticity Or Other Specific Properties Of Materials",
    "relatedAnnex2": "-",
    "country": "9024.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1522",
    "no": "1402",
    "name": "액체비중계와 이와 유사한 부력식 측정기·온도계·고온계·기압계·습도계와 건습구 습도계의 부분품과 부속품",
    "spec": "Parts And Accessories For Hydrometers And Similar Floating Instruments, Thermometers, Pyrometers, Barometers, Hygrometers And Psychrometers.",
    "relatedAnnex2": "-",
    "country": "9025.90",
    "category": "기계/공작",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1523",
    "no": "\"최적수행성능\" (\"APP\")\"APP\"는 64비트 또는 그 이상의 부동소수점 덧셈과 곱셈 연산을 수행하는\" 디지털 컴퓨터\"의 최적수행성능을 의미한다.\"APP\"는 1초당 1012번의 부동소수점 연산을 단위로 하는 Weighted TeraFLOPS (WT)로 표현된다.APP에 대한 기술해설에 사용되는 약어들:n\"디지털 컴퓨터\"의 프로세서 개수i프로세서 번호(i,...n)ti프로세서 사이클 타임(ti = 1/Fi)Fi프로세서 주파수Ri부동소수점 연산비율Wi아키텍처 조정 계수\"APP\" 계산방법 개요1. 각 프로세서 i에 대해, \"디지털 컴퓨터\" 각 프로세서의 한 사이클당 수행되는 64비트 또는 그 이상의 부동소수점 연산 횟수 FPOi를 결정한다.주 : FPO의 결정은 단지 64비트 또는 그 이상의 부동소수점 덧셈/또는 곱셈 연산만을 포함한다. 모든 부동소수점 연산은 반드시 프로세서 한 사이클당 연산으로 표현되어야 한다. 다수 사이클에 필요한 연산은 한 사이클당 연산 결과로 나누어 표현되어야 한다. 64비트 또는 그 이상의 부동소수점 연산을 수행할 수 없는 프로세서의 연산 비율 R은 0으로 간주한다.2. 각 프로세서의 부동소수점 연산 비율, Ri= FPOi / ti를 계산한다.3. \"APP\" = W1×R1 + W2×R2 + ....+ Wn×Rn 으로 \"APP\"를 계산한다.4. \"벡터프로세서\"는 Wi = 0.9, 비 \"벡터프로세서\"는 Wi = 0.3 으로 간주한다.주 1: 한 사이클 동안에 덧셈과 곱셈을 혼합하여 연산을 수행하는 프로세서는 각각의 연산을 카운트해야 한다.주 2: 파이프라인 프로세서의 연산비율 R은 파이프라인이 가득 차게 되면 파이프라인 비율 또는 비 파이프라인 비율보다 빠르다.주 3: 도움을 제공하는 각각의 프로세서의 연산비율 R은 \"APP\"가 유도되기 전에 이론적으로 가능한 가장 큰 값으로 계산되어야 한다. 동시에 발생하는 연산들에 대해서는 컴퓨터 제조자들이 합의하여 컴퓨터 매뉴얼 또는 브로슈어에 명시한다고 가정한다.주 4: \"APP\"를 계산할 때, 입/출력과 주변 기능(예, 디스크 드라이브, 통신, 비디오 디스플레이)에 제한된 프로세서들은 포함되지 않는다.주 5: \"근거리통신망\" (LAN), WAN, 입/출력 공유 접속/장치, 입/출력제어, 그리고 \"소프트웨어\"에 의해 구현되는 어떠한 상호연결 통신 등에 의해 연결되는 프로세서 조합들은 \"APP\" 계산 시 포함되지 않는다.주 6: \"APP\" 값은 결합, 동시 운영 및 메모리 공유를 통해 수행능력을 증강시키기 위해 전용 설계된 프로세서들을 포함하는 프로세서 조합들에 대해서 계산되어야 한다.기술해설:1. 동시에 동작하고 동일한 다이(die)에 위치한 모든 프로세서들과 가속기들을 결합2. 임의의 프로세서가 캐쉬라인(cache-line) 또는 메모리워드 (memory word)의 하드웨어적인 전송(소프트웨어적인 전송 방법을 포함하지 않고)을 통하여 시스템상의 임의의 메모리에 접근 가능할 때 프로세서 조합들은 메모리를 공유하며, 이는 4A003.c에 명시된 \" 전자조립체\" 등에 의해 가능할 수도 있다.주 7: \"벡터프로세서\"는 적어도 2개의 벡터 유닛과 적어도 각각 64개의 소자를 가지는 8개의 벡터 레지스터를 포함하는 부동소수점 벡터(64비트 또는 그 이상의 1차원 배열)를 동시에 다중 연산하도록 명령어를 심어놓은 프로세서로 정의된다.",
    "name": "n",
    "spec": "\"디지털 컴퓨터\"의 프로세서 개수",
    "relatedAnnex2": "i",
    "country": "프로세서 번호(i,...n)",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  },
  {
    "id": "CA-1524",
    "no": "\"스펙트럼 효율\" - QAM(직교 진폭 변조), 트렐리스 부호화(Trellis Coding), QSPK(직교 위상 천이 변조) 등과 같은 복잡한 변조 기법을 사용하는 전송 시스템의 효율성을 특성화하기 위해 매개 변수화된 성능 지표이다.다음과 같이 정의된다:\"스펙트럼 효율\" = 디지털 전송 속도 (비트/초)6 dB 스펙트럼 대역폭 (Hz)",
    "name": "\"스펙트럼 효율\" =",
    "spec": "디지털 전송 속도 (비트/초)",
    "relatedAnnex2": "6 dB 스펙트럼 대역폭 (Hz)",
    "country": "\"Spectral efficiency\" - A figure of merit parametrized to characterize the efficiency of transmission system that uses complex modulation schemes such as QAM (quadrature amplitude modulation), Trellis coding, QSPK (Q-phased shift key), etc. It is defined as follows:\"Spectral efficiency\" =Digital transfer rate (bits/second)6 dB spectrum bandwidth (Hz)",
    "category": "일반 품목",
    "reason": "대량살상무기(WMD) 및 미사일 개발 전용 우려에 따른 법정 상황허가(Catch-all) 통제 대상"
  }
];

export const redFlagsList = [
  { id: 'RF-01', code: 'RF-01', title: '최종사용자 정보 불명확', desc: '구매자 또는 최종사용자가 제품의 최종 설치 장소나 구체적 사용 목적을 명확히 밝히기를 거부함', weight: 'HIGH' },
  { id: 'RF-02', code: 'RF-02', title: '기업 통상 사업분야와 불일치', desc: '주문 품목이 구매자의 통상적인 사업 분야, 기술적 수준, 업종과 현저히 맞지 않음 (예: 식품 유통업체가 고정밀 센서/SW 주문)', weight: 'HIGH' },
  { id: 'RF-03', code: 'RF-03', title: '비정상적 대금 지급 조건', desc: '현금 전액 선결제, 제3국 우회 송금, 비정상적 신용장 조건 등 일반적 무역 관행에 어긋나는 결제 방식 요구', weight: 'MEDIUM' },
  { id: 'RF-04', code: 'RF-04', title: '비정상적 운송 및 포장 요청', desc: '통상적인 운송 경로가 아닌 우회 경로 이용, 군사지역 인근 항구/공항 배송, 또는 비정상적인 포장/라벨링 요청', weight: 'HIGH' },
  { id: 'RF-05', code: 'RF-05', title: '설치/유지보수 서비스 거부', desc: '고도의 전문 기술이 필요한 품목임에도 불구하고 통상 제공되는 설치, 시험운전, 보증, 유지보수 지원을 일체 거부함', weight: 'HIGH' },
  { id: 'RF-06', code: 'RF-06', title: '우려국가/분쟁지역 인접국 경유', desc: '최종 목적지가 이란, 시리아, 러시아 등 수출통제 우려국가 또는 무기금수국에 인접한 중개 무역 거점 국가임', weight: 'CRITICAL' },
  { id: 'RF-07', code: 'RF-07', title: '과도한 부품/예비품 주문', desc: '해당 설비나 시스템 규모에 비해 과도하게 많은 양의 예비부품 또는 교체용 핵심 소모품을 주문함', weight: 'MEDIUM' },
  { id: 'RF-08', code: 'RF-08', title: '방산/군사 연구소와의 연계 의심', desc: '최종사용자가 군사기관, 국방연구소, 또는 WMD 개발 의혹이 제기된 대학/연구기관과 밀접한 연관이 있음', weight: 'CRITICAL' },
  { id: 'RF-09', code: 'RF-09', title: '성능 사양에 대한 비정상적 집착', desc: '일반 상용 목적에는 불필요한 고온/고압/내방사선/특수 암호화 등 극한 환경 사양을 특정하여 고집함', weight: 'HIGH' },
  { id: 'RF-10', code: 'RF-10', title: '거래 당사자의 정보 제공 기피', desc: '회사 웹사이트, 사업자등록증, 카탈로그 등 기본적 기업 정보 확인을 기피하거나 연락처가 사서함/임대 사무실임', weight: 'HIGH' },
  { id: 'RF-11', code: 'RF-11', title: '국내 거래 후 비인가 재수출 의심', desc: '국내 납품 계약이나 제3자 양도 계약이지만 실제로는 최종적으로 해외 우려국가로의 재수출이 의심되는 정황', weight: 'CRITICAL' },
  { id: 'RF-12', code: 'RF-12', title: '정부기관 또는 협회의 통보', desc: '무역안보관리원, 산업부, 국가정보원 등 관계기관으로부터 우려거래자 또는 주의 대상으로 안내받은 기업', weight: 'CRITICAL' }
];
