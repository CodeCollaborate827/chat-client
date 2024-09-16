import { APIResponse } from "src/app/shared/models/api-response.model";

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse extends APIResponse<{
  accessToken: string;
  refreshToken: string;
}> {
  requestId?: string
}