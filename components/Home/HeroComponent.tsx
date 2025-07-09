import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { getRandomImage } from '@/utils/functions/getRandomImage';

export function Hero() {
  return (
    <View className='my-6'>
      <ImageBackground
        source={{ uri: getRandomImage(800, 400) }}
        className="w-full rounded-xl overflow-hidden"
        resizeMode="cover"
      >
        <View className="bg-black/50 px-6 py-16 items-center justify-center">
          {/* Title */}
          <Text className="text-4xl tracking-wider font-semibold text-white text-center mb-2">
            Welcome to QuizIt
          </Text>

          {/* Subtitle */}
          <Text className="text-gray-200 tracking-wide text-center text-base max-w-xs">
            Explore quizzes and challenge your knowledge with friends
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
