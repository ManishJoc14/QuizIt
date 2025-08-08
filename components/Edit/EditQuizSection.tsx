import React from 'react';

import { View, ActivityIndicator, Text } from 'react-native';

import { useEditQuiz } from '@/hooks/quiz/useEditQuiz';
import { useTheme } from '@/context/ThemeContext';

import { EditQuestionModal } from './modals/EditQuestionModal';
import { EditQuizForm } from './EditQuizForm';

interface EditQuizSectionProps {
    quizId: number;
}

export function EditQuizSection({ quizId }: EditQuizSectionProps) {
    const { theme } = useTheme();

    const {
        title, setTitle,
        description, setDescription,
        coverPhoto, setCoverPhoto,
        selectedTags, toggleTag,
        availableTags, isTagsLoading,
        questions, addQuestion, editQuestion,
        saveQuestion, deleteQuestion, addQuestionsBulk,
        isQuestionModalVisible, questionToEdit, closeQuestionModal,
        submitQuiz, isSubmittingQuiz, isQuizLoading,
        deletedQuestionIds
    } = useEditQuiz(quizId);

    if (isQuizLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={theme === 'dark' ? '#F9FAFB' : '#111827'} />
                <Text className="text-gray-600 dark:text-gray-400 mt-4">Loading quiz...</Text>
            </View>
        );
    }

    return (
        <>
            <EditQuizForm
                title={title}
                description={description}
                coverPhoto={coverPhoto}
                selectedTags={selectedTags}
                questions={questions}
                availableTags={availableTags}
                isTagsLoading={isTagsLoading}
                onChangeTitle={setTitle}
                onChangeDescription={setDescription}
                onChangeCoverPhoto={setCoverPhoto}
                onToggleTag={toggleTag}
                onSubmit={submitQuiz}
                onAddQuestion={addQuestion}
                onEditQuestion={editQuestion}
                deletedQuestionIds={deletedQuestionIds}
            />

            <EditQuestionModal
                isVisible={isQuestionModalVisible}
                onClose={closeQuestionModal}
                questionToEdit={questionToEdit}
                onSaveQuestion={saveQuestion}
                onDeleteQuestion={deleteQuestion}
                onAddQuestionsBulk={addQuestionsBulk}
            />

            {isSubmittingQuiz && (
                <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
                    <ActivityIndicator size="large" color={theme === 'dark' ? '#F9FAFB' : '#111827'} />
                    <Text className="text-white mt-4">Updating quiz...</Text>
                </View>
            )}
        </>
    );
}
