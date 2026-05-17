import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

export const HOTLINE = '0914 58 75 75';
export const ADMIN_EMAIL = 'tinnhanhonline247@gmail.com';

export function Header() {
  return (
    <>
      <div className="top-strip">
        <span><Phone size={16}/> Hotline: {HOTLINE}</span>
        <span><Mail size={16}/> Email quản trị: {ADMIN_EMAIL}</span>
      </div>
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
          <div className="brand-copy">
            <strong className="brand-title">CỔNG TRA CỨU ĐỊA DANH XÃ PHƯỜNG <span className="nghe-an-highlight">NGHỆ AN</span></strong>
            <small className="brand-subtitle">Xây dựng & phát triển: NATA</small>
          </div>
        </Link>
        <Link className="admin-btn" to="/admin-login"><ShieldCheck size={18}/> Admin</Link>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
          <div className="footer-brand-copy">
            <strong>CỔNG TRA CỨU ĐỊA DANH XÃ PHƯỜNG <span className="nghe-an-highlight">NGHỆ AN</span></strong>
            <p>Cổng tra cứu bản đồ hành chính mới</p>
          </div>
        </div>
        <div className="footer-contact">
          <p><Phone size={18}/> Hotline: {HOTLINE}</p>
          <p><Mail size={18}/> Email quản trị: {ADMIN_EMAIL}</p>
        </div>
      </div>
      <div className="footer-note">Thông tin được tổng hợp, biên tập từ các nguồn chính thống và website của cơ quan nhà nước tại địa phương.</div>
      <p className="copyright">© 2025 Cổng tra cứu địa danh xã phường <span className="nghe-an-highlight">Nghệ An</span>. Phát triển bởi NATA.</p>
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
