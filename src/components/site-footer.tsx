import VisitorStats from "./visitor-stats.tsx";

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-[#b8860b] bg-[#881337] px-4 py-8 text-center font-sans text-[#fef9c3] shadow-inner">
      <div className="mx-auto max-w-4xl space-y-3">
        <VisitorStats />
        <div className="mx-auto my-3 h-px max-w-2xl bg-[#fef08a]/30" />
        
        {/* Tiêu đề chân trang rõ nét, trang trọng, không bị lỗi font */}
        <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base font-extrabold tracking-wide text-white uppercase leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Cổng Tra Cứu Địa Danh Hành Chính Nghệ An Sau Sáp Nhập
        </p>
        
        <p className="text-xs sm:text-sm text-[#fef9c3]/90">
          © {new Date().getFullYear()} · Dữ liệu tổng hợp theo Nghị quyết số 1678/NQ-UBTVQH15
        </p>
        <p className="text-[11px] sm:text-xs text-[#fef08a]/85">
          Số liệu lấy tại thời điểm ban hành Nghị quyết số 1678/NQ-UBTVQH15, số liệu thực tế hiện tại có thể thay đổi.
        </p>
        <p className="mx-auto max-w-3xl text-[11px] sm:text-xs leading-relaxed text-[#fef9c3]/80 text-justify">
          Khuyến cáo: Trang web phục vụ người dân tra khảo đơn vị hành chính sau sáp nhập, không vì mục đích lợi nhuận. Thông tin chỉ mang tính tham khảo, không có giá trị pháp lý; người sử dụng tự chịu trách nhiệm khi sử dụng và đối chiếu với văn bản chính thức của cơ quan nhà nước có thẩm quyền. Chúng tôi miễn trừ mọi trách nhiệm phát sinh từ việc sử dụng thông tin trên trang này.
        </p>
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-black/30 px-5 py-1.5 text-xs sm:text-sm font-medium text-white border border-[#fef08a]/25 shadow-sm">
            <span>Phần mềm được xây dựng và phát triển bởi</span>
            <span className="font-bold text-[#fef08a]">Hồ Nam Tấn</span>
            <span className="text-[#fef08a]/60">·</span>
            <span>Điện thoại:</span>
            <a href="tel:0914587575" className="font-bold text-[#fde047] hover:underline">
              0914 58 75 75
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
