
import { GetUserParams, GetUserResponse } from "@/types/user.types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<GetUserResponse, GetUserParams>({
            query: (params) => ({
                url: '/user',
                method: 'GET',
                params
            })
        }),
    }),
    overrideExisting: true
});

export const { useGetUserQuery, useLazyGetUserQuery } = userApi;