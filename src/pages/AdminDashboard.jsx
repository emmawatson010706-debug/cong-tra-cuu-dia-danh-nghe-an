import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import places from '../data/places.json';
import { supabase, ADMIN_EMAIL } from '../lib/supabase.js';
import { LogOut, Save, Upload } from 'lucide-react';

function localAdmin() {
  try { return JSON.parse(localStorage.getItem('nata-admin') || 'null'); } catch { return null; }
}

export default function AdminDashboard() {
  const [sessionEmail, setSessionEmail] = useState(localAdmin()?.email || '');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(places[0]);
  const [article, setArticle] = useState(places[0]?.article || '');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setSessionEmail(data?.user?.email || ''));
  }, []);

  const isAdmin = sessionEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const filtered = useMemo(() => places.filter(p =>
    (p.name + ' ' + p.oldDistrict + ' ' + p.slug).toLowerCase().includes(q.toLowerCase())
  ), [q]);

  function choose(place) {
    setSelected(place);
    setArticle(place.article || '');
    setNotice('');
  }

  async function save() {
    if (!selected) return;
    if (supabase) {
      const { error } = await supabase.from('place_articles').upsert({
        place_id: selected.id,
        title: `Giới thiệu về ${selected.name}`,
        body: article,
        status: 'published',
        author_email: sessionEmail,
        source_note: selected.officialUrl,
        published_at: new Date().toISOString()
      }, { onConflict: 'place_id' });
      setNotice(error ? error.message : 'Đã lưu lên Supabase.');
    } else {
      const saved = JSON.parse(localStorage.getItem('nata-articles') || '{}');
      saved[selected.slug] = article;
      localStorage.setItem('nata-articles', JSON.stringify(saved));
      setNotice('Đã lưu tạm trên trình duyệt. Khi cấu hình Supabase, dữ liệu sẽ lưu vào database.');
    }
  }

  async function logout() {
    localStorage.removeItem('nata-admin');
    if (supabase) await supabase.auth.signOut();
    location.href = '/admin-login';
  }

  if (!isAdmin) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card">
          <h1>Yêu cầu quyền Admin</h1>
          <p>Trang quản trị chỉ dành cho email admin: {ADMIN_EMAIL}</p>
          <Link className="primary-btn" to="/admin-login">Đăng nhập Admin</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <aside>
        <Link to="/" className="admin-logo"><img src="/assets/nata-dia-danh-logo.png" /> <span>NATA Admin</span></Link>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm xã/phường..." />
        <div className="admin-place-list">
          {filtered.map(p => <button key={p.id} className={selected?.id===p.id ? 'active' : ''} onClick={()=>choose(p)}>{p.name}<small>{p.oldDistrict} cũ</small></button>)}
        </div>
      </aside>
      <section className="admin-editor">
        <div className="admin-head">
          <div>
            <span>Đăng nhập: {sessionEmail}</span>
            <h1>Quản trị bài viết địa danh</h1>
          </div>
          <button onClick={logout}><LogOut size={16}/> Đăng xuất</button>
        </div>

        {selected && (
          <>
            <div className="editor-meta">
              <strong>{selected.name}</strong>
              <span>{selected.type} · {selected.oldDistrict} cũ · {selected.oldUnits?.length || 0} đơn vị cũ</span>
              <a href={`/dia-danh/${selected.slug}`} target="_blank">Xem trang con</a>
              <a href={selected.officialUrl} target="_blank" rel="noreferrer">Mở website địa phương</a>
            </div>
            <label className="editor-label">Bài giới thiệu</label>
            <textarea value={article} onChange={e=>setArticle(e.target.value)} rows={16} />
            <div className="editor-actions">
              <button onClick={save}><Save size={16}/> Lưu bài</button>
              <button className="ghost-btn"><Upload size={16}/> Upload ảnh (kết nối Supabase Storage ở bước sau)</button>
            </div>
            {notice && <div className="notice">{notice}</div>}
          </>
        )}
      </section>
    </main>
  );
}
