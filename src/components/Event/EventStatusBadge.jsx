import { EVENT_STATUS_META } from "../../types/event.types";

/** Nhãn trạng thái nổi trên ảnh: ● Sắp diễn ra */
export default function EventStatusBadge({ status }) {
  const meta = EVENT_STATUS_META[status];
  if (!meta) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur ${meta.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
