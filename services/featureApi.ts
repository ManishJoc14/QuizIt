import { FollowUserPayload, InviteUserListResponse, InviteFriendPayload, TopAuthorListResponse } from '@/types/feature.types';
import { MutationSuccessResponse } from '@/types/shared.types';

import { api } from './api';

export const roomApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getInviteUserList: builder.query<InviteUserListResponse, void>({
            query: () => ({
                url: '/invite-user-list',
                method: 'GET',
            }),
            providesTags: ['InviteUserList'],
        }),
        getTopAuthorsList: builder.query<TopAuthorListResponse, void>({
            query: () => ({
                url: '/top-authors',
                method: 'GET',
            }),
        }),

        followUser: builder.mutation<MutationSuccessResponse, FollowUserPayload>({
            query: (values) => ({
                url: '/follow-user',
                method: 'POST',
                data: values,
            }),
            invalidatesTags: ['QuizDetailed'],
        }),

        inviteFriend: builder.mutation<MutationSuccessResponse, { roomCode: string; values: InviteFriendPayload }>({
            query: ({ roomCode, values }) => ({
                url: `/room/${roomCode}/invite`,
                method: 'POST',
                data: values,
            }),
            invalidatesTags: ['InviteUserList']
        }),

        favoriteQuiz: builder.mutation<MutationSuccessResponse, { quizId: number }>({
            query: ({ quizId }) => ({
                url: `/favorite-quiz`,
                method: 'POST',
                data: { quizId },
            }),
        }),

        unFavoriteQuiz: builder.mutation<MutationSuccessResponse, { quizId: number }>({
            query: ({ quizId }) => ({
                url: `/favorite-quiz/${quizId}`,
                method: 'DELETE',
            }),
        }),

        decryptOption: builder.query<{ decryptedAnswer: number }, { encryptedText: string }>({
            query: ({ encryptedText }) => ({
                url: '/quiz/decrypt',
                method: 'POST',
                data: { encryptedText },
            }),
        }),
    }),
});

export const {
    useGetInviteUserListQuery,
    useFollowUserMutation,
    useInviteFriendMutation,
    useGetTopAuthorsListQuery,
    useFavoriteQuizMutation,
    useUnFavoriteQuizMutation,
    useLazyDecryptOptionQuery,
} = roomApi;
