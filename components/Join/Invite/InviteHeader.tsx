import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function InviteHeader() {
    const { theme } = useTheme();
    const router = useRouter();
    return (
        <View className='flex-row items-center justify-between mb-6'>
            <TouchableOpacity onPress={() => router.back()}>
                <View className='flex-row items-center gap-2'>
                    <IconSymbol
                        name="chevron.left"
                        size={28}
                        color={theme === 'dark' ? '#6B7280' : '#111827'}
                    />
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                        Library
                    </Text>
                </View>
            </TouchableOpacity>
            <View>
                <TouchableOpacity>
                    <IconSymbol
                        name="magnifyingglass"
                        size={28}
                        color={theme === 'dark' ? '#6B7280' : '#111827'}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
}
