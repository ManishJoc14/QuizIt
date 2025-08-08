import { View, Text, ScrollView } from "react-native";

import { router } from "expo-router";

import getRandomPersonsImage, { getRandomImage } from "@/utils/functions/getRandomImage";
import { QuizCard } from "@/components/Home/HomeQuizCard";
import { useGetQuizzesQuery } from "@/services/quizApi";
import { useTheme } from "@/context/ThemeContext";

import { Button } from "../ui/Button";
import { IconSymbol } from "../ui/IconSymbol";

export function DiscoverSection() {

    const { theme } = useTheme();
    const { data: quizzes, isLoading } = useGetQuizzesQuery();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!quizzes || quizzes?.data?.length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No quizzes found</Text>
            </View>
        );
    }


    return (
        <View className="mt-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Discover
                </Text>
                <Button title='View all' variant="link" className="no-underline"
                    onPress={() => router.push('/discover')}
                    rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
            </View>

            {/* Scrollable Quiz Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {quizzes.data.map((quiz, index) => (
                    <QuizCard key={index}
                        id={quiz.id}
                        title={quiz.title}
                        authorName={quiz.author}
                        authorAvatar={quiz.image || getRandomPersonsImage()}
                        questionCount={quiz.count}
                        image={quiz.coverPhoto || getRandomImage()}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
