import { useCallback, useState } from "react";
import { usePostComments } from "./usePostComments";
import { usePostReaction } from "./usePostReaction";

// Mọi state của 1 bài trên bảng tin: thích, bình luận, mở modal bình luận / chia sẻ
export function usePostCard(postId: number) {
  const reaction = usePostReaction(postId);
  const thread = usePostComments(postId);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openComments = useCallback(() => {
    setStartIndex(0);
    setCommentsOpen(true);
  }, []);

  // Bấm vào 1 ảnh: mở modal và xem đúng ảnh đó
  const openImage = useCallback((index: number) => {
    setStartIndex(index);
    setCommentsOpen(true);
  }, []);

  const closeComments = useCallback(() => setCommentsOpen(false), []);
  const openShare = useCallback(() => setShareOpen(true), []);
  const closeShare = useCallback(() => setShareOpen(false), []);

  return {
    ...reaction,
    thread,
    commentsOpen,
    startIndex,
    openComments,
    openImage,
    closeComments,
    shareOpen,
    openShare,
    closeShare,
  };
}
