import React, { useState } from 'react';
import { View } from 'react-native';

import { LibraryHeader } from '@/components/Library/LibraryHeader';
import { LibraryTabs } from '@/components/Library/LibraryTabs';
import { LibraryFilters } from '@/components/Library/LibraryFilters';
import { LibraryList } from '@/components/Library/LibraryList';
import { getRandomImage } from '@/utils/functions/getRandomImage';
import { ILibraryQuiz, IOrder } from '@/components/Library/types';

const quizzes: ILibraryQuiz[] = new Array(8).fill(null).map((_, i) => ({
  id: i,
  title: 'Get Smarter With these productivity...',
  description: 'Description about the quiz',
  image: getRandomImage(),
  author: 'Manish Joshi',
  plays: 20,
  date: 'Today',
  count: 16,
}));

export default function Library() {
  const [activeTab, setActiveTab] = useState('My quizzes');
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [ordering, setOrdering] = useState<IOrder>('asc');

  return (
    <View className="flex-1 bg-white dark:bg-gray-950 px-4 pt-safe-offset-5 pb-2">
      <LibraryHeader />
      <LibraryTabs activeTab={activeTab} onChange={setActiveTab} />
      <LibraryFilters activeFilter={activeFilter} ordering={ordering} onOrderingChange={setOrdering} onChange={setActiveFilter} total={quizzes.length} />
      <LibraryList data={quizzes} />
    </View>
  );
}
