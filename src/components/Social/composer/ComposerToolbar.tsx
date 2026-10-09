import { Image, Loader2, Smile, Video } from "lucide-react";
import EmojiPickerButton from "../../common/EmojiPickerButton";
import { POST_MAX_IMAGES } from "../../../types/social/social.types";

const toolButton =
  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40";

type Props = {
  imageCount: number;
  submitting: boolean;
  canSubmit: boolean;
  onPickImages: () => void;
  onPickVideo: () => void;
  onEmoji: (emoji: string) => void;
  onSubmit: () => void;
};

export default function ComposerToolbar({
  imageCount,
  submitting,
  canSubmit,
  onPickImages,
  onPickVideo,
  onEmoji,
  onSubmit,
}: Props) {
  return (
    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="Ảnh"
          onClick={onPickImages}
          disabled={submitting || imageCount >= POST_MAX_IMAGES}
          className={toolButton}
        >
          <Image size={20} className="text-green-500" />
          <span className="hidden sm:inline">
            Ảnh{imageCount > 0 && ` (${imageCount}/${POST_MAX_IMAGES})`}
          </span>
        </button>
        <button
          type="button"
          title="Video (tối đa 20MB)"
          onClick={onPickVideo}
          disabled={submitting}
          className={toolButton}
        >
          <Video size={20} className="text-red-500" />
          <span className="hidden sm:inline">Video</span>
        </button>
        <EmojiPickerButton title="Cảm xúc" disabled={submitting} onSelect={onEmoji} className={toolButton}>
          <Smile size={20} className="text-yellow-500" />
          <span className="hidden sm:inline">Cảm xúc</span>
        </EmojiPickerButton>
      </div>
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {submitting ? "Đang đăng..." : "Đăng"}
      </button>
    </div>
  );
}
