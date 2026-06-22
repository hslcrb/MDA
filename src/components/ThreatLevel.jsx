import React, { useState, useEffect, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';

const THREAT_LEVELS = [
  { level: 1, label: '정상', color: 'var(--accent-green)', status: 'normal' },
  { level: 2, label: '관심', color: 'var(--accent-blue)', status: 'normal' },
  { level: 3, label: '주의', color: 'var(--accent-amber)', status: 'elevated' },
  { level: 4, label: '경계', color: 'var(--accent-red)', status: 'high' },
  { level: 5, label: '심각', color: '#ff0033', status: 'high' },
];

export default function ThreatLevel() {
  // 시뮬레이션: 주의 단계 (3)
  const [currentLevel] = useState(3);
  const [animatedValue, setAnimatedValue] = useState(0);

  const threatInfo = useMemo(() => THREAT_LEVELS[currentLevel - 1], [currentLevel]);
  const percentage = (currentLevel / 5) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  // SVG 원형 게이지 계산
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="card" id="threat-level">
      <div className="card-header">
        <div className="card-title">
          <AlertTriangle size={14} />
          위협 수준
        </div>
        <span className="card-badge live">LIVE</span>
      </div>
      <div className="card-body">
        <div className="threat-gauge">
          <div className="gauge-circle">
            <svg className="gauge-svg" viewBox="0 0 140 140">
              <circle className="gauge-bg" cx="70" cy="70" r={radius} />
              <circle
                className="gauge-fill"
                cx="70"
                cy="70"
                r={radius}
                stroke={threatInfo.color}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ color: threatInfo.color }}
              />
            </svg>
            <div className="gauge-center-text">
              <div className="gauge-value" style={{ color: threatInfo.color }}>
                {currentLevel}
              </div>
              <div className="gauge-label">/ 5 단계</div>
            </div>
          </div>
          <div className={`threat-status ${threatInfo.status}`}>
            {threatInfo.label}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            경계태세 격상 상태<br/>
            전방부대 감시 강화 중
          </div>
        </div>
      </div>
    </div>
  );
}
