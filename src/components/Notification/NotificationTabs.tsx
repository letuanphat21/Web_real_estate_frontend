import { NOTIFICATION_META } from "./notificationMeta";
import { NOTIFICATION_TABS, type NotificationTab } from "../../types/notification.types";

/** Hàng tab dạng viên thuốc, kèm số thông báo chưa đọc của từng loại */
export default function NotificationTabs({
  value,
  unreadCounts,
  onChange,
}: {
  value: NotificationTab;
  unreadCounts: Record<NotificationTab, number>;
  onChange: (tab: NotificationTab) => void;
}) {
  return (
    <div role="tablist" aria-label="Loại thông báo" className="flex gap-2 overflow-x-auto px-5 py-3">
      {NOTIFICATION_TABS.map((t) => {
        const active = value === t.id;
        const Icon = t.id === "ALL" ? null : NOTIFICATION_META[t.id].icon;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
              active ? "bg-footer font-semibold text-white" : "bg-gray-50 font-medium text-body hover:bg-primary-50"
            }`}
          >
            {Icon && <Icon size={12} className={active ? "" : "text-gray-400"} aria-hidden />}
            {t.label} ({unreadCounts[t.id]})
          </button>
        );
      })}
    </div>
  );
}
