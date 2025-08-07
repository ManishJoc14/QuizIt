
import { CheckUserNamePayload, CheckUserNameResponse, GetUserParams, GetUserResponse, QuizEditPayload, QuizEditResponse, UserEditPayload } from "@/types/user.types";
import { api } from "./api";
import { MutationSuccessResponse } from "@/types/shared.types";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<GetUserResponse, GetUserParams>({
            query: (params) => ({
                url: '/user',
                method: 'GET',
                params
            })
        }),
        getQuizForEdit: build.query<QuizEditResponse, number>({
            query: (id) => ({
                url: `/user/me/${id}/edit`,
                method: 'GET',
            }),
            providesTags: ['Quiz'],
        }),

        updateQuiz: build.mutation<MutationSuccessResponse, { id: number, values: QuizEditPayload }>({
            query: ({ id, values }) => ({
                url: `/user/me/${id}/edit`,
                method: 'PUT',
                data: values,
            }),
            invalidatesTags: ['Quiz']
        }),
        updateUser: build.mutation<MutationSuccessResponse, { values: UserEditPayload }>({
            query: ({ values }) => ({
                url: `/user/profile/edit`,
                method: 'PUT',
                data: values,
            }),
            invalidatesTags: ['User']
        }),

        deteleQuiz: build.mutation<MutationSuccessResponse, number>({
            query: (id) => ({
                url: `/user/me/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz']
        }),

        checkUsername: build.query<CheckUserNameResponse, CheckUserNamePayload>({
            query: ({ username }) => ({
                url: `/user/check-username`,
                method: 'GET',
                params: { username }
            }),
        }),
    }),
    overrideExisting: true
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetQuizForEditQuery, useDeteleQuizMutation, useUpdateQuizMutation, useUpdateUserMutation, useLazyCheckUsernameQuery } = userApi;