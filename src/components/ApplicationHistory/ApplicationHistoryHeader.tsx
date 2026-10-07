import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";

export default function ApplicationHistoryHeader() {
  return (
    <header>
      <Breadcrumb items={[{ label: "Tài khoản", to: "/account" }, { label: "Lịch sử ứng tuyển" }]} />
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-heading md:text-4xl">Lịch sử ứng tuyển</h1>
          <p className="mt-2 text-sm text-body">
            Theo dõi tiến trình hồ sơ, lịch phỏng vấn và phản hồi từ nhà tuyển dụng tại một nơi.
          </p>
        </div>
        <Link
          to="/jobs"
          className="flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Search size={15} aria-hidden /> Tìm việc mới
        </Link>
      </div>
    </header>
  );
}
