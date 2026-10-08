import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Search, ArrowRight, MapPin, Wallet, Maximize, BedDouble } from "lucide-react";

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
          className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-primary-300/40 transition-transform duration-200 ease-out"
        >
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
            alt="The Lumen Riverside"
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary-600 backdrop-blur">
            <Sparkles size={12} /> Quỹ căn cập nhật 5 phút trước
          </span>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang mở bán
            </span>
            <div className="mt-1 flex items-end justify-between">
              <div>
                <p className="font-semibold text-heading">The Lumen Riverside</p>
                <p className="text-xs text-body">Thủ Đức, TP. HCM</p>
              </div>
              <p className="font-semibold text-primary-600">Từ 4,2 tỷ</p>
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
    <section className="relative overflow-hidden bg-gradient-to-br from-hero-start via-primary-50 to-white">
      <span className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />

      <div className="container relative mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <span className="animate-rise-in inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-primary-600 shadow-sm">
            <Sparkles size={12} /> NỀN TẢNG BẤT ĐỘNG SẢN THẾ HỆ MỚI
          </span>

          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-heading md:text-6xl">
            <span className="animate-rise-in block [animation-delay:100ms]">Tìm đúng không gian,</span>
            <span className="animate-rise-in block bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent [animation-delay:220ms]">
              Sống đúng tương lai.
            </span>
          </h1>

          <p className="animate-rise-in mt-5 max-w-xl text-body [animation-delay:340ms]">
            Khám phá dự án, quỹ căn minh bạch và chuyên gia phù hợp — tất cả trong một hệ sinh thái được hỗ trợ bởi AI.
          </p>

          {/* Ô tìm kiếm */}
          <div className="animate-rise-in mt-8 rounded-2xl bg-white p-4 shadow-xl shadow-primary-200/50 [animation-delay:460ms]">
            <div className="inline-flex rounded-full bg-primary-50 p-1 text-xs font-medium">
              {(["basic", "ai"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-1.5 transition ${
                    mode === m ? "bg-primary-600 text-white shadow" : "text-body hover:text-primary-600"
                  }`}
                >
                  {m === "basic" ? "Cơ bản" : "AI Search"}
                </button>
              ))}
            </div>

            {mode === "ai" ? (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-line px-4 py-3 transition focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
                <Sparkles size={16} className="text-primary-600" />
                <input
                  placeholder="Căn hộ 2 phòng ngủ gần Metro, ban công hướng Đông..."
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
                <Link to="/projects" aria-label="Tìm kiếm" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white transition hover:scale-110 hover:bg-primary-700">
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-[repeat(4,1fr)_auto]">
                {FILTERS.map(({ icon: Icon, label, value }) => (
                  <button key={label} className="rounded-xl border border-line px-3 py-2 text-left transition hover:border-primary-300 hover:bg-primary-50">
                    <span className="flex items-center gap-1 text-[10px] text-body"><Icon size={11} /> {label}</span>
                    <span className="text-sm font-medium text-heading">{value}</span>
                  </button>
                ))}
                <Link to="/projects" className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-700 md:col-span-1">
                  <Search size={15} /> Tìm
                </Link>
              </div>
            )}
          </div>

          <div className="animate-rise-in mt-4 flex flex-wrap items-center gap-2 text-xs [animation-delay:580ms]">
            <span className="text-body">Tìm nhanh:</span>
            {TAGS.map((t) => (
              <Link key={t} to="/projects" className="rounded-full bg-white px-3 py-1 text-primary-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white">
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
