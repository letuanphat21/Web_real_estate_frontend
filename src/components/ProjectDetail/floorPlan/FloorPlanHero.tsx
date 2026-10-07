import { Link } from "react-router-dom";
import { ChevronRight, Building2 } from "lucide-react";
import type { PROJECT } from "../../../data/projectDetail/floorPlan";

type Props = {
  base: string;
  project: typeof PROJECT;
};

export default function FloorPlanHero({ base, project }: Props) {
  const p = project;
  return (
    <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-muted">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
          <span className="text-primary-600">Mặt bằng quỹ căn</span>
        </nav>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm
            </span>
            <h1 className="mt-4 text-5xl font-bold text-heading">
              Mặt bằng quỹ căn
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
              Chọn đúng tòa, đúng tầng và đúng tầm nhìn. Dữ liệu sản phẩm được
              cập nhật gần thời gian thực từ giỏ hàng Aurelia Riverside.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white px-5 py-3 text-center shadow-sm">
            <p className="text-[11px] text-muted">Quỹ căn khả dụng</p>
            <p className="text-3xl font-semibold text-heading">126 căn</p>
            <p className="flex items-center justify-center gap-1.5 text-[10px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Vừa cập
              nhật
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
