export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    resetPasswordToken: string;
    newPassword: string;
}