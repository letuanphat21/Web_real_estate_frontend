import { useState } from "react";
import CommentModal from "./CommentModal";
import PostActions from "./PostActions";
import PostImageGrid from "./PostImageGrid";
import { MOCK_SOCIAL_CURRENT_USER, MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

// Bài dài hơn số ký tự này thì cắt bớt và hiện nút "Xem thêm"
const MAX_PREVIEW_CHARS = 200;

type Props = {
  post: (typeof MOCK_SOCIAL_POSTS)[number];
  currentUser: typeof MOCK_SOCIAL_CURRENT_USER;
  onAddComment: (postId: number, content: string) => void;
};

export default function PostCard({ post, currentUser, onAddComment }: Props) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isLong = post.content.length > MAX_PREVIEW_CHARS;

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center gap-3">
        <img src={post.user.avatarUrl} alt={post.user.fullName} className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-semibold">{post.user.fullName}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
      </header>

      <p className="mb-3 whitespace-pre-line text-sm text-gray-800">
        {isLong && !expanded ? `${post.content.slice(0, MAX_PREVIEW_CHARS).trimEnd()}... ` : post.content}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="font-semibold text-gray-500 hover:underline"
          >
            Xem thêm
          </button>
        )}
      </p>
      {post.imageUrls.length > 0 && (
        <div className="mb-3">
          <PostImageGrid images={post.imageUrls} />
        </div>
      )}

      <PostActions
        likeCount={post.likeCount}
        commentCount={post.comments.length}
        shareCount={post.shareCount}
        liked={liked}
        onToggleLike={() => setLiked((v) => !v)}
        onComment={() => setShowComments(true)}
      />

      {showComments && (
        <CommentModal
          post={post}
          currentUser={currentUser}
          liked={liked}
          onToggleLike={() => setLiked((v) => !v)}
          onAddComment={(content) => onAddComment(post.id, content)}
          onClose={() => setShowComments(false)}
        />
      )}
    </article>
  );
}
