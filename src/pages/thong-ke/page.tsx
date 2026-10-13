import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BookOpen, Landmark, Compass, Users, TrendingUp, Sparkles, MapPin, ShieldCheck, Mountain, Award } from "lucide-react";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import { formatNumber, districtLabel, type Commune } from "@/data/communes.ts";
import { STATS, densityOf, type Bin, type GroupRow } from "@/lib/stats.ts";

const RED = "#991b1b";
const GOLD = "#d97706";
const f1 = (n: number | undefined | null) => (typeof n === 'number' && !isNaN(n) ? n.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) : "0");
const f0 = (n: number | undefined | null) => (typeof n === 'number' && !isNaN(n) ? n.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) : "0");
const pct = (n: number | undefined | null) => (typeof n === 'number' && !isNaN(n) ? `${(n * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%` : "0%");

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#e2d9c2] bg-white p-5 sm:p-6 shadow-sm">
      <h2 className="text-xl font-bold font-serif text-[#991b1b] border-l-4 border-[#b91c1c] pl-3">{title}</h2>
      {note && <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#64748b]">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Kpi({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-[#e2d9c2] bg-white px-3 py-4 text-center shadow-xs hover:border-[#b91c1c] transition-all">
      <p className="text-2xl font-bold font-serif text-[#991b1b] sm:text-3xl">{value}</p>
      <p className="font-sans text-xs font-semibold text-[#854d0e]">{unit}</p>
      <p className="mt-1 font-sans text-xs font-bold text-[#1e293b]">{label}</p>
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
    <div>
      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#854d0e]">{title}</h3>
      <table className="mt-2 w-full font-sans text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-[#e2e8f0] text-left text-xs text-[#64748b]">
            <th className="pb-1 w-8">#</th>
            <th className="pb-1">Đơn vị</th>
            <th className="pb-1">Huyện/TX (cũ)</th>
            <th className="pb-1 text-right">{valueHeader}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {(rows || []).map((c, i) => (
            <tr key={c.slug} className="hover:bg-[#f8fafc]">
              <td className="py-1.5 font-bold text-[#991b1b]">{i + 1}</td>
              <td className="py-1.5 font-medium text-[#1e293b]">{c.name}</td>
              <td className="py-1.5 text-[#64748b]">{districtLabel(c.district)}</td>
              <td className="py-1.5 text-right font-bold text-[#b45309]">{valueFn(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StatsPage() {
  const s = STATS;
  const districtChart = (s.byDistrict || []).map((d) => ({
    name: districtLabel(d.name),
    count: d.count,
    pop: Math.round(d.population / 1000),
    area: Math.round(d.area),
  }));

  const overallDensity = s.totalArea > 0 ? s.totalPop / s.totalArea : 0;

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1e293b]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <header className="text-center font-serif">
          <span className="inline-block rounded-full border border-[#d97706]/40 bg-[#fef3c7] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#92400e]">
            Báo cáo phân tích chuyên sâu
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-[#991b1b]">
            Thống Kê Toàn Diện Địa Giới Nghệ An
          </h1>
          <p className="mx-auto mt-2 max-w-2xl font-sans text-sm sm:text-base text-[#475569]">
            Phân tích số liệu 130 đơn vị hành chính xã, phường sau sắp xếp theo Nghị quyết 1678/NQ-UBTVQH15.
          </p>
        </header>

        {/* 4 Chỉ số KPI đầu trang */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Kpi label="Tổng quy mô dân số" value={f0(s.totalPop)} unit="người" />
          <Kpi label="Tổng diện tích tự nhiên" value={f1(s.totalArea)} unit="km²" />
          <Kpi label="Mật độ trung bình toàn tỉnh" value={f0(overallDensity)} unit="người/km²" />
          <Kpi label="Chỉ số tập trung Gini dân số" value={f1(s.giniPop)} unit="hệ số (0..1)" />
        </div>

        {/* CHUYÊN KHẢO TOÀN DIỆN VỀ ĐỊA LÝ, LỊCH SỬ, VĂN HÓA & CON NGƯỜI XỨ NGHỆ */}
        <section className="mt-8 rounded-2xl border-2 border-[#b8860b]/40 bg-white p-6 sm:p-8 shadow-sm">
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
                  Trầm tích nghìn năm văn hiến · Non nước hữu tình · Con người kiên trung bất khuất
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
                <h3 className="font-serif text-lg font-bold">1. Không Gian Địa Lý & Non Nước Hữu Tình</h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Nghệ An là địa phương có diện tích tự nhiên rộng lớn bậc nhất cả nước (xấp xỉ 16.490 km²), nằm ở trung tâm vùng Bắc Trung Bộ, địa thế trải dài từ đỉnh núi Puxailaileng (2.720 m) của dải Trường Sơn Bắc đến 82 km bờ Biển Đông bao la. Vùng đất được thiên nhiên kiến tạo đa dạng với ba vùng sinh thái đặc trưng: Miền Tây rộng lớn (chiếm 83% diện tích) được UNESCO công nhận là Khu dự trữ sinh quyển thế giới với Vườn quốc gia Pù Mát; dải đồng bằng châu thổ màu mỡ được bồi đắp bởi dòng sông Lam (sông Cả) ngàn năm soi bóng núi Hồng, cùng dải duyên hải với những cửa biển danh tiếng như Cửa Lò, Cửa Hội, Lạch Cờn, Lạch Vạn, Lạch Quèn.
              </p>
            </div>

            {/* 2. Trầm tích lịch sử & Phên dậu non sông */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Landmark className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">2. Trầm Tích Lịch Sử & Vị Thế Phên Dậu Hiểm Yếu</h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Trải qua hàng vạn năm lịch sử kể từ di chỉ người vượn cổ Thẩm Ồm (Quỳ Châu), văn hóa Quỳnh Văn đến văn minh đồ đồng Làng Vạc (Thái Hòa), Nghệ An luôn giữ vị trí "phên dậu hiểm yếu" của Tổ quốc. Nơi đây từng chứng kiến Vua Mai Hắc Đế dựng cờ khởi nghĩa Vạn An (năm 722) đánh đuổi quân đô hộ nhà Đường; nơi nghĩa quân Lam Sơn của Lê Lợi chọn làm bàn đạp chiến lược "Trận Bồ Đằng sấm vang chớp giật / Miền Trà Lân trúc chẻ tro bay" để tiến ra giải phóng đất nước; và là nơi Hoàng đế Quang Trung định đô Phượng Hoàng Trung Đô (1788). Trong thời đại Hồ Chí Minh, mảnh đất này là cái nôi của phong trào Xô viết Nghệ Tĩnh 1930 - 1931 bất khuất.
              </p>
            </div>

            {/* 3. Mạch nguồn khoa bảng & Địa linh nhân kiệt */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Award className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">3. Mạch Nguồn Khoa Bảng & Địa Linh Nhân Kiệt</h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Xứ Nghệ từ ngàn đời nổi tiếng là đất học, đất văn chương với truyền thống "học để làm người, học để giúp đời". Những làng khoa bảng lừng lẫy như Quỳnh Đôi ("Bắc Hà Hành Thiện, Hoan Diễn Quỳnh Đôi"), Kim Liên, Trung Cần... đã sản sinh cho đất nước hàng trăm bậc đại khoa, bảng nhãn, thám hoa. Nơi đây là quê hương của Chủ tịch Hồ Chí Minh - Anh hùng giải phóng dân tộc, Danh nhân văn hóa kiệt xuất; Nhà chí sĩ yêu nước Phan Bội Châu; Tổng Bí thư Lê Hồng Phong; Nhà cách mạng Nguyễn Thị Minh Khai... Cùng với đó là kho tàng Dân ca Ví, Giặm Nghệ Tĩnh được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại.
              </p>
            </div>

            {/* 4. Cốt cách & Phẩm chất con người xứ Nghệ */}
            <div className="rounded-xl border border-[#e2d9c2] bg-[#fffdfa] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <Users className="size-5 shrink-0" />
                <h3 className="font-serif text-lg font-bold">4. Cốt Cách & Phẩm Chất Con Người Xứ Nghệ</h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#334155] text-justify">
                Được tôi luyện qua điều kiện tự nhiên khắc nghiệt của gió Lào cát trắng và bão lũ miền Trung, người dân xứ Nghệ hun đúc nên cốt cách thẳng thắn, khảng khái, chuộng khí tiết, trọng nghĩa khinh tài và giàu lòng nhân ái. Nổi bật nhất là đức tính cần cù, nhẫn nại, kiên trì vượt khó trong lao động và tinh thần hiếu học phi thường. Dù trong hoàn cảnh nào, con người xứ Nghệ luôn giữ vững phẩm giá, tình nghĩa thủy chung son sắt và ý chí kiên định cống hiến hết mình cho sự trường tồn và phát triển của quê hương, đất nước.
              </p>
            </div>
          </div>

          {/* 5. Khát vọng thời đại mới */}
          <div className="mt-6 rounded-xl border border-[#d97706]/40 bg-gradient-to-r from-[#fffbeb] via-[#fefce8] to-[#fffbeb] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-[#991b1b]">
              <TrendingUp className="size-5 shrink-0" />
              <h3 className="font-serif text-lg font-bold">5. Khát Vọng Đổi Mới & Tầm Nhìn Phát Triển Tương Lai</h3>
            </div>
            <p className="mt-2.5 font-sans text-sm sm:text-base leading-relaxed text-[#334155] text-justify">
              Bước vào kỷ nguyên mới, thực hiện Nghị quyết số 39-NQ/TW của Bộ Chính trị về xây dựng và phát triển tỉnh Nghệ An đến năm 2030, tầm nhìn đến năm 2045, cùng việc hoàn thành thắng lợi việc sắp xếp 130 đơn vị hành chính cấp xã theo Nghị quyết số 1678/NQ-UBTVQH15, Nghệ An đang vươn mình mạnh mẽ thành trung tâm kinh tế - văn hóa của vùng Bắc Trung Bộ. Tỉnh liên tục lọt vào nhóm dẫn đầu cả nước về thu hút vốn đầu tư trực tiếp nước ngoài (FDI), đẩy mạnh phát triển các khu công nghiệp công nghệ cao (VSIP, WHA, Hoàng Mai), mở rộng mạng lưới giao thông cao tốc Bắc Nam, phát triển cảng biển nước sâu Cửa Lò và Cảng hàng không quốc tế Vinh, hướng tới một Nghệ An giàu mạnh, văn minh, hiện đại và đậm đà bản sắc.
            </p>
          </div>
        </section>

        <div className="mt-8 space-y-6">
          {/* Cơ cấu loại hình */}
          <Panel title="Cơ cấu theo loại hình đơn vị hành chính" note="Tỷ lệ phân bố số lượng giữa Xã và Phường">
            <div className="space-y-4">
              {(s.byType || []).map((t, i) => (
                <div key={t.name}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[#1e293b]">{t.name}</span>
                    <span className="text-[#991b1b]">{t.count} đơn vị ({pct(s.n > 0 ? t.count / s.n : 0)})</span>
                  </div>
                  <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-[#f1f5f9]">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.n > 0 ? (t.count / s.n) * 100 : 0}%`, background: i === 0 ? GOLD : RED }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Biểu đồ phân bổ theo địa bàn */}
          <Panel title="Phân bổ số lượng đơn vị theo địa bàn cấp huyện (cũ)">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={districtChart} margin={{ left: -10, right: 8, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: "#475569" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#475569" }} />
                <Tooltip />
                <Bar dataKey="count" name="Số đơn vị xã/phường" fill={RED} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* Bảng xếp hạng Top đầu và Top cuối */}
          <Panel title="Bảng xếp hạng diện tích & quy mô dân số">
            <div className="grid gap-6 md:grid-cols-2">
              <RankingTable
                title="Top 5 đơn vị có diện tích lớn nhất"
                rows={s.topArea?.slice(0, 5) || []}
                valueHeader="Diện tích"
                valueFn={(c) => `${f1(c.areaKm2)} km²`}
              />
              <RankingTable
                title="Top 5 đơn vị có dân số đông nhất"
                rows={s.topPop?.slice(0, 5) || []}
                valueHeader="Dân số"
                valueFn={(c) => `${formatNumber(c.population)} người`}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-[#e2e8f0] grid gap-6 md:grid-cols-2">
              <RankingTable
                title="Top 5 đơn vị có mật độ dân số cao nhất"
                rows={s.topDensity?.slice(0, 5) || []}
                valueHeader="Mật độ"
                valueFn={(c) => `${formatNumber(densityOf(c))} ng/km²`}
              />
              <RankingTable
                title="Top 5 đơn vị có diện tích nhỏ nhất"
                rows={s.bottomArea?.slice(0, 5) || []}
                valueHeader="Diện tích"
                valueFn={(c) => `${f1(c.areaKm2)} km²`}
              />
            </div>
          </Panel>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
