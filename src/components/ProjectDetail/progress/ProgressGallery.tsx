import { useState } from "react";
import Reveal from "../../common/Reveal";
import SafeImage from "../../common/SafeImage";
import { formatFull } from "./progressFormat";
import type { ViewImage } from "../../../types/progress.types";

type Props = {
  images: ViewImage[];
  onOpen: (images: ViewImage[], index: number) => void;
};

const PAGE = 9;
// Mẫu bố cục editorial lặp theo chu kỳ 6 ảnh (ảnh lớn xen ảnh nhỏ)
const SPANS = ["md:col-span-2 md:row-span-2", "", "", "md:row-span-2", "", "md:col-span-2"];

export default function ProgressGallery({ images, onOpen }: Props) {
  const [shown, setShown] = useState(PAGE);
  if (images.length === 0) return null;

  return (
    <section className="bg-footer py-16 text-white md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">Thư viện hình ảnh</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Công trình qua từng khoảnh khắc</h2>
        </Reveal>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {images.slice(0, shown).map((img, i) => (
            <Reveal key={img.src + i} delay={(i % 4) * 80} className={`h-full ${SPANS[i % SPANS.length]}`}>
              <button
                onClick={() => onOpen(images, i)}
                aria-label={`Xem ảnh: ${img.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <SafeImage src={img.src} alt={img.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-footer/90 via-footer/20 to-transparent p-4 text-left opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="translate-y-2 text-sm font-semibold transition duration-500 group-hover:translate-y-0">{img.title}</span>
                  {img.date && <span className="text-[11px] text-white/70">{formatFull(new Date(img.date))}</span>}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {shown < images.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShown((n) => n + PAGE)}
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95"
            >
              Xem thêm ({images.length - shown} ảnh)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
