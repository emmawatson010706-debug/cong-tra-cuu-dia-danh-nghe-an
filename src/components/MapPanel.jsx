import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { LoaderCircle, Maximize2 } from 'lucide-react';

const modeTiles = {
  '2D': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap'
  },
  '3D': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  },
  'Quy hoạch': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap'
  }
};

let geojsonCache = null;
let geojsonPromise = null;

function loadGeojson() {
  if (geojsonCache) return Promise.resolve(geojsonCache);
  if (!geojsonPromise) {
    geojsonPromise = fetch('/data/nghe-an-wards-2025.mobile.geojson')
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được dữ liệu GeoJSON');
        return res.json();
      })
      .then((data) => {
        geojsonCache = data;
        return data;
      });
  }
  return geojsonPromise;
}

function styleFeature(feature, selectedSlug, mode, focusOnly) {
  const slug = feature?.properties?.slug;
  const selected = selectedSlug && slug === selectedSlug;
  const baseColor = mode === 'Quy hoạch' ? '#f59e0b' : '#0f766e';
  return {
    color: selected ? '#0f766e' : baseColor,
    weight: selected ? 3.5 : focusOnly ? 2.6 : 1,
    opacity: selected ? 1 : focusOnly ? 0.92 : 0.72,
    fillColor: selected ? '#99f6e4' : mode === 'Quy hoạch' ? '#fde68a' : '#d1fae5',
    fillOpacity: selected ? 0.5 : focusOnly ? 0.24 : 0.18
  };
}

export default function MapPanel({ selectedSlug, compact = false, title = 'Bản đồ toàn tỉnh Nghệ An', focusOnly = false }) {
  const mapEl = useRef(null);
  const map = useRef(null);
  const geoLayer = useRef(null);
  const tileLayer = useRef(null);
  const [mode, setMode] = useState('2D');
  const [geojson, setGeojson] = useState(null);
  const [active, setActive] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadGeojson()
      .then((data) => {
        if (!mounted) return;
        setGeojson(data);
        setError('');
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError('Không tải được bản đồ địa danh. Vui lòng thử tải lại trang.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const displayGeojson = useMemo(() => {
    if (!geojson) return null;
    if (!selectedSlug || !focusOnly) return geojson;
    const selectedFeature = geojson.features.find((f) => f.properties?.slug === selectedSlug);
    if (!selectedFeature) return geojson;
    return { ...geojson, features: [selectedFeature] };
  }, [geojson, selectedSlug, focusOnly]);

  useEffect(() => {
    if (!mapEl.current || map.current) return;
    map.current = L.map(mapEl.current, {
      zoomControl: true,
      preferCanvas: true,
      attributionControl: true,
      zoomSnap: 0.5
    }).setView([19.1, 104.9], 8);
    tileLayer.current = L.tileLayer(modeTiles['2D'].url, { attribution: modeTiles['2D'].attribution, maxZoom: 18 }).addTo(map.current);
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (tileLayer.current) map.current.removeLayer(tileLayer.current);
    tileLayer.current = L.tileLayer(modeTiles[mode].url, {
      attribution: modeTiles[mode].attribution,
      maxZoom: mode === '3D' ? 19 : 18
    }).addTo(map.current);

    if (mapEl.current) {
      mapEl.current.classList.toggle('map-tilt', mode === '3D');
      mapEl.current.classList.toggle('map-planning', mode === 'Quy hoạch');
    }
  }, [mode]);

  useEffect(() => {
    if (!map.current || !displayGeojson) return;
    if (geoLayer.current) map.current.removeLayer(geoLayer.current);

    geoLayer.current = L.geoJSON(displayGeojson, {
      style: (feature) => styleFeature(feature, selectedSlug, mode, focusOnly),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        layer.bindTooltip(p.display_name || p.new_unit_name, { sticky: true, direction: 'top' });
        layer.on('click', () => {
          setActive(p);
          const bounds = layer.getBounds?.();
          if (bounds?.isValid()) {
            map.current.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });
          }
        });
      }
    }).addTo(map.current);

    const selectedFeature = selectedSlug ? displayGeojson.features.find((f) => f.properties?.slug === selectedSlug) : null;
    if (selectedFeature) {
      const layer = L.geoJSON(selectedFeature);
      map.current.fitBounds(layer.getBounds(), { padding: [24, 24], maxZoom: 12 });
      setActive(selectedFeature.properties || null);
    } else if (geoLayer.current.getBounds().isValid()) {
      map.current.fitBounds(geoLayer.current.getBounds(), { padding: [12, 12], maxZoom: 9.5 });
    }

    requestAnimationFrame(() => map.current?.invalidateSize());
  }, [displayGeojson, selectedSlug, mode, focusOnly]);

  useEffect(() => {
    requestAnimationFrame(() => map.current?.invalidateSize());
    const timer = setTimeout(() => map.current?.invalidateSize(), 250);
    return () => clearTimeout(timer);
  }, [fullscreen]);

  return (
    <section className={`map-card ${fullscreen ? 'map-fullscreen' : ''}`}>
      <div className="section-title map-title">
        <div>
          <span className="title-icon">▣</span>
          <h2>{title}</h2>
        </div>
        <button className="ghost-btn" onClick={() => setFullscreen(!fullscreen)}>
          <Maximize2 size={16} /> {fullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
        </button>
      </div>
      <div className="map-tabs">
        {['2D', '3D', 'Quy hoạch'].map((m) => (
          <button key={m} className={mode === m ? 'active' : ''} onClick={() => setMode(m)}>{m}</button>
        ))}
      </div>
      {mode === 'Quy hoạch' && (
        <div className="planning-note">
          Lớp quy hoạch hiển thị theo dạng tham khảo. Khi sử dụng cho giao dịch hoặc thủ tục, cần đối chiếu bản đồ quy hoạch chính thức tại cơ quan có thẩm quyền.
        </div>
      )}

      <div className={`map-shell ${loading ? 'is-loading' : ''}`}>
        {loading && (
          <div className="map-loading">
            <LoaderCircle size={20} className="spin" />
            <span>Đang tải bản đồ địa danh...</span>
          </div>
        )}
        {error && !loading && <div className="map-error">{error}</div>}
        <div ref={mapEl} className={`leaflet-box ${compact ? 'compact' : ''}`}></div>
      </div>

      {active && !loading && !error && (
        <div className="map-popup-card">
          <strong>{active.display_name || active.new_unit_name}</strong>
          <span>{active.old_district} cũ</span>
          <span>
            Diện tích: {active.dtich_km2} km² · Dân số: {Number(active.dan_so || 0).toLocaleString('vi-VN')}
          </span>
          {active.slug && <a href={`/dia-danh/${active.slug}`}>Mở hồ sơ địa danh →</a>}
        </div>
      )}
    </section>
  );
}
