import React, { useState } from 'react';
import { View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [measuredHeight, setMeasuredHeight] = useState(0);
    const animatedHeight = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        height: animatedHeight.value,
        opacity: animatedHeight.value > 0 ? 1 : 0,
    }));

    const isCorrect = selectedIndex === correctIndex;

    const toggleExpand = () => {
        setIsExpanded((prev) => {
            const next = !prev;
            animatedHeight.value = withTiming(next ? measuredHeight : 0, { duration: 400 });
            return next;
        });
    };

    const getOptionStyle = (i: number) => {
        const isOptionCorrect = i === correctIndex;
        const isOptionSelected = i === selectedIndex;

        let bg = 'bg-white';
        let text = 'text-gray-800';
        let icon = null;

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
            {/* Header */}
            <Pressable onPress={toggleExpand} className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white leading-6">
                        {index}. {question}
                    </Text>
                </View>
                <IconSymbol
                    name={isExpanded ? 'chevron.up' : 'chevron.down'}
                    size={20}
                    color="#4B5563"
                />
            </Pressable>

            {/* Animated Body */}
            <Animated.View style={[animatedStyle]} className="overflow-hidden mt-3">
                <View
                    onLayout={(e: LayoutChangeEvent) => {
                        if (measuredHeight === 0) {
                            setMeasuredHeight(e.nativeEvent.layout.height);
                            if (isExpanded) {
                                animatedHeight.value = withTiming(e.nativeEvent.layout.height, { duration: 400 });
                            }
                        }
                    }}
                    className="w-full absolute left-0"
                >
                    <View className="flex gap-3 pb-3">
                        {options.map((option, i) => {
                            const { bg, text, icon } = getOptionStyle(i);
                            return (
                                <View
                                    key={i}
                                    className={`flex-row justify-between items-center rounded-xl px-4 py-3 ${bg}`}
                                >
                                    <Text className={`text-base font-medium ${text}`}>
                                        {i + 1}. {option}
                                    </Text>
                                    {icon && (
                                        <IconSymbol
                                            size={20}
                                            name={icon as IconSymbolName}
                                            color={icon === 'checkmark.circle' ? '#16a34a' : '#dc2626'}
                                        />
                                    )}
                                </View>
                            );
                        })}

                        {/* Footer */}
                        <View className="flex-row justify-between items-center pt-3 border-t border-gray-300 dark:border-gray-700 mt-2 px-1">
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Points: <Text className="font-semibold">{isCorrect ? points : 0} 🏆</Text>
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400">
                                Time: {timeTaken !== null ? `${timeTaken}s` : '-'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}
