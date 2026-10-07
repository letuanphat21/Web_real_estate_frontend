import { Check, Maximize } from "lucide-react";
import type { PROJECT, ADVANTAGES } from "../../../data/projectDetail/location";

type Props = {
  project: typeof PROJECT;
  advantages: typeof ADVANTAGES;
};

export default function LocationAdvantages({ project, advantages }: Props) {
  const p = project;
  return (
    <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl" style={{ height: 460 }}>
        <img src={p.side} alt="Tâm điểm bên sông Sài Gòn" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-heading">
          <Maximize size={12} /> Góc nhìn flycam
        </span>
        <div className="absolute bottom-5 left-6 text-white">
          <p className="text-xl font-semibold">Tâm điểm bên sông Sài Gòn</p>
          <p className="mt-1 text-xs text-white/80">Thủ Thiêm · Quận 1 · Bán đảo Thanh Đa trong cùng một tầm nhìn</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-primary-600">Lợi thế vị trí</p>
        <h2 className="mt-3 text-4xl font-semibold leading-tight text-heading">Một bước chạm đô thị, một nhịp trở về thiên nhiên</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          Aurelia Riverside nằm tại giao điểm của ba giá trị hiếm có: lõi tài chính mới, hành lang giao thông chiến lược và dải công viên ven sông.
        </p>
        <ul className="mt-6 space-y-3">
          {advantages.map((a) => (
            <li key={a.title} className="flex items-center gap-4 rounded-2xl border border-line bg-primary-50/60 px-5 py-4">
              <Check size={16} className="text-primary-600" />
              <span>
                <span className="block text-sm font-semibold text-heading">{a.title}</span>
                <span className="block text-xs text-body">{a.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
