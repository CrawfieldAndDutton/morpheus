import Register from "../pages/Register";
export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
}

export interface LogoutPayload {
  refresh_token: string;

}

export interface RegisterPayload {
  email: string;
  username: string;
  is_active: boolean;
  role: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  username: string;
  is_active: boolean;
  role: string;
  first_name: string;
  last_name: string;
  _id: string;
  created_at: string;
  updated_at: string;
}
 

export interface PanPayload{
  pan: string;
}

export interface PanResponse{
 http_status_code: number,
  message: string;
  result: object;
}

export interface VehiclePayload{
  reg_no: string;
}

export interface VehicleResponse{
  http_status_code: number,
  message: string;
  result: object;
}


export interface ErrorResponse {
  detail: [
    {
      loc: [string, 0];
      msg: string;
      type: string;
    }
  ];
}
