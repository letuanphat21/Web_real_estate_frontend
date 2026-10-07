import { ACCENT, AVOID_BREAK } from "./blockStyles";
import { formatPeriod } from "../../cvHelpers";
import type { CvData } from "../../../../types/cv.types";

export default function ProjectsBlock({ data }: { data: CvData }) {
  return (
    <div className="space-y-2.5">
      {data.projects.map((p) => (
        <div key={p.id} className={AVOID_BREAK}>
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-semibold text-gray-900">{p.name}</p>
            <p className="shrink-0 text-[0.85em] text-gray-500">{formatPeriod(p)}</p>
          </div>
          {p.role && (
            <p className="text-[0.92em] font-medium" style={ACCENT}>
              {p.role}
            </p>
          )}
          {p.description && <p className="mt-0.5 text-[0.92em] text-gray-700">{p.description}</p>}
        </div>
      ))}
    </div>
  );
}
