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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);

    const [createQuiz, { isLoading: isSubmittingQuiz }] = useCreateQuizMutation();

    // useEffect(() => {
    //     console.log('Current questions:', questions);
    //     console.log('Current selected tags:', selectedTags);
    //     console.log('Current title:', title);
    //     console.log('Current description:', description);
    // }, [questions, selectedTags, title, description]);

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
        data: any;
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

        const UpdatedQuestions = data.questions.map((q: Question, index: number) => {
            const { id, ...rest } = q;
            return {
                ...rest, // not including id here
                questionIndex: index, // Assign index for ordering
            };
        });

        const payload: CreateQuizPayload = {
            title: data.title,
            description: data.description,
            coverPhoto: null,
            isPublished,
            questions: UpdatedQuestions,
            tags: data.tags,
        };

        try {
            const result = await createQuiz(payload).unwrap();
            Alert.alert('Success', result.message || 'Quiz submitted!');
            Toast.show({
                type: 'success',
                text1: 'Quiz Created',
                text2: 'Your quiz has been created successfully!',
            });
            // reset form state
            setTitle('');
            setDescription('');
            setCoverPhoto('');
            setSelectedTags([]);
            setQuestions([]);
            closeQuestionModal();
            // Optionally, navigate to another screen or reset the form
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
            })
        }
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        coverPhoto,
        setCoverPhoto,
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
