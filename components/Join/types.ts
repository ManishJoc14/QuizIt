
export type Summary = {
    id: number;
    name: string;
    image: string;
    rank: number;
    totalPoints: number;
};

export type QuestionResult = {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex?: number | null;
    timeTaken?: number | null;
    points: number;
};

export type ResultData = {
    summary: Summary;
    questions: QuestionResult[];
};

export interface User {
    id: number;
    name: string;
    username: string;
    image?: string;
    isThisMe: boolean;
    isFollowed: boolean;
}

export interface QuizMetaData {
    questions: number;
    played: number;
    favorited: number;
    description: string;
}

export interface QuizData {
    user: User;
    meta: QuizMetaData;
}