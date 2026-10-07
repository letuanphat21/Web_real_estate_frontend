import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { APPLICATION_STATUS_LABEL, type Application } from "../../../types/job.types";

export default function ApplySuccess({
  application,
  jobTitle,
  onClose,
}: {
  application: Application;
  jobTitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white">
        <Check size={32} strokeWidth={3} aria-hidden />
      </span>
      <h2 id="apply-modal-title" className="mt-5 text-xl font-semibold text-heading">
        Hồ sơ đã được gửi
      </h2>
      <p className="mt-2 max-w-sm text-sm text-body">
        Hồ sơ ứng tuyển vị trí “{jobTitle}” đã được gửi tới nhà tuyển dụng.
      </p>
      <p className="mt-4 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-700">
        Trạng thái: {APPLICATION_STATUS_LABEL[application.status]}
      </p>
      <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-full border border-line px-6 text-sm font-medium text-heading hover:bg-primary-50"
        >
          Đóng
        </button>
        <Link
          to="/tuyen-dung"
          className="flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50"
        >
          Xem việc làm khác
        </Link>
      </div>
    </div>
  );
}
