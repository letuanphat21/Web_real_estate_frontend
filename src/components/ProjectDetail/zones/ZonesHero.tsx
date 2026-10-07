import { Link } from "react-router-dom";
import { ChevronRight, Building2 } from "lucide-react";
import type { PROJECT } from "../../../data/projectDetail/zones";

type Props = {
  base: string;
  project: typeof PROJECT;
};

export default function ZonesHero({ base, project }: Props) {
  const p = project;
  return (
    <section className="bg-gradient-to-b from-blue-200 to-white pb-16 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-muted">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
          <span className="text-primary-600">Phân khu</span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_678px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-tight text-heading">Khám phá các phân khu</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-body">
              Bốn phong cách sống được định hình bởi tầm nhìn sông, công viên trung tâm, bến du thuyền và những khu vườn riêng tư.
            </p>
            <p className="mt-5 flex gap-6 text-sm text-heading">
              <span><b className="font-semibold text-primary-600">4</b> phân khu</span>
              <span><b className="font-semibold text-primary-600">1.248</b> sản phẩm</span>
              <span>Dự kiến 2028</span>
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 292 }}>
            <img src={p.hero} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <p className="text-xl font-semibold">{p.name}</p>
              <p className="text-xs text-white/80">Bán đảo Thủ Thiêm · TP.HCM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
