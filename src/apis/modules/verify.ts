import httpClient from "@/apis/axiosSetup";
import { PanPayload, PanResponse, VehiclePayload, VehicleResponse } from "@/apis/apiTypes";

export const verifyApi = {
  pan: (data: PanPayload) =>
    httpClient.post<PanResponse>("/verify-pan", data),

  vehicle: (data: VehiclePayload) =>
    httpClient.post<VehicleResponse>("/verify/vehicle", data),


};


