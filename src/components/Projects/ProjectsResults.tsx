import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../data/mockProjects";

export type ProjectsView = "grid" | "list";

type Props = {
  projects: Project[];
  total: number;
  view: ProjectsView;
  onViewChange: (view: ProjectsView) => void;
  page: number;
  totalPages: number;
  pages: readonly (number | string)[];
  onPageChange: (page: number) => void;
};

export default function ProjectsResults({ projects, total, view, onViewChange, page, totalPages, pages, onPageChange }: Props) {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-primary-100 pb-16 pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-heading">{total} dự án phù hợp</h2>
            <p className="mt-1 text-xs text-body">Tại TP. Hồ Chí Minh · Căn hộ · Đang mở bán</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 text-xs text-body">
              Sắp xếp: <span className="font-medium text-heading">Phù hợp nhất</span> <ChevronDown size={14} />
            </button>
            <div className="flex rounded-lg border border-line bg-white p-0.5">
              {([["grid", LayoutGrid], ["list", List]] as const).map(([key, Icon]) => (
                <button
                  key={key}
                  aria-label={key}
                  onClick={() => onViewChange(key)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md ${
                    view === key ? "bg-primary-100 text-primary-600" : "text-muted"
                  }`}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-6 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs">
          <button aria-label="Trang trước" onClick={() => onPageChange(Math.max(1, page - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted">
            <ChevronLeft size={14} />
          </button>
          {pages.map((n, i) =>
            typeof n === "string" ? (
              <span key={i} className="px-1 text-muted">...</span>
            ) : (
              <button
                key={n}
                onClick={() => onPageChange(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  page === n ? "bg-accent text-white" : "text-body hover:bg-white"
                }`}
              >
                {n}
              </button>
            )
          )}
          <button aria-label="Trang sau" onClick={() => onPageChange(Math.min(totalPages, page + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-body">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
