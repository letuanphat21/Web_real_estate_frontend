import { useMemo, useState } from "react";
import { selectCurrentUser, useAppSelector } from "../../store";
import {
  toSocialUser,
  type PostResponse,
  type SocialPost,
  type SocialUser,
} from "../../types/social/social.types";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { usePosts } from "./usePosts";

const toSocialPost = (post: PostResponse): SocialPost => ({
  id: post.id,
  user: toSocialUser(post.author),
  content: post.content ?? "",
  imageUrls: post.imageUrls,
  videoUrl: post.videoUrl,
  createdAt: post.createdAt,
});

// Dữ liệu cho trang Cộng đồng: người đang đăng nhập, bảng tin (cuộn vô hạn), menu đang chọn
export function useSocialFeed() {
  const authUser = useAppSelector(selectCurrentUser);
  const feed = usePosts();
  const [activeMenu, setActiveMenu] = useState("feed");
  const sentinelRef = useInfiniteScroll(feed.loadMore, feed.hasMore);

  const currentUser = useMemo<SocialUser | null>(
    () =>
      authUser && {
        id: authUser.id,
        fullName: authUser.fullName,
        avatarUrl: authUser.avatarUrl,
      },
    [authUser],
  );

  const posts = useMemo(() => feed.posts.map(toSocialPost), [feed.posts]);

  return { ...feed, posts, currentUser, activeMenu, setActiveMenu, sentinelRef };
}
