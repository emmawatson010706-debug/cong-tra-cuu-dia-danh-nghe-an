import React from 'react';
import { Search, Map, FolderOpen, BookOpen, MessageSquare, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo.jsx';

const links = [
  ['Tra cứu', '/', Search],
  ['Bản đồ', '/#ban-do', Map],
  ['Hồ sơ địa danh', '/#danh-muc', FolderOpen],
  ['Hướng dẫn', '/#huong-dan', BookOpen],
  ['Góp ý', '/#gop-y', MessageSquare],
  ['Admin', '/admin-login', ShieldCheck],
];

export function Footer({ active = 'Tra cứu' }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo small />
        <div>
          <h3>Cổng tra cứu địa danh xã phường <mark>Nghệ An</mark></h3>
          <p>Kho dữ liệu địa danh chính thống – Minh bạch – Chính xác – Vì cộng đồng.</p>
        </div>
      </div>
      <div className="footer-links">
        {links.map(([label, href, Icon]) => (
          <a key={label} className={active === label ? 'active' : ''} href={href}><Icon size={18} /> {label}</a>
        ))}
      </div>
      <div className="copyright">© 2026 NATA. All rights reserved.</div>
    </footer>
  );
}
