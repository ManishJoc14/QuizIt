import { useRouter } from 'expo-router';

import { useDispatch } from 'react-redux';

import { SignInRequest } from '@/types/auth.types';
import { saveToken } from '@/utils/libs/secureStorage';
import { setCredentials } from '@/features/auth/authSlice';
import { useSignInMutation } from '@/services/authApi';

export function useSignIn() {
    const [login, { isLoading, error }] = useSignInMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const signIn = async (data: SignInRequest) => {
        console.log('Signing in with data:', data);
        try {
            const res = await login(data).unwrap();
            dispatch(setCredentials(res));
            console.log('Login successful:', res);
            await saveToken('accessToken', res.token.accessToken);
            await saveToken('refreshToken', res.token.refreshToken);
            console.log('Login successful. Redirecting to home.');
            router.replace('/(tabs)');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return { signIn, isLoading, error };
}
