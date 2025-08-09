import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function SettingsHeader() {
    const { theme } = useTheme();
    return (
        <View className="px-4 mb-6 pt-safe-offset-4 mt-2">
            <Link href="/" asChild>
                <TouchableOpacity className='flex-row items-center'>
                    <IconSymbol name="chevron.left" size={28}
                        color={theme === 'dark' ? '#6B7280' : '#111827'}
                    />
                    <Text className="text-gray-900 dark:text-white text-2xl font-medium ml-2">Settings</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}
