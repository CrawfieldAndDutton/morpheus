import httpClient from "@/apis/axiosSetup";
import {
  LoginPayload,
  LoginResponse,
} from "@/apis/apiTypes";

export const authApi = {
  login: (data: LoginPayload) =>
    httpClient.post<LoginResponse>("/auth/login", data),
};
