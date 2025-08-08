import { useEffect } from 'react';

import { Href, useLocalSearchParams, useRouter } from 'expo-router';

import Toast from 'react-native-toast-message';

import { SignInRequest } from '@/types/auth.types';
import { useAppDispatch } from '@/utils/libs/reduxHooks';
import { setCredentials } from '@/features/auth/authSlice';
import { getToken, saveToken } from '@/utils/libs/secureStorage';
import { useLazyGetMeQuery, useSignInMutation } from '@/services/authApi';

import { useRenewVerifyEmail } from './useRenewVerifyEmail';

export function useSignIn() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [getMe] = useLazyGetMeQuery();
    const { next } = useLocalSearchParams();
    const { renewToken } = useRenewVerifyEmail();
    const nextPath = Array.isArray(next) ? next[0] : next;
    const [login, { isLoading, error }] = useSignInMutation();

    // Auto login using access token
    useEffect(() => {
        const checkUserSession = async () => {
            const accessToken = await getToken('accessToken');
            if (!accessToken) return;

            try {
                const res = await getMe().unwrap();
                dispatch(setCredentials(res));
                if (nextPath) {
                    router.replace(String(nextPath) as Href);
                } else {
                    router.replace('/(tabs)'); // fallback
                }
            } catch (err) {
                console.error('Auto login failed:', err);
            }
        };

        checkUserSession();
    }, [dispatch, getMe, router, nextPath]);

    const signIn = async (data: SignInRequest) => {
        // console.log('Signing in with data:', data);
        try {
            const res = await login(data).unwrap();
            dispatch(setCredentials(res));
            // console.log('Login successful:', res);
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
            console.error('Login failed:', err);
            if ((err as any)?.data?.detail?.includes('Please Verify Your Email')) {
                // console.log('Email not verified, renewing verification token.');
                await renewToken({ email: data.email });
                Toast.show({
                    type: 'info',
                    text1: 'Please verify your email',
                    text2: 'A verification token has been sent to your email address.',
                });
                router.push({ pathname: '/verify', params: { email: data.email, next: '/signin' } });
            }
        }
    };

    return { signIn, isLoading, error };
}
