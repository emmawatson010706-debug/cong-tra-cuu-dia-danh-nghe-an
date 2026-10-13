import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Download, Layers, MapPin, ArrowLeft, ShieldCheck, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";

// Danh sách các trung tâm tỉnh thành trọng điểm để chọn nhanh
const PROVINCES = [
  { name: "Nghệ An", lat: 19.3, lng: 105.1, zoom: 9 },
  { name: "Hoàng Sa", lat: 16.5, lng: 112.0, zoom: 8 },
  { name: "Trường Sa", lat: 9.8, lng: 114.2, zoom: 8 },
  { name: "Hà Nội", lat: 21.0285, lng: 105.8542, zoom: 11 },
  { name: "TP. Hồ Chí Minh", lat: 10.7769, lng: 106.7009, zoom: 11 },
  { name: "Đà Nẵng", lat: 16.0544, lng: 108.2022, zoom: 12 },
  { name: "Hải Phòng", lat: 20.8449, lng: 106.6881, zoom: 11 },
  { name: "Cần Thơ", lat: 10.0452, lng: 105.7469, zoom: 11 },
  { name: "Thanh Hóa", lat: 19.8067, lng: 105.7852, zoom: 9 },
  { name: "Hà Tĩnh", lat: 18.356, lng: 105.9058, zoom: 9 },
  { name: "Quảng Ninh", lat: 21.0064, lng: 107.2925, zoom: 9 },
  { name: "Khánh Hòa", lat: 12.2388, lng: 109.1967, zoom: 10 },
  { name: "Lâm Đồng", lat: 11.9404, lng: 108.4583, zoom: 10 },
  { name: "Bình Dương", lat: 11.1333, lng: 106.6667, zoom: 10 },
];

// Bảng màu pastel nhạt cho từng xã/phường
const PASTEL_COLORS = [
  "#fef08a", "#fed7aa", "#fecdd3", "#e9d5ff", "#c7d2fe", "#bae6fd",
  "#bbf7d0", "#d9f99d", "#fef3c7", "#ffedd5", "#fce7f3", "#fae8ff",
  "#e0e7ff", "#e0f2fe", "#dcfce7", "#fef9c3", "#fee2e2", "#ccfbf1"
];

const getPastelColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PASTEL_COLORS[Math.abs(hash) % PASTEL_COLORS.length];
};

type SelectedWardInfo = {
  name: string;
  district: string;
  area: string;
  pop: string;
  oldUnits: string;
  slug: string;
};

export default function RanhGioiVietNam() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [activeLayer, setActiveLayer] = useState<"osm" | "satellite" | "topo">("osm");
  const layerRef = useRef<L.TileLayer | null>(null);
  const [selectedWard, setSelectedWard] = useState<SelectedWardInfo | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Khởi tạo bản đồ Leaflet định tâm tại Việt Nam
    const map = L.map(mapContainerRef.current, {
      center: [19.2, 105.1],
      zoom: 9,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Lớp bản đồ tiêu chuẩn OpenStreetMap
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    layerRef.current = osmLayer;

    // Thêm nút zoom ở vị trí góc phải
    L.control.zoom({ position: "topright" }).addTo(map);

    // Bắt sự kiện rê chuột cập nhật tọa độ
    map.on("mousemove", (e) => {
      setCoords({
        lat: Number(e.latlng.lat.toFixed(5)),
        lng: Number(e.latlng.lng.toFixed(5)),
      });
    });

    // 1. Tải và hiển thị ranh giới xã phường chi tiết với các màu nhạt và tên ở tâm
    fetch("/data/nghe-an-wards-2025.mobile.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((geoData) => {
        if (!mapInstanceRef.current) return;

        const geoLayer = L.geoJSON(geoData, {
          style: (feature) => {
            const name = feature?.properties?.ten_xa || feature?.properties?.new_unit_name || "";
            return {
              fillColor: getPastelColor(name),
              fillOpacity: 0.65,
              color: "#991b1b",
              weight: 1.2,
              opacity: 0.85,
            };
          },
          onEachFeature: (feature, layer) => {
            const props = feature.properties || {};
            const name = props.ten_xa || props.new_unit_name || props.display_name || "Xã/Phường";
            const district = props.old_district || "";
            const area = props.dtich_km2 ? `${props.dtich_km2} km²` : "";
            const pop = props.dan_so ? `${props.dan_so.toLocaleString("vi-VN")} người` : "";
            const oldUnits = props.sap_nhap || (Array.isArray(props.old_units) ? props.old_units.join(", ") : "");
            const slug = props.slug || "";

            // Hiệu ứng rê chuột và nhấp chọn
            layer.on({
              mouseover: (e) => {
                const target = e.target;
                target.setStyle({
                  weight: 2.5,
                  color: "#7f1d1d",
                  fillOpacity: 0.85,
                });
                target.bringToFront();
              },
              mouseout: (e) => {
                geoLayer.resetStyle(e.target);
              },
              click: () => {
                setSelectedWard({
                  name,
                  district,
                  area,
                  pop,
                  oldUnits,
                  slug,
                });
              },
            });

            // TÊN PHƯỜNG XÃ NẰM CHÍNH GIỮA BẢN ĐỒ RANH GIỚI
            const lat = props.centroid_lat;
            const lng = props.centroid_lng;
            if (lat && lng) {
              const labelIcon = L.divIcon({
                className: "commune-center-label",
                html: `<div style="
                  font-size: 10px;
                  font-weight: 700;
                  color: #1e293b;
                  text-shadow: -1.5px -1.5px 0 #ffffff, 1.5px -1.5px 0 #ffffff, -1.5px 1.5px 0 #ffffff, 1.5px 1.5px 0 #ffffff, 0 0 6px #ffffff;
                  white-space: nowrap;
                  text-align: center;
                  transform: translate(-50%, -50%);
                  pointer-events: none;
                  font-family: sans-serif;
                ">${name}</div>`,
                iconSize: [0, 0],
              });
              L.marker([lat, lng], { icon: labelIcon, interactive: false }).addTo(map);
            }

            // Popup thông tin chi tiết
            layer.bindPopup(`
              <div style="font-family:sans-serif; min-width:180px; padding:2px;">
                <b style="color:#991b1b; font-size:14px; font-family:serif;">${name}</b><br/>
                ${district ? `<span style="font-size:12px; color:#854d0e; font-weight:600;">Huyện/TX: ${district}</span><br/>` : ""}
                ${area ? `<span style="font-size:11.5px; color:#475569;">Diện tích: <b>${area}</b></span><br/>` : ""}
                ${pop ? `<span style="font-size:11.5px; color:#475569;">Dân số: <b>${pop}</b></span><br/>` : ""}
                ${oldUnits ? `<span style="font-size:11px; color:#64748b; display:block; margin-top:2px;">Sáp nhập từ: ${oldUnits}</span>` : ""}
                ${slug ? `<a href="/don-vi/${slug}" style="display:inline-block; margin-top:6px; color:#991b1b; font-weight:bold; font-size:11.5px;">➔ Vào trang chi tiết xã này</a>` : ""}
              </div>
            `);
          },
        }).addTo(map);

        geoLayerRef.current = geoLayer;
      })
      .catch((err) => {
        console.warn("GeoJSON load notice:", err);
      });

    // 2. Chữ "BIỂN ĐÔNG" khẳng định chủ quyền lãnh hải Việt Nam
    const bienDongIcon = L.divIcon({
      className: "bien-dong-label-container",
      html: `
        <div style="
          color: #0369a1;
          font-family: serif;
          font-weight: 900;
          font-size: 18px;
          letter-spacing: 0.25em;
          text-shadow: 0 0 8px #ffffff, 0 0 12px #bae6fd, 1px 1px 2px rgba(0,0,0,0.25);
          white-space: nowrap;
          pointer-events: none;
          transform: rotate(-15deg);
        ">
          BIỂN ĐÔNG
        </div>
      `,
      iconSize: [160, 36],
      iconAnchor: [80, 18],
    });
    L.marker([14.2, 112.5], { icon: bienDongIcon, interactive: false }).addTo(map);

    // 3. Quần đảo Hoàng Sa (Thuộc TP. Đà Nẵng, Việt Nam)
    const hoangSaIcon = L.divIcon({
      className: "hoang-sa-icon",
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="width: 13px; height: 13px; border-radius: 50%; background-color: #dc2626; border: 2.5px solid #ffffff; box-shadow: 0 0 6px rgba(0,0,0,0.5);"></div>
          <div style="
            margin-top: 3px;
            background: rgba(255, 255, 255, 0.95);
            border: 1.5px solid #991b1b;
            border-radius: 5px;
            padding: 2px 7px;
            font-size: 11px;
            font-weight: 800;
            color: #991b1b;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            text-align: center;
            line-height: 1.2;
            font-family: serif;
          ">
            Quần đảo Hoàng Sa<br/>
            <span style="font-size: 9.5px; font-weight: 700; color: #475569; font-family: sans-serif;">(TP. Đà Nẵng, VN)</span>
          </div>
        </div>
      `,
      iconSize: [150, 48],
      iconAnchor: [75, 7],
    });
    const hoangSaMarker = L.marker([16.5, 112.0], { icon: hoangSaIcon }).addTo(map);
    hoangSaMarker.bindPopup(`
      <div style="font-family:serif; text-align:center; padding: 6px; min-width: 180px;">
        <b style="color:#991b1b; font-size:14px;">Quần đảo Hoàng Sa</b><br/>
        <span style="font-size:12px; color:#1e293b; font-weight:bold;">Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam</span><br/>
        <p style="font-size:11px; color:#475569; margin-top:4px;">Chủ quyền thiêng liêng không thể tách rời của Tổ quốc Việt Nam.</p>
      </div>
    `);

    // 4. Quần đảo Trường Sa (Thuộc Tỉnh Khánh Hòa, Việt Nam)
    const truongSaIcon = L.divIcon({
      className: "truong-sa-icon",
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="width: 13px; height: 13px; border-radius: 50%; background-color: #dc2626; border: 2.5px solid #ffffff; box-shadow: 0 0 6px rgba(0,0,0,0.5);"></div>
          <div style="
            margin-top: 3px;
            background: rgba(255, 255, 255, 0.95);
            border: 1.5px solid #991b1b;
            border-radius: 5px;
            padding: 2px 7px;
            font-size: 11px;
            font-weight: 800;
            color: #991b1b;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            text-align: center;
            line-height: 1.2;
            font-family: serif;
          ">
            Quần đảo Trường Sa<br/>
            <span style="font-size: 9.5px; font-weight: 700; color: #475569; font-family: sans-serif;">(T. Khánh Hòa, VN)</span>
          </div>
        </div>
      `,
      iconSize: [150, 48],
      iconAnchor: [75, 7],
    });
    const truongSaMarker = L.marker([9.8, 114.2], { icon: truongSaIcon }).addTo(map);
    truongSaMarker.bindPopup(`
      <div style="font-family:serif; text-align:center; padding: 6px; min-width: 180px;">
        <b style="color:#991b1b; font-size:14px;">Quần đảo Trường Sa</b><br/>
        <span style="font-size:12px; color:#1e293b; font-weight:bold;">Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam</span><br/>
        <p style="font-size:11px; color:#475569; margin-top:4px;">Chủ quyền thiêng liêng không thể tách rời của Tổ quốc Việt Nam.</p>
      </div>
    `);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Đổi loại bản đồ nền
  const switchLayer = (type: "osm" | "satellite" | "topo") => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (layerRef.current) map.removeLayer(layerRef.current);

    let newUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attribution = "&copy; OpenStreetMap contributors";

    if (type === "satellite") {
      newUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      attribution = "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";
    } else if (type === "topo") {
      newUrl = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
    }

    const newLayer = L.tileLayer(newUrl, { attribution, maxZoom: 18 }).addTo(map);
    layerRef.current = newLayer;
    setActiveLayer(type);
  };

  // Di chuyển nhanh đến địa phương
  const flyToProvince = (p: typeof PROVINCES[0]) => {
    if (p.name === "Nghệ An" && geoLayerRef.current && mapInstanceRef.current) {
      try {
        mapInstanceRef.current.flyToBounds(geoLayerRef.current.getBounds(), { duration: 1.2 });
        return;
      } catch {}
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([p.lat, p.lng], p.zoom, { duration: 1.5 });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1e293b]">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Thanh điều hướng quay lại & Tiêu đề */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#854d0e] hover:text-[#991b1b] transition-colors"
          >
            <ArrowLeft className="size-4" /> Quay lại Cổng tra cứu Nghệ An
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d97706]/40 bg-[#fef3c7] px-3.5 py-1 text-xs font-bold text-[#92400e]">
            <Compass className="size-3.5 text-[#d97706]" />
            Hệ thống Bản đồ Địa chính & Ranh giới Hành chính
          </div>
        </div>

        {/* Tiêu đề trang */}
        <div className="mt-4 text-center font-serif">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#991b1b]">
            Bản Đồ Việt Nam Và Ranh Giới Xã Phường Nghệ An
          </h1>
          <p className="mx-auto mt-2 max-w-3xl font-sans text-sm sm:text-base text-[#475569] text-justify sm:text-center leading-relaxed">
            Hệ thống bản đồ trực quan thể hiện chủ quyền thiêng liêng toàn vẹn lãnh thổ Việt Nam, Biển Đông, hai quần đảo Hoàng Sa - Trường Sa cùng ranh giới hành chính chi tiết 130 xã, phường tỉnh Nghệ An sau sáp nhập 2025. Hỗ trợ tra cứu màu sắc trực quan, zoom độ phân giải cao và tích hợp tải file bản vẽ kỹ thuật CAD.
          </p>
        </div>

        {/* Thanh công cụ chọn nhanh địa phương & Lớp bản đồ */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d97706]/30 bg-white p-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs font-bold text-[#854d0e] flex items-center gap-1">
              <MapPin className="size-3.5 text-[#b91c1c]" /> Xem nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PROVINCES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => flyToProvince(p)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                    p.name === "Nghệ An"
                      ? "bg-[#991b1b] text-white font-bold"
                      : "bg-[#f8fafc] text-[#334155] hover:bg-[#fef3c7] hover:text-[#991b1b]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs">
            <span className="font-bold text-[#64748b] flex items-center gap-1">
              <Layers className="size-3.5" /> Lớp nền:
            </span>
            <button
              type="button"
              onClick={() => switchLayer("osm")}
              className={`rounded px-2 py-0.5 font-semibold cursor-pointer ${
                activeLayer === "osm" ? "bg-[#b91c1c] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Chuẩn
            </button>
            <button
              type="button"
              onClick={() => switchLayer("satellite")}
              className={`rounded px-2 py-0.5 font-semibold cursor-pointer ${
                activeLayer === "satellite" ? "bg-[#b91c1c] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Vệ tinh
            </button>
            <button
              type="button"
              onClick={() => switchLayer("topo")}
              className={`rounded px-2 py-0.5 font-semibold cursor-pointer ${
                activeLayer === "topo" ? "bg-[#b91c1c] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Địa hình
            </button>
          </div>
        </div>

        {/* Khung Bản đồ tương tác lớn có hiển thị ranh giới và màu pastel */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border-4 border-[#b8860b] shadow-xl">
          <div ref={mapContainerRef} className="h-[520px] sm:h-[580px] w-full bg-[#f1f5f9]" />

          {/* Tọa độ góc dưới */}
          {coords && (
            <div className="absolute bottom-3 left-3 z-[1000] rounded-md bg-black/75 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-xs">
              Vĩ độ: {coords.lat}° N · Kinh độ: {coords.lng}° E
            </div>
          )}
        </div>

        {/* Khung hiển thị thông tin xã/phường khi nhấp chuột trên bản đồ ranh giới */}
        {selectedWard && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border-2 border-[#b91c1c] bg-[#fffdf5] p-4 shadow-md animate-in fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-[#991b1b] shrink-0" />
                <h3 className="font-serif text-lg font-bold text-[#991b1b]">
                  {selectedWard.name} {selectedWard.district ? `(${selectedWard.district})` : ""}
                </h3>
              </div>
              <p className="font-sans text-xs text-[#475569] leading-relaxed">
                Diện tích: <b>{selectedWard.area || "Đang cập nhật"}</b> · Dân số: <b>{selectedWard.pop || "Đang cập nhật"}</b>
                {selectedWard.oldUnits && (
                  <span className="block mt-0.5 text-[#854d0e]">Sáp nhập từ: {selectedWard.oldUnits}</span>
                )}
              </p>
            </div>

            {selectedWard.slug && (
              <Link
                to={`/don-vi/${selectedWard.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl !bg-[#991b1b] hover:!bg-[#7f1d1d] px-5 py-2.5 font-sans text-xs sm:text-sm font-bold !text-white shadow-md transition-all whitespace-nowrap cursor-pointer border border-[#7f1d1d]"
              >
                <span>Vào trang chi tiết xã này</span>
                <ArrowRight className="size-4 !text-white shrink-0" />
              </Link>
            )}
          </div>
        )}

        {/* Khung Giới thiệu & Tải file CAD kỹ thuật DWG theo đúng yêu cầu */}
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#b8860b] bg-gradient-to-br from-[#fffdf5] via-[#fef9c3]/30 to-[#fffbeb] p-4.5 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#991b1b] px-3.5 py-0.5 text-xs font-bold text-white shadow-xs">
                <ShieldCheck className="size-3.5 shrink-0" />
                <span>Dữ liệu Bản vẽ Kỹ thuật AutoCAD (DWG)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#991b1b]">
                Bộ Dữ Liệu Ranh Giới Xã Phường Toàn Quốc 2026
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#475569] leading-relaxed text-justify sm:text-left">
                Tệp bản vẽ tọa độ chi tiết{" "}
                <code className="break-all font-mono font-bold text-[#991b1b] bg-[#fef3c7] px-1.5 py-0.5 rounded border border-[#d97706]/30 inline-block my-0.5">
                  2026.RanhGioiXaPhuong_105_00_m3_from_lisp.vn.dwg
                </code>{" "}
                chứa đầy đủ ranh giới hành chính các xã, phường trên cả nước, phục vụ công tác quy hoạch, địa chính, thiết kế bản đồ GIS và nghiên cứu kỹ thuật.
              </p>
              <p className="font-sans text-xs text-[#854d0e]">
                Định dạng: <b>AutoCAD Drawing (.dwg)</b> · Hệ tọa độ: <b>VN-2000 / Kinh tuyến trục</b> · Nguồn: Lisp.vn
              </p>
            </div>

            {/* Nút bấm tải về file MediaFire - Chữ trắng nền đỏ, tương thích mobile không tràn mép */}
            <div className="w-full md:w-auto shrink-0">
              <a
                href="https://www.mediafire.com/file/7vgdcw52krs8z0h/2026.RanhGioiXaPhuong_105_00_m3_from_lisp.vn.dwg/file"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl !bg-[#991b1b] hover:!bg-[#7f1d1d] px-5 py-3.5 font-sans text-sm sm:text-base font-bold !text-white shadow-lg transition-all transform hover:-translate-y-0.5 border border-[#7f1d1d] cursor-pointer"
              >
                <Download className="size-5 shrink-0 !text-white" />
                <span className="!text-white whitespace-nowrap">Tải File Bản Vẽ DWG (MediaFire)</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
