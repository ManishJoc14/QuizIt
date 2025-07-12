import React from 'react';

import { View, Text, Image } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { getImageBorderColor, getRankColor } from '@/utils/functions/getRankColor';
import { Summary } from '../types';

export function ResultSummary({ name, image, rank, totalPoints }: Summary) {
    return (
        <View className="items-center mb-4 bg-violet-800">
            {/* Profile Image + Rank Badge */}
            <View className="relative">
                <Image
                    source={{ uri: image ? image : getRandomPersonsImage() }}
                    className={`w-32 h-32 rounded-full border-4 ${getImageBorderColor(rank)}`}
                />
                <View
                    className={`absolute -top-2 -right-2 ${getRankColor(
                        rank
                    )} h-10 w-10 items-center justify-center rounded-full border-2`}
                >
                    <Text className="text-white text-lg font-bold">{rank}</Text>
                </View>
            </View>

            {/* Name */}
            <Text className="mt-2 text-white font-semibold text-3xl">
                {name}
            </Text>

            {/* Total Points */}
            <View className="bg-white border border-gray-300 px-5 py-2 rounded-full mt-3">
                <Text className="text-indigo-500 font-medium text-xl">
                    {totalPoints} 🏆
                </Text>
            </View>
        </View>
    );
}
