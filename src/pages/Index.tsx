import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Landmark, MapPin, Search, Users, Sparkles, Map } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select.tsx";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import FlagBadge from "@/components/flag-badge.tsx";
import WardMap from "@/components/ward-map.tsx";
import CommuneName from "@/components/commune-name.tsx";
import { COMMUNES, formatNumber, districtLabel } from "@/data/communes.ts";

const STATS = [
  { icon: Building2, value: "130", label: "Đơn vị hành chính mới" },
  { icon: MapPin, value: "16.489", label: "km² tổng diện tích" },
  { icon: Users, value: "3,83 triệu", label: "Quy mô dân số" },
];

const DISTRICTS = Array.from(new Set(COMMUNES.map((c) => c.district)));

export default function Index() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [district, setDistrict] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMUNES.filter((c) => {
      const matchName = !q || (c.name && c.name.toLowerCase().includes(q));
      const matchOldUnits =
        !q ||
        (Array.isArray(c.oldUnits) &&
          c.oldUnits.some((u) => u && typeof u === "string" && u.toLowerCase().includes(q)));
      const matchQuery = matchName || matchOldUnits;
      const matchType = type === "all" || c.type === type;
      const matchDistrict = district === "all" || c.district === district;
      return matchQuery && matchType && matchDistrict;
    });
  }, [query, type, district]);

  const filteredSlugs = useMemo(() => filtered.map((c) => c.slug), [filtered]);

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1e293b]">
      <SiteHeader />

      {/* Hero Section với hoa văn trống đồng mờ nghệ thuật & sang trọng */}
      <section className="relative mx-auto mt-4 max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#b8860b]/40 bg-gradient-to-b from-[#fffef5] via-[#fcf7e5] to-[#fffdf5] px-4 py-10 text-center font-serif shadow-md sm:py-12">
          {/* Họa tiết hoa văn trống đồng Đông Sơn chìm ở nền */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <svg className="size-[540px] text-[#b8860b] animate-spin-slow" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              {/* Vòng tròn đồng tâm hoa văn trống đồng */}
              <circle cx="100" cy="100" r="95" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="88" strokeWidth="0.8" />
              <circle cx="100" cy="100" r="78" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="100" cy="100" r="68" strokeWidth="0.8" />
              <circle cx="100" cy="100" r="54" strokeWidth="1.2" strokeDasharray="6 3" />
              <circle cx="100" cy="100" r="40" strokeWidth="1" />
              <circle cx="100" cy="100" r="26" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="14" strokeWidth="1" />
              {/* Ngôi sao mặt trời trung tâm 14 cánh */}
              <polygon
                points="100,86 103,96 114,100 103,104 100,114 97,104 86,100 97,96"
                fill="currentColor"
                opacity="0.6"
              />
              <polygon
                points="100,86 103,96 114,100 103,104 100,114 97,104 86,100 97,96"
                fill="currentColor"
                transform="rotate(45 100 100)"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Dải huy hiệu nằm trên đúng 1 dòng */}
          <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#d97706]/40 bg-[#fef3c7] px-5 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#92400e] shadow-xs whitespace-nowrap">
            <Sparkles className="size-4 text-[#d97706]" />
            <span>Nghệ An sau sắp xếp sáp nhập 2025</span>
          </div>

          {/* Tiêu đề 2 dòng cân đối, ấn tượng */}
          <h1 className="relative z-10 mt-4 font-extrabold leading-tight text-[#991b1b]">
            <span className="block whitespace-nowrap text-3xl sm:text-5xl tracking-normal text-[#991b1b] [text-shadow:0_2px_4px_rgba(153,27,27,0.15)]">
              Cổng tra cứu
            </span>
            <span className="mt-1 block whitespace-nowrap text-4xl uppercase tracking-wider text-[#b91c1c] sm:text-6xl [-webkit-text-stroke:1px_#7f1d1d] [paint-order:stroke_fill] [text-shadow:0_4px_12px_rgba(185,28,28,0.25)]">
              ĐỊA DANH HÀNH CHÍNH
            </span>
          </h1>

          <p className="relative z-10 mx-auto mt-4 max-w-2xl font-sans text-sm sm:text-base font-medium text-[#475569] leading-relaxed">
            Tra cứu, đối chiếu <b className="text-[#991b1b]">130 đơn vị hành chính xã, phường</b> tỉnh Nghệ An sau sắp xếp theo Nghị quyết số 1678/NQ-UBTVQH15
          </p>

          {/* Khung 3 thẻ số liệu tổng quan */}
          <div className="relative z-10 mx-auto mt-7 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border-2 border-[#d97706]/35 bg-white/90 p-3 sm:p-4 shadow-sm backdrop-blur-xs hover:border-[#b91c1c] hover:shadow-md transition-all"
              >
                <s.icon className="mx-auto size-5 sm:size-6 text-[#b91c1c]" />
                <p className="mt-1 text-2xl sm:text-3xl font-extrabold font-serif text-[#991b1b]">{s.value}</p>
                <p className="text-xs sm:text-sm font-sans font-medium text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Liên kết nhanh sang bản đồ toàn quốc */}
          <div className="relative z-10 mt-6 pt-5 border-t border-[#d97706]/20 flex justify-center">
            <Link
              to="/ranh-gioi-viet-nam"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#991b1b] to-[#b91c1c] px-4 py-2 font-sans text-xs sm:text-sm font-bold text-white shadow-sm hover:from-[#7f1d1d] hover:to-[#991b1b] transition-all"
            >
              <Map className="size-4" />
              <span>Xem Bản Đồ Ranh Giới Xã Phường Toàn Quốc ➔</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Thanh tìm kiếm & bộ lọc nổi bật */}
        <div className="flex flex-col gap-3 rounded-xl border-4 border-[#b91c1c] bg-white p-4 shadow-[0_8px_30px_rgba(185,28,28,0.2)] sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#b91c1c]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập tên xã, phường mới hoặc cũ (VD: Thành Vinh, Cửa Lò, Nghi Hải...)"
              className="h-12 border-2 border-[#fca5a5] bg-white pl-11 text-base font-medium text-[#1e293b] placeholder:text-[#94a3b8] focus-visible:border-[#b91c1c] focus-visible:ring-2 focus-visible:ring-[#fca5a5] shadow-inner"
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="sm:w-44 border-2 border-[#fca5a5] hover:border-[#b91c1c]">
              <SelectValue placeholder="Tất cả loại hình" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại hình</SelectItem>
              <SelectItem value="Xã">Xã</SelectItem>
              <SelectItem value="Phường">Phường</SelectItem>
            </SelectContent>
          </Select>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="sm:w-60 border-2 border-[#fca5a5] hover:border-[#b91c1c]">
              <SelectValue placeholder="Tất cả huyện / thị xã" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả huyện / thị xã (cũ)</SelectItem>
              {DISTRICTS.map((d) => (
                <SelectItem key={d} value={d}>{districtLabel(d)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Số lượng kết quả & Bản đồ */}
        <div className="mt-4 flex items-center justify-between">
          <p className="font-serif text-sm font-semibold text-[#854d0e]">
            Đang hiển thị: <span className="font-bold text-[#b91c1c]">{filtered.length}</span> / {COMMUNES.length} đơn vị hành chính
          </p>
        </div>

        {/* Bản đồ tương tác có nút zoom */}
        <WardMap className="mt-3" focusSlugs={filteredSlugs} />

        {/* Danh sách thẻ đơn vị */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              to={`/don-vi/${c.slug}`}
              className="group relative flex flex-col justify-between rounded-xl border-2 border-[#e2d9c2] bg-white p-5 font-serif shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b91c1c] hover:shadow-xl"
            >
              <FlagBadge className="absolute right-3.5 top-3.5 transition-transform group-hover:scale-110" />
              <div>
                <span className="inline-block rounded-full bg-[#b91c1c] px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  {c.type}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#1e293b] group-hover:text-[#b91c1c] transition-colors">
                  <CommuneName name={c.name} />
                </h2>
                <p className="font-sans text-xs font-semibold text-[#854d0e] mt-0.5">
                  Thuộc {districtLabel(c.district)}
                </p>
                <ul className="mt-4 space-y-1.5 font-sans text-xs sm:text-sm text-[#475569]">
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-[#b91c1c] shrink-0" />
                    <span>Diện tích: <b className="text-[#1e293b]">{String(c.areaKm2 || 0).replace(".", ",")}</b> km²</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="size-4 text-[#b91c1c] shrink-0" />
                    <span>Dân số: <b className="text-[#1e293b]">{formatNumber(c.population || 0)}</b> người</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Landmark className="size-4 text-[#b91c1c] shrink-0" />
                    <span>Sáp nhập từ: <b className="text-[#1e293b]">{c.oldUnits?.length || 0}</b> đơn vị cũ</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-[#e2e8f0] flex items-center justify-between text-xs font-sans font-bold text-[#b91c1c] group-hover:translate-x-0.5 transition-transform">
                <span>Xem chi tiết & bản đồ</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
