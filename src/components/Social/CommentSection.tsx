import { useState } from "react";
import { MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

type Props = {
  comments: (typeof MOCK_SOCIAL_POSTS)[number]["comments"];
  onReply?: (fullName: string) => void;
};

// "vừa xong", "5 phút", "17 giờ", "3 ngày"...
function timeAgo(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Vừa xong";
  if (min < 60) return `${min} phút`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} giờ`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} ngày`;
  return new Date(iso).toLocaleDateString("vi-VN");
}

export default function CommentSection({ comments, onReply }: Props) {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const toggleLike = (id: number) =>
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  if (comments.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2">
          <img src={c.user.avatarUrl} alt={c.user.fullName} className="h-8 w-8 rounded-full" />
          <div>
            <div className="rounded-2xl bg-gray-100 px-3 py-2">
              <p className="text-sm font-semibold">{c.user.fullName}</p>
              <p className="text-sm text-gray-800">{c.content}</p>
            </div>
            <div className="mt-0.5 flex items-center gap-3 px-3 text-xs text-gray-500">
              <span title={new Date(c.createdAt).toLocaleString("vi-VN")}>{timeAgo(c.createdAt)}</span>
              <button
                onClick={() => toggleLike(c.id)}
                className={`font-semibold hover:underline ${likedIds.includes(c.id) ? "text-blue-600" : ""}`}
              >
                Thích
              </button>
              <button onClick={() => onReply?.(c.user.fullName)} className="font-semibold hover:underline">
                Trả lời
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
