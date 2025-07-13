import React, { useState } from 'react';

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

export function DiscoverQuizSection() {
    const [activeFilter, setActiveFilter] = useState('Newest');
    const [ordering, setOrdering] = useState<IOrder>('asc');

    return (
        <>
            <LibraryFilters activeFilter={activeFilter} ordering={ordering} onOrderingChange={setOrdering} onChange={setActiveFilter} total={quizzes.length} />
            <LibraryList data={quizzes} />
        </>
    );
}
