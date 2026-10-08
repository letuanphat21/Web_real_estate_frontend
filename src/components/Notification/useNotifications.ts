import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "../../data/mockNotifications";
import { NOTIFICATION_TABS, type NotificationTab } from "../../types/notification.types";

/**
 * Trạng thái giao diện của danh sách thông báo (tab đang chọn, đã đọc/chưa đọc), dùng chung cho ngăn kéo và trang.
 * TODO: lấy dữ liệu và đồng bộ "đã đọc" qua API.
 */
export default function useNotifications() {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);
  const [tab, setTab] = useState<NotificationTab>("ALL");

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
    markRead: (id: number) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
    markAllRead: () => setItems((prev) => prev.map((n) => ({ ...n, read: true }))),
  };
}
