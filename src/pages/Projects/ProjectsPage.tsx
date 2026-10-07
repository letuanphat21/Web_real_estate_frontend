import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
  Heart,
  MapPin,
  Building2,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";

// TODO: thay bằng dữ liệu gọi từ API
const PROJECTS = [
  { id: 1, name: "The Lumière Riverside", investor: "Masterise Homes", location: "Thảo Điền, TP. Thủ Đức", type: "Căn hộ cao cấp", tag: "Đang mở bán", price: "Từ 74,5 triệu/m²", progress: 78, note: "Bàn giao 2027", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
  { id: 2, name: "Aurora Bay Residences", investor: "Keppel Land", location: "Thủ Thiêm, TP. Thủ Đức", type: "Căn hộ view sông", tag: "Sắp mở bán", price: "Từ 5,8 tỷ/căn", progress: 55, note: "Cất nóc 04/2026", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { id: 3, name: "Maison Heritage", investor: "SonKim Land", location: "Quận 3, TP. Hồ Chí Minh", type: "Căn hộ boutique", tag: "Đang nhận giữ chỗ", price: "Từ 12,8 tỷ/căn", progress: 42, note: "Đang thi công", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" },
  { id: 4, name: "Grand Marina Saigon", investor: "Masterise Homes", location: "Bến Nghé, Quận 1", type: "Căn hộ hạng sang", tag: "Còn ít suất đẹp", price: "Từ 19 tỷ/căn", progress: 90, note: "Bàn giao 2026", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { id: 5, name: "The Zenity", investor: "CapitaLand Development", location: "Cô Giang, Quận 1", type: "Căn hộ cao cấp", tag: "Đang mở bán", price: "Từ 6,9 tỷ/căn", progress: 65, note: "Hoàn thiện mặt ngoài", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: 6, name: "The Metropole Thủ Thiêm", investor: "SonKim Land", location: "Thủ Thiêm, TP. Thủ Đức", type: "Căn hộ & shophouse", tag: "Mở bán đợt mới", price: "Từ 100 triệu/m²", progress: 70, note: "Hoàn thiện mặt ngoài", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
];

const ACTIVE_FILTERS = ["TP. Hồ Chí Minh", "Căn hộ", "Đang mở bán"];
const PAGES = [1, 2, 3, 4, "...", 12] as const;

type SelectProps = { label: string; value?: string; placeholder?: string; active?: boolean };

function Select({ label, value, placeholder, active }: SelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-muted">{label}</label>
      <button
        type="button"
        className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm ${
          active ? "border-primary-300 text-heading" : "border-line text-muted"
        }`}
      >
        {value || placeholder}
        <ChevronDown size={16} className="text-body" />
      </button>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100">
      <div className="relative h-52 overflow-hidden">
        <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-medium text-primary-700">
          {project.tag}
        </span>
        <button
          aria-label="Yêu thích"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-body hover:text-primary-600"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-heading">{project.name}</h3>
        <p className="mt-1 text-xs text-muted">
          Chủ đầu tư: <span className="font-medium text-primary-700">{project.investor}</span>
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-body">
          <MapPin size={14} className="text-muted" /> {project.location}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
          <Building2 size={14} className="text-muted" /> {project.type}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-muted">Khoảng giá</span>
          <span className="font-semibold text-accent">{project.price}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
          <span>Tiến độ</span>
          <span>{project.note}</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${project.progress}%` }} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Cập nhật hôm nay
          </span>
          <Link to={`/du-an/${project.id}`} className="flex items-center gap-1 font-semibold text-primary-700 hover:text-primary-600">
            Xem chi tiết <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filters, setFilters] = useState(ACTIVE_FILTERS);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div>
      {/* Hero + bộ lọc */}
      <section className="bg-gradient-to-b from-primary-100 to-primary-50 pb-10 pt-6">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="text-xs text-muted">
            Trang chủ <span className="mx-1.5">›</span>
            <span className="text-primary-600">Dự án</span>
          </nav>
          <h1 className="mt-5 text-4xl font-extrabold uppercase tracking-tight text-heading">
            Khám phá dự án bất động sản
          </h1>
          <p className="mt-3 max-w-xl text-sm text-body">
            Dữ liệu xác thực, tiến độ minh bạch và lựa chọn phù hợp — giúp bạn tìm đúng dự án chỉ trong vài phút.
          </p>

          <div className="mt-8 rounded-2xl border border-primary-200 bg-white/80 p-5 shadow-lg shadow-primary-100 backdrop-blur">
            <div className="flex h-12 items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4">
              <Search size={16} className="text-primary-500" />
              <input
                placeholder='Nhập tên dự án hoặc từ khóa, ví dụ "căn hộ ven sông"'
                className="flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line bg-white px-1.5 py-0.5 text-[10px] text-muted">⌘ K</kbd>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <Select label="Chủ đầu tư" placeholder="Tất cả chủ đầu tư" />
              <Select label="Khu vực" value="TP. Hồ Chí Minh" active />
              <Select label="Loại hình" value="Căn hộ" active />
              <Select label="Trạng thái" value="Đang mở bán" active />
              <div className="flex items-end">
                <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white hover:opacity-95 lg:w-auto">
                  Tìm kiếm <Search size={15} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>Đang lọc:</span>
              {filters.map((f) => (
                <span key={f} className="flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-medium text-primary-700">
                  {f}
                  <button aria-label={`Bỏ ${f}`} onClick={() => setFilters(filters.filter((x) => x !== f))}>
                    <X size={11} />
                  </button>
                </span>
              ))}
              <button onClick={() => setFilters([])} className="ml-auto flex items-center gap-1 text-primary-600 hover:text-primary-700">
                <RotateCcw size={12} /> Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kết quả */}
      <section className="bg-gradient-to-b from-primary-50 to-primary-100 pb-16 pt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-heading">126 dự án phù hợp</h2>
              <p className="mt-1 text-xs text-body">Tại TP. Hồ Chí Minh · Căn hộ · Đang mở bán</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 text-xs text-body">
                Sắp xếp: <span className="font-medium text-heading">Phù hợp nhất</span> <ChevronDown size={14} />
              </button>
              <div className="flex rounded-lg border border-line bg-white p-0.5">
                {([["grid", LayoutGrid], ["list", List]] as const).map(([key, Icon]) => (
                  <button
                    key={key}
                    aria-label={key}
                    onClick={() => setView(key)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md ${
                      view === key ? "bg-primary-100 text-primary-600" : "text-muted"
                    }`}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`mt-6 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs">
            <button aria-label="Trang trước" onClick={() => setPage(Math.max(1, page - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted">
              <ChevronLeft size={14} />
            </button>
            {PAGES.map((n, i) =>
              n === "..." ? (
                <span key={i} className="px-1 text-muted">...</span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    page === n ? "bg-accent text-white" : "text-body hover:bg-white"
                  }`}
                >
                  {n}
                </button>
              )
            )}
            <button aria-label="Trang sau" onClick={() => setPage(Math.min(12, page + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-body">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
