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
    httpClient.post<LoginResponse>("/dashboard/api/v1/auth/login", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  register: (data: RegisterPayload) =>
    httpClient.post<RegisterResponse>("/dashboard/api/v1/auth/register", data),

  logout: (data: LogoutPayload) =>
    httpClient.post<string>("/dashboard/api/v1/auth/logout", data, {
      headers: { useAuth: true, useRefreshToken: true },
    }),
};
