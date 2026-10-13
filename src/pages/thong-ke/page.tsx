import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import {
  BookOpen,
  Landmark,
  Compass,
  Users,
  TrendingUp,
  Sparkles,
  MapPin,
  ShieldCheck,
  Mountain,
  Award,
  Layers,
  Scale,
  Building2,
  PieChart as PieIcon,
  ArrowUpDown,
  Search,
} from "lucide-react";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import { COMMUNES, formatNumber, districtLabel, type Commune } from "@/data/communes.ts";
import { STATS, densityOf } from "@/lib/stats.ts";

const RED = "#991b1b";
const GOLD = "#d97706";
const BLUE = "#2563eb";
const GREEN = "#16a34a";

const f1 = (n: number | undefined | null) =>
  typeof n === "number" && !isNaN(n)
    ? n.toLocaleString("vi-VN", { maximumFractionDigits: 1 })
    : "0";
const f0 = (n: number | undefined | null) =>
  typeof n === "number" && !isNaN(n)
    ? n.toLocaleString("vi-VN", { maximumFractionDigits: 0 })
    : "0";
const pct = (n: number | undefined | null) =>
  typeof n === "number" && !isNaN(n)
    ? `${(n * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`
    : "0%";

function Panel({
  title,
  subtitle,
  badge,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border-2 border-[#e2d9c2] bg-white p-5 sm:p-7 shadow-sm hover:border-[#d97706]/60 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1e8d0] pb-3.5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#991b1b]">
              <Icon className="size-4.5" />
            </span>
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#991b1b]">
              {title}
            </h2>
            {subtitle && (
              <p className="font-sans text-xs sm:text-sm text-[#64748b] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {badge && (
          <span className="self-start sm:self-auto rounded-full bg-[#fef3c7] px-3 py-0.5 font-sans text-xs font-bold text-[#92400e] border border-[#d97706]/30">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Kpi({
  label,
  value,
  unit,
  subtext,
  icon: Icon,
}: {
  label: string;
  value: string;
  unit: string;
  subtext?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border-2 border-[#e2d9c2] bg-gradient-to-b from-white to-[#fffdfa] p-4 text-center shadow-xs hover:border-[#b91c1c] hover:shadow-md transition-all">
      {Icon && (
        <div className="mx-auto mb-1.5 flex size-8 items-center justify-center rounded-full bg-[#fef2f2] text-[#991b1b]">
          <Icon className="size-4" />
        </div>
      )}
      <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#991b1b]">
        {value}
      </p>
      <p className="font-sans text-xs font-bold text-[#854d0e] mt-0.5">{unit}</p>
      <p className="mt-1 font-sans text-xs font-semibold text-[#1e293b] leading-tight">
        {label}
      </p>
      {subtext && (
        <p className="mt-1 text-[10.5px] font-sans text-[#64748b]">{subtext}</p>
      )}
    </div>
  );
}

function RankingTable({
  title,
  rows,
  valueHeader,
  valueFn,
}: {
  title: string;
  rows: Commune[];
  valueHeader: string;
  valueFn: (c: Commune) => string;
}) {
  return (
    <div className="rounded-xl border border-[#f1e8d0] bg-[#fffdfa] p-4 shadow-2xs">
      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#854d0e] border-b border-[#f1e8d0] pb-2">
        {title}
      </h3>
      <table className="mt-2.5 w-full font-sans text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-[#e2e8f0] text-left text-xs text-[#64748b]">
            <th className="pb-1.5 w-7">#</th>
            <th className="pb-1.5">Đơn vị</th>
            <th className="pb-1.5">Địa bàn</th>
            <th className="pb-1.5 text-right">{valueHeader}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {(rows || []).map((c, i) => (
            <tr key={c.slug} className="hover:bg-[#fef9c3]/30 transition-colors">
              <td className="py-2 font-bold text-[#991b1b]">{i + 1}</td>
              <td className="py-2 font-semibold text-[#1e293b]">
                <a
                  href={`/don-vi/${c.slug}`}
                  className="hover:text-[#991b1b] hover:underline"
                >
                  {c.name}
                </a>
              </td>
              <td className="py-2 text-[#64748b]">{c.district}</td>
              <td className="py-2 text-right font-bold text-[#b45309]">
                {valueFn(c)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StatsPage() {
  const s = STATS;

  // Tính toán dữ liệu thống kê tổng hợp
  const totalOldUnits = COMMUNES.reduce(
    (acc, c) => acc + (c.oldUnits?.length || 0),
    0
  );
  const overallDensity = s.totalArea > 0 ? s.totalPop / s.totalArea : 0;
  const avgArea = s.n > 0 ? s.totalArea / s.n : 0;
  const avgPop = s.n > 0 ? s.totalPop / s.n : 0;

  // Biểu đồ theo địa bàn huyện
  const districtChart = (s.byDistrict || []).map((d) => ({
    name: districtLabel(d.name).replace(" (cũ)", ""),
    count: d.count,
    pop: Math.round(d.population / 1000),
    area: Math.round(d.area),
  }));

  // 1. Phân tầng mật độ dân cư (Density Distribution)
  const densityBrackets = [
    {
      label: "Đô thị nén cao (≥2.000 ng/km²)",
      count: COMMUNES.filter((x) => x.population / x.areaKm2 >= 2000).length,
      desc: "Lõi TP Vinh, Phường Cửa Lò",
      color: "#991b1b",
    },
    {
      label: "Đồng bằng tập trung (1.000–1.999)",
      count: COMMUNES.filter(
        (x) =>
          x.population / x.areaKm2 >= 1000 && x.population / x.areaKm2 < 2000
      ).length,
      desc: "Ven biển Diễn Châu, Quỳnh Lưu, Hoàng Mai",
      color: "#d97706",
    },
    {
      label: "Trung du & Bán sơn địa (300–999)",
      count: COMMUNES.filter(
        (x) =>
          x.population / x.areaKm2 >= 300 && x.population / x.areaKm2 < 1000
      ).length,
      desc: "Yên Thành, Đô Lương, Nam Đàn, Thanh Chương",
      color: "#2563eb",
    },
    {
      label: "Miền núi cao & Biên giới (<300)",
      count: COMMUNES.filter((x) => x.population / x.areaKm2 < 300).length,
      desc: "Quế Phong, Tương Dương, Kỳ Sơn, Con Cuông",
      color: "#16a34a",
    },
  ];

  // 2. Thống kê mức độ tinh gọn sáp nhập (số xã cũ hợp thành)
  const mergerBrackets = [
    {
      label: "1 đơn vị (Nguyên trạng)",
      count: COMMUNES.filter((x) => (x.oldUnits?.length || 0) <= 1).length,
      desc: "Giữ nguyên quy mô",
      color: "#64748b",
    },
    {
      label: "2 đơn vị cũ sáp nhập",
      count: COMMUNES.filter((x) => (x.oldUnits?.length || 0) === 2).length,
      desc: "Hợp nhất 2 xã",
      color: "#2563eb",
    },
    {
      label: "3 – 4 đơn vị cũ sáp nhập",
      count: COMMUNES.filter(
        (x) =>
          (x.oldUnits?.length || 0) >= 3 && (x.oldUnits?.length || 0) <= 4
      ).length,
      desc: "Hợp nhất 3-4 xã (Phổ biến nhất)",
      color: "#d97706",
    },
    {
      label: "≥ 5 đơn vị cũ (Đại sáp nhập)",
      count: COMMUNES.filter((x) => (x.oldUnits?.length || 0) >= 5).length,
      desc: "Hợp nhất từ 5 xã, thị trấn trở lên",
      color: "#991b1b",
    },
  ];

  // 3. Ba tiểu vùng sinh thái Nghệ An (Góc nhìn Sử học & Địa lý kinh tế)
  const subregions = [
    {
      name: "Tiểu vùng Đô thị & Duyên hải",
      districts: "TP Vinh, Cửa Lò, Hoàng Mai, Diễn Châu, Quỳnh Lưu, Nghi Lộc",
      count: 31,
      pop: 1575326,
      area: 1398.6,
      density: 1126,
      popShare: 41.1,
      areaShare: 8.5,
      features:
        "Trung tâm động lực kinh tế biển, cảng biển nước sâu, logistics, khu công nghiệp và đô thị dịch vụ sầm uất.",
      color: "#991b1b",
    },
    {
      name: "Tiểu vùng Đồng bằng & Trung du sông Lam",
      districts: "Yên Thành, Đô Lương, Nam Đàn, Hưng Nguyên, Thanh Chương",
      count: 33,
      pop: 1182632,
      area: 2481.0,
      density: 477,
      popShare: 30.9,
      areaShare: 15.0,
      features:
        "Cái nôi văn hóa lúa nước, vựa lương thực, làng nghề truyền thống và truyền thống hiếu học ngàn đời.",
      color: "#d97706",
    },
    {
      name: "Tiểu vùng Miền Tây đại ngàn & Biên giới",
      districts:
        "Thái Hòa, Nghĩa Đàn, Tân Kỳ, Anh Sơn, Con Cuông, Quỳ Hợp, Quỳ Châu, Quế Phong, Tương Dương, Kỳ Sơn",
      count: 66,
      pop: 1073736,
      area: 12606.9,
      density: 85,
      popShare: 28.0,
      areaShare: 76.5,
      features:
        "Khu dự trữ sinh quyển thế giới Pù Mát, rừng phòng hộ đầu nguồn, kinh tế cây công nghiệp cao nguyên và văn hóa các dân tộc anh em.",
      color: "#16a34a",
    },
  ];

  // Top 5 đơn vị hợp nhất nhiều xã cũ nhất (Tinh gọn mạnh mẽ nhất)
  const topMergedCommunes = [...COMMUNES]
    .sort((a, b) => (b.oldUnits?.length || 0) - (a.oldUnits?.length || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1e293b]">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Tiêu đề trang trọng mang tầm vóc Địa Chí & Dữ Liệu */}
        <header className="text-center font-serif">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d97706]/40 bg-[#fef3c7] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#92400e]">
            <Scale className="size-3.5 text-[#b45309]" />
            Chuyên Khảo Địa Chí Học & Thống Kê Học Ứng Dụng
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-[#991b1b]">
            Địa Chí & Dữ Liệu Nghệ An
          </h1>
          <p className="mx-auto mt-2.5 max-w-3xl font-sans text-sm sm:text-base text-[#475569] leading-relaxed">
            Hệ thống cơ sở dữ liệu số hóa toàn diện 130 đơn vị hành chính xã,
            phường sau sắp xếp (Nghị quyết 1678/NQ-UBTVQH15) kết hợp nghiên cứu
            chuyên khảo địa lý, lịch sử và văn hóa xứ Nghệ.
          </p>
        </header>

        {/* 6 CHỈ SỐ VĨ MÔ CỐT LÕI (MACRO KPI DASHBOARD) */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Kpi
            icon={Users}
            label="Tổng quy mô dân số"
            value={f0(s.totalPop)}
            unit="người"
            subtext="Toàn tỉnh Nghệ An"
          />
          <Kpi
            icon={MapPin}
            label="Tổng diện tích tự nhiên"
            value={f1(s.totalArea)}
            unit="km²"
            subtext="Rộng lớn bậc nhất cả nước"
          />
          <Kpi
            icon={Compass}
            label="Mật độ trung bình"
            value={f0(overallDensity)}
            unit="người/km²"
            subtext="Chênh lệch lớn giữa các vùng"
          />
          <Kpi
            icon={Building2}
            label="Đơn vị sau sáp nhập"
            value={String(s.n)}
            unit="xã, phường"
            subtext="18 phường & 112 xã"
          />
          <Kpi
            icon={Layers}
            label="Đơn vị cũ hợp thành"
            value={String(totalOldUnits)}
            unit="xã/phường cũ"
            subtext="Giảm 282 đầu mối (68,4%)"
          />
          <Kpi
            icon={TrendingUp}
            label="Tỷ lệ đô thị hóa"
            value="13,8%"
            unit="đô thị cơ sở"
            subtext="18 phường đô thị loại I-IV"
          />
        </div>

        {/* BÀI VIẾT CHUYÊN KHẢO TOÀN DIỆN VỀ ĐỊA LÝ, LỊCH SỬ, VĂN HÓA & CON NGƯỜI XỨ NGHỆ (GIỮ NGUYÊN BÀI HAY) */}
        <section className="mt-10 rounded-2xl border-2 border-[#b8860b]/40 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#991b1b]/20 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#991b1b] text-white shadow-sm">
                <BookOpen className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#991b1b]">
                  Khái Lược Địa Chí Xứ Nghệ
                </h2>
                <p className="font-sans text-xs sm:text-sm font-semibold text-[#854d0e]">
                  Trầm tích nghìn năm văn hiến · Non nước hữu tình · Con người kiên
                  trung bất khuất
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-[#fef3c7] px-3.5 py-1 text-xs font-bold text-[#92400e] border border-[#d97706]/30">
              <ShieldCheck className="size-3.5 text-[#b45309]" />
              Chuyên khảo địa phương học
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* 1. Không gian địa lý & Non nước */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Mountain className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">
                  1. Không Gian Địa Lý & Non Nước Hữu Tình
                </h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Nghệ An là địa phương có diện tích tự nhiên rộng lớn bậc nhất cả
                nước (xấp xỉ 16.490 km²), nằm ở trung tâm vùng Bắc Trung Bộ, địa
                thế trải dài từ đỉnh núi Puxailaileng (2.720 m) của dải Trường
                Sơn Bắc đến 82 km bờ Biển Đông bao la. Vùng đất được thiên nhiên
                kiến tạo đa dạng với ba vùng sinh thái đặc trưng: Miền Tây rộng
                lớn (chiếm 83% diện tích) được UNESCO công nhận là Khu dự trữ
                sinh quyển thế giới với Vườn quốc gia Pù Mát; dải đồng bằng châu
                thổ màu mỡ được bồi đắp bởi dòng sông Lam (sông Cả) ngàn năm soi
                bóng núi Hồng, cùng dải duyên hải với những cửa biển danh tiếng
                như Cửa Lò, Cửa Hội, Lạch Cờn, Lạch Vạn, Lạch Quèn.
              </p>
            </div>

            {/* 2. Trầm tích lịch sử & Phên dậu non sông */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Landmark className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">
                  2. Trầm Tích Lịch Sử & Vị Thế Phên Dậu Hiểm Yếu
                </h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Trải qua hàng vạn năm lịch sử kể từ di chỉ người vượn cổ Thẩm Ồm
                (Quỳ Châu), văn hóa Quỳnh Văn đến văn minh đồ đồng Làng Vạc (Thái
                Hòa), Nghệ An luôn giữ vị trí "phên dậu hiểm yếu" của Tổ quốc. Nơi
                đây từng chứng kiến Vua Mai Hắc Đế dựng cờ khởi nghĩa Vạn An (năm
                722) đánh đuổi quân đô hộ nhà Đường; nơi nghĩa quân Lam Sơn của Lê
                Lợi chọn làm bàn đạp chiến lược "Trận Bồ Đằng sấm vang chớp giật /
                Miền Trà Lân trúc chẻ tro bay" để tiến ra giải phóng đất nước; và
                là nơi Hoàng đế Quang Trung định đô Phượng Hoàng Trung Đô (1788).
                Trong thời đại Hồ Chí Minh, mảnh đất này là cái nôi của phong
                trào Xô viết Nghệ Tĩnh 1930 - 1931 bất khuất.
              </p>
            </div>

            {/* 3. Mạch nguồn khoa bảng & Địa linh nhân kiệt */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Award className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">
                  3. Mạch Nguồn Khoa Bảng & Địa Linh Nhân Kiệt
                </h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Xứ Nghệ từ ngàn đời nổi tiếng là đất học, đất văn chương với
                truyền thống "học để làm người, học để giúp đời". Những làng khoa
                bảng lừng lẫy như Quỳnh Đôi ("Bắc Hà Hành Thiện, Hoan Diễn Quỳnh
                Đôi"), Kim Liên, Trung Cần... đã sản sinh cho đất nước hàng trăm
                bậc đại khoa, bảng nhãn, thám hoa. Nơi đây là quê hương của Chủ
                tịch Hồ Chí Minh - Anh hùng giải phóng dân tộc, Danh nhân văn hóa
                kiệt xuất; Nhà chí sĩ yêu nước Phan Bội Châu; Tổng Bí thư Lê Hồng
                Phong; Nhà cách mạng Nguyễn Thị Minh Khai... Cùng với đó là kho
                tàng Dân ca Ví, Giặm Nghệ Tĩnh được UNESCO vinh danh là Di sản
                văn hóa phi vật thể đại diện của nhân loại.
              </p>
            </div>

            {/* 4. Cốt cách & Phẩm chất con người xứ Nghệ */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Users className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">
                  4. Cốt Cách & Phẩm Chất Con Người Xứ Nghệ
                </h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Được tôi luyện qua điều kiện tự nhiên khắc nghiệt của gió Lào cát
                trắng và bão lũ miền Trung, người dân xứ Nghệ hun đúc nên cốt
                cách thẳng thắn, khảng khái, chuộng khí tiết, trọng nghĩa khinh
                tài và giàu lòng nhân ái. Nổi bật nhất là đức tính cần cù, nhẫn
                nại, kiên trì vượt khó trong lao động và tinh thần hiếu học phi
                thường. Dù trong hoàn cảnh nào, con người xứ Nghệ luôn giữ vững
                phẩm giá, tình nghĩa thủy chung son sắt và ý chí kiên định cống
                hiến hết mình cho sự trường tồn và phát triển của quê hương, đất
                nước.
              </p>
            </div>
          </div>

          {/* 5. Khát vọng thời đại mới */}
          <div className="mt-6 rounded-xl border border-[#d97706]/40 bg-gradient-to-r from-[#fffbeb] via-[#fefce8] to-[#fffbeb] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-[#991b1b]">
              <TrendingUp className="size-5 shrink-0" />
              <h3 className="font-serif text-lg font-bold">
                5. Khát Vọng Đổi Mới & Tầm Nhìn Phát Triển Tương Lai
              </h3>
            </div>
            <p className="mt-2.5 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              Bước vào kỷ nguyên mới, thực hiện Nghị quyết số 39-NQ/TW của Bộ
              Chính trị về xây dựng và phát triển tỉnh Nghệ An đến năm 2030, tầm
              nhìn đến năm 2045, cùng việc hoàn thành thắng lợi việc sắp xếp 130
              đơn vị hành chính cấp xã theo Nghị quyết số 1678/NQ-UBTVQH15, Nghệ
              An đang vươn mình mạnh mẽ thành trung tâm kinh tế - văn hóa của
              vùng Bắc Trung Bộ. Tỉnh liên tục lọt vào nhóm dẫn đầu cả nước về
              thu hút vốn đầu tư trực tiếp nước ngoài (FDI), đẩy mạnh phát triển
              các khu công nghiệp công nghệ cao (VSIP, WHA, Hoàng Mai), mở rộng
              mạng lưới giao thông cao tốc Bắc Nam, phát triển cảng biển nước sâu
              Cửa Lò và Cảng hàng không quốc tế Vinh, hướng tới một Nghệ An giàu
              mạnh, văn minh, hiện đại và đậm đà bản sắc.
            </p>
          </div>
        </section>

        {/* KHÔNG GIAN ĐỊA LÝ SINH THÁI: 3 TIỂU VÙNG CỐT LÕI XỨ NGHỆ */}
        <div className="mt-10">
          <Panel
            icon={Compass}
            title="Cấu Trúc Không Gian: 3 Tiểu Vùng Địa Lý Sinh Thái Xứ Nghệ"
            subtitle="Phân tích tương quan địa kinh tế giữa Đô thị Duyên hải, Đồng bằng sông Lam và Miền Tây đại ngàn"
            badge="Góc nhìn Địa lý & Sử học"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {subregions.map((reg) => (
                <div
                  key={reg.name}
                  className="rounded-xl border-2 border-[#e2d9c2] bg-[#fffdfa] p-4.5 shadow-xs hover:border-[#b91c1c] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: reg.color }}
                      />
                      <span className="font-sans text-xs font-bold text-[#b45309]">
                        {reg.count} xã/phường ({pct(reg.count / 130)})
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-base font-bold text-[#991b1b]">
                      {reg.name}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-[#64748b]">
                      <b>Địa bàn:</b> {reg.districts}
                    </p>
                    <p className="mt-2.5 font-sans text-xs text-[#334155] leading-relaxed text-justify">
                      {reg.features}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1e8d0] grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-[#fef2f2] p-2">
                      <p className="font-bold text-[#991b1b]">
                        {f0(reg.pop / 1000)}k người
                      </p>
                      <p className="text-[10.5px] text-[#64748b]">
                        {reg.popShare}% dân số
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#fef3c7] p-2">
                      <p className="font-bold text-[#854d0e]">
                        {f1(reg.area)} km²
                      </p>
                      <p className="text-[10.5px] text-[#64748b]">
                        {reg.areaShare}% diện tích
                      </p>
                    </div>
                    <div className="col-span-2 rounded-lg bg-[#f8fafc] p-1.5 text-center">
                      <span className="text-[#475569]">Mật độ trung bình: </span>
                      <b className="text-[#1e293b]">{formatNumber(reg.density)} ng/km²</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* HỆ THỐNG BIỂU ĐỒ TRỰC QUAN SINH ĐỘNG (RECHARTS) */}
        <div className="mt-8 space-y-8">
          {/* Biểu đồ 1: Phân bổ số lượng đơn vị theo địa bàn cấp huyện */}
          <Panel
            icon={Building2}
            title="Quy Mô Phân Bổ Theo 21 Địa Bàn Huyện / Thị / Thành (Cũ)"
            subtitle="Số lượng xã, phường mới sau sắp xếp trên từng địa bàn huyện lỵ tiền thân"
            badge="Thống kê định lượng"
          >
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={districtChart}
                margin={{ left: -10, right: 8, bottom: 65 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 10.5, fill: "#475569" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#475569" }}
                />
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${val} đơn vị`,
                    "Số xã/phường mới",
                  ]}
                />
                <Bar
                  dataKey="count"
                  name="Số đơn vị xã/phường"
                  fill={RED}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* Lưới 2 biểu đồ: Phân tầng Mật độ & Phân bố Mức độ Sáp nhập */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Biểu đồ 2: Phân tầng mật độ dân cư */}
            <Panel
              icon={TrendingUp}
              title="Phân Tầng Mật Độ Dân Cư (4 Phân Khúc)"
              subtitle="Cơ cấu phân bổ 130 đơn vị hành chính theo độ nén dân số"
            >
              <div className="space-y-4">
                {densityBrackets.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs sm:text-sm font-semibold">
                      <span className="text-[#1e293b]">{b.label}</span>
                      <span className="text-[#991b1b] font-bold">
                        {b.count} đơn vị ({pct(b.count / 130)})
                      </span>
                    </div>
                    <div className="mt-1 h-3 overflow-hidden rounded-full bg-[#f1f5f9]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(b.count / 130) * 100}%`,
                          backgroundColor: b.color,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-[#64748b]">{b.desc}</p>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Biểu đồ 3: Mức độ tinh gọn sáp nhập */}
            <Panel
              icon={Layers}
              title="Mức Độ Tinh Gọn: Số Xã Cũ Hợp Thành"
              subtitle="Quy mô hợp nhất từ 1 đến 8 đơn vị cũ theo Nghị quyết 1678"
            >
              <div className="space-y-4">
                {mergerBrackets.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs sm:text-sm font-semibold">
                      <span className="text-[#1e293b]">{m.label}</span>
                      <span className="text-[#b45309] font-bold">
                        {m.count} đơn vị ({pct(m.count / 130)})
                      </span>
                    </div>
                    <div className="mt-1 h-3 overflow-hidden rounded-full bg-[#f1f5f9]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(m.count / 130) * 100}%`,
                          backgroundColor: m.color,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-[#64748b]">{m.desc}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* BẢNG XẾP HẠNG CỰC TRỊ ĐỊA GIỚI & NHỮNG ĐƠN VỊ ĐẠI SÁP NHẬP */}
          <Panel
            icon={Award}
            title="Các Bảng Xếp Hạng Kỷ Lục Địa Giới Hành Chính"
            subtitle="Top đầu và Top cuối về diện tích tự nhiên, quy mô dân số và mật độ dân cư"
            badge="Bảng số liệu xếp hạng"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <RankingTable
                title="Top 5 Đơn vị có diện tích lớn nhất"
                rows={s.topArea?.slice(0, 5) || []}
                valueHeader="Diện tích"
                valueFn={(c) => `${f1(c.areaKm2)} km²`}
              />
              <RankingTable
                title="Top 5 Đơn vị có dân số đông nhất"
                rows={s.topPop?.slice(0, 5) || []}
                valueHeader="Dân số"
                valueFn={(c) => `${formatNumber(c.population)} người`}
              />
            </div>

            <div className="mt-6 pt-6 border-t border-[#e2e8f0] grid gap-6 md:grid-cols-2">
              <RankingTable
                title="Top 5 Đơn vị có mật độ dân số cao nhất"
                rows={s.topDensity?.slice(0, 5) || []}
                valueHeader="Mật độ"
                valueFn={(c) => `${formatNumber(densityOf(c))} ng/km²`}
              />
              <RankingTable
                title="Top 5 Đơn vị có diện tích nhỏ nhất"
                rows={s.bottomArea?.slice(0, 5) || []}
                valueHeader="Diện tích"
                valueFn={(c) => `${f1(c.areaKm2)} km²`}
              />
            </div>

            {/* Top đơn vị đại sáp nhập nhiều xã cũ nhất */}
            <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
              <RankingTable
                title="Top Đơn vị sáp nhập nhiều xã/phường cũ nhất (Tinh gọn mạnh mẽ nhất)"
                rows={topMergedCommunes}
                valueHeader="Số đơn vị cũ"
                valueFn={(c) => `${c.oldUnits?.length || 0} xã/phường cũ hợp thành`}
              />
            </div>
          </Panel>

          {/* NHẬN ĐỊNH SỬ HỌC & THỐNG KÊ HỌC TỔNG KẾT */}
          <div className="rounded-2xl border-2 border-[#b8860b] bg-gradient-to-r from-[#fefce8] via-[#fffbeb] to-[#fef9c3] p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-6 text-[#991b1b] shrink-0" />
              <h3 className="font-serif text-xl font-bold text-[#991b1b]">
                Tổng Kết Lịch Sử & Thể Chế Hành Chính
              </h3>
            </div>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              Đợt sắp xếp đơn vị hành chính năm 2025 theo Nghị quyết số
              1678/NQ-UBTVQH15 là cuộc cải cách tổ chức bộ máy cơ sở có quy mô
              lớn nhất trong lịch sử hiện đại của tỉnh Nghệ An. Từ 412 xã,
              phường, thị trấn trước đây được tinh gọn xuống còn 130 đơn vị (giảm
              hơn 68% số lượng đầu mối hành chính). Diện tích bình quân mỗi đơn
              vị tăng lên mức xấp xỉ 126,8 km² và quy mô dân số bình quân đạt gần
              29.500 người/xã.
            </p>
            <p className="mt-2.5 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              Sự điều chỉnh này vừa tôn trọng lịch sử hình thành lâu đời của các
              làng xã cổ truyền xứ Nghệ, vừa khắc phục triệt để tình trạng chia
              cắt manh mún, tạo nên các chỉnh thể không gian kinh tế - xã hội liên
              hoàn, vững chắc, đáp ứng yêu cầu công nghiệp hóa, hiện đại hóa và
              phát triển bền vững của quê hương trong kỷ nguyên mới.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
