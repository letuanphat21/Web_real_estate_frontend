import { useCallback, useEffect, useRef, useState } from "react";
import postService from "../../services/social/postService";
import { getErrorMessage } from "../../api/http";
import type { CreatePostRequest, PostResponse } from "../../types/social/social.types";

// Gộp trang mới vào danh sách, bỏ trùng id (bài vừa đăng làm lệch offset phân trang)
const mergeUnique = (prev: PostResponse[], next: PostResponse[]) => {
  const ids = new Set(prev.map((p) => p.id));
  return [...prev, ...next.filter((p) => !ids.has(p.id))];
};

export function usePosts(size = 10) {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  // Đã xong lần tải đầu (dù lỗi hay không): dùng để chỉ hiện skeleton cả trang 1 lần
  const [initialized, setInitialized] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const busy = useRef(false);

  useEffect(() => {
    let ignore = false;
    busy.current = true;
    setLoading(true);
    setError(null);

    postService
      .getPosts(0, size)
      .then((res) => {
        if (ignore) return;
        setPosts(res.content);
        setPage(0);
        setHasMore(res.number + 1 < res.totalPages);
      })
      .catch((err) => !ignore && setError(getErrorMessage(err)))
      .finally(() => {
        if (ignore) return;
        busy.current = false;
        setLoading(false);
        setInitialized(true);
      });

    return () => {
      ignore = true;
    };
  }, [size, reloadKey]);

  const loadMore = useCallback(async () => {
    if (busy.current || !hasMore) return;
    busy.current = true;
    setLoadingMore(true);
    try {
      const res = await postService.getPosts(page + 1, size);
      setPosts((prev) => mergeUnique(prev, res.content));
      setPage(res.number);
      setHasMore(res.number + 1 < res.totalPages);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      busy.current = false;
      setLoadingMore(false);
    }
  }, [hasMore, page, size]);

  // Lỗi được ném ra để bên gọi hiển thị (composer giữ nguyên nội dung/ảnh đang chọn)
  const createPost = useCallback(async (request: CreatePostRequest) => {
    const created = await postService.createPost(request);
    setPosts((prev) => [created, ...prev]);
    return created;
  }, []);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { posts, loading, initialized, loadingMore, error, hasMore, loadMore, createPost, refetch };
}
