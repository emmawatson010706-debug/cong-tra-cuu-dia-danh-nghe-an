import { Link, NavLink } from "react-router-dom";
import { Map, BarChart3, Home, Compass } from "lucide-react";

const links = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/thong-ke", label: "Địa Chí & Dữ Liệu", icon: BarChart3 },
  { to: "/ranh-gioi-viet-nam", label: "Bản đồ Việt Nam và ranh giới xã phường Nghệ An", icon: Map, isSpecial: true },
];

export default function SiteHeader() {
  return (
    <header className="relative border-b-4 border-double border-[#b8860b] bg-gradient-to-b from-[#fffef8] via-[#fbf4d8] to-[#f7ecc0] shadow-[0_6px_25px_rgba(184,134,11,0.15)]">
      {/* Họa tiết viền hoa văn truyền thống tinh tế */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b8860b] via-[#eab308] to-[#b8860b] opacity-80" />

      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5">
        {/* Khối Tiêu đề chính trung tâm */}
        <div className="text-center">
          <Link to="/" className="inline-block group transition-transform duration-200 hover:scale-[1.01]">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] text-[#92400e] drop-shadow-xs transition-colors group-hover:text-[#b45309]">
              Cổng Thông Tin Tra Cứu
            </p>
            <h1 className="mt-1 font-serif text-[17px] sm:text-2xl md:text-3xl font-black tracking-normal text-[#991b1b] leading-tight whitespace-nowrap [text-shadow:0_1px_3px_rgba(153,27,27,0.18)]">
              Địa Danh Xã Phường Nghệ An
            </h1>
          </Link>

          {/* Đường chỉ hoa văn ánh vàng trung tâm */}
          <div className="mx-auto my-2.5 flex items-center justify-center gap-2">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#b8860b]" />
            <Compass className="size-3.5 text-[#b8860b]" />
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#b8860b]" />
          </div>
        </div>

        {/* Thanh Điều Hướng: Bố trí 2 hàng cân đối hoàn hảo theo đúng yêu cầu */}
        <nav className="mt-2.5 flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto">
          {/* Hàng 1: 2 nút Trang chủ và Địa Chí & Dữ Liệu cân xứng */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `inline-flex items-center justify-center gap-2 rounded-xl border-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] !text-white border-[#7f1d1d] shadow-[0_4px_12px_rgba(153,27,27,0.35)] scale-[1.01]"
                    : "border-[#d97706]/40 bg-white/95 text-[#78350f] hover:bg-[#fef9c3] hover:border-[#b91c1c] hover:text-[#991b1b] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                }`
              }
            >
              <Home className="size-4 shrink-0" />
              <span className="whitespace-nowrap">Trang chủ</span>
            </NavLink>

            <NavLink
              to="/thong-ke"
              end
              className={({ isActive }) =>
                `inline-flex items-center justify-center gap-2 rounded-xl border-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] !text-white border-[#7f1d1d] shadow-[0_4px_12px_rgba(153,27,27,0.35)] scale-[1.01]"
                    : "border-[#d97706]/40 bg-white/95 text-[#78350f] hover:bg-[#fef9c3] hover:border-[#b91c1c] hover:text-[#991b1b] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                }`
              }
            >
              <BarChart3 className="size-4 shrink-0" />
              <span className="whitespace-nowrap">Địa Chí & Dữ Liệu</span>
            </NavLink>
          </div>

          {/* Hàng 2: Nút Bản đồ Việt Nam và ranh giới xã phường Nghệ An nằm trọn vẹn, cân đối chính giữa */}
          <div className="w-full max-w-lg">
            <NavLink
              to="/ranh-gioi-viet-nam"
              end
              className={({ isActive }) =>
                `w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] !text-white border-[#7f1d1d] shadow-[0_4px_12px_rgba(153,27,27,0.35)] scale-[1.01]"
                    : "border-[#d97706] bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] text-[#92400e] hover:border-[#991b1b] hover:text-[#991b1b] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                }`
              }
            >
              <Map className="size-4 shrink-0 text-[#b45309]" />
              <span className="whitespace-normal sm:whitespace-nowrap text-center">
                Bản đồ Việt Nam và ranh giới xã phường Nghệ An
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
