export interface FollowUserPayload {
    followedToId: string;
};

export interface UserToInvite {
    userId: number;
    username: string;
    image: string;
}

export interface InviteUserListResponse {
    message: string;
    data: UserToInvite[]
};

export interface InviteFriendPayload {
    quizId: string;
    invitedToId: string;
};


export interface TopAuthor {
    id: number;
    name: string;
    username: string;
    image: string;
    isFollowed: boolean;
    quizCount: number;
}

export interface TopAuthorListResponse {
    message: string;
    data: TopAuthor[]
};

export interface UserSearch {
    id: number;
    fullName: string;
    username: string;
    image: string;
}

export interface UserSearchResponse {
    message: string;
    data: UserSearch[]
}