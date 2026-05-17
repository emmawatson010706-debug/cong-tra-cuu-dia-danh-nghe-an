import { useMemo, useState } from 'react';
import Layout, { ADMIN_EMAIL } from '../components/Layout.jsx';
import { supabase } from '../lib/supabase.js';
import MapPanel from '../components/MapPanel.jsx';
import PlaceCard from '../components/PlaceCard.jsx';
import places from '../data/places.json';
import { Search, Database, MapPinned, FileSearch, Send, MessageSquareMore } from 'lucide-react';

function norm(v) {
  return String(v || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .toLowerCase();
}

export default function App() {
  const [q, setQ] = useState('');
  const [feedback, setFeedback] = useState({ name: '', contact: '', place: '', message: '' });
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const filtered = useMemo(() => {
    const key = norm(q.trim());
    if (!key) return places;
    return places.filter((p) => (
      norm(p.name).includes(key) ||
      norm(p.oldDistrict).includes(key) ||
      norm((p.oldUnits || []).join(' ')).includes(key)
    ));
  }, [q]);

  const visible = filtered.slice(0, q ? 130 : 24);

  const submitFeedback = async (e) => {
    e.preventDefault();
    const message = feedback.message.trim();
    if (!message) {
      setFeedbackStatus({ type: 'error', message: 'Anh/bà con vui lòng nhập nội dung góp ý trước khi gửi.' });
      return;
    }

    const matchedPlace = feedback.place
      ? places.find((p) => norm(p.name).includes(norm(feedback.place)) || norm(feedback.place).includes(norm(p.name)))
      : null;

    const payload = {
      place_id: matchedPlace?.id || null,
      sender_name: feedback.name.trim() || null,
      sender_email: feedback.contact.includes('@') ? feedback.contact.trim() : null,
      sender_phone: feedback.contact.includes('@') ? null : feedback.contact.trim() || null,
      message: [
        feedback.place ? `Xã/phường liên quan: ${feedback.place}` : '',
        message
      ].filter(Boolean).join('\n\n'),
      status: 'pending'
    };

    setIsSubmittingFeedback(true);
    setFeedbackStatus({ type: '', message: '' });

    try {
      if (supabase) {
        const { error } = await supabase.from('community_submissions').insert(payload);
        if (error) throw error;
        setFeedbackStatus({ type: 'success', message: 'Đã gửi góp ý thành công. Ban quản trị NATA sẽ rà soát và cập nhật dữ liệu.' });
        setFeedback({ name: '', contact: '', place: '', message: '' });
      } else {
        const saved = JSON.parse(localStorage.getItem('nata-community-submissions') || '[]');
        saved.push({ ...payload, created_at: new Date().toISOString() });
        localStorage.setItem('nata-community-submissions', JSON.stringify(saved));
        setFeedbackStatus({ type: 'success', message: 'Đã lưu góp ý tạm trên trình duyệt. Khi cấu hình Supabase, góp ý sẽ gửi thẳng vào database.' });
        setFeedback({ name: '', contact: '', place: '', message: '' });
      }
    } catch (error) {
      console.error(error);
      setFeedbackStatus({ type: 'error', message: `Chưa gửi được vào Supabase: ${error.message || 'lỗi không xác định'}. Vui lòng kiểm tra biến môi trường và quyền insert bảng community_submissions.` });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <Layout>
      <section className="hero civic-hero">
        <div className="hero-bg"></div>
        <div className="container hero-inner civic-hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">NATA - Cổng tra cứu bản đồ hành chính mới</span>
            <h1>
              Tra cứu địa danh xã, phường <span className="nghe-an-highlight">Nghệ An</span> theo bản đồ hành chính mới
            </h1>
            <p>
              Cổng tra cứu giúp người dân nhanh chóng tìm đúng xã/phường mới, đối chiếu với đơn vị cũ,
              xem bản đồ toàn tỉnh và mở hồ sơ địa danh riêng của từng địa phương.
            </p>

            <div className="hero-highlights">
              <div className="hero-highlight">
                <strong>130</strong>
                <span>xã/phường mới</span>
              </div>
              <div className="hero-highlight">
                <strong>3 lớp</strong>
                <span>2D · 3D · Quy hoạch</span>
              </div>
              <div className="hero-highlight">
                <strong>Có nguồn</strong>
                <span>Đối chiếu website địa phương</span>
              </div>
            </div>

            <div className="hero-search civic-search">
              <Search size={24} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Nhập tên xã/phường, huyện cũ hoặc đơn vị cũ..."
              />
              <button onClick={() => document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' })}>
                Tra cứu
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="portal-intro section-card">
          <div className="section-title compact-title">
            <div>
              <span className="title-icon"><FileSearch size={18} /></span>
              <h2>Cổng tra cứu hành chính cộng đồng</h2>
            </div>
          </div>
          <div className="portal-grid">
            <div>
              <h3>Tra cứu nhanh, trực quan, dễ hiểu</h3>
              <p>
                Hệ thống tập trung vào bản đồ địa danh toàn tỉnh <span className="nghe-an-highlight inline-highlight">Nghệ An</span>, từ đó dẫn tới hồ sơ chi tiết của từng xã/phường.
                Nội dung được biên tập gọn, rõ, ưu tiên thông tin dễ tra cứu cho cộng đồng.
              </p>
            </div>
            <ul className="portal-points">
              <li><MapPinned size={16} /> Bản đồ toàn tỉnh làm trung tâm</li>
              <li><Database size={16} /> Hồ sơ riêng cho từng xã/phường</li>
              <li><Send size={16} /> Có nguồn dẫn để đối chiếu tại cuối bài</li>
            </ul>
          </div>
        </section>

        <MapPanel title={<>Bản đồ toàn tỉnh <span className="nghe-an-highlight">Nghệ An</span></>} />

        <section id="places" className="directory section-card">
          <div className="section-title directory-head">
            <div>
              <span className="title-icon">☷</span>
              <div>
                <h2>Danh mục 130 xã/phường</h2>
                <p className="section-desc">Bấm vào từng địa danh để mở hồ sơ riêng, bản đồ và thông tin giới thiệu của địa phương đó.</p>
              </div>
            </div>
            <span className="counter">{filtered.length} kết quả</span>
          </div>
          <div className="directory-tools">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm trong danh sách 130 xã/phường..." />
            {q && <button onClick={() => setQ('')}>Xóa tìm kiếm</button>}
          </div>
          <div className="place-grid place-grid-portal">
            {visible.map((place) => <PlaceCard place={place} key={place.id} />)}
          </div>
          {!q && <button className="more-btn" onClick={() => setQ(' ')}>Xem toàn bộ 130 xã/phường</button>}
        </section>

        <section className="community-card civic-note">
          <div className="camera"><Database size={34} /></div>
          <div>
            <h2>Nguyên tắc biên tập thông tin</h2>
            <p>
              Nội dung trên cổng tra cứu được biên tập ngắn gọn từ nguồn chính thống của địa phương.
              Những phần chưa đủ căn cứ sẽ được viết theo hướng chung, tránh suy diễn và tránh đưa thông tin nội bộ.
            </p>
          </div>
          <a className="primary-btn" href="#gop-y-du-lieu">
            <Send size={18} /> Góp ý dữ liệu
          </a>
        </section>

        <section id="gop-y-du-lieu" className="feedback-card section-card">
          <div className="section-title compact-title">
            <div>
              <span className="title-icon"><MessageSquareMore size={18} /></span>
              <h2>Góp ý dữ liệu địa danh</h2>
            </div>
          </div>
          <p className="feedback-desc">
            Nếu bà con phát hiện thông tin chưa đúng, thiếu ảnh hoặc cần bổ sung nguồn cho một xã/phường,
            vui lòng gửi góp ý để ban quản trị NATA rà soát và cập nhật.
          </p>
          <form className="feedback-form" onSubmit={submitFeedback}>
            <div className="feedback-grid">
              <label>
                Họ và tên
                <input value={feedback.name} onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} placeholder="Ví dụ: Nguyễn Văn A" />
              </label>
              <label>
                Số điện thoại hoặc email
                <input value={feedback.contact} onChange={(e) => setFeedback({ ...feedback, contact: e.target.value })} placeholder="Để ban quản trị liên hệ lại" />
              </label>
            </div>
            <label>
              Xã/phường liên quan
              <input value={feedback.place} onChange={(e) => setFeedback({ ...feedback, place: e.target.value })} placeholder="Ví dụ: xã Hưng Nguyên" />
            </label>
            <label>
              Nội dung góp ý
              <textarea rows="5" value={feedback.message} onChange={(e) => setFeedback({ ...feedback, message: e.target.value })} placeholder="Ghi rõ nội dung cần sửa, nguồn đối chiếu hoặc góp ý thêm..." />
            </label>
            <div className="feedback-actions">
              <button type="submit" className="primary-btn" disabled={isSubmittingFeedback}><Send size={18} /> {isSubmittingFeedback ? 'Đang gửi...' : 'Gửi góp ý'}</button>
              <a className="ghost-btn" href={`mailto:${ADMIN_EMAIL}`}>Gửi trực tiếp qua email</a>
            </div>
            {feedbackStatus.message && <div className={`feedback-status ${feedbackStatus.type}`}>{feedbackStatus.message}</div>}
          </form>
        </section>
      </div>
    </Layout>
  );
}
