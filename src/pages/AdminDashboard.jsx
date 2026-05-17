import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import places from '../data/places.json';
import { supabase, ADMIN_EMAIL } from '../lib/supabase.js';
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Database,
  FileText,
  ImagePlus,
  Layers3,
  Link2,
  ListChecks,
  LogOut,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  XCircle
} from 'lucide-react';

function localAdmin() {
  try { return JSON.parse(localStorage.getItem('nata-admin') || 'null'); } catch { return null; }
}

function makeInitialArticle(place) {
  return {
    id: null,
    title: `Giới thiệu về ${place?.name || 'địa danh'}`,
    body: place?.article || '',
    status: 'draft',
    source_note: place?.officialUrl || '',
    published_at: null
  };
}

function makeBlankArticle(place) {
  return {
    id: null,
    title: `Giới thiệu về ${place?.name || 'địa danh'}`,
    body: '',
    status: 'draft',
    source_note: place?.officialUrl || '',
    published_at: null
  };
}

function makePlaceDraft(place) {
  return {
    id: place?.id || '',
    name: place?.name || '',
    slug: place?.slug || '',
    type: place?.type || 'xã',
    oldDistrict: place?.oldDistrict || '',
    oldUnitsText: (place?.oldUnits || []).join(', '),
    areaKm2: place?.areaKm2 || '',
    population: place?.population || '',
    density: place?.density || '',
    officialUrl: place?.officialUrl || '',
    legalSource: place?.legalSource || 'Nghị quyết 1678/NQ-UBTVQH15',
    sourceStatus: place?.sourceStatus || 'Chờ biên tập',
    articleStatus: place?.articleStatus || 'Bài cơ bản / chờ biên tập'
  };
}

function safeLocalRead(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}

export default function AdminDashboard() {
  const [sessionEmail, setSessionEmail] = useState(localAdmin()?.email || '');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(places[0]);
  const [activeTab, setActiveTab] = useState('article');
  const [article, setArticle] = useState(makeInitialArticle(places[0]));
  const [placeDraft, setPlaceDraft] = useState(makePlaceDraft(places[0]));
  const [images, setImages] = useState([]);
  const [sources, setSources] = useState([]);
  const [sourceDraft, setSourceDraft] = useState({ title: '', url: '', publisher: '', source_type: 'official' });
  const [submissions, setSubmissions] = useState([]);
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setSessionEmail(data?.user?.email || ''));
  }, []);

  const isAdmin = sessionEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const filtered = useMemo(() => places.filter((p) =>
    `${p.name} ${p.oldDistrict} ${p.slug} ${(p.oldUnits || []).join(' ')}`.toLowerCase().includes(q.toLowerCase())
  ), [q]);

  const stats = useMemo(() => ({
    total: places.length,
    communes: places.filter((p) => p.type === 'xã').length,
    wards: places.filter((p) => p.type === 'phường').length,
    selectedOldUnits: selected?.oldUnits?.length || 0
  }), [selected]);

  useEffect(() => {
    if (selected) loadSelectedData(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  function showNotice(message, type = 'success') {
    setNotice(message);
    setNoticeType(type);
  }

  async function loadSelectedData(place) {
    setNotice('');
    setPlaceDraft(makePlaceDraft(place));
    setArticle(makeInitialArticle(place));
    setImages([]);
    setSources([]);
    setSourceDraft({ title: '', url: '', publisher: '', source_type: 'official' });
    setLoading(true);

    try {
      if (supabase) {
        const [{ data: articleData }, { data: imageData }, { data: sourceData }, { data: submissionData }] = await Promise.all([
          supabase.from('place_articles').select('*').eq('place_id', place.id).order('updated_at', { ascending: false }).limit(1),
          supabase.from('place_images').select('*').eq('place_id', place.id).order('created_at', { ascending: false }),
          supabase.from('sources').select('*').eq('place_id', place.id).order('created_at', { ascending: false }),
          supabase.from('community_submissions').select('*').or(`place_id.eq.${place.id},message.ilike.%${place.name}%`).order('created_at', { ascending: false }).limit(50)
        ]);

        if (articleData?.[0]) setArticle({ ...makeInitialArticle(place), ...articleData[0] });
        setImages(imageData || []);
        setSources(sourceData || []);
        setSubmissions(submissionData || []);
      } else {
        const localArticles = safeLocalRead('nata-admin-articles', {});
        const localImages = safeLocalRead('nata-admin-images', {});
        const localSources = safeLocalRead('nata-admin-sources', {});
        const localSubmissions = safeLocalRead('nata-community-submissions', []);
        if (localArticles[place.id]) setArticle(localArticles[place.id]);
        setImages(localImages[place.id] || []);
        setSources(localSources[place.id] || []);
        setSubmissions(localSubmissions.filter((s) => s.place_id === place.id || (s.message || '').includes(place.name)));
      }
    } catch (error) {
      showNotice(`Không tải được dữ liệu quản trị: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  function choose(place) {
    setSelected(place);
    setActiveTab('article');
  }

  function insertText(before, after = '') {
    const next = `${article.body || ''}\n\n${before}${after}`;
    setArticle((prev) => ({ ...prev, body: next }));
  }

  function withTimeout(promise, ms = 8000) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Kết nối Supabase quá lâu. Bài đã được lưu tạm trên máy, vui lòng kiểm tra mạng hoặc biến môi trường.')), ms))
    ]);
  }

  function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
  }

  function saveArticle(status = article.status || 'draft') {
    if (!selected) return;

    const now = new Date().toISOString();
    const payload = {
      place_id: selected.id,
      title: article.title?.trim() || `Giới thiệu về ${selected.name}`,
      body: article.body || '',
      status,
      author_email: sessionEmail,
      source_note: article.source_note || selected.officialUrl,
      published_at: status === 'published' ? now : article.published_at
    };

    // Lưu cục bộ ngay trước để nút không bị đơ khi mạng/Supabase chậm.
    const localArticles = safeLocalRead('nata-admin-articles', {});
    const localArticle = {
      ...article,
      ...payload,
      id: article.id || `${selected.id}-${Date.now()}`,
      updated_at: now
    };
    localArticles[selected.id] = localArticle;
    localStorage.setItem('nata-admin-articles', JSON.stringify(localArticles));
    setArticle(localArticle);
    showNotice(status === 'published' ? 'Đã xuất bản tạm trên trình duyệt, đang đồng bộ Supabase...' : 'Đã lưu nháp tạm trên trình duyệt, đang đồng bộ Supabase...');

    if (!supabase) {
      showNotice('Đã lưu trên trình duyệt. Chưa có Supabase nên chưa đồng bộ database.');
      return;
    }

    setLoading(true);
    const nextPayload = { ...payload, updated_at: now };
    const request = isUuid(article.id)
      ? supabase.from('place_articles').update(nextPayload).eq('id', article.id).select().single()
      : supabase.from('place_articles').upsert(nextPayload, { onConflict: 'place_id' }).select().single();

    withTimeout(request)
      .then(({ data, error }) => {
        if (error) throw error;
        if (data) {
          const syncedArticle = { ...makeInitialArticle(selected), ...data };
          setArticle(syncedArticle);
          const latest = safeLocalRead('nata-admin-articles', {});
          latest[selected.id] = syncedArticle;
          localStorage.setItem('nata-admin-articles', JSON.stringify(latest));
        }
        showNotice(status === 'published' ? 'Đã xuất bản và đồng bộ Supabase.' : 'Đã lưu nháp và đồng bộ Supabase.');
      })
      .catch((error) => {
        showNotice(`Bài đã lưu tạm trên máy, nhưng chưa đồng bộ Supabase: ${error.message}`, 'error');
      })
      .finally(() => setLoading(false));
  }

  function startNewArticle() {
    setArticle(makeBlankArticle(selected));
    setActiveTab('article');
    showNotice('Đã mở khung bài mới. Anh nhập nội dung rồi bấm Lưu nháp hoặc Xuất bản.');
    setTimeout(() => {
      document.querySelector('.article-textarea')?.focus();
      document.querySelector('.article-manager')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  async function deleteArticle() {
    if (!confirm('Xóa bài giới thiệu đang chọn?')) return;
    try {
      if (supabase && article.id) {
        const { error } = await supabase.from('place_articles').delete().eq('id', article.id);
        if (error) throw error;
      } else {
        const localArticles = safeLocalRead('nata-admin-articles', {});
        delete localArticles[selected.id];
        localStorage.setItem('nata-admin-articles', JSON.stringify(localArticles));
      }
      setArticle(makeInitialArticle(selected));
      showNotice('Đã xóa bài viết.');
    } catch (error) {
      showNotice(`Chưa xóa được bài: ${error.message}`, 'error');
    }
  }

  async function savePlaceInfo() {
    const oldUnits = placeDraft.oldUnitsText.split(',').map((item) => item.trim()).filter(Boolean);
    const dbPayload = {
      name: placeDraft.name,
      slug: placeDraft.slug,
      type: placeDraft.type,
      old_district: placeDraft.oldDistrict,
      old_units: oldUnits,
      area_km2: placeDraft.areaKm2 || null,
      population: placeDraft.population || null,
      density: placeDraft.density || null,
      official_url: placeDraft.officialUrl,
      legal_source: placeDraft.legalSource,
      local_source: placeDraft.officialUrl,
      source_status: placeDraft.sourceStatus,
      article_status: placeDraft.articleStatus,
      updated_at: new Date().toISOString()
    };

    try {
      if (supabase) {
        const { error } = await supabase.from('places').update(dbPayload).eq('id', selected.id);
        if (error) throw error;
        showNotice('Đã cập nhật thông tin xã/phường trong Supabase.');
      } else {
        const localPlaces = safeLocalRead('nata-admin-place-edits', {});
        localPlaces[selected.id] = { ...placeDraft, oldUnits };
        localStorage.setItem('nata-admin-place-edits', JSON.stringify(localPlaces));
        showNotice('Đã lưu thông tin xã/phường tạm trên trình duyệt.');
      }
    } catch (error) {
      showNotice(`Chưa lưu được thông tin xã/phường: ${error.message}`, 'error');
    }
  }

  async function uploadImage(file) {
    if (!file || !selected) return;
    setUploading(true);
    try {
      if (supabase) {
        const fileExt = file.name.split('.').pop();
        const safeName = `${selected.slug}-${Date.now()}.${fileExt}`;
        const filePath = `places/${selected.slug}/${safeName}`;
        const { error: uploadError } = await supabase.storage.from('place-images').upload(filePath, file, { upsert: false });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('place-images').getPublicUrl(filePath);
        const imageUrl = publicUrlData?.publicUrl;
        const { data, error } = await supabase.from('place_images').insert({
          place_id: selected.id,
          image_url: imageUrl,
          caption: `Ảnh tư liệu ${selected.name}`,
          credit: 'NATA / cộng đồng',
          status: 'published'
        }).select().single();
        if (error) throw error;
        setImages((prev) => [data, ...prev]);
        showNotice('Đã upload ảnh và gắn vào địa danh.');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const localImages = safeLocalRead('nata-admin-images', {});
          const img = { id: `${Date.now()}`, image_url: reader.result, caption: `Ảnh tư liệu ${selected.name}`, credit: 'Local preview', status: 'draft', created_at: new Date().toISOString() };
          localImages[selected.id] = [img, ...(localImages[selected.id] || [])];
          localStorage.setItem('nata-admin-images', JSON.stringify(localImages));
          setImages(localImages[selected.id]);
          showNotice('Đã lưu ảnh tạm trên trình duyệt.');
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      showNotice(`Chưa upload được ảnh: ${error.message}. Kiểm tra bucket Storage tên place-images.`, 'error');
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(image) {
    if (!confirm('Xóa ảnh này khỏi hồ sơ địa danh?')) return;
    try {
      if (supabase && image.id) {
        const { error } = await supabase.from('place_images').delete().eq('id', image.id);
        if (error) throw error;
      } else {
        const localImages = safeLocalRead('nata-admin-images', {});
        localImages[selected.id] = (localImages[selected.id] || []).filter((img) => img.id !== image.id);
        localStorage.setItem('nata-admin-images', JSON.stringify(localImages));
      }
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      showNotice('Đã xóa ảnh.');
    } catch (error) {
      showNotice(`Chưa xóa được ảnh: ${error.message}`, 'error');
    }
  }

  async function addSource() {
    if (!sourceDraft.title.trim()) return showNotice('Cần nhập tên nguồn trước khi thêm.', 'error');
    const payload = { ...sourceDraft, place_id: selected.id, reliability_level: 'official' };
    try {
      if (supabase) {
        const { data, error } = await supabase.from('sources').insert(payload).select().single();
        if (error) throw error;
        setSources((prev) => [data, ...prev]);
      } else {
        const localSources = safeLocalRead('nata-admin-sources', {});
        const src = { ...payload, id: `${Date.now()}`, created_at: new Date().toISOString() };
        localSources[selected.id] = [src, ...(localSources[selected.id] || [])];
        localStorage.setItem('nata-admin-sources', JSON.stringify(localSources));
        setSources(localSources[selected.id]);
      }
      setSourceDraft({ title: '', url: '', publisher: '', source_type: 'official' });
      showNotice('Đã thêm nguồn tham khảo.');
    } catch (error) {
      showNotice(`Chưa thêm được nguồn: ${error.message}`, 'error');
    }
  }

  async function updateSubmissionStatus(item, status) {
    try {
      if (supabase && item.id) {
        const { error } = await supabase.from('community_submissions').update({ status }).eq('id', item.id);
        if (error) throw error;
      }
      setSubmissions((prev) => prev.map((s) => s.id === item.id ? { ...s, status } : s));
      showNotice('Đã cập nhật trạng thái góp ý.');
    } catch (error) {
      showNotice(`Chưa cập nhật được góp ý: ${error.message}`, 'error');
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
    <main className="admin-pro-shell">
      <aside className="admin-pro-sidebar">
        <Link to="/" className="admin-logo admin-pro-logo">
          <img src="/assets/nata-dia-danh-logo.png" alt="NATA" />
          <span>Admin NATA</span>
        </Link>
        <div className="admin-pro-search">
          <Search size={17} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm xã/phường, huyện cũ..." />
        </div>
        <div className="admin-mini-stats">
          <span><strong>{stats.total}</strong> địa danh</span>
          <span><strong>{stats.communes}</strong> xã</span>
          <span><strong>{stats.wards}</strong> phường</span>
        </div>
        <div className="admin-place-list pro-place-list">
          {filtered.map((p) => (
            <button key={p.id} className={selected?.id === p.id ? 'active' : ''} onClick={() => choose(p)}>
              <span>{p.name}</span>
              <small>{p.oldDistrict} cũ · {p.oldUnits?.length || 0} đơn vị cũ</small>
            </button>
          ))}
        </div>
      </aside>

      <section className="admin-pro-main">
        <div className="admin-pro-topbar">
          <div>
            <span className="admin-kicker">Đăng nhập: {sessionEmail}</span>
            <h1>Trung tâm quản trị nội dung địa danh</h1>
          </div>
          <div className="admin-top-actions">
            <a className="ghost-btn" href={`/dia-danh/${selected?.slug}`} target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> Xem trang</a>
            <button onClick={logout}><LogOut size={16} /> Đăng xuất</button>
          </div>
        </div>

        <section className="admin-overview-cards">
          <div><FileText /><span>Bài viết</span><strong>{article.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}</strong></div>
          <div><ImagePlus /><span>Ảnh tư liệu</span><strong>{images.length}</strong></div>
          <div><MessageSquare /><span>Góp ý liên quan</span><strong>{submissions.length}</strong></div>
          <div><Layers3 /><span>Đơn vị cũ</span><strong>{stats.selectedOldUnits}</strong></div>
        </section>

        {selected && (
          <div className="admin-selected-card">
            <div>
              <span className="admin-kicker">Địa danh đang quản trị</span>
              <h2>{selected.name}</h2>
              <p>{selected.type} · {selected.oldDistrict} cũ · nguồn: {selected.officialUrl}</p>
            </div>
            <div className="admin-selected-links">
              <a href={selected.officialUrl} target="_blank" rel="noreferrer"><Link2 size={16} /> Website địa phương</a>
            </div>
          </div>
        )}

        <nav className="admin-tabs">
          {[
            ['article', FileText, 'Viết bài'],
            ['place', Database, 'Danh mục xã/phường'],
            ['media', Camera, 'Up ảnh'],
            ['sources', Link2, 'Nguồn'],
            ['feedback', MessageSquare, 'Góp ý']
          ].map(([key, Icon, label]) => (
            <button key={key} className={activeTab === key ? 'active' : ''} onClick={() => setActiveTab(key)}><Icon size={17} /> {label}</button>
          ))}
        </nav>

        {notice && <div className={`notice admin-notice ${noticeType === 'error' ? 'error' : 'success'}`}>{notice}</div>}
        {loading && <div className="admin-loading">Đang xử lý dữ liệu...</div>}

        {activeTab === 'article' && (
          <section className="admin-panel article-manager">
            <div className="admin-panel-head">
              <div>
                <h2>Khung viết bài giới thiệu địa danh</h2>
                <p>Soạn, sửa, xóa và xuất bản bài giới thiệu cho từng xã/phường.</p>
              </div>
              <div className="admin-panel-actions">
                <button type="button" className="ghost-btn" onClick={startNewArticle}><Plus size={16} /> Bài mới</button>
                <button type="button" className="danger-btn" onClick={deleteArticle}><Trash2 size={16} /> Xóa</button>
              </div>
            </div>

            <div className="article-form-grid">
              <label>Tiêu đề bài viết
                <input value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} placeholder="Nhập tiêu đề bài viết" />
              </label>
              <label>Trạng thái
                <select value={article.status} onChange={(e) => setArticle({ ...article, status: e.target.value })}>
                  <option value="draft">Bản nháp</option>
                  <option value="review">Chờ duyệt</option>
                  <option value="published">Đã xuất bản</option>
                </select>
              </label>
            </div>

            <label className="editor-label">Nguồn ghi chú
              <input value={article.source_note || ''} onChange={(e) => setArticle({ ...article, source_note: e.target.value })} placeholder="Website địa phương, nghị quyết, báo chính thống..." />
            </label>

            <div className="article-toolbar">
              <button type="button" onClick={() => insertText('Đoạn mở bài: ')}><Pencil size={15} /> Mở bài</button>
              <button type="button" onClick={() => insertText('Thông tin được NATA tiếp tục đối chiếu từ website chính thức của địa phương.')}><ListChecks size={15} /> Câu an toàn</button>
              <button type="button" onClick={() => insertText('Nguồn tham khảo: ', selected.officialUrl)}><Link2 size={15} /> Chèn nguồn</button>
            </div>

            <textarea className="article-textarea" value={article.body} onChange={(e) => setArticle({ ...article, body: e.target.value })} rows={16} />

            <div className="article-preview-card">
              <h3>Xem nhanh nội dung</h3>
              {(article.body || 'Chưa có nội dung bài viết.').split('\n\n').slice(0, 4).map((para, index) => <p key={index}>{para}</p>)}
            </div>

            <div className="editor-actions sticky-actions">
              <button type="button" onClick={() => saveArticle('draft')}><Save size={16} /> Lưu nháp</button>
              <button type="button" onClick={() => saveArticle('published')}><CheckCircle2 size={16} /> Xuất bản</button>
            </div>
          </section>
        )}

        {activeTab === 'place' && (
          <section className="admin-panel place-manager">
            <div className="admin-panel-head">
              <div>
                <h2>Danh mục xã/phường</h2>
                <p>Sửa thông tin nền: tên, slug, huyện cũ, đơn vị cũ, diện tích, dân số, nguồn.</p>
              </div>
            </div>
            <div className="place-form-grid">
              <label>Tên địa danh<input value={placeDraft.name} onChange={(e) => setPlaceDraft({ ...placeDraft, name: e.target.value })} /></label>
              <label>Slug đường dẫn<input value={placeDraft.slug} onChange={(e) => setPlaceDraft({ ...placeDraft, slug: e.target.value })} /></label>
              <label>Loại đơn vị<select value={placeDraft.type} onChange={(e) => setPlaceDraft({ ...placeDraft, type: e.target.value })}><option value="xã">Xã</option><option value="phường">Phường</option></select></label>
              <label>Huyện/thành/thị cũ<input value={placeDraft.oldDistrict} onChange={(e) => setPlaceDraft({ ...placeDraft, oldDistrict: e.target.value })} /></label>
              <label>Diện tích km²<input value={placeDraft.areaKm2} onChange={(e) => setPlaceDraft({ ...placeDraft, areaKm2: e.target.value })} /></label>
              <label>Dân số<input value={placeDraft.population} onChange={(e) => setPlaceDraft({ ...placeDraft, population: e.target.value })} /></label>
              <label>Mật độ<input value={placeDraft.density} onChange={(e) => setPlaceDraft({ ...placeDraft, density: e.target.value })} /></label>
              <label>Website chính thức<input value={placeDraft.officialUrl} onChange={(e) => setPlaceDraft({ ...placeDraft, officialUrl: e.target.value })} /></label>
            </div>
            <label className="editor-label">Các đơn vị cũ liên quan, cách nhau bằng dấu phẩy
              <textarea value={placeDraft.oldUnitsText} onChange={(e) => setPlaceDraft({ ...placeDraft, oldUnitsText: e.target.value })} rows={5} />
            </label>
            <div className="editor-actions"><button onClick={savePlaceInfo}><Save size={16} /> Lưu thông tin xã/phường</button></div>
          </section>
        )}

        {activeTab === 'media' && (
          <section className="admin-panel media-manager">
            <div className="admin-panel-head">
              <div>
                <h2>Upload ảnh địa danh</h2>
                <p>Ảnh sẽ được lưu vào Supabase Storage bucket <strong>place-images</strong> và gắn với xã/phường đang chọn.</p>
              </div>
              <label className="upload-drop">
                <Upload size={20} /> {uploading ? 'Đang upload...' : 'Chọn ảnh'}
                <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} />
              </label>
            </div>
            <div className="image-grid-admin">
              {images.length === 0 && <div className="empty-state">Chưa có ảnh nào cho địa danh này.</div>}
              {images.map((image) => (
                <article key={image.id || image.image_url} className="image-admin-card">
                  <img src={image.image_url} alt={image.caption || selected.name} />
                  <div>
                    <strong>{image.caption || 'Ảnh tư liệu'}</strong>
                    <span>{image.credit || 'Chưa ghi nguồn ảnh'}</span>
                    <button className="danger-btn" onClick={() => deleteImage(image)}><Trash2 size={14} /> Xóa ảnh</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'sources' && (
          <section className="admin-panel sources-manager">
            <div className="admin-panel-head"><div><h2>Quản lý nguồn tham khảo</h2><p>Gắn nguồn chính thức để bài viết có căn cứ.</p></div></div>
            <div className="source-form-grid">
              <input value={sourceDraft.title} onChange={(e) => setSourceDraft({ ...sourceDraft, title: e.target.value })} placeholder="Tên nguồn" />
              <input value={sourceDraft.url} onChange={(e) => setSourceDraft({ ...sourceDraft, url: e.target.value })} placeholder="Đường link nguồn" />
              <input value={sourceDraft.publisher} onChange={(e) => setSourceDraft({ ...sourceDraft, publisher: e.target.value })} placeholder="Cơ quan/website ban hành" />
              <button onClick={addSource}><Plus size={16} /> Thêm nguồn</button>
            </div>
            <div className="source-list-admin">
              {sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><strong>{source.title}</strong><span>{source.publisher || source.url}</span></a>)}
              {sources.length === 0 && <div className="empty-state">Chưa có nguồn riêng cho địa danh này.</div>}
            </div>
          </section>
        )}

        {activeTab === 'feedback' && (
          <section className="admin-panel feedback-manager-admin">
            <div className="admin-panel-head"><div><h2>Góp ý của người dân</h2><p>Duyệt, ghi nhận hoặc đánh dấu đã xử lý góp ý liên quan đến địa danh.</p></div></div>
            <div className="submission-list-admin">
              {submissions.length === 0 && <div className="empty-state">Chưa có góp ý liên quan.</div>}
              {submissions.map((item) => (
                <article key={item.id || item.created_at} className="submission-card-admin">
                  <div>
                    <strong>{item.sender_name || 'Người gửi góp ý'}</strong>
                    <span>{item.sender_email || item.sender_phone || 'Chưa có liên hệ'} · {item.status || 'pending'}</span>
                  </div>
                  <p>{item.message}</p>
                  <div className="submission-actions">
                    <button onClick={() => updateSubmissionStatus(item, 'reviewed')}><CheckCircle2 size={15} /> Đã xem</button>
                    <button onClick={() => updateSubmissionStatus(item, 'resolved')}><CheckCircle2 size={15} /> Đã xử lý</button>
                    <button className="danger-btn" onClick={() => updateSubmissionStatus(item, 'rejected')}><XCircle size={15} /> Bỏ qua</button>
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
