import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import SiteHeader from "@/components/site-header.tsx";
import SiteFooter from "@/components/site-footer.tsx";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfaf5]">
      <SiteHeader />
      <div className="my-auto py-16 text-center space-y-5 px-4 font-sans">
        <h1 className="text-7xl font-extrabold text-[#991b1b]">404</h1>
        <h2 className="text-2xl font-bold text-[#1e293b]">Trang không tồn tại</h2>
        <p className="text-base text-[#64748b] max-w-md mx-auto font-sans">
          Địa chỉ bạn đang tìm kiếm không tồn tại hoặc đã được thay đổi trong hệ thống.
        </p>
        <div className="pt-2">
          <Button asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              Quay về trang chủ tra cứu
            </Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
