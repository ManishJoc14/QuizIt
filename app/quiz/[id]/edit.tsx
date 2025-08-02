import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { EditQuizSection } from '@/components/Edit/EditQuizSection';
import { EditHeader } from '@/components/Edit/EditQuizHeader';

export default function EditScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View className="flex-1 bg-white dark:bg-gray-950 pt-safe-offset-4 px-6">
            <EditHeader/>
            <EditQuizSection quizId={Number(id)} />
        </View>
    );
}