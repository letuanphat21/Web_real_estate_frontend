import { ChevronDown } from "lucide-react";

export const selectCls = "h-11 w-full appearance-none rounded-xl border border-line bg-primary-50/60 px-4 pr-10 text-sm text-body outline-none focus:border-primary-300";

type FilterSelectProps = { value: string; onChange: (v: string) => void; options: string[][] };

export default function FilterSelect({ value, onChange, options }: FilterSelectProps) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
    </div>
  );
}
