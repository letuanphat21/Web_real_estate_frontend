// Bám theo bảng Properties (zone_id → Zones.id, Zones.project_id → Projects.id) và Property_Images
// Không đưa vector_embedding lên giao diện quản trị.

export type PropertyStatus = "available" | "holding" | "sold" | "closed";

export interface Property {
  id: number;
  zoneId: number;
  propertyCode: string;
  area: number; // m²
  price: number; // VNĐ, giữ nguyên giá trị gốc
  direction: string;
  floor: number;
  bedrooms: number;
  status: PropertyStatus;
  images: string[]; // image_url trong Property_Images
}

export type PropertyInput = Omit<Property, "id" | "images">;

export interface PropertyProjectRef {
  id: number;
  name: string;
}

export interface PropertyZoneRef {
  id: number;
  projectId: number;
  name: string;
}

// Danh mục dự án/phân khu dùng cho bộ lọc và form
export interface PropertyCatalog {
  projects: PropertyProjectRef[];
  zones: PropertyZoneRef[];
}

export interface PropertyFilter {
  projectId: number | null;
  zoneId: number | null;
  keyword: string;
  status: "" | PropertyStatus;
  areaMin: string;
  areaMax: string;
  priceMin: string; // đơn vị: tỷ
  priceMax: string;
}
