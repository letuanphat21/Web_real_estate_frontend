import { useEffect, useState } from "react";
import JobCard from "../Recruitment/JobCard";
import JobCardSkeleton from "../Recruitment/JobCardSkeleton";
import Pagination from "../common/Pagination";
import jobService from "../../services/jobService";
import type { Job, PageResponse } from "../../types/job.types";

const LIMIT = 3;

interface Result {
  key: string;
  data: PageResponse<Job> | null; // null = lỗi
}

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
  const [result, setResult] = useState<Result | null>(null);

  const key = `${job.id}:${page}`;
  const loading = result?.key !== key;

  useEffect(() => {
    let off = false;
    jobService
      .getSimilarJobs(job.id, { page, limit: LIMIT })
      .then((data) => !off && setResult({ key, data }))
      .catch(() => !off && setResult({ key, data: null }));
    return () => {
      off = true;
    };
  }, [job.id, page, key]);

  if (!loading && result?.data && result.data.totalElements === 0) return null;

  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-sm md:p-6" aria-labelledby="similar-title">
      <h2 id="similar-title" className="text-xl font-medium text-heading">
        Việc làm tương tự
      </h2>
      <p className="mt-1 text-sm text-body">
        Các vị trí {job.jobType.name.toLowerCase()} trong {job.department}.
      </p>

      <div className="mt-5 space-y-4">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => <JobCardSkeleton key={i} />)
        ) : result?.data === null ? (
          <p role="alert" className="rounded-2xl bg-primary-50 px-4 py-6 text-center text-sm text-body">
            Không thể tải việc làm tương tự lúc này.
          </p>
        ) : (
          result?.data?.content.map((j) => (
            <JobCard key={j.id} job={j} saved={savedIds.includes(j.id)} onToggleSave={onToggleSave} />
          ))
        )}
      </div>

      {!loading && result?.data && (
        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={result.data.totalPages}
            onChange={(p) => setPageState({ jobId: job.id, page: p })}
          />
        </div>
      )}
    </section>
  );
}
