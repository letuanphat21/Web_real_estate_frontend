import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import CvPicker from "./CvPicker";
import CvUploader from "./CvUploader";
import ApplySuccess from "./ApplySuccess";
import { Field, RhfField, inputClass, textareaClass } from "../../CvBuilder/forms/fields";
import useFocusTrap from "../../../hooks/useFocusTrap";
import { COVER_LETTER_MAX, applyFieldsSchema, type ApplyFields } from "../../../schemas/applySchemas";
import applicationService from "../../../services/applicationService";
import { isApiError } from "../../../services/apiError";
import { APPLY_SOURCES, type Application, type Cv, type Job } from "../../../types/job.types";
import type { CurrentUser } from "../../../types/user.types";

type Tab = "existing" | "upload";

/**
 * Modal ứng tuyển nhanh (desktop: giữa màn hình, mobile: bottom sheet).
 * Trang cha chỉ render khi đang mở nên state luôn khởi tạo mới.
 */
export default function ApplyModal({
  job,
  user,
  cvs,
  cvsLoading,
  onClose,
  onApplied,
}: {
  job: Job;
  user: CurrentUser;
  cvs: Cv[] | null;
  cvsLoading: boolean;
  onClose: () => void;
  onApplied: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("existing");
  const [pickedCvId, setPickedCvId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<Application | null>(null);

  const form = useForm<ApplyFields>({
    resolver: zodResolver(applyFieldsSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      coverLetter: "",
      sources: "" as ApplyFields["sources"],
    },
    mode: "onChange",
  });
  const { isSubmitting, errors } = form.formState;

  // CV chọn mặc định: CV đầu tiên khi danh sách đã tải
  const selectedCvId = pickedCvId ?? cvs?.[0]?.id ?? null;
  const coverLength = useWatch({ control: form.control, name: "coverLetter" })?.length ?? 0;

  useFocusTrap(panelRef, true, () => {
    if (!isSubmitting) onClose();
  });

  const submit = form.handleSubmit(async (values) => {
    setServerError("");
    if (tab === "existing" && selectedCvId === null) return setCvError("Vui lòng chọn một CV");
    if (tab === "upload" && !file) return setCvError("Vui lòng tải CV lên");
    setCvError("");

    try {
      const app = await applicationService.applyToJob(job.id, {
        ...values,
        ...(tab === "existing" ? { cvId: selectedCvId! } : { file: file! }),
      });
      setDone(app);
      onApplied();
    } catch (e) {
      setServerError(isApiError(e) ? e.message : "Không thể gửi hồ sơ lúc này, vui lòng thử lại");
      // đã ứng tuyển rồi thì đồng bộ nút trên trang
      if (isApiError(e) && e.code === "ALREADY_APPLIED") onApplied();
    }
  });

  const tabBtn = (id: Tab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={tab === id}
      aria-controls={`panel-${id}`}
      onClick={() => {
        setTab(id);
        setCvError("");
      }}
      className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
        tab === id ? "bg-white text-primary-700 shadow-sm" : "text-body hover:text-primary-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-heading/50"
        onClick={() => !isSubmitting && onClose()}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        tabIndex={-1}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-xl sm:rounded-3xl"
      >
        {done ? (
          <ApplySuccess application={done} jobTitle={job.title} onClose={onClose} />
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-line bg-white px-6 py-4">
              <h2 id="apply-modal-title" className="text-lg font-semibold text-heading">
                Ứng tuyển: {job.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Đóng"
                className="rounded-full p-1.5 text-body hover:bg-primary-50 disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              {serverError && (
                <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
                  {serverError}
                </p>
              )}

              <div>
                <p className="mb-2 text-sm font-medium text-heading">
                  CV ứng tuyển <span className="text-danger">*</span>
                </p>
                <div role="tablist" aria-label="Chọn nguồn CV" className="flex gap-1 rounded-full bg-primary-50 p-1">
                  {tabBtn("existing", "CV trên NovaLand")}
                  {tabBtn("upload", "Tải CV lên")}
                </div>
                <div
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                  className="mt-3"
                >
                  {tab === "existing" ? (
                    <CvPicker cvs={cvs} loading={cvsLoading} selectedId={selectedCvId} onSelect={setPickedCvId} />
                  ) : (
                    <CvUploader file={file} onChange={setFile} />
                  )}
                </div>
                {cvError && (
                  <p role="alert" className="mt-2 text-xs text-danger">
                    {cvError}
                  </p>
                )}
              </div>

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
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-line bg-white px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="h-12 rounded-full border border-line px-6 text-sm font-medium text-heading hover:bg-primary-50 disabled:opacity-40"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 disabled:opacity-70"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden />}
                {isSubmitting ? "Đang gửi…" : "Gửi hồ sơ ứng tuyển"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
