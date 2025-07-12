import React from 'react';
import { Image, Text, View } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { getImageBorderColor, getRankColor } from '@/utils/functions/getRankColor';
import { Summary } from '../types';

export function TopRankers({ players }: { players: Summary[] }) {
    // Sort players by rank to ensure correct display order (1st, 2nd, 3rd)
    const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);

    return (
        <View className="flex-row justify-center items-end mb-8 px-4 mt-2">
            {/* Player 2 (left) */}
            {sortedPlayers[1] && (
                <View className="items-center mx-2 transform -translate-y-4">
                    <View className="relative">
                        <Image source={{ uri: sortedPlayers[1].image ? sortedPlayers[1].image : getRandomPersonsImage() }}
                            className={`w-20 h-20 rounded-full border-2  ${getImageBorderColor(sortedPlayers[1].rank)}`} />
                        <View className={`absolute -top-2 -right-2 ${getRankColor(sortedPlayers[1].rank)} h-8 w-8 items-center justify-center rounded-full border-2`}>
                            <Text className="text-white text-sm font-bold">{sortedPlayers[1].rank}</Text>
                        </View>
                    </View>
                    <Text className="text-white font-semibold text-lg mt-2">{sortedPlayers[1].name}</Text>
                    <Text className="text-white text-sm">{sortedPlayers[1].totalPoints} 🏆</Text>
                </View>
            )}

            {/* Player 1 (center, largest) */}
            {sortedPlayers[0] && (
                <View className="items-center mx-2">
                    <View className="relative">
                        <Image source={{ uri: sortedPlayers[0].image ? sortedPlayers[0].image : getRandomPersonsImage() }}
                            className={`w-28 h-28 rounded-full border-4 ${getImageBorderColor(sortedPlayers[0].rank)}`} />
                        <View className={`absolute -top-2 -right-2 ${getRankColor(sortedPlayers[0].rank)} h-10 w-10 items-center justify-center rounded-full border-2`}>
                            <Text className="text-white text-lg font-bold">{sortedPlayers[0].rank}</Text>
                        </View>
                    </View>
                    <Text className="text-white font-bold text-xl mt-2">{sortedPlayers[0].name}</Text>
                    <Text className="text-white text-base">{sortedPlayers[0].totalPoints} 🏆</Text>
                </View>
            )}

            {/* Player 3 (right) */}
            {sortedPlayers[2] && (
                <View className="items-center mx-2 transform -translate-y-4">
                    <View className="relative">
                        <Image source={{ uri: sortedPlayers[2].image ? sortedPlayers[2].image : getRandomPersonsImage() }}
                            className={`w-20 h-20 rounded-full border-2 ${getImageBorderColor(sortedPlayers[1].rank)}`} />
                        <View className={`absolute -top-2 -right-2 ${getRankColor(sortedPlayers[2].rank)} h-8 w-8 items-center justify-center rounded-full border-2`}>
                            <Text className="text-white text-sm font-bold">{sortedPlayers[2].rank}</Text>
                        </View>
                    </View>
                    <Text className="text-white font-semibold text-lg mt-2">{sortedPlayers[2].name}</Text>
                    <Text className="text-white text-sm">{sortedPlayers[2].totalPoints} 🏆</Text>
                </View>
            )}
        </View>
    );
}
