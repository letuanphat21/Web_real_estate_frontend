import { NavLink, Outlet } from "react-router-dom";
import { User, Heart, FileText, CalendarCheck, Briefcase, Bell, BookmarkCheck } from "lucide-react";
import { CURRENT_USER } from "../../data/mockAccount";

const MENU = [
  { to: "/account", icon: User, label: "Hồ sơ cá nhân", end: true },
  { to: "/account/favorites", icon: Heart, label: "Bất động sản đã lưu" },
  { to: "/account/my-listings", icon: FileText, label: "Tin đã đăng" },
  { to: "/account/saved-jobs", icon: BookmarkCheck, label: "Tin tuyển dụng đã lưu" },
  { to: "/account/bookings", icon: CalendarCheck, label: "Danh sách booking" },
  { to: "/account/applications", icon: Briefcase, label: "Lịch sử ứng tuyển" },
  { to: "/account/notifications", icon: Bell, label: "Thông báo" },
];

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(-2).map((w) => w[0]?.toUpperCase()).join("");

// Khung trang tài khoản: sidebar bên trái + nội dung (Outlet) bên phải
export default function AccountLayout() {
  const user = CURRENT_USER;

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto grid items-start gap-8 px-4 lg:grid-cols-[256px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-3xl border border-line bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 p-3.5 text-white shadow-lg shadow-primary-200">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full border-2 border-white/60 object-cover" />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-white/20 text-sm font-bold">
                {initials(user.fullName)}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.fullName}</p>
              <p className="text-[11px] text-white/80">Tài khoản cá nhân</p>
            </div>
          </div>

          <div className="my-5 h-px bg-line" />

          <nav className="space-y-1">
            {MENU.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm ${
                    isActive ? "bg-primary-50 font-semibold text-primary-700" : "text-heading hover:bg-primary-50/60"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-primary-600" />}
                    <Icon size={17} className={isActive ? "text-primary-600" : "text-heading"} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
