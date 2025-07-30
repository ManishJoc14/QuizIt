import { CreateQuizPayload, QuizTagsResponse } from "@/types/quiz.types";
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
        // getQuizzes: build.query<QuizTagsResponse, void>({
        //     query: (query) => ({
        //         url: '/quiz/',
        //         method: 'GET',
        //         params: query,
        //     }),
        // }),
    }),
    overrideExisting: true,
});

export const { useCreateQuizMutation, useGetQuizTagsQuery } = quizApi;