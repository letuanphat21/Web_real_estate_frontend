import { MOCK_SOCIAL_NEWS } from "../../data/mockSocial";

export default function NewsList() {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">Tin tức</h3>
      <ul className="space-y-3">
        {MOCK_SOCIAL_NEWS.map((n) => (
          <li key={n.id}>
            <p className="text-sm font-medium text-gray-800 hover:text-blue-600">{n.title}</p>
            <p className="text-xs text-gray-500">{n.time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
