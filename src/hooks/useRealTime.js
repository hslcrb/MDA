import { useState, useEffect } from 'react';

/**
 * 실시간 시간 커스텀 훅
 * 1초 간격으로 현재 시간 업데이트
 */
export function useRealTime(updateInterval = 1000) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  // 한국 표준시 (KST)
  const kst = now;

  // UTC
  const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  // 24시간 포맷
  const militaryTime = `${String(kst.getHours()).padStart(2, '0')}:${String(kst.getMinutes()).padStart(2, '0')}:${String(kst.getSeconds()).padStart(2, '0')}`;

  // UTC 시간
  const utcTime = `${String(utc.getHours()).padStart(2, '0')}:${String(utc.getMinutes()).padStart(2, '0')}:${String(utc.getSeconds()).padStart(2, '0')}`;

  // 한국어 날짜
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const koreanDate = `${kst.getFullYear()}년 ${String(kst.getMonth() + 1).padStart(2, '0')}월 ${String(kst.getDate()).padStart(2, '0')}일 (${days[kst.getDay()]})`;

  return {
    now: kst,
    utc,
    militaryTime,
    utcTime,
    koreanDate,
    hours: kst.getHours(),
    minutes: kst.getMinutes(),
    seconds: kst.getSeconds(),
  };
}

export default useRealTime;
