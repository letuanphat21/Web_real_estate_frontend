import { Link } from "react-router-dom";
import { ChevronRight, Building2, Newspaper } from "lucide-react";
import type { PROJECT } from "../../../data/projectDetail/news";

type Props = {
  base: string;
  project: typeof PROJECT;
};

export default function NewsHero({ base, project }: Props) {
  return (
    <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-muted">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <Link to={base}>{project.name}</Link> <ChevronRight size={12} />
          <span className="font-semibold text-primary-600">Tin tức</span>
        </nav>
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_430px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm, TP.HCM
            </span>
            <h1 className="mt-5 text-5xl font-bold text-heading">Tin tức Aurelia Riverside</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-body">
              Cập nhật chính thức về tiến độ, sự kiện, chính sách bán hàng và nhịp sống mới tại biểu tượng ven sông Thủ Thiêm.
            </p>
            <p className="mt-4 flex items-center gap-3 text-sm text-body">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm"><Newspaper size={15} /></span>
              <span><b className="text-heading">48 bài viết</b> · Cập nhật 01/10/2026</span>
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 215 }}>
            <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 text-white">
              <p className="text-lg font-semibold">{project.name}</p>
              <p className="text-[11px] text-white/80">Bản tin chính thức · Thủ Thiêm, TP.HCM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
