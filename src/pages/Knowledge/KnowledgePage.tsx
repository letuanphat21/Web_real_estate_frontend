import { useMemo, useState, type FormEvent } from "react";
import { MOCK_CATEGORIES, MOCK_DOCUMENTS } from "../../data/mockDocuments";
import { type DocumentSort } from "../../types/document.types";
import { formatDate } from "../../utils/formatDate";
import Heading from "../../components/Knowledge/KnowledgeHeading";
import KnowledgeHero from "../../components/Knowledge/KnowledgeHero";
import CategoryGrid from "../../components/Knowledge/CategoryGrid";
import FeaturedContent from "../../components/Knowledge/FeaturedContent";
import ArticleFilters from "../../components/Knowledge/ArticleFilters";
import ArticleList from "../../components/Knowledge/ArticleList";
import ArticlePagination from "../../components/Knowledge/ArticlePagination";
import ArticleSidebar from "../../components/Knowledge/ArticleSidebar";

const PAGE_SIZE = 5;

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
      <KnowledgeHero keywordDraft={keywordDraft} setKeywordDraft={setKeywordDraft} onSearch={search} setCategoryId={setCategoryId} setPage={setPage} stats={stats} />

      {/* Chuyên mục */}
      <CategoryGrid counts={counts} setCategoryId={setCategoryId} setPage={setPage} />

      {/* Nội dung nổi bật */}
      <FeaturedContent featured={featured} featuredCat={featuredCat} setFeaturedCat={setFeaturedCat} />

      {/* Bài viết mới cập nhật */}
      <section id="bai-viet" className="scroll-mt-24 bg-primary-50/40 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading eyebrow="Thư viện bài viết" title="Bài viết mới cập nhật" desc="Mỗi bài đều được kiểm duyệt bởi chuyên gia trước khi đăng." />
            <span className="text-xs text-muted">{filtered.length} bài viết</span>
          </div>

          <ArticleFilters keyword={keyword} setKeyword={setKeyword} setKeywordDraft={setKeywordDraft} categoryId={categoryId} setCategoryId={setCategoryId} sort={sort} setSort={setSort} setPage={setPage} />

          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
            <div>
              <ArticleList rows={rows} />

              {totalPages > 1 && (
                <ArticlePagination page={page} totalPages={totalPages} setPage={setPage} />
              )}
            </div>

            <ArticleSidebar counts={counts} categoryId={categoryId} setCategoryId={setCategoryId} setPage={setPage} />
          </div>
        </div>
      </section>
    </div>
  );
}
