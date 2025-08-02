export interface RoomCodeResponse {
  roomCode: string;
  redirect: string;
}

export interface JoinRoomResponse {
  quizId: number;
  message: string;
  participantId: number;
  isJoined: boolean;
}

export interface StartQuizResponse {
  message: string;
}

export interface SubmitAnswerPayload {
  questionIndex: number;
  selectedOption: string;
  point: number;
  answeredAt: string;
}

export interface SubmitAnswerResponse {
  answerId: number;
  questionShowId: number;
  isCorrect: boolean;
}

export interface LeaderboardResponse {
  message: string;
  userScore: {
    id: number;
    name: string;
    image: string;
    rank: number;
    score: number;
  }[];
}

export interface UserResultResponse {
  message: string;
  userInfo: {
    id: number;
    name: string;
    image: string;
    score: number;
  };
  answers: {
    question: string;
    options: string[];
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
  }[];
}
