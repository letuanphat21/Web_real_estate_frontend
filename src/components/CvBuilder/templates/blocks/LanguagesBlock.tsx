import { AVOID_BREAK, blockTone } from "./blockStyles";
import type { CvData } from "../../../../types/cv.types";

export default function LanguagesBlock({ data, dark = false }: { data: CvData; dark?: boolean }) {
  const t = blockTone(dark);
  return (
    <ul className="space-y-1">
      {data.languages.map((l) => (
        <li key={l.id} className={`${AVOID_BREAK} flex justify-between text-[0.92em] ${t.text}`}>
          <span className="font-medium">{l.name}</span>
          <span className={`text-[0.85em] ${t.muted}`}>{l.level}</span>
        </li>
      ))}
    </ul>
  );
}
