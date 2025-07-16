import { useRouter } from 'expo-router';

import { ForgetPasswordRequest } from '@/types/auth.types';
import { useForgetPasswordMutation } from '@/services/authApi';
import Toast from 'react-native-toast-message';

export function useForgotPassword() {
    const [forgot, { isLoading, error }] = useForgetPasswordMutation();
    const router = useRouter();

    const requestReset = async (email: string) => {
        if (!email) throw new Error('Email is required for password reset.');

        const payload: ForgetPasswordRequest = { email };
        try {
            await forgot(payload).unwrap();
            // console.log('Forgot password request sent for email:', email);
            Toast.show({
                type: 'success',
                text1: 'Reset code sent',
                text2: 'Please check your email to reset your password.',
            });
            router.push({ pathname: '/verify', params: { email, next: '/resetpassword' } });
        } catch (err) {
            console.log('Forgot password failed:', err);
        }
    };

    return { requestReset, isLoading, error };
}
