import { User } from "./shared.types";

export type GetUserParams = {
    user_id?: number;
    username?: string;
};

export type GetUserResponse = {
    user: User;
};

export type Question = {
    id: number;
    question: string;
    options: string[];
    correctOption: number;
    points: number;
    duration: number;
    questionIndex: number;
}

export type QuizEditResponse = {
    userId: number;
    quizId: number;
    editData: {
        coverPhoto: string | null;
        title: string;
        description: string;
        questions: Question[];
    }
};

export interface QuizEditPayload {
    title: string;
    description: string;
    coverPhoto?: File | string | null;
    isPublished: boolean;
    questions: (Omit<Question, 'id'> & { id?: number })[];
    tags: string[];
}

export interface UserEditPayload {
    fullName?: string;
    username?: string;
    photo?: File | string | null;
}

export type CheckUserNamePayload = {
    username: string;
};
export type CheckUserNameResponse = {
    isUnique: boolean;
};