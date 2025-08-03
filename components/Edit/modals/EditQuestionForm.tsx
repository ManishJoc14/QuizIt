import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Question } from '@/types/quiz.types';
import { useTheme } from '@/context/ThemeContext';
import { ConfirmationModal } from '@/components/ConfirmModal';

interface EditQuestionFormProps {
    initialData?: Question; // for editing existing questions
    onSave: (question: Question) => void;
    onCancel: () => void;
    onDelete?: (questionId: string | number) => void; // for deleting in edit mode
    isEditing: boolean; // to differentiate between add and edit modes
}

export function EditQuestionForm({
    initialData,
    onSave,
    onCancel,
    onDelete,
    isEditing
}: EditQuestionFormProps) {
    const { theme } = useTheme();

    const [questionText, setQuestionText] = useState(initialData?.question || '');
    const [options, setOptions] = useState<string[]>(initialData?.options || ['', '', '', '']);
    const [correctOption, setCorrectOption] = useState<number>(initialData?.correctOption ?? 0);
    const [points, setPoints] = useState(initialData?.points || 10);
    const [duration, setDuration] = useState(initialData?.duration || 30);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const inputPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const labelTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    const handleSave = () => {
        if (!questionText.trim() || options.some(opt => !opt.trim())) {
            Alert.alert('Validation Error', 'Please fill in all question and option fields.');
            return;
        }
        if (points <= 0 || duration <= 0) {
            Alert.alert('Validation Error', 'Points and duration must be positive numbers.');
            return;
        }
        if (correctOption >= options.length || correctOption < 0) {
            Alert.alert('Validation Error', 'Please select a valid correct option.');
            return;
        }

        const questionToSave: Question = {
            id: initialData?.id,
            question: questionText,
            options: options.filter(opt => opt.trim() !== ''),
            correctOption: correctOption,
            points: points,
            duration: duration,
            questionIndex: initialData?.questionIndex ?? 0,
        };
        onSave(questionToSave);
    };

    const isNewQuestion = (initialData as any)?.isNew || !initialData;

    const handleDelete = () => setShowConfirmModal(true);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Show question status */}
            {initialData && (
                <View className="mb-4">
                    <View className={`inline-flex px-3 py-1 rounded-full ${isNewQuestion ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                        <Text className={`text-sm font-medium ${isNewQuestion ? 'text-green-800 dark:text-green-200' : 'text-blue-800 dark:text-blue-200'}`}>
                            {isNewQuestion ? 'New Question' : 'Existing Question'}
                        </Text>
                    </View>
                </View>
            )}

            {/* Question */}
            <Text className={`text-lg font-semibold mb-3 ${labelTextColor}`}>Question</Text>
            <TextInput
                className={`w-full h-24 p-3 rounded-xl text-base ${inputBg} ${inputTextColor} mb-4`}
                placeholder="Type your question"
                placeholderTextColor={inputPlaceholderColor}
                multiline
                textAlignVertical="top"
                value={questionText}
                onChangeText={setQuestionText}
            />

            {/* Options */}
            <Text className={`text-lg font-semibold mb-4 ${labelTextColor}`}>Options</Text>
            <View className="gap-3 mb-10">
                {options.map((option, i) => (
                    <View key={i} className={`flex-row items-center p-3 rounded-xl ${inputBg}`}>
                        <Pressable onPress={() => setCorrectOption(i)} className="mr-3">
                            <IconSymbol
                                name={i === correctOption ? 'checkmark.circle' : 'circle'}
                                size={24}
                                color={i === correctOption ? '#10B981' : iconColor}
                            />
                        </Pressable>
                        <TextInput
                            className={`flex-1 text-base ${inputTextColor}`}
                            placeholder={`Option ${i + 1}`}
                            placeholderTextColor={inputPlaceholderColor}
                            value={option}
                            onChangeText={(text) => {
                                const newOptions = [...options];
                                newOptions[i] = text;
                                setOptions(newOptions);
                            }}
                        />
                    </View>
                ))}
            </View>

            {/* Points and duration */}
            <View className="flex-row justify-between mb-12">
                <View className="flex-row items-center">
                    <Text className={`text-lg font-semibold ${labelTextColor} mr-2`}>Points:</Text>
                    <Pressable onPress={() => setPoints(Math.max(1, points - 1))} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
                        <IconSymbol name="minus" size={20} color={iconColor} />
                    </Pressable>
                    <Text className={`text-lg font-semibold ${inputTextColor} mx-2`}>{points}</Text>
                    <Pressable onPress={() => setPoints(points + 1)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
                        <IconSymbol name="plus" size={20} color={iconColor} />
                    </Pressable>
                </View>
                <View className="flex-row items-center">
                    <Text className={`text-lg font-semibold ${labelTextColor} mr-2`}>Time (s):</Text>
                    <Pressable onPress={() => setDuration(Math.max(5, duration - 5))} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
                        <IconSymbol name="minus" size={20} color={iconColor} />
                    </Pressable>
                    <Text className={`text-lg font-semibold ${inputTextColor} mx-2`}>{duration}</Text>
                    <Pressable onPress={() => setDuration(duration + 5)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
                        <IconSymbol name="plus" size={20} color={iconColor} />
                    </Pressable>
                </View>
            </View>

            {/* Buttons */}
            <View className="gap-3">
                <View className="flex-row justify-around gap-3">
                    {/* Delete button - only show for existing questions */}
                    {initialData && onDelete && (
                        <Button
                            title="Delete"
                            onPress={handleDelete}
                            variant="outline"
                            color="danger"
                            size="lg"
                            fullWidth
                        />
                    )}
                    <Button
                        title="Cancel"
                        onPress={onCancel}
                        variant="outline"
                        color="gray"
                        size="lg"
                        fullWidth
                    />
                    {/* Add/Save button */}
                    {!isEditing && (
                        <Button
                            title="Add Question"
                            onPress={handleSave}
                            variant="solid"
                            color="primary"
                            size="lg"
                            fullWidth
                        />
                    )}
                </View>

                {/* Save changes button for editing */}
                {isEditing && (
                    <View className="mt-2">
                        <Button
                            title="Save Changes"
                            onPress={handleSave}
                            variant="solid"
                            color="primary"
                            size="lg"
                            fullWidth
                        />
                    </View>
                )}
            </View>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isVisible={showConfirmModal}
                title="Delete Question"
                message="Are you sure you want to delete this question? This action cannot be undone."
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={() => {
                    if (initialData && initialData.id !== undefined && typeof onDelete === 'function') {
                        onDelete(initialData.id);
                    }
                    setShowConfirmModal(false);
                }}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </ScrollView>
    );
}