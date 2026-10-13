import React from 'react';

/**
 * Khẳng định chủ quyền toàn vẹn lãnh thổ Việt Nam trên Biển Đông
 * Bao gồm Quần đảo Hoàng Sa và Quần đảo Trường Sa
 */
export function SovereigntyLabels() {
  return (
    <div className="sovereignty-labels" aria-hidden="true">
      <div className="sovereignty-label sovereignty-label--hoang-sa">
        <span className="sov-flag">🇻🇳</span>
        <div className="sov-text">
          <small>Quần đảo</small>
          <strong>Hoàng Sa</strong>
          <span className="sov-nation">(Việt Nam)</span>
        </div>
      </div>
      <div className="sovereignty-label sovereignty-label--truong-sa">
        <span className="sov-flag">🇻🇳</span>
        <div className="sov-text">
          <small>Quần đảo</small>
          <strong>Trường Sa</strong>
          <span className="sov-nation">(Việt Nam)</span>
        </div>
      </div>
      <div className="sovereignty-sea-label">
        <span>BIỂN ĐÔNG (VIỆT NAM)</span>
      </div>
    </div>
  );
}

export default SovereigntyLabels;
