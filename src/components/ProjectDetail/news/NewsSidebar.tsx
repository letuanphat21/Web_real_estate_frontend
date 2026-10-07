import { Layers } from "lucide-react";
import type { CATEGORIES, TAGS } from "../../../data/projectDetail/news";

type Props = {
  categories: typeof CATEGORIES;
  category: string;
  setCategory: (name: string) => void;
  tags: typeof TAGS;
};

export default function NewsSidebar({ categories, category, setCategory, tags }: Props) {
  return (
    <aside className="space-y-5">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-lg text-heading">Chuyên mục</h3>
          <Layers size={17} className="text-primary-600" />
        </div>
        <ul className="mt-2">
          {categories.map(([name, n]) => (
            <li key={name}>
              <button onClick={() => setCategory(name)} className={`flex w-full items-center justify-between py-3 text-xs ${category === name ? "font-medium text-primary-600" : "text-heading"}`}>
                {name}
                <span className={`rounded-full px-2.5 py-1 text-[10px] ${category === name ? "bg-primary-100 text-primary-700" : "bg-line text-muted"}`}>{n}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-primary-200 bg-primary-50/70 p-5">
        <h3 className="text-lg text-heading">Thẻ phổ biến</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={t} className={`rounded-full border px-3 py-1.5 text-[11px] ${i < 2 ? "border-primary-200 bg-primary-100 text-primary-700" : "border-line bg-white text-heading"}`}>{t}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}
