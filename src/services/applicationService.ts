import { MOCK_JOB_RECORDS } from "../data/mockJobs";
import { MOCK_CVS } from "../data/mockApplications";
import { ApiError } from "./apiError";
import { applyFieldsSchema, validateCvFile } from "../schemas/applySchemas";
import { useAuthStore } from "../store/authStore";
import type {
  Application,
  ApplicationStatus,
  ApplicationStatusLog,
  ApplyPayload,
  Cv,
} from "../types/job.types";
import { getJobAvailability } from "../utils/jobHelpers";
// import axiosClient from "./axiosClient";

/**
 * Mock của các endpoint ứng tuyển, lưu ở localStorage để reload vẫn nhớ trạng thái.
 * Khi có backend, thay thân hàm bằng axiosClient tương ứng (chữ ký giữ nguyên).
 * Phía server thật phải: chạy tạo Application + Application_Status_Logs trong 1 transaction,
 * và đặt unique index (user_id, job_id) trên bản ghi chưa xóa.
 */

interface ApplicationRecord extends Application {
  userId: number;
  reviewedBy: number | null;
  adminNote: string | null;
  deletedAt: string | null;
}

const APPS_KEY = "mock-applications";
const LOGS_KEY = "mock-application-status-logs";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function requireUser() {
  const user = useAuthStore.getState().user;
  if (!user) throw new ApiError(401, "UNAUTHORIZED", "Vui lòng đăng nhập để tiếp tục");
  return user;
}

/** Không trả admin_note, reviewed_by, deleted_at, user_id */
function toPublic(r: ApplicationRecord): Application {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, reviewedBy, adminNote, deletedAt, ...app } = r;
  return app;
}

/** GET /me/cvs */
async function getMyCvs(): Promise<Cv[]> {
  // return axiosClient.get("/me/cvs");
  await delay(200);
  const user = requireUser();
  return MOCK_CVS.filter((c) => c.userId === user.id).map(({ userId: _u, ...cv }) => cv);
}

/** GET /jobs/:id/application-status */
async function getApplicationStatus(
  jobId: number
): Promise<{ applied: boolean; status?: ApplicationStatus; appliedAt?: string }> {
  // return axiosClient.get(`/jobs/${jobId}/application-status`);
  await delay(150);
  const user = useAuthStore.getState().user;
  if (!user) return { applied: false };
  const found = read<ApplicationRecord>(APPS_KEY).find(
    (a) => a.userId === user.id && a.jobId === jobId && !a.deletedAt
  );
  return found
    ? { applied: true, status: found.status, appliedAt: found.createdAt }
    : { applied: false };
}

/** POST /jobs/:id/applications */
async function applyToJob(jobId: number, payload: ApplyPayload): Promise<Application> {
  // const form = new FormData(); ... return axiosClient.post(`/jobs/${jobId}/applications`, form);
  await delay(700);
  const user = requireUser();

  const parsed = applyFieldsSchema.safeParse({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    coverLetter: payload.coverLetter ?? "",
    sources: payload.sources,
  });
  if (!parsed.success) {
    throw new ApiError(422, "VALIDATION_ERROR", parsed.error.issues[0].message);
  }

  const job = MOCK_JOB_RECORDS.find((j) => j.id === jobId && j.deletedAt === null);
  if (!job) throw new ApiError(404, "JOB_NOT_FOUND", "Không tìm thấy việc làm");
  const availability = getJobAvailability(job);
  if (availability === "closed") throw new ApiError(422, "JOB_CLOSED", "Tin tuyển dụng này đã đóng");
  if (availability === "expired") throw new ApiError(422, "JOB_EXPIRED", "Đã hết hạn nhận hồ sơ");

  let cvUrl: string;
  let cvId: number | null = null;
  let file: { name: string; size: number; type: string } | null = null;

  if (payload.cvId !== undefined) {
    const cv = MOCK_CVS.find((c) => c.id === payload.cvId && c.userId === user.id);
    if (!cv) throw new ApiError(422, "INVALID_CV", "CV không hợp lệ");
    cvId = cv.id;
    cvUrl = cv.pdfUrl;
  } else if (payload.file) {
    const error = validateCvFile(payload.file);
    if (error) throw new ApiError(422, "INVALID_FILE", error);
    file = { name: payload.file.name, size: payload.file.size, type: payload.file.type };
    // storage thật: upload lên bucket rồi lưu URL trả về
    cvUrl = `mock://uploads/${Date.now()}-${payload.file.name}`;
  } else {
    throw new ApiError(422, "CV_REQUIRED", "Vui lòng chọn CV hoặc tải CV lên");
  }

  const apps = read<ApplicationRecord>(APPS_KEY);
  if (apps.some((a) => a.userId === user.id && a.jobId === jobId && !a.deletedAt)) {
    throw new ApiError(409, "ALREADY_APPLIED", "Bạn đã ứng tuyển vị trí này rồi");
  }

  const now = new Date().toISOString();
  const logs = read<ApplicationStatusLog>(LOGS_KEY);
  const record: ApplicationRecord = {
    id: Math.max(0, ...apps.map((a) => a.id)) + 1,
    jobId,
    userId: user.id,
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
    reviewedBy: null,
    adminNote: null,
    deletedAt: null,
  };
  const log: ApplicationStatusLog = {
    id: Math.max(0, ...logs.map((l) => l.id)) + 1,
    applicationId: record.id,
    changedBy: user.id,
    fromStatus: null,
    toStatus: "pending",
    note: null,
    createdAt: now,
  };

  // Mô phỏng transaction: cả hai cùng được ghi, nếu một bên lỗi thì hoàn tác bên kia
  try {
    write(APPS_KEY, [...apps, record]);
    write(LOGS_KEY, [...logs, log]);
  } catch {
    write(APPS_KEY, apps);
    write(LOGS_KEY, logs);
    throw new ApiError(500, "SERVER_ERROR", "Không thể gửi hồ sơ lúc này, vui lòng thử lại");
  }

  return toPublic(record);
}

const applicationService = { getMyCvs, getApplicationStatus, applyToJob };
export default applicationService;
