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

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Sparkles,
    title: "Ra mắt giới hạn",
    desc: "Số lượng có hạn, ưu tiên khách đăng ký trước.",
  },
  {
    icon: ShieldCheck,
    title: "Thông tin minh bạch",
    desc: "Pháp lý, giá và tiến độ được công bố đầy đủ.",
  },
  {
    icon: Gift,
    title: "Đặc quyền trong ngày",
    desc: "Ưu đãi và quà tặng chỉ dành cho khách tham dự.",
  },
];

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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl bg-primary-50 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
              <Icon size={18} />
            </span>
            <p className="mt-3 text-sm font-semibold text-heading">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-body">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
