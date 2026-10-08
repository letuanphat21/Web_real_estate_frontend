import { Sparkles, ShieldCheck, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Event } from "../../types/event.types";

interface Highlight {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface EventAboutProps {
  event: Event;
}

export default function EventAbout({ event }: EventAboutProps) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
        Về sự kiện
      </span>
      <h2 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
        Giới thiệu sự kiện
      </h2>

      <p className="mt-4 whitespace-pre-line leading-relaxed text-body">
        {event.content}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3"></div>
    </div>
  );
}
