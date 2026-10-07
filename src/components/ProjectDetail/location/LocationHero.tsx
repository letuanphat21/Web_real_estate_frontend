import { MapPin, Navigation, ArrowDown } from "lucide-react";
import type { PROJECT } from "../../../data/projectDetail/location";

type Props = {
  project: typeof PROJECT;
};

export default function LocationHero({ project }: Props) {
  const p = project;
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: "clamp(380px, 36vw, 510px)" }}>
      <img src={p.hero} alt={p.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-footer/70 via-footer/30 to-transparent" />
      <div className="absolute left-9 top-1/2 max-w-xl -translate-y-1/2 text-white">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase backdrop-blur">
          <MapPin size={12} /> Aurelia Riverside · Thủ Thiêm
        </span>
        <h1 className="mt-5 text-5xl font-bold leading-tight">Vị trí chiến lược giữa tâm điểm Thủ Thiêm</h1>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
          <Navigation size={15} /> {p.address}
        </p>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
          Kề sông Sài Gòn, kết nối trực tiếp lõi tài chính mới và chỉ một nhịp cầu đến trung tâm Quận 1.
        </p>
        <a href="#ban-do" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-heading">
          Xem trên bản đồ <ArrowDown size={15} />
        </a>
      </div>
      <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur" style={{ width: 240 }}>
        <p className="text-[10px] font-semibold uppercase text-primary-600">Lợi thế địa lý</p>
        <p className="mt-1 text-xl font-bold text-heading">3 phút đến Quận 1</p>
        <p className="mt-1 text-[11px] text-body">Qua hầm Thủ Thiêm hoặc cầu Ba Son</p>
      </div>
    </div>
  );
}
