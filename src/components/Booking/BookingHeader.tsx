import { Download } from "lucide-react";

type Props = {
  onExport: () => void;
};

export default function BookingHeader({ onExport }: Props) {
  const exportCsv = onExport;
  return (
    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-heading">Danh sách booking</h1>
        <p className="mt-2 text-sm text-body">Theo dõi yêu cầu giữ chỗ, phân công chuyên viên và quản lý trạng thái booking.</p>
      </div>
      <button onClick={exportCsv} className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-heading shadow-sm hover:bg-primary-50">
        <Download size={15} /> Xuất danh sách
      </button>
    </div>
  );
}
