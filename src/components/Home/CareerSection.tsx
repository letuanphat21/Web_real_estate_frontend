import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText } from "lucide-react";
import CareerMockup from "./CareerMockup";
import Reveal from "../common/Reveal";
import { EYEBROW, GHOST_BUTTON, GOLD_BUTTON } from "./homeStyles";

const HIGHLIGHTS = [
  "Hơn 460 vị trí mới đang tuyển",
  "CV thông minh với gợi ý từ AI",
  "Hồ sơ nổi bật, tăng cơ hội được nhà tuyển dụng chú ý",
];

export default function CareerSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-gold-300/15 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950 py-20"
      aria-labelledby="career-heading"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#2b4a7a]/30 blur-3xl" />
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <Reveal variant="left">
        <div>
          <p className={EYEBROW}>
            <span className="h-px w-10 bg-gold-300/80" />
            Cơ hội nghề nghiệp
          </p>
          <h2
            id="career-heading"
            className="mt-5 font-display text-3xl font-medium leading-tight text-white md:text-[2.6rem]"
          >
            Sự nghiệp bất động sản, <em className="text-gold-200">theo cách chuyên nghiệp hơn.</em>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-white/70">
            Kết nối với nhà tuyển dụng uy tín, tạo CV chuẩn ngành và tìm đội ngũ phù hợp với định hướng phát triển của
            bạn.
          </p>

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-300/50 text-gold-200">
                  <Check size={12} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className={GOLD_BUTTON}>
              Khám phá việc làm <ArrowRight size={16} aria-hidden className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/jobs/create-cv" className={GHOST_BUTTON}>
              Tạo CV miễn phí <FileText size={16} aria-hidden />
            </Link>
          </div>
        </div>
        </Reveal>

        <Reveal variant="right" delay={150}>
          <CareerMockup />
        </Reveal>
      </div>
    </section>
  );
}
