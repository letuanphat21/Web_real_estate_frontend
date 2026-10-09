import CommentModal from "./CommentModal";
import PostActions from "./PostActions";
import PostImageGrid from "./PostImageGrid";
import ShareModal from "./ShareModal";
import PostContent from "./post/PostContent";
import PostHeader from "./post/PostHeader";
import PostVideo from "./post/PostVideo";
import { usePostCard } from "../../hooks/social/usePostCard";
import type { SocialPost, SocialUser } from "../../types/social/social.types";

type Props = {
  post: SocialPost;
  currentUser: SocialUser;
};

export default function PostCard({ post, currentUser }: Props) {
  const card = usePostCard(post.id);

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <PostHeader user={post.user} createdAt={post.createdAt} />
      <PostContent content={post.content} />
      <PostVideo src={post.videoUrl} />
      {post.imageUrls.length > 0 && (
        <div className="mb-3">
          <PostImageGrid images={post.imageUrls} onImageClick={card.openImage} />
        </div>
      )}

      <PostActions
        likeCount={card.likeCount}
        commentCount={card.thread.total}
        liked={card.liked}
        onToggleLike={card.toggleLike}
        onComment={card.openComments}
        onShare={card.openShare}
      />

      {card.commentsOpen && (
        <CommentModal
          post={post}
          startIndex={card.startIndex}
          currentUser={currentUser}
          liked={card.liked}
          likeCount={card.likeCount}
          onToggleLike={card.toggleLike}
          thread={card.thread}
          onClose={card.closeComments}
        />
      )}
      {card.shareOpen && <ShareModal post={post} currentUser={currentUser} onClose={card.closeShare} />}
    </article>
  );
}
