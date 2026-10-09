import { useEffect, useRef } from "react";

// Gắn ref vào 1 phần tử ở cuối danh sách: cuộn gần tới đó thì gọi onLoadMore
export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean, rootMargin = "400px") {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && onLoadMore(),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, enabled, rootMargin]);

  return sentinelRef;
}
