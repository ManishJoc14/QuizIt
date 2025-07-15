import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import AuthGuard from '@/components/AuthGuard';

export default function QuizDetailedLayout() {
    return (
        <AuthGuard>
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false,

                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="invite" />
                    <Stack.Screen name="waiting" />
                    <Stack.Screen name="quiz" />
                    <Stack.Screen name="result" />
                    <Stack.Screen name="scoreboard" />
                </Stack>
                <StatusBar style="auto" />
            </View>
        </AuthGuard>
    );
}
