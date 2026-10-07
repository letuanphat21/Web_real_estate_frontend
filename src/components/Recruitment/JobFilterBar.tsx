import { useEffect, useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  JOB_LEVEL_LABEL,
  LOCATION_LABEL,
  PROJECTS,
  PROPERTY_TYPE_META,
  SALARY_RANGE_META,
  DEFAULT_JOB_FILTER,
  type JobFilter,
} from "../../types/job.types";

const fieldClass =
  "h-11 w-full rounded-xl border border-primary-100 bg-white px-3 text-sm font-medium text-heading outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

const applyClass =
  "flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] text-muted">{label}</span>
      {children}
    </label>
  );
}

/** Danh sách chip các bộ lọc đang áp dụng */
function getChips(f: JobFilter): { key: keyof JobFilter; label: string }[] {
  const chips: { key: keyof JobFilter; label: string }[] = [];
  if (f.keyword) chips.push({ key: "keyword", label: f.keyword });
  if (f.level) chips.push({ key: "level", label: JOB_LEVEL_LABEL[f.level] });
  if (f.project) chips.push({ key: "project", label: f.project });
  if (f.propertyType) chips.push({ key: "propertyType", label: PROPERTY_TYPE_META[f.propertyType].label });
  if (f.location) chips.push({ key: "location", label: f.location });
  if (f.salary) chips.push({ key: "salary", label: SALARY_RANGE_META[f.salary].label });
  return chips;
}

/**
 * Thanh bộ lọc: chỉnh nháp, chỉ khi bấm "Áp dụng bộ lọc" mới gửi lên trang cha.
 * Mobile: thu vào nút "Bộ lọc" và mở bottom sheet.
 * Trang cha đặt `key` theo filter để nháp được reset khi URL đổi.
 */
export default function JobFilterBar({
  value,
  onApply,
}: {
  value: JobFilter;
  onApply: (f: JobFilter) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const set =
    <K extends keyof JobFilter>(key: K) =>
    (e: { target: { value: string } }) =>
      setDraft((d) => ({ ...d, [key]: e.target.value }) as JobFilter);

  const chips = getChips(value);

  const submit = () => {
    onApply(draft);
    setOpen(false);
  };

  const fields = (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="Cấp bậc">
        <select value={draft.level} onChange={set("level")} className={fieldClass}>
          <option value="">Tất cả cấp bậc</option>
          {Object.entries(JOB_LEVEL_LABEL).map(([k, l]) => (
            <option key={k} value={k}>{l}</option>
          ))}
        </select>
      </Field>
      <Field label="Dự án">
        <select value={draft.project} onChange={set("project")} className={fieldClass}>
          <option value="">Tất cả dự án</option>
          {PROJECTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Loại hình BĐS">
        <select value={draft.propertyType} onChange={set("propertyType")} className={fieldClass}>
          <option value="">Tất cả loại hình</option>
          {Object.entries(PROPERTY_TYPE_META).map(([k, m]) => (
            <option key={k} value={k}>{m.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Khu vực">
        <select value={draft.location} onChange={set("location")} className={fieldClass}>
          <option value="">Tất cả khu vực</option>
          {Object.entries(LOCATION_LABEL).map(([k, l]) => (
            <option key={k} value={k}>{l}</option>
          ))}
        </select>
      </Field>
      <Field label="Khoảng thu nhập">
        <select value={draft.salary} onChange={set("salary")} className={fieldClass}>
          <option value="">Tất cả mức thu nhập</option>
          {Object.entries(SALARY_RANGE_META).map(([k, m]) => (
            <option key={k} value={k}>{m.label}</option>
          ))}
        </select>
      </Field>
    </div>
  );

  const chipList = chips.length > 0 && (
    <>
      <span className="text-xs text-muted">Đang áp dụng:</span>
      {chips.map((c) => (
        <span
          key={c.key}
          className="inline-flex items-center gap-1 rounded-full bg-primary-100 py-1 pl-3 pr-1.5 text-xs font-medium text-primary-700"
        >
          {c.label}
          <button
            type="button"
            onClick={() => onApply({ ...value, [c.key]: "" })}
            aria-label={`Xóa bộ lọc ${c.label}`}
            className="rounded-full p-0.5 hover:bg-primary-200"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={() => onApply(DEFAULT_JOB_FILTER)}
        className="text-xs font-medium text-danger hover:underline"
      >
        Xóa tất cả
      </button>
    </>
  );

  return (
    <div className="rounded-3xl border border-primary-100 bg-primary-50/60 p-4 md:p-5">
      {/* Mobile: nút mở bộ lọc */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary-100 bg-white text-sm font-medium text-heading md:hidden"
      >
        <SlidersHorizontal size={16} aria-hidden /> Bộ lọc
        {chips.length > 0 && (
          <span className="rounded-full bg-primary-600 px-2 text-xs text-white">{chips.length}</span>
        )}
      </button>

      {/* Tablet / desktop */}
      <form
        className="hidden md:block"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {fields}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {chipList}
          <button type="submit" className={`${applyClass} ml-auto`}>
            <SlidersHorizontal size={16} aria-hidden /> Áp dụng bộ lọc
          </button>
        </div>
      </form>

      {/* Mobile: chip đang chọn */}
      {chipList && <div className="mt-3 flex flex-wrap items-center gap-2 md:hidden">{chipList}</div>}

      {/* Bottom sheet (mobile) */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Bộ lọc việc làm">
          <div className="absolute inset-0 bg-heading/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-heading">Bộ lọc</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Đóng" className="p-1 text-body">
                <X size={20} />
              </button>
            </div>
            {fields}
            <button type="button" onClick={submit} className={`${applyClass} mt-5 w-full`}>
              <SlidersHorizontal size={16} aria-hidden /> Áp dụng bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
