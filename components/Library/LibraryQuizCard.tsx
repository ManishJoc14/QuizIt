import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';

import { ILibraryQuiz } from './types';

export function LibraryQuizCard({
    quiz,
}: {
    quiz: ILibraryQuiz
}) {
    const router = useRouter();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            key={quiz.id}
            onPress={() => router.push({ pathname: '/quiz/[id]', params: { id: String(quiz.id) } })}
            className="flex-row mb-4 overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
            <Image
                source={{ uri: quiz.image }}
                className="w-40 h-full mr-1"
                resizeMode="cover"
            />
            <View className="flex-1 px-2 py-4">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-0.5" numberOfLines={2}>
                    {quiz.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4" numberOfLines={1}>
                    {quiz.description}
                </Text>
                <View className="flex-row items-center space-x-1">
                    <Image
                        source={{ uri: getRandomPersonsImage() }}
                        className="w-6 h-6 rounded-full mx-1"
                    />
                    <Text numberOfLines={1} className="text-sm text-gray-500 dark:text-gray-300 max-w-[60px]">{quiz.author}</Text>
                    <Text className="text-sm text-gray-500 mx-2">•</Text>
                    <Text className="text-sm text-gray-500">{quiz.date}</Text>
                    <Text className="text-sm text-gray-500 mx-2">•</Text>
                    <Text className="text-sm text-gray-500">{quiz.count}</Text>
                </View>
            </View>
            <View className="bg-indigo-600 absolute bottom-2 left-20 px-2 py-1 rounded-lg ml-2">
                <Text className="text-xs text-white font-semibold">{quiz.plays} Plays</Text>
            </View>
        </TouchableOpacity>
    );
}
