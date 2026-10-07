import { useState } from "react";
import SocialLeftSidebar from "../../components/Social/SocialLeftSidebar";
import SocialRightSidebar from "../../components/Social/SocialRightSidebar";
import PostComposer from "../../components/Social/PostComposer";
import PostCard from "../../components/Social/PostCard";
import { MOCK_SOCIAL_CURRENT_USER, MOCK_SOCIAL_POSTS } from "../../data/mockSocial";

export default function SocialPage() {
  const [posts, setPosts] = useState(MOCK_SOCIAL_POSTS);
  const [activeMenu, setActiveMenu] = useState("feed");

  // TODO: lấy từ authStore khi có đăng nhập
  const currentUser = MOCK_SOCIAL_CURRENT_USER;

  const handleCreatePost = (content: string) => {
    setPosts((prev) => [
      {
        id: Date.now(),
        user: currentUser,
        content,
        imageUrls: [] as string[],
        likeCount: 0,
        shareCount: 0,
        createdAt: new Date().toISOString(),
        comments: [],
      },
      ...prev,
    ]);
  };

  const handleAddComment = (postId: number, content: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), user: currentUser, content, createdAt: new Date().toISOString() },
              ],
            }
          : p,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_300px]">
        <SocialLeftSidebar user={currentUser} activeId={activeMenu} onSelect={setActiveMenu} />

        <main className="mx-auto w-full max-w-2xl space-y-4">
          <PostComposer user={currentUser} onSubmit={handleCreatePost} />
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onAddComment={handleAddComment}
            />
          ))}
        </main>

        <SocialRightSidebar />
      </div>
    </div>
  );
}
