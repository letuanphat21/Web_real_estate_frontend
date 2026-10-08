import { ChevronDown } from "lucide-react";
import { APPLY_SOURCES } from "../../../data/mockJobDetail";
import type { ApplicantInfo } from "../../../types/jobDetail.types";

export const COVER_LETTER_MAX = 1000;

export interface ApplyFormValues extends ApplicantInfo {
  coverLetter: string;
  source: string;
}

export type ApplyFormErrors = Partial<Record<"fullName" | "email" | "phone", string>>;

const inputBase =
  "h-11 w-full rounded-xl border bg-white px-3 text-sm text-heading outline-none transition placeholder:text-gray-400 focus:ring-2";
const inputClass = (error?: string) =>
  `${inputBase} ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-line focus:border-primary-500 focus:ring-primary-100"}`;

function Field({
  label,
  required,
  note,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  note?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-heading">
          {label}
          {required && <span className="text-red-500"> *</span>}
          {note && <span className="ml-1.5 text-xs font-normal text-gray-400">· {note}</span>}
        </span>
        {children}
      </label>
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/** "Thông tin liên hệ": họ tên, email, số điện thoại, thư giới thiệu và nguồn biết tin */
export default function ApplyFormFields({
  values,
  errors,
  onChange,
}: {
  values: ApplyFormValues;
  errors: ApplyFormErrors;
  onChange: (patch: Partial<ApplyFormValues>) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-heading">Thông tin liên hệ</p>

      <Field label="Họ và tên" required error={errors.fullName}>
        <input
          value={values.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="Nhập họ và tên"
          aria-invalid={!!errors.fullName}
          className={inputClass(errors.fullName)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="ten@email.com"
            aria-invalid={!!errors.email}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Số điện thoại" required error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="090 000 0000"
            aria-invalid={!!errors.phone}
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      <div>
        <Field label="Thư giới thiệu" note="Không bắt buộc">
          <textarea
            value={values.coverLetter}
            onChange={(e) => onChange({ coverLetter: e.target.value.slice(0, COVER_LETTER_MAX) })}
            rows={4}
            placeholder="Giới thiệu ngắn về kinh nghiệm và lý do bạn phù hợp với vị trí này..."
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-heading outline-none transition placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </Field>
        <p className="mt-1 text-right text-xs text-gray-400" aria-live="polite">
          {values.coverLetter.length} / {COVER_LETTER_MAX.toLocaleString("en-US")} ký tự
        </p>
      </div>

      <Field label="Bạn biết tin tuyển dụng này qua đâu?">
        <span className="relative block">
          <select
            value={values.source}
            onChange={(e) => onChange({ source: e.target.value })}
            className={`${inputClass()} appearance-none pr-9`}
          >
            {APPLY_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
        </span>
      </Field>
    </div>
  );
}
