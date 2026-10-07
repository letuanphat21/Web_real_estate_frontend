import CvPicker from "./CvPicker";
import CvUploader from "./CvUploader";
import type { ApplyCvOption } from "../../../types/jobDetail.types";

export type ApplyTab = "existing" | "upload";

/** Phần "Chọn CV" trong modal: 2 tab "CV trên NovaLand" và "Tải CV lên" */
export default function ApplyCvSection({
  tab,
  onTabChange,
  cvs,
  selectedCvId,
  onSelectCv,
  file,
  onFileChange,
  error,
}: {
  tab: ApplyTab;
  onTabChange: (tab: ApplyTab) => void;
  cvs: ApplyCvOption[];
  selectedCvId: number | null;
  onSelectCv: (id: number) => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}) {
  const tabBtn = (id: ApplyTab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`apply-tab-${id}`}
      aria-selected={tab === id}
      aria-controls="apply-tabpanel"
      onClick={() => onTabChange(id)}
      className={`flex-1 rounded-lg py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-primary-600 ${
        tab === id ? "bg-white font-medium text-primary-700 shadow-sm" : "text-body hover:text-primary-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-heading">Chọn CV</p>
      <div role="tablist" aria-label="Nguồn CV" className="flex gap-1 rounded-xl bg-primary-50 p-1">
        {tabBtn("existing", "CV trên NovaLand")}
        {tabBtn("upload", "Tải CV lên")}
      </div>
      <div role="tabpanel" id="apply-tabpanel" aria-labelledby={`apply-tab-${tab}`} className="mt-3">
        {tab === "existing" ? (
          <CvPicker cvs={cvs} selectedId={selectedCvId} onSelect={onSelectCv} error={error} />
        ) : (
          <CvUploader file={file} onChange={onFileChange} error={error} />
        )}
      </div>
    </div>
  );
}
