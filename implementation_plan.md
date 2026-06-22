# MDL/DMZ 종합상황실 3D 대시보드

## 목표
MDL(군사분계선) 긴장 상황을 실시간 모니터링하는 **군사 종합상황실 스타일 대시보드** 제작.  
3D 지구본 + DMZ 전역지도 + 실시간 뉴스 피드를 통합한 프리미엄 다크 테마 UI.  
**완전 한글화**, Anthropic 브랜딩 없음.

---

## 기술 스택

| 구분 | 기술 | 선택 이유 |
|:---|:---|:---|
| **프레임워크** | React + Vite | 빠른 HMR, 최신 React 지원 |
| **3D 지구본** | `react-globe.gl` | Three.js 기반, 데이터 시각화 특화, 아크/마커/폴리곤 지원 |
| **3D 전역지도** | MapLibre GL JS | 오픈소스, API키 불필요, 3D 지형 지원 |
| **뉴스 API** | GNews API (무료 티어) | 한국어(`lang=ko`), 한국(`country=kr`) 필터 지원, 일 100회 무료 |
| **백업 뉴스** | RSS 피드 파싱 (Google News 한국) | API 제한 시 폴백 |
| **스타일링** | Vanilla CSS (CSS 변수 기반 디자인 시스템) | 군사 미학 커스텀 다크 테마 |
| **아이콘** | Lucide React | 경량, 깔끔한 아이콘 |
| **차트** | Recharts | React 네이티브 차트 라이브러리 |

---

## User Review 필요 사항

> [!IMPORTANT]
> **뉴스 API 키**: GNews API는 무료 가입 후 API 키 발급이 필요합니다.
> - https://gnews.io 에서 가입 → API 키 발급
> - `.env` 파일에 `VITE_GNEWS_API_KEY=발급받은키` 로 설정
> - **API 키 없이도 작동**: 키가 없으면 모의 데이터(Mock Data)로 대시보드 시연

> [!IMPORTANT]
> **지도 타일**: MapLibre GL JS는 라이브러리 자체는 무료이나, 지도 타일 데이터 제공자가 필요합니다.
> - **옵션 A**: MapTiler 무료 티어 (월 100,000 타일 요청, 가입 필요)
> - **옵션 B**: OpenFreeMap (완전 무료, API 키 불필요, 스타일 제한적)
> - 기본값은 **OpenFreeMap**으로 설정하여 가입 없이 즉시 실행 가능하게 합니다

---

## Open Questions

> [!NOTE]
> 1. **뉴스 API 키를 이미 보유하고 계신가요?** GNews 또는 NewsAPI 키가 있다면 알려주세요.
> 2. **MapTiler API 키가 있으신가요?** 있다면 3D 지형 렌더링 품질이 크게 향상됩니다.
> 3. **특정 GP(경계초소) 위치를 표시하고 싶으신가요?** 공개된 GP 위치 데이터를 활용할 수 있습니다.

---

## 제안 변경사항

### 1. 프로젝트 초기화 (Vite + React)

#### [NEW] 프로젝트 구조
```
c:\Users\user\MDA\
├── index.html
├── package.json
├── vite.config.js
├── .env                          # API 키 설정
├── public/
│   └── textures/                 # 지구본 텍스처 (자동 생성)
└── src/
    ├── main.jsx                  # 앱 진입점
    ├── App.jsx                   # 레이아웃 + 라우팅
    ├── index.css                 # 디자인 시스템 (다크 테마)
    ├── components/
    │   ├── Globe3D.jsx           # 3D 지구본 (react-globe.gl)
    │   ├── DMZMap.jsx            # DMZ 전역 3D 지도 (MapLibre)
    │   ├── NewsFeed.jsx          # 실시간 뉴스 피드
    │   ├── StatusPanel.jsx       # 상황 요약 패널
    │   ├── ThreatLevel.jsx       # 위협 수준 게이지
    │   ├── WeatherPanel.jsx      # 기상 정보
    │   ├── TimeDisplay.jsx       # 시계/타임라인
    │   ├── StatsGrid.jsx         # 통계 그리드
    │   └── Header.jsx            # 상단 헤더
    ├── data/
    │   ├── dmz-coordinates.js    # MDL/DMZ 좌표 데이터
    │   ├── gp-locations.js       # 주요 GP 위치
    │   └── mock-news.js          # 모의 뉴스 데이터 (API 키 없을 때)
    ├── hooks/
    │   ├── useNews.js            # 뉴스 API 커스텀 훅
    │   └── useRealTime.js        # 실시간 시간 훅
    └── utils/
        └── api.js                # API 호출 유틸리티
```

---

### 2. 디자인 시스템 (다크 밀리터리 테마)

#### [NEW] [index.css](file:///c:/Users/user/MDA/src/index.css)

**컬러 팔레트** (군사 상황실 테마):
- 배경: `#0a0e17` (깊은 네이비 블랙)
- 카드: `#111827` (다크 그레이)
- 주 강조색: `#00ff88` (전술 그린)
- 경고: `#ff4444` (레드 얼럿)
- 주의: `#ffaa00` (앰버 옐로우)
- 테두리: `rgba(0, 255, 136, 0.15)` (그린 글로우)
- 텍스트: `#e5e7eb` (밝은 그레이)

**디자인 특징**:
- 글래스모피즘 카드 (backdrop-filter: blur)
- 스캔라인 오버레이 효과 (CRT 모니터 느낌)
- 네온 글로우 테두리
- 모노스페이스 + 산세리프 혼합 타이포그래피
- 펄스/글로우 마이크로 애니메이션

---

### 3. 핵심 컴포넌트

#### [NEW] [Globe3D.jsx](file:///c:/Users/user/MDA/src/components/Globe3D.jsx)
- `react-globe.gl` 기반 3D 지구본
- 한반도 중심 카메라 (위도 38.0°, 경도 127.5°)
- MDL 라인을 **빨간색 아크**로 표시
- DMZ 구역을 **반투명 폴리곤**으로 표시
- 주요 GP 위치를 **펄스 포인트**로 표시
- 야간 모드 텍스처 (어두운 지구본 + 도시 불빛)
- 자동 회전 + 마우스 인터랙션

#### [NEW] [DMZMap.jsx](file:///c:/Users/user/MDA/src/components/DMZMap.jsx)
- MapLibre GL JS 기반 2.5D/3D 지형 지도
- DMZ 전역 (서해~동해) 확대 뷰
- 3D 지형 (산악 지형 고도 표현)
- MDL 라인 오버레이 (빨간 점선)
- 남방한계선(SLL) / 북방한계선(NLL) 표시
- 주요 지점 마커 (판문점, 도라전망대 등)
- 다크 맵 스타일

#### [NEW] [NewsFeed.jsx](file:///c:/Users/user/MDA/src/components/NewsFeed.jsx)
- GNews API로 "MDL", "DMZ", "북한", "군사" 키워드 뉴스 검색
- 자동 스크롤 뉴스 티커
- 뉴스 카드: 제목, 출처, 시간, 미리보기 이미지
- 긴급 뉴스 빨간색 하이라이트
- 5분 간격 자동 갱신
- API 키 없을 시 모의 데이터 표시

#### [NEW] [StatusPanel.jsx](file:///c:/Users/user/MDA/src/components/StatusPanel.jsx)
- 현재 MDL 상황 요약
- 경계 태세 단계 표시 (진돗개 단계)
- 주요 지표: 감시 자산 현황, 이상 징후 건수

#### [NEW] [ThreatLevel.jsx](file:///c:/Users/user/MDA/src/components/ThreatLevel.jsx)
- 원형 게이지 (위협 수준 시각화)
- 단계별 색상: 녹색 → 황색 → 적색
- 애니메이션 펄스 효과
- 현재 DEFCON/경계태세 표시

#### [NEW] [TimeDisplay.jsx](file:///c:/Users/user/MDA/src/components/TimeDisplay.jsx)
- 실시간 시계 (KST)
- UTC 동시 표시
- 날짜 + 요일 (한국어)
- 밀리터리 타임 포맷 (24시간)

#### [NEW] [StatsGrid.jsx](file:///c:/Users/user/MDA/src/components/StatsGrid.jsx)
- 핵심 통계 카드 그리드
- 항목: 오늘 감시 현황, 이상 징후, 경보 발령, 기상 경보
- 숫자 카운트업 애니메이션

#### [NEW] [Header.jsx](file:///c:/Users/user/MDA/src/components/Header.jsx)
- 상단 바: "MDL 종합상황실"
- 실시간 연결 상태 인디케이터
- 날짜/시간

---

### 4. 데이터 레이어

#### [NEW] [dmz-coordinates.js](file:///c:/Users/user/MDA/src/data/dmz-coordinates.js)
- MDL 라인 좌표 (서해 ~ 동해, 약 248km 구간의 공개 좌표점)
- DMZ 남방한계선 / 북방한계선 좌표
- GeoJSON 형식

#### [NEW] [gp-locations.js](file:///c:/Users/user/MDA/src/data/gp-locations.js)
- 주요 공개 지점 좌표:
  - 판문점 (37.9563°N, 126.6772°E)
  - 도라전망대
  - 을지전망대
  - 고성 통일전망대
  - 임진각 평화누리공원
  - 철원 백마고지

#### [NEW] [mock-news.js](file:///c:/Users/user/MDA/src/data/mock-news.js)
- API 키 없을 때 사용할 현실적 모의 뉴스 데이터
- MDL/DMZ/안보 관련 시나리오

---

### 5. 대시보드 레이아웃

#### [NEW] [App.jsx](file:///c:/Users/user/MDA/src/App.jsx)

```
┌────────────────────────────────────────────────────────────┐
│                    MDL 종합상황실 (Header)                    │
├──────────────┬──────────────────────┬───────────────────────┤
│              │                      │    상황 요약 패널      │
│   3D 지구본   │    DMZ 전역 3D 지도    │    위협 수준 게이지    │
│  (Globe3D)   │     (DMZMap)         │    기상 정보           │
│              │                      │    통계 그리드         │
├──────────────┴──────────────────────┴───────────────────────┤
│              실시간 뉴스 피드 (NewsFeed - 하단 티커)            │
└────────────────────────────────────────────────────────────┘
```

---

## 검증 계획

### 자동 테스트
```bash
cd c:\Users\user\MDA
npm run dev
# 브라우저에서 http://localhost:5173 접속하여 확인
```

### 수동 검증
1. **3D 지구본**: 한반도 중심 렌더링, MDL 라인 표시, 마우스 인터랙션 확인
2. **DMZ 지도**: 3D 지형, MDL/DMZ 오버레이, 마커 표시 확인
3. **뉴스 피드**: API 연결 또는 모의 데이터 표시 확인
4. **반응형**: 다양한 화면 크기에서 레이아웃 확인
5. **한글화**: 모든 UI 텍스트 한국어 확인
6. **다크 테마**: 전체 UI 다크 모드 + 군사 미학 확인
7. **애니메이션**: 스캔라인, 펄스, 글로우 효과 확인
