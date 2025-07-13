import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

interface SettingsListItemProps {
    iconName: IconSymbolName;
    title: string;
    onPress?: () => void;
    rightContent?: 'arrow' | 'toggle' | React.ReactNode;
    isLastItem?: boolean;
    iconBgColor?: string;
    iconColorLight?: string; // Custom light mode hex color for the icon
    iconColorDark?: string;  // Custom dark mode hex color for the icon
    onToggle?: (newValue: boolean) => void; // For toggle type
    toggleValue?: boolean; // For toggle type
}

export function SettingsListItem({
    iconName,
    title,
    onPress,
    rightContent = 'arrow',
    isLastItem = false,
    iconBgColor = 'bg-gray-200 dark:bg-gray-800',
    iconColorLight = '#111827', // Default light mode icon color (black)
    iconColorDark = '#6B7280',  // Default dark mode icon color (gray)
    onToggle,
    toggleValue,
}: SettingsListItemProps) {
    const { theme } = useTheme(); // Get current theme for dynamic colors

    // Other icon color
    const currentIconColor = theme === 'dark' ? iconColorDark : iconColorLight;

    // Arrow icon color
    const arrowIconColor = theme === 'dark' ? '#D1D5DB' : '#6B7280'; // Lighter gray for dark, darker gray for light

    return (
        <Pressable
            onPress={onPress}
            className={`flex-row items-center justify-between px-4 py-5 ${!isLastItem ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
        >
            {/* Left section: Icon and Title */}
            <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${iconBgColor}`}>
                    <IconSymbol name={iconName} size={20} color={currentIconColor} />
                </View>
                <Text className="text-gray-700 dark:text-gray-100 text-base font-medium tracking-wide">{title}</Text>
            </View>

            {/* Right section: Arrow, Toggle, or Custom Content */}
            {rightContent === 'arrow' && (
                <IconSymbol name="chevron.right" size={20} color={arrowIconColor} />
            )}

            {rightContent === 'toggle' && (
                <Pressable
                    onPress={() => onToggle && onToggle(!toggleValue)}
                    className={`w-12 h-7 rounded-full p-1 justify-center ${toggleValue ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <View className={`w-5 h-5 rounded-full bg-white shadow-md ${toggleValue ? 'self-end' : 'self-start'}`} />
                </Pressable>
            )}

            {typeof rightContent !== 'string' && (
                rightContent
            )}
        </Pressable>
    );
}
