import {
  MOCK_COMPANIES,
  MOCK_JOB_RECORDS,
  MOCK_PROFILE,
  MOCK_SUGGESTED_JOBS,
} from "../data/mockJobs";
import { ApiError } from "./apiError";
import { JOB_SORT, SALARY_RANGE_META } from "../types/job.types";
import type {
  Company,
  Job,
  JobFilter,
  JobRecord,
  JobSort,
  PageResponse,
  SuggestedJob,
  UserProfileSummary,
} from "../types/job.types";
import { getJobAvailability } from "../utils/jobHelpers";
// import axiosClient from "./axiosClient";

/**
 * Hiện đang dùng mock data, giả lập độ trễ như gọi API thật.
 * Khi có backend, thay thân hàm bằng axiosClient.get(...) tương ứng.
 */

interface GetJobsParams {
  filter: JobFilter;
  sort: JobSort;
  page?: number; // bắt đầu từ 0 (giống Spring)
  size?: number;
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Chỉ job chưa xóa và đã xuất bản mới được công khai */
const isPublic = (j: JobRecord): boolean => j.deletedAt === null && !!j.publishedAt;

/** Bỏ các field không bao giờ trả về client: embedding, updated_by, deleted_at */
function toPublic(record: JobRecord): Job {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { embedding, updatedBy, deletedAt, ...job } = record;
  return job;
}

async function getJobs({
  filter,
  sort,
  page = 0,
  size = 5,
}: GetJobsParams): Promise<PageResponse<Job>> {
  // return axiosClient.get("/jobs", { params: { ...filter, sort, page, size } });
  await delay(300);

  const keyword = filter.keyword.trim().toLowerCase();
  const range = filter.salary ? SALARY_RANGE_META[filter.salary] : null;

  const list = MOCK_JOB_RECORDS.filter(isPublic)
    .filter((j) => {
      const hay = `${j.title} ${j.company?.name ?? ""} ${j.project ?? ""}`.toLowerCase();
      if (keyword && !hay.includes(keyword)) return false;
      if (filter.level && j.level !== filter.level) return false;
      if (filter.project && j.project !== filter.project) return false;
      if (filter.propertyType && j.propertyType !== filter.propertyType) return false;
      if (filter.location && j.city !== filter.location) return false;
      if (range) {
        if (j.salaryMin === null || j.salaryMax === null) return false;
        if (!(j.salaryMax >= range.min && j.salaryMin < range.max)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === JOB_SORT.SALARY) return (b.salaryMax ?? 0) - (a.salaryMax ?? 0);
      if (sort === JOB_SORT.DEADLINE) return Date.parse(a.deadline) - Date.parse(b.deadline);
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });

  return {
    content: list.slice(page * size, page * size + size).map(toPublic),
    totalElements: list.length,
    totalPages: Math.max(1, Math.ceil(list.length / size)),
    number: page,
    size,
  };
}

/** GET /jobs/:id - 404 nếu không tồn tại, đã xóa hoặc chưa xuất bản */
async function getJobById(id: number): Promise<Job> {
  // return axiosClient.get(`/jobs/${id}`);
  await delay(250);
  const record = MOCK_JOB_RECORDS.find((j) => j.id === id);
  if (!record || !isPublic(record)) {
    throw new ApiError(404, "JOB_NOT_FOUND", "Không tìm thấy việc làm");
  }
  return toPublic(record);
}

/** GET /jobs/:id/similar - cùng loại hoặc cùng phòng ban, còn hạn, mới đăng trước */
async function getSimilarJobs(
  id: number,
  { page = 0, limit = 3 }: { page?: number; limit?: number } = {}
): Promise<PageResponse<Job>> {
  // return axiosClient.get(`/jobs/${id}/similar`, { params: { page, limit } });
  await delay(300);
  const current = MOCK_JOB_RECORDS.find((j) => j.id === id);
  if (!current || !isPublic(current)) throw new ApiError(404, "JOB_NOT_FOUND", "Không tìm thấy việc làm");

  const list = MOCK_JOB_RECORDS.filter(
    (j) =>
      isPublic(j) &&
      j.id !== id &&
      getJobAvailability(j) === "open" &&
      (j.jobType.id === current.jobType.id || j.department === current.department)
  ).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  return {
    content: list.slice(page * limit, page * limit + limit).map(toPublic),
    totalElements: list.length,
    totalPages: Math.max(1, Math.ceil(list.length / limit)),
    number: page,
    size: limit,
  };
}

async function getSuggestedJobs(limit = 3): Promise<SuggestedJob[]> {
  // return axiosClient.get("/jobs/suggested", { params: { limit } });
  await delay(300);
  return MOCK_SUGGESTED_JOBS.slice(0, limit);
}

async function getFeaturedCompanies(limit = 3): Promise<Company[]> {
  // return axiosClient.get("/companies/featured", { params: { limit } });
  await delay(300);
  return MOCK_COMPANIES.slice(0, limit);
}

async function getProfileSummary(): Promise<UserProfileSummary> {
  // return axiosClient.get("/me/profile-summary");
  await delay(200);
  return MOCK_PROFILE;
}

const jobService = {
  getJobs,
  getJobById,
  getSimilarJobs,
  getSuggestedJobs,
  getFeaturedCompanies,
  getProfileSummary,
};
export default jobService;
