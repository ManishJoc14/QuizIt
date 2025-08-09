import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

interface FeedbackFormProps {
    onSubmit: (feedback: string, rating: number | null) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
    const { theme } = useTheme();

    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState<number | null>(null);

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';

    const inputPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#D1D5DB';

    const handleRatingPress = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleSubmit = () => {
        onSubmit(feedbackText, rating);
        setFeedbackText('');
        setRating(null);
    };

    return (
        <>
            <View className="px-4 items-center">
                <Text className="text-gray-800 dark:text-gray-50 text-lg font-medium mb-4">
                    {`We'd love hear more`}
                </Text>

                <View className="flex-row justify-around w-full mb-6">
                    <Pressable onPress={() => handleRatingPress(1)} className="items-center">
                        <IconSymbol
                            name="face.smiling.fill"
                            size={40}
                            color={rating === 1 ? '#EF4444' : iconColor}
                        />
                    </Pressable>
                    <Pressable onPress={() => handleRatingPress(2)} className="items-center">
                        <IconSymbol
                            name="face.dashed"
                            size={40}
                            color={rating === 2 ? '#F59E0B' : iconColor}
                        />
                    </Pressable>
                    <Pressable onPress={() => handleRatingPress(3)} className="items-center">
                        <IconSymbol
                            name="face.smiling.inverse"
                            size={40}
                            color={rating === 3 ? '#10B981' : iconColor}
                        />
                    </Pressable>
                </View>

                <TextInput
                    className={`w-full outline-none h-32 p-3 rounded-xl text-base ${inputBg} ${inputTextColor}`}
                    placeholder="Type your feedbacks"
                    placeholderTextColor={inputPlaceholderColor}
                    multiline
                    textAlignVertical="top"
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                />

            </View>
            <Button title="Submit" className='my-4 mx-4' fullWidth onPress={handleSubmit} size="lg" />
        </>
    );
}