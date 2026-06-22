import React from 'react';
import { Activity, Crosshair, Radio, Satellite, ShieldCheck } from 'lucide-react';

const STATUS_ITEMS = [
  {
    label: '경계태세',
    value: '진돗개 하나',
    status: 'amber',
    icon: ShieldCheck,
  },
  {
    label: '감시정찰',
    value: '정상 가동',
    status: 'green',
    icon: Satellite,
  },
  {
    label: '통신 상태',
    value: '정상',
    status: 'green',
    icon: Radio,
  },
  {
    label: 'GOP 경계',
    value: '강화',
    status: 'amber',
    icon: Crosshair,
  },
  {
    label: 'MDL 이상',
    value: '주시 중',
    status: 'amber',
    icon: Activity,
  },
];

export default function StatusPanel() {
  return (
    <div className="card" id="status-panel">
      <div className="card-header">
        <div className="card-title">
          <Activity size={14} />
          상황 요약
        </div>
        <span className="card-badge live">LIVE</span>
      </div>
      <div className="card-body">
        <div className="status-panel">
          {STATUS_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div className="status-item" key={idx}>
                <div className="status-item-label">
                  <Icon size={13} style={{ color: 'var(--text-dim)' }} />
                  {item.label}
                </div>
                <div className="status-item-value" style={{
                  color: item.status === 'red' ? 'var(--accent-red)'
                    : item.status === 'amber' ? 'var(--accent-amber)'
                    : 'var(--accent-green)',
                }}>
                  <span className={`status-dot ${item.status}`} style={{ marginRight: '6px' }} />
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
