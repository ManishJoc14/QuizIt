import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { RootState } from '@/utils/libs/store';

export default function AuthLayout() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    if (isAuthenticated) return <Redirect href="/(tabs)" />;

    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="signin" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="forgetpassword" />
                <Stack.Screen name="resetpassword" />
                <Stack.Screen name="verify" />
                <Stack.Screen name="redirect" />

            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
