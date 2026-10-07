import { MOCK_CVS } from "../../data/mockJobs";
import type { Application, ApplicationStatusLog, ApplyPayload, Job } from "../../types/job.types";
import { applyFieldsSchema, validateCvFile } from "./applySchemas";
import { getJobAvailability } from "../Recruitment/jobUtils";

/**
 * Giả lập POST /jobs/:id/applications bằng localStorage để UI chạy được khi chưa có BE.
 * TODO: thay bằng gọi API. Phía server thật phải tạo Application + Application_Status_Logs
 * trong 1 transaction và đặt unique index (user_id, job_id) trên bản ghi chưa xóa.
 */

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

interface ApplicationRecord extends Application {
  userId: number;
}

const APPS_KEY = "mock-applications";
const LOGS_KEY = "mock-application-status-logs";

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Người dùng đã ứng tuyển job này chưa (GET /jobs/:id/application-status) */
export function hasApplied(userId: number, jobId: number): boolean {
  return read<ApplicationRecord>(APPS_KEY).some((a) => a.userId === userId && a.jobId === jobId);
}

/** Danh sách CV của người dùng (GET /me/cvs) */
export const getMyCvs = () => MOCK_CVS;

/** Gửi hồ sơ. Ném ApiError với thông báo hiển thị cho người dùng nếu không hợp lệ. */
export async function submitApplication(
  userId: number,
  job: Job,
  payload: ApplyPayload
): Promise<Application> {
  await delay(700);

  const parsed = applyFieldsSchema.safeParse({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    coverLetter: payload.coverLetter ?? "",
    sources: payload.sources,
  });
  if (!parsed.success) throw new ApiError(422, "VALIDATION_ERROR", parsed.error.issues[0].message);

  const availability = getJobAvailability(job);
  if (availability === "closed") throw new ApiError(422, "JOB_CLOSED", "Tin tuyển dụng này đã đóng");
  if (availability === "expired") throw new ApiError(422, "JOB_EXPIRED", "Đã hết hạn nhận hồ sơ");

  let cvUrl: string;
  let cvId: number | null = null;
  let file: { name: string; size: number; type: string } | null = null;

  if (payload.cvId !== undefined) {
    const cv = MOCK_CVS.find((c) => c.id === payload.cvId);
    if (!cv) throw new ApiError(422, "INVALID_CV", "CV không hợp lệ");
    cvId = cv.id;
    cvUrl = cv.pdfUrl;
  } else if (payload.file) {
    const error = validateCvFile(payload.file);
    if (error) throw new ApiError(422, "INVALID_FILE", error);
    file = { name: payload.file.name, size: payload.file.size, type: payload.file.type };
    cvUrl = `mock://uploads/${Date.now()}-${payload.file.name}`;
  } else {
    throw new ApiError(422, "CV_REQUIRED", "Vui lòng chọn CV hoặc tải CV lên");
  }

  const apps = read<ApplicationRecord>(APPS_KEY);
  if (apps.some((a) => a.userId === userId && a.jobId === job.id)) {
    throw new ApiError(409, "ALREADY_APPLIED", "Bạn đã ứng tuyển vị trí này rồi");
  }

  const now = new Date().toISOString();
  const logs = read<ApplicationStatusLog>(LOGS_KEY);
  const record: ApplicationRecord = {
    id: Math.max(0, ...apps.map((a) => a.id)) + 1,
    jobId: job.id,
    userId,
    cvId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    cvUrl,
    cvFileName: file?.name ?? null,
    cvFileSize: file?.size ?? null,
    cvMimeType: file?.type ?? null,
    coverLetter: parsed.data.coverLetter || null,
    sources: parsed.data.sources,
    status: "pending",
    statusChangedAt: now,
    createdAt: now,
  };
  const log: ApplicationStatusLog = {
    id: Math.max(0, ...logs.map((l) => l.id)) + 1,
    applicationId: record.id,
    changedBy: userId,
    fromStatus: null,
    toStatus: "pending",
    note: null,
    createdAt: now,
  };

  // Mô phỏng transaction: cả hai cùng được ghi, lỗi thì hoàn tác
  try {
    localStorage.setItem(APPS_KEY, JSON.stringify([...apps, record]));
    localStorage.setItem(LOGS_KEY, JSON.stringify([...logs, log]));
  } catch {
    localStorage.setItem(APPS_KEY, JSON.stringify(apps));
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    throw new ApiError(500, "SERVER_ERROR", "Không thể gửi hồ sơ lúc này, vui lòng thử lại");
  }

  // không trả userId ra ngoài
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId: _omit, ...app } = record;
  return app;
}
