import { APIResponse } from "src/app/shared/models";

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