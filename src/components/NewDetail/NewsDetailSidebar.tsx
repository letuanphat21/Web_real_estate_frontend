import { Link } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";
import type { News, ProjectSummary } from "../../types/news.types";
import { formatDate } from "../../utils/formatDate";

interface NewsDetailSidebarProps {
  project: ProjectSummary;
  latest: News[];
}

export default function NewsDetailSidebar({
  project,
  latest,
}: NewsDetailSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      {/* Dự án liên quan */}
      <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-xl shadow-primary-200">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Building2 size={20} />
        </span>
        <p className="mt-4 text-xs uppercase tracking-wide text-white/70">
          Dự án liên quan
        </p>
        <p className="mt-1 text-xl font-semibold">{project.name}</p>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-medium text-primary-700 transition hover:bg-primary-50"
        >
          Xem dự án <ArrowRight size={15} />
        </Link>
      </div>

      {/* Tin mới nhất */}
      {latest.length > 0 && (
        <div className="rounded-3xl border border-line bg-white p-5">
          <h3 className="font-semibold text-heading">Tin mới nhất</h3>
          <ul className="mt-4 divide-y divide-line">
            {latest.map((n) => (
              <li key={n.id}>
                <Link to={`/news/${n.id}`} className="group flex gap-3 py-3">
                  <img
                    src={n.images[0]?.imageUrl}
                    alt={n.title}
                    loading="lazy"
                    className="h-16 w-20 shrink-0 rounded-xl bg-primary-50 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-heading group-hover:text-primary-600">
                      {n.title}
                    </p>
                    <p className="mt-1 text-[11px] text-body">
                      {formatDate(n.createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
