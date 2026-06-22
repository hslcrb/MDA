/**
 * API 호출 유틸리티
 */

const GNEWS_BASE_URL = 'https://gnews.io/api/v4';
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';

/**
 * GNews API로 한국어 뉴스 검색
 */
export async function fetchKoreanNews(query = 'MDL OR DMZ OR 북한 OR 군사') {
  if (!GNEWS_API_KEY) {
    return null; // API 키 없으면 null 반환 → 모의 데이터 사용
  }

  try {
    const params = new URLSearchParams({
      q: query,
      lang: 'ko',
      country: 'kr',
      max: '10',
      apikey: GNEWS_API_KEY,
    });

    const response = await fetch(`${GNEWS_BASE_URL}/search?${params}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('뉴스 API 호출 실패:', error);
    return null;
  }
}

/**
 * GNews API로 한국 헤드라인 뉴스
 */
export async function fetchTopHeadlines() {
  if (!GNEWS_API_KEY) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      lang: 'ko',
      country: 'kr',
      max: '10',
      apikey: GNEWS_API_KEY,
    });

    const response = await fetch(`${GNEWS_BASE_URL}/top-headlines?${params}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('헤드라인 API 호출 실패:', error);
    return null;
  }
}

/**
 * 시간 포맷팅 유틸리티
 */
export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return date.toLocaleDateString('ko-KR');
}

/**
 * 한국어 날짜 포맷
 */
export function formatKoreanDate(date = new Date()) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayName = days[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayName})`;
}

/**
 * 24시간 군사 시간 포맷
 */
export function formatMilitaryTime(date = new Date()) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
