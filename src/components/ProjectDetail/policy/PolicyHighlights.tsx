import { Info } from "lucide-react";
import Eyebrow from "./Eyebrow";
import type { HIGHLIGHTS } from "../../../data/projectDetail/policy";

type Props = {
  highlights: typeof HIGHLIGHTS;
};

export default function PolicyHighlights({ highlights }: Props) {
  return (
    <section className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Quyền lợi dành riêng</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold text-heading">Ưu đãi nổi bật</h2>
          <p className="mt-2 text-sm text-body">Bốn quyền lợi có thể kết hợp theo phương thức thanh toán và hồ sơ của từng khách hàng.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-[11px] text-body">
          <Info size={13} className="text-primary-600" /> Mức ưu đãi tính trên giá bán chưa VAT và phí bảo trì
        </span>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, tag, title, sub, subTone, iconBg, desc }) => (
          <div key={title} className="rounded-2xl border border-line bg-white p-5 shadow-sm" style={{ minHeight: 215 }}>
            <div className="flex items-center justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}><Icon size={17} /></span>
              <span className="text-[10px] font-semibold uppercase text-body">{tag}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-heading">{title}</h3>
            <p className={`mt-1 text-xs font-semibold ${subTone}`}>{sub}</p>
            <p className="mt-3 text-xs leading-relaxed text-body">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
