// Khớp enum TargetType ở BE: đối tượng mà thông báo trỏ tới
export type NotificationTargetType =
  | "EVENT"
  | "NEWS"
  | "JOB"
  | "APPLICATION"
  | "PROJECT"
  | "POST"
  | "BOOKING"
  | "PROPERTY"
  | "SYSTEM";

/** Một thông báo của người dùng đang đăng nhập (UserNotificationResponse) */
export interface NotificationItem {
  id: number; // id của bản ghi user_notification, dùng để đánh dấu đã đọc / xoá
  isRead: boolean;
  readAt: string | null;
  notificationId: number;
  title: string;
  content: string;
  image: string | null;
  targetType: NotificationTargetType | null;
  targetId: number | null;
  actionUrl: string | null;
  createdAt: string;
  notificationTypeId: number;
  notificationTypeName: string;
}

/** Loại thông báo đang hiện, dùng dựng tab lọc (NotificationTypeResponse) */
export interface NotificationTypeItem {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}

/** Số chưa đọc: total cho chuông, byType (key là notificationTypeId) cho từng tab */
export interface UnreadCount {
  total: number;
  byType: Record<number, number>;
}

// "ALL" hoặc id loại thông báo
export type NotificationTab = "ALL" | number;
