import { MOCK_JOB_RECORDS } from "../../data/mockJobs";
import { JOB_SORT, SALARY_RANGE_META } from "../../types/job.types";
import type { Job, JobFilter, JobRecord, JobSort, PageResponse } from "../../types/job.types";

/**
 * Lọc/sắp xếp/phân trang trên mock data (chạy đồng bộ).
 * TODO: khi có BE thay bằng gọi API, giữ nguyên kiểu trả về.
 */

/** Chỉ job chưa xóa và đã xuất bản mới được công khai */
const isPublic = (j: JobRecord): boolean => j.deletedAt === null && !!j.publishedAt;

/** Bỏ các field không bao giờ đưa ra UI: embedding, updated_by, deleted_at */
export function toPublicJob(record: JobRecord): Job {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { embedding, updatedBy, deletedAt, ...job } = record;
  return job;
}

const paginate = <T>(list: T[], page: number, size: number): PageResponse<T> => ({
  content: list.slice(page * size, page * size + size),
  totalElements: list.length,
  totalPages: Math.max(1, Math.ceil(list.length / size)),
  number: page,
  size,
});

export function queryJobs(filter: JobFilter, sort: JobSort, page = 0, size = 5): PageResponse<Job> {
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
    })
    .map(toPublicJob);

  return paginate(list, page, size);
}

/** Trả null nếu không tồn tại, đã xóa hoặc chưa xuất bản (trang chi tiết hiển thị "không tìm thấy") */
export function findJobById(id: number): Job | null {
  const record = MOCK_JOB_RECORDS.find((j) => j.id === id);
  return record && isPublic(record) ? toPublicJob(record) : null;
}

/** Các tin khác (loại trừ tin hiện tại), mới đăng trước, có phân trang */
export function findOtherJobs(currentId: number, page = 0, limit = 3): PageResponse<Job> {
  const list = MOCK_JOB_RECORDS.filter((j) => isPublic(j) && j.id !== currentId)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map(toPublicJob);
  return paginate(list, page, limit);
}
