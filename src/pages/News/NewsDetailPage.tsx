import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewsDetailHero from "../../components/NewDetail/NewsDetailHero";
import NewsArticle from "../../components/NewDetail/NewsArticle";
import NewsDetailSidebar from "../../components/NewDetail/NewsDetailSidebar";
import NewsCard from "../../components/News/NewsCard";
import newsService from "../../services/news/newsService";
import type { News } from "../../types/news.types";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);

  const [news, setNews] = useState<News | null>(null);
  const [related, setRelated] = useState<News[]>([]);
  const [latest, setLatest] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    window.scrollTo(0, 0);

    newsService
      .getNewsById(newsId)
      .then(async (item) => {
        if (ignore) return;
        setNews(item);
        if (!item) return;

        const [rel, lat] = await Promise.all([
          // Phần phụ lỗi thì để trống, không ảnh hưởng bài chính
          newsService.getRelatedNews(item).catch(() => []),
          newsService.getLatestNews(item.id).catch(() => []),
        ]);
        if (ignore) return;
        setRelated(rel);
        setLatest(lat);
      })
      .catch(() => {
        // 404 / bài đã ẩn → hiện màn "Không tìm thấy bài viết"
        if (!ignore) setNews(null);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [newsId]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl animate-pulse px-4 py-20 text-center">
        <div className="mx-auto h-5 w-24 rounded-full bg-primary-50" />
        <div className="mx-auto mt-6 h-10 w-full rounded bg-primary-50" />
        <div className="mx-auto mt-3 h-10 w-2/3 rounded bg-primary-50" />
        <div className="mt-10 aspect-[16/9] rounded-3xl bg-primary-50" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-heading">
          Không tìm thấy bài viết
        </h1>
        <p className="mt-2 text-body">
          Bài viết có thể đã bị gỡ hoặc đường dẫn không đúng.
        </p>
        <Link
          to="/news"
          className="mt-6 inline-block rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white"
        >
          Quay lại Tin tức
        </Link>
      </div>
    );
  }

  return (
    <>
      <NewsDetailHero news={news} />

      <section className="bg-page pb-20">
        <div className="container mx-auto -mt-16 grid items-start gap-6 px-4 lg:grid-cols-[1fr_320px] lg:px-8">
          <NewsArticle news={news} />
          <NewsDetailSidebar project={news.project} latest={latest} />
        </div>

        {related.length > 0 && (
          <div className="container mx-auto mt-16 px-4 lg:px-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              Đọc thêm
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
              Bài viết liên quan
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
