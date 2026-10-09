// Bám theo bảng Progress / Progress_Images (quan hệ: Progress.project_id → Projects.id, Progress_Images.progress_id → Progress.id)

export interface ProgressImage {
  id: number;
  progressId: number;
  imageUrl: string;
  createdAt: string;
}

export interface Progress {
  id: number;
  projectId: number;
  title: string;
  content: string | null;
  reportDate: string | null; // ISO date (report_date)
  createdAt: string;
  images: ProgressImage[];
}

// Thông tin nhận diện dự án lấy từ bảng Projects
export interface ProgressProject {
  id: number;
  name: string;
  location: string;
  investor: string;
  overviewImage: string;
}

export interface ProjectProgress {
  project: ProgressProject;
  items: Progress[]; // mới nhất trước
}

// Ảnh kèm chú thích dùng cho gallery và lightbox
export interface ViewImage {
  src: string;
  title: string;
  date: string | null;
}
