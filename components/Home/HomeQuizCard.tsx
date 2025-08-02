import { Image, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";


interface QuizCardProps {
    id: number;
    title: string;
    authorName: string;
    authorAvatar?: string;
    questionCount: number;
    image: string;
}

export function QuizCard({
    id,
    title,
    authorName,
    authorAvatar,
    questionCount,
    image,
}: QuizCardProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            key={id}
            onPress={() => router.push({ pathname: '/quiz/[id]', params: { id: String(id) } })}
        >
            <View className="w-56 md:w-60  mr-5">
                <View className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-1">
                    {/* Cover Image */}
                    <View className="relative">
                        <Image
                            source={{ uri: image }}
                            className="w-full h-36 bg-gray-200 dark:bg-gray-700"
                        />
                        {/* Question Badge */}
                        <Text className="absolute top-2 right-2 bg-blue-500 px-2 py-1 rounded-full text-xs font-medium text-white shadow-md">
                            {questionCount} Qs
                        </Text>
                    </View>

                    {/* Content */}
                    <View className="px-3 py-2">
                        {/* Title */}
                        <Text
                            className="text-base font-semibold tracking-wider text-gray-900 dark:text-white mb-1"
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>

                        {/* Author */}
                        <View className="flex-row items-center my-2">
                            <Image
                                source={{ uri: authorAvatar }}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <Text className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                                {authorName}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
