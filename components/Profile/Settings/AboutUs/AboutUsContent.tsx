import React from 'react';

import { View, Text, Image } from 'react-native';

export function AboutUsContent() {
    return (
        <View className="px-4 mb-6">
            {/* App Icon and Version */}
            <View className="items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <Image
                    source={require('@/assets/images/icon.png')}
                    className="w-24 h-24 mb-2"
                    resizeMode="contain"
                />
                <Text className="text-gray-900 dark:text-gray-50 text-2xl font-bold mt-2">QuizIt v1.0.0</Text>
            </View>

            {/* Introduction */}
            <Text className="text-gray-900 dark:text-gray-50 text-xl font-semibold mb-3">Introduction</Text>
            <Text className="text-gray-700 dark:text-gray-300 text-base leading-6 mb-6">
                {`We're`} a community-driven quiz platform where curiosity meets competition.
                Whether {`you're`} a student, teacher, or trivia lover — we help you learn, test, and grow
                through fun and interactive quizzes.
            </Text>

            {/* Our Story */}
            <Text className="text-gray-900 dark:text-gray-50 text-xl font-semibold mb-3">Our Story</Text>
            <Text className="text-gray-700 dark:text-gray-300 text-base leading-6 mb-6">
                This platform began as a DBMS project assigned by our sir.
                What started as a classroom task turned into a fun, interactive quiz system built to make learning engaging and competitive.
            </Text>

            {/* Our Mission */}
            <Text className="text-gray-900 dark:text-gray-50 text-xl font-semibold mb-3">Our Mission</Text>
            <Text className="text-gray-700 dark:text-gray-300 text-base leading-6 mb-6">
                To make learning fun, accessible, and rewarding through the power of interactive quizzes and
                community-driven knowledge.
            </Text>
        </View>
    );
}
