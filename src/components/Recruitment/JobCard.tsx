import { Link } from "react-router-dom";
import { Bookmark, Briefcase, Building2, CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import JobBadge from "./JobBadge";
import CompanyLogo from "./CompanyLogo";
import { JOB_LEVEL_LABEL, PROPERTY_TYPE_META, type Job } from "../../types/job.types";
import { buildJobPath, daysLeft, formatSalary, formatUpdated } from "./jobUtils";

const labelClass = "text-[11px] uppercase tracking-wide text-muted";

export default function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: Job;
  saved: boolean;
  onToggleSave: (id: number) => void;
}) {
  const left = daysLeft(job.deadline);

  return (
    <article className="rounded-3xl border border-line bg-white p-5 shadow-sm transition hover:shadow-xl hover:shadow-primary-100">
      <div className="flex items-start gap-4">
        {job.company && <CompanyLogo company={job.company} size="h-14 w-14" />}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {job.badge && <JobBadge type={job.badge} />}
            <JobBadge>{job.jobType.name}</JobBadge>
          </div>
          <h3 className="mt-2 text-xl font-medium leading-snug text-heading">
            <Link to={buildJobPath(job)} className="hover:text-primary-600">
              {job.title}
            </Link>
          </h3>
          {job.company && (
            <p className="mt-0.5 text-sm font-semibold text-primary-600">{job.company.name}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleSave(job.id)}
          aria-pressed={saved}
          aria-label={saved ? "Bỏ lưu tin" : "Lưu tin"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
            saved
              ? "bg-primary-600 text-white"
              : "bg-primary-50 text-primary-600 hover:bg-primary-100"
          }`}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4 rounded-2xl bg-primary-50 px-4 py-3">
        <div>
          <p className={labelClass}>Thu nhập dự kiến</p>
          <p className="mt-0.5 text-xl font-medium text-primary-600">
            {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryNegotiable)}
          </p>
        </div>
        {job.commission && (
          <div className="text-right">
            <p className={labelClass}>Hoa hồng</p>
            <p className="mt-0.5 text-sm font-medium text-heading">{job.commission}</p>
          </div>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-body">
        <li className="flex items-center gap-1.5">
          <MapPin size={14} className="text-muted" aria-hidden />
          {job.location}
        </li>
        {job.level && (
          <li className="flex items-center gap-1.5">
            <Briefcase size={14} className="text-muted" aria-hidden />
            {JOB_LEVEL_LABEL[job.level]}
          </li>
        )}
        {job.project && (
          <li className="flex items-center gap-1.5">
            <Building2 size={14} className="text-muted" aria-hidden />
            {job.project}
            {job.propertyType && ` · ${PROPERTY_TYPE_META[job.propertyType].short}`}
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-muted" aria-hidden />
          Kinh nghiệm {job.experience}
        </li>
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="flex items-center gap-2 text-xs">
          <Clock size={15} className="text-warning" aria-hidden />
          <span className="font-semibold text-heading">
            {left > 0 ? `Còn ${left} ngày` : "Đã hết hạn"}
          </span>
          <span className="hidden text-muted sm:inline">· {formatUpdated(job.updatedAt)}</span>
        </p>
        <a
          href="#"
          className="flex h-11 min-w-44 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Send size={15} aria-hidden /> Ứng tuyển nhanh
        </a>
      </div>
    </article>
  );
}
