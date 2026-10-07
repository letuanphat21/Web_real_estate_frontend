import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function UserLayout() {
  // Trang tạo CV là màn hình làm việc toàn khung, không hiển thị Footer
  const hideFooter = useLocation().pathname.startsWith("/tuyen-dung/tao-cv");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
