import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { findJobById } from "../../components/Recruitment/jobQueries";
import useSavedJobs from "../../components/Recruitment/useSavedJobs";
import SavedJobsList, { SAVED_PAGE_SIZE } from "../../components/SavedJobs/SavedJobsList";
import type { Job } from "../../types/job.types";

const TITLE = "Tin tuyển dụng đã lưu | NovaLand Hub";

/**
 * Trang "Tin tuyển dụng đã lưu" trong khu vực tài khoản.
 * Danh sách id lưu ở localStorage; tin lấy từ dữ liệu mẫu. TODO: gọi API tin đã lưu khi có BE.
 */
export default function SavedJobsPage() {
  const { savedIds, toggle } = useSavedJobs();
  const [page, setPage] = useState(0);

  // tin lưu gần nhất hiện trước; bỏ qua tin không còn tồn tại
  const jobs = [...savedIds]
    .reverse()
    .map((id) => findJobById(id))
    .filter((j): j is Job => j !== null);

  // bỏ lưu hết tin ở trang cuối thì lùi về trang trước đó
  const lastPage = Math.max(0, Math.ceil(jobs.length / SAVED_PAGE_SIZE) - 1);
  const currentPage = Math.min(page, lastPage);

  return (
    <>
      <title>{TITLE}</title>
      <meta name="robots" content="noindex" />

      <Breadcrumb items={[{ label: "Tài khoản", to: "/account" }, { label: "Tin tuyển dụng đã lưu" }]} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-heading md:text-4xl">Tin tuyển dụng đã lưu</h1>
          <p className="mt-2 text-sm text-body">
            {jobs.length > 0 ? `${jobs.length} tin bạn đã lưu để xem lại sau.` : "Những tin bạn lưu sẽ hiển thị tại đây."}
          </p>
        </div>
        <Link
          to="/jobs"
          className="flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Search size={15} aria-hidden /> Tìm việc mới
        </Link>
      </div>

      <div className="mt-6">
        <SavedJobsList
          jobs={jobs}
          page={currentPage}
          onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onUnsave={toggle}
        />
      </div>
    </>
  );
}
