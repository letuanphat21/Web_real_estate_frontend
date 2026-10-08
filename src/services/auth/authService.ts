import type { AuthResponse, LoginRequest, RegisterRequest } from "../../types/auth/auth.types";
import { getErrorMessage, refreshAccessToken } from "../../api";
import { store } from "../../store";
import { clearAuth, setAccessToken, setChecking } from "../../store/authSlice";
import BaseService from "../base/BaseService";

// Ném Error có message tiếng Việt từ BE để trang hiển thị
const toError = (err: unknown) => new Error(getErrorMessage(err));

class AuthService extends BaseService {
  constructor() {
    // Các API đăng nhập/đăng ký đều public, không gắn token
    super("/users", { auth: false });
  }

  async login(payload: LoginRequest): Promise<AuthResponse> {
    try {
      const res = await this.create<AuthResponse>(
        { emailOrPhone: payload.identifier, password: payload.password },
        "login"
      );
      store.dispatch(setAccessToken(res.token));
      return res;
    } catch (err) {
      throw toError(err);
    }
  }

  // BE trả về câu thông báo (tài khoản cần kích hoạt qua email trước khi đăng nhập)
  async register(payload: RegisterRequest): Promise<string> {
    try {
      return await this.create<string>(payload, "register");
    } catch (err) {
      throw toError(err);
    }
  }

  // Gọi API lỗi (mất mạng...) vẫn xoá phiên ở FE để người dùng thoát được
  async logout(): Promise<void> {
    await this.create(undefined, "logout").catch(() => undefined);
    store.dispatch(clearAuth());
  }

  /**
   Gọi 1 lần khi mở app: access token nằm trên RAM nên reload là mất,
   dùng cookie refreshToken để lấy lại. Không có cookie → coi như chưa đăng nhập.
   */
  async restoreSession(): Promise<void> {
    if (store.getState().auth.status !== "idle") return;
    store.dispatch(setChecking());
    await refreshAccessToken().catch(() => undefined);
  }
}

export default new AuthService();
