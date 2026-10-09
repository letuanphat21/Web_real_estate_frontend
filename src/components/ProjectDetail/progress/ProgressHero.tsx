import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowDown, MapPin } from "lucide-react";
import SafeImage from "../../common/SafeImage";
import { displayDate, formatFull } from "./progressFormat";
import type { ProjectProgress } from "../../../types/progress.types";

type Props = { base: string; data: ProjectProgress; onJump: () => void };

const LINES = ["Hành trình", "kiến tạo", "giá trị"];

export default function ProgressHero({ base, data, onJump }: Props) {
  const { project, items } = data;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(Math.min(window.scrollY, 700)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const latest = items[0];
  const heroImage = latest?.images[0]?.imageUrl ?? project.overviewImage;
  const photoCount = items.reduce((n, p) => n + p.images.length, 0);

  const stats = [
    { label: "Cập nhật gần nhất", value: latest ? formatFull(displayDate(latest)) : "Chưa có" },
    { label: "Bản cập nhật", value: String(items.length) },
    { label: "Hình ảnh", value: String(photoCount) },
  ];

  return (
    <section className="relative overflow-hidden bg-footer text-white">
      <span className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-primary-600/30 blur-3xl" />

      <div className="container relative mx-auto grid gap-10 px-4 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8 lg:pb-20">
        <div className="lg:pb-4">
          <nav className="animate-rise-in flex items-center gap-3 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base} className="hover:text-white">{project.name}</Link> <ChevronRight size={12} />
            <span className="font-semibold text-white">Tiến độ</span>
          </nav>

          <p className="animate-rise-in mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300 [animation-delay:100ms]">
            <span className="h-px w-10 bg-primary-300" /> {project.name}
          </p>

          <h1 className="mt-5 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-7xl">
            {LINES.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <span
                  className={`animate-rise-in block ${i === LINES.length - 1 ? "bg-gradient-to-r from-primary-300 to-white bg-clip-text text-transparent" : ""}`}
                  style={{ animationDelay: `${200 + i * 140}ms` }}
                >
                  {l}
                </span>
              </span>
            ))}
          </h1>

          <p className="animate-rise-in mt-6 max-w-md text-white/70 [animation-delay:650ms]">
            Theo dõi từng giai đoạn phát triển của dự án qua các báo cáo và hình ảnh thực tế được cập nhật theo thời gian.
          </p>

          <p className="animate-rise-in mt-4 flex items-center gap-1.5 text-sm text-white/60 [animation-delay:750ms]">
            <MapPin size={14} /> {project.location} · Chủ đầu tư {project.investor}
          </p>

          <button
            onClick={onJump}
            className="animate-rise-in group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-700 transition hover:bg-primary-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 [animation-delay:850ms]"
          >
            Xem tiến độ
            <ArrowDown size={16} className="transition group-hover:translate-y-1" />
          </button>
        </div>

        <div className="animate-rise-in [animation-delay:300ms]">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40">
            <SafeImage
              src={heroImage}
              alt={`Hình ảnh dự án ${project.name}`}
              loading="eager"
              style={{ transform: `translateY(${scrollY * 0.06}px) scale(1.12)` }}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <dl className="container mx-auto grid grid-cols-3 divide-x divide-white/10 px-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-5 first:pl-0 md:px-8">
              <dt className="text-[11px] uppercase tracking-wider text-white/50">{s.label}</dt>
              <dd className="mt-1 text-lg font-semibold md:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
