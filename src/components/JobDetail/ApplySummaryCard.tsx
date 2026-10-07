import { Bookmark, Send, UserRound } from "lucide-react";
import type { JobDetailData } from "../../types/jobDetail.types";

/** Cột phải (desktop): tóm tắt thu nhập, hạn nộp, tiến độ và hai nút hành động (chưa gắn chức năng) */
export default function ApplySummaryCard({ job, onApply }: { job: JobDetailData; onApply: () => void }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm" aria-labelledby="apply-summary-title">
      <h2 id="apply-summary-title" className="text-lg font-medium text-heading">
        Thông tin ứng tuyển
      </h2>

      <div className="mt-4 rounded-2xl bg-primary-50 px-4 py-3">
        <p className="text-[11px] uppercase tracking-wide text-gray-400">Thu nhập dự kiến</p>
        <p className="mt-0.5 text-xl font-medium text-primary-600">{job.salaryText}</p>
      </div>

      <p className="mt-4 text-sm text-body">Hạn nộp {job.deadlineDate}</p>
      <div className="mt-2 flex justify-between text-xs">
        <span className="font-medium text-heading">{job.daysLeftText}</span>
        <span className="text-gray-400">{job.publishedText.replace("Đăng ngày", "Đăng")}</span>
      </div>
      <div
        role="progressbar"
        aria-label="Thời gian đã trôi đến hạn nộp"
        aria-valuenow={job.progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100"
      >
        <div className="h-full rounded-full bg-primary-600" style={{ width: `${job.progressPercent}%` }} />
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-body">
        <UserRound size={15} className="text-gray-400" aria-hidden /> Số lượng tuyển: {job.quantity}
      </p>

      <button
        type="button"
        onClick={onApply}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        <Send size={15} aria-hidden /> Ứng tuyển nhanh
      </button>
      <button
        type="button"
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-medium text-primary-600 transition hover:bg-primary-50"
      >
        <Bookmark size={15} aria-hidden /> Lưu tin
      </button>
    </section>
  );
}
