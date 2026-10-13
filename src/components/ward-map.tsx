import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ZoomIn, ZoomOut, RotateCcw, Move, ScrollText, Tag, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { boundsOf, loadWardShapes, type WardShape } from "@/lib/ward-geo.ts";

type Props = {
  focusSlugs: string[];
  selectedSlug?: string;
  className?: string;
};

export default function WardMap({ focusSlugs, selectedSlug, className }: Props) {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<WardShape[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<{ slug: string; x: number; y: number } | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  // Bộ điều khiển Zoom và Pan - Zoom tối đa lên tới 3500%
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Chế độ thao tác trên di động: 'scroll' (cuộn trang web) hoặc 'pan' (kéo bản đồ)
  const [touchMode, setTouchMode] = useState<"pan" | "scroll">("scroll");
  const [showLabels, setShowLabels] = useState(true);

  // Refs theo dõi cử chỉ chạm (1 ngón kéo, 2 ngón pinch-to-zoom)
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });
  const pinchStartRef = useRef<{ dist: number; initialZoom: number } | null>(null);
  const movedDistanceRef = useRef(0);

  useEffect(() => {
    loadWardShapes().then(setShapes).catch(() => setFailed(true));
  }, []);

  const focusSet = useMemo(() => new Set(focusSlugs || []), [focusSlugs]);
  const isFiltered = shapes !== null && focusSlugs && focusSlugs.length > 0 && focusSlugs.length < shapes.length;
  const active = selectedSlug ?? picked ?? (focusSlugs && focusSlugs.length === 1 ? focusSlugs[0] : null);

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

  // Các hàm điều khiển zoom (cho phép zoom lớn đến 3500%)
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z * 1.4, 35));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z / 1.4, 0.6));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Chuột máy tính (Mouse Events)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    movedDistanceRef.current = 0;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panOffset.x,
      initialPanY: panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    movedDistanceRef.current = Math.hypot(dx, dy);

    const containerRect = e.currentTarget.getBoundingClientRect();
    const effectiveWidth = containerRect.width || 400;
    const svgScale = (baseViewBox.w / zoomLevel) / effectiveWidth;
    setPanOffset({
      x: dragStartRef.current.initialPanX - dx * svgScale,
      y: dragStartRef.current.initialPanY - dy * svgScale,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Thao tác cảm ứng điện thoại (Touch Events - Hỗ trợ 2 ngón tay Pinch-to-zoom & Vuốt cuộn trang)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // 2 ngón tay: Bắt đầu Pinch-to-zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartRef.current = { dist, initialZoom: zoomLevel };
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      // 1 ngón tay: Nếu đang bật chế độ kéo bản đồ
      pinchStartRef.current = null;
      movedDistanceRef.current = 0;
      if (touchMode === "pan") {
        setIsDragging(true);
        const touch = e.touches[0];
        dragStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartRef.current) {
      // Cử chỉ 2 ngón tay phóng to / thu nhỏ
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = dist / pinchStartRef.current.dist;
      const targetZoom = Math.min(Math.max(pinchStartRef.current.initialZoom * ratio, 0.6), 35);
      setZoomLevel(targetZoom);
    } else if (e.touches.length === 1 && isDragging && touchMode === "pan") {
      // 1 ngón kéo di chuyển bản đồ khi ở chế độ 'pan'
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      movedDistanceRef.current = Math.hypot(dx, dy);

      const containerRect = e.currentTarget.getBoundingClientRect();
      const effectiveWidth = containerRect.width || 380;
      const svgScale = (baseViewBox.w / zoomLevel) / effectiveWidth;
      setPanOffset({
        x: dragStartRef.current.initialPanX - dx * svgScale,
        y: dragStartRef.current.initialPanY - dy * svgScale,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    pinchStartRef.current = null;
  };

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
      <div className={`relative h-[420px] w-full overflow-hidden rounded-xl border-2 border-[#b8860b] bg-[#fbf6e3] sm:h-[480px] ${className ?? ""}`}>
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
          title="Phóng to bản đồ (hoặc dùng 2 ngón tay kéo dãn)"
          className="flex size-9 items-center justify-center rounded-md bg-[#fefce8] text-[#991b1b] hover:bg-[#991b1b] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <ZoomIn className="size-5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Thu nhỏ bản đồ (hoặc dùng 2 ngón tay chụm lại)"
          className="flex size-9 items-center justify-center rounded-md bg-[#fefce8] text-[#991b1b] hover:bg-[#991b1b] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <ZoomOut className="size-5" />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          title="Về kích thước ban đầu"
          className="flex size-9 items-center justify-center rounded-md bg-[#fefce8] text-[#854d0e] hover:bg-[#854d0e] hover:text-white transition-colors cursor-pointer border border-[#fde047]"
        >
          <RotateCcw className="size-4.5" />
        </button>
      </div>

      {/* Thanh trạng thái góc trên bên trái: Zoom, Chuyển chế độ Cuộn/Kéo, Bật/Tắt nhãn */}
      <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5 max-w-[calc(100%-80px)]">
        {zoomLevel !== 1 && (
          <div className="rounded-md bg-black/75 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-xs shadow-xs">
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        )}

        {/* Nút chuyển chế độ cảm ứng di động: Cho phép cuộn trang hoặc kéo bản đồ */}
        <button
          type="button"
          onClick={() => setTouchMode((m) => (m === "pan" ? "scroll" : "pan"))}
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold shadow-xs transition-colors cursor-pointer border ${
            touchMode === "pan"
              ? "bg-[#991b1b] text-white border-[#7f1d1d]"
              : "bg-white/95 text-[#854d0e] border-[#d97706]/40 hover:bg-[#fef3c7]"
          }`}
          title="Chuyển đổi giữa chế độ kéo bản đồ và cuộn trang web"
        >
          {touchMode === "pan" ? (
            <>
              <Move className="size-3.5" />
              <span>Chế độ: Kéo bản đồ</span>
            </>
          ) : (
            <>
              <ScrollText className="size-3.5" />
              <span>Chế độ: Cuộn trang (Bật kéo)</span>
            </>
          )}
        </button>

        {/* Nút bật tắt nhãn tên tránh bị chữ đè chữ */}
        <button
          type="button"
          onClick={() => setShowLabels((v) => !v)}
          className={`hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold shadow-xs transition-colors cursor-pointer border ${
            showLabels
              ? "bg-white/95 text-[#78350f] border-[#d97706]/40"
              : "bg-[#f1f5f9] text-[#64748b] border-gray-300"
          }`}
          title="Bật/Tắt nhãn tên để bản đồ không bị rối chữ"
        >
          <Tag className="size-3" />
          <span>{showLabels ? "Hiện tên xã" : "Ẩn tên xã"}</span>
        </button>
      </div>

      {/* Vùng bản đồ SVG - Chiều cao tinh chỉnh ngắn lại (420px - 480px) gọn gàng, không che khuất */}
      <div
        className={`relative h-[420px] w-full select-none sm:h-[480px] ${
          isDragging ? "cursor-grabbing" : touchMode === "pan" ? "cursor-grab" : "cursor-default"
        }`}
        style={{
          touchAction: touchMode === "pan" ? "none" : "pan-y",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setHover(null);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          viewBox={viewBoxString}
          className="h-full w-full select-none transition-all duration-150 ease-out"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Bản đồ địa giới Nghệ An"
        >
          {shapes.map((s) => {
            const isFocus = focusSet.size === 0 || focusSet.has(s.slug);
            const isSelected = active === s.slug;
            const isHovered = hover?.slug === s.slug;

            // Khi nhấp chọn: ĐỔI THÀNH MÀU ĐỎ ĐẬM (#991b1b)
            const fill = isSelected
              ? "#991b1b"
              : isHovered
              ? "#c2410c"
              : isFocus
              ? "#e8b923"
              : "#e2d9b8";
            const stroke = isSelected ? "#ffffff" : isFocus ? "#78350f" : "#a8a29e";
            const strokeWidth = isSelected ? 3 : isFocus ? 0.8 : 0.4;
            const opacity = isSelected ? 1 : isFocus ? 0.95 : 0.4;

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
                  if (movedDistanceRef.current > 6) return;
                  // Khi nhấp vào: Màn hình VẪN NẰM NGAY BẢN ĐỒ CHÍNH, chỉ chọn xã và đổi thành màu đỏ đậm!
                  setPicked(s.slug);
                }}
              />
            );
          })}

          {/* Nhãn chữ thông minh: Tránh hiện tượng chữ đè chữ gây rối */}
          {shapes.map((s) => {
            const isSelected = active === s.slug;
            const isFocus = focusSet.size === 0 || focusSet.has(s.slug);
            if (!isFocus && !isSelected) return null;

            // Tính kích thước ước lượng của đơn vị trên màn hình
            const shapeWidth = (s.bbox[2] - s.bbox[0]) * zoomLevel;
            const shapeHeight = (s.bbox[3] - s.bbox[1]) * zoomLevel;
            const isBigEnough = Math.min(shapeWidth, shapeHeight) > 28;

            // Chỉ hiển thị tên nếu được bật, hoặc là đơn vị đang được chọn, hoặc vùng đủ lớn để không đè chữ
            if (!showLabels && !isSelected) return null;
            if (!isSelected && focusSet.size > 15 && !isBigEnough && zoomLevel < 3) return null;

            const posX = s.center ? s.center[0] : (s.bbox[0] + s.bbox[2]) / 2;
            const posY = s.center ? s.center[1] : (s.bbox[1] + s.bbox[3]) / 2;

            const fontSize = Math.max(9, Math.min(13, 11 / Math.sqrt(zoomLevel)));

            return (
              <g key={`lbl-${s.slug}`} className="pointer-events-none select-none">
                {/* Viền bóng nổi chữ */}
                <text
                  x={posX}
                  y={posY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={fontSize}
                  fontWeight={isSelected ? "900" : "700"}
                  fill={isSelected ? "#ffffff" : "#451a03"}
                  stroke={isSelected ? "#7f1d1d" : "#fef08a"}
                  strokeWidth={isSelected ? 3 : 2}
                  paintOrder="stroke fill"
                  className="font-sans"
                >
                  {s.name}
                </text>
              </g>
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

      {/* Thanh hướng dẫn nhỏ gọn bên dưới đáy khung bản đồ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-[#b8860b]/30 bg-[#fffdf5] px-3.5 py-2 text-xs font-sans text-[#78350f]">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <span>💡 <b>2 ngón tay</b> để phóng to/thu nhỏ · Nhấp vào xã để chọn và xem thông tin bên dưới</span>
        </div>
      </div>

      {/* Khung tương tác khi nhấp chọn ranh giới: CHỮ TRẮNG TRÊN NỀN ĐỎ CHO NÚT "VÀO TRANG XÃ/PHƯỜNG" */}
      {activeShape && (
        <div className="border-t-2 border-[#b91c1c] bg-gradient-to-r from-[#fef2f2] via-[#fff1f2] to-[#fef2f2] p-3.5 sm:p-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#991b1b] text-white">
                <CheckCircle2 className="size-4 text-white" />
              </span>
              <div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#991b1b]">
                  Đã chọn: <span className="underline decoration-[#991b1b]/40">{activeShape.name}</span>
                </p>
                <p className="font-sans text-xs text-[#64748b]">
                  Màu đỏ đậm trên bản đồ chính · Nhấp nút bên dưới để mở toàn bộ bài viết, lịch sử sáp nhập và số liệu.
                </p>
              </div>
            </div>

            {/* Nút bấm VÀO TRANG XÃ/PHƯỜNG: Chữ màu trắng trên nền màu đỏ */}
            <button
              type="button"
              onClick={() => navigate(`/don-vi/${activeShape.slug}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl !bg-[#991b1b] hover:!bg-[#7f1d1d] px-5 py-2.5 font-sans text-xs sm:text-sm font-bold !text-white shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap border border-[#7f1d1d]"
            >
              <span className="!text-white font-bold">Vào trang {activeShape.name}</span>
              <ArrowRight className="size-4 !text-white shrink-0" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
