import {
  JoinRoomResponse,
  LeaderboardResponse,
  RoomCodeResponse,
  StartQuizResponse,
  SubmitAnswerPayload,
  SubmitAnswerResponse,
  UserResultResponse,
} from '@/types/room.types';

import { api } from './api';

export const roomApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoomCode: builder.query<RoomCodeResponse, { quizId: string }>({
      query: ({ quizId }) => ({
        url: `/room/room-code?quiz_id=${quizId}`,
        method: 'GET',
      }),
    }),

    joinRoom: builder.mutation<JoinRoomResponse, { roomCode: string }>({
      query: ({ roomCode }) => ({
        url: `/room/${roomCode}/join`,
        method: 'POST',
      }),
      invalidatesTags: ['InviteUserList']
    }),

    startQuiz: builder.mutation<StartQuizResponse, { roomCode: string }>({
      query: ({ roomCode }) => ({
        url: `/room/start-quiz/${roomCode}`,
        method: 'POST',
      }),
    }),

    submitAnswer: builder.mutation<SubmitAnswerResponse, { roomCode: string; data: SubmitAnswerPayload }>({
      query: ({ roomCode, data }) => ({
        url: `/room/${roomCode}/game`,
        method: 'POST',
        data,
      }),
    }),

    getLeaderboard: builder.query<LeaderboardResponse, { roomCode: string; quizId: string }>({
      query: ({ roomCode, quizId }) => ({
        url: `/room/${roomCode}/${quizId}/leaderboard`,
        method: 'GET',
      }),
    }),

    getUserResult: builder.query<UserResultResponse, { roomCode: string; quizId: string; userId: string }>({
      query: ({ roomCode, quizId, userId }) => ({
        url: `/room/${roomCode}/${quizId}/${userId}/result`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetRoomCodeQuery,
  useJoinRoomMutation,
  useStartQuizMutation,
  useSubmitAnswerMutation,
  useGetLeaderboardQuery,
  useGetUserResultQuery,
} = roomApi;
