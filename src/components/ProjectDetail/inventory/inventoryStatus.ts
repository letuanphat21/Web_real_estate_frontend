export const STATUS: Record<string, { label: string; badge: string; dot: string }> = {
  available: { label: "Còn trống", badge: "bg-success/10 text-success", dot: "bg-success" },
  holding: { label: "Đang giữ chỗ", badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  sold: { label: "Đã bán", badge: "bg-danger/10 text-danger", dot: "bg-danger" },
  closed: { label: "Chưa mở bán", badge: "bg-line text-body", dot: "bg-muted" },
};

export const fmt = (n: number | null) => (n == null ? "—" : `${n.toFixed(2).replace(".", ",")} tỷ`);
export const dash = "—";
