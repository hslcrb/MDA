import { useState, useEffect, useCallback } from 'react';
import { fetchKoreanNews } from '../utils/api';
import { MOCK_NEWS } from '../data/mock-news';

/**
 * 뉴스 데이터 커스텀 훅
 * API 키가 있으면 실제 뉴스, 없으면 모의 데이터 사용
 */
export function useNews(refreshInterval = 300000) { // 5분 간격
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const articles = await fetchKoreanNews();

      if (articles && articles.length > 0) {
        // 실제 API 데이터 사용
        const formattedArticles = articles.map((article, idx) => ({
          ...article,
          isUrgent: idx < 2, // 첫 2개를 긴급으로 표시
        }));
        setNews(formattedArticles);
        setIsUsingMock(false);
      } else {
        // 모의 데이터 사용
        setNews(MOCK_NEWS);
        setIsUsingMock(true);
      }

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('뉴스 불러오기 실패:', err);
      setNews(MOCK_NEWS);
      setIsUsingMock(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchNews, refreshInterval]);

  return {
    news,
    loading,
    isUsingMock,
    lastUpdated,
    error,
    refresh: fetchNews,
  };
}

export default useNews;
