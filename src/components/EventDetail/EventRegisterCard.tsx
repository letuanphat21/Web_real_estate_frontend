import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Info,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EVENT_STATUS } from "../../types/event/event.types";
import type { Event } from "../../types/event/event.types";
import { formatEventTime } from "../../utils/formatDate";

interface EventRegisterCardProps {
  event: Event;
  joined: boolean;
  joining: boolean;
  onJoin: () => void;
  onLeave?: () => void;
}

interface ButtonState {
  text: string;
  disabled: boolean;
}

interface InfoRow {
  icon: LucideIcon;
  label: string;
  value: string;
}

function getButtonState(event: Event, joined: boolean): ButtonState {
  if (joined) return { text: "Đã đăng ký · Hủy", disabled: false };
  if (event.status === EVENT_STATUS.CANCELLED)
    return { text: "Sự kiện đã hủy", disabled: true };
  if (event.status === EVENT_STATUS.COMPLETED)
    return { text: "Sự kiện đã kết thúc", disabled: true };
  if (event.attendeeCount >= event.maxAttendees)
    return { text: "Đã hết chỗ", disabled: true };
  return { text: "Đăng ký tham dự", disabled: false };
}

export default function EventRegisterCard({
  event,
  joined,
  joining,
  onJoin,
  onLeave,
}: EventRegisterCardProps) {
  const percent = Math.min(
    100,
    event.maxAttendees > 0
      ? Math.round((event.attendeeCount / event.maxAttendees) * 100)
      : 0
  );
  const button = getButtonState(event, joined);

  const rows: InfoRow[] = [
    {
      icon: CalendarDays,
      label: "Thời gian",
      value: formatEventTime(event.startTime, event.endTime),
    },
    { icon: MapPin, label: "Địa điểm", value: event.location },
    {
      icon: Users,
      label: "Số lượng",
      value: `Tối đa ${event.maxAttendees} khách`,
    },
  ];

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div
        id="dang-ky"
        className="scroll-mt-28 rounded-3xl border border-line bg-white p-6 shadow-xl shadow-primary-100/60"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-body">Phí tham gia</p>
            <p className="text-2xl font-bold text-success">Miễn phí</p>
          </div>
          {event.attendeeCount < event.maxAttendees &&
            event.status !== EVENT_STATUS.COMPLETED && (
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                Còn chỗ
              </span>
            )}
        </div>

        <ul className="mt-5 space-y-4">
          {rows.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-xs text-body">{label}</p>
                <p className="text-sm font-medium text-heading">{value}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-heading">
              {event.attendeeCount}/{event.maxAttendees} đã đăng ký
            </span>
            <span className="text-primary-600">{percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-50">
            <div
              style={{ width: `${percent}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-700 transition-all duration-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={joined ? onLeave : onJoin}
          disabled={button.disabled || joining}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:shadow-none"
        >
          {joining ? "Đang xử lý..." : button.text}
          {joined ? (
            <CheckCircle2 size={16} />
          ) : (
            !button.disabled && <ArrowRight size={16} />
          )}
        </button>

        <p className="mt-4 flex gap-2 rounded-xl bg-primary-50 p-3 text-xs leading-relaxed text-body">
          <Info size={14} className="mt-0.5 shrink-0 text-primary-600" />
          Đăng ký xong bạn sẽ nhận email xác nhận và nhắc lịch trước sự kiện 1
          ngày.
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-white p-5">
        <p className="font-semibold text-heading">Cần hỗ trợ đăng ký?</p>
        <p className="mt-1 text-xs text-body">
          Đội ngũ hỗ trợ từ 08:00 đến 21:00 hằng ngày.
        </p>
        <a
          href="tel:19008686"
          className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary-600"
        >
          <Phone size={15} /> 1900 8686
        </a>
      </div>
    </div>
  );
}
