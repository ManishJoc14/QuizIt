import { User } from "./shared.types";

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

export type SignInResponse = {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
};

export type VerifyEmailRequest = {
    email: string;
    token: string;
};

export type VerifyEmailResponse = {
    message: string;
};

export type RefreshTokenRequestQuery = {
    refreshToken: string;
};

export type RefreshTokenResponse = {
    accessToken: string;
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