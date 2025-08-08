import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

import { CreateQuizForm } from '@/components/Create/CreateQuizForm';
import { QuestionModal } from '@/components/Create/modals/CreateQuestionModal';
import { useCreateQuiz } from '@/hooks/quiz/useCreateQuiz';

export function CreateQuizSection() {
    const { theme } = useTheme();

    const {
        title, setTitle,
        description, setDescription,
        coverPhotoFile, setCoverPhotoFile,
        coverPhotoUri, setCoverPhotoUri,
        selectedTags, toggleTag,
        availableTags, isTagsLoading,
        questions, addQuestion, editQuestion,
        saveQuestion, deleteQuestion, addQuestionsBulk,
        isQuestionModalVisible, questionToEdit, closeQuestionModal,
        submitQuiz, isSubmittingQuiz
    } = useCreateQuiz();

    const handleCoverPhotoChange = (data: { uri: string; file: File }) => {
        setCoverPhotoFile(data.file);
        setCoverPhotoUri(data.uri);
    };

    return (
        <>
            {/* shows quiz's details and options to open modals for add or edit feature */}
            <CreateQuizForm
                title={title}
                description={description}
                coverPhoto={coverPhotoUri}
                selectedTags={selectedTags}
                questions={questions}
                availableTags={availableTags}
                isTagsLoading={isTagsLoading}
                onChangeTitle={setTitle}
                onChangeDescription={setDescription}
                onChangeCoverPhoto={handleCoverPhotoChange}
                onToggleTag={toggleTag}
                onSubmit={() =>
                    submitQuiz({
                        isPublished: true,
                        data: {
                            title,
                            description,
                            coverPhotoUri,
                            coverPhotoFile,
                            questions,
                            tags: selectedTags,
                        },
                    })
                }
                onAddQuestion={addQuestion}
                onEditQuestion={editQuestion}
            />

            {/* this is the modal to be shown */}
            <QuestionModal
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
                    <Text className="text-white mt-4">Saving quiz...</Text>
                </View>
            )}
        </>
    );
}
