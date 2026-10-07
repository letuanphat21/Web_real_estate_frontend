import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, ArrowRight } from "lucide-react";
import { MOCK_FAVORITES } from "../../data/mockAccount";

export default function FavoritesPage() {
  const [items, setItems] = useState(MOCK_FAVORITES);

  return (
    <div>
      <nav className="flex items-center gap-3 text-xs text-muted">
        <span>Tài khoản</span> <ChevronRight size={12} />
        <span className="font-semibold text-primary-600">Bất động sản đã lưu</span>
      </nav>
      <h1 className="mt-4 text-4xl font-bold text-heading">Bất động sản đã lưu</h1>
      <p className="mt-2 text-sm text-body">Những căn bạn đã lưu để so sánh và theo dõi giá, tình trạng mới nhất.</p>

      <div className="mt-6">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-line bg-white py-16 text-center shadow-sm">
            <Heart size={36} className="mx-auto text-primary-300" />
            <p className="mt-4 font-semibold text-heading">Bạn chưa lưu căn nào</p>
            <Link to="/du-an" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white">
              Khám phá dự án <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((f) => (
              <article key={f.id} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                <div className="relative">
                  <img src={f.image} alt={f.unitCode} className="w-full object-cover" style={{ height: 180 }} />
                  <button
                    onClick={() => setItems((l) => l.filter((x) => x.id !== f.id))}
                    aria-label="Bỏ quan tâm"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary-600 shadow"
                  >
                    <Heart size={16} className="fill-primary-600" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-heading">{f.unitCode}</h2>
                    <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${f.available ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${f.available ? "bg-success" : "bg-danger"}`} />
                      {f.available ? "Còn trống" : "Đã bán"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{f.projectName}</p>
                  <p className="mt-1 text-sm text-body">{f.spec} · {f.direction}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-primary-600">{f.price}</p>
                    <Link to={`/du-an/${f.projectId}/quy-can`} className="flex items-center gap-1 text-xs font-semibold text-heading">
                      Xem chi tiết <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
