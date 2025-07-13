import React from 'react';

import { ScrollView } from 'react-native';

import { ILibraryQuiz } from './types';
import { LibraryQuizCard } from './LibraryQuizCard';

export function LibraryList({ data }: { data: ILibraryQuiz[] }) {
  return (
    <ScrollView className="my-4" showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}>
      {data.map((quiz) => (
        <LibraryQuizCard key={quiz.id} quiz={quiz} />
      ))}
    </ScrollView>
  );
}
