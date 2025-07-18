import React from 'react';
import { View, Text } from 'react-native';
import { ProfileMetaData } from './types';

export function ProfileMeta({ quizzes, played, players, rank, followers, following }: ProfileMetaData) {
    return (
        <>
            <View className="flex-row justify-between border-t py-6 border-gray-200 dark:border-gray-700 mb-0">
                <View className="items-center flex-1">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{quizzes}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Quizzes</Text>
                </View>
                <View className="items-center flex-1 border-l border-r border-gray-200 dark:border-gray-700">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{played}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Played</Text>
                </View>
                <View className="items-center flex-1">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{players}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Players</Text>
                </View>
            </View>
            <View className="flex-row justify-between border-t border-b py-6 border-gray-200 dark:border-gray-700 mb-8">
                <View className="items-center flex-1">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{rank}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Rank</Text>
                </View>
                <View className="items-center flex-1 border-l border-r border-gray-200 dark:border-gray-700">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{followers}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Followers</Text>
                </View>
                <View className="items-center flex-1">
                    <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">{following}</Text>
                    <Text className="text-base tracking-wide text-gray-500">Following</Text>
                </View>
            </View>
        </>
    );
}
