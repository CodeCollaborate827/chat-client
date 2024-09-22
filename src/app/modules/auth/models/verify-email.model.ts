import { APIResponse } from "src/app/shared";

export interface VerifyEmailRequest {
    email: string;
    verificationCode: string;
    type: string;
}

export interface VerifyEmailResponse extends APIResponse<VerifyAuthDataResponse> {
    
}

export interface ResendVerifyEmailRequest {
    email: string;
    type: string;
}

export interface ResendVerifyEmailResponse {

}

export interface VerifyResetPasswordRequest {
    email: string;
    verificationCode: string;
    type: string;
}

export interface VerifyResetPasswordResponse extends APIResponse<VerifyAuthDataResponse> {

}

export interface VerifyAuthDataResponse {
    type?: string;
    tokens?: {
        resetPasswordToken?: string;
    };
}