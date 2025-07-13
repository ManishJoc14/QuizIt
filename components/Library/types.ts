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