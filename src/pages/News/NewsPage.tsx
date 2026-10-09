import { useEffect, useState } from "react";
import { FileX, X } from "lucide-react";
import NewsHero from "../../components/News/NewsHero";
import NewsSearchBar from "../../components/News/NewsSearchBar";
import NewsCard from "../../components/News/NewsCard";
import NewsCardSkeleton from "../../components/News/NewsCardSkeleton";
import NewsSidebar from "../../components/News/NewsSidebar";
import Pagination from "../../components/common/Pagination";
import newsService from "../../services/news/newsService";
import { getErrorMessage } from "../../api";
import { DEFAULT_NEWS_FILTER } from "../../types/news.types";
import type {
  News,
  NewsCategoryWithCount,
  NewsFilter,
  NewsSort,
  ProjectWithCount,
} from "../../types/news.types";

const PAGE_SIZE = 9;

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>(DEFAULT_NEWS_FILTER);
  const [sort, setSort] = useState<NewsSort>("NEWEST");
  const [page, setPage] = useState<number>(0);

  const [news, setNews] = useState<News[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<NewsCategoryWithCount[]>([]);
  const [projects, setProjects] = useState<ProjectWithCount[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [featured, setFeatured] = useState<News[]>([]);

  useEffect(() => {
    newsService
      .getSidebarData()
      .then((res) => {
        setCategories(res.categories);
        setProjects(res.projects);
        setAllCount(res.total);
        setFeatured(res.featured);
      })
      .catch(() => undefined); // sidebar lỗi thì để trống, danh sách vẫn hiển thị
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    newsService
      .getNews({ filter, sort, page, size: PAGE_SIZE })
      .then((res) => {
        if (ignore) return;
        setNews(res.content);
        setTotal(res.totalElements);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        if (ignore) return;
        setNews([]);
        setTotal(0);
        setTotalPages(1);
        setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [filter, sort, page]);

  const updateFilter = (next: NewsFilter) => {
    setFilter(next);
    setPage(0);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeCategory = categories.find((c) => c.id === filter.categoryId);
  const activeProject = projects.find((p) => p.id === filter.projectId);
  const hasFilter = Boolean(filter.keyword || activeCategory || activeProject);

  return (
    <>
      <NewsHero total={allCount} featured={featured} />

      <section className="bg-page pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <NewsSearchBar
            filter={filter}
            sort={sort}
            categories={categories}
            onSearch={updateFilter}
            onSortChange={(s) => {
              setSort(s);
              setPage(0);
            }}
          />

          <div className="mt-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                Mới nhất từ NovaLand Hub
              </span>
              <h2 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
                Tin mới cập nhật
              </h2>
              <p className="mt-1 text-sm text-body">
                Góc nhìn đa chiều về thị trường, dự án, pháp lý, đầu tư và phong
                cách sống đô thị.
              </p>
            </div>
            <p className="text-xs text-body">
              Hiển thị {news.length} / {total} bài viết
            </p>
          </div>

          {/* Bộ lọc đang áp dụng */}
          {hasFilter && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {filter.keyword && (
                <Chip
                  label={`"${filter.keyword}"`}
                  onRemove={() => updateFilter({ ...filter, keyword: "" })}
                />
              )}
              {activeCategory && (
                <Chip
                  label={activeCategory.name}
                  onRemove={() => updateFilter({ ...filter, categoryId: null })}
                />
              )}
              {activeProject && (
                <Chip
                  label={activeProject.name}
                  onRemove={() => updateFilter({ ...filter, projectId: null })}
                />
              )}
              <button
                onClick={() => updateFilter(DEFAULT_NEWS_FILTER)}
                className="font-medium text-primary-600 hover:underline"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
            <div>
              {loading ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <NewsCardSkeleton key={i} />
                  ))}
                </div>
              ) : news.length === 0 ? (
                <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-white py-16 text-center">
                  <FileX size={40} className="text-primary-300" />
                  <p className="mt-4 font-medium text-heading">
                    {error ? "Không tải được bài viết" : "Không có bài viết phù hợp"}
                  </p>
                  <p className="mt-1 text-sm text-body">
                    {error ?? "Thử từ khóa khác hoặc bỏ bớt bộ lọc."}
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {news.map((n) => (
                    <NewsCard key={n.id} news={n} />
                  ))}
                </div>
              )}

              {!loading && (
                <div className="mt-10">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            <NewsSidebar
              categories={categories}
              projects={projects}
              activeCategoryId={filter.categoryId}
              activeProjectId={filter.projectId}
              onCategoryClick={(categoryId) =>
                updateFilter({ ...filter, categoryId })
              }
              onProjectClick={(projectId) =>
                updateFilter({ ...filter, projectId })
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-heading ring-1 ring-line">
      {label}
      <button
        onClick={onRemove}
        aria-label="Bỏ lọc"
        className="text-body hover:text-danger"
      >
        <X size={12} />
      </button>
    </span>
  );
}
