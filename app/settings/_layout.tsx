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
                <Stack.Screen name="feedback" />
                <Stack.Screen name="helpcenter" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
