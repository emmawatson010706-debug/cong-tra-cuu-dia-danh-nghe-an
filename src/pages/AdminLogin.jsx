import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, ADMIN_EMAIL } from '../lib/supabase.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login(e) {
    e.preventDefault();
    setError('');

    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setError(error.message);
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return setError('Email này chưa được cấp quyền admin.');
      navigate('/admin');
      return;
    }

    // Demo fallback for local preview before Supabase is configured
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password) {
      localStorage.setItem('nata-admin', JSON.stringify({ email, loginAt: new Date().toISOString() }));
      navigate('/admin');
    } else {
      setError('Vui lòng nhập đúng email admin và mật khẩu.');
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link to="/" className="admin-logo"><img src="/assets/nata-dia-danh-logo.png" /> <span>Cổng tra cứu địa danh Nghệ An</span></Link>
        <h1>Đăng nhập Admin</h1>
        <p>Admin quản lý bài viết, ảnh, nguồn dữ liệu, địa danh và nội dung hiển thị trên toàn bộ cổng tra cứu.</p>
        <form onSubmit={login}>
          <label>Email admin<input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
          <label>Mật khẩu<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nhập mật khẩu Supabase Auth" /></label>
          <button type="submit">Vào trang quản trị</button>
          {error && <div className="form-error">{error}</div>}
        </form>
        <p className="muted">Email admin: {ADMIN_EMAIL}. Khi cấu hình Supabase Auth, hãy tạo tài khoản email này trong Supabase.</p>
      </section>
    </main>
  );
}
