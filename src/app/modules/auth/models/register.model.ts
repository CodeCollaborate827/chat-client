export interface UserRegister {
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
    displayName?: string;
    avatar?: string;
    dateOfBirth?: string;
    city?: string;
}

export interface UserLogin {
    email?: string;
    password?: string;
}