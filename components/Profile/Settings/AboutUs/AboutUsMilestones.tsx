import React from 'react';
import { View, Text } from 'react-native';

interface AboutUsMilestonesProps {
    quizzes: string;
    plays: string;
    players: string;
}

export function AboutUsMilestones({ quizzes, plays, players }: AboutUsMilestonesProps) {
    return (
        <View className="flex-row justify-between border-t border-b py-6 border-gray-200 dark:border-gray-700 mx-4 mb-8">
            {/* Quizzes Stat */}
            <View className="items-center flex-1">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{quizzes}</Text>
                <Text className="text-base tracking-wide text-gray-500 dark:text-gray-400">Quizzes</Text>
            </View>
            {/* Plays Stat */}
            <View className="items-center flex-1 border-l border-r border-gray-200 dark:border-gray-700">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{plays}</Text>
                <Text className="text-base tracking-wide text-gray-500 dark:text-gray-400">Plays</Text>
            </View>
            {/* Players Stat */}
            <View className="items-center flex-1">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{players}</Text>
                <Text className="text-base tracking-wide text-gray-500 dark:text-gray-400">Players</Text>
            </View>
        </View>
    );
}
