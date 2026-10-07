import AdCard from "./AdCard";
import ProjectAdCard from "./ProjectAdCard";
import {
  MOCK_SOCIAL_ADS,
  MOCK_SOCIAL_CONTACTS,
  MOCK_SOCIAL_TRENDING,
} from "../../data/mockSocial";

export default function SocialRightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500">Được tài trợ</h3>
        {MOCK_SOCIAL_ADS.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-gray-500">Xu hướng</h3>
        <ul className="space-y-2">
          {MOCK_SOCIAL_TRENDING.map((t) => (
            <li key={t.id} className="text-sm">
              <p className="font-medium text-gray-800">{t.tag}</p>
              <p className="text-xs text-gray-500">{t.postCount.toLocaleString("vi-VN")} bài viết</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-gray-500">Người liên hệ</h3>
        <ul className="space-y-2">
          {MOCK_SOCIAL_CONTACTS.map((u) => (
            <li key={u.id} className="flex items-center gap-2 text-sm">
              <img src={u.avatarUrl} alt={u.fullName} className="h-8 w-8 rounded-full" />
              {u.fullName}
            </li>
          ))}
        </ul>
      </section>
      </div>

      {/* Cuộn tới đây mới dính (fixed) lại */}
      <div className="sticky top-22 mt-6">
        <ProjectAdCard />
      </div>
    </aside>
  );
}
