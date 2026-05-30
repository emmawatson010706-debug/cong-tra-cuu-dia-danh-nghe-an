import React, { useMemo, useState } from 'react';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { MapVisual } from '../components/MapVisual.jsx';
import { PlaceCard } from '../components/PlaceCard.jsx';
import { FeedbackForm } from '../components/FeedbackForm.jsx';
import { PLACES, REGIONS, searchPlaces } from '../data/places.js';
import { Search, MapPinned, Landmark, Layers, ShieldCheck, ArrowRight, FolderOpen, RefreshCw, Map, Navigation } from 'lucide-react';

export function HomePage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [region, setRegion] = useState('all');
  const filtered = useMemo(() => searchPlaces(query, PLACES).filter(p => (type === 'all' || p.type === type) && (region === 'all' || p.region === region)), [query, type, region]);
  const preview = filtered.slice(0, 12);
  function doSearch(e) { e.preventDefault(); document.getElementById('danh-muc')?.scrollIntoView({ behavior: 'smooth' }); }
  return (
    <main className="page-shell">
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <div className="badge"><ShieldCheck size={17} /> NATA - Cổng tra cứu bản đồ hành chính mới</div>
          <h1>Tra cứu địa danh xã, phường mới tại <mark>Nghệ An</mark> theo bản đồ hành chính mới</h1>
          <p>Cổng tra cứu giúp người dân nhanh chóng tìm đúng xã/phường mới, đối chiếu với đơn vị cũ, xem bản đồ toàn tỉnh và mở hồ sơ địa danh riêng của từng địa phương.</p>
        </div>
        <div className="hero-map"><div className="floating-map"><span>★</span><b>NGHỆ AN</b></div></div>
      </section>
      <form className="search-panel" onSubmit={doSearch}>
        <Search size={34} /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Nhập tên xã/phường, huyện cũ hoặc địa danh cần tìm" /><button>Tra cứu</button>
      </form>
      <MapVisual compact title="Bản đồ hành chính Nghệ An" />
      <section className="stats-grid">
        <div><Landmark/><b>130</b><span>xã/phường mới</span><small>Trên toàn tỉnh Nghệ An</small></div>
        <div><Layers/><b>3</b><span>lớp bản đồ</span><small>2D · 3D · Quy hoạch</small></div>
        <div><ShieldCheck/><b>Có nguồn</b><span>đối chiếu</span><small>Website địa phương chính thức</small></div>
      </section>
      <section className="feature-grid">
        <h2>Tính năng nổi bật</h2>
        {[['Tra cứu nhanh','Tìm kiếm địa danh xã/phường mới, huyện cũ, địa danh dễ dàng và chính xác.',Search],['Bản đồ trực quan','Xem bản đồ 2D, 3D và quy hoạch trực quan, dễ dùng, thân thiện.',Map],['Đối chiếu đơn vị cũ - mới','Đối chiếu, tra cứu mối quan hệ giữa đơn vị hành chính cũ và mới sau sắp xếp.',RefreshCw],['Hồ sơ địa danh','Khám phá thông tin chi tiết, lịch sử, đặc điểm và tài liệu về từng địa phương.',FolderOpen]].map(([t,d,I])=><article key={t}><I/><h3>{t}</h3><p>{d}</p><ArrowRight size={18}/></article>)}
      </section>
      <section id="danh-muc" className="directory-card">
        <h2>Danh mục 130 xã, phường mới</h2><p>Chạm vào từng địa phương để mở hồ sơ và trang chi tiết.</p>
        <div className="filters"><button className={type==='all'?'active':''} onClick={()=>setType('all')}>Tất cả</button><button className={type==='xã'?'active':''} onClick={()=>setType('xã')}>Xã</button><button className={type==='phường'?'active':''} onClick={()=>setType('phường')}>Phường</button></div>
        <div className="region-filters"><button className={region==='all'?'active':''} onClick={()=>setRegion('all')}>Tất cả vùng</button>{REGIONS.map(r=><button key={r.key} className={region===r.key?'active':''} onClick={()=>setRegion(r.key)}>{r.label}</button>)}</div>
        <div className="place-grid">{preview.map(p => <PlaceCard key={p.id} place={p} />)}</div>
        <a className="wide-cta" href="#danh-muc"><Navigation size={20}/> Hiển thị {filtered.length}/130 địa danh <ArrowRight size={20}/></a>
      </section>
      <FeedbackForm />
      <Footer />
    </main>
  );
}
