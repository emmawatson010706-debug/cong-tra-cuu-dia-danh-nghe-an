import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Trang chủ" },
  { to: "/thong-ke", label: "Thống kê" },
];

export default function SiteHeader() {
  return (
    <header className="border-b-4 border-double border-[#b8860b] bg-[#fbf3d5] shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3.5 sm:flex-row sm:justify-between">
        <Link to="/" className="text-center font-serif sm:text-left transition-transform hover:scale-[1.01]">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#854d0e] sm:text-xs">
            Cổng Thông Tin Điện Tử Tra Cứu
          </p>
          <p className="mt-0.5 whitespace-nowrap text-2xl font-extrabold leading-tight text-[#991b1b] sm:text-3xl [text-shadow:0_1px_1px_rgba(0,0,0,0.15)]">
            Địa danh xã phường Nghệ An
          </p>
        </Link>
        <nav className="flex w-full max-w-xs justify-center gap-2 font-serif text-sm font-bold sm:w-auto sm:max-w-none sm:text-base">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `rounded-md border-2 px-5 py-1.5 text-center transition-all shadow-sm ${
                  isActive
                    ? "border-[#991b1b] bg-[#991b1b] text-white shadow-md"
                    : "border-[#b8860b] bg-[#fffdf5] text-[#78350f] hover:bg-[#fef08a] hover:border-[#991b1b]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
