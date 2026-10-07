import { Link, NavLink } from "react-router-dom";
import { Plus } from "lucide-react";
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

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="NovaLand Hub"
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div className="text-xl font-medium tracking-tight">
            <span className="text-heading">Đất Việt</span>
            <span className="ml-1.5 text-primary-600">Group</span>
          </div>
        </Link>

        {/* 2. Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative flex flex-col items-center font-medium transition-colors ${
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

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-line px-6 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-primary-50 hover:text-primary-600"
          >
            Đăng nhập
          </Link>
          <Link
            to="/dang-tin"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-95 hover:shadow-md"
          >
            Đăng tin
            <Plus size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
