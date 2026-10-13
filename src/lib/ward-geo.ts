// Ranh giới 130 xã, phường lấy từ kho dữ liệu của người dùng (public/data/nghe-an-wards.json).
type Position = [number, number];
type RawFeature = {
  properties: { slug: string; name: string };
  geometry: { type: "MultiPolygon"; coordinates: Position[][][] };
};
type RawCollection = { features: RawFeature[] };

export type WardShape = {
  slug: string;
  name: string;
  d: string;
  bbox: [number, number, number, number]; // minX, minY, maxX, maxY (đã chiếu)
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
  for (const polygon of f.geometry.coordinates) {
    for (const ring of polygon) {
      const pts = ring.map((p) => {
        const [x, y] = project(p);
        minX = Math.min(minX, x); minY = Math.min(minY, y);
        maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
        return `${x.toFixed(1)} ${y.toFixed(1)}`;
      });
      parts.push(`M${pts.join("L")}Z`);
    }
  }
  return { slug: f.properties.slug, name: f.properties.name, d: parts.join(""), bbox: [minX, minY, maxX, maxY] };
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
  return shapes.reduce<[number, number, number, number]>(
    (b, s) => [Math.min(b[0], s.bbox[0]), Math.min(b[1], s.bbox[1]), Math.max(b[2], s.bbox[2]), Math.max(b[3], s.bbox[3])],
    [Infinity, Infinity, -Infinity, -Infinity],
  );
}
