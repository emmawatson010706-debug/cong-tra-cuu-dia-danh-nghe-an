import { COMMUNES, type Commune } from "@/data/communes.ts";

export type Summary = { mean: number; median: number; stdev: number; cv: number; min: number; max: number };
export type GroupRow = { name: string; count: number; area: number; population: number; density: number };
export type Bin = { label: string; count: number };

const density = (c: Commune) => c.population / c.areaKm2;
const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

export function summarize(xs: number[]): Summary {
  const sorted = [...xs].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sum(sorted) / n;
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const stdev = Math.sqrt(sum(sorted.map((x) => (x - mean) ** 2)) / n);
  return { mean, median, stdev, cv: stdev / mean, min: sorted[0], max: sorted[n - 1] };
}

// Hệ số Gini: 0 là phân bố đều tuyệt đối, 1 là tập trung hoàn toàn vào một đơn vị.
export function gini(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const n = s.length;
  const weighted = s.reduce((acc, x, i) => acc + (i + 1) * x, 0);
  return (2 * weighted) / (n * sum(s)) - (n + 1) / n;
}

export function groupBy(key: (c: Commune) => string): GroupRow[] {
  const map = new Map<string, GroupRow>();
  for (const c of COMMUNES) {
    const k = key(c);
    const row = map.get(k) ?? { name: k, count: 0, area: 0, population: 0, density: 0 };
    row.count += 1;
    row.area += c.areaKm2;
    row.population += c.population;
    map.set(k, row);
  }
  return [...map.values()].map((r) => ({ ...r, density: r.population / r.area }));
}

export function histogram(values: number[], edges: number[], fmt: (n: number) => string): Bin[] {
  return edges.map((lo, i) => {
    const hi = edges[i + 1];
    const count = values.filter((v) => v >= lo && (hi === undefined || v < hi)).length;
    const label = hi === undefined ? `≥ ${fmt(lo)}` : `${fmt(lo)}–${fmt(hi)}`;
    return { label, count };
  });
}

const areas = COMMUNES.map((c) => c.areaKm2);
const pops = COMMUNES.map((c) => c.population);
const densities = COMMUNES.map(density);
const topShare = (xs: number[], k: number) => sum([...xs].sort((a, b) => b - a).slice(0, k)) / sum(xs);

export const STATS = {
  n: COMMUNES.length,
  totalArea: sum(areas),
  totalPop: sum(pops),
  overallDensity: sum(pops) / sum(areas),
  area: summarize(areas),
  pop: summarize(pops),
  dens: summarize(densities),
  giniPop: gini(pops),
  giniArea: gini(areas),
  top10PopShare: topShare(pops, 10),
  top10AreaShare: topShare(areas, 10),
  wards: COMMUNES.filter((c) => c.type === "Phường").length,
  communes: COMMUNES.filter((c) => c.type === "Xã").length,
  byType: groupBy((c) => c.type),
  byDistrict: groupBy((c) => c.district).sort((a, b) => b.population - a.population),
  popHist: histogram(pops, [0, 10000, 20000, 30000, 40000, 60000, 100000], (n) => `${n / 1000}k`),
  areaHist: histogram(areas, [0, 20, 40, 80, 150, 300, 600], (n) => String(n)),
  topPop: [...COMMUNES].sort((a, b) => b.population - a.population).slice(0, 10),
  topArea: [...COMMUNES].sort((a, b) => b.areaKm2 - a.areaKm2).slice(0, 10),
  topDensity: [...COMMUNES].sort((a, b) => density(b) - density(a)).slice(0, 10),
  lowDensity: [...COMMUNES].sort((a, b) => density(a) - density(b)).slice(0, 10),
};

export const densityOf = density;
