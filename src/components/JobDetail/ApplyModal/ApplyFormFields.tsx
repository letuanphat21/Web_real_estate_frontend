import { useWatch, type UseFormReturn } from "react-hook-form";
import { Field, RhfField, inputClass, textareaClass } from "../../CvBuilder/forms/fields";
import { COVER_LETTER_MAX, type ApplyFields } from "../applySchemas";
import { APPLY_SOURCES } from "../../../types/job.types";

/** Họ tên, email, SĐT, thư giới thiệu và nguồn biết tin của form ứng tuyển */
export default function ApplyFormFields({ form }: { form: UseFormReturn<ApplyFields> }) {
  const { errors } = form.formState;
  const coverLength = useWatch({ control: form.control, name: "coverLetter" })?.length ?? 0;

  return (
    <>
      <RhfField form={form} name="fullName" label="Họ và tên" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <RhfField form={form} name="email" label="Email" required type="email" />
        <RhfField form={form} name="phone" label="Số điện thoại" required type="tel" />
      </div>

      <div>
        <Field label="Thư giới thiệu" note="Không bắt buộc" error={errors.coverLetter?.message}>
          <textarea
            {...form.register("coverLetter")}
            rows={4}
            aria-invalid={!!errors.coverLetter}
            placeholder="Giới thiệu ngắn về bản thân và lý do bạn phù hợp với vị trí này"
            className={textareaClass}
          />
        </Field>
        <p
          className={`mt-1 text-right text-xs ${coverLength > COVER_LETTER_MAX ? "text-danger" : "text-muted"}`}
          aria-live="polite"
        >
          {coverLength}/{COVER_LETTER_MAX}
        </p>
      </div>

      <Field label="Bạn biết tin qua đâu?" required error={errors.sources?.message}>
        <select {...form.register("sources")} aria-invalid={!!errors.sources} className={inputClass}>
          <option value="">Chọn nguồn</option>
          {APPLY_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}
