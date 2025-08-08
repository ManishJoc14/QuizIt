import { ScrollView, Text, View } from "react-native"

import { router } from "expo-router"

import { useGetTopAuthorsListQuery } from "@/services/featureApi"
import { useTheme } from "@/context/ThemeContext"

import { AuthorAvatar } from "../ui/AuthorAvatar"
import { Button } from "../ui/Button"
import { IconSymbol } from "../ui/IconSymbol"

export function TopAuthorsSection() {
    const { theme } = useTheme();
    const { data: authorsData } = useGetTopAuthorsListQuery()

    return (
        <View className="my-10">
            <View className="flex-row items-center justify-between mb-5">
                <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                    Top Authors
                </Text>

                <Button title='View all' variant="link" className="p-0 no-underline"
                    onPress={() => router.push('/authors')}
                    rightIcon={<IconSymbol size={28} name="chevron.right" color={theme === 'dark' ? "#93c5fd" : "#60a5fa"} />} />
            </View>
            {authorsData?.data && authorsData.data.length > 0 ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {authorsData?.data.map((author, index) => (
                        <AuthorAvatar key={index}
                            id={author.id} name={author.name} avatar={author.image}
                        />
                    ))}
                </ScrollView>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500">No authors found</Text>
                </View>
            )}
        </View>
    )
}
