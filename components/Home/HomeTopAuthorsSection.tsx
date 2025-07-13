import { ScrollView, Text, View } from "react-native"

import { Link } from "expo-router"

import { useTheme } from "@/context/ThemeContext"

import { AuthorAvatar } from "../ui/AuthorAvatar"
import { Button } from "../ui/Button"
import { IconSymbol } from "../ui/IconSymbol"

export function TopAuthorsSection() {
    const { theme } = useTheme();

    const authors = [
        { id: 1, name: "Ava Thompson" },
        { id: 2, name: "Liam Patel" },
        { id: 3, name: "Sofia Kim" },
        { id: 4, name: "Jackson Lee" },
        { id: 5, name: "Maya Chen" },
        { id: 6, name: "Noah Garcia" },
        { id: 7, name: "Ella Nguyen" },
        { id: 8, name: "Benjamin Smith" },
        { id: 9, name: "Olivia Martinez" },
    ]

    return (
        <View className="my-10">
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Top Authors
                </Text>
                <Link href="/authors" asChild>
                    <Button title='View all' variant="link" className="p-0 no-underline"
                        rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
                </Link>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {authors.map((author, index) => (
                    <AuthorAvatar key={index} {...author} />
                ))}
            </ScrollView>
        </View>
    )
}
