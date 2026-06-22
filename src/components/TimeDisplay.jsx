import React from 'react';
import { useRealTime } from '../hooks/useRealTime';
import { Clock } from 'lucide-react';

export default function TimeDisplay() {
  const { militaryTime, utcTime, koreanDate } = useRealTime();

  return (
    <div className="card" id="time-display">
      <div className="card-header">
        <div className="card-title">
          <Clock size={14} />
          현재 시각
        </div>
        <span className="card-badge">KST</span>
      </div>
      <div className="card-body">
        <div className="time-display">
          <div className="time-main">{militaryTime}</div>
          <div className="time-date">{koreanDate}</div>
          <div className="time-utc">UTC {utcTime}</div>
        </div>
      </div>
    </div>
  );
}
