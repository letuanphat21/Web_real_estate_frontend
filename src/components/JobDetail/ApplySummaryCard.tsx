import { Bookmark, UserRound } from "lucide-react";
import ApplyButton from "./ApplyButton";
import type { ApplyFlow } from "./useApplyFlow";
import type { Job } from "../../types/job.types";
import { formatDate } from "../../utils/formatDate";
import { daysLeft, formatSalary } from "../Recruitment/jobUtils";
import { deadlineProgress, getJobAvailability } from "../Recruitment/jobUtils";

/** Cột phải (desktop): tóm tắt thu nhập, hạn nộp, tiến độ và hai nút hành động */
export default function ApplySummaryCard({
  job,
  flow,
  saved,
  onToggleSave,
}: {
  job: Job;
  flow: ApplyFlow;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const open = getJobAvailability(job) === "open";
  const percent = Math.round(deadlineProgress(job.publishedAt, job.deadline) * 100);

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm" aria-labelledby="apply-summary-title">
      <h2 id="apply-summary-title" className="text-lg font-medium text-heading">
        Thông tin ứng tuyển
      </h2>

      <div className="mt-4 rounded-2xl bg-primary-50 px-4 py-3">
        <p className="text-[11px] uppercase tracking-wide text-muted">Thu nhập dự kiến</p>
        <p className="mt-0.5 text-xl font-medium text-primary-600">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryNegotiable)}
        </p>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-body">Hạn nộp {formatDate(job.deadline)}</p>
      <div className="mt-2 flex justify-between text-xs">
        <span className="font-medium text-heading">{open ? `Còn ${daysLeft(job.deadline)} ngày` : "Đã hết hạn"}</span>
        <span className="text-muted">Đăng {formatDate(job.publishedAt)}</span>
      </div>
      <div
        role="progressbar"
        aria-label="Thời gian đã trôi đến hạn nộp"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100"
      >
        <div className="h-full rounded-full bg-primary-600" style={{ width: `${percent}%` }} />
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-body">
        <UserRound size={15} className="text-muted" aria-hidden /> Số lượng tuyển: {job.quantity} người
      </p>

      <ApplyButton flow={flow} className="mt-5 w-full" />
      <button
        type="button"
        onClick={onToggleSave}
        aria-pressed={saved}
        className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition ${
          saved ? "border-primary-600 bg-primary-50 text-primary-700" : "border-line text-primary-600 hover:bg-primary-50"
        }`}
      >
        <Bookmark size={15} fill={saved ? "currentColor" : "none"} aria-hidden /> {saved ? "Đã lưu tin" : "Lưu tin"}
      </button>
    </section>
  );
}
