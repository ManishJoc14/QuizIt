import React from 'react';

import { View, Text } from 'react-native';

import { Accordion } from '@/components/ui/Accordion';
import { getOptionStyle } from '@/utils/functions/getOptionStyle';

import { ResultQuestionOption } from './ResultQuestionOption';
import { QuestionResult } from '../types';

interface ResultQuestionCardProps extends QuestionResult {
    index: number;
}

export function ResultQuestionCard({
    index,
    question,
    correctIndex,
    selectedIndex,
    options,
    points,
    timeTaken,
}: ResultQuestionCardProps) {
    const isCorrect = selectedIndex === correctIndex;

    return (
        <View
            className={`mx-4 mb-4 rounded-2xl border px-4 py-4 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
                }`}
        >
            {/* Our Accordion component */}
            <Accordion
                title={`${index}. ${question}`}
                titleClassName="text-lg text-gray-900 leading-6"
                bodyClassName="mt-3"
            >
                {/* Collapsible content */}
                <View className="gap-2 pb-3">
                    {/* Render each option */}
                    {options.map((option, i) => {
                        const { bg, text, icon } = getOptionStyle(i, correctIndex, selectedIndex);
                        return (
                            <ResultQuestionOption key={i} index={i} textStyle={text} bgStyle={bg} option={option} icon={icon} />
                        );
                    })}

                    {/* Footer section displaying points and time taken */}
                    <View className="flex-row justify-between items-center pt-3 border-t border-gray-300 mt-2 px-1">
                        <Text className="text-sm font-medium text-gray-700">
                            Points: <Text className="font-semibold">{isCorrect ? points : 0} 🏆</Text>
                        </Text>
                        <Text className="text-sm text-gray-600">
                            Time: <Text className="font-semibold">{timeTaken !== null ? `${timeTaken}s` : '-'}</Text>
                        </Text>
                    </View>
                </View>
            </Accordion>
        </View>
    );
}
