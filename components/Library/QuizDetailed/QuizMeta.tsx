import React from 'react';
import { View, Text } from 'react-native';

export function QuizMeta({ questions, played, favorited }: {
    questions: number;
    played: number;
    favorited: number;
}) {
    return (
        <View className="flex-row flex-1 web:order-2 justify-between border-t border-b py-6 border-gray-200 dark:border-gray-700 mb-8">
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
