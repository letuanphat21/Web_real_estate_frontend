import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function UserLayout() {
  const { pathname } = useLocation();
  // Trang chủ mở đầu bằng hero 3D toàn màn hình: header nằm đè lên (trong suốt) thay vì chiếm chỗ
  const overlayHeader = pathname === "/";
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header overlay={overlayHeader} />
      <main className="flex-grow">
        {/* key theo đường dẫn: mỗi lần sang trang nội dung hiện dần lại */}
        <div key={pathname} className="animate-page-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
