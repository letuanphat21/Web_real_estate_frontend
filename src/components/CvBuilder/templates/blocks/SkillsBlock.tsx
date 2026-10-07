import { AVOID_BREAK, blockTone } from "./blockStyles";
import type { CvData } from "../../../../types/cv.types";

/** Kỹ năng kèm thanh mức độ % */
export default function SkillsBlock({ data, dark = false }: { data: CvData; dark?: boolean }) {
  const t = blockTone(dark);
  return (
    <div className="space-y-1.5">
      {data.skills.map((s) => (
        <div key={s.id} className={AVOID_BREAK}>
          <div className={`flex justify-between text-[0.92em] ${t.text}`}>
            <span>{s.name}</span>
            <span className={`text-[0.85em] ${t.muted}`}>{s.level}%</span>
          </div>
          <div className={`mt-0.5 h-1.5 overflow-hidden rounded-full ${t.track}`}>
            <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: t.fill }} />
          </div>
        </div>
      ))}
    </div>
  );
}
