import type { BookingUnit } from "../BookingLockModal";
import { UNIT_IMAGE, type InventoryRow } from "../../../data/projectDetail/inventory";
import { STATUS, fmt } from "./inventoryStatus";

// Chỉ căn còn trống mới cho giữ chỗ
export const canBook = (row: InventoryRow) => row.status === "available";

export function toBookingUnit(row: InventoryRow): BookingUnit {
  return {
    code: row.code,
    image: UNIT_IMAGE,
    statusLabel: STATUS[row.status].label,
    location: `Phân khu ${row.zone}`,
    spec: `${row.type} · ${row.area} m²`,
    direction: row.dir,
    price: row.list ? fmt(row.list) : "Liên hệ",
  };
}
