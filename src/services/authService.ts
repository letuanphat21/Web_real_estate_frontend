import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const MOCK_USER = {
  id: 1,
  fullName: "Nguyễn Văn A",
  email: "hello@datvietgroup.vn",
};

async function login(payload: LoginRequest): Promise<AuthResponse> {
  // ===== KHI CÓ API =====
  // return axiosClient.post("/auth/login", payload);

  await delay(400);
  if (!payload.identifier.trim() || !payload.password.trim()) {
    throw new Error("Vui lòng nhập đầy đủ thông tin đăng nhập.");
  }
  return { user: { ...MOCK_USER, email: payload.identifier }, token: "mock-token" };
}

async function register(payload: RegisterRequest): Promise<AuthResponse> {
  // ===== KHI CÓ API =====
  // return axiosClient.post("/auth/register", payload);

  await delay(400);
  if (!payload.fullName.trim() || !payload.identifier.trim() || !payload.password.trim()) {
    throw new Error("Vui lòng nhập đầy đủ thông tin đăng ký.");
  }
  return {
    user: { id: 2, fullName: payload.fullName, email: payload.identifier },
    token: "mock-token",
  };
}

export default { login, register };
