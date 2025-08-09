import React, { useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, Animated } from "react-native";

export const LeaderboardStrip = ({ leaderboard }: {
    leaderboard: {
        id: number;
        name: string;
        image: string;
        rank: number;
        totalPoints: number;
    }[];
}) => {

    const animatedValues = useRef(new Map()).current;

    // Initialize animated values for each player
    leaderboard.forEach((player) => {
        if (!animatedValues.has(player.id)) {
            animatedValues.set(player.id, {
                position: new Animated.Value(player.rank)
            });
        }
    });

    // Animate position changes
    useEffect(() => {
        if (!leaderboard || leaderboard.length === 0) return;

        leaderboard.forEach((player) => {
            const animations = animatedValues.get(player.id);
            if (animations) {
                Animated.timing(animations.position, {
                    toValue: player.rank,
                    duration: 400,
                    useNativeDriver: false,
                }).start();
            }
        });
    }, [leaderboard, animatedValues]);

    // Sort by current rank
    const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);

    return (
        <View className="py-2 bg-gray-50 dark:bg-gray-900 rounded-lg mt-4 mx-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10, minWidth: 100, flexDirection: 'column' }}
            >
                {sortedLeaderboard.map((player) => {
                    return (
                        <View
                            key={player.id}
                            className="items-center relative my-2"
                        >
                            {/* Rank badge */}
                            <View className="absolute -top-1 left-[12px] w-5 h-5 bg-blue-500 rounded-full items-center justify-center z-10">
                                <Text className="text-[12px] font-bold text-white">
                                    {player.rank}
                                </Text>
                            </View>

                            {/* Player image */}
                            <Image
                                source={{ uri: player.image }}
                                className="w-14 h-14 rounded-full border-2 border-white dark:border-neutral-700 shadow-sm"
                                resizeMode="cover"
                            />

                            {/* Player name */}
                            <Text
                                className="text-[16px] font-medium text-center mt-1 text-gray-800 dark:text-gray-100"
                                numberOfLines={1}
                                ellipsizeMode="middle"
                                style={{ maxWidth: 60 }}
                            >
                                {player.name}
                            </Text>

                            {/* Points */}
                            <Text className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
                                {player.totalPoints}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};