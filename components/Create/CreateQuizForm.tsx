import React from 'react';

import {
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    Pressable,
    TouchableOpacity,
} from 'react-native';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Question } from '@/types/quiz.types';
import { useTheme } from '@/context/ThemeContext';
import { getRandomImage } from '@/utils/functions/getRandomImage';

import { ResultQuestionCard } from '../Join/Result/ResultQuestionCard';
import { TagSelection } from './CreateTagSelection';

interface CreateQuizFormProps {
    title: string;
    description: string;
    coverPhoto: string;
    selectedTags: string[];
    questions: Question[];
    availableTags: string[];
    isTagsLoading: boolean;
    onChangeTitle: (text: string) => void;
    onChangeDescription: (text: string) => void;
    onChangeCoverPhoto: (url: string) => void;
    onToggleTag: (tag: string) => void;
    onSubmit: (payload: { isPublished: boolean; data: any }) => void;
    onAddQuestion: () => void;
    onEditQuestion: (questionId: string) => void;
}

export function CreateQuizForm({
    title,
    description,
    coverPhoto,
    selectedTags,
    questions,
    availableTags,
    isTagsLoading,
    onChangeTitle,
    onChangeDescription,
    onChangeCoverPhoto,
    onToggleTag,
    onSubmit,
    onAddQuestion,
    onEditQuestion,
}: CreateQuizFormProps) {
    const { theme } = useTheme();

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';
    const inputPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const labelTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    const handleImagePick = () => {
        const randomImage = getRandomImage();
        onChangeCoverPhoto(randomImage);
    };

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Quiz Details */}
            <View className="px-2 mb-8">
                <Text className={`text-2xl font-semibold mb-4 ${labelTextColor}`}>Quiz Details</Text>

                <View className="mb-4">
                    <Text className={`text-lg font-medium mb-2 ${labelTextColor}`}>Title</Text>
                    <TextInput
                        className={`w-full p-3 rounded-xl text-lg ${inputBg} ${inputTextColor}`}
                        placeholder="Enter quiz title"
                        placeholderTextColor={inputPlaceholderColor}
                        value={title}
                        onChangeText={onChangeTitle}
                    />
                </View>

                <View className="mb-4">
                    <Text className={`text-lg font-medium mb-2 ${labelTextColor}`}>Description</Text>
                    <TextInput
                        className={`w-full h-64 p-3 rounded-xl text-lg ${inputBg} ${inputTextColor}`}
                        placeholder="Enter quiz description"
                        placeholderTextColor={inputPlaceholderColor}
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={onChangeDescription}
                    />
                </View>

                <View className="mb-4">
                    <Text className={`text-lg font-medium mb-2 ${labelTextColor}`}>Cover Photo</Text>
                    <Pressable onPress={handleImagePick} className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 items-center justify-center">
                        {coverPhoto ? (
                            <Image source={{ uri: coverPhoto }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <IconSymbol name="camera.fill" size={40} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                        )}
                        <View className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2">
                            <IconSymbol name="plus" size={16} color="white" />
                        </View>
                    </Pressable>
                </View>

                <View className="mb-4">
                    <Text className={`text-lg font-medium mb-2 ${labelTextColor}`}>Tags</Text>
                    <TagSelection
                        availableTags={availableTags}
                        selectedTags={selectedTags}
                        onTagToggle={onToggleTag}
                        isLoading={isTagsLoading}
                    />
                </View>
            </View>

            {/* Quiz Questions */}
            <View className="px-2 mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className={`text-2xl font-semibold ${labelTextColor}`}>Questions ({questions.length})</Text>
                    <Button title="Add Question" onPress={onAddQuestion} size="md" />
                </View>

                {questions.length === 0 ? (
                    <View className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl items-center justify-center h-52">
                        <Text className="text-gray-600 dark:text-gray-400">No questions added yet.</Text>
                    </View>
                ) : (
                    questions.map((q, index) => (
                        <TouchableOpacity key={String(q.id ?? index)} onPress={() => onEditQuestion(String(q.id ?? ''))}>
                            <ResultQuestionCard
                                id={index}
                                key={q.id ?? index}
                                index={index + 1}
                                question={q.question}
                                options={q.options}
                                correctIndex={q.correctOption}
                                selectedIndex={q.correctOption}
                                points={q.points}
                                timeTaken={q.duration}
                            />
                        </TouchableOpacity>
                    ))
                )}
            </View>

            {/* Buttons */}
            <View className="flex-row justify-around px-2 gap-3 mb-4">
                <Button
                    title="Submit Quiz"
                    onPress={() =>
                        onSubmit({
                            isPublished: true,
                            data: { title, description, coverPhoto, questions, tags: selectedTags },
                        })
                    }
                    variant="solid"
                    color="primary"
                    size="lg"
                    fullWidth
                />
            </View>
        </ScrollView>
    );
}
