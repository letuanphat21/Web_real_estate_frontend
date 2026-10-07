import { Link } from "react-router-dom";
import { ChevronRight, CalendarClock } from "lucide-react";
import type { PROJECT, STATS } from "../../../data/projectDetail/inventory";

type Props = {
  base: string;
  project: typeof PROJECT;
  stats: typeof STATS;
};

export default function InventoryHero({ base, project, stats }: Props) {
  const p = project;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-footer via-footer to-primary-600 pb-14 pt-8 text-white">
      <span className="absolute -right-24 -top-40 h-[560px] w-[560px] rounded-full bg-white/5" />
      <span className="absolute -right-4 -top-24 h-[360px] w-[360px] rounded-full bg-white/5" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-white/70">
          <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
          <span className="font-semibold text-white">Quỹ căn</span>
        </nav>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_680px]">
          <div>
            <h1 className="text-5xl font-bold">Bảng hàng</h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
              Tra cứu quỹ căn cập nhật theo thời gian thực, so sánh mức giá và lựa chọn sản phẩm phù hợp tại Aurelia Riverside.
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs text-white/70">
              <CalendarClock size={14} /> Cập nhật gần nhất: 08:45, 02/10/2026
            </p>
          </div>
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-white/15 pl-4">
                <p className="flex items-center gap-2 text-xs text-white/80">
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
                </p>
                <p className="mt-1 text-4xl font-bold">{s.value}</p>
                <p className="mt-1 text-[11px] text-white/50">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
