import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { News, NewsImage } from "../../types/news.types";
import NewsShareBar from "./NewsShareBar";

interface NewsArticleProps {
  news: News;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

// Tách nội dung thành các đoạn theo dòng trống / xuống dòng
const toParagraphs = (content: string): string[] =>
  content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

export default function NewsArticle({ news }: NewsArticleProps) {
  const [cover, ...gallery] = news.images;
  const [lead, ...paragraphs] = toParagraphs(news.content ?? "");
  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
      <figure className="group relative">
        <button
          type="button"
          onClick={() => cover && setViewing(0)}
          className="block aspect-[16/9] w-full overflow-hidden"
          aria-label="Xem ảnh lớn"
        >
          <img
            src={cover?.imageUrl || FALLBACK_IMAGE}
            alt={cover?.title || news.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          />
        </button>
        {cover?.title && (
          <figcaption className="border-b border-line bg-page px-6 py-3 text-center text-xs italic text-body md:px-10">
            {cover.title}
          </figcaption>
        )}
      </figure>

      <div className="px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-2xl">
          {lead && (
            <p className="border-l-4 border-primary-500 pl-5 text-lg font-medium leading-8 text-heading md:text-xl md:leading-9">
              {lead}
            </p>
          )}

          <div className="mt-6 space-y-5 text-base leading-8 text-heading/90 md:text-[17px]">
            {paragraphs.map((p, i) => (
              <p key={i} className="break-words">
                {p}
              </p>
            ))}
          </div>

          {gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
                <Images size={16} /> Hình ảnh ({gallery.length})
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((image, i) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setViewing(i + 1)}
                    className={`group relative overflow-hidden rounded-2xl bg-primary-50 ${
                      i === 0 && gallery.length >= 3
                        ? "col-span-2 row-span-2"
                        : ""
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      loading="lazy"
                      className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {image.title && (
                      <span className="absolute inset-x-0 bottom-0 line-clamp-1 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-left text-xs text-white opacity-0 transition group-hover:opacity-100">
                        {image.title}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-page p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-heading">
              Thấy bài viết hữu ích? Chia sẻ ngay
            </p>
            <NewsShareBar title={news.title} />
          </div>
        </div>
      </div>

      {viewing !== null && (
        <Lightbox
          images={news.images}
          index={viewing}
          onChange={setViewing}
          onClose={() => setViewing(null)}
        />
      )}
    </article>
  );
}

interface LightboxProps {
  images: NewsImage[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const count = images.length;
  const image = images[index];
  const go = (step: number) => onChange((index + step + count) % count);

  // Esc đóng, ← → chuyển ảnh, khoá cuộn trang khi đang mở
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
      if (e.key === "ArrowRight") onChange((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, count, onChange, onClose]);

  const navBtn =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
      >
        <X size={20} />
      </button>

      <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
        <img
          src={image.imageUrl}
          alt={image.title}
          className="max-h-[80vh] w-auto rounded-xl object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-white/80">
          {image.title}{" "}
          <span className="text-white/50">
            · {index + 1}/{count}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Ảnh trước"
            className={`${navBtn} left-4`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Ảnh tiếp"
            className={`${navBtn} right-4`}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}
