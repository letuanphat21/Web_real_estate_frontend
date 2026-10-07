import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Search, ArrowRight } from "lucide-react";
import type { FormEvent } from "react";
import { MOCK_CATEGORIES } from "../../data/mockDocuments";

type Props = {
  keywordDraft: string;
  setKeywordDraft: (value: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  setCategoryId: (id: number) => void;
  setPage: (page: number) => void;
  stats: { value: string | number; label: string }[];
};

export default function KnowledgeHero({ keywordDraft, setKeywordDraft, onSearch, setCategoryId, setPage, stats }: Props) {
  const search = onSearch;
  return (
    <section className="bg-gradient-to-b from-blue-200 via-primary-50 to-white pb-14 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-3 text-xs text-muted">
          <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
          <span className="font-semibold text-primary-600">Kiến thức</span>
        </nav>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
            <BookOpen size={12} /> Kho kiến thức được biên tập bởi chuyên gia
          </span>
          <h1 className="mt-5 text-4xl font-bold text-heading md:text-5xl">Thư viện kiến thức bất động sản</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-body">
            Tra cứu pháp lý, quy trình mua bán và góc nhìn thị trường — rõ ràng, minh bạch, sẵn sàng áp dụng.
          </p>

          <form onSubmit={search} className="mt-7 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-primary-100">
            <Search size={17} className="ml-3 shrink-0 text-muted" />
            <input
              value={keywordDraft}
              onChange={(e) => setKeywordDraft(e.target.value)}
              placeholder='Tìm bài viết, ví dụ "sổ hồng", "lãi suất vay"…'
              className="h-11 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-muted"
            />
            <button className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white hover:opacity-95">
              Tìm kiếm <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted">Gợi ý:</span>
            {[{ id: 0, name: "Nổi bật" }, ...MOCK_CATEGORIES.slice(0, 4)].map((c) => (
              <button
                key={c.id}
                onClick={() => { setCategoryId(c.id); setPage(0); document.getElementById("bai-viet")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`rounded-full border px-3 py-1.5 font-medium ${
                  c.id === 0 ? "border-primary-200 bg-primary-100 text-primary-700" : "border-line bg-white text-heading hover:border-primary-300"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-sm md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/90 px-4 py-4">
                <p className="text-xl font-bold text-heading">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-body">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
