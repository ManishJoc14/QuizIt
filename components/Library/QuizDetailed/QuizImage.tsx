import React from 'react'

import { View, ImageBackground } from 'react-native'

import { getRandomImage } from '@/utils/functions/getRandomImage'

export function QuizImage({ image }: { image?: string }) {
    return (
        <ImageBackground
            source={{ uri: image ? image : getRandomImage(800, 400) }}
            className="w-full rounded-xl overflow-hidden"
            resizeMode="cover"
        >
            <View className="bg-black/50 px-6 py-16 web:py-44 items-center justify-center">
            </View>
        </ImageBackground>
    )
}