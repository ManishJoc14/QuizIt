import { CheckUserNamePayload, CheckUserNameResponse, GetUserParams, GetUserResponse, GetUsersQuizzesQueryParams, QuizEditPayload, QuizEditResponse, UserEditPayload, UserProfileResponse } from "@/types/user.types";
import { MutationSuccessResponse } from "@/types/shared.types";
import { QuizzesResponse } from "@/types/quiz.types";

import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<GetUserResponse, GetUserParams>({
            query: (params) => ({
                url: '/user',
                method: 'GET',
                params
            })
        }),
        getUserProfile: build.query<UserProfileResponse, { userId: number }>({
            query: ({ userId }) => ({
                url: `/user/profile/${userId}`,
                method: 'GET',
                params: { userId }
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
        getUsersQuizzes: build.query<QuizzesResponse, GetUsersQuizzesQueryParams>({
            query: ({ userId, filter, order }) => ({
                url: `/user/${userId}/quizzes`,
                method: 'GET',
                params: { filter, order },
            }),
            providesTags: ['Quiz'],
        }),
    }),
    overrideExisting: true
});

export const { useGetUserQuery, useGetUserProfileQuery, useLazyGetUserQuery, useGetQuizForEditQuery, useDeteleQuizMutation, useUpdateQuizMutation, useUpdateUserMutation, useLazyCheckUsernameQuery, useLazyGetUsersQuizzesQuery } = userApi;