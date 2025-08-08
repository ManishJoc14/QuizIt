import { useRouter, useLocalSearchParams, Href } from 'expo-router';

import Toast from 'react-native-toast-message';

import { VerifyEmailRequest } from '@/types/auth.types';
import { useVerifyEmailMutation } from '@/services/authApi';

export function useVerifyEmail() {
    const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();
    const router = useRouter();
    const { email, next } = useLocalSearchParams<{ email?: string; next?: string }>();

    const verify = async (token: string) => {
        if (!email || !next) throw new Error('Missing email or next path');

        // console.log('Verifying email:', email);
        // console.log('Using token:', token);
        
        const payload: VerifyEmailRequest = { email, token };

        try {
            await verifyEmail(payload).unwrap();
            // console.log('Verified Now, Redirecting to:', next);
            Toast.show({
                type: 'success',
                text1: 'Email verified successfully',
                text2: 'You can now sign in with your account.',
            });
            router.replace(String(next) as Href);
        } catch (err) {
            console.log('Verification failed:', err);
        }
    };

    return { verify, isLoading, error };
}
