import { User } from "./shared.types";

export type GetUserParams = {
    user_id?: number;
    username?: string;
};

export type GetUserResponse = {
    user: User;
};