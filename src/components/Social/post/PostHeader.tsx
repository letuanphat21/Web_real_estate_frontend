import Avatar from "../../common/Avatar";
import type { SocialUser } from "../../../types/social/social.types";

type Props = {
  user: SocialUser;
  createdAt: string;
};

export default function PostHeader({ user, createdAt }: Props) {
  return (
    <header className="mb-3 flex items-center gap-3">
      <Avatar src={user.avatarUrl} fullName={user.fullName} className="h-10 w-10" />
      <div>
        <p className="font-semibold">{user.fullName}</p>
        <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString("vi-VN")}</p>
      </div>
    </header>
  );
}
