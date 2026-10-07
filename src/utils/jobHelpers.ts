import type { Job } from "../types/job.types";

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

/** Đường dẫn chi tiết: /tuyen-dung/<slug>-<id> (tra cứu theo id, slug chỉ để đọc) */
export const buildJobPath = (job: Pick<Job, "id" | "title">): string => {
  const slug = slugify(job.title);
  return `/tuyen-dung/${slug ? `${slug}-` : ""}${job.id}`;
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

export const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const formatFileSize = (bytes: number): string =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
