import raw from "./communes.json";

export type Commune = {
  slug: string;
  name: string;
  type: string;
  district: string;
  areaKm2: number;
  population: number;
  density: number;
  oldUnits: string[];
  lat: number;
  lng: number;
  areaRank?: number;
  populationRank?: number;
};

export const COMMUNES: Commune[] = raw as Commune[];

export function formatNumber(n: number): string {
  return n.toLocaleString("vi-VN");
}

export const districtLabel = (d: string) => `${d} (cũ)`;
