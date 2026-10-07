import { MOCK_USER } from "../data/mockUser";
import type { CurrentUser } from "../types/user.types";
// import axiosClient from "./axiosClient";

/** Mock: chưa có backend/auth. Khi có API, thay bằng axiosClient.get("/me"). */
async function getCurrentUser(): Promise<CurrentUser> {
  // return axiosClient.get("/me");
  return MOCK_USER;
}

const userService = { getCurrentUser };
export default userService;
