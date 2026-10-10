import { Link } from "react-router-dom";
import { Rotate3d, Play, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "../common/Reveal";
import { GHOST_BUTTON, IMAGE_CHIP } from "./homeStyles";

const ROWS = [
  { label: "Giá", a: "5,2 tỷ", b: "6,8 tỷ" },
  { label: "Diện tích", a: "72 m²", b: "80 m²" },
  { label: "Giá/m²", a: "72 tr", b: "85 tr" },
  { label: "Phòng ngủ", a: "2", b: "3" },
  { label: "Pháp lý", a: "Sổ hồng", b: "HĐMB" },
  { label: "Bàn giao", a: "Đã bàn giao", b: "Q2/2027" },
];

export default function CompareSection() {
  return (
    <section className="bg-ink-950 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="So sánh & VR360"
          title={
            <>
              So sánh sắc nét. <em>Trải nghiệm như đang ở đó.</em>
            </>
          }
          desc="Đặt các căn cạnh nhau để thấy rõ khác biệt, rồi bước vào tham quan bằng VR360."
          action={
            <Link to="/so-sanh" className={GHOST_BUTTON}>
              Mở công cụ so sánh <ArrowRight size={16} />
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Bảng so sánh */}
          <Reveal variant="left">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-3 bg-white/[0.05] px-5 py-4 text-sm font-semibold text-gold-200">
              <span className="font-medium text-white/50">Tiêu chí</span>
              <span>The Lumen</span>
              <span>Aurora Bay</span>
            </div>
            {ROWS.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-3 border-t border-white/10 px-5 py-3.5 text-sm"
              >
                <span className="text-white/55">{r.label}</span>
                <span className="font-medium text-white">{r.a}</span>
                <span className="font-medium text-white">{r.b}</span>
              </div>
            ))}
          </div>
          </Reveal>

          {/* VR360 */}
          <Reveal variant="right" delay={150}>
          <div className="group relative min-h-[360px] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
              alt="Tham quan VR360"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/15 to-transparent" />

            <span className={`absolute left-5 top-5 flex items-center gap-2 px-3 py-1.5 text-xs font-medium ${IMAGE_CHIP}`}>
              <Rotate3d size={14} /> VR360
            </span>

            <button
              aria-label="Bắt đầu tham quan"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-300 text-gold-950 shadow-xl shadow-black/40 ring-8 ring-gold-300/20 transition hover:scale-110 hover:bg-gold-200"
            >
              <Play size={22} className="ml-1" fill="currentColor" />
            </button>

            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-display text-2xl">Phòng khách · 2PN</p>
              <p className="text-sm text-white/75">The Lumen Riverside</p>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
