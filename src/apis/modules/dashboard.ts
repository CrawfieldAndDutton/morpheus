import httpClient from "@/apis/axiosSetup";
import { DashboardResponse } from "../apiTypes";

export const dashboardApi = {
    getApiUsage: (id : string) =>
        httpClient.get<any>("/", ),

    getCredits : () =>
        httpClient.get<any>("/dashboard/api/v1/pending-credits/fetch",{headers: { useAuth: true, useRefreshToken: true }})
}

