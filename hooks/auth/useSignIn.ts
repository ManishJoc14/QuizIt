import { useEffect } from 'react';

import { useRouter } from 'expo-router';

import Toast from 'react-native-toast-message';

import { SignInRequest } from '@/types/auth.types';
import { getToken, saveToken } from '@/utils/libs/secureStorage';
import { setCredentials } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/utils/libs/reduxHooks';
import { useLazyGetMeQuery, useSignInMutation } from '@/services/authApi';

export function useSignIn() {
    const [login, { isLoading, error }] = useSignInMutation();
    const dispatch = useAppDispatch();
    const [getMe] = useLazyGetMeQuery();
    const router = useRouter();

    // Auto login using access token
    useEffect(() => {
        const checkUserSession = async () => {
            const accessToken = await getToken('accessToken');
            if (!accessToken) return;

            try {
                const res = await getMe().unwrap();
                dispatch(setCredentials(res));
                router.replace('/(tabs)');
            } catch (err) {
                console.log('Auto login failed:', err);
            }
        };

        checkUserSession();
    }, [dispatch, getMe, router]);

    const signIn = async (data: SignInRequest) => {
        console.log('Signing in with data:', data);
        try {
            const res = await login(data).unwrap();
            dispatch(setCredentials(res));
            console.log('Login successful:', res);
            await saveToken('accessToken', res.accessToken);
            await saveToken('refreshToken', res.refreshToken);
            // console.log('Login successful. Redirecting to home.');
            Toast.show({
                type: 'success',
                text1: 'Login successful',
                text2: 'Welcome back to QuizIt!',
            })
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Login failed:', err);
        }
    };

    return { signIn, isLoading, error };
}
