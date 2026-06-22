import React, { useRef, useEffect } from 'react';
import { Newspaper, AlertTriangle, RefreshCw } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import { formatTimeAgo } from '../utils/api';

export default function NewsFeed() {
  const { news, loading, isUsingMock, lastUpdated, refresh } = useNews();
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5; // px per frame

    function autoScroll() {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth - container.clientWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    }

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    // 마우스 오버 시 스크롤 일시 정지
    const pause = () => cancelAnimationFrame(autoScrollRef.current);
    const resume = () => {
      scrollPos = container.scrollLeft;
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(autoScrollRef.current);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, [news]);

  return (
    <div className="news-ticker" id="news-feed">
      <div className="news-ticker-header">
        <Newspaper size={12} />
        <span>실시간 뉴스</span>
        {isUsingMock && (
          <span className="card-badge mock" style={{ marginLeft: '8px' }}>
            시뮬레이션 데이터
          </span>
        )}
        {lastUpdated && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.6rem',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
          }}>
            최종 갱신: {lastUpdated.toLocaleTimeString('ko-KR')}
          </span>
        )}
        <button
          onClick={refresh}
          style={{
            background: 'none',
            border: '1px solid var(--border-primary)',
            borderRadius: '4px',
            padding: '2px 6px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.6rem',
          }}
        >
          <RefreshCw size={10} />
        </button>
      </div>

      <div className="news-scroll-container" ref={scrollRef}>
        {loading ? (
          <div className="loading-spinner" style={{ width: '100%', padding: '12px' }}>
            <div className="spinner" />
            <span>뉴스 불러오는 중...</span>
          </div>
        ) : (
          news.map((item, idx) => (
            <a
              key={idx}
              href={item.url !== '#' ? item.url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className={`news-item ${item.isUrgent ? 'urgent' : ''}`}>
                <span className={`news-item-tag ${item.isUrgent ? 'urgent' : 'normal'}`}>
                  {item.isUrgent ? '🔴 긴급' : '📰 뉴스'}
                </span>
                <div className="news-item-title">{item.title}</div>
                <div className="news-item-meta">
                  <span>{item.source?.name || '알 수 없음'}</span>
                  <span>·</span>
                  <span>{formatTimeAgo(item.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
