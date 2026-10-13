import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
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

  // Bộ điều khiển Zoom và Pan
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });

  useEffect(() => {
    loadWardShapes().then(setShapes).catch(() => setFailed(true));
  }, []);

  const focusSet = useMemo(() => new Set(focusSlugs || []), [focusSlugs]);
  const isFiltered = shapes !== null && focusSlugs && focusSlugs.length > 0 && focusSlugs.length < shapes.length;
  const active = selectedSlug ?? (picked && focusSet.has(picked) ? picked : null) ?? (focusSlugs && focusSlugs.length === 1 ? focusSlugs[0] : null);

  // Tính toán vùng bao cơ sở (Base ViewBox)
  const baseViewBox = useMemo(() => {
    if (!shapes || shapes.length === 0) return { x: 0, y: 0, w: 1800, h: 1450 };
    const targets = isFiltered ? shapes.filter((s) => focusSet.has(s.slug)) : shapes;
    const effectiveTargets = targets.length > 0 ? targets : shapes;
    const [x0, y0, x1, y1] = boundsOf(effectiveTargets);
    const pad = Math.max(x1 - x0, y1 - y0) * 0.12 + 10;
    return {
      x: x0 - pad,
      y: y0 - pad,
      w: x1 - x0 + 2 * pad,
      h: y1 - y0 + 2 * pad,
    };
  }, [shapes, focusSet, isFiltered]);

  // ViewBox sau khi áp dụng Zoom và Pan
  const viewBoxString = useMemo(() => {
    const w = baseViewBox.w / zoomLevel;
    const h = baseViewBox.h / zoomLevel;
    const centerX = baseViewBox.x + baseViewBox.w / 2 + panOffset.x;
    const centerY = baseViewBox.y + baseViewBox.h / 2 + panOffset.y;
    return `${centerX - w / 2} ${centerY - h / 2} ${w} ${h}`;
  }, [baseViewBox, zoomLevel, panOffset]);

  // Các hàm điều khiển zoom
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z * 1.35, 8));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z / 1.35, 0.6));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Kéo chuột di chuyển bản đồ (Pan)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panOffset.x,
      initialPanY: panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    // Tỉ lệ scale sang hệ tọa độ SVG
    const svgScale = (baseViewBox.w / zoomLevel) / 600;
    setPanOffset({
      x: dragStartRef.current.initialPanX - dx * svgScale,
      y: dragStartRef.current.initialPanY - dy * svgScale,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

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
      <div className={`rounded-xl border-2 border-dashed border-[#b8860b] p-6 text-center text-sm text-[#8a6a22] ${className ?? ""}`}>
        Không thể tải bản đồ địa giới lúc này. Dữ liệu vẫn tra cứu bình thường bên dưới.
      </div>
    );
  }

  if (!shapes) {
    return (
      <div className={`relative h-72 w-full overflow-hidden rounded-xl border-2 border-[#b8860b] bg-[#fbf6e3] sm:h-96 ${className ?? ""}`}>
        <Skeleton className="h-full w-full" />
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xs text-[#8a6a22]">
          Đang nạp bản đồ địa giới 130 xã phường...
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border-2 border-[#b8860b] bg-[#fbf6e3] shadow-md select-none ${className ?? ""}`}>
      {/* Thanh nút bấm Zoom và Reset góc trên bên phải */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 rounded-lg bg-white/95 p-1.5 shadow-md border border-[#d97706]/40 backdrop-blur-xs">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Phóng to bản đồ"
          className="flex size-8 items-center justify-center rounded-md bg-[#fefce8] text-[#991b1b] hover:bg-[#991b1b] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <ZoomIn className="size-4.5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Thu nhỏ bản đồ"
          className="flex size-8 items-center justify-center rounded-md bg-[#fefce8] text-[#991b1b] hover:bg-[#991b1b] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <ZoomOut className="size-4.5" />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          title="Về kích thước ban đầu"
          className="flex size-8 items-center justify-center rounded-md bg-[#fefce8] text-[#854d0e] hover:bg-[#854d0e] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>

      {/* Hiển thị mức độ zoom hiện tại */}
      {zoomLevel !== 1 && (
        <div className="absolute left-3 top-3 z-20 rounded bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs">
          Zoom: {Math.round(zoomLevel * 100)}%
        </div>
      )}

      {/* Vùng bản đồ SVG */}
      <div
        className={`relative aspect-[4/3] w-full max-h-[520px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setHover(null);
        }}
      >
        <svg
          viewBox={viewBoxString}
          className="h-full w-full select-none transition-all duration-200 ease-out"
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
                  if (isDragging) return;
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

          {/* Nhãn chữ cho các xã/phường khi zoom hoặc khi danh sách thu hẹp */}
          {(focusSet.size <= MAX_LABELS || zoomLevel >= 2) &&
            shapes
              .filter((s) => focusSet.size === 0 || focusSet.has(s.slug))
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
                    fontSize={Math.max(10, Math.min(14, 12 / Math.sqrt(zoomLevel)))}
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
        {hoverShape && !isDragging && (
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
          <Move className="size-3.5 text-[#b45309]" />
          <span>Kéo thả để di chuyển · Dùng nút <b>+ / −</b> góc phải để zoom · Nhấp vào xã để xem chi tiết</span>
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
