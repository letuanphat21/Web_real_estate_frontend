import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  BookmarkCheck,
  Briefcase,
  CalendarCheck,
  FileText,
  Heart,
  User,
} from "lucide-react";
import useSavedJobs from "../../components/Recruitment/useSavedJobs";
import useUnreadNotificationCount from "../../components/Notification/useUnreadNotificationCount";
import authService from "../../services/auth/authService";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  useAppSelector,
} from "../../store";
import { initials, roleLabel } from "../../utils/user";

const ACCOUNT_MENU = [
  { to: "/account", icon: User, label: "Hồ sơ cá nhân", count: 0 },
  {
    to: "/account/favorites",
    icon: Heart,
    label: "Bất động sản đã lưu",
    count: 0,
  },
  {
    to: "/account/my-listings",
    icon: FileText,
    label: "Tin đã đăng",
    count: 3,
  },
  {
    to: "/account/saved-jobs",
    icon: BookmarkCheck,
    label: "Tin tuyển dụng đã lưu",
    count: 0,
  },
  {
    to: "/account/bookings",
    icon: CalendarCheck,
    label: "Danh sách booking",
    count: 0,
  },
  {
    to: "/applications",
    icon: Briefcase,
    label: "Lịch sử ứng tuyển",
    count: 0,
  },
  { to: "/account/notifications", icon: Bell, label: "Thông báo", count: 6 },
];

/**
 * Toàn bộ state/logic của Header: người dùng đang đăng nhập (lấy từ store,
 * do GET /users/me nạp vào), dropdown tài khoản, ngăn thông báo và đăng xuất.
 * Header chỉ việc render.
 */
export default function useHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const { savedIds } = useSavedJobs();
  const unreadNotifications = useUnreadNotificationCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click ra ngoài thì đóng dropdown tài khoản
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Menu mobile đang mở: khoá cuộn trang, Esc để đóng
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openNotif = useCallback(() => setNotifOpen(true), []);
  const closeNotif = useCallback(() => setNotifOpen(false), []);

  const logout = useCallback(async () => {
    setMenuOpen(false);
    setMobileOpen(false);
    await authService.logout();
    navigate("/login", { replace: true });
  }, [navigate]);

  // Số đếm của menu lấy theo dữ liệu thật, đồng thời đánh dấu mục đang mở
  const accountMenu = useMemo(
    () =>
      ACCOUNT_MENU.map((item) => ({
        ...item,
        active: pathname === item.to,
        count:
          item.to === "/account/saved-jobs"
            ? savedIds.length
            : item.to === "/account/notifications"
            ? unreadNotifications
            : item.count,
      })),
    [pathname, savedIds.length, unreadNotifications]
  );

  return {
    // null khi chưa đăng nhập hoặc chưa nạp được /users/me
    user: isAuthenticated && user ? user : null,
    initials: user ? initials(user.fullName) : "",
    roleLabel: user ? roleLabel(user.role) : "",
    accountMenu,
    menuRef,
    menuOpen,
    toggleMenu,
    closeMenu,
    notifOpen,
    openNotif,
    closeNotif,
    logout,
    mobileOpen,
    openMobile,
    closeMobile,
  };
}

export type HeaderController = ReturnType<typeof useHeader>;
