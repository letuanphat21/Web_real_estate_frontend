import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  total: number;
  pageSize: number;
};

export default function BookingPagination({ page, setPage, totalPages, total, pageSize }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-body">
      <p>
        Hiển thị {total ? page * pageSize + 1 : 0}–{Math.min(total, (page + 1) * pageSize)} trong tổng số {total} booking
      </p>
      <div className="flex items-center gap-2">
        <button aria-label="Trang trước" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white disabled:opacity-40">
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i)} className={`h-9 w-9 rounded-lg text-sm font-medium ${page === i ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>
            {i + 1}
          </button>
        ))}
        <button aria-label="Trang sau" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white disabled:opacity-40">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
