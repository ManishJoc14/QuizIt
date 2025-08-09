import { ILibraryQuiz } from "@/components/Library/types";

export interface Question {
    id?: number | string;
    question: string;
    options: string[];
    questionIndex: number; // index for ordering
    correctOption: number; // Index of the correct answer in options
    points: number; // Points awarded for this question
    duration: number; // Duration in seconds to answer this question
}

export interface CreateQuizPayload {
    title: string;
    description: string;
    coverPhoto: File | string | null;
    isPublished: boolean;
    questions: Question[];
    tags: string[]; // Tags for the quiz from the predefined list
}

export interface QuizTagsResponse {
    quizTags: string[];
}

export interface QuizzesResponse {
    message: string;
    data: ILibraryQuiz[];
}

export interface QuizResponse {
    message: string;
    data: ILibraryQuiz & { isThisMe: boolean; isFavourite: boolean, favouriteCount: number; quizCreatorId: number; username: string; count: number; follower: number; following: number; isFollowed: boolean };
}

export interface QuizQuestion {
    questionId: number;
    question: string;
    options: string[];
    questionIndex: number;
    correctOption: number;
    points: number;
    duration: number;
}

export interface QuizQuestionsResponse {
    message: string;
    data: QuizQuestion[];
}