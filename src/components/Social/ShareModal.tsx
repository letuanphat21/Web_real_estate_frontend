import { useEffect, useState } from "react";
import { Check, Link, Smile, X } from "lucide-react";
import { MOCK_SOCIAL_CURRENT_USER, MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

type Props = {
  post: (typeof MOCK_SOCIAL_POSTS)[number];
  currentUser: typeof MOCK_SOCIAL_CURRENT_USER;
  onClose: () => void;
};

const EMOJIS = ["😊", "😍", "👍", "🔥", "🎉", "😂", "🏠", "💰"];

export default function ShareModal({ post, currentUser, onClose }: Props) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const postLink = `${window.location.origin}/social?post=${post.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* trình duyệt chặn clipboard: bỏ qua */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative border-b border-gray-200 py-3 text-center">
          <h2 className="text-lg font-bold">Chia sẻ</h2>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1.5 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-4">
          <div className="mb-3 flex items-center gap-3">
            <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="h-10 w-10 rounded-full" />
            <p className="font-semibold">{currentUser.fullName}</p>
          </div>

          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hãy nói gì đó về nội dung này..."
            rows={4}
            className="w-full resize-none text-sm outline-none"
          />

          <div className="relative mb-3 flex justify-end">
            <button
              type="button"
              aria-label="Thêm emoji"
              onClick={() => setShowEmoji((v) => !v)}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <Smile size={22} />
            </button>
            {showEmoji && (
              <div className="absolute bottom-9 right-0 flex gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                {EMOJIS.map((e) => (
                  <button key={e} onClick={() => setText((t) => t + e)} className="rounded p-1 text-xl hover:bg-gray-100">
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
            <p className="font-semibold">{post.user.fullName}</p>
            <p className="line-clamp-2 text-gray-600">{post.content}</p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold hover:bg-gray-200"
            >
              {copied ? <Check size={18} className="text-green-600" /> : <Link size={18} />}
              {copied ? "Đã sao chép" : "Sao chép liên kết"}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Chia sẻ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
