/**
 * 모의 뉴스 데이터
 * GNews API 키가 없을 때 대시보드 시연용
 * 실제 뉴스가 아닌 시뮬레이션 데이터입니다
 */

const now = new Date();
const hours = (h) => new Date(now.getTime() - h * 3600 * 1000).toISOString();

export const MOCK_NEWS = [
  {
    title: '[속보] 합참 "북측 군사분계선 인근 이상 동향 포착... 예의주시 중"',
    description: '합동참모본부는 오늘 오전 북측 군사분계선 인근에서 이례적인 군사 활동이 포착됐다고 밝혔다. 합참 관계자는 "우리 군은 만반의 대비태세를 유지하고 있다"고 전했다.',
    source: { name: '연합뉴스' },
    publishedAt: hours(0.5),
    url: '#',
    image: null,
    isUrgent: true,
  },
  {
    title: '군 당국, MDL 감시 강화... 전방부대 경계태세 격상',
    description: '국방부는 최근 MDL 일대 긴장 고조에 따라 전방부대의 경계태세를 한 단계 격상했다고 발표했다. GOP 근무 병력의 감시 활동도 강화된 것으로 알려졌다.',
    source: { name: 'KBS' },
    publishedAt: hours(1),
    url: '#',
    image: null,
    isUrgent: true,
  },
  {
    title: '유엔사 "DMZ 내 정전협정 위반 사례 증가 추세"',
    description: '유엔군사령부는 올해 들어 DMZ 내 정전협정 위반 사례가 전년 대비 30% 증가했다고 밝혔다. 주요 위반 사항으로는 무장 병력의 DMZ 진입, 총격 사건 등이 포함됐다.',
    source: { name: 'MBC' },
    publishedAt: hours(2),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '기상청 "DMZ 일대 짙은 안개 예보... 감시 활동 제한 우려"',
    description: '기상청은 내일 새벽부터 DMZ 일대에 짙은 안개가 낄 것으로 예보했다. 가시거리 200m 미만의 안개가 예상되며, 전방 감시 활동에 영향을 미칠 수 있다.',
    source: { name: 'YTN' },
    publishedAt: hours(3),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '합참 "서해 NLL 인근 북측 어선 다수 남하... 경고 통신 실시"',
    description: '합동참모본부는 서해 북방한계선(NLL) 인근에서 북측 어선 다수가 남하한 것을 포착하고 경고 통신을 실시했다고 밝혔다.',
    source: { name: 'SBS' },
    publishedAt: hours(4),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '국방부 "한미 연합 감시정찰 자산 가동... 24시간 모니터링"',
    description: '국방부 대변인은 정례 브리핑에서 한미 연합 감시정찰 자산을 최대 가동하여 MDL 일대를 24시간 모니터링하고 있다고 밝혔다.',
    source: { name: '국방일보' },
    publishedAt: hours(5),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '전방 GP "야간 열상감시장비 운용 강화"',
    description: '전방 경계초소(GP)에서는 최근 긴장 상황에 대비하여 야간 열상감시장비 운용을 강화하고, 순찰 빈도를 높였다고 전해졌다.',
    source: { name: '세계일보' },
    publishedAt: hours(6),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '철원 민통선 내 주민 "긴장 속 일상 이어가"',
    description: '철원 민통선 내 거주 주민들은 최근 MDL 긴장 상황에도 불구하고 농사 등 일상을 이어가고 있다. 다만 군의 안전 수칙 안내가 강화된 것으로 알려졌다.',
    source: { name: '한겨레' },
    publishedAt: hours(8),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '통일부 "남북 통신선 가동 현황 점검... 상시 연락체계 유지"',
    description: '통일부는 남북 통신선 가동 현황을 점검하고, 상시 연락체계를 유지하고 있다고 밝혔다. 판문점 연락사무소를 통한 통신도 정상 운영 중이다.',
    source: { name: '조선일보' },
    publishedAt: hours(10),
    url: '#',
    image: null,
    isUrgent: false,
  },
  {
    title: '전문가 "현재 MDL 상황, 면밀한 관찰 필요... 과도한 불안 자제해야"',
    description: '안보 전문가들은 현재 MDL 상황에 대해 면밀한 관찰이 필요하지만, 과도한 불안감을 자제할 필요가 있다고 조언했다.',
    source: { name: '중앙일보' },
    publishedAt: hours(12),
    url: '#',
    image: null,
    isUrgent: false,
  },
];

export default MOCK_NEWS;
