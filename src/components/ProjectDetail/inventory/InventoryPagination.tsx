import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

type Props = {
  rowCount: number;
  totalCount: number;
  perPage: number;
  page: number;
  setPage: (page: number) => void;
};

export default function InventoryPagination({ rowCount, totalCount, perPage, page, setPage }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-body">
      <div className="flex items-center gap-3">
        Số dòng mỗi trang
        <span className="flex h-10 items-center gap-6 rounded-xl border border-line px-3 font-medium text-heading">10 <ChevronDown size={14} /></span>
        Hiển thị 1–{Math.min(rowCount, perPage)} trong {totalCount} kết quả
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Trang trước" onClick={() => setPage(Math.max(1, page - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-muted">
          <ChevronLeft size={15} />
        </button>
        {([1, 2, 3, 4, 5, "…", 9] as const).map((n, k) =>
          n === "…" ? (
            <span key={k} className="px-1 text-muted">…</span>
          ) : (
            <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-lg text-sm font-medium ${page === n ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>
              {n}
            </button>
          )
        )}
        <button aria-label="Trang sau" onClick={() => setPage(Math.min(9, page + 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-heading">
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
