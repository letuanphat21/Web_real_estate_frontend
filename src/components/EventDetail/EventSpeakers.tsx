import { BadgeCheck } from "lucide-react";
import type { EventSpeaker } from "../../types/event.types";

interface EventSpeakersProps {
  speakers: EventSpeaker[];
}

export default function EventSpeakers({ speakers }: EventSpeakersProps) {
  if (!speakers.length) return null;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
        Gặp gỡ chuyên gia
      </span>
      <h2 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
        Diễn giả & chuyên gia đồng hành
      </h2>
      <p className="mt-2 text-sm text-body">
        Những gương mặt giàu kinh nghiệm sẽ chia sẻ và giải đáp trực tiếp tại sự
        kiện.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {speakers.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-line p-4 transition hover:border-primary-300 hover:shadow-md"
          >
            <img
              src={s.avatarUrl}
              alt={s.fullName}
              className="h-14 w-14 rounded-full object-cover"
            />
            <p className="mt-3 flex items-center gap-1 font-semibold text-heading">
              {s.fullName} <BadgeCheck size={15} className="text-primary-600" />
            </p>
            <p className="mt-0.5 text-xs text-body">{s.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
