import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import places from '../data/places.json';
import { supabase, ADMIN_EMAIL } from '../lib/supabase.js';
import { CheckCircle2, Inbox, LogOut, Save, Trash2, Upload } from 'lucide-react';

function localAdmin() {
  try {
    return JSON.parse(localStorage.getItem('nata-admin') || 'null');
  } catch {
    return null;
  }
}

function formatDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('vi-VN');
  } catch {
    return value;
  }
}

function findPlaceName(placeId) {
  const found = places.find((p) => p.id === placeId);
  return found?.name || 'Chưa xác định địa phương';
}

export default function AdminDashboard() {
  const [sessionEmail, setSessionEmail] = useState(localAdmin()?.email || '');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(places[0]);
  const [article, setArticle] = useState(places[0]?.article || '');
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  const [submissions, setSubmissions] = useState([]);
  const [submissionNotice, setSubmissionNotice] = useState('');
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setSessionEmail(data?.user?.email || ''));
  }, []);

  const isAdmin = sessionEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const filtered = useMemo(
    () =>
      places.filter((p) =>
        (p.name + ' ' + p.oldDistrict + ' ' + p.slug).toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  function choose(place) {
    setSelected(place);
    setArticle(place.article || '');
    setNotice('');
    setActiveTab('articles');
  }

  async function save() {
    if (!selected) return;

    if (supabase) {
      const { error } = await supabase.from('place_articles').upsert(
        {
          place_id: selected.id,
          title: `Giới thiệu về ${selected.name}`,
          body: article,
          status: 'published',
          author_email: sessionEmail,
          source_note: selected.officialUrl,
          published_at: new Date().toISOString()
        },
        { onConflict: 'place_id' }
      );

      setNotice(error ? error.message : 'Đã lưu bài viết lên Supabase.');
    } else {
      const saved = JSON.parse(localStorage.getItem('nata-articles') || '{}');
      saved[selected.slug] = article;
      localStorage.setItem('nata-articles', JSON.stringify(saved));
      setNotice('Đã lưu tạm trên trình duyệt. Khi cấu hình Supabase, dữ liệu sẽ lưu vào database.');
    }
  }

  async function loadSubmissions() {
    setSubmissionNotice('');

    if (!supabase) {
      setSubmissionNotice('Supabase chưa được cấu hình nên chưa thể tải góp ý.');
      return;
    }

    try {
      setLoadingSubmissions(true);

      const { data, error } = await supabase
        .from('community_submissions')
        .select('id, place_id, sender_name, sender_phone, sender_email, message, status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      setSubmissionNotice(error?.message || 'Chưa tải được danh sách góp ý.');
    } finally {
      setLoadingSubmissions(false);
    }
  }

  async function updateSubmissionStatus(id, status) {
    if (!supabase) return;

    const { error } = await supabase
      .from('community_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      setSubmissionNotice(error.message);
      return;
    }

    setSubmissions((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    setSubmissionNotice(status === 'processed' ? 'Đã đánh dấu góp ý là đã xử lý.' : 'Đã cập nhật trạng thái góp ý.');
  }

  async function deleteSubmission(id) {
    if (!supabase) return;

    const ok = window.confirm('Anh có chắc muốn xóa góp ý này không?');
    if (!ok) return;

    const { error } = await supabase.from('community_submissions').delete().eq('id', id);

    if (error) {
      setSubmissionNotice(error.message);
      return;
    }

    setSubmissions((items) => items.filter((item) => item.id !== id));
    setSubmissionNotice('Đã xóa góp ý.');
  }

  useEffect(() => {
    if (isAdmin && activeTab === 'feedback') {
      loadSubmissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, activeTab]);

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
          <Link className="primary-btn" to="/admin-login">
            Đăng nhập Admin
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <aside>
        <Link to="/" className="admin-logo">
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" /> <span>NATA Admin</span>
        </Link>

        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm xã/phường..." />

        <div className="admin-place-list">
          {filtered.map((p) => (
            <button key={p.id} className={selected?.id === p.id ? 'active' : ''} onClick={() => choose(p)}>
              {p.name}
              <small>{p.oldDistrict} cũ</small>
            </button>
          ))}
        </div>
      </aside>

      <section className="admin-editor">
        <div className="admin-head">
          <div>
            <span>Đăng nhập: {sessionEmail}</span>
            <h1>Quản trị cổng tra cứu địa danh</h1>
          </div>
          <button onClick={logout}>
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>

        <div className="admin-tabs">
          <button className={activeTab === 'articles' ? 'active' : ''} onClick={() => setActiveTab('articles')}>
            Quản trị bài viết
          </button>
          <button className={activeTab === 'feedback' ? 'active' : ''} onClick={() => setActiveTab('feedback')}>
            <Inbox size={16} /> Góp ý dữ liệu
          </button>
        </div>

        {activeTab === 'articles' && selected && (
          <>
            <div className="editor-meta">
              <strong>{selected.name}</strong>
              <span>
                {selected.type} · {selected.oldDistrict} cũ · {selected.oldUnits?.length || 0} đơn vị cũ
              </span>
              <a href={`/dia-danh/${selected.slug}`} target="_blank" rel="noreferrer">
                Xem trang con
              </a>
              <a href={selected.officialUrl} target="_blank" rel="noreferrer">
                Mở website địa phương
              </a>
            </div>

            <label className="editor-label">Bài giới thiệu</label>
            <textarea value={article} onChange={(e) => setArticle(e.target.value)} rows={16} />

            <div className="editor-actions">
              <button onClick={save}>
                <Save size={16} /> Lưu bài
              </button>
              <button className="ghost-btn">
                <Upload size={16} /> Upload ảnh
              </button>
            </div>

            {notice && <div className="notice">{notice}</div>}
          </>
        )}

        {activeTab === 'feedback' && (
          <section className="admin-feedback-panel">
            <div className="feedback-panel-head">
              <div>
                <h2>Góp ý dữ liệu từ người dùng</h2>
                <p>Các góp ý được gửi từ form ngoài trang chủ và đang lưu trong bảng community_submissions.</p>
              </div>
              <button onClick={loadSubmissions} disabled={loadingSubmissions}>
                {loadingSubmissions ? 'Đang tải...' : 'Tải lại góp ý'}
              </button>
            </div>

            {submissionNotice && <div className="notice">{submissionNotice}</div>}

            {!loadingSubmissions && submissions.length === 0 && (
              <div className="empty-feedback">
                Chưa có góp ý nào hoặc tài khoản admin chưa có quyền đọc bảng community_submissions.
              </div>
            )}

            <div className="submission-list">
              {submissions.map((item) => (
                <article className="submission-card" key={item.id}>
                  <div className="submission-top">
                    <div>
                      <strong>{item.sender_name || 'Người gửi chưa ghi tên'}</strong>
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                    <mark className={item.status === 'processed' ? 'done' : ''}>
                      {item.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                    </mark>
                  </div>

                  <div className="submission-info">
                    <span>Địa phương: {findPlaceName(item.place_id)}</span>
                    {item.sender_phone && <span>SĐT: {item.sender_phone}</span>}
                    {item.sender_email && <span>Email: {item.sender_email}</span>}
                  </div>

                  <p>{item.message}</p>

                  <div className="submission-actions">
                    <button onClick={() => updateSubmissionStatus(item.id, 'processed')}>
                      <CheckCircle2 size={15} /> Đã xử lý
                    </button>
                    <button className="danger-btn" onClick={() => deleteSubmission(item.id)}>
                      <Trash2 size={15} /> Xóa
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}