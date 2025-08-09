import React from 'react';
import { ImageBackground, useWindowDimensions } from 'react-native';
import { getRandomImage } from '@/utils/functions/getRandomImage';

export function QuizImage({ image }: { image?: string }) {
    const { width } = useWindowDimensions();

    // Maintain ~2:1 aspect ratio
    const height = width > 768 ? width * 0.3 : width * 0.5;

    return (
        <ImageBackground
            source={{ uri: image || getRandomImage(800, 400) }}
            style={{ width, height }}
            className="rounded-xl overflow-hidden"
            resizeMode="cover"
        />
    );
}
