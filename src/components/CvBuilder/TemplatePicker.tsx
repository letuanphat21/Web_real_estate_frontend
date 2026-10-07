import { Check } from "lucide-react";
import { CV_TEMPLATES, type CvTemplateId } from "../../types/cv.types";

/** Hình thu nhỏ bố cục của từng mẫu */
function Thumb({ id }: { id: CvTemplateId }) {
  const bar = "h-1 rounded bg-primary-200";
  if (id === "modern") {
    return (
      <div className="flex h-full gap-1">
        <div className="w-1/3 rounded-sm bg-primary-600" />
        <div className="flex-1 space-y-1 pt-1">
          <div className={bar} />
          <div className={`${bar} w-4/5`} />
          <div className={bar} />
          <div className={`${bar} w-2/3`} />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-1 pt-1">
      <div className={id === "professional" ? "h-1.5 rounded bg-primary-600" : "h-1 w-1/2 rounded bg-primary-400"} />
      <div className={bar} />
      <div className={`${bar} w-4/5`} />
      <div className={bar} />
      <div className={`${bar} w-2/3`} />
    </div>
  );
}

/** 3 thumbnail mẫu CV; mẫu đang chọn có viền tím và dấu tích */
export default function TemplatePicker({
  value,
  onChange,
}: {
  value: CvTemplateId;
  onChange: (id: CvTemplateId) => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Chọn mẫu CV">
      {CV_TEMPLATES.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(t.id)}
            className={`relative rounded-xl border-2 bg-white p-2 text-left transition focus-visible:outline-2 focus-visible:outline-primary-600 ${
              active ? "border-primary-600" : "border-line hover:border-primary-300"
            }`}
          >
            <div className="h-16">
              <Thumb id={t.id} />
            </div>
            <p className="mt-1 text-[11px] font-medium text-heading">{t.label}</p>
            {active && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-white">
                <Check size={10} strokeWidth={3} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
