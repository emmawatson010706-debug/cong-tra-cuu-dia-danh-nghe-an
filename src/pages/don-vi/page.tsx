import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Gauge,
  Layers,
  MapPin,
  Trophy,
  Users,
  BookOpen,
  Landmark,
  Compass,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Target,
} from "lucide-react";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import FlagBadge from "@/components/flag-badge.tsx";
import WardMap from "@/components/ward-map.tsx";
import CommuneName from "@/components/commune-name.tsx";
import { COMMUNES, formatNumber, districtLabel } from "@/data/communes.ts";
import { getCommuneKnowledge } from "@/lib/commune-knowledge.ts";

export default function CommunePage() {
  const { slug } = useParams();
  const c = COMMUNES.find((x) => x.slug === slug);

  if (!c) {
    return (
      <div className="min-h-screen bg-[#fcfaf5]">
        <SiteHeader />
        <div className="py-24 text-center font-serif">
          <p className="text-xl font-bold text-[#991b1b]">Không tìm thấy đơn vị hành chính yêu cầu.</p>
          <Link to="/" className="mt-4 inline-block font-sans text-sm font-semibold text-[#b91c1c] underline hover:text-[#7f1d1d]">
            ← Về trang chủ tra cứu
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const profile = getCommuneKnowledge(c);
  const oldUnits = c.oldUnits || [];
  const area = c.areaKm2 || 1;
  const population = c.population || 0;
  const density = Math.round(population / area);

  const stats = [
    { icon: MapPin, value: String(c.areaKm2 || 0).replace(".", ","), label: "km² diện tích tự nhiên" },
    { icon: Users, value: formatNumber(population), label: "người quy mô dân số" },
    { icon: Layers, value: String(oldUnits.length), label: "đơn vị cơ sở hợp thành" },
    { icon: Gauge, value: formatNumber(density), label: "người/km² mật độ dân số" },
    { icon: Trophy, value: `#${c.areaRank || 1}`, label: "Xếp hạng diện tích / 130" },
    { icon: Trophy, value: `#${c.populationRank || 1}`, label: "Xếp hạng dân số / 130" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1e293b]">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        {/* Nút quay lại & Loại hình */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#854d0e] hover:text-[#991b1b] transition-colors"
          >
            <ArrowLeft className="size-4" /> Về trang tra cứu Nghệ An
          </Link>
          <span className="rounded-full bg-[#b91c1c] px-3.5 py-0.5 font-sans text-xs font-bold text-white shadow-xs">
            {c.type}
          </span>
        </div>

        {/* Tiêu đề trang chi tiết */}
        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold font-serif text-[#991b1b]">
          <CommuneName name={c.name} />
        </h1>
        <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-[#854d0e]">
          Thuộc địa bàn {districtLabel(c.district)} · Tỉnh Nghệ An
        </p>

        {/* Khung tổng quan hành chính */}
        <div className="relative mt-6 rounded-xl border-2 border-[#d97706]/40 bg-white p-5 sm:p-6 shadow-sm">
          <FlagBadge className="absolute right-4 top-4" />
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#854d0e]">
            Thông tin hành chính tổng quan
          </p>
          <p className="mt-3 font-serif text-base leading-relaxed text-[#334155] text-justify">
            <b className="text-[#991b1b]">{c.name}</b> là một {c.type?.toLowerCase() || "đơn vị"} thuộc tỉnh Nghệ An, được thành lập và sắp xếp năm 2025 theo Nghị quyết số 1678/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội trên cơ sở sáp nhập toàn bộ diện tích và dân số của <b>{oldUnits.length}</b> đơn vị hành chính cũ gồm: <span className="font-medium text-[#1e293b]">{oldUnits.join(", ")}</span>.
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-[#334155] text-justify">
            Đơn vị có diện tích tự nhiên là <b>{String(c.areaKm2 || 0).replace(".", ",")} km²</b>, dân số <b>{formatNumber(population)} người</b>, mật độ dân số đạt xấp xỉ <b>{formatNumber(density)} người/km²</b>.
          </p>
        </div>

        {/* Bản đồ vị trí địa giới */}
        <div className="mt-6">
          <WardMap focusSlugs={[c.slug]} selectedSlug={c.slug} />
        </div>

        {/* Lưới chỉ số thống kê */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[#e2d9c2] bg-white px-3 py-4 text-center shadow-xs hover:border-[#b91c1c] transition-all"
            >
              <s.icon className="mx-auto size-5 text-[#b91c1c]" />
              <p className="mt-1 text-2xl font-extrabold font-serif text-[#991b1b]">{s.value}</p>
              <p className="font-sans text-xs font-medium text-[#64748b]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Các đơn vị cũ hợp thành */}
        <div className="mt-6 flex items-start gap-3.5 rounded-xl border border-[#d97706]/30 bg-[#fffdf5] p-5 shadow-xs">
          <Building2 className="size-6 text-[#b91c1c] shrink-0 mt-0.5" />
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#854d0e]">
              Các xã, phường cũ trước sắp xếp
            </p>
            <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-[#1e293b] leading-relaxed">
              {oldUnits.join(" · ")}
            </p>
          </div>
        </div>

        {/* Hộp Cổng Thông Tin Điện Tử Địa Phương Chính Thống (Theo đúng yêu cầu của người dùng) */}
        <div className="mt-6 rounded-xl border-2 border-[#b8860b] bg-gradient-to-r from-[#fefce8] via-[#fffbeb] to-[#fef9c3] p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#b91c1c] shrink-0" />
                <h3 className="font-serif text-lg font-bold text-[#991b1b]">
                  Cổng Thông Tin Điện Tử {c.name}
                </h3>
              </div>
              <p className="font-sans text-xs text-[#64748b] leading-relaxed">
                Nguồn tư liệu gốc, văn bản điều hành, thông báo chính quyền và thủ tục hành chính công trực tuyến của địa phương.
              </p>
              <p className="font-mono text-xs font-semibold text-[#854d0e] break-all">
                Đường dẫn chính thức: <u>{profile.officialUrl}</u> hoặc Cổng tỉnh <u>https://nghean.gov.vn/</u>
              </p>
            </div>

            <a
              href={profile.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#991b1b] hover:bg-[#7f1d1d] px-5 py-2.5 font-sans text-xs sm:text-sm font-bold text-white shadow-md transition-all whitespace-nowrap cursor-pointer border border-[#7f1d1d]"
            >
              <span>Truy cập Cổng TTĐT</span>
              <ExternalLink className="size-4 shrink-0 text-white" />
            </a>
          </div>
        </div>

        {/* CÁC CHUYÊN MỤC NỘI DUNG CHUYÊN SÂU LỊCH SỬ - ĐỊA LÝ - KINH TẾ - VĂN HÓA - DU LỊCH */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-[#b91c1c]/20 pb-3">
            <BookOpen className="size-5 text-[#b91c1c]" />
            <h2 className="text-2xl font-bold font-serif text-[#991b1b]">
              Chuyên Khảo Lịch Sử, Địa Lý & Văn Hóa Xã Hội
            </h2>
          </div>

          {/* 1. Lịch sử & Nguồn gốc */}
          <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all">
            <div className="flex items-center gap-2.5">
              <Landmark className="size-5 text-[#b91c1c] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                Lịch Sử Hình Thành & Truyền Thống Đấu Tranh
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              {profile.history}
            </p>
          </section>

          {/* 2. Địa lý, Địa hình & Không gian lãnh thổ */}
          <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all">
            <div className="flex items-center gap-2.5">
              <Compass className="size-5 text-[#b91c1c] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                Vị Trí Địa Lý, Địa Hình & Không Gian Lãnh Thổ
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              {profile.geography}
            </p>
          </section>

          {/* 3. Kinh tế, Xã hội & Hạ tầng */}
          <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="size-5 text-[#b91c1c] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                Kinh Tế - Xã Hội & Hạ Tầng Giao Thông
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              {profile.economy}
            </p>
          </section>

          {/* 4. Văn hóa, Di tích & Điểm du lịch nổi tiếng */}
          <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all">
            <div className="flex items-center gap-2.5">
              <Sparkles className="size-5 text-[#b91c1c] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                Văn Hóa, Di Tích Lịch Sử & Thắng Cảnh Du Lịch
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              {profile.cultureTourism}
            </p>
          </section>

          {/* 5. Tầm nhìn phát triển sau sắp xếp 2025 */}
          <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all">
            <div className="flex items-center gap-2.5">
              <Target className="size-5 text-[#b91c1c] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                Định Hướng Phát Triển Sau Sắp Xếp Năm 2025
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              {profile.vision}
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
