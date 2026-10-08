import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 idle: chưa kiểm tra phiên (mới mở app)
 checking: đang gọi refresh-token để khôi phục phiên từ cookie
 */
export type AuthStatus = "idle" | "checking" | "authenticated" | "unauthenticated";

interface AuthState {
  // Access token chỉ nằm trên RAM, reload trang sẽ mất → lấy lại bằng refresh cookie
  accessToken: string | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  accessToken: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChecking: (state) => {
      state.status = "checking";
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.status = "authenticated";
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setChecking, setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
