import { Link, NavLink } from "react-router-dom";
import { Plus, Search, Bell, ChevronDown, ChevronRight, LogOut, ArrowUpRight } from "lucide-react";
import NotificationDrawer from "../../components/Notification/NotificationDrawer";
import useHeader, { type HeaderController } from "./useHeader";
import useHeaderOverlay from "./useHeaderOverlay";
import type { AuthUser } from "../../types/auth/auth.types";
import logo from "../../assets/images/logo.jpg";

const NAV_ITEMS = [
  { label: "Giới thiệu", path: "/" },
  { label: "Dự án", path: "/projects" },
  { label: "Sự kiện", path: "/events" },
  { label: "Tin tức", path: "/news" },
  { label: "Cộng đồng", path: "/social" },
  { label: "Kiến thức", path: "/knowledge" },
  { label: "Tuyển dụng", path: "/jobs" },
];

function UserMenu({
  header,
  user,
  transparent,
}: {
  header: HeaderController;
  user: AuthUser;
  /** Header đang trong suốt trên hero tối → icon chuyển sang màu trắng. */
  transparent: boolean;
}) {
  const {
    initials,
    roleLabel,
    accountMenu,
    menuRef,
    menuOpen,
    toggleMenu,
    closeMenu,
    notifOpen,
    openNotif,
    closeNotif,
    logout,
  } = header;

  return (
    <div className="flex items-center gap-1.5">
      <button
        aria-label="Tìm kiếm"
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          transparent ? "text-white hover:bg-white/10" : "text-heading hover:bg-primary-50 hover:text-primary-600"
        }`}
      >
        <Search size={18} />
      </button>
      <button
        aria-label="Thông báo"
        onClick={openNotif}
        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
          transparent
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-line text-heading hover:bg-primary-50 hover:text-primary-600"
        }`}
      >
        <Bell size={17} />
      </button>
      {notifOpen && <NotificationDrawer onClose={closeNotif} />}

      <div ref={menuRef} className="relative">
        <button
          onClick={toggleMenu}
          aria-expanded={menuOpen}
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
              {initials}
            </span>
          )}
          <span className="hidden text-left leading-tight lg:block">
            <span className="block max-w-[120px] truncate text-[13px] font-semibold text-heading">
              {user.fullName}
            </span>
            <span className="block whitespace-nowrap text-[11px] text-body">
              {roleLabel}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`text-body transition ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {menuOpen && (
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
                    {initials}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-heading">
                      {user.fullName}
                    </p>
                    <span className="shrink-0 rounded-full bg-primary-100 px-2 py-0.5 text-[9px] font-semibold text-primary-700">
                      {roleLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-body">
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                to="/account"
                onClick={closeMenu}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 hover:text-primary-700"
              >
                Xem hồ sơ <ArrowUpRight size={12} />
              </Link>
            </div>

            <ul className="mt-1.5 space-y-px">
              {accountMenu.map(({ to, icon: Icon, label, count, active }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={closeMenu}
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
                        className={active ? "text-primary-600" : "text-heading"}
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
              ))}
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

type HeaderProps = {
  /** Header nằm đè lên hero toàn màn hình (trang chủ) và trong suốt khi đang ở trên hero. */
  overlay?: boolean;
};

export default function Header({ overlay = false }: HeaderProps) {
  const header = useHeader();
  const transparent = useHeaderOverlay(overlay);

  return (
    <header
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        transparent ? "border-transparent bg-transparent" : "border-line bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 lg:px-6 xl:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="NovaLand Hub"
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div className="whitespace-nowrap text-base font-medium tracking-tight xl:text-xl">
            <span className={transparent ? "text-white" : "text-heading"}>Đất Việt</span>
            <span className={`ml-1.5 ${transparent ? "text-gold-200" : "text-primary-600"}`}>Group</span>
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
                  transparent
                    ? isActive
                      ? "text-gold-200"
                      : "text-white/80 hover:text-white"
                    : isActive
                      ? "text-primary-600"
                      : "text-body hover:text-primary-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className={`absolute -bottom-2 h-0.5 w-6 rounded-full ${
                        transparent ? "bg-gold-300" : "bg-primary-600"
                      }`}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {header.user ? (
            <UserMenu header={header} user={header.user} transparent={transparent} />
          ) : (
            <Link
              to="/login"
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors xl:px-6 xl:py-2.5 ${
                transparent
                  ? "border-white/60 text-white hover:bg-white/10"
                  : "border-primary-600 text-primary-600 hover:bg-primary-50"
              }`}
            >
              Đăng nhập
            </Link>
          )}
          <Link
            to="/post-listing"
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r px-4 py-2 text-sm font-medium transition-all xl:px-6 xl:py-2.5 hover:opacity-95 hover:shadow-md ${
              transparent ? "from-gold-200 to-gold-400 text-[#1d160a]" : "from-primary-500 to-primary-700 text-white"
            }`}
          >
            Đăng tin
            <Plus size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
