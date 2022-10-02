import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, setToken } from '../utils/token';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
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
      'users/refreshToken',
      api,
      extraOptions
    )) as any;
    if (refreshResult?.data) {
      setToken(refreshResult.data.accToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      window.location.href = '/login?e=session expired';
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Todos', 'Todo'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
