import { RenewVerifyEmailRequest } from '@/types/auth.types';
import { useRenewVerifyEmailMutation } from '@/services/authApi';
import Toast from 'react-native-toast-message';

export function useRenewVerifyEmail() {
    const [renew, { isLoading, error }] = useRenewVerifyEmailMutation();

    const renewToken = async ({ email }: { email: string }) => {
        if (!email) throw new Error('Email is required to renew verification token.');

        const payload: RenewVerifyEmailRequest = { email };
        // console.log('Renewing verification token for email:', email);

        try {
            await renew(payload).unwrap();
            // console.log('Verification email resent successfully.');
            Toast.show({
                type: 'success',
                text1: 'Verification token sent',
                text2: 'Please check your inbox to verify your email.',
            });
        } catch (err) {
            console.log('Resend verification email failed:', err);
        }
    };

    return { renewToken, isLoading, error };
}
