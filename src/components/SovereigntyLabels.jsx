import React from 'react';

/**
 * Overlay nhÃ£n chá»§ quyá»n lÃªn khu vá»±c Biá»ƒn ÄÃ´ng trÃªn báº£n Ä‘á»“.
 * Component nÃ y chá»‰ thÃªm chá»¯ hiá»ƒn thá»‹, khÃ´ng thay Ä‘á»•i tile map, dá»¯ liá»‡u ranh giá»›i,
 * routing, tÃ¬m kiáº¿m, Supabase hay cÃ¡c chá»©c nÄƒng khÃ¡c cá»§a website.
 */
export function SovereigntyLabels() {
  return (
    <div className="sovereignty-labels" aria-hidden="true">
      <div className="sovereignty-label sovereignty-label--hoang-sa">
        <span>quáº§n Ä‘áº£o</span>
        <strong>HoÃ ng Sa</strong>
      </div>
      <div className="sovereignty-label sovereignty-label--truong-sa">
        <span>quáº§n Ä‘áº£o</span>
        <strong>TrÆ°á»ng Sa</strong>
      </div>
      <div className="sovereignty-sea-label">BIá»‚N ÄÃ”NG</div>
    </div>
  );
}
