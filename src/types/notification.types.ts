export type NotificationType = "INFO" | "ORDER" | "COMMISSION";

/** Một đoạn nội dung; `bold` để in đậm tên dự án trong câu thông báo */
export interface NotificationSegment {
  text: string;
  bold?: boolean;
}

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: NotificationSegment[];
  createdText: string; // đã định dạng sẵn, vd: "07/10/2026 08:50:07"
  read: boolean;
  /** đường dẫn mở khi bấm "Xem" */
  href: string;
}

export type NotificationTab = "ALL" | NotificationType;

export const NOTIFICATION_TABS: { id: NotificationTab; label: string }[] = [
  { id: "ALL", label: "Tất cả" },
  { id: "INFO", label: "Thông tin" },
  { id: "ORDER", label: "Đơn hàng" },
  { id: "COMMISSION", label: "Cơ chế hoa hồng" },
];

export const NOTIFICATION_TYPE_LABEL: Record<NotificationType, string> = {
  INFO: "Thông tin",
  ORDER: "Đơn hàng",
  COMMISSION: "Cơ chế hoa hồng",
};
