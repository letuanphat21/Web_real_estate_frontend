import { Link } from "react-router-dom";
import { Heart, MapPin, Building2, ArrowRight } from "lucide-react";
import type { Project } from "../../data/mockProjects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100">
      <button
        aria-label="Yêu thích"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-body hover:text-primary-600"
      >
        <Heart size={15} />
      </button>
      <Link to={`/du-an/${project.id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-medium text-primary-700">
            {project.tag}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-heading">{project.name}</h3>
          <p className="mt-1 text-xs text-muted">
            Chủ đầu tư: <span className="font-medium text-primary-700">{project.investor}</span>
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-body">
            <MapPin size={14} className="text-muted" /> {project.location}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
            <Building2 size={14} className="text-muted" /> {project.type}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted">Khoảng giá</span>
            <span className="font-semibold text-accent">{project.price}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
            <span>Tiến độ</span>
            <span>{project.note}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100">
            <div className="h-full rounded-full bg-primary-600" style={{ width: `${project.progress}%` }} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Cập nhật hôm nay
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary-700 group-hover:text-primary-600">
            Xem chi tiết <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
