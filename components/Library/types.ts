export interface ILibraryQuiz {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    plays: number;
    date: string;
    count: number;
}

export type IOrder = 'asc' | 'desc'

export type Question = {
    id: number;
    index: number;
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
    time: number;
};

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