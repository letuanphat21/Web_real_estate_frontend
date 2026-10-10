import { Link } from "react-router-dom";
import { ArrowRight, Compass, HardHat, ShieldCheck, Trees } from "lucide-react";
import Reveal from "../common/Reveal";

// TODO: thay bằng nội dung giới thiệu chính thức của công ty
const PILLARS = [
  {
    icon: Compass,
    title: "Kiến trúc tinh tuyển",
    desc: "Thiết kế hiện đại, tối ưu ánh sáng, gió và tầm nhìn cho từng không gian sống.",
  },
  {
    icon: HardHat,
    title: "Thi công chuẩn mực",
    desc: "Kiểm soát chất lượng nhiều lớp, vật liệu tuyển chọn và tiến độ minh bạch.",
  },
  {
    icon: ShieldCheck,
    title: "Pháp lý minh bạch",
    desc: "Hồ sơ dự án rõ ràng, thông tin được xác thực và cập nhật liên tục.",
  },
  {
    icon: Trees,
    title: "Sống hài hoà thiên nhiên",
    desc: "Cảnh quan xanh và tiện ích được quy hoạch như một phần của kiến trúc.",
  },
];

/** Section ngay sau hero 3D — nền trùng màu lớp chuyển cảnh cuối hero để nối liền mạch. */
export default function CompanyIntroSection() {
  return (
    <section
      id="gioi-thieu"
      aria-labelledby="gioi-thieu-title"
      className="relative overflow-hidden bg-[#0b1424] py-20 text-white md:py-28"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="container relative mx-auto grid gap-14 px-4 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-200">
            <span className="h-px w-10 bg-gold-300/80" />
            Về Đất Việt Group
          </p>
          <h2 id="gioi-thieu-title" className="mt-6 font-display text-4xl font-medium leading-tight md:text-5xl">
            Chúng tôi không chỉ xây nhà —{" "}
            <span className="italic text-gold-200">chúng tôi kiến tạo phong cách sống.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/70">
            Từ bản vẽ đầu tiên đến ngày bàn giao, Đất Việt Group đồng hành cùng khách hàng trong từng quyết định: chọn vị
            trí, thiết kế kiến trúc, kiểm soát thi công và hoàn thiện cảnh quan. Mỗi dự án là một cam kết về chất lượng
            sống lâu dài.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3 text-sm font-semibold text-[#1d160a] transition hover:bg-gold-200"
            >
              Xem dự án tiêu biểu
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
            >
              Sự kiện mở bán
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 110}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-300/40 hover:bg-white/[0.07]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/40 text-gold-200 transition group-hover:bg-gold-300 group-hover:text-[#1d160a]">
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
