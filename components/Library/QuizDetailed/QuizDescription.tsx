import React from 'react';
import { View, Text } from 'react-native';

export function QuizDescription({ description }: { description: string }) {
    return (
        <View className="mb-8 flex-1">
            <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</Text>
            <Text className="text-lg text-gray-600 dark:text-gray-400 leading-8 tracking-wide">
                {description}
            </Text>
        </View>
    );
}
