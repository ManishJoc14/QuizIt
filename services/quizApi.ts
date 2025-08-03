import { CreateQuizPayload, GetMyQuizzesQueryParams, QuizQuestionsResponse, QuizResponse, QuizTagsResponse, QuizzesResponse } from "@/types/quiz.types";
import { MutationSuccessResponse } from "@/types/shared.types";

import { api } from "./api";

export const quizApi = api.injectEndpoints({
    endpoints: (build) => ({
        createQuiz: build.mutation<MutationSuccessResponse, CreateQuizPayload>({
            query: (body) => ({
                url: '/quiz/upload-quiz',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['Quiz'],
        }),
        getQuizTags: build.query<QuizTagsResponse, void>({
            query: (query) => ({
                url: '/quiz/tags-option',
                method: 'GET',
                params: query,
            }),
        }),
        getQuizzes: build.query<QuizzesResponse, void>({
            query: (query) => ({
                url: '/quiz/',
                method: 'GET',
                params: query,
            }),
            providesTags: ['Quiz'],
        }),
        getMyQuizzes: build.query<QuizzesResponse, GetMyQuizzesQueryParams>({
            query: (query) => ({
                url: '/quiz/',
                method: 'GET',
                params: query,
            }),
            providesTags: ['Quiz'],
        }),
        getQuizById: build.query<QuizResponse, number>({
            query: (id) => ({
                url: `/quiz/${id}`,
                method: 'GET',
            }),
            providesTags: ['Quiz'],
        }),
        getQuizQuestions: build.query<QuizQuestionsResponse, number>({
            query: (id) => ({
                url: `/quiz/quiz-questions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Quiz'],
        }),
        deleteQuizQuestion: build.mutation<MutationSuccessResponse, { quizId: number, questionId: number }>({
            query: ({ quizId, questionId }) => ({
                url: `/quiz/${quizId}/question/${questionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz']
        }),
    }),
    overrideExisting: true,
});

export const { useCreateQuizMutation, useGetQuizTagsQuery, useGetQuizzesQuery, useLazyGetMyQuizzesQuery, useGetQuizByIdQuery, useGetQuizQuestionsQuery, useDeleteQuizQuestionMutation } = quizApi;