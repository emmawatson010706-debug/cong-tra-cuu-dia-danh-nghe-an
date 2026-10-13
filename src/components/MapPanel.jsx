import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, X } from 'lucide-react';


const createIslandLabelIcon = (label, type = 'island') =>
  L.divIcon({
    className: `vn-map-label vn-map-label--${type}`,
    html: `<div class="sov-map-pill ${type === 'sea' ? 'sea-pill' : 'island-pill'}"><span class="sov-star">🇻🇳</span><strong>${label}</strong></div>`,
    iconSize: type === 'sea' ? [180, 32] : [220, 44],
    iconAnchor: type === 'sea' ? [90, 16] : [110, 22],
  });

const addVietnamSeaLabels = (mapInstance, labelsLayerRef) => {
  if (!mapInstance || labelsLayerRef.current) return;

  const group = L.layerGroup([
    L.marker([16.55, 112.25], {
      icon: createIslandLabelIcon('Quần đảo Hoàng Sa (Việt Nam)'),
      interactive: false,
      keyboard: false,
    }),
    L.marker([9.75, 114.15], {
      icon: createIslandLabelIcon('Quần đảo Trường Sa (Việt Nam)'),
      interactive: false,
      keyboard: false,
    }),
    L.marker([13.2, 112.6], {
      icon: createIslandLabelIcon('BIỂN ĐÔNG (VIỆT NAM)', 'sea'),
      interactive: false,
      keyboard: false,
    }),
  ]);

  group.addTo(mapInstance);
  labelsLayerRef.current = group;
};

const modeTiles = {
  '2D': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap'
  },
  '3D': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  }
};

function styleFeature(feature, selectedSlug, mode) {
  const slug = feature?.properties?.slug;
  const selected = selectedSlug && slug === selectedSlug;
  if (selected) {
    // Highlight ĐỎ nổi bật khi xã/phường được chọn
    return {
      color: '#C8102E',       // viền đỏ quốc kỳ
      weight: 3.5,
      opacity: 1,
      fillColor: '#FEE2E2',   // nền đỏ nhạt
      fillOpacity: 0.45,
      dashArray: null,
    };
  }
  // Mặc định: xám nhạt, không rối bản đồ
  return {
    color: mode === '3D' ? '#64748b' : '#6B7280',
    weight: mode === '3D' ? 1.2 : 0.9,
    opacity: 0.70,
    fillColor: '#E5E7EB',
    fillOpacity: mode === '3D' ? 0.10 : 0.14,
  };
}

function getLabelIcon(name) {
  return L.divIcon({
    className: 'map-label-chip',
    html: `<span>${name || ''}</span>`,
    iconSize: [120, 26],
    iconAnchor: [60, 13]
  });
}

export default function MapPanel({ selectedSlug, compact=false, title='Bản đồ toàn tỉnh Nghệ An', homeOnly=false }) {
  const mapEl = useRef(null);
  const map = useRef(null);
  const geoLayer = useRef(null);
  const tileLayer = useRef(null);
  const islandLabelsLayer = useRef(null);
  const labelLayer = useRef(null);
  const [mode, setMode] = useState('2D');
  const [geojson, setGeojson] = useState(null);
  const [active, setActive] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const modes = homeOnly ? ['2D'] : ['2D','3D'];

  useEffect(() => {
    fetch('/data/nghe-an-wards-2025.mobile.geojson')
      .then(res => res.json())
      .then(setGeojson)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!mapEl.current || map.current) return;
    const vnBounds = L.latLngBounds(L.latLng(7.0, 101.5), L.latLng(23.5, 117.8));
    map.current = L.map(mapEl.current, { zoomControl: true, preferCanvas: true, maxBounds: vnBounds, maxBoundsViscosity: 0.95, minZoom: 6 }).setView([19.1, 104.9], 8);
    tileLayer.current = L.tileLayer(modeTiles['2D'].url, { attribution: modeTiles['2D'].attribution, maxZoom: 18 }).addTo(map.current);
    addVietnamSeaLabels(map.current, islandLabelsLayer);
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (homeOnly && mode !== '2D') {
      setMode('2D');
      return;
    }
    if (tileLayer.current) map.current.removeLayer(tileLayer.current);
    tileLayer.current = L.tileLayer(modeTiles[mode].url, {
      attribution: modeTiles[mode].attribution,
      maxZoom: mode === '3D' ? 19 : 18
    }).addTo(map.current);
    if (mapEl.current) {
      mapEl.current.classList.toggle('map-tilt', mode === '3D');
      mapEl.current.classList.remove('map-planning');
    }
  }, [mode, homeOnly]);

  useEffect(() => {
    if (!map.current || !geojson) return;
    if (geoLayer.current) map.current.removeLayer(geoLayer.current);
    if (labelLayer.current) map.current.removeLayer(labelLayer.current);

    geoLayer.current = L.geoJSON(geojson, {
      style: (feature) => styleFeature(feature, selectedSlug, mode),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        layer.bindTooltip(p.display_name || p.new_unit_name, { sticky: true });
        layer.on('click', () => {
          setActive(p);
          // Reset tất cả về mặc định, rồi highlight cái được click
          geoLayer.current?.eachLayer(l => l.setStyle && l.setStyle(styleFeature(l.feature, null, mode)));
          if (p.slug) layer.setStyle({ color: '#C8102E', weight: 3.5, fillColor: '#FEE2E2', fillOpacity: 0.45, opacity: 1 });
        });
      }
    }).addTo(map.current);

    if (mode === '3D' && selectedSlug) {
      const selectedFeatureForLabel = geojson.features.find(f => f.properties?.slug === selectedSlug);
      if (selectedFeatureForLabel) {
        const p = selectedFeatureForLabel.properties || {};
        const center = L.geoJSON(selectedFeatureForLabel).getBounds().getCenter();
        labelLayer.current = L.layerGroup([
          L.marker(center, { icon: getLabelIcon(p.display_name || p.new_unit_name) })
        ]).addTo(map.current);
      }
    }

    const selectedFeature = selectedSlug ? geojson.features.find(f => f.properties?.slug === selectedSlug) : null;
    if (selectedFeature) {
      const layer = L.geoJSON(selectedFeature);
      map.current.fitBounds(layer.getBounds(), { padding: [24, 24], maxZoom: 12 });
    } else {
      map.current.fitBounds(geoLayer.current.getBounds(), { padding: [12, 12] });
    }
    setTimeout(() => map.current.invalidateSize(), 200);
  }, [geojson, selectedSlug, mode]);

  useEffect(() => {
    setTimeout(() => map.current?.invalidateSize(), 250);
  }, [fullscreen]);

  return (
    <section className={`map-card ${homeOnly ? 'home-map-card' : ''} ${fullscreen ? 'map-fullscreen' : ''}`}>
      <div className={`section-title map-title ${!title ? 'map-title-compact' : ''}`}>
  {title ? (
    <div>
      <span className="title-icon">▣</span>
      <h2>{title}</h2>
    </div>
  ) : (
    <div className="map-title-spacer" aria-hidden="true" />
  )}

  <button
    className="ghost-btn map-fullscreen-btn"
    type="button"
    onClick={() => setFullscreen(!fullscreen)}
  >
    {fullscreen ? <X size={16}/> : <Maximize2 size={16}/>}
    {fullscreen ? 'Đóng' : 'Toàn màn hình'}
  </button>
</div>
      {modes.length > 1 && (
        <div className="map-tabs map-tabs-two">
          {modes.map(m => <button key={m} className={mode===m ? 'active' : ''} onClick={() => setMode(m)}>{m}</button>)}
        </div>
      )}
      <div ref={mapEl} className={`leaflet-box ${compact ? 'compact' : ''}`}></div>
      {active && (
        <div className="map-popup-card">
          <strong>{active.display_name || active.new_unit_name}</strong>
          <span>{active.old_district} cũ</span>
          <span>Diện tích: {active.dtich_km2} km² · Dân số: {Number(active.dan_so || 0).toLocaleString('vi-VN')}</span>
          <a href={`/dia-danh/${active.slug}`}>Mở hồ sơ địa danh →</a>
        </div>
      )}
    </section>
  );
}


