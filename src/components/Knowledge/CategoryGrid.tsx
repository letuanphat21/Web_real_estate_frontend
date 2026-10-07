import { Layers } from "lucide-react";
import Heading from "./KnowledgeHeading";
import { CATEGORY_ICON } from "./knowledgeHelpers";
import { MOCK_CATEGORIES, MOCK_DOCUMENTS } from "../../data/mockDocuments";

type Props = {
  counts: Map<number, number>;
  setCategoryId: (id: number) => void;
  setPage: (page: number) => void;
};

export default function CategoryGrid({ counts, setCategoryId, setPage }: Props) {
  return (
    <section className="bg-primary-50/70 py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Danh mục kiến thức" title="Kiến thức có cấu trúc, dễ tìm và dễ áp dụng" desc="Bài viết được phân loại theo chuyên mục để bạn đi thẳng đến thông tin cần biết." />
          <div className="flex gap-8 text-right">
            <div><p className="text-2xl font-bold text-heading">{MOCK_DOCUMENTS.length}</p><p className="text-[11px] text-body">Bài viết</p></div>
            <div><p className="text-2xl font-bold text-heading">{MOCK_CATEGORIES.length}</p><p className="text-[11px] text-body">Chuyên mục</p></div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-br from-white via-primary-50 to-blue-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-heading">Chuyên mục nổi bật</h3>
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-primary-700">{MOCK_CATEGORIES.length} nhóm kiến thức</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICON[c.id] ?? Layers;
              return (
                <button
                  key={c.id}
                  onClick={() => { setCategoryId(c.id); setPage(0); document.getElementById("bai-viet")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600"><Icon size={20} /></span>
                    <span className="text-[11px] font-medium text-muted">{counts.get(c.id) ?? 0} bài</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-heading">{c.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-body">{c.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
