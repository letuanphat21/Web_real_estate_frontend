import {
  JOB_LEVEL_LABEL,
  PROPERTY_TYPE_META,
  SALARY_RANGE_META,
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
