import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Globe3D from './components/Globe3D';
import DMZMap from './components/DMZMap';
import NewsFeed from './components/NewsFeed';
import TimeDisplay from './components/TimeDisplay';
import ThreatLevel from './components/ThreatLevel';
import StatsGrid from './components/StatsGrid';
import StatusPanel from './components/StatusPanel';
import WeatherPanel from './components/WeatherPanel';
import { fetchKoreanNews, formatTimeAgo } from './utils/api';
import { MOCK_NEWS } from './data/mock-news';

export default function App() {
  return (
    <div className="app-container">
      {/* 스캔라인 오버레이 (CRT 효과) */}
      <div className="scanline-overlay" />

      {/* 상단 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 좌측 패널 */}
        <div className="left-panel">
          <TimeDisplay />
          <ThreatLevel />
          <StatsGrid />
        </div>

        {/* 중앙 패널 */}
        <div className="center-panel">
          <Globe3D />
          <DMZMap />
        </div>

        {/* 우측 패널 */}
        <div className="right-panel">
          <StatusPanel />
          <WeatherPanel />
          <NewsFeedSidebar />
        </div>
      </div>

      {/* 하단 뉴스 티커 */}
      <NewsFeed />
    </div>
  );
}

/**
 * 사이드바용 뉴스 피드 (우측 패널)
 */
function NewsFeedSidebar() {
  const { news, isUsingMock } = useNewsForSidebar();

  return (
    <div className="card" id="news-sidebar" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div className="card-header">
        <div className="card-title">
          <span style={{ fontSize: '12px' }}>📋</span>
          주요 뉴스
        </div>
        {isUsingMock && <span className="card-badge mock">시뮬레이션</span>}
      </div>
      <div className="news-feed-list">
        {news.slice(0, 6).map((item, idx) => (
          <a
            key={idx}
            href={item.url !== '#' ? item.url : undefined}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div className={`news-feed-item ${item.isUrgent ? 'urgent' : ''}`}>
              <div className="news-feed-item-title">{item.title}</div>
              <div className="news-feed-item-meta">
                <span className="news-feed-item-source">{item.source?.name}</span>
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// 사이드바 뉴스용 간단 훅 (메인 NewsFeed와 데이터 공유 최적화 가능)
function useNewsForSidebar() {
  const [news, setNews] = useState([]);
  const [isUsingMock, setIsUsingMock] = useState(false);

  useEffect(() => {
    async function load() {
      const articles = await fetchKoreanNews();
      if (articles && articles.length > 0) {
        setNews(articles.map((a, i) => ({ ...a, isUrgent: i < 2 })));
        setIsUsingMock(false);
      } else {
        setNews(MOCK_NEWS);
        setIsUsingMock(true);
      }
    }
    load();
    const interval = setInterval(load, 300000);
    return () => clearInterval(interval);
  }, []);

  return { news, isUsingMock };
}

