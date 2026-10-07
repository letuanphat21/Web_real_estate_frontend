import { Link } from "react-router-dom";
import { ChevronRight, CalendarDays } from "lucide-react";
import type { PROJECT } from "../../../data/projectDetail/policy";

type Props = {
  base: string;
  project: typeof PROJECT;
};

export default function PolicyHero({ base, project }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-footer via-primary-700 to-primary-500 p-9 text-white shadow-xl shadow-primary-200" style={{ minHeight: 270 }}>
      <span className="absolute -right-10 -top-28 h-[420px] w-[420px] rounded-full bg-white/10" />
      <span className="absolute bottom-[-120px] right-40 h-[260px] w-[260px] rounded-full bg-white/10" />
      <div className="relative">
        <nav className="flex items-center gap-3 text-xs text-white/70">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <Link to={base}>{project.name}</Link> <ChevronRight size={12} />
          <span className="font-semibold text-white">Chính sách bán hàng</span>
        </nav>
        <h1 className="mt-5 text-5xl font-bold">Chính sách bán hàng</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
          Ưu đãi tài chính linh hoạt dành cho khách hàng sở hữu căn hộ Aurelia Riverside trong giai đoạn mở bán tháng 10/2026.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang áp dụng
          </span>
          <span className="flex items-center gap-2 text-white/80">
            <CalendarDays size={14} /> Áp dụng từ 01/10/2026 đến khi có thông báo mới
          </span>
        </div>
      </div>
    </section>
  );
}
