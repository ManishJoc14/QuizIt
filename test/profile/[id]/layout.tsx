import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

export default function ProofileIDLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,

                }}
            >
                <Stack.Screen name="index" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
