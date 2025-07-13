import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

export default function HomeLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="authors" />
                <Stack.Screen name="discover" />
                <Stack.Screen name="trending" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
