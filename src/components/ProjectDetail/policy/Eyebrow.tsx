import type { ReactNode } from "react";

const Eyebrow = ({ children, className = "text-primary-600" }: { children: ReactNode; className?: string }) => (
  <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide ${className}`}>
    <span className="h-px w-6 bg-current" /> {children}
  </p>
);

export default Eyebrow;
