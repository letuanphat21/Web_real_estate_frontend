import { useState } from "react";
import { markNotificationsRead, useReadNotificationIds } from "./notificationReadStore";
import { MOCK_NOTIFICATIONS } from "../../data/mockProjects";
import { NOTIFICATION_TABS, type NotificationTab } from "../../types/notification.types";

/**
 * Danh sách thông báo cho ngăn kéo và trang Thông báo. Tab đang chọn là state riêng của từng nơi;
 * trạng thái đã xem được lưu chung (xem notificationReadStore) nên không bị mất khi rời trang.
 * TODO: lấy dữ liệu và đồng bộ "đã đọc" qua API.
 */
export default function useNotifications() {
  const readIds = useReadNotificationIds();
  const [tab, setTab] = useState<NotificationTab>("ALL");

  const items = MOCK_NOTIFICATIONS.map((n) => ({ ...n, read: n.read || readIds.includes(n.id) }));

  const unreadCounts = Object.fromEntries(
    NOTIFICATION_TABS.map((t) => [
      t.id,
      items.filter((n) => !n.read && (t.id === "ALL" || n.type === t.id)).length,
    ])
  ) as Record<NotificationTab, number>;

  return {
    tab,
    setTab,
    unreadCounts,
    visible: items.filter((n) => tab === "ALL" || n.type === tab),
    markRead: (id: number) => markNotificationsRead([id]),
    markAllRead: () => markNotificationsRead(MOCK_NOTIFICATIONS.map((n) => n.id)),
  };
}
