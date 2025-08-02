import React, { useState } from 'react';

import { Text, View } from 'react-native';

import { IOrder } from '@/components/Library/types';
import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { useGetQuizzesQuery } from '@/services/quizApi';

export function DiscoverQuizSection() {
    const [activeFilter, setActiveFilter] = useState('Newest');
    const [ordering, setOrdering] = useState<IOrder>('asc');

    const { data: quizzes, isLoading } = useGetQuizzesQuery();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!quizzes || quizzes?.data?.length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No quizzes found</Text>
            </View>
        );
    }

    return (
        <>
            <LibraryFilters
                activeFilter={activeFilter}
                ordering={ordering}
                onOrderingChange={setOrdering}
                onChange={setActiveFilter}
                total={quizzes.data.length}
            />
            <LibraryList data={quizzes.data} />
        </>
    );
}
