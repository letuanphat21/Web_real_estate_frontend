import { Link } from "react-router-dom";
import { MapPin, Building2, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/mockProjects";

type Props = { project: Project; view?: "grid" | "list" };

export default function ProjectCard({ project, view = "grid" }: Props) {
  const list = view === "list";

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`group relative flex overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-300/40 ${
        list ? "flex-col md:flex-row" : "h-full flex-col"
      }`}
    >
      {/* Ảnh + tên dự án nổi bật */}
      <div className={`relative overflow-hidden ${list ? "h-64 md:h-auto md:w-[46%]" : "h-72"}`}>
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-footer/90 via-footer/30 to-transparent transition duration-500 group-hover:from-primary-700/95 group-hover:via-primary-700/40" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary-700 backdrop-blur">
          {project.tag}
        </span>

        {/* Nút mũi tên trượt vào khi rê chuột */}
        <span className="absolute right-4 top-4 flex h-11 w-11 -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-white text-primary-600 opacity-0 shadow-lg transition duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md transition duration-500 group-hover:-translate-y-1">
            {project.name}
          </h3>
          <span className="mt-2 block h-1 w-10 rounded-full bg-primary-300 transition-all duration-500 group-hover:w-28 group-hover:bg-white" />
          <p className="mt-2 text-xs text-white/80">
            Chủ đầu tư: <span className="font-semibold text-white">{project.investor}</span>
          </p>
        </div>
      </div>

      {/* Thông tin */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-body">
          <MapPin size={14} className="text-primary-500" /> {project.location}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
          <Building2 size={14} className="text-primary-500" /> {project.type}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-muted">Khoảng giá</span>
          <span className="text-sm font-bold text-accent transition group-hover:text-primary-600">{project.price}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
          <span>Tiến độ</span>
          <span>{project.note}</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-700 group-hover:brightness-110"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Cập nhật hôm nay
          </span>
          <span className="flex items-center gap-1 font-semibold text-primary-700 transition-all duration-300 group-hover:gap-2 group-hover:text-primary-600">
            Xem chi tiết <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
