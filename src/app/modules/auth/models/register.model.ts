export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword?: string;
    username?: string;
    displayName?: string;
    avatar?: string;
    dateOfBirth?: string;
    city?: string;
    gender?: string;
}

export interface RegisterResponse {
    
}
