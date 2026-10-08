import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { NOTIFICATION_META } from "./notificationMeta";
import { NOTIFICATION_TYPE_LABEL, type NotificationItem } from "../../types/notification.types";

/** Một thông báo: icon loại, nhãn, nội dung (tên dự án in đậm), thời gian, chấm chưa đọc và nút "Xem" */
export default function NotificationCard({
  item,
  onView,
}: {
  item: NotificationItem;
  onView: (id: number) => void;
}) {
  const meta = NOTIFICATION_META[item.type];
  const Icon = meta.icon;

  return (
    <li
      className={`relative rounded-xl border bg-white p-4 transition hover:shadow-md ${
        item.read ? "border-line hover:border-primary-200" : "border-blue-100 hover:border-blue-300"
      }`}
    >
      {item.read ? (
        <span className="absolute right-4 top-3.5 rounded-md bg-amber-900/10 px-2 py-0.5 text-[11px] font-medium text-amber-900/70">
          Đã xem
        </span>
      ) : (
        <span
          className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-500"
          role="img"
          aria-label="Chưa đọc"
        />
      )}

      <div className="flex gap-3">
        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta.iconClass}`}>
          <Icon size={14} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${meta.badgeClass}`}>
            {NOTIFICATION_TYPE_LABEL[item.type]}
          </span>

          <p className="mt-2 pr-2 text-sm leading-relaxed text-body">
            {item.message.map((seg, i) =>
              seg.bold ? (
                <strong key={i} className="font-bold text-footer">
                  {seg.text}
                </strong>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <time className="text-xs text-gray-400">{item.createdText}</time>
            <Link
              to={item.href}
              onClick={() => onView(item.id)}
              className="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-heading transition hover:bg-primary-50 hover:text-primary-700 after:rounded-xl after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500"
            >
              <Eye size={14} className="text-gray-400" aria-hidden /> Xem
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
