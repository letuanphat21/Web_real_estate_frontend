import {
  JOB_LEVEL_LABEL,
  PROPERTY_TYPE_META,
  SALARY_RANGE_META,
  type Job,
  type JobFilter,
} from "../../types/job.types";

/**
 * Hàm định dạng/tính toán dùng chung cho JobCard, trang chi tiết và modal ứng tuyển.
 * Chỉ là logic hiển thị phía UI; dữ liệu thật sẽ do BE trả về.
 */

/**
 * VND tính theo triệu đồng/tháng: "35–80 triệu/tháng", "Từ 35 triệu", "Đến 80 triệu".
 * Không có lương hoặc negotiable: "Thỏa thuận".
 */
export const formatSalary = (
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string = "VND",
  negotiable: boolean = false
): string => {
  const hasMin = typeof min === "number" && min > 0;
  const hasMax = typeof max === "number" && max > 0;
  if (negotiable || (!hasMin && !hasMax)) return "Thỏa thuận";

  const unit = currency === "VND" ? "triệu" : currency;
  if (hasMin && hasMax) return `${min}–${max} ${unit}/tháng`;
  return hasMin ? `Từ ${min} ${unit}` : `Đến ${max} ${unit}`;
};

/** "cập nhật hôm nay" / "cập nhật hôm qua" / "cập nhật 3 ngày trước" */
export const formatUpdated = (iso: string): string => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "cập nhật hôm nay";
  if (days === 1) return "cập nhật hôm qua";
  return `cập nhật ${days} ngày trước`;
};

/** Số ngày còn lại tới hạn nộp (0 nếu đã hết hạn) */
export const daysLeft = (iso: string): number =>
  Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000));

export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const formatFileSize = (bytes: number): string =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** "Chuyên viên kinh doanh" -> "chuyen-vien-kinh-doanh" */
export const slugify = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Đường dẫn chi tiết: /jobs/<slug>-<id> (tra cứu theo id, slug chỉ để đọc) */
export const buildJobPath = (job: Pick<Job, "id" | "title">): string => {
  const slug = slugify(job.title);
  return `/jobs/${slug ? `${slug}-` : ""}${job.id}`;
};

/** Lấy id từ "<slug>-<id>" hoặc "<id>"; trả null nếu sai định dạng */
export const parseJobId = (slugId: string | undefined): number | null => {
  const m = slugId?.match(/(?:^|-)(\d+)$/);
  return m ? Number(m[1]) : null;
};

export type JobAvailability = "open" | "closed" | "expired";

export const getJobAvailability = (job: Pick<Job, "status" | "deadline">): JobAvailability => {
  if (job.status !== "open") return "closed";
  // hạn nộp tính hết ngày deadline
  const end = new Date(job.deadline);
  end.setHours(23, 59, 59, 999);
  return end.getTime() < Date.now() ? "expired" : "open";
};

/** Tỷ lệ thời gian đã trôi từ ngày đăng đến hạn nộp (0 - 1) */
export const deadlineProgress = (publishedAt: string, deadline: string): number => {
  const start = new Date(publishedAt).getTime();
  const end = new Date(deadline).getTime();
  if (end <= start) return 1;
  return Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
};

/** Cắt văn bản thuần từ HTML cho meta description */
export const htmlToText = (html: string, max = 155): string => {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

/** Danh sách chip các bộ lọc đang áp dụng */
export function getFilterChips(f: JobFilter): { key: keyof JobFilter; label: string }[] {
  const chips: { key: keyof JobFilter; label: string }[] = [];
  if (f.keyword) chips.push({ key: "keyword", label: f.keyword });
  if (f.level) chips.push({ key: "level", label: JOB_LEVEL_LABEL[f.level] });
  if (f.project) chips.push({ key: "project", label: f.project });
  if (f.propertyType) chips.push({ key: "propertyType", label: PROPERTY_TYPE_META[f.propertyType].label });
  if (f.location) chips.push({ key: "location", label: f.location });
  if (f.salary) chips.push({ key: "salary", label: SALARY_RANGE_META[f.salary].label });
  return chips;
}
