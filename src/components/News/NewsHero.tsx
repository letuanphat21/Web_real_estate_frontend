import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Newspaper, TrendingUp } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import type { News } from "../../types/news.types";

interface NewsHeroProps {
  total: number;
  featured: News[];
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1000&q=80";
const AUTOPLAY_MS = 5000;

export default function NewsHero({ total, featured }: NewsHeroProps) {
  return (
    <section className="bg-hero pb-24 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav
          className="flex items-center gap-1.5 text-xs text-body"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-primary-600">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-primary-600">Tin tức</span>
        </nav>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
              <TrendingUp size={13} /> Dữ liệu thị trường · Góc nhìn chuyên gia
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading md:text-5xl">
              Tin tức bất động sản
            </h1>
            <p className="mt-3 max-w-2xl text-body">
              Cập nhật nhanh chuyển động thị trường, dự án, pháp lý, quy hoạch
              và xu hướng sống từ mạng lưới chuyên gia NovaLand Hub.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-body">
              <Newspaper size={16} className="text-primary-600" />
              <b className="text-heading">
                {total.toLocaleString("vi-VN")} bài viết
              </b>
              {featured[0] && <>· Cập nhật {formatDate(featured[0].createdAt)}</>}
            </p>
          </div>

          <FeaturedSlider items={featured} />
        </div>
      </div>
    </section>
  );
}

// Slider bài nổi bật: tự chuyển mỗi 5s, rê chuột vào thì dừng
function FeaturedSlider({ items }: { items: News[] }) {
  const [current, setIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const count = items.length;
  // Danh sách ngắn lại thì không bị trỏ ra ngoài
  const index = count ? current % count : 0;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const frame =
    "relative hidden aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl shadow-primary-200 lg:block";

  // Chưa có dữ liệu → ảnh mặc định
  if (count === 0) {
    return (
      <div className={frame}>
        <img src={FALLBACK_IMAGE} alt="Tin tức bất động sản" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`group ${frame}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((n, i) => (
        <Link
          key={n.id}
          to={`/news/${n.id}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            src={n.images[0]?.imageUrl || FALLBACK_IMAGE}
            alt={n.title}
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-5 bottom-10 text-white">
            {n.category && (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
                {n.category.name}
              </span>
            )}
            <p className="mt-2 line-clamp-2 text-lg font-semibold leading-snug">{n.title}</p>
            <p className="mt-1 text-xs text-white/80">{formatDate(n.createdAt)}</p>
          </div>
        </Link>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Bài trước"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-heading opacity-0 transition group-hover:opacity-100 hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Bài tiếp"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-heading opacity-0 transition group-hover:opacity-100 hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-5 flex gap-1.5">
            {items.map((n, i) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem bài ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
