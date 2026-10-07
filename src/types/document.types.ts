// Bám theo các bảng: documents, document_images, category
//
// Đề xuất chỉnh schema (mục đánh dấu "đề xuất"):
//  - category: bảng hiện có FK document_id nên 1 chuyên mục chỉ thuộc được 1 bài.
//    Nên đảo lại: category (id, name, description, created_at) và documents.category_id (FK)
//    hoặc bảng nối document_categories nếu 1 bài thuộc nhiều chuyên mục.
//  - documents: thêm summary (đoạn trích ngắn) để khỏi cắt từ content.

export interface DocumentCategory {
  id: number;
  name: string;
  description?: string; // đề xuất thêm
  createdAt: string;
}

export interface DocumentImage {
  id: number;
  documentId: number;
  imageUrl: string;
  createdAt: string;
}

export interface KnowledgeDocument {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  summary?: string; // đề xuất thêm
  categoryId: number; // đề xuất thêm (thay cho category.document_id)
  images: DocumentImage[];
  createdAt: string;
  updatedAt: string;
}

export type DocumentSort = "NEWEST" | "OLDEST" | "UPDATED";

export const DOCUMENT_SORT_LABEL: Record<DocumentSort, string> = {
  NEWEST: "Mới đăng",
  OLDEST: "Cũ nhất",
  UPDATED: "Cập nhật gần đây",
};
