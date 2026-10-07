import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  page: number;
  setPage: (page: number) => void;
};

export default function NewsPagination({ page, setPage }: Props) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-xs">
      <button onClick={() => setPage(Math.max(1, page - 1))} className="flex h-10 items-center gap-1 rounded-full border border-line bg-white px-4 text-heading">
        <ChevronLeft size={13} /> Trang trước
      </button>
      {([1, 2, 3, 4, "…", 8] as const).map((n, k) =>
        n === "…" ? (
          <span key={k} className="px-1 text-muted">…</span>
        ) : (
          <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-full font-medium ${page === n ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>{n}</button>
        )
      )}
      <button onClick={() => setPage(Math.min(8, page + 1))} className="flex h-10 items-center gap-1 rounded-full border border-line bg-white px-4 text-heading">
        Trang sau <ChevronRight size={13} />
      </button>
    </div>
  );
}
