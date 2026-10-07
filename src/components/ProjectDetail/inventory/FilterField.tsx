import type { ReactNode } from "react";

export default function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-heading">{label}</span>
      {children}
    </label>
  );
}
