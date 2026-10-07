import { Link } from "react-router-dom";
import { ChevronRight, Building2 } from "lucide-react";
import ProgressBadge from "./ProgressBadge";
import { IMG, SITE } from "../../../data/projectDetail/progress";
import type { PROJECT } from "../../../data/projectDetail/progress";

type Props = {
  base: string;
  project: typeof PROJECT;
};

export default function ProgressHero({ base, project }: Props) {
  return (
    <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-muted">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <Link to={base}>{project.name}</Link> <ChevronRight size={12} />
          <span className="font-semibold text-primary-600">Tiến độ</span>
        </nav>
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_470px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm, TP.HCM
            </span>
            <h1 className="mt-5 flex flex-wrap items-center gap-4 text-5xl font-bold text-heading">
              Tiến độ dự án <ProgressBadge state="building" />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              Theo dõi minh bạch từng hạng mục xây dựng và những hình ảnh mới nhất được xác nhận bởi Ban quản lý dự án.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <p className="text-4xl font-bold text-primary-600">68% <span className="text-sm font-semibold text-heading">hoàn thành tổng thể</span></p>
              <div className="border-l border-line pl-6">
                <p className="text-[11px] text-muted">Cập nhật gần nhất</p>
                <p className="text-sm font-semibold text-heading">01/10/2026 · 16:30</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 236 }}>
            <img src={IMG(SITE[2], 1000)} alt="Toàn cảnh công trường" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 text-white">
              <p className="text-lg font-semibold">Toàn cảnh công trường tháng 10</p>
              <p className="text-[11px] text-white/80">Flycam hướng Đông Nam · 01/10/2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
