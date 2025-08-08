import React from 'react'

import { ImageBackground } from 'react-native'

import { getRandomImage } from '@/utils/functions/getRandomImage'

export function QuizImage({ image }: { image?: string }) {
    return (
        <ImageBackground
            source={{ uri: image ? image : getRandomImage(800, 400) }}
            className="w-full rounded-xl px-6 py-16 web:py-44 overflow-hidden"
            resizeMode="cover"
        >
        </ImageBackground>
    )
}