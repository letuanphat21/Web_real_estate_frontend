import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight, Building2 } from "lucide-react";
import type { News } from "../../types/news.types";
import { formatDate } from "../../utils/formatDate";
import { excerpt, readMinutes } from "../../utils/text";

interface NewsCardProps {
  news: News;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";

export default function NewsCard({ news }: NewsCardProps) {
  const detailPath = `/news/${news.id}`;
  const cover = news.images[0]?.imageUrl || FALLBACK_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100">
      <Link to={detailPath} className="block aspect-[16/10] overflow-hidden">
        <img
          src={cover}
          alt={news.images[0]?.title || news.title}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE)
              e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">
          {news.category.name}
        </span>

        <Link to={detailPath}>
          <h3 className="mt-2 line-clamp-2 font-semibold leading-snug text-heading transition-colors group-hover:text-primary-600">
            {news.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-body">
          {excerpt(news.content)}
        </p>

        <p className="mt-3 flex items-center gap-1 text-[11px] font-medium text-heading">
          <Building2 size={12} className="text-primary-600" />{" "}
          {news.project.name}
        </p>

        <div className="mt-2 flex items-center gap-3 text-[11px] text-body">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} /> {formatDate(news.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readMinutes(news.content)} phút đọc
          </span>
        </div>

        <Link
          to={detailPath}
          className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-primary-600 transition-all hover:gap-2"
        >
          Đọc tiếp <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
