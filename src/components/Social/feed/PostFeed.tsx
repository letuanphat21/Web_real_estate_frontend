import type { RefObject } from "react";
import PostCard from "../PostCard";
import PostCardSkeleton from "../skeleton/PostCardSkeleton";
import type { SocialPost, SocialUser } from "../../../types/social/social.types";

type Props = {
  posts: SocialPost[];
  currentUser: SocialUser;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  onRetry: () => void;
  sentinelRef: RefObject<HTMLDivElement | null>;
};

// Bảng tin: đang tải / lỗi + thử lại / trống / danh sách bài + tải thêm khi cuộn
export default function PostFeed({ posts, currentUser, loading, loadingMore, error, onRetry, sentinelRef }: Props) {
  return (
    <>
      {loading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton withMedia={false} />
        </>
      ) : error && posts.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-danger">{error}</p>
          <button
            onClick={onRetry}
            className="mt-3 rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
          >
            Thử lại
          </button>
        </div>
      ) : posts.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
          Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} currentUser={currentUser} />)
      )}

      <div ref={sentinelRef} />
      {loadingMore && <PostCardSkeleton />}
    </>
  );
}
