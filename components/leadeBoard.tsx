import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

export const LeaderboardStrip = ({
    leaderboard = [],
    layout = "vertical", // 'vertical' | 'compact'
}: {
    leaderboard: {
        id: number;
        name: string;
        image: string;
        rank: number;
        totalPoints: number;
    }[];
    layout?: "vertical" | "compact";
}) => {
    const sorted = [...leaderboard].sort((a, b) => a.rank - b.rank);

    if (layout === "compact") {
        // Horizontal compact bar for mobile
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="items-center px-2"
            >
                {sorted.map((p) => (
                    <TouchableOpacity
                        key={p.id}
                        className="w-20 mx-2 items-center active:opacity-80"
                    >
                        <View className="relative">
                            <Image
                                source={{ uri: p.image }}
                                className="w-14 h-14 rounded-full border-2 border-white dark:border-neutral-800"
                            />
                            <View className="absolute -top-1.5 -left-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-blue-600 justify-center items-center">
                                <Text className="text-white text-[12px] font-bold">{p.rank}</Text>
                            </View>
                        </View>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="mt-1 text-xs text-center text-gray-800 dark:text-gray-100 w-20"
                        >
                            {p.name}
                        </Text>

                        <Text className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                            {p.totalPoints}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }

    // Vertical sidebar / big layout
    return (
        <ScrollView showsVerticalScrollIndicator={false}
        className="bg-white dark:bg-gray-900 rounded-lg pl-4 pt-2"
        >
            {sorted.map((p) => (
                <View
                    key={p.id}
                    className="flex-row items-center py-3 px-2"
                >
                    <View className="relative">
                        <Image
                            source={{ uri: p.image }}
                            className="w-14 h-14 rounded-full border-2 border-white dark:border-neutral-800"
                        />
                        <View className="absolute -top-1.5 -left-1.5 min-w-[26px] h-[26px] px-1.5 rounded-full bg-blue-600 justify-center items-center">
                            <Text className="text-white text-[12px] font-bold">{p.rank}</Text>
                        </View>
                    </View>

                    <View className="ml-3 flex-1">
                        <Text
                            className="text-base font-semibold text-gray-900 dark:text-gray-100"
                            numberOfLines={1}
                        >
                            {p.name}
                        </Text>
                        <Text className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                            {p.totalPoints} pts
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};
