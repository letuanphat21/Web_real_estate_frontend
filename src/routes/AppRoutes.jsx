import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import UserLayout from "../layouts/UserLayout";
import EventsPage from "../pages/Event/EventsPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
