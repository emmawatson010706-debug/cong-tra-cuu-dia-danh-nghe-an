import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, X } from 'lucide-react';

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
  return {
    color: selected ? '#0f766e' : mode === '3D' ? '#14b8a6' : '#0f766e',
    weight: selected ? 3.5 : mode === '3D' ? 1.5 : 1.15,
    opacity: selected ? 1 : mode === '3D' ? 0.92 : 0.76,
    fillColor: selected ? '#99f6e4' : mode === '3D' ? '#2dd4bf' : '#d1fae5',
    fillOpacity: selected ? 0.48 : mode === '3D' ? 0.12 : 0.18
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

export default function MapPanel({ selectedSlug, compact=false, title='Bản đồ toàn tỉnh Nghệ An' }) {
  const mapEl = useRef(null);
  const map = useRef(null);
  const geoLayer = useRef(null);
  const tileLayer = useRef(null);
  const labelLayer = useRef(null);
  const [mode, setMode] = useState('2D');
  const [geojson, setGeojson] = useState(null);
  const [active, setActive] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    fetch('/data/nghe-an-wards-2025.mobile.geojson')
      .then(res => res.json())
      .then(setGeojson)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!mapEl.current || map.current) return;
    map.current = L.map(mapEl.current, { zoomControl: true, preferCanvas: true }).setView([19.1, 104.9], 8);
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
      mapEl.current.classList.remove('map-planning');
    }
  }, [mode]);

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
          if (p.slug) layer.setStyle({ color: '#0f766e', weight: 4, fillOpacity: 0.52 });
        });
      }
    }).addTo(map.current);

    if (mode === '3D') {
      const markers = [];
      geojson.features.forEach((feature) => {
        const p = feature.properties || {};
        const center = L.geoJSON(feature).getBounds().getCenter();
        markers.push(L.marker(center, { icon: getLabelIcon(p.display_name || p.new_unit_name) }));
      });
      labelLayer.current = L.layerGroup(markers).addTo(map.current);
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
    <section className={`map-card ${fullscreen ? 'map-fullscreen' : ''}`}>
      <div className="section-title map-title">
        <div>
          <span className="title-icon">▣</span>
          <h2>{title}</h2>
        </div>
        <button className="ghost-btn map-fullscreen-btn" onClick={() => setFullscreen(!fullscreen)}>
          {fullscreen ? <X size={16}/> : <Maximize2 size={16}/>} {fullscreen ? 'Đóng' : 'Toàn màn hình'}
        </button>
      </div>
      <div className="map-tabs map-tabs-two">
        {['2D','3D'].map(m => <button key={m} className={mode===m ? 'active' : ''} onClick={() => setMode(m)}>{m}</button>)}
      </div>
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
