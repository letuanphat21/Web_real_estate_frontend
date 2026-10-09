import BaseService from "../base/BaseService";
import { toPage } from "../../api/http";
import type { PageResponse } from "../../types/event/event.types";
import type { News } from "../../types/news.types";

export interface NewsInput {
  title: string;
  content: string;
  categoryId: number;
  projectId: number | null;
  active: boolean;
}

// API quản trị tin tức (cần đăng nhập)
class AdminNewsService extends BaseService {
  constructor() {
    super("/news");
  }

  async search(keyword: string, page: number, size: number): Promise<PageResponse<News>> {
    const res = await this.getPage<News>({ keyword: keyword.trim(), page, size, sort: "createdAt,desc" });
    const p = toPage(res);
    return { ...p, content: p.content.map((n) => ({ ...n, images: n.images ?? [] })) };
  }

  get(id: number) {
    return this.getById<News>(id);
  }

  add(input: NewsInput) {
    return this.create<News, NewsInput>(input);
  }

  edit(id: number, input: NewsInput) {
    return this.update<News, NewsInput>(id, input);
  }

  remove(id: number) {
    return this.delete(id);
  }
}

export const adminNewsService = new AdminNewsService();
