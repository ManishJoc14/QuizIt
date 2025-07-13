import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function ProfileHeader() {
    const { theme } = useTheme();
    return (
        <View className=" flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
                <IconSymbol name="person.fill" size={28} color={theme === "dark" ? "#6B7280" : "#111827"} />
                <Text className="text-2xl ml-2 tracking-wider font-bold text-gray-900 dark:text-white">
                    Profile
                </Text>
            </View>
            <TouchableOpacity>
                <IconSymbol name="gear" size={28} color="#6B7280" />
            </TouchableOpacity>
        </View>
    );
}
