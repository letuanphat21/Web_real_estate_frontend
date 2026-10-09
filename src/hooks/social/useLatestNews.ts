import { useEffect, useState } from "react";
import newsService from "../../services/news/newsService"
import type { News } from "../../types/news.types";

// Tin mới nhất cho sidebar trang Cộng đồng
export function useLatestNews(limit = 5) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    newsService
      .getLatestNews(0, limit)
      .then((res) => !ignore && setNews(res))
      .catch(() => {
        /* lỗi tải tin: sidebar để trống, không chặn bảng tin */
      })
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [limit]);

  return { news, loading };
}
