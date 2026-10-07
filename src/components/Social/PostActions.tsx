import { Forward, MessageCircle, ThumbsUp } from "lucide-react";

type Props = {
  likeCount: number;
  commentCount: number;
  shareCount: number;
  liked: boolean;
  onToggleLike: () => void;
  onComment?: () => void;
  onShare?: () => void;
};

export default function PostActions({
  likeCount,
  commentCount,
  shareCount,
  liked,
  onToggleLike,
  onComment,
  onShare,
}: Props) {
  const item = "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100";

  return (
    <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-gray-600">
      <button onClick={onToggleLike} className={`${item} ${liked ? "text-blue-600" : ""}`}>
        <ThumbsUp size={22} className={liked ? "fill-blue-600" : ""} />
        <span>{likeCount + (liked ? 1 : 0)}</span>
      </button>
      <button onClick={onComment} className={item}>
        <MessageCircle size={22} />
        <span>{commentCount}</span>
      </button>
      <button onClick={onShare} className={item}>
        <Forward size={22} />
        <span>{shareCount}</span>
      </button>
    </div>
  );
}
