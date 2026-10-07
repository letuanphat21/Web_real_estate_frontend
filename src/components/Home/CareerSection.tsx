import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText } from "lucide-react";
import CareerMockup from "./CareerMockup";

const HIGHLIGHTS = [
  "Hơn 460 vị trí mới đang tuyển",
  "CV thông minh với gợi ý từ AI",
  "Hồ sơ nổi bật, tăng cơ hội được nhà tuyển dụng chú ý",
];

export default function CareerSection() {
  return (
    <section className="bg-footer py-20" aria-labelledby="career-heading">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div>
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-300">
            Cơ hội nghề nghiệp
          </span>
          <h2
            id="career-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
          >
            Sự nghiệp bất động sản, theo cách chuyên nghiệp hơn.
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Kết nối với nhà tuyển dụng uy tín, tạo CV chuẩn ngành và tìm đội ngũ phù hợp với định hướng phát triển của
            bạn.
          </p>

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-300">
                  <Check size={12} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/jobs"
              className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-primary-700 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Khám phá việc làm <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              to="/jobs/create-cv"
              className="flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Tạo CV miễn phí <FileText size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <CareerMockup />
      </div>
    </section>
  );
}
