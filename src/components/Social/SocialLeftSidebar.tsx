import FollowSuggestions from "./FollowSuggestions";
import NewsList from "./NewsList";
import SocialMenu from "./SocialMenu";
import { MOCK_SOCIAL_CURRENT_USER } from "../../data/mockSocial";

type Props = {
  user: typeof MOCK_SOCIAL_CURRENT_USER;
  activeId: string;
  onSelect: (id: string) => void;
};

export default function SocialLeftSidebar({ user, activeId, onSelect }: Props) {
  return (
    <aside className="hidden lg:block">
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
          <img src={user.avatarUrl} alt={user.fullName} className="h-10 w-10 rounded-full" />
          <span className="font-semibold">{user.fullName}</span>
        </div>
        <SocialMenu activeId={activeId} onSelect={onSelect} />
        <FollowSuggestions />
        <NewsList />
      </div>

      {/* Cuộn tới đây mới dính (fixed) lại */}
      <div className="sticky top-22 mt-6">
        <SocialMenu activeId={activeId} onSelect={onSelect} />
      </div>
    </aside>
  );
}
