import React from 'react'; 
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { MapVisual } from '../components/MapVisual.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import PlaceCard from '../components/PlaceCard.jsx';
import { PLACES, findPlaceBySlug } from '../data/places.js';
import { ArrowLeft, Home, MapPin, Landmark, ShieldCheck, FileText, FolderOpen, ExternalLink, Info } from 'lucide-react';
import AdministrativeTimeline from "../components/AdministrativeTimeline";

export function PlaceDetailPage({ slug }) {
  const place = findPlaceBySlug(slug);
  const related = PLACES.filter(p => p.slug !== place.slug && (p.region === place.region || p.oldDistrict === place.oldDistrict)).slice(0, 3);
  const formerText = place.formerUnits?.length ? place.formerUnits.join(', ') : 'Thông tin đơn vị cũ đang được đối chiếu, cập nhật theo Nghị quyết 1678/NQ-UBTVQH15.';

  return (
    <main className="page-shell detail-page">
      <Header />

      <div className="crumb-row">
        <a className="back-btn" href="/">
          <ArrowLeft size={18}/> Quay lại tra cứu
        </a>
        <span>
          <Home size={15}/> Nghệ An › {place.regionLabel} › {place.name}
        </span>
      </div>

      <section className="detail-hero">
        <div className="place-avatar">
          <MapPin size={38}/>
        </div>

        <div className="detail-copy">
          <h1>{place.name}</h1>
          <p>
            Địa danh hành chính cấp {place.type} mới của tỉnh <mark>Nghệ An</mark>
          </p>

          <div className="tag-row">
            <span><Landmark size={17}/>{place.oldDistrict}</span>
            <span><MapPin size={17}/>{place.regionLabel}</span>
            <span><ShieldCheck size={17}/>Loại: {place.type}</span>
          </div>

          <p className="lead-text">
            {place.name} là đơn vị hành chính cấp {place.type} mới của tỉnh Nghệ An, thuộc địa bàn {place.oldDistrict} trước khi sắp xếp đơn vị hành chính. {place.formerUnits?.length ? `${place.name} được hình thành trên cơ sở sáp nhập từ: ${formerText}.` : formerText}
          </p>
        </div>

        <div className="detail-illustration">
          <span>★</span>
          <b>{place.name.replace(/^Xã |^Phường /,'').toUpperCase()}</b>
        </div>
      </section>

      <MapVisual place={place} title="Bản đồ hành chính địa phương" />

      <AdministrativeTimeline place={place} />

      <section className="info-two-col">
        <article className="quick-card">
          <h2><Info size={22}/> Thông tin tra cứu nhanh</h2>
          <dl>
            <div>
              <dt>Thuộc</dt>
              <dd>{place.oldDistrict}</dd>
            </div>
            <div>
              <dt>Hình thành từ</dt>
              <dd>{formerText}</dd>
            </div>
            <div>
              <dt>Vùng</dt>
              <dd>{place.regionLabel}</dd>
            </div>
            <div>
              <dt>Nguồn đối chiếu</dt>
              <dd>{place.legalSource}</dd>
            </div>
          </dl>
        </article>

        <article className="quick-card">
          <h2><FolderOpen size={22}/> Hồ sơ địa danh</h2>
          <p>
            Trang cung cấp thông tin chính thống về tên gọi hành chính mới, ranh giới địa lý, nguồn gốc hình thành và các tư liệu tra cứu liên quan đến xã, phường trên địa bàn tỉnh Nghệ An.
          </p>
          <p>
            Dữ liệu được cập nhật theo các nghị quyết, quyết định của cơ quan nhà nước có thẩm quyền. Mục tiêu nhằm hỗ trợ người dân, tổ chức tra cứu nhanh chóng, minh bạch và đáng tin cậy.
          </p>
        </article>
      </section>

      <section className="sources-card">
        <h2><ShieldCheck size={22}/> Nguồn thông tin chính thức</h2>
        <div className="source-grid">
          <a href="#">
            <FileText/> Nghị quyết 1678/NQ-UBTVQH15 <ExternalLink size={17}/>
          </a>
          <a href={place.website} target="_blank" rel="noreferrer">
            <ExternalLink/> Website địa phương <ExternalLink size={17}/>
          </a>
        </div>
      </section>

      <section className="related-card">
        <h2><MapPin size={22}/> Địa danh liên quan</h2>
        <div className="place-grid compact">
          {related.map(p => <PlaceCard key={p.id} place={p}/>)}
        </div>
      </section>

      <FeedbackForm placeName={place.name}/>

      <Footer active="Hồ sơ địa danh" />
    </main>
  );
}