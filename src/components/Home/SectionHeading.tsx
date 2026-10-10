import type { ReactNode } from "react";
import Reveal from "../common/Reveal";
import { EYEBROW } from "./homeStyles";
type Props = {
  badge?: string;
  title: ReactNode;
  desc?: ReactNode;
  action?: ReactNode;
};

/** Tiêu đề section trên nền navy: dòng chữ nhỏ vàng + tiêu đề serif (bọc phần nhấn trong <em>) */
export default function SectionHeading({ badge, title, desc, action }: Props) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {badge && (
          <p className={EYEBROW}>
            <span className="h-px w-10 bg-gold-300/80" />
            {badge}
          </p>
        )}
        <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-white md:text-[2.6rem] [&_em]:text-gold-200">
          {title}
        </h2>
        {desc && <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">{desc}</p>}
      </div>
      {action}
    </Reveal>
  );
}
