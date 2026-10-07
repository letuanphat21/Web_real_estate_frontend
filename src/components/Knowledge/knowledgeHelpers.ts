import { Scale, Handshake, Landmark, Map as MapIcon, Palmtree, Sofa, type LucideIcon } from "lucide-react";
import { MOCK_CATEGORIES } from "../../data/mockDocuments";
import type { KnowledgeDocument } from "../../types/document.types";

// Icon theo id chuyên mục (có thể lưu cột icon trong bảng category)
export const CATEGORY_ICON: Record<number, LucideIcon> = {
  1: Scale,
  2: Handshake,
  3: Landmark,
  4: MapIcon,
  5: Palmtree,
  6: Sofa,
};

export const catName = (id: number) => MOCK_CATEGORIES.find((c) => c.id === id)?.name ?? "";
export const readMinutes = (d: KnowledgeDocument) => Math.max(3, Math.ceil(d.content.length / 120));
export const excerpt = (d: KnowledgeDocument) => d.summary ?? d.content.slice(0, 140);

export const selectCls =
  "h-11 w-full appearance-none rounded-xl border border-line bg-white px-4 pr-9 text-sm text-heading outline-none focus:border-primary-300";
