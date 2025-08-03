import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

const tabs = ['My quizzes'];

export function LibraryTabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
    return (
        <View className="flex-row gap-8 border-b border-gray-200 dark:border-gray-700 mb-6">
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => onChange(tab)}
                    className={`pb-2 px-2 ${activeTab === tab ? 'border-b-4 border-indigo-600' : ''}`}
                >
                    <Text
                        className={`text-lg ${activeTab === tab
                            ? 'text-indigo-600 font-semibold'
                            : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
