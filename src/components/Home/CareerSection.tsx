import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Check, FileText, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  "Hơn 460 vị trí mới đang tuyển",
  "CV thông minh với gợi ý từ AI",
  "Hồ sơ nổi bật, tăng cơ hội được nhà tuyển dụng chú ý",
];

const JOBS = [
  { title: "Chuyên viên Tư vấn Cao cấp", company: "Masterise Homes", salary: "28–40 triệu", active: true },
  { title: "Trưởng nhóm Kinh doanh", company: "Dat Xanh Services", salary: "45–100 triệu" },
  { title: "Sales dự án Eaton Park", company: "Gamuda Land", salary: "35–70 triệu" },
  { title: "Công tác Kinh doanh", company: "Savills Vietnam", salary: "20–50 triệu" },
];

const STATS = [
  { value: "4 năm", label: "Kinh nghiệm" },
  { value: "128", label: "Lượt xem" },
  { value: "4,9/5", label: "Đánh giá" },
];

const SKILLS = ["Tư vấn đầu tư", "Đàm phán", "CRM", "Tiếng Anh"];

/** Mockup giao diện việc làm + hồ sơ CV bên phải (dựng bằng HTML/CSS, không phải ảnh) */
function CareerMockup() {
  return (
    <div
      className="grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 sm:grid-cols-[0.8fr_1.2fr]"
      role="img"
      aria-label="Minh họa danh sách việc làm phù hợp và hồ sơ CV của ứng viên"
    >
      <div className="border-b border-line bg-primary-50/50 p-4 sm:border-b-0 sm:border-r">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-heading">Việc làm phù hợp</p>
          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">24</span>
        </div>
        <ul className="space-y-2">
          {JOBS.map((j) => (
            <li
              key={j.title}
              className={`flex items-start justify-between gap-2 rounded-xl bg-white p-3 ring-1 ${
                j.active ? "ring-primary-300" : "ring-line"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-heading">{j.title}</p>
                <p className="truncate text-[10px] text-muted">{j.company}</p>
                <p className="mt-1 text-[10px] font-semibold text-primary-600">{j.salary}</p>
              </div>
              <Bookmark size={12} className="mt-0.5 shrink-0 text-muted" aria-hidden />
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">CV Builder</p>
            <p className="truncate text-xs font-semibold text-heading">Hồ sơ của Nguyễn Quang Minh</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <div className="h-1.5 w-14 overflow-hidden rounded-full bg-primary-100">
              <div className="h-full w-[82%] rounded-full bg-success" />
            </div>
            <span className="text-[10px] font-semibold text-success">82%</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/120?img=15"
            alt="Ảnh đại diện Nguyễn Quang Minh"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-heading">Nguyễn Quang Minh</p>
            <p className="text-[11px] text-body">Chuyên viên tư vấn Cao cấp</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-primary-50 px-2 py-2 text-center">
              <dd className="text-sm font-bold text-heading">{s.value}</dd>
              <dt className="text-[10px] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-3 rounded-xl bg-primary-50 p-3">
          <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
            <Sparkles size={11} aria-hidden /> Gợi ý từ Nova AI
          </p>
          <p className="mt-1 text-[11px] leading-snug text-body">
            Thêm số liệu doanh số vào mục kinh nghiệm để tăng độ tin cậy với nhà tuyển dụng.
          </p>
        </div>

        <p className="mt-3 text-[11px] font-semibold text-heading">Kỹ năng nổi bật</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] text-primary-700">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
              to="/tuyen-dung"
              className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-primary-700 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Khám phá việc làm <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              to="/tuyen-dung/tao-cv"
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
