import React from 'react';

import { View, Text } from 'react-native';

import { Accordion } from '@/components/ui/Accordion';
import { getOptionStyle } from '@/utils/functions/getOptionStyle';
import { useTheme } from '@/context/ThemeContext';

import { QuestionResult } from '../types';
import { ResultQuestionOption } from './ResultQuestionOption';

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
    const { theme } = useTheme();

    return (
        <View
            className={`mx-4 mb-4 rounded-2xl border px-4 py-4 ${isCorrect ? 'bg-green-100 dark:bg-green-950 border-green-400' : 'bg-red-100 dark:bg-red-950 border-red-400'}`}
        >
            {/* Our Accordion component */}
            <Accordion
                title={`${index}. ${question}`}
                titleClassName="text-lg text-gray-900 dark:text-white leading-6"
                bodyClassName="mt-2"
                iconColor={theme === 'dark' ? '#E5E7EB' : '#4B5563'}
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
                        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Points: <Text className="font-semibold">{isCorrect ? points : 0} 🏆</Text>
                        </Text>
                        <Text className="text-sm text-gray-600 dark:text-gray-200">
                            Time: <Text className="font-semibold">{timeTaken !== null ? `${timeTaken}s` : '-'}</Text>
                        </Text>
                    </View>
                </View>
            </Accordion>
        </View>
    );
}
