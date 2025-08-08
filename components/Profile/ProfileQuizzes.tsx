import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { useLazyGetUsersQuizzesQuery } from '@/services/userApi';

import { IOrder } from '../Library/types';

export function ProfileQuizzes({ id }: { id: number }) {
    const [activeFilter, setActiveFilter] = useState('newest');
    const [ordering, setOrdering] = useState<IOrder>('asc');
    const [getQuizzes, { isLoading, data: quizzes }] = useLazyGetUsersQuizzesQuery();

    useEffect(() => {
        if (activeFilter || ordering) {
            getQuizzes({ filter: activeFilter, order: ordering, userId: id });
        }
    }, [activeFilter, ordering, getQuizzes, id]);

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
