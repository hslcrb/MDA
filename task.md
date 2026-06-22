# MDL/DMZ 종합상황실 대시보드 - 작업 추적

## 1. 프로젝트 초기화
- [x] Vite + React 프로젝트 생성
- [x] 의존성 설치 (react-globe.gl, maplibre-gl, recharts, lucide-react)
- [x] 프로젝트 구조 설정

## 2. 디자인 시스템
- [x] index.css - 다크 밀리터리 테마 디자인 토큰
- [x] 글로벌 스타일 + 애니메이션 (스캔라인, 펄스, 글로우)
- [x] Google Fonts 설정 (Noto Sans KR, JetBrains Mono)

## 3. 데이터 레이어
- [x] dmz-coordinates.js - MDL/DMZ 좌표 데이터
- [x] gp-locations.js - 주요 GP/지점 위치
- [x] mock-news.js - 모의 뉴스 데이터

## 4. 유틸리티/훅
- [x] useNews.js - 뉴스 API 커스텀 훅
- [x] useRealTime.js - 실시간 시간 훅
- [x] api.js - API 호출 유틸리티

## 5. 핵심 컴포넌트
- [x] Header.jsx - 상단 헤더
- [x] Globe3D.jsx - 3D 지구본
- [x] DMZMap.jsx - DMZ 전역 3D 지도
- [x] NewsFeed.jsx - 실시간 뉴스 피드
- [x] StatusPanel.jsx - 상황 요약 패널
- [x] ThreatLevel.jsx - 위협 수준 게이지
- [x] TimeDisplay.jsx - 실시간 시계
- [x] StatsGrid.jsx - 통계 그리드
- [x] WeatherPanel.jsx - 기상 정보

## 6. 앱 조립
- [x] App.jsx - 레이아웃 조립
- [x] main.jsx - 진입점

## 7. 검증
- [x] dev 서버 실행 및 확인
- [x] 3D 렌더링 확인
- [x] 한글화 확인
- [x] 다크 테마 확인
