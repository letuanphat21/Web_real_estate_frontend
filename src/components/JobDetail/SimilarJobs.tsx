import { useState } from "react";
import JobCard from "../Recruitment/JobCard";
import Pagination from "../common/Pagination";
import { findSimilarJobs } from "../Recruitment/jobQueries";
import type { Job } from "../../types/job.types";

const LIMIT = 3;

/** "Việc làm tương tự": dùng lại JobCard và Pagination; không có kết quả thì ẩn cả khối */
export default function SimilarJobs({
  job,
  savedIds,
  onToggleSave,
}: {
  job: Job;
  savedIds: number[];
  onToggleSave: (id: number) => void;
}) {
  const [pageState, setPageState] = useState({ jobId: job.id, page: 0 });
  // đổi sang job khác thì quay về trang đầu
  const page = pageState.jobId === job.id ? pageState.page : 0;

  // TODO: khi có BE, thay bằng gọi GET /jobs/:id/similar?page=&limit=
  const result = findSimilarJobs(job, page, LIMIT);

  if (result.totalElements === 0) return null;

  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-sm md:p-6" aria-labelledby="similar-title">
      <h2 id="similar-title" className="text-xl font-medium text-heading">
        Việc làm tương tự
      </h2>
      <p className="mt-1 text-sm text-body">
        Các vị trí {job.jobType.name.toLowerCase()} trong {job.department}.
      </p>

      <div className="mt-5 space-y-4">
        {result.content.map((j) => (
          <JobCard key={j.id} job={j} saved={savedIds.includes(j.id)} onToggleSave={onToggleSave} />
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          page={page}
          totalPages={result.totalPages}
          onChange={(p) => setPageState({ jobId: job.id, page: p })}
        />
      </div>
    </section>
  );
}
