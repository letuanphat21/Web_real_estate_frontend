import type { ReactNode } from "react";
import {
  JOB_LEVEL_LABEL,
  LOCATION_LABEL,
  PROJECTS,
  PROPERTY_TYPE_META,
  SALARY_RANGE_META,
  type JobFilter,
} from "../../types/job.types";

const fieldClass =
  "h-11 w-full rounded-xl border border-primary-100 bg-white px-3 text-sm font-medium text-heading outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] text-muted">{label}</span>
      {children}
    </label>
  );
}

/** 5 ô lọc: Cấp bậc, Dự án, Loại hình BĐS, Khu vực, Khoảng thu nhập */
export default function JobFilterFields({
  draft,
  onChange,
}: {
  draft: JobFilter;
  onChange: (patch: Partial<JobFilter>) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="Cấp bậc">
        <select
          value={draft.level}
          onChange={(e) => onChange({ level: e.target.value as JobFilter["level"] })}
          className={fieldClass}
        >
          <option value="">Tất cả cấp bậc</option>
          {Object.entries(JOB_LEVEL_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Dự án">
        <select value={draft.project} onChange={(e) => onChange({ project: e.target.value })} className={fieldClass}>
          <option value="">Tất cả dự án</option>
          {PROJECTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Loại hình BĐS">
        <select
          value={draft.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value as JobFilter["propertyType"] })}
          className={fieldClass}
        >
          <option value="">Tất cả loại hình</option>
          {Object.entries(PROPERTY_TYPE_META).map(([k, m]) => (
            <option key={k} value={k}>
              {m.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Khu vực">
        <select value={draft.location} onChange={(e) => onChange({ location: e.target.value })} className={fieldClass}>
          <option value="">Tất cả khu vực</option>
          {Object.entries(LOCATION_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Khoảng thu nhập">
        <select
          value={draft.salary}
          onChange={(e) => onChange({ salary: e.target.value as JobFilter["salary"] })}
          className={fieldClass}
        >
          <option value="">Tất cả mức thu nhập</option>
          {Object.entries(SALARY_RANGE_META).map(([k, m]) => (
            <option key={k} value={k}>
              {m.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
