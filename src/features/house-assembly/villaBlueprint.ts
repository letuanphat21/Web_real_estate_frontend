import type { Vec3 } from "./types";

/**
 * Bản vẽ biệt thự dựng hoàn toàn bằng khối hộp (procedural) — không cần tải model bên ngoài.
 * Đơn vị: mét. Trục Y hướng lên, mặt tiền nhìn về +Z, cốt ±0.00 là mặt sàn tầng 1.
 * Thứ tự trong VILLA_PARTS chính là trình tự thi công: lắp ráp chạy từ đầu mảng,
 * tháo rời chạy ngược từ cuối mảng (mái rời đi đầu tiên).
 */

export type VillaMaterial =
  | "concrete"
  | "concreteDark"
  | "paving"
  | "stone"
  | "wood"
  | "woodFloor"
  | "metal"
  | "brass"
  | "glass"
  | "fabric"
  | "fabricDark"
  | "plaster"
  | "lightStrip";

export type PartCategory = "foundation" | "structure" | "wall" | "glass" | "floor" | "balcony" | "roof";

export interface BoxSpec {
  material: VillaMaterial;
  size: Vec3;
  /** Tâm khối, tương đối với pivot của cấu kiện. */
  position: Vec3;
}

export interface VillaPart {
  id: string;
  category: PartCategory;
  /** Chú thích hiện cạnh cấu kiện khi ở trạng thái tách rời. */
  label?: string;
  /** Tâm cấu kiện tại vị trí lắp đặt (hệ toạ độ biệt thự). */
  pivot: Vec3;
  boxes: BoxSpec[];
  /** Độ dời khi tách rời hoàn toàn (m). */
  offset: Vec3;
  /** Góc xoay thêm khi tách rời hoàn toàn (rad). */
  spin: Vec3;
  /** Độ vồng của quỹ đạo bay (m) — cấu kiện bay theo đường cong thay vì đường thẳng. */
  arc: number;
  /** Vị trí đèn nội thất gắn theo cấu kiện (tương đối pivot). */
  lights: Vec3[];
  /** Điểm neo nhãn chú thích (tương đối pivot). */
  labelAnchor: Vec3;
}

interface PartDraft {
  id: string;
  category: PartCategory;
  label?: string;
  /** Toạ độ biệt thự. */
  boxes: BoxSpec[];
  offset: Vec3;
  spin?: Vec3;
  arc?: number;
  /** Toạ độ biệt thự. */
  lights?: Vec3[];
}

/** Khối hộp theo biên [x0,x1] × [y0,y1] × [z0,z1] — cách ghi kích thước quen thuộc của bản vẽ. */
function box(material: VillaMaterial, x0: number, x1: number, y0: number, y1: number, z0: number, z1: number): BoxSpec {
  return {
    material,
    size: [x1 - x0, y1 - y0, z1 - z0],
    position: [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2],
  };
}

/** Các giá trị cách đều trong [start, end]. */
function steps(start: number, end: number, step: number): number[] {
  const values: number[] = [];
  for (let v = start; v <= end + 1e-6; v += step) values.push(Number(v.toFixed(3)));
  return values;
}

/** Quy đổi toạ độ biệt thự → toạ độ quanh tâm cấu kiện để khi bay, cấu kiện xoay quanh chính nó. */
function finalize(draft: PartDraft): VillaPart {
  const min: Vec3 = [Infinity, Infinity, Infinity];
  const max: Vec3 = [-Infinity, -Infinity, -Infinity];
  for (const b of draft.boxes) {
    for (let axis = 0; axis < 3; axis++) {
      min[axis] = Math.min(min[axis], b.position[axis] - b.size[axis] / 2);
      max[axis] = Math.max(max[axis], b.position[axis] + b.size[axis] / 2);
    }
  }
  const pivot: Vec3 = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
  const local = (p: Vec3): Vec3 => [p[0] - pivot[0], p[1] - pivot[1], p[2] - pivot[2]];

  return {
    id: draft.id,
    category: draft.category,
    label: draft.label,
    pivot,
    boxes: draft.boxes.map((b) => ({ ...b, position: local(b.position) })),
    offset: draft.offset,
    spin: draft.spin ?? [0, 0, 0],
    arc: draft.arc ?? 0,
    lights: (draft.lights ?? []).map(local),
    labelAnchor: [0, max[1] - pivot[1] + 0.9, 0],
  };
}

const L1_MULLIONS = [-4.9, -2.3, 0.3, 2.9];
const L2_MULLIONS = [-2.0, 1.2, 4.4, 7.3];
const LOUVER_XS = steps(4.65, 10.05, 0.36);
const PERGOLA_ZS = steps(-4.3, 2.8, 0.71);

const DRAFTS: PartDraft[] = [
  {
    id: "foundation",
    category: "foundation",
    boxes: [
      box("concreteDark", -9.5, 11.5, -0.75, -0.06, -6.5, 7.0),
      box("paving", -9.45, 11.45, -0.06, 0, -6.45, 6.95),
      // Bậc tam cấp xuống sân vườn
      box("paving", -6, -2.5, -0.75, -0.25, 7.0, 7.38),
      box("paving", -6, -2.5, -0.75, -0.5, 7.38, 7.76),
      // Sàn gỗ và nội thất tầng 1: sofa, bàn trà, bàn ăn, đảo bếp
      box("woodFloor", -7.5, 5.5, 0, 0.04, -4.5, 3.44),
      box("fabric", -5.8, -2.6, 0.04, 0.42, -1.3, -0.4),
      box("fabric", -5.8, -2.6, 0.42, 0.85, -1.3, -1.02),
      box("fabricDark", -4.9, -3.5, 0.04, 0.36, 0.1, 0.9),
      box("wood", 0.2, 2.8, 0.72, 0.78, -1.7, -0.7),
      box("metal", 1.3, 1.7, 0.04, 0.72, -1.4, -1.0),
      box("plaster", 3.0, 5.0, 0.04, 0.95, -3.3, -2.4),
      // Ghế tắm nắng ở hiên dưới phần đua tầng 2
      box("fabric", 6.4, 7.2, 0, 0.32, -1.2, 0.8),
      box("fabric", 6.4, 7.2, 0.32, 0.72, -1.2, -0.75),
      box("fabric", 7.9, 8.7, 0, 0.32, -1.2, 0.8),
      box("fabric", 7.9, 8.7, 0.32, 0.72, -1.2, -0.75),
    ],
    offset: [0, -3.4, 0.6],
    spin: [0.035, 0, -0.025],
    lights: [[-1.5, 2.5, -0.6]],
  },
  {
    id: "frame",
    category: "structure",
    label: "Cột & dầm thép",
    boxes: [
      box("metal", 10.7, 11.0, 0, 3.4, 4.55, 4.85),
      box("metal", 10.7, 11.0, 0, 3.4, -4.95, -4.65),
      box("metal", 10.62, 11.08, 2.95, 3.4, -5.2, 5.2),
      box("metal", 5.5, 11.08, 2.95, 3.4, 4.75, 5.2),
      box("metal", -1.1, -0.85, 0.04, 3.4, 3.15, 3.4),
    ],
    offset: [7.5, -0.8, 4.5],
    spin: [0.08, 0.4, 0.14],
    arc: 1.6,
  },
  {
    id: "wall-stone",
    category: "wall",
    label: "Tường bao",
    boxes: [
      box("stone", -8.2, -7.5, 0, 4.2, -5.2, 6.0),
      box("brass", -8.24, -7.46, 4.2, 4.24, -5.24, 6.04),
    ],
    offset: [-8.5, 0.8, 1.5],
    spin: [0, -0.5, 0.1],
    arc: 2,
  },
  {
    id: "walls-l1",
    category: "wall",
    boxes: [
      box("concrete", -7.5, 5.5, 0, 3.4, -4.5, -4.15),
      box("wood", -7.4, 5.4, 0.04, 3.36, -4.15, -4.1),
      box("concrete", 5.15, 5.5, 0, 3.4, -4.5, -0.6),
    ],
    offset: [0.5, 0.3, -8.5],
    spin: [-0.14, 0.2, 0],
    arc: 1.4,
  },
  {
    id: "glass-l1",
    category: "glass",
    boxes: [
      box("glass", -7.5, 5.5, 0.04, 3.38, 3.44, 3.5),
      ...L1_MULLIONS.map((x) => box("metal", x - 0.035, x + 0.035, 0.04, 3.38, 3.41, 3.53)),
      box("metal", -7.5, 5.5, 3.3, 3.4, 3.41, 3.53),
      box("metal", -7.5, 5.5, 0.04, 0.1, 3.41, 3.53),
      box("glass", 5.46, 5.52, 0.04, 3.38, -0.6, 3.5),
      box("metal", 5.43, 5.55, 0.04, 3.38, 1.4, 1.48),
    ],
    offset: [-0.5, -0.6, 9.5],
    spin: [0.2, -0.12, 0.03],
    arc: 1.2,
  },
  {
    id: "slab-l2",
    category: "floor",
    label: "Sàn bê tông",
    boxes: [
      box("concrete", -7.5, 11.2, 3.4, 3.8, -5.2, 5.2),
      // Chỉ đồng chạy dọc mép sàn
      box("brass", -7.5, 11.2, 3.57, 3.63, 5.2, 5.23),
      box("brass", 11.2, 11.23, 3.57, 3.63, -5.2, 5.23),
      // Đèn hắt trần tầng 1, đèn thả bàn ăn, đèn soffit dưới phần đua
      box("lightStrip", -7.2, 5.2, 3.36, 3.4, 2.75, 2.95),
      box("lightStrip", -7.2, 5.2, 3.36, 3.4, -3.95, -3.75),
      box("lightStrip", 1.3, 1.6, 2.2, 2.5, -1.35, -1.05),
      box("lightStrip", 7.0, 10.0, 3.36, 3.4, 4.3, 4.5),
      // Sàn gỗ và nội thất tầng 2: giường, đầu giường, tủ thấp, ghế bành
      box("woodFloor", -5.5, 10.6, 3.8, 3.84, -4.6, 2.9),
      box("fabric", 5.6, 7.8, 3.84, 4.3, -3.4, -1.0),
      box("wood", 5.5, 7.9, 3.84, 4.95, -3.65, -3.4),
      box("wood", -3.2, -0.2, 3.84, 4.45, -4.2, -3.75),
      box("fabricDark", -1.2, 0.2, 3.84, 4.25, -0.8, 0.4),
    ],
    offset: [0, 3.6, 0.4],
    spin: [0.06, 0.2, -0.05],
    lights: [[2.5, 6.2, -1.2]],
  },
  {
    id: "walls-l2",
    category: "wall",
    boxes: [
      box("concrete", -5.5, 10.6, 3.8, 7.0, -4.6, -4.25),
      box("plaster", -5.15, 10.25, 3.84, 6.98, -4.25, -4.2),
      // Hai tường hồi kéo dài ra trước tạo khung cho mặt tiền
      box("concrete", -5.5, -5.15, 3.8, 7.0, -4.6, 3.4),
      box("concrete", 10.25, 10.6, 3.8, 7.0, -4.6, 3.4),
    ],
    offset: [-1, 4.8, -7.5],
    spin: [-0.12, -0.3, 0.06],
    arc: 1.5,
  },
  {
    id: "glass-l2",
    category: "glass",
    label: "Vách kính",
    boxes: [
      box("glass", -5.15, 10.25, 3.84, 6.98, 2.85, 2.91),
      ...L2_MULLIONS.map((x) => box("metal", x - 0.035, x + 0.035, 3.84, 6.98, 2.82, 2.94)),
      box("metal", -5.15, 10.25, 6.9, 6.98, 2.82, 2.94),
      box("metal", -5.15, 10.25, 3.84, 3.92, 2.82, 2.94),
    ],
    offset: [-2.5, 4.4, 9.5],
    spin: [0.18, 0.28, -0.05],
    arc: 1.2,
  },
  {
    id: "louvers",
    category: "wall",
    boxes: [
      ...LOUVER_XS.map((x) => box("wood", x - 0.05, x + 0.05, 3.84, 6.98, 3.0, 3.42)),
      box("metal", 4.45, 10.25, 6.9, 6.98, 2.98, 3.44),
      box("metal", 4.45, 10.25, 3.84, 3.9, 2.98, 3.44),
    ],
    offset: [8.5, 4.8, 6.5],
    spin: [0.05, 0.6, 0.16],
    arc: 2,
  },
  {
    id: "balcony-l2",
    category: "balcony",
    label: "Ban công",
    boxes: [
      box("wood", -7.4, 4.4, 3.8, 3.86, 2.95, 5.12),
      // Lan can kính không khung, tay vịn đồng
      box("glass", -7.45, 4.4, 3.86, 4.92, 5.08, 5.13),
      box("brass", -7.5, 4.45, 4.92, 4.97, 5.05, 5.16),
      box("glass", -7.5, -7.45, 3.86, 4.92, 2.95, 5.13),
      box("brass", -7.53, -7.42, 4.92, 4.97, 2.95, 5.16),
      box("glass", 4.4, 4.45, 3.86, 4.92, 3.42, 5.13),
      box("brass", 4.37, 4.48, 4.92, 4.97, 3.42, 5.16),
      box("fabric", -4.6, -3.8, 3.86, 4.2, 3.4, 4.7),
      box("fabric", -3.3, -2.5, 3.86, 4.2, 3.4, 4.7),
    ],
    offset: [-6.5, 3.6, 8.5],
    spin: [0.22, -0.38, 0.1],
    arc: 1.8,
  },
  {
    id: "slab-l3",
    category: "floor",
    boxes: [
      box("concrete", -6.0, 11.2, 7.0, 7.4, -5.0, 3.6),
      box("brass", -6.0, 11.2, 7.17, 7.23, 3.6, 3.63),
      // Đèn hắt trần tầng 2 và đèn soffit phía trên ban công
      box("lightStrip", -5.0, 10.0, 6.96, 7.0, 2.35, 2.55),
      box("lightStrip", -5.0, 4.2, 6.96, 7.0, 3.2, 3.4),
      // Mặt sân thượng, sofa penthouse, ghế tắm nắng dưới pergola
      box("paving", -5.9, 11.1, 7.4, 7.44, -4.9, 3.5),
      box("fabricDark", -3.6, -1.0, 7.44, 7.85, -3.0, -2.2),
      box("fabric", 6.0, 6.8, 7.44, 7.76, -1.6, 0.4),
      box("fabric", 7.4, 8.2, 7.44, 7.76, -1.6, 0.4),
    ],
    offset: [0, 7.2, -0.5],
    spin: [-0.07, -0.25, 0.05],
    lights: [[-1, 9.1, -1.6]],
  },
  {
    id: "walls-l3",
    category: "wall",
    boxes: [
      box("concrete", -4.5, 2.5, 7.44, 10.2, -4.0, -3.65),
      box("plaster", -4.15, 2.5, 7.44, 10.16, -3.65, -3.6),
      box("stone", -4.5, -4.15, 7.44, 10.2, -4.0, 0.8),
    ],
    offset: [-6.5, 9.0, -4.5],
    spin: [0.05, 0.5, -0.1],
    arc: 1.5,
  },
  {
    id: "glass-l3",
    category: "glass",
    boxes: [
      box("glass", -4.15, 2.5, 7.44, 10.18, 0.74, 0.8),
      box("glass", 2.44, 2.5, 7.44, 10.18, -3.65, 0.8),
      box("metal", 2.42, 2.52, 7.44, 10.2, 0.72, 0.82),
      box("metal", -0.9, -0.83, 7.44, 10.18, 0.71, 0.83),
      box("metal", 2.41, 2.53, 7.44, 10.18, -1.45, -1.38),
    ],
    offset: [3.5, 9.5, 5.5],
    spin: [0.2, -0.4, 0.02],
    arc: 1.2,
  },
  {
    id: "railing-l3",
    category: "balcony",
    boxes: [
      box("glass", -5.9, 11.1, 7.44, 8.48, 3.47, 3.52),
      box("brass", -5.93, 11.13, 8.48, 8.53, 3.44, 3.55),
      box("glass", 11.06, 11.11, 7.44, 8.48, -4.9, 3.5),
      box("brass", 11.03, 11.14, 8.48, 8.53, -4.9, 3.55),
      box("glass", -5.95, -5.9, 7.44, 8.48, -4.9, 3.5),
      box("brass", -5.98, -5.87, 8.48, 8.53, -4.9, 3.55),
    ],
    offset: [6.5, 8.0, 7.5],
    spin: [0.2, 0.32, 0.12],
    arc: 1.6,
  },
  {
    id: "pergola",
    category: "structure",
    boxes: [
      box("metal", 10.62, 10.82, 7.44, 10.05, 2.6, 2.8),
      box("metal", 10.62, 10.82, 7.44, 10.05, -4.6, -4.4),
      box("metal", 10.55, 10.9, 10.05, 10.35, -4.7, 2.9),
      ...PERGOLA_ZS.map((z) => box("wood", 4.0, 10.9, 10.12, 10.3, z - 0.06, z + 0.06)),
    ],
    offset: [9.5, 10.5, -2.5],
    spin: [0.1, 0.55, -0.22],
    arc: 2,
  },
  {
    id: "roof",
    category: "roof",
    label: "Mái phẳng",
    boxes: [
      box("concrete", -5.6, 4.0, 10.2, 10.5, -4.6, 2.4),
      box("brass", -5.6, 4.0, 10.31, 10.37, 2.4, 2.43),
      box("brass", 4.0, 4.03, 10.31, 10.37, -4.6, 2.43),
      box("lightStrip", -5.0, 3.5, 10.16, 10.2, 1.5, 1.7),
    ],
    offset: [0, 14, 0.5],
    spin: [0.2, 0.5, -0.12],
  },
];

export const VILLA_PARTS: VillaPart[] = DRAFTS.map(finalize);
