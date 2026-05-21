import { useMemo, useState } from 'react';
import Layout from '../components/Layout.jsx';
import MapPanel from '../components/MapPanel.jsx';
import PlaceCard, { getRegionLabel } from '../components/PlaceCard.jsx';
import places from '../data/places.json';
import { ArrowRight, Building2, FileText, Layers3, Map, MapPinned, MessageSquare, Search, Send, ShieldCheck, Shuffle, UsersRound } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

function norm(v) {
  return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim();
}

const regionFilters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'xa', label: 'Xã' },
  { key: 'phuong', label: 'Phường' },
  { key: 'Trung tâm tỉnh', label: 'Trung tâm tỉnh' },
  { key: 'Phía Đông / ven biển', label: 'Phía Đông / ven biển' },
  { key: 'Phía Bắc', label: 'Phía Bắc' },
  { key: 'Phía Nam / Tây Nam', label: 'Phía Nam / Tây Nam' },
  { key: 'Phía Tây miền núi', label: 'Phía Tây miền núi' }
];

const features = [
  { icon: Search, title: 'Tra cứu nhanh', text: 'Tìm kiếm địa danh xã/phường mới, huyện cũ, địa danh dễ dàng và chính xác.' },
  { icon: Map, title: 'Bản đồ trực quan', text: 'Xem bản đồ 2D, 3D và quy hoạch trực quan, dễ dùng, thân thiện.' },
  { icon: Shuffle, title: 'Đối chiếu đơn vị cũ - mới', text: 'Tra cứu mối quan hệ giữa đơn vị hành chính cũ và mới sau sắp xếp.' },
  { icon: FileText, title: 'Hồ sơ địa danh', text: 'Khám phá thông tin chi tiết, nguồn dữ liệu và tài liệu về từng địa phương.' }
];

export default function App() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = useMemo(() => {
    const key = norm(q);
    return places.filter(p => {
      const haystack = norm([p.name, p.oldDistrict, ...(p.oldUnits || [])].join(' '));
      const matchText = !key || haystack.includes(key);
      const region = getRegionLabel(p);
      const matchFilter = filter === 'all' ||
        (filter === 'xa' && p.type === 'xã') ||
        (filter === 'phuong' && p.type === 'phường') ||
        region === filter;
      return matchText && matchFilter;
    });
  }, [q, filter]);

  const visible = filtered.slice(0, showAll || q || filter !== 'all' ? 130 : 12);

  const submitFeedback = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const senderName = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const placeText = String(data.get('place') || '').trim();
    const messageText = String(data.get('message') || '').trim();

    if (!senderName || !contact || !placeText || !messageText) {
      setFeedbackStatus({ type: 'error', message: 'Anh/chị vui lòng nhập đủ họ tên, liên hệ, địa phương và nội dung góp ý.' });
      return;
    }

    const matchedPlace = places.find(p => norm(p.name) === norm(placeText) || norm(p.slug) === norm(placeText));
    const isEmail = contact.includes('@');
    const payload = {
      place_id: matchedPlace?.id || null,
      sender_name: senderName,
      sender_phone: isEmail ? null : contact,
      sender_email: isEmail ? contact : null,
      message: `Địa phương góp ý: ${placeText}

${messageText}`,
      status: 'pending'
    };

    try {
      setIsSubmitting(true);
      setFeedbackStatus({ type: '', message: '' });

      if (!supabase) {
        throw new Error('Supabase chưa được cấu hình. Kiểm tra VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.');
      }

      const { error } = await supabase.from('community_submissions').insert(payload);
      if (error) throw error;

      setFeedbackStatus({ type: 'success', message: 'Đã gửi góp ý thành công. Nội dung sẽ được quản trị viên kiểm tra trước khi cập nhật.' });
      form.reset();
    } catch (error) {
      setFeedbackStatus({ type: 'error', message: error?.message || 'Chưa gửi được góp ý. Vui lòng kiểm tra cấu hình Supabase hoặc thử lại sau.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="home-shell" id="tra-cuu">
        <div className="container">
          <section className="hero hero-modern">
            <div className="hero-copy">
              <span className="eyebrow"><ShieldCheck size={17}/> NATA - Cổng tra cứu bản đồ hành chính mới</span>
              <h1>Tra cứu địa danh xã, phường mới tại <mark>Nghệ An</mark></h1>
              <p>Cổng tra cứu giúp người dân nhanh chóng tìm đúng xã/phường mới, đối chiếu với đơn vị cũ, xem bản đồ toàn tỉnh và mở hồ sơ địa danh riêng của từng địa phương.</p>
            </div>
            <div className="hero-portrait" aria-label="Hình ảnh Bác Hồ tại Nghệ An">
              <img src="/assets/bac-ho-nghe-an-hero.webp" alt="Hình ảnh tượng Bác Hồ tại Nghệ An" />
            </div>
          </section>

          <form className="hero-search search-card" onSubmit={(e) => { e.preventDefault(); document.getElementById('places')?.scrollIntoView({behavior:'smooth'}); }}>
            <Search size={30}/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Nhập tên xã/phường, huyện cũ hoặc địa danh cần tìm" />
            <button type="submit">Tra cứu</button>
          </form>

          <section className="map-summary-card" id="ban-do">
            <div className="map-summary-copy">
              <div className="mini-title"><MapPinned size={20}/> Bản đồ hành chính Nghệ An</div>
              <div className="map-stat-row">
                <span><Building2 size={24}/><strong>130</strong><small>xã/phường mới</small></span>
                <span><Layers3 size={24}/><strong>3</strong><small>lớp bản đồ</small></span>
              </div>
              <button type="button" className="outline-cta" onClick={() => document.getElementById('map-live')?.scrollIntoView({behavior:'smooth'})}>Xem chi tiết bản đồ <ArrowRight size={17}/></button>
              <div className="fake-tabs" aria-label="Các lớp bản đồ"><b>2D</b><span>3D</span><span>Quy hoạch</span></div>
            </div>
            <div className="map-summary-visual"><img src="/assets/nghe-an-3d-map.svg" alt="Bản đồ mô hình 3D Nghệ An" /></div>
          </section>

          <section className="quick-stats" aria-label="Thông tin nhanh">
            <article><Building2/><strong>130</strong><span>xã/phường mới</span><small>Trên toàn tỉnh Nghệ An</small></article>
            <article><Layers3/><strong>3</strong><span>lớp bản đồ</span><small>2D · 3D · Quy hoạch</small></article>
          </section>

          <section className="feature-section" id="huong-dan">
            <h2>Tính năng nổi bật</h2>
            <div className="feature-grid">
              {features.map(({ icon: Icon, title, text }) => (
                <article className="feature-card" key={title}>
                  <span><Icon size={24}/></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <i><ArrowRight size={16}/></i>
                </article>
              ))}
            </div>
          </section>

          <div id="map-live">
            <MapPanel title="Bản đồ hành chính Nghệ An" />
          </div>

          <section id="places" className="directory directory-modern">
            <div className="section-title directory-title">
              <div>
                <h2>Danh mục 130 xã, phường mới</h2>
                <p>Chạm vào từng địa phương để mở hồ sơ và trang chi tiết.</p>
              </div>
              <span className="counter">{filtered.length} kết quả</span>
            </div>
            <div className="filter-pills">
              {regionFilters.map(item => <button type="button" key={item.key} className={filter === item.key ? 'active' : ''} onClick={() => setFilter(item.key)}>{item.label}</button>)}
            </div>
            <div className="directory-tools">
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm trong danh sách 130 xã/phường..." />
              {q && <button onClick={() => setQ('')}>Xóa tìm kiếm</button>}
            </div>
            <div className="place-grid">
              {visible.map(place => <PlaceCard place={place} key={place.id}/>) }
            </div>
            {!showAll && !q && filter === 'all' && <button className="more-btn" onClick={() => setShowAll(true)}><Map size={18}/> Xem toàn bộ 130 xã/phường <ArrowRight size={18}/></button>}
          </section>

          <section className="feedback-card" id="gop-y">
            <div className="feedback-head">
              <div><UsersRound size={30}/></div>
              <div>
                <h2>Góp ý bổ sung dữ liệu địa phương</h2>
                <p>Mỗi ý kiến của bạn giúp dữ liệu địa phương ngày càng đầy đủ, chính xác và hữu ích hơn.</p>
              </div>
            </div>
            <form className="feedback-form" onSubmit={submitFeedback}>
              <input name="name" placeholder="Họ và tên" />
              <input name="contact" placeholder="Số điện thoại hoặc email" />
              <input name="place" list="feedback-places" placeholder="Chọn địa phương cần góp ý" />
              <datalist id="feedback-places">
                {places.map(place => <option key={place.id} value={place.name} />)}
              </datalist>
              <textarea name="message" placeholder="Nội dung góp ý" rows="4" maxLength="1000"></textarea>
              <p>Thông tin bạn gửi sẽ được quản trị viên kiểm duyệt trước khi cập nhật.</p>
              {feedbackStatus.message && <div className={`feedback-status ${feedbackStatus.type}`}>{feedbackStatus.message}</div>}
              <button type="submit" disabled={isSubmitting}><Send size={18}/> {isSubmitting ? 'Đang gửi...' : 'Gửi góp ý'}</button>
            </form>
          </section>
        </div>
      </section>
    </Layout>
  );
}
