import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { LibraryHeader } from '@/components/Library/LibraryHeader';
import { LibraryTabs } from '@/components/Library/LibraryTabs';
import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { IOrder } from '@/components/Library/types';
import { useLazyGetUsersQuizzesQuery } from '@/services/userApi';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export default function Library() {
  const [activeTab, setActiveTab] = useState('My quizzes');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [ordering, setOrdering] = useState<IOrder>('asc');
  const [getQuizzes, { isLoading, data: quizzes }] = useLazyGetUsersQuizzesQuery();
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (activeFilter || ordering) {
      getQuizzes({ filter: activeFilter, order: ordering, userId: user?.id ?? 0 });
    }
  }, [activeFilter, ordering, getQuizzes, user?.id]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-950 px-4 pt-safe-offset-5 pb-2">
      <LibraryHeader />
      {
        !quizzes || quizzes?.data?.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text>No quizzes found</Text>
          </View>
        ) : (
          <>
            <LibraryTabs activeTab={activeTab} onChange={setActiveTab} />
            <LibraryFilters
              activeFilter={activeFilter}
              ordering={ordering}
              onOrderingChange={setOrdering}
              onChange={setActiveFilter}
              total={quizzes?.data?.length ?? 0}
            />
            <LibraryList data={quizzes?.data ?? []} />
          </>
        )}
    </View>
  );
}

