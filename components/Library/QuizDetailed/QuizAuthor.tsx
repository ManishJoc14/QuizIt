import React from 'react'

import { Image, Text, View } from 'react-native'

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'

export default function QuizAuthor({ name, username, image, isThisMyQuiz }: { name?: string, username?: string, image?: string, isThisMyQuiz?: boolean }) {

    // if not do i follow him/her?
    const isFollowed = false;

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <View className="flex-row items-center">
                <Image
                    source={{ uri: image ? image : getRandomPersonsImage() }}
                    className="w-20 h-20 rounded-full mr-3"
                />
                <View>
                    <Text className="text-lg tracking-wider font-semibold text-gray-900 dark:text-white">
                        {name || 'Anonymous'}
                    </Text>
                    <Text className="text-base tracking-wide text-gray-500">{username}</Text>
                </View>
            </View>
            {isThisMyQuiz ?
                <Button title="You" variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" variant="solid" radius="full" />}
        </View >
    )
}
