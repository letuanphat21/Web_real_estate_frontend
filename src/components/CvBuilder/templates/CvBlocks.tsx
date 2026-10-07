import type { CSSProperties, ReactNode } from "react";
import type { CvData, CvSectionKey } from "../../../types/cv.types";
import { computeAchievements, formatPeriod, splitLines } from "../../../utils/cvHelpers";

/** Các khối nội dung dùng chung giữa các template. Chỉ nhận data, không chứa logic form. */

const accent: CSSProperties = { color: "var(--cv-color)" };
const muted = "text-[0.85em] text-gray-500";

function Item({ children }: { children: ReactNode }) {
  return <div className="cv-item">{children}</div>;
}

function Bullets({ text }: { text: string }) {
  const lines = splitLines(text);
  if (!lines.length) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[0.92em] text-gray-700">
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  );
}

export function SectionBody({
  sectionKey,
  data,
  timeline = false,
}: {
  sectionKey: CvSectionKey;
  data: CvData;
  timeline?: boolean;
}) {
  if (sectionKey.startsWith("custom:")) {
    const c = data.customSections.find((s) => s.id === sectionKey.slice(7));
    return <p className="whitespace-pre-line text-[0.92em] text-gray-700">{c?.content}</p>;
  }

  switch (sectionKey) {
    case "objective":
      return (
        <p className="whitespace-pre-line text-[0.92em] leading-relaxed text-gray-700">
          {data.objective || data.personal.summary}
        </p>
      );

    case "achievements": {
      const a = computeAchievements(data);
      if (!a) return null;
      const cells = [
        a.revenueBillion ? { value: `${a.revenueBillion} tỷ`, label: "Doanh số" } : null,
        a.projectCount ? { value: String(a.projectCount), label: "Dự án" } : null,
        a.closeRate ? { value: `${a.closeRate}%`, label: "Tỷ lệ chốt" } : null,
      ].filter(Boolean) as { value: string; label: string }[];
      return (
        <div className="grid grid-cols-3 gap-2">
          {cells.map((c) => (
            <div key={c.label} className="cv-item rounded-md border border-gray-200 px-2 py-2 text-center">
              <p className="text-[1.5em] font-bold leading-none" style={accent}>
                {c.value}
              </p>
              <p className={`mt-1 ${muted}`}>{c.label}</p>
            </div>
          ))}
        </div>
      );
    }

    case "experience":
      return (
        <div className={timeline ? "space-y-3 border-l-2 pl-3" : "space-y-3"} style={timeline ? { borderColor: "var(--cv-color)" } : undefined}>
          {data.experience.map((e) => (
            <Item key={e.id}>
              <div className="relative flex items-baseline justify-between gap-2">
                {timeline && (
                  <span
                    className="absolute -left-[1.1rem] top-[0.4em] h-2 w-2 rounded-full"
                    style={{ background: "var(--cv-color)" }}
                  />
                )}
                <p className="font-semibold text-gray-900">{e.position}</p>
                <p className={`shrink-0 ${muted}`}>{formatPeriod(e)}</p>
              </div>
              <p className="text-[0.92em] font-medium" style={accent}>
                {e.company}
              </p>
              <Bullets text={e.bullets} />
            </Item>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="space-y-2.5">
          {data.projects.map((p) => (
            <Item key={p.id}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className={`shrink-0 ${muted}`}>{formatPeriod(p)}</p>
              </div>
              {p.role && <p className="text-[0.92em] font-medium" style={accent}>{p.role}</p>}
              {p.description && <p className="mt-0.5 text-[0.92em] text-gray-700">{p.description}</p>}
            </Item>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="space-y-2">
          {data.education.map((e) => (
            <Item key={e.id}>
              <p className="font-semibold text-gray-900">{e.school}</p>
              <p className="text-[0.92em] text-gray-700">{e.major}</p>
              <p className={muted}>{formatPeriod(e)}</p>
            </Item>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="space-y-1.5">
          {data.skills.map((s) => (
            <Item key={s.id}>
              <div className="flex justify-between text-[0.92em] text-gray-800">
                <span>{s.name}</span>
                <span className={muted}>{s.level}%</span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: "var(--cv-color)" }} />
              </div>
            </Item>
          ))}
        </div>
      );

    case "certificates":
      return (
        <ul className="space-y-1.5">
          {data.certificates.map((c) => (
            <li key={c.id} className="cv-item text-[0.92em] text-gray-800">
              <span className="font-medium">{c.name}</span>
              <span className={muted}>{[c.issuer, c.year].filter(Boolean).map((t) => ` · ${t}`).join("")}</span>
            </li>
          ))}
        </ul>
      );

    case "languages":
      return (
        <ul className="space-y-1">
          {data.languages.map((l) => (
            <li key={l.id} className="cv-item flex justify-between text-[0.92em] text-gray-800">
              <span className="font-medium">{l.name}</span>
              <span className={muted}>{l.level}</span>
            </li>
          ))}
        </ul>
      );

    case "references":
      return (
        <div className="grid grid-cols-2 gap-3">
          {data.references.map((r) => (
            <Item key={r.id}>
              <p className="font-semibold text-gray-900">{r.name}</p>
              <p className="text-[0.92em] text-gray-700">{[r.position, r.company].filter(Boolean).join(" · ")}</p>
              <p className={muted}>{[r.phone, r.email].filter(Boolean).join(" · ")}</p>
            </Item>
          ))}
        </div>
      );

    default:
      return null;
  }
}
