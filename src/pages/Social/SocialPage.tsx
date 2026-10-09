import Breadcrumb from "../../components/common/Breadcrumb";
import PostComposer from "../../components/Social/PostComposer";
import SocialLeftSidebar from "../../components/Social/SocialLeftSidebar";
import SocialRightSidebar from "../../components/Social/SocialRightSidebar";
import PostFeed from "../../components/Social/feed/PostFeed";
import SocialPageSkeleton from "../../components/Social/skeleton/SocialPageSkeleton";
import { SOCIAL_GRID } from "../../components/Social/socialLayout";
import { useSocialFeed } from "../../hooks/social/useSocialFeed";

export default function SocialPage() {
  const feed = useSocialFeed();
  const { currentUser } = feed;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Cộng đồng" }]} />
      </div>

      {/* Chờ GET /users/me + trang bài viết đầu tiên thì hiện khung 3 cột */}
      {!currentUser || !feed.initialized ? (
        <SocialPageSkeleton />
      ) : (
        <div className={SOCIAL_GRID}>
          <SocialLeftSidebar user={currentUser} activeId={feed.activeMenu} onSelect={feed.setActiveMenu} />

          <main className="mx-auto w-full max-w-2xl space-y-4">
            <PostComposer user={currentUser} onSubmit={feed.createPost} />
            <PostFeed
              posts={feed.posts}
              currentUser={currentUser}
              loading={feed.loading}
              loadingMore={feed.loadingMore}
              error={feed.error}
              onRetry={feed.refetch}
              sentinelRef={feed.sentinelRef}
            />
          </main>

          <SocialRightSidebar />
        </div>
      )}
    </div>
  );
}
