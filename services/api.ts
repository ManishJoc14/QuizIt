import qs from 'qs';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { noAuthRoutes } from '@/constants/routes';
import { getToken } from '@/utils/libs/secureStorage';
import { handleTokenRefresh } from '@/utils/libs/handleTokenRefresh';

type AxiosBaseQueryError = {
    status?: number;
    data?: any;
};

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }): BaseQueryFn<
        {
            url: string;
            method: string;
            data?: any;
            params?: any;
            meta?: { contentType?: 'form' | 'json' | 'multipart' };
        },
        unknown,
        AxiosBaseQueryError
    > =>
        async ({ url, method, data, params, meta }) => {
            try {
                const isPublicRoute = noAuthRoutes.includes(url);
                const requireAuth = !isPublicRoute;

                const token = requireAuth ? await getToken('accessToken') : null;
                const isForm = meta?.contentType === 'form';
                const isMultipart = meta?.contentType === 'multipart';

                // Build headers
                const headers: Record<string, string> = {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...(isMultipart
                        ? {} // Axios will set correct Content-Type with boundary
                        : {
                            'Content-Type': isForm
                                ? 'application/x-www-form-urlencoded'
                                : 'application/json',
                        }),
                };

                let finalData: any;
                let snakeParams = params ? snakecaseKeys(params, { deep: true }) : undefined;

                if (isMultipart) {
                    finalData = data;
                } else if (isForm) {
                    const snakeData = data ? snakecaseKeys(data, { deep: true }) : undefined;
                    finalData = qs.stringify(snakeData);
                } else {
                    finalData = data ? snakecaseKeys(data, { deep: true }) : undefined;
                }

                console.log('MAKING REQUEST:', JSON.stringify(
                    {
                        url: baseUrl + url,
                        method,
                        data: finalData,
                        params: snakeParams,
                        headers,
                    }, null, 2
                ));

                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data: finalData,
                    params: snakeParams,
                    headers,
                });

                const camelData = camelcaseKeys(result.data, { deep: true });
                return { data: camelData };

            } catch (err) {
                const error = err as AxiosError;

                if (error.status === 401 || error.status === 403) {
                    const refreshed = await handleTokenRefresh(baseUrl);

                    if (refreshed?.accessToken) {
                        const retry = await axios({
                            url: baseUrl + url,
                            method,
                            data,
                            params,
                            headers: {
                                Authorization: `Bearer ${refreshed.accessToken}`,
                                ...(meta?.contentType === 'multipart'
                                    ? {}
                                    : {
                                        'Content-Type': meta?.contentType === 'form'
                                            ? 'application/x-www-form-urlencoded'
                                            : 'application/json',
                                    }),
                            },
                        });

                        const camelData = camelcaseKeys(retry.data, { deep: true });
                        return { data: camelData };
                    }
                }

                return {
                    error: {
                        status: error.response?.status || 500,
                        data: typeof error.response?.data === 'object'
                            ? camelcaseKeys(error.response.data as Record<string, unknown>, { deep: true })
                            : error.message,
                    },
                };
            }
        };

if (!process.env.EXPO_PUBLIC_BASEURL || !process.env.EXPO_PUBLIC_PROTOCOL) {
    throw new Error('EXPO_PUBLIC_BASEURL or EXPO_PUBLIC_PROTOCOL is not defined in the environment variables');
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_PROTOCOL}${process.env.EXPO_PUBLIC_BASEURL}` }),
    endpoints: () => ({}),
    tagTypes: ['User', 'Quiz', 'FavouriteQuiz', 'InviteUserList', 'QuizDetailed', 'UserProfile'],
});
