import { MapPin, Clock, ExternalLink, Navigation } from "lucide-react";
import { formatEventTime } from "../../utils/formatDate";
import type { Event } from "../../types/event/event.types";

interface EventLocationProps {
  event: Event;
}

export default function EventLocation({ event }: EventLocationProps) {
  const query = encodeURIComponent(event.location);
  const mapEmbed = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              Vị trí & đường đi
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
              Địa điểm tổ chức
            </h2>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-heading hover:border-primary-300 hover:text-primary-600"
          >
            Mở Google Maps <ExternalLink size={15} />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-h-[360px] overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Bản đồ địa điểm"
              src={mapEmbed}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-3xl border border-line bg-white p-6">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
              Địa điểm sự kiện
            </span>
            <p className="mt-4 text-xl font-semibold text-heading">
              {event.location}
            </p>

            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-primary-600"
                />
                <span className="text-body">{event.location}</span>
              </li>
              <li className="flex gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-primary-600" />
                <span className="text-body">
                  {formatEventTime(event.startTime, event.endTime)}
                </span>
              </li>
            </ul>

            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 py-3 text-sm font-medium text-white shadow-lg shadow-primary-300/50 hover:opacity-95"
            >
              <Navigation size={16} /> Chỉ đường
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
