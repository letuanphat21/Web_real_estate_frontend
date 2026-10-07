import { AVOID_BREAK, blockTone } from "./blockStyles";
import { formatPeriod } from "../../cvHelpers";
import type { CvData } from "../../../../types/cv.types";

export default function EducationBlock({ data, dark = false }: { data: CvData; dark?: boolean }) {
  const t = blockTone(dark);
  return (
    <div className="space-y-2">
      {data.education.map((e) => (
        <div key={e.id} className={AVOID_BREAK}>
          <p className={`font-semibold ${t.strong}`}>{e.school}</p>
          <p className={`text-[0.92em] ${t.body}`}>{e.major}</p>
          <p className={`text-[0.85em] ${t.muted}`}>{formatPeriod(e)}</p>
        </div>
      ))}
    </div>
  );
}
