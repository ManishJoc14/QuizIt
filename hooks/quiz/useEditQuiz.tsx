import { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { Question } from '@/types/quiz.types';
import {
    useGetQuizTagsQuery,
    useDeleteQuizQuestionMutation
} from '@/services/quizApi';
import { useGetQuizForEditQuery, useUpdateQuizMutation } from '@/services/userApi';
import { QuizEditPayload } from '@/types/user.types';

export function useEditQuiz(quizId: number) {
    const { data: quizData, isLoading: isQuizLoading } = useGetQuizForEditQuery(quizId);
    const { data: tagsData, isLoading: isTagsLoading } = useGetQuizTagsQuery();
    const router = useRouter();

    const availableTags = useMemo(() => tagsData?.quizTags ?? [], [tagsData]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [deletedQuestionIds, setDeletedQuestionIds] = useState<number[]>([]);

    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);

    const [updateQuiz, { isLoading: isSubmittingQuiz }] = useUpdateQuizMutation();
    const [deleteQuizQuestion] = useDeleteQuizQuestionMutation();

    // Initialize form with existing quiz data
    useEffect(() => {
        if (quizData?.editData) {
            const editData = quizData.editData;
            setTitle(editData.title || '');
            setDescription(editData.description || '');
            setCoverPhoto(editData.coverPhoto || '');
            setSelectedTags(availableTags || []);
            setQuestions(editData.questions || []);
        }
    }, [quizData, availableTags]);

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
        const question = questions.find((q) => String(q.id) === questionId);
        if (question) {
            setQuestionToEdit(question);
            setIsQuestionModalVisible(true);
        }
    };

    const saveQuestion = (questionData: Question) => {
        if (questionToEdit) {
            // Editing existing question
            setQuestions((prev) =>
                prev.map((q) => (String(q.id) === String(questionData.id) ? questionData : q))
            );
        } else {
            // Adding new question (no backend ID yet)
            const newQuestion = {
                ...questionData,
                id: uuid.v4() as any, // Temporary ID for frontend
                isNew: true // Flag to identify new questions
            };
            setQuestions((prev) => [...prev, newQuestion]);
        }
        closeQuestionModal();
    };

    const deleteQuestionFromList = async (questionId: string) => {
        const question = questions.find(q => String(q.id) === questionId);

        if (question && typeof question.id === 'number') {
            // Existing question from backend - add to delete list
            setDeletedQuestionIds(prev => [...prev, question.id as number]);
        }

        // Remove from current questions list
        setQuestions((prev) => prev.filter((q) => String(q.id) !== questionId));
        closeQuestionModal();
    };

    const addQuestionsBulk = (bulkQuestions: Question[]) => {
        const questionsWithTempIds = bulkQuestions.map((q) => ({
            ...q,
            id: uuid.v4() as any,
            isNew: true
        }));
        setQuestions((prev) => [...prev, ...questionsWithTempIds]);
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

        try {
            // First, delete removed questions
            for (const questionId of deletedQuestionIds) {
                await deleteQuizQuestion({ quizId: Number(quizId), questionId }).unwrap();
            }

            // Prepare questions for update
            const updatedQuestions = data.questions.map((q: Question & { isNew?: boolean }, index: number) => {
                if (q.isNew) {
                    // New question - don't send ID
                    const { id, isNew, ...rest } = q;
                    return {
                        ...rest,
                        questionIndex: index,
                    };
                } else {
                    // Existing question - include ID
                    return {
                        id: q.id,
                        question: q.question,
                        options: q.options,
                        correctOption: q.correctOption,
                        points: q.points,
                        duration: q.duration,
                        questionIndex: index,
                    };
                }
            });

            const payload: QuizEditPayload = {
                title: data.title,
                description: data.description,
                coverPhoto: data.coverPhoto || null,
                isPublished,
                questions: updatedQuestions,
                tags: data.tags,
            };

            const result = await updateQuiz({ id: Number(quizId), values: payload }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Quiz Updated',
                text2: result.message || 'Your quiz has been updated successfully.',
            });

            // Clear deleted questions list
            setDeletedQuestionIds([]);

            router.replace({
                pathname: '/library',
                params: {},
            });
        } catch (error) {
            console.error('Update Error:', JSON.stringify(error, null, 2));
            Toast.show({
                type: 'error',
                text1: 'Quiz Update Failed',
                text2: 'An error occurred while updating the quiz.',
            });
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
        deleteQuestion: deleteQuestionFromList,
        addQuestionsBulk,
        isQuestionModalVisible,
        questionToEdit,
        closeQuestionModal,
        submitQuiz,
        isSubmittingQuiz,
        isQuizLoading,
        deletedQuestionIds,
    };
}