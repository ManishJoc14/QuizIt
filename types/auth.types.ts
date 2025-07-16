export type User = {
    id: number;
    email: string;
    fullName: string;
    username: string;
}

export type SignupRequest = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    rePassword: string;
};

export type SignupResponse = {
    message: string;
};

export type SignInRequest = {
    email: string;
    password: string;
};

export type SignInResponse = RefreshTokenResponse & {
    message: string;
    user: User;
};

export type VerifyEmailRequest = {
    email: string;
    token: string;
};

export type VerifyEmailResponse = {
    message: string;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};

export type RefreshTokenResponse = {
    token: {
        accessToken: string;
        refreshToken: string;
    }
}

export type ForgetPasswordRequest = {
    email: string;
};

export type VerifyForgetPasswordRequest = {
    email: string;
    token: string;
};

export type ResetPasswordRequest = {
    email: string;
    password: string;
    rePassword: string;
};

export type RenewVerifyEmailRequest = {
    email: string;
};