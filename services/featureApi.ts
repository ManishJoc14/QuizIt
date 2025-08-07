import { FollowUserPayload, InviteUserListResponse, InviteFriendPayload } from '@/types/feature.types';
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
    }),
});

export const {
    useGetInviteUserListQuery,
    useFollowUserMutation,
    useInviteFriendMutation,
} = roomApi;
