export interface ILibraryQuiz {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    plays: number;
    date: string;
    count: string;
}

export type IOrder = 'asc' | 'desc'