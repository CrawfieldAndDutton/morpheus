import httpClient from "@/apis/axiosSetup";
import { PanPayload, PanResponse, VehiclePayload, VehicleResponse } from "@/apis/apiTypes";

export const verifyApi = {
  pan: (data: PanPayload) =>

    httpClient.post<PanResponse>("/api/v1/pan/verify", data, {headers: { useAuth: true, useRefreshToken: true }}),


  vehicle: (data: VehiclePayload) =>
    httpClient.post<VehicleResponse>("/api/v1/rc/verify", data),
};


