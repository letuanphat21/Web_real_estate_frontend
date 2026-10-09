export interface LoginRequest {
  identifier: string;
  password: string;
  remember: boolean;
}

// Khớp RegisterRequest bên BE
export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  // Tên role bên BE, ví dụ "ROLE_USER"
  role: string;
}

// Khớp JwtAuthResponse bên BE: chỉ trả access token
export interface AuthResponse {
  token: string;
}

export type AuthLocale = "VI" | "EN";
