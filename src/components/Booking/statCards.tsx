import type { ReactNode } from "react";
import { Copy, Clock, CalendarCheck, CircleCheck, CircleX } from "lucide-react";
import type { BookingStatus } from "../../types/booking.types";

export const STAT_CARDS: { key: BookingStatus | "ALL"; label: string; note: string; icon: ReactNode; tone: string }[] = [
  { key: "ALL", label: "Tổng booking", note: "Tất cả yêu cầu giữ chỗ", icon: <Copy size={15} />, tone: "bg-primary-100 text-primary-600" },
  { key: "PENDING", label: "Chờ xác nhận", note: "yêu cầu chưa phân công", icon: <Clock size={15} />, tone: "bg-warning/10 text-warning" },
  { key: "CONFIRMED", label: "Đã xác nhận", note: "Đang giữ chỗ căn", icon: <CalendarCheck size={15} />, tone: "bg-primary-100 text-primary-600" },
  { key: "COMPLETED", label: "Hoàn tất", note: "Đã hoàn tất giao dịch", icon: <CircleCheck size={15} />, tone: "bg-success/10 text-success" },
  { key: "CANCELLED", label: "Đã hủy", note: "Căn đã được mở lại", icon: <CircleX size={15} />, tone: "bg-danger/10 text-danger" },
];
