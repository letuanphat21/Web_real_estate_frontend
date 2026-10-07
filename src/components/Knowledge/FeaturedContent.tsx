import { ChevronRight } from "lucide-react";
import Heading from "./KnowledgeHeading";
import { catName, readMinutes, excerpt } from "./knowledgeHelpers";
import { MOCK_CATEGORIES } from "../../data/mockDocuments";
import { formatDate } from "../../utils/formatDate";
import type { KnowledgeDocument } from "../../types/document.types";

type Props = {
  featured: { main: KnowledgeDocument | undefined; side: KnowledgeDocument[] };
  featuredCat: number;
  setFeaturedCat: (id: number) => void;
};

export default function FeaturedContent({ featured, featuredCat, setFeaturedCat }: Props) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Biên tập viên chọn" title="Nội dung nổi bật" desc="Các bài được cập nhật gần đây và đọc nhiều nhất từ chuyên gia." />
          <div className="flex flex-wrap gap-2">
            {[{ id: 0, name: "Tất cả" }, ...MOCK_CATEGORIES.slice(0, 3)].map((c) => (
              <button
                key={c.id}
                onClick={() => setFeaturedCat(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${featuredCat === c.id ? "bg-primary-100 text-primary-700" : "border border-line bg-white text-body"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {featured.main ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <article className="relative overflow-hidden rounded-3xl" style={{ minHeight: 400 }}>
              <img src={featured.main.thumbnail} alt={featured.main.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer via-footer/50 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                {catName(featured.main.categoryId)}
              </span>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className="max-w-md text-2xl font-semibold leading-snug">{featured.main.title}</h3>
                <p className="mt-3 line-clamp-2 text-xs text-white/80">{excerpt(featured.main)}</p>
                <p className="mt-3 text-[11px] text-white/70">
                  Cập nhật {formatDate(featured.main.updatedAt)} · {readMinutes(featured.main)} phút đọc
                </p>
              </div>
            </article>
            <div className="flex flex-col gap-4">
              {featured.side.map((d) => (
                <article key={d.id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3 shadow-sm">
                  <img src={d.thumbnail} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase text-primary-600">{catName(d.categoryId)}</p>
                    <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-heading">{d.title}</h4>
                    <p className="mt-1.5 text-[11px] text-muted">{formatDate(d.updatedAt)} · {readMinutes(d)} phút đọc</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-primary-600" />
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-10 text-center text-body">Chưa có bài viết thuộc chuyên mục này.</p>
        )}
      </div>
    </section>
  );
}
