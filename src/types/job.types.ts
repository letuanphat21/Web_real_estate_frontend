export type { PageResponse } from "./event.types";

export type JobBadgeType = "HOT" | "URGENT" | "FEATURED";

export const JOB_BADGE_META: Record<JobBadgeType, { label: string; className: string }> = {
  HOT: { label: "Hot", className: "border-amber-200 bg-amber-50 text-warning" },
  URGENT: { label: "Tuyển gấp", className: "border-danger/20 bg-danger/10 text-danger" },
  FEATURED: { label: "Nổi bật", className: "border-line bg-white text-body" },
};

export type WorkType = "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";

export const WORK_TYPE_LABEL: Record<WorkType, string> = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Làm từ xa",
  FREELANCE: "Cộng tác viên",
};

/** Cấp bậc */
export type JobLevel = "STAFF" | "TEAM_LEAD" | "MANAGER" | "DIRECTOR";

export const JOB_LEVEL_LABEL: Record<JobLevel, string> = {
  STAFF: "Nhân viên",
  TEAM_LEAD: "Trưởng nhóm",
  MANAGER: "Quản lý",
  DIRECTOR: "Giám đốc",
};

/** Loại hình BĐS: `label` dùng ở bộ lọc, `short` dùng trên card */
export type PropertyType = "LUXURY_APARTMENT" | "VILLA" | "TOWNHOUSE" | "LAND";

export const PROPERTY_TYPE_META: Record<PropertyType, { label: string; short: string }> = {
  LUXURY_APARTMENT: { label: "Căn hộ cao cấp", short: "Căn hộ" },
  VILLA: { label: "Biệt thự", short: "Biệt thự" },
  TOWNHOUSE: { label: "Nhà phố", short: "Nhà phố" },
  LAND: { label: "Đất nền", short: "Đất nền" },
};

export type SalaryRange = "UNDER_30" | "30_100" | "OVER_100";

/** min/max tính theo triệu đồng/tháng */
export const SALARY_RANGE_META: Record<SalaryRange, { label: string; min: number; max: number }> = {
  UNDER_30: { label: "Dưới 30 triệu", min: 0, max: 30 },
  "30_100": { label: "30–100 triệu", min: 30, max: 100 },
  OVER_100: { label: "Trên 100 triệu", min: 100, max: Infinity },
};

/** Khu vực: key là giá trị lưu trên URL/chip, value là nhãn đầy đủ trong select */
export const LOCATION_LABEL: Record<string, string> = {
  "TP.HCM": "TP. Hồ Chí Minh",
  "Hà Nội": "Hà Nội",
  "Đà Nẵng": "Đà Nẵng",
  "Bình Dương": "Bình Dương",
};

export const PROJECTS = [
  "The Global City",
  "Gladia by the Waters",
  "Eaton Park",
  "Aurelia Riverside",
] as const;

export type JobSort = "NEWEST" | "SALARY" | "DEADLINE";

export const JOB_SORT = {
  NEWEST: "NEWEST",
  SALARY: "SALARY",
  DEADLINE: "DEADLINE",
} as const;

export const JOB_SORT_LABEL: Record<JobSort, string> = {
  NEWEST: "Mới nhất",
  SALARY: "Lương cao nhất",
  DEADLINE: "Sắp hết hạn",
};

export interface Company {
  id: number;
  name: string;
  logoUrl?: string;
  /** chữ hiển thị khi không có logo */
  initials: string;
  /** màu nền logo */
  colorClass: string;
  openJobs: number;
  rating: number;
}

/** Trạng thái tin tuyển dụng (Jobs.status) */
export type JobStatus = "open" | "closed";

export interface JobType {
  id: number;
  name: string;
}

/**
 * Dữ liệu hiển thị bổ sung CHƯA có trong DB (công ty, hoa hồng, dự án...).
 * Optional: component chỉ vẽ khi có dữ liệu, để sau này backend bổ sung là bật lên.
 */
export interface JobDisplayExtras {
  company?: Company;
  badge?: JobBadgeType;
  commission?: string;
  project?: string;
  propertyType?: PropertyType;
  level?: JobLevel;
  /** khóa thành phố dùng cho bộ lọc (key của LOCATION_LABEL) */
  city?: string;
}

/** Tin tuyển dụng trả về client: chỉ field công khai (không embedding, admin_note, deleted_at...) */
export interface Job extends JobDisplayExtras {
  id: number;
  title: string;
  jobType: JobType;
  location: string;
  salaryMin: number | null; // triệu đồng/tháng (null nếu không có)
  salaryMax: number | null;
  currency: string; // "VND" | "USD"
  salaryNegotiable: boolean;
  experience: string; // vd: "1 năm"
  deadline: string; // ISO
  status: JobStatus;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
}

/** Bản ghi đầy đủ phía server (mock). Không bao giờ gửi nguyên cho client. */
export interface JobRecord extends Job {
  embedding?: number[];
  updatedBy?: number;
  deletedAt: string | null;
}

/** Việc làm gợi ý theo hồ sơ, kèm % phù hợp */
export interface SuggestedJob {
  id: number;
  title: string;
  companyName: string;
  matchPercent: number;
}

export interface UserProfileSummary {
  id: number;
  fullName: string;
  title: string;
  avatarUrl?: string;
  completion: number; // 0 - 100
  stats: { label: string; value: number; highlight?: boolean }[];
}

export interface JobFilter {
  keyword: string;
  level: JobLevel | "";
  project: string;
  propertyType: PropertyType | "";
  location: string;
  salary: SalaryRange | "";
}

export const DEFAULT_JOB_FILTER: JobFilter = {
  keyword: "",
  level: "",
  project: "",
  propertyType: "",
  location: "",
  salary: "",
};
