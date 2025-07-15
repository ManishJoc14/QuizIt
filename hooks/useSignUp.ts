import { useRouter } from 'expo-router';

import { SignupRequest } from '@/types/auth.types';
import { useSignupMutation } from '@/services/authApi';
import { useRenewVerifyEmail } from './useRenewVerifyEmail';

export function useSignUp() {
    const [signup, { isLoading, error }] = useSignupMutation();
    const { renewToken } = useRenewVerifyEmail();
    const router = useRouter();

    const register = async (data: SignupRequest) => {
        console.log('Registering user with data:', data);

        try {
            await signup(data).unwrap();
            console.log('Signup successful. Redirecting to verify email:', data.email);
            router.push({ pathname: '/verify', params: { email: data.email, next: '/signin' } });
        } catch (err) {
            console.error('Signup failed:', err);
            if (
                (err as any)?.data?.detail === '409: Email or Username already exist'
            ) {
                await renewToken();
                router.push({ pathname: '/verify', params: { email: data.email, next: '/signin' } });
            }
        }
    };

    return { register, isLoading, error };
}
