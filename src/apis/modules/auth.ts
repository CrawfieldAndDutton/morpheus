import httpClient from "@/apis/axiosSetup";
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/apis/apiTypes";

export const authApi = {
  login: (data: LoginPayload) =>
    httpClient.post<LoginResponse>("/auth/login", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  register: (data: RegisterPayload) =>
    httpClient.post<RegisterResponse>("/auth/register", data),

  logout: (data: LogoutPayload) =>
    httpClient.post<string>("/auth/logout", data, {
      headers: { useAuth: true, useRefreshToken: true },
    }),
};
