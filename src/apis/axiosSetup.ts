import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import config from "@/apis/config";

// Custom config type for Axios with optional auth token
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useAuth?: boolean; // Flag to indicate if auth is needed
}

const httpClient = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach token if required
httpClient.interceptors.request.use(
  (config) => {
    const customConfig = config as CustomAxiosRequestConfig;
    if (customConfig?.headers?.useAuth) {
      const token =
        customConfig?.headers?.token ||
        (customConfig?.headers?.useRefreshToken
          ? localStorage.getItem("token")
          : localStorage.getItem("refreshToken"));
      if (token) {
        // Use AxiosHeaders type for headers
        (customConfig.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${token}`
        );
      } else {
        console.warn("No token found for authenticated request.");
      }
      if (customConfig?.headers) {
        customConfig.headers["Content-Type"] =
          customConfig.headers["Content-Type"] || "application/json";
      }
    }
    return customConfig;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for error handling
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default httpClient;
