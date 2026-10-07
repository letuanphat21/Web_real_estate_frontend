import type { NotificationItem } from "../types/notification.types";

// TODO: thay bằng danh sách thông báo từ API (kèm trạng thái đã đọc của người dùng)

const projectLaunched = (name: string): NotificationItem["message"] => [
  { text: "Dự án " },
  { text: name, bold: true },
  { text: " vừa được mở bán trên hệ thống NovaLand Hub." },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: "INFO",
    message: projectLaunched("CRYSTAL HOLIDAYS HARBOUR VÂN ĐỒN"),
    createdText: "07/10/2026 08:50:07",
    read: false,
    href: "/projects",
  },
  {
    id: 2,
    type: "INFO",
    message: projectLaunched("SELAVIA PHÚ QUỐC"),
    createdText: "02/10/2026 16:34:17",
    read: true,
    href: "/projects",
  },
  {
    id: 3,
    type: "INFO",
    message: projectLaunched("MỸ ĐÌNH PEARL"),
    createdText: "02/10/2026 16:16:17",
    read: false,
    href: "/projects",
  },
];
