import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';

import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { saveToken } from '@/utils/libs/secureStorage';
import { setCredentials } from '@/features/auth/authSlice';
import { useLazyGetMeQuery } from '@/services/authApi';

export default function Redirect() {
    const { refresh_token } = useLocalSearchParams<{ refresh_token?: string }>();
    const dispatch = useDispatch();
    const [triggerGetMe] = useLazyGetMeQuery();

    useEffect(() => {

        console.log('Redirect component mounted with refresh_token:', refresh_token);

        const handleRedirect = async () => {
            try {
                if (!refresh_token) {
                    Toast.show({
                        type: 'error',
                        text1: 'Missing token',
                        text2: 'No refresh token found in URL.',
                    });
                    return;
                }

                // Store refresh token
                await saveToken('refreshToken', refresh_token);

                // Call getMe API
                const res = await triggerGetMe().unwrap();

                // Save access token & dispatch user credentials
                await saveToken('accessToken', res.accessToken);
                dispatch(setCredentials(res));
                await saveToken('isGoogleSignIn', 'true');

                Toast.show({
                    type: 'success',
                    text1: 'Login successful',
                    text2: 'Welcome back to QuizIt!',
                });

                router.replace('/(tabs)');
            } catch (err) {
                console.error('Redirect error:', err);
                Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: 'Unable to complete login.',
                });
            }
        };

        handleRedirect();
    }, [refresh_token, triggerGetMe, dispatch]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
