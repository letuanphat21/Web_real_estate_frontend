import JobDetailHero from "./JobDetailHero";
import JobDescription from "./JobDescription";
import JobGeneralInfo from "./JobGeneralInfo";
import SimilarJobs from "./SimilarJobs";
import ApplySummaryCard from "./ApplySummaryCard";
import JobOwnerCard from "./JobOwnerCard";
import CreateCvPromo from "./CreateCvPromo";
import MobileApplyBar from "./MobileApplyBar";
import ApplyModal from "./ApplyModal/ApplyModal";
import useApplyFlow from "./useApplyFlow";
import { getMyCvs } from "./applyMock";
import useSavedJobs from "../Recruitment/useSavedJobs";
import { useToast } from "../common/toastContext";
import { useAuth } from "../../store/authStore";
import type { Job } from "../../types/job.types";

/** Phần thân trang chi tiết: hero, 2 cột nội dung/sidebar, thanh mobile và modal ứng tuyển */
export default function JobDetailContent({ job }: { job: Job }) {
  const { user } = useAuth();
  const toast = useToast();
  const flow = useApplyFlow(job);
  const { savedIds, toggle } = useSavedJobs();

  const saved = savedIds.includes(job.id);

  const handleToggleSave = (jobId: number) => {
    toast.show(savedIds.includes(jobId) ? "Đã bỏ lưu tin" : "Đã lưu tin");
    toggle(jobId);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: job.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.show("Đã sao chép liên kết");
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.show("Không thể chia sẻ liên kết", "error");
    }
  };

  // khách chưa đăng nhập thấy luôn; người đã đăng nhập chỉ thấy khi chưa có CV
  const showCvPromo = !user || getMyCvs().length === 0;

  return (
    <>
      <JobDetailHero
        job={job}
        flow={flow}
        saved={saved}
        onToggleSave={() => handleToggleSave(job.id)}
        onShare={handleShare}
      />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="min-w-0 space-y-6">
          <JobDescription html={job.description} />
          <JobGeneralInfo job={job} />
          <SimilarJobs job={job} savedIds={savedIds} onToggleSave={handleToggleSave} />
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
          <div className="hidden lg:block">
            <ApplySummaryCard
              job={job}
              flow={flow}
              saved={saved}
              onToggleSave={() => handleToggleSave(job.id)}
            />
          </div>
          <JobOwnerCard owner={job.createdBy} />
          {showCvPromo && <CreateCvPromo />}
        </aside>
      </div>

      <MobileApplyBar job={job} flow={flow} />

      {flow.modalOpen && user && (
        <ApplyModal job={job} user={user} onClose={flow.closeModal} onApplied={flow.markApplied} />
      )}
    </>
  );
}
