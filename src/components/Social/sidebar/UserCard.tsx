import Avatar from "../../common/Avatar";
import type { SocialUser } from "../../../types/social/social.types";

export default function UserCard({ user }: { user: SocialUser }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <Avatar src={user.avatarUrl} fullName={user.fullName} className="h-10 w-10" />
      <span className="font-semibold">{user.fullName}</span>
    </div>
  );
}
