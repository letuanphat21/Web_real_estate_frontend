// Bám đúng ERD: Projects, Project_types (project_id, name), Zones (project_id, ...)

// Zones: id, project_id, name, description, status, image_url
export interface AdminZone {
  id: number;
  name: string;
  description: string;
  status: string; // chuỗi tự do, ví dụ "Đang mở bán"
  imageUrl: string | null;
}

// Projects: id, name, building_type, overview_image, location, investor, consultancy,
// development_model, size, total_investment, ownership_type, created_at
export interface AdminProject {
  id: number;
  name: string;
  buildingType: string;
  overviewImage: string | null;
  location: string;
  investor: string;
  consultancy: string;
  developmentModel: string;
  size: string;
  totalInvestment: string;
  ownershipType: string;
  createdAt: string; // ISO
  // Project_types: mỗi dòng là một loại hình của dự án
  types: string[];
  zones: AdminZone[];
}

// Dữ liệu gửi lên khi tạo/sửa dự án
export type AdminProjectInput = Omit<AdminProject, "id" | "createdAt">;

export interface AdminProjectFilter {
  keyword: string;
  investor: string;
  location: string;
  buildingType: string;
}
