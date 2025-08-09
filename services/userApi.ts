import snakecaseKeys from "snakecase-keys";

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
            }),
            providesTags: ['UserProfile'],
        }),
        getQuizForEdit: build.query<QuizEditResponse, number>({
            query: (id) => ({
                url: `/user/me/${id}/edit`,
                method: 'GET',
            }),
            providesTags: ['Quiz'],
        }),
        updateQuiz: build.mutation<MutationSuccessResponse, { id: number, values: QuizEditPayload }>({
            query: ({ id, values }) => {
                const snakeysObj = snakecaseKeys(values as unknown as Record<string, unknown>, { deep: true });

                const { cover_photo, questions, tags, ...rest } = snakeysObj;
                const body = new FormData();

                for (const [key, value] of Object.entries(rest)) {
                    if (value !== undefined && value !== null) {
                        body.append(key, value as string | Blob);
                    }
                }

                body.append('questions', JSON.stringify(questions));
                body.append('tags', JSON.stringify(tags));

                // Append coverPhoto if it's a File
                if (cover_photo instanceof File) {
                    body.append('cover_photo', cover_photo);
                }

                return {
                    url: `/user/me/${id}/edit`,
                    method: 'PUT',
                    data: body,
                    meta: { contentType: 'multipart' },
                }
            },
            invalidatesTags: ['Quiz']
        }),
        updateUser: build.mutation<MutationSuccessResponse, { values: UserEditPayload }>({
            query: ({ values }) => {
                const snakeysObj = snakecaseKeys(values as Record<string, unknown>, { deep: true });

                const { photo, ...rest } = snakeysObj;
                const body = new FormData();

                for (const [key, value] of Object.entries(rest)) {
                    if (value !== undefined && value !== null) {
                        body.append(key, value as string | Blob);
                    }
                }

                // Append photo if it's a File
                if (photo instanceof File) {
                    body.append('photo', photo);
                }

                return {
                    url: `/user/profile/edit`,
                    method: 'PUT',
                    data: body,
                    meta: { contentType: 'multipart' },
                };
            },
            invalidatesTags: ['User', 'Auth'],
        }),

        deteleQuiz: build.mutation<MutationSuccessResponse, { id: number }>({
            query: ({ id }) => ({
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