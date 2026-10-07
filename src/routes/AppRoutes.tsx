import { Routes, Route, Navigate } from "react-router-dom";
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
import UserLayout from "../layouts/UserLayout";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
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
