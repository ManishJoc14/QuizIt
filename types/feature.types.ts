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

export interface ContactPayload {
    name: string;
    email: string;
    question: string;
};

export type Reaction = 'Satisfied' | 'Happy' | 'Sad';

export interface FeedbackPayload {
    reaction: Reaction;
    feedbackMessage: string;
}

export interface AboutUsResponse {
    message: string;
    data: {
        fullName: string;
        photoUrl: string;
        position: string;
        faculty: string;
        githubLink: string;
        linkedinLink: string;
    }[]
}