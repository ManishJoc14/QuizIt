import { View, Text, Image } from 'react-native';

export function ResultSummary({
    name,
    image,
    rank,
    totalPoints,
}: {
    name: string;
    image: string;
    rank: number;
    totalPoints: number;
}) {
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-500 dark:bg-yellow-400';
        if (rank === 2) return 'bg-gray-400 dark:bg-gray-300';
        if (rank === 3) return 'bg-stone-500 dark:bg-stone-400';
        return 'bg-orange-500 dark:bg-orange-400';
    };

    return (
        <View className="items-center mb-4 bg-violet-800">
            {/* Profile Image + Rank Badge */}
            <View className="relative">
                <Image source={{ uri: image }} className="w-32 h-32 rounded-full" />
                <View
                    className={`absolute bottom-0 right-2 ${getRankColor(
                        rank
                    )} h-8 w-8 items-center justify-center rounded-full`}
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
