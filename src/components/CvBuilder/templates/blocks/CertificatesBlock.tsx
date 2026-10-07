import { AVOID_BREAK, blockTone } from "./blockStyles";
import type { CvData } from "../../../../types/cv.types";

export default function CertificatesBlock({ data, dark = false }: { data: CvData; dark?: boolean }) {
  const t = blockTone(dark);
  return (
    <ul className="space-y-1.5">
      {data.certificates.map((c) => (
        <li key={c.id} className={`${AVOID_BREAK} text-[0.92em] ${t.text}`}>
          <span className="font-medium">{c.name}</span>
          <span className={`text-[0.85em] ${t.muted}`}>
            {[c.issuer, c.year].filter(Boolean).map((x) => ` · ${x}`).join("")}
          </span>
        </li>
      ))}
    </ul>
  );
}
