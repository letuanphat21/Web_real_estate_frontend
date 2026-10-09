import { MOCK_SOCIAL_PROJECT_AD } from "../../data/mockSocial";

export default function ProjectAdCard() {
  const ad = MOCK_SOCIAL_PROJECT_AD;

  return (
    <a
      href={ad.link}
      className="block overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
    >
      <img src={ad.imageUrl} alt={ad.name} className="h-72 w-full object-cover" />
      <div className="space-y-2 p-4">
        <span className="text-xs font-semibold uppercase text-gray-400">Được tài trợ</span>
        <p className="text-lg font-bold text-gray-900">{ad.name}</p>
        <p className="text-sm text-gray-600">{ad.tagline}</p>
        <p className="text-sm font-semibold text-primary-600">{ad.priceFrom}</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          {ad.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <span className="mt-2 block rounded-lg bg-primary-600 py-2 text-center text-sm font-medium text-white">
          Xem dự án
        </span>
      </div>
    </a>
  );
}
