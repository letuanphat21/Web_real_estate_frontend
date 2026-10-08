import type { ReactNode } from "react";
import Reveal from "../common/Reveal";
type Props = {
  badge?: string;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
  action?: ReactNode;
};

export default function SectionHeading({ badge, title, desc, dark = false, action }: Props) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {badge && (
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
              dark ? "bg-white/10 text-primary-300" : "bg-primary-50 text-primary-600"
            }`}
          >
            {badge}
          </span>
        )}
        <h2
          className={`mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl ${
            dark ? "text-white" : "text-heading"
          }`}
        >
          {title}
        </h2>
        {desc && (
          <p className={`mt-3 text-sm md:text-base ${dark ? "text-white/70" : "text-body"}`}>
            {desc}
          </p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
