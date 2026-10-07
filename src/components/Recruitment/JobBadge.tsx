import { JOB_BADGE_META, type JobBadgeType } from "../../types/job.types";

/** Pill nhỏ: badge trạng thái (Nổi bật / Tuyển gấp / Hot) hoặc tag thường (không truyền `type`) */
export default function JobBadge({ type, children }: { type?: JobBadgeType; children?: string }) {
  const meta = type ? JOB_BADGE_META[type] : null;
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        meta ? `${meta.className} uppercase` : "border-line bg-white text-body"
      }`}
    >
      {children ?? meta?.label}
    </span>
  );
}
