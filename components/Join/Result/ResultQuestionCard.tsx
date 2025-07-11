import React from 'react';

import { View, Text } from 'react-native';

import { Accordion } from '@/components/ui/Accordion';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

export function ResultQuestionCard({
    index,
    question,
    correctIndex,
    selectedIndex,
    options,
    points,
    timeTaken,
}: {
    index: number;
    question: string;
    correctIndex: number;
    selectedIndex: number | null;
    options: string[];
    points: number;
    timeTaken: number | null;
}) {
    const isCorrect = selectedIndex === correctIndex;

    // Helper function to determine the styling for each option based on correctness and selection.
    const getOptionStyle = (i: number) => {
        const isOptionCorrect = i === correctIndex;
        const isOptionSelected = i === selectedIndex;

        let bg = 'bg-white';
        let text = 'text-gray-800';
        let icon: IconSymbolName | null = null;

        if (isOptionCorrect) {
            bg = 'bg-green-200';
            text = 'text-green-800';
            icon = 'checkmark.circle';
        } else if (isOptionSelected) {
            bg = 'bg-red-200';
            text = 'text-red-800';
            icon = 'multiply.circle';
        }

        return { bg, text, icon };
    };

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
                        const { bg, text, icon } = getOptionStyle(i);
                        return (
                            <View
                                key={i}
                                className={`flex-row justify-between items-center rounded-xl px-4 py-4 ${bg}`}
                            >
                                <Text className={`text-base ${text}`}>
                                    {i + 1}. {option}
                                </Text>
                                {icon && (
                                    <IconSymbol
                                        size={20}
                                        name={icon}
                                        color={icon === 'checkmark.circle' ? '#16a34a' : '#dc2626'}
                                    />
                                )}
                            </View>
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
