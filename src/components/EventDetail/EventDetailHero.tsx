import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import EventStatusBadge from "../Event/EventStatusBadge";
import { EVENT_STATUS } from "../../types/event.types";
import type { Event } from "../../types/event.types";
import { formatEventTime, formatWeekdayDate } from "../../utils/formatDate";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

const SLIDE_INTERVAL = 4000;

const daysUntil = (iso: string): number =>
  Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

interface EventDetailHeroProps {
  event: Event;
}

export default function EventDetailHero({ event }: EventDetailHeroProps) {
  const images = event.images?.length
    ? event.images.map((img) => img.imageUrl)
    : [FALLBACK_IMAGE];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Tự chuyển ảnh khi có nhiều hơn 1 ảnh, dừng khi rê chuột vào
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(
      () => setCurrent((i) => (i + 1) % images.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(timer);
  }, [images.length, paused]);

  const active = current < images.length ? current : 0;
  const remaining = event.maxAttendees - event.attendeeCount;
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
          <Link to="/events" className="hover:text-primary-600">
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
                {event.maxAttendees} chỗ
                {event.createdBy?.fullName &&
                  ` · Tổ chức bởi ${event.createdBy.fullName}`}
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

          <div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary-200"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {images.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={`${event.title} - ảnh ${i + 1}`}
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_IMAGE)
                    e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {images.length > 1 && (
              <div className="absolute left-4 top-4 flex gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Xem ảnh ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}

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
                {event.attendeeCount} người đã đăng ký tham dự
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
