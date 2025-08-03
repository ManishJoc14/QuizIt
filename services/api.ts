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
            meta?: { contentType?: 'form' | 'json' };
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

                const headers: Record<string, string> = {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    'Content-Type': isForm
                        ? 'application/x-www-form-urlencoded'
                        : 'application/json',
                };

                // Convert keys to snake_case for sending
                const snakeData = data ? snakecaseKeys(data, { deep: true }) : undefined;
                const snakeParams = params ? snakecaseKeys(params, { deep: true }) : undefined;

                // console.log('MAKING REQUEST:', JSON.stringify(
                //     {
                //         url: baseUrl + url,
                //         method,
                //         data: snakeData,
                //         params: snakeParams,
                //         headers,
                //     }, null, 2
                // ));

                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data: isForm ? qs.stringify(snakeData) : snakeData,
                    params: snakeParams,
                    headers,
                });

                // Convert response to camelCase
                const camelData = camelcaseKeys(result.data, { deep: true });

                return { data: camelData };
            } catch (err) {
                const error = err as AxiosError;
                console.error('error: ', error, error.status)

                if (error.status === 401 || error.status === 403) {
                    // console.log('attempting refresh...');
                    const refreshed = await handleTokenRefresh(baseUrl);

                    if (refreshed?.accessToken) {
                        const retry = await axios({
                            url: baseUrl + url,
                            method,
                            data,
                            params,
                            headers: {
                                Authorization: `Bearer ${refreshed.accessToken}`,
                                'Content-Type': meta?.contentType === 'form'
                                    ? 'application/x-www-form-urlencoded'
                                    : 'application/json',
                            },
                        });

                        // Convert response to camelCase
                        const camelData = camelcaseKeys(retry.data, { deep: true });

                        return {
                            data: camelData,
                        };
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
};

export const api = createApi({
    reducerPath: 'api',
    // baseQuery: axiosBaseQuery({ baseUrl: 'http://192.168.1.65:8000' }),
    baseQuery: axiosBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_PROTOCOL}${process.env.EXPO_PUBLIC_BASEURL}` }),
    endpoints: () => ({}),
    tagTypes: ['User', 'Quiz'],
});