import { MOCK_PROJECT_IMAGES } from "../data/mockProjectImages";
import type { PendingImage, ProjectImage } from "../types/projectImage.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clone = <T,>(v: T): T => structuredClone(v);

// TODO: thay bằng gọi API (tải file lên rồi lưu image_url). Hiện lưu trong bộ nhớ nên giữ được khi chuyển trang, mất khi tải lại.
let db: ProjectImage[] = clone(MOCK_PROJECT_IMAGES);
let nextId = Math.max(...db.map((x) => x.id)) + 1;

async function list(projectId: number): Promise<ProjectImage[]> {
  await delay(300);
  return clone(db.filter((x) => x.projectId === projectId));
}

// Số ảnh của từng dự án (hiển thị trong bộ chọn)
async function counts(): Promise<Record<number, number>> {
  const out: Record<number, number> = {};
  db.forEach((x) => (out[x.projectId] = (out[x.projectId] ?? 0) + 1));
  return out;
}

async function add(projectId: number, files: PendingImage[]): Promise<ProjectImage[]> {
  await delay(400);
  const now = new Date().toISOString();
  const created = files.map((f): ProjectImage => ({ id: nextId++, projectId, imageUrl: f.imageUrl, createdAt: now }));
  db = [...created, ...db];
  return clone(created);
}

async function remove(id: number): Promise<void> {
  await delay(200);
  db = db.filter((x) => x.id !== id);
}

export const projectImageService = { list, counts, add, remove };
