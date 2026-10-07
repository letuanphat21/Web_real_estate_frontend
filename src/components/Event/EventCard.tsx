import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import EventStatusBadge from "./EventStatusBadge";
import { EVENT_STATUS, EVENT_CATEGORY_LABEL, type Event } from "../../types/event.types";
import { formatEventTime } from "../../utils/formatDate";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";

/** Trạng thái đăng ký hiển thị ở chân card, suy ra từ status + số chỗ */
function getRegistration(event: Event) {
  if (event.status === EVENT_STATUS.CANCELLED) {
    return { text: "Sự kiện đã hủy", className: "text-danger" };
  }
  if (event.status === EVENT_STATUS.ENDED) {
    return { text: "Đã đóng đăng ký", className: "text-body" };
  }
  const remaining = event.maxAttendees - event.memberCount;
  if (remaining <= 0) {
    return { text: "Hết chỗ", className: "text-danger" };
  }
  if (remaining <= 10) {
    return { text: `Chỉ còn ${remaining} chỗ`, className: "text-amber-600" };
  }
  return { text: "Còn chỗ · Đăng ký miễn phí", className: "text-success" };
}

/** @param {{ event: import("../../../types/event.types").Event }} props */
export default function EventCard({ event }: { event: Event }) {
  const cover = event.images?.[0]?.imageUrl || FALLBACK_IMAGE;
  const registration = getRegistration(event);
  const detailPath = `/events/${event.id}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100">
      <Link
        to={detailPath}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <img
          src={cover}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE)
              e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <EventStatusBadge status={event.status} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {event.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">
            {EVENT_CATEGORY_LABEL[event.category]}
          </span>
        )}

        <Link to={detailPath}>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-heading transition-colors group-hover:text-primary-600">
            {event.title}
          </h3>
        </Link>

        <ul className="mb-5 mt-4 space-y-2 text-sm text-body">
          <li className="flex items-center gap-2">
            <CalendarDays size={15} className="shrink-0" />
            {formatEventTime(event.startTime, event.endTime)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0" />
            <span className="truncate">{event.location}</span>
          </li>
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className={registration.className}>{registration.text}</span>
          <Link
            to={detailPath}
            className="flex items-center gap-1 font-semibold text-primary-600 hover:gap-2 transition-all"
          >
            Xem chi tiết <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
