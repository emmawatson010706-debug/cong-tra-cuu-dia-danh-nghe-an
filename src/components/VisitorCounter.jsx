import React from 'react';
import { useVisitorStats } from '../lib/visitorTracker.js';
import { Users, Eye, Calendar, Activity } from 'lucide-react';

export function VisitorCounter({ variant = 'hero' }) {
  const { totalVisits, todayVisits, onlineCount } = useVisitorStats();

  if (variant === 'hero') {
    return (
      <div className="visitor-badge-row" aria-label="Thống kê truy cập">
        <div className="visitor-chip online">
          <span className="pulse-dot"></span>
          <span><b>{onlineCount}</b> đang online</span>
        </div>
        <div className="visitor-chip total">
          <Eye size={14} />
          <span><b>{totalVisits.toLocaleString('vi-VN')}</b> lượt truy cập</span>
        </div>
        <div className="visitor-chip today">
          <Calendar size={14} />
          <span><b>{todayVisits.toLocaleString('vi-VN')}</b> hôm nay</span>
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
