import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

export default function SettingsLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="personalinfo" />
                <Stack.Screen name="notification" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
