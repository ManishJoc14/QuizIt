export interface User {
    id: number;
    name: string;
    username: string;
    image?: string;
    isFollowed: boolean;
}

export interface ProfileMetaData {
    quizzes: number;
    played: number;
    players: number;
    rank: number;
    followers: number;
    following: number;
}

export interface ProfileData {
    user: User;
    meta: ProfileMetaData;
}