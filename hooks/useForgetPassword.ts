import { useRouter } from 'expo-router';

import { ForgetPasswordRequest } from '@/types/auth.types';
import { useForgetPasswordMutation } from '@/services/authApi';

export function useForgotPassword() {
    const [forgot, { isLoading, error }] = useForgetPasswordMutation();
    const router = useRouter();

    const requestReset = async (email: string) => {
        if (!email) throw new Error('Email is required for password reset.');

        const payload: ForgetPasswordRequest = { email };
        try {
            await forgot(payload).unwrap();
            router.push({ pathname: '/verify', params: { email, next: '/resetpassword' } });
        } catch (err) {
            console.error('Forgot password failed:', err);
        }
    };

    return { requestReset, isLoading, error };
}
