import { Plus } from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import type { Company } from "../../types/job.types";

export default function FeaturedCompanies({
  companies,
  loading,
}: {
  companies: Company[];
  loading: boolean;
}) {
  return (
    <section
      className="rounded-3xl border border-primary-100 bg-primary-50/60 p-6"
      aria-labelledby="companies-heading"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 id="companies-heading" className="text-lg font-medium text-heading">
          Công ty nổi bật
        </h2>
        <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700">
          Khám phá
        </a>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-primary-100" />
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {companies.map((c) => (
            <li key={c.id} className="flex items-center gap-3">
              <CompanyLogo company={c} size="h-12 w-12" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-heading">{c.name}</p>
                <p className="text-xs text-muted">
                  {c.openJobs} vị trí · {c.rating.toLocaleString("vi-VN")} ★
                </p>
              </div>
              <button
                type="button"
                aria-label={`Theo dõi ${c.name}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm transition hover:bg-primary-600 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
