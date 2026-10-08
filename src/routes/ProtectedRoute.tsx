import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectAuthStatus, useAppSelector } from "../store";

/**
 Bọc các route cần đăng nhập.
 Đang khôi phục phiên (idle/checking) thì chờ, chưa vội đá về login
 vì có thể cookie refreshToken vẫn còn hạn.
 */
export default function ProtectedRoute() {
  const status = useAppSelector(selectAuthStatus);
  const { pathname, search } = useLocation();

  if (status === "idle" || status === "checking") return null;

  if (status === "unauthenticated") {
    // Lưu trang hiện tại để đăng nhập xong quay lại đúng chỗ
    const redirect = encodeURIComponent(pathname + search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}
