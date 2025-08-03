import React, { useEffect, useState } from 'react';

import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { useLazyGetMyQuizzesQuery } from '@/services/quizApi';
import { IOrder } from '../Library/types';
import { Text, View } from 'react-native';

export function ProfileQuizzes() {
    const [activeFilter, setActiveFilter] = useState('newest');
    const [ordering, setOrdering] = useState<IOrder>('asc');
    const [getQuizzes, { isLoading, data: quizzes }] = useLazyGetMyQuizzesQuery();

    useEffect(() => {
        if (activeFilter || ordering) {
            getQuizzes({ filter: activeFilter, order: ordering });
        }
    }, [activeFilter, ordering, getQuizzes]);

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
                        <LibraryFilters activeFilter={activeFilter} ordering={ordering} onOrderingChange={setOrdering} onChange={setActiveFilter} total={quizzes.data.length} />
                        <LibraryList data={quizzes.data} />
                    </>
                )}
        </>
    );
}
