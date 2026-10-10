import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Search, ArrowRight, MapPin, Wallet, Maximize, BedDouble } from "lucide-react";
import { EYEBROW, IMAGE_CHIP } from "./homeStyles";

const TAGS = ["Thủ Đức", "Hướng sông", "Dưới 5 tỷ", "Đã bàn giao"];
const FILTERS = [
  { icon: MapPin, label: "Khu vực", value: "TP. Hồ Chí Minh" },
  { icon: Wallet, label: "Khoảng giá", value: "3 – 8 tỷ" },
  { icon: Maximize, label: "Diện tích", value: "70 – 120 m²" },
  { icon: BedDouble, label: "Số PN", value: "2 – 3 PN" },
];

// Thẻ dự án: nghiêng theo chuột + trôi nhẹ theo cuộn trang (parallax)
function FeaturedCard() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(Math.min(window.scrollY, 600)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
  };

  return (
    <div style={{ transform: `translateY(${scrollY * -0.08}px)` }} className="animate-rise-in [animation-delay:300ms]">
      <div className="animate-float-y">
        <div
          ref={wrap}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-transform duration-200 ease-out"
        >
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
            alt="The Lumen Riverside"
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className={`absolute right-4 top-4 flex items-center gap-1.5 px-3 py-1 text-xs font-medium ${IMAGE_CHIP}`}>
            <Sparkles size={12} /> Quỹ căn cập nhật 5 phút trước
          </span>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-ink-950/75 p-4 backdrop-blur">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang mở bán
            </span>
            <div className="mt-1 flex items-end justify-between">
              <div>
                <p className="font-display text-lg text-white">The Lumen Riverside</p>
                <p className="text-xs text-white/60">Thủ Đức, TP. HCM</p>
              </div>
              <p className="font-semibold text-gold-200">Từ 4,2 tỷ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mode, setMode] = useState<"basic" | "ai">("ai");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-950 to-ink-900 text-white">
      <span aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      {/* Quầng xanh trời của hero 3D */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#2b4a7a]/40 blur-3xl" />
      <div aria-hidden="true" className="container relative mx-auto px-4 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container relative mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <p className={`animate-rise-in ${EYEBROW}`}>
            <span className="h-px w-10 bg-gold-300/80" />
            Nền tảng bất động sản thế hệ mới
          </p>

          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
            <span className="animate-rise-in block [animation-delay:100ms]">Tìm đúng không gian,</span>
            <span className="animate-rise-in block italic text-gold-200 [animation-delay:220ms]">sống đúng tương lai.</span>
          </h2>

          <p className="animate-rise-in mt-5 max-w-xl leading-relaxed text-white/70 [animation-delay:340ms]">
            Khám phá dự án, quỹ căn minh bạch và chuyên gia phù hợp — tất cả trong một hệ sinh thái được hỗ trợ bởi AI.
          </p>

          {/* Ô tìm kiếm */}
          <div className="animate-rise-in mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30 backdrop-blur [animation-delay:460ms]">
            <div className="inline-flex rounded-full bg-white/[0.06] p-1 text-xs font-medium ring-1 ring-white/10">
              {(["basic", "ai"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-1.5 transition ${
                    mode === m ? "bg-gold-300 text-gold-950 shadow" : "text-white/60 hover:text-gold-200"
                  }`}
                >
                  {m === "basic" ? "Cơ bản" : "AI Search"}
                </button>
              ))}
            </div>

            {mode === "ai" ? (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 transition focus-within:border-gold-300/60 focus-within:ring-4 focus-within:ring-gold-300/10">
                <Sparkles size={16} className="text-gold-300" />
                <input
                  placeholder="Căn hộ 2 phòng ngủ gần Metro, ban công hướng Đông..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <Link to="/projects" aria-label="Tìm kiếm" className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-300 text-gold-950 transition hover:scale-110 hover:bg-gold-200">
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-[repeat(4,1fr)_auto]">
                {FILTERS.map(({ icon: Icon, label, value }) => (
                  <button key={label} className="rounded-xl border border-white/10 bg-ink-950/40 px-3 py-2 text-left transition hover:border-gold-300/40 hover:bg-white/[0.06]">
                    <span className="flex items-center gap-1 text-[10px] text-white/50"><Icon size={11} /> {label}</span>
                    <span className="text-sm font-medium text-white">{value}</span>
                  </button>
                ))}
                <Link to="/projects" className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-gold-300 px-5 py-3 text-sm font-semibold text-gold-950 transition hover:bg-gold-200 md:col-span-1">
                  <Search size={15} /> Tìm
                </Link>
              </div>
            )}
          </div>

          <div className="animate-rise-in mt-4 flex flex-wrap items-center gap-2 text-xs [animation-delay:580ms]">
            <span className="text-white/50">Tìm nhanh:</span>
            {TAGS.map((t) => (
              <Link key={t} to="/projects" className="rounded-full border border-white/15 px-3 py-1 text-white/80 transition hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-300 hover:text-gold-950">
                {t}
              </Link>
            ))}
          </div>
        </div>

        <FeaturedCard />
      </div>
    </section>
  );
}
