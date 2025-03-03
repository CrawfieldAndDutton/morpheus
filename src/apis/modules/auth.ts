import httpClient from "@/apis/axiosSetup";
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,

  RegisterPayload,
  RegisterResponse,
} from "@/apis/apiTypes";
import { LogOut } from "lucide-react";

export const authApi = {
  login: (data: LoginPayload) =>
    httpClient.post<LoginResponse>("/auth/login", data),

  register: (data:  RegisterPayload) =>
    httpClient.post<RegisterResponse>("/auth/register", data),
  
  logout: (data: LogoutPayload) =>
    httpClient.post<string>("/auth/logout", data,)
};
