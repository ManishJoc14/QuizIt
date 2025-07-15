import { useLocalSearchParams } from 'expo-router';

import { RenewVerifyEmailRequest } from '@/types/auth.types';
import { useRenewVerifyEmailMutation } from '@/services/authApi';

export function useRenewVerifyEmail() {
    const [renew, { isLoading, error }] = useRenewVerifyEmailMutation();
    const { email } = useLocalSearchParams<{ email?: string }>();

    const renewToken = async () => {
        if (!email) throw new Error('Email is required to renew verification token.');

        const payload: RenewVerifyEmailRequest = { email };
        console.log('Renewing verification token for email:', email);

        try {
            await renew(payload).unwrap();
        } catch (err) {
            console.error('Resend verification email failed:', err);
        }
    };

    return { renewToken, isLoading, error };
}
