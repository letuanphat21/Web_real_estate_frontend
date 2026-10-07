import { Link } from "react-router-dom";
import { AlertCircle, SearchX } from "lucide-react";

/** 404 (job không tồn tại/đã xóa) hoặc lỗi tải trang */
export default function JobNotFound({ error, onRetry }: { error?: boolean; onRetry?: () => void }) {
  return (
    <div role="status" className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
      {error ? (
        <AlertCircle size={44} className="text-danger" aria-hidden />
      ) : (
        <SearchX size={44} className="text-primary-300" aria-hidden />
      )}
      <h1 className="mt-5 text-xl font-medium text-heading">
        {error ? "Không thể tải việc làm" : "Không tìm thấy việc làm"}
      </h1>
      <p className="mt-2 text-sm text-body">
        {error
          ? "Đã có lỗi xảy ra, vui lòng thử lại."
          : "Tin tuyển dụng này không tồn tại hoặc đã bị gỡ khỏi hệ thống."}
      </p>
      <div className="mt-6 flex gap-3">
        {error && onRetry && (
          <button onClick={onRetry} className="rounded-full bg-primary-50 px-5 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-100">
            Thử lại
          </button>
        )}
        <Link
          to="/tuyen-dung"
          className="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-medium text-white"
        >
          Xem việc làm khác
        </Link>
      </div>
    </div>
  );
}
