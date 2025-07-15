import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import AuthGuard from '@/components/AuthGuard';

export default function SettingsLayout() {
    return (
        <AuthGuard>
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="personalinfo" />
                    <Stack.Screen name="notification" />
                    <Stack.Screen name="feedback" />
                    <Stack.Screen name="helpcenter" />
                </Stack>
                <StatusBar style="auto" />
            </View>
        </AuthGuard>
    );
}
