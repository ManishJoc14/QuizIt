import {
    SignupRequest,
    SignupResponse,
    SignInRequest,
    SignInResponse,
    RefreshTokenRequest,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ForgetPasswordRequest,
    VerifyForgetPasswordRequest,
    ResetPasswordRequest,
    RenewVerifyEmailRequest,
} from '@/types/auth.types';

import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<SignupResponse, SignupRequest>({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['User'],
        }),

        signIn: build.mutation<SignInResponse, SignInRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                // NOTE - Adjusting to match the expected API format 
                data: { username: body.email, password: body.password },
                meta: {
                    contentType: 'form',
                },
            }),
            invalidatesTags: ['User'],
        }),

        refreshToken: build.mutation<SignInResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: '/auth/renew-access',
                method: 'POST',
                data: body,
            }),
        }),

        verifyEmail: build.mutation<VerifyEmailResponse, VerifyEmailRequest>({
            query: (body) => ({
                url: '/auth/email-token-verify',
                method: 'POST',
                data: body,
            }),
        }),

        renewVerifyEmail: build.mutation<VerifyEmailResponse, RenewVerifyEmailRequest>({
            query: (body) => ({
                url: '/auth/renew-verify-email-token',
                method: 'POST',
                data: body,
            }),
        }),

        forgetPassword: build.mutation<VerifyEmailResponse, ForgetPasswordRequest>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                data: body,
            }),
        }),

        verifyForgetPassword: build.mutation<VerifyEmailResponse, VerifyForgetPasswordRequest>({
            query: (body) => ({
                url: '/auth/forgot-password-token',
                method: 'POST',
                data: body,
            }),
        }),

        resetPassword: build.mutation<VerifyEmailResponse, ResetPasswordRequest>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                data: body,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useSignInMutation,
    useRefreshTokenMutation,
    useVerifyEmailMutation,
    useRenewVerifyEmailMutation,
    useForgetPasswordMutation,
    useVerifyForgetPasswordMutation,
    useResetPasswordMutation,
} = authApi;
