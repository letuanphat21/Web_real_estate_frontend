import { Link } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";
import type { Cv } from "../../../types/job.types";
import { formatDate } from "../../../utils/formatDate";

/** Tab "CV trên NovaLand": danh sách CV dạng radio card */
export default function CvPicker({
  cvs,
  loading,
  selectedId,
  onSelect,
}: {
  cvs: Cv[] | null;
  loading: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  if (loading) return <div className="h-24 animate-pulse rounded-2xl bg-primary-50" aria-busy="true" />;

  if (!cvs || cvs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-4 py-8 text-center">
        <FileText size={28} className="mx-auto text-primary-300" aria-hidden />
        <p className="mt-2 text-sm text-body">Bạn chưa có CV nào trên NovaLand.</p>
        <Link
          to="/tuyen-dung/tao-cv"
          className="mt-4 inline-flex h-10 items-center rounded-full bg-primary-50 px-5 text-sm font-medium text-primary-600 hover:bg-primary-100"
        >
          Tạo CV ngay
        </Link>
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Chọn CV" className="space-y-2">
      {cvs.map((cv) => {
        const active = cv.id === selectedId;
        return (
          <label
            key={cv.id}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition focus-within:outline-2 focus-within:outline-primary-600 ${
              active ? "border-primary-600 bg-primary-50" : "border-line hover:border-primary-300"
            }`}
          >
            <input
              type="radio"
              name="cv"
              checked={active}
              onChange={() => onSelect(cv.id)}
              className="h-4 w-4 accent-primary-600"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-heading">{cv.title}</span>
              <span className="text-xs text-muted">Tạo ngày {formatDate(cv.createdAt)}</span>
            </span>
            <a
              href={cv.pdfUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary-600 hover:underline"
            >
              Xem PDF <ExternalLink size={12} aria-hidden />
            </a>
          </label>
        );
      })}
    </div>
  );
}
