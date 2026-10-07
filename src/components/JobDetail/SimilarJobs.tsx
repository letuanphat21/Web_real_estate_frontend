import { useState } from "react";
import JobCard from "../Recruitment/JobCard";
import Pagination from "../common/Pagination";
import { findOtherJobs } from "../Recruitment/jobQueries";
import useSavedJobs from "../Recruitment/useSavedJobs";

const LIMIT = 3;

/**
 * "Việc làm tương tự": dùng lại JobCard và Pagination có sẵn, chuyển trang bằng state.
 * Trang cha đặt `key={currentJobId}` để quay về trang đầu khi sang tin khác.
 */
export default function SimilarJobs({
  currentJobId,
  jobTypeName,
  department,
}: {
  currentJobId: number;
  jobTypeName: string;
  department: string;
}) {
  const [page, setPage] = useState(0);
  const { savedIds, toggle } = useSavedJobs();

  // TODO: khi có BE, thay bằng GET /jobs/:id/similar?page=&limit=
  const result = findOtherJobs(currentJobId, page, LIMIT);
  if (result.totalElements === 0) return null;

  return (
    <section id="similar-jobs" className="scroll-mt-24 rounded-3xl border border-line bg-white p-5 shadow-sm md:p-6" aria-labelledby="similar-title">
      <h2 id="similar-title" className="text-xl font-medium text-heading">
        Việc làm tương tự
      </h2>
      <p className="mt-1 text-sm text-body">
        Các vị trí {jobTypeName.toLowerCase()} trong {department}.
      </p>

      <div className="mt-5 space-y-4">
        {result.content.map((job) => (
          <JobCard key={job.id} job={job} saved={savedIds.includes(job.id)} onToggleSave={toggle} />
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          page={page}
          totalPages={result.totalPages}
          onChange={(p) => {
            setPage(p);
            document.getElementById("similar-jobs")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </section>
  );
}
