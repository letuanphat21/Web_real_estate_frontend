import ProjectAdCard from "./ProjectAdCard";
import ContactList from "./sidebar/ContactList";
import SponsoredAds from "./sidebar/SponsoredAds";
import TrendingList from "./sidebar/TrendingList";

export default function SocialRightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="space-y-6">
        <SponsoredAds />
        {/* <TrendingList /> */}
        {/* <ContactList /> */}
      </div>

      {/* Cuộn tới đây mới dính (fixed) lại */}
      <div className="sticky top-22 mt-6">
        <ProjectAdCard />
      </div>
    </aside>
  );
}
