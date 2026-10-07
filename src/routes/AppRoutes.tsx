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
import RecruitmentPage from "../pages/Recruitment/RecruitmentPage";
import CvBuilderPage from "../pages/CvBuilder/CvBuilderPage";
import JobDetailPage from "../pages/JobDetail/JobDetailPage";
import UserLayout from "../layouts/UserLayout";
import EventDetailPage from "../pages/Event/EventDetailPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/kien-thuc" element={<KnowledgePage />} />
        <Route path="/tai-khoan/booking" element={<MyBookingsPage />} />
        <Route path="/tai-khoan/quan-tam" element={<FavoritesPage />} />
        <Route path="/tuyen-dung" element={<RecruitmentPage />} />
        <Route path="/tuyen-dung/tao-cv" element={<CvBuilderPage />} />
        <Route path="/tuyen-dung/:slugId" element={<JobDetailPage />} />
        <Route path="/du-an" element={<ProjectsPage />} />
        <Route path="/du-an/:id" element={<ProjectDetailPage />} />
        <Route path="/du-an/:id/vi-tri" element={<ProjectLocationPage />} />
        <Route path="/du-an/:id/phan-khu" element={<ProjectZonesPage />} />
        <Route path="/du-an/:id/mat-bang" element={<ProjectFloorPlanPage />} />
        <Route path="/du-an/:id/quy-can" element={<ProjectInventoryPage />} />
        <Route path="/du-an/:id/chinh-sach" element={<ProjectPolicyPage />} />
        <Route path="/du-an/:id/tien-do" element={<ProjectProgressPage />} />
        <Route path="/du-an/:id/tai-lieu" element={<ProjectDocumentsPage />} />
        <Route path="/du-an/:id/tin-tuc" element={<ProjectNewsPage />} />
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
