import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="login" />
            </Stack>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
