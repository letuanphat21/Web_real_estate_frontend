import AdCard from "../AdCard";
import { MOCK_SOCIAL_ADS } from "../../../data/mockSocial";

export default function SponsoredAds() {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500">Được tài trợ</h3>
      {MOCK_SOCIAL_ADS.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </section>
  );
}
