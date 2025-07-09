import { View, Image } from 'react-native'
import React from 'react'
import { getRandomImage } from '@/utils/functions/getRandomImage'

export default function QuizImage({ image }: { image?: string }) {
    return (
        <View className="w-full h-52 bg-gray-200 rounded-xl justify-center items-center mb-6">
            <Image
                source={{ uri: image ? image : getRandomImage() }}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
            />
        </View>
    )
}