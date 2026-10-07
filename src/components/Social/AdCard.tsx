import { MOCK_SOCIAL_ADS } from "../../data/mockSocial";

type Props = { ad: (typeof MOCK_SOCIAL_ADS)[number] };

export default function AdCard({ ad }: Props) {
  return (
    <a
      href={ad.link}
      className="block overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
    >
      <img src={ad.imageUrl} alt={ad.title} className="h-32 w-full object-cover" />
      <div className="p-3">
        <p className="font-semibold text-gray-800">{ad.title}</p>
        <p className="text-xs text-gray-500">{ad.description}</p>
      </div>
    </a>
  );
}
