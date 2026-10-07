import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import JobDetailHero from "../../components/JobDetail/JobDetailHero";
import JobDescription from "../../components/JobDetail/JobDescription";
import JobGeneralInfo from "../../components/JobDetail/JobGeneralInfo";
import SimilarJobs from "../../components/JobDetail/SimilarJobs";
import ApplySummaryCard from "../../components/JobDetail/ApplySummaryCard";
import JobOwnerCard from "../../components/JobDetail/JobOwnerCard";
import CreateCvPromo from "../../components/JobDetail/CreateCvPromo";
import MobileApplyBar from "../../components/JobDetail/MobileApplyBar";
import JobNotFound from "../../components/JobDetail/JobNotFound";
import ApplyModal from "../../components/JobDetail/ApplyModal/ApplyModal";
import { buildJobDetail } from "../../components/JobDetail/buildJobDetail";
import { findJobById } from "../../components/Recruitment/jobQueries";

/**
 * Trang chi tiết việc làm: đọc :id từ URL và dựng giao diện từ dữ liệu mẫu.
 * TODO: gọi API GET /jobs/:id; gắn các nút ứng tuyển / lưu tin / chia sẻ.
 */
export default function JobDetailPage() {
  const { id } = useParams();
  const [applyOpen, setApplyOpen] = useState(false);
  const found = /^\d+$/.test(id ?? "") ? findJobById(Number(id)) : null;
  const job = found ? buildJobDetail(found) : null;

  // sang tin khác (bấm từ danh sách bên dưới) thì cuộn về đầu trang
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  return (
    <>
      <title>{`${job?.title ?? "Việc làm"} | Tuyển dụng NovaLand Hub`}</title>

      <div className="container mx-auto px-4 pb-28 pt-6 lg:px-8 lg:pb-12">
        <Breadcrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Tuyển dụng", to: "/jobs" },
            { label: job?.title ?? "Chi tiết việc làm" },
          ]}
        />

        <div className="mt-5">
          {job ? (
            <>
              <JobDetailHero job={job} onApply={() => setApplyOpen(true)} />

              <div className="mt-6 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="min-w-0 space-y-6">
                  <JobDescription sections={job.sections} />
                  <JobGeneralInfo job={job} />
                  <SimilarJobs
                    key={job.id}
                    currentJobId={job.id}
                    jobTypeName={job.jobTypeName}
                    department={job.department}
                  />
                </div>

                <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
                  <div className="hidden lg:block">
                    <ApplySummaryCard job={job} onApply={() => setApplyOpen(true)} />
                  </div>
                  <JobOwnerCard owner={job.owner} />
                  <CreateCvPromo />
                </aside>
              </div>
            </>
          ) : (
            <JobNotFound />
          )}
        </div>
      </div>

      {job && <MobileApplyBar salaryText={job.salaryText} onApply={() => setApplyOpen(true)} />}

      {job && applyOpen && <ApplyModal key={job.id} jobTitle={job.title} onClose={() => setApplyOpen(false)} />}
    </>
  );
}
