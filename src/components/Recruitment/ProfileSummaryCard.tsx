import type { UserProfileSummary } from "../../types/job.types";

export default function ProfileSummaryCard({ profile }: { profile: UserProfileSummary }) {
  return (
    <section
      className="rounded-3xl border border-line bg-white p-6 shadow-sm"
      aria-labelledby="profile-heading"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 id="profile-heading" className="text-lg font-medium text-heading">
          Hồ sơ của bạn
        </h2>
        <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700">
          Cập nhật
        </a>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={profile.avatarUrl}
          alt={`Ảnh đại diện ${profile.fullName}`}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-heading">{profile.fullName}</p>
          <p className="text-xs text-body">{profile.title}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-body">Mức hoàn thiện hồ sơ</span>
          <span className="font-semibold text-primary-600">{profile.completion}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={profile.completion}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Mức hoàn thiện hồ sơ"
          className="h-2 overflow-hidden rounded-full bg-primary-100"
        >
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${profile.completion}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <dd className={`text-2xl font-bold ${s.highlight ? "text-success" : "text-heading"}`}>{s.value}</dd>
            <dt className="text-[11px] text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
