import { AVOID_BREAK } from "./blockStyles";
import type { CvData } from "../../../../types/cv.types";

export default function ReferencesBlock({ data }: { data: CvData }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.references.map((r) => (
        <div key={r.id} className={AVOID_BREAK}>
          <p className="font-semibold text-gray-900">{r.name}</p>
          <p className="text-[0.92em] text-gray-700">{[r.position, r.company].filter(Boolean).join(" · ")}</p>
          <p className="text-[0.85em] text-gray-500">{[r.phone, r.email].filter(Boolean).join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}
