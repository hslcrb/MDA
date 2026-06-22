import React from 'react';
import { useRealTime } from '../hooks/useRealTime';
import { Shield, Wifi, Radio } from 'lucide-react';

export default function Header() {
  const { militaryTime, koreanDate } = useRealTime();

  return (
    <header className="header" id="main-header">
      <div className="header-left">
        <div className="header-logo">
          <div className="header-logo-icon">
            <Shield size={18} color="#060a13" strokeWidth={2.5} />
          </div>
          <div>
            <div className="header-title">MDL 종합상황실</div>
            <div className="header-subtitle">MILITARY DEMARCATION LINE — SITUATION ROOM</div>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          letterSpacing: '3px',
          color: 'var(--accent-green)',
          textShadow: '0 0 20px var(--accent-green-glow)',
        }}>
          {militaryTime}
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}>
          {koreanDate}
        </div>
      </div>

      <div className="header-right">
        <div className="connection-status">
          <div className="connection-dot" />
          <span>시스템 정상</span>
        </div>
        <div className="connection-status" style={{ color: 'var(--accent-cyan)' }}>
          <Radio size={12} />
          <span>감시 가동</span>
        </div>
        <div className="connection-status">
          <Wifi size={12} />
          <span>연결됨</span>
        </div>
      </div>
    </header>
  );
}
