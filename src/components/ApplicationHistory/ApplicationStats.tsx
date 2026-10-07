import { CalendarCheck, Copy, Eye, Send, XCircle, type LucideIcon } from "lucide-react";
import { countByStatus, countUpcomingInterviews } from "./applicationHistoryUtils";
import type { ApplicationHistoryItem } from "../../types/applicationHistory.types";

function StatCard({
  label,
  value,
  note,
  icon: Icon,
  iconClass,
}: {
  label: string;
  value: number;
  note: string;
  icon: LucideIcon;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs text-body">{label}</p>
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon size={14} aria-hidden />
        </span>
      </div>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-heading">{value}</span>
        <span className="text-[11px] text-gray-400">{note}</span>
      </p>
    </div>
  );
}

/** 5 ô số liệu tổng quan, tính từ danh sách hồ sơ */
export default function ApplicationStats({ items }: { items: ApplicationHistoryItem[] }) {
  const c = countByStatus(items);
  const upcoming = countUpcomingInterviews(items);
  const viewedPercent = c.ALL ? Math.round((c.VIEWED / c.ALL) * 100) : 0;

  return (
    <section aria-label="Thống kê hồ sơ" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <StatCard label="Tổng hồ sơ" value={c.ALL} note="Tất cả thời gian" icon={Copy} iconClass="bg-primary-50 text-primary-600" />
      <StatCard label="Đã gửi" value={c.SENT} note="Đang chờ phản hồi" icon={Send} iconClass="bg-blue-50 text-blue-600" />
      <StatCard label="Đã xem" value={c.VIEWED} note={`${viewedPercent}% tổng hồ sơ`} icon={Eye} iconClass="bg-primary-50 text-primary-600" />
      <StatCard label="Hẹn phỏng vấn" value={c.INTERVIEW} note={`${upcoming} lịch sắp tới`} icon={CalendarCheck} iconClass="bg-green-50 text-green-600" />
      <StatCard label="Không phù hợp" value={c.REJECTED} note={c.REJECTED ? "Có phản hồi" : "Chưa có"} icon={XCircle} iconClass="bg-red-50 text-red-500" />
    </section>
  );
}
