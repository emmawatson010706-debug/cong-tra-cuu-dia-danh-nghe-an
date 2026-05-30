import React from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo.jsx';

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Trang chủ">
        <Logo />
        <div className="brand-title">
          <span>CỔNG TRA CỨU ĐỊA DANH</span>
          <strong>XÃ PHƯỜNG <mark>NGHỆ AN</mark></strong>
        </div>
      </a>
      <nav className="header-actions" aria-label="Điều hướng chính">
        <a className="admin-pill" href="/admin-login"><ShieldCheck size={20} /> Admin</a>
        <button className="menu-pill" onClick={() => document.body.classList.toggle('menu-open')} aria-label="Mở menu"><Menu size={24} /></button>
      </nav>
    </header>
  );
}
