import { MOCK_ADMIN_PROJECTS } from "../data/mockAdminProjects";
import type { AdminProject, AdminProjectInput } from "../types/admin.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);
const clone = <T,>(v: T): T => structuredClone(v);

// TODO: thay bằng gọi API. Hiện lưu trong bộ nhớ nên giữ được khi chuyển trang, mất khi tải lại.
let db: AdminProject[] = clone(MOCK_ADMIN_PROJECTS);
let nextId = Math.max(...db.map((p) => p.id)) + 1;

async function list(): Promise<AdminProject[]> {
  await delay(250);
  return clone(db);
}

async function get(id: number): Promise<AdminProject> {
  await delay(250);
  const p = db.find((x) => x.id === id);
  if (!p) throw new Error("Không tìm thấy dự án");
  return clone(p);
}

async function create(input: AdminProjectInput): Promise<AdminProject> {
  await delay(300);
  const project: AdminProject = { ...clone(input), id: nextId++, createdAt: today() };
  db = [project, ...db];
  return clone(project);
}

async function update(id: number, input: AdminProjectInput): Promise<AdminProject> {
  await delay(300);
  const old = db.find((p) => p.id === id);
  if (!old) throw new Error("Không tìm thấy dự án");
  const next: AdminProject = { ...clone(input), id, createdAt: old.createdAt };
  db = db.map((p) => (p.id === id ? next : p));
  return clone(next);
}

async function remove(id: number): Promise<void> {
  await delay(200);
  db = db.filter((p) => p.id !== id);
}

export const adminProjectService = { list, get, create, update, remove };
