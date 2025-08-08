import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import { CreateQuizPayload, Question } from '@/types/quiz.types';
import { useCreateQuizMutation, useGetQuizTagsQuery } from '@/services/quizApi';

export function useCreateQuiz() {
    const { data, isLoading: isTagsLoading } = useGetQuizTagsQuery();
    const router = useRouter();

    const availableTags = data?.quizTags ?? [];

    // Split coverPhoto state into URI and File
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
    const [coverPhotoUri, setCoverPhotoUri] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);

    const [createQuiz, { isLoading: isSubmittingQuiz }] = useCreateQuizMutation();

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const addQuestion = () => {
        setQuestionToEdit(null);
        setIsQuestionModalVisible(true);
    };

    const editQuestion = (questionId: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            setQuestionToEdit(question);
            setIsQuestionModalVisible(true);
        }
    };

    const saveQuestion = (questionData: Question) => {
        if (questionToEdit) {
            setQuestions((prev) =>
                prev.map((q) => (q.id === questionData.id ? questionData : q))
            );
        } else {
            setQuestions((prev) => [...prev, { ...questionData, id: questionData.id || uuid.v4() }]);
        }
        closeQuestionModal();
    };

    const deleteQuestion = (questionId: string) => {
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
        closeQuestionModal();
    };

    const addQuestionsBulk = (bulkQuestions: Question[]) => {
        setQuestions((prev) => [
            ...prev,
            ...bulkQuestions.map((q) => ({ ...q, id: q.id || uuid.v4() })),
        ]);
        closeQuestionModal();
    };

    const closeQuestionModal = () => {
        setIsQuestionModalVisible(false);
        setQuestionToEdit(null);
    };

    const submitQuiz = async ({
        isPublished,
        data,
    }: {
        isPublished: boolean;
        data: {
            title: string;
            description: string;
            coverPhotoUri: string;
            coverPhotoFile: File | null;
            questions: Question[];
            tags: string[];
        };
    }) => {
        if (!data.title.trim()) {
            Alert.alert('Validation Error', 'Quiz title is required.');
            return;
        }
        if (data.questions.length === 0) {
            Alert.alert('Validation Error', 'Please add at least one question.');
            return;
        }
        if (data.tags.length === 0) {
            Alert.alert('Validation Error', 'Please select at least one tag.');
            return;
        }

        // Remove ids from questions, add questionIndex
        const UpdatedQuestions = data.questions.map((q: Question, index: number) => {
            const { id, ...rest } = q;
            return {
                ...rest,
                questionIndex: index,
            };
        });

        const payload: CreateQuizPayload = {
            title: data.title,
            description: data.description,
            coverPhoto: data.coverPhotoFile || data.coverPhotoUri || null,
            isPublished,
            questions: UpdatedQuestions,
            tags: data.tags,
        };

        try {
            const result = await createQuiz(payload).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Quiz Created',
                text2: result.message || 'Your quiz has been created successfully.',
            });
            // Reset form state
            setTitle('');
            setDescription('');
            setCoverPhotoFile(null);
            setCoverPhotoUri('');
            setSelectedTags([]);
            setQuestions([]);
            closeQuestionModal();
            router.replace({
                pathname: '/library',
                params: {},
            });
        } catch (error) {
            console.error('Submit Error:', JSON.stringify(error, null, 2));
            Toast.show({
                type: 'error',
                text1: 'Quiz Creation Failed',
                text2: 'An error occurred while creating the quiz.',
            });
        }
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        coverPhotoFile,
        setCoverPhotoFile,
        coverPhotoUri,
        setCoverPhotoUri,
        selectedTags,
        toggleTag,
        availableTags,
        isTagsLoading,
        questions,
        addQuestion,
        editQuestion,
        saveQuestion,
        deleteQuestion,
        addQuestionsBulk,
        isQuestionModalVisible,
        questionToEdit,
        closeQuestionModal,
        submitQuiz,
        isSubmittingQuiz,
    };
}
