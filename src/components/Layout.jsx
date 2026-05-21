import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FolderOpen, Map, Menu, Search, ShieldCheck, X, MessageSquare } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={close}>
        <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
        <div>
          <strong><span>CỔNG TRA CỨU ĐỊA DANH</span><span>XÃ PHƯỜNG <mark>NGHỆ AN</mark></span></strong>
        </div>
      </Link>
      <div className="header-actions">
        <Link className="admin-btn" to="/admin-login" onClick={close}><ShieldCheck size={18}/> Admin</Link>
        <button className="menu-btn" type="button" aria-label="Mở menu" onClick={() => setOpen(v => !v)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Menu chính">
          <a href="/#tra-cuu" onClick={close}><Search size={18}/> Tra cứu</a>
          <a href="/#ban-do" onClick={close}><Map size={18}/> Bản đồ</a>
          <a href="/#places" onClick={close}><FolderOpen size={18}/> Hồ sơ địa danh</a>
          <a href="/#huong-dan" onClick={close}><BookOpen size={18}/> Hướng dẫn</a>
          <a href="/#gop-y" onClick={close}><MessageSquare size={18}/> Góp ý dữ liệu</a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
          <div>
            <strong>Cổng tra cứu địa danh xã phường <mark>Nghệ An</mark></strong>
            <p>Kho dữ liệu địa danh chính thống – Minh bạch – Chính xác – Vì cộng đồng.</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Điều hướng cuối trang">
          <a href="/#tra-cuu"><Search size={16}/> Tra cứu</a>
          <a href="/#ban-do"><Map size={16}/> Bản đồ</a>
          <a href="/#places"><FolderOpen size={16}/> Hồ sơ địa danh</a>
          <a href="/#huong-dan"><BookOpen size={16}/> Hướng dẫn</a>
          <a href="/#gop-y"><MessageSquare size={16}/> Góp ý dữ liệu</a>
          <Link to="/admin-login"><ShieldCheck size={16}/> Admin</Link>
        </nav>
      </div>
      <p className="copyright">© 2026 NATA. All rights reserved.</p>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
