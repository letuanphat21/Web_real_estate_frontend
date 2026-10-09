import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import Skeleton from "../common/Skeleton";
import { useLatestNews } from "../../hooks/social/useLatestNews";
import { formatRelativeTime } from "../../utils/formatDate";

export default function NewsList() {
  const { news, loading } = useLatestNews(5);

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500">Tin tức</h3>
        <Link
          to="/news"
          className="flex items-center gap-0.5 text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          Xem tất cả <ArrowRight size={12} />
        </Link>
      </div>

      <ul className="space-y-3">
        {loading
          ? Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex gap-3">
                <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-1.5 pt-1">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                  <Skeleton className="h-2.5 w-16 rounded" />
                </div>
              </li>
            ))
          : news.map((n) => (
              <li key={n.id}>
                <Link to={`/news/${n.id}`} className="group flex gap-3">
                  {n.images[0] ? (
                    <img
                      src={n.images[0].imageUrl}
                      alt={n.title}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-lg object-cover transition group-hover:opacity-90"
                    />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Newspaper size={20} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800 group-hover:text-primary-600">
                      {n.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </section>
  );
}
