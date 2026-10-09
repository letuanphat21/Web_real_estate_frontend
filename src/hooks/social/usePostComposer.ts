import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { getErrorMessage } from "../../api/http";
import { formatFileSize, insertAtCursor } from "../../utils/text";
import {
  POST_MAX_CONTENT_LENGTH,
  POST_MAX_IMAGES,
  POST_MAX_VIDEO_SIZE,
  POST_VIDEO_TYPES,
  type CreatePostRequest,
} from "../../types/social/social.types";
import { useAutoResizeTextarea } from "./useAutoResizeTextarea";
import { useObjectUrl, useObjectUrls } from "./useObjectUrls";

// Toàn bộ state/logic của ô đăng bài: nội dung, ảnh, video, lỗi, gửi
export function usePostComposer(onSubmit: (request: CreatePostRequest) => Promise<unknown>) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoUnplayable, setVideoUnplayable] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const imagePreviews = useObjectUrls(images);
  const videoPreview = useObjectUrl(video);
  useAutoResizeTextarea(textareaRef, content);

  const openImagePicker = useCallback(() => imageInputRef.current?.click(), []);
  const openVideoPicker = useCallback(() => videoInputRef.current?.click(), []);

  const pickImages = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    e.target.value = "";
    if (!picked.length) return;
    const next = [...images, ...picked];
    setError(next.length > POST_MAX_IMAGES ? `Mỗi bài viết tối đa ${POST_MAX_IMAGES} ảnh` : null);
    setImages(next.slice(0, POST_MAX_IMAGES));
  };

  const removeImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

  // Kiểm tra trước ở FE để khỏi upload 20MB rồi mới bị BE từ chối
  const pickVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!POST_VIDEO_TYPES.includes(file.type)) {
      setError(`"${file.name}" không hợp lệ. Video chỉ hỗ trợ định dạng MP4, WEBM hoặc MOV`);
      return;
    }
    if (file.size > POST_MAX_VIDEO_SIZE) {
      setError(
        `"${file.name}" nặng ${formatFileSize(file.size)}, vượt quá giới hạn ${formatFileSize(POST_MAX_VIDEO_SIZE)}`,
      );
      return;
    }
    setError(null);
    setVideoUnplayable(false);
    setVideo(file);
  };

  const removeVideo = () => setVideo(null);

  const insertEmoji = (emoji: string) =>
    setContent((c) => insertAtCursor(textareaRef.current, c, emoji, POST_MAX_CONTENT_LENGTH));

  const canSubmit = (content.trim().length > 0 || images.length > 0 || video !== null) && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ content, images, video });
      setContent("");
      setImages([]);
      setVideo(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    content,
    setContent,
    textareaRef,
    images,
    imagePreviews,
    imageInputRef,
    openImagePicker,
    pickImages,
    removeImage,
    video,
    videoPreview,
    videoUnplayable,
    markVideoUnplayable: () => setVideoUnplayable(true),
    videoInputRef,
    openVideoPicker,
    pickVideo,
    removeVideo,
    insertEmoji,
    error,
    clearError: () => setError(null),
    submitting,
    canSubmit,
    submit,
  };
}
