import { ChevronDown } from "lucide-react";

type FilterSelectProps = { label: string; value?: string; placeholder?: string; active?: boolean };

export default function FilterSelect({ label, value, placeholder, active }: FilterSelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-muted">{label}</label>
      <button
        type="button"
        className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm ${
          active ? "border-primary-300 text-heading" : "border-line text-muted"
        }`}
      >
        {value || placeholder}
        <ChevronDown size={16} className="text-body" />
      </button>
    </div>
  );
}
