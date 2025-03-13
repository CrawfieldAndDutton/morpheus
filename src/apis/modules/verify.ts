import httpClient from "@/apis/axiosSetup";
import { PanPayload, PanResponse, VehiclePayload, VehicleResponse, VoterPayload, VoterResponse, PassportPayload, PassportResponse, DlPayload, DlResponse, AadhaarPayload, AadhaarResponse  } from "@/apis/apiTypes";

export const verifyApi = {
  pan: (data: PanPayload) =>
    httpClient.post<PanResponse>("/dashboard/api/v1/pan/verify", data, {headers: { useAuth: true, }}),


  vehicle: (data: VehiclePayload) =>
    httpClient.post<VehicleResponse>("/dashboard/api/v1/rc/verify", data, {headers: { useAuth: true,}}),

  voter: (data: VoterPayload) =>
    httpClient.post<VoterResponse>("/dashboard/api/v1/voter/verify", data, {headers: { useAuth: true, }}),

  passport: (data: PassportPayload) =>
    httpClient.post<PassportResponse>("/dashboard/api/v1/passport/verify", data, {headers: { useAuth: true,  }}),

  dl: (data: DlPayload) =>
    httpClient.post<DlResponse>("/dashboard/api/v1/dl/verify", data, {headers: { useAuth: true,}}),

  aadhaar: (data: AadhaarPayload) =>
    httpClient.post<AadhaarResponse>("/dashboard/api/v1/aadhaar/verify", data, {headers: { useAuth: true, }}),

};


