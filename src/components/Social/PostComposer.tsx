import { useEffect, useRef, useState } from "react";
import { Image, MapPin, Smile, Video } from "lucide-react";
import { MOCK_SOCIAL_CURRENT_USER } from "../../data/mockSocial";

const ACTIONS = [
  { label: "Ảnh", icon: Image, color: "text-green-500" },
  { label: "Video", icon: Video, color: "text-red-500" },
  { label: "Cảm xúc", icon: Smile, color: "text-yellow-500" },
];

type Props = {
  user: typeof MOCK_SOCIAL_CURRENT_USER;
  onSubmit: (content: string) => void;
};

export default function PostComposer({ user, onSubmit }: Props) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Tự giãn chiều cao theo nội dung, tới max-h thì mới hiện thanh cuộn
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handleSubmit = () => {
    const text = content.trim();
    if (!text) return;
    onSubmit(text);
    setContent("");
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <img src={user.avatarUrl} alt={user.fullName} className="h-10 w-10 rounded-full" />
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${user.fullName} ơi, bạn đang nghĩ gì?`}
          rows={2}
          className="max-h-60 flex-1 resize-none overflow-y-auto rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none"
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1">
          {ACTIONS.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              title={label}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Icon size={20} className={color} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40"
        >
          Đăng
        </button>
      </div>
    </div>
  );
}
