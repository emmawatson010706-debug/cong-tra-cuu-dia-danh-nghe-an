// Ranh giới 130 xã, phường lấy từ kho dữ liệu của người dùng (public/data/nghe-an-wards.json).
type Position = [number, number];
type RawFeature = {
  properties: { slug: string; name: string };
  geometry: { type: "MultiPolygon" | "Polygon"; coordinates: any };
};
type RawCollection = { features: RawFeature[] };

export type WardShape = {
  slug: string;
  name: string;
  d: string;
  bbox: [number, number, number, number]; // minX, minY, maxX, maxY (đã chiếu)
  center: [number, number]; // tâm tọa độ để vẽ nhãn tên
};

const LAT0 = 20.1;
const LNG0 = 103.8;
const SCALE = 1000;
// Co chiều ngang theo vĩ độ để bản đồ không bị méo
const COS_LAT = Math.cos((19.2 * Math.PI) / 180);

const project = ([lng, lat]: Position): Position => [
  (lng - LNG0) * COS_LAT * SCALE,
  (LAT0 - lat) * SCALE,
];

function calcCentroid(rawCoords: any, type: string): [number, number] | null {
  const polys = type === "Polygon" ? [rawCoords] : rawCoords;
  let maxArea = -Infinity;
  let bestCenter: [number, number] | null = null;

  for (const poly of polys || []) {
    const ring = poly?.[0]; // vòng biên ngoài cùng của xã
    if (!ring || ring.length < 3) continue;
    let area = 0, cx = 0, cy = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      const [x1, y1] = project(ring[i]);
      const [x2, y2] = project(ring[i + 1]);
      const cross = x1 * y2 - x2 * y1;
      area += cross;
      cx += (x1 + x2) * cross;
      cy += (y1 + y2) * cross;
    }
    area = area / 2;
    if (Math.abs(area) > maxArea) {
      maxArea = Math.abs(area);
      if (Math.abs(area) > 1e-6) {
        bestCenter = [cx / (6 * area), cy / (6 * area)];
      }
    }
  }
  return bestCenter;
}

function toShape(f: RawFeature): WardShape {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const parts: string[] = [];

  const rawCoords = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;

  for (const polygon of rawCoords || []) {
    for (const ring of polygon || []) {
      const pts = (ring || []).map((p: Position) => {
        const [x, y] = project(p);
        minX = Math.min(minX, x); minY = Math.min(minY, y);
        maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        return `${x.toFixed(1)} ${y.toFixed(1)}`;
      });
      if (pts.length > 0) {
        parts.push(`M${pts.join("L")}Z`);
      }
    }
  }

  // Tính trọng tâm đa giác chính xác (Centroid) để nhãn tên nằm chuẩn mực chính giữa ranh giới
  const centroid = calcCentroid(rawCoords, f.geometry.type);
  const cx = centroid && isFinite(centroid[0]) ? centroid[0] : (isFinite(minX) && isFinite(maxX) ? (minX + maxX) / 2 : 900);
  const cy = centroid && isFinite(centroid[1]) ? centroid[1] : (isFinite(minY) && isFinite(maxY) ? (minY + maxY) / 2 : 725);
  const safeBbox: [number, number, number, number] = [
    isFinite(minX) ? minX : 0,
    isFinite(minY) ? minY : 0,
    isFinite(maxX) ? maxX : 1800,
    isFinite(maxY) ? maxY : 1450,
  ];

  return {
    slug: f.properties.slug,
    name: f.properties.name,
    d: parts.join(""),
    bbox: safeBbox,
    center: [cx, cy],
  };
}

let cache: Promise<WardShape[]> | null = null;

export function loadWardShapes(): Promise<WardShape[]> {
  if (!cache) {
    cache = fetch("/data/nghe-an-wards.json")
      .then((r) => {
        if (!r.ok) throw new Error("Không tải được dữ liệu bản đồ");
        return r.json() as Promise<RawCollection>;
      })
      .then((json) => json.features.map(toShape))
      .catch((e: unknown) => {
        cache = null; // cho phép thử lại
        throw e;
      });
  }
  return cache;
}

export function boundsOf(shapes: WardShape[]): [number, number, number, number] {
  if (!shapes || shapes.length === 0) {
    return [0, 0, 1800, 1450];
  }
  const result = shapes.reduce<[number, number, number, number]>(
    (b, s) => [
      Math.min(b[0], s.bbox[0]),
      Math.min(b[1], s.bbox[1]),
      Math.max(b[2], s.bbox[2]),
      Math.max(b[3], s.bbox[3]),
    ],
    [Infinity, Infinity, -Infinity, -Infinity],
  );

  if (!isFinite(result[0]) || !isFinite(result[2])) {
    return [0, 0, 1800, 1450];
  }
  return result;
}
