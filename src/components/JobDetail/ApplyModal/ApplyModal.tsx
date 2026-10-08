import { useRef, useState } from "react";
import { AlertCircle, Send, X } from "lucide-react";
import ApplyCvSection, { type ApplyTab } from "./ApplyCvSection";
import ApplyFormFields, { type ApplyFormErrors, type ApplyFormValues } from "./ApplyFormFields";
import ApplySuccess from "./ApplySuccess";
import useFocusTrap from "../../common/useFocusTrap";
import { APPLY_SOURCES, MOCK_APPLICANT, MOCK_APPLY_CVS } from "../../../data/mockJobDetail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Modal "Ứng tuyển nhanh" (desktop: giữa màn hình, mobile: bottom sheet). Chỉ là giao diện:
 * kiểm tra nhập liệu cơ bản ở phía client rồi hiện màn hình "Hồ sơ đã được gửi", không gửi đi đâu.
 * TODO: gọi API ứng tuyển (POST /jobs/:id/applications) khi có BE.
 */
export default function ApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true, onClose);

  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<ApplyTab>("existing");
  const [cvId, setCvId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<ApplyFormValues>({ ...MOCK_APPLICANT, coverLetter: "", source: APPLY_SOURCES[0] });
  const [errors, setErrors] = useState<ApplyFormErrors>({});
  const [cvError, setCvError] = useState("");

  const hasError = !!cvError || Object.keys(errors).length > 0;

  const handleSubmit = () => {
    const next: ApplyFormErrors = {};
    if (!values.fullName.trim()) next.fullName = "Vui lòng nhập họ và tên.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Email không hợp lệ.";
    if (values.phone.replace(/\D/g, "").length < 9) next.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    const cvMissing = tab === "existing" ? cvId === null : file === null;

    setErrors(next);
    setCvError(cvMissing ? (tab === "existing" ? "Vui lòng chọn một CV để ứng tuyển." : "Vui lòng tải CV lên.") : "");
    if (!cvMissing && Object.keys(next).length === 0) setSent(true);
  };

  const cvLabel = tab === "existing" ? (MOCK_APPLY_CVS.find((c) => c.id === cvId)?.title ?? "") : (file?.name ?? "");

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-heading/50" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        tabIndex={-1}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-[560px] sm:rounded-3xl"
      >
        {sent ? (
          <>
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 id="apply-modal-title" className="text-lg font-semibold text-heading">
                Ứng tuyển nhanh
              </h2>
              <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-full bg-primary-50 p-1.5 text-primary-600 hover:bg-primary-100">
                <X size={16} />
              </button>
            </div>
            <ApplySuccess jobTitle={jobTitle} applicant={values} cvLabel={cvLabel} />
          </>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-white px-6 pb-3 pt-5">
              <div>
                <h2 id="apply-modal-title" className="text-lg font-semibold text-heading">
                  Ứng tuyển: {jobTitle}
                </h2>
                <p className="mt-1 text-xs text-body">Chọn CV và kiểm tra thông tin trước khi gửi.</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-full bg-primary-50 p-1.5 text-primary-600 hover:bg-primary-100">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-5 px-6 pb-5 pt-2">
              {hasError && (
                <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-500">
                  <AlertCircle size={14} className="shrink-0" aria-hidden />
                  Vui lòng kiểm tra CV và các thông tin được đánh dấu bên dưới.
                </p>
              )}

              <ApplyCvSection
                tab={tab}
                onTabChange={(t) => {
                  setTab(t);
                  setCvError("");
                }}
                cvs={MOCK_APPLY_CVS}
                selectedCvId={cvId}
                onSelectCv={(id) => {
                  setCvId(id);
                  setCvError("");
                }}
                file={file}
                onFileChange={(f) => {
                  setFile(f);
                  setCvError("");
                }}
                error={cvError}
              />

              <ApplyFormFields
                values={values}
                errors={errors}
                onChange={(patch) => {
                  setValues((v) => ({ ...v, ...patch }));
                  setErrors((e) => {
                    const rest = { ...e };
                    (Object.keys(patch) as (keyof ApplyFormErrors)[]).forEach((k) => delete rest[k]);
                    return rest;
                  });
                }}
              />
            </div>

            <div className="sticky bottom-0 z-10 flex gap-3 border-t border-line bg-white px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="h-12 flex-1 rounded-full border border-line text-sm font-medium text-heading transition hover:bg-primary-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <Send size={15} aria-hidden /> Gửi hồ sơ
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
