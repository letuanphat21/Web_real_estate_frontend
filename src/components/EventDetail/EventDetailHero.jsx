import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Bookmark,
  Clock,
  CheckCircle2,
} from "lucide-react";
import EventStatusBadge from "../Event/EventStatusBadge";
import { EVENT_CATEGORY_LABEL, EVENT_STATUS } from "../../types/event.types";
import { formatEventTime, formatWeekdayDate } from "../../utils/formatDate";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

const daysUntil = (iso) =>
  Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

export default function EventDetailHero({ event, saved, onToggleSave }) {
  const cover = event.images?.[0]?.imageUrl || FALLBACK_IMAGE;
  const remaining = event.maxAttendees - event.memberCount;
  const days = daysUntil(event.startTime);
  const canRegister =
    event.status === EVENT_STATUS.UPCOMING ||
    event.status === EVENT_STATUS.ONGOING;

  return (
    <section className="bg-hero pb-16 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav
          className="flex items-center gap-1.5 text-xs text-body"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-primary-600">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <Link to="/su-kien" className="hover:text-primary-600">
            Sự kiện
          </Link>
          <ChevronRight size={12} />
          <span className="line-clamp-1 font-medium text-primary-600">
            {event.title}
          </span>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <EventStatusBadge status={event.status} />
              {event.category && (
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
                  {EVENT_CATEGORY_LABEL[event.category]}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-heading md:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 max-w-xl text-body">{event.content}</p>

            <ul className="mt-6 space-y-3 text-sm text-heading">
              <li className="flex items-center gap-3">
                <CalendarDays size={18} className="shrink-0 text-primary-600" />
                {formatEventTime(event.startTime, event.endTime)} ·{" "}
                {formatWeekdayDate(event.startTime).split(",")[0]}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-primary-600" />
                {event.location}
              </li>
              <li className="flex items-center gap-3">
                <Users size={18} className="shrink-0 text-primary-600" />
                {event.maxAttendees} chỗ · Tổ chức bởi{" "}
                {event.organizer.fullName}
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {canRegister && (
                <a
                  href="#dang-ky"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95"
                >
                  Đăng ký tham dự <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary-200">
            <img
              src={cover}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            {days > 0 && canRegister && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-heading shadow backdrop-blur">
                <Clock size={13} className="text-primary-600" /> Còn {days} ngày
              </span>
            )}

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur md:right-auto md:max-w-sm">
              <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircle2 size={14} />
                {remaining > 0
                  ? `Còn ${remaining} chỗ trống`
                  : "Đã đủ số lượng tham dự"}
              </p>
              <p className="mt-1 font-semibold text-heading">
                {event.location}
              </p>
              <p className="mt-0.5 text-xs text-body">
                {event.memberCount} người đã đăng ký tham dự
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
