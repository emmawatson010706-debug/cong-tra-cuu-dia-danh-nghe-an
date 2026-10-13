import { Link, NavLink } from "react-router-dom";
import { Map, BarChart3, Home } from "lucide-react";

const links = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/thong-ke", label: "Thống kê", icon: BarChart3 },
  { to: "/ranh-gioi-viet-nam", label: "Ranh giới xã phường Việt Nam", icon: Map },
];

export default function SiteHeader() {
  return (
    <header className="border-b-4 border-double border-[#b8860b] bg-[#fbf3d5] shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-2.5 sm:flex-row">
        {/* Khối Logo và Tiêu đề cân đối, chữ thu nhỏ gọn gàng, không bị tràn 2 bên */}
        <Link to="/" className="flex items-center gap-2 text-center sm:text-left transition-transform hover:scale-[1.01]">
          <img
            src="/app-logo.png"
            alt="Logo Tìm Xã Phường Nghệ An"
            className="size-10 sm:size-12 shrink-0 rounded-full shadow-sm border border-[#b8860b]/40 object-cover"
          />
          <div className="flex flex-col items-center sm:items-start">
            <p className="whitespace-nowrap text-[9.5px] sm:text-xs font-bold uppercase tracking-wider text-[#854d0e]">
              Cổng Thông Tin Tra Cứu
            </p>
            <p className="whitespace-nowrap text-base sm:text-2xl font-extrabold font-serif text-[#991b1b] tracking-normal leading-tight [text-shadow:0_1px_1px_rgba(0,0,0,0.15)]">
              Địa danh xã phường Nghệ An
            </p>
          </div>
        </Link>

        {/* Thanh Menu điều hướng 3 mục */}
        <nav className="flex flex-wrap items-center justify-center gap-1 font-sans text-xs sm:text-sm font-bold">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-1 rounded-lg border-2 px-2.5 py-1 sm:px-3 sm:py-1.5 text-center transition-all shadow-xs cursor-pointer ${
                  isActive
                    ? "!bg-[#991b1b] !text-white !border-[#991b1b] shadow-md font-bold"
                    : "border-[#b8860b] bg-[#fffdf5] text-[#78350f] hover:bg-[#fef08a] hover:border-[#991b1b]"
                } ${l.to === "/ranh-gioi-viet-nam" ? "border-[#d97706] bg-[#fefce8] text-[#9a3412]" : ""}`
              }
            >
              <l.icon className="size-3.5 sm:size-4 shrink-0" />
              <span className="whitespace-nowrap">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
