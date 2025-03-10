import httpClient from "@/apis/axiosSetup";
import { DashboardResponse } from "../apiTypes";

export const dashboardApi = {
    getApiUsage: () =>
        httpClient.get<DashboardResponse[]>("/get"),
}