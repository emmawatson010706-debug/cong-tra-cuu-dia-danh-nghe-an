import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { boundsOf, loadWardShapes, type WardShape } from "@/lib/ward-geo.ts";

type Props = {
  focusSlugs: string[];
  selectedSlug?: string;
  className?: string;
};

const MAX_LABELS = 12;

export default function WardMap({ focusSlugs, selectedSlug, className }: Props) {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<WardShape[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<{ slug: string; x: number; y: number } | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    loadWardShapes().then(setShapes).catch(() => setFailed(true));
  }, []);

  const focusSet = useMemo(() => new Set(focusSlugs || []), [focusSlugs]);
  const isFiltered = shapes !== null && focusSlugs && focusSlugs.length > 0 && focusSlugs.length < shapes.length;
  const active = selectedSlug ?? (picked && focusSet.has(picked) ? picked : null) ?? (focusSlugs && focusSlugs.length === 1 ? focusSlugs[0] : null);

  const viewBox = useMemo(() => {
    if (!shapes || shapes.length === 0) return "0 0 1800 1450";
    const targets = isFiltered ? shapes.filter((s) => focusSet.has(s.slug)) : shapes;
    const effectiveTargets = targets.length > 0 ? targets : shapes;
    const [x0, y0, x1, y1] = boundsOf(effectiveTargets);
    const pad = Math.max(x1 - x0, y1 - y0) * 0.12 + 10;
    return `${x0 - pad} ${y0 - pad} ${x1 - x0 + 2 * pad} ${y1 - y0 + 2 * pad}`;
  }, [shapes, focusSet, isFiltered]);

  const activeShape = useMemo(
    () => (active && shapes ? shapes.find((s) => s.slug === active) ?? null : null),
    [active, shapes]
  );

  const hoverShape = useMemo(
    () => (hover && shapes ? shapes.find((s) => s.slug === hover.slug) ?? null : null),
    [hover, shapes]
  );

  if (failed) {
    return (
      <div className={`rounded-lg border-2 border-dashed border-[#b8860b] p-6 text-center text-sm text-[#8a6a22] ${className ?? ""}`}>
        Không thể tải bản đồ địa giới lúc này. Dữ liệu vẫn tra cứu bình thường bên dưới.
      </div>
    );
  }

  if (!shapes) {
    return (
      <div className={`relative h-72 w-full overflow-hidden rounded-lg border-2 border-[#b8860b] bg-[#fbf6e3] sm:h-96 ${className ?? ""}`}>
        <Skeleton className="h-full w-full" />
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xs text-[#8a6a22]">
          Đang nạp bản đồ địa giới 130 xã phường...
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border-2 border-[#b8860b] bg-[#fbf6e3] shadow-md ${className ?? ""}`}>
      <div className="relative aspect-[4/3] w-full max-h-[500px]">
        <svg
          viewBox={viewBox}
          className="h-full w-full select-none transition-all duration-500 ease-out"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Bản đồ địa giới Nghệ An"
        >
          {shapes.map((s) => {
            const isFocus = focusSet.size === 0 || focusSet.has(s.slug);
            const isSelected = active === s.slug;
            const isHovered = hover?.slug === s.slug;

            const fill = isSelected
              ? "#a50f1a"
              : isHovered
              ? "#c2410c"
              : isFocus
              ? "#e8b923"
              : "#e2d9b8";
            const stroke = isSelected ? "#fef08a" : isFocus ? "#78350f" : "#a8a29e";
            const strokeWidth = isSelected ? 2.5 : isFocus ? 0.8 : 0.4;
            const opacity = isFocus ? 1 : 0.45;

            return (
              <path
                key={s.slug}
                d={s.d}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                opacity={opacity}
                className="cursor-pointer transition-colors duration-150"
                onMouseEnter={(e) => {
                  const rect = (e.currentTarget.ownerSVGElement ?? e.currentTarget).getBoundingClientRect();
                  setHover({ slug: s.slug, x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget.ownerSVGElement ?? e.currentTarget).getBoundingClientRect();
                  setHover({ slug: s.slug, x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  setPicked(s.slug);
                  if (focusSlugs && focusSlugs.length === 1 && focusSlugs[0] === s.slug) return;
                  navigate(`/don-vi/${s.slug}`);
                }}
              />
            );
          })}

          {/* Nhãn chữ cho các xã/phường khi zoom gần */}
          {focusSet.size > 0 &&
            focusSet.size <= MAX_LABELS &&
            shapes
              .filter((s) => focusSet.has(s.slug))
              .map((s) => {
                const posX = s.center ? s.center[0] : (s.bbox[0] + s.bbox[2]) / 2;
                const posY = s.center ? s.center[1] : (s.bbox[1] + s.bbox[3]) / 2;
                return (
                  <text
                    key={`lbl-${s.slug}`}
                    x={posX}
                    y={posY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="12"
                    fontWeight="bold"
                    fill={active === s.slug ? "#ffffff" : "#451a03"}
                    stroke={active === s.slug ? "#7f1d1d" : "#fef08a"}
                    strokeWidth="2.5"
                    paintOrder="stroke fill"
                    className="pointer-events-none select-none font-sans"
                  >
                    {s.name}
                  </text>
                );
              })}
        </svg>

        {/* Tooltip khi rê chuột */}
        {hoverShape && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-[#78350f] bg-[#fffbeb] px-2.5 py-1 text-xs font-semibold text-[#78350f] shadow-lg"
            style={{ left: hover.x, top: hover.y - 8 }}
          >
            {hoverShape.name}
          </div>
        )}
      </div>

      {/* Thanh thông tin bên dưới bản đồ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-[#b8860b] bg-[#fffdf5] px-4 py-2.5 text-xs font-serif text-[#78350f]">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-sm bg-[#e8b923] border border-[#78350f]" />
          <span>Rê chuột để xem tên xã/phường · Nhấp để vào xem chi tiết</span>
        </div>
        {activeShape && (
          <Link
            to={`/don-vi/${activeShape.slug}`}
            className="inline-flex items-center gap-1 rounded bg-[#a50f1a] px-3 py-1 font-sans text-xs font-bold text-white transition hover:bg-[#7f1d1d]"
          >
            Vào trang {activeShape.name}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
