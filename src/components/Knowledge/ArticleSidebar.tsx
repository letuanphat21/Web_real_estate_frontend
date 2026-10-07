import { MOCK_CATEGORIES, MOCK_DOCUMENTS } from "../../data/mockDocuments";

type Props = {
  counts: Map<number, number>;
  categoryId: number;
  setCategoryId: (id: number) => void;
  setPage: (page: number) => void;
};

export default function ArticleSidebar({ counts, categoryId, setCategoryId, setPage }: Props) {
  return (
    <aside className="space-y-5">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-heading">Chuyên mục</h3>
        <ul className="mt-3">
          {[{ id: 0, name: "Tất cả", n: MOCK_DOCUMENTS.length }, ...MOCK_CATEGORIES.map((c) => ({ id: c.id, name: c.name, n: counts.get(c.id) ?? 0 }))].map((c) => (
            <li key={c.id}>
              <button
                onClick={() => { setCategoryId(c.id); setPage(0); }}
                className={`flex w-full items-center justify-between py-2.5 text-xs ${categoryId === c.id ? "font-semibold text-primary-600" : "text-heading"}`}
              >
                {c.name}
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] ${categoryId === c.id ? "bg-primary-100 text-primary-700" : "bg-line text-muted"}`}>{c.n}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
