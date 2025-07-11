import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ResultHeader } from '@/components/Join/Result/ResultHeader';
import { ResultSummary } from '@/components/Join/Result/ResultSummary';
import { ResultQuestionCard } from '@/components/Join/Result/ResultQuestionCard';
import { Button } from '@/components/ui/Button';

type QuestionResult = {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    timeTaken: number | null;
    pointsEarned: number;
};

type ResultData = {
    summary: {
        name: string;
        image: string;
        rank: number;
        totalPoints: number;
    };
    questions: QuestionResult[];
};

export default function ResultsScreen() {
    const { result } = useLocalSearchParams();

    let parsed: ResultData | null = null;
    try {
        if (typeof result === 'string') {
            parsed = JSON.parse(result);
        }
    } catch (err) {
        console.error('Failed to parse result data:', err);
    }

    if (!parsed) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-800 text-lg">Invalid result data</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-violet-800 pt-safe-offset-4">
            <ResultHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <ResultSummary
                    name={parsed.summary.name}
                    image={parsed.summary.image}
                    rank={parsed.summary.rank}
                    totalPoints={parsed.summary.totalPoints}
                />

                <View className='mx-4 bg-white rounded-t-3xl rounded-b-none pt-6 pb-2'>
                    {parsed.questions.map((q, index) => (
                        <ResultQuestionCard
                            key={q.id}
                            index={index + 1}
                            question={q.question}
                            correctIndex={q.correctIndex}
                            selectedIndex={q.selectedIndex}
                            options={q.options}
                            points={q.pointsEarned}
                            timeTaken={q.timeTaken ?? 0}
                        />
                    ))}
                </View>

                <View className="mx-4 my-6 bg-green-100 rounded-xl">
                    <Button title="Download Results" variant="ghost" color="success" size="lg" fullWidth />
                </View>
            </ScrollView>
        </View>
    );
}
