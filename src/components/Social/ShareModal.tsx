import { createPortal } from "react-dom";
import { Check, Link, Smile, X } from "lucide-react";
import Avatar from "../common/Avatar";
import EmojiPickerButton from "../common/EmojiPickerButton";
import { useModalBehavior } from "../../hooks/social/useModalBehavior";
import { useSharePost } from "../../hooks/social/useSharePost";
import type { SocialPost, SocialUser } from "../../types/social/social.types";

type Props = {
  post: SocialPost;
  currentUser: SocialUser;
  onClose: () => void;
};

export default function ShareModal({ post, currentUser, onClose }: Props) {
  const share = useSharePost(post.id);
  useModalBehavior(onClose, false);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
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
            <Avatar src={currentUser.avatarUrl} fullName={currentUser.fullName} className="h-10 w-10" />
            <p className="font-semibold">{currentUser.fullName}</p>
          </div>

          <textarea
            autoFocus
            value={share.text}
            onChange={(e) => share.setText(e.target.value)}
            placeholder="Hãy nói gì đó về nội dung này..."
            rows={4}
            className="w-full resize-none text-sm outline-none"
          />

          <div className="mb-3 flex justify-end">
            <EmojiPickerButton
              placement="top"
              align="right"
              onSelect={share.insertEmoji}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <Smile size={22} />
            </EmojiPickerButton>
          </div>

          <div className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
            <p className="font-semibold">{post.user.fullName}</p>
            <p className="line-clamp-2 text-gray-600">{post.content}</p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={share.copyLink}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold hover:bg-gray-200"
            >
              {share.copied ? <Check size={18} className="text-green-600" /> : <Link size={18} />}
              {share.copied ? "Đã sao chép" : "Sao chép liên kết"}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Chia sẻ ngay
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
