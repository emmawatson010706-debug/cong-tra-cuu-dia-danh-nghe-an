import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Gauge, Layers, MapPin, Trophy, Users, BookOpen } from "lucide-react";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import FlagBadge from "@/components/flag-badge.tsx";
import WardMap from "@/components/ward-map.tsx";
import CommuneName from "@/components/commune-name.tsx";
import { COMMUNES, formatNumber, districtLabel } from "@/data/communes.ts";
import { ARTICLES } from "@/data/articles.ts";
import { ARTICLES_2 } from "@/data/articles-2.ts";
import { ARTICLES_3 } from "@/data/articles-3.ts";
import { ARTICLES_4 } from "@/data/articles-4.ts";

export default function CommunePage() {
  const { slug } = useParams();
  const c = COMMUNES.find((x) => x.slug === slug);
  const sections = slug ? (ARTICLES[slug] ?? ARTICLES_2[slug] ?? ARTICLES_3[slug] ?? ARTICLES_4[slug]) : undefined;

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

  const density = Math.round(c.population / c.areaKm2);
  const stats = [
    { icon: MapPin, value: String(c.areaKm2).replace(".", ","), label: "km² diện tích tự nhiên" },
    { icon: Users, value: formatNumber(c.population), label: "người quy mô dân số" },
    { icon: Layers, value: String(c.oldUnits.length), label: "đơn vị cơ sở hợp thành" },
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
            <ArrowLeft className="size-4" /> Về trang tra cứu
          </Link>
          <span className="rounded-full bg-[#b91c1c] px-3.5 py-0.5 font-sans text-xs font-bold text-white shadow-xs">
            {c.type}
          </span>
        </div>

        {/* Tiêu đề trang chi tiết */}
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold font-serif text-[#991b1b]">
          <CommuneName name={c.name} />
        </h1>
        <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-[#854d0e]">
          Thuộc địa bàn {districtLabel(c.district)}
        </p>

        {/* Khung tổng quan */}
        <div className="relative mt-6 rounded-xl border-2 border-[#d97706]/40 bg-white p-5 sm:p-6 shadow-sm">
          <FlagBadge className="absolute right-4 top-4" />
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#854d0e]">
            Thông tin hành chính tổng quan
          </p>
          <p className="mt-3 font-serif text-base leading-relaxed text-[#334155]">
            <b className="text-[#991b1b]">{c.name}</b> là một {c.type.toLowerCase()} thuộc tỉnh Nghệ An, được thành lập và sắp xếp năm 2025 theo Nghị quyết số 1678/NQ-UBTVQH15 trên cơ sở sáp nhập toàn bộ diện tích và dân số của <b>{c.oldUnits.length}</b> đơn vị hành chính cũ gồm: <span className="font-medium text-[#1e293b]">{c.oldUnits.join(", ")}</span>.
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-[#334155]">
            Đơn vị có diện tích tự nhiên là <b>{String(c.areaKm2).replace(".", ",")} km²</b>, dân số <b>{formatNumber(c.population)} người</b>, mật độ dân số đạt xấp xỉ <b>{formatNumber(density)} người/km²</b>.
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
              {c.oldUnits.join(" · ")}
            </p>
          </div>
        </div>

        {/* Các bài viết chi tiết */}
        <div className="mt-10 space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-[#b91c1c]/20 pb-3">
            <BookOpen className="size-5 text-[#b91c1c]" />
            <h2 className="text-2xl font-bold font-serif text-[#991b1b]">
              Lịch sử, Địa lý & Điểm nổi bật
            </h2>
          </div>

          {sections && sections.length > 0 ? (
            sections.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm hover:border-[#d97706] transition-all"
              >
                <h3 className="font-serif text-lg font-bold text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">
                  {s.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm sm:text-base leading-relaxed text-[#334155]">
                  {s.body}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-[#d97706] bg-[#fffbeb] p-6 text-center text-sm font-sans text-[#854d0e]">
              Bài viết chuyên sâu cho đơn vị này đang được hoàn thiện cập nhật theo tư liệu lịch sử địa phương.
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
