import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function NotificationHeader() {
    const { theme } = useTheme();
    const iconColor = theme === 'dark' ? '#F9FAFB' : '#111827';

    return (
        <View className="px-4 mb-6 pt-safe-offset-4 mt-2">
            <Link href="/settings" asChild>
                <TouchableOpacity className='flex-row items-center'>
                    <IconSymbol name="chevron.left" size={28} color={iconColor} />
                    <Text className="text-gray-900 dark:text-gray-50 text-2xl font-medium ml-2">Notification</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}