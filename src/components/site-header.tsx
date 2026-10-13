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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
        {/* Khối tiêu đề 2 dòng cân đối, dồn lại gọn gàng ở giữa */}
        <Link to="/" className="text-center sm:text-left transition-transform hover:scale-[1.01] flex flex-col items-center sm:items-start">
          <p className="whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#854d0e]">
            Cổng Thông Tin Tra Cứu
          </p>
          <p className="mt-0.5 whitespace-nowrap text-2xl sm:text-3xl font-extrabold font-serif text-[#991b1b] tracking-normal [text-shadow:0_1px_1px_rgba(0,0,0,0.15)]">
            Địa danh xã phường Nghệ An
          </p>
        </Link>

        {/* Thanh Menu điều hướng 3 mục */}
        <nav className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs sm:text-sm font-bold">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-lg border-2 px-3.5 py-1.5 text-center transition-all shadow-xs cursor-pointer ${
                  isActive
                    ? "!bg-[#991b1b] !text-white !border-[#991b1b] shadow-md"
                    : "border-[#b8860b] bg-[#fffdf5] text-[#78350f] hover:bg-[#fef08a] hover:border-[#991b1b]"
                } ${l.to === "/ranh-gioi-viet-nam" ? "border-[#d97706] bg-[#fefce8] text-[#9a3412]" : ""}`
              }
            >
              <l.icon className="size-4 shrink-0" />
              <span className="whitespace-nowrap">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
