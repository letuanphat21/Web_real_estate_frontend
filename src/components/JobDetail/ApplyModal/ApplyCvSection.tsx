import CvPicker from "./CvPicker";
import CvUploader from "./CvUploader";
import type { Cv } from "../../../types/job.types";

export type ApplyTab = "existing" | "upload";

/** Phần chọn CV trong modal: 2 tab "CV trên NovaLand" và "Tải CV lên" */
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
  cvs: Cv[];
  selectedCvId: number | null;
  onSelectCv: (id: number) => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error: string;
}) {
  const tabBtn = (id: ApplyTab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={tab === id}
      aria-controls={`panel-${id}`}
      onClick={() => onTabChange(id)}
      className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
        tab === id ? "bg-white text-primary-700 shadow-sm" : "text-body hover:text-primary-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-heading">
        CV ứng tuyển <span className="text-danger">*</span>
      </p>
      <div role="tablist" aria-label="Chọn nguồn CV" className="flex gap-1 rounded-full bg-primary-50 p-1">
        {tabBtn("existing", "CV trên NovaLand")}
        {tabBtn("upload", "Tải CV lên")}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-3">
        {tab === "existing" ? (
          <CvPicker cvs={cvs} selectedId={selectedCvId} onSelect={onSelectCv} />
        ) : (
          <CvUploader file={file} onChange={onFileChange} />
        )}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
