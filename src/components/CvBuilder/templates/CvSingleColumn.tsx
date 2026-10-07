import { SectionBody } from "./CvBlocks";
import type { CvTemplateProps } from "./templateProps";
import { formatDay, isSectionEmpty, sectionTitle } from "../../../utils/cvHelpers";

/** Khung một cột dùng cho hai mẫu Professional và Minimal */
export default function CvSingleColumn({
  data,
  style,
  variant,
}: CvTemplateProps & { variant: "professional" | "minimal" }) {
  const p = data.personal;
  const pro = variant === "professional";
  const visible = style.sectionOrder.filter((k) => !isSectionEmpty(k, data));
  const contacts = [p.phone, p.email, p.address, formatDay(p.birthDate), p.linkedin, p.zalo].filter(Boolean);

  return (
    <div className="cv-root bg-white text-gray-800">
      {pro && <div className="h-3" style={{ background: "var(--cv-color)" }} />}
      <div className="cv-clone px-10 py-8">
        <header className={`flex items-center gap-5 ${pro ? "" : "border-b border-gray-200 pb-5"}`}>
          {p.avatarUrl && (
            <img
              src={p.avatarUrl}
              alt={p.fullName}
              className={`h-20 w-20 shrink-0 object-cover ${pro ? "rounded-md" : "rounded-full"}`}
            />
          )}
          <div className="min-w-0">
            <p
              className={`text-[2em] leading-tight ${pro ? "font-bold uppercase" : "font-light tracking-wide"}`}
              style={{ color: "var(--cv-color)" }}
            >
              {p.fullName || "Họ và tên"}
            </p>
            <p className="text-[1em] text-gray-600">{p.title}</p>
            <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[0.82em] text-gray-600">
              {contacts.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </p>
          </div>
        </header>

        <div className="mt-5 space-y-5">
          {visible.map((k) => (
            <section key={k}>
              <h2
                className={
                  pro
                    ? "border-b-2 pb-1 text-[1em] font-bold uppercase tracking-wider"
                    : "text-[0.8em] font-semibold uppercase tracking-[0.2em]"
                }
                style={{ color: "var(--cv-color)", borderColor: "var(--cv-color)" }}
              >
                {sectionTitle(k, data)}
              </h2>
              <div className="mt-2">
                <SectionBody sectionKey={k} data={data} timeline={pro && k === "experience"} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
