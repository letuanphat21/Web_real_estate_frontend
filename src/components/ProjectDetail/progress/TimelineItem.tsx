import { Images } from "lucide-react";
import Reveal from "../../common/Reveal";
import SafeImage from "../../common/SafeImage";
import { displayDate } from "./progressFormat";
import type { Progress, ViewImage } from "../../../types/progress.types";

type Props = {
  item: Progress;
  index: number;
  onOpen: (images: ViewImage[], index: number) => void;
};

export default function TimelineItem({ item, index, onOpen }: Props) {
  const date = displayDate(item);
  const left = index % 2 === 0; // luân phiên trái – phải trên desktop
  const imgs: ViewImage[] = item.images.map((i) => ({ src: i.imageUrl, title: item.title, date: date.toISOString() }));
  const thumbs = imgs.slice(1, 4);
  const extra = imgs.length - 4;

  const card = (
    <Reveal delay={80}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
        {date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
      </p>
      <h3 className="mt-2 text-2xl font-bold leading-tight text-heading md:text-3xl">{item.title}</h3>
      {item.content && <p className="mt-3 whitespace-pre-line leading-relaxed text-body">{item.content}</p>}

      {imgs.length > 0 && (
        <div className="mt-6">
          <Reveal variant="clip" delay={150}>
            <button
              onClick={() => onOpen(imgs, 0)}
              aria-label={`Xem ảnh: ${item.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <SafeImage src={imgs[0].src} alt={item.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-footer/0 transition duration-500 group-hover:bg-footer/30" />
            </button>
          </Reveal>

          {thumbs.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {thumbs.map((t, i) => (
                <button
                  key={t.src + i}
                  onClick={() => onOpen(imgs, i + 1)}
                  aria-label={`Xem ảnh ${i + 2}`}
                  className="group relative overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-primary-600"
                >
                  <SafeImage src={t.src} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110" />
                  {i === thumbs.length - 1 && extra > 0 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-footer/60 text-lg font-semibold text-white">+{extra}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => onOpen(imgs, 0)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
          >
            <Images size={15} /> Xem bộ ảnh ({imgs.length})
          </button>
        </div>
      )}
    </Reveal>
  );

  return (
    <article className="relative grid gap-y-6 pb-16 pl-16 last:pb-0 md:grid-cols-[1fr_88px_1fr] md:pl-0">
      {/* Mốc thời gian */}
      <div className="absolute left-0 top-1 flex flex-col items-center md:static md:col-start-2 md:row-start-1">
        <Reveal variant="zoom">
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-4 border-white bg-primary-600 text-white shadow-lg shadow-primary-200 md:h-[72px] md:w-[72px]">
            <span className="text-lg font-bold leading-none md:text-xl">{String(date.getDate()).padStart(2, "0")}</span>
            <span className="text-[10px] uppercase leading-tight opacity-80">T{date.getMonth() + 1}</span>
          </div>
        </Reveal>
      </div>

      <div className={`md:row-start-1 ${left ? "md:col-start-1 md:pr-10" : "md:col-start-3 md:pl-10"}`}>{card}</div>
    </article>
  );
}
