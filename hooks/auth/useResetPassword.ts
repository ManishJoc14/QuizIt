import { useRouter, useLocalSearchParams } from 'expo-router';

import { ResetPasswordRequest } from '@/types/auth.types';
import { useResetPasswordMutation } from '@/services/authApi';
import Toast from 'react-native-toast-message';

export function useResetPassword() {
    const router = useRouter();
    const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
    const { email } = useLocalSearchParams<{ email?: string }>();

    const reset = async (password: string, rePassword: string) => {
        if (!email) throw new Error('Email is required from route params.');

        const payload: ResetPasswordRequest = {
            email,
            password,
            rePassword,
        };

        try {
            await resetPassword(payload).unwrap();
            router.replace('/signin');
            // console.log('Password reset successful. Redirecting to sign in.');
            Toast.show({
                type: 'success',
                text1: 'Password reset successful',
                text2: 'You can now sign in with your new password.',
            });
        } catch (err) {
            console.log('Reset password failed:', err);
        }
    };

    return { reset, isLoading, error };
}
