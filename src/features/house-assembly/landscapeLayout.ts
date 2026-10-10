import type { Vec3 } from "./types";

/**
 * Cảnh quan xuất hiện ở giai đoạn hoàn thiện: đảo nổi, hồ bơi, lối đi, cây xanh và đèn sân vườn.
 * Toạ độ cùng hệ với biệt thự (xem villaBlueprint.ts).
 */

export type LandscapeKind = "tree" | "cypress" | "shrub" | "lamp";

export interface LandscapeItem {
  kind: LandscapeKind;
  /** Gốc cây / chân đèn, nằm trên mặt cỏ. */
  position: Vec3;
  scale: number;
  /** Xoay quanh trục Y (rad). */
  rotation: number;
}

export interface Extents {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
}

/** Cao độ mặt cỏ — ngay dưới đáy bệ biệt thự (-0.75) để hai mặt không chồng nhau. */
export const GROUND_Y = -0.76;

/** Đảo nổi: tâm mặt bằng, bán kính mặt cỏ, độ dày lớp đất và chiều sâu khối đá bên dưới. */
export const ISLAND = { x: 1, z: 2, radius: 19, rim: 18.4, thickness: 1.4, rockDepth: 13 } as const;

export const POOL_WATER: Extents = { x0: 0.2, x1: 10.2, y0: GROUND_Y, y1: -0.6, z0: 9.2, z1: 11.8 };

/** Viền đá quanh hồ bơi và các phiến đá lối đi — xuất hiện cùng đảo. */
export const PAVING: Extents[] = [
  { x0: -1.5, x1: 11.5, y0: GROUND_Y, y1: -0.5, z0: 7.9, z1: 9.2 },
  { x0: -1.5, x1: 11.5, y0: GROUND_Y, y1: -0.5, z0: 11.8, z1: 13.2 },
  { x0: -1.5, x1: 0.2, y0: GROUND_Y, y1: -0.5, z0: 9.2, z1: 11.8 },
  { x0: 10.2, x1: 11.5, y0: GROUND_Y, y1: -0.5, z0: 9.2, z1: 11.8 },
  ...[8.4, 9.3, 10.2, 11.1, 12.0, 12.9, 13.8].map((z) => ({ x0: -5, x1: -3.6, y0: GROUND_Y, y1: -0.7, z0: z - 0.28, z1: z + 0.28 })),
];

/** Vị trí đèn pha hồ bơi (desktop có thêm point light thật). */
export const POOL_LIGHT: Vec3 = [5.2, -0.2, 10.5];

// [x, z, tỉ lệ]
const TREES: [number, number, number][] = [
  [-13, -9, 1.15],
  [-15, -1.5, 1],
  [-14, 6.5, 1.1],
  [-10.5, 13, 0.95],
  [-7.5, -11, 0.9],
  [-3.5, -12.5, 1.2],
  [4, -13, 1.05],
  [10, -11.5, 1.15],
  [15, -6.5, 1],
  [16, 2.5, 1.1],
  [15, 11, 0.95],
];

const CYPRESSES: [number, number, number][] = [
  [-11.2, -4.5, 1],
  [-11.2, -1.5, 1.05],
  [-11.2, 1.5, 0.95],
  [-11.2, 4.5, 1],
  [13.4, -3.5, 1],
  [13.4, -0.5, 0.95],
  [13.4, 2.5, 1.05],
];

const SHRUBS: [number, number, number][] = [
  [-8.6, 8.4, 0.9],
  [-7.2, 8.9, 0.75],
  [-12.6, 9.5, 0.85],
  [-0.5, 14.3, 0.8],
  [2.6, 14.5, 0.9],
  [5.8, 14.3, 0.75],
  [8.9, 14.5, 0.85],
  [11.8, 14, 0.8],
  [12.8, 6.5, 0.9],
  [13.2, 8.8, 0.75],
  [-6.5, -8.2, 0.9],
  [-3, -8.6, 0.8],
  [1, -8.4, 0.95],
  [5, -8.7, 0.8],
  [8.5, -8.3, 0.9],
];

const LAMPS: [number, number][] = [
  [-6, 9],
  [-2.6, 10.6],
  [-6, 12.2],
  [-2.6, 13.8],
  [12.2, 8.2],
  [12.2, 12.8],
  [-10.2, -6.2],
  [12.4, -6.2],
];

/** Góc xoay giả ngẫu nhiên nhưng cố định theo vị trí. */
function rotationAt(x: number, z: number): number {
  const v = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return (v - Math.floor(v)) * Math.PI * 2;
}

function item(kind: LandscapeKind, x: number, z: number, scale = 1): LandscapeItem {
  return { kind, position: [x, GROUND_Y, z], scale, rotation: rotationAt(x, z) };
}

const VILLA_CENTER = { x: 1, z: 0.5 };
const distanceFromVilla = (it: LandscapeItem) =>
  Math.hypot(it.position[0] - VILLA_CENTER.x, it.position[2] - VILLA_CENTER.z);

/** Sắp theo khoảng cách tới biệt thự → khi stagger, cảnh quan "lan" dần từ trong ra ngoài. */
export const LANDSCAPE_ITEMS: LandscapeItem[] = [
  ...TREES.map(([x, z, s]) => item("tree", x, z, s)),
  ...CYPRESSES.map(([x, z, s]) => item("cypress", x, z, s)),
  ...SHRUBS.map(([x, z, s]) => item("shrub", x, z, s)),
  ...LAMPS.map(([x, z]) => item("lamp", x, z)),
].sort((a, b) => distanceFromVilla(a) - distanceFromVilla(b));
