import { useReadNotificationIds } from "./notificationReadStore";
import { MOCK_NOTIFICATIONS } from "../../data/mockProjects";

/** Số thông báo chưa xem (dùng cho số đếm ở menu Header) */
export default function useUnreadNotificationCount(): number {
  const readIds = useReadNotificationIds();
  return MOCK_NOTIFICATIONS.filter((n) => !n.read && !readIds.includes(n.id)).length;
}
