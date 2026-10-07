import {
  APPLICATION_HISTORY_STATUS_ORDER,
  APPLICATION_RANGE_DAYS,
  type ApplicationHistoryItem,
  type ApplicationHistoryStatus,
  type ApplicationRange,
  type ApplicationSort,
  type CompanyTone,
  type UpcomingInterview,
} from "../../types/applicationHistory.types";

/** Hàm lọc/sắp xếp/đếm và định dạng cho trang Lịch sử ứng tuyển (chạy trên dữ liệu mock) */

export const PAGE_SIZE = 5;

export const TONE_CLASS: Record<CompanyTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-primary-50 text-primary-700",
  green: "bg-green-50 text-green-700",
  rose: "bg-rose-50 text-rose-700",
  amber: "bg-amber-50 text-amber-700",
};

export interface ApplicationQuery {
  status: ApplicationHistoryStatus | "ALL";
  keyword: string;
  range: ApplicationRange;
  sort: ApplicationSort;
}

const time = (iso: string) => new Date(iso).getTime();

export function filterApplications(items: ApplicationHistoryItem[], q: ApplicationQuery): ApplicationHistoryItem[] {
  const keyword = q.keyword.trim().toLowerCase();
  const maxAge = APPLICATION_RANGE_DAYS[q.range] * 86_400_000;

  return items
    .filter((a) => {
      if (q.status !== "ALL" && a.status !== q.status) return false;
      if (keyword && !`${a.jobTitle} ${a.company.name}`.toLowerCase().includes(keyword)) return false;
      if (Date.now() - time(a.appliedAt) > maxAge) return false;
      return true;
    })
    .sort((a, b) => {
      if (q.sort === "OLDEST") return time(a.appliedAt) - time(b.appliedAt);
      if (q.sort === "UPDATED") return time(b.updatedAt) - time(a.updatedAt);
      return time(b.appliedAt) - time(a.appliedAt);
    });
}

/** Số hồ sơ theo từng trạng thái (kèm tổng) */
export function countByStatus(items: ApplicationHistoryItem[]): Record<ApplicationHistoryStatus | "ALL", number> {
  const counts = { ALL: items.length } as Record<ApplicationHistoryStatus | "ALL", number>;
  for (const s of APPLICATION_HISTORY_STATUS_ORDER) counts[s] = items.filter((a) => a.status === s).length;
  return counts;
}

/** Số lịch phỏng vấn còn ở phía trước */
export const countUpcomingInterviews = (items: ApplicationHistoryItem[]): number =>
  items.filter((a) => a.status === "INTERVIEW" && a.interviewAt && time(a.interviewAt) > Date.now()).length;

/** Chỉ rút hồ sơ được khi nhà tuyển dụng chưa hẹn phỏng vấn hoặc chốt kết quả */
export const canWithdraw = (status: ApplicationHistoryStatus): boolean => status === "SENT" || status === "VIEWED";

/** "06/10" từ ISO */
export const formatShortDate = (iso: string): string => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const formatTimeOfDay = (iso: string): string => {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

/** "Thứ Ba" */
export const weekdayName = (iso: string): string => new Date(iso).toLocaleDateString("vi-VN", { weekday: "long" });

export const daysUntil = (iso: string): number => Math.max(0, Math.ceil((time(iso) - Date.now()) / 86_400_000));

const icsStamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Tải file .ics để thêm lịch phỏng vấn vào Google/Apple/Outlook Calendar */
export function downloadInterviewIcs(i: UpcomingInterview) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NovaLand Hub//Interview//VI",
    "BEGIN:VEVENT",
    `UID:interview-${i.applicationId}@novaland-hub`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(i.startAt)}`,
    `DTEND:${icsStamp(i.endAt)}`,
    `SUMMARY:Phỏng vấn ${i.jobTitle} - ${i.company.name}`,
    `LOCATION:${i.mode}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "lich-phong-van.ics";
  a.click();
  URL.revokeObjectURL(url);
}
