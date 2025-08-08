import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { LibraryHeader } from '@/components/Library/LibraryHeader';
import { LibraryTabs } from '@/components/Library/LibraryTabs';
import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { IOrder } from '@/components/Library/types';
import { useLazyGetUsersQuizzesQuery } from '@/services/userApi';
import { useLazyGetFavouriteQuizzesListQuery } from '@/services/featureApi';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export default function Library() {
  const [activeTab, setActiveTab] = useState<'My quizzes' | 'Favourites'>('My quizzes');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [ordering, setOrdering] = useState<IOrder>('asc');

  const { user } = useAppSelector(state => state.auth);

  const [getMyQuizzes, { data: myQuizzes, isLoading: isLoadingMyQuizzes }] =
    useLazyGetUsersQuizzesQuery();

  const [getMyFavouriteQuizzes, { data: favouriteQuizzes, isLoading: isLoadingFavouriteQuizzes }] =
    useLazyGetFavouriteQuizzesListQuery();

  useEffect(() => {
    if (activeTab === 'My quizzes') {
      getMyQuizzes({
        filter: activeFilter,
        order: ordering,
        userId: user?.id ?? 0,
      });
    }
    if (activeTab === 'Favourites') {
      getMyFavouriteQuizzes({
        filter: activeFilter,
        order: ordering,
        userId: user?.id ?? 0,
      });
    }
  }, [activeFilter, ordering, activeTab, getMyQuizzes, getMyFavouriteQuizzes, user?.id]);

  const isLoading =
    isLoadingMyQuizzes || isLoadingFavouriteQuizzes;

  const quizzes =
    activeTab === 'My quizzes'
      ? myQuizzes?.data ?? []
      : favouriteQuizzes?.data ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-950">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-2 text-gray-600 dark:text-gray-300">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-950 px-4 pt-safe-offset-5 pb-2">
      <LibraryHeader />
      <LibraryTabs
        activeTab={activeTab}
        onChange={(tab: string) => setActiveTab(tab as 'My quizzes' | 'Favourites')}
      />
      {quizzes.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600 dark:text-gray-300">
            No quizzes found
          </Text>
        </View>
      ) : (
        <>
          <LibraryFilters
            activeFilter={activeFilter}
            ordering={ordering}
            onOrderingChange={setOrdering}
            onChange={setActiveFilter}
            total={quizzes.length}
          />
          <LibraryList data={quizzes} />
        </>
      )}
    </View>
  );
}
