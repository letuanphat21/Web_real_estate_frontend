import { Images } from "lucide-react";
import ProgressBadge from "./ProgressBadge";
import { IMG } from "../../../data/projectDetail/progress";
import type { Period, CATEGORIES, GALLERY } from "../../../data/projectDetail/progress";

type Props = {
  period: Period;
  factor: number;
  categories: typeof CATEGORIES;
  gallery: typeof GALLERY;
};

export default function PeriodDetail({ period, factor, categories, gallery }: Props) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase text-primary-600">
            Kỳ đang xem <ProgressBadge state={period.status} />
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-heading">{period.heading}</h3>
          <p className="mt-3 text-sm leading-relaxed text-body">{period.desc}</p>
        </div>
        <div className="rounded-2xl bg-primary-50 px-5 py-3 text-right">
          <p className="text-[11px] text-body">Hoàn thành tổng thể</p>
          <p className="text-4xl font-bold text-primary-600">{period.percent}%</p>
          <p className="text-[10px] font-semibold text-success">{period.delta}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line">
        {categories.map((c, i) => {
          const v = Math.min(100, Math.round(c.value * factor));
          return (
            <div key={c.name} className={`px-5 py-4 ${i ? "border-t border-line" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-heading">{c.name}</p>
                  <p className="text-[11px] text-body">{c.note}</p>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressBadge state={c.state} />
                  <span className="w-10 text-right text-sm font-bold text-heading">{v}%</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700" style={{ width: `${v}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold text-heading">Hình ảnh thực tế công trường</h4>
          <p className="text-[11px] text-muted">Bộ ảnh được chụp và xác minh ngày 01/10/2026</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1.5 text-[11px] font-semibold text-primary-700">
          <Images size={13} /> 18 ảnh
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-[1.35fr_1fr_1fr]" style={{ gridAutoRows: 190 }}>
        {gallery.map((g) => (
          <div key={g.title} className={`relative overflow-hidden rounded-2xl ${g.big ? "row-span-2" : ""}`}>
            <img src={IMG(g.img, g.big ? 900 : 600)} alt={g.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <p className={`font-semibold ${g.big ? "text-lg" : "text-xs"}`}>{g.title}</p>
              <p className="text-[10px] text-white/80">{g.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
