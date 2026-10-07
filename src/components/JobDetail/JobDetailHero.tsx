import { Bookmark, Briefcase, CheckCircle2, Clock, MapPin, Send, Share2, Users } from "lucide-react";
import type { JobDetailData } from "../../types/jobDetail.types";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-body transition hover:border-primary-300 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-primary-600";

/** Thẻ đầu trang: badge, tiêu đề, thu nhập, thông tin nhanh và nút ứng tuyển (chưa gắn chức năng) */
export default function JobDetailHero({ job, onApply }: { job: JobDetailData; onApply: () => void }) {
  const meta = [
    { icon: MapPin, text: job.location },
    { icon: Briefcase, text: job.department },
    { icon: CheckCircle2, text: `Kinh nghiệm ${job.experience}` },
    { icon: Users, text: `Số lượng tuyển: ${job.quantity}` },
  ];

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-labelledby="job-title">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
              {job.jobTypeName}
            </span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              {job.statusLabel}
            </span>
          </div>
          <h1 id="job-title" className="mt-3 text-2xl font-semibold leading-tight text-heading md:text-3xl">
            {job.title}
          </h1>
          <p className="mt-2 text-xs text-body">
            {job.department} · {job.publishedText} · {job.updatedText}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Lưu tin" className={iconBtn}>
            <Bookmark size={17} />
          </button>
          <button type="button" aria-label="Chia sẻ" className={iconBtn}>
            <Share2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-primary-50 px-5 py-4">
        <p className="text-[11px] uppercase tracking-wide text-gray-400">Thu nhập dự kiến</p>
        <p className="mt-1 text-2xl font-medium text-primary-600 md:text-3xl">{job.salaryText}</p>
      </div>

      <ul className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-2 lg:grid-cols-4">
        {meta.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon size={15} className="shrink-0 text-gray-400" aria-hidden />
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="flex items-center gap-2 text-sm text-body">
          <Clock size={16} className="text-amber-500" aria-hidden />
          Hạn nộp {job.deadlineDate} · {job.daysLeftText}
        </p>
        <button
          type="button"
          onClick={onApply}
          className="flex h-12 min-w-48 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Send size={15} aria-hidden /> Ứng tuyển nhanh
        </button>
      </div>
    </section>
  );
}
