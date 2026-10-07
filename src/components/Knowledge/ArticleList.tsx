import { Bookmark, Clock } from "lucide-react";
import { catName, readMinutes, excerpt } from "./knowledgeHelpers";
import { formatDate } from "../../utils/formatDate";
import type { KnowledgeDocument } from "../../types/document.types";

type Props = {
  rows: KnowledgeDocument[];
};

export default function ArticleList({ rows }: Props) {
  return (
    <ul className="divide-y divide-line rounded-3xl border border-line bg-white px-5 shadow-sm">
      {rows.map((d) => (
        <li key={d.id} className="flex gap-5 py-5">
          <img src={d.thumbnail} alt="" className="h-[96px] w-[132px] shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="rounded-full bg-primary-100 px-2.5 py-1 font-semibold text-primary-700">{catName(d.categoryId)}</span>
              <span className="flex items-center gap-1 text-muted"><Clock size={11} /> {readMinutes(d)} phút đọc</span>
            </div>
            <h3 className="mt-2 text-base font-semibold leading-snug text-heading">{d.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-body">{excerpt(d)}</p>
            <p className="mt-2 text-[11px] text-muted">
              Đăng {formatDate(d.createdAt)}
              {d.updatedAt !== d.createdAt && ` · Cập nhật ${formatDate(d.updatedAt)}`}
            </p>
          </div>
          <button aria-label="Lưu bài" className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100">
            <Bookmark size={14} />
          </button>
        </li>
      ))}
      {rows.length === 0 && <li className="py-12 text-center text-body">Không tìm thấy bài viết phù hợp.</li>}
    </ul>
  );
}
