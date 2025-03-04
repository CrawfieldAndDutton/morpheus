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
  txn_id: string;
  pan: string;
  status: string;
  message: string;
  status_code: number,
  result: {
    pan_status: string;
    pan_type: string;
    pan: string,
    full_name: string;
  }
  raw_response: object;
}

export interface VehiclePayload{
  reg_no: string;
}

export interface VehicleResponse{
  status: string;
  reg_no: string;
  state: string;
  owner_name: string;
  vehicle_manufacturer: string;
  model: string;
  registration_date: string;
  registration_valid_upto: string;
  insurance_valid_upto: string;
  pucc_valid_upto: string;
  raw_response:  object;
  message: string;
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
