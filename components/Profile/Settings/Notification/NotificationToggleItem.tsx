import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface NotificationToggleItemProps {
    title: string;
    isEnabled: boolean;
    onToggle: (newValue: boolean) => void;
    isLastItem?: boolean;
}

export function NotificationToggleItem({
    title,
    isEnabled,
    onToggle,
    isLastItem = false,
}: NotificationToggleItemProps) {
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

    return (
        <Pressable
            onPress={() => onToggle(!isEnabled)}
            className={`flex-row items-center justify-between px-4 py-5 ${!isLastItem ? `border-b ${borderColor}` : ''}`}
        >
            <Text className={`text-base font-medium tracking-wide ${textColor}`}>{title}</Text>
            <Pressable
                onPress={() => onToggle(!isEnabled)}
                className={`w-12 h-7 rounded-full p-1 justify-center ${isEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
                <View className={`w-5 h-5 rounded-full bg-white shadow-md ${isEnabled ? 'self-end' : 'self-start'}`} />
            </Pressable>
        </Pressable>
    );
}