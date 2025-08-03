import { useRouter } from 'expo-router';

import { SignupRequest } from '@/types/auth.types';
import { useSignupMutation } from '@/services/authApi';
import { useRenewVerifyEmail } from '@/hooks/auth/useRenewVerifyEmail';
import Toast from 'react-native-toast-message';

export function useSignUp() {
    const [signup, { isLoading, error }] = useSignupMutation();
    const { renewToken } = useRenewVerifyEmail();
    const router = useRouter();

    const register = async (data: SignupRequest) => {
        // console.log('Registering user with data:', data);

        try {
            await signup(data).unwrap();
            // console.log('Signup successful. Redirecting to verify email:', data.email);
            Toast.show({
                type: 'success',
                text1: 'Signup successful',
                text2: 'Please verify your email to complete registration.',
            });
            router.push({ pathname: '/verify', params: { email: data.email, next: '/signin' } });
        } catch (err) {
            console.log('Signup failed:', err);
            if (
                (err as any)?.data?.detail?.includes('Email or Username already exist')
            ) {
                await renewToken({ email: data.email });
                // console.log('Email already exists, renewing verification token.');
                Toast.show({
                    type: 'info',
                    text1: 'Please verify your email',
                    text2: 'A verification token has been sent to your email address.',
                });
                router.push({ pathname: '/verify', params: { email: data.email, next: '/signin' } });
            }
        }
    };

    return { register, isLoading, error };
}
