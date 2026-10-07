import { Navigate, useLocation } from "react-router-dom";
import ToastProvider from "../../components/common/Toast";
import CvBuilderProvider from "../../components/CvBuilder/CvBuilderProvider";
import CvBuilderWorkspace from "../../components/CvBuilder/CvBuilderWorkspace";
import { useAuth } from "../../store/authStore";

const TITLE = "Tạo CV bất động sản | NovaLand Hub";

export default function CvBuilderPage() {
  const { user } = useAuth();
  const { pathname, search } = useLocation();

  // Trang cần đăng nhập: chưa đăng nhập thì chuyển sang /login và quay lại sau
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(pathname + search)}`} replace />;

  return (
    <>
      <title>{TITLE}</title>
      <meta name="robots" content="noindex" />

      <ToastProvider>
        <CvBuilderProvider>
          <CvBuilderWorkspace />
        </CvBuilderProvider>
      </ToastProvider>
    </>
  );
}
