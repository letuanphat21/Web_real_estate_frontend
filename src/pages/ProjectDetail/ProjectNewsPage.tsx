import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, POSTS, CATEGORIES, TAGS } from "../../data/projectDetail/news";
import NewsHero from "../../components/ProjectDetail/news/NewsHero";
import NewsSearchBar from "../../components/ProjectDetail/news/NewsSearchBar";
import NewsPostList from "../../components/ProjectDetail/news/NewsPostList";
import NewsPagination from "../../components/ProjectDetail/news/NewsPagination";
import NewsSidebar from "../../components/ProjectDetail/news/NewsSidebar";

export default function ProjectNewsPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;
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
      <NewsHero base={base} project={PROJECT} />

      <section className="bg-primary-50/70 pb-16 pt-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tìm kiếm */}
          <NewsSearchBar draft={draft} setDraft={setDraft} setQuery={setQuery} setPage={setPage} />

          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase text-primary-600">Tin mới cập nhật</p>
              <h2 className="mt-1 text-3xl font-semibold text-heading">Nhịp sống và chuyển động dự án</h2>
            </div>
            <span className="text-[11px] text-muted">Trang {page} / 8</span>
          </div>

          <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1fr_290px]">
            <div>
              <NewsPostList posts={posts} base={base} />
              {posts.length === 0 && <p className="py-12 text-center text-body">Không tìm thấy bài viết phù hợp.</p>}

              <NewsPagination page={page} setPage={setPage} />
            </div>

            <NewsSidebar categories={CATEGORIES} category={category} setCategory={setCategory} tags={TAGS} />
          </div>
        </div>
      </section>
    </div>
  );
}
