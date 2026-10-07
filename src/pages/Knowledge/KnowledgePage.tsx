import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  BookOpen,
  Search,
  ArrowRight,
  Scale,
  Handshake,
  Landmark,
  Map as MapIcon,
  Palmtree,
  Sofa,
  Bookmark,
  Clock,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { MOCK_CATEGORIES, MOCK_DOCUMENTS } from "../../data/mockDocuments";
import { DOCUMENT_SORT_LABEL, type DocumentSort, type KnowledgeDocument } from "../../types/document.types";
import { formatDate } from "../../utils/formatDate";

const PAGE_SIZE = 5;

// Icon theo id chuyên mục (có thể lưu cột icon trong bảng category)
const CATEGORY_ICON: Record<number, LucideIcon> = {
  1: Scale,
  2: Handshake,
  3: Landmark,
  4: MapIcon,
  5: Palmtree,
  6: Sofa,
};

const catName = (id: number) => MOCK_CATEGORIES.find((c) => c.id === id)?.name ?? "";
const readMinutes = (d: KnowledgeDocument) => Math.max(3, Math.ceil(d.content.length / 120));
const excerpt = (d: KnowledgeDocument) => d.summary ?? d.content.slice(0, 140);

const selectCls =
  "h-11 w-full appearance-none rounded-xl border border-line bg-white px-4 pr-9 text-sm text-heading outline-none focus:border-primary-300";

function Heading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight text-heading md:text-4xl">{title}</h2>
      {desc && <p className="mt-2 text-sm text-body">{desc}</p>}
    </div>
  );
}

export default function KnowledgePage() {
  // Bộ lọc danh sách bài viết
  const [keywordDraft, setKeywordDraft] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState(0); // 0 = tất cả
  const [sort, setSort] = useState<DocumentSort>("NEWEST");
  const [page, setPage] = useState(0);
  // Tab "Nội dung nổi bật"
  const [featuredCat, setFeaturedCat] = useState(0);

  const counts = useMemo(() => {
    const m = new Map<number, number>();
    MOCK_DOCUMENTS.forEach((d) => m.set(d.categoryId, (m.get(d.categoryId) ?? 0) + 1));
    return m;
  }, []);

  const latestUpdate = useMemo(
    () => MOCK_DOCUMENTS.reduce((a, d) => (d.updatedAt > a ? d.updatedAt : a), ""),
    []
  );
  const imageCount = MOCK_DOCUMENTS.reduce((n, d) => n + d.images.length, 0);

  const stats = [
    { value: MOCK_DOCUMENTS.length, label: "Bài viết" },
    { value: MOCK_CATEGORIES.length, label: "Chuyên mục" },
    { value: formatDate(latestUpdate), label: "Cập nhật gần nhất" },
    { value: imageCount, label: "Ảnh minh họa" },
  ];

  const featured = useMemo(() => {
    const list = [...MOCK_DOCUMENTS]
      .filter((d) => !featuredCat || d.categoryId === featuredCat)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return { main: list[0], side: list.slice(1, 4) };
  }, [featuredCat]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    const list = MOCK_DOCUMENTS.filter(
      (d) => (!categoryId || d.categoryId === categoryId) && (!k || d.title.toLowerCase().includes(k))
    );
    const key = sort === "UPDATED" ? "updatedAt" : "createdAt";
    list.sort((a, b) => (sort === "OLDEST" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
    return list;
  }, [keyword, categoryId, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(keywordDraft);
    setPage(0);
    document.getElementById("bai-viet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-200 via-primary-50 to-white pb-14 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <span className="font-semibold text-primary-600">Kiến thức</span>
          </nav>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <BookOpen size={12} /> Kho kiến thức được biên tập bởi chuyên gia
            </span>
            <h1 className="mt-5 text-4xl font-bold text-heading md:text-5xl">Thư viện kiến thức bất động sản</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Tra cứu pháp lý, quy trình mua bán và góc nhìn thị trường — rõ ràng, minh bạch, sẵn sàng áp dụng.
            </p>

            <form onSubmit={search} className="mt-7 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-primary-100">
              <Search size={17} className="ml-3 shrink-0 text-muted" />
              <input
                value={keywordDraft}
                onChange={(e) => setKeywordDraft(e.target.value)}
                placeholder='Tìm bài viết, ví dụ "sổ hồng", "lãi suất vay"…'
                className="h-11 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-muted"
              />
              <button className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white hover:opacity-95">
                Tìm kiếm <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-muted">Gợi ý:</span>
              {[{ id: 0, name: "Nổi bật" }, ...MOCK_CATEGORIES.slice(0, 4)].map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setCategoryId(c.id); setPage(0); document.getElementById("bai-viet")?.scrollIntoView({ behavior: "smooth" }); }}
                  className={`rounded-full border px-3 py-1.5 font-medium ${
                    c.id === 0 ? "border-primary-200 bg-primary-100 text-primary-700" : "border-line bg-white text-heading hover:border-primary-300"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-sm md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/90 px-4 py-4">
                  <p className="text-xl font-bold text-heading">{s.value}</p>
                  <p className="mt-0.5 text-[11px] text-body">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chuyên mục */}
      <section className="bg-primary-50/70 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="Danh mục kiến thức" title="Kiến thức có cấu trúc, dễ tìm và dễ áp dụng" desc="Bài viết được phân loại theo chuyên mục để bạn đi thẳng đến thông tin cần biết." />
            <div className="flex gap-8 text-right">
              <div><p className="text-2xl font-bold text-heading">{MOCK_DOCUMENTS.length}</p><p className="text-[11px] text-body">Bài viết</p></div>
              <div><p className="text-2xl font-bold text-heading">{MOCK_CATEGORIES.length}</p><p className="text-[11px] text-body">Chuyên mục</p></div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-white via-primary-50 to-blue-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-heading">Chuyên mục nổi bật</h3>
              <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-primary-700">{MOCK_CATEGORIES.length} nhóm kiến thức</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICON[c.id] ?? Layers;
                return (
                  <button
                    key={c.id}
                    onClick={() => { setCategoryId(c.id); setPage(0); document.getElementById("bai-viet")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600"><Icon size={20} /></span>
                      <span className="text-[11px] font-medium text-muted">{counts.get(c.id) ?? 0} bài</span>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-heading">{c.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-body">{c.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Nội dung nổi bật */}
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="Biên tập viên chọn" title="Nội dung nổi bật" desc="Các bài được cập nhật gần đây và đọc nhiều nhất từ chuyên gia." />
            <div className="flex flex-wrap gap-2">
              {[{ id: 0, name: "Tất cả" }, ...MOCK_CATEGORIES.slice(0, 3)].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFeaturedCat(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${featuredCat === c.id ? "bg-primary-100 text-primary-700" : "border border-line bg-white text-body"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {featured.main ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <article className="relative overflow-hidden rounded-3xl" style={{ minHeight: 400 }}>
                <img src={featured.main.thumbnail} alt={featured.main.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-footer via-footer/50 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                  {catName(featured.main.categoryId)}
                </span>
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <h3 className="max-w-md text-2xl font-semibold leading-snug">{featured.main.title}</h3>
                  <p className="mt-3 line-clamp-2 text-xs text-white/80">{excerpt(featured.main)}</p>
                  <p className="mt-3 text-[11px] text-white/70">
                    Cập nhật {formatDate(featured.main.updatedAt)} · {readMinutes(featured.main)} phút đọc
                  </p>
                </div>
              </article>
              <div className="flex flex-col gap-4">
                {featured.side.map((d) => (
                  <article key={d.id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3 shadow-sm">
                    <img src={d.thumbnail} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase text-primary-600">{catName(d.categoryId)}</p>
                      <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-heading">{d.title}</h4>
                      <p className="mt-1.5 text-[11px] text-muted">{formatDate(d.updatedAt)} · {readMinutes(d)} phút đọc</p>
                    </div>
                    <ChevronRight size={16} className="shrink-0 text-primary-600" />
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p className="py-10 text-center text-body">Chưa có bài viết thuộc chuyên mục này.</p>
          )}
        </div>
      </section>

      {/* Bài viết mới cập nhật */}
      <section id="bai-viet" className="scroll-mt-24 bg-primary-50/40 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="Thư viện bài viết" title="Bài viết mới cập nhật" desc="Mỗi bài đều được kiểm duyệt bởi chuyên gia trước khi đăng." />
            <span className="text-xs text-muted">{filtered.length} bài viết</span>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-primary-50 p-4 md:grid-cols-[1fr_220px_190px]">
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setKeywordDraft(e.target.value); setPage(0); }}
                placeholder="Tìm theo tiêu đề bài viết…"
                className={`${selectCls} pl-10`}
              />
            </div>
            <div className="relative">
              <select value={categoryId} onChange={(e) => { setCategoryId(Number(e.target.value)); setPage(0); }} className={selectCls}>
                <option value={0}>Tất cả chuyên mục</option>
                {MOCK_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => { setSort(e.target.value as DocumentSort); setPage(0); }} className={selectCls}>
                {(Object.keys(DOCUMENT_SORT_LABEL) as DocumentSort[]).map((k) => <option key={k} value={k}>{DOCUMENT_SORT_LABEL[k]}</option>)}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
            </div>
          </div>

          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
            <div>
              <ul className="divide-y divide-line rounded-3xl border border-line bg-white px-5 shadow-sm">
                {rows.map((d) => (
                  <li key={d.id} className="flex gap-5 py-5">
                    <img src={d.thumbnail} alt="" className="h-[96px] w-[132px] shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="rounded-full bg-primary-100 px-2.5 py-1 font-semibold text-primary-700">{catName(d.categoryId)}</span>
                        <span className="flex items-center gap-1 text-muted"><Clock size={11} /> {readMinutes(d)} phút đọc</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold leading-snug text-heading">{d.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-body">{excerpt(d)}</p>
                      <p className="mt-2 text-[11px] text-muted">
                        Đăng {formatDate(d.createdAt)}
                        {d.updatedAt !== d.createdAt && ` · Cập nhật ${formatDate(d.updatedAt)}`}
                      </p>
                    </div>
                    <button aria-label="Lưu bài" className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100">
                      <Bookmark size={14} />
                    </button>
                  </li>
                ))}
                {rows.length === 0 && <li className="py-12 text-center text-body">Không tìm thấy bài viết phù hợp.</li>}
              </ul>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs">
                  <button aria-label="Trang trước" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-body disabled:opacity-40">
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i)} className={`h-9 w-9 rounded-full font-medium ${page === i ? "bg-primary-600 text-white shadow-md shadow-primary-300" : "text-body hover:bg-white"}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button aria-label="Trang sau" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1} className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-body disabled:opacity-40">
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-heading">Chuyên mục</h3>
                <ul className="mt-3">
                  {[{ id: 0, name: "Tất cả", n: MOCK_DOCUMENTS.length }, ...MOCK_CATEGORIES.map((c) => ({ id: c.id, name: c.name, n: counts.get(c.id) ?? 0 }))].map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => { setCategoryId(c.id); setPage(0); }}
                        className={`flex w-full items-center justify-between py-2.5 text-xs ${categoryId === c.id ? "font-semibold text-primary-600" : "text-heading"}`}
                      >
                        {c.name}
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] ${categoryId === c.id ? "bg-primary-100 text-primary-700" : "bg-line text-muted"}`}>{c.n}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
