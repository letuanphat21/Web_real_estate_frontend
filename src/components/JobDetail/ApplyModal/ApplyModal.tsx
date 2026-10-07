import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import ApplyCvSection, { type ApplyTab } from "./ApplyCvSection";
import ApplyFormFields from "./ApplyFormFields";
import ApplySuccess from "./ApplySuccess";
import { ApiError, getMyCvs, submitApplication } from "../applyMock";
import { applyFieldsSchema, type ApplyFields } from "../applySchemas";
import useFocusTrap from "../../common/useFocusTrap";
import type { AuthUser } from "../../../types/auth.types";
import type { Application, Job } from "../../../types/job.types";

/**
 * Modal ứng tuyển nhanh (desktop: giữa màn hình, mobile: bottom sheet).
 * Trang cha chỉ render khi đang mở nên state luôn khởi tạo mới.
 */
export default function ApplyModal({
  job,
  user,
  onClose,
  onApplied,
}: {
  job: Job;
  user: AuthUser;
  onClose: () => void;
  onApplied: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cvs = getMyCvs();
  const [tab, setTab] = useState<ApplyTab>("existing");
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
      phone: "",
      coverLetter: "",
      sources: "" as ApplyFields["sources"],
    },
    mode: "onChange",
  });
  const { isSubmitting } = form.formState;

  const selectedCvId = pickedCvId ?? cvs[0]?.id ?? null;

  useFocusTrap(panelRef, true, () => {
    if (!isSubmitting) onClose();
  });

  const submit = form.handleSubmit(async (values) => {
    setServerError("");
    if (tab === "existing" && selectedCvId === null) return setCvError("Vui lòng chọn một CV");
    if (tab === "upload" && !file) return setCvError("Vui lòng tải CV lên");
    setCvError("");

    try {
      const app = await submitApplication(user.id, job, {
        ...values,
        ...(tab === "existing" ? { cvId: selectedCvId! } : { file: file! }),
      });
      setDone(app);
      onApplied();
    } catch (e) {
      setServerError(e instanceof ApiError ? e.message : "Không thể gửi hồ sơ lúc này, vui lòng thử lại");
      // đã ứng tuyển rồi thì đồng bộ nút trên trang
      if (e instanceof ApiError && e.code === "ALREADY_APPLIED") onApplied();
    }
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-heading/50" onClick={() => !isSubmitting && onClose()} aria-hidden />
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
              <ApplyCvSection
                tab={tab}
                onTabChange={(t) => {
                  setTab(t);
                  setCvError("");
                }}
                cvs={cvs}
                selectedCvId={selectedCvId}
                onSelectCv={setPickedCvId}
                file={file}
                onFileChange={setFile}
                error={cvError}
              />
              <ApplyFormFields form={form} />
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
