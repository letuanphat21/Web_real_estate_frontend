import { ChevronDown, Search } from "lucide-react";
import { selectCls } from "./knowledgeHelpers";
import { MOCK_CATEGORIES } from "../../data/mockDocuments";
import { DOCUMENT_SORT_LABEL, type DocumentSort } from "../../types/document.types";

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  setKeywordDraft: (value: string) => void;
  categoryId: number;
  setCategoryId: (id: number) => void;
  sort: DocumentSort;
  setSort: (sort: DocumentSort) => void;
  setPage: (page: number) => void;
};

export default function ArticleFilters({ keyword, setKeyword, setKeywordDraft, categoryId, setCategoryId, sort, setSort, setPage }: Props) {
  return (
    <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-primary-50 p-4 md:grid-cols-[1fr_220px_190px]">
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={keyword}
          onChange={(e) => { setKeyword(e.target.value); setKeywordDraft(e.target.value); setPage(0); }}
          placeholder="Tìm theo tiêu đề bài viết…"
          className={`${selectCls} pl-10`}
        />
      </div>
      <div className="relative">
        <select value={categoryId} onChange={(e) => { setCategoryId(Number(e.target.value)); setPage(0); }} className={selectCls}>
          <option value={0}>Tất cả chuyên mục</option>
          {MOCK_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
      </div>
      <div className="relative">
        <select value={sort} onChange={(e) => { setSort(e.target.value as DocumentSort); setPage(0); }} className={selectCls}>
          {(Object.keys(DOCUMENT_SORT_LABEL) as DocumentSort[]).map((k) => <option key={k} value={k}>{DOCUMENT_SORT_LABEL[k]}</option>)}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
      </div>
    </div>
  );
}
