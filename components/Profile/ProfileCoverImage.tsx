import React from 'react'

import { View, Image } from 'react-native'

import { getRandomImage } from '@/utils/functions/getRandomImage'

export function ProfileCoverImage({ image }: { image?: string }) {
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