import {
  APPLICATION_HISTORY_STATUS_META,
  type ApplicationHistoryStatus,
} from "../../types/applicationHistory.types";

export default function ApplicationStatusBadge({ status }: { status: ApplicationHistoryStatus }) {
  const meta = APPLICATION_HISTORY_STATUS_META[status];
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${meta.badge}`}>{meta.label}</span>
  );
}
