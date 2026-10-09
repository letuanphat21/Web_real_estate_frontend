import { useCallback, useState } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";

// Modal chia sẻ: lời nhắn kèm theo + sao chép link bài viết
export function useSharePost(postId: number) {
  const [text, setText] = useState("");
  const { copied, copy } = useCopyToClipboard();
  const postLink = `${window.location.origin}/social?post=${postId}`;

  const insertEmoji = useCallback((emoji: string) => setText((t) => t + emoji), []);
  const copyLink = useCallback(() => copy(postLink), [copy, postLink]);

  return { text, setText, insertEmoji, copied, copyLink };
}
