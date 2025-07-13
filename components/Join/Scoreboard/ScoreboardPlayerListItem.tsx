import React from 'react';
import { Image, Text, View } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { Summary } from '../types';

export function PlayerListItem({ name, image, rank, totalPoints }: Summary) {
    return (
        <View className="flex-row items-center justify-between bg-white dark:bg-gray-800 px-1 py-2 mb-3 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
                <Text className="text-gray-900 dark:text-gray-100 font-semibold text-lg w-8 text-center">{rank}.</Text>
                <Image source={{ uri: image ? image : getRandomPersonsImage() }} className="w-14 h-14 rounded-full ml-2" />
                <Text className="text-gray-900 dark:text-gray-100 font-medium text-lg ml-3 w-40"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{name}</Text>
            </View>
            <Text className=" text-violet-800 dark:text-violet-300 font-semibold text-lg mr-2">{totalPoints} 🏆</Text>
        </View>
    );
}
