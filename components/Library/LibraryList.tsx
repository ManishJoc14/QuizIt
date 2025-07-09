import React from 'react';
import { ScrollView } from 'react-native';
import { LibraryQuizCard } from './LibraryQuizCard';
import { ILibraryQuiz } from './types';

export function LibraryList({ data }: { data: ILibraryQuiz[] }) {
  return (
    <ScrollView className="my-4" showsVerticalScrollIndicator={false}>
      {data.map((quiz) => (
        <LibraryQuizCard key={quiz.id} quiz={quiz} />
      ))}
    </ScrollView>
  );
}
