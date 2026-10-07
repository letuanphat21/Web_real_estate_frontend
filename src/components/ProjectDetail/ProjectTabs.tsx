import { Link, useLocation, useParams } from "react-router-dom";

// Mỗi tab: trang riêng (path) hoặc cuộn tới mục (hash) trong trang tổng quan dự án
type Tab = { label: string; path?: string; hash?: string };

const TABS: Tab[] = [
  { label: "Tổng quan", path: "" },
  { label: "Vị trí", path: "/vi-tri" },
  { label: "Phân khu", path: "/phan-khu" },
  { label: "Mặt bằng quỹ căn", path: "/mat-bang" },
  { label: "Quỹ căn", path: "/quy-can" },
  { label: "Ảnh 360°", hash: "anh-360" },
  { label: "Chính sách bán hàng", path: "/chinh-sach" },
  { label: "Tiến độ", path: "/tien-do" },
  { label: "Tài liệu", path: "/tai-lieu" },
  { label: "Tin tức", path: "/tin-tuc" },
];

export default function ProjectTabs({ activeHash }: { activeHash?: string }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const base = `/du-an/${id}`;

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
