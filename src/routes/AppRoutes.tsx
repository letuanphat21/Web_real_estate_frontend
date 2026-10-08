import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetail/ProjectDetailPage";
import ProjectLocationPage from "../pages/ProjectDetail/ProjectLocationPage";
import ProjectZonesPage from "../pages/ProjectDetail/ProjectZonesPage";
import ProjectFloorPlanPage from "../pages/ProjectDetail/ProjectFloorPlanPage";
import ProjectInventoryPage from "../pages/ProjectDetail/ProjectInventoryPage";
import ProjectPolicyPage from "../pages/ProjectDetail/ProjectPolicyPage";
import ProjectProgressPage from "../pages/ProjectDetail/ProjectProgressPage";
import ProjectDocumentsPage from "../pages/ProjectDetail/ProjectDocumentsPage";
import ProjectNewsPage from "../pages/ProjectDetail/ProjectNewsPage";
import EventsPage from "../pages/Event/EventsPage";
import KnowledgePage from "../pages/Knowledge/KnowledgePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import MyBookingsPage from "../pages/Account/MyBookingsPage";
import FavoritesPage from "../pages/Account/FavoritesPage";
import ApplicationHistoryPage from "../pages/Account/ApplicationHistoryPage";
import NotificationsPage from "../pages/Account/NotificationsPage";
import SavedJobsPage from "../pages/Account/SavedJobsPage";
import RecruitmentPage from "../pages/Recruitment/RecruitmentPage";
import CvBuilderPage from "../pages/CvBuilder/CvBuilderPage";
import JobDetailPage from "../pages/JobDetail/JobDetailPage";
import UserLayout from "../layouts/UserLayout";
import EventDetailPage from "../pages/Event/EventDetailPage";
import AccountLayout from "../layouts/AccountLayout";
import NewsPage from "../pages/News/NewsPage";
import NewsDetailPage from "../pages/News/NewsDetailPage";
import SocialPage from "../pages/Social/SocialPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/:id/location" element={<ProjectLocationPage />} />
        <Route path="/projects/:id/zones" element={<ProjectZonesPage />} />
        <Route path="/projects/:id/floor-plans" element={<ProjectFloorPlanPage />} />
        <Route path="/projects/:id/inventory" element={<ProjectInventoryPage />} />
        <Route path="/projects/:id/policy" element={<ProjectPolicyPage />} />
        <Route path="/projects/:id/progress" element={<ProjectProgressPage />} />
        <Route path="/projects/:id/documents" element={<ProjectDocumentsPage />} />
        <Route path="/projects/:id/news" element={<ProjectNewsPage />} />
           <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/jobs" element={<RecruitmentPage />} />
        <Route path="/jobs/create-cv" element={<CvBuilderPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        {/* Các trang cần đăng nhập: chưa đăng nhập → về /login */}
        <Route element={<ProtectedRoute />}>
          {/* BE yêu cầu đăng nhập mới xem được bài viết cộng đồng */}
          <Route path="/social" element={<SocialPage />} />
          {/* Trang tài khoản: nằm trong UserLayout để có Header/Footer, AccountLayout thêm sidebar */}
          <Route element={<AccountLayout />}>
            <Route path="/account/bookings" element={<MyBookingsPage />} />
            <Route path="/account/favorites" element={<FavoritesPage />} />
            <Route path="/applications" element={<ApplicationHistoryPage />} />
            <Route path="/account/saved-jobs" element={<SavedJobsPage />} />
            <Route path="/account/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
