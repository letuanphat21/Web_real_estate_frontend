import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { SuggestedJob } from "../../types/job.types";
import { buildJobPath } from "../../utils/jobHelpers";

export default function SuggestedJobs({
  jobs,
  loading,
}: {
  jobs: SuggestedJob[];
  loading: boolean;
}) {
  return (
    <section
      className="rounded-3xl border border-line bg-white p-6 shadow-sm"
      aria-labelledby="suggested-heading"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 id="suggested-heading" className="text-lg font-medium text-heading">
          Việc làm phù hợp
        </h2>
        <Link to="/tuyen-dung" className="text-xs font-medium text-primary-600 hover:text-primary-700">
          Xem tất cả
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-primary-50" />
          ))}
        </div>
      ) : (
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
      )}
    </section>
  );
}
