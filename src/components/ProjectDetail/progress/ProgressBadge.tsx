import type { State } from "../../../data/projectDetail/progress";

const STATE: Record<State, { label: string; badge: string; dot: string }> = {
  done: { label: "Hoàn thành", badge: "bg-success/10 text-success", dot: "bg-success" },
  building: { label: "Đang thi công", badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  ontrack: { label: "Đúng tiến độ", badge: "bg-success/10 text-success", dot: "bg-success" },
  plan: { label: "Kế hoạch", badge: "bg-primary-100 text-primary-700", dot: "bg-primary-600" },
};

export default function ProgressBadge({ state, className = "" }: { state: State; className?: string }) {
  const s = STATE[state];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${s.badge} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
    </span>
  );
}
