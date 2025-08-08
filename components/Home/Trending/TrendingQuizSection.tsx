import React from 'react';

import { Text, View } from 'react-native';

import { LibraryList } from '@/components/Library/LibraryList';
import { useGetTopQuizzesListQuery } from '@/services/featureApi';

export function TrendingQuizSection() {
    const { data: quizzes, isLoading } = useGetTopQuizzesListQuery();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <>
            {
                !quizzes || quizzes?.data?.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text>No quizzes found</Text>
                    </View>
                ) : (
                    <>
                        <LibraryList data={quizzes.data} />
                    </>
                )}
        </>
    );
}
