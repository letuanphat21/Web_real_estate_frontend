import ApplyButton from "./ApplyButton";
import type { ApplyFlow } from "../../hooks/useApplyFlow";
import type { Job } from "../../types/job.types";
import { formatSalary } from "../../utils/formatSalary";

/** Thanh dính đáy trên mobile/tablet: thu nhập + nút ứng tuyển (ẩn trên desktop) */
export default function MobileApplyBar({ job, flow }: { job: Job; flow: ApplyFlow }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 shadow-[0_-4px_16px_rgb(0_0_0/0.06)] lg:hidden">
      <div className="min-w-0">
        <p className="text-[11px] uppercase text-muted">Thu nhập dự kiến</p>
        <p className="truncate text-base font-semibold text-primary-600">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryNegotiable)}
        </p>
      </div>
      <ApplyButton flow={flow} className="h-11 shrink-0 px-5" />
    </div>
  );
}
