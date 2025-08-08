import React from 'react';

import { Text, View } from 'react-native';

import { LibraryList } from '@/components/Library/LibraryList';
import { useGetQuizzesQuery } from '@/services/quizApi';

export function DiscoverQuizSection() {
    const { data: quizzes, isLoading } = useGetQuizzesQuery();

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
                        <LibraryList data={quizzes?.data ?? []} />
                    </>
                )}
        </>
    );
}
