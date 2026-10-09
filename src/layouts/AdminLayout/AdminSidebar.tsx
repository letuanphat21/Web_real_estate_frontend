import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Newspaper, Bell, Settings, UserRound, Building2, Users, ChevronDown, X, type LucideIcon,
} from "lucide-react";

type Leaf = { label: string; to: string };
type Item = { label: string; icon: LucideIcon; to?: string; children?: Leaf[] };

const MENU: Item[] = [
  { label: "Tổng quan", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Quản lý tin tức", icon: Newspaper, to: "/admin/news" },
  {
    label: "Thông báo", icon: Bell,
    children: [
      { label: "Quản lý thông báo", to: "/admin/notifications" },
      { label: "Loại thông báo", to: "/admin/notification-types" },
    ],
  },
  {
    label: "Hệ thống", icon: Settings,
    children: [
      { label: "Quản lý người dùng", to: "/admin/users" },
      { label: "Quản lý tài liệu", to: "/admin/documents" },
      { label: "Quản lý chat bot", to: "/admin/chatbot" },
    ],
  },
  {
    label: "Tuyển dụng", icon: UserRound,
    children: [
      { label: "Quản lý ứng viên", to: "/admin/candidates" },
      { label: "Quản lý CV", to: "/admin/cvs" },
      { label: "Quản lý template CV", to: "/admin/cv-templates" },
      { label: "Duyệt tin tuyển dụng", to: "/admin/job-approvals" },
    ],
  },
  {
    label: "Dự án", icon: Building2,
    children: [
      { label: "Quản lý dự án", to: "/admin/projects" },
      { label: "Quỹ căn", to: "/admin/properties" },
      { label: "Quản lý ảnh dự án", to: "/admin/project-images" },
    ],
  },
  { label: "Cộng đồng", icon: Users, children: [{ label: "Quản lý bài đăng", to: "/admin/posts" }] },
];

const linkClass = (active: boolean) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-primary-600 ${
    active ? "bg-primary-50 font-semibold text-primary-700" : "text-heading hover:bg-primary-50/70"
  }`;

type Props = { open: boolean; onClose: () => void };

export default function AdminSidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();
  // Nhóm chứa trang đang xem mặc định được mở
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const isOpen = (item: Item) =>
    collapsed[item.label] ?? true;

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-footer/50 lg:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-line bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Điều hướng quản trị"
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
              <LayoutDashboard size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-heading">DAT VIET GROUP</p>
              <p className="text-[9px] uppercase tracking-widest text-muted">Admin</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Đóng menu" className="rounded-full p-2 text-body hover:bg-primary-50 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 pb-8">
          {MENU.map((item) => {
            const Icon = item.icon;
            if (!item.children) {
              return (
                <NavLink key={item.label} to={item.to!} onClick={onClose} className={({ isActive }) => linkClass(isActive)}>
                  <Icon size={20} /> {item.label}
                </NavLink>
              );
            }
            const expanded = isOpen(item);
            const groupActive = item.children.some((c) => pathname.startsWith(c.to));
            return (
              <div key={item.label}>
                <button
                  onClick={() => setCollapsed((s) => ({ ...s, [item.label]: !expanded }))}
                  aria-expanded={expanded}
                  className={`${linkClass(false)} w-full ${groupActive ? "font-semibold" : ""}`}
                >
                  <Icon size={20} /> <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown size={16} className={`transition ${expanded ? "" : "-rotate-90"}`} />
                </button>
                {expanded && (
                  <ul className="ml-[22px] mt-1 space-y-0.5 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink
                          to={c.to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition ${
                              isActive ? "bg-primary-50 font-semibold text-primary-700" : "text-body hover:text-primary-600"
                            }`
                          }
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-300" /> {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
