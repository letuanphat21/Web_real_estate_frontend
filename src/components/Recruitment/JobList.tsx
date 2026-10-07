import type { ReactNode } from "react";
import { AlertCircle, SearchX } from "lucide-react";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import Pagination from "../common/Pagination";
import type { Job } from "../../types/job.types";

type JobListProps = {
  jobs: Job[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onRetry: () => void;
  savedIds: number[];
  onToggleSave: (id: number) => void;
};

const softButton =
  "mt-5 rounded-full bg-primary-50 px-5 py-2 text-sm font-medium text-primary-600 hover:bg-primary-100";

/** Cột trái: danh sách card + trạng thái loading/rỗng/lỗi + phân trang */
export default function JobList({
  jobs,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onReset,
  onRetry,
  savedIds,
  onToggleSave,
}: JobListProps) {
  return (
    <div>
      {error ? (
        <Message
          icon={<AlertCircle size={40} className="text-danger" />}
          title="Không thể tải danh sách việc làm"
          hint="Vui lòng thử lại sau."
        >
          <button onClick={onRetry} className={softButton}>
            Thử lại
          </button>
        </Message>
      ) : loading ? (
        <div className="space-y-4" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Message
          icon={<SearchX size={40} className="text-primary-300" />}
          title="Không tìm thấy việc làm phù hợp"
          hint="Thử đổi từ khóa hoặc bỏ bớt bộ lọc."
        >
          <button onClick={onReset} className={softButton}>
            Xóa bộ lọc
          </button>
        </Message>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedIds.includes(job.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8">
          <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        </div>
      )}
    </div>
  );
}

function Message({
  icon,
  title,
  hint,
  children,
}: {
  icon: ReactNode;
  title: string;
  hint: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-white py-16 text-center"
    >
      {icon}
      <p className="mt-4 font-medium text-heading">{title}</p>
      <p className="mt-1 text-sm text-body">{hint}</p>
      {children}
    </div>
  );
}
