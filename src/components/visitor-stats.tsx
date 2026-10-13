import { useEffect, useState } from "react";
import { Eye, Radio, Users } from "lucide-react";

const BASE_TOTAL = 500_000;
const STORAGE_KEY = "nata_visitor_stats_v1";

export default function VisitorStats() {
  const [online, setOnline] = useState(28);
  const [today, setToday] = useState(1420);
  const [total, setTotal] = useState(BASE_TOTAL + 1420);

  useEffect(() => {
    // Lấy hoặc khởi tạo thống kê trong ngày
    const todayStr = new Date().toISOString().split("T")[0];
    let saved = { date: todayStr, todayCount: 1420, totalOffset: 0 };
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.date === todayStr) saved = parsed;
        else saved = { date: todayStr, todayCount: 1420, totalOffset: parsed.totalOffset || 0 };
      }
    } catch (e) {}

    // Tăng lượt xem cho phiên này
    if (!sessionStorage.getItem("visited_session")) {
      sessionStorage.setItem("visited_session", "1");
      saved.todayCount += 1;
      saved.totalOffset += 1;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch (e) {}
    }

    setToday(saved.todayCount);
    setTotal(BASE_TOTAL + saved.todayCount + (saved.totalOffset || 0));

    // Hiệu ứng nhịp tim người đang xem thực tế dao động 18 - 35
    const interval = setInterval(() => {
      setOnline((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 15 ? 18 : next > 45 ? 32 : next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Radio, label: "Đang xem", value: online },
    { icon: Users, label: "Hôm nay", value: today },
    { icon: Eye, label: "Tổng lượt xem", value: total },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-[#fef08a]">
      {items.map(({ icon: Icon, label, value }) => (
        <span key={label} className="inline-flex items-center gap-1.5 font-sans">
          <Icon className={`size-3.5 ${label === "Đang xem" ? "animate-pulse text-green-400" : "text-[#fef08a]"}`} />
          <span className="opacity-90">{label}:</span>{" "}
          <b className="font-bold text-white tracking-wide">{value.toLocaleString("vi-VN")}</b>
        </span>
      ))}
    </div>
  );
}
