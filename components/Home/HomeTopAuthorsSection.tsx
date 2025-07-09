import { ScrollView, Text, View } from "react-native"

import { useTheme } from "@/context/ThemeContext"

import { AuthorAvatar } from "../ui/AuthorAvatar"
import { Button } from "../ui/Button"
import { IconSymbol } from "../ui/IconSymbol"

export function TopAuthorsSection() {
    const { theme } = useTheme();

    const authors = [
        { name: "Ava Thompson" },
        { name: "Liam Patel" },
        { name: "Sofia Kim" },
        { name: "Jackson Lee" },
        { name: "Maya Chen" },
        { name: "Noah Garcia" },
        { name: "Ella Nguyen" },
        { name: "Benjamin Smith" },
        { name: "Olivia Martinez" },
    ]

    return (
        <View className="my-10">
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Top Authors
                </Text>
                <Button title='View all' variant="link" className="p-0 no-underline"
                    rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
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
