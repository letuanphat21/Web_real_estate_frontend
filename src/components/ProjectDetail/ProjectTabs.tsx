import { Link, useLocation, useParams } from "react-router-dom";

// Mỗi tab: trang riêng (path) hoặc cuộn tới mục (hash) trong trang tổng quan dự án
type Tab = { label: string; path?: string; hash?: string };

const TABS: Tab[] = [
  { label: "Tổng quan", path: "" },
  { label: "Vị trí", path: "/location" },
  { label: "Phân khu", path: "/zones" },
  { label: "Mặt bằng quỹ căn", path: "/floor-plans" },
  { label: "Quỹ căn", path: "/inventory" },
  { label: "Ảnh 360°", hash: "anh-360" },
  { label: "Chính sách bán hàng", path: "/policy" },
  { label: "Tiến độ", path: "/progress" },
  { label: "Tài liệu", path: "/documents" },
  { label: "Tin tức", path: "/news" },
];

export default function ProjectTabs({ activeHash }: { activeHash?: string }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const base = `/projects/${id}`;

  const isActive = (t: Tab) => {
    if (t.hash) return pathname === base && activeHash === t.hash;
    if (!t.path) return pathname === base && !activeHash;
    return pathname === base + (t.path ?? "");
  };

  return (
    <div className="sticky top-20 z-40 border-b border-line bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex gap-7 overflow-x-auto">
          {TABS.map((t) => {
            const to = t.hash ? `${base}#${t.hash}` : base + (t.path ?? "");
            const active = isActive(t);
            return (
              <Link
                key={t.label}
                to={to}
                className={`whitespace-nowrap border-b-2 py-4 text-[13px] font-medium ${
                  active ? "border-primary-600 text-primary-600" : "border-transparent text-body hover:text-primary-600"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
