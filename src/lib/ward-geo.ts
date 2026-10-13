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

  const cx = isFinite(minX) && isFinite(maxX) ? (minX + maxX) / 2 : 900;
  const cy = isFinite(minY) && isFinite(maxY) ? (minY + maxY) / 2 : 725;
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
