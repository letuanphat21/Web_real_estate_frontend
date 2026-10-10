import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { STAGES } from "./sceneConfig";

/**
 * Lớp chữ phủ trên cảnh 3D. Component tĩnh (không có state): GSAP điều khiển ẩn/hiện qua các
 * thuộc tính data-* (xem AssemblyAnimation.ts). Các panel của chặng sau ẩn sẵn bằng CSS để không
 * nhấp nháy trước khi timeline được dựng.
 */

const STAGE_PANELS = [
  {
    id: "explode",
    index: "01",
    eyebrow: "Giải phẫu kiến trúc",
    title: "Mỗi cấu kiện đều có lý do để tồn tại",
    body: "Mái phẳng, tường bao, vách kính, ban công, sàn và hệ dầm — mọi chi tiết được tính toán kỹ lưỡng trước khi khởi công.",
    tags: ["Mái", "Tường", "Kính", "Ban công", "Sàn", "Dầm"],
  },
  {
    id: "assemble",
    index: "02",
    eyebrow: "Lắp ghép chuẩn xác",
    title: "Chính xác đến từng milimet",
    body: "Quy trình thi công khép kín đưa từng cấu kiện về đúng vị trí — bền vững, an toàn và đúng tiến độ.",
  },
  {
    id: "complete",
    index: "03",
    eyebrow: "Hoàn thiện",
    title: "Sẵn sàng cho ngày bạn trở về",
    body: "Cảnh quan xanh, hồ bơi tràn bờ và ánh đèn ấm áp — một không gian sống trọn vẹn giữa thiên nhiên.",
    cta: { label: "Xem các dự án", to: "/projects" },
  },
];

const PANEL_POSITION = "col-start-1 row-start-1 self-end lg:self-center";
const PRIMARY_BUTTON =
  "group inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3 text-sm font-semibold text-[#1d160a] shadow-lg shadow-black/25 transition hover:bg-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
const SECONDARY_BUTTON =
  "inline-flex items-center gap-2 rounded-full border border-white/45 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

interface Props {
  reducedMotion: boolean;
}

export default function AssemblyOverlay({ reducedMotion }: Props) {
  const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";

  const goToAbout = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("gioi-thieu");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior, block: "start" });
  };

  const nudge = () => window.scrollBy({ top: Math.round(window.innerHeight * 0.9), behavior });

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white">
      {/* Lớp tối nhẹ giúp chữ trắng luôn đọc được trên nền trời sáng */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0b1424]/55 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#0b1424]/65 via-[#0b1424]/25 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0b1424]/90 via-[#0b1424]/45 to-transparent lg:hidden"
      />

      <div className="absolute inset-x-0 bottom-24 top-24 mx-auto flex max-w-7xl items-end px-5 sm:px-8 lg:inset-y-0 lg:items-center lg:px-12">
        <div className="grid w-full max-w-xl">
          <div data-panel="intro" className={PANEL_POSITION}>
            <p className="animate-rise-in flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-200">
              <span className="h-px w-10 bg-gold-300/80" />
              Đất Việt Group · Sky Villa
            </p>
            <h1
              id="hero-title"
              className="animate-rise-in mt-5 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight [animation-delay:120ms] sm:text-6xl lg:text-7xl"
            >
              Kiến tạo chốn an cư
              <span className="mt-1 block italic text-gold-200">giữa những tầng mây</span>
            </h1>
            <p className="animate-rise-in mt-5 max-w-md text-sm leading-relaxed text-white/80 [animation-delay:240ms] sm:text-base">
              Biệt thự kính và bê tông kiến trúc, thiết kế tinh tế và thi công chuẩn xác. Cuộn xuống để xem từng cấu
              kiện hợp lại thành một tổ ấm.
            </p>
            <div className="animate-rise-in pointer-events-auto mt-8 flex flex-wrap gap-3 [animation-delay:360ms]">
              <Link to="/projects" className={PRIMARY_BUTTON}>
                Khám phá dự án
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </Link>
              <a href="#gioi-thieu" onClick={goToAbout} className={SECONDARY_BUTTON}>
                Về chúng tôi
              </a>
            </div>
          </div>

          {STAGE_PANELS.map((panel) => (
            <div key={panel.id} data-panel={panel.id} className={`invisible opacity-0 ${PANEL_POSITION}`}>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-200">
                <span className="font-display text-base tracking-normal text-gold-300">{panel.index}</span>
                <span className="h-px w-8 bg-gold-300/70" />
                {panel.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-5xl">{panel.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">{panel.body}</p>
              {panel.tags && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {panel.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/85">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              {panel.cta && (
                <div className="pointer-events-auto mt-7">
                  <Link to={panel.cta.to} className={PRIMARY_BUTTON}>
                    {panel.cta.label}
                    <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thanh tiến trình: dọc bên phải (desktop) */}
      <div data-progress-ui aria-hidden="true" className="absolute right-8 top-1/2 hidden -translate-y-1/2 gap-5 lg:flex xl:right-12">
        <ol className="flex flex-col justify-between gap-7 text-right">
          {STAGES.map((stage, i) => (
            <li
              key={stage.label}
              data-stage-label={i}
              className={`text-[11px] font-medium uppercase tracking-[0.28em] ${i === 0 ? "opacity-100" : "opacity-40"}`}
            >
              <span className="mr-2 font-display text-sm tracking-normal text-gold-200">0{i + 1}</span>
              {stage.label}
            </li>
          ))}
        </ol>
        <div className="relative w-px overflow-hidden bg-white/20">
          <div
            data-progress-fill
            className="absolute inset-0 origin-top bg-gradient-to-b from-gold-200 to-gold-400"
            style={{ transform: "scaleY(0)" }}
          />
        </div>
      </div>

      {/* Thanh tiến trình: ngang dưới header (mobile/tablet) */}
      <div data-progress-ui aria-hidden="true" className="absolute inset-x-5 top-[88px] h-px bg-white/20 lg:hidden">
        <div data-progress-bar className="h-full origin-left bg-gold-300" style={{ transform: "scaleX(0)" }} />
      </div>

      <button
        type="button"
        data-scroll-cue
        onClick={nudge}
        aria-label="Cuộn xuống để xem quá trình lắp ráp biệt thự"
        className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.32em] text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="flex h-9 w-5.5 justify-center rounded-full border border-white/55 pt-1.5">
          <span className="animate-scroll-dot h-2 w-0.5 rounded-full bg-gold-200" />
        </span>
        Cuộn để khám phá
      </button>

      {/* Chặng 5: nền chuyển dần sang màu của section giới thiệu ngay bên dưới */}
      <div
        data-outro-veil
        aria-hidden="true"
        className="invisible absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0b1424] via-[#0b1424]/80 to-transparent opacity-0"
      />
    </div>
  );
}
