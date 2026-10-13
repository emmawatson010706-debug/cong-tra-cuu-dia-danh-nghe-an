import React from 'react';

/**
 * Quốc kỳ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (Tỷ lệ chuẩn 2:3)
 */
export function VietnamFlag({ className = '', width = 36, height = 24, animated = true }) {
  return (
    <div 
      className={`vn-flag-wrapper ${animated ? 'flag-flutter' : ''} ${className}`}
      title="Quốc kỳ Việt Nam"
      aria-label="Cờ đỏ sao vàng Việt Nam"
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 90 60" 
        className="vn-flag-svg"
      >
        {/* Nền cờ đỏ */}
        <rect width="90" height="60" fill="#da251d" rx="4" />
        {/* Ngôi sao vàng 5 cánh ở trung tâm */}
        <polygon 
          points="45,12 48.7,23.4 60.7,23.4 51,30.5 54.7,42 45,35 35.3,42 39,30.5 29.3,23.4 41.3,23.4" 
          fill="#ffcd00" 
        />
      </svg>
    </div>
  );
}

/**
 * Biểu tượng Hoa Sen thanh khiết (Quốc hoa / Biểu trưng Làng Sen Nghệ An)
 */
export function LotusEmblem({ size = 24, color = "#fef08a" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      className="lotus-svg"
      aria-hidden="true"
    >
      {/* Cánh sen trung tâm */}
      <path 
        d="M32 10 C30 24 24 38 32 50 C40 38 34 24 32 10 Z" 
        fill={color} 
        opacity="0.95" 
      />
      {/* Cánh sen trái */}
      <path 
        d="M30 18 C20 28 14 42 26 50 C22 38 24 26 30 18 Z" 
        fill={color} 
        opacity="0.8" 
      />
      {/* Cánh sen phải */}
      <path 
        d="M34 18 C44 28 50 42 38 50 C42 38 40 26 34 18 Z" 
        fill={color} 
        opacity="0.8" 
      />
      {/* Cánh sen ngoài cùng trái */}
      <path 
        d="M24 28 C12 36 10 46 22 52 C16 44 18 34 24 28 Z" 
        fill={color} 
        opacity="0.65" 
      />
      {/* Cánh sen ngoài cùng phải */}
      <path 
        d="M40 28 C52 36 54 46 42 52 C48 44 46 34 40 28 Z" 
        fill={color} 
        opacity="0.65" 
      />
      {/* Đài sen */}
      <ellipse cx="32" cy="52" rx="14" ry="3" fill={color} opacity="0.9" />
    </svg>
  );
}

/**
 * Hoa văn Mặt Trống Đồng Đông Sơn - Biểu tượng văn hóa nghìn năm văn hiến
 */
export function DongSonBackground({ className = '' }) {
  return (
    <div className={`dong-son-watermark ${className}`} aria-hidden="true">
      <svg 
        viewBox="0 0 400 400" 
        className="dong-son-svg" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" fill="none" opacity="0.85">
          {/* Vòng ngoài cùng */}
          <circle cx="200" cy="200" r="195" strokeWidth="2.5" />
          <circle cx="200" cy="200" r="185" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="200" cy="200" r="172" strokeWidth="2" />

          {/* Vành chim Lạc bay ngược chiều kim đồng hồ */}
          <circle cx="200" cy="200" r="156" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="142" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="200" cy="200" r="126" strokeWidth="1" />

          {/* Vành hoa văn hình học chữ S gãy khúc */}
          <circle cx="200" cy="200" r="110" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="95" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="78" strokeWidth="2" />
          <circle cx="200" cy="200" r="62" strokeWidth="1" />

          {/* Ngôi sao 14 cánh ở trung tâm trống đồng */}
          <g fill="currentColor">
            {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map((angle, idx) => (
              <polygon 
                key={idx}
                points="200,140 204,188 196,188" 
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
            <circle cx="200" cy="200" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="200" cy="200" r="4" />
          </g>
        </g>
      </svg>
    </div>
  );
}
