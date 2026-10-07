import { LayoutGrid, Building2 } from "lucide-react";
import type {
  NewsCategoryWithCount,
  ProjectWithCount,
} from "../../types/news.types";

interface NewsSidebarProps {
  categories: NewsCategoryWithCount[];
  projects: ProjectWithCount[];
  activeCategoryId: number | null;
  activeProjectId: number | null;
  onCategoryClick: (id: number | null) => void;
  onProjectClick: (id: number | null) => void;
}

export default function NewsSidebar({
  categories,
  projects,
  activeCategoryId,
  activeProjectId,
  onCategoryClick,
  onProjectClick,
}: NewsSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className="rounded-3xl border border-line bg-white p-5">
        <h3 className="flex items-center justify-between font-semibold text-heading">
          Chuyên mục <LayoutGrid size={16} className="text-primary-600" />
        </h3>
        <ul className="mt-4 space-y-1">
          {categories.map((c) => {
            const active = activeCategoryId === c.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => onCategoryClick(active ? null : c.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-primary-50 font-medium text-primary-600"
                      : "text-body hover:bg-primary-50/60 hover:text-primary-600"
                  }`}
                >
                  {c.name}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      active ? "bg-primary-600 text-white" : "bg-page text-body"
                    }`}
                  >
                    {c.newsCount}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-3xl bg-primary-50 p-5">
        <h3 className="font-semibold text-heading">Theo dự án</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {projects.map((p) => {
            const active = activeProjectId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onProjectClick(active ? null : p.id)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs transition ${
                  active
                    ? "bg-primary-600 text-white"
                    : "bg-white text-body ring-1 ring-line hover:text-primary-600 hover:ring-primary-300"
                }`}
              >
                <Building2 size={11} />
                {p.name}
                <span className="opacity-70">({p.newsCount})</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
