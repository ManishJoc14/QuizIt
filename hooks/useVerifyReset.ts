import { useRouter, useLocalSearchParams, Href } from 'expo-router';

import { VerifyForgetPasswordRequest } from '@/types/auth.types';
import { useVerifyForgetPasswordMutation } from '@/services/authApi';

export function useVerifyResetToken() {
    const [verifyToken, { isLoading, error }] = useVerifyForgetPasswordMutation();
    const router = useRouter();
    const { email, next } = useLocalSearchParams<{ email?: string; next?: string }>();

    const verify = async (token: string) => {
        if (!email || !next) throw new Error('Missing email or next path');
        const payload: VerifyForgetPasswordRequest = { email, token };

        console.log('Verifying reset token for email:', email);
        console.log('Using token:', token);

        try {
            await verifyToken(payload).unwrap();
            console.log('Reset token verified successfully. Redirecting to:', next);
            router.push({ pathname: next, params: { email } } as Href);
        } catch (err) {
            console.error('Reset token verification failed:', err);
        }
    };

    return { verify, isLoading, error };
}
