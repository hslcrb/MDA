/**
 * MDL(군사분계선) 및 DMZ 좌표 데이터
 * 서해(임진강 하구) ~ 동해(고성) 구간
 * 
 * 참고: 이 좌표는 공개된 대략적인 위치를 기반으로 합니다.
 * 실제 군사분계선의 정확한 좌표와 차이가 있을 수 있습니다.
 */

// MDL(군사분계선) 주요 경유점 좌표 [lng, lat]
export const MDL_LINE_COORDS = [
  // 서해 임진강 하구
  [126.6100, 37.8400],
  [126.6350, 37.8550],
  [126.6772, 37.9563], // 판문점 인근
  [126.7200, 37.9700],
  [126.7800, 37.9850],
  [126.8500, 37.9950],
  // 중부 구간
  [126.9200, 38.0100],
  [127.0000, 38.0300],
  [127.1000, 38.0500],
  [127.2000, 38.0700],
  [127.3000, 38.1000],
  [127.4000, 38.1200],
  [127.5000, 38.1500],
  [127.5500, 38.1800],
  // 중동부 구간 (철원-화천)
  [127.6000, 38.2000],
  [127.7000, 38.2200],
  [127.7500, 38.2500],
  [127.8000, 38.2700],
  [127.9000, 38.2800],
  [128.0000, 38.3000],
  // 동부 구간 (양구-인제)
  [128.1000, 38.3200],
  [128.2000, 38.3500],
  [128.2500, 38.3700],
  [128.3000, 38.4000],
  [128.3500, 38.4200],
  // 동해안 구간 (고성)
  [128.4000, 38.4500],
  [128.4500, 38.4700],
  [128.5000, 38.5000],
  [128.5500, 38.5300],
  [128.6000, 38.5500],
  [128.6500, 38.5800],
  [128.6800, 38.6000],
];

// DMZ 남방한계선 (MDL 기준 남쪽 약 2km)
export const SLL_COORDS = MDL_LINE_COORDS.map(([lng, lat]) => [
  lng + (Math.random() - 0.5) * 0.005,
  lat - 0.018 + (Math.random() - 0.5) * 0.002,
]);

// DMZ 북방한계선 (MDL 기준 북쪽 약 2km)
export const NLL_COORDS = MDL_LINE_COORDS.map(([lng, lat]) => [
  lng + (Math.random() - 0.5) * 0.005,
  lat + 0.018 + (Math.random() - 0.5) * 0.002,
]);

// DMZ 영역 폴리곤 (GeoJSON)
export const DMZ_POLYGON = {
  type: 'Feature',
  properties: {
    name: '비무장지대 (DMZ)',
    description: '군사분계선 기준 남북 각 2km, 총 4km 폭의 완충지대',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [...NLL_COORDS, ...SLL_COORDS.slice().reverse(), NLL_COORDS[0]],
    ],
  },
};

// 3D 지구본용 MDL 아크 데이터
export const MDL_ARCS = [];
for (let i = 0; i < MDL_LINE_COORDS.length - 1; i++) {
  MDL_ARCS.push({
    startLat: MDL_LINE_COORDS[i][1],
    startLng: MDL_LINE_COORDS[i][0],
    endLat: MDL_LINE_COORDS[i + 1][1],
    endLng: MDL_LINE_COORDS[i + 1][0],
    color: ['rgba(255, 68, 68, 0.9)', 'rgba(255, 68, 68, 0.9)'],
    stroke: 1.5,
    label: i === 0 ? '군사분계선 (MDL)' : '',
  });
}

// DMZ 폴리곤 - 지구본용
export const DMZ_POLYGON_DATA = [{
  lat: 38.15,
  lng: 127.5,
  label: '비무장지대 (DMZ)',
  color: 'rgba(255, 170, 0, 0.15)',
}];

// 한반도 중심 좌표
export const KOREA_CENTER = {
  lat: 37.5,
  lng: 127.0,
};

// MDL 중심 좌표
export const MDL_CENTER = {
  lat: 38.15,
  lng: 127.5,
};

// 지도 바운드 (DMZ 전역)
export const DMZ_BOUNDS = {
  west: 126.5,
  south: 37.7,
  east: 128.8,
  north: 38.8,
};
