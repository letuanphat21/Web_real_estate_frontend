/** Lịch sử ứng tuyển của người dùng (UI dùng mock, BE sẽ trả về sau) */

export type ApplicationHistoryStatus = "SENT" | "VIEWED" | "INTERVIEW" | "DONE" | "REJECTED";

export const APPLICATION_HISTORY_STATUS_ORDER: ApplicationHistoryStatus[] = [
  "SENT",
  "VIEWED",
  "INTERVIEW",
  "DONE",
  "REJECTED",
];

/** Nhãn và màu badge theo trạng thái (dùng bảng màu mặc định của Tailwind cho màu ngữ nghĩa) */
export const APPLICATION_HISTORY_STATUS_META: Record<
  ApplicationHistoryStatus,
  { label: string; badge: string }
> = {
  SENT: { label: "Đã gửi", badge: "bg-primary-100 text-primary-700" },
  VIEWED: { label: "Đã xem", badge: "bg-blue-50 text-blue-600" },
  INTERVIEW: { label: "Hẹn phỏng vấn", badge: "bg-green-50 text-green-600" },
  DONE: { label: "Đã hoàn tất", badge: "bg-gray-100 text-gray-500" },
  REJECTED: { label: "Không phù hợp", badge: "bg-red-50 text-red-500" },
};

/** Tông màu của ô logo công ty */
export type CompanyTone = "blue" | "purple" | "green" | "rose" | "amber";

export interface ApplicationCompany {
  name: string;
  initials: string;
  tone: CompanyTone;
}

export interface ApplicationHistoryItem {
  id: number;
  /** id tin tuyển dụng, dùng để mở trang chi tiết việc làm */
  jobId: number;
  jobTitle: string;
  company: ApplicationCompany;
  location: string;
  salaryText: string;
  status: ApplicationHistoryStatus;
  appliedAt: string; // ISO
  updatedAt: string; // ISO
  cv: { fileName: string; url: string };
  /** mốc thời gian trên timeline; thiếu mốc nào thì bước đó chưa diễn ra */
  viewedAt?: string;
  interviewAt?: string;
  /** phản hồi của nhà tuyển dụng khi không phù hợp */
  feedback?: string;
}

export interface UpcomingInterview {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  company: ApplicationCompany;
  department: string;
  startAt: string; // ISO
  endAt: string; // ISO
  mode: string; // vd: "Online qua Microsoft Teams"
  confirmed: boolean;
}

export type ApplicationRange = "1m" | "3m" | "6m" | "all";

export const APPLICATION_RANGE_LABEL: Record<ApplicationRange, string> = {
  "1m": "1 tháng gần đây",
  "3m": "3 tháng gần đây",
  "6m": "6 tháng gần đây",
  all: "Tất cả thời gian",
};

export const APPLICATION_RANGE_DAYS: Record<ApplicationRange, number> = {
  "1m": 30,
  "3m": 90,
  "6m": 180,
  all: Infinity,
};

export type ApplicationSort = "NEWEST" | "OLDEST" | "UPDATED";

export const APPLICATION_SORT_LABEL: Record<ApplicationSort, string> = {
  NEWEST: "Mới nhất",
  OLDEST: "Cũ nhất",
  UPDATED: "Cập nhật gần nhất",
};
