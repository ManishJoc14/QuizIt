import React from 'react';
import { View, Text } from 'react-native';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <View className="mb-8">
            <Text className="text-gray-500 dark:text-gray-100 text-sm tracking-wider font-semibold uppercase mb-3 ml-4">
                {title}
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                {children}
            </View>
        </View>
    );
}
