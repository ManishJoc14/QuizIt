import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { router } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function EditHeader() {
    const { theme } = useTheme();

    return (
        <View className=" flex-row justify-between items-center mb-8 mt-2">
            <Pressable className="flex-row items-center" onPress={() => router.back()}>
                <IconSymbol name="chevron.left" size={28} color={theme === "dark" ? "#6B7280" : "#111827"} />
                <Text className="text-2xl ml-2 tracking-wider font-bold text-gray-900 dark:text-white">
                    Edit
                </Text>
            </Pressable>
        </View>
    );
}
