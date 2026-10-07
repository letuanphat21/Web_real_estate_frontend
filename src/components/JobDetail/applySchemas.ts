import { z } from "zod";
import { APPLY_SOURCES } from "../../types/job.types";

const PHONE_RE = /^(\+84|0)(\s?\d){9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const COVER_LETTER_MAX = 1000;
export const CV_FILE_MAX_BYTES = 5 * 1024 * 1024;
export const CV_FILE_ACCEPT = ".pdf,.doc,.docx";

const CV_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_EXT = ["pdf", "doc", "docx"];

/** Dùng chung cho form (client) và applicationService (mô phỏng server) */
export const applyFieldsSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên"),
  email: z.string().trim().regex(EMAIL_RE, "Email không hợp lệ"),
  phone: z.string().trim().regex(PHONE_RE, "Số điện thoại không hợp lệ (vd: 0903 468 899)"),
  coverLetter: z.string().max(COVER_LETTER_MAX, `Tối đa ${COVER_LETTER_MAX} ký tự`),
  sources: z.enum(APPLY_SOURCES, { message: "Vui lòng chọn nguồn biết tin" }),
});

export type ApplyFields = z.infer<typeof applyFieldsSchema>;

/** Trả thông báo lỗi hoặc null nếu file hợp lệ (chỉ PDF/DOC/DOCX, tối đa 5MB) */
export function validateCvFile(file: { name: string; size: number; type: string }): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!CV_EXT.includes(ext) || (file.type && !CV_MIME.includes(file.type))) {
    return "Chỉ chấp nhận file PDF, DOC hoặc DOCX";
  }
  if (file.size > CV_FILE_MAX_BYTES) return "File vượt quá 5MB";
  if (file.size === 0) return "File rỗng";
  return null;
}
