import React, { useState } from 'react';
import { Expand, X, Layers } from 'lucide-react';

function SovereigntyLabels({ isLocal = false }) {
  return (
    <div className={`sovereignty-layer ${isLocal ? 'sovereignty-layer--local' : ''}`} aria-hidden="true">
      <div className="sea-label">BIá»‚N ÄÃ”NG</div>
      <div className="island-label island-label--hoang-sa">
        <span>quáº§n Ä‘áº£o</span>
        <strong>HoÃ ng Sa</strong>
      </div>
      <div className="island-label island-label--truong-sa">
        <span>quáº§n Ä‘áº£o</span>
        <strong>TrÆ°á»ng Sa</strong>
      </div>
    </div>
  );
}

export function MapVisual({ place, title = 'Báº£n Ä‘á»“ hÃ nh chÃ­nh Nghá»‡ An', compact = false }) {
  const [mode, setMode] = useState('2D');
  const [full, setFull] = useState(false);
  const isLocal = Boolean(place);
  return (
    <section id="ban-do" className={`map-card ${full ? 'map-card--fullscreen' : ''}`}>
      <div className="section-head">
        <h2><Layers size={22} /> {title}</h2>
        <button className="ghost-btn" onClick={() => setFull(!full)}>{full ? <X size={18} /> : <Expand size={18} />} {full ? 'ÄÃ³ng' : 'Xem toÃ n mÃ n hÃ¬nh'}</button>
      </div>
      <div className={`map-stage ${compact ? 'map-stage--compact' : ''} map-mode-${mode.toLowerCase()}`}>
        <div className="map-grid"></div>
        <SovereigntyLabels isLocal={isLocal} />
        <div className="province-shape">
          <div className="pin-main">â˜…</div>
          <strong>{place?.name || 'NGHá»† AN'}</strong>
        </div>
        {place?.formerUnits?.slice(0, 4).map((unit, i) => <span key={unit} className={`old-unit old-unit-${i}`}>{unit}</span>)}
      </div>
      <div className="map-controls">
        {['2D', '3D', 'Quy hoáº¡ch'].map((item) => <button key={item} onClick={() => setMode(item)} className={mode === item ? 'active' : ''}>{item}</button>)}
      </div>
      <p className="map-note">HoÃ ng Sa vÃ  TrÆ°á»ng Sa Ä‘Æ°á»£c hiá»ƒn thá»‹ báº±ng tÃªn tiáº¿ng Viá»‡t trÃªn báº£n Ä‘á»“.</p>
    </section>
  );
}

