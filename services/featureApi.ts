import { FollowUserPayload, InviteUserListResponse, InviteFriendPayload, TopAuthorListResponse, UserSearchResponse, ContactPayload, FeedbackPayload, AboutUsResponse } from '@/types/feature.types';
import { GetUsersQuizzesQueryParams } from '@/types/user.types';
import { MutationSuccessResponse } from '@/types/shared.types';
import { QuizzesResponse } from '@/types/quiz.types';

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

        getTopQuizzesList: builder.query<QuizzesResponse, void>({
            query: () => ({
                url: '/top-quizzes',
                method: 'GET',
            }),
        }),

        getFavouriteQuizzesList: builder.query<QuizzesResponse, GetUsersQuizzesQueryParams>({
            query: ({ userId, filter, order }) => ({
                url: '/favourite-quizzes',
                method: 'GET',
                params: { filter, order },
            }),
            providesTags: ['FavouriteQuiz'],
        }),

        followUser: builder.mutation<MutationSuccessResponse, FollowUserPayload>({
            query: (values) => ({
                url: '/follow-user',
                method: 'POST',
                data: values,
            }),
            invalidatesTags: ['QuizDetailed', 'UserProfile'],
        }),
        unFollowUser: builder.mutation<MutationSuccessResponse, FollowUserPayload>({
            query: (values) => ({
                url: '/unfollow-user',
                method: 'DELETE',
                data: values,
            }),
            invalidatesTags: ['QuizDetailed', 'UserProfile'],
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
                url: `/favourite-quiz`,
                method: 'POST',
                data: { quizId: String(quizId) },
            }),
            invalidatesTags: ['QuizDetailed'],
        }),

        unFavoriteQuiz: builder.mutation<MutationSuccessResponse, { quizId: number }>({
            query: ({ quizId }) => ({
                url: `/favourite-quiz/${quizId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['QuizDetailed'],
        }),

        decryptOption: builder.mutation<{ decryptedAnswer: number }, { encryptedText: string }>({
            query: ({ encryptedText }) => ({
                url: '/quiz/decrypt',
                method: 'POST',
                data: { encryptedText },
            }),
        }),

        searchUsers: builder.query<UserSearchResponse, { search: string }>({
            query: ({ search }) => ({
                url: '/search-users',
                method: 'GET',
                params: { search },
            }),
        }),

        contactUs: builder.mutation<{ decryptedAnswer: number }, ContactPayload>({
            query: (values) => ({
                url: '/contact-us',
                method: 'POST',
                data: values,
            }),
        }),
        feedback: builder.mutation<{ decryptedAnswer: number }, FeedbackPayload>({
            query: (values) => ({
                url: '/feedback',
                method: 'POST',
                data: values,
            }),
        }),
        getAboutUs: builder.query<AboutUsResponse, void>({
            query: () => ({
                url: '/about-us',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetInviteUserListQuery,
    useGetTopQuizzesListQuery,
    useFollowUserMutation,
    useUnFollowUserMutation,
    useInviteFriendMutation,
    useGetTopAuthorsListQuery,
    useFavoriteQuizMutation,
    useUnFavoriteQuizMutation,
    useDecryptOptionMutation,
    useLazyGetFavouriteQuizzesListQuery,
    useLazySearchUsersQuery,
    useContactUsMutation,
    useFeedbackMutation,
    useLazyGetAboutUsQuery,
    useGetAboutUsQuery,
} = roomApi;
