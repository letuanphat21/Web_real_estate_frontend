import { Bookmark, Briefcase, CheckCircle2, Clock, MapPin, Share2, Users } from "lucide-react";
import ApplyButton from "./ApplyButton";
import CompanyLogo from "../Recruitment/CompanyLogo";
import type { ApplyFlow } from "../../hooks/useApplyFlow";
import type { Company, Job } from "../../types/job.types";
import { capitalize, getJobAvailability } from "../../utils/jobHelpers";
import { daysLeft, formatDate, formatUpdated } from "../../utils/formatDate";
import { formatSalary } from "../../utils/formatSalary";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-body transition hover:border-primary-300 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-primary-600";

/**
 * Thẻ đầu trang chi tiết. `company`, `commission`, `project` là dữ liệu chưa có trong DB:
 * trang cha chưa truyền nên không được vẽ; khi backend có chỉ cần truyền vào.
 */
export default function JobDetailHero({
  job,
  flow,
  saved,
  onToggleSave,
  onShare,
  company,
  commission,
  project,
}: {
  job: Job;
  flow: ApplyFlow;
  saved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  company?: Company;
  commission?: string;
  project?: string;
}) {
  const open = getJobAvailability(job) === "open";
  const left = daysLeft(job.deadline);
  const extras = [
    commission ? { label: "Hoa hồng", value: commission } : null,
    project ? { label: "Dự án", value: project } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const meta = [
    { icon: MapPin, text: job.location },
    { icon: Briefcase, text: job.department },
    { icon: CheckCircle2, text: `Kinh nghiệm ${job.experience}` },
    { icon: Users, text: `Số lượng tuyển: ${job.quantity} người` },
  ];

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-labelledby="job-title">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          {company && <CompanyLogo company={company} size="h-16 w-16" />}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {job.jobType.name}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${open ? "bg-success/10 text-success" : "bg-line text-body"}`}
              >
                {open ? "Đang tuyển" : "Đã đóng"}
              </span>
            </div>
            <h1 id="job-title" className="mt-3 text-2xl font-semibold leading-tight text-heading md:text-3xl">
              {job.title}
            </h1>
            {company && <p className="mt-1 text-sm font-semibold text-primary-600">{company.name}</p>}
            <p className="mt-2 text-xs text-body">
              {job.department} · Đăng ngày {formatDate(job.publishedAt)} · {capitalize(formatUpdated(job.updatedAt))}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? "Bỏ lưu tin" : "Lưu tin"}
            className={`${iconBtn} ${saved ? "border-primary-600 bg-primary-50 text-primary-600" : ""}`}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
          <button type="button" onClick={onShare} aria-label="Chia sẻ" className={iconBtn}>
            <Share2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-2xl bg-primary-50 px-5 py-4">
          <p className="text-[11px] uppercase tracking-wide text-muted">Thu nhập dự kiến</p>
          <p className="mt-1 text-2xl font-medium text-primary-600 md:text-3xl">
            {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryNegotiable)}
          </p>
        </div>
        {extras.length > 0 && (
          <div className="grid gap-2 md:min-w-52">
            {extras.map((e) => (
              <div key={e.label} className="rounded-xl bg-primary-50/60 px-4 py-2">
                <p className="text-[11px] text-muted">{e.label}</p>
                <p className="text-sm font-medium text-heading">{e.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-2 lg:grid-cols-4">
        {meta.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon size={15} className="shrink-0 text-muted" aria-hidden />
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="flex items-center gap-2 text-sm text-body">
          <Clock size={16} className="text-warning" aria-hidden />
          Hạn nộp {formatDate(job.deadline)}
          {open && <span> · Còn {left} ngày</span>}
        </p>
        <ApplyButton flow={flow} className="min-w-48" />
      </div>
    </section>
  );
}
