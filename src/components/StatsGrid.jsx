import React, { useState, useEffect } from 'react';
import { BarChart3, Eye, AlertCircle, Bell } from 'lucide-react';

const STATS = [
  { id: 'surveillance', label: '감시 자산 가동', value: 47, icon: Eye, type: 'normal' },
  { id: 'anomalies', label: '이상 징후', value: 3, icon: AlertCircle, type: 'warning' },
  { id: 'alerts', label: '금일 경보', value: 2, icon: Bell, type: 'danger' },
  { id: 'patrols', label: '순찰 현황', value: 12, icon: BarChart3, type: 'normal' },
];

function AnimatedNumber({ value, duration = 1500 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{current}</>;
}

export default function StatsGrid() {
  return (
    <div className="card" id="stats-grid">
      <div className="card-header">
        <div className="card-title">
          <BarChart3 size={14} />
          주요 지표
        </div>
        <span className="card-badge">실시간</span>
      </div>
      <div className="stats-grid">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="stat-item">
              <Icon
                size={16}
                style={{
                  color: stat.type === 'danger' ? 'var(--accent-red)'
                    : stat.type === 'warning' ? 'var(--accent-amber)'
                    : 'var(--accent-green)',
                  marginBottom: '4px',
                }}
              />
              <div className={`stat-value ${stat.type}`}>
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
