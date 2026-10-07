import { CalendarDays, Link2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionBody from "./SectionBody";
import type { CvTemplateProps } from "./templateProps";
import type { CvSectionKey } from "../../../types/cv.types";
import { formatDay, isSectionEmpty, sectionTitle } from "../cvHelpers";

const SIDEBAR_KEYS: CvSectionKey[] = ["skills", "education", "certificates", "languages"];

/** Mẫu Modern: cột trái màu chủ đạo (ảnh, liên hệ, kỹ năng...), cột phải nội dung chính */
export default function CvTemplateModern({ data, style }: CvTemplateProps) {
  const p = data.personal;
  const visible = style.sectionOrder.filter((k) => !isSectionEmpty(k, data));
  const side = visible.filter((k) => SIDEBAR_KEYS.includes(k));
  const main = visible.filter((k) => !SIDEBAR_KEYS.includes(k));

  const contacts = [
    { icon: Phone, text: p.phone },
    { icon: Mail, text: p.email },
    { icon: MapPin, text: p.address },
    { icon: CalendarDays, text: formatDay(p.birthDate) },
    { icon: Link2, text: p.linkedin },
    { icon: MessageCircle, text: p.zalo },
  ].filter((c) => c.text);

  return (
    <div
      data-cv-layout="columns"
      className="flex text-gray-800"
      style={{
        background: "linear-gradient(to right, var(--cv-color) 33%, #fff 33%)",
        minHeight: "calc(297mm * var(--cv-pages, 1) - 0.5mm)",
      }}
    >
      <aside className="box-decoration-clone w-[33%] shrink-0 self-start px-5 py-8 text-white">
        {p.avatarUrl && (
          <img src={p.avatarUrl} alt={p.fullName} className="mx-auto h-24 w-24 rounded-full border-4 border-white/30 object-cover" />
        )}
        <p className="mt-4 text-center text-[1.5em] font-bold uppercase leading-tight">{p.fullName || "Họ và tên"}</p>
        <p className="mt-1 text-center text-[0.8em] uppercase tracking-wide text-white/80">{p.title}</p>

        {contacts.length > 0 && (
          <div className="mt-5">
            <h2 className="border-b border-white/30 pb-1 text-[0.85em] font-bold uppercase tracking-wider">Liên hệ</h2>
            <ul className="mt-2 space-y-1.5 text-[0.85em]">
              {contacts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 break-all">
                  <Icon size={12} className="mt-[0.2em] shrink-0" aria-hidden /> {text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {side.map((k) => (
          <div key={k} className="mt-5">
            <h2 className="border-b border-white/30 pb-1 text-[0.85em] font-bold uppercase tracking-wider">
              {sectionTitle(k, data)}
            </h2>
            <div className="mt-2 text-[0.9em]">
              <SectionBody sectionKey={k} data={data} dark />
            </div>
          </div>
        ))}
      </aside>

      <main className="box-decoration-clone min-w-0 flex-1 self-start space-y-5 px-6 py-8">
        {main.map((k) => (
          <section key={k}>
            <h2
              className="border-b-2 pb-1 text-[1em] font-bold uppercase tracking-wider"
              style={{ color: "var(--cv-color)", borderColor: "var(--cv-color)" }}
            >
              {sectionTitle(k, data)}
            </h2>
            <div className="mt-2">
              <SectionBody sectionKey={k} data={data} timeline={k === "experience"} />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
