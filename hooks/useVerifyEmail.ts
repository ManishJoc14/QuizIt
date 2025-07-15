import { useRouter, useLocalSearchParams, Href } from 'expo-router';

import { VerifyEmailRequest } from '@/types/auth.types';
import { useVerifyEmailMutation } from '@/services/authApi';

export function useVerifyEmail() {
    const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();
    const router = useRouter();
    const { email, next } = useLocalSearchParams<{ email?: string; next?: string }>();

    const verify = async (token: string) => {
        if (!email || !next) throw new Error('Missing email or next path');

        console.log('Verifying email:', email);
        console.log('Using token:', token);
        
        const payload: VerifyEmailRequest = { email, token };

        try {
            await verifyEmail(payload).unwrap();
            console.log('Verified Now, Redirecting to:', next);
            router.replace(String(next) as Href);
        } catch (err) {
            console.error('Verification failed:', err);
        }
    };

    return { verify, isLoading, error };
}
