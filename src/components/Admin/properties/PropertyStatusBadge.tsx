import { PROPERTY_STATUS } from "../../../data/mockProperties";
import type { PropertyStatus } from "../../../types/property.types";

export default function PropertyStatusBadge({ status, className = "" }: { status: PropertyStatus; className?: string }) {
  const s = PROPERTY_STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${s.badge} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
    </span>
  );
}
