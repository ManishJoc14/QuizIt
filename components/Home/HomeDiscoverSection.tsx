import { View, Text, ScrollView } from "react-native";

import { QuizCard } from "@/components/Home/HomeQuizCard";
import { useTheme } from "@/context/ThemeContext";

import { Button } from "../ui/Button";
import { IconSymbol } from "../ui/IconSymbol";

export function DiscoverSection() {

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
            title: "Ultimate JavaScript Challenge",
            authorName: "Priya Sharma",
            questionCount: 12,
        },
        {
            id: 3,
            title: "Mastering React Native Basics",
            authorName: "Alex Kim",
            questionCount: 10,
        },
        {
            id: 4,
            title: "World History Trivia Challenge",
            authorName: "Sara Lee",
            questionCount: 15,
        },
        {
            id: 5,
            title: "Interesting Science Facts Quiz You Should Know",
            authorName: "David Chen",
            questionCount: 18,
        },
        {
            id: 6,
            title: "Famous Landmarks Around the World",
            authorName: "Emily Clark",
            questionCount: 8,
        },
        {
            id: 7,
            title: "Music Legends Quiz Challenge",
            authorName: "Rohan Patel",
            questionCount: 14,
        },
        {
            id: 8,
            title: "Explore Geography Quiz Challenge",
            authorName: "Lucas White",
            questionCount: 13,
        },
        {
            id: 9,
            title: "Sports Fanatic Quiz Challenge",
            authorName: "Aisha Khan",
            questionCount: 17,
        },
    ];


    return (
        <View className="mt-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Discover
                </Text>
                <Button title='View all' variant="link" className="no-underline"
                    rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
            </View>

            {/* Scrollable Quiz Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {quizzes.map((quiz, index) => (
                    <QuizCard key={index} {...quiz} />
                ))}
            </ScrollView>
        </View>
    );
}
