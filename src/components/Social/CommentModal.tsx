import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, SendHorizontal, Smile, X } from "lucide-react";
import CommentSection from "./CommentSection";
import PostActions from "./PostActions";
import { MOCK_SOCIAL_CURRENT_USER, MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

type Props = {
  post: (typeof MOCK_SOCIAL_POSTS)[number];
  startIndex?: number;
  currentUser: typeof MOCK_SOCIAL_CURRENT_USER;
  liked: boolean;
  onToggleLike: () => void;
  onAddComment: (content: string) => void;
  onClose: () => void;
};

export default function CommentModal({
  post,
  startIndex = 0,
  currentUser,
  liked,
  onToggleLike,
  onAddComment,
  onClose,
}: Props) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(startIndex);
  const images = post.imageUrls;
  const hasImages = images.length > 0;
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

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

  const closeBtn = (
    <button
      onClick={onClose}
      aria-label="Đóng"
      className="rounded-full bg-gray-100 p-1.5 hover:bg-gray-200"
    >
      <X size={20} />
    </button>
  );

  // Phần bên phải (hoặc cả modal nếu bài không có ảnh): nội dung + bình luận
  const panel = (
    <>
      <header className="relative border-b border-gray-200 py-3 text-center">
        <h2 className="text-lg font-bold">Bài viết của {post.user.fullName}</h2>
        {!hasImages && <div className="absolute right-3 top-1/2 -translate-y-1/2">{closeBtn}</div>}
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

        <div className="mb-4">
          <PostActions
            likeCount={post.likeCount}
            commentCount={post.comments.length}
            shareCount={post.shareCount}
            liked={liked}
            onToggleLike={onToggleLike}
          />
        </div>

        <CommentSection comments={post.comments} onReply={(name) => { setText(`@${name} `); inputRef.current?.focus(); }} />
      </div>

      <footer className="border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="h-9 w-9 rounded-full" />
          <div className="flex flex-1 items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5">
            <input
              ref={inputRef}
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Viết bình luận..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button type="button" aria-label="Thêm ảnh" className="rounded-full p-1 text-gray-500 hover:bg-gray-200">
              <ImagePlus size={20} />
            </button>
            <button
              type="button"
              aria-label="Thêm emoji"
              onClick={() => { setText((t) => t + "😊"); inputRef.current?.focus(); }}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-200"
            >
              <Smile size={20} />
            </button>
          </div>
          <button
            type="button"
            aria-label="Gửi"
            onClick={handleAdd}
            disabled={!text.trim()}
            className="rounded-full bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:bg-blue-200"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </footer>
    </>
  );

  // Không có ảnh: modal nhỏ ở giữa như cũ
  if (!hasImages) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {panel}
        </div>
      </div>
    );
  }

  // Có ảnh: toàn màn hình, ảnh bên trái, nội dung + bình luận bên phải
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black md:flex-row">
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute left-4 top-4 z-10 rounded-full p-2 text-white hover:bg-white/20"
        >
          <X size={28} />
        </button>
        <img src={images[index]} alt="" className="max-h-full max-w-full object-contain" />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Ảnh trước"
              className="absolute left-4 rounded-full p-2 text-white hover:bg-white/20"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={next}
              aria-label="Ảnh sau"
              className="absolute right-4 rounded-full p-2 text-white hover:bg-white/20"
            >
              <ChevronRight size={32} />
            </button>
            <span className="absolute bottom-4 rounded-full bg-black/60 px-4 py-1 text-sm font-semibold text-white">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      <aside className="flex h-[50vh] w-full flex-col bg-white md:h-full md:w-[28rem]">{panel}</aside>
    </div>
  );
}
