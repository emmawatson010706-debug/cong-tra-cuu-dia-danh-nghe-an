import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FolderOpen, Map, Menu, Search, ShieldCheck, X, MessageSquare, Phone, UserCheck } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter.jsx';
import { VietnamFlag } from './CivicSymbols.jsx';

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={close}>
        <div className="brand-logo-combo">
          <VietnamFlag width={34} height={22} animated />
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" className="brand-nata-logo" />
        </div>
        <div className="brand-text-block">
          <strong className="brand-main-name">Tìm Xã Phường Nghệ An</strong>
          <span className="brand-slogan-sub">BẢN ĐỒ ĐỊA GIỚI XÃ PHƯỜNG NGHỆ AN SAU SÁP NHẬP</span>
        </div>
      </Link>

      <div className="header-actions">
        <button className="menu-btn" type="button" aria-label={open ? 'Đóng menu' : 'Mở menu'} onClick={() => setOpen(v => !v)}>
          {open ? <X size={24}/> : <Menu size={24}/>} 
        </button>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Menu chính">
          <a href="/#tra-cuu" onClick={close}><Search size={18}/> Tra cứu địa danh</a>
          <a href="/#ban-do" onClick={close}><Map size={18}/> Bản đồ địa giới</a>
          <a href="/#places" onClick={close}><FolderOpen size={18}/> Danh mục 130 xã/phường</a>
          <a href="/#huong-dan" onClick={close}><BookOpen size={18}/> Hướng dẫn tra cứu</a>
          <a href="/#gop-y" onClick={close}><MessageSquare size={18}/> Góp ý dữ liệu</a>
          <Link to="/admin-login" onClick={close}><ShieldCheck size={18}/> Quản trị Admin</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer civic-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-flag-logo">
            <VietnamFlag width={38} height={25} animated />
            <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
          </div>
          <div>
            <strong className="footer-site-title">Tìm Xã Phường Nghệ An</strong>
            <p className="footer-slogan">BẢN ĐỒ ĐỊA GIỚI XÃ PHƯỜNG NGHỆ AN SAU SÁP NHẬP</p>
            <div className="footer-developer-card">
              <span className="dev-tag"><UserCheck size={14} /> Xây dựng và phát triển:</span>
              <b className="dev-name">Hồ Nam Tấn</b>
              <span className="dev-phone">
                <Phone size={13} /> Điện thoại: <a href="tel:0914587575">0914 58 75 75</a>
              </span>
            </div>
            <p className="sovereignty-affirmation">
              🇻🇳 Quần đảo Hoàng Sa và Trường Sa là phần lãnh thổ không thể tách rời của Tổ quốc Việt Nam.
            </p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Điều hướng cuối trang">
          <a href="/#tra-cuu"><Search size={16}/> Tra cứu</a>
          <a href="/#ban-do"><Map size={16}/> Bản đồ địa giới</a>
          <a href="/#places"><FolderOpen size={16}/> Danh mục xã/phường</a>
          <a href="/#huong-dan"><BookOpen size={16}/> Hướng dẫn</a>
          <a href="/#gop-y"><MessageSquare size={16}/> Góp ý dữ liệu</a>
          <Link to="/admin-login"><ShieldCheck size={16}/> Admin</Link>
        </nav>
      </div>
      <VisitorCounter variant="footer" />
      <p className="copyright">© 2026 Tìm Xã Phường Nghệ An · Bản đồ địa giới sau sáp nhập. Bản quyền thuộc về Hồ Nam Tấn.</p>
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
