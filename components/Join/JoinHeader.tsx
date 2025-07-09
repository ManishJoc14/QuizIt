import React from 'react';
import { View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function JoinHeader() {
    const { theme } = useTheme();

    return (
        <View className="flex-row items-center mb-96">
            <IconSymbol name="gamecontroller" size={22} color={theme === "dark" ? "#6B7280" : "#111827"} />
            <Text className="ml-2 text-2xl tracking-wide font-semibold text-gray-900 dark:text-white">
                Join
            </Text>
        </View>
    );
}
