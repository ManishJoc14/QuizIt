import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function LibraryHeader() {
    const { theme } = useTheme();
    const router = useRouter();
    return (
        <View className=" flex-row justify-between items-center mb-8 mt-2">
            <Pressable onPress={() => router.push('/')} className="flex-row items-center">
                <IconSymbol name="square.grid.2x2.fill" size={28} color={theme === "dark" ? "#6B7280" : "#111827"} />
                <Text className="text-2xl ml-2 tracking-wider font-bold text-gray-900 dark:text-white">
                    Library
                </Text>
            </Pressable>
        </View>
    );
}
