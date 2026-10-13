import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import { formatNumber, districtLabel, type Commune } from "@/data/communes.ts";
import { STATS, densityOf, type Bin, type GroupRow } from "@/lib/stats.ts";

const RED = "#991b1b";
const GOLD = "#d97706";
const f1 = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 1 });
const f0 = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`;

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

function Histogram({ data, color }: { data: Bin[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -10, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#475569" }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#475569" }} />
        <Tooltip formatter={(v) => [`${v} đơn vị`, "Số lượng"]} />
        <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
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
          {rows.map((c, i) => (
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
  const districtChart = s.byDistrict.map((d) => ({
    name: districtLabel(d.name),
    count: d.count,
    pop: Math.round(d.population / 1000),
    area: Math.round(d.area),
  }));

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
          <Kpi label="Tổng quy mô dân số" value={f0(s.popTotal)} unit="người" />
          <Kpi label="Tổng diện tích tự nhiên" value={f1(s.areaTotal)} unit="km²" />
          <Kpi label="Mật độ trung bình toàn tỉnh" value={f0(s.popTotal / s.areaTotal)} unit="người/km²" />
          <Kpi label="Chỉ số tập trung Gini dân số" value={f1(s.popGini)} unit="hệ số (0..1)" />
        </div>

        <div className="mt-6 space-y-6">
          {/* Cơ cấu loại hình */}
          <Panel title="Cơ cấu theo loại hình đơn vị hành chính" note="Tỷ lệ phân bố số lượng giữa Xã và Phường">
            <div className="space-y-4">
              {s.byType.map((t, i) => (
                <div key={t.name}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[#1e293b]">{t.name}</span>
                    <span className="text-[#991b1b]">{t.count} đơn vị ({pct(t.count / s.n)})</span>
                  </div>
                  <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-[#f1f5f9]">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(t.count / s.n) * 100}%`, background: i === 0 ? GOLD : RED }} />
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
                rows={s.topArea}
                valueHeader="Diện tích"
                valueFn={(c) => `${f1(c.areaKm2)} km²`}
              />
              <RankingTable
                title="Top 5 đơn vị có dân số đông nhất"
                rows={s.topPop}
                valueHeader="Dân số"
                valueFn={(c) => `${formatNumber(c.population)} người`}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-[#e2e8f0] grid gap-6 md:grid-cols-2">
              <RankingTable
                title="Top 5 đơn vị có mật độ dân số cao nhất"
                rows={s.topDensity}
                valueHeader="Mật độ"
                valueFn={(c) => `${formatNumber(densityOf(c))} ng/km²`}
              />
              <RankingTable
                title="Top 5 đơn vị có diện tích nhỏ nhất"
                rows={s.bottomArea}
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
