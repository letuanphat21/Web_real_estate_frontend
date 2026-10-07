import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { buildJobPath } from "./jobUtils";
import type { SuggestedJob } from "../../types/job.types";

export default function SuggestedJobs({ jobs }: { jobs: SuggestedJob[] }) {
  return (
    <section
      className="rounded-3xl border border-line bg-white p-6 shadow-sm"
      aria-labelledby="suggested-heading"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 id="suggested-heading" className="text-lg font-medium text-heading">
          Việc làm phù hợp
        </h2>
        <Link to="/jobs" className="text-xs font-medium text-primary-600 hover:text-primary-700">
          Xem tất cả
        </Link>
      </div>

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id}>
            <Link
              to={buildJobPath(job)}
              className="group flex items-center gap-3 rounded-xl transition hover:bg-primary-50"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-medium text-primary-600 group-hover:bg-white"
                aria-label={`Phù hợp ${job.matchPercent}%`}
              >
                {job.matchPercent}%
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-heading">{job.title}</p>
                <p className="truncate text-xs text-muted">{job.companyName}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-muted" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
