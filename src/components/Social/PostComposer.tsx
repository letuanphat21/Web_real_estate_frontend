import Avatar from "../common/Avatar";
import ErrorAlert from "../common/ErrorAlert";
import ComposerImagePreviews from "./composer/ComposerImagePreviews";
import ComposerToolbar from "./composer/ComposerToolbar";
import ComposerVideoPreview from "./composer/ComposerVideoPreview";
import { usePostComposer } from "../../hooks/social/usePostComposer";
import {
  POST_MAX_CONTENT_LENGTH,
  POST_VIDEO_TYPES,
  type CreatePostRequest,
  type SocialUser,
} from "../../types/social/social.types";

type Props = {
  user: SocialUser;
  onSubmit: (request: CreatePostRequest) => Promise<unknown>;
};

export default function PostComposer({ user, onSubmit }: Props) {
  const c = usePostComposer(onSubmit);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <Avatar src={user.avatarUrl} fullName={user.fullName} className="h-10 w-10 shrink-0" />
        <textarea
          ref={c.textareaRef}
          value={c.content}
          onChange={(e) => c.setContent(e.target.value)}
          maxLength={POST_MAX_CONTENT_LENGTH}
          disabled={c.submitting}
          placeholder={`${user.fullName} ơi, bạn đang nghĩ gì?`}
          rows={2}
          className="max-h-60 flex-1 resize-none overflow-y-auto rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none"
        />
      </div>

      <ComposerImagePreviews urls={c.imagePreviews} disabled={c.submitting} onRemove={c.removeImage} />
      <ComposerVideoPreview
        file={c.video}
        url={c.videoPreview}
        unplayable={c.videoUnplayable}
        disabled={c.submitting}
        onUnplayable={c.markVideoUnplayable}
        onRemove={c.removeVideo}
      />
      <ErrorAlert message={c.error} onClose={c.clearError} className="mt-3" />

      <input ref={c.imageInputRef} type="file" accept="image/*" multiple hidden onChange={c.pickImages} />
      <input
        ref={c.videoInputRef}
        type="file"
        accept={POST_VIDEO_TYPES.join(",")}
        hidden
        onChange={c.pickVideo}
      />

      <ComposerToolbar
        imageCount={c.images.length}
        submitting={c.submitting}
        canSubmit={c.canSubmit}
        onPickImages={c.openImagePicker}
        onPickVideo={c.openVideoPicker}
        onEmoji={c.insertEmoji}
        onSubmit={c.submit}
      />
    </div>
  );
}
