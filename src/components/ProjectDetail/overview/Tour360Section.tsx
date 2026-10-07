import { Play, Plus, ArrowRight } from "lucide-react";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import { outlineBtn } from "../styles";

export default function Tour360Section() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          id="anh-360"
          eyebrow="Ảnh 360°"
          title="Bước vào không gian sống trước khi nhận nhà"
          desc="Khám phá căn hộ mẫu 3 phòng ngủ, sảnh đón và hệ tiện ích Aurelia bằng trải nghiệm toàn cảnh."
          action={<button className={`${outlineBtn} bg-white`}>Xem tất cả tour 360° <ArrowRight size={15} /></button>}
        />
        <div className="relative overflow-hidden rounded-3xl" style={{ height: 470 }}>
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" alt="Tour 360" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-footer/80 via-footer/10 to-transparent" />
          <span className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase text-heading">
            Tour 360° · Căn A1-03
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <button aria-label="Phát tour" className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-xl">
              <Play size={28} />
            </button>
            <p className="mt-3 text-xs font-medium">Kéo để khám phá không gian</p>
          </div>
          {[["27%", "30%"], ["65%", "45%"]].map(([l, t]) => (
            <span key={l} style={{ left: l, top: t }} className="absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-white">
              <Plus size={14} />
            </span>
          ))}
          <div className="absolute bottom-7 left-7 text-white">
            <p className="text-2xl font-semibold">Căn hộ 3 phòng ngủ · 126,8 m²</p>
            <p className="mt-1 text-xs text-white/80">Tòa Terra · Tầm nhìn sông và trung tâm</p>
          </div>
          <div className="absolute bottom-7 right-7 flex gap-2">
            {["Phòng khách", "Bếp", "Phòng ngủ master"].map((r) => (
              <span key={r} className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-heading">{r}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
