import { ChevronDown, Search, ArrowUpDown } from "lucide-react";

type Props = {
  draft: string;
  setDraft: (value: string) => void;
  setQuery: (value: string) => void;
  setPage: (page: number) => void;
};

export default function NewsSearchBar({ draft, setDraft, setQuery, setPage }: Props) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setQuery(draft); setPage(1); }}
      className="flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-white p-4 shadow-sm"
    >
      <div className="relative min-w-[240px] flex-1">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tìm kiếm tin tức dự án…"
          className="h-12 w-full rounded-full border border-line bg-primary-50/60 pl-11 pr-4 text-sm text-heading outline-none placeholder:text-muted focus:border-primary-300"
        />
      </div>
      <button className="h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-7 text-sm font-medium text-white hover:opacity-95">Tìm kiếm</button>
      <button type="button" className="flex h-12 w-56 items-center justify-between rounded-full border border-line bg-white px-5 text-sm text-body">
        <span className="flex items-center gap-2"><ArrowUpDown size={14} /> Mới nhất</span> <ChevronDown size={15} />
      </button>
    </form>
  );
}
