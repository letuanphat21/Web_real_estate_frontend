import { useEffect, useRef, useState } from "react";
import TimelineItem from "./TimelineItem";
import type { Progress, ViewImage } from "../../../types/progress.types";

type Props = {
  items: Progress[];
  onOpen: (images: ViewImage[], index: number) => void;
};

export default function ProgressTimeline({ items, onOpen }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  // Đường timeline được "tô" dần theo vị trí cuộn
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const reached = window.innerHeight * 0.6 - r.top;
      setFill(Math.max(0, Math.min(1, reached / r.height)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div ref={box} className="relative">
      <span aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-primary-100 md:left-1/2" />
      <span
        aria-hidden
        className="absolute left-7 top-0 h-full w-px origin-top bg-primary-600 md:left-1/2"
        style={{ transform: `scaleY(${fill})` }}
      />
      {items.map((it, i) => (
        <TimelineItem key={it.id} item={it} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
}
