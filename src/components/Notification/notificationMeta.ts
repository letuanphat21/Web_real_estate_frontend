import { Info, Percent, ShoppingBag, type LucideIcon } from "lucide-react";
import type { NotificationType } from "../../types/notification.types";

/** Icon và màu theo loại thông báo (màu ngữ nghĩa dùng bảng màu mặc định của Tailwind) */
export const NOTIFICATION_META: Record<
  NotificationType,
  { icon: LucideIcon; iconClass: string; badgeClass: string }
> = {
  INFO: { icon: Info, iconClass: "bg-blue-500 text-white", badgeClass: "bg-blue-50 text-blue-600" },
  ORDER: { icon: ShoppingBag, iconClass: "bg-amber-500 text-white", badgeClass: "bg-amber-50 text-amber-600" },
  COMMISSION: { icon: Percent, iconClass: "bg-green-500 text-white", badgeClass: "bg-green-50 text-green-600" },
};
