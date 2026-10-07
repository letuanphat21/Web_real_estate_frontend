import { BellOff } from "lucide-react";
import NotificationCard from "./NotificationCard";
import type { NotificationItem } from "../../types/notification.types";

/** Danh sách thông báo; hiện trạng thái rỗng khi không có thông báo nào */
export default function NotificationFeed({
  items,
  onView,
}: {
  items: NotificationItem[];
  onView: (id: number) => void;
}) {
  if (items.length === 0) {
    return (
      <div role="status" className="flex flex-col items-center py-20 text-center">
        <BellOff size={36} className="text-primary-300" aria-hidden />
        <p className="mt-4 text-sm font-medium text-heading">Chưa có thông báo</p>
        <p className="mt-1 text-xs text-body">Thông báo mới sẽ xuất hiện tại đây.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((n) => (
        <NotificationCard key={n.id} item={n} onView={onView} />
      ))}
    </ul>
  );
}
