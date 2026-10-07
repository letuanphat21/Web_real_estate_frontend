import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, ChevronDown, Building2, Newspaper, Search, ArrowUpDown, ArrowRight, Layers } from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";

// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng news + category_new)
const PROJECT = {
  name: "Aurelia Riverside",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
};
const IMG = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`;

const POSTS = [
  { id: 1, category: "Tiến độ", title: "Cập nhật tiến độ tháng 10/2026: Hai tháp vượt cao độ kế hoạch", summary: "Công trường đạt 68% tổng thể, triển khai đồng thời kết cấu tầng 30, mặt dựng và hệ MEP.", date: "01/10/2026", read: 5, image: IMG("photo-1541888946425-d81bb19240f5") },
  { id: 2, category: "Sự kiện", title: "Không gian trải nghiệm Aurelia Riverside chính thức mở cửa cuối tuần này", summary: "Khách mời tham quan sa bàn tương tác, căn hộ mẫu và nhận tư vấn riêng theo nhu cầu.", date: "28/09/2026", read: 4, image: IMG("photo-1511578314322-379afb476865") },
  { id: 3, category: "Chính sách", title: "Ưu đãi thanh toán sớm đến 10% cho bộ sưu tập hướng sông", summary: "Cập nhật các phương án tài chính linh hoạt, lịch thanh toán và quyền lợi dành cho khách hàng tháng 10.", date: "24/09/2026", read: 6, image: IMG("photo-1512917774080-9991f1c4c750") },
  { id: 4, category: "Thị trường", title: "Hạ tầng Thủ Thiêm tăng tốc, kết nối khu Đông bước vào chu kỳ mới", summary: "Những trục giao thông chiến lược đang định hình lại khả năng tiếp cận và giá trị bất động sản ven sông.", date: "19/09/2026", read: 7, image: IMG("photo-1480714378408-67cf0d13bc1b") },
  { id: 5, category: "Tiện ích", title: "Một ngày sống wellness tại Aurelia: Từ vườn thiền đến hồ bơi vô cực", summary: "Khám phá chuỗi tiện ích được thiết kế theo nhịp sinh hoạt của cộng đồng cư dân đa thế hệ.", date: "12/09/2026", read: 5, image: IMG("photo-1600607687939-ce8a6c25118c") },
  { id: 6, category: "Cộng đồng", title: "Chọn một mái nhà bên sông: Câu chuyện của gia đình chị Minh Anh", summary: "Tầm nhìn dài hạn, môi trường cho trẻ nhỏ và cộng đồng riêng tư là ba lý do dẫn đến quyết định.", date: "06/09/2026", read: 8, image: IMG("photo-1511895426328-dc8714191300") },
];

const CATEGORIES: [string, number][] = [
  ["Thị trường", 326], ["Dự án", 284], ["Pháp lý", 168], ["Đầu tư", 142],
  ["Quy hoạch & hạ tầng", 119], ["Phong cách sống", 96], ["Sự kiện", 73],
];
const TAGS = ["#ThủThiêm", "#CănHộ", "#PhápLý", "#ĐầuTư", "#Metro", "#LãiSuất", "#NhàỞ"];

export default function ProjectNewsPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Thị trường");
  const [page, setPage] = useState(1);

  const posts = useMemo(
    () => POSTS.filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{PROJECT.name}</Link> <ChevronRight size={12} />
            <span className="font-semibold text-primary-600">Tin tức</span>
          </nav>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_430px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm, TP.HCM
              </span>
              <h1 className="mt-5 text-5xl font-bold text-heading">Tin tức Aurelia Riverside</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-body">
                Cập nhật chính thức về tiến độ, sự kiện, chính sách bán hàng và nhịp sống mới tại biểu tượng ven sông Thủ Thiêm.
              </p>
              <p className="mt-4 flex items-center gap-3 text-sm text-body">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm"><Newspaper size={15} /></span>
                <span><b className="text-heading">48 bài viết</b> · Cập nhật 01/10/2026</span>
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 215 }}>
              <img src={PROJECT.image} alt={PROJECT.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-lg font-semibold">{PROJECT.name}</p>
                <p className="text-[11px] text-white/80">Bản tin chính thức · Thủ Thiêm, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-50/70 pb-16 pt-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tìm kiếm */}
          <form
            onSubmit={(e) => { e.preventDefault(); setQuery(draft); setPage(1); }}
            className="flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-white p-4 shadow-sm"
          >
            <div className="relative min-w-[240px] flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tìm kiếm tin tức dự án…"
                className="h-12 w-full rounded-full border border-line bg-primary-50/60 pl-11 pr-4 text-sm text-heading outline-none placeholder:text-muted focus:border-primary-300"
              />
            </div>
            <button className="h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-7 text-sm font-medium text-white hover:opacity-95">Tìm kiếm</button>
            <button type="button" className="flex h-12 w-56 items-center justify-between rounded-full border border-line bg-white px-5 text-sm text-body">
              <span className="flex items-center gap-2"><ArrowUpDown size={14} /> Mới nhất</span> <ChevronDown size={15} />
            </button>
          </form>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase text-primary-600">Tin mới cập nhật</p>
              <h2 className="mt-1 text-3xl font-semibold text-heading">Nhịp sống và chuyển động dự án</h2>
            </div>
            <span className="text-[11px] text-muted">Trang {page} / 8</span>
          </div>

          <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1fr_290px]">
            <div>
              <div className="grid gap-5 md:grid-cols-2">
                {posts.map((p) => (
                  <article key={p.id} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                    <img src={p.image} alt={p.title} className="w-full object-cover" style={{ height: 185 }} />
                    <div className="p-5 pb-6">
                      <span className="rounded-full bg-primary-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary-700">{p.category}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-heading">{p.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-body">{p.summary}</p>
                      <div className="mt-4 flex items-center justify-between text-[11px] text-muted">
                        <span>{p.date} · {p.read} phút đọc</span>
                        <Link to={`${base}/tin-tuc`} className="flex items-center gap-1 font-semibold text-primary-600">Đọc tiếp <ArrowRight size={12} /></Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {posts.length === 0 && <p className="py-12 text-center text-body">Không tìm thấy bài viết phù hợp.</p>}

              <div className="mt-8 flex items-center justify-center gap-2 text-xs">
                <button onClick={() => setPage(Math.max(1, page - 1))} className="flex h-10 items-center gap-1 rounded-full border border-line bg-white px-4 text-heading">
                  <ChevronLeft size={13} /> Trang trước
                </button>
                {([1, 2, 3, 4, "…", 8] as const).map((n, k) =>
                  n === "…" ? (
                    <span key={k} className="px-1 text-muted">…</span>
                  ) : (
                    <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-full font-medium ${page === n ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>{n}</button>
                  )
                )}
                <button onClick={() => setPage(Math.min(8, page + 1))} className="flex h-10 items-center gap-1 rounded-full border border-line bg-white px-4 text-heading">
                  Trang sau <ChevronRight size={13} />
                </button>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="text-lg text-heading">Chuyên mục</h3>
                  <Layers size={17} className="text-primary-600" />
                </div>
                <ul className="mt-2">
                  {CATEGORIES.map(([name, n]) => (
                    <li key={name}>
                      <button onClick={() => setCategory(name)} className={`flex w-full items-center justify-between py-3 text-xs ${category === name ? "font-medium text-primary-600" : "text-heading"}`}>
                        {name}
                        <span className={`rounded-full px-2.5 py-1 text-[10px] ${category === name ? "bg-primary-100 text-primary-700" : "bg-line text-muted"}`}>{n}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-primary-200 bg-primary-50/70 p-5">
                <h3 className="text-lg text-heading">Thẻ phổ biến</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TAGS.map((t, i) => (
                    <span key={t} className={`rounded-full border px-3 py-1.5 text-[11px] ${i < 2 ? "border-primary-200 bg-primary-100 text-primary-700" : "border-line bg-white text-heading"}`}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
