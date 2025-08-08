import React from 'react';

import { ScrollView } from 'react-native';

import { ILibraryQuiz } from './types';
import { LibraryQuizCard } from './LibraryQuizCard';

export function LibraryList({ data }: { data: ILibraryQuiz[] }) {
  console.log('LibraryList data:', data);

  return (
    <ScrollView className="my-4" showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      {data.map((quiz, i) => (
        <React.Fragment key={i}>
          <LibraryQuizCard quiz={quiz} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
