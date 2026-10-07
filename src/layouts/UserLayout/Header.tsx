import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  FileText,
  Heart,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { clearSession, useAuth } from "../../store/authStore";
import logo from "../../assets/images/logo.jpg";

const NAV_ITEMS = [
  { label: "Giới thiệu", path: "/" },
  { label: "Dự án", path: "/du-an" },
  { label: "Sự kiện", path: "/events" },
  { label: "Tin tức", path: "/tin-tuc" },
  { label: "Kiến thức", path: "/kien-thuc" },
  { label: "Cộng đồng", path: "/cong-dong" },
  { label: "Tuyển dụng", path: "/tuyen-dung" },
];

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

// TODO: số lượng lấy từ API (tin đã đăng, thông báo chưa đọc)
const ACCOUNT_MENU = [
  { to: "/tai-khoan", icon: User, label: "Hồ sơ cá nhân", count: 0 },
  {
    to: "/tai-khoan/tin-da-dang",
    icon: FileText,
    label: "Tin đã đăng",
    count: 3,
  },
  {
    to: "/tai-khoan/quan-tam",
    icon: Heart,
    label: "Bất động sản đã lưu",
    count: 0,
  },
  {
    to: "/tai-khoan/ung-tuyen",
    icon: Briefcase,
    label: "Lịch sử ứng tuyển",
    count: 0,
  },
  { to: "/tai-khoan/thong-bao", icon: Bell, label: "Thông báo", count: 6 },
];

function UserMenu() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!user) return null;

  const logout = () => {
    clearSession();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        aria-label="Tìm kiếm"
        className="flex h-9 w-9 items-center justify-center rounded-full text-heading hover:bg-primary-50 hover:text-primary-600"
      >
        <Search size={18} />
      </button>
      <button
        aria-label="Thông báo"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-heading hover:bg-primary-50 hover:text-primary-600"
      >
        <Bell size={17} />
      </button>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 shadow-sm hover:border-primary-300"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
              {initials(user.fullName)}
            </span>
          )}
          <span className="hidden text-left leading-tight lg:block">
            <span className="block max-w-[120px] truncate text-[13px] font-semibold text-heading">
              {user.fullName}
            </span>
            <span className="block whitespace-nowrap text-[11px] text-body">
              Tài khoản cá nhân
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`text-body transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2.5 w-[264px] rounded-2xl border border-line bg-white p-1.5 shadow-xl shadow-primary-200/60">
            <span className="absolute -top-1.5 right-12 h-3 w-3 rotate-45 border-l border-t border-line bg-white" />

            <div className="rounded-xl bg-primary-50 p-3">
              <div className="flex items-center gap-2.5">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white">
                    {initials(user.fullName)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-heading">
                      {user.fullName}
                    </p>
                    <span className="shrink-0 rounded-full bg-primary-100 px-2 py-0.5 text-[9px] font-semibold text-primary-700">
                      Thành viên
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-body">
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                to="/tai-khoan"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 hover:text-primary-700"
              >
                Xem hồ sơ <ArrowUpRight size={12} />
              </Link>
            </div>

            <ul className="mt-1.5 space-y-px">
              {ACCOUNT_MENU.map(({ to, icon: Icon, label, count }) => {
                const active = pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] ${
                        active
                          ? "bg-primary-50 font-semibold text-primary-600"
                          : "font-medium text-heading hover:bg-primary-50"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          active ? "bg-primary-100" : "bg-primary-50"
                        }`}
                      >
                        <Icon
                          size={14}
                          className={
                            active ? "text-primary-600" : "text-heading"
                          }
                        />
                      </span>
                      {label}
                      {count ? (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-100 px-1.5 text-[10px] font-semibold text-primary-700">
                          {count}
                        </span>
                      ) : (
                        <ChevronRight
                          size={13}
                          className={`ml-auto ${
                            active ? "text-primary-600" : "text-muted"
                          }`}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-1.5 h-px bg-line" />
            <button
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-xl bg-danger/10 px-2.5 py-2 text-[13px] font-semibold text-danger hover:bg-danger/15"
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <LogOut size={14} />
              </span>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 lg:px-6 xl:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="NovaLand Hub"
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div className="whitespace-nowrap text-base font-medium tracking-tight xl:text-xl">
            <span className="text-heading">Đất Việt</span>
            <span className="ml-1.5 text-primary-600">Group</span>
          </div>
        </Link>

        {/* 2. Menu */}
        <nav className="hidden items-center gap-4 text-sm lg:flex xl:gap-7 xl:text-base">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative flex flex-col items-center whitespace-nowrap font-medium transition-colors ${
                  isActive
                    ? "text-primary-600"
                    : "text-body hover:text-primary-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-2 h-0.5 w-6 rounded-full bg-primary-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-medium text-heading transition-colors xl:px-6 xl:py-2.5 hover:bg-primary-50 hover:text-primary-600"
            >
              Đăng nhập
            </Link>
          )}
          <Link
            to="/dang-tin"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-4 py-2 text-sm font-medium text-white transition-all xl:px-6 xl:py-2.5 hover:opacity-95 hover:shadow-md"
          >
            Đăng tin
            <Plus size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
