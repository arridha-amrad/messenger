import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, setToken } from '../utils/token';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/',
    credentials: 'include',
    prepareHeaders: (headers, _) => {
        const token = getToken();
        if (token !== '') {
            headers.set('authorization', token);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    const error = result?.error as any;
    if (error?.originalStatus === 401) {
        try {
            const refreshResult = (await baseQuery('user/refresh-token', api, extraOptions)) as {
                data: { token: string };
            };
            setToken(refreshResult.data.token);
            result = await baseQuery(args, api, extraOptions);
        } catch (error) {
            return result;
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['User', 'Message', 'Room'],
    baseQuery: baseQueryWithReauth,
    endpoints: (_) => ({}),
});
