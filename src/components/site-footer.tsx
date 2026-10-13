import VisitorStats from "./visitor-stats.tsx";

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-[#b8860b] bg-[#881337] px-4 py-6 text-center font-serif text-[#fef9c3] shadow-inner">
      <div className="mx-auto max-w-5xl">
        <VisitorStats />
        <div className="mx-auto my-3.5 h-px max-w-3xl bg-[#fef08a]/30" />
        <p className="whitespace-nowrap text-xs font-bold sm:text-sm tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          CỔNG TRA CỨU ĐỊA DANH HÀNH CHÍNH NGHỆ AN SAU SÁP NHẬP
        </p>
        <p className="mt-1 text-[11px] sm:text-xs text-[#fef9c3]/90">
          © {new Date().getFullYear()} · Dữ liệu tổng hợp theo Nghị quyết số 1678/NQ-UBTVQH15
        </p>
        <p className="mt-1 text-[11px] text-[#fef08a]/80">
          Số liệu lấy tại thời điểm ban hành Nghị quyết số 1678/NQ-UBTVQH15, số liệu thực tế hiện tại có thể thay đổi.
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-[11px] leading-relaxed text-[#fef9c3]/75">
          Khuyến cáo: Trang web phục vụ người dân tra khảo đơn vị hành chính sau sáp nhập, không vì mục đích lợi nhuận.
          Thông tin chỉ mang tính tham khảo, không có giá trị pháp lý; người sử dụng tự chịu trách nhiệm khi sử dụng
          và đối chiếu với văn bản chính thức của cơ quan nhà nước có thẩm quyền. Chúng tôi miễn trừ mọi trách nhiệm
          phát sinh từ việc sử dụng thông tin trên trang này.
        </p>
        <div className="mt-3 inline-block rounded-full bg-black/25 px-4 py-1 text-xs font-semibold text-white border border-[#fef08a]/20">
          Phần mềm được xây dựng và phát triển bởi <span className="text-[#fef08a] font-bold">Hồ Nam Tấn</span> · Điện thoại: <a href="tel:0914587575" className="text-[#fde047] hover:underline font-bold">0914 58 75 75</a>
        </div>
      </div>
    </footer>
  );
}
