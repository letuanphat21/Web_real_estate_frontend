import { MOCK_PROPERTIES } from "../data/mockProperties";
import { adminProjectService } from "./adminProjectService";
import type { Property, PropertyCatalog, PropertyInput, PropertyStatus } from "../types/property.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clone = <T,>(v: T): T => structuredClone(v);

// TODO: thay bằng gọi API. Hiện lưu trong bộ nhớ nên giữ được khi chuyển trang, mất khi tải lại.
let db: Property[] = clone(MOCK_PROPERTIES);
let nextId = Math.max(...db.map((x) => x.id)) + 1;

// Dự án + phân khu lấy từ dịch vụ dự án để luôn khớp với trang Quản lý dự án (zoneId = projectId*100 + zone.id)
async function catalog(): Promise<PropertyCatalog> {
  const projects = await adminProjectService.list();
  return {
    projects: projects.map((p) => ({ id: p.id, name: p.name })),
    zones: projects.flatMap((p) => p.zones.map((z) => ({ id: p.id * 100 + z.id, projectId: p.id, name: z.name }))),
  };
}

async function list(): Promise<Property[]> {
  await delay(250);
  return clone(db);
}

// Mã căn không được trùng trong cùng dự án
async function codeTaken(code: string, zoneId: number, exceptId?: number): Promise<boolean> {
  const projectOf = (zid: number) => Math.floor(zid / 100);
  return db.some(
    (x) => x.id !== exceptId && projectOf(x.zoneId) === projectOf(zoneId) && x.propertyCode.toLowerCase() === code.toLowerCase(),
  );
}

async function create(input: PropertyInput): Promise<Property> {
  await delay(300);
  if (await codeTaken(input.propertyCode, input.zoneId)) throw new Error("Mã căn đã tồn tại trong dự án này");
  const item: Property = { ...clone(input), id: nextId++, images: [] };
  db = [item, ...db];
  return clone(item);
}

async function update(id: number, input: PropertyInput): Promise<Property> {
  await delay(300);
  if (await codeTaken(input.propertyCode, input.zoneId, id)) throw new Error("Mã căn đã tồn tại trong dự án này");
  const old = db.find((x) => x.id === id);
  if (!old) throw new Error("Không tìm thấy căn");
  const next: Property = { ...clone(input), id, images: old.images };
  db = db.map((x) => (x.id === id ? next : x));
  return clone(next);
}

async function setStatus(id: number, status: PropertyStatus): Promise<void> {
  await delay(150);
  db = db.map((x) => (x.id === id ? { ...x, status } : x));
}

async function remove(id: number): Promise<void> {
  await delay(200);
  db = db.filter((x) => x.id !== id);
}

export const propertyService = { catalog, list, create, update, setStatus, remove };
