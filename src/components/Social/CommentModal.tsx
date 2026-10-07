import { useEffect, useState } from "react";
import { X } from "lucide-react";
import CommentSection from "./CommentSection";
import PostActions from "./PostActions";
import { MOCK_SOCIAL_CURRENT_USER, MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

type Props = {
  post: (typeof MOCK_SOCIAL_POSTS)[number];
  currentUser: typeof MOCK_SOCIAL_CURRENT_USER;
  liked: boolean;
  onToggleLike: () => void;
  onAddComment: (content: string) => void;
  onClose: () => void;
};

export default function CommentModal({
  post,
  currentUser,
  liked,
  onToggleLike,
  onAddComment,
  onClose,
}: Props) {
  const [text, setText] = useState("");

  // Khoá cuộn trang nền + đóng bằng phím Esc
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;
    onAddComment(value);
    setText("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative border-b border-gray-200 py-3 text-center">
          <h2 className="text-lg font-bold">Bài viết của {post.user.fullName}</h2>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1.5 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex items-center gap-3">
            <img src={post.user.avatarUrl} alt={post.user.fullName} className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-semibold">{post.user.fullName}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>

          <p className="mb-3 whitespace-pre-line text-sm text-gray-800">{post.content}</p>
          {post.imageUrls.length > 0 && (
            <div className="mb-3 space-y-2">
              {post.imageUrls.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full rounded-lg object-cover" />
              ))}
            </div>
          )}

          <div className="mb-4">
            <PostActions
              likeCount={post.likeCount}
              commentCount={post.comments.length}
              shareCount={post.shareCount}
              liked={liked}
              onToggleLike={onToggleLike}
            />
          </div>

          <CommentSection comments={post.comments} />
        </div>

        <footer className="flex gap-2 border-t border-gray-200 p-3">
          <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="h-8 w-8 rounded-full" />
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Viết bình luận..."
            className="flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm outline-none"
          />
        </footer>
      </div>
    </div>
  );
}
