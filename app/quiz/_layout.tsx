import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import AuthGuard from '@/components/AuthGuard';

export default function QuizLayout() {
    return (
        <AuthGuard>
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="[id]" />
                </Stack>
                <StatusBar style="auto" />
            </View>
        </AuthGuard>
    );
}
