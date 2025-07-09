import { ScrollView, Text, View } from "react-native"

import { useTheme } from "@/context/ThemeContext"

import { Button } from "../ui/Button"
import { IconSymbol } from "../ui/IconSymbol"
import { QuizCard } from "../ui/QuizCard"

export function TrendingSection() {
    const { theme } = useTheme();

    const quizzes = [
        {
            id: 1,
            title: "Boost Your Productivity Skills Quiz",
            authorName: "Manish Joshi",
            questionCount: 16,
        },
        {
            id: 2,
            title: "Boost Your Productivity Skills Quiz",
            authorName: "Mahima Joshi",
            questionCount: 16,
        },
        {
            id: 3,
            title: "Ultimate JavaScript Challenge Quiz",
            authorName: "Alex Kim",
            questionCount: 20,
        },
        {
            id: 4,
            title: "Mastering React Native Skills Quiz",
            authorName: "Priya Singh",
            questionCount: 18,
        },
        {
            id: 5,
            title: "World History Trivia Challenge",
            authorName: "John Doe",
            questionCount: 15,
        },
        {
            id: 6,
            title: "Interesting Science Facts Quiz You Should Know",
            authorName: "Jane Smith",
            questionCount: 22,
        },
        {
            id: 7,
            title: "Music Legends Quiz Challenge",
            authorName: "Carlos Rivera",
            questionCount: 12,
        },
        {
            id: 8,
            title: "Explore Geography Exploration Quiz",
            authorName: "Emily Chen",
            questionCount: 17,
        },
        {
            id: 9,
            title: "Sports Fanatics Quiz Challenge",
            authorName: "Liam Patel",
            questionCount: 19,
        },
        {
            id: 10,
            title: "Literature Lovers Quiz Challenge",
            authorName: "Olivia Brown",
            questionCount: 16,
        },
    ];


    return (
        <View className="mb-10">
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Trending Quiz
                </Text>
                <Button title='View all' variant="link" className="p-0 no-underline"
                    rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {quizzes.map((quiz, index) => (
                    <QuizCard key={index} {...quiz} />
                ))}
            </ScrollView>
        </View>
    )
}
