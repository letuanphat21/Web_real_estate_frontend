import {
  MOCK_DETAIL_DEPARTMENT,
  MOCK_DETAIL_OWNERS,
  MOCK_DETAIL_QUANTITY,
  buildMockDetailSections,
} from "../../data/mockJobDetail";
import type { Job } from "../../types/job.types";
import type { JobDetailData } from "../../types/jobDetail.types";
import { formatDate } from "../../utils/formatDate";
import { daysLeft, formatSalary, formatUpdated } from "../Recruitment/jobUtils";

/** Ghép dữ liệu một tin tuyển dụng thành các chuỗi hiển thị cho trang chi tiết */
export function buildJobDetail(job: Job): JobDetailData {
  const salaryText = formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryNegotiable);
  const deadline = new Date(job.deadline).getTime();
  const open = job.status === "open" && deadline >= Date.now();
  const left = daysLeft(job.deadline);

  const start = new Date(job.publishedAt).getTime();
  const progress = deadline > start ? ((Date.now() - start) / (deadline - start)) * 100 : 100;

  const updated = formatUpdated(job.updatedAt);

  return {
    id: job.id,
    title: job.title,
    jobTypeName: job.jobType.name,
    statusLabel: open ? "Đang tuyển" : "Đã đóng",
    department: MOCK_DETAIL_DEPARTMENT,
    publishedText: `Đăng ngày ${formatDate(job.publishedAt)}`,
    updatedText: updated.charAt(0).toUpperCase() + updated.slice(1),
    salaryText,
    location: job.location,
    experience: job.experience,
    quantity: MOCK_DETAIL_QUANTITY,
    deadlineDate: formatDate(job.deadline),
    daysLeftText: left > 0 && open ? `Còn ${left} ngày` : "Đã hết hạn",
    progressPercent: Math.round(Math.min(100, Math.max(0, progress))),
    owner: MOCK_DETAIL_OWNERS[job.id % MOCK_DETAIL_OWNERS.length],
    sections: buildMockDetailSections(job.location, salaryText),
  };
}
