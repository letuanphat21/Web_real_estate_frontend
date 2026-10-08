import type { JobDetailOwner } from "../../types/jobDetail.types";

export default function JobOwnerCard({ owner }: { owner: JobDetailOwner }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm" aria-labelledby="owner-title">
      <h2 id="owner-title" className="text-lg font-medium text-heading">
        Người phụ trách
      </h2>
      <div className="mt-4 flex items-center gap-3">
        {owner.avatarUrl ? (
          <img src={owner.avatarUrl} alt={`Ảnh đại diện ${owner.name}`} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700"
          >
            {owner.initials}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-heading">{owner.name}</p>
          <p className="text-xs text-body">Người phụ trách đăng tin</p>
        </div>
      </div>
    </section>
  );
}
