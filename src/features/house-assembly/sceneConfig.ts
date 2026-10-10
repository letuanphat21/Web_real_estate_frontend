import type { Vec3 } from "./types";

/* ------------------------------------------------------------------ */
/* Camera                                                              */
/* ------------------------------------------------------------------ */

/** Một "cú máy": camera quay quanh điểm nhìn theo toạ độ cầu. */
export interface CameraShot {
  /** Góc quanh trục Y (rad), 0 = nhìn thẳng mặt tiền, dương = lệch sang phải. */
  azimuth: number;
  /** Góc ngẩng (rad). */
  elevation: number;
  /** Khoảng cách tới điểm nhìn (m) ở khung hình chuẩn 16:9. */
  distance: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  /** Dịch ống kính (lens shift) theo tỉ lệ khung hình: dương = chủ thể dịch sang phải / lên trên. */
  shiftX: number;
  shiftY: number;
}

export type ShotName = "hero" | "approach" | "exploded" | "assembled" | "complete" | "outro";
export type ShotSet = Record<ShotName, CameraShot>;

function shot(azimuth: number, elevation: number, distance: number, target: Vec3, shiftX: number, shiftY: number): CameraShot {
  return { azimuth, elevation, distance, targetX: target[0], targetY: target[1], targetZ: target[2], shiftX, shiftY };
}

/**
 * Desktop: chữ nằm bên trái nên biệt thự được dịch sang phải.
 * Mobile/tablet dọc: chữ nằm phía dưới nên biệt thự được dịch lên trên.
 */
export const CAMERA_SHOTS: { desktop: ShotSet; mobile: ShotSet } = {
  desktop: {
    hero: shot(0.62, 0.11, 46, [1.5, 4.4, 0.5], 0.16, 0.03),
    approach: shot(0.5, 0.14, 40, [1.5, 4.8, 0.5], 0.16, 0.03),
    exploded: shot(-0.36, 0.2, 63, [1, 9.8, 0.5], 0.17, 0),
    assembled: shot(0.18, 0.15, 45, [1.5, 5, 0.5], 0.16, 0.02),
    complete: shot(0.82, 0.15, 52, [2, 2.4, 3], 0.15, 0.06),
    outro: shot(1.02, 0.42, 80, [2, 0.5, 3], 0.02, 0.17),
  },
  mobile: {
    hero: shot(0.55, 0.12, 42, [1.5, 4.6, 0.5], 0, 0.2),
    approach: shot(0.45, 0.14, 38, [1.5, 5, 0.5], 0, 0.2),
    exploded: shot(-0.3, 0.2, 54, [1, 10, 0.5], 0, 0.14),
    assembled: shot(0.18, 0.15, 42, [1.5, 5, 0.5], 0, 0.19),
    complete: shot(0.78, 0.16, 47, [2, 2.6, 3], 0, 0.2),
    outro: shot(0.98, 0.42, 72, [2, 0.5, 3], 0, 0.24),
  },
};

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

/** Độ dài timeline (đơn vị tuỳ ý) — ScrollTrigger quy đổi sang quãng cuộn thật. */
export const TIMELINE_LENGTH = 10;

/** Quãng cuộn khi ghim, tính theo số lần chiều cao màn hình. */
export const SCROLL_LENGTH = { desktop: 5, mobile: 4 } as const;

/** Bốn chặng hiển thị trên thanh tiến trình. Chặng 5 (chuyển cảnh) nằm ở cuối chặng "Hoàn thiện". */
export const STAGES = [
  { label: "Tổng thể", start: 0, end: 1 },
  { label: "Cấu kiện", start: 1, end: 3.2 },
  { label: "Lắp ráp", start: 3.2, end: 6.4 },
  { label: "Hoàn thiện", start: 6.4, end: TIMELINE_LENGTH },
] as const;

/* ------------------------------------------------------------------ */
/* Bầu trời & ánh sáng                                                 */
/* ------------------------------------------------------------------ */

export interface SkyPalette {
  zenith: string;
  mid: string;
  horizon: string;
  below: string;
  /** Quầng sáng mặt trời trên bầu trời. */
  sun: string;
  /** Màu đèn directional (nắng). */
  sunLight: string;
  hemiSky: string;
  hemiGround: string;
  cloudLit: string;
  cloudShade: string;
}

/** golden = hoàng hôn vàng (mở đầu), dusk = chạng vạng xanh (biệt thự lên đèn). */
export const PALETTE: { golden: SkyPalette; dusk: SkyPalette } = {
  golden: {
    zenith: "#3a6db3",
    mid: "#8fb6e0",
    horizon: "#f7c896",
    below: "#e9c6a8",
    sun: "#ffb873",
    sunLight: "#ffd3a3",
    hemiSky: "#b7cdef",
    hemiGround: "#b08a6e",
    cloudLit: "#fff4e6",
    cloudShade: "#c4b2ab",
  },
  dusk: {
    zenith: "#18234d",
    mid: "#465a95",
    horizon: "#f39a6b",
    below: "#9d7c93",
    sun: "#ff8350",
    sunLight: "#ff9e72",
    hemiSky: "#4b5b93",
    hemiGround: "#4a3a48",
    cloudLit: "#f6b9a1",
    cloudShade: "#55557a",
  },
};

/** Mặt trời ở phía trước-bên trái biệt thự: hắt nắng vàng lên mặt tiền, bóng đổ dài về phía sau. */
export const SUN = {
  azimuth: -0.9,
  elevation: [0.3, 0.085] as const,
  intensity: [3.1, 0.7] as const,
  distance: 90,
};

export const LIGHT_LEVELS = {
  hemisphere: [1.05, 0.5] as const,
  environment: [0.9, 0.4] as const,
  /** Cường độ tối đa của đèn nội thất / hồ bơi / đèn rọi tường (candela). */
  interior: 28,
  pool: 16,
  facade: 70,
};

/* ------------------------------------------------------------------ */
/* Mây                                                                 */
/* ------------------------------------------------------------------ */

export interface CloudBankSpec {
  position: Vec3;
  bounds: Vec3;
  segments: number;
  volume: number;
  seed: number;
  opacity: number;
}

/** Các cụm mây quanh và bên dưới đảo — tạo chiều sâu cho biển mây. */
export const CLOUD_BANKS: CloudBankSpec[] = [
  { position: [4, -15.5, 4], bounds: [14, 1.5, 12], segments: 18, volume: 10, seed: 3, opacity: 0.95 },
  { position: [-34, -11, -18], bounds: [18, 3, 12], segments: 26, volume: 13, seed: 11, opacity: 0.9 },
  { position: [30, -12, -26], bounds: [22, 3, 12], segments: 28, volume: 14, seed: 19, opacity: 0.9 },
  { position: [-22, -13, 22], bounds: [16, 2.5, 10], segments: 22, volume: 12, seed: 27, opacity: 0.9 },
  { position: [26, -12.5, 20], bounds: [18, 3, 10], segments: 24, volume: 12, seed: 35, opacity: 0.9 },
  { position: [0, -14, -48], bounds: [40, 4, 14], segments: 34, volume: 18, seed: 43, opacity: 0.85 },
  { position: [-60, -12, 8], bounds: [22, 4, 26], segments: 28, volume: 18, seed: 51, opacity: 0.85 },
  { position: [62, -13, -4], bounds: [24, 4, 26], segments: 28, volume: 18, seed: 59, opacity: 0.85 },
  { position: [14, -10, 36], bounds: [14, 2, 6], segments: 14, volume: 9, seed: 67, opacity: 0.7 },
];
