import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ResultHeader } from '@/components/Join/Result/ResultHeader';
import { ResultSummary } from '@/components/Join/Result/ResultSummary';
import { ResultQuestionCard } from '@/components/Join/Result/ResultQuestionCard';
import { Button } from '@/components/ui/Button';
import { ResultData } from '@/components/Join/types';

export default function ResultsScreen() {
    const { result, rank } = useLocalSearchParams();

    const userResult = Array.isArray(result) ? result[0] : result;
    const userRank = Array.isArray(rank) ? rank[0] : rank;

    let parsed: ResultData | null = null;
    try {
        if (typeof userResult === 'string') {
            parsed = JSON.parse(userResult);
        }
    } catch (err) {
        console.error('Failed to parse result data:', err);
    }

    if (!parsed) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
                <Text className="text-gray-800 dark:text-gray-100 text-lg">Invalid result data</Text>
            </View>
        );
    }

    console.log(parsed)

    return (
        <View className="flex-1 bg-violet-950 pt-safe-offset-4">
            <ResultHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <ResultSummary {...{ ...parsed.summary, rank: Number(userRank) }} />
                <View className='mx-6 bg-white dark:bg-gray-900 rounded-t-3xl rounded-b-none pt-6 pb-2'>
                    {parsed.questions.map((q, index) => (
                        <ResultQuestionCard
                            key={q.id}
                            id={q.id}
                            index={index + 1}
                            question={q.question}
                            correctIndex={q.correctIndex}
                            selectedIndex={q.selectedIndex}
                            options={q.options}
                            points={q.points}
                            timeTaken={q.timeTaken ?? 0}
                        />
                    ))}
                </View>

                <View className="mx-6 my-6 rounded-xl">
                    <Button title="Download Results" variant="solid" color="primary" size="lg" fullWidth />
                </View>
            </ScrollView>
        </View>
    );
}
