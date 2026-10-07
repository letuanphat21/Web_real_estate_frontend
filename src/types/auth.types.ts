export interface LoginRequest {
  identifier: string;
  password: string;
  remember: boolean;
}

export interface RegisterRequest {
  fullName: string;
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export type AuthLocale = "VI" | "EN";
