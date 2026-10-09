import type { ProjectImage } from "../types/projectImage.types";

// TODO: bỏ file này khi có API (Project_Images theo project_id). Dữ liệu demo, không phải từ backend.
const u = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80`;

let seq = 0;
const img = (projectId: number, photo: string, createdAt: string): ProjectImage => ({ id: ++seq, projectId, imageUrl: u(photo), createdAt });

export const MOCK_PROJECT_IMAGES: ProjectImage[] = [
  img(2, "photo-1545324418-cc1a3fa10c00", "2026-10-05"),
  img(2, "photo-1512917774080-9991f1c4c750", "2026-10-04"),
  img(2, "photo-1486406146926-c627a92ad1ab", "2026-10-03"),
  img(2, "photo-1600585154340-be6161a56a0c", "2026-10-02"),
  img(2, "photo-1600607687939-ce8a6c25118c", "2026-09-30"),
  img(2, "photo-1613490493576-7fde63acd811", "2026-09-28"),
  img(2, "photo-1541888946425-d81bb19240f5", "2026-09-25"),
  img(2, "photo-1503387762-592deb58ef4e", "2026-09-20"),
  img(1, "photo-1545324418-cc1a3fa10c00", "2026-10-02"),
  img(1, "photo-1486406146926-c627a92ad1ab", "2026-09-18"),
  img(1, "photo-1600585154340-be6161a56a0c", "2026-09-10"),
  img(3, "photo-1512917774080-9991f1c4c750", "2026-09-01"),
];
