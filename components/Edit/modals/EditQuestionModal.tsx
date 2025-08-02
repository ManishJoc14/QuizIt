import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Question as BaseQuestion } from '@/types/quiz.types';

import { useTheme } from '@/context/ThemeContext';
import { EditQuestionForm } from './EditQuestionForm';
import { BulkQuestionForm } from './CreateBulkQuestionForm';

type Question = BaseQuestion & { isNew?: boolean };

interface EditQuestionModalProps {
    isVisible: boolean;
    onClose: () => void;
    questionToEdit?: Question | null;
    onSaveQuestion: (question: Question) => void;
    onDeleteQuestion?: (questionId: string) => void;
    onAddQuestionsBulk: (questions: Question[]) => void;
}

export function EditQuestionModal({
    isVisible,
    onClose,
    questionToEdit,
    onSaveQuestion,
    onDeleteQuestion,
    onAddQuestionsBulk,
}: EditQuestionModalProps) {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('Add One by One');

    // Reset tab when modal opens for adding new question
    useEffect(() => {
        if (isVisible && !questionToEdit) {
            setActiveTab('Add One by One');
        }
    }, [isVisible, questionToEdit]);

    const modalBackground = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const modalBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const headerTextColor = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';

    const tabs = ['Add One by One', 'Bulk Add'];

    const handleSaveSingleQuestion = (questionData: Question) => {
        console.log('Saving question:', questionData);
        if (questionToEdit) {
            // Editing existing question - preserve ID and metadata
            onSaveQuestion({
                ...questionData,
                id: questionToEdit.id,
                isNew: (questionToEdit as any).isNew // Preserve isNew flag if it exists
            });
        } else {
            // Adding new question - mark as new
            onSaveQuestion({
                ...questionData,
                id: uuid.v4(),
                isNew: true
            } as any);
        }
        onClose();
    };

    const handleSaveBulkQuestions = (questionsData: Question[]) => {
        onAddQuestionsBulk(questionsData);
        onClose();
    };

    const handleDeleteSingleQuestion = (questionId: string | number) => {
        if (onDeleteQuestion) {
            onDeleteQuestion(String(questionId));
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50">
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className={`w-full p-6 rounded-t-2xl border-t border-l border-r ${modalBackground} ${modalBorderColor}`}>
                        {/* Modal Header */}
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className={`text-xl font-semibold ${headerTextColor}`}>
                                {questionToEdit ? 'Edit Question' : (activeTab === 'Add One by One' ? 'Add Question' : 'Bulk Add Questions')}
                            </Text>
                            <Pressable onPress={onClose} className="p-2">
                                <IconSymbol name="xmark.circle.fill" size={24} color={theme === 'dark' ? '#D1D5DB' : '#6B7280'} />
                            </Pressable>
                        </View>

                        {/* Tabs for Add One by One / Bulk Add (only visible in add mode) */}
                        {!questionToEdit && (
                            <View className="flex-row bg-gray-200 dark:bg-gray-700 rounded-xl p-1 mb-6">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab;
                                    const tabBg = isActive ? 'bg-white dark:bg-gray-900' : 'bg-transparent';
                                    const textColor = isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300';

                                    return (
                                        <Pressable
                                            key={tab}
                                            onPress={() => setActiveTab(tab)}
                                            className={`flex-1 items-center justify-center py-2 rounded-lg ${tabBg}`}
                                        >
                                            <Text className={`text-base font-medium ${textColor}`}>{tab}</Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        )}

                        {/* Render content based on mode (add/edit) and active tab */}
                        {questionToEdit ? (
                            <EditQuestionForm
                                initialData={questionToEdit}
                                onSave={handleSaveSingleQuestion}
                                onCancel={onClose}
                                onDelete={onDeleteQuestion ? handleDeleteSingleQuestion : undefined}
                                isEditing={true}
                            />
                        ) : (
                            activeTab === 'Add One by One' ? (
                                <EditQuestionForm
                                    onSave={handleSaveSingleQuestion}
                                    onCancel={onClose}
                                    isEditing={false}
                                />
                            ) : (
                                <BulkQuestionForm
                                    onSave={handleSaveBulkQuestions}
                                    onCancel={onClose}
                                />
                            )
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}