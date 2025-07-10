import { View } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

export default function QuizDetailedLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,

                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="invite" />
                <Stack.Screen name="waiting" />
                <Stack.Screen name="start" />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
