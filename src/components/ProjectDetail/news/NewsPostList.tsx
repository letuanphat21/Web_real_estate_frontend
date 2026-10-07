import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { POSTS } from "../../../data/projectDetail/news";

type Props = {
  posts: typeof POSTS;
  base: string;
};

export default function NewsPostList({ posts, base }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {posts.map((p) => (
        <article key={p.id} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
          <img src={p.image} alt={p.title} className="w-full object-cover" style={{ height: 185 }} />
          <div className="p-5 pb-6">
            <span className="rounded-full bg-primary-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary-700">{p.category}</span>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-heading">{p.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-body">{p.summary}</p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted">
              <span>{p.date} · {p.read} phút đọc</span>
              <Link to={`${base}/tin-tuc`} className="flex items-center gap-1 font-semibold text-primary-600">Đọc tiếp <ArrowRight size={12} /></Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
