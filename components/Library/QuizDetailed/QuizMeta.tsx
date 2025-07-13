import React from 'react';
import { View, Text } from 'react-native';

import { QuizData } from '@/components/Join/types';

export function QuizMeta({ questions, played, favorited }:  QuizData['meta']) {
    return (
        <View className="flex-row justify-between border-t border-b py-6 border-gray-200 dark:border-gray-700 mb-8">
            <View className="items-center flex-1">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{questions}</Text>
                <Text className="text-base tracking-wide text-gray-500">Questions</Text>
            </View>
            <View className="items-center flex-1 border-l border-r border-gray-200 dark:border-gray-700">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{played}</Text>
                <Text className="text-base tracking-wide text-gray-500">Played</Text>
            </View>
            <View className="items-center flex-1">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{favorited}</Text>
                <Text className="text-base tracking-wide text-gray-500">Favorited</Text>
            </View>
        </View>
    );
}
