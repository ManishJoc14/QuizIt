import React from 'react'

import { View, Text, ImageBackground } from 'react-native'

import { getRandomImage } from '@/utils/functions/getRandomImage'

export function WaitingRoomCode({ roomCode, quizTitle, image }: {
    roomCode: string,
    quizTitle: string,
    image?: string
}) {
    return (
        <ImageBackground
            source={{ uri: image ? image : getRandomImage(800, 400) }}
            className="w-full rounded-xl overflow-hidden"
            resizeMode="cover"
        >
            {/* Background Overlay */}
            <View className="bg-black/50 px-6 py-8 items-center justify-center">
                {/* Quiz details */}
                <View className="bg-white/90 py-8 px-14 rounded-lg">
                    <Text className='text-center font-medium text-lg text-gray-800 mb-2'>
                        Room Code
                    </Text>
                    <Text className="text-6xl font-black tracking-widest text-blue-600 text-center mb-6 pb-4 border-b border-gray-300">
                        {roomCode}
                    </Text>
                    <Text className='text-center font-medium text-lg text-gray-800'
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {quizTitle}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}