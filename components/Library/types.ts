export interface ILibraryQuiz {
    id: number;
    title: string;
    description: string;
    coverPhoto: string | null;
    image: string | null;
    author: string;
    plays: number;
    date: string;
    count: number;
    createdAt?: string;
}

export type IOrder = 'asc' | 'desc'

export type ResultItem = {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    isCorrect: boolean;
    timeTaken: number;
    points: number;
};