import React from 'react';

import { Pressable, Text } from 'react-native';

import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function JoinHeader() {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <Pressable onPress={() => router.push('/')} className="flex-row items-center mb-80 mt-2">
            <IconSymbol name="gamecontroller" size={20} color={theme === "dark" ? "#6B7280" : "#111827"} />
            <Text className="ml-2 text-2xl tracking-wide font-semibold text-gray-900 dark:text-white">
                Join
            </Text>
        </Pressable>
    );
}
