import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface HelpCenterTabsProps {
    activeTab: string;
    onChange: (tab: string) => void;
}

export function HelpCenterTabs({ activeTab, onChange }: HelpCenterTabsProps) {
    const tabs = ['FAQ', 'Contact Us'];

    return (
        <View className="flex-row bg-gray-200 dark:bg-gray-700 rounded-xl p-1 mx-4 mb-6">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const tabBg = isActive ? 'bg-white dark:bg-gray-900' : 'bg-transparent';
                const textColor = isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300';

                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onChange(tab)}
                        className={`flex-1 items-center justify-center py-2 rounded-lg ${tabBg}`}
                    >
                        <Text className={`text-base font-medium ${textColor}`}>{tab}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
