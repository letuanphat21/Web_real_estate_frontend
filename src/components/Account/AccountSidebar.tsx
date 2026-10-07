import { NavLink } from "react-router-dom";
import { ArrowUpRight, Bell, Briefcase, FileText, Headphones, Heart, User, type LucideIcon } from "lucide-react";
import type { AccountSummary } from "../../types/applicationHistory.types";

const NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/account", label: "Hồ sơ cá nhân", icon: User },
  { to: "/account/favorites", label: "Bất động sản đã lưu", icon: Heart },
  { to: "/account/my-listings", label: "Tin đã đăng", icon: FileText },
  { to: "/account/applications", label: "Lịch sử ứng tuyển", icon: Briefcase },
  { to: "/account/notifications", label: "Thông báo", icon: Bell },
];

/** Thanh bên khu vực Tài khoản: thẻ người dùng, menu và hỗ trợ. Dưới desktop menu cuộn ngang. */
export default function AccountSidebar({ account }: { account: AccountSummary }) {
  return (
    <aside className="min-w-0 rounded-3xl border border-line bg-white p-3 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 p-4 text-white shadow-lg shadow-primary-300/40">
        <img
          src={account.avatarUrl}
          alt={`Ảnh đại diện ${account.fullName}`}
          className="h-12 w-12 shrink-0 rounded-full border-2 border-white/60 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{account.fullName}</p>
          <p className="truncate text-xs text-white/80">{account.email}</p>
        </div>
      </div>

      <nav aria-label="Menu tài khoản" className="mt-3">
        <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to} className="shrink-0">
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-primary-600 ${
                    isActive ? "bg-primary-50 font-medium text-primary-700" : "text-body hover:bg-primary-50/60"
                  }`
                }
              >
                <Icon size={16} aria-hidden /> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="tel:19008686"
        className="mt-3 hidden items-center gap-3 rounded-2xl border border-line p-3 transition hover:border-primary-300 lg:flex"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Headphones size={16} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-heading">Cần hỗ trợ?</span>
          <span className="block text-xs text-body">Hotline 1900 8686</span>
        </span>
        <ArrowUpRight size={14} className="text-primary-600" aria-hidden />
      </a>
    </aside>
  );
}
