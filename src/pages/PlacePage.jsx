import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import MapPanel from '../components/MapPanel.jsx';
import places from '../data/places.json';
import { ExternalLink, MapPinned, Users, Ruler, BarChart3, Building2, ShieldCheck, Files } from 'lucide-react';


function highlightNgheAn(text) {
  return String(text).split(/(Nghệ An)/g).map((part, index) =>
    part === 'Nghệ An' ? <span key={index} className="nghe-an-highlight">Nghệ An</span> : part
  );
}

function fmtNumber(v) {
  if (v === null || v === undefined || v === '') return 'Đang cập nhật';
  return Number(v).toLocaleString('vi-VN');
}

export default function PlacePage() {
  const { slug } = useParams();
  const place = places.find((p) => p.slug === slug);

  if (!place) {
    return (
      <Layout>
        <div className="container section-card" style={{ marginTop: 24, marginBottom: 24 }}>
          <h1>Không tìm thấy địa danh</h1>
          <Link to="/">Về trang chủ</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container place-page">
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link> / <span>Địa danh</span> / <strong>{place.name}</strong>
        </nav>

        <section className="place-hero place-portal-hero">
          <span className="eyebrow">Hồ sơ địa danh xã/phường</span>
          <h1>{place.name}</h1>
          <p>
            {place.type === 'phường' ? 'Phường' : 'Xã'} thuộc không gian {place.oldDistrict} cũ. Trang này giúp tra cứu nhanh
            bản đồ, thông tin nền và các đơn vị cũ liên quan theo hệ thống địa danh mới của tỉnh <span className="nghe-an-highlight">Nghệ An</span>.
          </p>
          <div className="place-meta-chips">
            <span>{place.type === 'phường' ? 'Phường' : 'Xã'} mới</span>
            <span>{place.oldDistrict} cũ</span>
            <span>{place.oldUnits?.length || 0} đơn vị cũ liên quan</span>
          </div>
        </section>

        <section className="stats-grid stats-grid-portal">
          <div className="stat-card"><Ruler /><span>Diện tích</span><strong>{place.areaKm2 ? `${fmtNumber(place.areaKm2)} km²` : 'Đang cập nhật'}</strong></div>
          <div className="stat-card"><Users /><span>Dân số</span><strong>{fmtNumber(place.population)} người</strong></div>
          <div className="stat-card"><BarChart3 /><span>Mật độ</span><strong>{place.density ? `${fmtNumber(Math.round(place.density))} người/km²` : 'Đang cập nhật'}</strong></div>
          <div className="stat-card"><Building2 /><span>Không gian cũ</span><strong>{place.oldDistrict}</strong></div>
        </section>

        <MapPanel selectedSlug={place.slug} compact focusOnly title={`Bản đồ ${place.name}`} />

        <div className="place-body-grid">
          <section className="article-card intro-article">
            <div className="section-title compact-title">
              <div>
                <span className="title-icon">⌂</span>
                <h2>Giới thiệu khái quát</h2>
              </div>
            </div>
            {place.article.split('\n\n').map((para, i) => <p key={i}>{highlightNgheAn(para)}</p>)}
          </section>

          <aside className="source-card side-facts-card">
            <h2>Thông tin tra cứu nhanh</h2>
            <div className="mini-fact-list">
              <div><MapPinned size={18} /><span>Vị trí</span><strong>{place.oldDistrict} cũ, <span className="nghe-an-highlight">Nghệ An</span></strong></div>
              <div><Files size={18} /><span>Đơn vị cũ</span><strong>{place.oldUnits?.join(', ') || 'Đang cập nhật'}</strong></div>
              <div><ShieldCheck size={18} /><span>Nguồn</span><strong>Website địa phương và nguồn pháp lý nền</strong></div>
            </div>
            <a href={place.officialUrl} target="_blank" rel="noreferrer">
              Truy cập website địa phương <ExternalLink size={16} />
            </a>
            <p className="legal">Nguồn pháp lý nền: Nghị quyết 1678/NQ-UBTVQH15 về sắp xếp đơn vị hành chính cấp xã của tỉnh <span className="nghe-an-highlight">Nghệ An</span> năm 2025.</p>
          </aside>
        </div>

        <section className="origin-card section-card">
          <div className="section-title compact-title">
            <div>
              <span className="title-icon"><Building2 size={18} /></span>
              <h2>Các đơn vị cũ liên quan</h2>
            </div>
          </div>
          <div className="origin-chips">
            {(place.oldUnits || []).map((unit) => <span key={unit}>{unit}</span>)}
          </div>
        </section>
      </div>
    </Layout>
  );
}
