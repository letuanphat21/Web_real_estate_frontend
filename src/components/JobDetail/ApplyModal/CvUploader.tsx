import { useRef, useState } from "react";
import { FileText, Trash2, UploadCloud } from "lucide-react";
import { CV_FILE_ACCEPT, validateCvFile } from "../../../schemas/applySchemas";
import { formatFileSize } from "../../../utils/jobHelpers";

const TYPE_LABEL: Record<string, string> = { pdf: "PDF", doc: "DOC", docx: "DOCX" };

/** Tab "Tải CV lên": kéo thả hoặc chọn file; hiện tên, dung lượng, định dạng và nút xóa */
export default function CvUploader({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const accept = (f?: File) => {
    if (!f) return;
    const problem = validateCvFile(f);
    setError(problem ?? "");
    onChange(problem ? null : f);
  };

  if (file) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-primary-300 bg-primary-50 p-3.5">
        <FileText size={22} className="shrink-0 text-primary-600" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-heading">{file.name}</p>
          <p className="text-xs text-muted">
            {TYPE_LABEL[ext] ?? ext.toUpperCase()} · {formatFileSize(file.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(null);
            setError("");
          }}
          aria-label="Xóa file đã chọn"
          className="rounded-full p-2 text-muted hover:bg-white hover:text-danger"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
          dragging ? "border-primary-600 bg-primary-50" : "border-line"
        }`}
      >
        <UploadCloud size={30} className="text-primary-400" aria-hidden />
        <p className="mt-2 text-sm text-body">Kéo thả CV vào đây hoặc</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 rounded-full bg-primary-50 px-5 py-2 text-sm font-medium text-primary-600 hover:bg-primary-100"
        >
          Chọn file
        </button>
        <p className="mt-2 text-xs text-muted">PDF, DOC, DOCX · tối đa 5MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={CV_FILE_ACCEPT}
        className="sr-only"
        aria-label="Chọn file CV"
        tabIndex={-1}
        onChange={(e) => {
          accept(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
