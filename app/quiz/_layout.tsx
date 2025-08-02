import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import AuthGuard from '@/components/AuthGuard';
import { SocketProvider } from '@/context/WebSocketContext';

export default function QuizLayout() {
    return (
        <AuthGuard>
            <SocketProvider>
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
            </SocketProvider>
        </AuthGuard>
    );
}
