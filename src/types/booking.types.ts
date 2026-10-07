// Bám theo bảng booking: customer (user_id FK), property (property_id FK), status, assignee, request_time...

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export const BOOKING_STATUS_META: Record<
  BookingStatus,
  { label: string; badge: string; dot: string; icon: string; note: string }
> = {
  PENDING: { label: "Chờ xác nhận", badge: "bg-warning/10 text-warning", dot: "bg-warning", icon: "text-warning", note: "Chờ chuyên viên xử lý" },
  CONFIRMED: { label: "Đã xác nhận", badge: "bg-primary-100 text-primary-700", dot: "bg-primary-600", icon: "text-primary-600", note: "Căn đang được giữ chỗ" },
  COMPLETED: { label: "Hoàn tất", badge: "bg-success/10 text-success", dot: "bg-success", icon: "text-success", note: "Giao dịch đã hoàn tất" },
  CANCELLED: { label: "Đã hủy", badge: "bg-danger/10 text-danger", dot: "bg-danger", icon: "text-danger", note: "Đã mở lại quỹ căn" },
};

export const BOOKING_STATUS_ORDER: BookingStatus[] = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export interface BookingCustomer {
  id: number;
  code: string; // USR-00128
  fullName: string;
}

export interface BookingProperty {
  id: number;
  code: string; // PR-01208
  projectId: number;
  projectName: string;
  unitCode: string; // AR-A1-1208
  spec: string;
  image: string;
}

export interface BookingAssignee {
  id: number;
  fullName: string;
  role: string;
}

export interface Booking {
  id: number;
  code: string; // BK-261007-024
  type: string;
  customer: BookingCustomer;
  property: BookingProperty;
  status: BookingStatus;
  assignee: BookingAssignee | null;
  requestTime: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingSort = "NEWEST" | "OLDEST";

export const BOOKING_SORT_LABEL: Record<BookingSort, string> = {
  NEWEST: "Yêu cầu mới nhất",
  OLDEST: "Yêu cầu cũ nhất",
};
