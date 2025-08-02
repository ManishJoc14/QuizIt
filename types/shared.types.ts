export type User = {
    id: number;
    email: string;
    fullName: string;
    username: string;
    photo?: string;
}

export interface MutationSuccessResponse {
    message: string;
}