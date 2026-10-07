/** Tài khoản đang đăng nhập (dữ liệu thật sẽ do backend trả về) */
export interface CurrentUser {
  id: number;
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  /** chỉ khi true mới được hiện badge "Đã xác thực" */
  emailVerified: boolean;
  phoneVerified: boolean;
}
