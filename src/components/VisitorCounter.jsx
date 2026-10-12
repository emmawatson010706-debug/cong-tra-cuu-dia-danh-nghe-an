import React from 'react';
import { useVisitorStats } from '../lib/visitorTracker.js';
import { Users, Eye, Calendar, Activity } from 'lucide-react';

export function VisitorCounter({ variant = 'hero' }) {
  const { totalVisits, todayVisits, onlineCount } = useVisitorStats();

  if (variant === 'hero') {
    return (
      <div className="visitor-badge-row visitor-row-single" aria-label="Thống kê truy cập">
        <div className="visitor-chip online glow-green">
          <span className="pulse-dot"></span>
          <span className="chip-text">
            <b>{onlineCount}</b> <small>online</small>
          </span>
        </div>
        <div className="visitor-chip today glow-amber">
          <Calendar size={13} />
          <span className="chip-text">
            <b>{todayVisits.toLocaleString('vi-VN')}</b> <small>hôm nay</small>
          </span>
        </div>
        <div className="visitor-chip total glow-cyan">
          <Eye size={13} />
          <span className="chip-text">
            <b>{totalVisits.toLocaleString('vi-VN')}</b> <small>lượt xem</small>
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="footer-visitor-box">
        <div className="footer-visitor-title">
          <Activity size={16} />
          <strong>Thống kê truy cập cổng</strong>
        </div>
        <div className="footer-visitor-grid">
          <div className="f-stat-item">
            <span className="pulse-dot"></span>
            <small>Đang trực tuyến:</small>
            <b>{onlineCount}</b>
          </div>
          <div className="f-stat-item">
            <Calendar size={13} />
            <small>Hôm nay:</small>
            <b>{todayVisits.toLocaleString('vi-VN')}</b>
          </div>
          <div className="f-stat-item">
            <Eye size={13} />
            <small>Tổng lượt xem:</small>
            <b>{totalVisits.toLocaleString('vi-VN')}</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visitor-card-block">
      <div className="visitor-card-item">
        <span className="pulse-dot"></span>
        <div>
          <b>{onlineCount}</b>
          <span>Đang trực tuyến</span>
        </div>
      </div>
      <div className="visitor-card-item">
        <Eye size={18} />
        <div>
          <b>{totalVisits.toLocaleString('vi-VN')}</b>
          <span>Tổng lượt truy cập</span>
        </div>
      </div>
    </div>
  );
}

export default VisitorCounter;
