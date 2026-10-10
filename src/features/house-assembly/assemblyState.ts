import { VILLA_PARTS } from "./villaBlueprint";
import { LANDSCAPE_ITEMS } from "./landscapeLayout";
import { CAMERA_SHOTS, type CameraShot } from "./sceneConfig";

/**
 * Trạng thái hoạt cảnh dùng chung giữa GSAP và React Three Fiber.
 *
 * Đây là object JS thường, KHÔNG phải React state: timeline GSAP (do ScrollTrigger điều khiển)
 * tween trực tiếp các trường số, còn scene đọc lại trong useFrame mỗi khung hình.
 * Nhờ vậy cuộn trang không gây re-render React nào, và vì mọi giá trị là hàm của tiến trình
 * timeline nên cuộn ngược sẽ đảo ngược hoạt cảnh chính xác.
 */
export interface AssemblyState {
  /** Ứng với VILLA_PARTS[i]: 0 = đúng vị trí lắp đặt, 1 = tách rời hoàn toàn. */
  parts: { k: number }[];
  /** Ứng với LANDSCAPE_ITEMS[i]: 0 = ẩn, 1 = đã mọc đủ. */
  landscape: { s: number }[];
  /** 0..1 — đảo nổi, hồ bơi và lối đi xuất hiện. */
  island: number;
  camera: CameraShot;
  /** 0 = hoàng hôn vàng, 1 = chạng vạng. */
  dusk: number;
  /** 0..1 — đèn nội thất. */
  interior: number;
  /** 0..1 — đèn sân vườn, hồ bơi, đèn rọi tường. */
  exterior: number;
  /** 0..1 — nhãn chú thích cấu kiện. */
  labels: number;
  /** Hệ số biên độ trôi lơ lửng. */
  float: number;
}

export function createAssemblyState(): AssemblyState {
  return {
    parts: VILLA_PARTS.map(() => ({ k: 0 })),
    landscape: LANDSCAPE_ITEMS.map(() => ({ s: 0 })),
    island: 0,
    camera: { ...CAMERA_SHOTS.desktop.hero },
    dusk: 0,
    interior: 0.12,
    exterior: 0,
    labels: 0,
    float: 1,
  };
}
