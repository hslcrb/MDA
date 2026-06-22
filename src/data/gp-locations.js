/**
 * DMZ 인근 주요 공개 지점 좌표
 * 관광지, 전망대 등 공개된 위치만 포함
 */

export const GP_LOCATIONS = [
  {
    id: 'panmunjom',
    name: '판문점 (JSA)',
    lat: 37.9563,
    lng: 126.6772,
    type: 'landmark',
    description: '유엔군사령부 공동경비구역',
    icon: '🏛️',
    importance: 'critical',
  },
  {
    id: 'dora',
    name: '도라전망대',
    lat: 37.9070,
    lng: 126.6830,
    type: 'observatory',
    description: 'MDL 최근접 전망대, 개성공단 조망 가능',
    icon: '🔭',
    importance: 'high',
  },
  {
    id: 'imjingak',
    name: '임진각 평화누리',
    lat: 37.8890,
    lng: 126.7407,
    type: 'landmark',
    description: '민간인출입통제선 인근 평화공원',
    icon: '🕊️',
    importance: 'medium',
  },
  {
    id: 'cheolwon',
    name: '철원 백마고지',
    lat: 38.1750,
    lng: 127.2100,
    type: 'battlefield',
    description: '6.25 격전지, 철원평야 일대',
    icon: '⚔️',
    importance: 'high',
  },
  {
    id: 'eulji',
    name: '을지전망대',
    lat: 38.2180,
    lng: 128.0770,
    type: 'observatory',
    description: '동부전선 최전방 전망대',
    icon: '🔭',
    importance: 'high',
  },
  {
    id: 'goseong',
    name: '고성 통일전망대',
    lat: 38.5870,
    lng: 128.3920,
    type: 'observatory',
    description: '동해안 최북단 전망대, 금강산 조망',
    icon: '🔭',
    importance: 'high',
  },
  {
    id: 'tunnel3',
    name: '제3땅굴',
    lat: 37.9220,
    lng: 126.6810,
    type: 'tunnel',
    description: '1978년 발견, 판문점 남방 4km',
    icon: '🕳️',
    importance: 'high',
  },
  {
    id: 'tunnel4',
    name: '제4땅굴',
    lat: 38.2460,
    lng: 127.5050,
    type: 'tunnel',
    description: '1990년 발견, 양구 해안면',
    icon: '🕳️',
    importance: 'high',
  },
  {
    id: 'dorasan',
    name: '도라산역',
    lat: 37.8977,
    lng: 126.6747,
    type: 'landmark',
    description: '경의선 남측 최북단역',
    icon: '🚂',
    importance: 'medium',
  },
  {
    id: 'yanggu',
    name: '양구 펀치볼',
    lat: 38.2800,
    lng: 128.1200,
    type: 'landmark',
    description: '해안분지, 전쟁기념관',
    icon: '🏔️',
    importance: 'medium',
  },
  {
    id: 'hwacheon',
    name: '화천 평화의댐',
    lat: 38.1350,
    lng: 127.8650,
    type: 'landmark',
    description: '북한 금강산댐 수공 대비 건설',
    icon: '🌊',
    importance: 'medium',
  },
  {
    id: 'kaesong',
    name: '개성공단',
    lat: 37.9280,
    lng: 126.6150,
    type: 'north',
    description: '남북경협 산업단지 (현재 가동 중단)',
    icon: '🏭',
    importance: 'high',
  },
];

// 지구본용 포인트 데이터 변환
export const GP_POINTS_DATA = GP_LOCATIONS.map((loc) => ({
  lat: loc.lat,
  lng: loc.lng,
  name: loc.name,
  size: loc.importance === 'critical' ? 0.15 : loc.importance === 'high' ? 0.1 : 0.07,
  color: loc.importance === 'critical'
    ? '#ff4444'
    : loc.importance === 'high'
    ? '#ffaa00'
    : '#00ff88',
  type: loc.type,
}));

// 지도 마커용 데이터
export const MAP_MARKERS = GP_LOCATIONS.map((loc) => ({
  ...loc,
  coordinates: [loc.lng, loc.lat],
}));
