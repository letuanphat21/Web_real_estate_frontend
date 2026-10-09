// Tên role bên BE ("ROLE_USER"...) đổi sang nhãn hiển thị
const ROLE_LABELS: Record<string, string> = {
  USER: "Thành viên",
  ADMIN: "Quản trị viên",
  STAFF: "Nhân viên",
};

export const roleLabel = (role: string): string =>
  ROLE_LABELS[role.replace(/^ROLE_/, "").toUpperCase()] ?? "Thành viên";

// Chưa có avatar thì hiển thị chữ cái đầu của họ và tên
export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
