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

const baseQueryWithReauth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result?.error as any;
  if (error?.originalStatus === 401) {
    const refreshResult = (await baseQuery(
      'user/refresh-token',
      api,
      extraOptions
    )) as { data: { token: string } };
    if (refreshResult.data) {
      setToken(refreshResult.data.token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('err result', refreshResult);

      // window.location.href = '/login?e=session expired';
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: baseQueryWithReauth,
  endpoints: (_) => ({}),
});
