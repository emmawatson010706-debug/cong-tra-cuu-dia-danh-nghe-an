import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import MapPanel from '../components/MapPanel.jsx';
import places from '../data/places.json';
import { AlertTriangle, ExternalLink, MapPinned, Users, Ruler, BarChart3, Building2, ShieldCheck } from 'lucide-react';

const PLANNING_DECISION_URL = 'https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-1059-qd-ttg-40137.htm';
const PLANNING_REFERENCE_URL = 'https://share.google/JOTTNmARLRkh0XqH5';

function fmtNumber(v) {
  if (v === null || v === undefined || v === '') return 'Đang cập nhật';
  return Number(v).toLocaleString('vi-VN');
}

function districtLabel(value) {
  const name = String(value || '').trim();
  if (!name) return 'địa phương cũ';
  if (name === 'TP Vinh' || name === 'Vinh') return 'thành phố Vinh cũ';
  if (/^(Thành phố|thành phố|Huyện|huyện|Thị xã|thị xã|TX)/.test(name)) return `${name} cũ`;
  const townLike = ['Cửa Lò', 'Hoàng Mai', 'Thái Hòa'];
  if (townLike.includes(name)) return `thị xã ${name} cũ`;
  return `huyện ${name} cũ`;
}

function typeLabel(type) {
  return type === 'phường' ? 'phường' : 'xã';
}

function isUnchangedPlace(place) {
  const units = place.oldUnits || [];
  if (units.length !== 1) return false;
  const clean = (value) => String(value || '').toLowerCase()
    .replace(/^xã\s+|^phường\s+|^thị trấn\s+/i, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
  return clean(units[0]) === clean(place.name);
}

function formationSentence(place) {
  const units = place.oldUnits || [];
  if (!units.length) {
    return `Thông tin các đơn vị hành chính cũ cấu thành ${place.name} đang được tiếp tục đối chiếu theo Nghị quyết 1678/NQ-UBTVQH15 và website thông tin điện tử địa phương.`;
  }
  if (isUnchangedPlace(place)) {
    return `${place.name} là đơn vị hành chính không thực hiện sắp xếp theo Điều 1 Nghị quyết 1678/NQ-UBTVQH15; địa danh này tiếp tục được sử dụng trong hệ thống đơn vị hành chính cấp xã của tỉnh Nghệ An.`;
  }
  const list = units.length === 1 ? units[0] : `${units.slice(0, -1).join(', ')} và ${units[units.length - 1]}`;
  return `${place.name} được hình thành trên cơ sở sắp xếp toàn bộ diện tích tự nhiên, quy mô dân số của các đơn vị hành chính cũ gồm: ${list}.`;
}

export default function PlacePage() {
  const { slug } = useParams();
  const place = places.find(p => p.slug === slug);

  if (!place) {
    return (
      <Layout>
        <div className="container section-card">
          <h1>Không tìm thấy địa danh</h1>
          <Link to="/">Về trang chủ</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container place-page">
        <nav className="breadcrumb"><Link to="/">Trang chủ</Link> / <span>Địa danh</span> / <strong>{place.name}</strong></nav>
        <section className="place-hero">
          <span className="eyebrow">Hồ sơ địa danh và bản đồ tra cứu</span>
          <h1>{place.name}</h1>
          <p>{place.name} là đơn vị hành chính cấp {typeLabel(place.type)} của tỉnh Nghệ An, thuộc địa bàn {districtLabel(place.oldDistrict)} trước khi sắp xếp đơn vị hành chính cấp xã năm 2025.</p>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><Ruler/><span>Diện tích</span><strong>{place.areaKm2 ? `${fmtNumber(place.areaKm2)} km²` : 'Đang cập nhật'}</strong></div>
          <div className="stat-card"><Users/><span>Dân số</span><strong>{fmtNumber(place.population)} người</strong></div>
          <div className="stat-card"><BarChart3/><span>Mật độ</span><strong>{place.density ? `${fmtNumber(Math.round(place.density))} người/km²` : 'Đang cập nhật'}</strong></div>
          <div className="stat-card"><Building2/><span>Đơn vị cũ liên quan</span><strong>{place.oldUnits?.length || 0} đơn vị</strong></div>
        </section>

        <MapPanel selectedSlug={place.slug} compact title="Bản đồ địa danh theo ranh giới GIS" />

        <section className="planning-reference-card" id="quy-hoach-tham-khao">
          <div className="planning-icon"><AlertTriangle size={24}/></div>
          <div className="planning-content">
            <p className="planning-kicker">Quy hoạch tham khảo</p>
            <h2>Tra cứu quy hoạch theo hướng an toàn</h2>
            <p>Dữ liệu quy hoạch cần được đối chiếu với nguồn chính thức của cơ quan nhà nước có thẩm quyền. Website chỉ hỗ trợ dẫn nguồn tra cứu, không thay thế văn bản pháp lý hoặc bản đồ quy hoạch chính thức.</p>
            <div className="planning-actions">
              <a href={PLANNING_DECISION_URL} target="_blank" rel="noreferrer">Quyết định 1059/QĐ-TTg <ExternalLink size={15}/></a>
              <a href={PLANNING_REFERENCE_URL} target="_blank" rel="noreferrer">Mở bản đồ QH tham khảo <ExternalLink size={15}/></a>
            </div>
          </div>
        </section>

        <section className="article-card">
          <div className="section-title">
            <div><span className="title-icon">⌂</span><h2>Giới thiệu về {place.name}</h2></div>
          </div>
          <p>{place.name} là đơn vị hành chính cấp {typeLabel(place.type)} của tỉnh Nghệ An, thuộc địa bàn {districtLabel(place.oldDistrict)} trước khi sắp xếp đơn vị hành chính cấp xã năm 2025.</p>
          <p>{formationSentence(place)}</p>
          <p>Trang hồ sơ địa danh này hỗ trợ người dân tra cứu tên gọi hành chính mới, đối chiếu với đơn vị hành chính cũ, xem vị trí trên bản đồ và tiếp cận các nguồn thông tin chính thống liên quan đến địa phương. Nội dung được biên tập theo hướng ngắn gọn, dễ đọc và phục vụ cộng đồng.</p>
        </section>

        <section className="info-list">
          <div><MapPinned/><span>Thuộc</span><strong>{districtLabel(place.oldDistrict)}, tỉnh Nghệ An</strong></div>
          <div><Ruler/><span>Bản đồ</span><strong>Xem ranh giới, vị trí và lớp dữ liệu địa danh</strong></div>
          <div><Users/><span>Hình thành từ</span><strong>{place.oldUnits?.join(', ') || 'Đang đối chiếu theo Nghị quyết 1678/NQ-UBTVQH15'}</strong></div>
          <div><ShieldCheck/><span>Nguồn đối chiếu</span><strong>Nghị quyết 1678/NQ-UBTVQH15 và website thông tin điện tử địa phương</strong></div>
        </section>

        <section className="source-card">
          <h2>Nguồn tham khảo</h2>
          <p>Thông tin hành chính nền được đối chiếu theo Nghị quyết 1678/NQ-UBTVQH15 và website thông tin điện tử chính thức của địa phương khi có dữ liệu phù hợp.</p>
          <a href={place.officialUrl} target="_blank" rel="noreferrer">{place.officialUrl}<ExternalLink size={16}/></a>
          <p className="legal">Nguồn pháp lý nền: Nghị quyết 1678/NQ-UBTVQH15 về sắp xếp đơn vị hành chính cấp xã của tỉnh Nghệ An năm 2025.</p>
        </section>
      </div>
    </Layout>
  );
}
