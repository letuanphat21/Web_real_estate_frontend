import { Link } from "react-router-dom";
import { ChevronRight, CalendarDays, Clock, Building2 } from "lucide-react";
import type { News } from "../../types/news.types";
import { formatDate } from "../../utils/formatDate";
import { readMinutes } from "../../utils/text";

interface NewsDetailHeroProps {
  news: News;
}

export default function NewsDetailHero({ news }: NewsDetailHeroProps) {
  return (
    <section className="bg-hero pb-28 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav
          className="flex items-center gap-1.5 text-xs text-body"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-primary-600">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <Link to="/news" className="hover:text-primary-600">
            Tin tức
          </Link>
          <ChevronRight size={12} />
          <span className="line-clamp-1 font-medium text-primary-600">
            {news.title}
          </span>
        </nav>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 ring-1 ring-primary-100">
            {news.category.name}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-heading md:text-5xl">
            {news.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-body">
            <span className="flex items-center gap-2">
              {news.author.avatarUrl && (
                <img
                  src={news.author.avatarUrl}
                  alt={news.author.fullName}
                  className="h-7 w-7 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-heading">
                {news.author.fullName}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} /> {formatDate(news.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {readMinutes(news.content)} phút đọc
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 size={15} className="text-primary-600" />{" "}
              {news.project.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
