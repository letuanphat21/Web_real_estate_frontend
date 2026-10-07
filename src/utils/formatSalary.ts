/**
 * Dùng chung cho JobCard và trang chi tiết.
 * VND tính theo triệu đồng/tháng: "35–80 triệu/tháng", "Từ 35 triệu", "Đến 80 triệu".
 * Hợp đồng không có lương hoặc negotiable: "Thỏa thuận".
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

  const vnd = currency === "VND";
  const unit = vnd ? "triệu" : currency;
  if (hasMin && hasMax) return `${min}–${max} ${unit}/tháng`;
  return hasMin ? `Từ ${min} ${unit}` : `Đến ${max} ${unit}`;
};
