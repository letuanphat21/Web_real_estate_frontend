import { ExternalLink } from "lucide-react";
import type { ApplyCvOption } from "../../../types/jobDetail.types";

/** Tab "CV trên NovaLand": danh sách CV dạng radio card */
export default function CvPicker({
  cvs,
  selectedId,
  onSelect,
  error,
}: {
  cvs: ApplyCvOption[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  error?: string;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label="Chọn CV" className="space-y-2.5">
        {cvs.map((cv) => {
          const active = cv.id === selectedId;
          return (
            <label
              key={cv.id}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition focus-within:outline-2 focus-within:outline-primary-600 ${
                active
                  ? "border-primary-500 bg-primary-50 ring-1 ring-primary-200"
                  : error
                    ? "border-red-200 hover:border-primary-300"
                    : "border-line hover:border-primary-300"
              }`}
            >
              <input
                type="radio"
                name="apply-cv"
                checked={active}
                onChange={() => onSelect(cv.id)}
                className="h-4 w-4 accent-primary-600"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-heading">{cv.title}</span>
                <span className="text-xs text-gray-400">{cv.createdText}</span>
              </span>
              <a
                href={cv.pdfUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary-600 hover:underline"
              >
                Xem PDF <ExternalLink size={12} aria-hidden />
              </a>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
