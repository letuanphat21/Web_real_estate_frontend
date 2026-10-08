import { MOCK_CATEGORIES, MOCK_NEWS, MOCK_PROJECTS } from "../data/mockNews";
import type {
  News,
  NewsCategoryWithCount,
  NewsFilter,
  NewsSort,
  ProjectWithCount,
} from "../types/news.types";
import type { PageResponse } from "../types/event/event.types";

interface GetNewsParams {
  filter: NewsFilter;
  sort: NewsSort;
  page?: number;
  size?: number;
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const toTime = (iso: string): number => new Date(iso).getTime();

//Chỉ lấy bài đang hiển thị (active = true)
const activeNews = () => MOCK_NEWS.filter((n) => n.active);

async function getNews({
  filter,
  sort,
  page = 0,
  size = 9,
}: GetNewsParams): Promise<PageResponse<News>> {
  await delay(300);

  const keyword = filter.keyword.trim().toLowerCase();

  const list = activeNews()
    .filter((n) => {
      if (keyword && !`${n.title} ${n.content}`.toLowerCase().includes(keyword))
        return false;
      if (filter.categoryId !== null && n.category.id !== filter.categoryId)
        return false;
      if (filter.projectId !== null && n.project.id !== filter.projectId)
        return false;
      return true;
    })
    .sort((a, b) =>
      sort === "OLDEST"
        ? toTime(a.createdAt) - toTime(b.createdAt)
        : toTime(b.createdAt) - toTime(a.createdAt)
    );

  const totalElements = list.length;
  return {
    content: list.slice(page * size, page * size + size),
    totalElements,
    totalPages: Math.max(1, Math.ceil(totalElements / size)),
    number: page,
    size,
  };
}

// Chuyên mục (active) kèm số bài viết
async function getCategories(): Promise<NewsCategoryWithCount[]> {
  await delay(150);
  return MOCK_CATEGORIES.map((c) => ({
    ...c,
    newsCount: activeNews().filter((n) => n.category.id === c.id).length,
  }));
}

// Dự án có bài viết, kèm số bài
async function getProjects(): Promise<ProjectWithCount[]> {
  await delay(150);
  return MOCK_PROJECTS.map((p) => ({
    ...p,
    newsCount: activeNews().filter((n) => n.project.id === p.id).length,
  })).filter((p) => p.newsCount > 0);
}

async function getNewsById(id: number | string): Promise<News | null> {
  await delay(200);
  return activeNews().find((n) => n.id === Number(id)) ?? null;
}

async function getRelatedNews(news: News, limit = 3): Promise<News[]> {
  await delay(200);
  const others = activeNews()
    .filter((n) => n.id !== news.id)
    .sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt));
  const sameCategory = others.filter((n) => n.category.id === news.category.id);
  const sameProject = others.filter(
    (n) =>
      n.project.id === news.project.id && n.category.id !== news.category.id
  );
  return [...sameCategory, ...sameProject].slice(0, limit);
}

async function getLatestNews(excludeId: number, limit = 4): Promise<News[]> {
  await delay(150);
  return activeNews()
    .filter((n) => n.id !== excludeId)
    .sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt))
    .slice(0, limit);
}

const newsService = {
  getNews,
  getCategories,
  getProjects,
  getNewsById,
  getRelatedNews,
  getLatestNews,
};
export default newsService;
