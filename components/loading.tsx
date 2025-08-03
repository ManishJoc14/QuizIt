import React from 'react';
import { Image, SafeAreaView, Text } from 'react-native';

export default function LoadingScreen() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <Image className="w-40 h-40 mb-6" source={{ uri: 'https://lh3.googleusercontent.com/-k031G3DGLL0/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfknG3JP4wALxtPY26X1Q_9fJiX-l3w/photo.jpg?sz=46' }} />
            <Text className="text-3xl font-bold text-black">QuizIt</Text>
        </SafeAreaView>
    );
}
