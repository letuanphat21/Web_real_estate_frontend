import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export const selectCls =
  "h-11 w-full appearance-none rounded-xl border border-line bg-white pl-10 pr-9 text-sm text-heading outline-none focus:border-primary-300";

export default function BookingFilterSelect({ icon, value, onChange, children }: { icon: ReactNode; value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body">{icon}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {children}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
    </div>
  );
}
